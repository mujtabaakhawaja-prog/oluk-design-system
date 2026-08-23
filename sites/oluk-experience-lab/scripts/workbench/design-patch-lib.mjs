import { createHash, randomUUID } from "node:crypto";
import {
  lstat,
  mkdtemp,
  mkdir,
  readFile,
  realpath,
  rename,
  rm,
  symlink,
  unlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { spawn } from "node:child_process";
import ts from "typescript";

const PATCH_CONTRACT = "OLUK_DESIGN_PATCH_V1";
const PREVIEW_RECEIPT_CONTRACT = "OLUK_DESIGN_PATCH_PREVIEW_RECEIPT_V1";
const APPLY_RECEIPT_CONTRACT = "OLUK_DESIGN_PATCH_APPLY_RECEIPT_V1";
const FAILURE_RECEIPT_CONTRACT = "OLUK_DESIGN_PATCH_FAILURE_RECEIPT_V1";
const ROLLBACK_RECEIPT_CONTRACT = "OLUK_DESIGN_PATCH_ROLLBACK_RECEIPT_V1";
const TARGET_REPOSITORY = "oluk-design-system";
const RECEIPT_DIRECTORY = "oluk-visual-workbench/patch-receipts";

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

export function canonicalJson(value) {
  return JSON.stringify(stable(value));
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function contentDigest(value) {
  return sha256(canonicalJson(value));
}

function without(object, key) {
  return Object.fromEntries(Object.entries(object).filter(([entryKey]) => entryKey !== key));
}

export function expectedPatchId(patch) {
  return `sha256:${contentDigest(without(patch, "patchId"))}`;
}

function receiptDigest(receipt) {
  const payload = without(without(receipt, "receiptDigest"), "confirmationPhrase");
  return contentDigest(payload);
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function fileSha256(path) {
  return sha256(await readFile(path));
}

function assertExactKeys(value, required, optional, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
  const allowed = new Set([...required, ...optional]);
  const keys = Object.keys(value);
  const missing = required.filter((key) => !(key in value));
  const unknown = keys.filter((key) => !allowed.has(key));
  if (missing.length) throw new Error(`${label} is missing: ${missing.join(", ")}`);
  if (unknown.length) throw new Error(`${label} has unknown fields: ${unknown.join(", ")}`);
}

function assertHexDigest(value, label) {
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/.test(value)) {
    throw new Error(`${label} must be a lowercase sha256 digest`);
  }
}

function validatePatchShape(patch) {
  assertExactKeys(
    patch,
    ["contract", "patchId", "nodeId", "base", "changes", "targetRepository", "targetExport"],
    [],
    "patch",
  );
  if (patch.contract !== PATCH_CONTRACT) throw new Error(`Unsupported patch contract: ${patch.contract}`);
  if (patch.targetRepository !== TARGET_REPOSITORY) {
    throw new Error(`V1 patches target only ${TARGET_REPOSITORY}`);
  }
  if (typeof patch.nodeId !== "string" || !patch.nodeId) throw new Error("patch.nodeId is required");
  if (typeof patch.targetExport !== "string" || !patch.targetExport) throw new Error("patch.targetExport is required");
  assertExactKeys(
    patch.base,
    ["nodeContractDigest", "targetRegistryDigest", "sourceSha256"],
    [],
    "patch.base",
  );
  assertHexDigest(patch.base.nodeContractDigest, "patch.base.nodeContractDigest");
  assertHexDigest(patch.base.targetRegistryDigest, "patch.base.targetRegistryDigest");
  assertHexDigest(patch.base.sourceSha256, "patch.base.sourceSha256");
  if (!patch.changes || typeof patch.changes !== "object" || Array.isArray(patch.changes)) {
    throw new Error("patch.changes must be an object");
  }
  if (Object.keys(patch.changes).length === 0) throw new Error("patch.changes must not be empty");
  for (const [key, value] of Object.entries(patch.changes)) {
    if (!key || !["string", "number", "boolean"].includes(typeof value)) {
      throw new Error(`patch.changes.${key} must be a string, number, or boolean`);
    }
  }
  const expected = expectedPatchId(patch);
  if (patch.patchId !== expected) throw new Error(`Patch ID mismatch: expected ${expected}`);
}

async function run(command, args, options = {}) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env ?? process.env,
      stdio: options.capture === false ? "inherit" : ["ignore", "pipe", "pipe"],
      shell: false,
    });
    let stdout = "";
    let stderr = "";
    if (options.capture !== false) {
      child.stdout.on("data", (chunk) => { stdout += chunk; });
      child.stderr.on("data", (chunk) => { stderr += chunk; });
    }
    child.on("error", rejectPromise);
    child.on("close", (code, signal) => {
      const result = { command, args, code, signal, stdout, stderr };
      if (code === 0) resolvePromise(result);
      else {
        const error = new Error(`${command} ${args.join(" ")} failed with exit ${code}${stderr ? `\n${stderr.trim()}` : ""}`);
        error.result = result;
        rejectPromise(error);
      }
    });
  });
}

