import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const customer = await readFile(new URL("app/customer-routes.tsx", root), "utf8");
const transaction = await readFile(new URL("app/design-system/transaction-presentation.tsx", root), "utf8");

test("one governed growth component family mounts on PDP, bag and confirmation", () => {
  assert.match(customer, /<UpsellContextRail \/>/);
  const recommendationMounts = transaction.match(/<RecommendationCard state="default" \/>/g) ?? [];
  assert.equal(recommendationMounts.length, 2);
  assert.match(transaction, /<RestockCard state="active" \/>/);
});
