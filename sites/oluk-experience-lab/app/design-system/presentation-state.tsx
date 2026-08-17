import type { ReactNode } from "react";
import type { HeadingLevel } from "./commerce-types";
import { classes } from "./component-utils";

export type PresentationStateKind =
  | "empty"
  | "entered"
  | "found"
  | "no-result"
  | "unavailable"
  | "out-of-stock"
  | "error"
  | "failure"
  | "retry";

export type PresentationStateFixture = Readonly<{
  eyebrow: string;
  title: string;
  copy: string;
}>;

export const presentationStateFixtures = {
  empty: {
    eyebrow: "READY TO SEARCH",
    title: "Start with a reference.",
    copy: "Enter a product, SKU, batch or record reference to continue.",
  },
  entered: {
    eyebrow: "REFERENCE ENTERED",
    title: "Your reference is ready.",
    copy: "Submit the complete reference to check the available record index.",
  },
  found: {
    eyebrow: "PRODUCT FOUND",
    title: "A product matches this reference.",
    copy: "Continue to its dossier for product facts and the current evidence pathway.",
  },
  "no-result": {
    eyebrow: "NO MATCH",
    title: "No matching record was found.",
    copy: "Check the reference or browse the archive from the beginning.",
  },
  unavailable: {
    eyebrow: "CURRENTLY UNAVAILABLE",
    title: "Record details are unavailable.",
    copy: "Product facts remain available while the record index cannot provide more detail.",
  },
  "out-of-stock": {
    eyebrow: "OUT OF STOCK",
    title: "This product is not currently available.",
    copy: "Its product facts remain readable while purchase actions are unavailable.",
  },
  error: {
    eyebrow: "RECORD ERROR",
    title: "This record could not be shown.",
    copy: "Return to the archive and choose another evidence path.",
  },
  failure: {
    eyebrow: "STEP INCOMPLETE",
    title: "This step could not be completed.",
    copy: "Review the information and choose a safe route back.",
  },
  retry: {
    eyebrow: "READY TO RETRY",
    title: "You can try this step again.",
    copy: "Nothing has been submitted or changed while this page is open.",
  },
} as const satisfies Readonly<Record<PresentationStateKind, PresentationStateFixture>>;

export const presentationStateKinds = Object.freeze(
  Object.keys(presentationStateFixtures) as PresentationStateKind[],
);

export type PresentationStateProps = Readonly<{
  state: PresentationStateKind;
  eyebrow?: string;
  title?: string;
  copy?: string;
  headingLevel?: HeadingLevel;
  action?: ReactNode;
  className?: string;
  id?: string;
}>;

export function PresentationState({
  state,
  eyebrow,
  title,
  copy,
  headingLevel = "h2",
  action,
  className,
  id,
}: PresentationStateProps) {
  const fixture = presentationStateFixtures[state];
  const Heading = headingLevel;

  return (
    <article
      aria-live="polite"
      className={classes("presentation-state", className)}
      data-copy-surface="technical"
      data-live-authority="false"
      data-presentation-state={state}
      id={id}
      role="status"
    >
      <span className="eyebrow">{eyebrow ?? fixture.eyebrow}</span>
      <Heading>{title ?? fixture.title}</Heading>
      <p>{copy ?? fixture.copy}</p>
      {action ? <div className="presentation-state__action">{action}</div> : null}
    </article>
  );
}

export function isPresentationStateKind(value: string | undefined): value is PresentationStateKind {
  return value !== undefined && presentationStateKinds.includes(value as PresentationStateKind);
}
