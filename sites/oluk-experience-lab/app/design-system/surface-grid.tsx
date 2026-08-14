import type { ReactNode } from "react";
import { classes } from "./component-utils";
import styles from "./surface-grid.module.css";

export type SurfaceGridZone =
  | "full"
  | "lead"
  | "support"
  | "centre"
  | "split-start"
  | "split-end"
  | "pdp-media"
  | "pdp-purchase";

export function SurfaceGrid({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  return (
    <div className={classes(styles.grid, className)} data-grid-contract="12-column">
      {children}
    </div>
  );
}

export function SurfaceGridZone({
  as: Element = "div",
  children,
  className,
  zone,
}: Readonly<{
  as?: "div" | "section" | "aside";
  children: ReactNode;
  className?: string;
  zone: SurfaceGridZone;
}>) {
  return (
    <Element className={classes(styles.zone, styles[zone], className)} data-grid-zone={zone}>
      {children}
    </Element>
  );
}

export function SectionIntroduction({
  eyebrow,
  headingLevel = "h2",
  id,
  title,
}: Readonly<{
  eyebrow: string;
  headingLevel?: "h1" | "h2" | "h3";
  id?: string;
  title: string;
}>) {
  const Heading = headingLevel;
  return (
    <header
      className={styles.introduction}
      data-canvas-exception="eyebrow-heading-only"
      data-copy-surface="section-introduction"
      id={id}
    >
      <span>{eyebrow}</span>
      <Heading>{title}</Heading>
    </header>
  );
}
