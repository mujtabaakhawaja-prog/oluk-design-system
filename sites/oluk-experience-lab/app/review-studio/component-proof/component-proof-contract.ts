export const COMPONENT_PROOF_VIEWPORTS = [1440, 1024, 768, 390] as const;

export type ComponentProofViewport = (typeof COMPONENT_PROOF_VIEWPORTS)[number];

export const COMPONENT_PROOF_FAMILIES = [
  {
    id: "foundations-primitives",
    label: "Foundations + primitives",
    currentSource: "candidate-tokens.css · content-surfaces.tsx · action-control.tsx",
    targetAuthority: "authority/surface-contract.md · current token grammar and typography contracts",
  },
  {
    id: "commerce-cards",
    label: "ProductCommerceCard family",
    currentSource: "product-commerce-card.tsx",
    targetAuthority: "authority/surface-contract.md · ProductCommerceCard canonical anatomy",
  },
  {
    id: "metric-rail",
    label: "MetricRail",
    currentSource: "metric-rail.tsx",
    targetAuthority: "authority/surface-contract.md · MetricRail / ThreeUp / TwoRow / CobaltDivided",
  },
  {
    id: "purchase-panel",
    label: "PurchasePanel",
    currentSource: "purchase-panel.tsx",
    targetAuthority: "user-selected PDP purchase-panel references · authority/surface-contract.md",
  },
  {
    id: "bounded-media-chamber",
    label: "Bounded media chamber",
    currentSource: "product-media-chamber.tsx",
    targetAuthority: "authority/surface-contract.md · bounded non-PDP media-chamber law",
  },
  {
    id: "pdp-first-fold",
    label: "PDP first fold",
    currentSource: "pdp-first-fold.tsx",
    targetAuthority: "user-selected PDP references · PDP atmospheric-field exception in authority/surface-contract.md",
  },
  {
    id: "openlab",
    label: "OpenLab specimens",
    currentSource: "review-studio-gallery.tsx · openlab-sections.tsx",
    targetAuthority: "authority/surface-contract.md · REPORTED runtime semantics and Sites fixture-status law",
  },
  {
    id: "checkout",
    label: "Checkout specimens",
    currentSource: "review-studio-gallery.tsx · transaction-presentation.tsx",
    targetAuthority: "authority/surface-contract.md · preserve-only payment boundary and checkout presentation grammar",
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
