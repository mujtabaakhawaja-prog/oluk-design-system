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
const homepage = await readJson(path.join(productionRoot, "HOMEPAGE-SYSTEM-EXTRACTION-V1.json"));
const accountStates = await readJson(path.join(productionRoot, "ACCOUNT-TRANSACTION-STATE-LAW-V1.json"));
const heroSource = await readFile(path.join(productionRoot, "../../sites/oluk-experience-lab/app/design-system/locked-home-hero.tsx"), "utf8");
const statusSource = await readFile(path.join(productionRoot, "../../sites/oluk-experience-lab/app/design-system/product-status.tsx"), "utf8");
const frontierSource = await readFile(path.join(productionRoot, "../../sites/oluk-experience-lab/app/design-system/frontier-sections.tsx"), "utf8");
const transactionSource = await readFile(path.join(productionRoot, "../../sites/oluk-experience-lab/app/design-system/transaction-presentation.tsx"), "utf8");
const postPurchaseSource = await readFile(path.join(productionRoot, "../../sites/oluk-experience-lab/app/design-system/post-purchase-surface.tsx"), "utf8");

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

assert(homepage.packetId === "D2-HOME-SYSTEM-01", "Homepage extraction packet drift");
assert(homepage.baseCommit === "bbef23d2cc673965f21f8e60b6456ce5dd02f588", "Homepage extraction base drift");
assert(homepage.runtimeContract.version === "1.3.0", "Homepage extraction must pin runtime contract 1.3.0");
assert(homepage.sources[0].commit === "7fc8bcd46e5d9ffa3489455ecd7b04f14d6ba9a0" && homepage.sources[0].disposition === "ADAPT_STRUCTURE_ONLY", "Homepage structure source drift");
assert(homepage.sources[1].commit === "9867e292f12b9805df9d085dc0a5dbbc718ce45b" && homepage.sources[1].disposition === "EVIDENCE_INDEX_ONLY", "System evidence index drift");
assert(homepage.compositionContract.requiredProductCount === 5, "Locked homepage stage must remain five-position");
for (const binding of homepage.fieldBindings) {
  for (const fieldId of binding.runtimeFieldRefs) {
    assert(designFieldIds.includes(fieldId), `Homepage input ${binding.componentInput} references unknown field ${fieldId}`);
  }
}
for (const forbidden of ["const products = [", "lockedHomeHeroMedia", "Add to bag", "Formulated. Verified", "Third-party tested", "data-figma-node", "data-figma-stage-node"]) {
  assert(!heroSource.includes(forbidden), `Homepage source retains forbidden fixture/provenance token: ${forbidden}`);
}
assert(heroSource.includes("products.length !== 5 || !active) return null"), "Homepage must suppress incomplete five-position input");
assert(statusSource.includes('verified: "OPENLAB REPORTED"'), "Reported evidence label drift");
assert(statusSource.includes('state = "unavailable"'), "Evidence status must default fail closed");
assert(!statusSource.includes("OPENLAB VERIFIED") && !statusSource.includes("RECORD AVAILABLE"), "Forbidden evidence label entered active status source");

assert(accountStates.packetId === "D3-ACCOUNT-STATES-01", "Account-state packet drift");
assert(accountStates.baseCommit === "b5a32dc6f6006819d72c791abd2f16c6b4668e1a", "Account-state base drift");
assert(accountStates.source.commit === "feea650c8623230d6b6558c28d3db3c64e9815b1", "Account-state source drift");
for (const fieldId of accountStates.runtimeContract.fieldRefs) {
  assert(designFieldIds.includes(fieldId), `Account state law references unknown field ${fieldId}`);
}
const accountHubSource = frontierSource.slice(frontierSource.indexOf("export type AccountSessionState"), frontierSource.indexOf("export function SupportContent"));
for (const forbidden of ["MK-2866", "320 points", "ProductCommerceCard", "mk2866Fixture", "projection", "source-owned", "provenance"]) {
  assert(!accountHubSource.toLowerCase().includes(forbidden.toLowerCase()), `AccountHub retains forbidden default/copy: ${forbidden}`);
}
assert(accountHubSource.includes('state = "unauthenticated"'), "AccountHub must default unauthenticated");
assert(!postPurchaseSource.includes("OL-10428"), "Post-purchase alias must not invent an order reference");
assert(transactionSource.includes("ownerBoundOrderStages"), "Canonical transaction surface lacks owner-bound stage gate");
assert(transactionSource.includes("orderReference && ownerOrderContent"), "Order content must require public identity and owner content");
assert(!transactionSource.includes('orderReference = "OL-10428"'), "Canonical transaction surface retains a fake order default");

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
