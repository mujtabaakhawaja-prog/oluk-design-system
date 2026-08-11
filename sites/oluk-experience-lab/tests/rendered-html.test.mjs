import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["/", "Shop the range and verify every batch."],
  ["/shop", "The Olympus Labs UK range."],
  ["/product/mk-2866", "MK-2866"],
  ["/reviews", "Experiences shared by Olympus customers."],
  ["/review", "Olympus Labs UK review surfaces."],
  ["/about", "Quality, made visible."],
  ["/about/evidence-os", "A clearer path from product to proof."],
  ["/open-lab", "Independent evidence, connected to every product."],
  ["/open-lab/records", "Every batch. Every report. Public."],
  ["/open-lab/records/source-bound-record", "MK-2866 · May 2026"],
  ["/open-lab/dossier/mk-2866", "MK-2866 product dossier."],
  ["/open-lab/batch-lookup", "Find a batch record."],
  ["/open-lab/methodology", "How finished products are verified."],
  ["/open-lab/source-chain", "From finished product to original report."],
  ["/open-lab/compare", "Compare finished-product records."],
];

const customerRoutes = routes.filter(([pathname]) => pathname !== "/review");

const candidateReviewAnchors = [
  "mf02b-provenance",
  "foundation",
  "mf02b-atoms",
  "mf02b-inventory-status",
  "mf02b-evidence-status",
  "mf02b-card-family",
  "mf02b-vertical",
  "mf02b-featured",
  "mf02b-compact-states",
  "mf02b-compact-default",
  "mf02b-compact-hover",
  "mf02b-compact-focus",
  "mf02b-compact-selected",
  "mf02b-compact-added",
  "mf02b-compact-unavailable",
  "mf02b-compact-out-of-stock",
  "mf02b-compact-disabled",
  "mf02b-horizontal",
  "mf02b-purchase-panel",
  "mf02b-purchase-panel-default",
  "mf02b-purchase-panel-quantity-changed",
  "mf02b-purchase-panel-added",
  "mf02b-purchase-panel-unavailable",
  "mf02b-purchase-panel-out-of-stock",
  "mf02b-purchase-panel-disabled",
  "mf02b-assurance",
  "mf02b-six-icons",
  "mf02b-dossier",
  "mf02b-responsive-ledger",
  "baseline-routes",
  "mf02b-selection-receipt",
];

const baselineRouteLinks = customerRoutes.map(([pathname]) => pathname);