async function git(repoRoot, args) {
  return run("git", args, { cwd: repoRoot });
}

async function gitText(repoRoot, args) {
  return (await git(repoRoot, args)).stdout.trim();
}

async function gitHead(repoRoot) {
  return gitText(repoRoot, ["rev-parse", "HEAD"]);
}

async function gitDirectory(repoRoot) {
  const path = await gitText(repoRoot, ["rev-parse", "--git-dir"]);
  return isAbsolute(path) ? path : resolve(repoRoot, path);
}

function parseStatus(output) {
  if (!output) return [];
  const entries = output.split("\0").filter(Boolean);
  const paths = [];
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const code = entry.slice(0, 2);
    const path = entry.slice(3);
    if (!path) continue;
    paths.push({ code, path });
    if (code.includes("R") || code.includes("C")) index += 1;
  }
  return paths;
}

async function gitStatus(repoRoot, path) {
  const args = ["status", "--porcelain=v1", "-z", "--untracked-files=all"];
  if (path) args.push("--", path);
  return parseStatus((await git(repoRoot, args)).stdout);
}

function assertCleanStatus(status, label) {
  if (status.length) {
    throw new Error(`${label} must be clean: ${status.map((entry) => `${entry.code} ${entry.path}`).join(", ")}`);
  }
}

function assertSafeRelativePath(path, label) {
  if (typeof path !== "string" || !path || isAbsolute(path)) throw new Error(`${label} must be a relative path`);
  if (path.split(/[\\/]/).includes("..")) throw new Error(`${label} may not traverse outside the repository`);
}

async function resolveOwnedFile(repoRoot, sourcePath) {
  assertSafeRelativePath(sourcePath, "target.sourcePath");
  const absolute = resolve(repoRoot, sourcePath);
  const rootReal = await realpath(repoRoot);
  const fileReal = await realpath(absolute);
  const rel = relative(rootReal, fileReal);
  if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new Error(`Target escapes repository root: ${sourcePath}`);
  }
  const stat = await lstat(fileReal);
  if (!stat.isFile()) throw new Error(`Target is not a regular file: ${sourcePath}`);
  return fileReal;
}

async function atomicWrite(path, content) {
  const temporary = `${path}.oluk-patch-${process.pid}-${randomUUID()}`;
  await writeFile(temporary, content);
  await rename(temporary, path);
}

function literalFor(control, value) {
  if (control.type === "enum") {
    if (!control.values?.includes(value)) throw new Error(`${control.id} does not allow ${String(value)}`);
    const mapped = control.mapping ? control.mapping[value] : value;
    if (!["string", "number", "boolean"].includes(typeof mapped)) {
      throw new Error(`${control.id} maps to an unsupported source value`);
    }
    return typeof mapped === "string" ? JSON.stringify(mapped) : String(mapped);
  }
  if (control.type === "boolean") {
    if (typeof value !== "boolean") throw new Error(`${control.id} requires a boolean`);
    return String(value);
  }
  if (control.type === "number") {
    if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`${control.id} requires a finite number`);
    if (typeof control.minimum === "number" && value < control.minimum) throw new Error(`${control.id} is below its minimum`);
    if (typeof control.maximum === "number" && value > control.maximum) throw new Error(`${control.id} is above its maximum`);
    return String(value);
  }
  throw new Error(`Unsupported control type: ${control.type}`);
}

function propertyName(binding) {
  const node = binding.propertyName ?? binding.name;
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  return null;
}

function findExportedFunction(sourceFile, exportName) {
  const matches = sourceFile.statements.filter(
    (statement) => ts.isFunctionDeclaration(statement) && statement.name?.text === exportName,
  );
  if (matches.length !== 1) throw new Error(`Expected one function export named ${exportName}; found ${matches.length}`);
  const declaration = matches[0];
  const exported = declaration.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
  if (!exported) throw new Error(`${exportName} is not an exported function declaration`);
  return declaration;
}

