import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const appRoot = path.resolve("app");
const authorityRoot = path.resolve("../..", "authority");
const read = (...segments) => fs.readFileSync(path.join(appRoot, ...segments), "utf8");

test("static MK-2866 delegates to the dynamic PDP composition and metadata", () => {
  const source = read("product", "mk-2866", "page.tsx");
  assert.match(source, /DynamicProductPage/);
  assert.match(source, /dynamicProductMetadata/);
  assert.match(source, /slug: "mk-2866"/);
  assert.doesNotMatch(source, /CustomerSiteChrome|£|InStock|Third-Party Tested/);
});

test("generic shop family route is an isolated noindex specimen, not a redirect regime", () => {
  const source = read("shop", "[family]", "page.tsx");
  assert.match(source, /data-owner-specimen="shop-family"/);
  assert.match(source, /index: false, follow: false/);
  assert.doesNotMatch(source, /redirect\(|notFound\(|FAMILY_DESTINATIONS|collections\/research-chemicals/);
});

test("continuation is an excluded noindex specimen with an anchored PDP return", () => {
  const continuation = read("product", "mk-2866", "continuation", "page.tsx");
  const routes = fs.readFileSync(path.join(appRoot, "design-system", "site-route-data.mjs"), "utf8");
  const map = fs.readFileSync(path.join(appRoot, "design-system", "site-route-map.ts"), "utf8");
  const matrix = fs.readFileSync(path.join(authorityRoot, "ROUTE-CONTENT-CONSUMPTION-MATRIX.json"), "utf8");
  assert.match(continuation, /index: false, follow: false/);
  assert.match(continuation, /data-owner-specimen="product-continuation"/);
  assert.match(continuation, /\/product\/mk-2866#product-continuation/);
  assert.doesNotMatch(routes, /product-continuation/);
  assert.doesNotMatch(map, /product-continuation/);
  assert.doesNotMatch(matrix, /\/product\/:slug\/continuation/);
});

test("search is a noindex utility form that preserves search input to Shop", () => {
  const source = read("search", "page.tsx");
  assert.match(source, /action="\/shop"/);
  assert.match(source, /name="search"/);
  assert.match(source, /defaultValue=\{query\}/);
  assert.match(source, /href="\/shop"/);
  assert.match(source, /index: false, follow: false/);
  assert.doesNotMatch(source, /exact-hit|zero-result|getCustomerProductFixture|action="\/search"/);
});
