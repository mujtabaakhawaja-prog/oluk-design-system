import type { ReactNode } from "react";
import { classes } from "./component-utils";
import styles from "./content-surfaces.module.css";

export type CopySurfaceKind = "editorial" | "decision" | "technical" | "transaction";
export type CopySurfaceState = "default" | "unavailable";
export type CopySurfaceHeadingLevel = "h1" | "h2" | "h3";

type ContentSurfaceProps = Readonly<{
  eyebrow?: string;
  title: string;
  copy?: string;
  headingLevel?: CopySurfaceHeadingLevel;
  state?: CopySurfaceState;
  compact?: boolean;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  id?: string;
}>;

type GovernedContentSurfaceProps = ContentSurfaceProps & Readonly<{
  kind: CopySurfaceKind;
}>;

const componentNames: Readonly<Record<CopySurfaceKind, string>> = {
  editorial: "EditorialSurface",
  decision: "DecisionSurface",
  technical: "TechnicalSurface",
  transaction: "TransactionIntroCard",
};

function GovernedContentSurface({
  kind,
  eyebrow,
  title,
  copy,
  headingLevel = "h2",
  state = "default",
  compact = false,
  actions,
  children,
  className,
  id,
}: GovernedContentSurfaceProps) {
  const Heading = headingLevel;

  return (
    <section
      className={classes(
        styles.surface,
        styles[kind],
        state === "unavailable" && styles.unavailable,
        compact && styles.compact,
        className,
      )}
      data-component={componentNames[kind]}
      data-copy-state={state}
      data-copy-surface={kind}
      data-mobile-strategy={compact ? "summary" : "recompose"}
      id={id}
    >
      <header className={styles.header}>
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
        <Heading className={styles.title}>{title}</Heading>
        {copy ? <p className={styles.copy}>{copy}</p> : null}
      </header>
      {children ? <div className={styles.body}>{children}</div> : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </section>
  );
}

export function EditorialSurface(props: ContentSurfaceProps) {
  return <GovernedContentSurface {...props} kind="editorial" />;
}

export function DecisionSurface(props: ContentSurfaceProps) {
  return <GovernedContentSurface {...props} kind="decision" />;
}

export function TechnicalSurface(props: ContentSurfaceProps) {
  return <GovernedContentSurface {...props} kind="technical" />;
}

export function TransactionIntroCard(props: ContentSurfaceProps) {
  return <GovernedContentSurface {...props} kind="transaction" />;
}
