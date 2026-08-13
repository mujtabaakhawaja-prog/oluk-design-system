#!/usr/bin/env node

import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildTokenManifest } from "./token-contract.mjs";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const appRoot = path.join(siteRoot, "app");

const rejectedHex = new Set([
  "#3366ff", "#256dff", "#1842ff", "#2147c4", "#111522", "#101114", "#141b2b",
  "#0d1526", "#4e586d", "#4a5875", "#667085", "#8896b4", "#f1f3f5", "#fafcff",
  "#f7f8fa",
]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(filePath) : [filePath];
  }))).flat();
}

export async function auditCssColorContract() {
  const manifest = await buildTokenManifest();
  const governedSources = [
    ...manifest.colorPrimitives.map(({ valueOrAlias }) => valueOrAlias),
    ...manifest.colorSemantics.flatMap(({ valueOrAlias, cssValue }) => [valueOrAlias, cssValue]),
    ...manifest.governedLiteralGradientExceptions.map(({ value }) => value),
  ].join(" ");
  const governedHex = new Set([...governedSources.matchAll(/#[0-9a-f]{3,8}\b/gi)].map(([value]) => value.toLowerCase()));
  const cssFiles = (await walk(appRoot)).filter((filePath) => filePath.endsWith(".css"));
  const literals = [];
  for (const filePath of cssFiles) {
    const source = await readFile(filePath, "utf8");
    for (const match of source.matchAll(/#[0-9a-f]{3,8}\b/gi)) {
      const value = match[0].toLowerCase();
      literals.push({ file: path.relative(siteRoot, filePath), value, offset: match.index });
    }
  }
  const ungovernedHits = literals.filter(({ value }) => !governedHex.has(value));
  const rejectedHits = literals.filter(({ value }) => rejectedHex.has(value));
  assert.deepEqual(ungovernedHits, [], `active CSS contains ungoverned literal colors: ${JSON.stringify(ungovernedHits, null, 2)}`);
  assert.deepEqual(rejectedHits, [], `active CSS contains rejected CONV-004 colors: ${JSON.stringify(rejectedHits, null, 2)}`);
  return {
    schemaVersion: 1,
    run: "CONV004_ACTIVE_CSS_COLOR_CONTRACT",
    status: "PASS",
    scannedCssFiles: cssFiles.length,
    governedHexCount: governedHex.size,
    literalOccurrenceCount: literals.length,
    ungovernedLiteralCount: ungovernedHits.length,
    rejectedLiteralCount: rejectedHits.length,
    governedLiteralGradientExceptions: [
      "#f8fbff -> #e4ecfa (DEC-MEDIA-001/002/003)",
      "#ffffff -> #e6edfa (DEC-MEDIA-003)",
    ],
  };
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) process.stdout.write(`${JSON.stringify(await auditCssColorContract(), null, 2)}\n`);