export function transformSource({ source, sourcePath, targetExport, controls, changes }) {
  const sourceFile = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  if (sourceFile.parseDiagnostics.length) {
    throw new Error(`Target source does not parse before patch: ${sourceFile.parseDiagnostics[0].messageText}`);
  }
  const declaration = findExportedFunction(sourceFile, targetExport);
  const parameter = declaration.parameters[0];
  if (!parameter || !ts.isObjectBindingPattern(parameter.name)) {
    throw new Error(`${targetExport} must use a destructured first parameter`);
  }
  const bindings = new Map(parameter.name.elements.map((element) => [propertyName(element), element]));
  const controlsById = new Map(controls.map((control) => [control.id, control]));
  const edits = [];
  for (const [controlId, value] of Object.entries(changes)) {
    const control = controlsById.get(controlId);
    if (!control) throw new Error(`Unknown or unallowlisted control: ${controlId}`);
    const binding = bindings.get(control.sourceProp);
    if (!binding) throw new Error(`${targetExport} has no destructured prop named ${control.sourceProp}`);
    if (!binding.initializer) throw new Error(`${targetExport}.${control.sourceProp} has no default initializer`);
    edits.push({
      start: binding.initializer.getStart(sourceFile),
      end: binding.initializer.getEnd(),
      replacement: literalFor(control, value),
    });
  }
  edits.sort((left, right) => right.start - left.start);
  let candidate = source;
  for (const edit of edits) candidate = `${candidate.slice(0, edit.start)}${edit.replacement}${candidate.slice(edit.end)}`;
  if (candidate === source) throw new Error("Patch does not change the target source");
  const parsedCandidate = ts.createSourceFile(sourcePath, candidate, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  if (parsedCandidate.parseDiagnostics.length) {
    throw new Error(`Target source does not parse after patch: ${parsedCandidate.parseDiagnostics[0].messageText}`);
  }
  return candidate;
}

function jsonProperty(object, name) {
  if (!ts.isObjectLiteralExpression(object)) return null;
  const matches = object.properties.filter(
    (property) => ts.isPropertyAssignment(property) && propertyName(property) === name,
  );
  if (matches.length > 1) throw new Error(`Semantic JSON contains duplicate ${name} properties`);
  return matches[0] ?? null;
}

function jsonStringProperty(object, name) {
  const property = jsonProperty(object, name);
  return property && ts.isStringLiteral(property.initializer) ? property.initializer.text : null;
}

function transformNodeSource({ source, nodeId, controls, changes }) {
  // Parse once as ordinary JSON for semantic validation and once as a JSON AST
  // so the patch can replace only the declared default-value literal. Rewriting
  // the whole document with JSON.stringify would create unrelated formatting
  // churn in this deliberately compact authority source.
  const document = JSON.parse(source);
  const semanticMatches = document.nodes?.filter((entry) => entry.id === nodeId) ?? [];
  if (semanticMatches.length !== 1) {
    throw new Error(`Expected one semantic source node named ${nodeId}; found ${semanticMatches.length}`);
  }
  const node = semanticMatches[0];
  const semanticControls = new Map((node.controls ?? []).map((control) => [control.id, control]));
  const allowlistedControls = new Map(controls.map((control) => [control.id, control]));

  const sourceFile = ts.parseJsonText("OLUK-DESIGN-NODE-SOURCE-V1.json", source);
  if (sourceFile.parseDiagnostics.length) {
    throw new Error(`Semantic source does not parse before patch: ${sourceFile.parseDiagnostics[0].messageText}`);
  }
  const root = sourceFile.statements[0]?.expression;
  const nodesProperty = root && jsonProperty(root, "nodes");
  if (!nodesProperty || !ts.isArrayLiteralExpression(nodesProperty.initializer)) {
    throw new Error("Semantic source nodes must be a JSON array");
  }
  const astNodes = nodesProperty.initializer.elements.filter(
    (entry) => ts.isObjectLiteralExpression(entry) && jsonStringProperty(entry, "id") === nodeId,
  );
  if (astNodes.length !== 1) {
    throw new Error(`Expected one semantic JSON node named ${nodeId}; found ${astNodes.length}`);
  }
  const controlsProperty = jsonProperty(astNodes[0], "controls");
  if (!controlsProperty || !ts.isArrayLiteralExpression(controlsProperty.initializer)) {
    throw new Error(`Semantic source controls must be an array: ${nodeId}`);
  }
  const edits = [];
  for (const [controlId, value] of Object.entries(changes)) {
    const semanticControl = semanticControls.get(controlId);
    const allowlistedControl = allowlistedControls.get(controlId);
    if (!semanticControl || !allowlistedControl) throw new Error(`Semantic control is missing: ${nodeId}.${controlId}`);
    if (!semanticControl.patchable) throw new Error(`Semantic control is not patchable: ${nodeId}.${controlId}`);
    if (semanticControl.type !== allowlistedControl.type || semanticControl.sourceProp !== allowlistedControl.sourceProp) {
      throw new Error(`Semantic control drift: ${nodeId}.${controlId}`);
    }
    // literalFor performs the complete type/range/enum validation. The contract
    // stores the user-facing control value, while the TS initializer receives
    // any allowlisted source mapping (for example density -> compact boolean).
    literalFor(allowlistedControl, value);
    literalFor(semanticControl, value);
    semanticControl.defaultValue = value;
    const astControls = controlsProperty.initializer.elements.filter(
      (entry) => ts.isObjectLiteralExpression(entry) && jsonStringProperty(entry, "id") === controlId,
    );
    if (astControls.length !== 1) {
      throw new Error(`Expected one semantic JSON control named ${nodeId}.${controlId}; found ${astControls.length}`);
    }
    const defaultValueProperty = jsonProperty(astControls[0], "defaultValue");
    if (!defaultValueProperty) throw new Error(`Semantic control has no defaultValue: ${nodeId}.${controlId}`);
    edits.push({
      start: defaultValueProperty.initializer.getStart(sourceFile),
      end: defaultValueProperty.initializer.getEnd(),
      replacement: JSON.stringify(value),
    });
  }
  edits.sort((left, right) => right.start - left.start);
  let candidate = source;
  for (const edit of edits) candidate = `${candidate.slice(0, edit.start)}${edit.replacement}${candidate.slice(edit.end)}`;
  if (candidate === source) throw new Error("Patch does not change the semantic node source");
  const parsedCandidate = JSON.parse(candidate);
  if (canonicalJson(parsedCandidate) !== canonicalJson(document)) {
    throw new Error("Semantic byte-range patch changed data outside the declared control");
  }
  return candidate;
}

async function unifiedDiff(repoRoot, sourcePath, before, after) {
  const gitDir = await gitDirectory(repoRoot);
  const temporaryDir = resolve(gitDir, RECEIPT_DIRECTORY, "tmp");
  await mkdir(temporaryDir, { recursive: true });
  const token = randomUUID();
  const beforePath = resolve(temporaryDir, `${token}.before`);
  const afterPath = resolve(temporaryDir, `${token}.after`);
  await Promise.all([writeFile(beforePath, before), writeFile(afterPath, after)]);
  try {
    const result = await run("git", ["diff", "--no-index", "--", beforePath, afterPath], { cwd: repoRoot }).catch((error) => {
      if (error.result?.code === 1) return error.result;
      throw error;
    });
    return result.stdout
      .replace(/^diff --git .*$/m, `diff --git a/${sourcePath} b/${sourcePath}`)
      .replace(/^--- .*$/m, `--- a/${sourcePath}`)
      .replace(/^\+\+\+ .*$/m, `+++ b/${sourcePath}`);
  } finally {
    await Promise.all([unlink(beforePath).catch(() => {}), unlink(afterPath).catch(() => {})]);
  }
}

async function loadAuthority(repoRoot) {
  const generatedDir = resolve(repoRoot, "authority/generated");
  const paths = {
    nodeContract: resolve(generatedDir, "OLUK-DESIGN-NODE-CONTRACT-V1.json"),
    targets: resolve(generatedDir, "OLUK-DESIGN-PATCH-TARGETS-V1.json"),
    schema: resolve(generatedDir, "OLUK-DESIGN-PATCH-V1.schema.json"),
    digests: resolve(generatedDir, "OLUK-VISUAL-WORKBENCH-DIGESTS-V1.json"),
  };
  const [nodeContract, targets, schema, digests] = await Promise.all(Object.values(paths).map(readJson));
  if (schema.$id !== PATCH_CONTRACT) throw new Error("Generated patch schema is not OLUK_DESIGN_PATCH_V1");
  if (targets.contract !== "OLUK_DESIGN_PATCH_TARGETS_V1") throw new Error("Generated patch target registry is invalid");
  if (targets.targetRepository !== TARGET_REPOSITORY) throw new Error("Generated patch target registry owns the wrong repository");
  const nodeContractDigest = contentDigest(nodeContract);
  const targetRegistryDigest = contentDigest(targets);
  if (digests.artifacts?.nodeContract !== nodeContractDigest) throw new Error("Generated node-contract digest drift");
  if (digests.artifacts?.patchTargets !== targetRegistryDigest) throw new Error("Generated target-registry digest drift");
  return { nodeContract, targets, schema, digests, nodeContractDigest, targetRegistryDigest };
}

async function resolvePatch(repoRoot, patch) {
  validatePatchShape(patch);
  const authority = await loadAuthority(repoRoot);
  if (patch.base.nodeContractDigest !== authority.nodeContractDigest) throw new Error("Patch node-contract digest is stale");
  if (patch.base.targetRegistryDigest !== authority.targetRegistryDigest) throw new Error("Patch target-registry digest is stale");
  const target = authority.targets.targets.find((entry) => entry.nodeId === patch.nodeId);
  if (!target) throw new Error(`Patch node is not allowlisted: ${patch.nodeId}`);
  if (target.targetExport !== patch.targetExport) throw new Error("Patch target export does not match the allowlist");
  const sourcePath = target.sourcePath;
  const sourceAbsolutePath = await resolveOwnedFile(repoRoot, sourcePath);
  const nodeSourcePath = "authority/OLUK-DESIGN-NODE-SOURCE-V1.json";
  const nodeSourceAbsolutePath = await resolveOwnedFile(repoRoot, nodeSourcePath);
  const actualSourceSha256 = await fileSha256(sourceAbsolutePath);
  if (target.sourceSha256 !== actualSourceSha256) throw new Error("Generated target source digest drift");
  if (patch.base.sourceSha256 !== actualSourceSha256) throw new Error("Patch target source digest is stale");
  const before = await readFile(sourceAbsolutePath, "utf8");
  const after = transformSource({
    source: before,
    sourcePath,
    targetExport: patch.targetExport,
    controls: target.controls,
    changes: patch.changes,
  });
  const nodeSourceBefore = await readFile(nodeSourceAbsolutePath, "utf8");
  const nodeSourceAfter = transformNodeSource({
    source: nodeSourceBefore,
    nodeId: patch.nodeId,
    controls: target.controls,
    changes: patch.changes,
  });
  if (nodeSourceAfter === nodeSourceBefore) throw new Error("Patch does not change the semantic node source");
  return {
    authority,
    target,
    sourcePath,
    sourceAbsolutePath,
    before,
    after,
    nodeSourcePath,
    nodeSourceAbsolutePath,
    nodeSourceBefore,
    nodeSourceAfter,
  };
}

async function receiptsDirectory(repoRoot) {
  const directory = resolve(await gitDirectory(repoRoot), RECEIPT_DIRECTORY);
  await mkdir(directory, { recursive: true });
  return directory;
}

function patchToken(patch) {
  if (!patch || typeof patch.patchId !== "string" || !/^sha256:[a-f0-9]{64}$/.test(patch.patchId)) {
    throw new Error("Patch ID must be a canonical sha256 coordinate");
  }
  return patch.patchId.slice("sha256:".length);
}

async function writeReceipt(repoRoot, filename, receipt) {
  const directory = await receiptsDirectory(repoRoot);
  const path = resolve(directory, filename);
  await writeFile(path, `${JSON.stringify(receipt, null, 2)}\n`, { flag: "wx" });
  return path;
}

export async function previewPatch({ repoRoot, patch }) {
  const root = await realpath(repoRoot);
  const resolved = await resolvePatch(root, patch);
  assertCleanStatus(await gitStatus(root), "Repository");
  const head = await gitHead(root);
  const simulation = await simulateCandidate(root, head, resolved);
  const receipt = {
    contract: PREVIEW_RECEIPT_CONTRACT,
    schemaVersion: "1.0.0",
    createdAt: new Date().toISOString(),
    patch,
    gitHead: head,
    targets: simulation.targets,
    diffs: simulation.diffs,
    validationCommands: resolved.target.validationCommands ?? [],
    validationResults: simulation.validationResults,
    rollbackPlan: {
      gitHead: head,
      paths: simulation.targets.map((target) => target.sourcePath),
      strategy: "RESTORE_EXACT_BASE_HEAD_BYTES",
    },
  };
  receipt.receiptDigest = receiptDigest(receipt);
  receipt.confirmationPhrase = `APPLY ${patch.patchId} ${receipt.receiptDigest}`;
  const receiptPath = await writeReceipt(root, `${patchToken(patch)}.preview.${receipt.receiptDigest}.json`, receipt);
  return { ...receipt, receiptPath };
}

async function loadPreviewReceipt(repoRoot, patch, confirmation) {
  const expectedPrefix = `APPLY ${patch.patchId} `;
  if (typeof confirmation !== "string" || !confirmation.startsWith(expectedPrefix)) {
    throw new Error("Explicit apply confirmation phrase mismatch");
  }
  const digest = confirmation.slice(expectedPrefix.length);
  assertHexDigest(digest, "preview receipt digest in confirmation phrase");
  const path = resolve(await receiptsDirectory(repoRoot), `${patchToken(patch)}.preview.${digest}.json`);
  const receipt = await readJson(path).catch(() => {
    throw new Error(`Missing preview receipt. Run preview first: ${path}`);
  });
  if (receipt.contract !== PREVIEW_RECEIPT_CONTRACT) throw new Error("Preview receipt contract mismatch");
  if (receipt.receiptDigest !== receiptDigest(receipt)) throw new Error("Preview receipt digest mismatch");
  if (canonicalJson(receipt.patch) !== canonicalJson(patch)) throw new Error("Preview receipt was created for a different patch");
  return { path, receipt };
}

async function currentChangedPaths(repoRoot) {
  return (await gitStatus(repoRoot)).map((entry) => entry.path);
}

async function pathExists(path) {
  try {
    await lstat(path);
    return true;
  } catch {
    return false;
  }
}

async function gitBlob(repoRoot, head, path) {
  const result = await git(repoRoot, ["show", `${head}:${path}`]).catch((error) => {
    if (error.result?.code !== 0) return null;
    throw error;
  });
  return result?.stdout ?? null;
}

async function restorePaths(repoRoot, head, paths) {
  for (const path of paths) {
    assertSafeRelativePath(path, "restore path");
    const absolute = resolve(repoRoot, path);
    const content = await gitBlob(repoRoot, head, path);
    if (content === null) {
      if (await pathExists(absolute)) await unlink(absolute);
    } else {
      await mkdir(dirname(absolute), { recursive: true });
      await atomicWrite(absolute, content);
    }
  }
}

async function runValidations(repoRoot, commands) {
  const results = [];
  for (const entry of commands) {
    assertExactKeys(entry, ["command", "args", "cwd"], [], "validation command");
    if (typeof entry.command !== "string" || !entry.command) throw new Error("validation command is required");
    if (!Array.isArray(entry.args) || entry.args.some((arg) => typeof arg !== "string")) {
      throw new Error("validation args must be strings");
    }
    assertSafeRelativePath(entry.cwd, "validation cwd");
    const cwd = resolve(repoRoot, entry.cwd);
    const rootReal = await realpath(repoRoot);
    const cwdReal = await realpath(cwd);
    const rel = relative(rootReal, cwdReal);
    if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) throw new Error("validation cwd escapes repository");
    const result = await run(entry.command, entry.args, { cwd: cwdReal });
    results.push({ command: entry.command, args: entry.args, cwd: entry.cwd, stdout: result.stdout, stderr: result.stderr });
  }
  return results;
}

