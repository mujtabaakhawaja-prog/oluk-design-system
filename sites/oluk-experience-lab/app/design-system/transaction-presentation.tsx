/* eslint-disable @next/next/no-img-element -- transparent product render is shared with the governed product stage. */

import type { ReactNode } from "react";
import styles from "../transaction-presentation.module.css";
import { ActionLink, Breadcrumbs } from "./customer-route-primitives";
import { MetricRail } from "./metric-rail";
import { mk2866Fixture } from "./product-fixtures";
import { CurrencyEqualityLock, LifecycleAmountRecord, PaymentTrustPrimer } from "./payment-trust";
import { paymentTrustCopy, paymentTrustStudy } from "./payment-trust-contract";
import { RecommendationCard, RestockCard } from "./program-components";
import { YourStackBuilder } from "./your-stack-builder";

export type TransactionStage =
  | "bag"
  | "details"
  | "delivery"
  | "review"
  | "handoff"
  | "order-pay"
  | "processing"
  | "confirmation"
  | "tracking"
  | "order-history"
  | "order-details"
  | "receipt"
  | "return"
  | "refund"
  | "failure"
  | "retry";

const stageHeadings = {
  bag: {
    title: "Your bag.",
    copy: "Review product truth, quantity and the current order total before checkout.",
  },
  details: {
    title: "Your information.",
    copy: "Add the contact and delivery information needed to prepare the order.",
  },
  delivery: {
    title: "Choose delivery.",
    copy: "Review the available delivery options before moving to payment.",
  },
  review: {
    title: "Review your order.",
    copy: "Keep the product, delivery choice and amount together before payment.",
  },
  handoff: {
    title: "Your product, order value and payment equivalent.",
    copy: paymentTrustCopy.continuity,
  },
  "order-pay": {
    title: "Make a card payment.",
    copy: paymentTrustCopy.protectedStep,
  },
  processing: {
    title: "Checking your order update.",
    copy: "Keep this page open while the payment window returns you to Olympus.",
  },
  confirmation: {
    title: "Order received.",
    copy: "Your order summary and next steps stay together here.",
  },
  tracking: {
    title: "Track your order.",
    copy: "Follow the delivery journey and keep the order details close by.",
  },
  "order-history": {
    title: "Your orders.",
    copy: "Return to product, receipt and delivery details from one clear view.",
  },
  "order-details": {
    title: "Order details.",
    copy: "See the product, delivery and payment record together.",
  },
  receipt: {
    title: "Your receipt.",
    copy: "Keep a clear record of the product and processed amount.",
  },
  return: {
    title: "Start a return.",
    copy: "Keep the original order and the next return step together.",
  },
  refund: {
    title: "Refund details.",
    copy: "The original order and refund amount stay connected here.",
  },
  failure: {
    title: "Payment was not completed.",
    copy: "No payment was recorded. Your order summary is ready to review again.",
  },
  retry: {
    title: "Try payment again.",
    copy: "Review the amount and return to the secure payment step when ready.",
  },
} as const satisfies Readonly<Record<TransactionStage, { title: string; copy: string }>>;

function TransactionIntro({ stage }: Readonly<{ stage: TransactionStage }>) {
  const heading = stageHeadings[stage];
  return (
    <section className={styles.intro}>
      <div className="shell">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: heading.title.replace(/\.$/, "") },
          ]}
        />
        <div className={styles.introCopy}>
          <h1>{heading.title}</h1>
          <p>{heading.copy}</p>
        </div>
      </div>
    </section>
  );
}

