/* eslint-disable @next/next/no-img-element -- exact local OpenLab SVG is a governed candidate asset. */

import type { CSSProperties } from "react";
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

export type InventoryStatusProps = Readonly<{
  state?: InventoryState;
  className?: string;
}>;

export function InventoryStatus({ state = "in-stock", className }: InventoryStatusProps) {
  const statusStyle: CSSProperties = {
    color:
      state === "in-stock"
        ? "var(--oluk-inventory-green, var(--success, #15803d))"
        : "var(--oluk-text-muted, var(--ink-muted, #64718a))",
  };

  return (
    <span
      className={classes("inventory-status", "oluk-candidate-inventory", "oluk-inventory-status", className)}
      data-state={state}
      style={statusStyle}
    >
      <i aria-hidden="true" style={{ background: "currentColor" }} />
      {inventoryLabels[state]}
    </span>
  );
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
      <InventoryStatus state={inventory} />
      <EvidenceStatus compact={compactEvidence} state={evidence} />
    </div>
  );
}
