import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const readJson = async (relative) => JSON.parse(await readFile(path.join(repoRoot, relative), "utf8"));

test("the 73-route ledger separates design maturity from runtime readiness", async () => {
  const ledger = await readJson("authority/SITE-ROUTE-LEDGER.json");
  assert.equal(ledger.routes.length, 73);
  assert.deepEqual(ledger.designMaturityStates, ["scaffold", "composed", "dual-reference-ready", "champion-approved"]);
  assert.deepEqual(ledger.runtimeReadinessStates, ["presentation-only", "projection-ready", "authority-deferred", "live-integrated"]);
  for (const route of ledger.routes) {
    assert.ok(ledger.designMaturityStates.includes(route.designMaturity), `${route.id} design maturity`);
    assert.ok(ledger.runtimeReadinessStates.includes(route.runtimeReadiness), `${route.id} runtime readiness`);
  }
  const deferred = ledger.routes.filter((route) => route.runtimeReadiness === "authority-deferred");
  assert.ok(deferred.every((route) => route.designMaturity === "scaffold" || route.designMaturity === "composed"));
});

test("every registered module has a Sites reference, Figma destination, and mobile strategy", async () => {
  const registry = await readJson("authority/DESIGN-SYNC-REGISTRY.json");
  const mounts = await readJson("authority/FRONTIER-SECTION-MOUNT-REGISTRY.json");
  assert.equal(registry.fileKey, "BEPMuUt1HroEw8xjz8CVyN");
  assert.equal(registry.sourceStandard.commit, "e4153a2");
  assert.equal(registry.records.length, mounts.sections.length + 1);
  assert.ok(registry.records.some(({ id }) => id === "global-shell-navigation"));
  assert.equal(new Set(registry.records.map(({ id }) => id)).size, registry.records.length);
  for (const record of registry.records) {
    assert.ok(record.siteReference.path.startsWith("/"), record.id);
    assert.equal(record.figmaReference.fileKey, registry.fileKey, record.id);
    assert.ok(record.canonicalComponents.length > 0, record.id);
    assert.ok(["reorder", "collapse", "summary", "carousel", "horizontal-scroll", "stack-allowed"].includes(record.mobileStrategy), record.id);
    if (record.status !== "sites-built") {
      assert.ok(record.figmaReference.desktopNodeId && record.figmaReference.mobileNodeId, `${record.id} must bind both Figma widths`);
    }
  }
});

test("navigation is sentence case and canonical contextual surfaces are split", async () => {
  const navigation = await readFile(path.join(siteRoot, "app/design-system/navigation-registry.ts"), "utf8");
  const header = await readFile(path.join(siteRoot, "app/design-system/site-header.tsx"), "utf8");
  const contextual = await readFile(path.join(siteRoot, "app/design-system/contextual-navigation.tsx"), "utf8");
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
