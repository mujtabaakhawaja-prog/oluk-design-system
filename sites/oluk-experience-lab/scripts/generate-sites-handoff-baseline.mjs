#!/usr/bin/env node

/**
 * Serialize the consumer handoff from the reconciled Sites source.
 *
 * The output is deliberately a source attestation, not a runtime-release or
 * customer-adoption assertion.  It binds the 73-pattern ledger to the actual
 * shared primitives and family modules that a Shopper implementation must
 * consume without inventing a parallel visual system.
 */

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(siteRoot, "../..");
const outputDirectory = path.join(repositoryRoot, "authority/handoffs/OLUK_SITES_HANDOFF_BASELINE_V2");
const outputPath = path.join(outputDirectory, "OLUK_SITES_HANDOFF_BASELINE_V2.json");
const readmePath = path.join(outputDirectory, "README.md");
const readRepository = (relativePath) => readFile(path.join(repositoryRoot, relativePath), "utf8");
const readSite = (relativePath) => readFile(path.join(siteRoot, relativePath), "utf8");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const stringify = (value) => `${JSON.stringify(value, null, 2)}\n`;

const sourceSlice = Object.freeze({
  branch: "codex/oluk-sites-reconciliation-w05",
  commit: "7fc8bcd46e5d9ffa3489455ecd7b04f14d6ba9a0",
  role: "first reconciled, code-native Sites vertical slice",
});

const compositionReference = Object.freeze({
  worktree: "/Users/mujtabakhawaja/Worktrees/oluk-champion-integration",
  commit: "4d697e180300a6381d96ca50c2e80b27894f25de",
  role: "primary visual and customer-composition authority",
});

const historicalCandidate = Object.freeze({
  commit: "02185547c2409b2ca4cf8acc882c6051b3b6a846",
  tag: "OLUK_SITES_HANDOFF_BASELINE_V1",
  role: "historical candidate evidence only; never a substitute for reconciled source",
});

const sharedPrimitives = Object.freeze([
  { id: "site-header", source: "app/design-system/site-header.tsx", responsibility: "shell, navigation, account and bag access" },
  { id: "action-control", source: "app/design-system/action-control.tsx", responsibility: "canonical action anatomy and native semantics" },
  { id: "surface-grid", source: "app/design-system/surface-grid.tsx", responsibility: "page grid and surface zones" },
  { id: "content-surfaces", source: "app/design-system/content-surfaces.tsx", responsibility: "editorial, decision, technical and transaction surfaces" },
  { id: "product-commerce-card", source: "app/design-system/product-commerce-card.tsx", responsibility: "customer product identity, metric, availability and action composition" },
  { id: "product-media-chamber", source: "app/design-system/product-media-chamber.tsx", responsibility: "bounded product-local media atmosphere" },
  { id: "metric-rail", source: "app/design-system/metric-rail.tsx", responsibility: "quantified product truth; never generic chips" },
  { id: "purchase-panel", source: "app/design-system/purchase-panel.tsx", responsibility: "decision anatomy without local cart authority" },
  { id: "stock-pill", source: "app/design-system/product-status.tsx", responsibility: "Woo/C2-backed availability presentation" },
  { id: "evidence-status", source: "app/design-system/product-status.tsx", responsibility: "separate OpenLab evidence state" },
  { id: "locked-home-hero", source: "app/design-system/locked-home-hero.tsx", responsibility: "5-3-1 homepage selection and history-safe interaction" },
  { id: "pdp-first-fold", source: "app/design-system/pdp-first-fold.tsx", responsibility: "PDP media and purchase exception surface" },
  { id: "product-dossier", source: "app/design-system/product-dossier.tsx", responsibility: "PDP source, tabs and technical disclosure grammar" },
  { id: "openlab-sections", source: "app/design-system/openlab-sections.tsx", responsibility: "evidence and record-bound explanatory modules" },
  { id: "transaction-presentation", source: "app/design-system/transaction-presentation.tsx", responsibility: "quiet lifecycle presentation; no payment execution" },
]);

