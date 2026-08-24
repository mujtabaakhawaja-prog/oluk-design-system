import { SiteFooter } from "../experience-lab";
import transactionStyles from "../transaction-presentation.module.css";
import { DecisionSurface, TechnicalSurface } from "./content-surfaces";
import { CurrencyEqualityLock, LifecycleAmountRecord } from "./payment-trust";
import { ProductCommerceCard } from "./product-commerce-card";
import { SiteHeader } from "./site-header";
import { ProductDecisionHero } from "./product-decision-hero";
import { ProductDossier } from "./product-dossier";
import { mk2866Fixture } from "./product-fixtures";
import { PurchasePanel } from "./purchase-panel";
import { MobileDecisionSummary, ProductDetailDisclosure, ProductEvidenceSnapshot, ProductMediaGallery } from "./pdp-sections";
import { GrowthModules, ProductContinuation, ProductHero, ProductNarrative, StackExplorer } from "./frontier-sections";
import { productBySlug } from "./frontier-content";
import { OpenLabHeroLight } from "./openlab-hero-light";
import { EvidenceRecordExplainer, OpenLabComparison, OpenLabMethodologyPipeline, OpenLabRegistryArchive, OpenLabSourceChain } from "./openlab-sections";
import { OpenLabProductExperience } from "./openlab-product-experience";
import {
  AnalyteTable,
  CheckoutStepIndicator,
  CustodyTimeline,
  EvidenceStatusChip,
  RecommendationCard,
  RestockCard,
  UnavailableEvidencePanel,
  UpsellContextRail,
} from "./program-components";
import { TransactionPresentation } from "./transaction-presentation";
import styles from "../review-studio/review-studio.module.css";

const recommendationStates = ["default", "selected", "added", "unavailable", "out-of-stock"] as const;
const restockStates = ["active", "due-soon", "overdue", "paused"] as const;
const evidenceStates = ["verified-evidence", "source-reported", "source-only", "unavailable"] as const;
const checkoutReviewSteps = ["information", "delivery", "review", "payment", "confirmation"] as const;

function CheckoutOwnerReviewMatrix() {
  return (
    <section
      aria-labelledby="checkout-owner-review-title"
      className={transactionStyles.ownerReviewMatrix}
      data-commerce-mutation="none"
      data-live-authority="false"
      data-owner-only="true"
      data-payment-topology="preserve-only"
      data-review-role="owner-only-state-matrix"
    >
      <header className={transactionStyles.ownerReviewHeader}>
        <span>OWNER-ONLY REVIEW MATRIX</span>
        <h2 id="checkout-owner-review-title">Checkout coverage beneath the customer specimen.</h2>
        <p>Review step progression, amount continuity, unavailable order content, payment failure and recovery without invoking checkout, payment or provider execution.</p>
      </header>

      <div className={transactionStyles.ownerReviewGrid}>
        <article className={transactionStyles.ownerReviewPanel} data-review-state="checkout-step">
          <div className={transactionStyles.ownerPanelHeading}><span>01</span><div><h3>Checkout step states</h3><p>Each current-step position uses the shared shell indicator.</p></div></div>
          <div className={transactionStyles.ownerStepMatrix}>
            {checkoutReviewSteps.map((step) => (
              <div className={transactionStyles.ownerStepSpecimen} key={step}>
                <span>Current · {step}</span>
                <CheckoutStepIndicator current={step} />
              </div>
            ))}
          </div>
        </article>

        <article className={transactionStyles.ownerReviewPanel} data-review-state="lifecycle">
          <div className={transactionStyles.ownerPanelHeading}><span>02</span><div><h3>Lifecycle amount continuity</h3><p>The same fixed presentation record remains legible at confirmation and receipt.</p></div></div>
          <div className={transactionStyles.ownerLifecycleGrid}>
            <CurrencyEqualityLock compact />
            <LifecycleAmountRecord stage="confirmation" />
            <LifecycleAmountRecord stage="receipt" />
          </div>
        </article>

        <article className={transactionStyles.ownerReviewPanel} data-review-state="unavailable">
          <div className={transactionStyles.ownerPanelHeading}><span>03</span><div><h3>Unavailable owner content</h3><p>Order-bound content fails closed when no owner projection is supplied.</p></div></div>
          <TechnicalSurface
            compact
            copy="No order detail is substituted while the owning projection is unavailable."
            eyebrow="CURRENTLY UNAVAILABLE"
            state="unavailable"
            title="Order details are unavailable."
          />
        </article>

        <article className={transactionStyles.ownerReviewPanel} data-review-state="failure">
          <div className={transactionStyles.ownerPanelHeading}><span>04</span><div><h3>Failure</h3><p>The customer sees an explicit outcome without a simulated payment result.</p></div></div>
          <div className={transactionStyles.outcome} data-copy-surface="transaction" data-tone="attention">
            <span aria-hidden="true">!</span>
            <div><strong>No payment was recorded.</strong><p>The order remains available for a deliberate next decision.</p></div>
          </div>
        </article>

        <article className={transactionStyles.ownerReviewPanel} data-review-state="recovery">
          <div className={transactionStyles.ownerPanelHeading}><span>05</span><div><h3>Recovery</h3><p>Recovery returns to review before the preserved secure payment surface.</p></div></div>
          <DecisionSurface
            compact
            copy="Confirm the product and amount again, then use the existing payment handoff only when the customer chooses to continue."
            eyebrow="REVIEW BEFORE RETRY"
            headingLevel="h3"
            title="Nothing changes until the customer continues."
          />
        </article>
      </div>
    </section>
  );
}

