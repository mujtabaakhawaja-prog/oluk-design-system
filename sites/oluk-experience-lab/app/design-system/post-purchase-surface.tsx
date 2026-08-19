import Link from "next/link";

import { LifecycleAmountRecord } from "./payment-trust";
import { RecommendationCard, RestockCard } from "./program-components";

export type PostPurchaseStatus = "success" | "pending" | "failed" | "cancelled" | "tracking";

const states: Record<PostPurchaseStatus, { eyebrow: string; title: string; copy: string; action: string; href: string; amount: boolean }> = {
  success: { eyebrow: "ORDER CONFIRMED", title: "Your order is in. Keep the next step clear.", copy: "Your order details, delivery updates and the products you chose stay together from here.", action: "Track my order", href: "/checkout/tracking", amount: true },
  pending: { eyebrow: "ORDER PENDING", title: "Your order is waiting for the next update.", copy: "Keep this page close. As soon as the order progresses, the delivery and order details will be ready here.", action: "Review order", href: "/checkout/review", amount: false },
  failed: { eyebrow: "PAYMENT NOT COMPLETED", title: "Your order is ready whenever you are.", copy: "No payment was completed. Review the order and return to checkout when you are ready to try again.", action: "Return to checkout", href: "/checkout/retry", amount: false },
  cancelled: { eyebrow: "ORDER CANCELLED", title: "This order will not move forward.", copy: "You can return to the range, build a new order, or review your account for previous purchases.", action: "Browse products", href: "/shop", amount: false },
  tracking: { eyebrow: "ORDER TRACKING", title: "Follow your order from dispatch to delivery.", copy: "The current delivery progress sits beside the product and order information you need.", action: "View order details", href: "/account/orders", amount: false },
};

export function PostPurchaseSurface({ status, orderId }: { status: PostPurchaseStatus; orderId?: string }) {
  const state = states[status];
  const hasVerifiedOrder = Boolean(orderId);
  return <main className="post-purchase-surface" data-order-state={hasVerifiedOrder ? "projection-present" : "projection-unavailable"}><header className="page-hero"><div className="shell"><span className="eyebrow">{state.eyebrow}</span><h1>{state.title}</h1><p>{state.copy}</p></div></header><div className="shell post-purchase-grid"><section className="post-purchase-main"><div className="post-purchase-reference"><span>ORDER REFERENCE</span><strong>{orderId ?? "Unavailable until the order projection is verified"}</strong></div>{state.amount && hasVerifiedOrder ? <LifecycleAmountRecord stage="confirmation"/> : <p className="notice">Order totals, products and delivery stages appear only when this page receives a verified order projection. No customer amount is inferred here.</p>}{status === "tracking" && hasVerifiedOrder ? <ol className="tracking-timeline"><li data-active="true"><b>01</b><div><strong>Order confirmed</strong><span>Your order has been received.</span></div></li><li><b>02</b><div><strong>Fulfilment status</strong><span>Updates appear here when returned by the order projection.</span></div></li><li><b>03</b><div><strong>Carrier status</strong><span>Tracking details appear here when ready.</span></div></li><li><b>04</b><div><strong>Delivered</strong><span>The final delivery update will appear here.</span></div></li></ol> : <div className="post-purchase-actions"><Link className="button" href={state.href}>{state.action} →</Link><Link href="/account/orders">View all orders →</Link></div>}</section><aside className="post-purchase-side"><RestockCard state="active"/><RecommendationCard state="default"/></aside></div></main>;
}
