#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { ROUTES as EXECUTABLE_ROUTES } from "./route-matrix.mjs";
import { CUSTOMER_ROUTES } from "../../app/design-system/site-route-data.mjs";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const repositoryRoot = path.resolve(siteRoot, "../..");
const registryPath = path.join(repositoryRoot, "authority/FIGMA-CODE-BRIDGE.json");
const publicPath = path.join(siteRoot, "public/.well-known/oluk-figma-code-bridge.json");
const typedContractPath = path.join(siteRoot, "app/design-system/figma-code-bridge.ts");
const tokenCssPaths = [
  path.join(siteRoot, "app/design-system/candidate-tokens.css"),
  path.join(siteRoot, "app/globals.css"),
];

const writeResource = process.argv.includes("--write");
const registryText = await readFile(registryPath, "utf8");
const registry = JSON.parse(registryText);
const failures = [];
const checks = [];

function check(condition, message) {
  checks.push({ status: condition ? "PASS" : "FAIL", message });
  if (!condition) failures.push(message);
}

function normalized(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function collectCssVariables(source) {
  return new Map(
    [...source.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)].map((match) => [match[1], normalized(match[2])]),
  );
}

function exportedDeclarations(source, fileName) {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const values = new Set();
  const types = new Set();
  for (const node of sourceFile.statements) {
    const exported = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
    if (!exported || !node.name || !ts.isIdentifier(node.name)) continue;
    if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isVariableStatement(node)) {
      values.add(node.name.text);
    }
    if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) types.add(node.name.text);
  }
  return { values, types };
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

const canonicalResource = `${JSON.stringify(registry, null, 2)}\n`;
if (writeResource) {
  await mkdir(path.dirname(publicPath), { recursive: true });
  await writeFile(publicPath, canonicalResource);
}

check(registry.schemaVersion === 1, "bridge schema version is 1");
check(registry.bridgeId === "OLUK-CC-BRIDGE-001", "bridge ID is stable");
check(registry.authority.figmaFileKey === "BEPMuUt1HroEw8xjz8CVyN", "Figma file key is exact");
check(registry.authority.figmaRegistryBoard === "911:2629", "live CC registry board is exact");
check(registry.authority.figmaRegistryHeaderNode === "911:2636", "live CC registry header node is exact");
check(registry.authority.figmaRegistryBoardVersion === "1.2", "live CC registry board is v1.2");
check(registry.authority.officialCodeConnectInvoked === false, "official Code Connect is not invoked");
check(registry.authority.figmaMutationPerformed === true, "bounded Figma documentation writes are recorded truthfully");
check(
  registry.authority.figmaMutationScope ===
    "CONV004_FULL_FILE_CANDIDATE_CONVERGENCE_STOCKPILL_COBALT_DIVIDER_MEDIA_CHAMBER_AND_UNPUBLISHED_RECEIPT",
  "Figma write scope records the bounded CONV-004 candidate convergence",
);
check(registry.authority.conv004CurrentReceipt === "1043:310", "corrected CONV-004 current receipt is exact");
check(registry.authority.conv004CurrentReceiptKind === "COMPONENT", "corrected CONV-004 receipt is a COMPONENT");
check(
  registry.authority.conv004RejectedHistoricalEvidence.join(",") === "999:28867,999:28868,999:28872",
  "three rejected receipt nodes remain immutable historical evidence",
);
check(registry.authority.legacyCompatibilityReceiptFieldsDisposition === "IMMUTABLE_REJECTED_HISTORICAL_EVIDENCE_ONLY", "legacy receipt fields cannot regain authority");
check(registry.figmaCloseoutProof.canvasAudit.passed === 42 && registry.figmaCloseoutProof.canvasAudit.total === 42, "final Figma canvas audit is 42 of 42");
check(registry.figmaCloseoutProof.rejectedPaintCount === 0, "final Figma rejected paint set is zero");
check(registry.figmaCloseoutProof.authoredFractionalFontSizeCount === 0, "authored fractional font-size count is zero");
check(registry.figmaCloseoutProof.computedFractionalReadings.count === 127, "127 computed fractional readings are recorded separately");
check(registry.figmaCloseoutProof.staleVariableReferences.activeCanonicalRoots === 0, "active canonical roots have zero stale variable references");
check(registry.figmaCloseoutProof.staleVariableReferences.activeCustomerRoots === 0, "active customer roots have zero stale variable references");
check(registry.figmaCloseoutProof.staleVariableReferences.immutableHistoricalFileAliases === 1219, "1,219 immutable historical aliases remain explicit debt");
check(registry.visualReviewBoards.length === 8, "eight artifact-specific visual review boards are registered");
check(new Set(registry.visualReviewBoards.map(({ nodeId }) => nodeId)).size === 8, "visual review board node IDs are unique");
check(registry.guardrails.networkCallbacks === "NONE", "bridge has no network callbacks");
check(registry.guardrails.runtimeMutation === "NONE", "bridge grants no runtime mutation");
check(registry.guardrails.publication === "NONE", "bridge grants no publication");
check(registry.guardrails.humanReviewRequired === true, "bridge remains human-review-required");

