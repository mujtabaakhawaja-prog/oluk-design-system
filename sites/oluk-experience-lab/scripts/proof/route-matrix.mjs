import { createRequire } from "node:module";
import { CUSTOMER_ROUTES } from "../../app/design-system/site-route-data.mjs";

const require = createRequire(import.meta.url);
const ledger = require("../../../../authority/SITE-ROUTE-LEDGER.json");

const concretePath = (route) => route.path
  .replace(":recordId", "source-bound-record")
  .replace(":batchId", "registered-record")
  .replace(":orderId?", "OL-10428")
  .replace(":orderId", "OL-10428")
  .replace(":slug", route.id === "collection" ? "featured" : "mk-2866")
  .replace(":id", "r28868")
  .replace(":doc", "privacy")
  .replace(":goal", "build");

const knownRouteMetadata = new Map(CUSTOMER_ROUTES.map((route) => [route.path, route]));

export const VIEWPORTS = Object.freeze([
  Object.freeze({ name: "desktop", width: 1440, height: 1000 }),
  Object.freeze({ name: "tablet", width: 1024, height: 900 }),
  Object.freeze({ name: "compact", width: 768, height: 900 }),
  Object.freeze({ name: "mobile", width: 390, height: 844 }),
]);

export const ROUTES = Object.freeze(
  ledger.routes
    .map((route) => {
      const path = concretePath(route);
      const known = knownRouteMetadata.get(path);
      return Object.freeze({
        id: route.id,
        path,
        // Route implementations outside the historic 51-route table still
        // receive the structural one-H1 audit. Exact copy is validated when a
        // declared route entry supplies the expected heading.
        heading: known?.heading ?? null,
    // Public-surface semantics stay independent from exhaustive QA coverage.
    customer: !["open-lab-admin", "owner-review", "not-found"].includes(route.id),
    qa: true,
        expectedStatus: route.id === "not-found" ? 404 : 200,
      });
    })
    .sort((left, right) => left.path.localeCompare(right.path)),
);
const OWNER_UTILITY_ROUTES = Object.freeze([]);

export const GOVERNANCE_PATTERNS = Object.freeze([
  "HUMAN_REVIEW_REQUIRED", "CANDIDATE · HUMAN REVIEW REQUIRED", "CONV-001",
  "MF01A ANATOMY", "CATALOGUE SOURCE PENDING", "SOURCE-BOUND", "DESIGN FIXTURE",
  "DEMO STATE", "NOT CONNECTED", "RENDERED DESIGN FIXTURE", "UNPROVISIONED RENDER",
]);

export function routeSlug(pathname) {
  return pathname === "/" ? "home" : pathname.replace(/^\//, "").replaceAll("/", "--");
}

export function selectRoutes(routeFilter) {
  if (!routeFilter) return ROUTES;
  const requested = new Set(routeFilter.split(",").map((value) => value.trim()).filter(Boolean));
  const selectable=[...ROUTES,...OWNER_UTILITY_ROUTES];
  const selected = selectable.filter(({ path }) => requested.has(path));
  const missing = [...requested].filter((path) => !selectable.some((route) => route.path === path));
  if (missing.length > 0) throw new Error(`Unknown route(s): ${missing.join(", ")}`);
  return selected;
}

export function selectViewports(widthFilter) {
  if (!widthFilter) return VIEWPORTS;
  const requested = new Set(widthFilter.split(",").map(Number));
  const selected = VIEWPORTS.filter(({ width }) => requested.has(width));
  const missing = [...requested].filter((width) => !VIEWPORTS.some((viewport) => viewport.width === width));
  if (missing.length > 0) throw new Error(`Unsupported proof width(s): ${missing.join(", ")}`);
  return selected;
}