const familySources = Object.freeze({
  homepage: ["app/experience-lab.tsx", "app/design-system/locked-home-hero.tsx", "app/design-system/site-header.tsx"],
  catalogue_search_collections: ["app/customer-routes.tsx", "app/design-system/shop-discovery.tsx", "app/design-system/product-commerce-card.tsx"],
  product_detail: ["app/product/[slug]/page.tsx", "app/design-system/pdp-first-fold.tsx", "app/design-system/product-dossier.tsx"],
  bag_checkout: ["app/bag/page.tsx", "app/checkout/[stage]/page.tsx", "app/design-system/transaction-presentation.tsx"],
  complete_payment: ["app/checkout/order-pay/page.tsx", "app/checkout/payment-handoff/page.tsx", "app/design-system/transaction-presentation.tsx"],
  post_purchase: ["app/order/order-status-page.tsx", "app/design-system/post-purchase-surface.tsx", "app/design-system/transaction-presentation.tsx"],
  openlab_portal: ["app/open-lab/page.tsx", "app/design-system/openlab-frontier.tsx", "app/design-system/openlab-sections.tsx"],
  openlab_archive: ["app/lab-reports/page.tsx", "app/open-lab/records/page.tsx", "app/design-system/openlab-sections.tsx"],
  openlab_product_record: ["app/open-lab/[tool]/page.tsx", "app/design-system/openlab-product-experience.tsx"],
  openlab_report_viewer: ["app/open-lab/[tool]/page.tsx", "app/design-system/openlab-authority.ts"],
  openlab_methodology_compare_evidenceos: ["app/open-lab/methodology/page.tsx", "app/open-lab/source-chain/page.tsx", "app/open-lab/compare/page.tsx"],
  openlab_frontier_content: ["app/open-lab/[tool]/page.tsx", "app/design-system/openlab-frontier.tsx"],
  decision_tools: ["app/open-lab/[tool]/page.tsx", "app/design-system/your-stack-builder.tsx"],
  support_content: ["app/customer-routes.tsx", "app/design-system/support-surface.tsx"],
  account: ["app/account/page.tsx", "app/account/[surface]/page.tsx", "app/design-system/frontier-sections.tsx"],
  governance_review: ["app/review/page.tsx", "app/open-lab/admin/page.tsx"],
  shared_shell: ["app/not-found.tsx", "app/design-system/site-header.tsx"],
});

const mobileContracts = Object.freeze([
  { primitive: "locked-home-hero", source: "app/design-system/locked-home-hero.module.css", behavior: "desktop 5-3-1 field recomposes into selected-product first decision sequence" },
  { primitive: "site-header", source: "app/design-system/site-header.module.css", behavior: "desktop navigation becomes labelled modal mobile navigation" },
  { primitive: "product-commerce-card", source: "app/design-system/product-commerce-card.module.css", behavior: "media, identity, metric rail and actions retain declared semantic order" },
  { primitive: "pdp-first-fold", source: "app/design-system/pdp-first-fold.module.css", behavior: "media and purchase remain the explicit first-fold surface-law exception" },
  { primitive: "openlab-sections", source: "app/design-system/openlab-sections.module.css", behavior: "record density compacts without becoming dashboard-card stacks" },
  { primitive: "transaction-presentation", source: "app/transaction-presentation.module.css", behavior: "quiet transaction hierarchy preserves current-state priority" },
]);

const requiredAvailability = Object.freeze([
  "--oluk-stock-in-stock: var(--oluk-cobalt)",
  "--oluk-stock-in-stock-soft: var(--oluk-surface-cobalt-soft)",
  "data-oluk-status-kind=\"availability\"",
  "data-oluk-status-kind=\"evidence\"",
]);

const [tokenCss, routeLedgerRaw, templateCatalogueRaw, layoutSource, statusSource, heroSource] = await Promise.all([
  readSite("app/design-system/candidate-tokens.css"),
  readRepository("authority/SITE-ROUTE-LEDGER.json"),
  readRepository("authority/SITE-TEMPLATE-COMPOSITION-CATALOGUE.json"),
  readSite("app/layout.tsx"),
  readSite("app/design-system/product-status.tsx"),
  readSite("app/design-system/locked-home-hero.tsx"),
]);

const ledger = JSON.parse(routeLedgerRaw);
const templateCatalogue = JSON.parse(templateCatalogueRaw);
const tokenDeclarations = [...tokenCss.matchAll(/(^|\n)\s*(--oluk-[\w-]+)\s*:/g)].map((match) => match[2]);
const uniqueTokenDeclarations = [...new Set(tokenDeclarations)].sort();

