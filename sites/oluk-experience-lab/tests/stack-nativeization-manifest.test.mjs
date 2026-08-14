import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const readJson = async (relative) => JSON.parse(await readFile(path.join(repoRoot, relative), "utf8"));
const nodeId = /^\d+:\d+$/;

test("the commercial Stack nativeization manifest records current Sites captures and real editable Figma nodes without overstating review", async () => {
  const [manifest, currentState, registry] = await Promise.all([
    readJson("authority/SITES-NATIVEIZATION-MANIFEST-STACK-COMMERCIAL.json"),
    readJson("authority/SITES-NATIVEIZATION-STACK-CURRENT-STATE.json"),
    readJson("authority/DESIGN-SYNC-REGISTRY.json"),
  ]);
  assert.equal(manifest.status, "FIGMA_NATIVE_MIRROR_CREATED");
  assert.equal(manifest.sitesSource.sourceTreeHash, "14fedb03ca53047fd9637c59f1b69240b9a7b7c8");
  assert.equal(manifest.sitesCaptures.foundationDesktop.sha256, "14437130ec8967aba71feedd336e0ca028664f9078017f27a1d15324e09ad305");
  assert.equal(manifest.sitesCaptures.foundationMobile.sha256, "a892d896d08a87af3f47e24b0934c216f255a10f8f55f0559477cfaf46e94b9d");
  assert.equal(manifest.sitesCaptures.maximumDesktop.sha256, "a0a69671f03cd546e7d64989a73b579410821d7eb96941c9ca965b418d3daf36");
  for (const id of [...Object.values(manifest.figma.componentSets), ...Object.values(manifest.figma.builderVariants), ...Object.values(manifest.figma.routeFrames)]) assert.match(id, nodeId);
  assert.equal(manifest.commercialContract.maximumComposition, "MK-2866 + LGD-4033 + RAD-140 · £142");
  assert.equal(manifest.componentProvenance.lgd4033MediaPolicy, "governed-unpopulated-chamber");
  assert.equal(manifest.makeGate.eligible, true);
  assert.equal(manifest.advancementGates.figmaReviewed, false);
  assert.equal(manifest.advancementGates.visualSyncCurrent, false);
  assert.equal(manifest.advancementGates.ownerSelected, false);
  assert.equal(manifest.advancementGates.championApproved, false);
  assert.equal(manifest.figma.publicationAuthorized, false);

  assert.equal(currentState.moduleState, "FIGMA_NATIVE_MIRROR_CREATED");
  assert.equal(currentState.source.coreSourceCommit, manifest.sitesSource.coreSourceCommit);
  assert.equal(currentState.source.sourceTreeHash, manifest.sitesSource.sourceTreeHash);
  assert.deepEqual(currentState.source.commercialContract.levels, ["FOUNDATION", "STRONGER", "MAXIMUM"]);
  assert.equal(currentState.source.commercialContract.maximumComposition, manifest.commercialContract.maximumComposition);
  assert.equal(currentState.figma.componentFamily.nodeId, manifest.figma.componentSets.commercialBuilder);
  assert.deepEqual(currentState.figma.routeFrames, manifest.figma.routeFrames);
  assert.equal(currentState.supersedes.rejectedOutcomeProfileNodeId, "1292:6466");
  assert.equal(currentState.supersedes.status, "SUPERSEDED_HISTORICAL_EVIDENCE");
  assert.doesNotMatch(JSON.stringify(currentState.figma.reusableComponents), /1292:6466|StackOutcomeProfile/);
  assert.doesNotMatch(JSON.stringify(currentState.source.commercialContract), /goalFit|intensity|complexity|evidenceVisibility|recoveryEmphasis/);
  assert.equal(currentState.advancementGates.figmaReviewed, false);
  assert.equal(currentState.advancementGates.visualSyncCurrent, false);
  assert.equal(currentState.advancementGates.ownerSelected, false);
  assert.equal(currentState.advancementGates.championApproved, false);
  assert.equal(currentState.figma.publicationAuthorized, false);

  const stack = registry.records.find(({ id }) => id === "stack-explorer");
  assert.equal(stack.status, "FIGMA_NATIVE_MIRROR_CREATED");
  assert.equal(stack.figmaReference.nodeId, manifest.figma.componentSets.commercialBuilder);
  assert.equal(stack.figmaReference.desktopNodeId, manifest.figma.routeFrames.foundationDesktop);
  assert.equal(stack.figmaReference.mobileNodeId, manifest.figma.routeFrames.foundationMobile);
  assert.equal(stack.figmaReference.maximumDesktopNodeId, manifest.figma.routeFrames.maximumDesktop);
  assert.equal(stack.figmaReference.maximumMobileNodeId, manifest.figma.routeFrames.maximumMobile);
});
