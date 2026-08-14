import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { CUSTOMER_ROUTES } from "../app/design-system/site-route-data.mjs";

const routes = CUSTOMER_ROUTES.map(({ path, heading }) => [path, heading]);

const customerRoutes = routes.filter(([pathname]) => !["/review","/review-studio"].includes(pathname));

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
  "mf02b-related-rail",
  "mf02b-dossier",
  "mf02b-responsive-ledger",
  "baseline-routes",
  "mf02b-selection-receipt",
];

const baselineRouteLinks = routes.filter(([pathname])=>pathname!=="/review-studio").map(([pathname]) => pathname);

const stableCustomerReviewAnchors = [
  ["/", ["hero", "assurance", "compound-families", "featured-products", "openlab-records", "reviews", "related-products"]],
  ["/product/mk-2866", ["purchase", "dossier", "lab-records"]],
  ["/open-lab", ["embedded-evidence"]],
];

const forbiddenCustomerVocabulary = [
  /CANDIDATE(?: ·|_)? HUMAN REVIEW REQUIRED/i,
  /HUMAN_REVIEW_REQUIRED/i,
  /\bCONV-001\b/i,
  /\bMF01A ANATOMY\b/i,
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

test("server-renders all 52 governed routes with their expected headings and private indexing policy", async () => {
  assert.equal(routes.length, 52);
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
    "IN STOCK",
    "OPENLAB VERIFIED",
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

test("carries the approved MF01A anatomy into MF01–MF03 candidate surfaces", async () => {
  const worker = await loadWorker();

  const homeText = visibleText(await renderHtml(worker, "/"));
  for (const expected of [
    "Formulated. Verified. Batch tracked.",
    "Formulated to a higher standard.",
    "15 MG",
    "90 SERVINGS",
    ">99%",
    "£43",
  ]) {
    assert.match(homeText, new RegExp(escapeRegExp(expected)), `homepage decision truth: ${expected}`);
  }
  assert.doesNotMatch(homeText, /90 CAPS(?:\b|ULES)/i);
  assert.match(homeText, /Third-Party Tested/i, "approved trust statement remains visible");
  assert.match(homeText, /direct access to available lab records/i, "LockedHero carries production-promotable customer copy");

  const shopHtml = await renderHtml(worker, "/shop");
  assert.match(shopHtml, /data-component=["']ProductCommerceCard\.compact["']/i, "Shop renders canonical Compact card instances throughout the grid");
  assert.match(shopHtml, /class=["'][^"']*shop-result-card-canonical[^"']*["']/i, "Shop exposes the canonical catalogue-result selector");

  const openLabText = visibleText(await renderHtml(worker, "/open-lab"));
  for (const lens of ["OpenLab portal", "OpenLab archive", "Research Chemicals", "Live batch verification feed"]) {
    assert.match(openLabText, new RegExp(escapeRegExp(lens)), `OpenLab lens: ${lens}`);
  }

  const routeSource = await readFile(new URL("../app/customer-routes.tsx", import.meta.url), "utf8");
  const heroSource = await readFile(new URL("../app/design-system/locked-home-hero.tsx", import.meta.url), "utf8");
  const pdpSource = await readFile(new URL("../app/design-system/pdp-first-fold.tsx", import.meta.url), "utf8");
  const openLabSource = await readFile(new URL("../app/design-system/openlab-hero-light.tsx", import.meta.url), "utf8");
  const homeHero = routeSource.match(/export function HomeRoute\(\)[\s\S]*?\n}\n\nexport function ProductRoute/)?.[0] ?? "";
  assert.match(heroSource, /data-figma-node="1155:29963"/, "homepage uses the locked Direction D authority node");
  assert.match(heroSource, /data-figma-stage-node="462:4684"/, "homepage stage uses the authored 5-3-1 media intent");
  assert.match(pdpSource, /data-figma-node="1155:30632"/, "PDP first fold uses the corrected authority node");
  assert.match(openLabSource, /data-figma-node="614:75995"/, "OpenLab uses the HeroLight authority node");
  assert.match(homeHero, /<LockedHomeHero\b/, "homepage uses the corrected LockedHero implementation");
  assert.doesNotMatch(homeHero, /<ProductCommerceCard\b/, "homepage hero is not wrapped in a later-board card component");
});

test("locks the unpublished candidate foundation with CONV-002 graduated tokens and media gradient", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const headerCss = await readFile(new URL("../app/design-system/site-header.module.css", import.meta.url), "utf8");
  const candidateTokens = await readFile(new URL("../app/design-system/candidate-tokens.css", import.meta.url), "utf8");
  const candidateCss = await readFile(new URL("../app/design-system/candidate-review.css", import.meta.url), "utf8");
  const candidateComponents = await readFile(new URL("../app/design-system/candidate-components.tsx", import.meta.url), "utf8");
  const candidateReview = await readFile(new URL("../app/design-system/candidate-review.tsx", import.meta.url), "utf8");
  const sharedCard = await readFile(new URL("../app/design-system/product-commerce-card.tsx", import.meta.url), "utf8");
  const sharedMediaCss = await readFile(new URL("../app/design-system/product-media-chamber.module.css", import.meta.url), "utf8");

  const foundationSource = candidateReview.match(/function FoundationSpecimen\(\)[\s\S]*?\n}\n\nfunction ProvenanceGate/)?.[0] ?? "";
  const colourRolesSource = foundationSource.match(/const colourRoles = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
  assert.match(foundationSource, /OLUK candidate foundation convergence/);
  assert.match(foundationSource, /A normalization layer for MF-01A through MF-03 relationships\. It is not promoted design-system authority\./);
  assert.equal((foundationSource.match(/data-foundation-section=/g) ?? []).length, 5, "FC-01 keeps all five governing sections");
  assert.equal((colourRolesSource.match(/^\s*\["/gm) ?? []).length, 22, "FC-01 exposes all 22 current colour roles");
  for (const section of ["01 · COLOR", "02 · TYPOGRAPHY", "03 · SHAPE + ELEVATION", "04 · SURFACE RELATIONSHIPS", "05 · CANDIDATE GATE"]) {
    assert.match(foundationSource, new RegExp(escapeRegExp(section)), section);
  }
  for (const status of ["112 LOCAL VARIABLES", "HIDDEN FROM PUBLISHING", "HUMAN SELECTION PENDING", "RUNTIME AUTHORITY: NONE"]) {
    assert.match(foundationSource, new RegExp(escapeRegExp(status)), status);
  }
  assert.match(foundationSource, /DISPLAY · PLUS JAKARTA SANS EXTRABOLD/);
  assert.match(foundationSource, /BODY \+ UI · INTER VARIABLE/);
  for (const scale of ["18 / 28", "16 / 24", "15 / 22", "12 / 16"]) {
    assert.match(foundationSource, new RegExp(escapeRegExp(scale)), `body scale ${scale}`);
  }
  for (const density of ["20px", "24px", "28px", "34px", "12 / 5 / .09", "60 / 24 / .10", "50 / 20 / .18", "25 / 12 / .12"]) {
    assert.match(foundationSource, new RegExp(escapeRegExp(density)), `density specimen ${density}`);
  }
  for (const relationship of ["BOUNDED MEDIA CHAMBER", "INDEPENDENT EDITORIAL PLANE", "SOLE INVERSE SURFACE"]) {
    assert.match(foundationSource, new RegExp(relationship), relationship);
  }
  assert.equal((foundationSource.match(/<li>/g) ?? []).length, 5, "candidate gate keeps five guardrails");

  assert.match(css, /--canvas:\s*#f7f8fc\s*;/i);
  assert.match(css, /body\s*\{[\s\S]*?background:\s*var\(--canvas\)\s*;/i);
  assert.match(css, /--line:\s*rgba\(206,\s*220,\s*241,\s*0\.92\)\s*;/i);

  for (const token of [
    "--oluk-canvas: #f7f8fc",
    "--oluk-surface-card: #ffffff",
    "--oluk-surface-family: #f8fafc",
    "--oluk-surface-media: #f0f4fb",
    "--oluk-border-card: rgba(206, 220, 241, 0.92)",
    "--oluk-border-chip: #d4e0f2",
    "--oluk-border-outer: #becfe9",
    "--oluk-border-identity: #bdd0f1",
    "--oluk-border-inner: #b4caf0",
    "--oluk-border-family-bg: #d9e3f1",
    "--oluk-text-chip-value: #17213f",
    "--oluk-cobalt: #0057ff",
    "--oluk-cobalt-alt: #0057ff",
    "--oluk-ink-dark: #344054",
    "--oluk-status-error: #b42318",
    "--oluk-status-error-soft: #fef3f2",
    "--oluk-status-warning: #b54708",
    "--oluk-status-unavailable-soft: #f4f5f7",
    "--oluk-status-disabled: #9ca3af",
    "--oluk-stock-in-stock: var(--oluk-cobalt)",
    "--oluk-stock-in-stock-soft: var(--oluk-surface-cobalt-soft)",
    "--oluk-status-success: #15803d",
    "--oluk-radius-compact: 20px",
    "--oluk-radius-vertical: 24px",
    "--oluk-radius-purchase: 28px",
    "--oluk-radius-horizontal: 34px",
    "--oluk-type-chip-label: 11px",
    "--oluk-page-padding: 64px",
    "--oluk-section-gap: 32px",
  ]) {
    assert.match(candidateTokens, new RegExp(escapeRegExp(token)), token);
  }
  for (const token of [
    "--oluk-shadow-compact: 0 5px 12px rgba(15, 26, 51, 0.09)",
    "--oluk-shadow-card: 0 24px 60px rgba(15, 26, 51, 0.1)",
    "--oluk-shadow-purchase: 0 20px 50px rgba(15, 26, 51, 0.18)",
    "--oluk-shadow-relation: 0 12px 25px rgba(15, 26, 51, 0.12)",
  ]) {
    assert.match(candidateTokens, new RegExp(escapeRegExp(token)), token);
  }
  assert.doesNotMatch(candidateTokens, /shadow-arc/i, "archived two-layer elevation must not remain active");
  assert.match(candidateTokens, /--oluk-media-gradient:\s*linear-gradient\(70deg,\s*#f8fbff\s+5%,\s*#e4ecfa\s+100%\)/i, "media gradient token must use MF-01A diagonal stops");
  assert.match(candidateTokens, /--oluk-media-contact-shelf-gradient:\s*linear-gradient\(180deg,\s*#ffffff\s+0%,\s*#e6edfa\s+100%\)/i, "contact shelf token must use the second governed MF-01A gradient");
  assert.match(candidateCss, /\.oluk-card--compact\s*\{[^}]*box-shadow:\s*var\(--oluk-shadow-compact\)/i);
  assert.match(candidateCss, /\.oluk-card--vertical,[\s\S]*?\.oluk-card--featured\s*\{[^}]*box-shadow:\s*var\(--oluk-shadow-card\)/i);
  assert.match(candidateCss, /\.oluk-card--purchase\s*\{[^}]*box-shadow:\s*var\(--oluk-shadow-purchase\)/i);
  assert.match(candidateCss, /\.oluk-canvas-split\s*\{[^}]*box-shadow:\s*var\(--oluk-shadow-relation\)/i);
  assert.match(candidateCss, /\.oluk-candidate-foundation-swatches\s*\{[^}]*grid-template-columns:\s*repeat\(5, minmax\(0, 1fr\)\)/i, "FC-01 renders the authored five-column colour specimen");
  assert.match(candidateCss, /\.oluk-candidate-foundation-density-grid \[data-elevation="compact"\][^}]*var\(--oluk-shadow-compact\)/i);
  assert.match(candidateCss, /\.oluk-candidate-foundation-density-grid \[data-elevation="card"\][^}]*var\(--oluk-shadow-card\)/i);
  assert.match(candidateCss, /\.oluk-candidate-foundation-density-grid \[data-elevation="purchase"\][^}]*var\(--oluk-shadow-purchase\)/i);
  assert.match(candidateCss, /\.oluk-candidate-foundation-density-grid \[data-elevation="relation"\][^}]*var\(--oluk-shadow-relation\)/i);
  assert.match(candidateCss, /\.oluk-candidate-foundation-embedded > i\s*\{[^}]*background:\s*var\(--oluk-cobalt\)/i, "embedded relationship uses its cobalt relational mark");
  assert.match(candidateCss, /\.oluk-candidate-foundation-canvas-split\s*\{[^}]*background:\s*var\(--oluk-canvas\)/i, "independent planes expose true canvas");
  assert.match(candidateCss, /\.oluk-candidate-foundation-inverse\s*\{[^}]*background:\s*var\(--oluk-inverse\)/i, "footer-only inverse specimen is explicit");
  assert.match(candidateCss, /\.oluk-candidate-qualitative\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/i);
  assert.doesNotMatch(candidateCss, /@media \(max-width: 540px\)[\s\S]*?\.oluk-candidate-qualitative\s*\{\s*grid-template-columns:\s*1fr\s*;/i, "mobile keeps the MF-01A 2x2 chip grammar");
  assert.doesNotMatch(candidateCss, /overflow-x:\s*clip/i, "candidate review must not use page clipping as responsive evidence");
  assert.match(css, /body:has\(\.experience-lab--candidate-review\),\s*\.experience-lab--candidate-review\s*\{\s*overflow-x:\s*visible\s*;/i, "candidate route must expose real document overflow");

  assert.match(sharedMediaCss, /\.chamber\s*\{[^}]*background:\s*var\(--oluk-media-gradient/i, "shared candidate chamber must use the MF-01A atmospheric gradient, not a solid fill");
  assert.match(candidateComponents, /export \{ ProductCommerceCard \} from "\.\/product-commerce-card"/, "the compatibility registry re-exports the canonical card");
  assert.match(sharedCard, /import \{ ProductMediaChamber \}/, "canonical cards import the shared authored chamber");
  assert.ok((sharedCard.match(/<ProductMediaChamber\b/g) ?? []).length >= 3, "canonical vertical, featured, compact and relation compositions reuse ProductMediaChamber");
  assert.doesNotMatch(candidateComponents, /function (?:ProductCommerceCard|CompactCard|RelationCard|MetricRail|QualitativeChips|PurchasePanel)/, "candidate registry contains no parallel component anatomy");
  assert.match(candidateReview, /<ProductCommerceCard[\s\S]*?showQualitative=\{false\}[\s\S]*?variant="compact"/, "compact review uses canonical anatomy without the omitted chip block");
  assert.match(sharedMediaCss, /\.halo\s*\{[^}]*rgba\(255,\s*255,\s*255,\s*0\.98\)[^}]*inset/i, "shared candidate chamber preserves the luminous halo");
  assert.match(sharedMediaCss, /\.identityPane\s*\{(?=[^}]*var\(--oluk-border-identity)(?=[^}]*rgba\(255,\s*255,\s*255,\s*0\.42\))[^}]*\}/i, "shared candidate chamber preserves the identity pane");
  assert.match(sharedMediaCss, /\.contactShelf\s*\{[\s\S]*?var\(\s*--oluk-media-contact-shelf-gradient[\s\S]*?var\(--oluk-border-inner[\s\S]*?\}/i, "shared candidate chamber preserves the contact shelf");
  assert.match(candidateCss, /\.oluk-card--vertical,[\s\S]*?\.oluk-card--featured\s*\{[^}]*border-color:\s*var\(--oluk-border-outer\)/i, "Vertical and Featured outer wrappers use border/outer");
  assert.match(candidateCss, /\.oluk-candidate-series\s*\{[^}]*border:[^;]*var\(--oluk-border-family-bg\)[^}]*background:\s*var\(--oluk-surface-family\)/i, "family markers use the MF-01A family surface hierarchy");
  assert.doesNotMatch(candidateCss, /\.oluk-candidate-content-plane[\s\S]*?linear-gradient/i, "content planes remain white rather than inventing a gradient");
  assert.doesNotMatch(candidateTokens, /shadow-content-plane/i, "nested content planes do not create a second card elevation");

  assert.match(candidateCss, /\.oluk-candidate-qualitative > div\s*\{[\s\S]*?border:[^;]*var\(--oluk-border-chip\)/i, "chip containers must use border/chip, not generic border/card");
  assert.match(candidateCss, /\.oluk-candidate-qualitative dt\s*\{[^}]*font-size:\s*var\(--oluk-type-chip-label\)/i, "chip labels must use 11px chip-label token, not 12px eyebrow");
  assert.match(candidateCss, /\.oluk-candidate-qualitative dd\s*\{[^}]*color:\s*var\(--oluk-text-chip-value\)/i, "chip values must use text/chip-value (#17213F), not text/primary");

  assert.equal((css.match(/background:\s*var\(--inverse\)\s*;/gi) ?? []).length, 1, "footer is the sole inverse surface");
  assert.match(headerCss, /\.trustRail\s*\{[^}]*background:\s*var\(--white\)\s*;/i, "OptionB trust rail remains light");
  assert.match(css, /\.product-commerce-card\s*\{[\s\S]*?box-shadow:\s*var\(--shadow-card\)\s*;/i);
  assert.match(css, /\.purchase-panel\s*\{[\s\S]*?box-shadow:\s*var\(--shadow-purchase\)\s*;/i);
  assert.match(css, /\.horizontal-product-card\s*\{[\s\S]*?box-shadow:\s*var\(--shadow-relation\)\s*;/i);

  assert.match(css, /\.hero-category-cards\s*>\s*a\s*\{[\s\S]*?border-radius:\s*20px\s*;/i);
  assert.match(css, /\.product-commerce-card\s*\{[\s\S]*?border-radius:\s*24px\s*;/i);
  assert.match(css, /\.purchase-panel\s*\{[\s\S]*?border-radius:\s*28px\s*;/i);
  assert.match(css, /\.horizontal-product-card\s*\{[\s\S]*?border-radius:\s*34px\s*;/i);

  for (const breakpoint of [1180, 960, 760, 540]) {
    assert.match(css, new RegExp(`@media \\(max-width: ${breakpoint}px\\)`), `${breakpoint}px breakpoint`);
  }

  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.hero-composition\s*\{[\s\S]*?grid-template-columns:\s*1fr\s*;/i);
  assert.match(css, /@media \(max-width: 960px\)[\s\S]*?\.product-decision-hero\s*\{[\s\S]*?grid-template-columns:\s*1fr\s*;/i);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.product-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr\s*;/i);
  assert.match(css, /@media \(max-width: 540px\)[\s\S]*?\.shell\s*\{[\s\S]*?padding-inline:\s*16px\s*;/i);
  assert.doesNotMatch(css, /prefers-color-scheme:\s*dark/i);
});

test("adopts the MF-01A qualitative-chip and media grammar on customer routes", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const cardSource = await readFile(new URL("../app/design-system/product-commerce-card.tsx", import.meta.url), "utf8");
  const chipSource = await readFile(new URL("../app/design-system/qualitative-chip.tsx", import.meta.url), "utf8");
  const metricRailSource = await readFile(new URL("../app/design-system/metric-rail.tsx", import.meta.url), "utf8");
  const iconSource = await readFile(new URL("../app/design-system/qualitative-icon.tsx", import.meta.url), "utf8");
  const mediaSource = await readFile(new URL("../app/design-system/product-media-chamber.tsx", import.meta.url), "utf8");
  const mediaCss = await readFile(new URL("../app/design-system/product-media-chamber.module.css", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const worker = await loadWorker();
  const productHtml = await renderHtml(worker, "/product/mk-2866");

  for (const token of [
    "--oluk-surface-family: #f8fafc",
    "--oluk-border-chip: #d4e0f2",
    "--oluk-border-outer: #becfe9",
    "--oluk-border-identity: #bdd0f1",
    "--oluk-border-inner: #b4caf0",
    "--oluk-border-family-bg: #d9e3f1",
    "--oluk-text-chip-value: #17213f",
    "--oluk-media-gradient: linear-gradient(70deg, #f8fbff 5%, #e4ecfa 100%)",
    "--oluk-media-contact-shelf-gradient: linear-gradient(180deg, #ffffff 0%, #e6edfa 100%)",
  ]) {
    assert.match(css, new RegExp(escapeRegExp(token)), `customer token ${token}`);
  }

  assert.match(chipSource, /export function QualitativeChip\(/, "customer chips use a reusable component");
  assert.match(chipSource, /<QualitativeIcon kind=\{kind\} \/>/, "customer chips use the mapped qualitative icon component");
  assert.match(chipSource, /<ul[^>]*aria-label=\{label\}[^>]*>[\s\S]*?<QualitativeChip\b/, "customer chip collection renders independent component instances");
  for (const kind of ["class", "form", "quality", "tested"]) {
    assert.match(iconSource, new RegExp(`/assets/candidate/qualitative/${kind}\\.svg`), `${kind} chip uses its authored semantic SVG`);
  }
  assert.match(cardSource, /<ProductMediaChamber\b/, "customer cards use the shared authored media chamber");
  assert.match(mediaSource, /data-authored-layers="outer-gradient luminous-halo identity-pane contact-shelf product"/, "shared media chamber exposes the complete authored layer contract");
  assert.match(mediaSource, /className=\{classes\(styles\.contactShelf, "oluk-product-media-chamber__contact-shelf"\)\}/, "shared media chamber owns the contact-shelf layer");
  assert.doesNotMatch(cardSource, /className="media-orbit"/, "the invented circular orbit is removed from Vertical and Featured customer cards");
  assert.match(layout, /@fontsource-variable\/inter/, "Inter Variable is loaded from the package-local variable font");
  assert.doesNotMatch(layout, /@fontsource\/inter\//, "static Inter weights are no longer imported");

  assert.match(css, /\.product-commerce-card\s*\{[^}]*border:\s*1px solid var\(--oluk-border-outer\)/i, "customer cards use the MF-01A outer-wrapper border");
  assert.match(mediaCss, /\.chamber\s*\{[^}]*background:\s*var\(--oluk-media-gradient/i, "bounded product chambers use the governed MF-01A gradient");
  assert.doesNotMatch(mediaCss, /radial-gradient/i, "product chambers do not layer an invented radial fill over the governed gradient");
  assert.match(mediaCss, /\.halo\s*\{[^}]*rgba\(255,\s*255,\s*255,\s*0\.98\)[^}]*inset/i, "customer chambers restore the luminous halo");
  assert.match(mediaCss, /\.identityPane\s*\{(?=[^}]*var\(--oluk-border-identity)(?=[^}]*rgba\(255,\s*255,\s*255,\s*0\.42\))[^}]*\}/i, "customer chambers restore the identity pane");
  assert.match(mediaCss, /\.contactShelf\s*\{[\s\S]*?var\(\s*--oluk-media-contact-shelf-gradient[\s\S]*?var\(--oluk-border-inner[\s\S]*?\}/i, "customer chambers restore the contact shelf");
  assert.match(css, /\.product-commerce-card \.product-series\s*\{(?=[^}]*var\(--oluk-surface-family\))(?=[^}]*var\(--oluk-border-family-bg\))[^}]*\}/i, "customer family marker uses the MF-01A family surface and border");
  assert.match(css, /\.metric-rail\s*\{[^}]*border:\s*1px solid var\(--line-strong\)[^}]*gap:\s*0[^}]*overflow:\s*hidden/i, "customer MetricRail is a joined bordered rail, not generic pills");
  assert.match(css, /\.metric-rail > div \+ div\s*\{[^}]*border-left:\s*1px solid var\(--line-strong\)/i, "customer MetricRail uses governed internal dividers");
  assert.match(metricRailSource, /data-fit=\{metricFit\(value\)\}/, "MetricRail exposes deterministic per-value fitting");
  assert.match(metricRailSource, /quantifiedValue\(metrics\.servings, "SERVINGS"\)/, "MetricRail separates the serving value from its label");
  assert.match(css, /\.metric-rail \[data-fit="medium"\] dt\s*\{[^}]*font-size:\s*15px/i, "MetricRail has a bounded medium-value fit");
  assert.match(css, /\.metric-rail \[data-fit="long"\] dt\s*\{[^}]*font-size:\s*13px[^}]*white-space:\s*normal/i, "MetricRail has a bounded long-value fit without sibling collision");
  assert.match(css, /\.qualitative-chips\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/i, "qualitative attributes form a 2x2 responsive grid");
  assert.match(css, /\.qualitative-chip\s*\{[^}]*background:\s*var\(--white\)[^}]*border:\s*1px solid var\(--oluk-border-chip\)[^}]*border-radius:\s*10px/i, "every qualitative chip is an independent MF-01A container");
  assert.match(css, /\.qualitative-chip dt\s*\{[^}]*color:\s*var\(--ink-muted\)[^}]*font-size:\s*11px[^}]*font-weight:\s*500[^}]*letter-spacing:\s*0\.66px[^}]*text-transform:\s*uppercase/i, "chip labels preserve the 11px Medium muted uppercase hierarchy");
  assert.match(css, /\.qualitative-chip dd\s*\{[^}]*color:\s*var\(--oluk-text-chip-value\)[^}]*font-size:\s*12px[^}]*font-weight:\s*700[^}]*letter-spacing:\s*0\.24px/i, "chip values preserve the 12px Bold navy hierarchy");
  assert.doesNotMatch(css, /\.qualitative-chips\s*>\s*div\s*\+\s*div/, "the rejected joined-rail divider pattern is absent");

  assert.match(productHtml, /<ul(?=[^>]*\bclass=["'][^"']*\bqualitative-chips\b[^"']*["'])(?=[^>]*\baria-label=["']Product attributes["'])[^>]*>/i, "rendered product route exposes the qualitative attribute list");
  assert.equal((productHtml.match(/<li\b[^>]*\bclass=["'][^"']*\bqualitative-chip\b[^"']*["'][^>]*>/gi) ?? []).length >= 4, true, "rendered product route includes independent qualitative-chip instances");
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

  for (const [pathname, anchors] of stableCustomerReviewAnchors) {
    const html = await renderHtml(worker, pathname);
    for (const anchor of anchors) {
      assert.match(html, new RegExp(`\\bid=["']${escapeRegExp(anchor)}["']`, "i"), `${pathname}#${anchor}`);
    }
  }

  for (const node of ["637:3", "732:2897", "742:50", "743:50", "743:281", "743:520", "745:50", "732:2902", "732:2912", "752:167", "753:18136", "750:182", "737:50", "737:159", "737:264", "739:50", "764:50", "765:50", "766:50", "767:50", "870:72", "871:50", "872:445", "875:1094", "921:2703", "921:2717", "921:2724"]) {
    assert.match(reviewHtml, new RegExp(escapeRegExp(`node-id=${node.replace(":", "-")}`)), `Figma node ${node}`);
  }

  assert.match(reviewText, /CONV-004 \/ CANDIDATE_CONVERGENCE_v0/);
  assert.match(reviewText, /RECONCILIATION DELTA \/ HUMAN_REVIEW_REQUIRED/);
  assert.match(reviewText, /RUNTIME AUTHORITY NONE/);
  assert.match(reviewText, /Thirty-one governed candidate surfaces\./);
  assert.match(reviewText, /Rendered surface approval remains open\./);
  assert.match(reviewText, /DEC-TYPE-FLOOR-001 controls a 12px metadata and 15–16px body floor/i);
  assert.match(reviewHtml, /data-component=["']ProductCommerceCard\.vertical["']/i);
  assert.match(reviewHtml, /data-component=["']ProductCommerceCard\.Relation["']/i);
  assert.match(reviewHtml, /data-component=["']PurchasePanel["']/i);
  assert.match(reviewHtml, /data-component=["']AssuranceRail["']/i);
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
  assert.equal((registry.match(/sourceRef:\s*"Figma AssuranceRail 752:167/g) ?? []).length, 6, "every assurance claim has direct source provenance");
  assert.equal((registry.match(/runtimeOwner:\s*"openlab_runtime_later"/g) ?? []).length, 6, "every assurance claim has a future runtime owner");
  assert.doesNotMatch(experienceLab, /CandidateReviewIndex|CANDIDATE_CONVERGENCE_v0/, "customer route module must not import review fixtures");
  assert.match(reviewPage, /CandidateReviewIndex/, "review route owns the candidate import boundary");

  for (const primitive of ["OlukCanvas", "OlukSection"]) {
    assert.match(primitives, new RegExp(`export function ${primitive}\\b`), `candidate primitive ${primitive}`);
    assert.match(components + reviewPage + (await readFile(new URL("../app/design-system/candidate-review.tsx", import.meta.url), "utf8")), new RegExp(`<${primitive}\\b`), `candidate primitive usage ${primitive}`);
  }
  for (const historicalPrimitive of ["OlukSurface", "OlukCard", "OlukPurchasePlane", "OlukDivider", "OlukCanvasSplit", "OlukMediaChamber"]) {
    assert.match(primitives, new RegExp(`export function ${historicalPrimitive}\\b`), `historical candidate primitive ${historicalPrimitive} remains available`);
  }
  assert.match(primitives, /export function OlukMediaChamber\b/, "historical candidate primitive remains available without controlling card composition");
  assert.doesNotMatch(components, /<OlukMediaChamber\b/, "candidate cards use ProductMediaChamber instead of the parallel historical primitive");

  assert.doesNotMatch(components, /export function (?:ProductCommerceCard|PurchasePanel|MetricRail|EvidenceStatus|AssuranceRail|RelationCard)/, "owner review has no parallel canonical anatomy definitions");
  assert.match(components, /export \{ ProductCommerceCard \} from "\.\/product-commerce-card"/, "owner review compatibility registry re-exports canonical ProductCommerceCard");
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
