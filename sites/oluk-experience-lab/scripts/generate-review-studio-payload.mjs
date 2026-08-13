#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
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
const currentState = await readJson("authority/CURRENT-STATE.json");
const designContractRaw = await readFile(path.join(repoRoot, "authority/generated/OLUK-DESIGN-CONTRACT.json"), "utf8");
const baseline = await readJson("sites/oluk-experience-lab/tests/visual-baselines/manifest.json");
const receipt = await readFile(path.join(repoRoot, "authority/receipts/WAVES-0-6-GOVERNED-SITE-REFERENCE.md"), "utf8");
const studioReceipt = await readFile(path.join(repoRoot, "authority/receipts/CHAMPION-REVIEW-STUDIO.md"), "utf8");
const sourceGitSha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
const generatedAt = execFileSync("git", ["show", "-s", "--format=%cI", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
const generatedOutputs = new Set([
  "sites/oluk-experience-lab/public/.well-known/oluk-review-studio.json",
  "sites/oluk-experience-lab/app/design-system/review-studio-payload.json",
]);
const changed = execFileSync("git", ["status", "--porcelain", "--untracked-files=all"], { cwd: repoRoot, encoding: "utf8" })
  .split("\n").filter(Boolean).map((line) => line.slice(3)).filter((file)=>!generatedOutputs.has(file)).sort();
const treeParts = [];
for (const relative of changed) {
  try { treeParts.push(`${relative}\0${await readFile(path.join(repoRoot, relative))}`); } catch { treeParts.push(`${relative}\0DELETED`); }
}
const maturityCounts = Object.fromEntries(routeLedger.maturityStates.map((state) => [state, routeLedger.routes.filter((route) => route.maturity === state).length]));
const proof = (id, passed, detail) => ({ id, status: passed ? "PASS" : "MISSING", detail });
const contractProof = currentState.sitesImplementation.validation.contractProofDetails;
const payload = {
  schemaVersion: "oluk.review-studio-payload.v1",
  status: contract.status,
  generatedAt,
  sourceGitSha,
  sourceTreeHash: sha(treeParts.join("\n")),
  designContractHash: sha(designContractRaw),
  decisionCount: contract.decisionCount,
  families: contract.families,
  moduleGroups: contract.moduleGroups,
  governance: contract.governance,
  routeLedger: { routeCount: routeLedger.routes.length, maturityCounts },
  componentRegistry: { count: componentRegistry.components.length, runtimeAuthority: componentRegistry.runtimeAuthority },
  figmaIntent: { sourceCount: figmaIntent.sources.length, status: figmaIntent.status },
  visualEvidence: {
    routeCount: baseline.routeCount,
    widthCount: baseline.widthCount,
    reviewed: baseline.cases.filter((entry) => entry.state === "REVIEWED_BASELINE").length,
    capturedUnreviewed: baseline.cases.filter((entry) => entry.state === "CAPTURED_UNREVIEWED").length,
    pending: baseline.cases.filter((entry) => entry.state === "PENDING_CAPTURE").length,
    disposition: "MACHINE_EVIDENCE_NOT_CHAMPION_REVIEW_WORKLOAD"
  },
  proofs: [
    proof("static", /Node suite: 68\/68 PASS/.test(studioReceipt), "Build, typecheck, lint and 68 tests"),
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
  if (existing !== output || moduleExisting !== output) throw new Error("Review Studio payload is stale; run npm run review:generate");
  process.stdout.write(`PASS review studio payload ${payload.designContractHash}\n`);
} else {
  await writeFile(outputPath, output);
  await writeFile(moduleOutputPath, output);
  process.stdout.write(`WROTE review studio payload ${payload.designContractHash}\n`);
}
