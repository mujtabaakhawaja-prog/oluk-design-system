import type { EvidenceAuthorityState } from "./program-components";

export type OpenLabField<T> = Readonly<{
  value: T | null;
  sourceRef: string | null;
  status: EvidenceAuthorityState;
  supersedes?: string | null;
}>;

export type OpenLabReportProjection = Readonly<{
  reportId: string;
  productSlug: string;
  reportSource: OpenLabField<string>;
  method: OpenLabField<string>;
  purity: OpenLabField<number | `>${number}`>;
  concentration: OpenLabField<number>;
  analytes: readonly Readonly<{ analyte: string; value: number; unit: string; sourceRef: string }>[];
}>;

const unavailable = <T>(): OpenLabField<T> => ({ value: null, sourceRef: null, status: "unavailable" });

export const mk2866OpenLabProjection = Object.freeze({
  reportId: "source-unavailable",
  productSlug: "mk-2866",
  reportSource: unavailable<string>(),
  method: unavailable<string>(),
  purity: { value: ">99" as const, sourceRef: "product-runtime-contract:purity-display", status: "source-reported" as const },
  concentration: unavailable<number>(),
  analytes: [],
} satisfies OpenLabReportProjection);

export function exactPurityAverage(reports: readonly OpenLabReportProjection[]): number | null {
  const exact = reports.flatMap(({ purity }) => typeof purity.value === "number" ? [purity.value] : []);
  return exact.length ? exact.reduce((sum, value) => sum + value, 0) / exact.length : null;
}

export function reportCount(reports: readonly OpenLabReportProjection[]): number {
  return new Set(reports.map(({ reportId }) => reportId)).size;
}

export function canOpenOriginal(report: OpenLabReportProjection): boolean {
  return report.reportSource.value !== null && report.reportSource.sourceRef !== null;
}
