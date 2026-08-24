import type { HeadingLevel, ProductCardState } from "./commerce-types";
import { classes } from "./component-utils";
import { createProductRelationship, type ProductFixture } from "./product-fixtures";
import { ProductCommerceCard } from "./product-commerce-card";

export type RelationCardProps = Readonly<{
  anchorProduct: ProductFixture;
  product: ProductFixture;
  state?: ProductCardState;
  contextKicker?: string;
  className?: string;
}>;

export function RelationCard({
  anchorProduct,
  product,
  state = "default",
  contextKicker,
  className,
}: RelationCardProps) {
  return (
    <ProductCommerceCard
      className={className}
      commerceState={state === "unavailable" || state === "out-of-stock" || state === "disabled" ? "unavailable" : "available"}
      interactionState={state === "unavailable" || state === "out-of-stock" || state === "disabled" ? "default" : state}
      inventory={state === "out-of-stock" ? "out-of-stock" : state === "unavailable" || state === "disabled" ? "unavailable" : product.presentationStatus.inventory}
      product={product}
      relationship={createProductRelationship(anchorProduct, product, {
        type: "complement",
        reason: {
          claim: contextKicker ?? `${product.name} is presented as a related option beside ${anchorProduct.name}.`,
          sourceCoordinate: `${product.authority.sourceRef} | ${anchorProduct.authority.sourceRef}`,
        },
        action: { href: product.customerPath, label: "View product" },
      })}
      variant="relation"
    />
  );
}

export type RelatedRailProps = Readonly<{
  anchorProduct: ProductFixture;
  products: ReadonlyArray<ProductFixture>;
  eyebrow?: string;
  title?: string;
  copy?: string;
  headingLevel?: HeadingLevel;
  className?: string;
  id?: string;
}>;

export function RelatedRail({
  anchorProduct,
  products,
  eyebrow = "RELATED PRODUCTS",
  title = "Continue through the range.",
  copy = "Review another product without losing specifications or evidence access.",
  headingLevel = "h2",
  className,
  id,
}: RelatedRailProps) {
  const Heading = headingLevel;

  return (
    <section
      className={classes("section", "related-section", "oluk-related-rail", className)}
      data-component="RelatedRail"
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
        <div className="oluk-related-rail__items">
          {products.map((product) => (
            <RelationCard anchorProduct={anchorProduct} key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
