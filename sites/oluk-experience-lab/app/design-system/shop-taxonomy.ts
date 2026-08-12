export const SHOP_TAXONOMY_FIXTURE_AUTHORITY =
  "DESIGN_REVIEW_FIXTURE_READ_ONLY_NON_LIVE" as const;

export type ShopFamilySlug =
  | "sarms"
  | "research-chemicals"
  | "prohormones"
  | "stacks";

export type ShopGoalRouteSlug =
  | "strength"
  | "body-composition"
  | "bulk"
  | "cutting"
  | "endurance";

export type ShopGoalTagSlug =
  | "strength"
  | "body-composition"
  | "bulking"
  | "cutting"
  | "endurance";

export type ShopFormSlug = "capsules";
export type ShopServingsCount = 30 | 60 | 90;
export type ShopAvailabilityState =
  | "in-stock"
  | "out-of-stock"
  | "on-backorder"
  | "unavailable"
  | "unknown";

export type SourceOwnedMetricSource =
  | "SOURCE_OWNED"
  | "SKU_OWNED"
  | "DESIGN_SEED"
  | "WOO_API";

export interface ShopTaxonomyOption<Slug extends string> {
  readonly slug: Slug;
  readonly label: string;
}

export interface ShopGoalOption extends ShopTaxonomyOption<ShopGoalRouteSlug> {
  readonly wooTagSlug: ShopGoalTagSlug;
}

export interface ShopServingsOption {
  readonly count: ShopServingsCount;
  readonly label: string;
}

export interface ShopTaxonomyFixtureProduct {
  readonly fixtureId: string;
  readonly wooProductId: number;
  readonly wooSlug: string;
  readonly sku: string | null;
  readonly displayName: string;
  readonly displayAlias: string | null;
  readonly customerPath: `/product/${string}`;
  readonly imageSrc: `/assets/${string}`;
  readonly imageSourceUrl: `https://${string}`;
  readonly imageAlt: string;
  readonly capturedPriceMinor: number;
  readonly currencyCode: "GBP";
  readonly familySlugs: readonly ShopFamilySlug[];
  readonly goalTagSlugs: readonly ShopGoalTagSlug[];
  readonly formSlug: ShopFormSlug | null;
  readonly servingsCount: ShopServingsCount | null;
  readonly availabilityState: ShopAvailabilityState;
  readonly reviewOnly: true;
  readonly liveAuthority: false;
}

export interface ShopTaxonomySelection {
  readonly families?: readonly ShopFamilySlug[];
  readonly goals?: readonly ShopGoalRouteSlug[];
  readonly forms?: readonly ShopFormSlug[];
  readonly servings?: readonly ShopServingsCount[];
  readonly availability?: readonly ShopAvailabilityState[];
}

export interface WooAvailabilityInput {
  readonly isInStock?: boolean;
  readonly isOnBackorder?: boolean;
  readonly isPurchasable?: boolean;
}

export const SHOP_FAMILY_OPTIONS = Object.freeze([
  Object.freeze({ slug: "sarms", label: "SARMs" }),
  Object.freeze({ slug: "research-chemicals", label: "Research Chemicals" }),
  Object.freeze({ slug: "prohormones", label: "Prohormones" }),
  Object.freeze({ slug: "stacks", label: "Stacks" }),
] as const satisfies readonly ShopTaxonomyOption<ShopFamilySlug>[]);

export const SHOP_GOAL_OPTIONS = Object.freeze([
  Object.freeze({ slug: "strength", wooTagSlug: "strength", label: "Strength" }),
  Object.freeze({
    slug: "body-composition",
    wooTagSlug: "body-composition",
    label: "Body composition",
  }),
  Object.freeze({ slug: "bulk", wooTagSlug: "bulking", label: "Bulk" }),
  Object.freeze({ slug: "cutting", wooTagSlug: "cutting", label: "Cutting" }),
  Object.freeze({ slug: "endurance", wooTagSlug: "endurance", label: "Endurance" }),
] as const satisfies readonly ShopGoalOption[]);

export const SHOP_FORM_OPTIONS = Object.freeze([
  Object.freeze({ slug: "capsules", label: "Capsules" }),
] as const satisfies readonly ShopTaxonomyOption<ShopFormSlug>[]);

