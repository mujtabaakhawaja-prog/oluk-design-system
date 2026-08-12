import type { HeadingLevel, ProductCardState } from "./commerce-types";
import { classes } from "./component-utils";
import type { ProductFixture } from "./product-fixtures";
import { ProductCommerceCard } from "./product-commerce-card";

export type RelationCardProps = Readonly<{
  anchorProduct: ProductFixture;
  product: ProductFixture;
  state?: ProductCardState;
  className?: string;
}>;

export function RelationCard({
  anchorProduct,
  product,
  state = "default",
  className,
}: RelationCardProps) {
  return (
    <ProductCommerceCard
      className={className}
      contextKicker={`RELATED TO ${anchorProduct.name}`}
      product={product}
      state={state}
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