const componentIds = registry.componentMappings.map(({ id }) => id);
const componentNodeIds = registry.componentMappings.map(({ figma }) => figma.nodeId);
check(new Set(componentIds).size === componentIds.length, "component mapping IDs are unique");
check(new Set(componentNodeIds).size === componentNodeIds.length, "component Figma node IDs are unique");
check(registry.componentMappings.length === 18, "18 exact component mappings are registered");

const typedContractSource = await readFile(typedContractPath, "utf8");
for (const mapping of registry.componentMappings) {
  const absoluteFile = path.join(repositoryRoot, mapping.code.file);
  check(await exists(absoluteFile), `${mapping.id} code file exists`);
  if (!(await exists(absoluteFile))) continue;
  const source = await readFile(absoluteFile, "utf8");
  const declarations = exportedDeclarations(source, absoluteFile);
  check(declarations.values.has(mapping.code.export), `${mapping.id} export ${mapping.code.export} exists`);
  check(
    mapping.code.propsTypeSource === "typed-contract"
      ? typedContractSource.includes(`export type ${mapping.code.propsType}`)
      : declarations.types.has(mapping.code.propsType),
    `${mapping.id} props type ${mapping.code.propsType} exists`,
  );
  check(
    typedContractSource.includes(`${mapping.code.contract}: {`) &&
      typedContractSource.includes(`propsType: "${mapping.code.propsType}"`),
    `${mapping.id} is covered by the compile-time prop contract`,
  );
  check(mapping.code.props.length === new Set(mapping.code.props).size, `${mapping.id} prop names are unique`);
  check(mapping.tokens.length > 0, `${mapping.id} declares governed token dependencies`);
}

const forbiddenResolvedPrefixes = ["components/", "routes/"];
for (const mapping of registry.componentMappings) {
  check(
    forbiddenResolvedPrefixes.every((prefix) => !mapping.code.file.startsWith(prefix)),
    `${mapping.id} does not use a stale CC-board pseudo path`,
  );
}

for (const observation of registry.figmaBoardObservations) {
  check(await exists(path.join(repositoryRoot, observation.resolvedRepositoryPath)), `${observation.label} resolved path exists`);
  check(observation.resolution !== "UNRESOLVED", `${observation.label} board observation has an explicit resolution`);
}

const featured = registry.componentMappings.find(({ id }) => id === "product-commerce-card-featured");
check(featured?.figma.registeredDesktopVariant === "743:282", "Featured desktop variant 743:282 is registered");
check(featured?.figma.downstreamShopInstance === "765:98", "actual Shop instance 765:98 is registered");
check(featured?.code.fixedProps?.variant === "featured", "Shop-inherited Featured mapping fixes variant=featured");
const compactCard = registry.componentMappings.find(({ id }) => id === "product-commerce-card-compact");
const verticalCard = registry.componentMappings.find(({ id }) => id === "product-commerce-card-vertical");
const relationCard = registry.componentMappings.find(({ id }) => id === "product-commerce-card-relation");
const purchasePanel = registry.componentMappings.find(({ id }) => id === "purchase-panel");
check(Object.keys(compactCard?.variants ?? {}).join(",") === "state", "Compact maps only its eight-state Figma axis");
check(compactCard?.variants.state.length === 8, "Compact maps all eight Figma states");
check(JSON.stringify(verticalCard?.variants) === JSON.stringify({ width: ["desktop", "mobile"] }), "Vertical maps only its two-width Figma axis");
check(JSON.stringify(featured?.variants) === JSON.stringify({ width: ["desktop", "mobile"] }), "Featured maps only its two-width Figma axis");
check(JSON.stringify(relationCard?.variants) === JSON.stringify({ width: ["desktop-horizontal", "tablet-stacked", "mobile-stacked"] }), "Relation maps only its three-width Figma axis");
check(purchasePanel?.variants.state.length === 6 && purchasePanel?.variants.width.length === 2, "PurchasePanel maps its exact six-state by two-width matrix");
check(
  registry.figmaBoardObservations.some(
    ({ nodeId, boardDeclaredSourceNodeId, label }) =>
      nodeId === "765:98" && boardDeclaredSourceNodeId === "743:282" && label === "CanonicalInstance/Shop",
  ),
  "actual Shop instance and its Featured source are both retained as provenance",
);

