import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, readdir, realpath, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import test from "node:test";
import {
  applyPatch,
  canonicalJson,
  contentDigest,
  expectedPatchId,
  previewPatch,
  rollbackPatch,
} from "../scripts/workbench/design-patch-lib.mjs";

const execFileAsync = promisify(execFile);
const siteRoot = path.resolve(import.meta.dirname, "..");
const repositoryRoot = path.resolve(siteRoot, "../..");
const cliPath = path.resolve(siteRoot, "scripts/workbench/design-patch.mjs");

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

async function git(repoRoot, ...args) {
  return execFileAsync("git", args, { cwd: repoRoot });
}

async function createFixture() {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "oluk-design-patch-"));
  const validationMarker = path.resolve(
    await mkdtemp(path.join(os.tmpdir(), "oluk-design-patch-validation-")),
    "fail",
  );
  const sourcePath = "sites/oluk-experience-lab/app/design-system/metric-rail.tsx";
  const nodeSourcePath = "authority/OLUK-DESIGN-NODE-SOURCE-V1.json";
  const generatedProofPath = "authority/generated/OLUK-DESIGN-PATCH-DERIVED.json";
  const source = [
    "type Props = { compact?: boolean };",
    "export function MetricRail({ compact = false }: Props) {",
    "  return <div data-compact={compact} />;",
    "}",
    "",
  ].join("\n");
  const nodeSource = {
    contract: "OLUK_DESIGN_NODE_SOURCE_V1",
    nodes: [
      {
        id: "component.metric-rail",
        controls: [
          {
            id: "density",
            type: "enum",
            values: ["default", "compact"],
            defaultValue: "default",
            sourceProp: "compact",
            patchable: true,
          },
        ],
      },
    ],
  };
  const nodeSourceText = [
    "{",
    '  "contract": "OLUK_DESIGN_NODE_SOURCE_V1",',
    '  "nodes": [',
    "    {",
    '      "id": "component.metric-rail",',
    '      "controls": [',
    '        {"id": "density", "type": "enum", "values": ["default", "compact"], "defaultValue": "default", "sourceProp": "compact", "patchable": true}',
    "      ]",
    "    }",
    "  ]",
    "}",
    "",
  ].join("\n");
  const nodeContract = { contract: "OLUK_DESIGN_NODE_CONTRACT_V1", nodes: nodeSource.nodes };
  const targets = {
    contract: "OLUK_DESIGN_PATCH_TARGETS_V1",
    schemaVersion: "1.0.0",
    status: "LOCAL_DESIGN_WRITER_ALLOWLIST",
    targetRepository: "oluk-design-system",
    laws: [],
    targets: [
      {
        nodeId: "component.metric-rail",
        sourcePath,
        targetExport: "MetricRail",
        controls: [
          {
            id: "density",
            type: "enum",
            sourceProp: "compact",
            values: ["default", "compact"],
            mapping: { default: false, compact: true },
          },
        ],
        sourceSha256: sha256(source),
        validationCommands: [
          {
            command: process.execPath,
            args: [
              "-e",
              [
                'const fs = require("node:fs");',
                `const source = fs.readFileSync(${JSON.stringify(sourcePath)}, "utf8");`,
                `fs.writeFileSync(${JSON.stringify(generatedProofPath)}, JSON.stringify({ density: source.includes("compact = true") ? "compact" : "default" }, null, 2) + "\\n");`,
              ].join(" "),
            ],
            cwd: ".",
          },
          {
            command: process.execPath,
            args: [
              "-e",
              `process.exit(require("node:fs").existsSync(${JSON.stringify(validationMarker)}) ? 9 : 0)`,
            ],
            cwd: ".",
          },
        ],
      },
    ],
  };
  const schema = { $id: "OLUK_DESIGN_PATCH_V1" };
  const digests = {
    contract: "OLUK_VISUAL_WORKBENCH_DIGESTS_V1",
    artifacts: {
      nodeContract: contentDigest(nodeContract),
      patchTargets: contentDigest(targets),
    },
  };
  await Promise.all([
    mkdir(path.dirname(path.resolve(repoRoot, sourcePath)), { recursive: true }),
    mkdir(path.dirname(path.resolve(repoRoot, nodeSourcePath)), { recursive: true })
      .then(() => writeFile(path.resolve(repoRoot, nodeSourcePath), nodeSourceText)),
    writeJson(path.resolve(repoRoot, "authority/generated/OLUK-DESIGN-NODE-CONTRACT-V1.json"), nodeContract),
    writeJson(path.resolve(repoRoot, "authority/generated/OLUK-DESIGN-PATCH-TARGETS-V1.json"), targets),
    writeJson(path.resolve(repoRoot, "authority/generated/OLUK-DESIGN-PATCH-V1.schema.json"), schema),
    writeJson(path.resolve(repoRoot, "authority/generated/OLUK-VISUAL-WORKBENCH-DIGESTS-V1.json"), digests),
    writeJson(path.resolve(repoRoot, generatedProofPath), { density: "default" }),
  ]);
  await writeFile(path.resolve(repoRoot, sourcePath), source);
  await git(repoRoot, "init", "-q");
  await git(repoRoot, "config", "user.email", "workbench@example.invalid");
  await git(repoRoot, "config", "user.name", "Workbench Test");
  await git(repoRoot, "add", ".");
  await git(repoRoot, "commit", "-qm", "fixture");
  const patch = {
    contract: "OLUK_DESIGN_PATCH_V1",
    nodeId: "component.metric-rail",
    base: {
      nodeContractDigest: digests.artifacts.nodeContract,
      targetRegistryDigest: digests.artifacts.patchTargets,
      sourceSha256: targets.targets[0].sourceSha256,
    },
    changes: { density: "compact" },
    targetRepository: "oluk-design-system",
    targetExport: "MetricRail",
  };
  patch.patchId = expectedPatchId(patch);
  const patchPath = path.resolve(repoRoot, "patch.json");
  // The patch is an external input in normal use. Keep this fixture copy out of
  // the repository so the apply clean-tree guard remains meaningful.
  const externalPatchPath = path.resolve(await mkdtemp(path.join(os.tmpdir(), "oluk-design-patch-input-")), "patch.json");
  await writeJson(externalPatchPath, patch);
  return {
    repoRoot,
    sourcePath,
    nodeSourcePath,
    generatedProofPath,
    source,
    nodeSource,
    nodeSourceText,
    patch,
    patchPath,
    externalPatchPath,
    validationMarker,
  };
}

