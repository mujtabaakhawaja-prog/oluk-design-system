#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const files = {
  experience: "app/experience-lab.tsx",
  customerRoutes: "app/customer-routes.tsx",
  assuranceRail: "app/design-system/assurance-rail.tsx",
  metricRail: "app/design-system/metric-rail.tsx",
  productCard: "app/design-system/product-commerce-card.tsx",
  productHero: "app/design-system/product-decision-hero.tsx",
  productDossier: "app/design-system/product-dossier.tsx",
  productStatus: "app/design-system/product-status.tsx",
  purchasePanel: "app/design-system/purchase-panel.tsx",
  qualitativeChip: "app/design-system/qualitative-chip.tsx",
  relatedRail: "app/design-system/related-rail.tsx",
  candidateComponents: "app/design-system/candidate-components.tsx",
  candidatePrimitives: "app/design-system/candidate-primitives.tsx",
  candidateReview: "app/design-system/candidate-review.tsx",
  ownerReviewHarness: "app/design-system/owner-review-state-harness.tsx",
  contracts: "app/design-system/contracts.ts",
  customerCss: "app/globals.css",
  candidateCss: "app/design-system/candidate-review.css",
  cobaltDivider: "app/design-system/cobalt-divider.tsx",
  mediaChamber: "app/design-system/product-media-chamber.tsx",
};

const canonicalComponents = Object.freeze([
  { role: "StockPill", figma: "641:17 / 732:2902", customerDefinition: "function StockPill", candidateDefinition: null },
  { role: "ProductMediaChamber", figma: "1022:4099", customerDefinition: "function ProductMediaChamber", candidateDefinition: null },
  { role: "CobaltDivider", figma: "1010:27053", customerDefinition: "function CobaltDivider", candidateDefinition: null },
  { role: "EvidenceStatus", figma: "732:2912", customerDefinition: "function EvidenceStatus", candidateDefinition: null },
  { role: "MetricRail", figma: "733:95", customerDefinition: "function MetricRail", candidateDefinition: null },
  { role: "QualitativeChip", figma: "733:17342", customerDefinition: "function QualitativeChip", candidateDefinition: null },
  { role: "HeroDecisionSurface", figma: "736:17458", customerDefinition: "function HeroDecisionSurface", candidateDefinition: null },
  { role: "ProductDecisionHero", figma: "739:50", customerDefinition: "function ProductDecisionHero", candidateDefinition: null },
  { role: "ProductCommerceCard", figma: "742:50 / 743:50 / 743:281", customerDefinition: "function ProductCommerceCard", candidateDefinition: null },
  { role: "RelationCard", figma: "743:520", customerDefinition: "function RelationCard", candidateDefinition: null },
  { role: "PurchasePanel", figma: "745:50", customerDefinition: "function PurchasePanel", candidateDefinition: null },
  { role: "Dossier", figma: "750:182", customerDefinition: "function ProductDossier", candidateDefinition: null },
  { role: "AssuranceRail", figma: "752:167", customerDefinition: "function AssuranceRail", candidateDefinition: null },
  { role: "RelatedRail", figma: "753:18136", customerDefinition: "function RelatedRail", candidateDefinition: null },
  { role: "SiteHeader", figma: "754:18224", customerDefinition: "function SiteHeader", candidateDefinition: null },
  { role: "SiteFooter", figma: "754:18226", customerDefinition: "function SiteFooter", candidateDefinition: null },
]);

function count(source, literal) {
  return source.split(literal).length - 1;
}

function declarations(source, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [...source.matchAll(new RegExp(`(?:export\\s+)?function\\s+${escaped}\\s*\\(`, "g"))].length;
}

function option(name) {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
}

const source = Object.fromEntries(
  await Promise.all(Object.entries(files).map(async ([key, relativePath]) => [key, await readFile(path.join(siteRoot, relativePath), "utf8")])),
);
const customerComponentSources = Object.fromEntries(
  Object.entries(source).filter(([key]) => [
    "assuranceRail", "metricRail", "productCard", "productHero", "productDossier",
    "productStatus", "purchasePanel", "qualitativeChip", "relatedRail", "cobaltDivider", "mediaChamber",
  ].includes(key)),
);
const customerSource = Object.values(customerComponentSources).join("\n") + `\n${source.experience}\n${source.customerRoutes}`;

const failures = [];
const checks = [];
function check(condition, message) {
  checks.push({ status: condition ? "PASS" : "FAIL", message });
  if (!condition) failures.push(message);
}