export function ReviewStudioGallery({ groupId }: { groupId: string }) {
  if (groupId === "shell-wayfinding") return <div className={styles.gallery}><div className={styles.shellSpecimen}><SiteHeader route="reviews" /></div><div className={styles.shellSpecimen}><SiteFooter /></div></div>;
  if (groupId === "commerce-decision") return <div className={styles.gallery}><ProductHero product={productBySlug["mk-2866"]}/><ProductNarrative product={productBySlug["mk-2866"]}/><ProductContinuation product={productBySlug["rad-140"]}/><ProductDecisionHero product={mk2866Fixture}/><ProductMediaGallery product={mk2866Fixture}/><PurchasePanel product={mk2866Fixture}/><ProductDetailDisclosure product={mk2866Fixture}/><ProductCommerceCard product={mk2866Fixture} variant="vertical"/><ProductDossier product={mk2866Fixture}/><ProductEvidenceSnapshot product={mk2866Fixture}/><MobileDecisionSummary product={mk2866Fixture}/></div>;
  if (groupId === "growth-continuation") return <div className={styles.gallery}><StackExplorer/><GrowthModules/><div className={styles.stateGrid}>{recommendationStates.map((state)=><RecommendationCard key={state} state={state}/>)}</div><div className={styles.stateGrid}>{restockStates.map((state)=><RestockCard key={state} state={state}/>)}</div><UpsellContextRail/></div>;
  if (groupId === "evidence-openlab") return <div className={styles.gallery}><section data-review-role="openlab-primary-customer-specimen"><OpenLabHeroLight/></section><div className={styles.atomRow}>{evidenceStates.map((state)=><EvidenceStatusChip key={state} state={state}/>)}</div><EvidenceRecordExplainer/><OpenLabProductExperience/><OpenLabRegistryArchive/><OpenLabMethodologyPipeline/><OpenLabSourceChain/><OpenLabComparison/><UnavailableEvidencePanel title="Source unavailable" copy="The original source is not registered; no substitute result is shown."/><AnalyteTable/><CustodyTimeline/></div>;
  return <div className={styles.gallery}><section data-review-role="checkout-primary-customer-specimen"><TransactionPresentation stage="review" /></section><CheckoutOwnerReviewMatrix /></div>;
}
