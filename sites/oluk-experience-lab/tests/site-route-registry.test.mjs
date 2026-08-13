import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  CUSTOMER_ROUTES,
  PRIMARY_NAV_ROUTE_KEYS,
} from "../app/design-system/site-route-data.mjs";
import { ROUTES } from "../scripts/proof/route-matrix.mjs";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appRoot = path.join(siteRoot, "app");

async function pageRoutes(directory = appRoot) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await pageRoutes(absolute));
    if (entry.isFile() && entry.name === "page.tsx") {
      const relative = path.relative(appRoot, path.dirname(absolute));
      paths.push(relative ? `/${relative}` : "/");
    }
  }
  return paths.sort();
}

test("one executable registry controls all 31 physical pages and browser proof routes", async () => {
  assert.equal(CUSTOMER_ROUTES.length, 31);
  assert.equal(new Set(CUSTOMER_ROUTES.map(({ key }) => key)).size, 31);
  assert.equal(new Set(CUSTOMER_ROUTES.map(({ path: routePath }) => routePath)).size, 31);
  assert.deepEqual(
    [...CUSTOMER_ROUTES.map(({ path: routePath }) => routePath)].sort(),
    await pageRoutes(),
  );
  assert.deepEqual(
    ROUTES.map(({ path: routePath }) => routePath),
    [...CUSTOMER_ROUTES.map(({ path: routePath }) => routePath)].sort(),
  );
  assert.deepEqual(PRIMARY_NAV_ROUTE_KEYS, ["shop", "openlab", "lab-reports", "wholesale", "about"]);
});

test("React route execution is exhaustive against the shared route key type", async () => {
  const source = await readFile(path.join(appRoot, "experience-lab.tsx"), "utf8");
  assert.match(source, /type ExperienceRouteKey = Exclude<CoreCustomerRouteKey, "review">/);
  assert.match(source, /satisfies Readonly<Record<ExperienceRouteKey, \(lookupReference\?: string\) => ReactNode>>/);
  assert.doesNotMatch(source, /type RouteKey\s*=/);
  assert.match(source, /const content = routeRenderers\[route\]\(lookupReference\)/);
});

test("owner review derives all 31 links from the route registry and current Figma targets", async () => {
  const routeMap = await readFile(path.join(appRoot, "design-system/site-route-map.ts"), "utf8");
  const review = await readFile(path.join(appRoot, "design-system/candidate-review.tsx"), "utf8");

  assert.match(routeMap, /routeReviewTargets\s*=\s*\{/);
  assert.match(routeMap, /satisfies Readonly<Record<CoreCustomerRouteKey, RouteReviewTarget>>/);
  assert.match(review, /CUSTOMER_ROUTES\.map\(\(route\) =>/);
  assert.match(review, /routeReviewTargets\[route\.key\]/);
  assert.doesNotMatch(review, /const baselineRoutes\s*=/);

  for (const currentNode of [
    "764:50", "765:50", "766:50", "767:50",
    "870:72", "870:91", "870:110", "870:129", "870:148", "870:167", "870:186", "870:205",
    "871:50", "872:445", "875:1094", "921:2703", "921:2717", "921:2724",
  ]) {
    assert.match(routeMap, new RegExp(currentNode.replace(":", "\\:")), currentNode);
  }
  for (const staleNode of ["614:75950", "551:27148", "564:64871", "626:11285"]) {
    assert.doesNotMatch(routeMap + review, new RegExp(staleNode.replace(":", "\\:")), staleNode);
  }
  assert.match(routeMap, /"evidence-os":\s*\{\s*nodeId:\s*"921:2717"/);
});
