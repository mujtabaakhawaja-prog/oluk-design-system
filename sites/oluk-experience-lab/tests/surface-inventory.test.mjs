import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const inventory = JSON.parse(await readFile(new URL("../../../authority/generated/OLUK-SURFACE-INVENTORY-V1.json", import.meta.url)));
const presentation = JSON.parse(await readFile(new URL("../../../authority/generated/OLUK-PRESENTATION-SYSTEM-V2.json", import.meta.url)));
const routeAuthority = JSON.parse(await readFile(new URL("../../../authority/generated/OLUK-ROUTE-PRESENTATION-AUTHORITY-V1.json", import.meta.url)));
const approval = JSON.parse(await readFile(new URL("../../../authority/generated/OLUK-PRESENTATION-APPROVAL-V1.pending.json", import.meta.url)));

test("surface inventory imports exactly 74 routes and 15 product instances", () => {
  assert.equal(inventory.contract, "OLUK_SURFACE_INVENTORY_V1");
  assert.equal(inventory.counts.routeDefinitions, 74);
  assert.equal(inventory.counts.productRouteInstances, 15);
  assert.equal(routeAuthority.routeCount, 74);
  assert.equal(routeAuthority.routes.length, 74);
  assert.equal(inventory.entities.filter((item) => item.kind === "route_definition").length, 74);
  assert.equal(inventory.entities.filter((item) => item.kind === "route_instance" && item.id.startsWith("route-instance.product.")).length, 15);
  assert.equal(inventory.routeCountLaw.historicalSitesRouteDefinitions, 73);
  assert.deepEqual(inventory.routeCountLaw.admittedDelta, ["/bundle-builder"]);
  assert.equal(inventory.routeCountLaw.canonicalNativeNextRouteDefinitions, 74);
  assert.deepEqual(routeAuthority.routeCountLaw, inventory.routeCountLaw);
  assert.deepEqual(presentation.routeCountLaw, inventory.routeCountLaw);
});

test("every route owns a template and an ordered slot graph", () => {
  for (const route of routeAuthority.routes) {
    assert.ok(route.templateId);
    assert.ok(route.orderedSlots.length > 0, route.routeId);
    route.orderedSlots.forEach((slot, index) => {
      assert.equal(slot.order, index);
      assert.ok(inventory.enums.placementPolicy.includes(slot.placementPolicy));
    });
  }
});

test("PDP grammar is complete and only the builder placement is flaggable", () => {
  const product = routeAuthority.routes.find((route) => route.routeId === "product");
  assert.equal(product.instanceRequirement.count, 15);
  assert.deepEqual(product.orderedSlots.map((slot) => slot.role), [
    "shell.utility", "shell.header", "shell.mega-menu", "pdp.breadcrumb", "pdp.first-fold",
    "pdp.assurance", "pdp.label-media", "pdp.narrative", "pdp.dossier", "pdp.openlab-evidence",
    "pdp.relationships", "pdp.builder", "pdp.faq-education", "pdp.continuation",
    "mobile.sticky-decision", "shell.footer",
  ]);
  assert.equal(product.orderedSlots.filter((slot) => slot.placementPolicy === "optional_flagged").length, 1);
  assert.equal(product.orderedSlots.find((slot) => slot.role === "pdp.builder").featureId, "feature.pdp-builder");
});

test("source authority, containment, integration, lifecycle, and exposure remain separate", () => {
  for (const item of inventory.entities) {
    assert.ok(inventory.enums.authorityClass.includes(item.authorityClass), item.id);
    assert.ok(inventory.enums.sourceContainment.includes(item.sourceContainment), item.id);
    assert.ok(inventory.enums.integrationDisposition.includes(item.integrationDisposition), item.id);
    assert.ok(inventory.enums.lifecycle.includes(item.lifecycle), item.id);
    assert.ok(inventory.enums.exposure.includes(item.exposure), item.id);
  }
});

test("active contracts remain provider-neutral and human approval remains pending", () => {
  const serialized = JSON.stringify({ inventory, presentation, routeAuthority });
  assert.equal(serialized.includes("OPENLAB VERIFIED"), false);
  assert.equal(serialized.includes("X-Tenant-ID"), false);
  assert.equal(serialized.includes("wooProductId"), false);
  assert.equal(presentation.responsiveViewports.join(","), "1440,1024,768,390");
  assert.equal(approval.status, "PENDING_HUMAN_REVIEW");
  assert.equal(approval.decision, null);
});

test("PDP metric, package, purchase, and inventory quantities remain distinct", () => {
  const fields = new Set(presentation.fieldIds);
  for (const id of [
    "field.metric.strength",
    "field.metric.servings",
    "field.metric.purity",
    "field.package.capsule-count",
    "field.purchase.package-count",
    "field.purchase.selected-quantity",
    "field.purchase.total-servings",
    "field.commerce.available-quantity",
  ]) assert.equal(fields.has(id), true, id);
  for (const stale of [
    "field.product.strength-display",
    "field.product.servings-display",
    "field.evidence.purity-display",
    "field.commerce.quantity",
  ]) assert.equal(fields.has(stale), false, stale);
  assert.equal(presentation.componentIds.includes("component.pdp-atmospheric-media-field"), true);
  assert.equal(presentation.componentIds.includes("component.product-media-chamber"), true);
  assert.equal(presentation.componentIds.includes("component.pdp-first-fold"), false);
  assert.equal(presentation.moduleIds.includes("module.pdp-first-fold"), true);
});

test("all sources have bounded dispositions and no legacy source is active authority", () => {
  const sources = inventory.entities.filter((item) => item.kind === "source_candidate");
  assert.ok(sources.length >= 8);
  assert.ok(sources.every((item) => item.sources.length > 0 && item.sourceContainment && item.integrationDisposition));
  for (const source of sources.filter((item) => ["SUPERSEDED_WITH_REASON", "OBSOLETE_VITE_RUNTIME", "GENERATED_EVIDENCE_ONLY"].includes(item.sourceContainment))) {
    assert.notEqual(source.authorityClass, "canonical");
  }
});
