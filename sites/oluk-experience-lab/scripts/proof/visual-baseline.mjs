#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, VIEWPORTS, routeSlug } from "./route-matrix.mjs";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const defaultManifestPath = path.join(siteRoot, "tests/visual-baselines/manifest.json");

function option(name) {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
}

function expectedCases() {
  return ROUTES.flatMap((route) => VIEWPORTS.map((viewport) => ({
    id: `${routeSlug(route.path)}--${viewport.width}`,
    route: route.path,
    width: viewport.width,
    height: viewport.height,
    customer: route.customer,
    artifact: `screenshots/${routeSlug(route.path)}--${viewport.width}.png`,
  })));
}

function lint(manifest) {
  assert.equal(manifest.schemaVersion, "oluk.visual-baseline-manifest.v1");
  assert.equal(manifest.status, "CANDIDATE_HUMAN_REVIEW_REQUIRED_UNPUBLISHED");
  assert.equal(manifest.routeCount, ROUTES.length);
  assert.equal(manifest.widthCount, VIEWPORTS.length);
  assert.equal(manifest.cases.length, ROUTES.length * VIEWPORTS.length);
  assert.equal(new Set(manifest.cases.map(({ id }) => id)).size, manifest.cases.length, "baseline ids must be unique");
  assert.deepEqual(
    manifest.cases.map(({ id, route, width, height, customer, artifact }) => ({ id, route, width, height, customer, artifact })),
    expectedCases(),
    "baseline route/width matrix drifted",
  );
  for (const baseline of manifest.cases) {
    assert.ok(["PENDING_CAPTURE", "CAPTURED_UNREVIEWED", "REVIEWED_BASELINE"].includes(baseline.state), `${baseline.id} has invalid state`);
    if (baseline.state === "PENDING_CAPTURE") assert.equal(baseline.sha256, null, `${baseline.id} pending baseline cannot have a hash`);
    else assert.match(baseline.sha256 ?? "", /^[a-f0-9]{64}$/, `${baseline.id} captured baseline needs SHA-256`);
  }
}

const manifestPath = path.resolve(option("manifest") ?? defaultManifestPath);
const writeTarget = option("write");
if (process.argv.includes("--initialize")) {
  assert.ok(writeTarget, "--initialize requires --write=<manifest path>");
  const initialized = {
    schemaVersion: "oluk.visual-baseline-manifest.v1",
    status: "CANDIDATE_HUMAN_REVIEW_REQUIRED_UNPUBLISHED",
    authority: { run: "MF-09", publication: "NONE", promotion: "HUMAN_REVIEW_REQUIRED" },
    routeCount: ROUTES.length,
    widthCount: VIEWPORTS.length,
    comparison: {
      hashAlgorithm: "sha256",
      pixelDiff: "PENDING_THRESHOLD_DECISION",
      rule: "Only champion-reviewed captures become REVIEWED_BASELINE.",
    },
    cases: expectedCases().map((baseline) => ({ ...baseline, state: "PENDING_CAPTURE", sha256: null })),
  };
  lint(initialized);
  await writeFile(path.resolve(writeTarget), `${JSON.stringify(initialized, null, 2)}\n`);
}
const manifest = JSON.parse(await readFile(process.argv.includes("--initialize") ? path.resolve(writeTarget) : manifestPath, "utf8"));
lint(manifest);

const receiptPath = option("from-receipt") ?? option("compare-receipt");
if (receiptPath) {
  const receipt = JSON.parse(await readFile(path.resolve(receiptPath), "utf8"));
  assert.equal(receipt.routeCount, ROUTES.length, "receipt must cover all routes");
  assert.equal(receipt.widthCount, VIEWPORTS.length, "receipt must cover all widths");
  assert.equal(receipt.results.length, ROUTES.length * VIEWPORTS.length, "receipt matrix is incomplete");
  const receiptById = new Map(receipt.results.map((result) => [`${routeSlug(result.route)}--${result.viewport.width}`, result]));

  if (option("from-receipt")) {
    const nextManifest = {
      ...manifest,
      generatedFromReceipt: path.resolve(receiptPath),
      cases: manifest.cases.map((baseline) => {
        const result = receiptById.get(baseline.id);
        assert.ok(result, `receipt is missing ${baseline.id}`);
        assert.equal(result.status, "PASS", `${baseline.id} cannot become a baseline from a failed proof`);
        assert.match(result.screenshotSha256 ?? "", /^[a-f0-9]{64}$/, `${baseline.id} receipt has no screenshot hash`);
        return { ...baseline, state: "CAPTURED_UNREVIEWED", sha256: result.screenshotSha256 };
      }),
    };
    lint(nextManifest);
    assert.ok(writeTarget, "--from-receipt requires --write=<manifest path>");
    await writeFile(path.resolve(writeTarget), `${JSON.stringify(nextManifest, null, 2)}\n`);
  } else {
    const mismatches = [];
    const pending = [];
    for (const baseline of manifest.cases) {
      const result = receiptById.get(baseline.id);
      if (baseline.state !== "REVIEWED_BASELINE") {
        pending.push(baseline.id);
        continue;
      }
      if (result?.screenshotSha256 !== baseline.sha256) mismatches.push({ id: baseline.id, expected: baseline.sha256, actual: result?.screenshotSha256 ?? null });
    }
    assert.equal(pending.length, 0, `${pending.length} baselines are not champion-reviewed`);
    assert.equal(mismatches.length, 0, `visual baseline mismatch: ${JSON.stringify(mismatches)}`);
  }
}

process.stdout.write(`${JSON.stringify({ status: "PASS", manifest: manifestPath, routeCount: manifest.routeCount, widthCount: manifest.widthCount, caseCount: manifest.cases.length, reviewed: manifest.cases.filter(({ state }) => state === "REVIEWED_BASELINE").length, capturedUnreviewed: manifest.cases.filter(({ state }) => state === "CAPTURED_UNREVIEWED").length, pending: manifest.cases.filter(({ state }) => state === "PENDING_CAPTURE").length }, null, 2)}\n`);
