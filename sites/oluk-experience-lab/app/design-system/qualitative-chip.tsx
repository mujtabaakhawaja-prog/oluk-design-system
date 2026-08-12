/* eslint-disable @next/next/no-img-element -- exact local qualitative SVGs are governed candidate assets. */

import type { QualitativeFact, QualitativeFactKind } from "./commerce-types";
import { classes } from "./component-utils";

const qualitativeIconRegistry: Readonly<Record<QualitativeFactKind, string>> = {
  class: "/assets/candidate/qualitative/class.svg",
  form: "/assets/candidate/qualitative/form.svg",
  quality: "/assets/candidate/qualitative/quality.svg",
  tested: "/assets/candidate/qualitative/tested.svg",
};

export type QualitativeChipProps = QualitativeFact & Readonly<{ className?: string }>;

export function QualitativeChip({ kind, label, value, className }: QualitativeChipProps) {
  return (
    <li className={classes("qualitative-chip", "oluk-qualitative-chip", className)} data-kind={kind}>
      <img alt="" aria-hidden="true" src={qualitativeIconRegistry[kind]} />
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
