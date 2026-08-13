import assert from "node:assert/strict";
import test from "node:test";
import { auditCustomerCopy } from "../scripts/proof/customer-copy-audit.mjs";

test("CX-NEXT-045 audits all customer routes for exact truth and customer-safe terminology", async () => {
  const receipt = await auditCustomerCopy();

  assert.equal(receipt.run, "CX-NEXT-045_CUSTOMER_COPY_TERMINOLOGY");
  assert.equal(receipt.customerRouteCount, 49);
  assert.equal(receipt.routePassCount, 49);
  assert.equal(receipt.routeFailCount, 0);
  assert.equal(receipt.failCount, 0, JSON.stringify(receipt.checks.filter(({ status }) => status === "FAIL"), null, 2));
});
