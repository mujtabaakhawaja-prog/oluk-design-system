import { PostPurchaseSurface, type PostPurchaseStatus } from "../design-system/post-purchase-surface";
import { CustomerSiteChrome } from "../experience-lab";

export function OrderStatusPage({ orderId, status }: { orderId: string; status: PostPurchaseStatus }) {
  const checkoutContext = status === "success" ? "confirmation" : status === "failed" ? "failure" : status;
  return (
    <CustomerSiteChrome route={`checkout-${checkoutContext}`}>
      <main data-live-authority="false">
        <PostPurchaseSurface orderId={orderId} status={status} />
      </main>
    </CustomerSiteChrome>
  );
}
