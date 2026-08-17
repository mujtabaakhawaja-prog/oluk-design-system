import routeSelectorProjection from "./product-content-route-selectors.generated.json";
import { getProductContentEntry } from "./product-content-adapter";

type RouteSelector = Readonly<{
  id: string;
  routePatterns: ReadonlyArray<string>;
  module: string;
  component?: string;
  audience: string;
  sourceLayers: ReadonlyArray<string>;
  fieldRefs: ReadonlyArray<string>;
  missingContentBehavior: string;
  forbidden: ReadonlyArray<string>;
  stateReadiness: Readonly<Record<string, string>>;
}>;

type FieldPolicy = Readonly<{
  fieldRef: string;
  kind: "CONTENT_ATOM" | "ATOM_COLLECTION" | "STRUCTURAL_FIELD" | "RUNTIME_RESOLVER";
  states: ReadonlyArray<string>;
  emission: "CUSTOMER_VALUE" | "EXPLICIT_UNAVAILABLE" | "OMIT" | "RUNTIME_RESOLVER_ONLY";
  provenanceBindingIds: ReadonlyArray<string>;
  sourceLayers: ReadonlyArray<string>;
  resolver?: Readonly<{
    owner: "WOO_C2";
    resolverKey: string;
    fallback: string;
  }>;
}>;

type ProductSelector = Readonly<{
  canonicalProductId: string;
  slug: string;
  fields: Readonly<Record<string, FieldPolicy>>;
}>;

const projection = routeSelectorProjection as unknown as Readonly<{
  schemaVersion: "oluk.product-content-route-selectors.v1";
  attachmentPolicy: Readonly<{
    state: "PREPARED_NOT_ATTACHED";
    prerequisite: "BOUNDED_SHOPPER_C2_V1_INTEGRATION_PROOF";
    credentials: "NONE";
    browserAuthorityCalls: false;
    runtimeMutationAuthorized: false;
    publicationAuthorized: false;
  }>;
  contentHash: string;
  routeSelectors: ReadonlyArray<RouteSelector>;
  products: ReadonlyArray<ProductSelector>;
}>;

const routeById = new Map(projection.routeSelectors.map((selector) => [selector.id, selector]));
const productByIdentity = new Map(projection.products.flatMap((product) => [
  [product.canonicalProductId, product] as const,
  [product.slug, product] as const,
]));

function readPath(value: unknown, dottedPath: string): unknown {
  for (const segment of dottedPath.split(".")) {
    if (value === null || typeof value !== "object" || Array.isArray(value) || !Object.hasOwn(value, segment)) return undefined;
    value = (value as Readonly<Record<string, unknown>>)[segment];
  }
  return value;
}

export const productContentRouteSelectorIds = projection.routeSelectors.map((selector) => selector.id);

export function getProductContentRouteSelector(selectorId: string) {
  return routeById.get(selectorId) ?? null;
}

export function selectProductContentForRoute(selectorId: string, productIdentity: string) {
  const route = routeById.get(selectorId);
  const productPolicy = productByIdentity.get(productIdentity);
  const product = getProductContentEntry(productIdentity);
  if (!route || !productPolicy || !product) return null;

  return {
    schemaVersion: projection.schemaVersion,
    contentHash: projection.contentHash,
    attachmentPolicy: projection.attachmentPolicy,
    route: {
      id: route.id,
      routePatterns: route.routePatterns,
      module: route.module,
      component: route.component,
      audience: route.audience,
      missingContentBehavior: route.missingContentBehavior,
      forbidden: route.forbidden,
    },
    product: {
      canonicalProductId: productPolicy.canonicalProductId,
      slug: productPolicy.slug,
    },
    fields: route.fieldRefs.map((fieldRef) => {
      const policy = productPolicy.fields[fieldRef];
      const value = policy?.emission === "CUSTOMER_VALUE" || policy?.emission === "EXPLICIT_UNAVAILABLE"
        ? readPath(product.customer, fieldRef)
        : null;
      const actions = policy?.kind === "RUNTIME_RESOLVER"
        ? ["RESOLVE_AT_REQUEST_TIME"]
        : [...new Set((policy?.states ?? ["UNMAPPED"]).map((state) => route.stateReadiness[state] ?? "OMIT"))];
      return {
        fieldRef,
        kind: policy?.kind ?? "STRUCTURAL_FIELD",
        states: policy?.states ?? ["UNMAPPED"],
        actions,
        emission: policy?.emission ?? "OMIT",
        value: value ?? null,
        provenanceBindingIds: policy?.provenanceBindingIds ?? [],
        sourceLayers: policy?.sourceLayers ?? [],
        resolver: policy?.resolver ?? null,
      };
    }),
  } as const;
}
