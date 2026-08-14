/**
 * Compatibility registry for older owner-review imports.
 *
 * CONV-004 deliberately keeps this file free of component anatomy. Every
 * export below resolves to the same canonical module used by customer routes,
 * so `/review` cannot silently become a parallel renderer.
 */

import type { ProductCardState, PurchasePanelState } from "./commerce-types";

export { AssuranceRail } from "./assurance-rail";
export { MetricRail } from "./metric-rail";
export { ProductCommerceCard } from "./product-commerce-card";
export {
  DecisionSurface,
  EditorialSurface,
  TechnicalSurface,
  TransactionIntroCard,
} from "./content-surfaces";
export { PurchasePanel } from "./purchase-panel";
export { QualitativeChip, QualitativeChipList } from "./qualitative-chip";
export { RelationCard } from "./related-rail";
export { EvidenceStatus, InventoryStatus, StockPill } from "./product-status";

export type CompactState = ProductCardState;
export type { PurchasePanelState };

const stateLabel = (state: string) =>
  state === "focus"
    ? "Focus visible"
    : state
        .split("-")
        .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
        .join(" ");

export const compactStates: ReadonlyArray<{
  state: ProductCardState;
  label: string;
}> = [
  "default",
  "hover",
  "focus",
  "selected",
  "added",
  "unavailable",
  "out-of-stock",
  "disabled",
].map((state) => ({ state: state as ProductCardState, label: stateLabel(state) }));

export const purchasePanelStates: ReadonlyArray<{
  state: PurchasePanelState;
  label: string;
}> = [
  "default",
  "quantity-changed",
  "added",
  "unavailable",
  "out-of-stock",
  "disabled",
].map((state) => ({ state: state as PurchasePanelState, label: stateLabel(state) }));
