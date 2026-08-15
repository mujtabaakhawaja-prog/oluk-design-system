import { TransactionPresentation, type TransactionStage } from "../../design-system/transaction-presentation";
import { CustomerSiteChrome } from "../../experience-lab";

const stages = ["information", "delivery", "review", "payment", "payment-details", "processing", "confirmation", "tracking", "order-history", "order-details", "receipt", "return", "refund"] as const;

const stageMap: Readonly<Record<(typeof stages)[number], TransactionStage>> = {
  information: "details",
  delivery: "delivery",
  review: "review",
  payment: "order-pay",
  "payment-details": "handoff",
  processing: "processing",
  confirmation: "confirmation",
  tracking: "tracking",
  "order-history": "order-history",
  "order-details": "order-details",
  receipt: "receipt",
  return: "return",
  refund: "refund",
};

export function generateStaticParams() { return stages.map((stage) => ({ stage })); }

export default function CheckoutStagePage({ params }: { params: { stage: string } }) {
  const stage = stageMap[params.stage as keyof typeof stageMap] ?? "details";
  return <CustomerSiteChrome route={`checkout-${params.stage}`}><main data-live-authority="false"><TransactionPresentation stage={stage} /></main></CustomerSiteChrome>;
}
