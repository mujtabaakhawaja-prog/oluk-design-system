export const PDP_CANDIDATE_IDS = [
  "product-theatre",
  "guided-decision",
  "confidence-workspace",
] as const;

export type PdpCandidateId = (typeof PDP_CANDIDATE_IDS)[number];

export const PDP_STRESS_PRODUCT_SLUGS = ["mk-2866", "rad-140", "lgd-4033"] as const;

/** Owner-only candidate paths stay outside the 73-route customer ledger. */
export const PDP_CANDIDATE_ROUTE_PATTERNS = [
  "/review-studio/pdp-candidates",
  "/review-studio/pdp-candidates/[candidate]/[slug]",
] as const;
export type PdpStressProductSlug = (typeof PDP_STRESS_PRODUCT_SLUGS)[number];

export type PdpCandidateDefinition = Readonly<{
  id: PdpCandidateId;
  label: string;
  commercialThesis: string;
  customerFrictionRemoved: string;
  desktopGrid: string;
  differentiator: string;
  sectionOrder: readonly string[];
  mobileJourney: readonly string[];
  tradeoffs: readonly string[];
  status: "CANDIDATE_READY" | "ARCHITECTURE_DEFINED";
  ownerSelected: false;
  recommendationStatus: "UNRANKED";
}>;

const sharedClosure = [
  "related products",
  "product questions and reviews",
  "assurance",
  "next decision",
] as const;

export const PDP_CANDIDATES: Readonly<Record<PdpCandidateId, PdpCandidateDefinition>> = {
  "product-theatre": {
    id: "product-theatre",
    label: "Product theatre",
    commercialThesis:
      "Make the product desirable first, then connect that desire to exact format, purchase and confidence decisions.",
    customerFrictionRemoved:
      "Customers can see what the product is for, what they receive and why it deserves attention without decoding a technical page first.",
    desktopGrid: "12 columns · 5-column product chamber / 7-column proposition and purchase field",
    differentiator: "The actual product render and proposition carry the opening while evidence deepens confidence after desire is established.",
    sectionOrder: [
      "product decision theatre",
      "assurance",
      "product story and details",
      "OpenLab confidence",
      "product comparison",
      "stronger stack and bundle entry",
      ...sharedClosure,
    ],
    mobileJourney: [
      "product promise",
      "product visual",
      "purchase decision",
      "product details",
      "OpenLab confidence",
      "comparison",
      "stack and bundle entry",
      "related products",
      "questions and reviews",
      "assurance and next decision",
    ],
    tradeoffs: [
      "The evidence story arrives after the main product decision.",
      "The opening needs a strong approved render to deliver its full visual impact.",
    ],
    status: "CANDIDATE_READY",
    ownerSelected: false,
    recommendationStatus: "UNRANKED",
  },
  "guided-decision": {
    id: "guided-decision",
    label: "Guided decision",
    commercialThesis:
      "Guide the customer through product role, exact purchase facts, nearby alternatives and the next basket-building choice in a deliberate sequence.",
    customerFrictionRemoved:
      "Customers always know the current decision and the next useful action, while the purchase context remains visible beside the story.",
    desktopGrid: "12 columns · 8-column decision spine / 4-column persistent purchase context",
    differentiator: "A persistent purchase context shortens the path from explanation to action without turning the page into a sales dashboard.",
    sectionOrder: [
      "guided product decision",
      "product story and details",
      "product comparison",
      "OpenLab confidence",
      "stronger stack and bundle entry",
      ...sharedClosure,
    ],
    mobileJourney: [
      "product promise",
      "purchase decision",
      "product visual",
      "product details",
      "comparison",
      "OpenLab confidence",
      "stack and bundle entry",
      "related products",
      "questions and reviews",
      "assurance and next decision",
    ],
    tradeoffs: [
      "The composition is less theatrical than the product-first alternative.",
      "The persistent purchase rail becomes a concise decision card on mobile rather than remaining sticky.",
    ],
    status: "CANDIDATE_READY",
    ownerSelected: false,
    recommendationStatus: "UNRANKED",
  },
  "confidence-workspace": {
    id: "confidence-workspace",
    label: "Confidence workspace",
    commercialThesis:
      "Use OpenLab as commerce theatre by keeping product identity, the purchase decision and available evidence in one inspectable opening system.",
    customerFrictionRemoved:
      "Evidence-minded customers can validate what is available without leaving the product decision or mistaking missing evidence for a negative result.",
    desktopGrid: "12 columns · 3-column product context / 6-column decision field / 3-column OpenLab confidence rail",
    differentiator: "Available evidence becomes a visible product advantage, while unavailable states remain designed and honest for other products.",
    sectionOrder: [
      "product and confidence workspace",
      "OpenLab confidence",
      "product story and details",
      "product comparison",
      "stronger stack and bundle entry",
      ...sharedClosure,
    ],
    mobileJourney: [
      "product identity summary",
      "product visual",
      "purchase decision",
      "OpenLab availability summary",
      "progressive evidence detail",
      "product details",
      "comparison",
      "stack and bundle entry",
      "related products",
      "questions and reviews",
      "assurance and next decision",
    ],
    tradeoffs: [
      "The first viewport carries more information and demands disciplined progressive disclosure.",
      "Products without a current record rely on a purposeful unavailable confidence surface rather than technical theatre.",
    ],
    status: "CANDIDATE_READY",
    ownerSelected: false,
    recommendationStatus: "UNRANKED",
  },
};

export function isPdpCandidateId(value: string): value is PdpCandidateId {
  return PDP_CANDIDATE_IDS.includes(value as PdpCandidateId);
}

export function isPdpStressProductSlug(value: string): value is PdpStressProductSlug {
  return PDP_STRESS_PRODUCT_SLUGS.includes(value as PdpStressProductSlug);
}
