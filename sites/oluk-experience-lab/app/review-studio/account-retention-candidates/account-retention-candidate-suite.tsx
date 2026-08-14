import { ActionLink } from "../../design-system/action-control";
import { DecisionSurface, EditorialSurface, TechnicalSurface } from "../../design-system/content-surfaces";
import { ProductCommerceCard } from "../../design-system/product-commerce-card";
import { mk2866Fixture, rad140Fixture, type ProductFixture } from "../../design-system/product-fixtures";
import { EvidenceStatusChip } from "../../design-system/program-components";
import { SectionIntroduction, SurfaceGrid, SurfaceGridZone } from "../../design-system/surface-grid";
import type { AccountRetentionCandidateId } from "./account-retention-candidate-manifest";
import styles from "./account-retention-candidate-suite.module.css";

type CandidateProps = Readonly<{
  candidateId: AccountRetentionCandidateId;
}>;

const accountFixture = {
  orderReference: "OL-10428",
  product: mk2866Fixture,
} as const;

function OrderReference({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <TechnicalSurface
      actions={<ActionLink href={`/account/orders/${accountFixture.orderReference}`}>Open order details</ActionLink>}
      compact={compact}
      copy="Keep the order reference, product and original amount together before choosing what to do next."
      eyebrow="Order reference"
      title={accountFixture.orderReference}
    >
      <dl className={styles.factList}>
        <div><dt>Product</dt><dd>{accountFixture.product.name}</dd></div>
        <div><dt>Format</dt><dd>{accountFixture.product.strength} · {accountFixture.product.servings}</dd></div>
        <div><dt>Product amount</dt><dd>{accountFixture.product.price}</dd></div>
      </dl>
    </TechnicalSurface>
  );
}

type AccountProductCardProps = Readonly<{
  product?: ProductFixture;
  contextKicker?: string;
  evidence?: "verified" | "unavailable";
}>;

function ResponsiveAccountProductCard({
  product = accountFixture.product,
  contextKicker = "ORDER PRODUCT",
  evidence = "verified",
}: AccountProductCardProps) {
  return (
    <div>
      <div className={styles.desktopProductCard}>
        <ProductCommerceCard
          commerceTreatment="selection"
          contextKicker={contextKicker}
          evidence={evidence}
          headingLevel="h2"
          product={product}
          variant="featured"
        />
      </div>
      <div className={styles.mobileProductCard}>
        <ProductCommerceCard
          commerceTreatment="selection"
          contextKicker={contextKicker}
          evidence={evidence}
          headingLevel="h2"
          product={product}
          variant="compact"
        />
      </div>
    </div>
  );
}

function OpenLabConfidence() {
  return (
    <TechnicalSurface
      actions={<ActionLink href={accountFixture.product.evidencePath}>Open the MK-2866 dossier</ActionLink>}
      compact
      copy="Open the available MK-2866 dossier whenever you want to revisit its product record and evidence."
      eyebrow="OpenLab confidence"
      title="Return to the product record."
    >
      <EvidenceStatusChip state="verified-evidence" />
    </TechnicalSurface>
  );
}

function SavedStacksUnavailable({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <TechnicalSurface
      actions={<ActionLink disabled href="/account/research-profile">Saved stacks unavailable</ActionLink>}
      compact={compact}
      copy="Saved stacks will appear after you save a completed product plan. Start a new stack now, then save it later when that account option becomes available."
      eyebrow="Saved stacks"
      state="unavailable"
      title="No saved stack is available yet."
    />
  );
}

function SmartRestockUnavailable({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <TechnicalSurface
      actions={<ActionLink disabled href="/account/subscriptions">Smart Restock unavailable</ActionLink>}
      compact={compact}
      copy="Restock timing appears after an eligible repeat-order schedule is confirmed. No restock schedule is currently available."
      eyebrow="Smart Restock"
      state="unavailable"
      title="Restock timing is not available."
    />
  );
}

function LoyaltyUnavailable({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <TechnicalSurface
      actions={<ActionLink disabled href="/account/loyalty">Rewards unavailable</ActionLink>}
      compact={compact}
      copy="Your points, tier and rewards will appear here when they are available."
      eyebrow="Loyalty"
      state="unavailable"
      title="Rewards information is not available."
    />
  );
}

function SubscriptionUnavailable({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <TechnicalSurface
      actions={<ActionLink disabled href="/account/subscriptions">Subscriptions unavailable</ActionLink>}
      compact={compact}
      copy="Subscription status and controls will appear here when they are available."
      eyebrow="Subscriptions"
      state="unavailable"
      title="No subscription information is available."
    />
  );
}

