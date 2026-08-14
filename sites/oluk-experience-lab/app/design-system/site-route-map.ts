import { CUSTOMER_ROUTES, PRIMARY_NAV_ROUTE_KEYS } from "./site-route-data.mjs";

export { CUSTOMER_ROUTES, PRIMARY_NAV_ROUTE_KEYS };

export type CustomerRouteDefinition = (typeof CUSTOMER_ROUTES)[number];
export type CoreCustomerRouteKey = CustomerRouteDefinition["key"];
export type CustomerRoutePath = CustomerRouteDefinition["path"];
export type CustomerRouteSection = CustomerRouteDefinition["section"];
export type RouteAuthorityClass = CustomerRouteDefinition["authorityClass"];

export const customerRouteMap = CUSTOMER_ROUTES;

export type RouteReviewTarget = Readonly<{
  nodeId: string;
  kind: "route-frame" | "state-frame" | "group-review-board";
}>;

/**
 * Executable visual-review provenance for every route in CUSTOMER_ROUTES.
 * Direct route/state frames are used where one exists; remaining routes point
 * to the current artifact-specific review board instead of an obsolete source
 * fragment.
 */
export const routeReviewTargets = {
  home: { nodeId: "764:50", kind: "route-frame" },
  shop: { nodeId: "765:50", kind: "route-frame" },
  product: { nodeId: "766:50", kind: "route-frame" },
  "product-continuation": { nodeId: "766:50", kind: "route-frame" },
  reviews: { nodeId: "921:2717", kind: "group-review-board" },
  about: { nodeId: "921:2717", kind: "group-review-board" },
  "evidence-os": { nodeId: "921:2717", kind: "group-review-board" },
  account: { nodeId: "921:2717", kind: "group-review-board" },
  bag: { nodeId: "870:72", kind: "state-frame" },
  checkout: { nodeId: "870:91", kind: "state-frame" },
  "checkout-information": { nodeId: "870:91", kind: "state-frame" },
  "checkout-delivery": { nodeId: "870:110", kind: "state-frame" },
  "checkout-payment-handoff": { nodeId: "870:129", kind: "state-frame" },
  "checkout-payment": { nodeId: "870:129", kind: "state-frame" },
  "checkout-processing": { nodeId: "870:148", kind: "state-frame" },
  "checkout-review": { nodeId: "870:110", kind: "state-frame" },
  "checkout-tracking": { nodeId: "870:167", kind: "state-frame" },
  "checkout-order-pay": { nodeId: "870:148", kind: "state-frame" },
  "checkout-confirmation": { nodeId: "870:167", kind: "state-frame" },
  "checkout-failure": { nodeId: "870:186", kind: "state-frame" },
  "checkout-retry": { nodeId: "870:205", kind: "state-frame" },
  contact: { nodeId: "921:2717", kind: "group-review-board" },
  delivery: { nodeId: "921:2717", kind: "group-review-board" },
  "lab-reports": { nodeId: "921:2703", kind: "group-review-board" },
  openlab: { nodeId: "767:50", kind: "route-frame" },
  "openlab-admin": { nodeId: "921:2724", kind: "group-review-board" },
  records: { nodeId: "921:2703", kind: "group-review-board" },
  record: { nodeId: "875:1094", kind: "route-frame" },
  dossier: { nodeId: "871:50", kind: "route-frame" },
  lookup: { nodeId: "921:2703", kind: "group-review-board" },
  methodology: { nodeId: "921:2703", kind: "group-review-board" },
  "source-chain": { nodeId: "921:2703", kind: "group-review-board" },
  compare: { nodeId: "872:445", kind: "route-frame" },
  compound: { nodeId: "921:2703", kind: "group-review-board" },
  report: { nodeId: "921:2703", kind: "group-review-board" },
  "openlab-evidence": { nodeId: "921:2703", kind: "group-review-board" },
  "compound-guide": { nodeId: "921:2703", kind: "group-review-board" },
  "stack-builder": { nodeId: "921:2703", kind: "group-review-board" },
  "dosing-calculator": { nodeId: "921:2703", kind: "group-review-board" },
  "cycle-planner": { nodeId: "921:2703", kind: "group-review-board" },
  "interaction-checker": { nodeId: "921:2703", kind: "group-review-board" },
  coa: { nodeId: "921:2703", kind: "group-review-board" },
  "research-papers": { nodeId: "921:2703", kind: "group-review-board" },
  "case-studies": { nodeId: "921:2703", kind: "group-review-board" },
  glossary: { nodeId: "921:2703", kind: "group-review-board" },
  "lab-partner": { nodeId: "921:2703", kind: "group-review-board" },
  privacy: { nodeId: "921:2717", kind: "group-review-board" },
  review: { nodeId: "921:2724", kind: "group-review-board" },
  "review-studio": { nodeId: "921:2724", kind: "group-review-board" },
  search: { nodeId: "921:2717", kind: "group-review-board" },
  terms: { nodeId: "921:2717", kind: "group-review-board" },
  wholesale: { nodeId: "921:2717", kind: "group-review-board" },
} as const satisfies Readonly<Record<CoreCustomerRouteKey, RouteReviewTarget>>;

export const openLabNavigation = customerRouteMap.filter(
  (route) =>
    route.section === "openlab" &&
    !["lab-reports", "record", "dossier"].includes(route.key),
);

export const requiredStaticDestinationPaths = customerRouteMap
  .filter((route) => route.section === "support" || route.section === "transaction")
  .map((route) => route.path);

const routesByKey = new Map(customerRouteMap.map((route) => [route.key, route]));
const routesByPath = new Map(customerRouteMap.map((route) => [route.path, route]));

export function getCustomerRoute(key: CoreCustomerRouteKey): CustomerRouteDefinition {
  const route = routesByKey.get(key);
  if (!route) throw new Error(`Unknown customer route: ${key}`);
  return route;
}

export function getCustomerRouteByPath(path: CustomerRoutePath): CustomerRouteDefinition {
  const route = routesByPath.get(path);
  if (!route) throw new Error(`Unknown customer path: ${path}`);
  return route;
}
