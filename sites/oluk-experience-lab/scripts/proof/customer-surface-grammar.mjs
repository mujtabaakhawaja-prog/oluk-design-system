#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROUTES } from "./route-matrix.mjs";
import {
  loadBuiltWorker,
  parseTagAttributes,
  renderHtml,
  visibleText,
} from "./rendered-audit-utils.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDir, "../..");
const repoRoot = path.resolve(siteRoot, "../..");
const appRoot = path.join(siteRoot, "app");
const outputPath = path.join(repoRoot, "authority/generated/CUSTOMER-SURFACE-GRAMMAR-AUDIT.json");

const governedCopySurfaceKinds = new Set([
  "commerce",
  "decision",
  "editorial",
  "technical",
  "transaction",
]);

const coreFamilies = new Set([
  "homepage",
  "catalogue_search_collections",
  "product_detail",
  "openlab_archive",
  "openlab_portal",
  "openlab_product_record",
  "openlab_report_viewer",
  "openlab_methodology_compare_evidenceos",
  "openlab_frontier_content",
  "decision_tools",
]);

const continuationRouteIds = new Set([
  "bag",
  "checkout-review",
  "checkout-confirmation",
  "checkout-tracking",
  "order-success",
  "order-tracking",
  "account",
  "account-orders",
  "account-order",
  "account-profile",
  "account-addresses",
  "reviews",
]);

const voidElements = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr",
]);

const canonicalAnatomyOwners = Object.freeze({
  ProductCommerceCard: "app/design-system/product-commerce-card.tsx",
  ProductMediaChamber: "app/design-system/product-media-chamber.tsx",
  MetricRail: "app/design-system/metric-rail.tsx",
  QualitativeChip: "app/design-system/qualitative-chip.tsx",
});

const rejectedStackPatterns = Object.freeze([
  ["sharper-stack-copy", /\bbuild\s+(?:a\s+)?sharper\b/i],
  ["good-better-best", /\bGood\s*\/\s*Better\s*\/\s*Best\b/i],
  ["rejected-stack-profile", /\bStackOutcomeProfile\b/],
  ["rejected-complexity-score", /\bcomplexity\b/i],
  ["rejected-intensity-score", /\bintensity\b/i],
  ["rejected-evidence-visibility-score", /\bevidence visibility\b/i],
  ["arbitrary-score-css", /--score\b/],
]);

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const stable = (value) => {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(filePath) : [filePath];
  }))).flat();
}