if (ledger.routes.length !== 73) throw new Error(`Expected 73 canonical route patterns, found ${ledger.routes.length}`);
if (templateCatalogue.routes.length !== 73) throw new Error("Template catalogue must cover every canonical route pattern");
if (uniqueTokenDeclarations.length !== 128) throw new Error(`Expected 128 unique OLUK declarations, found ${uniqueTokenDeclarations.length}`);
if (!layoutSource.includes('@fontsource-variable/inter') || !layoutSource.includes('@fontsource/plus-jakarta-sans/800.css')) {
  throw new Error("The actual Sites font-loading contract is incomplete");
}
if (!requiredAvailability.every((needle) => `${tokenCss}\n${statusSource}`.includes(needle))) {
  throw new Error("Availability and evidence semantics are not separated in source");
}
if (!heroSource.includes("data-home-family=\"locked-5-3-1\"")) {
  throw new Error("The reconciled 5-3-1 homepage source is not present");
}

for (const primitive of sharedPrimitives) await readSite(primitive.source);
for (const paths of Object.values(familySources)) for (const source of paths) await readSite(source);
for (const contract of mobileContracts) await readSite(contract.source);

const routeManifest = ledger.routes.map((route) => ({
  id: route.id,
  path: route.path,
  family: route.family,
  disposition: route.disposition,
  maturity: route.maturity,
  owner: route.owner,
  aliases: route.aliases ?? [],
  blocker: route.blocker ?? null,
  visualAdoption: "NOT_CLAIMED_BY_HANDOFF",
}));

const output = {
  contract: "OLUK_SITES_HANDOFF_BASELINE_V2",
  version: 2,
  status: "SOURCE_ATTESTED_CANDIDATE_CONSUMER_INPUT",
  releaseState: "NOT_DEPLOYED_NOT_CUSTOMER_ROUTE_ADOPTION",
  purpose: "A runnable, code-native Sites handoff derived from reconciled customer source. Shopper consumes these contracts; it does not create an independent visual system.",
  authority: {
    sourceSlice,
    compositionReference,
    tokenBase: {
      commit: "b0227a13faf7320f7d13fbc693e922b00bd471d3",
      source: "sites/oluk-experience-lab/app/design-system/candidate-tokens.css",
      expectedSha256: "c93ad3fedf4d54d0693c416c65bc37f394b77ef254ac9a060f15832d3c833b8d",
      resolvedSha256: sha256(tokenCss),
      declarationCount: uniqueTokenDeclarations.length,
    },
    historicalCandidate,
    runtimeBoundary: {
      shopper: "SSR first paint, hydration, presentation and same-origin browser bridge",
      c2: "canonical identity, evidence, stack/cart and lifecycle projections",
      woo: "product ID, price, stock, backorders and purchasability",
      initiator: "payment-terminal compatibility boundary only",
      forbiddenConsumerChanges: ["C2 CSS/components", "Woo mutation", "Initiator/payment behavior", "direct browser authority calls"],
    },
  },
  tokenManifest: {
    source: "sites/oluk-experience-lab/app/design-system/candidate-tokens.css",
    sha256: sha256(tokenCss),
    uniqueOlukDeclarations: uniqueTokenDeclarations,
    lightOnly: true,
    darkMode: "DEFERRED_UNTIL_ALL_LIGHT_FAMILY_PROOF_COMPLETES",
    forbiddenConsumerPattern: "--oluk-* values may not alias Majestic or a parallel namespace",
  },
  availabilityEvidenceContract: {
    inventory: { component: "StockPill", stateKind: "availability", foreground: "--oluk-cobalt", surface: "--oluk-surface-cobalt-soft", ownership: "Woo/C2 availability projection" },
    actionSuccess: { component: "ActionControl", role: "separate reviewed completion treatment", ownership: "interaction state" },
    evidence: { component: "EvidenceStatus", stateKind: "evidence", ownership: "OpenLab/C2 source projection" },
    systemPass: { role: "non-customer diagnostic only", prohibition: "never substitute for inventory" },
    prohibitedCollision: "generic green success must never represent customer inventory",
  },
  typeAndMaterialContract: {
    fontLoading: ["@fontsource/plus-jakarta-sans/700.css", "@fontsource/plus-jakarta-sans/800.css", "@fontsource-variable/inter", "@fontsource/jetbrains-mono/700.css"],
    display: { family: "Plus Jakarta Sans", baselineWeight: 800, source: "app/globals.css" },
    bodyUi: { family: "Inter Variable", source: "app/globals.css" },
    mono: { family: "JetBrains Mono", source: "app/globals.css" },
    minCustomerBodyPx: 15,
    materialLaw: "visible cool canvas; bounded media chambers; independently raised decision and information planes; cobalt is relational signal rather than wallpaper",
  },
  primitiveCatalog: sharedPrimitives,
  familyTemplateCatalog: Object.entries(familySources).map(([family, sources]) => ({ family, sources, templateCoverage: routeManifest.filter((route) => route.family === family).length })),
  routeRenderManifest: {
    ledgerId: ledger.ledgerId,
    ledgerStatus: ledger.status,
    canonicalPatternCount: routeManifest.length,
    entries: routeManifest,
    canonicalization: {
      product: "/product/:slug",
      openLab: "/open-lab",
      aliases: "must remain compatibility metadata and never inflate the 73-pattern count",
    },
  },
  mobileCompactionManifest: mobileContracts,
  proofRegister: {
    sourceSlice: {
      family: "homepage",
      source: ["app/design-system/locked-home-hero.tsx", "app/design-system/locked-home-hero.module.css", "app/design-system/site-header.tsx"],
      requiredViewports: [1440, 1024, 768, 390],
      state: "LOCAL_SOURCE_PROOF_COMPLETE",
      evidenceLocation: "/Users/mujtabakhawaja/Downloads/Codex-Cold-Store/oluk-sites-reconciliation-w05/home-comparison",
    },
    remainingFamilies: "SOURCE_INVENTORIED_ONLY; no runtime or customer visual adoption claim until individual family comparison proof exists",
    consumerGate: "Shopper may begin only as a consumer of this source-attested contract; each migrated family must retain C2/Woo/Initiator ownership boundaries and prove 1440/1024/768/390 composition.",
  },
};

