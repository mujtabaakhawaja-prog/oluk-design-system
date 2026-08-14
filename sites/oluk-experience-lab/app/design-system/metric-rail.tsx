import { classes } from "./component-utils";
import type { ProductFixture } from "./product-fixtures";

export type MetricRailValues = Readonly<{
  strength: string | null;
  servings: string | null;
  purity: string | null;
}>;

export type MetricRailProps = Readonly<{
  product?: Pick<ProductFixture, "strength" | "servings" | "purity">;
  values?: MetricRailValues;
  compact?: boolean;
  className?: string;
}>;

function quantifiedValue(value: string | null, label: string) {
  if (!value?.trim()) return "—";
  const suffix = new RegExp(`\\s+${label}$`, "i");
  return value.replace(suffix, "");
}

function metricFit(value: string) {
  const length = [...value].length;
  if (length > 8) return "long";
  if (length > 5) return "medium";
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
      aria-label="Product specifications"
      data-component="ProductMetricRail"
      data-metric-count={cells.length}
    >
      {cells.map(([value, label]) => (
        <div
          data-availability={value === "—" ? "unavailable" : "available"}
          data-fit={metricFit(value)}
          key={label}
        >
          <dt>{value}</dt>
          <dd>{label}</dd>
        </div>
      ))}
    </dl>
  );
}
