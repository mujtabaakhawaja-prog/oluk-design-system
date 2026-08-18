import { AssuranceRail } from "./design-system/assurance-rail";
import { CobaltDensityBoundary } from "./design-system/cobalt-divider";
import {
  ActionLink,
  Arrow,
  Breadcrumbs,
  PageHero,
  SectionHeading,
} from "./design-system/customer-route-primitives";
import { selectedEvidenceRecord } from "./design-system/evidence-record-fixtures";
import {
  EvidenceRecordExplainer,
  OpenLabComparison,
  OpenLabDossierComposition,
  OpenLabMethodologyPipeline,
  OpenLabRecordDetail,
  OpenLabRegistryArchive,
  OpenLabSourceChain,
  OpenLabUnavailableBoundary,
  OpenLabWayfinding,
} from "./design-system/openlab-sections";
import { PresentationState, type PresentationStateKind } from "./design-system/presentation-state";
import { ProductCommerceCard } from "./design-system/product-commerce-card";
import { ProductDossier } from "./design-system/product-dossier";
import { mk2866Fixture, rad140Fixture } from "./design-system/product-fixtures";
import { ProductMediaChamber } from "./design-system/product-media-chamber";
import { MobileDecisionSummary, ProductDetailDisclosure, ProductEvidenceSnapshot } from "./design-system/pdp-sections";
import { LockedHomeHero } from "./design-system/locked-home-hero";
import { OpenLabHeroLight } from "./design-system/openlab-hero-light";
import { PdpFirstFold } from "./design-system/pdp-first-fold";
import { EvidenceStatus } from "./design-system/product-status";
import { RelatedRail } from "./design-system/related-rail";
import { UpsellContextRail } from "./design-system/program-components";
import { SHOP_FAMILY_OPTIONS } from "./design-system/shop-taxonomy";
import styles from "./customer-routes.module.css";
import type { SitesDiscoveryModel } from "./runtime-adapters/sites-discovery-server";

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
            Read every review alongside the product details and available OpenLab record before you decide.
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
          <p>Review MK-2866 product identity, specifications, availability and its direct connection to OpenLab.</p>
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
          <p>Product specifications remain clear even when a report is unavailable.</p>
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

export function HomeRoute({ models = [] }: Readonly<{ models?: readonly SitesDiscoveryModel[] }>) {
  return (
    <>
      <LockedHomeHero models={models} />
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
      <PdpFirstFold product={mk2866Fixture}/>
      <section className="section pdp-assurance" id="pdp-assurance">
        <div className="shell"><AssuranceRail variant="compact" /></div>
      </section>
      <ProductDetailDisclosure product={mk2866Fixture}/>
      <ProductDossier evidenceHref="#lab-records" id="dossier" product={mk2866Fixture} />
      <ProductEvidenceSnapshot product={mk2866Fixture}/>
      <section className="section" id="product-continuation"><div className="shell"><UpsellContextRail /></div></section>
      <RelatedRail
        anchorProduct={mk2866Fixture}
        id="related-products"
        products={[rad140Fixture]}
      />
      <MobileDecisionSummary product={mk2866Fixture}/>
    </>
  );
}

export function OpenLabRoute() {
  return (
    <>
      <OpenLabHeroLight />
      <div className="shell"><CobaltDensityBoundary /></div>
      <OpenLabWayfinding />
      <EvidenceRecordExplainer />
      <EvidenceArchiveEntry id="embedded-evidence" />
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
      <PageHero
        actions={<ActionLink href="/open-lab/methodology" secondary>Testing methodology</ActionLink>}
        copy="Search product and record references while unavailable details remain clear."
        eyebrow="OPENLAB ARCHIVE"
        title="Every product. Its available record path."
      />
      <OpenLabRegistryArchive />
    </>
  );
}

export function RecordRoute() {
  const record = selectedEvidenceRecord;

  return (
    <>
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
      <OpenLabRecordDetail record={record} />
    </>
  );
}

export function DossierRoute() {
  return (
    <>
      <PageHero
        copy="Product facts, label detail and the current OpenLab evidence pathway in one continuous view."
        eyebrow="PRODUCT DOSSIER"
        title="MK-2866 product dossier."
      />
      <OpenLabDossierComposition />
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
      <PageHero
        copy="A customer-readable guide to identity, purity, concentration and source context—without implying a result."
        eyebrow="TESTING METHODOLOGY"
        title="How finished-product records are read."
      />
      <OpenLabMethodologyPipeline />
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
      <PageHero
        copy="Follow the information relationship while leaving absent record values visibly unavailable."
        eyebrow="SOURCE CHAIN"
        title="From finished product to original report."
      />
      <OpenLabSourceChain />
      <OpenLabUnavailableBoundary><ActionLink href="/open-lab/records">Return to the record index</ActionLink></OpenLabUnavailableBoundary>
    </>
  );
}

export function CompareRoute() {
  return (
    <>
      <PageHero
        copy="Review label facts and record availability in a keyboard-accessible table."
        eyebrow="COMPARE RECORDS"
        title="Compare finished-product evidence paths."
      />
      <OpenLabComparison />
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
        title="See what stands behind every product."
      />
      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="THE EVIDENCE MODEL" title="Five connected layers." />
        </div>
      </section>
      <OpenLabSourceChain />
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
            ["02", "Evidence connected.", "OpenLab keeps the available record one direct step away from the product."],
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