function ProductLine({ quantity = true }: Readonly<{ quantity?: boolean }>) {
  return (
    <article className={styles.productLine}>
      <div className={styles.productMark}><img alt="MK-2866 Ostarine bottle" decoding="async" height={mk2866Fixture.media.height} loading="lazy" sizes="112px" src={mk2866Fixture.media.src} width={mk2866Fixture.media.width}/></div>
      <div className={styles.productIdentity}>
        <span>{mk2866Fixture.series}</span>
        <h2>{mk2866Fixture.name}</h2>
        <p>{mk2866Fixture.alias}</p>
        <MetricRail compact product={mk2866Fixture} />
      </div>
      <div className={styles.productPrice}>
        {quantity ? (
          <div aria-label="Quantity" className={styles.quantity} role="group">
            <button aria-label="Decrease quantity" disabled type="button">−</button>
            <output aria-label="Quantity">1</output>
            <button aria-label="Increase quantity" disabled type="button">+</button>
          </div>
        ) : null}
        <strong>{mk2866Fixture.price}</strong>
      </div>
    </article>
  );
}

function OrderSummary({
  action,
  compact = false,
  heading = "Order summary",
}: Readonly<{ action?: ReactNode; compact?: boolean; heading?: string }>) {
  return (
    <aside className={styles.summary} data-compact={compact || undefined}>
      <span className={styles.sectionLabel}>{heading}</span>
      <dl>
        <div><dt>MK-2866 × 1</dt><dd>{mk2866Fixture.price}</dd></div>
        <div><dt>Delivery</dt><dd>Shown before payment</dd></div>
        <div className={styles.total}><dt>Amount due</dt><dd>{mk2866Fixture.price}</dd></div>
      </dl>
      {action ? <div className={styles.summaryAction}>{action}</div> : null}
      <a className={styles.labLink} href={mk2866Fixture.evidencePath}>View MK-2866 Lab Record →</a>
    </aside>
  );
}

function Field({
  autoComplete,
  label,
  placeholder,
  type = "text",
}: Readonly<{ autoComplete: string; label: string; placeholder: string; type?: "email" | "tel" | "text" }>) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input autoComplete={autoComplete} placeholder={placeholder} readOnly type={type} />
    </label>
  );
}

function BagContent() {
  return (
    <div className={styles.layout}>
      <div className={styles.primary}>
        <span className={styles.sectionLabel}>1 item</span>
        <ProductLine />
        <div className={styles.bagHelp}>
          <div><strong>Need to keep browsing?</strong><span>Your bag stays ready while you compare the range.</span></div>
          <a href="/shop">Return to the shop →</a>
        </div>
        <RecommendationCard state="default" />
        <YourStackBuilder baselineSlug="mk-2866" host="bag" />
      </div>
      <OrderSummary action={<ActionLink href="/checkout">Continue to details</ActionLink>} />
    </div>
  );
}

function DetailsContent() {
  return (
    <div className={styles.layout}>
      <section aria-label="Checkout details presentation" className={styles.primary}>
        <section className={styles.formPanel}>
          <div className={styles.panelHeading}><span>01</span><div><h2>Contact</h2><p>Used for the order confirmation and delivery updates.</p></div></div>
          <div className={styles.fieldGrid}>
            <Field autoComplete="email" label="Email address" placeholder="you@example.com" type="email" />
            <Field autoComplete="tel" label="Phone number" placeholder="Phone number" type="tel" />
          </div>
        </section>
        <section className={styles.formPanel}>
          <div className={styles.panelHeading}><span>02</span><div><h2>Delivery address</h2><p>Enter the destination used to show delivery options.</p></div></div>
          <div className={styles.fieldGrid}>
            <Field autoComplete="given-name" label="First name" placeholder="First name" />
            <Field autoComplete="family-name" label="Last name" placeholder="Last name" />
            <Field autoComplete="address-line1" label="Address" placeholder="Street and number" />
            <Field autoComplete="address-line2" label="Address line 2" placeholder="Apartment, suite or unit" />
            <Field autoComplete="address-level2" label="Town or city" placeholder="Town or city" />
            <Field autoComplete="postal-code" label="Postcode" placeholder="Postcode" />
          </div>
        </section>
        <div className={styles.continueRow}>
          <a href="/bag">← Back to bag</a>
          <ActionLink href="/checkout/delivery">Continue to delivery</ActionLink>
        </div>
      </section>
      <div className={styles.asideStack}><OrderSummary compact /><PaymentTrustPrimer compact /></div>
    </div>
  );
}

