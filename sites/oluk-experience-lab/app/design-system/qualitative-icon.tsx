import type { QualitativeFactKind } from "./commerce-types";
import { classes } from "./component-utils";

export const qualitativeIconSources = Object.freeze({
  class: "/assets/candidate/qualitative/class.svg",
  form: "/assets/candidate/qualitative/form.svg",
  quality: "/assets/candidate/qualitative/quality.svg",
  tested: "/assets/candidate/qualitative/tested.svg",
} satisfies Readonly<Record<QualitativeFactKind, string>>);

export type QualitativeIconProps = Readonly<{
  kind: QualitativeFactKind;
  className?: string;
}>;

export function QualitativeIcon({ kind, className }: QualitativeIconProps) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className={classes("oluk-qualitative-icon", className)}
      data-kind={kind}
      src={qualitativeIconSources[kind]}
    />
  );
}
