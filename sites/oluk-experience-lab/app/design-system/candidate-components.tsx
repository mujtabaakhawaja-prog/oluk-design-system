/* eslint-disable @next/next/no-img-element -- exact local Figma SVGs and transparent product renders require authored chamber treatment. */

import type { ReactNode } from "react";
import {
  assuranceSpecimens,
  mk2866Specimen,
  rad140Specimen,
  type ProductSpecimen,
} from "./contracts";
import {
  OlukCanvasSplit,
  OlukCard,
  OlukDivider,
  OlukMediaChamber,
  OlukPurchasePlane,
  OlukSurface,
} from "./candidate-primitives";

export type InventoryState = "in-stock" | "out-of-stock" | "unavailable";
export type CompactState =
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

export const compactStates: Array<{ state: CompactState; label: string }> = [
  { state: "default", label: "Default" },
  { state: "hover", label: "Hover" },
  { state: "focus", label: "Focus visible" },
  { state: "selected", label: "Selected" },
  { state: "added", label: "Added" },
  { state: "unavailable", label: "Unavailable" },
  { state: "out-of-stock", label: "Out of stock" },
  { state: "disabled", label: "Disabled" },
];

export const purchasePanelStates: Array<{ state: PurchasePanelState; label: string }> = [
  { state: "default", label: "Default" },
  { state: "quantity-changed", label: "Quantity changed" },
  { state: "added", label: "Added" },
  { state: "unavailable", label: "Unavailable" },
  { state: "out-of-stock", label: "Out of stock" },
  { state: "disabled", label: "Disabled" },
];

const qualitativeFacts = [
  ["class", "CLASS", "SARM"],
  ["form", "FORM", "CAPSULES"],
  ["quality", "QUALITY", "LAB FORMULATED"],
  ["tested", "TESTED", "THIRD PARTY"],
] as const;

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export function InventoryStatus({ state = "in-stock" }: { state?: InventoryState }) {
  const labels: Record<InventoryState, string> = {
    "in-stock": "IN STOCK",
    "out-of-stock": "OUT OF STOCK",
    unavailable: "UNAVAILABLE",
  };
  return (
    <span className="oluk-candidate-inventory" data-state={state}>
      <i aria-hidden="true" />
      {labels[state]}
    </span>
  );
}

export function EvidenceStatus() {
  return (
    <span className="oluk-candidate-evidence">
      <span className="oluk-candidate-evidence-icon"><img src="/assets/evidence/openlab-atom.svg" alt="" /></span>
      OPENLAB VERIFIED
    </span>
  );
}

export function MetricRail({ product }: { product: ProductSpecimen }) {
  return (
    <dl className="oluk-candidate-metric-rail">
      <div><dt>{product.strength}</dt><dd>STRENGTH</dd></div>
      <div><dt>{product.servings.replace(" SERVINGS", "")}</dt><dd>SERVINGS</dd></div>
      <div><dt>{product.purity}</dt><dd>PURITY</dd></div>
    </dl>
  );
}

