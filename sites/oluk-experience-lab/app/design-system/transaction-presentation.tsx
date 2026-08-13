import type { ReactNode } from "react";
import styles from "../transaction-presentation.module.css";
import { ActionLink, Breadcrumbs } from "./customer-route-primitives";
import { MetricRail } from "./metric-rail";
import { mk2866Fixture } from "./product-fixtures";
import { CurrencyEqualityLock, LifecycleAmountRecord, PaymentTrustPrimer } from "./payment-trust";
import { paymentTrustCopy, paymentTrustStudy } from "./payment-trust-contract";

export type TransactionStage =
  | "bag"
  | "details"
  | "delivery"
  | "handoff"
  | "order-pay"
  | "confirmation"
  | "failure"
  | "retry";

type TransactionStep = "bag" | "details" | "delivery" | "payment" | "complete";

const steps = [
  { key: "bag", label: "Bag", path: "/bag" },
  { key: "details", label: "Details", path: "/checkout" },
  { key: "delivery", label: "Delivery", path: "/checkout/delivery" },
  { key: "payment", label: "Payment", path: "/checkout/payment-handoff" },
  { key: "complete", label: "Complete", path: "/checkout/confirmation" },
] as const satisfies ReadonlyArray<{ key: TransactionStep; label: string; path: string }>;

const stageStep: Readonly<Record<TransactionStage, TransactionStep>> = {
  bag: "bag",
  details: "details",
  delivery: "delivery",
  handoff: "payment",
  "order-pay": "payment",
  confirmation: "complete",
  failure: "payment",
  retry: "payment",
};

const stageHeadings = {
  bag: {
    title: "Your bag.",
    copy: "Review product truth, quantity and the current order total before checkout.",
  },
  details: {
    title: "Your details.",
    copy: "Add the contact and delivery information needed to prepare the order.",
  },
  delivery: {
    title: "Choose delivery.",
    copy: "Review the available delivery presentation before moving to payment.",
  },
  handoff: {
    title: "Your product, order value and payment equivalent.",
    copy: paymentTrustCopy.continuity,
  },
  "order-pay": {
    title: "Make a card payment.",
    copy: paymentTrustCopy.protectedStep,
  },
  confirmation: {
    title: "Order received.",
    copy: "Your order summary and next steps stay together here.",
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

function TransactionProgress({ stage }: Readonly<{ stage: TransactionStage }>) {
  const current = stageStep[stage];
  const currentIndex = steps.findIndex((step) => step.key === current);

  return (
    <nav aria-label="Checkout progress" className={styles.progress}>
      <ol>
        {steps.map((step, index) => (
          <li data-complete={index < currentIndex || undefined} key={step.key}>
            <a aria-current={step.key === current ? "step" : undefined} href={step.path}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {step.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

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
        <TransactionProgress stage={stage} />
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
      <div className={styles.productMark} aria-hidden="true">
        <span>MK</span>
        <strong>2866</strong>
      </div>
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
      <div><OrderSummary compact /><PaymentTrustPrimer /></div>
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

function HandoffContent() {
  return (
    <div className={styles.layout}>
      <section className={styles.primary}>
        <div className={styles.handoffPanel}>
          <span className={styles.sectionLabel}>Secure payment</span>
          <h2>One clear step away. One clear route back.</h2>
          <p>You’ll leave Olympus briefly to complete payment in the secure payment window. When it closes, return here to see the order outcome.</p>
          <ol>
            <li><span>01</span><div><strong>Review</strong><p>Confirm the product and amount due.</p></div></li>
            <li><span>02</span><div><strong>Pay securely</strong><p>Choose the available payment method in the secure window.</p></div></li>
            <li><span>03</span><div><strong>Return</strong><p>Come back to Olympus for confirmation or a recovery route.</p></div></li>
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
      </section>
      <OrderSummary compact heading="Order total" />
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
    case "handoff": return <HandoffContent />;
    case "order-pay": return <OrderPayContent />;
    case "confirmation": return <ConfirmationContent />;
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
