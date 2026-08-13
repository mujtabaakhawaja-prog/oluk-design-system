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
  assert.equal(bridge.authority.figmaRegistryHeaderNode, "911:2636");
  assert.equal(bridge.authority.figmaRegistryBoardVersion, "1.2");
  assert.equal(bridge.componentMappings.length, 18);
  assert.equal(bridge.routeMappings.length, 9);
  assert.equal(bridge.tokenCollections.reduce((total, collection) => total + collection.count, 0), 112);
  assert.equal(bridge.styleMappings.paintStyles.length, 10);
  assert.equal(bridge.styleMappings.gridStyle.columns, 12);
  assert.equal(bridge.styleMappings.gridStyle.gutterPx, 24);
  assert.equal(bridge.styleMappings.monoTextStyle.family, "JetBrains Mono");
  assert.equal(bridge.authority.officialCodeConnectInvoked, false);
  assert.equal(bridge.authority.figmaMutationPerformed, true);
  assert.equal(
    bridge.authority.figmaMutationScope,
    "CONV004_FULL_FILE_CANDIDATE_CONVERGENCE_STOCKPILL_COBALT_DIVIDER_MEDIA_CHAMBER_AND_UNPUBLISHED_RECEIPT",
  );
  assert.equal(bridge.visualReviewBoards.length, 8);
  assert.equal(new Set(bridge.visualReviewBoards.map(({ nodeId }) => nodeId)).size, 8);
  assert.equal(bridge.guardrails.networkCallbacks, "NONE");
  assert.equal(bridge.guardrails.runtimeMutation, "NONE");
  assert.equal(bridge.guardrails.publication, "NONE");
  assert.equal(bridge.authority.conv004CurrentReceipt, "1043:310");
  assert.equal(bridge.authority.conv004CurrentReceiptKind, "COMPONENT");
  assert.deepEqual(bridge.authority.conv004RejectedHistoricalEvidence, ["999:28867", "999:28868", "999:28872"]);
  assert.equal(bridge.figmaCloseoutProof.staleVariableReferences.immutableHistoricalFileAliases, 1219);

  const featured = bridge.componentMappings.find(({ id }) => id === "product-commerce-card-featured");
  assert.equal(featured.figma.registeredDesktopVariant, "743:282");
  assert.equal(featured.figma.downstreamShopInstance, "765:98");
  assert.deepEqual(featured.code.fixedProps, { variant: "featured" });
  assert.deepEqual(featured.variants, { width: ["desktop", "mobile"] });
  assert.deepEqual(
    bridge.componentMappings.find(({ id }) => id === "product-commerce-card-vertical").variants,
    { width: ["desktop", "mobile"] },
  );
  assert.deepEqual(
    bridge.componentMappings.find(({ id }) => id === "product-commerce-card-relation").variants,
    { width: ["desktop-horizontal", "tablet-stacked", "mobile-stacked"] },
  );

  const stock = bridge.componentMappings.find(({ id }) => id === "inventory-status");
  assert.equal(stock.figma.nodeId, "732:2902");
  assert.equal(stock.figma.sourceSpecimenNodeId, "641:17");
  assert.equal(stock.code.export, "StockPill");
  assert.equal(stock.code.propsType, "StockPillProps");
  assert.equal(stock.code.compatibilityAlias.export, "InventoryStatus");
  assert.ok(stock.tokens.includes("--oluk-cobalt"));
  assert.ok(!stock.tokens.includes("--oluk-inventory-green"));

  const media = bridge.componentMappings.find(({ id }) => id === "product-media-chamber");
  assert.equal(media.figma.nodeId, "1022:4099");
  assert.equal(Object.keys(media.figma.variantNodes).length, 4);
  assert.equal(media.figma.instanceNodes.length, 4);

  const divider = bridge.componentMappings.find(({ id }) => id === "cobalt-divider");
  assert.equal(divider.figma.nodeId, "1010:27053");
  assert.equal(divider.figma.rhythmSpecimenNodeId, "1010:27054");
  assert.equal(divider.figma.historicalPredecessorInstanceNodeId, "1010:27064");
  assert.deepEqual(divider.routes, []);

  const boundary = bridge.componentMappings.find(({ id }) => id === "cobalt-density-boundary");
  assert.equal(boundary.figma.nodeId, "1026:27046");
  assert.deepEqual(boundary.figma.instanceNodeIds, ["1026:27048", "1026:27050"]);
  assert.deepEqual(boundary.figma.intendedContexts, ["Hero", "OpenLab"]);
  assert.equal(boundary.code.export, "CobaltDensityBoundary");
  assert.deepEqual(boundary.routes, ["/", "/open-lab", "/review"]);

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
  assert.equal(report.componentMappings, 18);
  assert.equal(report.routeMappings, 9);
  assert.equal(report.shopInstance, "765:98");
  assert.equal(report.staleBoardRouteCorrections, 7);
  assert.equal(report.officialCodeConnectInvoked, false);
  assert.equal(report.visualReviewBoards, 8);
  assert.equal(report.networkCallbacks, 0);
  assert.equal(report.failCount, 0);
  assert.equal(report.passCount, report.checkCount);
});
