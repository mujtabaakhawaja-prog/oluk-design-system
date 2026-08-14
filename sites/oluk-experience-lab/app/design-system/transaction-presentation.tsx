import type { ReactNode } from "react";
import styles from "../transaction-presentation.module.css";
import { DecisionSurface, TechnicalSurface, TransactionIntroCard } from "./content-surfaces";
import { ActionLink, Breadcrumbs } from "./customer-route-primitives";
import { mk2866Fixture } from "./product-fixtures";
import { CurrencyEqualityLock, LifecycleAmountRecord, PaymentTrustPrimer } from "./payment-trust";
import { paymentTrustCopy, paymentTrustStudy } from "./payment-trust-contract";
import { ProductCommerceCard } from "./product-commerce-card";
import { CheckoutStepIndicator, RestockCard, type CheckoutStep } from "./program-components";
import { YourStackBuilder } from "./your-stack-builder";

export type TransactionStage =
  | "bag"
  | "details"
  | "delivery"
  | "review"
  | "handoff"
  | "order-pay"
  | "processing"
  | "pending"
  | "confirmation"
  | "tracking"
  | "order-history"
  | "order-details"
  | "receipt"
  | "return"
  | "refund"
  | "failure"
  | "cancelled"
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
  pending: {
    title: "Your order is waiting for an update.",
    copy: "The order remains open while the next confirmed status is prepared.",
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
  cancelled: {
    title: "This order will not move forward.",
    copy: "The order is closed and no further payment or delivery step will be taken.",
  },
  retry: {
    title: "Try payment again.",
    copy: "Review the amount and return to the secure payment step when ready.",
  },
} as const satisfies Readonly<Record<TransactionStage, { title: string; copy: string }>>;

const checkoutStepByStage: Partial<Record<TransactionStage, CheckoutStep>> = {
  details: "information",
  delivery: "delivery",
  review: "review",
  handoff: "payment",
  "order-pay": "payment",
  processing: "payment",
  pending: "payment",
  failure: "payment",
  retry: "payment",
  confirmation: "confirmation",
};

function TransactionIntro({ stage }: Readonly<{ stage: TransactionStage }>) {
  const heading = stageHeadings[stage];
  const checkoutStep = checkoutStepByStage[stage];
  return (
    <section className={styles.intro}>
      <div className="shell">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: heading.title.replace(/\.$/, "") },
          ]}
        />
        <TransactionIntroCard
          className={styles.introCard}
          copy={heading.copy}
          eyebrow={stage === "bag" ? "Your order" : stage === "tracking" ? "Delivery progress" : "Order journey"}
          headingLevel="h1"
          title={heading.title}
        >
          {checkoutStep ? <CheckoutStepIndicator current={checkoutStep} /> : null}
        </TransactionIntroCard>
      </div>
    </section>
  );
}

function ProductLine({ quantity = true }: Readonly<{ quantity?: boolean }>) {
  return (
    <section aria-label="MK-2866 order line" className={styles.productLine} data-copy-surface="transaction">
      <ProductCommerceCard
        commerceTreatment="selection"
        product={mk2866Fixture}
        showQualitative={false}
        variant="compact"
      />
      <div className={styles.productPrice} data-component="OrderLineCommerce">
        <span className={styles.sectionLabel}>{quantity ? "Quantity and price" : "Order price"}</span>
        {quantity ? (
          <div aria-label="Quantity" className={styles.quantity} role="group">
            <button aria-label="Decrease quantity" disabled type="button">−</button>
            <output aria-label="Quantity">1</output>
            <button aria-label="Increase quantity" disabled type="button">+</button>
          </div>
        ) : null}
        <strong>{mk2866Fixture.price}</strong>
      </div>
    </section>
  );
}

