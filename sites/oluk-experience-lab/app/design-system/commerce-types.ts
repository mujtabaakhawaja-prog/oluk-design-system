export type InventoryState = "in-stock" | "out-of-stock" | "unavailable";

export type EvidenceState = "verified" | "available" | "unavailable";

export type ProductCardVariant = "compact" | "vertical" | "featured" | "relation";

export type ProductCardState =
  | "default"
  | "hover"
  | "focus"
  | "selected"
  | "added"
  | "unavailable"
  | "out-of-stock"
  | "disabled";

export type PurchasePanelState =
  | "default"
  | "quantity-changed"
  | "added"
  | "unavailable"
  | "out-of-stock"
  | "disabled";

export type PresentationWidth = "responsive" | "desktop" | "mobile";

export type ProductMediaContext =
  | "card"
  | "compact"
  | "featured"
  | "relation"
  | "hero"
  | "dossier"
  | "purchase";

export type QualitativeFactKind = "class" | "form" | "quality" | "tested";

export type QualitativeFact = Readonly<{
  kind: QualitativeFactKind;
  label: string;
  value: string;
}>;

export type HeadingLevel = "h1" | "h2" | "h3";

export const productCardStates = [
  "default",
  "hover",
  "focus",
  "selected",
  "added",
  "unavailable",
  "out-of-stock",
  "disabled",
] as const satisfies ReadonlyArray<ProductCardState>;

export const purchasePanelStates = [
  "default",
  "quantity-changed",
  "added",
  "unavailable",
  "out-of-stock",
  "disabled",
] as const satisfies ReadonlyArray<PurchasePanelState>;

export const presentationWidths = ["desktop", "mobile"] as const satisfies ReadonlyArray<PresentationWidth>;
