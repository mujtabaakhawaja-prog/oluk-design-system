import type { AssuranceRailProps } from "./assurance-rail";
import type { CobaltDensityBoundaryProps, CobaltDividerProps } from "./cobalt-divider";
import type { MetricRailProps } from "./metric-rail";
import type { ProductCommerceCardProps } from "./product-commerce-card";
import type { HeroDecisionSurfaceProps, ProductDecisionHeroProps } from "./product-decision-hero";
import type { ProductDossierProps } from "./product-dossier";
import type { ProductMediaChamberProps } from "./product-media-chamber";
import type { EvidenceStatusProps, StockPillProps } from "./product-status";
import type { PurchasePanelProps } from "./purchase-panel";
import type { QualitativeChipProps } from "./qualitative-chip";
import type { QualitativeIconProps } from "./qualitative-icon";
import type { RelatedRailProps } from "./related-rail";

type ExactKeys<Props, Keys extends readonly (keyof Props)[]> =
  Exclude<keyof Props, Keys[number]> extends never ? Keys : never;

function exactPropKeys<Props>() {
  return <const Keys extends readonly (keyof Props)[]>(keys: ExactKeys<Props, Keys>) => keys;
}

/**
 * Compile-time half of the repository-owned Figma bridge.
 *
 * `proof:code-bridge` validates the Figma IDs, files, exports, routes and token
 * names in `authority/FIGMA-CODE-BRIDGE.json`. These exact key lists make the
 * same proof fail at `tsc` time whenever a mapped React prop contract drifts.
 * This is a private candidate resource; it is not Figma Code Connect metadata.
 */
export const codeBridgeComponentContracts = Object.freeze({
  StockPill: {
    module: "app/design-system/product-status.tsx",
    exportName: "StockPill",
    propsType: "StockPillProps",
    propKeys: exactPropKeys<StockPillProps>()(["state", "className"]),
  },
  EvidenceStatus: {
    module: "app/design-system/product-status.tsx",
    exportName: "EvidenceStatus",
    propsType: "EvidenceStatusProps",
    propKeys: exactPropKeys<EvidenceStatusProps>()(["state", "compact", "className"]),
  },
  MetricRail: {
    module: "app/design-system/metric-rail.tsx",
    exportName: "MetricRail",
    propsType: "MetricRailProps",
    propKeys: exactPropKeys<MetricRailProps>()(["product", "values", "compact", "className"]),
  },
  QualitativeChip: {
    module: "app/design-system/qualitative-chip.tsx",
    exportName: "QualitativeChip",
    propsType: "QualitativeChipProps",
    propKeys: exactPropKeys<QualitativeChipProps>()(["kind", "label", "value", "className", "state"]),
  },
  QualitativeIcon: {
    module: "app/design-system/qualitative-icon.tsx",
    exportName: "QualitativeIcon",
    propsType: "QualitativeIconProps",
    propKeys: exactPropKeys<QualitativeIconProps>()(["kind", "className"]),
  },
  HeroDecisionSurface: {
    module: "app/design-system/product-decision-hero.tsx",
    exportName: "HeroDecisionSurface",
    propsType: "HeroDecisionSurfaceProps",
    propKeys: exactPropKeys<HeroDecisionSurfaceProps>()(["product", "headingLevel", "className"]),
  },
  ProductDecisionHero: {
    module: "app/design-system/product-decision-hero.tsx",
    exportName: "ProductDecisionHero",
    propsType: "ProductDecisionHeroProps",
    propKeys: exactPropKeys<ProductDecisionHeroProps>()([
      "product",
      "eyebrow",
      "title",
      "copy",
      "className",
      "priorityMedia",
      "actions",
    ]),
  },
  ProductMediaChamber: {
    module: "app/design-system/product-media-chamber.tsx",
    exportName: "ProductMediaChamber",
    propsType: "ProductMediaChamberProps",
    propKeys: exactPropKeys<ProductMediaChamberProps>()([
      "media",
      "context",
      "alt",
      "className",
      "decorative",
      "priority",
      "sizes",
    ]),
  },
  CobaltDivider: {
    module: "app/design-system/cobalt-divider.tsx",
    exportName: "CobaltDivider",
    propsType: "CobaltDividerProps",
    propKeys: exactPropKeys<CobaltDividerProps>()(["className"]),
  },
  CobaltDensityBoundary: {
    module: "app/design-system/cobalt-divider.tsx",
    exportName: "CobaltDensityBoundary",
    propsType: "CobaltDensityBoundaryProps",
    propKeys: exactPropKeys<CobaltDensityBoundaryProps>()(["className"]),
  },
  ProductCommerceCard: {
    module: "app/design-system/product-commerce-card.tsx",
    exportName: "ProductCommerceCard",
    propsType: "ProductCommerceCardProps",
    propKeys: exactPropKeys<ProductCommerceCardProps>()([
      "product",
      "variant",
      "state",
      "inventory",
      "evidence",
      "headingLevel",
      "quantity",
      "showQualitative",
      "contextKicker",
      "secondaryHref",
      "secondaryLabel",
      "className",
    ]),
  },
  PurchasePanel: {
    module: "app/design-system/purchase-panel.tsx",
    exportName: "PurchasePanel",
    propsType: "PurchasePanelProps",
    propKeys: exactPropKeys<PurchasePanelProps>()([
      "product",
      "state",
      "width",
      "inventory",
      "evidence",
      "quantity",
      "headingLevel",
      "className",
    ]),
  },
  ProductDossier: {
    module: "app/design-system/product-dossier.tsx",
    exportName: "ProductDossier",
    propsType: "ProductDossierProps",
    propKeys: exactPropKeys<ProductDossierProps>()([
      "product",
      "eyebrow",
      "title",
      "copy",
      "headingLevel",
      "className",
      "id",
      "evidenceHref",
    ]),
  },
  AssuranceRail: {
    module: "app/design-system/assurance-rail.tsx",
    exportName: "AssuranceRail",
    propsType: "AssuranceRailProps",
    propKeys: exactPropKeys<AssuranceRailProps>()(["items", "variant", "className"]),
  },
  RelatedRail: {
    module: "app/design-system/related-rail.tsx",
    exportName: "RelatedRail",
    propsType: "RelatedRailProps",
    propKeys: exactPropKeys<RelatedRailProps>()([
      "anchorProduct",
      "products",
      "eyebrow",
      "title",
      "copy",
      "headingLevel",
      "className",
      "id",
    ]),
  },
});

export type CodeBridgeComponentName = keyof typeof codeBridgeComponentContracts;
