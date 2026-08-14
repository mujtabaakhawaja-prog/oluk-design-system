import type {
  EvidenceState,
  InventoryState,
  ProductMediaContext,
  QualitativeFact,
} from "./commerce-types";

export type ProductFixtureId = "mk-2866" | "rad-140";

export type ProductFixtureAuthority = Readonly<{
  classification: "locked-product-truth" | "design-review-fixture";
  sourceRef: string;
  truthScope: "complete-product-truth" | "presentation-fixture";
  runtimeOwner: "shopper-ssr-later";
  publicationState: "owner-only-review";
  live: false;
}>;

export type ProductMediaCrop = Readonly<{
  objectPosition: string;
  scale: number;
  translateY: string;
}>;

export type ProductMediaCropSet = Readonly<{
  desktop: ProductMediaCrop;
  tablet: ProductMediaCrop;
  mobile: ProductMediaCrop;
}>;

export type ProductMediaAsset = Readonly<{
  id: `${string}-front`;
  productId: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  fit: "contain";
  hasTransparency: boolean;
  sourceRef: string;
  authority: "confirmed-product-asset" | "confirmed-design-fixture";
  live: false;
  crops: Readonly<Record<ProductMediaContext, ProductMediaCropSet>>;
}>;

export type ProductFixture = Readonly<{
  id: ProductFixtureId;
  series: string;
  name: string;
  alias: string;
  sku?: string;
  strength: string;
  servings: string;
  purity: string;
  price: string;
  customerPath: string;
  evidencePath: string;
  /** A missing approved render is intentionally shown as an unpopulated governed chamber. */
  media: ProductMediaAsset | null;
  qualitativeFacts: ReadonlyArray<QualitativeFact>;
  presentationStatus: Readonly<{
    inventory: InventoryState;
    evidence: EvidenceState;
  }>;
  authority: ProductFixtureAuthority;
}>;

const defaultCrops = {
  card: {
    desktop: { objectPosition: "50% 50%", scale: 1, translateY: "6px" },
    tablet: { objectPosition: "50% 49%", scale: 0.98, translateY: "5px" },
    mobile: { objectPosition: "50% 48%", scale: 0.94, translateY: "3px" },
  },
  compact: {
    desktop: { objectPosition: "50% 48%", scale: 0.94, translateY: "2px" },
    tablet: { objectPosition: "50% 48%", scale: 0.92, translateY: "2px" },
    mobile: { objectPosition: "50% 47%", scale: 0.9, translateY: "1px" },
  },
  featured: {
    desktop: { objectPosition: "50% 50%", scale: 1, translateY: "6px" },
    tablet: { objectPosition: "50% 49%", scale: 0.98, translateY: "5px" },
    mobile: { objectPosition: "50% 48%", scale: 0.94, translateY: "3px" },
  },
  relation: {
    desktop: { objectPosition: "50% 50%", scale: 0.96, translateY: "4px" },
    tablet: { objectPosition: "50% 49%", scale: 0.94, translateY: "3px" },
    mobile: { objectPosition: "50% 48%", scale: 0.9, translateY: "2px" },
  },
  hero: {
    desktop: { objectPosition: "50% 50%", scale: 1.04, translateY: "6px" },
    tablet: { objectPosition: "50% 49%", scale: 1, translateY: "4px" },
    mobile: { objectPosition: "50% 48%", scale: 0.94, translateY: "2px" },
  },
  dossier: {
    desktop: { objectPosition: "50% 50%", scale: 0.92, translateY: "4px" },
    tablet: { objectPosition: "50% 49%", scale: 0.9, translateY: "3px" },
    mobile: { objectPosition: "50% 47%", scale: 0.86, translateY: "2px" },
  },
} as const satisfies Readonly<Record<ProductMediaContext, ProductMediaCropSet>>;

