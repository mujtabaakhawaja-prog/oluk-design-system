import type {
  EvidenceState,
  HeadingLevel,
  InventoryState,
  ProductCardState,
  ProductCardVariant,
} from "./commerce-types";
import { ActionButton, ActionLink } from "./action-control";
import {
  FixtureStatusStack,
  PriceBlock,
  ProductIdentity,
  StaticPurchaseActions,
} from "./commerce-parts";
import { classes } from "./component-utils";
import { MetricRail } from "./metric-rail";
import type { ProductFixture } from "./product-fixtures";
import { ProductMediaChamber } from "./product-media-chamber";
import styles from "./product-commerce-card.module.css";
import { QualitativeChipList } from "./qualitative-chip";
import { QuantityStepper } from "./quantity-stepper";

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
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
  /** Selection contexts reuse the canonical anatomy while a parent owns price and action state. */
  commerceTreatment?: "purchase" | "selection";
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
            : resolvedInventory === "out-of-stock"
              ? "Out of stock"
              : resolvedInventory === "unavailable"
                ? "Unavailable"
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
  showQualitative,
  contextKicker,
  secondaryHref,
  secondaryLabel,
  className,
  commerceTreatment = "purchase",
}: ProductCommerceCardProps) {
  const resolved = presentationState(product, state, inventory, evidence);
  const qualitativeVisible = showQualitative ?? variant !== "compact";
  const status = commerceTreatment === "selection" ? null : (
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
        data-copy-surface="commerce"
        data-oluk-node="component.product-commerce-card"
        data-state={state}
        data-variant={variant}
      >
        <ProductMediaChamber className="horizontal-media" context="relation" media={product.media} />
        <div className="horizontal-content">
          <span className="product-series">{contextKicker ?? "RELATED PRODUCT"}</span>
          <ProductIdentity headingLevel={headingLevel} product={product} status={status} />
          <MetricRail product={product} />
          {qualitativeVisible && product.qualitativeFacts.length > 0 ? (
            <QualitativeChipList facts={product.qualitativeFacts} />
          ) : null}
          <div className="purchase-row">
            <PriceBlock price={product.price} />
            <QuantityStepper
              unavailable={resolved.inventory !== "in-stock"}
              value={quantity}
            />
          </div>
          <StaticPurchaseActions
            evidenceHref={secondaryHref ?? product.evidencePath}
            evidenceLabel={secondaryLabel ?? (resolved.evidence === "unavailable" ? "Browse Lab Records" : "View Lab Record")}
            primaryLabel={resolved.primaryLabel}
            state={resolved.inventory}
          />
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
        data-copy-surface="commerce"
        data-oluk-node="component.product-commerce-card"
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
        {status ? <div className="oluk-candidate-compact-proof">{status}</div> : null}
        {null /* Compact anatomy intentionally omits QualitativeChips in every call path. */}
        {commerceTreatment === "purchase" ? (
          <div className={classes("oluk-candidate-compact-buy", styles.compactPurchase)}>
            <strong>{product.price}</strong>
            <div className={styles.compactActions}>
              <ActionLink href={secondaryHref ?? product.customerPath} size="compact" variant="quiet">
                View product
              </ActionLink>
              <ActionButton disabled size="compact">
                {resolved.primaryLabel === "Add to bag"
                  ? "Quick add"
                  : resolved.primaryLabel === "Added"
                    ? "Added ✓"
                    : resolved.primaryLabel}
              </ActionButton>
            </div>
          </div>
        ) : null}
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
      data-copy-surface="commerce"
      data-oluk-node="component.product-commerce-card"
      data-state={state}
      data-variant={variant}
    >
      <div className="product-commerce-card-inner">
        <ProductMediaChamber context={mediaContext} media={product.media} />
        <div className="product-content-plane">
          <ProductIdentity headingLevel={headingLevel} product={product} status={status} />
          {variant === "featured" && product.sku ? (
            <div className={styles.skuRow}>
              <span>SKU {product.sku}</span>
              <ActionLink className={styles.skuLink} href={product.customerPath} size="compact" variant="quiet">
                View product
              </ActionLink>
            </div>
          ) : null}
          <MetricRail product={product} />
          {qualitativeVisible && product.qualitativeFacts.length > 0 ? (
            <QualitativeChipList facts={product.qualitativeFacts} />
          ) : null}
          {commerceTreatment === "purchase" ? (
            <>
              <div className="purchase-row">
                <PriceBlock price={product.price} />
                <QuantityStepper
                  unavailable={resolved.inventory !== "in-stock"}
                  value={quantity}
                />
              </div>
              <StaticPurchaseActions
                evidenceHref={secondaryHref ?? product.evidencePath}
                evidenceLabel={secondaryLabel}
                primaryLabel={resolved.primaryLabel}
                state={resolved.inventory}
              />
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}
