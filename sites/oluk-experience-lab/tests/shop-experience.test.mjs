import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appRoot = new URL("../app/", import.meta.url);

test("customer shell mirrors the production navigation contract without orphan static routes", async () => {
  const source = await readFile(new URL("experience-lab.tsx", appRoot), "utf8");
  const expectedNavigation = [
    ["SHOP", "/shop"],
    ["OPEN LAB", "/open-lab"],
    ["LAB RECORDS", "/lab-reports"],
    ["WHOLESALE", "/wholesale"],
    ["ABOUT", "/about"],
  ];

  let prior = -1;
  for (const [label, href] of expectedNavigation) {
    const current = source.indexOf(`href="${href}">${label}</a>`);
    assert.ok(current > prior, `${label} follows production navigation order`);
    prior = current;
  }

  for (const [label, href] of [["Search", "/search"], ["Bag", "/bag"]]) {
    assert.match(source, new RegExp(`href="${href}"[^>]*aria-label="${label}`, "i"));
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
  assert.match(discovery, /<button className=\{[^}]+\} disabled type="button">\{purchaseLabel\}<\/button>/);
  assert.match(discovery, /product\.imageSrc/);
});

test("Shop layout remains responsive without hiding geometry overflow", async () => {
  const css = await readFile(new URL("globals.css", appRoot), "utf8");

  assert.match(css, /\.shop-result-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.shop-result-grid\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(css, /\.shop-filter-groups\s*\{[^}]*grid-template-columns:\s*repeat\(5,/s);
  assert.match(css, /\.shop-result-media\s*\{[^}]*background:\s*var\(--oluk-media-gradient\)/s);
  assert.doesNotMatch(css, /\.shop-discovery[^}]*overflow-x:\s*clip/is);
});