function AccountPathways() {
  return (
    <DecisionSurface
      actions={(
        <>
          <ActionLink href="/account/orders">View all orders</ActionLink>
          <ActionLink href="/shop" variant="secondary">Browse products</ActionLink>
          <ActionLink href="/faq-help-centre" variant="quiet">Get account help</ActionLink>
        </>
      )}
      compact
      copy="Move from the known order into the product range or customer support without losing the reference you started from."
      eyebrow="Account actions"
      title="Choose the next useful account path."
    />
  );
}

function RetentionAvailability() {
  return (
    <div className={styles.availabilityGrid}>
      <SavedStacksUnavailable compact />
      <SmartRestockUnavailable compact />
      <LoyaltyUnavailable compact />
    </div>
  );
}

function SupportClosure() {
  return (
    <DecisionSurface
      actions={(
        <>
          <ActionLink href="/faq-help-centre">Open the Help Centre</ActionLink>
          <ActionLink href="/contact" variant="secondary">Contact Olympus</ActionLink>
        </>
      )}
      copy="Start with the order when the question concerns a purchase, or move directly into product and OpenLab guidance when it does not."
      eyebrow="Need help?"
      title="Keep the right context attached to the question."
    />
  );
}

function DecisionSpineCandidate() {
  return (
    <SurfaceGrid>
      <SurfaceGridZone zone="full">
        <SectionIntroduction eyebrow="Your account" headingLevel="h1" title="Start with the action that brought you back." />
      </SurfaceGridZone>
      <SurfaceGridZone zone="lead">
        <DecisionSurface
          actions={(
            <>
              <ActionLink href={`/account/orders/${accountFixture.orderReference}`}>Open this order</ActionLink>
              <ActionLink href={accountFixture.product.customerPath} variant="secondary">Review MK-2866</ActionLink>
            </>
          )}
          copy="Open the available order first, or move directly to MK-2866 for product details, OpenLab confidence or customer support."
          eyebrow="Immediate account action"
          title="Return to the order or product you already know."
        />
      </SurfaceGridZone>
      <SurfaceGridZone zone="support"><OrderReference /></SurfaceGridZone>
      <SurfaceGridZone zone="lead"><ResponsiveAccountProductCard /></SurfaceGridZone>
      <SurfaceGridZone zone="support">
        <div className={styles.stack}><AccountPathways /><OpenLabConfidence /></div>
      </SurfaceGridZone>
      <SurfaceGridZone zone="full">
        <EditorialSurface
          copy="Saved stacks, Smart Restock and rewards stay easy to check, with a clear next step wherever account information is not yet available."
          eyebrow="Retention availability"
          title="See what is available before relying on it."
        >
          <RetentionAvailability />
        </EditorialSurface>
      </SurfaceGridZone>
      <SurfaceGridZone zone="full"><SupportClosure /></SurfaceGridZone>
    </SurfaceGrid>
  );
}

function ActivityHistoryCandidate() {
  return (
    <SurfaceGrid>
      <SurfaceGridZone zone="full">
        <SectionIntroduction eyebrow="Your account" headingLevel="h1" title="Let order history lead the next decision." />
      </SurfaceGridZone>
      <SurfaceGridZone zone="split-start">
        <EditorialSurface
          copy="Use the available order reference as the start of product history, confidence and the next useful action."
          eyebrow="Account activity"
          title="See what you chose before choosing what comes next."
        />
      </SurfaceGridZone>
      <SurfaceGridZone zone="split-end">
        <DecisionSurface
          actions={<ActionLink href={`/account/orders/${accountFixture.orderReference}`}>Review the order</ActionLink>}
          copy="Open the order details that are available now, then choose the next product or support action from confirmed information."
          eyebrow="Current reference"
          title={accountFixture.orderReference}
        />
      </SurfaceGridZone>
      <SurfaceGridZone zone="full">
        <TechnicalSurface
          actions={<ActionLink href="/account/orders">Open order history</ActionLink>}
          copy="The history stays attached to each order. More rows will appear when more order records are available."
          eyebrow="Order history"
          title="One available order reference."
        >
          <dl className={styles.historyLedger} aria-label="Available account order history">
            <div><dt>Reference</dt><dd>{accountFixture.orderReference}</dd></div>
            <div><dt>Product</dt><dd>{accountFixture.product.name}</dd></div>
            <div><dt>Format</dt><dd>{accountFixture.product.strength} · {accountFixture.product.servings}</dd></div>
            <div><dt>Product amount</dt><dd>{accountFixture.product.price}</dd></div>
          </dl>
        </TechnicalSurface>
      </SurfaceGridZone>
      <SurfaceGridZone zone="split-start"><ResponsiveAccountProductCard /></SurfaceGridZone>
      <SurfaceGridZone zone="split-end">
        <div className={styles.stack}><SavedStacksUnavailable /><OpenLabConfidence /></div>
      </SurfaceGridZone>
      <SurfaceGridZone zone="full"><AccountPathways /></SurfaceGridZone>
      <SurfaceGridZone zone="full"><SupportClosure /></SurfaceGridZone>
    </SurfaceGrid>
  );
}

