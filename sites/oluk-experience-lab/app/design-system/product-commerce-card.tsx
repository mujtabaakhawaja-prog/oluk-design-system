import type {
  EvidenceState,
  HeadingLevel,
  InventoryState,
  ProductCardState,
  ProductCardVariant,
} from "./commerce-types";
import {
  FixtureStatusStack,
  PriceBlock,
  ProductIdentity,
  StaticPurchaseActions,
  StaticQuantityStepper,
} from "./commerce-parts";
import { classes } from "./component-utils";
import { MetricRail } from "./metric-rail";
import type { ProductFixture } from "./product-fixtures";
import { ProductMediaChamber } from "./product-media-chamber";
import { QualitativeChipList } from "./qualitative-chip";

export type ProductCommerceCardProps = Readonly<{
  product: ProductFixture;
  variant?: ProductCardVariant;
  state?: ProductCardState;
  inventory?: InventoryState;
  evidence?: EvidenceState;
  headingLevel?: HeadingLevel;
  quantity?: number;
  showQualitative?: boolean;
  contextKicker?: string;
  className?: string;
}>;

function presentationState(
  product: ProductFixture,
  state: ProductCardState,
  inventory?: InventoryState,
  evidence?: EvidenceState,
) {
  const resolvedInventory =
    inventory ??
    (state === "out-of-stock"
      ? "out-of-stock"
      : state === "unavailable" || state === "disabled"
        ? "unavailable"
        : product.presentationStatus.inventory);
  const resolvedEvidence = evidence ?? product.presentationStatus.evidence;
  const primaryLabel =
    state === "added"
      ? "Added"
      : state === "out-of-stock"
        ? "Out of stock"
        : state === "unavailable"
          ? "Unavailable"
          : state === "disabled"
            ? "Disabled"
            : "Add to bag";

  return { inventory: resolvedInventory, evidence: resolvedEvidence, primaryLabel } as const;
}

export function ProductCommerceCard({
  product,
  variant = "vertical",
  state = "default",
  inventory,
  evidence,
  headingLevel = "h3",
  quantity = 1,
  showQualitative = true,
  contextKicker,
  className,
}: ProductCommerceCardProps) {
  const resolved = presentationState(product, state, inventory, evidence);
  const status = (
    <FixtureStatusStack
      evidence={resolved.evidence}
      inventory={resolved.inventory}
      product={product}
    />
  );

  if (variant === "relation") {
    return (
      <article
        aria-label={`${product.name} related product presentation`}
        className={classes("horizontal-product-card", "product-commerce-card-relation", className)}
        data-component="ProductCommerceCard.Relation"
        data-state={state}
        data-variant={variant}
      >
        <ProductMediaChamber className="horizontal-media" context="relation" media={product.media} />
        <div className="horizontal-content">
          <span className="product-series">{contextKicker ?? "RELATED PRODUCT"}</span>
          <ProductIdentity headingLevel={headingLevel} product={product} status={status} />
          <MetricRail product={product} />
          {showQualitative && product.qualitativeFacts.length > 0 ? (
            <QualitativeChipList facts={product.qualitativeFacts} />
          ) : null}
          <div className="purchase-row">
            <PriceBlock price={product.price} />
            <StaticQuantityStepper value={quantity} />
          </div>
          <StaticPurchaseActions evidenceHref={product.evidencePath} primaryLabel={resolved.primaryLabel} />
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article
        aria-label={`${product.name} compact product presentation`}
        className={classes(
          "product-commerce-card",
          "product-commerce-card-compact",
          "oluk-candidate-compact",
          className,
        )}
        data-component="ProductCommerceCard.compact"
        data-state={state}
        data-variant={variant}
      >
        <div className="oluk-candidate-compact-top">
          <ProductMediaChamber
            className="oluk-candidate-compact-media"
            context="compact"
            media={product.media}
          />
          <ProductIdentity headingLevel={headingLevel} product={product} />
        </div>
        <MetricRail compact product={product} />
        <div className="oluk-candidate-compact-proof">{status}</div>
        {showQualitative && product.qualitativeFacts.length > 0 ? (
          <QualitativeChipList facts={product.qualitativeFacts} />
        ) : null}
        <div className="oluk-candidate-compact-buy">
          <strong>{product.price}</strong>
          <button disabled type="button">{resolved.primaryLabel === "Add to bag" ? "Quick add" : resolved.primaryLabel}</button>
        </div>
      </article>
    );
  }

  const mediaContext = variant === "featured" ? "featured" : "card";

  return (
    <article
      aria-label={`${product.name} ${variant} product presentation`}
      className={classes(
        "product-commerce-card",
        `product-commerce-card-${variant}`,
        className,
      )}
      data-component={`ProductCommerceCard.${variant}`}
      data-state={state}
      data-variant={variant}
    >
      <ProductMediaChamber context={mediaContext} media={product.media} />
      <div className="product-content-plane">
        <ProductIdentity headingLevel={headingLevel} product={product} status={status} />
        {variant === "featured" && product.sku ? (
          <div className="card-sku">
            <span>SKU {product.sku}</span>
            <a href={product.customerPath}>View product →</a>
          </div>
        ) : null}
        <MetricRail product={product} />
        {showQualitative && product.qualitativeFacts.length > 0 ? (
          <QualitativeChipList facts={product.qualitativeFacts} />
        ) : null}
        <div className="purchase-row">
          <PriceBlock price={product.price} />
          <StaticQuantityStepper value={quantity} />
        </div>
        <StaticPurchaseActions evidenceHref={product.evidencePath} primaryLabel={resolved.primaryLabel} />
      </div>
    </article>
  );
}
