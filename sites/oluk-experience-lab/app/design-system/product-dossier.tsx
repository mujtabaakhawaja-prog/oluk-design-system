import type { HeadingLevel } from "./commerce-types";
import { classes } from "./component-utils";
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
  const Heading = headingLevel;
  const form = product.qualitativeFacts.find((fact) => fact.kind === "form")?.value ?? "Unavailable";

  return (
    <section
      className={classes("section", "dossier-section", "oluk-product-dossier", className)}
      data-component="ProductDossier"
      id={id}
    >
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <Heading>{title}</Heading>
            <p>{copy}</p>
          </div>
        </div>
        <ol aria-label="Dossier sections" className="dossier-section-index">
          <li>01 Product facts</li>
          <li>02 Product visual</li>
          <li>03 Product composition</li>
        </ol>
        <div className="dossier-card">
          <article className="dossier-panel dossier-facts">
            <span className="panel-index">01</span>
            <h3>Product Facts</h3>
            <p>Label information remains separate from analytical results.</p>
            <dl>
              <div><dt>Series</dt><dd>{product.series}</dd></div>
              <div><dt>Strength</dt><dd>{product.strength}</dd></div>
              <div><dt>Servings</dt><dd>{product.servings}</dd></div>
              {product.sku ? <div><dt>SKU</dt><dd>{product.sku}</dd></div> : null}
            </dl>
          </article>
          <article className="dossier-media">
            <ProductMediaChamber context="dossier" media={product.media} />
            <MetricRail compact product={product} />
          </article>
          <article className="dossier-panel dossier-composition">
            <span className="panel-index">03</span>
            <h3>Product Composition</h3>
            <p>Presented as labelled product detail, with report results kept in their own record.</p>
            <dl>
              <div><dt>Form</dt><dd>{form}</dd></div>
              <div><dt>Compound</dt><dd>{product.alias}</dd></div>
              <div><dt>Label purity</dt><dd>{product.purity}</dd></div>
              <div><dt>Pack</dt><dd>{product.servings}</dd></div>
            </dl>
            <a href={evidenceHref ?? product.evidencePath}>Open evidence records →</a>
          </article>
        </div>
      </div>
    </section>
  );
}
