import type {
  EvidenceState,
  InventoryState,
  ProductMediaContext,
  QualitativeFact,
} from "./commerce-types";

export type ProductFixtureId = "mk-2866" | "rad-140";

/** A visible product attribute with an exact, reviewable source coordinate. */
export type ProductFact = Readonly<{
  label: string;
  value: string;
  sourceCoordinate: string;
}>;

/** Evidence state and optional customer destination remain one source-owned signal. */
export type EvidenceTrustSignal = Readonly<{
  label: string;
  state: EvidenceState;
  sourceCoordinate: string;
  destination?: Readonly<{
    href: string;
    label: string;
  }>;
}>;

/** Benefit language is never valid without the coordinate that supports it. */
export type BenefitClaim = Readonly<{
  claim: string;
  sourceCoordinate: string;
}>;

export type ProductRelationshipType =
  | "alternative"
  | "comparison"
  | "complement"
  | "stack";

/** Relation cards require a reason, two or three differences, evidence, and one action. */
export type ProductRelationship = Readonly<{
  type: ProductRelationshipType;
  reason: BenefitClaim;
  differences:
    | readonly [ProductFact, ProductFact]
    | readonly [ProductFact, ProductFact, ProductFact];
  evidence: EvidenceTrustSignal;
  action: Readonly<{
    href: string;
    label: string;
  }>;
}>;

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
  /** Registry-backed product fixtures may extend beyond the two library specimens. */
  id: string;
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
  /** Legacy qualitative data remains available to non-card dossier consumers. */
  qualitativeFacts: ReadonlyArray<QualitativeFact>;
  /** ProductCommerceCard consideration facts are bounded and source-backed. */
  considerationFacts?: ReadonlyArray<ProductFact>;
  benefitClaims?: ReadonlyArray<BenefitClaim>;
  evidenceTrustSignal?: EvidenceTrustSignal;
  presentationStatus: Readonly<{
    inventory: InventoryState;
    evidence: EvidenceState;
  }>;
  authority: ProductFixtureAuthority;
}>;

export type ProductRelationshipDifferenceField = "strength" | "servings" | "purity";

export type CreateProductRelationshipOptions = Readonly<{
  type: ProductRelationshipType;
  reason: BenefitClaim;
  action: ProductRelationship["action"];
  differenceFields?:
    | readonly [ProductRelationshipDifferenceField, ProductRelationshipDifferenceField]
    | readonly [
        ProductRelationshipDifferenceField,
        ProductRelationshipDifferenceField,
        ProductRelationshipDifferenceField,
      ];
}>;

const relationshipFactLabels: Readonly<Record<ProductRelationshipDifferenceField, string>> = {
  strength: "STRENGTH",
  servings: "SERVINGS",
  purity: "PURITY",
};

const evidenceTrustLabels: Readonly<Record<EvidenceState, string>> = {
  verified: "Product evidence verified",
  available: "Product evidence available",
  unavailable: "Product evidence unavailable",
};

function fixtureFieldCoordinate(
  anchor: ProductFixture,
  product: ProductFixture,
  field: ProductRelationshipDifferenceField,
) {
  return `${product.authority.sourceRef}#${product.id}.${field} | ${anchor.authority.sourceRef}#${anchor.id}.${field}`;
}

/**
 * Builds a relation contract from two fixture records only. The helper never
 * authors qualitative claims: visible differences come directly from the
 * supplied fields, while callers must provide a source-backed reason.
 */
export function createProductRelationship(
  anchor: ProductFixture,
  product: ProductFixture,
  options: CreateProductRelationshipOptions,
): ProductRelationship {
  const differenceFields = options.differenceFields ?? ["strength", "servings", "purity"];
  if (new Set(differenceFields).size !== differenceFields.length) {
    throw new Error("Product relationships require two or three distinct difference fields.");
  }
  if (!options.reason.claim.trim() || !options.reason.sourceCoordinate.trim()) {
    throw new Error("Product relationship reasons require a claim and source coordinate.");
  }
  if (!options.action.href.trim() || !options.action.label.trim()) {
    throw new Error("Product relationships require one labelled action destination.");
  }

  const mappedDifferences = differenceFields.map((field) => ({
    label: relationshipFactLabels[field],
    value: `${product[field]} vs ${anchor[field]}`,
    sourceCoordinate: fixtureFieldCoordinate(anchor, product, field),
  }));
  const differences: ProductRelationship["differences"] = differenceFields.length === 2
    ? [mappedDifferences[0], mappedDifferences[1]]
    : [mappedDifferences[0], mappedDifferences[1], mappedDifferences[2]];
  const evidence = product.evidenceTrustSignal ?? {
    label: evidenceTrustLabels[product.presentationStatus.evidence],
    state: product.presentationStatus.evidence,
    sourceCoordinate: `${product.authority.sourceRef}#${product.id}.presentationStatus.evidence`,
  };

  return {
    type: options.type,
    reason: options.reason,
    differences,
    evidence,
    action: options.action,
  };
}

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

