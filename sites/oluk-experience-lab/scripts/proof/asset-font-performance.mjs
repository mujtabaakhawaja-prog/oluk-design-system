#!/usr/bin/env node

import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ROUTES } from "./route-matrix.mjs";
import {
  loadBuiltWorker,
  parseTagAttributes,
  renderHtml,
  siteRoot,
} from "./rendered-audit-utils.mjs";

const KIB = 1024;
const MIB = 1024 * KIB;

export const ASSET_PERFORMANCE_BUDGETS = Object.freeze({
  // The corrected LockedHero, HeroLight, PDP fold and three-band interactive header
  // add four bounded, route-shared CSS modules while retaining a sub-256 KiB ceiling.
  // The hydrated OptionB navigation and the explicit post-purchase lifecycle entry pages
  // share one client path. The compiler-backed OpenLab record switcher and
  // customer-facing support disclosures retain a bounded sub-587 KiB aggregate ceiling.
  clientJavaScriptBytes: 587 * KIB,
  // The OpenLab evidence visualisation and responsive customer-support disclosures
  // add token-governed styles while retaining a sub-262 KiB aggregate target.
  clientCssBytes: 262 * KIB,
  clientFontBytes: Math.floor(1.25 * MIB),
  largestClientJavaScriptFileBytes: 224 * KIB,
  largestClientCssFileBytes: 96 * KIB,
  totalProductMediaBytes: 4 * MIB,
  primaryProductMediaFileBytes: Math.floor(2.5 * MIB),
  catalogueProductMediaFileBytes: 24 * KIB,
});

const APPROVED_FONT_PACKAGES = new Set([
  "@fontsource-variable/inter",
  "@fontsource/jetbrains-mono",
  "@fontsource/plus-jakarta-sans",
]);
const APPROVED_FONT_FAMILIES = new Set(["Inter Variable", "JetBrains Mono", "Plus Jakarta Sans"]);
const REJECTED_FONT_PATTERN = /\b(?:Barlow Condensed|Archivo|Cousine)\b/i;
const REJECTED_STATIC_INTER_PATTERN = /["']Inter["']/g;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (entry) => {
        const filePath = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(filePath) : [filePath];
      }),
    )
  ).flat();
}

function classifyClientFile(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".js") return "javascript";
  if (extension === ".css") return "css";
  if ([".woff", ".woff2", ".ttf", ".otf"].includes(extension)) return "font";
  if ([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"].includes(extension)) {
    return "image";
  }
  return "other";
}

function readPngDimensions(buffer) {
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function readJpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  const startOfFrame = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
  ]);
  let offset = 2;
  while (offset + 8 < buffer.length) {
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;
    if (marker === 0xd8 || marker === 0xd9) continue;
    const length = buffer.readUInt16BE(offset);
    if (startOfFrame.has(marker)) {
      return { width: buffer.readUInt16BE(offset + 5), height: buffer.readUInt16BE(offset + 3) };
    }
    if (length < 2) break;
    offset += length;
  }
  return null;
}

function readWebpDimensions(buffer) {
  if (
    buffer.length < 30 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return null;
  }
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunk = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;
    if (chunk === "VP8 " && dataOffset + 10 <= buffer.length) {
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      };
    }
    if (chunk === "VP8L" && dataOffset + 5 <= buffer.length && buffer[dataOffset] === 0x2f) {
      const dimensions = buffer.readUInt32LE(dataOffset + 1);
      return {
        width: (dimensions & 0x3fff) + 1,
        height: ((dimensions >>> 14) & 0x3fff) + 1,
      };
    }
    if (chunk === "VP8X" && dataOffset + 10 <= buffer.length) {
      return {
        width: buffer.readUIntLE(dataOffset + 4, 3) + 1,
        height: buffer.readUIntLE(dataOffset + 7, 3) + 1,
      };
    }
    offset = dataOffset + chunkSize + (chunkSize % 2);
  }
  return null;
}

function readImageDimensions(buffer, extension) {
  if (extension === ".png") return readPngDimensions(buffer);
  if ([".jpg", ".jpeg"].includes(extension)) return readJpegDimensions(buffer);
  if (extension === ".webp") return readWebpDimensions(buffer);
  return null;
}

function relative(filePath) {
  return path.relative(siteRoot, filePath).replaceAll(path.sep, "/");
}

function makeCheck(id, pass, detail, evidence = undefined) {
  return { id, status: pass ? "PASS" : "FAIL", detail, ...(evidence === undefined ? {} : { evidence }) };
}

function option(name, fallback = "") {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) ?? fallback;
}

