"use client";

import { useState } from "react";

import type {
  EvidenceState,
  HeadingLevel,
  InventoryState,
  PresentationWidth,
  PurchasePanelState,
} from "./commerce-types";
import { presentationWidths, purchasePanelStates } from "./commerce-types";
import {
  FixtureStatusStack,
  PriceBlock,
  ProductIdentity,
  StaticPurchaseActions,
} from "./commerce-parts";
import { classes } from "./component-utils";
import { MetricRail } from "./metric-rail";
import type { BenefitClaim, ProductFixture } from "./product-fixtures";
import { mk2866Fixture } from "./product-fixtures";
import { QuantityStepper } from "./quantity-stepper";
import styles from "./purchase-panel.module.css";

export type PurchasePanelContentMode =
  | "benefits-supported"
  | "facts-only"
  | "minimal";

export type PurchasePanelProps = Readonly<{
  product?: ProductFixture;
  state?: PurchasePanelState;
  width?: PresentationWidth;
  inventory?: InventoryState;
  evidence?: EvidenceState;
  quantity?: number;
  headingLevel?: HeadingLevel;
  className?: string;
  bottleOptions?: boolean;
  benefitClaim?: BenefitClaim;
  contentMode?: PurchasePanelContentMode;
  reviewMode?: boolean;
}>;

export type PurchaseConfigurationProps = Readonly<{
  product: ProductFixture;
  bottleOptions?: boolean;
  selectedBottleCount?: 1 | 2;
  disabled?: boolean;
  reviewMode?: boolean;
}>;

export type PurchasePackageOptionProps = Readonly<{
  packageCount: 1 | 2;
  servingsPerBottle: number;
  selected: boolean;
  disabled?: boolean;
  reviewMode?: boolean;
  onSelect?: (packageCount: 1 | 2) => void;
}>;

function statePresentation(product: ProductFixture, state: PurchasePanelState) {
  const inventory: InventoryState =
    state === "out-of-stock"
      ? "out-of-stock"
      : state === "unavailable" || state === "disabled"
        ? "unavailable"
        : product.presentationStatus.inventory;
  const selectedBottleCount: 1 | 2 = state === "quantity-changed" ? 2 : 1;
  const actionLabel =
    state === "added"
      ? "Added"
      : state === "out-of-stock"
        ? "Out of stock"
        : state === "unavailable"
          ? "Unavailable"
          : state === "disabled"
            ? "Disabled"
            : "Add to bag";

  return { inventory, selectedBottleCount, actionLabel } as const;
}

/**
 * The canonical BenefitClaim record remains owner-source metadata. A claim is
 * admissible only when its visible copy and source coordinate arrive together.
 */
function SourceBoundBenefitClaim({ benefit }: Readonly<{ benefit: BenefitClaim }>) {
  const claim = benefit.claim.trim();
  const sourceCoordinate = benefit.sourceCoordinate.trim();

  if (!claim || !sourceCoordinate) return null;

  return (
    <aside
      aria-label="Sourced product benefit"
      className="oluk-candidate-benefit-claim"
      data-oluk-node="component.benefit-claim"
      data-source-coordinate={sourceCoordinate}
      data-source-required="true"
    >
      <p>{claim}</p>
    </aside>
  );
}

/**
 * One bounded package-selection control. Package count and total servings stay
 * distinct from the product MetricRail and the separate purchase quantity.
 */
export function PurchasePackageOption({
  packageCount,
  servingsPerBottle,
  selected,
  disabled = false,
  reviewMode = true,
  onSelect,
}: PurchasePackageOptionProps) {
  const totalServings = servingsPerBottle * packageCount;

  return (
    <button
      aria-disabled={reviewMode || disabled || undefined}
      aria-pressed={selected}
      className={classes("oluk-candidate-purchase-package-option", styles.packageOption)}
      data-interaction={reviewMode ? "review-inert" : "local-preview"}
      data-oluk-node="primitive.purchase-package-option"
      data-selected={selected ? "true" : "false"}
      data-state={disabled ? "disabled" : selected ? "selected" : "unselected"}
      disabled={disabled}
      onClick={reviewMode || disabled ? undefined : () => onSelect?.(packageCount)}
      tabIndex={reviewMode ? -1 : undefined}
      type="button"
    >
      <strong data-oluk-node="field.purchase.package-count">
        {packageCount} {packageCount === 1 ? "BOTTLE" : "BOTTLES"}
      </strong>
      <small data-oluk-node="field.purchase.total-servings">{totalServings} SERVINGS</small>
    </button>
  );
}

/**
 * Stable semantic owner for package-count and total-servings presentation.
 * This is purchase configuration, never the product MetricRail or stock quantity.
 */
