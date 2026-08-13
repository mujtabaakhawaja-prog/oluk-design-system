export type CoreCustomerRouteKey =
  | "home"
  | "shop"
  | "product"
  | "reviews"
  | "about"
  | "evidence-os"
  | "openlab"
  | "records"
  | "record"
  | "dossier"
  | "lookup"
  | "methodology"
  | "source-chain"
  | "compare";

export type CustomerRouteSection = "site" | "shop" | "company" | "openlab";

export type CustomerRouteDefinition = Readonly<{
  key: CoreCustomerRouteKey;
  path: string;
  label: string;
  section: CustomerRouteSection;
}>;

export const customerRouteMap = [
  { key: "home", path: "/", label: "Home", section: "site" },
  { key: "shop", path: "/shop", label: "Shop", section: "shop" },
  { key: "product", path: "/product/mk-2866", label: "MK-2866", section: "shop" },
  { key: "reviews", path: "/reviews", label: "Customer reviews", section: "shop" },
  { key: "about", path: "/about", label: "About", section: "company" },
  { key: "evidence-os", path: "/about/evidence-os", label: "EvidenceOS", section: "company" },
  { key: "openlab", path: "/open-lab", label: "Overview", section: "openlab" },
  { key: "records", path: "/open-lab/records", label: "Records", section: "openlab" },
  {
    key: "record",
    path: "/open-lab/records/source-bound-record",
    label: "Selected record",
    section: "openlab",
  },
  {
    key: "dossier",
    path: "/open-lab/dossier/mk-2866",
    label: "MK-2866 dossier",
    section: "openlab",
  },
  { key: "lookup", path: "/open-lab/batch-lookup", label: "Batch lookup", section: "openlab" },
  {
    key: "methodology",
    path: "/open-lab/methodology",
    label: "Methodology",
    section: "openlab",
  },
  {
    key: "source-chain",
    path: "/open-lab/source-chain",
    label: "Source chain",
    section: "openlab",
  },
  { key: "compare", path: "/open-lab/compare", label: "Compare", section: "openlab" },
] as const satisfies ReadonlyArray<CustomerRouteDefinition>;

export const openLabNavigation = customerRouteMap.filter(
  (route) =>
    route.section === "openlab" &&
    route.key !== "record" &&
    route.key !== "dossier",
);

export const requiredStaticDestinationPaths = [
  "/lab-reports",
  "/search",
  "/bag",
  "/wholesale",
  "/account",
  "/contact",
  "/delivery",
  "/privacy",
  "/terms",
] as const;

const routesByKey = new Map(customerRouteMap.map((route) => [route.key, route]));

export function getCustomerRoute(key: CoreCustomerRouteKey): CustomerRouteDefinition {
  const route = routesByKey.get(key);
  if (!route) throw new Error(`Unknown customer route: ${key}`);
  return route;
}
