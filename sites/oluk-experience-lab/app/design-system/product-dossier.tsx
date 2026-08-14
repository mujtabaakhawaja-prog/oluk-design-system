import type { HeadingLevel } from "./commerce-types";
import { classes } from "./component-utils";
import { EditorialSurface, TechnicalSurface } from "./content-surfaces";
import { MetricRail } from "./metric-rail";
import type { ProductFixture } from "./product-fixtures";
import { mk2866Fixture } from "./product-fixtures";
import { ProductMediaChamber } from "./product-media-chamber";

export type ProductDossierProps = Readonly<{
  product?: ProductFixture;
  eyebrow?: string;
  title?: string;
  copy?: string;
  headingLevel?: HeadingLevel;
  className?: string;
  id?: string;
  evidenceHref?: string;
}>;

export function ProductDossier({
  product = mk2866Fixture,
  eyebrow = "PRODUCT DOSSIER",
  title = "Product facts, label truth and batch evidence.",
  copy = "Product identity, specifications and evidence access in one continuous view.",
  headingLevel = "h2",
  className,
  id,
  evidenceHref,
}: ProductDossierProps) {
  const form = product.qualitativeFacts.find((fact) => fact.kind === "form")?.value ?? "Unavailable";

  return (
    <section
      className={classes("section", "dossier-section", "oluk-product-dossier", className)}
      data-component="ProductDossier"
      id={id}
    >
      <div className="shell">
        <EditorialSurface copy={copy} eyebrow={eyebrow} headingLevel={headingLevel} title={title}>
          <ol aria-label="Dossier sections" className="dossier-section-index">
            <li>01 Product facts</li>
            <li>02 Product visual</li>
            <li>03 Product composition</li>
          </ol>
        </EditorialSurface>
        <div className="dossier-card">
          <TechnicalSurface className="dossier-panel dossier-facts" compact copy="Label information remains separate from analytical results." eyebrow="01 · PRODUCT FACTS" headingLevel="h3" title="Read the exact product format.">
            <dl>
              <div><dt>Series</dt><dd>{product.series}</dd></div>
              <div><dt>Strength</dt><dd>{product.strength}</dd></div>
              <div><dt>Servings</dt><dd>{product.servings}</dd></div>
              {product.sku ? <div><dt>SKU</dt><dd>{product.sku}</dd></div> : null}
            </dl>
          </TechnicalSurface>
          <article className="dossier-media">
            <ProductMediaChamber context="dossier" media={product.media} />
            <MetricRail compact product={product} />
          </article>
          <TechnicalSurface actions={<a href={evidenceHref ?? product.evidencePath}>Open evidence records →</a>} className="dossier-panel dossier-composition" compact copy="Product composition remains labelled product detail; reported results stay in their own OpenLab record." eyebrow="03 · PRODUCT COMPOSITION" headingLevel="h3" title="Connect the format to its evidence path.">
            <dl>
              <div><dt>Form</dt><dd>{form}</dd></div>
              <div><dt>Compound</dt><dd>{product.alias}</dd></div>
              <div><dt>Label purity</dt><dd>{product.purity}</dd></div>
              <div><dt>Pack</dt><dd>{product.servings}</dd></div>
            </dl>
          </TechnicalSurface>
        </div>
      </div>
    </section>
  );
}
