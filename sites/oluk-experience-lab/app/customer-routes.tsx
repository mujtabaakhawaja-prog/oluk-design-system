/* eslint-disable @next/next/no-img-element -- the PDP exception uses an authored transparent product render. */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- the horizontal comparison scroller must remain keyboard reachable. */

import { AssuranceRail } from "./design-system/assurance-rail";
import { CobaltDensityBoundary } from "./design-system/cobalt-divider";
import {
  ActionLink,
  Arrow,
  Breadcrumbs,
  Chevron,
  OpenLabNav,
  PageHero,
  SectionHeading,
} from "./design-system/customer-route-primitives";
import { selectedEvidenceRecord } from "./design-system/evidence-record-fixtures";
import { PresentationState, type PresentationStateKind } from "./design-system/presentation-state";
import { ProductCommerceCard } from "./design-system/product-commerce-card";
import { ProductDecisionHero } from "./design-system/product-decision-hero";
import { ProductDossier } from "./design-system/product-dossier";
import { mk2866Fixture, rad140Fixture } from "./design-system/product-fixtures";
import { ProductMediaChamber } from "./design-system/product-media-chamber";
import { EvidenceStatus } from "./design-system/product-status";
import { PurchasePanel } from "./design-system/purchase-panel";
import { RelatedRail } from "./design-system/related-rail";
import { SHOP_FAMILY_OPTIONS } from "./design-system/shop-taxonomy";
import styles from "./customer-routes.module.css";

const openLabEntries = [
  { index: "01", title: "Lab Records", copy: "Browse the record index.", href: "/open-lab/records" },
  { index: "02", title: "Batch Lookup", copy: "Check a product or batch reference.", href: "/open-lab/batch-lookup" },
  { index: "03", title: "Methodology", copy: "Understand the evidence vocabulary.", href: "/open-lab/methodology" },
  { index: "04", title: "Source Chain", copy: "Follow product identity toward a report.", href: "/open-lab/source-chain" },
  { index: "05", title: "Compare", copy: "Compare product facts and record availability.", href: "/open-lab/compare" },
  { index: "06", title: "EvidenceOS", copy: "See how the evidence pathway fits together.", href: "/about/evidence-os" },
] as const;

const methodologyEntries = [
  { index: "01", title: "Identity", copy: "Links the named product and compound to the evidence record." },
  { index: "02", title: "Purity", copy: "Reports an analytical result only when it is supplied by the available record." },
  { index: "03", title: "Concentration", copy: "Keeps measured concentration separate from the product label value." },
  { index: "04", title: "Source custody", copy: "Preserves the route from product and batch context to the original document." },
] as const;

const sourceChainEntries = [
  { index: "01", title: "Product", copy: "Label identity and product specifications" },
  { index: "02", title: "Batch", copy: "The finished production reference, when supplied" },
  { index: "03", title: "Laboratory", copy: "The named analytical source on an available report" },
  { index: "04", title: "Report", copy: "The original document and its stated result" },
  { index: "05", title: "OpenLab", copy: "The customer-facing route to available records" },
] as const;