export const SHOP_SERVINGS_OPTIONS = Object.freeze([
  Object.freeze({ count: 30, label: "30 servings" }),
  Object.freeze({ count: 60, label: "60 servings" }),
  Object.freeze({ count: 90, label: "90 servings" }),
] as const satisfies readonly ShopServingsOption[]);

export const SHOP_AVAILABILITY_OPTIONS = Object.freeze([
  Object.freeze({ slug: "in-stock", label: "In stock" }),
  Object.freeze({ slug: "out-of-stock", label: "Out of stock" }),
  Object.freeze({ slug: "on-backorder", label: "On backorder" }),
  Object.freeze({ slug: "unavailable", label: "Unavailable" }),
  Object.freeze({ slug: "unknown", label: "Availability pending" }),
] as const satisfies readonly ShopTaxonomyOption<ShopAvailabilityState>[]);

const FAMILY_ALIASES: Readonly<Record<string, ShopFamilySlug>> = Object.freeze({
  sarm: "sarms",
  sarms: "sarms",
  "research-chemical": "research-chemicals",
  "research-chemicals": "research-chemicals",
  prohormone: "prohormones",
  prohormones: "prohormones",
  stack: "stacks",
  stacks: "stacks",
});

const GOAL_ROUTE_TO_TAG: Readonly<Record<ShopGoalRouteSlug, ShopGoalTagSlug>> =
  Object.freeze({
    strength: "strength",
    "body-composition": "body-composition",
    bulk: "bulking",
    cutting: "cutting",
    endurance: "endurance",
  });

function normalizedKey(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_]+/g, "-");
}

export function normalizeShopFamily(value: string): ShopFamilySlug | null {
  return FAMILY_ALIASES[normalizedKey(value)] ?? null;
}

export function normalizeShopGoalRoute(
  value: string,
): ShopGoalTagSlug | null {
  return GOAL_ROUTE_TO_TAG[normalizedKey(value) as ShopGoalRouteSlug] ?? null;
}

export function normalizeShopForm(value: string): ShopFormSlug | null {
  const normalized = normalizedKey(value);
  return normalized === "capsules" || normalized === "capsule"
    ? "capsules"
    : null;
}

export function parseSourceOwnedServings(
  value: string,
  source: SourceOwnedMetricSource,
): ShopServingsCount | null {
  if (source !== "SOURCE_OWNED") return null;
  const match = value.trim().match(/^(30|60|90)\s+(?:CAPS|CAPSULES|SERVINGS)$/i);
  if (!match) return null;
  return Number(match[1]) as ShopServingsCount;
}

export function normalizeWooAvailability({
  isInStock,
  isOnBackorder,
  isPurchasable,
}: WooAvailabilityInput): ShopAvailabilityState {
  if (isPurchasable === false) return "unavailable";
  if (isOnBackorder === true) return "on-backorder";
  if (isInStock === true) return "in-stock";
  if (isInStock === false) return "out-of-stock";
  return "unknown";
}

function fixture(
  product: Omit<ShopTaxonomyFixtureProduct, "reviewOnly" | "liveAuthority">,
): ShopTaxonomyFixtureProduct {
  return Object.freeze({
    ...product,
    familySlugs: Object.freeze([...product.familySlugs]),
    goalTagSlugs: Object.freeze([...product.goalTagSlugs]),
    reviewOnly: true,
    liveAuthority: false,
  });
}