function DeliveryContent() {
  return (
    <div className={styles.layout}>
      <div className={styles.primary}>
        <section className={styles.formPanel}>
          <div className={styles.panelHeading}><span>01</span><div><h2>Delivery option</h2><p>Timing and cost are confirmed against the delivery address before payment.</p></div></div>
          <label className={styles.choice}>
            <input checked readOnly type="radio" />
            <span><strong>Standard delivery</strong><small>Available timing appears with the confirmed address.</small></span>
            <b>Selected</b>
          </label>
        </section>
        <section className={styles.formPanel}>
          <div className={styles.panelHeading}><span>02</span><div><h2>Review</h2><p>Check the product and amount before continuing.</p></div></div>
          <ProductLine quantity={false} />
        </section>
        <div className={styles.continueRow}>
          <a href="/checkout">← Back to details</a>
          <ActionLink href="/checkout/payment-handoff">Continue to payment</ActionLink>
        </div>
      </div>
      <div><OrderSummary compact /><CurrencyEqualityLock compact /></div>
    </div>
  );
}

function ReviewContent() {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <section className={styles.formPanel}>
          <div className={styles.panelHeading}><span>01</span><div><h2>Your order, ready to review.</h2><p>MK-2866, your delivery choice and the amount due are gathered in one final check.</p></div></div>
          <ProductLine quantity={false} />
        </section>
        <section className={styles.deliveryRecap}>
          <span className={styles.sectionLabel}>Delivery</span>
          <strong>Standard delivery</strong>
          <p>Your delivery timing is shown with the confirmed address before payment.</p>
        </section>
        <div className={styles.continueRow}>
          <a href="/checkout/delivery">← Back to delivery</a>
          <ActionLink href="/checkout/payment-handoff">Continue to payment</ActionLink>
        </div>
      </section>
      <div className={styles.asideStack}><OrderSummary compact /><CurrencyEqualityLock compact /></div>
    </div>
  );
}

function HandoffContent() {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <div className={styles.handoffPanel}>
          <span className={styles.sectionLabel}>Secure payment</span>
          <h2>One clear step away. One clear return to Olympus.</h2>
          <p>You’ll leave Olympus briefly to complete payment in the secure payment window. When it closes, return here to see the order outcome.</p>
          <ol>
            <li><span>01</span><div><strong>Review</strong><p>Confirm the product and amount due.</p></div></li>
            <li><span>02</span><div><strong>Pay securely</strong><p>Choose the available payment method in the secure window.</p></div></li>
            <li><span>03</span><div><strong>Return</strong><p>Come back to Olympus for confirmation or help completing payment.</p></div></li>
          </ol>
          <div className={styles.continueRow}>
            <a href="/checkout/delivery">← Back to delivery</a>
            <ActionLink href="/checkout/order-pay">Open secure payment</ActionLink>
          </div>
        </div>
      </section>
      <OrderSummary compact />
    </div>
  );
}

function OrderPayContent() {
  return (
    <div className={styles.paymentLayout}>
      <section className={styles.paymentWindow}>
        <div className={styles.paymentLock} aria-hidden="true">✓</div>
        <span className={styles.sectionLabel}>Secure payment window</span>
        <h2>Payment amount</h2>
        <strong className={styles.paymentAmount}>{paymentTrustStudy.settlementAmount} USD</strong>
        <p>{paymentTrustCopy.equality}</p>
        <button className="button" disabled type="button">Pay securely</button>
        <a href="/checkout/payment-handoff">Return to order review</a>
        <a href="/checkout/failure">Payment not completed?</a>
      </section>
      <div><CurrencyEqualityLock compact /><OrderSummary compact heading="Payment summary" /></div>
    </div>
  );
}