function OrderSummary({
  action,
  compact = false,
  confidenceLink = false,
  heading = "Order summary",
}: Readonly<{ action?: ReactNode; compact?: boolean; confidenceLink?: boolean; heading?: string }>) {
  return (
    <aside className={styles.summary} data-compact={compact || undefined}>
      <span className={styles.sectionLabel}>{heading}</span>
      <dl>
        <div><dt>MK-2866 × 1</dt><dd>{mk2866Fixture.price}</dd></div>
        <div><dt>Delivery</dt><dd>Shown before payment</dd></div>
        <div className={styles.total}><dt>Amount due</dt><dd>{mk2866Fixture.price}</dd></div>
      </dl>
      {action ? <div className={styles.summaryAction}>{action}</div> : null}
      {confidenceLink ? <a className={styles.labLink} href={mk2866Fixture.evidencePath}>View MK-2866 Lab Record →</a> : null}
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
        <TechnicalSurface
          actions={<ActionLink href="/shop" secondary>Return to the shop</ActionLink>}
          compact
          copy="Add your delivery address during checkout to see the available timing and cost before payment."
          eyebrow="Delivery"
          title="See your delivery choices before payment."
        />
        <YourStackBuilder baselineSlug="mk-2866" host="bag" />
      </div>
      <OrderSummary action={<ActionLink href="/checkout">Continue to details</ActionLink>} confidenceLink />
    </div>
  );
}

function DetailsContent() {
  return (
    <div className={styles.layout}>
      <section aria-label="Checkout details presentation" className={styles.primary}>
        <section className={styles.formPanel} data-copy-surface="transaction">
          <div className={styles.panelHeading}><span>01</span><div><h2>Contact</h2><p>Used for the order confirmation and delivery updates.</p></div></div>
          <div className={styles.fieldGrid}>
            <Field autoComplete="email" label="Email address" placeholder="you@example.com" type="email" />
            <Field autoComplete="tel" label="Phone number" placeholder="Phone number" type="tel" />
          </div>
        </section>
        <section className={styles.formPanel} data-copy-surface="transaction">
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
        <section className={styles.formPanel} data-copy-surface="transaction">
          <div className={styles.panelHeading}><span>01</span><div><h2>Delivery option</h2><p>Timing and cost are confirmed against the delivery address before payment.</p></div></div>
          <label className={styles.choice}>
            <input checked readOnly type="radio" />
            <span><strong>Standard delivery</strong><small>Available timing appears with the confirmed address.</small></span>
            <b>Selected</b>
          </label>
        </section>
        <section className={styles.formPanel} data-copy-surface="transaction">
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
        <section className={styles.formPanel} data-copy-surface="transaction">
          <div className={styles.panelHeading}><span>01</span><div><h2>Your order, ready to review.</h2><p>MK-2866, your delivery choice and the amount due are gathered in one final check.</p></div></div>
          <ProductLine quantity={false} />
        </section>
        <section className={styles.deliveryRecap} data-copy-surface="transaction">
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
        <div className={styles.handoffPanel} data-copy-surface="decision">
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
      <section className={styles.paymentWindow} data-copy-surface="transaction">
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
      <section className={styles.processingPanel} data-copy-surface="technical">
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

function ConfirmationContent({ orderReference }: Readonly<{ orderReference: string }>) {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <div className={styles.outcome} data-copy-surface="transaction" data-tone="success">
          <span aria-hidden="true">✓</span>
          <div><strong>Thank you.</strong><p>The order summary is ready below.</p></div>
        </div>
        <LifecycleAmountRecord stage="confirmation" />
        <section className={styles.formPanel} data-copy-surface="transaction">
          <div className={styles.confirmationHeading}>
            <div><span className={styles.sectionLabel}>Order reference</span><strong>{orderReference}</strong></div>
            <a href="/account">View your account →</a>
          </div>
          <ProductLine quantity={false} />
        </section>
        <div className={styles.nextSteps}>
          <DecisionSurface compact copy="Your product and paid amount stay connected to the order reference above." eyebrow="01" title="Keep the confirmation." />
          <DecisionSurface compact copy="Delivery progress appears with the order when a confirmed update is available." eyebrow="02" title="Follow delivery." />
          <TechnicalSurface compact copy="The available product record remains accessible independently of the order." eyebrow="03" title="Return to OpenLab." />
        </div>
        <div className={styles.continuationSurface} data-copy-surface="commerce"><RestockCard state="active" /></div>
        <YourStackBuilder baselineSlug="mk-2866" host="confirmation" />
      </section>
      <OrderSummary compact confidenceLink heading="Order total" />
    </div>
  );
}

function TrackingContent({ orderReference }: Readonly<{ orderReference: string }>) {
  const milestones = [
    ["01", "Order received", "Your order reference and product details are ready to view."],
    ["02", "Preparing your order", "The next delivery update appears with the order when available."],
    ["03", "On its way", "Tracking details appear here when the delivery is on its way."],
    ["04", "Delivered", "The final delivery update stays with the order history."],
  ] as const;

  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <section className={styles.trackingPanel} data-copy-surface="transaction">
          <div className={styles.confirmationHeading}><div><span className={styles.sectionLabel}>Order reference</span><strong>{orderReference}</strong></div><a href="/checkout/order-details">View order details →</a></div>
          <ol className={styles.timeline}>
            {milestones.map(([index, title, copy], milestone) => <li data-current={milestone === 1 || undefined} key={title}><span>{index}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}
          </ol>
        </section>
        <ProductLine quantity={false} />
      </section>
      <OrderSummary compact confidenceLink heading="Order summary" />
    </div>
  );
}

function OrderHistoryContent({ orderReference }: Readonly<{ orderReference: string }>) {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <section className={styles.historyPanel} data-copy-surface="transaction">
          <span className={styles.sectionLabel}>Latest order</span>
          <div className={styles.historyHeading}><div><h2>MK-2866</h2><p>Ostarine · 15 MG · 90 SERVINGS</p></div><strong>{orderReference}</strong></div>
          <LifecycleAmountRecord stage="history" />
          <div className={styles.historyActions}><ActionLink href="/checkout/tracking">Track order</ActionLink><a href="/checkout/receipt">Open receipt →</a><a href="/product/mk-2866">Return to product →</a></div>
        </section>
        <div className={styles.continuationSurface} data-copy-surface="commerce"><RestockCard state="due-soon" /></div>
      </section>
      <OrderSummary compact confidenceLink heading="Latest order" />
    </div>
  );
}

