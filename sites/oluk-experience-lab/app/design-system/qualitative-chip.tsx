import type { QualitativeFact } from "./commerce-types";
import { classes } from "./component-utils";
import { QualitativeIcon } from "./qualitative-icon";

export type QualitativeChipState = "default" | "selected" | "disabled";

export type QualitativeChipProps = QualitativeFact & Readonly<{
  className?: string;
  state?: QualitativeChipState;
}>;

export function QualitativeChip({
  kind,
  label,
  value,
  className,
  state = "default",
}: QualitativeChipProps) {
  return (
    <li
      aria-disabled={state === "disabled" || undefined}
      className={classes("qualitative-chip", "oluk-qualitative-chip", className)}
      data-kind={kind}
      data-state={state}
    >
      <QualitativeIcon kind={kind} />
      <dl>
        <dt>{label}</dt>
        <dd>{value}</dd>
      </dl>
    </li>
  );
}

export type QualitativeChipListProps = Readonly<{
  facts: ReadonlyArray<QualitativeFact>;
  className?: string;
  label?: string;
}>;

export function QualitativeChipList({
  facts,
  className,
  label = "Product attributes",
}: QualitativeChipListProps) {
  return (
    <ul aria-label={label} className={classes("qualitative-chips", "oluk-qualitative-chips", className)}>
      {facts.map((fact) => (
        <QualitativeChip key={fact.kind} {...fact} />
      ))}
    </ul>
  );
}