function ProcessingContent() {
  return (
    <div className={styles.processingLayout}>
      <section className={styles.processingPanel}>
        <div aria-hidden="true" className={styles.processingMark}><span /><span /><span /></div>
        <span className={styles.sectionLabel}>Payment update</span>
        <h2>Keep this page open while your order update returns.</h2>
        <p>The order outcome appears here after the payment window returns you to Olympus.</p>
        <div className={styles.processingActions}>
          <a href="/checkout/payment-handoff">Return to payment</a>
          <a href="/checkout/confirmation">View order update</a>
        </div>
      </section>
      <div className={styles.asideStack}><OrderSummary compact heading="Order value" /><PaymentTrustPrimer compact /></div>
    </div>
  );
}

function ConfirmationContent() {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <div className={styles.outcome} data-tone="success">
          <span aria-hidden="true">✓</span>
          <div><strong>Thank you.</strong><p>The order summary is ready below.</p></div>
        </div>
        <LifecycleAmountRecord stage="confirmation" />
        <section className={styles.formPanel}>
          <div className={styles.confirmationHeading}>
            <div><span className={styles.sectionLabel}>Order reference</span><strong>OL-10428</strong></div>
            <a href="/account">View your account →</a>
          </div>
          <ProductLine quantity={false} />
        </section>
        <div className={styles.nextSteps}>
          <article><span>01</span><h2>Confirmation</h2><p>Your order details stay connected to the reference above.</p></article>
          <article><span>02</span><h2>Delivery</h2><p>Delivery progress appears with the order when available.</p></article>
          <article><span>03</span><h2>Lab Record</h2><p>Product evidence remains available independently of the order.</p></article>
        </div>
        <RestockCard state="active" />
        <RecommendationCard state="default" />
        <YourStackBuilder baselineSlug="mk-2866" host="confirmation" />
      </section>
      <OrderSummary compact heading="Order total" />
    </div>
  );
}

function TrackingContent() {
  const milestones = [
    ["01", "Order received", "Your order reference and product details are ready to view."],
    ["02", "Preparing your order", "The next delivery update appears with the order when available."],
    ["03", "On its way", "Tracking details appear here when the delivery is on its way."],
    ["04", "Delivered", "The final delivery update stays with the order history."],
  ] as const;

  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <section className={styles.trackingPanel}>
          <div className={styles.confirmationHeading}><div><span className={styles.sectionLabel}>Order reference</span><strong>OL-10428</strong></div><a href="/checkout/order-details">View order details →</a></div>
          <ol className={styles.timeline}>
            {milestones.map(([index, title, copy], milestone) => <li data-current={milestone === 1 || undefined} key={title}><span>{index}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}
          </ol>
        </section>
        <ProductLine quantity={false} />
      </section>
      <OrderSummary compact heading="Order summary" />
    </div>
  );
}

function OrderHistoryContent() {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <section className={styles.historyPanel}>
          <span className={styles.sectionLabel}>Latest order</span>
          <div className={styles.historyHeading}><div><h2>MK-2866</h2><p>Ostarine · 15 MG · 90 SERVINGS</p></div><strong>OL-10428</strong></div>
          <LifecycleAmountRecord stage="history" />
          <div className={styles.historyActions}><ActionLink href="/checkout/tracking">Track order</ActionLink><a href="/checkout/receipt">Open receipt →</a><a href="/product/mk-2866">Return to product →</a></div>
        </section>
        <RecommendationCard state="default" />
      </section>
      <OrderSummary compact heading="Latest order" />
    </div>
  );
}

function OrderDetailsContent({ receipt = false }: Readonly<{ receipt?: boolean }>) {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <section className={styles.formPanel}>
          <div className={styles.confirmationHeading}><div><span className={styles.sectionLabel}>{receipt ? "Receipt" : "Order reference"}</span><strong>OL-10428</strong></div><a href={receipt ? "/checkout/order-details" : "/checkout/receipt"}>{receipt ? "View order details →" : "Open receipt →"}</a></div>
          <ProductLine quantity={false} />
        </section>
        <LifecycleAmountRecord stage={receipt ? "receipt" : "order-details"} />
        <section className={styles.orderNote}><strong>{receipt ? "Order receipt" : "Delivery and order details"}</strong><p>{receipt ? "This receipt keeps the product, order reference and processed amount together." : "Delivery updates stay connected to the order reference and product details above."}</p></section>
      </section>
      <OrderSummary compact heading={receipt ? "Receipt summary" : "Order summary"} />
    </div>
  );
}

