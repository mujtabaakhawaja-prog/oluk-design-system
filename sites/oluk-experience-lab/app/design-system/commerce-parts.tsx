import type { ReactNode } from "react";
import { ActionButton, ActionLink } from "./action-control";
import type { EvidenceState, HeadingLevel, InventoryState } from "./commerce-types";
import { classes } from "./component-utils";
import type { ProductFixture } from "./product-fixtures";
import { ProductStatusStack } from "./product-status";
import styles from "./commerce-parts.module.css";
import { StagingPrice } from "./staging-preference-context";

export type ProductIdentityProps = Readonly<{
  product: ProductFixture;
  headingLevel?: HeadingLevel;
  status?: ReactNode;
  className?: string;
}>;

export function ProductIdentity({
  product,
  headingLevel = "h3",
  status,
  className,
}: ProductIdentityProps) {
  const Heading = headingLevel;

  return (
    <div className={classes("product-identity-row", "oluk-candidate-identity-row", className)}>
      <div>
        <span className={classes("product-series", "oluk-candidate-series")}>{product.series}</span>
        <Heading>{product.name}</Heading>
        <p>{product.alias}</p>
      </div>
      {status}
    </div>
  );
}

export type FixtureStatusStackProps = Readonly<{
  product: ProductFixture;
  inventory?: InventoryState;
  evidence?: EvidenceState;
}>;

export function FixtureStatusStack({ product, inventory, evidence }: FixtureStatusStackProps) {
  return (
    <ProductStatusStack
      evidence={evidence ?? product.presentationStatus.evidence}
      inventory={inventory ?? product.presentationStatus.inventory}
    />
  );
}

export function PriceBlock({ price }: Readonly<{ price: string }>) {
  return (
    <div className="price-block">
      <span>PRICE</span>
      <strong><StagingPrice value={price}/></strong>
    </div>
  );
}

export type StaticPurchaseActionsProps = Readonly<{
  primaryLabel?: string;
  evidenceHref?: string;
  evidenceLabel?: string;
  productHref?: string;
  showProductLink?: boolean;
  className?: string;
  state?: InventoryState;
}>;

export function StaticPurchaseActions({
  primaryLabel = "Add to bag",
  evidenceHref,
  evidenceLabel = "View Lab Record",
  productHref,
  showProductLink = false,
  className,
  state = "in-stock",
}: StaticPurchaseActionsProps) {
  return (
    <div className={classes("card-actions", styles.actions, className)} data-state={state}>
      <ActionButton disabled>
        {primaryLabel}
      </ActionButton>
      {showProductLink && productHref ? (
        <ActionLink href={productHref} variant="secondary">View product</ActionLink>
      ) : null}
      {evidenceHref ? (
        <ActionLink href={evidenceHref} variant="secondary">{evidenceLabel}</ActionLink>
      ) : null}
    </div>
  );
}
