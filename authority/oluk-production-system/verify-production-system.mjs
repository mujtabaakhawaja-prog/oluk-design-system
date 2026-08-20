#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const productionRoot = path.dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map((argument) => {
  const [key, ...value] = argument.split("=");
  return [key, value.join("=")];
}));
const readJson = async (filePath) => JSON.parse(await readFile(filePath, "utf8"));
const sha256 = async (filePath) => createHash("sha256").update(await readFile(filePath)).digest("hex");
const equalSets = (left, right) => left.length === right.length && left.every((value, index) => value === right[index]);
const sortedUnique = (values) => [...new Set(values)].sort();
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const requirements = await readJson(path.join(productionRoot, "DESIGN-REQUIREMENTS-LEDGER.json"));
const content = await readJson(path.join(productionRoot, "CUSTOMER-CONTENT-LEDGER.json"));
const requirementsSchema = await readJson(path.join(productionRoot, "schemas/design-requirements-ledger.schema.json"));
const contentSchema = await readJson(path.join(productionRoot, "schemas/customer-content-ledger.schema.json"));

assert(requirements.schemaVersion === requirementsSchema.properties.schemaVersion.const, "Design ledger schema version drift");
assert(content.schemaVersion === contentSchema.properties.schemaVersion.const, "Content ledger schema version drift");
assert(requirements.authorityPin.runtimeContractVersion === "1.3.0", "Design ledger must pin runtime contract 1.3.0");
assert(content.authorityPin.runtimeContractVersion === "1.3.0", "Content ledger must pin runtime contract 1.3.0");
assert(content.authorityPin.identity === "OPTION_B_PREMIUM_LOCKED", "Option B Premium identity pin drift");
assert(content.routeApplicability.routeCount === 74, "Content ledger must reference the 74-route contract");

const canonicalProducts = sortedUnique([
  "endurashred", "epistane", "gw-501516", "halo", "lgd-4033", "m-sten", "mass-gh", "ment",
  "mk-2866", "mk-677", "rad-140", "s-23", "s-4", "trenavar", "yk-11",
]);
const ledgerProducts = sortedUnique(content.products.map(({ canonicalProductId }) => canonicalProductId));
assert(content.products.length === 15 && equalSets(ledgerProducts, canonicalProducts), "Content ledger must contain the exact canonical 15");
assert(!JSON.stringify(content).toLowerCase().includes("bpc-157"), "BPC-157 must not enter the active content ledger");
for (const product of content.products) {
  assert(product.operatorProvenance.customerVisible === false, `${product.canonicalProductId}: provenance must remain operator-only`);
  for (const [slotId, state] of Object.entries(product.slotStates)) {
    assert(["runtime-bound", "approved", "candidate-only", "unresolved"].includes(state), `${product.canonicalProductId}/${slotId}: invalid state`);
  }
}

const designFieldIds = sortedUnique(requirements.requirements.flatMap(({ fieldRefs }) => fieldRefs.map(({ fieldId }) => fieldId)));
const contentFieldIds = sortedUnique(content.slotLaw.flatMap(({ runtimeFieldRefs }) => runtimeFieldRefs));
for (const fieldId of contentFieldIds) assert(designFieldIds.includes(fieldId), `Content slot references unknown Design field ${fieldId}`);

if (args["--c2-registry"]) {
  const registry = await readJson(args["--c2-registry"]);
  assert(await sha256(args["--c2-registry"]) === requirements.sourcePins.runtimeContractSha256, "C2 registry digest drift");
  assert(registry.version === "1.3.0", "C2 registry version drift");
  const registryFieldIds = sortedUnique(registry.fields.map(({ fieldId }) => fieldId));
  assert(equalSets(designFieldIds, registryFieldIds), "Design field references must exactly cover the C2 provider-neutral field set");
}

if (args["--olympus-root"]) {
  const olympusRoot = args["--olympus-root"];
  const ownerFiles = [
    ["programmeAmendmentSha256", "docs/ssot/OLUK_PROGRAMME_AUTHORITY_AMENDMENT_20260820_V2.yaml"],
    ["legacyDispositionRegistrySha256", "docs/ssot/OLUK_LEGACY_DISPOSITION_REGISTRY_V1.json"],
    ["continuationQueueSha256", "docs/ssot/OLUK_CONTINUATION_QUEUE_V1.json"],
    ["canonicalRouteRegistrySha256", "apps/olympus-shopper-ui/app/route-authority/oluk-canonical-customer-route-registry.v1.json"],
  ];
  for (const [pin, ownerPath] of ownerFiles) {
    assert(await sha256(path.join(olympusRoot, ownerPath)) === requirements.sourcePins[pin], `${pin} drift`);
  }
  const routeRegistry = await readJson(path.join(olympusRoot, ownerFiles[3][1]));
  assert(routeRegistry.routes.length === 74, "Pinned Next route registry no longer contains 74 routes");
}

process.stdout.write(`PASS OLUK production-system design=${designFieldIds.length} fields products=${ledgerProducts.length} routes=${content.routeApplicability.routeCount}\n`);