function ReturnContent() {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <section className={styles.returnPanel}>
          <span className={styles.sectionLabel}>Order OL-10428</span>
          <h2>Start with the item you need to return.</h2>
          <p>Keep the original product and order details in view before the return is reviewed.</p>
          <ProductLine quantity={false} />
          <ol className={styles.returnSteps}><li><span>01</span><div><strong>Review the order</strong><p>Check the product and order reference above.</p></div></li><li><span>02</span><div><strong>Share what you need</strong><p>Use the return guidance to prepare the next step.</p></div></li><li><span>03</span><div><strong>Keep the outcome close</strong><p>Return and refund updates stay attached to this order.</p></div></li></ol>
          <div className={styles.continueRow}><a href="/checkout/order-details">View order details</a><ActionLink href="/refunds">View return guidance</ActionLink></div>
        </section>
      </section>
      <OrderSummary compact heading="Original order" />
    </div>
  );
}

function RefundContent() {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <section className={styles.refundPanel}>
          <span className={styles.sectionLabel}>Order OL-10428</span>
          <h2>Your refund record.</h2>
          <p>The original order value and the fixed payment equivalent stay together in the refund record.</p>
          <LifecycleAmountRecord stage="refund" />
          <div className={styles.continueRow}><a href="/checkout/order-details">View order details</a><ActionLink href="/account/orders">View all orders</ActionLink></div>
        </section>
        <RecommendationCard state="default" />
      </section>
      <OrderSummary compact heading="Original order" />
    </div>
  );
}

function FailureContent() {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <div className={styles.outcome} data-tone="attention">
          <span aria-hidden="true">!</span>
          <div><strong>No payment was recorded.</strong><p>Review the order before choosing whether to try again.</p></div>
        </div>
        <section className={styles.formPanel}>
          <ProductLine quantity={false} />
          <div className={styles.continueRow}>
            <a href="/bag">Return to bag</a>
            <ActionLink href="/checkout/retry">Review and retry</ActionLink>
          </div>
        </section>
      </section>
      <OrderSummary compact heading="Unpaid order summary" />
    </div>
  );
}

function RetryContent() {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <div className={styles.retryPanel}>
          <span className={styles.sectionLabel}>Ready when you are</span>
          <h2>Nothing changed while you were away.</h2>
          <p>MK-2866, quantity one and the amount due remain ready for review.</p>
          <ProductLine quantity={false} />
          <div className={styles.continueRow}>
            <a href="/bag">Return to bag</a>
            <ActionLink href="/checkout/order-pay">Try secure payment again</ActionLink>
          </div>
        </div>
      </section>
      <OrderSummary compact />
    </div>
  );
}

function TransactionContent({ stage }: Readonly<{ stage: TransactionStage }>) {
  switch (stage) {
    case "bag": return <BagContent />;
    case "details": return <DetailsContent />;
    case "delivery": return <DeliveryContent />;
    case "review": return <ReviewContent />;
    case "handoff": return <HandoffContent />;
    case "order-pay": return <OrderPayContent />;
    case "processing": return <ProcessingContent />;
    case "confirmation": return <ConfirmationContent />;
    case "tracking": return <TrackingContent />;
    case "order-history": return <OrderHistoryContent />;
    case "order-details": return <OrderDetailsContent />;
    case "receipt": return <OrderDetailsContent receipt />;
    case "return": return <ReturnContent />;
    case "refund": return <RefundContent />;
    case "failure": return <FailureContent />;
    case "retry": return <RetryContent />;
  }
}

export function TransactionPresentation({ stage }: Readonly<{ stage: TransactionStage }>) {
  return (
    <div className={styles.transaction} data-live-authority="false" data-transaction-stage={stage}>
      <TransactionIntro stage={stage} />
      <section className={styles.content}>
        <div className="shell"><TransactionContent stage={stage} /></div>
      </section>
    </div>
  );
}