const stock = registry.componentMappings.find(({ id }) => id === "inventory-status");
check(stock?.figma.nodeId === "732:2902", "promoted InventoryStatus canonical 732:2902 is registered");
check(stock?.figma.sourceSpecimenNodeId === "641:17", "InventoryStatus source specimen 641:17 is retained");
check(stock?.code.export === "StockPill", "promoted canonical maps directly to StockPill export");
check(stock?.code.propsType === "StockPillProps", "promoted canonical maps directly to StockPillProps");
check(stock?.code.compatibilityAlias?.export === "InventoryStatus", "InventoryStatus is retained only as a compatibility alias");
check(stock?.tokens.includes("--oluk-cobalt"), "in-stock StockPill uses cobalt");
check(!stock?.tokens.includes("--oluk-inventory-green"), "inventory mapping rejects green status authority");

const mediaChamber = registry.componentMappings.find(({ id }) => id === "product-media-chamber");
check(mediaChamber?.figma.nodeId === "1022:4099", "MediaChamber component set 1022:4099 is registered");
check(Object.keys(mediaChamber?.figma.variantNodes ?? {}).length === 4, "four canonical MediaChamber variants are registered");
check(mediaChamber?.figma.instanceNodes.length === 4, "four corrected MediaChamber instances are registered");

const cobaltDivider = registry.componentMappings.find(({ id }) => id === "cobalt-divider");
check(cobaltDivider?.figma.nodeId === "1010:27053", "CobaltDivider component 1010:27053 is registered");
check(cobaltDivider?.figma.rhythmSpecimenNodeId === "1010:27054", "CobaltDivider rhythm specimen is registered");
check(cobaltDivider?.figma.historicalPredecessorInstanceNodeId === "1010:27064", "CobaltDivider hidden predecessor is retained as history");
check(cobaltDivider?.routes.length === 0, "atomic CobaltDivider has no direct customer route usage");

const cobaltBoundary = registry.componentMappings.find(({ id }) => id === "cobalt-density-boundary");
check(cobaltBoundary?.figma.nodeId === "1026:27046", "CobaltDensityBoundary component 1026:27046 is registered");
check(cobaltBoundary?.figma.instanceNodeIds.join(",") === "1026:27048,1026:27050", "CobaltDensityBoundary Hero and OpenLab instances are exact");
check(cobaltBoundary?.figma.intendedContexts.join(",") === "Hero,OpenLab", "Figma intended contexts are exact");
check(cobaltBoundary?.code.export === "CobaltDensityBoundary", "CobaltDensityBoundary exact code export is registered");
check(
  cobaltBoundary?.routes.join(",") === "/,/open-lab,/review",
  "CobaltDensityBoundary exact Sites call routes are registered",
);

const executableRoutePaths = new Set([
  ...EXECUTABLE_ROUTES.map(({ path: routePath }) => routePath),
  // The bridge also maps two retained physical aliases which are intentionally
  // not independent entries in the 73-route maturity ledger.
  ...CUSTOMER_ROUTES.map(({ path: routePath }) => routePath),
]);
for (const route of registry.routeMappings) {
  for (const codeFile of route.codeFiles) {
    check(await exists(path.join(repositoryRoot, codeFile)), `${route.id} route source ${codeFile} exists`);
  }
  for (const resolvedPath of route.resolvedPaths) {
    const basePath = resolvedPath.split("?")[0];
    check(executableRoutePaths.has(basePath), `${route.id} resolved path ${basePath} is in the executable route matrix`);
  }
  if (route.resolution.startsWith("CORRECTED") || route.resolution.startsWith("MAPPED") || route.resolution.startsWith("EXPANDED")) {
    check(!route.resolvedPaths.includes(route.boardPath), `${route.id} rejects the stale CC-board route path`);
  }
}

check(
  registry.routeMappings.find(({ id }) => id === "pdp")?.resolvedPaths[0] === "/product/mk-2866",
  "PDP board path resolves to the actual singular product route",
);
check(
  registry.routeMappings.find(({ id }) => id === "openlab")?.resolvedPaths[0] === "/open-lab",
  "OpenLab board path resolves to the actual hyphenated route",
);
check(
  registry.routeMappings.find(({ id }) => id === "goal-discovery")?.resolvedPaths[0] === "/shop?goal=:goal",
  "Goal discovery resolves to the Shop goal facet rather than an invented route",
);

