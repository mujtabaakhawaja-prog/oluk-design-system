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

test("the Wave 2 compiler emits a 16-product fail-closed customer projection", async () => {
  const [projection, packageJson, legacyCatalogue] = await Promise.all([
    read("app/design-system/product-content.generated.json").then(JSON.parse),
    read("package.json").then(JSON.parse),
    read("app/design-system/product-experience-catalog.json").then(JSON.parse),
  ]);
  assert.equal(projection.schemaVersion, "oluk.product-content-projection.v1");
  assert.equal(projection.products.length, 16);
  assert.match(projection.contentHash, /^[a-f0-9]{64}$/);
  assert.equal(projection.products.filter(({ customer }) => customer.readinessState === "CONTENT_READY").length, 1);
  assert.equal(legacyCatalogue.schemaVersion, "oluk.product-experience.v2", "historical output remains readable but is not the active product contract");

  const product = (slug) => projection.products.find(({ canonicalProductId }) => canonicalProductId === slug);
  const mk2866 = product("mk-2866");
  assert.deepEqual(
    [mk2866.customer.content.facts.strength, mk2866.customer.content.facts.servings, mk2866.customer.content.facts.purity, mk2866.customer.content.facts.sku],
    ["15 MG", "90 SERVINGS", ">99%", "80529-01"],
  );
  for (const entry of projection.products) {
    assert.equal(entry.customer.commerce.price.value, null, `${entry.canonicalProductId}: price`);
    assert.equal(entry.customer.commerce.inventory.value, null, `${entry.canonicalProductId}: inventory`);
    assert.equal(entry.customer.commerce.purchasability.value, null, `${entry.canonicalProductId}: purchasability`);
  }
  assert.equal(product("rad-140").customer.canonicalIdentity, undefined);
  assert.equal(product("gw-501516").customer.canonicalIdentity, undefined);
  assert.equal(packageJson.scripts["product:compile"], "node scripts/compile-product-content.mjs");
  assert.equal(packageJson.scripts["product:legacy:compile"], "node scripts/compile-product-experience.mjs");
});

test("source-bound facts stay in authority until their customer-ready state is approved", async () => {
  const [registry, projection, ledger] = await Promise.all([
    read("../../authority/PRODUCT-CONTENT-REGISTRY.json").then(JSON.parse),
    read("app/design-system/product-content.generated.json").then(JSON.parse),
    read("../../authority/COPY-SOURCE-PROVENANCE-LEDGER.json").then(JSON.parse),
  ]);
  assert.equal(registry.schemaVersion, "oluk.product-content.v1");
  assert.equal(registry.products.length, 16);
  assert.ok(ledger.bindings.length > 0);

  const authorityProduct = (id) => registry.products.find(({ canonicalProductId }) => canonicalProductId === id);
  const customerProduct = (id) => projection.products.find(({ canonicalProductId }) => canonicalProductId === id);
  const rad140 = authorityProduct("rad-140");
  assert.equal(rad140.readinessState, "SOURCE_BOUND");
  assert.equal(rad140.canonicalIdentity.name.value, "RAD-140");
  assert.equal(rad140.content.facts.strength.value, "8 MG");
  assert.equal(rad140.content.facts.servings.value, "60 SERVINGS");
  assert.equal(customerProduct("rad-140").customer.canonicalIdentity, undefined);
  assert.equal(customerProduct("rad-140").customer.content.facts, undefined);

  const gw = authorityProduct("gw-501516");
  assert.equal(gw.canonicalIdentity.name.value, "GW-501516");
  assert.equal(gw.canonicalIdentity.aliases.find(({ kind }) => kind === "LEGACY_EDITORIAL").value, "GW-50156");
  assert.equal(gw.canonicalIdentity.aliases.find(({ kind }) => kind === "LEGACY_EDITORIAL").state, "EDITORIAL_CHOICE");
  assert.equal(customerProduct("gw-501516").customer.canonicalIdentity, undefined);
});

test("the active product-content compiler is deterministic and the legacy compiler stays isolated", async () => {
  await execFileAsync("node", ["scripts/compile-product-content.mjs", "--check"], { cwd: siteRoot });
  const first = await read("app/design-system/product-content.generated.json");
  await execFileAsync("node", ["scripts/compile-product-content.mjs"], { cwd: siteRoot });
  const second = await read("app/design-system/product-content.generated.json");
  assert.equal(second, first);
});

test("OpenLab adopts generated product content and fails closed for unapproved stack relationships", async () => {
  const [openLabFrontier, adapter, openLab] = await Promise.all([
    read("app/design-system/openlab-frontier.tsx"),
    read("app/design-system/product-content-adapter.ts"),
    read("app/design-system/openlab-product-experience.tsx"),
  ]);
  assert.match(openLabFrontier, /getCustomerProductFixture/);
  assert.match(openLabFrontier, /getProductRouteVariant/);
  assert.match(openLabFrontier, /"stack-builder": "DESIGN_INCOMPLETE"/);
  assert.match(openLabFrontier, /Stack building is not available yet\./);
  assert.doesNotMatch(openLabFrontier, /product-experience-catalog|frontier-content|<YourStackBuilder/);
  assert.doesNotMatch(adapter, /product-experience-catalog|frontier-content/);
  for (const value of ["report history", "label comparison", "analytes", "source context"]) assert.match(openLab, new RegExp(value));
  assert.doesNotMatch(openLab, /74%|79%/);
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
