import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const customer = await readFile(new URL("app/customer-routes.tsx", root), "utf8");
const productPage = await readFile(new URL("app/product/[slug]/page.tsx", root), "utf8");
const bundleBuilderPage = await readFile(new URL("app/bundle-builder/page.tsx", root), "utf8");

test("the adopted PDP consumes registry copy without unapproved relationship modules", () => {
  const productRoute = customer.match(
    /export function ProductRoute\(\)[\s\S]*?\n}\n\nexport function OpenLabRoute/,
  )?.[0] ?? "";

  assert.match(productRoute, /getCustomerProductFixture\("mk-2866"\)/);
  assert.match(productRoute, /<ProductContentNarrative\b/);
  assert.match(productRoute, /<ProductContentFaqs\b/);
  assert.doesNotMatch(productRoute, /<(?:UpsellContextRail|RelatedRail|AssuranceRail|YourStackBuilder)\b/);
});

test("relationship-led continuation stays unavailable until editorial reasons are approved", () => {
  assert.match(productPage, /from "\.\.\/\.\.\/design-system\/product-content-adapter"/);
  assert.doesNotMatch(productPage, /(?:ProductContinuation|YourStackBuilder|UpsellContextRail|RelatedRail|AssuranceRail)/);
  assert.match(bundleBuilderPage, /PresentationState/);
  assert.match(bundleBuilderPage, /state="unavailable"/);
  assert.match(bundleBuilderPage, /No customer-ready bundle rationale is approved/i);
});
