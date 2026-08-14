import { PostPurchaseSurface, type PostPurchaseStatus } from "../design-system/post-purchase-surface";
import { CustomerSiteChrome } from "../experience-lab";

export function OrderStatusPage({ orderId, status }: { orderId: string; status: PostPurchaseStatus }) {
  return (
    <CustomerSiteChrome route="checkout-confirmation">
      <PostPurchaseSurface orderId={orderId} status={status} />
    </CustomerSiteChrome>
  );
}
