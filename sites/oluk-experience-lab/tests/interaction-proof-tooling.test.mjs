import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [proof, packageSource] = await Promise.all([
  readFile(new URL("../scripts/proof/interaction-state-proof.mjs", import.meta.url), "utf8"),
  readFile(new URL("../package.json", import.meta.url), "utf8"),
]);
const packageJson = JSON.parse(packageSource);

test("interaction proof exposes a caller-owned output receipt and unpublished posture", () => {
  assert.equal(packageJson.scripts["proof:interactions"], "node scripts/proof/interaction-state-proof.mjs");
  assert.match(proof, /option\("output"/);
  assert.match(proof, /cx37-interaction-state-proof\.json/);
  assert.match(proof, /oluk\.interaction-state-proof\.v1/);
  assert.match(proof, /HUMAN_REVIEW_REQUIRED_UNPUBLISHED/);
  assert.match(proof, /runtimeMutationAuthorized:\s*false/);
  assert.match(proof, /customerUiMutationPerformed:\s*false/);
});

test("interaction proof covers the three required real-browser state suites", () => {
  for (const route of ["/review", "/shop?search=mk", "/open-lab/batch-lookup"]) {
    assert.match(proof, new RegExp(route.replace(/[?]/g, "\\?")));
  }
  for (const caseId of [
    "quantity-change",
    "added-local-state",
    "unavailable-local-state",
    "out-of-stock-local-state",
    "reset-local-states",
    "record-search",
    "record-type-filter",
    "keyboard-tabs-arrow-navigation",
    "record-reveal",
    "combined-query-and-five-facets",
    "mobile-filter-disclosure-open-close",
    "lookup-no-result-transition",
    "lookup-found-transition",
    "lookup-unavailable-transition",
  ]) {
    assert.match(proof, new RegExp(caseId));
  }
  assert.match(proof, /Input\.dispatchKeyEvent/);
  assert.match(proof, /Network\.requestWillBeSent/);
  assert.match(proof, /Network\.webSocketCreated/);
  assert.match(proof, /zero-runtime-network-callbacks/);
});

test("interaction proof remains tooling-only and does not contain runtime mutation endpoints", () => {
  for (const forbidden of [/wc\/store\/cart/i, /\/api\/checkout/i, /add-to-cart/i, /payment_bridge/i, /complete_payment/i]) {
    assert.doesNotMatch(proof, forbidden);
  }
});
