/* eslint-disable @next/next/no-img-element -- exact local assurance SVGs are governed candidate assets. */

import { classes } from "./component-utils";
import { assuranceSpecimens, type AssuranceSpecimen } from "./contracts";

export type AssuranceRailVariant = "full" | "compact";

export type AssuranceRailProps = Readonly<{
  items?: ReadonlyArray<AssuranceSpecimen>;
  variant?: AssuranceRailVariant;
  className?: string;
}>;

const defaultAssuranceItems: ReadonlyArray<AssuranceSpecimen> = assuranceSpecimens.map(
  (fixture) => fixture.value,
);

export function AssuranceRail({
  items = defaultAssuranceItems,
  variant = "full",
  className,
}: AssuranceRailProps) {
  const compact = variant === "compact";

  return (
    <div
      aria-label="Six-point product assurance"
      className={classes(
        "assurance-rail",
        compact && "assurance-rail-compact",
        "oluk-assurance-rail",
        className,
      )}
      data-component="AssuranceRail"
      data-variant={variant}
    >
      {items.map((item) => (
        <article key={item.number}>
          <span className="assurance-number">{item.number}</span>
          <div className="assurance-icon">
            <img alt="" aria-hidden="true" src={item.icon} />
            {item.proofPoint ? <img alt="" aria-hidden="true" className="oluk-candidate-proof-point" src={item.proofPoint} /> : null}
          </div>
          <div>
            <h3>{item.title}</h3>
            {compact ? null : <p>{item.description}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}