export const productMediaRegistry = {
  "mk-2866": {
    id: "mk-2866-front",
    productId: "mk-2866",
    src: "/assets/products/mk-2866/front.png",
    alt: "MK-2866 Ostarine bottle",
    width: 1365,
    height: 2048,
    fit: "contain",
    hasTransparency: true,
    sourceRef: "CONV-002 confirmed MK-2866 transparent product asset",
    authority: "confirmed-product-asset",
    live: false,
    crops: defaultCrops,
  },
  "rad-140": {
    id: "rad-140-front",
    productId: "rad-140",
    src: "/assets/products/rad-140/front.png",
    alt: "RAD-140 Testolone bottle",
    width: 1024,
    height: 1536,
    fit: "contain",
    hasTransparency: true,
    sourceRef: "User-supplied transparent RAD-140 master · SHA-256 25bc23254db4986ccf374af5a299ef7ed12a689b8a347a3c7c0a71bee2c0507c · optimized delivery derivative 1024×1536",
    authority: "confirmed-product-asset",
    live: false,
    crops: {
      ...defaultCrops,
      compact: {
        desktop: { objectPosition: "50% 49%", scale: 0.92, translateY: "2px" },
        tablet: { objectPosition: "50% 48%", scale: 0.9, translateY: "2px" },
        mobile: { objectPosition: "50% 47%", scale: 0.88, translateY: "1px" },
      },
      relation: {
        desktop: { objectPosition: "50% 51%", scale: 0.94, translateY: "4px" },
        tablet: { objectPosition: "50% 50%", scale: 0.92, translateY: "3px" },
        mobile: { objectPosition: "50% 48%", scale: 0.88, translateY: "2px" },
      },
    },
  },
} as const satisfies Readonly<Record<ProductFixtureId, ProductMediaAsset>>;

const canonicalQualitativeFacts = [
  { kind: "class", label: "CLASS", value: "SARM" },
  { kind: "form", label: "FORM", value: "CAPSULES" },
  { kind: "quality", label: "QUALITY", value: "LAB FORMULATED" },
  { kind: "tested", label: "TESTED", value: "THIRD PARTY" },
] as const satisfies ReadonlyArray<QualitativeFact>;

export const productFixtures = {
  "mk-2866": {
    id: "mk-2866",
    series: "SARM SERIES",
    name: "MK-2866",
    alias: "Ostarine",
    sku: "80529-01",
    strength: "15 MG",
    servings: "90 SERVINGS",
    purity: ">99%",
    price: "£43",
    customerPath: "/product/mk-2866",
    evidencePath: "/open-lab/dossier/mk-2866",
    media: productMediaRegistry["mk-2866"],
    qualitativeFacts: canonicalQualitativeFacts,
    presentationStatus: { inventory: "in-stock", evidence: "verified" },
    authority: {
      classification: "locked-product-truth",
      sourceRef: "CONV-002 product truth and ProductDecisionHero candidate",
      truthScope: "complete-product-truth",
      runtimeOwner: "shopper-ssr-later",
      publicationState: "owner-only-review",
      live: false,
    },
  },
  "rad-140": {
    id: "rad-140",
    series: "SARM SERIES",
    name: "RAD-140",
    alias: "Testolone",
    strength: "8 MG",
    servings: "60 SERVINGS",
    purity: ">99%",
    price: "£46",
    customerPath: "/shop",
    evidencePath: "/open-lab/records",
    media: productMediaRegistry["rad-140"],
    qualitativeFacts: canonicalQualitativeFacts,
    presentationStatus: { inventory: "unavailable", evidence: "unavailable" },
    authority: {
      classification: "design-review-fixture",
      sourceRef: "CONV-002 canonical Relation candidate; product fields remain presentation-only",
      truthScope: "presentation-fixture",
      runtimeOwner: "shopper-ssr-later",
      publicationState: "owner-only-review",
      live: false,
    },
  },
} as const satisfies Readonly<Record<ProductFixtureId, ProductFixture>>;

export const mk2866Fixture = productFixtures["mk-2866"];
export const rad140Fixture = productFixtures["rad-140"];

export function getProductFixture(id: ProductFixtureId): ProductFixture {
  return productFixtures[id];
}

export function getProductMedia(id: ProductFixtureId): ProductMediaAsset {
  return productMediaRegistry[id];
}
