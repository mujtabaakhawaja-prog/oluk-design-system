import assert from "node:assert/strict";
import test from "node:test";
import { auditCssColorContract } from "../scripts/proof/css-color-contract.mjs";

test("CONV-004 active CSS uses only governed literal colors", async () => {
  const receipt = await auditCssColorContract();
  assert.equal(receipt.status, "PASS");
  assert.equal(receipt.ungovernedLiteralCount, 0);
  assert.equal(receipt.rejectedLiteralCount, 0);
  assert.ok(receipt.scannedCssFiles >= 5);
});