function OrderDetailsContent({ orderReference, receipt = false }: Readonly<{ orderReference: string; receipt?: boolean }>) {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <section className={styles.formPanel} data-copy-surface="transaction">
          <div className={styles.confirmationHeading}><div><span className={styles.sectionLabel}>{receipt ? "Receipt" : "Order reference"}</span><strong>{orderReference}</strong></div><a href={receipt ? "/checkout/order-details" : "/checkout/receipt"}>{receipt ? "View order details →" : "Open receipt →"}</a></div>
          <ProductLine quantity={false} />
        </section>
        <LifecycleAmountRecord stage={receipt ? "receipt" : "order-details"} />
        <section className={styles.orderNote} data-copy-surface="transaction"><strong>{receipt ? "Order receipt" : "Delivery and order details"}</strong><p>{receipt ? "This receipt keeps the product, order reference and processed amount together." : "Delivery updates stay connected to the order reference and product details above."}</p></section>
      </section>
      <OrderSummary compact confidenceLink heading={receipt ? "Receipt summary" : "Order summary"} />
    </div>
  );
}

function ReturnContent({ orderReference }: Readonly<{ orderReference: string }>) {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <section className={styles.returnPanel} data-copy-surface="decision">
          <span className={styles.sectionLabel}>Order {orderReference}</span>
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

function RefundContent({ orderReference }: Readonly<{ orderReference: string }>) {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <section className={styles.refundPanel} data-copy-surface="transaction">
          <span className={styles.sectionLabel}>Order {orderReference}</span>
          <h2>Your refund record.</h2>
          <p>The original order value and the fixed payment equivalent stay together in the refund record.</p>
          <LifecycleAmountRecord stage="refund" />
          <div className={styles.continueRow}><a href="/checkout/order-details">View order details</a><ActionLink href="/account/orders">View all orders</ActionLink></div>
        </section>
        <DecisionSurface
          actions={<ActionLink href="/shop">Browse the product range</ActionLink>}
          compact
          copy="The refund record above resolves this order first. If you want a different product direction, return to the range when you are ready."
          eyebrow="After resolution"
          title="Choose what comes next on your terms."
        />
      </section>
      <OrderSummary compact heading="Original order" />
    </div>
  );
}

