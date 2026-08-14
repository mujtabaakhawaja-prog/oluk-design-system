import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const contract = await readFile(new URL("app/design-system/payment-trust-contract.ts", root), "utf8");
const component = await readFile(new URL("app/design-system/payment-trust.tsx", root), "utf8");
const program = await readFile(new URL("app/program-routes.tsx", root), "utf8");
const transaction = await readFile(new URL("app/design-system/transaction-presentation.tsx", root), "utf8");

test("payment-trust copy inherits the approved R6 lifecycle vocabulary", () => {
  for (const copy of [
    "You are paying the USD equivalent of the displayed GBP amount.",
    "Your order total of £133.00 GBP was processed and paid as its fixed USD equivalent of $180.59 USD.",
    "Your order amount of £133.00 GBP was processed and paid as its fixed USD equivalent of $180.59 USD.",
    "Paid as its fixed USD equivalent of $180.59 USD.",
    "Your refund of £133.00 GBP was issued as the same fixed USD equivalent originally paid: $180.59 USD.",
  ]) assert.match(contract, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(contract, /recordHeading: "Amount Processed"/);
  assert.match(contract, /065523a49da2d3920c75ad4659ccff132d15650e/);
  assert.match(contract, /paymentExpandedNodeId: "9:9401"/);
});

test("currency equality is one reusable non-live component", () => {
  assert.match(component, /data-live-authority="false"/);
  assert.match(component, /CurrencyEqualityLock/);
  assert.match(component, /LifecycleAmountRecord/);
  assert.match(program, /TransactionPresentation/);
  assert.match(transaction, /<CurrencyEqualityLock/);
});

test("payment shell stays static and provider-free", () => {
  const combined = `${component}\n${program}\n${transaction}`;
  assert.doesNotMatch(combined, /fetch\(|axios|XMLHttpRequest|WebSocket|Stripe|stripe-js|onSubmit|<form/i);
  assert.match(program, /TransactionPresentation/);
  assert.match(transaction, /disabled type="button">Pay securely/);
});
