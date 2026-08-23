import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const customer = await readFile(new URL("app/customer-routes.tsx", root), "utf8");
const transaction = await readFile(new URL("app/design-system/transaction-presentation.tsx", root), "utf8");
const frontier = await readFile(new URL("app/design-system/frontier-sections.tsx", root), "utf8");

test("one governed growth component family mounts on PDP, bag and confirmation", () => {
  assert.match(customer, /<UpsellContextRail \/>/);
  assert.doesNotMatch(transaction, /RecommendationCard/, "checkout must not redraw product recommendations outside ProductCommerceCard");
  assert.match(transaction, /<RestockCard state="active" \/>/);
  assert.match(transaction, /<RestockCard state="due-soon" \/>/);
});

test("the outcome-led stack continuation mounts only on admitted PDP and transaction hosts", () => {
  assert.match(transaction, /<YourStackBuilder baselineSlug="mk-2866" host="bag" \/>/);
  assert.match(transaction, /<YourStackBuilder baselineSlug="mk-2866" host="confirmation" \/>/);
  assert.doesNotMatch(frontier, /<YourStackBuilder[^>]+host="account"/);
  assert.match(frontier, /AccountSessionState = "unauthenticated" \| "empty" \| "unavailable"/);
  assert.match(frontier, /<YourStackBuilder baselineSlug=\{product\.slug\} host="pdp"\/>/);
});