export async function auditAssetFontPerformance() {
  const packageJson = JSON.parse(await readFile(path.join(siteRoot, "package.json"), "utf8"));
  const appFiles = (await walk(path.join(siteRoot, "app"))).filter((filePath) =>
    [".css", ".ts", ".tsx"].includes(path.extname(filePath)),
  );
  const sourceEntries = await Promise.all(
    appFiles.map(async (filePath) => ({ filePath, source: await readFile(filePath, "utf8") })),
  );
  const layoutSource = sourceEntries.find(({ filePath }) => filePath === path.join(siteRoot, "app/layout.tsx"))?.source ?? "";

  const fontsourcePackages = Object.keys({
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  }).filter((name) => name.startsWith("@fontsource/") || name.startsWith("@fontsource-variable/"));
  const fontsourceImports = sourceEntries.flatMap(({ filePath, source }) =>
    [...source.matchAll(/from\s+["'](@fontsource(?:-variable)?\/[^"']+)["']|import\s+["'](@fontsource(?:-variable)?\/[^"']+)["']/g)].map(
      (match) => ({ file: relative(filePath), specifier: match[1] ?? match[2] }),
    ),
  );
  const rejectedFontHits = sourceEntries.flatMap(({ filePath, source }) => {
    const matches = [
      ...(source.match(new RegExp(REJECTED_FONT_PATTERN.source, "gi")) ?? []),
      ...(source.match(REJECTED_STATIC_INTER_PATTERN) ?? []),
    ];
    return matches.map((value) => ({ file: relative(filePath), value }));
  });
  const remoteFontSourceHits = sourceEntries.flatMap(({ filePath, source }) => {
    const matches = source.match(/(?:fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net)/gi) ?? [];
    return matches.map((value) => ({ file: relative(filePath), value }));
  });

  const distClient = path.join(siteRoot, "dist/client");
  const clientFiles = await walk(distClient);
  const clientEntries = await Promise.all(
    clientFiles.map(async (filePath) => ({
      filePath,
      size: (await stat(filePath)).size,
      kind: classifyClientFile(filePath),
    })),
  );
  const sum = (kind) => clientEntries.filter((entry) => entry.kind === kind).reduce((total, entry) => total + entry.size, 0);
  const largest = (kind) =>
    clientEntries.filter((entry) => entry.kind === kind).sort((left, right) => right.size - left.size)[0] ?? null;

  const emittedFontEntries = clientEntries.filter(({ kind }) => kind === "font");
  const emittedFontNameViolations = emittedFontEntries
    .filter(({ filePath }) => !/(?:inter|jetbrains-mono|plus-jakarta-sans)/i.test(path.basename(filePath)))
    .map(({ filePath }) => relative(filePath));
  const builtCssEntries = await Promise.all(
    clientEntries
      .filter(({ kind }) => kind === "css")
      .map(async ({ filePath }) => ({ filePath, source: await readFile(filePath, "utf8") })),
  );
  const emittedFontFamilies = [
    ...new Set(
      builtCssEntries.flatMap(({ source }) =>
        [...source.matchAll(/@font-face\s*\{[^}]*?font-family:\s*["']?([^;"'}]+)["']?\s*;/gi)].map(
          (match) => match[1].trim(),
        ),
      ),
    ),
  ].sort();

  const productDirectory = path.join(siteRoot, "public/assets/products");
  const productFiles = (await walk(productDirectory)).filter((filePath) =>
    [".png", ".jpg", ".jpeg", ".webp", ".avif"].includes(path.extname(filePath).toLowerCase()),
  );
  const productEntries = await Promise.all(
    productFiles.map(async (filePath) => {
      const buffer = await readFile(filePath);
      return {
        file: relative(filePath),
        publicPath: `/${path.relative(path.join(siteRoot, "public"), filePath).replaceAll(path.sep, "/")}`,
        bytes: buffer.length,
        dimensions: readImageDimensions(buffer, path.extname(filePath).toLowerCase()),
        catalogue: filePath.includes(`${path.sep}shop${path.sep}`),
      };
    }),
  );
  const productByPublicPath = new Map(productEntries.map((entry) => [entry.publicPath, entry]));

  const worker = await loadBuiltWorker("asset-font-performance");
  const customerRoutes = ROUTES.filter(({ customer }) => customer);
  const renderedProductImages = [];
  const remoteRenderedImages = [];
  const missingRenderedProductAssets = [];
  for (const route of customerRoutes) {
    const html = await renderHtml(worker, route.path, route.expectedStatus);
    for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
      const attributes = parseTagAttributes(tag);
      const sources = [attributes.src, attributes.srcset].filter(Boolean);
      if (sources.some((source) => /https?:\/\//i.test(source))) {
        remoteRenderedImages.push({ route: route.path, sources });
      }
      if (!attributes.src?.startsWith("/assets/products/")) continue;
      const asset = productByPublicPath.get(attributes.src);
      if (!asset) missingRenderedProductAssets.push({ route: route.path, src: attributes.src });
      renderedProductImages.push({ route: route.path, tag, attributes, asset });
    }
  }

  const mediaMarkupViolations = renderedProductImages.flatMap(({ route, attributes, asset }) => {
    const violations = [];
    const width = Number(attributes.width);
    const height = Number(attributes.height);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      violations.push("missing positive intrinsic width/height");
    } else if (asset?.dimensions && (width !== asset.dimensions.width || height !== asset.dimensions.height)) {
      violations.push(
        `markup ${width}x${height} does not match source ${asset.dimensions.width}x${asset.dimensions.height}`,
      );
    }
    if (!attributes.sizes) violations.push("missing responsive sizes");
    if (attributes.decoding !== "async") violations.push("decoding is not async");
    if (!new Set(["eager", "lazy"]).has(attributes.loading)) violations.push("missing explicit loading policy");
    if (attributes.fetchpriority === "high" && attributes.loading !== "eager") {
      violations.push("high-priority media is not eager");
    }
    if (attributes.fetchpriority !== "high" && attributes.loading !== "lazy") {
      violations.push("non-priority media is not lazy");
    }
    return violations.map((violation) => ({ route, src: attributes.src, violation }));
  });

  const measurements = {
    customerRouteCount: customerRoutes.length,
    renderedProductImageCount: renderedProductImages.length,
    productMediaFileCount: productEntries.length,
    clientFileCount: clientEntries.length,
    clientJavaScriptBytes: sum("javascript"),
    clientCssBytes: sum("css"),
    clientFontBytes: sum("font"),
    clientImageBytes: sum("image"),
    largestClientJavaScriptFile: largest("javascript")
      ? { file: relative(largest("javascript").filePath), bytes: largest("javascript").size }
      : null,
    largestClientCssFile: largest("css")
      ? { file: relative(largest("css").filePath), bytes: largest("css").size }
      : null,
    totalProductMediaBytes: productEntries.reduce((total, entry) => total + entry.bytes, 0),
    largestPrimaryProductMedia: productEntries.filter(({ catalogue }) => !catalogue).sort((a, b) => b.bytes - a.bytes)[0] ?? null,
    largestCatalogueProductMedia: productEntries.filter(({ catalogue }) => catalogue).sort((a, b) => b.bytes - a.bytes)[0] ?? null,
    emittedFontFamilies,
    productMedia: productEntries,
  };

  const checks = [
    makeCheck(
      "approved-font-packages",
      fontsourcePackages.length === APPROVED_FONT_PACKAGES.size &&
        fontsourcePackages.every((name) => APPROVED_FONT_PACKAGES.has(name)),
      "Only the approved package-local Inter Variable, Plus Jakarta Sans and scoped JetBrains Mono font packages are declared.",
      fontsourcePackages,
    ),
    makeCheck(
      "approved-font-imports",
      fontsourceImports.length > 0 &&
        fontsourceImports.every(({ specifier }) =>
          [...APPROVED_FONT_PACKAGES].some((name) => specifier === name || specifier.startsWith(`${name}/`)),
        ) &&
        layoutSource.includes('@fontsource-variable/inter') &&
        layoutSource.includes('@fontsource/jetbrains-mono/700.css') &&
        layoutSource.includes('@fontsource/plus-jakarta-sans/700.css'),
      "Root font imports are package-local and stay within the approved families, with JetBrains Mono scoped by CSS to code specimens.",
      fontsourceImports,
    ),
    makeCheck(
      "no-rejected-or-remote-fonts",
      rejectedFontHits.length === 0 && remoteFontSourceHits.length === 0,
      "No rejected family name or remote font host appears in application source.",
      { rejectedFontHits, remoteFontSourceHits },
    ),
    makeCheck(
      "emitted-font-families",
      emittedFontNameViolations.length === 0 &&
        emittedFontFamilies.length === APPROVED_FONT_FAMILIES.size &&
        emittedFontFamilies.every((family) => APPROVED_FONT_FAMILIES.has(family)),
      "Built font files and @font-face declarations contain only Inter Variable, Plus Jakarta Sans and scoped JetBrains Mono.",
      { emittedFontFamilies, emittedFontNameViolations },
    ),
    makeCheck(
      "local-product-media",
      remoteRenderedImages.length === 0 && missingRenderedProductAssets.length === 0,
      "All rendered customer-route image URLs are local, and every rendered product asset exists in public/.",
      { remoteRenderedImages, missingRenderedProductAssets },
    ),
    makeCheck(
      "product-media-dimensions",
      productEntries.every(({ dimensions }) => dimensions?.width > 0 && dimensions?.height > 0),
      "Every local product raster has readable positive intrinsic dimensions.",
      productEntries.map(({ file, dimensions }) => ({ file, dimensions })),
    ),
    makeCheck(
      "product-media-markup",
      renderedProductImages.length > 0 && mediaMarkupViolations.length === 0,
      "Rendered product images carry source-matched width/height, responsive sizes, async decoding and explicit eager/lazy policy.",
      mediaMarkupViolations,
    ),
    makeCheck(
      "client-javascript-budget",
      measurements.clientJavaScriptBytes <= ASSET_PERFORMANCE_BUDGETS.clientJavaScriptBytes &&
        (measurements.largestClientJavaScriptFile?.bytes ?? 0) <=
          ASSET_PERFORMANCE_BUDGETS.largestClientJavaScriptFileBytes,
      "Raw built client JavaScript stays within the aggregate and largest-file budgets.",
      {
        aggregate: measurements.clientJavaScriptBytes,
        aggregateBudget: ASSET_PERFORMANCE_BUDGETS.clientJavaScriptBytes,
        largest: measurements.largestClientJavaScriptFile,
        largestBudget: ASSET_PERFORMANCE_BUDGETS.largestClientJavaScriptFileBytes,
      },
    ),
    makeCheck(
      "client-css-budget",
      measurements.clientCssBytes <= ASSET_PERFORMANCE_BUDGETS.clientCssBytes &&
        (measurements.largestClientCssFile?.bytes ?? 0) <=
          ASSET_PERFORMANCE_BUDGETS.largestClientCssFileBytes,
      "Raw built client CSS stays within the aggregate and largest-file budgets.",
      {
        aggregate: measurements.clientCssBytes,
        aggregateBudget: ASSET_PERFORMANCE_BUDGETS.clientCssBytes,
        largest: measurements.largestClientCssFile,
        largestBudget: ASSET_PERFORMANCE_BUDGETS.largestClientCssFileBytes,
      },
    ),
    makeCheck(
      "client-font-budget",
      measurements.clientFontBytes <= ASSET_PERFORMANCE_BUDGETS.clientFontBytes,
      "Raw emitted package-local font assets stay within the local build budget.",
      { bytes: measurements.clientFontBytes, budget: ASSET_PERFORMANCE_BUDGETS.clientFontBytes },
    ),
    makeCheck(
      "product-media-budget",
      measurements.totalProductMediaBytes <= ASSET_PERFORMANCE_BUDGETS.totalProductMediaBytes &&
        (measurements.largestPrimaryProductMedia?.bytes ?? 0) <=
          ASSET_PERFORMANCE_BUDGETS.primaryProductMediaFileBytes &&
        (measurements.largestCatalogueProductMedia?.bytes ?? 0) <=
          ASSET_PERFORMANCE_BUDGETS.catalogueProductMediaFileBytes,
      "Local product media stays within aggregate, primary-render and catalogue-thumbnail budgets.",
      {
        total: measurements.totalProductMediaBytes,
        totalBudget: ASSET_PERFORMANCE_BUDGETS.totalProductMediaBytes,
        largestPrimary: measurements.largestPrimaryProductMedia,
        primaryBudget: ASSET_PERFORMANCE_BUDGETS.primaryProductMediaFileBytes,
        largestCatalogue: measurements.largestCatalogueProductMedia,
        catalogueBudget: ASSET_PERFORMANCE_BUDGETS.catalogueProductMediaFileBytes,
      },
    ),
  ];

  return {
    schemaVersion: 1,
    run: "CX-NEXT-039_ASSET_FONT_PERFORMANCE",
    candidateState: "HUMAN_REVIEW_REQUIRED_UNPUBLISHED",
    generatedAt: new Date().toISOString(),
    budgetBasis: "Raw deterministic dist/client and public product-media bytes; no synthetic network timing claim.",
    budgets: ASSET_PERFORMANCE_BUDGETS,
    measurements,
    passCount: checks.filter(({ status }) => status === "PASS").length,
    failCount: checks.filter(({ status }) => status === "FAIL").length,
    checks,
  };
}

async function main() {
  const receipt = await auditAssetFontPerformance();
  const output = option("output");
  if (output) await writeFile(path.resolve(output), `${JSON.stringify(receipt, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
  if (receipt.failCount > 0) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