test("the checked-in writer allowlist exposes only the sanctioned Design controls", async () => {
  const registry = JSON.parse(await readFile(path.resolve(repositoryRoot, "authority/OLUK-DESIGN-PATCH-TARGETS-V1.json"), "utf8"));
  assert.equal(registry.targetRepository, "oluk-design-system");
  assert.deepEqual(registry.targets.map((target) => target.nodeId), ["component.metric-rail", "component.purchase-panel"]);
  assert.deepEqual(registry.targets[0].controls.map((control) => control.id), ["density"]);
  assert.deepEqual(registry.targets[1].controls.map((control) => control.id), ["state", "width", "bottleOptions"]);
  assert.equal("sourceSha256" in registry.targets[0], false, "source hashes belong only in generated output");
});

test("patch IDs are canonical and independent of object key order", () => {
  const first = {
    contract: "OLUK_DESIGN_PATCH_V1",
    nodeId: "component.metric-rail",
    base: { nodeContractDigest: "a".repeat(64), targetRegistryDigest: "b".repeat(64), sourceSha256: "c".repeat(64) },
    changes: { density: "compact" },
    targetRepository: "oluk-design-system",
    targetExport: "MetricRail",
  };
  const second = JSON.parse(canonicalJson(first));
  assert.equal(expectedPatchId(first), expectedPatchId(second));
});

test("preview includes authored and deterministic generated diffs in a git-dir receipt", async () => {
  const fixture = await createFixture();
  const preview = await previewPatch({ repoRoot: fixture.repoRoot, patch: fixture.patch });
  assert.equal(preview.contract, "OLUK_DESIGN_PATCH_PREVIEW_RECEIPT_V1");
  assert.equal(preview.targets.length, 3);
  assert.match(preview.diffs.find((diff) => diff.includes(fixture.sourcePath)) ?? "", /compact = true/);
  assert.match(preview.diffs.find((diff) => diff.includes(fixture.nodeSourcePath)) ?? "", /"defaultValue": "compact"/);
  const semanticDiff = preview.diffs.find((diff) => diff.includes(fixture.nodeSourcePath)) ?? "";
  const semanticChangedLines = semanticDiff
    .split("\n")
    .filter((line) => (/^[+-]/.test(line) && !line.startsWith("---") && !line.startsWith("+++")));
  assert.deepEqual(semanticChangedLines, [
    '-        {"id": "density", "type": "enum", "values": ["default", "compact"], "defaultValue": "default", "sourceProp": "compact", "patchable": true}',
    '+        {"id": "density", "type": "enum", "values": ["default", "compact"], "defaultValue": "compact", "sourceProp": "compact", "patchable": true}',
  ]);
  assert.match(preview.diffs.find((diff) => diff.includes(fixture.generatedProofPath)) ?? "", /"density": "compact"/);
  assert.equal(
    preview.targets.find((target) => target.sourcePath === fixture.generatedProofPath)?.role,
    "deterministic-generated-output",
  );
  const gitDir = (await git(fixture.repoRoot, "rev-parse", "--git-dir")).stdout.trim();
  assert.ok(path.resolve(preview.receiptPath).startsWith(path.resolve(await realpath(fixture.repoRoot), gitDir)));
  assert.match(preview.confirmationPhrase, new RegExp(`^APPLY ${fixture.patch.patchId} [a-f0-9]{64}$`));
  assert.equal((await git(fixture.repoRoot, "status", "--porcelain")).stdout, "");
});

