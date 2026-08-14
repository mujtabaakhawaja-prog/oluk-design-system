export const ACCOUNT_RETENTION_CANDIDATE_IDS = [
  "decision-spine",
  "activity-history",
  "retention-lab",
] as const;

export type AccountRetentionCandidateId =
  (typeof ACCOUNT_RETENTION_CANDIDATE_IDS)[number];

/** Owner-only candidate paths stay outside the canonical 73-route ledger. */
export const ACCOUNT_RETENTION_CANDIDATE_ROUTE_PATTERNS = [
  "/review-studio/account-retention-candidates/[candidate]",
] as const;

export const ACCOUNT_RETENTION_REVIEW_PATH =
  "/review-studio/account-retention-candidates/catalogue" as const;

export type AccountRetentionCandidateDefinition = Readonly<{
  id: AccountRetentionCandidateId;
  label: string;
  commercialThesis: string;
  customerFrictionRemoved: string;
  desktopGrid: string;
  differentiator: string;
  sectionOrder: readonly string[];
  mobileJourney: readonly string[];
  tradeoffs: readonly string[];
  status: "CANDIDATE_READY";
  ownerSelected: false;
  recommendationStatus: "UNRANKED";
}>;

export const ACCOUNT_RETENTION_CANDIDATES: Readonly<
  Record<AccountRetentionCandidateId, AccountRetentionCandidateDefinition>
> = {
  "decision-spine": {
    id: "decision-spine",
    label: "Central decision spine",
    commercialThesis:
      "Put the customer’s most immediate account action first, then keep the relevant order and product context close enough to act without searching.",
    customerFrictionRemoved:
      "The customer can move directly to an order, product or support path without decoding a dashboard of unavailable services.",
    desktopGrid:
      "12 columns · 8-column order decision spine / 4-column account action context",
    differentiator:
      "One dominant account decision stays visually stronger than secondary retention opportunities.",
    sectionOrder: [
      "account decision",
      "current order reference",
      "product context",
      "account actions",
      "retention availability",
      "support continuation",
    ],
    mobileJourney: [
      "account decision",
      "current order reference",
      "order product",
      "account actions",
      "retention availability",
      "support continuation",
    ],
    tradeoffs: [
      "Saved-stack and retention services are secondary to the immediate order task.",
      "The composition is intentionally calmer than a broad activity dashboard.",
    ],
    status: "CANDIDATE_READY",
    ownerSelected: false,
    recommendationStatus: "UNRANKED",
  },
  "activity-history": {
    id: "activity-history",
    label: "Activity and history",
    commercialThesis:
      "Use order history as the account’s organizing spine so reorder, product confidence and saved context begin from a known purchase.",
    customerFrictionRemoved:
      "The customer sees the available order reference and related product in one continuous history instead of disconnected account tiles.",
    desktopGrid:
      "12 columns · 6-column order history / 6-column saved context and next actions",
    differentiator:
      "A continuous activity ledger replaces the generic account-card dashboard while preserving a clear onward product path.",
    sectionOrder: [
      "account activity",
      "order history ledger",
      "product history",
      "saved context availability",
      "quick actions",
      "support continuation",
    ],
    mobileJourney: [
      "account activity",
      "order history ledger",
      "order product",
      "saved context availability",
      "quick actions",
      "support continuation",
    ],
    tradeoffs: [
      "Retention discovery begins after the customer understands the available order context.",
      "The history-led hierarchy is less suitable when a future account has no orders.",
    ],
    status: "CANDIDATE_READY",
    ownerSelected: false,
    recommendationStatus: "UNRANKED",
  },
  "retention-lab": {
    id: "retention-lab",
    label: "Retention lab",
    commercialThesis:
      "Turn the account into a return-to-product system by placing saved stacks, restock, recommendations and loyalty candidates around the known product and order context.",
    customerFrictionRemoved:
      "Unavailable retention services are explained honestly while the customer still receives useful product, order and comparison paths.",
    desktopGrid:
      "12 columns · 3-column saved context / 6-column product decision / 3-column retention services",
    differentiator:
      "The account behaves like a product-retention workspace without inventing live balances, dates, eligibility or personal recommendations.",
    sectionOrder: [
      "retention workspace",
      "saved-stack availability",
      "known product decision",
      "Smart Restock availability",
      "product comparison path",
      "loyalty and subscription availability",
      "order continuation",
    ],
    mobileJourney: [
      "known product decision",
      "saved-stack availability",
      "Smart Restock availability",
      "product comparison path",
      "loyalty and subscription availability",
      "order continuation",
    ],
    tradeoffs: [
      "The first view carries more retention concepts than the order-first alternatives.",
      "Several services remain designed unavailable states until a future runtime owner supplies account data.",
    ],
    status: "CANDIDATE_READY",
    ownerSelected: false,
    recommendationStatus: "UNRANKED",
  },
};

export function isAccountRetentionCandidateId(
  value: string,
): value is AccountRetentionCandidateId {
  return ACCOUNT_RETENTION_CANDIDATE_IDS.includes(
    value as AccountRetentionCandidateId,
  );
}