for (const component of canonicalComponents) {
  if (component.customerDefinition) check(customerSource.includes(component.customerDefinition), `${component.role} customer definition is present`);
  if (component.candidateDefinition) check(source.candidateComponents.includes(component.candidateDefinition), `${component.role} review definition is present`);
  const nodeIds = component.figma.split(" / ");
  for (const nodeId of nodeIds) check(source.contracts.includes(`node-id=${nodeId.replace(":", "-")}`), `${component.role} direct Figma source ${nodeId} is registered`);
}

for (const name of ["StockPill", "InventoryStatus", "ProductMediaChamber", "CobaltDivider", "EvidenceStatus", "MetricRail", "ProductCommerceCard", "AssuranceRail", "SiteHeader", "SiteFooter", "PurchasePanel", "ProductDossier"]) {
  check(declarations(customerSource, name) === 1, `${name} has one customer-module definition`);
}
check(
  source.candidateComponents.includes('export { EvidenceStatus, InventoryStatus, StockPill } from "./product-status"'),
  "owner review compatibility registry re-exports the canonical status module",
);
check(declarations(customerSource, "QualitativeChip") === 1, "QualitativeChip has one customer-module definition");
check(count(customerSource, "<QualitativeChip") >= 1, "customer compositions instantiate QualitativeChip");
check(
  source.candidateReview.includes('import { ProductCommerceCard } from "./product-commerce-card"') &&
    count(source.candidateReview, "<ProductCommerceCard") >= 3,
  "owner review imports and instantiates canonical ProductCommerceCard for the family and state matrix",
);
for (const [modulePath, componentName] of [
  ["./purchase-panel", "PurchasePanel"],
  ["./related-rail", "RelationCard"],
  ["./assurance-rail", "AssuranceRail"],
  ["./product-status", "EvidenceStatus"],
]) {
  check(
    source.candidateReview.includes(`from "${modulePath}"`) && source.candidateReview.includes(`<${componentName}`),
    `owner review imports and instantiates canonical ${componentName}`,
  );
}
for (const duplicate of ["EvidenceStatus", "MetricRail", "QualitativeChips", "ProductCommerceCard", "RelationCard", "PurchasePanel", "AssuranceRail"]) {
  check(declarations(source.candidateComponents, duplicate) === 0, `owner compatibility registry does not redefine ${duplicate}`);
}
check(
  source.ownerReviewHarness.includes('import { ProductCommerceCard } from "./product-commerce-card"') &&
    source.ownerReviewHarness.includes("<ProductCommerceCard") &&
    !source.ownerReviewHarness.includes("<MetricRail") &&
    !source.ownerReviewHarness.includes("<QualitativeChipList"),
  "owner state harness instantiates the canonical card instead of redrawing its media, metrics, chips or status",
);

const customerCardSource = source.productCard;
const rejectedLegacyPatterns = [
  [customerCardSource, /className=["']media-orbit["']/g, "customer ProductCommerceCard legacy media-orbit"],
  [source.customerCss, /\.qualitative-chips\s*>\s*div\s*\+\s*div/g, "customer joined qualitative-chip rail"],
  [source.candidateCss, /overflow-x:\s*clip/g, "candidate clip-as-proof"],
  [source.candidateCss, /shadow-arc/gi, "archived candidate shadow-arc"],
];
for (const [fileSource, pattern, label] of rejectedLegacyPatterns) {
  check(!pattern.test(fileSource), `${label} is absent`);
}

check(!customerSource.includes("CandidateReviewIndex"), "owner-review component registry is absent from customer route modules");
check(source.candidateReview.includes("CandidateReviewIndex"), "owner-review registry is isolated to /review");
check(source.contracts.includes('servings: "90 SERVINGS"'), "product fixture preserves 90 SERVINGS");
check(!/90 CAPS(?:\b|ULES)/i.test(source.contracts), "product fixture rejects 90 CAPS");

const report = {
  schemaVersion: 1,
  run: "CX-NEXT-043_COMPONENT_PROVENANCE_STATIC_CHECK",
  candidateState: "HUMAN_REVIEW_REQUIRED_UNPUBLISHED",
  generatedAt: new Date().toISOString(),
  checkedFiles: files,
  canonicalComponents,
  checkCount: checks.length,
  passCount: checks.filter(({ status }) => status === "PASS").length,
  failCount: failures.length,
  checks,
};

const output = option("output");
if (output) await writeFile(path.resolve(output), `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ ...report, checks: undefined }, null, 2)}\n`);
assert.equal(failures.length, 0, failures.join("\n"));
