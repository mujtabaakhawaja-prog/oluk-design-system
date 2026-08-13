export type AuthorityClass =
  | "locked_product_truth"
  | "design_review_fixture"
  | "candidate_visual_contract";

export type RuntimeOwner =
  | "shopper_ssr_later"
  | "openlab_runtime_later"
  | "none_design_stage";

export type PublicationState = "owner_only_review" | "not_for_runtime";

export type ReviewFixture<T> = {
  authorityClass: AuthorityClass;
  sourceRef: string;
  runtimeOwner: RuntimeOwner;
  publicationState: PublicationState;
  reviewOnly: true;
  value: T;
};

export type ProductSpecimen = {
  series: string;
  name: string;
  alias: string;
  sku?: string;
  strength: string;
  servings: string;
  purity: string;
  price: string;
  image: string;
};

export type AssuranceSpecimen = {
  number: string;
  title: string;
  description: string;
  icon: string;
  proofPoint?: string;
};

export const candidateContract = {
  id: "CONV-004 / CANDIDATE_CONVERGENCE_v0",
  status: "RECONCILIATION DELTA / HUMAN_REVIEW_REQUIRED",
  figmaFoundationNode: "637:3",
  runtimeAuthority: "NONE",
  typographyFloorDecision: "CHAMPION / DEC-TYPE-FLOOR-001 / 12PX METADATA / 15-16PX BODY / 11PX QUALITATIVECHIP EXCEPTION",
} as const;

export const mk2866Specimen: ReviewFixture<ProductSpecimen> = {
  authorityClass: "locked_product_truth",
  sourceRef: "CONV-001 product truth + Figma HeroDecisionSurface 736:17458",
  runtimeOwner: "shopper_ssr_later",
  publicationState: "owner_only_review",
  reviewOnly: true,
  value: {
    series: "SARM SERIES",
    name: "MK-2866",
    alias: "Ostarine",
    sku: "80529-01",
    strength: "15 MG",
    servings: "90 SERVINGS",
    purity: ">99%",
    price: "£43",
    image: "/assets/products/mk-2866/front.png",
  },
};

export const rad140Specimen: ReviewFixture<ProductSpecimen> = {
  authorityClass: "design_review_fixture",
  sourceRef: "CONV-001 canonical Relation set + Figma 743:520",
  runtimeOwner: "shopper_ssr_later",
  publicationState: "owner_only_review",
  reviewOnly: true,
  value: {
    series: "SARM SERIES",
    name: "RAD-140",
    alias: "Testolone",
    strength: "8 MG",
    servings: "60 SERVINGS",
    purity: ">99%",
    price: "£46",
    image: "/assets/products/rad-140/front-design-fixture.png",
  },
};

export const assuranceSpecimens = [
  {
    authorityClass: "design_review_fixture",
    sourceRef: "Figma AssuranceRail 752:167 / Identity Tested",
    runtimeOwner: "openlab_runtime_later",
    publicationState: "owner_only_review",
    reviewOnly: true,
    value: {
      number: "01",
      title: "Identity Tested",
      description: "Compound identity confirmed using advanced analytical methods.",
      icon: "/assets/candidate/assurance/identity.svg",
      proofPoint: "/assets/candidate/assurance/identity-proof-point.svg",
    },
  },
  {
    authorityClass: "design_review_fixture",
    sourceRef: "Figma AssuranceRail 752:167 / Purity Measured",
    runtimeOwner: "openlab_runtime_later",
    publicationState: "owner_only_review",
    reviewOnly: true,
    value: {
      number: "02",
      title: "Purity Measured",
      description: "Purity measured to ensure each batch meets strict quality standards.",
      icon: "/assets/candidate/assurance/purity.svg",
    },
  },
  {
    authorityClass: "design_review_fixture",
    sourceRef: "Figma AssuranceRail 752:167 / Concentration Confirmed",
    runtimeOwner: "openlab_runtime_later",
    publicationState: "owner_only_review",
    reviewOnly: true,
    value: {
      number: "03",
      title: "Concentration Confirmed",
      description: "Concentration verified to match labelled strength with high precision.",
      icon: "/assets/candidate/assurance/concentration.svg",
    },
  },
  {
    authorityClass: "design_review_fixture",
    sourceRef: "Figma AssuranceRail 752:167 / Janoshik Verified",
    runtimeOwner: "openlab_runtime_later",
    publicationState: "owner_only_review",
    reviewOnly: true,
    value: {
      number: "04",
      title: "Janoshik Verified",
      description: "Results validated through an independent third-party verification platform.",
      icon: "/assets/candidate/assurance/janoshik.svg",
    },
  },
  {
    authorityClass: "design_review_fixture",
    sourceRef: "Figma AssuranceRail 752:167 / Tamper-Proof Sealed",
    runtimeOwner: "openlab_runtime_later",
    publicationState: "owner_only_review",
    reviewOnly: true,
    value: {
      number: "05",
      title: "Tamper-Proof Sealed",
      description: "Sealed before dispatch to protect integrity until it reaches you.",
      icon: "/assets/candidate/assurance/sealed.svg",
    },
  },
  {
    authorityClass: "design_review_fixture",
    sourceRef: "Figma AssuranceRail 752:167 / Batch Tracked",
    runtimeOwner: "openlab_runtime_later",
    publicationState: "owner_only_review",
    reviewOnly: true,
    value: {
      number: "06",
      title: "Batch Tracked",
      description: "Every batch is connected to its complete evidence record.",
      icon: "/assets/candidate/assurance/batch.svg",
    },
  },
] as const satisfies ReadonlyArray<ReviewFixture<AssuranceSpecimen>>;

export const figmaReviewLinks = {
  control: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=728-50",
  foundation: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=637-3",
  adaptivePage: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=732-2897",
  compact: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=742-50",
  vertical: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=743-50",
  featured: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=743-281",
  relation: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=743-520",
  purchase: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=745-50",
  inventory: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=732-2902",
  inventorySource: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=641-17",
  mediaChamber: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=1022-4099",
  cobaltDivider: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=1010-27053",
  evidence: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=732-2912",
  metricRail: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=733-95",
  qualitativeChip: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=733-17342",
  heroDecisionSurface: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=736-17458",
  productDecisionHero: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=739-50",
  assurance: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=752-167",
  dossier: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=750-182",
  relatedRail: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=753-18136",
  siteHeader: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=754-18224",
  trustRail: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=754-18225",
  siteFooter: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=754-18226",
  review1440: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=737-50",
  review1024: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=737-159",
  review768: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=737-159",
  review390: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=737-264",
} as const;
