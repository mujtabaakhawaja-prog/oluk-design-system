import { classes } from "./component-utils";
import type { ProductFixture } from "./product-fixtures";

export type MetricRailValues = Readonly<{
  strength: string;
  servings: string;
  purity: string;
}>;

export type MetricRailProps = Readonly<{
  product?: Pick<ProductFixture, "strength" | "servings" | "purity">;
  values?: MetricRailValues;
  compact?: boolean;
  className?: string;
}>;

function quantifiedValue(value: string, label: string) {
  const suffix = new RegExp(`\\s+${label}$`, "i");
  // A source may intentionally omit a serving count. Present the absence without
  // fabricating a number or collapsing the shared three-cell metric anatomy.
  return value.replace(suffix, "") || "—";
}

function metricFit(value: string) {
  if (value.length > 8) return "long";
  if (value.length > 5) return "medium";
  return "short";
}

export function MetricRail({ product, values, compact = false, className }: MetricRailProps) {
  const metrics = values ?? product;

  if (!metrics) {
    throw new Error("MetricRail requires either product or values.");
  }

  const cells = [
    [quantifiedValue(metrics.strength, "STRENGTH"), "STRENGTH"],
    [quantifiedValue(metrics.servings, "SERVINGS"), "SERVINGS"],
    [quantifiedValue(metrics.purity, "PURITY"), "PURITY"],
  ] as const;

  return (
    <dl
      className={classes(
        "metric-rail",
        compact && "metric-rail-compact",
        "oluk-candidate-metric-rail",
        "oluk-metric-rail",
        className,
      )}
    >
      {cells.map(([value, label]) => (
        <div data-fit={metricFit(value)} key={label}>
          <dt>{value}</dt>
          <dd>{label}</dd>
        </div>
      ))}
    </dl>
  );
}
