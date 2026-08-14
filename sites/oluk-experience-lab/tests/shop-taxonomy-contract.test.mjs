import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const authorityUrl = new URL(
  "../../../authority/SHOP-TAXONOMY-CONTRACT.json",
  import.meta.url,
);
const moduleUrl = new URL(
  "../app/design-system/shop-taxonomy.ts",
  import.meta.url,
);

async function readAuthority() {
  return JSON.parse(await readFile(authorityUrl, "utf8"));
}

async function loadTaxonomyModule() {
  const source = await readFile(moduleUrl, "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: "shop-taxonomy.ts",
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics ?? []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  assert.deepEqual(errors, [], "taxonomy module transpiles without diagnostics");
  return import(
    `data:text/javascript;base64,${Buffer.from(result.outputText).toString("base64")}`
  );
}

test("authority contract preserves exact source ownership and taxonomy dimensions", async () => {
  const authority = await readAuthority();

  assert.equal(authority.schemaVersion, "oluk.shop-taxonomy-contract.v1");
  assert.equal(authority.status, "DESIGN_REVIEW_FIXTURE_READ_ONLY_NON_LIVE");
  assert.equal(authority.runtimeMutationAuthorized, false);
  assert.equal(authority.publicationAuthorized, false);
  assert.equal(authority.sources.liveShop.url, "https://olympuslabs.uk/shop");
  assert.equal(
    authority.sources.wooCategories.url,
    "https://olympuslabs.uk/wp-json/wc/store/v1/products/categories",
  );
  assert.equal(
    authority.sources.wooTags.url,
    "https://olympuslabs.uk/wp-json/wc/store/v1/products/tags",
  );
  assert.deepEqual(
    authority.header.primaryNavigation.map(({ label, href }) => [label, href]),
    [
      ["SHOP", "/shop"],
      ["OPEN LAB", "/open-lab"],
      ["LAB RECORDS", "/lab-reports"],
      ["WHOLESALE", "/wholesale"],
      ["ABOUT", "/about"],
    ],
  );

  assert.deepEqual(
    authority.dimensions.family.values.map(({ slug }) => slug),
    ["sarms", "research-chemicals", "prohormones", "stacks"],
  );
  assert.deepEqual(
    authority.dimensions.family.excludedValues.map(({ slug }) => slug),
    ["uncategorised"],
  );
  assert.deepEqual(
    authority.dimensions.goal.values.map(({ routeSlug, wooTagSlug }) => [
      routeSlug,
      wooTagSlug,
    ]),
    [
      ["strength", "strength"],
      ["body-composition", "body-composition"],
      ["bulk", "bulking"],
      ["cutting", "cutting"],
      ["endurance", "endurance"],
    ],
  );
  assert.equal(authority.dimensions.form.wooAttributeAvailable, false);
  assert.equal(authority.dimensions.servings.wooAttributeAvailable, false);
  assert.match(authority.dimensions.availability.kind, /dynamic-runtime-state/);
});

test("typed model normalizes singular/plural family drift and the bulk route alias", async () => {
  const taxonomy = await loadTaxonomyModule();

  assert.equal(taxonomy.normalizeShopFamily("SARM"), "sarms");
  assert.equal(taxonomy.normalizeShopFamily("SARMs"), "sarms");
  assert.equal(
    taxonomy.normalizeShopFamily("Research Chemical"),
    "research-chemicals",
  );
  assert.equal(taxonomy.normalizeShopFamily("Prohormones"), "prohormones");
  assert.equal(taxonomy.normalizeShopFamily("Stack"), "stacks");
  assert.equal(taxonomy.normalizeShopFamily("Uncategorised"), null);
  assert.equal(taxonomy.normalizeShopGoalRoute("bulk"), "bulking");
  assert.equal(taxonomy.normalizeShopGoalRoute("not-a-goal"), null);
  assert.equal(taxonomy.normalizeShopForm("Capsules"), "capsules");
});

test("servings parse only source-owned values and availability retains dynamic states", async () => {
  const taxonomy = await loadTaxonomyModule();

  assert.equal(
    taxonomy.parseSourceOwnedServings("90 CAPS", "SOURCE_OWNED"),
    90,
  );
  assert.equal(
    taxonomy.parseSourceOwnedServings("60 SERVINGS", "SOURCE_OWNED"),
    60,
  );
  assert.equal(
    taxonomy.parseSourceOwnedServings("90 CAPS", "DESIGN_SEED"),
    null,
  );
  assert.equal(
    taxonomy.parseSourceOwnedServings("90 total capsules", "SOURCE_OWNED"),
    null,
  );

  assert.equal(
    taxonomy.normalizeWooAvailability({
      isInStock: true,
      isPurchasable: true,
    }),
    "in-stock",
  );
  assert.equal(
    taxonomy.normalizeWooAvailability({
      isInStock: false,
      isPurchasable: true,
    }),
    "out-of-stock",
  );
  assert.equal(
    taxonomy.normalizeWooAvailability({
      isOnBackorder: true,
      isPurchasable: true,
    }),
    "on-backorder",
  );
  assert.equal(
    taxonomy.normalizeWooAvailability({ isPurchasable: false }),
    "unavailable",
  );
  assert.equal(taxonomy.normalizeWooAvailability({}), "unknown");
});

test("deterministic fixtures are immutable, non-live and combine facets correctly", async () => {
  const taxonomy = await loadTaxonomyModule();
  const fixtures = taxonomy.SHOP_TAXONOMY_FIXTURE_PRODUCTS;

  assert.ok(Object.isFrozen(fixtures));
  assert.equal(fixtures.length, 8);
  for (const product of fixtures) {
    assert.ok(Object.isFrozen(product));
    assert.ok(Object.isFrozen(product.familySlugs));
    assert.ok(Object.isFrozen(product.goalTagSlugs));
    assert.equal(product.reviewOnly, true);
    assert.equal(product.liveAuthority, false);
    assert.match(product.customerPath, /^\/product\//);
    if (product.fixtureId === "rad-140") assert.equal(product.imageSrc, "/assets/products/rad-140/front.png");
    else assert.match(product.imageSrc, /^\/assets\/products\/shop\//);
    assert.match(product.imageSourceUrl, /^https:\/\/olympuslabs\.uk\/wp-content\/uploads\//);
    assert.equal(product.currencyCode, "GBP");
    assert.ok(product.capturedPriceMinor > 0);
  }

  assert.deepEqual(
    taxonomy
      .filterShopTaxonomyFixtures({
        families: ["research-chemicals"],
        goals: ["strength"],
        forms: ["capsules"],
        servings: [30],
        availability: ["in-stock"],
      })
      .map(({ fixtureId }) => fixtureId),
    ["ment"],
  );
  assert.deepEqual(
    taxonomy
      .filterShopTaxonomyFixtures({
        families: ["prohormones"],
        goals: ["bulk"],
        availability: ["out-of-stock"],
      })
      .map(({ fixtureId }) => fixtureId),
    ["epistane"],
  );
  assert.deepEqual(
    taxonomy
      .filterShopTaxonomyFixtures({ families: ["stacks"] })
      .map(({ fixtureId }) => fixtureId),
    ["stack-source-gap"],
  );

  assert.equal(
    taxonomy.SHOP_TAXONOMY_MODEL.authority,
    "DESIGN_REVIEW_FIXTURE_READ_ONLY_NON_LIVE",
  );
  assert.equal(taxonomy.SHOP_TAXONOMY_MODEL.liveAuthority, false);
  assert.equal(taxonomy.SHOP_TAXONOMY_MODEL.runtimeMutationAuthorized, false);
});

test("typed definitions remain aligned with authority JSON", async () => {
  const [authority, taxonomy] = await Promise.all([
    readAuthority(),
    loadTaxonomyModule(),
  ]);

  assert.equal(taxonomy.SHOP_TAXONOMY_MODEL.schemaVersion, authority.schemaVersion);
  assert.equal(taxonomy.SHOP_TAXONOMY_MODEL.capturedAt, authority.capturedAt);
  assert.deepEqual(
    taxonomy.SHOP_FAMILY_OPTIONS.map(({ slug }) => slug),
    authority.dimensions.family.values.map(({ slug }) => slug),
  );
  assert.deepEqual(
    taxonomy.SHOP_GOAL_OPTIONS.map(({ slug, wooTagSlug }) => [slug, wooTagSlug]),
    authority.dimensions.goal.values.map(({ routeSlug, wooTagSlug }) => [
      routeSlug,
      wooTagSlug,
    ]),
  );
  assert.deepEqual(
    taxonomy.SHOP_SERVINGS_OPTIONS.map(({ count }) => count),
    authority.dimensions.servings.values.map(({ count }) => count),
  );
  assert.deepEqual(
    taxonomy.SHOP_AVAILABILITY_OPTIONS.map(({ slug }) => slug),
    authority.dimensions.availability.values.map(({ slug }) => slug),
  );
  assert.deepEqual(
    taxonomy.SHOP_TAXONOMY_FIXTURE_PRODUCTS.map(({ fixtureId }) => fixtureId),
    authority.deterministicFixtures.products.map(({ fixtureId }) => fixtureId),
  );
  assert.deepEqual(
    taxonomy.SHOP_TAXONOMY_FIXTURE_PRODUCTS.map(
      ({ fixtureId, displayName, imageSrc, imageSourceUrl, capturedPriceMinor }) => ({
        fixtureId,
        displayName,
        imageSrc,
        imageSourceUrl,
        capturedPriceMinor,
      }),
    ),
    authority.deterministicFixtures.products.map(
      ({ fixtureId, displayName, imageSrc, imageSourceUrl, capturedPriceMinor }) => ({
        fixtureId,
        displayName,
        imageSrc,
        imageSourceUrl,
        capturedPriceMinor,
      }),
    ),
  );
});
