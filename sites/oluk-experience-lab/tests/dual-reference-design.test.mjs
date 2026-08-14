import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const readJson = async (relative) => JSON.parse(await readFile(path.join(repoRoot, relative), "utf8"));
const CURRENT_STATES = ["SITES_BUILT", "SITES_CAPTURED_CURRENT", "FIGMA_NATIVE_MIRROR_CREATED", "FIGMA_REVIEWED", "VISUAL_SYNC_CURRENT", "CHAMPION_APPROVED", "DESIGN_INCOMPLETE"];

test("the 73-route ledger separates Sites maturity from runtime readiness without overstating historic Figma evidence", async () => {
  const [ledger, stateModel] = await Promise.all([
    readJson("authority/SITE-ROUTE-LEDGER.json"),
    readJson("authority/DESIGN-SYNC-STATE-MODEL.json"),
  ]);
  assert.equal(ledger.routes.length, 73);
  assert.deepEqual(ledger.designMaturityStates, CURRENT_STATES);
  assert.deepEqual(stateModel.states, CURRENT_STATES);
  assert.deepEqual(ledger.runtimeReadinessStates, ["presentation-only", "projection-ready", "authority-deferred", "live-integrated"]);
  for (const route of ledger.routes) {
    assert.ok(CURRENT_STATES.includes(route.designMaturity), `${route.id} design maturity`);
    assert.ok(ledger.runtimeReadinessStates.includes(route.runtimeReadiness), `${route.id} runtime readiness`);
    assert.equal(route.designSyncState, "FIGMA_HISTORICAL_REFERENCE", `${route.id} Figma evidence`);
  }
  assert.equal(ledger.routes.filter(({ designMaturity }) => designMaturity === "DESIGN_INCOMPLETE").length, 4);
});

test("every module reference is explicitly historical until a current Sites capture and native Figma mirror exist", async () => {
  const [registry, mounts] = await Promise.all([
    readJson("authority/DESIGN-SYNC-REGISTRY.json"),
    readJson("authority/FRONTIER-SECTION-MOUNT-REGISTRY.json"),
  ]);
  assert.equal(registry.fileKey, "BEPMuUt1HroEw8xjz8CVyN");
  assert.equal(registry.authorityModel.sites, "design-ssot");
  assert.equal(registry.authorityModel.figma, "native-editable-inspection-mirror");
  assert.equal(registry.status, "HISTORICAL_REFERENCES_RECONCILED");
  assert.equal(registry.records.length, mounts.sections.length + 1);
  for (const record of registry.records) {
    assert.equal(record.status, "SITES_BUILT", record.id);
    assert.equal(record.figmaMirrorState, "FIGMA_HISTORICAL_REFERENCE", record.id);
    assert.equal(record.currentCapture.state, "NOT_CAPTURED_CURRENT", record.id);
    assert.equal(record.figmaReference.state, "HISTORICAL_REFERENCE", record.id);
    assert.ok(record.canonicalComponents.length > 0, record.id);
    assert.ok(["reorder", "collapse", "summary", "carousel", "horizontal-scroll", "stack-allowed"].includes(record.mobileStrategy), record.id);
  }
});

test("every ledger route retains inspectable historic Figma nodes without claiming current visual synchronization", async () => {
  const [routePairs, designRegistry, ledger] = await Promise.all([
    readJson("authority/ROUTE-DESIGN-SYNC-REGISTRY.json"),
    readJson("authority/DESIGN-SYNC-REGISTRY.json"),
    readJson("authority/SITE-ROUTE-LEDGER.json"),
  ]);
  assert.equal(routePairs.status, "HISTORICAL_REFERENCES_RECONCILED");
  assert.equal(routePairs.captureEvidence.state, "HISTORICAL_CAPTURE_EVIDENCE");
  assert.equal(routePairs.records.length, 73);
  assert.deepEqual(new Set(routePairs.records.map(({ routeId }) => routeId)), new Set(ledger.routes.map(({ id }) => id)));
  for (const record of routePairs.records) {
    assert.ok(designRegistry.records.some(({ id }) => id === record.moduleRecord), record.moduleRecord);
    assert.match(record.desktopNodeId, /^\d+:\d+$/, `${record.routeId} desktop`);
    assert.match(record.mobileNodeId, /^\d+:\d+$/, `${record.routeId} mobile`);
    assert.equal(record.status, "SITES_BUILT", record.routeId);
    assert.equal(record.figmaMirrorState, "FIGMA_HISTORICAL_REFERENCE", record.routeId);
    assert.equal(record.currentCapture.state, "NOT_CAPTURED_CURRENT", record.routeId);
    assert.equal(record.siteReference.historical, true, record.routeId);
  }
});

test("navigation is sentence case and canonical contextual surfaces are split", async () => {
  const [navigation, header, contextual] = await Promise.all([
    readFile(path.join(siteRoot, "app/design-system/navigation-registry.ts"), "utf8"),
    readFile(path.join(siteRoot, "app/design-system/site-header.tsx"), "utf8"),
    readFile(path.join(siteRoot, "app/design-system/contextual-navigation.tsx"), "utf8"),
  ]);
  for (const label of ['label: "Shop"', 'label: "OpenLab"', 'label: "Learn"', 'label: "Wholesale"', 'label: "About"']) assert.match(navigation, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(header, /ProductCommerceCard/);
  assert.match(header, /rad140Fixture/);
  assert.match(contextual, /ProductContextNav/);
  assert.match(contextual, /OpenLabContextNav/);
  assert.match(contextual, /CheckoutStepIndicator\.Context/);
  assert.doesNotMatch(navigation, /label: "LAB RECORDS"/);
});

test("frontier products expose a customer proposition contract", async () => {
  const content = await readFile(path.join(siteRoot, "app/design-system/frontier-content.ts"), "utf8");
  assert.match(content, /interface CustomerProposition|type CustomerProposition/);
  for (const key of ["eyebrow", "headline", "promise", "benefits", "differentiator", "primaryAction", "mobileSummary"]) assert.match(content, new RegExp(`${key}:`));
  assert.doesNotMatch(content, /RAD-140[^\n]*10 MG/);
});