function ReviewsSection({ full = false }: Readonly<{ full?: boolean }>) {
  return (
    <section className="section reviews-section" data-live-authority="false" id="reviews">
      <div className="shell">
        <SectionHeading
          action={full ? undefined : <a href="/reviews">Read all reviews <Arrow /></a>}
          copy="Customer review content will appear here only when a source-owned review projection is connected."
          eyebrow="CUSTOMER REVIEWS"
          title="A clear home for customer feedback."
        />
        <div className="review-grid">
          <article className="review-card">
            <span className="eyebrow">REVIEWS UNAVAILABLE</span>
            <h3>No customer reviews are available yet.</h3>
            <p>Product facts and OpenLab availability remain accessible without inventing customer names, dates or purchase claims.</p>
            <a href="/product/mk-2866">View MK-2866 <Arrow /></a>
          </article>
        </div>
        {full ? (
          <p className={styles.reviewScope}>
            This presentation does not claim live review authority. Product and evidence details remain available through their own routes.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function AssuranceSection() {
  return (
    <section className="section" id="assurance">
      <div className="shell assurance-section">
        <SectionHeading
          action={<a href="/open-lab/methodology">How records are presented <Arrow /></a>}
          copy="A consistent vocabulary connects product identity with the available evidence pathway."
          eyebrow="THE OLYMPUS STANDARD"
          title="Six points of assurance."
        />
        <AssuranceRail />
      </div>
    </section>
  );
}

function FamilyDiscovery() {
  return (
    <section className="section" id="compound-families">
      <div className="shell family-layout">
        <div className="family-editorial">
          <span className="eyebrow">PRODUCT FAMILIES</span>
          <h2>Find the right starting point.</h2>
          <p>Browse the catalogue by its current family taxonomy, then combine goal, form, servings and availability filters.</p>
          <a href="/shop">Open the catalogue <Arrow /></a>
        </div>
        <div className="family-grid">
          {SHOP_FAMILY_OPTIONS.map((family, index) => (
            <a href={`/shop?family=${family.slug}`} key={family.slug}>
              <span className="family-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{family.label}</h3>
              <p>Open this family, then refine it with the independent catalogue filters.</p>
              <div>
                <span>PRODUCT FAMILY</span>
                <strong>Explore <Arrow /></strong>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProduct() {
  return (
    <section className="section section-blue-wash" id="featured-products">
      <div className={`shell ${styles.commerceFocus}`}>
        <div className={styles.commerceEditorial}>
          <span className="eyebrow">PRODUCT FOCUS</span>
          <h2>Label truth stays close to the decision.</h2>
          <p>Review MK-2866 product identity, specifications, availability and the OpenLab pathway from one shared commerce component.</p>
          <a href="/product/mk-2866">View MK-2866 <Arrow /></a>
        </div>
        <div className={styles.singleCard}>
          <ProductCommerceCard product={mk2866Fixture} variant="featured" />
        </div>
      </div>
    </section>
  );
}

function EvidenceArchiveEntry({ id = "openlab-records" }: Readonly<{ id?: string }>) {
  return (
    <section className="section evidence-archive-section" id={id}>
      <div className="shell evidence-archive-grid">
        <article className="archive-search-card">
          <span className="eyebrow">OPENLAB ARCHIVE</span>
          <h2>Find an available record.</h2>
          <p>Start with the archive or use batch lookup to understand each possible result.</p>
          <div className="button-row">
            <ActionLink href="/open-lab/records">Browse records</ActionLink>
            <ActionLink href="/open-lab/batch-lookup" secondary>Batch lookup</ActionLink>
          </div>
        </article>
        <article className="archive-summary-card">
          <span className="eyebrow">PRODUCT TO EVIDENCE</span>
          <h2>Facts first. Records when available.</h2>
          <p>The route keeps product specifications readable without turning an unavailable report into an analytical claim.</p>
          <div className="summary-metrics">
            <div><strong>01</strong><span>PRODUCT</span></div>
            <div><strong>02</strong><span>BATCH</span></div>
            <div><strong>03</strong><span>REPORT</span></div>
          </div>
          <a href="/open-lab/source-chain">Follow the source chain <Arrow /></a>
        </article>
      </div>
    </section>
  );
}

function RecordAvailabilitySection({ id = "lab-records" }: Readonly<{ id?: string }>) {
  return (
    <section className="section section-blue-wash lab-records-section" id={id}>
      <div className="shell">
        <SectionHeading
          action={<a href="/open-lab/records">View the record index <Arrow /></a>}
          copy="No analytical result is filled in until an available record provides that detail."
          eyebrow="OPENLAB RECORDS"
          title="The MK-2866 evidence pathway."
        />
        <PresentationState
          action={
            <>
              <ActionLink href="/open-lab/records">Browse records</ActionLink>
              <ActionLink href="/open-lab/methodology" secondary>Read methodology</ActionLink>
            </>
          }
          className={styles.stateSurface}
          state="unavailable"
        />
      </div>
    </section>
  );
}

export function HomeRoute() {
  return (
    <>
      <section className={styles.heroWrap} id="hero">
        <div className="shell">
          <ProductDecisionHero
            actions={
              <>
                <ActionLink href="/shop">Shop the range</ActionLink>
                <ActionLink href="/open-lab/records" secondary>View Lab Records</ActionLink>
              </>
            }
            copy="Strength, servings and fulfilment details remain clear before checkout. OpenLab records appear only when available."
            eyebrow="FORMULATED. CLEARLY SPECIFIED. EVIDENCE-AWARE."
            title="Formulated to a higher standard."
          />
        </div>
      </section>
      <div className="shell"><CobaltDensityBoundary /></div>
      <AssuranceSection />
      <FamilyDiscovery />
      <FeaturedProduct />
      <EvidenceArchiveEntry />
      <ReviewsSection />
      <RelatedRail
        anchorProduct={mk2866Fixture}
        id="related-products"
        products={[rad140Fixture]}
      />
    </>
  );
}

export function ProductRoute() {
  return (
    <>
      <section className="pdp-first-fold" id="purchase">
        <div className={`shell ${styles.pdpBreadcrumb}`}>
          <Breadcrumbs
            items={[
              { label: "Shop", href: "/shop" },
              { label: "SARMs", href: "/shop?family=sarms" },
              { label: "MK-2866" },
            ]}
          />
        </div>
        <div className="shell pdp-grid">
          <div className="pdp-media">
            <div className="pdp-media-stage">
              <span className="media-tag">FINISHED PRODUCT</span>
              <span className="media-batch">SKU {mk2866Fixture.sku}</span>
              <div aria-hidden="true" className="media-contact-shelf" />
              <img
                alt={`${mk2866Fixture.name} ${mk2866Fixture.alias} bottle`}
                decoding="async"
                fetchPriority="high"
                height={mk2866Fixture.media.height}
                loading="eager"
                sizes="(max-width: 960px) calc(100vw - 44px), 50vw"
                src={mk2866Fixture.media.src}
                width={mk2866Fixture.media.width}
              />
            </div>
            <div aria-label="Available product image" className="media-controls">
              <span aria-current="true">Front</span>
            </div>
          </div>
          <PurchasePanel headingLevel="h1" product={mk2866Fixture} />
        </div>
      </section>
      <section className="section pdp-assurance" id="pdp-assurance">
        <div className="shell"><AssuranceRail variant="compact" /></div>
      </section>
      <ProductDossier evidenceHref="#lab-records" id="dossier" product={mk2866Fixture} />
      <RecordAvailabilitySection />
      <RelatedRail
        anchorProduct={mk2866Fixture}
        id="related-products"
        products={[rad140Fixture]}
      />
    </>
  );
}

export function OpenLabRoute() {
  return (
    <>
      <OpenLabNav active="openlab" />
      <section className="openlab-portal-hero">
        <div className="shell openlab-portal-grid">
          <div className="openlab-intro">
            <span className="eyebrow">OPENLAB</span>
            <h1>Independent evidence, connected to every product.</h1>
            <p>Move from product facts toward available records, methodology and source context without losing the commerce relationship.</p>
            <div aria-label="OpenLab experience lenses" className={styles.staticIndex} role="list">
              <span role="listitem">Technical</span>
              <span role="listitem">Product evidence</span>
              <span role="listitem">Commerce</span>
            </div>
            <div className="button-row">
              <ActionLink href="/open-lab/records">Browse Lab Records</ActionLink>
              <ActionLink href="/open-lab/methodology" secondary>How records are presented</ActionLink>
            </div>
          </div>
          <ProductCommerceCard
            className={styles.singleCard}
            headingLevel="h2"
            product={mk2866Fixture}
            showQualitative={false}
            variant="vertical"
          />
        </div>
      </section>
      <div className="shell"><CobaltDensityBoundary /></div>
      <section className="section">
        <div className="shell">
          <SectionHeading
            copy="One consistent vocabulary supports product, methodology and record pages."
            eyebrow="SIX-POINT ASSURANCE"
            title="What an evidence path is built to show."
          />
          <AssuranceRail />
        </div>
      </section>
      <EvidenceArchiveEntry id="embedded-evidence" />
      <section className="section section-blue-wash">
        <div className="shell portal-route-grid">
          {openLabEntries.map((entry) => (
            <a href={entry.href} key={entry.title}>
              <span>{entry.index}</span>
              <h3>{entry.title}</h3>
              <p>{entry.copy}</p>
              <Arrow />
            </a>
          ))}
        </div>
      </section>
      <RelatedRail
        anchorProduct={mk2866Fixture}
        eyebrow="COMMERCE CONNECTION"
        id="openlab-commerce-bridge"
        products={[rad140Fixture]}
        title="Return to the product range."
      />
    </>
  );
}

export function RecordsRoute() {
  return (
    <>
      <OpenLabNav active="records" />
      <PageHero
        actions={<ActionLink href="/open-lab/methodology" secondary>Testing methodology</ActionLink>}
        copy="Search product and record references while unavailable details remain clear."
        eyebrow="OPENLAB ARCHIVE"
        title="Every product. Its available record path."
      />
      <section className="section">
        <div className={`shell ${styles.archiveLayout}`}>
          <aside className={styles.searchPanel}>
            <span className="eyebrow">SEARCH RECORDS</span>
            <label htmlFor="record-search">Product or record reference</label>
            <input id="record-search" placeholder="e.g. MK-2866" type="search" />
            <button className="button" disabled type="button">Search records</button>
            <a href="/open-lab/batch-lookup">Have a batch number? <Arrow /></a>
          </aside>
          <div className={styles.recordIndex}>
            <article className={styles.recordRow} data-live-authority="false">
              <div>
                <span className="eyebrow">PRODUCT RECORD PATH</span>
                <h2>{mk2866Fixture.name}</h2>
              </div>
              <dl><dt>Product</dt><dd>{mk2866Fixture.alias}</dd></dl>
              <dl><dt>Record</dt><dd>Unavailable</dd></dl>
              <dl><dt>Status</dt><dd><EvidenceStatus state="unavailable" /></dd></dl>
              <a href={selectedEvidenceRecord.customerPath}>Open state <Arrow /></a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export function RecordRoute() {
  const record = selectedEvidenceRecord;

  return (
    <>
      <OpenLabNav active="records" />
      <section className="record-hero">
        <div className="shell">
          <Breadcrumbs
            items={[
              { label: "OpenLab", href: "/open-lab" },
              { label: "Records", href: "/open-lab/records" },
              { label: "MK-2866 record" },
            ]}
          />
          <div className="record-hero-grid">
            <div>
              <span className="eyebrow">EVIDENCE RECORD</span>
              <h1>{record.title}</h1>
              <p>Record details remain unavailable until an original record supplies an ID, date, method and analytical result.</p>
              <div className="record-state"><EvidenceStatus state="unavailable" /></div>
            </div>
            <ProductMediaChamber
              className={styles.recordHeroMedia}
              context="dossier"
              media={record.product.media}
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className={`shell ${styles.recordContent}`}>
          <div>
            <PresentationState
              action={
                <>
                  <ActionLink href="/open-lab/records">Return to records</ActionLink>
                  <ActionLink href="/open-lab/source-chain" secondary>View source chain</ActionLink>
                </>
              }
              className={styles.stateSurface}
              state="unavailable"
            />
            <article className={styles.recordFacts}>
              <span className="eyebrow">CURRENT DETAIL</span>
              <dl>
                <div><dt>Product</dt><dd>{record.product.name}</dd></div>
                <div><dt>SKU</dt><dd>{record.product.sku}</dd></div>
                <div><dt>Published</dt><dd>Unavailable</dd></div>
                <div><dt>Result</dt><dd>Unavailable</dd></div>
              </dl>
            </article>
          </div>
          <aside className={styles.productBridge}>
            <span className="eyebrow">CONNECTED PRODUCT</span>
            <h2>{record.product.name}</h2>
            <p>{record.product.alias} · {record.product.strength} · {record.product.servings} · {record.product.purity}</p>
            <a href={record.product.customerPath}>View product · {record.product.price} <Arrow /></a>
            <a href="/open-lab/dossier/mk-2866">Open product dossier <Arrow /></a>
          </aside>
        </div>
      </section>
    </>
  );
}

export function DossierRoute() {
  return (
    <>
      <OpenLabNav active="openlab" />
      <PageHero
        copy="Product facts, label detail and the current OpenLab evidence pathway in one continuous view."
        eyebrow="PRODUCT DOSSIER"
        title="MK-2866 product dossier."
      />
      <ProductDossier
        evidenceHref="#dossier-record-state"
        id="dossier"
        product={mk2866Fixture}
      />
      <RecordAvailabilitySection id="dossier-record-state" />
      <section className={`section ${styles.sectionTight}`}>
        <div className="shell">
          <ProductCommerceCard
            contextKicker="RETURN TO COMMERCE"
            product={mk2866Fixture}
            secondaryHref={mk2866Fixture.customerPath}
            secondaryLabel="Return to MK-2866"
            showQualitative={false}
            variant="relation"
          />
        </div>
      </section>
    </>
  );
}

function lookupStateFromReference(reference: string): PresentationStateKind {
  const normalized = reference.trim().toLowerCase();
  if (!normalized) return "empty";
  if (normalized === "mk-2866" || normalized === "80529-01") return "found";
  if (normalized === "no-match") return "no-result";
  if (normalized === "ol-mk2866-pending") return "unavailable";
  return "entered";
}

export function LookupRoute({ reference = "" }: Readonly<{ reference?: string }>) {
  const state = lookupStateFromReference(reference);

  return (
    <>
      <OpenLabNav active="lookup" />
      <PageHero
        copy="Use the examples below to see empty, entered, found, no-result and unavailable outcomes."
        eyebrow="BATCH LOOKUP"
        title="Find a batch record."
      />
      <section className="section">
        <div className="shell lookup-layout">
          <article className="lookup-card">
            <span className="eyebrow">SEARCH OPENLAB</span>
            <h2>Batch or record number</h2>
            <form action="/open-lab/batch-lookup" className="lookup-input" method="get">
              <label className="sr-only" htmlFor="record-reference">Batch or record number</label>
              <input
                aria-describedby="lookup-help"
                aria-errormessage={state === "no-result" ? "lookup-state" : undefined}
                aria-invalid={state === "no-result" ? true : undefined}
                defaultValue={reference}
                id="record-reference"
                name="reference"
                placeholder="Enter a product or record reference"
                type="search"
              />
              <button type="submit">Show state <Arrow /></button>
            </form>
            <p id="lookup-help">Try MK-2866, OL-MK2866-PENDING or NO-MATCH to see the possible outcomes.</p>
            <div className={styles.lookupResult}>
              <PresentationState
                action={
                  state === "found" ? (
                    <ActionLink href="/open-lab/dossier/mk-2866">Open product dossier</ActionLink>
                  ) : (
                    <ActionLink href="/open-lab/records">Browse records</ActionLink>
                  )
                }
                className={styles.stateSurface}
                headingLevel="h3"
                id="lookup-state"
                state={state}
              />
              {state === "found" ? (
                <div className={styles.lookupProduct}>
                  <ProductCommerceCard
                    evidence="unavailable"
                    product={mk2866Fixture}
                    showQualitative={false}
                    variant="compact"
                  />
                </div>
              ) : null}
            </div>
          </article>
          <aside className="lookup-guide">
            <span>01</span><h3>Find the reference</h3><p>Locate the product, batch or record reference.</p>
            <span>02</span><h3>Check the index</h3><p>Enter the complete reference exactly as it appears.</p>
            <span>03</span><h3>Follow availability</h3><p>Open a record only when its evidence detail is available.</p>
          </aside>
        </div>
      </section>
    </>
  );
}

export function MethodologyRoute() {
  return (
    <>
      <OpenLabNav active="methodology" />
      <PageHero
        copy="A customer-readable guide to identity, purity, concentration and source context—without implying a result."
        eyebrow="TESTING METHODOLOGY"
        title="How finished-product records are read."
      />
      <section className="section">
        <div className="shell methodology-grid">
          {methodologyEntries.map((entry) => (
            <article key={entry.title}>
              <span>{entry.index}</span>
              <h2>{entry.title}</h2>
              <p>{entry.copy}</p>
              <a href="/open-lab/records">View record states <Arrow /></a>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-blue-wash">
        <div className="shell">
          <SectionHeading eyebrow="ASSURANCE RAIL" title="One shared evidence vocabulary." />
          <AssuranceRail />
        </div>
      </section>
    </>
  );
}

export function SourceChainRoute() {
  return (
    <>
      <OpenLabNav active="source-chain" />
      <PageHero
        copy="Follow the information relationship while leaving absent record values visibly unavailable."
        eyebrow="SOURCE CHAIN"
        title="From finished product to original report."
      />
      <section className="section">
        <div className="shell source-chain">
          {sourceChainEntries.map((entry) => (
            <article key={entry.title}>
              <span>{entry.index}</span>
              <div><h2>{entry.title}</h2><p>{entry.copy}</p></div>
              <Chevron />
            </article>
          ))}
        </div>
      </section>
      <section className={`section ${styles.sectionTight}`}>
        <div className="shell">
          <PresentationState
            action={<ActionLink href="/open-lab/records">Return to the record index</ActionLink>}
            className={styles.stateSurface}
            copy="Batch, laboratory, document and result details remain unavailable until supplied by a record."
            state="unavailable"
          />
        </div>
      </section>
    </>
  );
}

export function CompareRoute() {
  return (
    <>
      <OpenLabNav active="compare" />
      <PageHero
        copy="Review label facts and record availability in a keyboard-accessible table."
        eyebrow="COMPARE RECORDS"
        title="Compare finished-product evidence paths."
      />
      <section className="section">
        <div className={`shell ${styles.compareTool}`}>
          <span className="eyebrow">COMPARISON TOOL</span>
          <div
            aria-label="Scrollable product comparison"
            className={styles.compareTableWrap}
            role="region"
            tabIndex={0}
          >
            <table className={styles.compareTable}>
              <caption className="sr-only">Product facts and evidence availability comparison</caption>
              <thead>
                <tr><th scope="col">Field</th><th scope="col">MK-2866</th><th scope="col">RAD-140</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Series</th><td>{mk2866Fixture.series}</td><td>{rad140Fixture.series}</td></tr>
                <tr><th scope="row">Strength</th><td>{mk2866Fixture.strength}</td><td>{rad140Fixture.strength}</td></tr>
                <tr><th scope="row">Servings</th><td>{mk2866Fixture.servings}</td><td>{rad140Fixture.servings}</td></tr>
                <tr><th scope="row">Label purity</th><td>{mk2866Fixture.purity}</td><td>{rad140Fixture.purity}</td></tr>
                <tr><th scope="row">Evidence detail</th><td>Unavailable</td><td>Unavailable</td></tr>
                <tr><th scope="row">Product path</th><td><a href="/product/mk-2866">View product</a></td><td><a href="/shop?family=sarms">View family</a></td></tr>
              </tbody>
            </table>
          </div>
          <details>
            <summary>What this comparison does not claim</summary>
            <p>Unavailable analytical fields remain unavailable. Label purity is a product specification, not a measured record result.</p>
          </details>
        </div>
      </section>
    </>
  );
}

export function EvidenceOsRoute() {
  return (
    <>
      <PageHero
        actions={
          <>
            <ActionLink href="/open-lab">Enter OpenLab</ActionLink>
            <ActionLink href="/open-lab/methodology" secondary>Read methodology</ActionLink>
          </>
        }
        copy="A customer pathway that keeps product identity, source context and available records connected."
        eyebrow="EVIDENCEOS"
        title="A clearer path from product to proof."
      />
      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="THE EVIDENCE MODEL" title="Five connected layers." />
          <div className="source-chain">
            {sourceChainEntries.map((entry) => (
              <article key={entry.title}>
                <span>{entry.index}</span>
                <div><h2>{entry.title}</h2><p>{entry.copy}</p></div>
                <Chevron />
              </article>
            ))}
          </div>
        </div>
      </section>
      <AssuranceSection />
      <EvidenceArchiveEntry id="evidence-os-records" />
    </>
  );
}

export function AboutRoute() {
  return (
    <>
      <PageHero
        actions={
          <>
            <ActionLink href="/shop">Browse products</ActionLink>
            <ActionLink href="/open-lab" secondary>Explore OpenLab</ActionLink>
          </>
        }
        copy="Clear product specifications, considered design and direct paths to available independent records."
        eyebrow="ABOUT OLYMPUS LABS UK"
        title="Quality, made visible."
      />
      <section className="section">
        <div className="shell about-grid">
          {[
            ["01", "Product first.", "Every detail begins with a clear product identity and readable specifications."],
            ["02", "Evidence connected.", "OpenLab keeps the available record path one direct route away from the product."],
            ["03", "Calm by design.", "Cool luminous surfaces and focused actions keep product decisions readable."],
            ["04", "Each area has a clear purpose.", "Shop, product, reviews and OpenLab each support a distinct decision."],
          ].map(([index, title, copy]) => (
            <article key={title}><span>{index}</span><h2>{title}</h2><p>{copy}</p></article>
          ))}
        </div>
      </section>
      <RelatedRail anchorProduct={mk2866Fixture} products={[rad140Fixture]} />
    </>
  );
}

export function ReviewsRoute() {
  return (
    <>
      <PageHero
        copy="Product, delivery and OpenLab feedback presented separately from product specifications and evidence records."
        eyebrow="CUSTOMER REVIEWS"
        title="Experiences shared by Olympus customers."
      />
      <ReviewsSection full />
      <section className={`section ${styles.sectionTight}`}>
        <div className="shell">
          <PresentationState
            action={<ActionLink href="/shop">Continue to the shop</ActionLink>}
            className={styles.stateSurface}
            copy="There are no additional customer review pages in this set."
            state="empty"
            title="You have reached the end of these reviews."
          />
        </div>
      </section>
    </>
  );
}
