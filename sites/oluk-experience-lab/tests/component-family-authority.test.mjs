import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const read = (file) => readFile(path.join(repoRoot, file), "utf8");
const readJson = async (file) => JSON.parse(await read(file));

test("DEC-STOCK-002 makes restrained green the in-stock treatment without moving evidence off cobalt", async () => {
  const [ledger, currentState, bridge, tokens, globals] = await Promise.all([
    readJson("authority/DECISION-LEDGER.json"),
    readJson("authority/CURRENT-STATE.json"),
    readJson("authority/FIGMA-CODE-BRIDGE.json"),
    read("sites/oluk-experience-lab/app/design-system/candidate-tokens.css"),
    read("sites/oluk-experience-lab/app/globals.css"),
  ]);

  const decision = ledger.events.find(({ id }) => id === "DEC-STOCK-002");
  assert.ok(decision);
  assert.equal(decision.status, "CHAMPION");
  assert.deepEqual(decision.supersedes, ["DEC-STOCK-001 in-stock cobalt treatment only"]);
  assert.equal(currentState.inventoryStatus.decisionId, "DEC-STOCK-002");
  assert.deepEqual(currentState.inventoryStatus.states.inStock, {
    foreground: "#15803D",
    background: "#ECFDF3",
  });
  assert.equal(currentState.inventoryStatus.states.outOfStock.foreground, "#B42318");
  assert.equal(currentState.inventoryStatus.states.unavailable.foreground, "#64718A");
  assert.ok(currentState.inventoryStatus.cobaltReservedFor.includes("evidence"));

  for (const source of [tokens, globals]) {
    assert.match(source, /--oluk-stock-in-stock:\s*var\(--oluk-status-success\)/);
    assert.match(source, /--oluk-stock-in-stock-soft:\s*var\(--oluk-status-success-soft\)/);
  }

  assert.equal(
    bridge.bridgeTokens.find(({ css }) => css === "--oluk-status-success")?.value,
    "#15803d",
  );
  assert.equal(
    bridge.bridgeTokens.find(({ css }) => css === "--oluk-status-success-soft")?.value,
    "#ecfdf3",
  );
  const inventoryTokens = bridge.componentMappings.find(({ id }) => id === "inventory-status")?.tokens ?? [];
  assert.ok(inventoryTokens.includes("--oluk-stock-in-stock"));
  assert.ok(inventoryTokens.includes("--oluk-stock-in-stock-soft"));
  assert.match(globals, /\.evidence-status\[data-state="verified"\][\s\S]*?var\(--cobalt\)/);
});

test("the component-family review projection keeps customer-route adoption on hold", async () => {
  const currentState = await readJson("authority/CURRENT-STATE.json");
  assert.equal(currentState.componentFamilyReview.foundations, "ACCEPT");
  assert.equal(currentState.componentFamilyReview.metricRailComponent, "ACCEPT");
  assert.equal(currentState.componentFamilyReview.metricRailReviewGeometry, "ACCEPT");
  assert.equal(currentState.componentFamilyReview.customerRouteAdoption, "HOLD");

  for (const key of [
    "commerceCards",
    "purchasePanel",
    "pdpFirstFold",
    "openLabComposition",
    "checkoutPresentation",
  ]) {
    assert.equal(
      currentState.componentFamilyReview[key],
      "MACHINE_VERIFIED_HUMAN_REVIEW_REQUIRED",
    );
  }
});
