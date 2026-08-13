import { CUSTOMER_ROUTES } from "../../app/design-system/site-route-data.mjs";

export const VIEWPORTS = Object.freeze([
  Object.freeze({ name: "desktop", width: 1440, height: 1000 }),
  Object.freeze({ name: "tablet", width: 1024, height: 900 }),
  Object.freeze({ name: "compact", width: 768, height: 900 }),
  Object.freeze({ name: "mobile", width: 390, height: 844 }),
]);

export const ROUTES = Object.freeze(
  CUSTOMER_ROUTES
    .map(({ path, heading, authorityClass }) =>
      Object.freeze({ path, heading, customer: authorityClass !== "owner-review" }),
    )
    .sort((left, right) => left.path.localeCompare(right.path)),
);

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
  const selected = ROUTES.filter(({ path }) => requested.has(path));
  const missing = [...requested].filter((path) => !ROUTES.some((route) => route.path === path));
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
