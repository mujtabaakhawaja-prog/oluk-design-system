/* eslint-disable @next/next/no-img-element -- exact local OpenLab SVG is a governed candidate asset. */

import type { EvidenceState, InventoryState } from "./commerce-types";
import { classes } from "./component-utils";

const inventoryLabels: Readonly<Record<InventoryState, string>> = {
  "in-stock": "IN STOCK",
  "out-of-stock": "OUT OF STOCK",
  unavailable: "UNAVAILABLE",
};

const evidenceLabels: Readonly<Record<EvidenceState, string>> = {
  verified: "SOURCE REPORTED",
  available: "RECORD AVAILABLE",
  unavailable: "EVIDENCE UNAVAILABLE",
};

export type StockPillProps = Readonly<{
  state?: InventoryState;
  className?: string;
}>;

/** Missing commerce state fails closed; Woo/C2 must opt a customer surface into a live state. */
export function StockPill({ state = "unavailable", className }: StockPillProps) {
  return (
    <span
      className={classes(
        "stock-pill",
        "inventory-status",
        "oluk-candidate-inventory",
        "oluk-inventory-status",
        className,
      )}
      data-state={state}
    >
      <i aria-hidden="true" />
      {inventoryLabels[state]}
    </span>
  );
}

/** Compatibility export for existing consumers while StockPill becomes the canonical name. */
export type InventoryStatusProps = StockPillProps;

export function InventoryStatus(props: InventoryStatusProps) {
  return <StockPill {...props} />;
}

export type EvidenceStatusProps = Readonly<{
  state?: EvidenceState;
  compact?: boolean;
  className?: string;
}>;

/** Missing evidence state is unavailable; an exact OpenLab binding must opt into another state. */
export function EvidenceStatus({ state = "unavailable", compact = false, className }: EvidenceStatusProps) {
  return (
    <span
      className={classes(
        "evidence-status",
        compact && "evidence-status-compact",
        "oluk-candidate-evidence",
        "oluk-evidence-status",
        className,
      )}
      data-state={state}
    >
      <span className="oluk-candidate-evidence-icon">
        <img alt="" aria-hidden="true" src="/assets/evidence/openlab-atom.svg" />
      </span>
      <span>{evidenceLabels[state]}</span>
    </span>
  );
}

export type ProductStatusStackProps = Readonly<{
  inventory?: InventoryState;
  evidence?: EvidenceState;
  compactEvidence?: boolean;
  className?: string;
}>;

export function ProductStatusStack({
  inventory = "unavailable",
  evidence = "unavailable",
  compactEvidence = true,
  className,
}: ProductStatusStackProps) {
  return (
    <div className={classes("product-status-stack", "oluk-candidate-status-stack", className)}>
      <StockPill state={inventory} />
      <EvidenceStatus compact={compactEvidence} state={evidence} />
    </div>
  );
}
