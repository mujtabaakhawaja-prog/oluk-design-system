import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(siteRoot, "../..");
const registryPath = path.join(repositoryRoot, "authority/FIGMA-CODE-BRIDGE.json");
const publicPath = path.join(siteRoot, "public/.well-known/oluk-figma-code-bridge.json");

test("repository-owned Figma bridge is deterministic, unpublished and exact", async () => {
  const [authoritySource, publicSource] = await Promise.all([
    readFile(registryPath, "utf8"),
    readFile(publicPath, "utf8"),
  ]);
  const bridge = JSON.parse(authoritySource);

  assert.deepEqual(JSON.parse(publicSource), bridge);
  assert.equal(bridge.authority.figmaRegistryBoard, "911:2629");
  assert.equal(bridge.componentMappings.length, 15);
  assert.equal(bridge.routeMappings.length, 9);
  assert.equal(bridge.tokenCollections.reduce((total, collection) => total + collection.count, 0), 98);
  assert.equal(bridge.authority.officialCodeConnectInvoked, false);
  assert.equal(bridge.authority.figmaMutationPerformed, true);
  assert.equal(
    bridge.authority.figmaMutationScope,
    "REGISTRY_COPY_CORRECTION_AND_UNPUBLISHED_VISUAL_REVIEW_BOARDS_ONLY",
  );
  assert.equal(bridge.visualReviewBoards.length, 8);
  assert.equal(new Set(bridge.visualReviewBoards.map(({ nodeId }) => nodeId)).size, 8);
  assert.equal(bridge.guardrails.networkCallbacks, "NONE");
  assert.equal(bridge.guardrails.runtimeMutation, "NONE");
  assert.equal(bridge.guardrails.publication, "NONE");

  const featured = bridge.componentMappings.find(({ id }) => id === "product-commerce-card-featured");
  assert.equal(featured.figma.registeredDesktopVariant, "743:282");
  assert.equal(featured.figma.downstreamShopInstance, "765:98");
  assert.deepEqual(featured.code.fixedProps, { variant: "featured" });

  const staleBoardPaths = new Set(bridge.routeMappings.map(({ boardPath }) => boardPath));
  const resolvedPaths = new Set(bridge.routeMappings.flatMap(({ resolvedPaths: paths }) => paths));
  for (const stalePath of ["/products/:slug", "/openlab", "/products/:slug/dossier", "/compare", "/discover", "/products/:slug/record"]) {
    assert.ok(staleBoardPaths.has(stalePath), `${stalePath} remains visible as board provenance`);
    assert.ok(!resolvedPaths.has(stalePath), `${stalePath} is rejected as an executable route`);
  }
});

test("Figma bridge proof executes without network or official Code Connect", () => {
  const result = spawnSync(process.execPath, ["scripts/proof/figma-code-bridge.mjs"], {
    cwd: siteRoot,
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.status, "PASS");
  assert.equal(report.componentMappings, 15);
  assert.equal(report.routeMappings, 9);
  assert.equal(report.shopInstance, "765:98");
  assert.equal(report.staleBoardRouteCorrections, 7);
  assert.equal(report.officialCodeConnectInvoked, false);
  assert.equal(report.visualReviewBoards, 8);
  assert.equal(report.networkCallbacks, 0);
  assert.equal(report.failCount, 0);
  assert.equal(report.passCount, report.checkCount);
});
