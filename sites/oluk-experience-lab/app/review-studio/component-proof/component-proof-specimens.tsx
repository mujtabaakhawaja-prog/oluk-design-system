import { ActionButton, ActionLink } from "../../design-system/action-control";
import { DecisionSurface, EditorialSurface, TechnicalSurface } from "../../design-system/content-surfaces";
import { MetricRail } from "../../design-system/metric-rail";
import { PdpFirstFold } from "../../design-system/pdp-first-fold";
import { ProductCommerceCard } from "../../design-system/product-commerce-card";
import { mk2866Fixture, rad140Fixture } from "../../design-system/product-fixtures";
import { ProductMediaChamber } from "../../design-system/product-media-chamber";
import { PurchasePanel } from "../../design-system/purchase-panel";
import { ReviewStudioGallery } from "../../design-system/review-studio-gallery";
import type { ComponentProofFamilyId } from "./component-proof-contract";
import styles from "./component-proof.module.css";

function SpecimenHeader({ eyebrow, title }: Readonly<{ eyebrow: string; title: string }>) {
  return (
    <header className={styles.specimenHeader}>
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>Deterministic owner-review fixture. Human visual acceptance remains pending.</p>
    </header>
  );
}
function FoundationsAndPrimitives() {
  return (
    <>
      <SpecimenHeader eyebrow="FOUNDATIONS + PRIMITIVES" title="Material roles before route composition." />
      <section className={styles.tokenGrid} aria-label="Foundation token specimens">
        {[
          ["Canvas", "var(--oluk-canvas)"],
          ["Surface", "var(--oluk-surface-card)"],
          ["Media", "var(--oluk-surface-media)"],
          ["Cobalt", "var(--oluk-cobalt)"],
        ].map(([label, value]) => (
          <div key={label} style={{ "--proof-swatch": value } as React.CSSProperties}>
            <span aria-hidden="true" />
            <strong>{label}</strong>
            <code>{value}</code>
          </div>
        ))}
      </section>
      <section className={styles.typeScale} aria-label="Typography roles">
        <span>EYEBROW / SYSTEM ROLE</span>
        <h2>Display typography preserves focal hierarchy.</h2>
        <p>Body typography remains readable, contained, and able to wrap under long customer copy.</p>
      </section>
      <section className={styles.surfaceGrid} aria-label="Contained surface roles">
        <EditorialSurface eyebrow="Editorial" title="Narrative surface" copy="Customer-facing story remains independent of live commerce availability." />
        <DecisionSurface eyebrow="Decision" title="Decision surface" copy="Comparable facts and the next explicit action remain close together." />
        <TechnicalSurface eyebrow="Evidence" title="Technical surface" copy="Evidence presentation stays exact about the source state it has." />
      </section>
      <section className={styles.actionRow} aria-label="Action control specimens">
        <ActionButton>Primary action</ActionButton>
        <ActionButton variant="secondary">Secondary action</ActionButton>
        <ActionButton disabled>Unavailable action</ActionButton>
        <ActionLink href="/review-studio/component-proof">Quiet route action</ActionLink>
      </section>
    </>
  );
}

function CommerceCards() {
  return (
    <>
      <SpecimenHeader eyebrow="COMMERCE CARD FAMILY" title="One product grammar across four sanctioned variants." />
      <section className={styles.cardGrid} aria-label="ProductCommerceCard variants">
        <ProductCommerceCard product={mk2866Fixture} variant="compact" />
        <ProductCommerceCard product={rad140Fixture} variant="vertical" />
        <ProductCommerceCard product={mk2866Fixture} variant="featured" />
        <ProductCommerceCard product={rad140Fixture} variant="relation" />
      </section>
    </>
  );
}

function MetricRailSpecimens() {
  return (
    <>
      <SpecimenHeader eyebrow="METRIC RAIL" title="Three equal cells, two-row value and label grammar." />
      <section className={styles.metricStack} aria-label="MetricRail states">
        <article className={styles.metricSpecimen} data-state="default">
          <h2>Default</h2>
          <MetricRail product={mk2866Fixture} />
        </article>
        <article className={styles.metricSpecimen} data-state="compact">
          <h2>Compact</h2>
          <MetricRail compact product={rad140Fixture} />
        </article>
        <article className={styles.metricSpecimen} data-state="unavailable">
          <h2>Unavailable</h2>
          <MetricRail values={{ strength: null, servings: null, purity: null }} />
        </article>
      </section>
    </>
  );
}

function PurchasePanelSpecimens() {
  return (
    <>
      <SpecimenHeader eyebrow="PURCHASE PANEL" title="Purchase configuration stays outside product metrics." />
      <section className={styles.purchaseGrid} aria-label="PurchasePanel states">
        <PurchasePanel bottleOptions product={mk2866Fixture} />
        <PurchasePanel bottleOptions product={mk2866Fixture} state="quantity-changed" />
        <PurchasePanel product={mk2866Fixture} state="unavailable" />
      </section>
    </>
  );
}

function BoundedMediaChambers() {
  return (
    <>
      <SpecimenHeader eyebrow="BOUNDED MEDIA CHAMBER" title="Cards and dossiers use contained media—not the PDP atmosphere." />
      <section className={styles.mediaGrid} aria-label="Bounded media contexts">
        {(["card", "featured", "relation", "dossier"] as const).map((context) => (
          <article key={context}>
            <h2>{context}</h2>
            <ProductMediaChamber context={context} media={mk2866Fixture.media} />
          </article>
        ))}
      </section>
    </>
  );
}

export function ComponentProofSpecimen({ familyId }: Readonly<{ familyId: ComponentProofFamilyId }>) {
  if (familyId === "foundations-primitives") return <main className={styles.specimen} data-owner-only="true" id="main-content"><FoundationsAndPrimitives /></main>;
  if (familyId === "commerce-cards") return <main className={styles.specimen} data-owner-only="true" id="main-content"><CommerceCards /></main>;
  if (familyId === "metric-rail") return <main className={styles.specimen} data-owner-only="true" id="main-content"><MetricRailSpecimens /></main>;
  if (familyId === "purchase-panel") return <main className={styles.specimen} data-owner-only="true" id="main-content"><PurchasePanelSpecimens /></main>;
  if (familyId === "bounded-media-chamber") return <main className={styles.specimen} data-owner-only="true" id="main-content"><BoundedMediaChambers /></main>;
  if (familyId === "pdp-first-fold") return <main className={styles.pdpSpecimen} data-owner-only="true" id="main-content"><PdpFirstFold product={mk2866Fixture} /></main>;
  if (familyId === "openlab") return <main className={styles.specimen} data-owner-only="true" id="main-content"><SpecimenHeader eyebrow="OPENLAB" title="Evidence and record presentation states." /><ReviewStudioGallery groupId="evidence-openlab" /></main>;
  return <main className={styles.specimen} data-owner-only="true" id="main-content"><SpecimenHeader eyebrow="CHECKOUT" title="Lifecycle presentation without order or payment mutation." /><ReviewStudioGallery groupId="checkout-lifecycle" /></main>;
}