const forbiddenCustomerVocabulary = [
  /\bGOVERNED(?: PRODUCT)?\b/i,
  /CATALOGUE SOURCE PENDING/i,
  /\bSOURCE[-\u2011\u2013 ]BOUND\b/i,
  /\bDESIGN FIXTURE\b/i,
  /\bDEMO[-\u2011\u2013 ]STATE\b/i,
  /\bNOT CONNECTED\b/i,
  /RENDERED DESIGN FIXTURE/i,
  /UNPROVISIONED RENDER/i,
  /No reconstructed analytical values/i,
  /\bSample reviewer\b/i,
  /\bDate slot\b/i,
  /\bPurchase status slot\b/i,
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

function visibleText(html) {
  return decodeHtmlEntities(
    html
      .replace(/<head\b[\s\S]*?<\/head>/gi, " ")
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
      .replace(/<!--([\s\S]*?)-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return (await import(workerUrl.href)).default;
}

async function render(worker, pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function renderHtml(worker, pathname) {
  const response = await render(worker, pathname);
  assert.equal(response.status, 200, pathname);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);
  return response.text();
}

test("server-renders all 15 diagnostic routes with their expected headings and private indexing policy", async () => {
  assert.equal(routes.length, 15);
  const worker = await loadWorker();

  for (const [pathname, heading] of routes) {
    const html = await renderHtml(worker, pathname);
    const h1Matches = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) ?? [];

    assert.equal(h1Matches.length, 1, `${pathname} should render exactly one h1`);
    assert.equal(visibleText(h1Matches[0]), heading, `${pathname} h1`);
    assert.match(
      html,
      /<meta(?=[^>]*\bname=["']robots["'])(?=[^>]*\bcontent=["'][^"']*\bnoindex\b[^"']*\bnofollow\b[^"']*["'])[^>]*>/i,
      `${pathname} robots policy`,
    );
  }
});

test("preserves exact MK-2866 commerce truth and removes backend vocabulary from customer routes", async () => {
  const worker = await loadWorker();
  const productHtml = await renderHtml(worker, "/product/mk-2866");
  const productText = visibleText(productHtml);

  for (const expected of [
    "SARM SERIES",
    "MK-2866",
    "Ostarine",
    "80529-01",
    "15 MG",
    "90 SERVINGS",
    ">99%",
    "£43",
  ]) {
    assert.match(productText, new RegExp(escapeRegExp(expected)), `MK-2866 truth: ${expected}`);
  }

  assert.doesNotMatch(productText, /90 CAPS(?:\b|ULES)/i);
  assert.doesNotMatch(productText, /£43\.00\b/);
  assert.doesNotMatch(productHtml, /<del\b/i);
  assert.doesNotMatch(productText, /(?:per|\/)\s*serving/i);

  for (const [pathname] of customerRoutes) {
    const html = await renderHtml(worker, pathname);
    const text = visibleText(html);

    for (const forbidden of forbiddenCustomerVocabulary) {
      assert.doesNotMatch(text, forbidden, `${pathname} visibly contains ${forbidden}`);
    }
  }
});

test("locks the unpublished candidate foundation without treating overflow clipping as responsive proof", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const candidateTokens = await readFile(new URL("../app/design-system/candidate-tokens.css", import.meta.url), "utf8");
  const candidateCss = await readFile(new URL("../app/design-system/candidate-review.css", import.meta.url), "utf8");

  assert.match(css, /--canvas:\s*#f7f8fc\s*;/i);
  assert.match(css, /body\s*\{[\s\S]*?background:\s*var\(--canvas\)\s*;/i);
  assert.match(css, /--line:\s*rgba\(206,\s*220,\s*241,\s*0\.92\)\s*;/i);

  for (const token of [
    "--oluk-canvas: #f7f8fc",
    "--oluk-surface-card: #ffffff",
    "--oluk-surface-media: #f0f4fb",
    "--oluk-border-card: rgba(206, 220, 241, 0.92)",
    "--oluk-cobalt: #0057ff",
    "--oluk-inventory-green: #15803d",
    "--oluk-radius-compact: 20px",
    "--oluk-radius-vertical: 24px",
    "--oluk-radius-purchase: 28px",
    "--oluk-radius-horizontal: 34px",
  ]) {
    assert.match(candidateTokens, new RegExp(escapeRegExp(token)), token);
  }
  assert.match(candidateTokens, /--oluk-shadow-arc:\s*0 1px 3px rgba\(20, 24, 39, 0\.04\),\s*0 4px 12px rgba\(20, 24, 39, 0\.06\)\s*;/i);
  assert.match(candidateCss, /\.oluk-candidate-qualitative\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/i);
  assert.match(candidateCss, /@media \(max-width: 540px\)[\s\S]*?\.oluk-candidate-qualitative\s*\{\s*grid-template-columns:\s*1fr\s*;/i);
  assert.doesNotMatch(candidateCss, /overflow-x:\s*clip/i, "candidate review must not use page clipping as responsive evidence");
  assert.match(css, /body:has\(\.experience-lab--candidate-review\),\s*\.experience-lab--candidate-review\s*\{\s*overflow-x:\s*visible\s*;/i, "candidate route must expose real document overflow");
  assert.doesNotMatch(candidateCss, /linear-gradient/i, "candidate content planes remain white rather than inventing a page-level gradient");
  assert.doesNotMatch(candidateTokens, /shadow-content-plane/i, "the exact candidate Softform Arc remains the only card elevation recipe");

  assert.match(css, /\.hero-category-cards\s*>\s*a\s*\{[\s\S]*?border-radius:\s*20px\s*;/i);
  assert.match(css, /\.product-commerce-card\s*\{[\s\S]*?border-radius:\s*24px\s*;/i);
  assert.match(css, /\.purchase-panel\s*\{[\s\S]*?border-radius:\s*28px\s*;/i);
  assert.match(css, /\.horizontal-product-card\s*\{[\s\S]*?border-radius:\s*34px\s*;/i);

  for (const breakpoint of [1180, 960, 760, 540]) {
    assert.match(css, new RegExp(`@media \\(max-width: ${breakpoint}px\\)`), `${breakpoint}px breakpoint`);
  }

  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.hero-composition\s*\{[\s\S]*?grid-template-columns:\s*1fr\s*;/i);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.product-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr\s*;/i);
  assert.match(css, /@media \(max-width: 540px\)[\s\S]*?\.shell\s*\{[\s\S]*?padding-inline:\s*16px\s*;/i);
  assert.doesNotMatch(css, /prefers-color-scheme:\s*dark/i);
});

test("renders owner-review candidate anchors, direct Figma sources, and all comparison pages", async () => {
  const worker = await loadWorker();
  const reviewHtml = await renderHtml(worker, "/review");
  const reviewText = visibleText(reviewHtml);

  for (const anchor of candidateReviewAnchors) {
    assert.match(reviewHtml, new RegExp(`\\bid=["']${escapeRegExp(anchor)}["']`, "i"), `/review#${anchor}`);
  }

  for (const href of baselineRouteLinks) {
    assert.match(reviewHtml, new RegExp(`href=["']${escapeRegExp(href)}["']`), `baseline page link ${href}`);
  }

  for (const node of ["637:3", "646:10801", "646:10802", "639:13888", "643:8616", "639:13889", "641:17", "518:13092", "556:34627", "551:27148", "644:3", "644:568", "644:1093", "644:1625"]) {
    assert.match(reviewHtml, new RegExp(escapeRegExp(`node-id=${node.replace(":", "-")}`)), `Figma node ${node}`);
  }

  assert.match(reviewText, /CANDIDATE_CONVERGENCE_v0/);
  assert.match(reviewText, /UNPUBLISHED \/ HUMAN SELECTION REQUIRED/);
  assert.match(reviewText, /Adaptive champion selection remains open\./);
  assert.match(reviewHtml, /data-candidate-component=["']ProductCommerceCard\.vertical["']/i);
  assert.match(reviewHtml, /data-candidate-component=["']ProductCommerceCard\.Relation["']/i);
  assert.match(reviewHtml, /data-candidate-component=["']PurchasePanel["']/i);
  assert.match(reviewHtml, /data-candidate-component=["']AssuranceRail["']/i);
  assert.match(reviewHtml, /<button\b(?=[^>]*\bdisabled\b)[^>]*>Add to bag<\/button>/i, "static actions use native disabled-button semantics");
  assert.doesNotMatch(reviewHtml, /<span\b[^>]*\baria-disabled=/i, "button-like spans are not used for static controls");
});

test("keeps candidate fixtures typed and isolated from all customer routes", async () => {
  const worker = await loadWorker();
  const registry = await readFile(new URL("../app/design-system/contracts.ts", import.meta.url), "utf8");
  const experienceLab = await readFile(new URL("../app/experience-lab.tsx", import.meta.url), "utf8");
  const reviewPage = await readFile(new URL("../app/review/page.tsx", import.meta.url), "utf8");
  const primitives = await readFile(new URL("../app/design-system/candidate-primitives.tsx", import.meta.url), "utf8");
  const components = await readFile(new URL("../app/design-system/candidate-components.tsx", import.meta.url), "utf8");

  for (const field of ["authorityClass", "sourceRef", "runtimeOwner", "publicationState", "reviewOnly"]) {
    assert.match(registry, new RegExp(`\\b${field}\\b`), `fixture field ${field}`);
  }
  assert.match(registry, /reviewOnly:\s*true/g);
  assert.match(registry, /servings:\s*["']90 SERVINGS["']/);
  assert.doesNotMatch(registry, /90 CAPS(?:\b|ULES)/i);
  assert.equal((registry.match(/sourceRef:\s*"Figma AssuranceRail 556:34627/g) ?? []).length, 6, "every assurance claim has direct source provenance");
  assert.equal((registry.match(/runtimeOwner:\s*"openlab_runtime_later"/g) ?? []).length, 6, "every assurance claim has a future runtime owner");
  assert.doesNotMatch(experienceLab, /CandidateReviewIndex|CANDIDATE_CONVERGENCE_v0/, "customer route module must not import review fixtures");
  assert.match(reviewPage, /CandidateReviewIndex/, "review route owns the candidate import boundary");

  for (const primitive of ["OlukCanvas", "OlukSection", "OlukSurface", "OlukCard", "OlukMediaChamber", "OlukPurchasePlane", "OlukDivider", "OlukCanvasSplit"]) {
    assert.match(primitives, new RegExp(`export function ${primitive}\\b`), `candidate primitive ${primitive}`);
    assert.match(components + reviewPage + (await readFile(new URL("../app/design-system/candidate-review.tsx", import.meta.url), "utf8")), new RegExp(`<${primitive}\\b`), `candidate primitive usage ${primitive}`);
  }

  assert.match(components, /state === "out-of-stock" \? "Out of stock"/, "out-of-stock compact specimen cannot present Quick add");
  for (const state of ["default", "quantity-changed", "added", "unavailable", "out-of-stock", "disabled"]) {
    assert.match(components, new RegExp(`(?:\\"|')${escapeRegExp(state)}(?:\\"|')`), `PurchasePanel state ${state}`);
  }

  for (const [pathname] of customerRoutes) {
    const html = await renderHtml(worker, pathname);
    const text = visibleText(html);
    assert.doesNotMatch(html, /CANDIDATE_CONVERGENCE_v0|mf02b-selection-receipt/i, `${pathname} raw response imports review content`);
    assert.doesNotMatch(text, /CANDIDATE_CONVERGENCE_v0/i, pathname);
    assert.doesNotMatch(text, /HUMAN SELECTION REQUIRED/i, pathname);
    assert.doesNotMatch(text, /RUNTIME AUTHORITY NONE/i, pathname);
  }
});

test("normalizes exact candidate SVG geometry to the cobalt lineage", async () => {
  const assuranceDir = new URL("../public/assets/candidate/assurance/", import.meta.url);
  const files = (await readdir(assuranceDir)).filter((file) => file.endsWith(".svg"));
  assert.equal(files.length, 7);

  for (const file of files) {
    const svg = await readFile(new URL(file, assuranceDir), "utf8");
    assert.doesNotMatch(svg, /#808080|#1237D6/i, `${file} legacy grey or cobalt`);
    assert.match(svg, /#0057FF/i, `${file} candidate cobalt`);
  }
});