const next = stringify(output);
const readme = `# OLUK Sites Handoff Baseline V2

**Status:** \`SOURCE_ATTESTED_CANDIDATE_CONSUMER_INPUT\`
**Release state:** \`NOT_DEPLOYED_NOT_CUSTOMER_ROUTE_ADOPTION\`

This is the first source-attested handoff after reconciliation work in
\`codex/oluk-sites-reconciliation-w05\`. It is derived from the runnable Sites
source, including the real 5-3-1 homepage, shell and trust rails, customer
typography, StockPill, product composition, PDP, OpenLab and transaction
presentation modules. It is not an implementation of Shopper, a production
release, or a claim that the 73 route patterns are visually adopted by
Shopper.

## Authority order

1. Reconciled source slice \`${sourceSlice.commit}\` supplies the executable
   first vertical slice.
2. Sites composition reference \`${compositionReference.commit}\` supplies
   the primary customer-composition authority.
3. Published \`b0227a1\` supplies the exact 128-role light token set.
4. The former \`OLUK_SITES_HANDOFF_BASELINE_V1\` candidate remains historical
   evidence; it is not this handoff's implementation source.

## Consumer fence

Shopper is a consumer. It must port the declared primitives and templates with
runtime projection data, keep inventory, evidence and completion states
separate, and preserve C2, Woo and Initiator ownership. It may not use this
handoff to invent local visual roles, fixture facts, cart authority, payment
behaviour, or direct browser service calls.

## Contents

- [source-attested contract](OLUK_SITES_HANDOFF_BASELINE_V2.json) — 128 light
  tokens, availability/evidence semantics, typography/material contract,
  primitive and family catalogues, 73-pattern route manifest, mobile contract,
  and source-proof register.

## Proof status

The homepage family has local source proof at 1440, 1024, 768 and 390 px in
Codex Cold Store. Every other family is source-inventoried only. No route is
visually adopted by Shopper until that family has its own source comparison and
consumer proof at the four required widths.
`;
if (process.argv.includes("--check")) {
  const current = await readFile(outputPath, "utf8");
  const currentReadme = await readFile(readmePath, "utf8");
  if (current !== next) throw new Error("Sites handoff baseline is stale; run npm run handoff:generate");
  if (currentReadme !== readme) throw new Error("Sites handoff README is stale; run npm run handoff:generate");
  process.stdout.write(`PASS Sites handoff V2: ${output.routeRenderManifest.canonicalPatternCount} routes, ${output.tokenManifest.uniqueOlukDeclarations.length} tokens\n`);
} else {
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputPath, next);
  await writeFile(readmePath, readme);
  process.stdout.write(`WROTE ${outputPath}\n`);
}
