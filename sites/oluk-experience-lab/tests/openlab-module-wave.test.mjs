import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const readSite = (file) => readFile(path.join(siteRoot, file), "utf8");

test("OpenLab core is a declared canonical module system", async () => {
  const registry = JSON.parse(await readFile(path.join(repoRoot, "authority/OPENLAB-SECTION-MODULE-REGISTRY.json"), "utf8"));
  assert.equal(registry.runtimeAuthority, "NONE");
  assert.equal(registry.canonicalNamespace, "/open-lab");
  assert.ok(registry.modules.length >= 18);
  assert.deepEqual(registry.ownerOnlyRoutes, ["/open-lab/admin"]);
  assert.deepEqual(registry.deferredRoutes, []);
  for (const entry of registry.modules) {
    assert.ok(entry.export);
    assert.ok(entry.dataOwner);
    assert.ok(entry.mounts.length);
    assert.ok(entry.mobileStrategy);
    assert.ok(entry.runtimeExclusions.length);
  }
});

test("P0 and P1 OpenLab routes mount canonical section exports", async () => {
  const route = await readSite("app/customer-routes.tsx");
  for (const component of [
    "OpenLabHeroLight",
    "OpenLabWayfinding",
    "EvidenceRecordExplainer",
    "OpenLabRegistryArchive",
    "OpenLabRecordDetail",
    "OpenLabDossierComposition",
    "OpenLabMethodologyPipeline",
    "OpenLabSourceChain",
    "OpenLabComparison",
  ]) assert.match(route, new RegExp(`<${component}\\b`), component);
});

test("OpenLab section modules stay presentation-only and responsive", async () => {
  const [source, css] = await Promise.all([
    readSite("app/design-system/openlab-sections.tsx"),
    readSite("app/design-system/openlab-sections.module.css"),
  ]);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|localStorage|sessionStorage|order_prepare|payment_bridge|complete_payment/i);
  assert.match(source, /EvidenceStatusChip/);
  assert.match(source, /OpenLabRegistryArchive/);
  assert.match(css, /@media\(max-width:900px\)/);
  assert.match(css, /@media\(max-width:600px\)/);
  assert.match(css, /overflow-x:auto/);
  assert.doesNotMatch(css, /#(?:[0-9a-f]{3}){1,2}\b/i);
});

test("OpenLab bridges consume generated content authority and fail closed outside MK-2866", async () => {
  const [registry, projection, adapter, reportRoute, compoundRoute, coaRoute] = await Promise.all([
    readFile(path.join(repoRoot, "authority/PRODUCT-CONTENT-REGISTRY.json"), "utf8").then(JSON.parse),
    readSite("app/design-system/product-content.generated.json").then(JSON.parse),
    readSite("app/design-system/product-content-adapter.ts"),
    readSite("app/open-lab/report/[batchId]/page.tsx"),
    readSite("app/open-lab/compound/[slug]/page.tsx"),
    readSite("app/open-lab/coa/[id]/page.tsx"),
  ]);

  const mk2866 = registry.products.find((product) => product.canonicalProductId === "mk-2866");
  assert.equal(mk2866.readinessState, "CONTENT_READY");
  assert.equal(mk2866.content.evidence.availability.value, "AVAILABLE");
  assert.equal(mk2866.content.evidence.availability.state, "CONTENT_READY");

  const nonReferenceProducts = registry.products.filter((product) => product.canonicalProductId !== "mk-2866");
  assert.equal(nonReferenceProducts.length, 15);
  for (const product of nonReferenceProducts) {
    assert.equal(product.content.evidence.availability.value, "UNAVAILABLE", product.canonicalProductId);
    assert.equal(product.commerce.price.value, null, product.canonicalProductId);
    assert.equal(product.commerce.inventory.value, null, product.canonicalProductId);
  }

  const readyProjection = projection.products.find((product) => product.canonicalProductId === "mk-2866");
  assert.equal(readyProjection.customer.canonicalIdentity.name, "MK-2866");
  assert.equal(readyProjection.customer.content.evidence.availability, "AVAILABLE");
  for (const product of projection.products.filter((entry) => entry.canonicalProductId !== "mk-2866")) {
    assert.equal(product.customer.canonicalIdentity?.name ?? null, null, product.canonicalProductId);
  }

  assert.match(adapter, /price: ""/);
  assert.match(adapter, /inventory: "unavailable"/);
  assert.match(adapter, /productId !== "mk-2866" \|\| availability !== "AVAILABLE"/);
  assert.doesNotMatch(adapter, /£\d|InStock/);

  assert.match(reportRoute, /"registered-record": "mk-2866"/);
  assert.match(reportRoute, /"mk2866-registered": "mk-2866"/);
  assert.match(reportRoute, /if\(!productSlug\)return notFound\(\)/);
  assert.doesNotMatch(reportRoute, /rad140-registered|"rad-140"/);

  assert.match(compoundRoute, /getProductContentEntry/);
  assert.match(compoundRoute, /productContentSlugs/);
  assert.match(compoundRoute, /Product evidence is not available yet/);
  assert.match(compoundRoute, /No product record or analytical value from another product is used in its place/);
  assert.match(coaRoute, /if\(id!=="r28868"\)return notFound\(\)/);
});

