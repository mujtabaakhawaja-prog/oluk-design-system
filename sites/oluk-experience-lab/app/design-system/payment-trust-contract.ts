export const paymentTrustStudy = Object.freeze({
  customerCurrency: "GBP",
  customerAmount: "£128.97",
  settlementCurrency: "USD",
  settlementAmount: "$175.01",
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
  confirmation: "Your order total of £128.97 GBP was processed and paid as its fixed USD equivalent of $175.01 USD.",
  recordHeading: "Amount Processed",
  record: "Your order amount of £128.97 GBP was processed and paid as its fixed USD equivalent of $175.01 USD.",
  history: "Paid as its fixed USD equivalent of $175.01 USD.",
  refundHeading: "Refund Amount",
  refund: "Your refund of £128.97 GBP was issued as the same fixed USD equivalent originally paid: $175.01 USD.",
} as const);

export type PaymentTrustLifecycleStage =
  | "pre-purchase"
  | "payment"
  | "confirmation"
  | "receipt"
  | "order-details"
  | "history"
  | "refund";

