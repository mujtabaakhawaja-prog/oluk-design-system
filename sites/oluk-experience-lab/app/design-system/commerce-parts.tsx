import type { ReactNode } from "react";
import type { EvidenceState, HeadingLevel, InventoryState } from "./commerce-types";
import { classes } from "./component-utils";
import type { ProductFixture } from "./product-fixtures";
import { ProductStatusStack } from "./product-status";

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

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
      <strong>{price}</strong>
    </div>
  );
}

export type StaticQuantityStepperProps = Readonly<{
  value?: number;
  className?: string;
}>;

export function StaticQuantityStepper({ value = 1, className }: StaticQuantityStepperProps) {
  return (
    <div
      aria-label="Quantity presentation"
      className={classes("quantity-stepper", "oluk-candidate-quantity", className)}
      role="group"
    >
      <button aria-label="Decrease quantity" disabled type="button">
        −
      </button>
      <output aria-label="Quantity">{value}</output>
      <button aria-label="Increase quantity" disabled type="button">
        +
      </button>
    </div>
  );
}

export type StaticPurchaseActionsProps = Readonly<{
  primaryLabel?: string;
  evidenceHref?: string;
  productHref?: string;
  showProductLink?: boolean;
  className?: string;
}>;

export function StaticPurchaseActions({
  primaryLabel = "Add to bag",
  evidenceHref,
  productHref,
  showProductLink = false,
  className,
}: StaticPurchaseActionsProps) {
  return (
    <div className={classes("card-actions", "oluk-candidate-actions", className)}>
      <button className={classes("button", "oluk-candidate-button")} disabled type="button">
        {primaryLabel}
      </button>
      {showProductLink && productHref ? (
        <a
          className={classes("button", "button-secondary", "oluk-candidate-button", "oluk-candidate-button--secondary")}
          href={productHref}
        >
          View product <Arrow />
        </a>
      ) : null}
      {evidenceHref ? (
        <a
          className={classes("button", "button-secondary", "oluk-candidate-button", "oluk-candidate-button--secondary")}
          href={evidenceHref}
        >
          View Lab Record <Arrow />
        </a>
      ) : null}
    </div>
  );
}