const mk2866ConsiderationFacts = [
  {
    label: "FORM",
    value: "Capsules",
    sourceCoordinate: "authority/SHOP-TAXONOMY-CONTRACT.json#deterministicFixtures.products[mk-2866].formSlug",
  },
  {
    label: "GOAL",
    value: "Strength",
    sourceCoordinate: "authority/SHOP-TAXONOMY-CONTRACT.json#deterministicFixtures.products[mk-2866].goalTagSlugs",
  },
] as const satisfies ReadonlyArray<ProductFact>;

const rad140ConsiderationFacts = [
  {
    label: "FORM",
    value: "Capsules",
    sourceCoordinate: "authority/SHOP-TAXONOMY-CONTRACT.json#deterministicFixtures.products[rad-140].formSlug",
  },
  {
    label: "GOAL",
    value: "Strength",
    sourceCoordinate: "authority/SHOP-TAXONOMY-CONTRACT.json#deterministicFixtures.products[rad-140].goalTagSlugs",
  },
] as const satisfies ReadonlyArray<ProductFact>;

const mk2866EvidenceTrustSignal = {
  label: "Product evidence record available",
  state: "verified",
  sourceCoordinate: "product-fixtures.ts#productFixtures.mk-2866.presentationStatus.evidence",
  destination: {
    href: "/open-lab/dossier/mk-2866",
    label: "View Lab Record",
  },
} as const satisfies EvidenceTrustSignal;

const rad140EvidenceTrustSignal = {
  label: "Product evidence unavailable",
  state: "unavailable",
  sourceCoordinate: "product-fixtures.ts#productFixtures.rad-140.presentationStatus.evidence",
} as const satisfies EvidenceTrustSignal;

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
    considerationFacts: mk2866ConsiderationFacts,
    evidenceTrustSignal: mk2866EvidenceTrustSignal,
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
    price: "£55",
    customerPath: "/product/rad-140",
    evidencePath: "/open-lab/records",
    media: productMediaRegistry["rad-140"],
    qualitativeFacts: canonicalQualitativeFacts,
    considerationFacts: rad140ConsiderationFacts,
    evidenceTrustSignal: rad140EvidenceTrustSignal,
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

export const productRelationshipFixtures = {
  "mk-2866": createProductRelationship(productFixtures["rad-140"], productFixtures["mk-2866"], {
    type: "comparison",
    reason: {
      claim: "Compare two SARMs tagged for strength using their quantified product facts.",
      sourceCoordinate: "authority/SHOP-TAXONOMY-CONTRACT.json#deterministicFixtures.products[mk-2866,rad-140]",
    },
    action: { href: "/compare", label: "Compare products" },
  }),
  "rad-140": createProductRelationship(productFixtures["mk-2866"], productFixtures["rad-140"], {
    type: "comparison",
    reason: {
      claim: "Compare two SARMs tagged for strength using their quantified product facts.",
      sourceCoordinate: "authority/SHOP-TAXONOMY-CONTRACT.json#deterministicFixtures.products[mk-2866,rad-140]",
    },
    action: { href: "/compare", label: "Compare products" },
  }),
} as const satisfies Readonly<Record<ProductFixtureId, ProductRelationship>>;

export const mk2866Fixture = productFixtures["mk-2866"];
export const rad140Fixture = productFixtures["rad-140"];

export function getProductFixture(id: ProductFixtureId): ProductFixture {
  return productFixtures[id];
}

export function getProductMedia(id: ProductFixtureId): ProductMediaAsset {
  return productMediaRegistry[id];
}
