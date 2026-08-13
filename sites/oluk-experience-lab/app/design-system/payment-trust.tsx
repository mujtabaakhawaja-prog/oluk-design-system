import { paymentTrustCopy, paymentTrustStudy, type PaymentTrustLifecycleStage } from "./payment-trust-contract";
import styles from "./payment-trust.module.css";

export function CurrencyEqualityLock({ compact = false }: { compact?: boolean }) {
  return <section aria-label="Payment currency equivalence" className={styles.lock} data-compact={compact || undefined} data-live-authority="false">
    <div className={styles.lockHeading}><span aria-hidden="true">✓</span><div><strong>One order value</strong><p>The displayed order value is preserved at payment.</p></div></div>
    <div className={styles.equality}>
      <strong>{paymentTrustStudy.settlementAmount} <small>{paymentTrustStudy.settlementCurrency}</small></strong>
      <span aria-label="equals">=</span>
      <strong>{paymentTrustStudy.customerAmount} <small>{paymentTrustStudy.customerCurrency}</small></strong>
    </div>
    <p className={styles.explanation}>{paymentTrustCopy.equality}</p>
  </section>;
}

export function PaymentTrustPrimer() {
  return <section aria-label="Payment trust" className={styles.primer} data-live-authority="false">
    <div><span>{paymentTrustCopy.shopIn}</span><strong>{paymentTrustCopy.currencies.join(" · ")}</strong></div>
    <div><span>{paymentTrustCopy.paymentTrust}</span><p>{paymentTrustCopy.continuity}</p><p>{paymentTrustCopy.protectedStep}</p></div>
  </section>;
}

export function LifecycleAmountRecord({ stage }: { stage: Exclude<PaymentTrustLifecycleStage, "pre-purchase" | "payment"> }) {
  const heading = stage === "confirmation" ? paymentTrustCopy.confirmationHeading : stage === "refund" ? paymentTrustCopy.refundHeading : stage === "history" ? "Order total" : paymentTrustCopy.recordHeading;
  const copy = stage === "confirmation" ? paymentTrustCopy.confirmation : stage === "refund" ? paymentTrustCopy.refund : stage === "history" ? paymentTrustCopy.history : paymentTrustCopy.record;
  return <section aria-label={heading} className={styles.record} data-stage={stage} data-live-authority="false">
    <span>{heading}</span>
    <strong>{paymentTrustStudy.customerAmount} {paymentTrustStudy.customerCurrency}</strong>
    <p>{copy}</p>
  </section>;
}