export function QualitativeChips() {
  return (
    <dl className="oluk-candidate-qualitative">
      {qualitativeFacts.map(([kind, label, value]) => (
        <div key={kind}>
          <img src={`/assets/candidate/qualitative/${kind}.svg`} alt="" />
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function QuantityStepper({ value = 1 }: { value?: number }) {
  return (
    <div className="oluk-candidate-quantity" role="group" aria-label="Static quantity specimen">
      <button type="button" disabled aria-label="Decrease quantity">−</button>
      <output aria-label="Quantity">{value}</output>
      <button type="button" disabled aria-label="Increase quantity">+</button>
    </div>
  );
}

export function PurchaseActions({ state = "default" }: { state?: PurchasePanelState }) {
  const labels: Record<PurchasePanelState, string> = {
    default: "Add to bag",
    "quantity-changed": "Add to bag",
    added: "Added",
    unavailable: "Unavailable",
    "out-of-stock": "Out of stock",
    disabled: "Disabled",
  };
  return (
    <div className="oluk-candidate-actions" aria-label="Static purchase-action specimen">
      <button className="oluk-candidate-button" type="button" disabled>{labels[state]}</button>
      <button className="oluk-candidate-button oluk-candidate-button--secondary" type="button" disabled>View Lab Record <Arrow /></button>
    </div>
  );
}

export function ProductCommerceCard({
  product,
  variant,
  id,
  sourceLink,
}: {
  product: ProductSpecimen;
  variant: "vertical" | "featured";
  id: string;
  sourceLink: ReactNode;
}) {
  return (
    <OlukCard className={`oluk-candidate-commerce-card oluk-candidate-commerce-card--${variant}`} component={`ProductCommerceCard.${variant}`} density={variant} id={id}>
      <OlukMediaChamber className="oluk-candidate-media-chamber">
        <div className="oluk-candidate-media-orbit" aria-hidden="true" />
        <img src={product.image} alt={`${product.name} ${product.alias} bottle`} />
      </OlukMediaChamber>
      <OlukPurchasePlane className="oluk-candidate-content-plane">
        <div className="oluk-candidate-identity-row">
          <div>
            <span className="oluk-candidate-series">{product.series}</span>
            <h3>{product.name}</h3>
            <p>{product.alias}</p>
          </div>
          <div className="oluk-candidate-status-stack"><InventoryStatus /><EvidenceStatus /></div>
        </div>
        {variant === "featured" && product.sku && <div className="oluk-candidate-sku">SKU <strong>{product.sku}</strong></div>}
        <MetricRail product={product} />
        <QualitativeChips />
        <OlukDivider />
        <div className="oluk-candidate-purchase-line"><strong>{product.price}</strong><QuantityStepper /></div>
        <PurchaseActions />
        {sourceLink}
      </OlukPurchasePlane>
    </OlukCard>
  );
}

export function CompactCard({ state, label }: { state: CompactState; label: string }) {
  const unavailable = state === "unavailable" || state === "disabled";
  const cannotPurchase = unavailable || state === "out-of-stock";
  const inventoryState: InventoryState = state === "out-of-stock" ? "out-of-stock" : unavailable ? "unavailable" : "in-stock";
  const actionLabel = state === "added" ? "Added" : state === "out-of-stock" ? "Out of stock" : unavailable ? "Unavailable" : "Quick add";
  return (
    <OlukCard className="oluk-candidate-compact" density="compact" id={`mf02b-compact-${state}`} label={`${label} static compact-card state`} state={state}>
      <span className="oluk-candidate-state-label">{label}</span>
      <div className="oluk-candidate-compact-top">
        <OlukMediaChamber className="oluk-candidate-compact-media"><img src={mk2866Specimen.value.image} alt="" /></OlukMediaChamber>
        <div><span>{mk2866Specimen.value.series}</span><h3>{mk2866Specimen.value.name}</h3><p>{mk2866Specimen.value.alias}</p></div>
      </div>
      <MetricRail product={mk2866Specimen.value} />
      <div className="oluk-candidate-compact-proof"><InventoryStatus state={inventoryState} /><EvidenceStatus /></div>
      <div className="oluk-candidate-compact-buy"><strong>{mk2866Specimen.value.price}</strong><span data-disabled={cannotPurchase || undefined}>{actionLabel}</span></div>
    </OlukCard>
  );
}

export function RelationCard() {
  const product = rad140Specimen.value;
  return (
    <OlukCanvasSplit className="oluk-candidate-relation" component="ProductCommerceCard.Relation" id="mf02b-horizontal">
      <OlukMediaChamber className="oluk-candidate-relation-media"><div className="oluk-candidate-media-orbit" /><img src={product.image} alt="RAD-140 Testolone bottle" /></OlukMediaChamber>
      <OlukPurchasePlane className="oluk-candidate-relation-content">
        <span className="oluk-candidate-relation-kicker">STACKS WELL WITH MK-2866</span>
        <div className="oluk-candidate-identity-row">
          <div><span className="oluk-candidate-series">{product.series}</span><h3>{product.name}</h3><p>{product.alias}</p></div>
          <div className="oluk-candidate-status-stack"><InventoryStatus /><EvidenceStatus /></div>
        </div>
        <MetricRail product={product} />
        <QualitativeChips />
        <OlukDivider />
        <div className="oluk-candidate-purchase-line"><strong>{product.price}</strong><QuantityStepper /></div>
        <PurchaseActions />
      </OlukPurchasePlane>
    </OlukCanvasSplit>
  );
}

export function PurchasePanel({ id, label, state }: { id: string; label: string; state: PurchasePanelState }) {
  const product = mk2866Specimen.value;
  const inventoryState: InventoryState = state === "out-of-stock" ? "out-of-stock" : state === "unavailable" || state === "disabled" ? "unavailable" : "in-stock";
  return (
    <OlukCard className="oluk-candidate-purchase-panel" component={state === "default" ? "PurchasePanel" : `PurchasePanel.${state}`} density="purchase" id={id} label={`${label} static PurchasePanel state`} state={state}>
      <span className="oluk-candidate-state-label">{label}</span>
      <div className="oluk-candidate-identity-row">
        <div><span className="oluk-candidate-series">{product.series}</span><h3>{product.name}</h3><p>{product.alias}</p></div>
        {product.sku && <div className="oluk-candidate-sku">SKU <strong>{product.sku}</strong></div>}
      </div>
      <div className="oluk-candidate-proof-row"><EvidenceStatus /><InventoryStatus state={inventoryState} /></div>
      <MetricRail product={product} />
      <QualitativeChips />
      <div className="oluk-candidate-pack-size"><span>PACK SIZE</span><strong>90 SERVINGS</strong></div>
      <OlukDivider />
      <div className="oluk-candidate-purchase-line"><strong>{product.price}</strong><QuantityStepper value={state === "quantity-changed" ? 2 : 1} /></div>
      <PurchaseActions state={state} />
    </OlukCard>
  );
}

export function AssuranceRail() {
  return (
    <div className="oluk-candidate-assurance" id="mf02b-six-icons" data-candidate-component="AssuranceRail">
      {assuranceSpecimens.map((fixture) => {
        const item = fixture.value;
        return (
          <OlukSurface key={item.number} className="oluk-candidate-assurance-cell">
            <span>{item.number}</span>
            <div className="oluk-candidate-assurance-icon">
              <img src={item.icon} alt="" />
              {"proofPoint" in item && item.proofPoint && <img className="oluk-candidate-proof-point" src={item.proofPoint} alt="" />}
            </div>
            <div><h3>{item.title}</h3><p>{item.description}</p></div>
          </OlukSurface>
        );
      })}
    </div>
  );
}
