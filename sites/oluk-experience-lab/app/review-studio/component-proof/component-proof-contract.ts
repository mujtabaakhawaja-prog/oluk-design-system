export const COMPONENT_PROOF_VIEWPORTS = [1440, 1024, 768, 390] as const;

export type ComponentProofViewport = (typeof COMPONENT_PROOF_VIEWPORTS)[number];

export const COMPONENT_PROOF_FAMILIES = [
  {
    id: "foundations-primitives",
    label: "Foundations + primitives",
    currentSource: "candidate-tokens.css · content-surfaces.tsx · action-control.tsx",
    targetAuthority: "authority/surface-contract.md · current token grammar and typography contracts",
    reviewDonors: [],
  },
  {
    id: "commerce-cards",
    label: "ProductCommerceCard family",
    currentSource: "product-commerce-card.tsx",
    targetAuthority: "authority/surface-contract.md · ProductCommerceCard canonical anatomy",
    reviewDonors: [
      { source: "Codex-Sites 11:18842", role: "Vertical desktop/mobile anatomy", disposition: "PRIMARY_ANATOMY_DONOR" },
      { source: "Codex-Sites 11:19053", role: "Featured desktop/mobile anatomy", disposition: "PRIMARY_ANATOMY_DONOR" },
      { source: "Codex-Sites 31:59383", role: "Relation three-zone review sheet", disposition: "GEOMETRY_ONLY" },
      { source: "Final-Design 454:3953", role: "Selected relationships export", disposition: "COMPARATIVE_EVIDENCE_ONLY" },
      { source: "Codex-Sites 31:59004", role: "Derived Featured with superseded StockPill", disposition: "SUPERSEDED_EVIDENCE_ONLY" },
    ],
  },
  {
    id: "metric-rail",
    label: "MetricRail",
    currentSource: "metric-rail.tsx",
    targetAuthority: "authority/surface-contract.md · MetricRail / ThreeUp / TwoRow / CobaltDivided",
    reviewDonors: [
      { source: "Final-Design 453:14974", role: "Three equal bounded metric cells", disposition: "ACCEPTED_GEOMETRY_DONOR" },
    ],
  },
  {
    id: "purchase-panel",
    label: "PurchasePanel",
    currentSource: "purchase-panel.tsx",
    targetAuthority: "user-selected PDP purchase-panel references · authority/surface-contract.md",
    reviewDonors: [
      { source: "Codex-Sites 31:58748", role: "PurchasePanel structure", disposition: "STRUCTURE_ONLY_CORRECT_DATA_AND_CLAIMS" },
      { source: "Codex-Sites 31:58935", role: "Qualitative-chip subassembly", disposition: "SUBCOMPONENT_EVIDENCE_NOT_PANEL" },
    ],
  },
  {
    id: "bounded-media-chamber",
    label: "Bounded media chamber",
    currentSource: "product-media-chamber.tsx",
    targetAuthority: "authority/surface-contract.md · bounded non-PDP media-chamber law",
    reviewDonors: [],
  },
  {
    id: "pdp-first-fold",
    label: "PDP first fold",
    currentSource: "pdp-first-fold.tsx",
    targetAuthority: "user-selected PDP references · PDP atmospheric-field exception in authority/surface-contract.md",
    reviewDonors: [
      { source: "Final-Design 717:16140", role: "PDP visual-area container", disposition: "PDP_ATMOSPHERIC_GEOMETRY_DONOR" },
      { source: "Final-Design 717:16137", role: "Full PDP first-fold container", disposition: "COMPOSITION_DONOR_CORRECT_CONTENT" },
    ],
  },
  {
    id: "openlab",
    label: "OpenLab specimens",
    currentSource: "review-studio-gallery.tsx · openlab-sections.tsx",
    targetAuthority: "authority/surface-contract.md · REPORTED runtime semantics and Sites fixture-status law",
    reviewDonors: [
      { source: "Final-Design 1612:78856", role: "Hero Light portal macro", disposition: "PRIMARY_COMPOSITION_DONOR" },
      { source: "Final-Design 1158:32284", role: "Static verification-feed shape", disposition: "EVIDENCE_RAIL_DONOR" },
    ],
  },
  {
    id: "checkout",
    label: "Checkout specimens",
    currentSource: "review-studio-gallery.tsx · transaction-presentation.tsx",
    targetAuthority: "authority/surface-contract.md · preserve-only payment boundary and checkout presentation grammar",
    reviewDonors: [
      { source: "TransactionPresentation stage=review", role: "Canonical customer checkout specimen", disposition: "SOURCE_COMPONENT_DONOR" },
      { source: "Owner-only lifecycle matrix", role: "Failure and recovery states", disposition: "DIAGNOSTIC_EVIDENCE_ONLY" },
    ],
  },
] as const;

export const COMPONENT_PROOF_REVIEW_DIMENSIONS = [
  "structure",
  "geometry",
  "spacing",
  "typography",
  "color-and-emphasis",
  "imagery",
  "states",
  "responsive-ordering",
  "overflow",
  "focus-and-keyboard",
  "reduced-motion",
  "interaction",
] as const;

export const COMPONENT_PROOF_DECISION_STATE = "MACHINE_COMPARISON_PENDING_HUMAN_DECISION" as const;

export type ComponentProofFamilyId = (typeof COMPONENT_PROOF_FAMILIES)[number]["id"];

export function isComponentProofFamilyId(value: string): value is ComponentProofFamilyId {
  return COMPONENT_PROOF_FAMILIES.some((family) => family.id === value);
}
