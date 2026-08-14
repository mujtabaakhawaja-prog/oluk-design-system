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
  StaticQuantityStepper,
} from "./commerce-parts";
import { classes } from "./component-utils";
import { MetricRail } from "./metric-rail";
import type { ProductFixture } from "./product-fixtures";
import { mk2866Fixture } from "./product-fixtures";
import { QualitativeChipList } from "./qualitative-chip";

export type PurchasePanelProps = Readonly<{
  product?: ProductFixture;
  state?: PurchasePanelState;
  width?: PresentationWidth;
  inventory?: InventoryState;
  evidence?: EvidenceState;
  quantity?: number;
  headingLevel?: HeadingLevel;
  className?: string;
}>;

function statePresentation(product: ProductFixture, state: PurchasePanelState) {
  const inventory: InventoryState =
    state === "out-of-stock"
      ? "out-of-stock"
      : state === "unavailable" || state === "disabled"
        ? "unavailable"
        : product.presentationStatus.inventory;
  const quantity = state === "quantity-changed" ? 2 : 1;
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

  return { inventory, quantity, actionLabel } as const;
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
}: PurchasePanelProps) {
  const presentation = statePresentation(product, state);
  const servingsLabel = product.servings.trim() || "Not supplied";
  const introFacts = [product.alias, product.strength, product.servings.trim() || "Servings not supplied", product.purity];

  return (
    <article
      aria-label={`${product.name} ${state} purchase presentation`}
      className={classes("purchase-panel", "oluk-candidate-purchase-panel", className)}
      data-component="PurchasePanel"
      data-copy-surface="decision"
      data-state={state}
      data-width={width}
    >
      <ProductIdentity
        headingLevel={headingLevel}
        product={product}
        status={
          <FixtureStatusStack
            evidence={evidence ?? product.presentationStatus.evidence}
            inventory={inventory ?? presentation.inventory}
            product={product}
          />
        }
      />
      <p className="product-intro">
        {introFacts.join(" · ")}
      </p>
      <MetricRail product={product} />
      <QualitativeChipList facts={product.qualitativeFacts} />
      <div className="sku-line">
        {product.sku ? <span>SKU {product.sku}</span> : <span>{product.series}</span>}
        <a href={product.evidencePath}>View Lab Records →</a>
      </div>
      <div className="oluk-candidate-pack-size">
        <span>PACK SIZE</span>
        <strong>{servingsLabel}</strong>
      </div>
      <div className="purchase-row">
        <PriceBlock price={product.price} />
        <StaticQuantityStepper value={quantity ?? presentation.quantity} />
      </div>
      <StaticPurchaseActions
        evidenceHref={product.evidencePath}
        primaryLabel={presentation.actionLabel}
        state={inventory ?? presentation.inventory}
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
            <PurchasePanel headingLevel="h3" product={product} state={state} width={width} />
          </div>
        )),
      )}
    </div>
  );
}
