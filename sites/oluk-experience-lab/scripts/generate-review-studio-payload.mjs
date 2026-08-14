#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const readJson = async (file) => JSON.parse(await readFile(path.join(repoRoot, file), "utf8"));
const sha = (value) => createHash("sha256").update(value).digest("hex");
const contract = await readJson("authority/REVIEW-STUDIO-CONTRACT.json");
const routeLedger = await readJson("authority/SITE-ROUTE-LEDGER.json");
const componentRegistry = await readJson("authority/PROGRAM-COMPONENT-REGISTRY.json");
const figmaIntent = await readJson("authority/FIGMA-INTENT-REGISTRY.json");
const designSync = await readJson("authority/DESIGN-SYNC-REGISTRY.json");
const openLabExperience = await readJson("sites/oluk-experience-lab/app/design-system/openlab-product-experience.json");
const currentState = await readJson("authority/CURRENT-STATE.json");
const designContractRaw = await readFile(path.join(repoRoot, "authority/generated/OLUK-DESIGN-CONTRACT.json"), "utf8");
const baseline = await readJson("sites/oluk-experience-lab/tests/visual-baselines/manifest.json");
const receipt = await readFile(path.join(repoRoot, "authority/receipts/WAVES-0-6-GOVERNED-SITE-REFERENCE.md"), "utf8");
const studioReceipt = await readFile(path.join(repoRoot, "authority/receipts/CHAMPION-REVIEW-STUDIO.md"), "utf8");
const sourceGitSha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
const sourceTreeHash = execFileSync("git", ["rev-parse", "HEAD^{tree}"], { cwd: repoRoot, encoding: "utf8" }).trim();
const generatedAt = execFileSync("git", ["show", "-s", "--format=%cI", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
const maturityCounts = Object.fromEntries(routeLedger.maturityStates.map((state) => [state, routeLedger.routes.filter((route) => route.maturity === state).length]));
const proof = (id, passed, detail) => ({ id, status: passed ? "PASS" : "MISSING", detail });
const contractProof = currentState.sitesImplementation.validation.contractProofDetails;
const payload = {
  schemaVersion: "oluk.review-studio-payload.v1",
  status: contract.status,
  generatedAt,
  sourceGitSha,
  sourceTreeHash,
  designContractHash: sha(designContractRaw),
  decisionCount: contract.decisionCount,
  families: contract.families,
  moduleGroups: contract.moduleGroups,
  governance: contract.governance,
  routeLedger: { routeCount: routeLedger.routes.length, maturityCounts },
  componentRegistry: { count: componentRegistry.components.length, runtimeAuthority: componentRegistry.runtimeAuthority },
  figmaIntent: { sourceCount: figmaIntent.sources.length, status: figmaIntent.status },
  designSync: {
    fileKey: designSync.fileKey,
    modulesPage: designSync.figmaPages.modules,
    routesPage: designSync.figmaPages.routes,
    records: designSync.records.map((record) => ({
      id: record.id,
      codeExport: record.codeExport,
      consumingRoutes: record.consumingRoutes,
      mobileStrategy: record.mobileStrategy,
      status: record.status,
      desktopNodeId: record.figmaReference.desktopNodeId,
      mobileNodeId: record.figmaReference.mobileNodeId,
    })),
  },
  openLabExperience: {
    schemaVersion: openLabExperience.schemaVersion,
    sourceContract: openLabExperience.sourceContract,
    sourceHash: openLabExperience.sourceHash,
    product: openLabExperience.product.slug,
    chartPolicy: openLabExperience.interactionContract.chartPolicy,
    figmaMirror: "PENDING_NATIVE_MIRROR",
  },
  visualEvidence: {
    routeCount: baseline.routeCount,
    widthCount: baseline.widthCount,
    reviewed: baseline.cases.filter((entry) => entry.state === "REVIEWED_BASELINE").length,
    capturedUnreviewed: baseline.cases.filter((entry) => entry.state === "CAPTURED_UNREVIEWED").length,
    pending: baseline.cases.filter((entry) => entry.state === "PENDING_CAPTURE").length,
    disposition: "MACHINE_EVIDENCE_NOT_CHAMPION_REVIEW_WORKLOAD"
  },
  proofs: [
    proof("static", /Node suite: \d+\/\d+ PASS/.test(studioReceipt), "Build, typecheck, lint and static test suite"),
    proof("tokens", contractProof.tokenManifest.activeVariables === 112 && contractProof.tokenManifest.cssCustomProperties === 128, "112 governed variables and 128 CSS properties"),
    proof("provenance", contractProof.componentProvenance.passed === 71, "Canonical component provenance"),
    proof("bridge", contractProof.figmaCodeBridge.passed === 290, "Repository-owned mapping bridge"),
    proof("four-width", /160\/160 PASS/.test(receipt), "40 routes at 1440, 1024, 768 and 390"),
    proof("accessibility", /80\/80 PASS/.test(receipt), "Automated accessibility smoke"),
    proof("contrast", /38\/38 PASS/.test(receipt), "Contrast, 200% reflow and long-copy"),
    proof("interactions", /35\/35 PASS/.test(receipt), "Interactions and static transaction boundary")
  ],
  manualReview: { axeIncompleteCount: 38, classification: "MANUAL_REVIEW_REQUIRED_NOT_VIOLATION" }
};
const output = `${JSON.stringify(payload, null, 2)}\n`;
const outputPath = path.join(siteRoot, "public/.well-known/oluk-review-studio.json");
const moduleOutputPath = path.join(siteRoot, "app/design-system/review-studio-payload.json");
if (process.argv.includes("--check")) {
  const existing = await readFile(outputPath, "utf8");
  const moduleExisting = await readFile(moduleOutputPath, "utf8");
  const parsed = JSON.parse(existing);
  const committedTree = execFileSync("git", ["rev-parse", `${parsed.sourceGitSha}^{tree}`], { cwd: repoRoot, encoding: "utf8" }).trim();
  if (parsed.sourceTreeHash !== committedTree) throw new Error("Review Studio payload source tree does not match its recorded committed source SHA");
  const materialDiff = spawnSync("git", ["diff", "--quiet", parsed.sourceGitSha, "--", ".", ":(exclude)sites/oluk-experience-lab/public/.well-known/oluk-review-studio.json", ":(exclude)sites/oluk-experience-lab/app/design-system/review-studio-payload.json"], { cwd: repoRoot });
  if (materialDiff.status !== 0) throw new Error("Review Studio payload is stale for the committed source SHA/tree; run npm run review:generate after committing source inputs");
  const stablePayload = { ...payload, generatedAt: execFileSync("git", ["show", "-s", "--format=%cI", parsed.sourceGitSha], { cwd: repoRoot, encoding: "utf8" }).trim(), sourceGitSha: parsed.sourceGitSha, sourceTreeHash: parsed.sourceTreeHash };
  const stableOutput = `${JSON.stringify(stablePayload, null, 2)}\n`;
  if (existing !== stableOutput || moduleExisting !== stableOutput) throw new Error("Review Studio payload content is stale; run npm run review:generate after committing source inputs");
  process.stdout.write(`PASS review studio payload ${payload.designContractHash}\n`);
} else {
  await writeFile(outputPath, output);
  await writeFile(moduleOutputPath, output);
  process.stdout.write(`WROTE review studio payload ${payload.designContractHash}\n`);
}
