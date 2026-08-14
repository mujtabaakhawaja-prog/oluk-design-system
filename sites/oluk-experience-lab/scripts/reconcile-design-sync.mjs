#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const readJson = async (relative) => JSON.parse(await readFile(path.join(repoRoot, relative), "utf8"));
const output = (value) => `${JSON.stringify(value, null, 2)}\n`;
const sha = (value) => createHash("sha256").update(value).digest("hex");
const check = process.argv.includes("--check");

const [stateModel, ledger, moduleRegistry, routeRegistry] = await Promise.all([
  readJson("authority/DESIGN-SYNC-STATE-MODEL.json"),
  readJson("authority/SITE-ROUTE-LEDGER.json"),
  readJson("authority/DESIGN-SYNC-REGISTRY.json"),
  readJson("authority/ROUTE-DESIGN-SYNC-REGISTRY.json"),
]);

const reconcileRouteMaturity = (route) => ({
  ...route,
  designMaturity: route.maturity === "DEFERRED_BY_AUTHORITY" ? "DESIGN_INCOMPLETE" : "SITES_BUILT",
  designSyncState: "FIGMA_HISTORICAL_REFERENCE",
});

const reconciledLedger = {
  ...ledger,
  designMaturityStates: stateModel.states,
  designSyncStateModel: "authority/DESIGN-SYNC-STATE-MODEL.json",
  routes: ledger.routes.map(reconcileRouteMaturity),
};

const historicalModule = (record) => ({
  ...record,
  status: "SITES_BUILT",
  figmaMirrorState: "FIGMA_HISTORICAL_REFERENCE",
  currentCapture: {
    state: "NOT_CAPTURED_CURRENT",
    reason: "Existing capture and node references predate the current Sites composition baseline.",
  },
  figmaReference: { ...record.figmaReference, state: "HISTORICAL_REFERENCE" },
});

const reconciledModules = {
  ...moduleRegistry,
  schemaVersion: "oluk.design-sync.v2",
  status: "HISTORICAL_REFERENCES_RECONCILED",
  synchronizationStates: stateModel.states,
  stateModel: "authority/DESIGN-SYNC-STATE-MODEL.json",
  records: moduleRegistry.records.map(historicalModule),
};

const historicalRoute = (record) => ({
  ...record,
  status: "SITES_BUILT",
  figmaMirrorState: "FIGMA_HISTORICAL_REFERENCE",
  currentCapture: {
    state: "NOT_CAPTURED_CURRENT",
    reason: "The recorded Figma pair and capture hash are retained as history, not current visual-sync evidence.",
  },
  siteReference: { ...record.siteReference, historical: true },
});

const reconciledRoutes = {
  ...routeRegistry,
  schemaVersion: "oluk.route-design-sync.v2",
  status: "HISTORICAL_REFERENCES_RECONCILED",
  synchronizationStates: stateModel.states,
  stateModel: "authority/DESIGN-SYNC-STATE-MODEL.json",
  captureEvidence: {
    ...routeRegistry.captureEvidence,
    state: "HISTORICAL_CAPTURE_EVIDENCE",
    reason: "Current route captures must be regenerated from a frozen Sites composition before visual sync can advance.",
  },
  records: routeRegistry.records.map(historicalRoute),
};

const destinations = [
  ["authority/SITE-ROUTE-LEDGER.json", reconciledLedger],
  ["authority/DESIGN-SYNC-REGISTRY.json", reconciledModules],
  ["authority/ROUTE-DESIGN-SYNC-REGISTRY.json", reconciledRoutes],
];

if (check) {
  for (const [relative, value] of destinations) {
    if (await readFile(path.join(repoRoot, relative), "utf8") !== output(value)) throw new Error(`${relative} is not reconciled; run npm run design-sync:reconcile`);
  }
  process.stdout.write(`PASS design-sync reconciliation ${sha(JSON.stringify(reconciledLedger.routes)).slice(0, 12)}\n`);
} else {
  for (const [relative, value] of destinations) await writeFile(path.join(repoRoot, relative), output(value));
  process.stdout.write(`WROTE design-sync reconciliation for ${destinations.length} artifacts\n`);
}
