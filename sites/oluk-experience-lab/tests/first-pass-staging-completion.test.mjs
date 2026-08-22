import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("header exposes persistent staging currency and theme selectors without putting servings in primary navigation", async () => {
  const [header, preferences, navigation] = await Promise.all([
    read("app/design-system/site-header.tsx"),
    read("app/design-system/staging-preferences.tsx"),
    read("app/design-system/navigation-registry.ts"),
  ]);
  assert.match(header, /CurrencySelector/);
  assert.match(header, /ThemeSelector/);
  assert.match(header, /node\.label\.toUpperCase\(\)/);
  assert.match(preferences, /oluk-sites-currency-v1/);
  assert.match(preferences, /oluk-sites-theme-preview-v1/);
  assert.match(preferences, /localStorage\.setItem/);
  for (const currency of ["GBP", "USD", "EUR"]) assert.match(preferences, new RegExp(`\\b${currency}\\b`));
  assert.doesNotMatch(navigation, /servings-90|90 servings|Longer formats/);
});

test("homepage composes hero, assurance transition, and tri-tick in the required order", async () => {
  const [routes, triTick, status] = await Promise.all([
    read("app/customer-routes.tsx"),
    read("app/design-system/homepage-tri-tick.tsx"),
    read("app/design-system/product-status.tsx"),
  ]);
  const home = routes.match(/export function HomeRoute\(\)[\s\S]*?\n}\n\nexport function ProductRoute/)?.[0] ?? "";
  assert.ok(home.indexOf("<LockedHomeHero") < home.indexOf("<HomepageAssuranceTransition"));
  assert.ok(home.indexOf("<HomepageAssuranceTransition") < home.indexOf("<HomepageTriTick"));
  assert.match(triTick, /EVIDENCE OS/);
  assert.match(triTick, /HomepageTriTick/);
  assert.match(status, /OPENLAB VERIFIED/);
  assert.doesNotMatch(status, /EVIDENCE UNAVAILABLE/);
});

test("catalogue and OpenLab staging expose designed category and state specimens", async () => {
  const [catalogue, experience, archive, openlab] = await Promise.all([
    read("app/design-system/catalogue-category-rail.tsx"),
    read("app/experience-lab.tsx"),
    read("app/design-system/openlab-archive-explorer.tsx"),
    read("app/design-system/openlab-sections.tsx"),
  ]);
  for (const state of ["LOADING", "POPULATED", "FILTERED", "UNAVAILABLE"]) assert.match(catalogue, new RegExp(state));
  assert.match(experience, /CatalogueCategoryRail/);
  assert.match(experience, /complete Olympus Labs UK range/i);
  assert.match(archive, /Search records/);
  assert.match(archive, /Preview error state/);
  assert.match(archive, /NO RESULTS/);
  for (const product of ["MK-2866", "RAD-140", "MK-677"]) assert.match(openlab, new RegExp(product));
});

test("System Atlas renders foundation specimens and the generated component census", async () => {
  const [atlas, foundations, censusRaw] = await Promise.all([
    read("app/design-system/sites-system-atlas.tsx"),
    read("app/design-system/first-pass-foundations.tsx"),
    readFile(new URL("../../authority/generated/OLUK-COMPONENT-CENSUS-V1.json", root), "utf8"),
  ]);
  const census = JSON.parse(censusRaw);
  assert.equal(census.contract, "OLUK_COMPONENT_CENSUS_V1");
  assert.ok(census.counts.components > 100);
  assert.match(atlas, /FirstPassFoundationSpecimens/);
  assert.match(atlas, /CANONICAL COMPONENT CENSUS/);
  for (const specimen of ["Material, type, spacing, elevation, and icon roles", "Controls, statuses, rails, and responsive states", "Product-card and category-card families", "Route-family template foundations"]) {
    assert.match(foundations, new RegExp(specimen));
  }
});