export function PurchaseConfiguration({
  product,
  bottleOptions = false,
  selectedBottleCount = 1,
  disabled = false,
  reviewMode = true,
}: PurchaseConfigurationProps) {
  const servingsLabel = product.servings.trim() || "Not supplied";
  const servingsCount = Number(product.servings.match(/\d+/)?.[0] || 0);
  const [previewBottleCount, setPreviewBottleCount] = useState<1 | 2>(selectedBottleCount);
  const activeBottleCount = reviewMode ? selectedBottleCount : previewBottleCount;

  if (bottleOptions && servingsCount > 0) {
    return (
      <div
        aria-label="Bottle quantity options"
        className={classes("oluk-candidate-bottle-options", styles.bottleOptions)}
        data-oluk-node="component.purchase-configuration"
        role="group"
      >
        <span>BOTTLES</span>
        <PurchasePackageOption
          disabled={disabled}
          onSelect={setPreviewBottleCount}
          packageCount={1}
          reviewMode={reviewMode}
          selected={activeBottleCount === 1}
          servingsPerBottle={servingsCount}
        />
        <PurchasePackageOption
          disabled={disabled}
          onSelect={setPreviewBottleCount}
          packageCount={2}
          reviewMode={reviewMode}
          selected={activeBottleCount === 2}
          servingsPerBottle={servingsCount}
        />
      </div>
    );
  }

  return (
    <div className="oluk-candidate-pack-size" data-oluk-node="component.purchase-configuration">
      <span>PACK SIZE</span>
      <strong data-oluk-node="field.purchase.total-servings">{servingsLabel}</strong>
    </div>
  );
}

export function PurchasePanel({
  product = mk2866Fixture,
  state = "default",
  width = "responsive",
  inventory,
  evidence,
  quantity,
  headingLevel = "h2",
  className,
  bottleOptions = false,
  benefitClaim,
  contentMode = "facts-only",
  reviewMode = true,
}: PurchasePanelProps) {
  const presentation = statePresentation(product, state);
  const resolvedInventory = inventory ?? presentation.inventory;
  const introFacts = [product.alias, product.strength, product.servings.trim() || "Servings not supplied", product.purity];

  return (
    <article
      aria-label={`${product.name} ${state} purchase presentation`}
      className={classes("purchase-panel", "oluk-candidate-purchase-panel", styles.panel, className)}
      data-component="PurchasePanel"
      data-content-mode={contentMode}
      data-copy-surface="decision"
      data-elevation="independent"
      data-oluk-node="component.purchase-panel"
      data-review-mode={reviewMode ? "inert" : "local-preview"}
      data-state={state}
      data-surface-role="purchase-decision-plane"
      data-width={width}
      inert={reviewMode ? true : undefined}
    >
      <ProductIdentity
        headingLevel={headingLevel}
        product={product}
        status={
          <FixtureStatusStack
            evidence={evidence ?? product.presentationStatus.evidence}
            inventory={resolvedInventory}
            product={product}
          />
        }
      />
      {contentMode === "facts-only" ? (
        <p className="product-intro" data-oluk-node="field.purchase.fact-summary">
          {introFacts.join(" · ")}
        </p>
      ) : contentMode === "benefits-supported" && benefitClaim ? (
        <SourceBoundBenefitClaim benefit={benefitClaim} />
      ) : null}
      <MetricRail product={product} />
      {contentMode === "minimal" ? null : (
        <div className="sku-line">
          {product.sku ? <span>SKU {product.sku}</span> : <span>{product.series}</span>}
          <a href={product.evidencePath}>View Lab Records →</a>
        </div>
      )}
      <PurchaseConfiguration
        bottleOptions={bottleOptions}
        disabled={resolvedInventory !== "in-stock"}
        product={product}
        reviewMode={reviewMode}
        selectedBottleCount={presentation.selectedBottleCount}
      />
      <div className="purchase-row">
        <PriceBlock price={product.price} />
        <QuantityStepper
          unavailable={(inventory ?? presentation.inventory) !== "in-stock"}
          value={quantity ?? 1}
        />
      </div>
      <StaticPurchaseActions
        evidenceHref={product.evidencePath}
        primaryLabel={presentation.actionLabel}
        state={resolvedInventory}
      />
    </article>
  );
}

export function PurchasePanelMatrix({ product = mk2866Fixture }: Readonly<{ product?: ProductFixture }>) {
  return (
    <div aria-label="PurchasePanel state and width matrix" className="oluk-purchase-panel-matrix oluk-candidate-purchase-state-grid">
      {presentationWidths.flatMap((width) =>
        purchasePanelStates.map((state) => (
          <div className="oluk-purchase-panel-matrix__cell oluk-candidate-purchase-stage" data-state={state} data-width={width} id={`mf02b-purchase-panel-${state}${width === "desktop" ? "" : "-mobile"}`} key={`${width}-${state}`}>
            <span className="oluk-candidate-state-label">
              {width} · {state.replaceAll("-", " ")}
            </span>
            <PurchasePanel contentMode="facts-only" headingLevel="h3" product={product} reviewMode state={state} width={width} />
          </div>
        )),
      )}
    </div>
  );
}