function RetentionLabCandidate() {
  return (
    <SurfaceGrid>
      <SurfaceGridZone zone="full">
        <SectionIntroduction eyebrow="Your account" headingLevel="h1" title="Keep the next product decision within reach." />
      </SurfaceGridZone>
      <SurfaceGridZone zone="full">
        <div className={styles.retentionWorkspace}>
          <SavedStacksUnavailable />
          <div className={styles.retentionDecision}>
            <DecisionSurface
              actions={(
                <>
                  <ActionLink href={accountFixture.product.customerPath}>Review MK-2866</ActionLink>
                  <ActionLink href="/open-lab/stack-builder" variant="secondary">Build a stronger stack</ActionLink>
                </>
              )}
              copy="Start from MK-2866, then compare products or build a stronger stack. You can save the combination later when saved stacks become available."
              eyebrow="Known product"
              title="Build from product truth you already recognise."
            />
            <ProductCommerceCard
              commerceTreatment="selection"
              contextKicker="ORDER PRODUCT"
              evidence="verified"
              headingLevel="h2"
              product={accountFixture.product}
              variant="compact"
            />
          </div>
          <SmartRestockUnavailable />
        </div>
      </SurfaceGridZone>
      <SurfaceGridZone zone="full">
        <SectionIntroduction eyebrow="Product direction" title="Compare the next contribution before adding it." />
      </SurfaceGridZone>
      <SurfaceGridZone zone="split-start">
        <ResponsiveAccountProductCard
          contextKicker="COMPARE NEXT"
          evidence="unavailable"
          product={rad140Fixture}
        />
      </SurfaceGridZone>
      <SurfaceGridZone zone="split-end">
        <DecisionSurface
          actions={(
            <>
              <ActionLink href={rad140Fixture.customerPath}>Compare RAD-140</ActionLink>
              <ActionLink href="/compare" variant="secondary">Open product comparison</ActionLink>
            </>
          )}
          copy="Recommendations are not available yet. You can still compare RAD-140 as a strength-and-lean-mass product direction."
          eyebrow="Product comparison"
          title="Compare another product direction."
        />
      </SurfaceGridZone>
      <SurfaceGridZone zone="split-start"><LoyaltyUnavailable /></SurfaceGridZone>
      <SurfaceGridZone zone="split-end"><SubscriptionUnavailable /></SurfaceGridZone>
      <SurfaceGridZone zone="full">
        <DecisionSurface
          actions={(
            <>
              <ActionLink href={`/account/orders/${accountFixture.orderReference}`}>Return to the order</ActionLink>
              <ActionLink href={accountFixture.product.evidencePath} variant="secondary">Open MK-2866 OpenLab</ActionLink>
            </>
          )}
          copy="Your order and MK-2866 are ready to revisit. Saved stacks, Smart Restock, subscriptions and rewards are not available yet."
          eyebrow="Order continuation"
          title="Return to what is available now."
        >
          <dl className={styles.factList}>
            <div><dt>Order reference</dt><dd>{accountFixture.orderReference}</dd></div>
            <div><dt>Product</dt><dd>{accountFixture.product.name}</dd></div>
            <div><dt>Product amount</dt><dd>{accountFixture.product.price}</dd></div>
          </dl>
        </DecisionSurface>
      </SurfaceGridZone>
    </SurfaceGrid>
  );
}

export function AccountRetentionCandidateSuite({ candidateId }: CandidateProps) {
  return (
    <main
      className={styles.page}
      data-candidate={candidateId}
      data-candidate-status="CANDIDATE_READY"
      data-owner-selected="false"
      id="main-content"
    >
      {candidateId === "decision-spine" ? <DecisionSpineCandidate /> : null}
      {candidateId === "activity-history" ? <ActivityHistoryCandidate /> : null}
      {candidateId === "retention-lab" ? <RetentionLabCandidate /> : null}
    </main>
  );
}
