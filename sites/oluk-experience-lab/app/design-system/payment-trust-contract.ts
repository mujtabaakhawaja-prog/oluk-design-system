export const paymentTrustStudy = Object.freeze({
  customerCurrency: "GBP",
  customerAmount: "£133.00",
  settlementCurrency: "USD",
  settlementAmount: "$180.59",
  classification: "LOCKED_DESIGN_STUDY_FIXTURE",
  liveAuthority: false,
  source: {
    shopperCommit: "065523a49da2d3920c75ad4659ccff132d15650e",
    figmaFileKey: "9jTrnlEWgbBpFi2idodVB2",
    paymentExpandedNodeId: "9:9401",
  },
} as const);

export const paymentTrustCopy = Object.freeze({
  shopIn: "SHOP IN",
  paymentTrust: "PAYMENT TRUST",
  currencies: ["GBP", "EUR", "USD"] as const,
  continuity: "Your selected shop currency stays clear through payment.",
  protectedStep: "The protected payment step carries the same order value into its fixed USD equivalent.",
  equality: "You are paying the USD equivalent of the displayed GBP amount.",
  confirmationHeading: "Your order total",
  confirmation: "Your order total of £133.00 GBP was processed and paid as its fixed USD equivalent of $180.59 USD.",
  recordHeading: "Amount Processed",
  record: "Your order amount of £133.00 GBP was processed and paid as its fixed USD equivalent of $180.59 USD.",
  history: "Paid as its fixed USD equivalent of $180.59 USD.",
  refundHeading: "Refund amount",
  refund: "Your refund of £133.00 GBP was issued as the same fixed USD equivalent originally paid: $180.59 USD.",
} as const);

export type PaymentTrustLifecycleStage =
  | "pre-purchase"
  | "payment"
  | "confirmation"
  | "receipt"
  | "order-details"
  | "history"
  | "refund";
