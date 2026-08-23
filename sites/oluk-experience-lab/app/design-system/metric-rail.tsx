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

export type MetricRole = "strength" | "servings" | "purity";

export type MetricCellProps = Readonly<{
  role: MetricRole;
  nodeId: `component.metric-cell.${MetricRole}`;
  fieldNodeId: `field.metric.${MetricRole}`;
  labelNodeId: `content.metric-label.${MetricRole}`;
  value: string;
  label: string;
}>;

function quantifiedValue(value: string | null, label: string) {
  if (!value?.trim()) return "—";
  const suffix = new RegExp(`\\s+${label}$`, "i");
  // A source may intentionally omit a serving count. Present the absence without
  // fabricating a number or collapsing the shared three-cell metric anatomy.
  return value.replace(suffix, "") || "—";
}

function metricFit(value: string) {
  const length = [...value].length;
  if (length > 8) return "long";
  if (length > 5) return "medium";
  return "short";
}

/**
 * Stable semantic leaf for the universal product-metric grammar. The correct
 * definition-list HTML remains intact while the owner tooling receives a
 * durable node identity that is independent of the underlying tag name.
 */
export function MetricCell({ role, nodeId, fieldNodeId, labelNodeId, value, label }: MetricCellProps) {
  return (
    <div
      data-availability={value === "—" ? "unavailable" : "available"}
      data-fit={metricFit(value)}
      data-oluk-node={nodeId}
      data-oluk-parent="component.metric-rail"
    >
      <dt data-oluk-node={labelNodeId}>{label}</dt>
      <dd data-oluk-node={fieldNodeId}>{value}</dd>
    </div>
  );
}

export function MetricRail({ product, values, compact = false, className }: MetricRailProps) {
  const metrics = values ?? product;

  if (!metrics) {
    throw new Error("MetricRail requires either product or values.");
  }

  const cells: readonly MetricCellProps[] = [
    {
      role: "strength",
      nodeId: "component.metric-cell.strength",
      fieldNodeId: "field.metric.strength",
      labelNodeId: "content.metric-label.strength",
      value: quantifiedValue(metrics.strength, "STRENGTH"),
      label: "STRENGTH",
    },
    {
      role: "servings",
      nodeId: "component.metric-cell.servings",
      fieldNodeId: "field.metric.servings",
      labelNodeId: "content.metric-label.servings",
      value: quantifiedValue(metrics.servings, "SERVINGS"),
      label: "SERVINGS",
    },
    {
      role: "purity",
      nodeId: "component.metric-cell.purity",
      fieldNodeId: "field.metric.purity",
      labelNodeId: "content.metric-label.purity",
      value: quantifiedValue(metrics.purity, "PURITY"),
      label: "PURITY",
    },
  ];

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
      data-oluk-node="component.metric-rail"
    >
      {cells.map((cell) => <MetricCell key={cell.role} {...cell} />)}
    </dl>
  );
}
