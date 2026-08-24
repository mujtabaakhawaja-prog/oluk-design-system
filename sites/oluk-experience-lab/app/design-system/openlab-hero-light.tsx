import { DecisionSurface, EditorialSurface, TechnicalSurface } from "./content-surfaces";
import { ActionLink, Arrow } from "./customer-route-primitives";
import experience from "./openlab-product-depth.json";
import styles from "./openlab-hero-light.module.css";
import { ProductCommerceCard } from "./product-commerce-card";
import { mk2866Fixture } from "./product-fixtures";
import { EvidenceStatus } from "./product-status";

const categoryDestinations = [
  ["01", "SARMs", "Browse selective receptor modulators in the current catalogue.", "/shop?family=sarms"],
  ["02", "Prohormones", "Open the current prohormone product family.", "/shop?family=prohormones"],
  ["03", "Research Chemicals", "Explore research compounds by catalogue family.", "/shop?family=research-chemicals"],
  ["04", "Stacks", "Move into multi-product compositions and compare their roles.", "/shop?family=stacks"],
] as const;

const confidenceEntries = [
  ["01", "Find the record", "Start with a product, batch or report reference.", "/open-lab/records"],
  ["02", "Compare products", "Put product facts and record availability side by side.", "/open-lab/compare"],
  ["03", "Build a stronger stack", "Add products by the outcome each one contributes.", "/open-lab/stack-builder"],
  ["04", "Read the methodology", "Understand how labels, batches and reports stay distinct.", "/open-lab/methodology"],
] as const;

function SearchGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="10.5" cy="10.5" fill="none" r="6.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m15.2 15.2 4.2 4.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