async function hashChangedPaths(repoRoot, head, paths) {
  const records = [];
  for (const path of [...new Set(paths)].sort()) {
    const absolute = resolve(repoRoot, path);
    const before = await gitBlob(repoRoot, head, path);
    const afterExists = await pathExists(absolute);
    records.push({
      path,
      beforeSha256: before === null ? null : sha256(before),
      afterSha256: afterExists ? await fileSha256(absolute) : null,
      trackedAtBase: before !== null,
    });
  }
  return records;
}

function pathRole(path, resolved) {
  if (path === resolved.sourcePath) return "component-source";
  if (path === resolved.nodeSourcePath) return "semantic-contract-source";
  return "deterministic-generated-output";
}

async function simulateCandidate(repoRoot, head, resolved) {
  const simulationRoot = await mkdtemp(resolve(tmpdir(), "oluk-design-patch-preview-"));
  try {
    await run("git", ["clone", "--quiet", "--no-hardlinks", "--no-checkout", repoRoot, simulationRoot]);
    await run("git", ["checkout", "--quiet", "--detach", head], { cwd: simulationRoot });

    const dependencyPath = "sites/oluk-experience-lab/node_modules";
    const sourceDependencies = resolve(repoRoot, dependencyPath);
    if (await pathExists(sourceDependencies)) {
      const simulatedDependencies = resolve(simulationRoot, dependencyPath);
      await mkdir(dirname(simulatedDependencies), { recursive: true });
      await symlink(sourceDependencies, simulatedDependencies, "dir");
    }

    await atomicWrite(resolve(simulationRoot, resolved.sourcePath), resolved.after);
    await atomicWrite(resolve(simulationRoot, resolved.nodeSourcePath), resolved.nodeSourceAfter);
    const validationResults = await runValidations(
      simulationRoot,
      resolved.target.validationCommands ?? [],
    );
    const changedPaths = await currentChangedPaths(simulationRoot);
    if (!changedPaths.includes(resolved.sourcePath) || !changedPaths.includes(resolved.nodeSourcePath)) {
      throw new Error("Patch simulation lost one or more authored source changes");
    }
    const targets = [];
    const diffs = [];
    for (const path of [...new Set(changedPaths)].sort()) {
      const absolute = resolve(simulationRoot, path);
      const before = await gitBlob(simulationRoot, head, path);
      const after = await readFile(absolute, "utf8");
      targets.push({
        role: pathRole(path, resolved),
        sourcePath: path,
        targetExport:
          path === resolved.sourcePath
            ? resolved.target.targetExport
            : path === resolved.nodeSourcePath
              ? resolved.target.nodeId
              : null,
        beforeSha256: before === null ? null : sha256(before),
        afterSha256: sha256(after),
      });
      diffs.push(await unifiedDiff(simulationRoot, path, before ?? "", after));
    }
    return { targets, diffs, validationResults };
  } finally {
    await rm(simulationRoot, { recursive: true, force: true });
  }
}

