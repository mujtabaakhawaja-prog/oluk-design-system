import { TransactionPresentation, type TransactionStage } from "./transaction-presentation";

export type PostPurchaseStatus = "success" | "pending" | "failed" | "cancelled" | "tracking";

const transactionStageByStatus = {
  success: "confirmation",
  pending: "pending",
  failed: "failure",
  cancelled: "cancelled",
  tracking: "tracking",
} as const satisfies Readonly<Record<PostPurchaseStatus, TransactionStage>>;

/** Order URLs are aliases of the canonical checkout lifecycle, not a second composition. */
export function PostPurchaseSurface({ status, orderId }: { status: PostPurchaseStatus; orderId?: string }) {
  return <TransactionPresentation orderReference={orderId ?? "OL-10428"} stage={transactionStageByStatus[status]} />;
}