export const SHOP_TAXONOMY_FIXTURE_PRODUCTS = Object.freeze([
  fixture({
    fixtureId: "mk-2866",
    wooProductId: 7384,
    wooSlug: "mk-2866-ostarine",
    sku: "80529-01",
    displayName: "MK-2866",
    displayAlias: "Ostarine",
    customerPath: "/product/mk-2866-ostarine",
    imageSrc: "/assets/products/shop/mk-2866.webp",
    imageSourceUrl: "https://olympuslabs.uk/wp-content/uploads/2018/05/bottle-01-300x450.webp",
    imageAlt: "MK-2866 Ostarine bottle",
    capturedPriceMinor: 4300,
    currencyCode: "GBP",
    familySlugs: ["sarms"],
    goalTagSlugs: ["strength"],
    formSlug: "capsules",
    servingsCount: 90,
    availabilityState: "in-stock",
  }),
  fixture({
    fixtureId: "mk-677",
    wooProductId: 7413,
    wooSlug: "mk-677",
    sku: "80529-02",
    displayName: "MK-677",
    displayAlias: "Ibutamoren",
    customerPath: "/product/mk-677",
    imageSrc: "/assets/products/shop/mk-677.webp",
    imageSourceUrl: "https://olympuslabs.uk/wp-content/uploads/2023/05/relabel_render_mutipleface-03-300x450.webp",
    imageAlt: "MK-677 bottle",
    capturedPriceMinor: 5700,
    currencyCode: "GBP",
    familySlugs: ["research-chemicals"],
    goalTagSlugs: ["body-composition"],
    formSlug: "capsules",
    servingsCount: 90,
    availabilityState: "in-stock",
  }),
  fixture({
    fixtureId: "rad-140",
    wooProductId: 7435,
    wooSlug: "rad140",
    sku: "80529-05",
    displayName: "RAD-140",
    displayAlias: "Testolone",
    customerPath: "/product/rad140",
    imageSrc: "/assets/products/shop/rad-140.webp",
    imageSourceUrl: "https://olympuslabs.uk/wp-content/uploads/2023/05/relabel_render_mutipleface-09-300x450.webp",
    imageAlt: "RAD-140 Testolone bottle",
    capturedPriceMinor: 4300,
    currencyCode: "GBP",
    familySlugs: ["sarms"],
    goalTagSlugs: ["strength"],
    formSlug: "capsules",
    servingsCount: 60,
    availabilityState: "in-stock",
  }),
  fixture({
    fixtureId: "m-sten",
    wooProductId: 7428,
    wooSlug: "m-sten",
    sku: "80529-10",
    displayName: "M-STEN",
    displayAlias: "Methylstenbolone",
    customerPath: "/product/m-sten",
    imageSrc: "/assets/products/shop/m-sten.webp",
    imageSourceUrl: "https://olympuslabs.uk/wp-content/uploads/2023/05/relabel_render_mutipleface-15-300x450.webp",
    imageAlt: "M-STEN bottle",
    capturedPriceMinor: 5500,
    currencyCode: "GBP",
    familySlugs: ["prohormones"],
    goalTagSlugs: ["bulking"],
    formSlug: "capsules",
    servingsCount: 90,
    availabilityState: "in-stock",
  }),
  fixture({
    fixtureId: "gw-501516",
    wooProductId: 8817,
    wooSlug: "gw-501516",
    sku: null,
    displayName: "GW-501516",
    displayAlias: "Cardarine",
    customerPath: "/product/gw-501516",
    imageSrc: "/assets/products/shop/gw-501516.jpeg",
    imageSourceUrl: "https://olympuslabs.uk/wp-content/uploads/2023/06/WhatsApp-Image-2025-10-18-at-19.27.24-1-300x450.jpeg",
    imageAlt: "GW-501516 bottle",
    capturedPriceMinor: 3500,
    currencyCode: "GBP",
    familySlugs: ["research-chemicals"],
    goalTagSlugs: ["endurance"],
    formSlug: "capsules",
    servingsCount: 90,
    availabilityState: "in-stock",
  }),
  fixture({
    fixtureId: "ment",
    wooProductId: 7446,
    wooSlug: "trestolone",
    sku: "80529-08",
    displayName: "MENT",
    displayAlias: "Trestolone",
    customerPath: "/product/trestolone",
    imageSrc: "/assets/products/shop/ment.webp",
    imageSourceUrl: "https://olympuslabs.uk/wp-content/uploads/2023/05/relabel_render_mutipleface-11-300x450.webp",
    imageAlt: "MENT Trestolone bottle",
    capturedPriceMinor: 5500,
    currencyCode: "GBP",
    familySlugs: ["research-chemicals"],
    goalTagSlugs: ["strength"],
    formSlug: "capsules",
    servingsCount: 30,
    availabilityState: "in-stock",
  }),
  fixture({
    fixtureId: "epistane",
    wooProductId: 7408,
    wooSlug: "epistane",
    sku: "80529-12",
    displayName: "EPISTANE",
    displayAlias: null,
    customerPath: "/product/epistane",
    imageSrc: "/assets/products/shop/epistane.webp",
    imageSourceUrl: "https://olympuslabs.uk/wp-content/uploads/2023/05/relabel_render_mutipleface-19-300x450.webp",
    imageAlt: "Epistane bottle",
    capturedPriceMinor: 5500,
    currencyCode: "GBP",
    familySlugs: ["prohormones"],
    goalTagSlugs: ["bulking"],
    formSlug: "capsules",
    servingsCount: null,
    availabilityState: "out-of-stock",
  }),
  fixture({
    fixtureId: "stack-source-gap",
    wooProductId: 7423,
    wooSlug: "lgd-4033-mk-677",
    sku: "80529-06",
    displayName: "LGD-4033 / MK-677",
    displayAlias: "Stack",
    customerPath: "/product/lgd-4033-mk-677",
    imageSrc: "/assets/products/shop/lgd-4033-mk-677.webp",
    imageSourceUrl: "https://olympuslabs.uk/wp-content/uploads/2023/05/relabel_render_mutipleface-21-300x450.webp",
    imageAlt: "LGD-4033 and MK-677 stack bottle",
    capturedPriceMinor: 6000,
    currencyCode: "GBP",
    familySlugs: ["research-chemicals", "sarms", "stacks"],
    goalTagSlugs: ["body-composition"],
    formSlug: null,
    servingsCount: null,
    availabilityState: "unknown",
  }),
] as const satisfies readonly ShopTaxonomyFixtureProduct[]);

