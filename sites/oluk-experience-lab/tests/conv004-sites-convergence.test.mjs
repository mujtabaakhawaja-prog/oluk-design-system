import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function source(relativePath) {
  return readFile(path.join(siteRoot, relativePath), "utf8");
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const filePath = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(filePath) : [filePath];
      }),
    )
  ).flat();
}

test("CONV-004 loads Inter Variable and collapses interactive cobalt without stale CSS hexes", async () => {
  const packageJson = JSON.parse(await source("package.json"));
  const layout = await source("app/layout.tsx");
  const tokens = await source("app/design-system/candidate-tokens.css");
  const globals = await source("app/globals.css");

  assert.equal(packageJson.dependencies["@fontsource/inter"], undefined);
  assert.match(packageJson.dependencies["@fontsource-variable/inter"], /^\^5\./);
  assert.match(layout, /import "@fontsource-variable\/inter";/);
  assert.doesNotMatch(layout, /@fontsource\/inter\//);
  assert.match(tokens, /--oluk-font-body:\s*"Inter Variable",\s*sans-serif/);
  assert.match(globals, /--font-ui:\s*"Inter Variable"/);
  assert.match(tokens, /--oluk-cobalt-alt:\s*#0057ff/);
  assert.match(globals, /--cobalt-hover:\s*#0057ff/);
  assert.match(globals, /--oluk-cobalt:\s*var\(--cobalt\)/);
  assert.match(globals, /--oluk-divider-width:\s*2px/);
  assert.match(globals, /--oluk-divider-rhythm:\s*32px/);

  const cssFiles = (await walk(path.join(siteRoot, "app"))).filter((filePath) => filePath.endsWith(".css"));
  const staleInteractiveHexes = [];
  for (const filePath of cssFiles) {
    const css = await readFile(filePath, "utf8");
    if (/#(?:3366ff|256dff|1842ff|2147c4|111522|101114|3e4d68|e8efff)/i.test(css)) {
      staleInteractiveHexes.push(path.relative(siteRoot, filePath));
    }
  }
  assert.deepEqual(staleInteractiveHexes, []);

  const customerCssPaths = [
    "app/globals.css",
    "app/customer-routes.module.css",
    "app/transaction-presentation.module.css",
  ];
  const undersizedMetadata = [];
  for (const relativePath of customerCssPaths) {
    const css = await source(relativePath);
    for (const match of css.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)) {
      if (Number(match[1]) < 12) {
        const prefix = css.slice(Math.max(0, match.index - 180), match.index);
        if (!/\.qualitative-chip\s+dt\s*\{[^}]*$/s.test(prefix)) {
          undersizedMetadata.push(`${relativePath}:${match[1]}px`);
        }
      }
    }
  }
  assert.deepEqual(undersizedMetadata, []);
  assert.match(globals, /body p\s*\{[^}]*font-size:\s*max\(15px,\s*1em\)/s);
  assert.match(globals, /\.qualitative-chip dt\s*\{[^}]*font-size:\s*11px/s);
});

test("CONV-004 reproduces the complete owner-only FC-01 foundation specimen", async () => {
  const review = await source("app/design-system/candidate-review.tsx");
  const reviewCss = await source("app/design-system/candidate-review.css");
  const foundation = review.match(/function FoundationSpecimen\(\)[\s\S]*?\n}\n\nfunction ProvenanceGate/)?.[0] ?? "";
  const roles = foundation.match(/const colourRoles = \[([\s\S]*?)\] as const;/)?.[1] ?? "";

  assert.match(foundation, /OLUK candidate foundation convergence/);
  assert.match(foundation, /A normalization layer for MF-01A through MF-03 relationships\. It is not promoted design-system authority\./);
  assert.equal((foundation.match(/data-foundation-section=/g) ?? []).length, 5);
  assert.equal((roles.match(/^\s*\["/gm) ?? []).length, 22);
  assert.match(roles, /\["Inventory", "#0057FF", "--oluk-stock-in-stock"\]/);
  assert.match(roles, /\["Inventory soft", "#EEF4FF", "--oluk-stock-in-stock-soft"\]/);
  assert.match(roles, /\["Cobalt alt", "#0057FF", "--oluk-cobalt-alt"\]/);
  assert.match(foundation, /DISPLAY · PLUS JAKARTA SANS EXTRABOLD/);
  assert.match(foundation, /BODY \+ UI · INTER VARIABLE/);
  assert.match(foundation, /data-display-size="56"/);
  assert.match(foundation, /data-display-size="28"/);
  assert.match(foundation, /Cobalt StockPill InventoryStatus/);
  assert.match(foundation, /Footer is the sole inverse\. Runtime authority remains NONE\./);
  assert.equal((foundation.match(/<li>/g) ?? []).length, 5);

  assert.match(reviewCss, /\.oluk-candidate-foundation\s*\{[^}]*background:\s*transparent[^}]*box-shadow:\s*none/s);
  assert.match(reviewCss, /\.oluk-candidate-foundation-swatch i\s*\{[^}]*border:[^;]*var\(--oluk-border-card\)/s);
  assert.match(reviewCss, /\.oluk-candidate-foundation-display-scale \[data-display-size="56"\]\s*\{[^}]*var\(--oluk-type-display-xl\)/s);
  assert.match(reviewCss, /\.oluk-candidate-foundation-body-scale p:nth-of-type\(4\)\s*\{[^}]*var\(--oluk-type-eyebrow\)/s);
  assert.match(reviewCss, /\.oluk-candidate-foundation-embedded > i\s*\{[^}]*var\(--oluk-divider-width\)[^}]*var\(--oluk-cobalt\)/s);
  assert.match(reviewCss, /\.oluk-candidate-foundation-gate\s*\{[^}]*var\(--oluk-surface-cobalt-soft\)/s);
});

test("CONV-004 clears complete Shop URL state and keeps unfiltered records free of false no-result copy", async () => {
  const shop = await source("app/design-system/shop-discovery.tsx");
  const routes = await source("app/customer-routes.tsx");

  assert.match(shop, /function resetShopDiscovery\(\)[\s\S]*?"availability", "search"[\s\S]*?url\.searchParams\.delete/);
  assert.match(shop, /Clear search and filters/);
  assert.match(shop, /activeCount > 0 \|\| searchTerm/);
  assert.doesNotMatch(routes, /No record matches the current search example/);
  assert.doesNotMatch(routes, /export function RecordsRoute\(\)[\s\S]*?state="no-result"/);
  assert.doesNotMatch(routes, /Verified purchase/);
  assert.doesNotMatch(routes, /A\. Morgan|Daniel R\.|M\. Lewis/);
  assert.match(routes, /data-live-authority="false" id="reviews"/);
  assert.match(shop, /function catalogueFixture\(product: ShopTaxonomyFixtureProduct\): ProductFixture/);
  assert.match(shop, /every catalogue result is rendered[\s\S]*?canonical ProductCommerceCard anatomy/);
  assert.match(shop, /product=\{catalogueFixture\(product\)\}[\s\S]*?variant="compact"/);
  assert.match(shop, /className="shop-result-card shop-result-card-canonical"/);
  assert.doesNotMatch(shop, /data-component="ShopDiscoveryResult"/);
  assert.doesNotMatch(shop, /<ProductMediaChamber context="featured"/);
  assert.doesNotMatch(shop, /function ShopResultCard|shop-result-orbit|<img/);
  assert.doesNotMatch(shop, /Product page unavailable/);
  assert.match(shop, /const familyTerms = product\.familySlugs\.flatMap/);
  assert.match(shop, /const goalTerms = product\.goalTagSlugs\.flatMap/);
  assert.match(shop, /product\.sku,[\s\S]*?product\.formSlug,[\s\S]*?servings/);
});

test("CONV-004 dossier presents a truthful static section index instead of inactive tabs", async () => {
  const dossier = await source("app/design-system/product-dossier.tsx");
  const globals = await source("app/globals.css");

  assert.match(dossier, /<ol aria-label="Dossier sections" className="dossier-section-index">/);
  for (const label of ["01 Product facts", "02 Product visual", "03 Product composition"]) {
    assert.match(dossier, new RegExp(label));
  }
  assert.doesNotMatch(dossier, /role="tab"|aria-current/);
  assert.match(globals, /\.dossier-section-index\s*\{/);
  assert.doesNotMatch(globals, /\.dossier-tabs|\.dossier-section-index[^}]*aria-current/s);
});

test("CONV-004 review links resolve to route frames and compact anatomy is invariant", async () => {
  const contracts = await source("app/design-system/contracts.ts");
  const review = await source("app/design-system/candidate-review.tsx");
  const card = await source("app/design-system/product-commerce-card.tsx");
  const routeMap = await source("app/design-system/site-route-map.ts");

  assert.match(contracts, /foundation:.*node-id=637-3/);
  for (const nodeId of ["764:50", "765:50", "766:50", "767:50"]) {
    assert.match(routeMap, new RegExp(nodeId));
  }
  assert.match(review, /CUSTOMER_ROUTES\.map\(\(route\) =>/);
  assert.match(review, /href="#mf02b-compact-states">Compact states/);
  assert.match(review, /Three authored sources across four execution widths/);
  assert.match(review, /tablet source governs both 1024px and 768px/);
  assert.match(card, /Compact anatomy intentionally omits QualitativeChips in every call path/);
  const compactBranch = card.match(/if \(variant === "compact"\)[\s\S]*?\n {2}}\n{2} {2}const mediaContext/)?.[0] ?? "";
  assert.doesNotMatch(compactBranch, /<QualitativeChipList/);
});

test("CONV-004 exposes StockPill states while preserving InventoryStatus compatibility", async () => {
  const status = await source("app/design-system/product-status.tsx");
  const candidate = await source("app/design-system/candidate-components.tsx");
  const candidateReview = await source("app/design-system/candidate-review.tsx");
  const tokens = await source("app/design-system/candidate-tokens.css");
  const candidateCss = await source("app/design-system/candidate-review.css");
  const globals = await source("app/globals.css");

  for (const token of [
    "--oluk-ink-dark: #344054",
    "--oluk-status-error: #b42318",
    "--oluk-status-error-soft: #fef3f2",
    "--oluk-status-warning: #b54708",
    "--oluk-status-unavailable-soft: #f4f5f7",
    "--oluk-status-disabled: #9ca3af",
    "--oluk-stock-in-stock: var(--oluk-cobalt)",
    "--oluk-stock-in-stock-soft: var(--oluk-surface-cobalt-soft)",
    "--oluk-stock-out-of-stock: var(--oluk-status-error)",
    "--oluk-stock-out-of-stock-soft: var(--oluk-status-error-soft)",
    "--oluk-stock-unavailable: var(--oluk-text-muted)",
    "--oluk-stock-unavailable-soft: var(--oluk-status-unavailable-soft)",
    "--oluk-status-success: #15803d",
    "--oluk-page-padding: 64px",
    "--oluk-section-gap: 32px",
  ]) {
    assert.match(tokens, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(status, /export function StockPill\(/);
  assert.match(status, /data-oluk-status-kind="availability"/);
  assert.match(status, /data-oluk-status-kind="evidence"/);
  assert.match(status, /verified: "OPENLAB VERIFIED"/);
  assert.match(status, /available: "OPENLAB VERIFIED"/);
  assert.match(status, /unavailable: "OPENLAB VERIFIED"/);
  assert.doesNotMatch(status, /EVIDENCE UNAVAILABLE/);
  assert.match(status, /EvidenceStatus\(\{ state = "unavailable"/);
  assert.doesNotMatch(status, /OPENLAB REPORTED|RECORD AVAILABLE/);
  assert.match(status, /export type InventoryStatusProps = StockPillProps/);
  assert.match(status, /export function InventoryStatus\([\s\S]*?<StockPill \{\.\.\.props\} \/>/);
  assert.doesNotMatch(status, /oluk-inventory-green/);
  assert.match(candidate, /export \{ EvidenceStatus, InventoryStatus, StockPill \} from "\.\/product-status"/);
  assert.match(candidateReview, /import \{ EvidenceStatus, StockPill \} from "\.\/product-status"/);
  assert.match(candidateReview, /<StockPill state="out-of-stock" \/>/);
  assert.match(candidateCss, /data-state="in-stock"[^}]*var\(--oluk-stock-in-stock\)[^}]*var\(--oluk-stock-in-stock-soft\)/);
  assert.match(candidateCss, /data-state="out-of-stock"[^}]*var\(--oluk-stock-out-of-stock\)[^}]*var\(--oluk-stock-out-of-stock-soft\)/);
  assert.match(candidateCss, /data-state="unavailable"[^}]*var\(--oluk-stock-unavailable\)[^}]*var\(--oluk-stock-unavailable-soft\)/);
  assert.match(globals, /\.shop-result-availability\[data-state="in-stock"\][^}]*var\(--oluk-stock-in-stock-soft\)[^}]*var\(--oluk-stock-in-stock\)/s);
  assert.match(globals, /\.record-state > span:last-child[^}]*var\(--oluk-status-unavailable-soft\)[^}]*var\(--ink-muted\)/s);
  assert.match(globals, /\.record-state > span\[data-state="available"\][\s\S]*?var\(--oluk-status-success\)/);
  assert.match(globals, /\.evidence-status\[data-state="unavailable"\][^}]*var\(--oluk-status-unavailable-soft\)[^}]*var\(--ink-muted\)/s);
  assert.match(globals, /\.evidence-status\[data-state="(?:verified|available)"\]/);
  assert.match(candidateCss, /\.oluk-candidate-evidence\[data-state="unavailable"\][^}]*var\(--oluk-status-unavailable-soft\)[^}]*var\(--oluk-text-muted\)/s);
});

