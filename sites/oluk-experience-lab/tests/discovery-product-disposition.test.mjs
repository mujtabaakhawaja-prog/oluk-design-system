import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("the concrete MK-2866 path delegates to the canonical dynamic PDP composition and metadata", async () => {
  const concrete = await read("../app/product/mk-2866/page.tsx");
  const dynamic = await read("../app/product/[slug]/page.tsx");
  const composition = await read("../app/product/product-page.tsx");
  assert.match(concrete, /ProductPageComposition product=\{product\}/);
  assert.match(concrete, /productPageMetadata\(product\)/);
  assert.doesNotMatch(concrete, /redirect\(|robots:/);
  assert.match(dynamic, /ProductPageComposition product=\{product\}/);
  assert.match(dynamic, /generateStaticParams\(\).*frontierProducts/s);
  assert.match(composition, /ProductContinuation product=\{product\}/);
});

test("review specimens cannot become customer collection or continuation destinations", async () => {
  const family = await read("../app/shop/[family]/page.tsx");
  const continuation = await read("../app/product/mk-2866/continuation/page.tsx");
  const routes = await read("../app/design-system/site-route-data.mjs");
  const frontier = await read("../app/design-system/frontier-content.ts");
  for (const source of [family, continuation]) assert.match(source, /robots: \{ index: false, follow: false \}/);
  assert.match(family, /OwnerReviewSpecimen/);
  assert.doesNotMatch(family, /ProductCollection|frontierProducts|generateStaticParams/);
  assert.match(continuation, /\/product\/mk-2866#product-continuation/);
  assert.doesNotMatch(routes, /key: "product-continuation"/);
  assert.match(routes, /OWNER_REVIEW_SPECIMEN_PATHS/);
  assert.doesNotMatch(frontier, /"\/shop\/\[family\]"/);
});

test("search is a noindex utility forwarder to the canonical shop query", async () => {
  const page = await read("../app/search/page.tsx");
  const experience = await read("../app/experience-lab.tsx");
  assert.match(page, /robots: \{ index: false, follow: false \}/);
  assert.match(page, /ExperienceLab route="search"/);
  const searchRenderer = experience.slice(experience.indexOf("function SearchPage"), experience.indexOf("function WholesalePage"));
  assert.match(searchRenderer, /<form action="\/shop"[^>]*method="get"/);
  assert.match(searchRenderer, /name="search"/);
  assert.match(searchRenderer, /href="\/shop"/);
  assert.doesNotMatch(searchRenderer, /ShopDiscovery|ProductCollection/);
});
