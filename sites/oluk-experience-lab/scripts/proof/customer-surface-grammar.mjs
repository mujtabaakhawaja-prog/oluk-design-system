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
const canvasIntroductionSurface = "section-introduction";

const strictSupplementalRoutes = Object.freeze([
  { routeId: "surface-grammar-specimen", path: "/review-studio/surface-grammar", expectedStatus: 200 },
]);

const strictFoundationFiles = new Set([
  "app/design-system/action-control.module.css",
  "app/design-system/action-control.tsx",
  "app/design-system/content-surfaces.module.css",
  "app/design-system/content-surfaces.tsx",
  "app/design-system/customer-route-primitives.tsx",
  "app/design-system/pdp-first-fold.module.css",
  "app/design-system/pdp-first-fold.tsx",
  "app/design-system/surface-grid.module.css",
  "app/design-system/surface-grid.tsx",
  "app/review-studio/surface-grammar/page.tsx",
  "app/review-studio/surface-grammar/surface-grammar.module.css",
  "app/design-system/your-stack-builder.module.css",
  "app/design-system/your-stack-builder.tsx",
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
    const inheritedStrictScope = [...stack].reverse().find((frame) => frame.strictScope)?.strictScope ?? false;
    const strictScope = inheritedStrictScope || attributes["data-grammar-strict"] === "true";
    const declaredSurface = governedCopySurfaceKinds.has(attributes["data-copy-surface"])
      ? attributes["data-copy-surface"]
      : attributes["data-copy-surface"] === canvasIntroductionSurface
        ? canvasIntroductionSurface
      : null;
    const copySurface = declaredSurface ?? inheritedSurface;

    if (/^h[1-6]$/.test(tag) || tag === "p") {
      const tail = source.slice((match.index ?? 0) + token.length);
      const closingMatch = tail.match(new RegExp(`^[\\s\\S]*?<\\/${tag}\\s*>`, "i"));
      const text = visibleText(closingMatch?.[0] ?? "").slice(0, 180);
      copyGroups.push({
        element: tag,
        status:
          copySurface === canvasIntroductionSurface
            ? tag === "p"
              ? "INVALID_CANVAS_EXCEPTION"
              : "CANVAS_INTRO_EXCEPTION"
            : copySurface
              ? "CONTAINED"
              : "LOOSE_CANVAS_COPY",
        copySurface,
        strictScope,
        text,
      });
    } else if (
      copySurface === canvasIntroductionSurface &&
      (tag === "a" || tag === "button" || tag === "img" || attributes["data-component"] || attributes.role === "listitem")
    ) {
      copyGroups.push({
        element: tag,
        status: "INVALID_CANVAS_EXCEPTION",
        copySurface,
        strictScope,
        text: visibleText(token).slice(0, 180),
      });
    }

    if (!token.endsWith("/>") && !voidElements.has(tag)) stack.push({ tag, copySurface, strictScope });
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
    const customerParagraph = /(?:^|[\s,>+~])p(?:\b|[:.#])|copy|description|rationale|narrative|long[-_]?copy|body/i.test(selector);
    if (customerParagraph && /color\s*:\s*var\(--oluk-text-muted\)/i.test(declarations)) {
      findings.push({
        rule: "muted-customer-copy",
        file,
        selector,
        value: "var(--oluk-text-muted)",
      });
    }
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
  for (const match of source.matchAll(/data-surface-exception=["']([^"']+)["']/g)) {
    const allowed = file === "app/design-system/pdp-first-fold.tsx" && match[1] === "pdp-media-purchase-decision-pair";
    if (!allowed) findings.push({ rule: "undeclared-canvas-exception", file, value: match[1], offset: match.index });
  }
  if (/data-grammar-strict=/.test(source) && !file.endsWith("action-control.tsx")) {
    for (const match of source.matchAll(/<(?:button\b|a\b[^>]*className=["'][^"']*\bbutton\b)/g)) {
      findings.push({ rule: "noncanonical-action-control", file, value: match[0], offset: match.index });
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

function routeAudit(route, html, strict = false) {
  const groups = auditRenderedCopySurfaces(html);
  const violation = ({ status }) => status === "LOOSE_CANVAS_COPY" || status === "INVALID_CANVAS_EXCEPTION";
  const violations = groups.filter(violation);
  const strictGroups = strict ? groups.filter(({ strictScope }) => strictScope) : groups;
  const strictViolations = strictGroups.filter(violation);
  const routeStatus = violations.length === 0 ? "GRAMMAR_READY" : "NEEDS_ROUTE_REFACTOR";
  return {
    routeId: route.routeId ?? route.id,
    path: route.path,
    strict,
    status: strictViolations.length === 0 ? "GRAMMAR_READY" : strict ? "STRICT_SCOPE_FAILED" : "NEEDS_ROUTE_REFACTOR",
    routeStatus,
    copyGroupCount: groups.length,
    containedCopyGroupCount: groups.length - violations.length,
    looseCopyGroupCount: violations.length,
    looseCopyExamples: violations.slice(0, 6),
    strictScopedCopyGroupCount: strict ? strictGroups.length : 0,
    strictScopedLooseCopyGroupCount: strict ? strictViolations.length : 0,
    surroundingRouteLooseCopyGroupCount: strict ? violations.length - strictViolations.length : 0,
  };
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
    routes.push(routeAudit(route, html, html.includes('data-grammar-strict="true"')));
  }

  const sourceFindings = await auditSources(files);
  const strictRoutes = routes.filter(({ strict }) => strict);
  for (const route of strictSupplementalRoutes) {
    const html = await renderHtml(worker, route.path, route.expectedStatus);
    strictRoutes.push(routeAudit(route, html, true));
  }
  const strictSourceFindings = await auditSources(files.filter(({ file }) => strictFoundationFiles.has(file)));
  const strictScopeReady =
    strictRoutes.every(({ status }) => status === "GRAMMAR_READY") && strictSourceFindings.length === 0;
  const payload = stable({
    schemaVersion: 2,
    contractId: "oluk.customer-surface-grammar.v2",
    sourceHash,
    auditedRouteCount: routes.length,
    grammarReadyRouteCount: routes.filter(({ routeStatus }) => routeStatus === "GRAMMAR_READY").length,
    routeRefactorCount: routes.filter(({ routeStatus }) => routeStatus === "NEEDS_ROUTE_REFACTOR").length,
    looseCopyGroupCount: routes.reduce((total, route) => total + route.looseCopyGroupCount, 0),
    sourceFindingCount: sourceFindings.length,
    debt: {
      policy: "MONOTONIC_DECREASE",
      sourceFindingCount: sourceFindings.length,
      untouchedRouteViolationCount: routes
        .filter(({ strict }) => !strict)
        .reduce((total, route) => total + route.looseCopyGroupCount, 0),
    },
    currentState:
      routes.every(({ routeStatus }) => routeStatus === "GRAMMAR_READY") && sourceFindings.length === 0
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
      paragraphColorRole: "--oluk-text-secondary",
    },
    strictScope: {
      status: strictScopeReady ? "STRICT_READY" : "STRICT_SCOPE_FAILED",
      routes: strictRoutes,
      sourceFiles: [...strictFoundationFiles].sort(),
      sourceFindings: strictSourceFindings,
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
  if (current.strictScope?.status !== "STRICT_READY") {
    throw new Error("strict customer-surface grammar scope is not ready");
  }
  return current;
}

async function enforceMonotonicDebt(nextAudit) {
  try {
    const previous = JSON.parse(await readFile(outputPath, "utf8"));
    if (previous.schemaVersion < 2 || !previous.debt) return;
    if (nextAudit.debt.untouchedRouteViolationCount > previous.debt.untouchedRouteViolationCount) {
      throw new Error("customer-surface route debt increased; strict work may not add loose canvas copy");
    }
    if (nextAudit.debt.sourceFindingCount > previous.debt.sourceFindingCount) {
      throw new Error("customer-surface source debt increased; repair or explicitly scope the new finding");
    }
  } catch (error) {
    if (error?.code === "ENOENT") return;
    throw error;
  }
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
  if (process.argv.includes("--write")) {
    if (audit.strictScope.status !== "STRICT_READY") throw new Error("strict customer-surface grammar scope failed");
    await enforceMonotonicDebt(audit);
    await writeFile(outputPath, `${JSON.stringify(audit, null, 2)}\n`);
  }
  process.stdout.write(`${JSON.stringify(audit, null, 2)}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