test("the MK-2866 experience preserves the exact public OpenLab projection and unavailable boundary", async () => {
  const [compiler, output, component, dossier, compoundRoute, portal] = await Promise.all([
    readSite("scripts/compile-openlab-product-experience.mjs"),
    readSite("app/design-system/openlab-product-experience.json"),
    readSite("app/design-system/openlab-product-experience.tsx"),
    readSite("app/design-system/openlab-sections.tsx"),
    readSite("app/open-lab/compound/[slug]/page.tsx"),
    readSite("app/design-system/openlab-hero-light.tsx"),
  ]);
  const experience = JSON.parse(output);
  assert.match(compiler, /OpenLabPublicProjection\.v2/);
  assert.equal(experience.sourceContract, "OpenLabPublicProjection.v2");
  assert.match(experience.sourceHash, /^[a-f0-9]{64}$/);
  assert.match(experience.contentHash, /^[a-f0-9]{64}$/);
  assert.equal(experience.sourceAttribution.recordId, experience.record.id);
  assert.equal(experience.product.slug, "mk-2866");
  assert.equal(experience.record.batchCode, "OL2201");
  assert.equal(experience.visualizations.purity.displayValue, ">99%");
  assert.equal(experience.visualizations.concentration.testedValue, "16.02 mg");
  assert.equal(experience.interactionContract.chartPolicy, "numeric bars and source-owned tabular values only");
  for (const view of ["record", "report history", "label comparison", "analytes", "batch timeline", "availability", "source context"]) {
    assert.match(component, new RegExp(view));
  }
  for (const surface of ["EditorialSurface", "DecisionSurface", "TechnicalSurface"]) assert.match(component, new RegExp(surface));
  assert.match(component, /const available = productSlug === "mk-2866" && evidenceState === "available"/);
  assert.match(component, /OpenLabAvailabilityState = "available" \| "partial" \| "unavailable"/);
  assert.match(component, /data-openlab-state=\{evidenceState\}/);
  assert.match(component, /does not clone values from another product/);
  assert.match(component, /tableFallback/);
  assert.match(component, /ArrowRight/);
  assert.doesNotMatch(component, /fetch\(|XMLHttpRequest|WebSocket|localStorage|sessionStorage|chromatogram|StackOutcomeProfile|evidence visibility/i);

  assert.match(dossier, /OpenLabProductExperience/);
  assert.match(dossier, /productSlug=\{productSlug\}/);
  assert.match(compoundRoute, /getCustomerProductFixture/);
  assert.match(compoundRoute, /PresentationState/);
  assert.match(portal, /product-content-adapter/);
  assert.match(portal, /openlab-product-depth\.json/);
  assert.match(portal, /Source reported|source-reported/);
  assert.doesNotMatch(portal, /99\.55%|Live batch verification feed|Every batch\. Every report\. Public/);
});

test("modular packet uses the canonical PDP and OpenLab namespaces", async () => {
  const packet = await readFile(path.join(repoRoot, "FIGMA_TO_CODEX_PACKET__MODULAR_SECTION_REGISTRY.md"), "utf8");
  assert.match(packet, /PRODUCT DETAIL PAGE \(`\/product\/:slug`\)/);
  assert.doesNotMatch(packet, /PRODUCT DETAIL PAGE \(`\/shop\/:slug`\)/);
  assert.match(packet, /Canonical namespace: \/open-lab/);
  assert.doesNotMatch(packet, /\/openlab\/admin/);
});
