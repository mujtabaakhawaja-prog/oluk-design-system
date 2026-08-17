import { DecisionSurface, EditorialSurface, TechnicalSurface } from "./content-surfaces";
import { ActionLink, Arrow } from "./customer-route-primitives";
import experience from "./openlab-product-depth.json";
import styles from "./openlab-hero-light.module.css";
import { ProductCommerceCard } from "./product-commerce-card";
import { getCustomerProductFixture } from "./product-content-adapter";
import { EvidenceStatusChip } from "./program-components";

const confidenceEntries = [
  ["01", "Find the record", "Start with a product, batch or report reference.", "/open-lab/records"],
  ["02", "Compare products", "Put product facts and record availability side by side.", "/open-lab/compare"],
  ["03", "Stack builder", "See whether approved product relationships are available.", "/open-lab/stack-builder"],
  ["04", "Read the methodology", "Understand how labels, batches and reports stay distinct.", "/open-lab/methodology"],
] as const;

function requireFeaturedProduct() {
  const product = getCustomerProductFixture("mk-2866");
  if (!product) throw new Error("MK-2866 customer content projection is unavailable");
  return product;
}

const featuredProduct = requireFeaturedProduct();

export function OpenLabHeroLight() {
  const concentration = experience.visualizations.concentration;

  return (
    <section
      className={styles.hero}
      data-figma-node="614:75995"
      data-module="OpenLabHeroLight"
      data-recomposed-from="sites-commerce-confidence"
      id="openlab-hero-light"
    >
      <div className={styles.shell}>
        <div className={styles.decisionField}>
          <EditorialSurface
            actions={<><ActionLink href="/shop">Shop the range</ActionLink><ActionLink href="/open-lab/records" secondary>Find a record</ActionLink></>}
            copy="OpenLab turns named batches, source documents and reported values into product confidence—so you can understand what stands behind a product before returning to the buying decision."
            eyebrow="OPENLAB"
            headingLevel="h1"
            title="See the product. Then see what stands behind it."
          >
            <div className={styles.valueChips} role="list" aria-label="OpenLab customer value">
              <span role="listitem">PRODUCT CONFIDENCE</span>
              <span role="listitem">SOURCE ACCESS</span>
              <span role="listitem">CONNECTED COMMERCE</span>
            </div>
          </EditorialSurface>
          <ProductCommerceCard headingLevel="h2" product={featuredProduct} variant="featured"/>
        </div>

        <div className={styles.confidenceField}>
          <TechnicalSurface
            actions={<><ActionLink href="/open-lab/dossier/mk-2866">Open the MK-2866 dossier</ActionLink><ActionLink href={experience.record.sourceAction.href} secondary>Open original report</ActionLink></>}
            copy="MK-2866 is the complete reference specimen: one product format connected to one named batch, one supplied report and the exact values available from that source."
            eyebrow="FEATURED RECORD"
            title="One product. One named batch. A direct source path."
          >
            <EvidenceStatusChip state="source-reported"/>
            <dl className={styles.recordMetrics}>
              <div><dt>Batch</dt><dd>{experience.record.batchCode}</dd></div>
              <div><dt>Reported purity</dt><dd>{experience.visualizations.purity.displayValue}</dd></div>
              <div><dt>Reported concentration</dt><dd>{concentration?.testedValue ?? "Unavailable"}</dd></div>
              <div><dt>Laboratory</dt><dd>{experience.record.labName}</dd></div>
            </dl>
          </TechnicalSurface>

          <DecisionSurface
            compact
            copy="Move into the product, the record, comparison availability or the relationship builder without losing the source context."
            eyebrow="CHOOSE YOUR NEXT STEP"
            title="Turn record detail into a clearer product decision."
          >
            <div className={styles.entryGrid}>
              {confidenceEntries.map(([index, title, copy, href]) => (
                <a href={href} key={title}>
                  <span>{index}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <strong>Continue <Arrow/></strong>
                </a>
              ))}
            </div>
          </DecisionSurface>
        </div>
      </div>
    </section>
  );
}
