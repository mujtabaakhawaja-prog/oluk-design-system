/* eslint-disable @next/next/no-img-element -- exact local assurance SVGs are governed candidate assets. */

import { classes } from "./component-utils";
import { assuranceSpecimens, type AssuranceSpecimen } from "./contracts";

export type AssuranceRailVariant = "full" | "compact";

export type AssuranceRailProps = Readonly<{
  items?: ReadonlyArray<AssuranceSpecimen>;
  variant?: AssuranceRailVariant;
  className?: string;
}>;

export const ownerReviewAssuranceItems: ReadonlyArray<AssuranceSpecimen> = assuranceSpecimens.map(
  (fixture) => fixture.value,
);

const customerAssuranceItems: ReadonlyArray<AssuranceSpecimen> = [
  {
    number: "01",
    title: "Identity context",
    description: "Product and compound names stay aligned across commerce and any available record.",
    icon: "/assets/candidate/assurance/identity.svg",
    proofPoint: "/assets/candidate/assurance/identity-proof-point.svg",
  },
  {
    number: "02",
    title: "Purity context",
    description: "Purity values appear only when they are supplied by an available evidence record.",
    icon: "/assets/candidate/assurance/purity.svg",
  },
  {
    number: "03",
    title: "Strength context",
    description: "Label strength remains distinct from any measured concentration in a report.",
    icon: "/assets/candidate/assurance/concentration.svg",
  },
  {
    number: "04",
    title: "Independent records",
    description: "Third-party sources are named only when their record is available to review.",
    icon: "/assets/candidate/assurance/janoshik.svg",
  },
  {
    number: "05",
    title: "Pack information",
    description: "Packaging details remain attached to their source-owned product information.",
    icon: "/assets/candidate/assurance/sealed.svg",
  },
  {
    number: "06",
    title: "Batch access",
    description: "Batch references connect to OpenLab only when an evidence record is available.",
    icon: "/assets/candidate/assurance/batch.svg",
  },
];

export function AssuranceRail({
  items = customerAssuranceItems,
  variant = "full",
  className,
}: AssuranceRailProps) {
  const compact = variant === "compact";

  return (
    <div
      aria-label="Six-point product and evidence pathway"
      className={classes(
        "assurance-rail",
        compact && "assurance-rail-compact",
        "oluk-assurance-rail",
        className,
      )}
      data-component="AssuranceRail"
      data-live-authority="false"
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
