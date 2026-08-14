import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appRoot = new URL("../app/", import.meta.url);

test("customer shell mirrors the production navigation contract without orphan static routes", async () => {
  const source = await readFile(new URL("experience-lab.tsx", appRoot), "utf8");
  const headerSource = await readFile(new URL("design-system/site-header.tsx", appRoot), "utf8");
  const navigationSource = await readFile(new URL("design-system/navigation-registry.ts", appRoot), "utf8");
  const { CUSTOMER_ROUTES, PRIMARY_NAV_ROUTE_KEYS } = await import("../app/design-system/site-route-data.mjs");
  assert.deepEqual(PRIMARY_NAV_ROUTE_KEYS, ["shop", "openlab", "lab-reports", "wholesale", "about"]);
  assert.deepEqual(
    PRIMARY_NAV_ROUTE_KEYS.map((key) => CUSTOMER_ROUTES.find((route) => route.key === key)?.path),
    ["/shop", "/open-lab", "/lab-reports", "/wholesale", "/about"],
  );
  assert.match(source, /<SiteHeader route=\{route\}/);
  assert.match(headerSource, /NAVIGATION_TREE\.map/);
  assert.match(navigationSource, /label: "LEARN"/);
  assert.match(navigationSource, /Lab Records Archive/);

  for (const [label, href] of [["Search", "/search"], ["Bag", "/bag"]]) {
    assert.match(headerSource, new RegExp(`<a(?=[^>]*href="${href}")(?=[^>]*aria-label="${label}")[^>]*>`, "i"));
  }

  for (const pathname of [
    "lab-reports",
    "search",
    "wholesale",
    "account",
    "contact",
    "delivery",
    "privacy",
    "terms",
  ]) {
    const route = await readFile(new URL(`${pathname}/page.tsx`, appRoot), "utf8");
    assert.match(route, /<ExperienceLab\s+route=/, `${pathname} is a static presentation route`);
  }

  assert.match(navigationSource, /By family/);
  assert.match(navigationSource, /By goal/);
  assert.match(navigationSource, /Stacks & bundles/);
  assert.match(headerSource, /contextualNavigation\(route\)/);
  assert.match(headerSource, /aria-label="Contextual navigation"/);
});

test("Shop uses independent combinable facets and keeps the candidate non-live", async () => {
  const [routeSource, discovery] = await Promise.all([
    readFile(new URL("experience-lab.tsx", appRoot), "utf8"),
    readFile(new URL("design-system/shop-discovery.tsx", appRoot), "utf8"),
  ]);

  assert.match(routeSource, /function ShopPage\(\)[\s\S]*<ShopDiscovery\s*\/>/);
  assert.doesNotMatch(routeSource, /\["SARMs",\s*"Peptides",\s*"Longevity",\s*"Nootropics"\]/);

  for (const facet of ["Family", "Goal", "Form", "Servings", "Availability"]) {
    assert.match(discovery, new RegExp(`<legend>${facet}</legend>`));
  }
  for (const queryKey of ["family", "goal", "form", "servings", "availability"]) {
    assert.match(discovery, new RegExp(`searchParams\\.append\\("${queryKey}"`));
  }

  assert.match(discovery, /data-selection-law="or-within-and-across"/);
  assert.match(discovery, /data-live-authority="false"/g);
  assert.match(discovery, /aria-live="polite"/);
  assert.match(discovery, /<fieldset>/g);
  assert.match(discovery, /import \{ ProductCommerceCard \} from "\.\/product-commerce-card"/);
  assert.match(discovery, /import \{ mk2866Fixture, type ProductMediaAsset \} from "\.\/product-fixtures"/);
  assert.match(discovery, /product\.fixtureId === "mk-2866"[\s\S]*?<ProductCommerceCard[\s\S]*?product=\{mk2866Fixture\}[\s\S]*?variant="featured"/);
  assert.match(discovery, /className="shop-result-card shop-result-card-canonical"/);
  assert.match(discovery, /function ShopDiscoveryResult/);
  assert.match(discovery, /<ProductMediaChamber context="featured" media=\{taxonomyMedia\(product\)\} \/>/);
  assert.match(discovery, /<StockPill className="shop-result-availability" state=\{stockState\(product\)\} \/>/);
  assert.doesNotMatch(discovery, /function ShopResultCard|shop-result-orbit|<img/);
  assert.match(discovery, /<button className=\{[^}]+\} disabled type="button">\{purchaseLabel\}<\/button>/);
  assert.match(discovery, /product\.imageSrc/);
});

test("Shop layout remains responsive without hiding geometry overflow", async () => {
  const css = await readFile(new URL("globals.css", appRoot), "utf8");

  assert.match(css, /\.shop-result-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.shop-result-grid\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(css, /\.shop-filter-groups\s*\{[^}]*grid-template-columns:\s*repeat\(5,/s);
  assert.doesNotMatch(css, /\.shop-result-media|\.shop-result-orbit/);
  assert.doesNotMatch(css, /\.shop-discovery[^}]*overflow-x:\s*clip/is);
});
