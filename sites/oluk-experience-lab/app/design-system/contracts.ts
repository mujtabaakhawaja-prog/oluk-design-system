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
  id: "CANDIDATE_CONVERGENCE_v0",
  status: "UNPUBLISHED / HUMAN SELECTION REQUIRED",
  figmaFoundationNode: "637:3",
  runtimeAuthority: "NONE",
} as const;

export const mk2866Specimen: ReviewFixture<ProductSpecimen> = {
  authorityClass: "locked_product_truth",
  sourceRef: "AGENTS.md product truth + Figma 486:4634",
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
  sourceRef: "MF-02 correction-pass design fixture + Figma 626:12504",
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
    sourceRef: "Figma AssuranceRail 556:34627 / Identity Tested",
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
    sourceRef: "Figma AssuranceRail 556:34627 / Purity Measured",
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
    sourceRef: "Figma AssuranceRail 556:34627 / Concentration Confirmed",
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
    sourceRef: "Figma AssuranceRail 556:34627 / Janoshik Verified",
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
    sourceRef: "Figma AssuranceRail 556:34627 / Tamper-Proof Sealed",
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
    sourceRef: "Figma AssuranceRail 556:34627 / Batch Tracked",
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
  foundation: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=637-3",
  adaptivePage: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-2",
  vertical: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=646-10801",
  featured: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=646-10802",
  compact: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13888",
  relation: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=643-8616",
  purchase: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13889",
  inventory: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=641-17",
  evidence: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=518-13092",
  assurance: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=556-34627",
  dossier: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-27148",
  relatedRail: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-26896",
  review1440: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-3",
  review1024: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-568",
  review768: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-1093",
  review390: "https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-1625",
} as const;
