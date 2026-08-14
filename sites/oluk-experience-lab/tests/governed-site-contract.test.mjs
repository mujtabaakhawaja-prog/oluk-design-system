import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const load = async (file) => JSON.parse(await readFile(file, "utf8"));

test("the champion ledger has exactly 73 unique governed routes", async () => {
  const ledger = await load(path.join(repoRoot, "authority/SITE-ROUTE-LEDGER.json"));
  assert.equal(ledger.routes.length, 73);
  assert.equal(new Set(ledger.routes.map(({ id }) => id)).size, 73);
  assert.equal(new Set(ledger.routes.map(({ path }) => path)).size, 73);
  assert.equal(ledger.canonicalOpenLabNamespace, "/open-lab");
  assert.equal(ledger.aliasPolicy["/openlab/*"], "/open-lab/*");
  assert.equal(ledger.routes.find(({ id }) => id === "open-lab-admin").disposition, "owner-only");
});

test("the four accessory Figma sources and corrected Final-Design baselines name their intent owners", async () => {
  const registry = await load(path.join(repoRoot, "authority/FIGMA-INTENT-REGISTRY.json"));
  assert.ok(registry.sources.length >= 7);
  assert.equal(registry.status, "INTENT_AND_COMPONENT_PROVENANCE_NOT_RUNTIME_AUTHORITY");
  for (const source of registry.sources) {
    assert.ok(source.fileKey && source.rootNodeId);
    assert.ok(source.dataOwners.length > 0);
    assert.ok(source.runtimeExclusions.length > 0);
    assert.ok(source.intentNodes.length > 0);
    for (const intent of source.intentNodes) {
      assert.match(intent.nodeId, /^\d+:\d+$/);
      assert.ok(intent.target && intent.state && intent.copy && intent.dataOwner);
    }
  }
  const suppliedOpenLabCopy = registry.sources
    .filter(({ id }) => id === "commerce-growth" || id === "openlab")
    .flatMap(({ intentNodes }) => intentNodes)
    .filter(({ dataOwner }) => dataOwner === "openlab-source");
  assert.ok(suppliedOpenLabCopy.length > 0);
  assert.ok(suppliedOpenLabCopy.every(({ copy }) => copy === "preserve-supplied"));
  const finalDesign = registry.sources.find(({ id }) => id === "final-design-corrected-baselines");
  assert.deepEqual(
    finalDesign.intentNodes.map(({ nodeId }) => nodeId),
    ["1155:29963", "462:4684", "1155:30632", "614:75995", "1176:28930", "754:18226"],
  );
  const library = registry.sources.find(({ id }) => id === "final-design-component-library-consolidation");
  assert.equal(library.rootNodeId, "672:10");
  assert.equal(library.intentNodes.find(({ nodeId }) => nodeId === "1081:28849").state, "legacy-local-composition-rebuild-required");
  const sync = registry.sources.find(({ id }) => id === "sites-sync-dual-reference");
  assert.equal(sync.rootNodeId, "1214:50");
  assert.ok(sync.intentNodes.some(({ nodeId }) => nodeId === "1214:51"));
});

test("the public governed contract is an exact authority projection", async () => {
  const authority = await readFile(path.join(repoRoot, "authority/generated/OLUK-DESIGN-CONTRACT.json"), "utf8");
  const publicProjection = await readFile(path.join(siteRoot, "public/.well-known/oluk-governed-design-contract.json"), "utf8");
  assert.equal(publicProjection, authority);
  const contract = JSON.parse(authority);
  assert.equal(contract.routeAuthority.routes.length, 73);
  assert.equal(contract.designSystem.variableCount, 112);
  assert.equal(contract.designSystem.componentCount, 24);
  assert.equal(contract.designSystem.programComponentMappings.length, 6);
  assert.equal(contract.immutableProductTruth.servings, "90 SERVINGS");
  assert.equal(contract.boundaries.browserDirectServiceCalls, false);
  assert.equal(contract.runtimeContractSnapshot.browserDirectServiceCallsAllowed, false);
  assert.match(contract.runtimeContractSnapshot.contentHash, /^[a-f0-9]{64}$/);
});