test("apply requires the exact preview phrase, changes no index, and rollback restores the tree", async () => {
  const fixture = await createFixture();
  const preview = await previewPatch({ repoRoot: fixture.repoRoot, patch: fixture.patch });
  await assert.rejects(
    applyPatch({ repoRoot: fixture.repoRoot, patch: fixture.patch, confirmation: "APPLY anything" }),
    /confirmation phrase mismatch/,
  );
  const applied = await applyPatch({
    repoRoot: fixture.repoRoot,
    patch: fixture.patch,
    confirmation: preview.confirmationPhrase,
  });
  assert.equal(applied.contract, "OLUK_DESIGN_PATCH_APPLY_RECEIPT_V1");
  assert.deepEqual(applied.stagedPaths, []);
  assert.match(await readFile(path.resolve(fixture.repoRoot, fixture.sourcePath), "utf8"), /compact = true/);
  assert.equal(
    JSON.parse(await readFile(path.resolve(fixture.repoRoot, fixture.nodeSourcePath), "utf8")).nodes[0].controls[0].defaultValue,
    "compact",
  );
  assert.equal(
    await readFile(path.resolve(fixture.repoRoot, fixture.nodeSourcePath), "utf8"),
    fixture.nodeSourceText.replace('"defaultValue": "default"', '"defaultValue": "compact"'),
  );
  assert.equal((await git(fixture.repoRoot, "diff", "--cached", "--name-only")).stdout, "");
  await assert.rejects(
    rollbackPatch({ repoRoot: fixture.repoRoot, applyReceiptPath: applied.receiptPath, confirmation: "ROLLBACK anything" }),
    /confirmation phrase mismatch/,
  );
  const rolledBack = await rollbackPatch({
    repoRoot: fixture.repoRoot,
    applyReceiptPath: applied.receiptPath,
    confirmation: applied.confirmationPhrase,
  });
  assert.equal(rolledBack.contract, "OLUK_DESIGN_PATCH_ROLLBACK_RECEIPT_V1");
  assert.equal(await readFile(path.resolve(fixture.repoRoot, fixture.sourcePath), "utf8"), fixture.source);
  assert.deepEqual(JSON.parse(await readFile(path.resolve(fixture.repoRoot, fixture.nodeSourcePath), "utf8")), fixture.nodeSource);
  assert.equal(await readFile(path.resolve(fixture.repoRoot, fixture.nodeSourcePath), "utf8"), fixture.nodeSourceText);
  assert.equal((await git(fixture.repoRoot, "status", "--porcelain")).stdout, "");
});

test("validation failure restores both source and semantic contract atomically", async () => {
  const fixture = await createFixture();
  const preview = await previewPatch({ repoRoot: fixture.repoRoot, patch: fixture.patch });
  await writeFile(fixture.validationMarker, "fail\n");
  await assert.rejects(
    applyPatch({ repoRoot: fixture.repoRoot, patch: fixture.patch, confirmation: preview.confirmationPhrase }),
    /validation failed; source restored exactly/,
  );
  assert.equal(await readFile(path.resolve(fixture.repoRoot, fixture.sourcePath), "utf8"), fixture.source);
  assert.deepEqual(JSON.parse(await readFile(path.resolve(fixture.repoRoot, fixture.nodeSourcePath), "utf8")), fixture.nodeSource);
  assert.equal((await git(fixture.repoRoot, "status", "--porcelain")).stdout, "");
  const gitDir = (await git(fixture.repoRoot, "rev-parse", "--git-dir")).stdout.trim();
  const receipts = await readdir(path.resolve(fixture.repoRoot, gitDir, "oluk-visual-workbench/patch-receipts"));
  assert.ok(receipts.some((name) => name.includes(".failure.")));
});

test("stale source digests and dirty repositories fail closed", async () => {
  const fixture = await createFixture();
  const stale = structuredClone(fixture.patch);
  stale.base.sourceSha256 = "f".repeat(64);
  stale.patchId = expectedPatchId(stale);
  await assert.rejects(previewPatch({ repoRoot: fixture.repoRoot, patch: stale }), /source digest is stale/);

  const preview = await previewPatch({ repoRoot: fixture.repoRoot, patch: fixture.patch });
  await writeFile(path.resolve(fixture.repoRoot, "unrelated.txt"), "user work\n");
  await assert.rejects(
    applyPatch({ repoRoot: fixture.repoRoot, patch: fixture.patch, confirmation: preview.confirmationPhrase }),
    /Repository must be clean/,
  );
});

test("the command-line preview uses the same deterministic engine", async () => {
  const fixture = await createFixture();
  const { stdout } = await execFileAsync(process.execPath, [
    cliPath,
    "preview",
    fixture.externalPatchPath,
    "--repo-root",
    fixture.repoRoot,
  ]);
  const result = JSON.parse(stdout);
  assert.equal(result.contract, "OLUK_DESIGN_PATCH_PREVIEW_RECEIPT_V1");
  assert.equal(result.patch.patchId, fixture.patch.patchId);
});
