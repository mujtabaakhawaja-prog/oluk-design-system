import assert from "node:assert/strict";
import test from "node:test";
import {
  ASSET_PERFORMANCE_BUDGETS,
  auditAssetFontPerformance,
} from "../scripts/proof/asset-font-performance.mjs";

test("CX-NEXT-039 keeps media local and sized, fonts approved, and local build budgets explicit", async () => {
  const receipt = await auditAssetFontPerformance();

  assert.equal(receipt.run, "CX-NEXT-039_ASSET_FONT_PERFORMANCE");
  assert.equal(receipt.failCount, 0, JSON.stringify(receipt.checks.filter(({ status }) => status === "FAIL"), null, 2));
  assert.equal(receipt.measurements.customerRouteCount, 30);
  assert.ok(receipt.measurements.renderedProductImageCount >= 20);
  assert.deepEqual(receipt.measurements.emittedFontFamilies, ["Inter", "Plus Jakarta Sans"]);
  assert.deepEqual(receipt.budgets, ASSET_PERFORMANCE_BUDGETS);
  assert.match(receipt.budgetBasis, /no synthetic network timing claim/i);
});
