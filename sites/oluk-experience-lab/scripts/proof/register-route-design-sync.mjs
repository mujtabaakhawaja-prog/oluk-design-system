#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ROUTES } from "./route-matrix.mjs";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const repoRoot = path.resolve(siteRoot, "../..");
const option = (name, fallback) => process.argv.find((argument) => argument.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;

const registryPath = path.resolve(option("registry", path.join(repoRoot, "authority/ROUTE-DESIGN-SYNC-REGISTRY.json")));
const receiptPath = path.resolve(option("receipt", ""));
const sourceCommit = option("source-commit", "");
const sourceTreeHash = option("source-tree-hash", "");
const coldStore = option("cold-store", "");
const write = process.argv.includes("--write");

assert.ok(receiptPath, "--receipt is required");
assert.match(sourceCommit, /^[a-f0-9]{7,40}$/, "--source-commit must be a Git SHA");
assert.match(sourceTreeHash, /^[a-f0-9]{40}$/, "--source-tree-hash must be a Git tree SHA");

const [registry, receipt] = await Promise.all([
  readFile(registryPath, "utf8").then(JSON.parse),
  readFile(receiptPath, "utf8").then(JSON.parse),
]);
assert.equal(receipt.run, "MF-09_FOUR_WIDTH_ROUTE_PROOF");
assert.equal(receipt.failCount, 0, "a failing browser receipt cannot be registered as design-sync evidence");
assert.equal(receipt.widthCount, 2, "route sync captures must use the 1440/390 review widths");
assert.equal(receipt.caseCount, ROUTES.length * 2, "receipt must cover each ledger route at both review widths");

const routeById = new Map(ROUTES.map((route) => [route.id, route]));
const resultByRouteAndWidth = new Map(receipt.results.map((result) => [`${result.route}::${result.viewport.width}`, result]));
const nextRecords = registry.records.map((record) => {
  const route = routeById.get(record.routeId);
  assert.ok(route, `missing executable route for ${record.routeId}`);
  const desktop = resultByRouteAndWidth.get(`${route.path}::1440`);
  const mobile = resultByRouteAndWidth.get(`${route.path}::390`);
  assert.ok(desktop?.screenshotSha256, `${record.routeId} lacks a desktop capture hash`);
  assert.ok(mobile?.screenshotSha256, `${record.routeId} lacks a mobile capture hash`);
  return {
    ...record,
    status: "SITES_CAPTURED_CURRENT",
    figmaMirrorState: "FIGMA_HISTORICAL_REFERENCE",
    currentCapture: {
      state: "CURRENT_CAPTURE_REGISTERED",
      sourceCommit,
      sourceTreeHash,
    },
    siteReference: {
      resolvedPath: route.path,
      sourceCommit,
      sourceTreeHash,
      desktop: { screenshot: desktop.screenshot, sha256: desktop.screenshotSha256 },
      mobile: { screenshot: mobile.screenshot, sha256: mobile.screenshotSha256 },
      receipt: coldStore ? path.join(coldStore, "mf09-four-width-receipt.json") : receiptPath,
    },
  };
});

const next = {
  ...registry,
  captureEvidence: {
    receipt: coldStore ? path.join(coldStore, "mf09-four-width-receipt.json") : receiptPath,
    receiptSha256: option("receipt-sha256", ""),
    sourceCommit,
    sourceTreeHash,
    reviewWidths: [1440, 390],
    routeCount: ROUTES.length,
    caseCount: receipt.caseCount,
    candidateState: receipt.candidateState,
    state: "CURRENT_CAPTURE_REGISTERED",
  },
  records: nextRecords,
};

if (write) await writeFile(registryPath, `${JSON.stringify(next, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ routeCount: nextRecords.length, caseCount: receipt.caseCount, sourceCommit, sourceTreeHash, write }, null, 2)}\n`);