export function OpenLabHeroLight() {
  const concentration = experience.visualizations.concentration;
  const staticRecordEntries = [
    {
      eyebrow: "FEATURED RECORD",
      href: "/open-lab/dossier/mk-2866",
      title: `${mk2866Fixture.name} · ${experience.record.batchCode}`,
      copy: "Open the product dossier with its named batch and supplied report kept together.",
    },
    {
      eyebrow: "REPORTED PURITY",
      href: experience.record.recordAction.href,
      title: experience.visualizations.purity.displayValue,
      copy: `Read the value in the context of report ${experience.record.reportId}.`,
    },
    {
      eyebrow: "SOURCE ACCESS",
      href: experience.record.sourceAction.href,
      title: experience.record.labName,
      copy: "Continue to the supplied source with its report identity and stated scope kept attached.",
    },
  ] as const;

  return (
    <section
      className={styles.hero}
      data-figma-node="614:75995"
      data-module="OpenLabHeroLight"
      data-openlab-composition="primary-portal"
      data-recomposed-from="sites-commerce-confidence"
      id="openlab-hero-light"
    >
      <div className={styles.shell}>
        <div className={styles.portalGrid} data-openlab-review-role="primary-opening">
          <div className={styles.portalStack}>
            <EditorialSurface
              actions={(
                <>
                  <ActionLink href="/shop">Shop the range</ActionLink>
                  <ActionLink href="/open-lab/records" secondary>Browse records</ActionLink>
                </>
              )}
              className={styles.portalCard}
              copy="Shop the range, find a named batch and open the supplied record path from one clear starting point."
              eyebrow="OPENLAB PORTAL"
              headingLevel="h1"
              title="See the product. Then see what stands behind it."
            >
              <form action="/open-lab/records" className={styles.search} method="get">
                <SearchGlyph />
                <label className="sr-only" htmlFor="openlab-portal-search">Search OpenLab records</label>
                <input id="openlab-portal-search" name="query" placeholder="Search products, batches or reports" type="search" />
                <button type="submit">Search <Arrow /></button>
              </form>
            </EditorialSurface>

            <DecisionSurface
              actions={(
                <>
                  <ActionLink href="/open-lab/records">Open the archive</ActionLink>
                  <ActionLink href="/open-lab/batch-lookup" secondary>Use batch lookup</ActionLink>
                </>
              )}
              className={styles.archiveCard}
              compact
              copy="Browse the static record index or start with the exact batch reference already in front of you."
              eyebrow="OPENLAB ARCHIVE"
              title="Find the connected record path."
            >
              <dl className={styles.archiveMetrics}>
                <div><dt>Product</dt><dd>01 featured</dd></div>
                <div><dt>Batch</dt><dd>{experience.record.batchCode}</dd></div>
                <div><dt>Report</dt><dd>{experience.record.reportId}</dd></div>
              </dl>
            </DecisionSurface>
          </div>

          <ProductCommerceCard
            className={styles.featuredProduct}
            headingLevel="h2"
            posture="destination"
            product={mk2866Fixture}
            variant="featured"
          />

          <nav
            aria-label="OpenLab product category destinations"
            className={styles.categoryGrid}
            data-copy-surface="decision"
          >
            {categoryDestinations.map(([index, title, copy, href]) => (
              <a href={href} key={title}>
                <span>{index}</span>
                <h2>{title}</h2>
                <p>{copy}</p>
                <strong>Browse <Arrow /></strong>
              </a>
            ))}
          </nav>
        </div>

        <section
          aria-labelledby="openlab-static-records-title"
          className={styles.recordRail}
          data-copy-surface="technical"
          data-openlab-record-rail="static"
          data-presentation-fixture="sites"
          data-runtime-methodology-claim="none"
        >
          <header className={styles.recordRailHeading}>
            <div>
              <span>RECORDS &amp; EVIDENCE</span>
              <h2 id="openlab-static-records-title">Open one clear path into the featured record.</h2>
            </div>
            <ActionLink href="/open-lab/records" secondary>View all records</ActionLink>
          </header>
          <div className={styles.recordGrid}>
            {staticRecordEntries.map((entry) => (
              <a href={entry.href} key={entry.eyebrow}>
                <div className={styles.recordMeta}>
                  <span>{entry.eyebrow}</span>
                  <EvidenceStatus compact state="verified" />
                </div>
                <strong>{entry.title}</strong>
                <p>{entry.copy}</p>
                <b>Open record <Arrow /></b>
              </a>
            ))}
          </div>
        </section>

        <div
          className={styles.confidenceField}
          data-openlab-review-role="product-confidence"
          data-source-state="source-reported"
        >
          <TechnicalSurface
            actions={(
              <>
                <ActionLink href="/open-lab/dossier/mk-2866">Open the MK-2866 dossier</ActionLink>
                <ActionLink href={experience.record.sourceAction.href} secondary>Open original report</ActionLink>
              </>
            )}
            copy="The featured product stays connected to one named batch, one supplied report and the exact values shown by that record."
            eyebrow="PRODUCT CONFIDENCE"
            title="One product. One named batch. A direct source path."
          >
            <EvidenceStatus compact state="verified" />
            <dl className={styles.recordMetrics}>
              <div><dt>Batch</dt><dd>{experience.record.batchCode}</dd></div>
              <div><dt>Reported purity</dt><dd>{experience.visualizations.purity.displayValue}</dd></div>
              <div><dt>Reported concentration</dt><dd>{concentration?.testedValue ?? "Unavailable"}</dd></div>
              <div><dt>Laboratory</dt><dd>{experience.record.labName}</dd></div>
            </dl>
          </TechnicalSurface>

          <DecisionSurface
            compact
            copy="Move into the product, record, comparison or a multi-product composition without losing the confidence context."
            eyebrow="CHOOSE YOUR NEXT STEP"
            title="Turn record detail into a clearer product decision."
          >
            <div className={styles.entryGrid}>
              {confidenceEntries.map(([index, title, copy, href]) => (
                <a href={href} key={title}>
                  <span>{index}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <strong>Continue <Arrow /></strong>
                </a>
              ))}
            </div>
          </DecisionSurface>
        </div>
      </div>
    </section>
  );
}
