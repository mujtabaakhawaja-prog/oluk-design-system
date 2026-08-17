import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const execFileAsync = promisify(execFile);
const readSite = (file) => readFile(path.join(siteRoot, file), "utf8");
const readAuthority = (file) => readFile(path.join(repoRoot, "authority", file), "utf8");

function atoms(value, pointer = "$") {
  if (Array.isArray(value)) return value.flatMap((item, index) => atoms(item, `${pointer}[${index}]`));
  if (!value || typeof value !== "object") return [];
  const current = typeof value.state === "string" && Object.hasOwn(value, "value") ? [{ pointer, atom: value }] : [];
  return current.concat(Object.entries(value).flatMap(([key, item]) => atoms(item, `${pointer}.${key}`)));
}

test("the Wave 2 compiler emits a deterministic fail-closed customer projection", async () => {
  await execFileAsync("node", ["scripts/compile-product-content.mjs", "--check"], { cwd: siteRoot });
  const [generated, cardProjection, routeSelectors, familyTemplates] = await Promise.all([
    readSite("app/design-system/product-content.generated.json").then(JSON.parse),
    readSite("app/design-system/product-content-card.generated.json").then(JSON.parse),
    readSite("app/design-system/product-content-route-selectors.generated.json").then(JSON.parse),
    readSite("app/design-system/family-content-template-contracts.generated.json").then(JSON.parse),
  ]);
  assert.equal(generated.schemaVersion, "oluk.product-content-projection.v1");
  assert.equal(generated.products.length, 16);
  assert.match(generated.contentHash, /^[a-f0-9]{64}$/);

  const mk = generated.products.find((product) => product.canonicalProductId === "mk-2866");
  assert.equal(mk.customer.canonicalIdentity.name, "MK-2866");
  assert.equal(mk.customer.content.evidence.availability, "AVAILABLE");
  assert.ok(mk.customer.content.descriptions.long.length >= 280, "long copy remains a real long-form variant");
  assert.equal(mk.customer.commerce.price.value, null);
  assert.equal(mk.customer.commerce.inventory.value, null);
  assert.equal(mk.customer.commerce.purchasability.value, null);

  for (const product of generated.products.filter((candidate) => candidate.canonicalProductId !== "mk-2866")) {
    assert.notEqual(product.customer.content?.evidence?.availability, "AVAILABLE", product.canonicalProductId);
  }
  assert.doesNotMatch(JSON.stringify(generated), /"@type":"Offer"|schema\.org\/InStock|"price":"£/);
  assert.equal(cardProjection.schemaVersion, "oluk.product-content-card-projection.v1");
  assert.deepEqual(cardProjection.products.map((product) => product.canonicalProductId), ["mk-2866"]);
  assert.doesNotMatch(JSON.stringify(cardProjection), /(?:£|InStock|offers|inventory|purchasability)/i);

  assert.equal(routeSelectors.schemaVersion, "oluk.product-content-route-selectors.v1");
  assert.equal(routeSelectors.attachmentPolicy.state, "PREPARED_NOT_ATTACHED");
  assert.equal(routeSelectors.attachmentPolicy.prerequisite, "BOUNDED_SHOPPER_C2_V1_INTEGRATION_PROOF");
  assert.equal(routeSelectors.attachmentPolicy.credentials, "NONE");
  assert.equal(routeSelectors.attachmentPolicy.browserAuthorityCalls, false);
  assert.equal(routeSelectors.routeSelectors.length, 21);
  assert.equal(routeSelectors.products.length, 16);
  assert.match(routeSelectors.contentHash, /^[a-f0-9]{64}$/);
  const mkSelectors = routeSelectors.products.find((product) => product.canonicalProductId === "mk-2866");
  const radSelectors = routeSelectors.products.find((product) => product.canonicalProductId === "rad-140");
  assert.equal(mkSelectors.fields["content.routeVariants.homepageCard"].emission, "CUSTOMER_VALUE");
  assert.deepEqual(mkSelectors.fields["content.routeVariants.homepageCard"].provenanceBindingIds, ["BIND-MK2866-LABEL", "BIND-GLOBAL-FIGMA-SITES-COMPOSITION"]);
  assert.equal(mkSelectors.fields["commerce.price"].emission, "RUNTIME_RESOLVER_ONLY");
  assert.equal(mkSelectors.fields["commerce.price"].resolver.owner, "WOO_C2");
  assert.equal(radSelectors.fields["content.routeVariants.openLab"].emission, "OMIT");
  assert.equal(radSelectors.fields["content.evidence.availability"].emission, "EXPLICIT_UNAVAILABLE");
  assert.doesNotMatch(JSON.stringify(routeSelectors), /serviceToken|credentialValue|tenantId|providerAdmin/i);

  assert.equal(familyTemplates.schemaVersion, "oluk.family-content-template-projection.v1");
  assert.equal(familyTemplates.runtimeAuthority, "NONE");
  assert.deepEqual(familyTemplates.families.map((family) => family.id), ["family-1-discovery", "family-2-product"]);
  assert.doesNotMatch(JSON.stringify(familyTemplates), /routePatterns|"(?:price|inventory|purchasability)"\s*:/i);
  for (const family of familyTemplates.families) {
    assert.ok(family.responsiveBehavior.desktop && family.responsiveBehavior.mobile, family.id);
    assert.ok(family.slots.every((slot) => slot.referencedSlot && slot.fieldRefs.length && slot.missingBehavior), family.id);
  }
});

test("every product atom has an explicit state and field provenance while commerce stays resolver-only", async () => {
  const [registry, ledger] = await Promise.all([
    readAuthority("PRODUCT-CONTENT-REGISTRY.json").then(JSON.parse),
    readAuthority("COPY-SOURCE-PROVENANCE-LEDGER.json").then(JSON.parse),
  ]);
  assert.equal(registry.products.length, 16);
  const bindingIds = new Set((ledger.bindings ?? ledger.fieldBindings ?? ledger.sourceBindings).map((binding) => binding.bindingId ?? binding.id));
  for (const product of registry.products) {
    const productAtoms = atoms(product);
    assert.ok(productAtoms.length > 0, product.canonicalProductId);
    for (const { pointer, atom } of productAtoms) {
      assert.ok(["CONTENT_READY", "SOURCE_BOUND", "PENDING_EVIDENCE_BINDING", "EDITORIAL_CHOICE"].includes(atom.state), pointer);
      if (atom.value !== null) {
        assert.ok(atom.provenanceBindingIds.length > 0, pointer);
        for (const id of atom.provenanceBindingIds) assert.ok(bindingIds.has(id), `${pointer}: ${id}`);
      }
      if (atom.state === "PENDING_EVIDENCE_BINDING") {
        assert.ok(
          atom.value === null
            || atom.value === "UNAVAILABLE"
            || atom.constraints.includes("UNAVAILABLE_STATE_ONLY"),
          pointer,
        );
      }
    }
    for (const field of ["price", "inventory", "purchasability"]) {
      assert.equal(product.commerce[field].owner, "WOO_C2", `${product.canonicalProductId}.${field}`);
      assert.equal(product.commerce[field].value, null, `${product.canonicalProductId}.${field}`);
    }
  }
  const gw = registry.products.find((product) => product.canonicalProductId === "gw-501516");
  assert.equal(gw.canonicalIdentity.name.value, "GW-501516");
  assert.doesNotMatch(JSON.stringify(registry), /schema\.org\/InStock|"offers"\s*:/i);
});

test("route and slot contracts cover responsive, unavailable, and transaction-silence behavior", async () => {
  const [matrix, catalogue] = await Promise.all([
    readAuthority("ROUTE-CONTENT-CONSUMPTION-MATRIX.json").then(JSON.parse),
    readAuthority("PRODUCT-CONTENT-SLOT-CATALOGUE.json").then(JSON.parse),
  ]);
  const routeText = JSON.stringify(matrix);
  for (const required of ["homepage", "PDP", "OpenLab", "bundle", "stack", "comparison", "education", "checkout", "payment"]) {
    assert.match(routeText, new RegExp(required, "i"), required);
  }
  assert.equal(matrix.scopeReconciliation.historicalFourWidthCandidateSubset, 31);
  assert.equal(matrix.scopeReconciliation.exactCustomerRouteRegistry, 51);
  assert.equal(matrix.scopeReconciliation.physicalNextPagePatterns, 68);
  assert.equal(matrix.scopeReconciliation.canonicalLedgerDispositionPatterns, 73);
  assert.equal(matrix.scopeReconciliation.candidateStandaloneOutsideLedger, 19);
  assert.equal(matrix.scopeReconciliation.countsAreNotAdditive, true);
  assert.equal(matrix.aliasPolicy.executableRedirectsAuthorized, false);
  assert.ok(matrix.rows.every((row) => row.desktopBehavior && row.mobileBehavior && row.missingContentBehavior));
  assert.ok(catalogue.slots.length >= 20);
  assert.ok(catalogue.slots.every((slot) => slot.desktopBehavior && slot.mobileBehavior && slot.fallback && slot.forbidden.length));
  assert.match(routeText, /1440/);
  assert.match(routeText, /1024/);
  assert.match(routeText, /768/);
  assert.match(routeText, /390/);
});

test("customer adopters do not default commerce, offers, or evidence and exact documents fail closed", async () => {
  const [status, presentation, frontier, pdp, reportRoute, coaRoute, productRoute, adapter, routeSelectorAdapter] = await Promise.all([
    readSite("app/design-system/product-status.tsx"),
    readSite("app/design-system/frontier-product-presentation.ts"),
    readSite("app/design-system/frontier-content.ts"),
    readSite("app/design-system/pdp-sections.tsx"),
    readSite("app/open-lab/report/[batchId]/page.tsx"),
    readSite("app/open-lab/coa/[id]/page.tsx"),
    readSite("app/product/[slug]/page.tsx"),
    readSite("app/design-system/product-content-adapter.ts"),
    readSite("app/design-system/product-content-route-selector.ts"),
  ]);
  assert.match(status, /state = "unavailable"/);
  assert.match(presentation, /qualitativeFacts: \[\]/);
  assert.match(presentation, /inventory: "unavailable", evidence: "unavailable"/);
  assert.doesNotMatch(frontier.match(/export function productJsonLd[\s\S]*?\n\}/)?.[0] ?? "", /offers|InStock|product\.price/);
  assert.match(pdp, /No OpenLab record is currently bound to this product/);
  assert.match(pdp, /data-state=\{available \? "available" : "unavailable"\}/);
  assert.doesNotMatch(reportRoute, /rad140-registered/);
  assert.match(reportRoute, /if\(!productSlug\)return notFound\(\)/);
  assert.match(coaRoute, /id!=="r28868"/);
  assert.match(productRoute, /productJsonLdFromContent/);
  assert.doesNotMatch(productRoute, /frontierProductPresentation|ProductNarrative|ProductContinuation/);
  assert.match(adapter, /price: ""/);
  assert.match(adapter, /inventory: "unavailable"/);
  assert.match(routeSelectorAdapter, /PREPARED_NOT_ATTACHED/);
  assert.match(routeSelectorAdapter, /BOUNDED_SHOPPER_C2_V1_INTEGRATION_PROOF/);
  assert.match(routeSelectorAdapter, /RESOLVE_AT_REQUEST_TIME/);
  assert.doesNotMatch(routeSelectorAdapter, /fetch\(|serviceToken|tenantId|providerAdmin/i);
});
