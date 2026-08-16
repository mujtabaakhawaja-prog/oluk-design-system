/* eslint-disable @next/next/no-img-element -- exact local OpenLab SVG is a governed candidate asset. */

import type { EvidenceState, InventoryState } from "./commerce-types";
import { classes } from "./component-utils";

const inventoryLabels: Readonly<Record<InventoryState, string>> = {
  "in-stock": "IN STOCK",
  "out-of-stock": "OUT OF STOCK",
  unavailable: "UNAVAILABLE",
};

const evidenceLabels: Readonly<Record<EvidenceState, string>> = {
  verified: "OPENLAB VERIFIED",
  available: "RECORD AVAILABLE",
  unavailable: "EVIDENCE UNAVAILABLE",
};

export type StockPillProps = Readonly<{
  state?: InventoryState;
  className?: string;
}>;

export function StockPill({ state = "in-stock", className }: StockPillProps) {
  return (
    <span
      className={classes(
        "stock-pill",
        "inventory-status",
        "oluk-candidate-inventory",
        "oluk-inventory-status",
        className,
      )}
      data-oluk-status-kind="availability"
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

export function EvidenceStatus({ state = "verified", compact = false, className }: EvidenceStatusProps) {
  return (
    <span
      className={classes(
        "evidence-status",
        compact && "evidence-status-compact",
        "oluk-candidate-evidence",
        "oluk-evidence-status",
        className,
      )}
      data-oluk-status-kind="evidence"
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
  inventory = "in-stock",
  evidence = "verified",
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