export async function applyPatch({ repoRoot, patch, confirmation }) {
  const root = await realpath(repoRoot);
  validatePatchShape(patch);
  const preview = await loadPreviewReceipt(root, patch, confirmation);
  if (confirmation !== preview.receipt.confirmationPhrase) throw new Error("Explicit apply confirmation phrase mismatch");
  assertCleanStatus(await gitStatus(root), "Repository");
  const head = await gitHead(root);
  if (head !== preview.receipt.gitHead) throw new Error("Git HEAD changed after preview");
  const resolved = await resolvePatch(root, patch);
  const expectedTargets = new Map(preview.receipt.targets.map((entry) => [entry.sourcePath, entry]));
  if (sha256(resolved.after) !== expectedTargets.get(resolved.sourcePath)?.afterSha256) {
    throw new Error("Component patch output changed after preview");
  }
  if (sha256(resolved.nodeSourceAfter) !== expectedTargets.get(resolved.nodeSourcePath)?.afterSha256) {
    throw new Error("Semantic contract patch output changed after preview");
  }
  let validationResults = [];
  let pathReceipts = [];
  try {
    await atomicWrite(resolved.sourceAbsolutePath, resolved.after);
    await atomicWrite(resolved.nodeSourceAbsolutePath, resolved.nodeSourceAfter);
    validationResults = await runValidations(root, resolved.target.validationCommands ?? []);
    const changedPaths = await currentChangedPaths(root);
    const expectedPaths = new Set(expectedTargets.keys());
    const actualPaths = new Set(changedPaths);
    const unexpected = [...actualPaths].filter((path) => !expectedPaths.has(path));
    const missing = [...expectedPaths].filter((path) => !actualPaths.has(path));
    if (unexpected.length || missing.length) {
      throw new Error(
        `Applied output drift; unexpected: ${unexpected.join(", ") || "none"}; missing: ${missing.join(", ") || "none"}`,
      );
    }
    pathReceipts = await hashChangedPaths(root, head, changedPaths);
    for (const entry of pathReceipts) {
      const expected = expectedTargets.get(entry.path);
      if (
        !expected ||
        entry.beforeSha256 !== expected.beforeSha256 ||
        entry.afterSha256 !== expected.afterSha256
      ) {
        throw new Error(`Applied output digest drift: ${entry.path}`);
      }
    }
  } catch (error) {
    const transactionalPaths = await currentChangedPaths(root);
    let restored = false;
    let restoreError = null;
    try {
      await restorePaths(root, head, transactionalPaths);
      assertCleanStatus(await gitStatus(root), "Repository after failed-apply restore");
      restored = true;
    } catch (caught) {
      restoreError = caught instanceof Error ? caught.message : String(caught);
    }
    const failure = {
      contract: FAILURE_RECEIPT_CONTRACT,
      schemaVersion: "1.0.0",
      createdAt: new Date().toISOString(),
      patchId: patch.patchId,
      gitHead: head,
      error: error instanceof Error ? error.message : String(error),
      transactionalPaths,
      restored,
      restoreError,
    };
    failure.receiptDigest = receiptDigest(failure);
    await writeReceipt(root, `${patchToken(patch)}.failure.${failure.receiptDigest}.json`, failure);
    if (!restored) throw new Error(`Patch validation failed and atomic restore failed: ${failure.error}; ${restoreError}`);
    throw new Error(`Patch validation failed; source restored exactly: ${failure.error}`);
  }
  if (!pathReceipts.some((entry) => entry.path === resolved.sourcePath)) {
    throw new Error("Applied patch did not leave its target source modified");
  }
  const receipt = {
    contract: APPLY_RECEIPT_CONTRACT,
    schemaVersion: "1.0.0",
    createdAt: new Date().toISOString(),
    patch,
    previewReceiptDigest: preview.receipt.receiptDigest,
    gitHead: head,
    changedPaths: pathReceipts,
    validationResults,
    stagedPaths: (await gitStatus(root)).filter((entry) => entry.code[0] !== " " && entry.code[0] !== "?").map((entry) => entry.path),
    mutationBoundaries: {
      staged: false,
      committed: false,
      pushed: false,
      pullRequestOpened: false,
    },
  };
  if (receipt.stagedPaths.length) throw new Error(`Patch writer staged files unexpectedly: ${receipt.stagedPaths.join(", ")}`);
  receipt.receiptDigest = receiptDigest(receipt);
  receipt.confirmationPhrase = `ROLLBACK ${receipt.receiptDigest}`;
  const receiptPath = await writeReceipt(root, `${patchToken(patch)}.apply.${receipt.receiptDigest}.json`, receipt);
  return { ...receipt, receiptPath };
}