function cleanHtml(html) {
  return html
    .replace(/<head\b[\s\S]*?<\/head>/gi, "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, "")
    .replace(/<!--([\s\S]*?)-->/g, "");
}

export function auditRenderedCopySurfaces(html) {
  const source = cleanHtml(html);
  const stack = [];
  const copyGroups = [];
  const tags = source.matchAll(/<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi);

  for (const match of tags) {
    const token = match[0];
    const tag = match[1].toLowerCase();
    const closing = token.startsWith("</");

    if (closing) {
      for (let index = stack.length - 1; index >= 0; index -= 1) {
        if (stack[index].tag === tag) {
          stack.splice(index);
          break;
        }
      }
      continue;
    }

    const attributes = parseTagAttributes(token);
    const inheritedSurface = [...stack].reverse().find((frame) => frame.copySurface)?.copySurface ?? null;
    const declaredSurface = governedCopySurfaceKinds.has(attributes["data-copy-surface"])
      ? attributes["data-copy-surface"]
      : null;
    const copySurface = declaredSurface ?? inheritedSurface;

    if (/^h[1-6]$/.test(tag) || tag === "p") {
      const tail = source.slice((match.index ?? 0) + token.length);
      const closingMatch = tail.match(new RegExp(`^[\\s\\S]*?<\\/${tag}\\s*>`, "i"));
      const text = visibleText(closingMatch?.[0] ?? "").slice(0, 180);
      copyGroups.push({
        element: tag,
        status: copySurface ? "CONTAINED" : "LOOSE_CANVAS_COPY",
        copySurface,
        text,
      });
    }

    if (!token.endsWith("/>") && !voidElements.has(tag)) stack.push({ tag, copySurface });
  }

  return copyGroups;
}

function cssRuleBlocks(source) {
  return [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((match) => ({
    selector: match[1].trim(),
    declarations: match[2],
  }));
}

export function auditCssText(source, file = "fixture.module.css") {
  const findings = [];
  const qualitativeException = /qualitative[-_]?chip/i;

  for (const match of source.matchAll(/#[0-9a-f]{3,8}\b/gi)) {
    findings.push({ rule: "literal-color", file, value: match[0], offset: match.index });
  }
  for (const match of source.matchAll(/font-family\s*:\s*([^;}]+)/gi)) {
    if (!match[1].trim().startsWith("var(")) {
      findings.push({ rule: "literal-font-family", file, value: match[0].trim(), offset: match.index });
    }
  }

  for (const { selector, declarations } of cssRuleBlocks(source)) {
    const sizes = [
      ...declarations.matchAll(/font-size\s*:\s*(\d+(?:\.\d+)?)px/gi),
      ...declarations.matchAll(/font\s*:[^;{}]*?\b(\d+(?:\.\d+)?)px\//gi),
    ];
    for (const match of sizes) {
      const size = Number(match[1]);
      const bodyCopy = /(?:^|[\s,>+~])p\b|copy|description|rationale|narrative|summary|body/i.test(selector);
      const minimum = bodyCopy ? 15 : 12;
      if (size < minimum && !(size === 11 && qualitativeException.test(selector))) {
        findings.push({
          rule: bodyCopy ? "body-type-below-15" : "metadata-type-below-12",
          file,
          selector,
          value: `${size}px`,
        });
      }
    }
  }

  return findings;
}

export function auditTsxText(source, file = "fixture.tsx") {
  const findings = [];
  for (const [name, owner] of Object.entries(canonicalAnatomyOwners)) {
    if (file !== owner && new RegExp(`(?:export\\s+)?function\\s+${name}\\b`).test(source)) {
      findings.push({ rule: "local-canonical-redraw", file, value: name, owner });
    }
  }
  if (
    !file.endsWith("product-media-chamber.tsx") &&
    !file.endsWith("product-fixtures.ts") &&
    !file.endsWith("frontier-product-presentation.ts")
  ) {
    for (const match of source.matchAll(/["']\/assets\/products\/[^"']+["']/g)) {
      findings.push({ rule: "direct-unregistered-product-media", file, value: match[0], offset: match.index });
    }
  }
  if (/stack/i.test(file) || /data-component=["']YourStackBuilder["']/.test(source)) {
    for (const [rule, pattern] of rejectedStackPatterns) {
      const match = source.match(pattern);
      if (match) findings.push({ rule, file, value: match[0], offset: match.index });
    }
  }
  return findings;
}

async function sourceSnapshot() {
  const files = (await walk(appRoot))
    .filter((file) => /\.(?:tsx|css)$/.test(file))
    .sort();
  const ledger = path.join(repoRoot, "authority/SITE-ROUTE-LEDGER.json");
  const all = [...files, ledger, fileURLToPath(import.meta.url)];
  const sources = await Promise.all(all.map(async (file) => ({
    file: path.relative(siteRoot, file),
    source: await readFile(file, "utf8"),
  })));
  const hashInput = sources.map(({ file, source }) => `${file}\0${source}`).join("\0");
  return { files: sources, sourceHash: sha256(hashInput) };
}

async function auditSources(files) {
  const findings = [];
  for (const { file, source } of files) {
    if (file.endsWith(".tsx")) findings.push(...auditTsxText(source, file));
    if (file.endsWith(".module.css")) findings.push(...auditCssText(source, file));
  }
  return findings;
}

function selectCoreRoutes(ledger) {
  const families = new Map(ledger.routes.map((route) => [route.id, route.family]));
  const selected = ROUTES.filter((route) => coreFamilies.has(families.get(route.id)) || continuationRouteIds.has(route.id));
  if (selected.length !== 44) throw new Error(`Expected 44 core Product/OpenLab/Continuation routes, received ${selected.length}.`);
  return selected;
}

export async function buildCustomerSurfaceGrammarAudit() {
  const ledger = JSON.parse(await readFile(path.join(repoRoot, "authority/SITE-ROUTE-LEDGER.json"), "utf8"));
  const { files, sourceHash } = await sourceSnapshot();
  const worker = await loadBuiltWorker("customer-surface-grammar");
  const routes = [];

  for (const route of selectCoreRoutes(ledger)) {
    const html = await renderHtml(worker, route.path, route.expectedStatus);
    const groups = auditRenderedCopySurfaces(html);
    const loose = groups.filter(({ status }) => status === "LOOSE_CANVAS_COPY");
    routes.push({
      routeId: route.id,
      path: route.path,
      status: loose.length === 0 ? "GRAMMAR_READY" : "NEEDS_ROUTE_REFACTOR",
      copyGroupCount: groups.length,
      containedCopyGroupCount: groups.length - loose.length,
      looseCopyGroupCount: loose.length,
      looseCopyExamples: loose.slice(0, 6),
    });
  }

  const sourceFindings = await auditSources(files);
  const payload = stable({
    schemaVersion: 1,
    contractId: "oluk.customer-surface-grammar.v1",
    sourceHash,
    auditedRouteCount: routes.length,
    grammarReadyRouteCount: routes.filter(({ status }) => status === "GRAMMAR_READY").length,
    routeRefactorCount: routes.filter(({ status }) => status === "NEEDS_ROUTE_REFACTOR").length,
    looseCopyGroupCount: routes.reduce((total, route) => total + route.looseCopyGroupCount, 0),
    sourceFindingCount: sourceFindings.length,
    currentState:
      routes.every(({ status }) => status === "GRAMMAR_READY") && sourceFindings.length === 0
        ? "GRAMMAR_READY"
        : "FOUNDATION_READY_ROUTE_REFACTOR_REQUIRED",
    strictFoundation: {
      canonicalCopySurfaces: [
        "EditorialSurface",
        "DecisionSurface",
        "TechnicalSurface",
        "TransactionIntroCard",
      ],
      copySurfaceKinds: [...governedCopySurfaceKinds].sort(),
      bodyTypeFloorPx: 15,
      metadataTypeFloorPx: 12,
      qualitativeChipLabelExceptionPx: 11,
      mobileReviewWidthPx: 390,
    },
    routes,
    sourceFindings,
  });
  return { ...payload, auditHash: sha256(JSON.stringify(payload)) };
}

async function checkCommittedAudit() {
  const current = JSON.parse(await readFile(outputPath, "utf8"));
  const { sourceHash } = await sourceSnapshot();
  if (current.sourceHash !== sourceHash) {
    throw new Error("stale customer-surface grammar audit: active route/design sources changed");
  }
  const { auditHash, ...payload } = current;
  if (auditHash !== sha256(JSON.stringify(stable(payload)))) {
    throw new Error("invalid customer-surface grammar audit hash");
  }
  return current;
}

async function main() {
  if (process.argv.includes("--check")) {
    const audit = await checkCommittedAudit();
    process.stdout.write(
      `PASS grammar audit freshness ${audit.auditHash} · ${audit.auditedRouteCount} routes · ${audit.routeRefactorCount} route refactors declared\n`,
    );
    return;
  }
  const audit = await buildCustomerSurfaceGrammarAudit();
  if (process.argv.includes("--write")) await writeFile(outputPath, `${JSON.stringify(audit, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(audit, null, 2)}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