test("CONV-004 reuses ProductMediaChamber and separates the atomic divider from its density boundary", async () => {
  const divider = await source("app/design-system/cobalt-divider.tsx");
  const dividerCss = await source("app/design-system/cobalt-divider.module.css");
  const candidateReview = await source("app/design-system/candidate-review.tsx");
  const candidateReviewCss = await source("app/design-system/candidate-review.css");
  const candidateTokens = await source("app/design-system/candidate-tokens.css");
  const customerRoutes = await source("app/customer-routes.tsx");
  const commerceCard = await source("app/design-system/product-commerce-card.tsx");
  const candidateComponents = await source("app/design-system/candidate-components.tsx");
  const decisionHero = await source("app/design-system/product-decision-hero.tsx");
  const mediaChamber = await source("app/design-system/product-media-chamber.tsx");
  const mediaChamberCss = await source("app/design-system/product-media-chamber.module.css");
  const commerceTypes = await source("app/design-system/commerce-types.ts");
  const productFixtures = await source("app/design-system/product-fixtures.ts");
  const contracts = await source("app/design-system/contracts.ts");
  const globals = await source("app/globals.css");
  const commerceParts = await source("app/design-system/commerce-parts.tsx");
  const commercePartsCss = await source("app/design-system/commerce-parts.module.css");
  const productCardCss = await source("app/design-system/product-commerce-card.module.css");
  const quantityStepper = await source("app/design-system/quantity-stepper.tsx");
  const quantityStepperCss = await source("app/design-system/quantity-stepper.module.css");
  const purchasePanel = await source("app/design-system/purchase-panel.tsx");

  assert.match(divider, /export function CobaltDivider\(/);
  assert.match(divider, /export function CobaltDensityBoundary\(/);
  assert.match(divider, /data-component="CobaltDivider"/);
  assert.match(divider, /data-component="CobaltDensityBoundary"/);
  assert.match(divider, /data-rhythm="32-2-32"/);
  assert.match(divider, /<CobaltDivider \/>/);
  assert.match(dividerCss, /background:\s*var\(--oluk-cobalt\)/);
  assert.match(dividerCss, /block-size:\s*var\(--oluk-divider-width\)/);
  assert.match(dividerCss, /padding-block:\s*var\(--oluk-divider-rhythm\)/);
  assert.ok((candidateReview.match(/<CobaltDensityBoundary \/>/g) ?? []).length >= 2);
  assert.equal((customerRoutes.match(/<CobaltDensityBoundary \/>/g) ?? []).length, 2);
  assert.match(customerRoutes, /export function HomeRoute\(\)[\s\S]*?<CobaltDensityBoundary \/>[\s\S]*?<HomepageAssuranceTransition \/>/);
  assert.match(customerRoutes, /export function OpenLabRoute\(\)[\s\S]*?<CobaltDensityBoundary \/>[\s\S]*?<SectionHeading/);
  assert.match(commerceCard, /import \{ ProductMediaChamber \}/);
  assert.match(commerceCard, /<ProductMediaChamber/);
  assert.match(commerceCard, /<div className="product-commerce-card-inner">[\s\S]*?<ProductMediaChamber[\s\S]*?<div className="product-content-plane">/);
  assert.match(candidateComponents, /export \{ ProductCommerceCard \} from "\.\/product-commerce-card"/);
  assert.doesNotMatch(candidateComponents, /function ProductMediaChamber|<ProductMediaChamber\b/);
  assert.match(candidateReview, /import \{ ProductCommerceCard \} from "\.\/product-commerce-card"/);
  assert.ok((candidateReview.match(/<ProductCommerceCard\b/g) ?? []).length >= 3);
  assert.doesNotMatch(candidateComponents, /<OlukMediaChamber\b/);
  assert.match(decisionHero, /<ProductMediaChamber/);
  assert.match(mediaChamber, /data-authored-layers="outer-gradient luminous-halo identity-pane contact-shelf product"/);
  assert.doesNotMatch(mediaChamber + mediaChamberCss + commerceTypes + productFixtures, /["']purchase["']|data-context="purchase"|purchase:\s*\{/);
  assert.match(mediaChamberCss, /data-context="card"\]\s*\{\s*height:\s*310px/);
  assert.match(mediaChamberCss, /data-context="featured"\]\s*\{\s*height:\s*292px/);
  assert.match(mediaChamberCss, /@media \(max-width:\s*540px\)[\s\S]*?data-context="card"\]\s*\{\s*height:\s*280px/);
  assert.match(mediaChamberCss, /@media \(max-width:\s*540px\)[\s\S]*?data-context="featured"\]\s*\{\s*height:\s*327px/);
  assert.match(globals, /\.product-commerce-card\s*\{[^}]*border:\s*1px solid var\(--oluk-border-outer\)[^}]*padding:\s*28px/s);
  assert.match(globals, /\.product-commerce-card-inner\s*\{[^}]*border:\s*1px solid var\(--oluk-border-card\)[^}]*border-radius:\s*24px/s);
  assert.match(globals, /\.product-commerce-card-inner\s*>\s*\*\s*\{[^}]*max-width:\s*100%[^}]*min-width:\s*0[^}]*width:\s*100%/s);
  assert.match(globals, /@media \(max-width:\s*540px\)[\s\S]*?\.product-commerce-card-(?:vertical|[\s\S]*?featured)[\s\S]*?padding:\s*12px/s);
  assert.match(candidateTokens, /--oluk-card-vertical-width:\s*481px/);
  assert.match(globals, /\.product-commerce-card-featured \.product-commerce-card-inner\s*\{[^}]*grid-template-rows:\s*auto 1fr/s);
  assert.doesNotMatch(globals, /\.product-commerce-card-featured \.product-media-chamber/);
  assert.doesNotMatch(globals, /\.product-grid \.product-media-chamber/);
  assert.match(candidateReviewCss, /\.oluk-candidate-component-stage > \.product-commerce-card\s*\{\s*width:\s*100%/);
  assert.doesNotMatch(candidateReviewCss, /@media \(max-width:\s*540px\)[\s\S]*?\.oluk-candidate-qualitative\s*\{\s*grid-template-columns:\s*1fr/);
  assert.match(globals, /h1,\s*h2,\s*h3,\s*h4\s*\{[^}]*font-family:\s*var\(--font-display\)[^}]*font-weight:\s*800/s);
  assert.match(globals, /\.oluk-candidate-pack-size\s*\{[^}]*display:\s*grid[^}]*gap:\s*8px/s);
  assert.match(globals, /\.oluk-candidate-pack-size strong\s*\{[^}]*var\(--cobalt-soft\)[^}]*var\(--cobalt\)/s);
  assert.match(commerceCard, /resolvedInventory === "unavailable"[\s\S]*?"Unavailable"/);
  assert.match(commerceParts, /data-state=\{state\}/);
  assert.match(purchasePanel, /state=\{inventory \?\? presentation\.inventory\}/);
  assert.match(decisionHero, /state=\{product\.presentationStatus\.inventory\}/);
  assert.match(commerceParts, /<ActionButton disabled>/);
  assert.match(commercePartsCss, /\.actions\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(globals, /\.product-commerce-card-featured \.card-actions\s*\{[^}]*grid-template-columns:\s*1fr 1\.12fr/s);
  assert.match(productCardCss, /\.compactActions\s*\{[^}]*grid-template-columns:\s*repeat\(2/s);
  assert.match(quantityStepper, /data-component="QuantityStepper"/);
  assert.match(quantityStepperCss, /grid-template-columns:\s*repeat\(3, minmax\(44px, 1fr\)\)/);
  assert.match(candidateReview, /<PurchasePanelMatrix product=\{mk2866Fixture\} \/>/);
  assert.match(candidateReviewCss, /data-width="desktop"[^}]*max-width:\s*420px/);
  assert.match(candidateReviewCss, /data-width="mobile"[^}]*max-width:\s*358px/);
  assert.match(candidateReview, /showQualitative=\{false\}[\s\S]*?state=\{state\}[\s\S]*?variant="compact"/);
  assert.match(candidateReviewCss, /data-state="hover"[^}]*border-color:\s*var\(--oluk-border-strong\)/);
  assert.match(candidateReviewCss, /data-state="selected"[^}]*border:\s*2px solid var\(--oluk-cobalt\)/);
  assert.match(commerceCard, /resolved\.primaryLabel === "Added"[\s\S]*?"Added ✓"/);
  assert.match(commerceCard, /const qualitativeVisible = showQualitative \?\? variant !== "compact"/);
  assert.match(commerceCard, /evidenceLabel=\{secondaryLabel \?\? \(resolved\.evidence === "unavailable" \? "Browse Lab Records" : "View Lab Record"\)\}/);

  for (const truth of ["SARM SERIES", "MK-2866", "Ostarine", "80529-01", "15 MG", "90 SERVINGS", ">99%", "£43"]) {
    assert.match(contracts, new RegExp(truth.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(contracts, /90 CAPS/);
  assert.match(contracts, /typographyFloorDecision:\s*"CHAMPION \/ DEC-TYPE-FLOOR-001 \/ 12PX METADATA \/ 15-16PX BODY \/ 11PX QUALITATIVECHIP EXCEPTION"/);
  assert.match(contracts, /figmaFoundationNode:\s*"637:3"/);
  assert.match(contracts, /runtimeAuthority:\s*"NONE"/);
});

test("CONV-004 keeps owner-only assurance claims off customer routes", async () => {
  const assurance = await source("app/design-system/assurance-rail.tsx");
  const review = await source("app/design-system/candidate-review.tsx");

  assert.match(assurance, /export const ownerReviewAssuranceItems/);
  assert.match(assurance, /items = customerAssuranceItems/);
  assert.match(assurance, /data-live-authority="false"/);
  assert.match(review, /<AssuranceRail items=\{ownerReviewAssuranceItems\} \/>/);
  for (const claim of ["Compound identity confirmed", "Purity measured to ensure", "Concentration verified", "Results validated through"]) {
    assert.doesNotMatch(assurance.match(/const customerAssuranceItems[\s\S]*?export function AssuranceRail/)?.[0] ?? "", new RegExp(claim));
  }
});
