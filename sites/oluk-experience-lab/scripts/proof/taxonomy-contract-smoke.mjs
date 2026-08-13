#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const repositoryRoot = path.resolve(siteRoot, "../..");
const contractPath = path.join(repositoryRoot, "authority/SHOP-TAXONOMY-CONTRACT.json");
const modulePath = path.join(siteRoot, "app/design-system/shop-taxonomy.ts");

const [contractSource, moduleSource] = await Promise.all([readFile(contractPath, "utf8"), readFile(modulePath, "utf8")]);
const contract = JSON.parse(contractSource);

assert.equal(contract.schemaVersion, "oluk.shop-taxonomy-contract.v1");
assert.equal(contract.status, "DESIGN_REVIEW_FIXTURE_READ_ONLY_NON_LIVE");
assert.equal(contract.runtimeMutationAuthorized, false);
assert.ok(contract.sources && typeof contract.sources === "object" && Object.keys(contract.sources).length > 0, "taxonomy needs read-only provenance sources");
assert.ok(contract.header && typeof contract.header === "object", "header taxonomy is required");
assert.ok(contract.dimensions && typeof contract.dimensions === "object", "facet dimensions are required");

for (const dimension of ["family", "form", "servings", "goal", "availability"]) {
  assert.ok(dimension in contract.dimensions, `missing taxonomy dimension ${dimension}`);
}

const dimensionSerializations = Object.entries(contract.dimensions).map(([name, value]) => [name, JSON.stringify(value)]);
for (let left = 0; left < dimensionSerializations.length; left += 1) {
  for (let right = left + 1; right < dimensionSerializations.length; right += 1) {
    assert.notEqual(dimensionSerializations[left][1], dimensionSerializations[right][1], `${dimensionSerializations[left][0]} and ${dimensionSerializations[right][0]} dimensions must not collapse into one list`);
  }
}

assert.match(moduleSource, /SHOP-TAXONOMY-CONTRACT\.json|shopTaxonomyContract|shopTaxonomy/i, "typed taxonomy module must reference or model the contract");
assert.doesNotMatch(moduleSource, /runtimeMutationAuthorized:\s*true/i);
assert.doesNotMatch(moduleSource, /90 CAPS(?:\b|ULES)/i);

process.stdout.write(`${JSON.stringify({ status: "PASS", schemaVersion: contract.schemaVersion, sourceCount: Object.keys(contract.sources).length, dimensions: Object.keys(contract.dimensions), runtimeMutationAuthorized: contract.runtimeMutationAuthorized }, null, 2)}\n`);
