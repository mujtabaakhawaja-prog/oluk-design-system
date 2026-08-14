#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const matrixPath = path.join(repoRoot, "authority/ROUTE-PROMOTION-MATRIX.json");
const ledgerPath = path.join(repoRoot, "authority/SITE-ROUTE-LEDGER.json");
const digest = (value) => createHash("sha256").update(value).digest("hex");
const ledgerRaw = await readFile(ledgerPath, "utf8");
const ledger = JSON.parse(ledgerRaw);
const matrix = JSON.parse(await readFile(matrixPath, "utf8"));

if (!Array.isArray(ledger.routes) || ledger.routes.length !== 73) throw new Error("The route ledger must contain exactly 73 routes");

const templateFor = (route) => {
  if (route.family === "homepage") return "homepage";
  if (route.family === "product_detail") return "pdp";
  if (["catalogue_search_collections", "support_content", "shared_shell", "governance_review"].includes(route.family)) return "discovery-support";
  if (route.family.startsWith("openlab_") || route.family === "decision_tools") return "openlab";
  if (["account", "bag_checkout", "post_purchase", "complete_payment"].includes(route.family)) return "commerce-continuation";
  return "support-and-account";
};
const placement = (module, template, state) => ({
  module,
  state,
  insertionPoint: state === "PROMOTED" ? "current declared composition" : `next ${template} continuation slot`,
  customerPurpose: `Help the customer continue from ${template} into ${module.replaceAll(/([A-Z])/g, " $1").trim().toLowerCase()}.`,
  sourceContent: "Product Experience Compiler plus current Sites module registry",
  mediaPolicy: "registered actual render or governed unpopulated chamber",
  mobileStrategy: module.toLowerCase().includes("compare") ? "horizontal-scroll" : "summary",
  standaloneDestination: matrix.templates.find((entry) => entry.id === template)?.standaloneDestinations?.[0] ?? null,
  invalidatedConsumers: matrix.templates.find((entry) => entry.id === template)?.paths ?? [],
});

const compiled = {
  ...matrix,
  ledgerSource: {
    path: "authority/SITE-ROUTE-LEDGER.json",
    sha256: digest(ledgerRaw),
    routeCount: ledger.routes.length,
  },
  routeDispositions: ledger.routes.map((route) => {
    const template = templateFor(route);
    const definition = matrix.templates.find((entry) => entry.id === template);
    return ({
    routeId: route.id,
    path: route.path,
    family: route.family,
    template,
    designMaturity: route.designMaturity,
    runtimeReadiness: route.runtimeReadiness,
    disposition: route.disposition,
    promoted: route.designMaturity === "dual-reference-ready" || route.designMaturity === "champion-approved",
    promotedPlacements: (definition?.promoted ?? []).map((module) => placement(module, template, "PROMOTED")),
    promotableFrom: definition?.promotable ?? [],
    promotablePlacements: (definition?.promotable ?? []).map((module) => placement(module, template, "PROMOTABLE")),
  });}),
};

const output = `${JSON.stringify(compiled, null, 2)}\n`;
if (process.argv.includes("--check")) {
  if (await readFile(matrixPath, "utf8") !== output) throw new Error("Route promotion matrix is stale; run npm run promotion:generate");
  process.stdout.write(`PASS route promotion matrix ${compiled.ledgerSource.sha256}\n`);
} else {
  await writeFile(matrixPath, output);
  process.stdout.write(`WROTE route promotion matrix ${compiled.ledgerSource.sha256}\n`);
}