function intersects<T>(
  productValues: readonly T[],
  selection: readonly T[] | undefined,
): boolean {
  return !selection?.length || selection.some((value) => productValues.includes(value));
}

export function matchesShopTaxonomySelection(
  product: ShopTaxonomyFixtureProduct,
  selection: ShopTaxonomySelection,
): boolean {
  const goalTags = (selection.goals ?? [])
    .map(normalizeShopGoalRoute)
    .filter((value): value is ShopGoalTagSlug => value !== null);

  return (
    intersects(product.familySlugs, selection.families) &&
    intersects(product.goalTagSlugs, goalTags) &&
    intersects(product.formSlug ? [product.formSlug] : [], selection.forms) &&
    intersects(
      product.servingsCount === null ? [] : [product.servingsCount],
      selection.servings,
    ) &&
    intersects([product.availabilityState], selection.availability)
  );
}

export function filterShopTaxonomyFixtures(
  selection: ShopTaxonomySelection,
): readonly ShopTaxonomyFixtureProduct[] {
  return SHOP_TAXONOMY_FIXTURE_PRODUCTS.filter((product) =>
    matchesShopTaxonomySelection(product, selection),
  );
}

export const SHOP_TAXONOMY_MODEL = Object.freeze({
  schemaVersion: "oluk.shop-taxonomy-contract.v1",
  capturedAt: "2026-08-12T13:11:36.556Z",
  authority: SHOP_TAXONOMY_FIXTURE_AUTHORITY,
  reviewOnly: true,
  liveAuthority: false,
  runtimeMutationAuthorized: false,
  queryParam: "goal",
  selectionLaw: "OR_WITHIN_DIMENSION_AND_ACROSS_DIMENSIONS",
  sources: Object.freeze({
    authorityContract: "authority/SHOP-TAXONOMY-CONTRACT.json",
    families:
      "https://olympuslabs.uk/wp-json/wc/store/v1/products/categories",
    goals: "https://olympuslabs.uk/wp-json/wc/store/v1/products/tags",
    form: "ProductRuntimeContract.form",
    servings: "ProductRuntimeContract.metrics[QTY]/SOURCE_OWNED",
    availability:
      "Woo Store API is_in_stock/is_on_backorder/is_purchasable",
    display:
      "Woo Store API product ID/name/permalink/image/price audit snapshot; non-live",
  }),
  dimensions: Object.freeze({
    families: SHOP_FAMILY_OPTIONS,
    goals: SHOP_GOAL_OPTIONS,
    forms: SHOP_FORM_OPTIONS,
    servings: SHOP_SERVINGS_OPTIONS,
    availability: SHOP_AVAILABILITY_OPTIONS,
  }),
});
