import { classes } from "./component-utils";
import styles from "./cobalt-divider.module.css";

export type CobaltDividerProps = Readonly<{
  className?: string;
}>;

export type CobaltDensityBoundaryProps = Readonly<{
  className?: string;
}>;

/**
 * Section-level hierarchy mark. Keep the transparent OlukDivider inside cards;
 * this solid cobalt rule belongs only between complex content regions.
 */
export function CobaltDivider({ className }: CobaltDividerProps) {
  return (
    <hr
      aria-hidden="true"
      className={classes(styles.divider, "oluk-cobalt-divider", className)}
      data-component="CobaltDivider"
      data-oluk-node="component.cobalt-divider"
    />
  );
}

/**
 * Executable 32 / 2 / 32 relationship wrapper. This maps to the Figma
 * CobaltDensityBoundary component, while CobaltDivider remains the atomic
 * two-pixel rule used inside it.
 */
export function CobaltDensityBoundary({ className }: CobaltDensityBoundaryProps) {
  return (
    <div
      aria-hidden="true"
      className={classes(styles.boundary, "oluk-cobalt-density-boundary", className)}
      data-component="CobaltDensityBoundary"
      data-oluk-node="component.cobalt-density-boundary"
      data-rhythm="32-2-32"
    >
      <CobaltDivider />
    </div>
  );
}