function FailureContent() {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <div className={styles.outcome} data-copy-surface="transaction" data-tone="attention">
          <span aria-hidden="true">!</span>
          <div><strong>No payment was recorded.</strong><p>Review the order before choosing whether to try again.</p></div>
        </div>
        <section className={styles.formPanel} data-copy-surface="transaction">
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
        <div className={styles.retryPanel} data-copy-surface="decision">
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

function PendingContent({ orderReference }: Readonly<{ orderReference: string }>) {
  return (
    <div className={styles.processingLayout}>
      <TechnicalSurface
        actions={<ActionLink href="/checkout/order-details" secondary>Review order details</ActionLink>}
        className={styles.pendingPanel}
        copy="No new payment or delivery outcome is being claimed. Return to this order after a confirmed update is available."
        eyebrow={`Order ${orderReference}`}
        title="Your order is still waiting for its next confirmed status."
      >
        <ProductLine quantity={false} />
      </TechnicalSurface>
      <OrderSummary compact heading="Pending order" />
    </div>
  );
}

function CancelledContent({ orderReference }: Readonly<{ orderReference: string }>) {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <DecisionSurface
          actions={<><ActionLink href="/account/orders" secondary>View all orders</ActionLink><ActionLink href="/shop">Return to the shop</ActionLink></>}
          copy="No payment retry or delivery action is required for this order. The closed order remains available in your order history."
          eyebrow={`Order ${orderReference}`}
          title="This order is closed."
        >
          <ProductLine quantity={false} />
        </DecisionSurface>
      </section>
      <OrderSummary compact heading="Closed order" />
    </div>
  );
}

function TransactionContent({ orderReference, stage }: Readonly<{ orderReference: string; stage: TransactionStage }>) {
  switch (stage) {
    case "bag": return <BagContent />;
    case "details": return <DetailsContent />;
    case "delivery": return <DeliveryContent />;
    case "review": return <ReviewContent />;
    case "handoff": return <HandoffContent />;
    case "order-pay": return <OrderPayContent />;
    case "processing": return <ProcessingContent />;
    case "pending": return <PendingContent orderReference={orderReference} />;
    case "confirmation": return <ConfirmationContent orderReference={orderReference} />;
    case "tracking": return <TrackingContent orderReference={orderReference} />;
    case "order-history": return <OrderHistoryContent orderReference={orderReference} />;
    case "order-details": return <OrderDetailsContent orderReference={orderReference} />;
    case "receipt": return <OrderDetailsContent orderReference={orderReference} receipt />;
    case "return": return <ReturnContent orderReference={orderReference} />;
    case "refund": return <RefundContent orderReference={orderReference} />;
    case "failure": return <FailureContent />;
    case "cancelled": return <CancelledContent orderReference={orderReference} />;
    case "retry": return <RetryContent />;
  }
}

export function TransactionPresentation({ orderReference = "OL-10428", stage }: Readonly<{ orderReference?: string; stage: TransactionStage }>) {
  return (
    <div className={styles.transaction} data-live-authority="false" data-transaction-stage={stage}>
      <TransactionIntro stage={stage} />
      <section className={styles.content}>
        <div className="shell"><TransactionContent orderReference={orderReference} stage={stage} /></div>
      </section>
    </div>
  );
}
