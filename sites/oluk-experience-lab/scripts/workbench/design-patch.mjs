#!/usr/bin/env node
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  applyPatch,
  previewPatch,
  readPatch,
  rollbackPatch,
} from "./design-patch-lib.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const defaultRepoRoot = resolve(scriptDir, "../../../..");

function usage() {
  return [
    "Usage:",
    "  node scripts/workbench/design-patch.mjs preview <patch.json> [--repo-root <path>]",
    "  node scripts/workbench/design-patch.mjs apply <patch.json> --confirm <exact-phrase> [--repo-root <path>]",
    "  node scripts/workbench/design-patch.mjs rollback <apply-receipt.json> --confirm <exact-phrase> [--repo-root <path>]",
    "",
    "The CLI writes only allowlisted Design source. It never stages, commits, pushes, or opens a PR.",
  ].join("\n");
}

function parseArguments(argv) {
  const [operation, coordinate, ...rest] = argv;
  if (!operation || !coordinate || !["preview", "apply", "rollback"].includes(operation)) {
    throw new Error(usage());
  }
  let repoRoot = defaultRepoRoot;
  let confirmation = null;
  for (let index = 0; index < rest.length; index += 1) {
    const value = rest[index];
    if (value === "--repo-root") repoRoot = resolve(rest[++index] ?? "");
    else if (value === "--confirm") confirmation = rest[++index] ?? null;
    else throw new Error(`Unknown argument: ${value}\n\n${usage()}`);
  }
  return { operation, coordinate: resolve(coordinate), repoRoot, confirmation };
}

async function main() {
  const args = parseArguments(process.argv.slice(2));
  if (args.operation === "preview") {
    const patch = await readPatch(args.coordinate);
    const result = await previewPatch({ repoRoot: args.repoRoot, patch });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }
  if (!args.confirmation) throw new Error(`${args.operation} requires --confirm with the exact receipt phrase`);
  if (args.operation === "apply") {
    const patch = await readPatch(args.coordinate);
    const result = await applyPatch({ repoRoot: args.repoRoot, patch, confirmation: args.confirmation });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }
  const result = await rollbackPatch({
    repoRoot: args.repoRoot,
    applyReceiptPath: args.coordinate,
    confirmation: args.confirmation,
  });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