const tokenCssSources = await Promise.all(tokenCssPaths.map((filePath) => readFile(filePath, "utf8")));
const tokenMaps = tokenCssSources.map(collectCssVariables);
const customerCascadeTokenMap = new Map(tokenMaps.flatMap((tokenMap) => [...tokenMap.entries()]));
for (const token of registry.bridgeTokens) {
  check(
    customerCascadeTokenMap.get(token.css) === normalized(token.value),
    `${token.css} resolves to ${token.value} in the customer root cascade`,
  );
}
check(
  registry.tokenCollections.reduce((total, collection) => total + collection.count, 0) === 112,
  "token collection counts total 112",
);
check(registry.styleMappings.paintStyles.length === 10, "ten Figma paint styles are registered");
check(registry.styleMappings.gridStyle.columns === 12, "Figma grid style has 12 columns");
check(registry.styleMappings.gridStyle.gutterPx === 24, "Figma grid style has a 24px gutter");
check(registry.styleMappings.gridStyle.cssColumns === "--grid-columns", "grid column CSS projection is exact");
check(registry.styleMappings.gridStyle.cssGap === "--grid-gap", "grid gap CSS projection is exact");
check(registry.styleMappings.monoTextStyle.family === "JetBrains Mono", "code-only Figma text style uses JetBrains Mono");
check(registry.styleMappings.monoTextStyle.css === "--font-mono", "mono CSS projection is exact");
check(customerCascadeTokenMap.get("--grid-columns") === "12", "--grid-columns resolves to 12 in the customer root cascade");
check(customerCascadeTokenMap.get("--grid-gap") === "24px", "--grid-gap resolves to 24px in the customer root cascade");
check(customerCascadeTokenMap.get("--font-mono") === '"jetbrains mono", monospace', "--font-mono resolves to JetBrains Mono in the customer root cascade");

const qualitativeSource = await readFile(path.join(siteRoot, "app/design-system/qualitative-icon.tsx"), "utf8");
for (const kind of ["class", "form", "quality", "tested"]) {
  check(qualitativeSource.includes(`${kind}: "/assets/candidate/qualitative/${kind}.svg"`), `${kind} icon source is exact`);
  check(await exists(path.join(siteRoot, `public/assets/candidate/qualitative/${kind}.svg`)), `${kind} icon asset exists`);
}
const customerCss = tokenCssSources[1];
const candidateCss = await readFile(path.join(siteRoot, "app/design-system/candidate-review.css"), "utf8");
check(/\.qualitative-chip dt\s*\{[\s\S]*?text-transform:\s*uppercase\s*;/m.test(customerCss), "customer chip labels render uppercase");
check(/\.oluk-candidate-qualitative dt\s*\{[^}]*text-transform:\s*uppercase\s*;/m.test(candidateCss), "candidate chip labels render uppercase");

const publicResource = await readFile(publicPath, "utf8").catch(() => "");
check(publicResource === canonicalResource, "public static inventory is a deterministic projection of repository authority");
check(!/https?:\/\//i.test(typedContractSource), "typed bridge contract contains no network target");
check(!/\bfetch\s*\(/.test(typedContractSource), "typed bridge contract contains no fetch callback");

const report = {
  schemaVersion: 1,
  run: "OLUK_CC_BRIDGE_REPOSITORY_MAPPING_PROOF",
  status: failures.length === 0 ? "PASS" : "FAIL",
  candidateState: registry.status,
  figmaRegistryBoard: registry.authority.figmaRegistryBoard,
  componentMappings: registry.componentMappings.length,
  routeMappings: registry.routeMappings.length,
  tokenCollections: registry.tokenCollections.length,
  tokenCount: registry.tokenCollections.reduce((total, collection) => total + collection.count, 0),
  shopInstance: featured?.figma.downstreamShopInstance,
  staleBoardRouteCorrections: registry.routeMappings.filter(({ resolution }) => resolution !== "EXACT").length,
  officialCodeConnectInvoked: false,
  figmaMutationScope: registry.authority.figmaMutationScope,
  visualReviewBoards: registry.visualReviewBoards.length,
  networkCallbacks: 0,
  checkCount: checks.length,
  passCount: checks.filter(({ status }) => status === "PASS").length,
  failCount: failures.length,
  checks,
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
assert.equal(failures.length, 0, failures.join("\n"));
