#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const inputPath = path.join(repoRoot, "authority/fixtures/OPENLAB-PUBLIC-PROJECTION-V2-MK2866.json");
const outputPath = path.join(siteRoot, "app/design-system/openlab-product-experience.json");
const digest = (value) => createHash("sha256").update(value).digest("hex");

const inputRaw = await readFile(inputPath, "utf8");
const projection = JSON.parse(inputRaw);
if (projection.contract !== "OpenLabPublicProjection.v2" || projection.ok !== true || !Array.isArray(projection.records)) {
  throw new Error("OpenLabPublicProjection.v2 fixture is invalid");
}
const record = projection.records.find((candidate) => candidate.productSlug === "mk-2866");
if (!record || !record.analytes?.length || !record.compiledAction?.enabled) throw new Error("MK-2866 OpenLab record is unavailable");
const analyte = record.analytes[0];
const output = {
  schemaVersion: "oluk.openlab-product-experience.v1",
  sourceContract: projection.contract,
  sourceHash: digest(inputRaw),
  product: { slug: "mk-2866", displayName: record.productName, compoundName: record.compoundName },
  record: {
    id: record.labRecordId,
    reportId: record.reportId,
    batchCode: record.batchCode,
    testedAt: record.sourceDrawer.testedAt,
    labName: record.sourceDrawer.labName,
    bindingState: record.bindingState,
    availabilityState: record.availabilityState,
    recordAction: record.compiledAction,
    sourceAction: record.sourceDrawer.reportUrl ? { label: "View original report", href: record.sourceDrawer.reportUrl } : null
  },
  visualizations: {
    purity: { label: "Reported purity", displayValue: record.reportPurityDisplayValue ?? analyte.purity.displayValue, comparator: analyte.purity.comparator, source: "report-level display" },
    concentration: analyte.concentration ? { label: "Tested concentration", testedValue: analyte.concentration.displayValue, labelClaim: analyte.concentration.labelClaimDisplayValue ?? null, deltaMg: analyte.concentration.labelClaimValue == null ? null : Number((analyte.concentration.value - analyte.concentration.labelClaimValue).toFixed(2)) } : null,
    register: { labRecords: projection.stats.labRecords.value, sarmsAveragePurity: projection.stats.sarmsAveragePurity.displayValue, failures: projection.stats.failures.value }
  },
  interactionContract: { selectableViews: ["record", "label comparison", "source context"], reducedMotion: "no animated analytical reconstruction", chartPolicy: "numeric bars and source-owned tabular values only" }
};
const rendered = `${JSON.stringify(output, null, 2)}\n`;
if (process.argv.includes("--check")) {
  if (await readFile(outputPath, "utf8") !== rendered) throw new Error("OpenLab product experience output is stale; run npm run openlab:compile");
  process.stdout.write(`PASS OpenLab experience ${digest(rendered)}\n`);
} else {
  await writeFile(outputPath, rendered);
  process.stdout.write(`WROTE OpenLab experience ${digest(rendered)}\n`);
}