async function verifyAppliedState(repoRoot, receipt) {
  const status = await gitStatus(repoRoot);
  const expected = new Set(receipt.changedPaths.map((entry) => entry.path));
  const actual = new Set(status.map((entry) => entry.path));
  const unexpected = [...actual].filter((path) => !expected.has(path));
  const missing = [...expected].filter((path) => !actual.has(path));
  if (unexpected.length || missing.length) {
    throw new Error(`Rollback state drift; unexpected: ${unexpected.join(", ") || "none"}; missing: ${missing.join(", ") || "none"}`);
  }
  for (const entry of receipt.changedPaths) {
    assertSafeRelativePath(entry.path, "apply receipt path");
    const absolute = resolve(repoRoot, entry.path);
    const exists = await pathExists(absolute);
    const current = exists ? await fileSha256(absolute) : null;
    if (current !== entry.afterSha256) throw new Error(`Rollback source drift: ${entry.path}`);
  }
}

export async function rollbackPatch({ repoRoot, applyReceiptPath, confirmation }) {
  const root = await realpath(repoRoot);
  const receiptRoot = await realpath(await receiptsDirectory(root));
  const resolvedApplyReceiptPath = await realpath(resolve(applyReceiptPath));
  const receiptRelative = relative(receiptRoot, resolvedApplyReceiptPath);
  if (receiptRelative === ".." || receiptRelative.startsWith(`..${sep}`) || isAbsolute(receiptRelative)) {
    throw new Error("Apply receipt must be inside the repository Git receipt directory");
  }
  const receipt = await readJson(resolvedApplyReceiptPath);
  if (receipt.contract !== APPLY_RECEIPT_CONTRACT) throw new Error("Apply receipt contract mismatch");
  if (receipt.receiptDigest !== receiptDigest(receipt)) throw new Error("Apply receipt digest mismatch");
  validatePatchShape(receipt.patch);
  if (confirmation !== receipt.confirmationPhrase) throw new Error("Explicit rollback confirmation phrase mismatch");
  const head = await gitHead(root);
  if (head !== receipt.gitHead) throw new Error("Git HEAD changed after apply");
  await verifyAppliedState(root, receipt);
  const paths = receipt.changedPaths.map((entry) => entry.path);
  try {
    await restorePaths(root, receipt.gitHead, paths);
    assertCleanStatus(await gitStatus(root), "Repository after rollback");
  } catch (error) {
    throw new Error(`Rollback failed: ${error instanceof Error ? error.message : String(error)}`);
  }
  const rollback = {
    contract: ROLLBACK_RECEIPT_CONTRACT,
    schemaVersion: "1.0.0",
    createdAt: new Date().toISOString(),
    applyReceiptDigest: receipt.receiptDigest,
    gitHead: receipt.gitHead,
    restoredPaths: receipt.changedPaths.map((entry) => ({ path: entry.path, restoredSha256: entry.beforeSha256 })),
    clean: true,
  };
  rollback.receiptDigest = receiptDigest(rollback);
  const receiptPath = await writeReceipt(root, `${patchToken(receipt.patch)}.rollback.${rollback.receiptDigest}.json`, rollback);
  return { ...rollback, receiptPath };
}

export async function readPatch(path) {
  return readJson(resolve(path));
}
