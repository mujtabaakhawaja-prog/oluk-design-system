import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = async (file) => readFile(path.join(siteRoot, file), "utf8");
const execFileAsync = promisify(execFile);

test("the product experience compiler emits the locked 16-product catalogue", async () => {
  const catalogue = JSON.parse(await read("app/design-system/product-experience-catalog.json"));
  assert.equal(catalogue.schemaVersion, "oluk.product-experience.v2");
  assert.equal(catalogue.products.length, 16);
  assert.match(catalogue.contentHash, /^[a-f0-9]{64}$/);
  assert.match(catalogue.editorialCorpusHash, /^[a-f0-9]{64}$/);
  const product = (slug) => catalogue.products.find((entry) => entry.product.slug === slug).product;
  assert.deepEqual([product("mk-2866").strength, product("mk-2866").servings, product("mk-2866").price, product("mk-2866").sku], ["15 MG", "90 SERVINGS", "£43", "80529-01"]);
  assert.deepEqual([product("rad-140").strength, product("rad-140").servings, product("rad-140").price], ["8 MG", "60 SERVINGS", "£55"]);
  assert.deepEqual([product("lgd-4033").strength, product("lgd-4033").servings, product("lgd-4033").price], ["5 MG", "", "£44"]);
  assert.equal(product("ment").series, "PROHORMONE SERIES");
  assert.deepEqual([product("gw-501516").slug, product("gw-501516").name, product("gw-501516").strength], ["gw-501516", "GW-50156", "10 MG"]);
});

test("all 16 product experiences compile from an attributed customer editorial corpus", async () => {
  const [catalogue, corpus] = await Promise.all([
    read("app/design-system/product-experience-catalog.json").then(JSON.parse),
    read("../../authority/PRODUCT-EDITORIAL-SOURCE-CORPUS.json").then(JSON.parse),
  ]);
  assert.equal(corpus.schemaVersion, "oluk.product-editorial-corpus.v1");
  assert.equal(Object.keys(corpus.products).length, 16);
  assert.equal(Object.keys(corpus.sources).length, 4);
  for (const entry of catalogue.products) {
    const editorial = entry.editorial;
    assert.equal(editorial.sourceAttribution.length, corpus.products[entry.product.slug].sources.length, entry.product.slug);
    assert.ok(editorial.sourceAttribution.every((source) => source.sha256 === corpus.sources[source.id].sha256), entry.product.slug);
    assert.equal(editorial.summary, corpus.products[entry.product.slug].editorial.summary, entry.product.slug);
    assert.equal(editorial.customerProposition.headline, corpus.products[entry.product.slug].proposition.headline, entry.product.slug);
    assert.equal(editorial.customerProposition.benefits.length, 3, entry.product.slug);
    assert.equal(entry.pdp.decision.primaryAction, editorial.customerProposition.primaryAction, entry.product.slug);
    assert.equal(entry.discovery.mobileSummary, editorial.customerProposition.mobileSummary, entry.product.slug);
  }
});

test("the product compiler is deterministic and rejects stale generated editorial output", async () => {
  await execFileAsync("node", ["scripts/compile-product-experience.mjs", "--check"], { cwd: siteRoot });
  const first = await read("app/design-system/product-experience-catalog.json");
  await execFileAsync("node", ["scripts/compile-product-experience.mjs"], { cwd: siteRoot });
  const second = await read("app/design-system/product-experience-catalog.json");
  assert.equal(second, first);
});

test("outcome-led stack and OpenLab depth replace tier language and hard-coded charts", async () => {
  const [content, builder, openLab, catalogue] = await Promise.all([
    read("app/design-system/frontier-content.ts"), read("app/design-system/your-stack-builder.tsx"),
    read("app/design-system/openlab-product-experience.tsx"), read("app/design-system/product-experience-catalog.json"),
  ]);
  assert.doesNotMatch(content, /Good, Better|tiers:/);
  for (const value of ["Cutting", "Bulking", "Recomp", "PCT", "lgd-4033", "gw-501516", "epistane"]) assert.match(builder, new RegExp(value));
  for (const value of ["report history", "label comparison", "analytes", "source context"]) assert.match(openLab, new RegExp(value));
  assert.doesNotMatch(openLab, /74%|79%/);
  assert.equal(JSON.parse(catalogue).openLab["mk-2866"].visualizations.history.length, 1);
});

test("every promotion placement carries execution metadata", async () => {
  const matrix = JSON.parse(await read("../../authority/ROUTE-PROMOTION-MATRIX.json"));
  for (const route of matrix.routeDispositions) {
    assert.equal(route.promoted, route.promotedPlacements.length > 0);
    assert.ok(route.promotedPlacements.length + route.promotablePlacements.length > 0);
    for (const placement of [...route.promotedPlacements, ...route.promotablePlacements]) {
      for (const key of ["customerPurpose", "sourceContent", "actualMediaPolicy", "mobileStrategy", "invalidatedConsumers"]) assert.ok(placement[key]);
    }
  }
});
