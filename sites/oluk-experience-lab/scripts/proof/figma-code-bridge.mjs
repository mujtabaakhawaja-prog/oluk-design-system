#!/usr/bin/env node

import assert from "node:assert/strict";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const repositoryRoot = path.resolve(siteRoot, "../..");
const registryPath = path.join(repositoryRoot, "authority/FIGMA-CODE-BRIDGE.json");
const publicPath = path.join(siteRoot, "public/.well-known/oluk-figma-code-bridge.json");
const typedContractPath = path.join(siteRoot, "app/design-system/figma-code-bridge.ts");
const routeMatrixPath = path.join(siteRoot, "scripts/proof/route-matrix.mjs");
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
check(registry.authority.officialCodeConnectInvoked === false, "official Code Connect is not invoked");
check(registry.authority.figmaMutationPerformed === true, "bounded Figma documentation writes are recorded truthfully");
check(
  registry.authority.figmaMutationScope === "REGISTRY_COPY_CORRECTION_AND_UNPUBLISHED_VISUAL_REVIEW_BOARDS_ONLY",
  "Figma write scope is limited to registry copy and unpublished visual review boards",
);
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
check(registry.componentMappings.length === 15, "15 exact component mappings are registered");

const typedContractSource = await readFile(typedContractPath, "utf8");
for (const mapping of registry.componentMappings) {
  const absoluteFile = path.join(repositoryRoot, mapping.code.file);
  check(await exists(absoluteFile), `${mapping.id} code file exists`);
  if (!(await exists(absoluteFile))) continue;
  const source = await readFile(absoluteFile, "utf8");
  const declarations = exportedDeclarations(source, absoluteFile);
  check(declarations.values.has(mapping.code.export), `${mapping.id} export ${mapping.code.export} exists`);
  check(declarations.types.has(mapping.code.propsType), `${mapping.id} props type ${mapping.code.propsType} exists`);
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
check(
  registry.figmaBoardObservations.some(
    ({ nodeId, boardDeclaredSourceNodeId, label }) =>
      nodeId === "765:98" && boardDeclaredSourceNodeId === "743:282" && label === "CanonicalInstance/Shop",
  ),
  "actual Shop instance and its Featured source are both retained as provenance",
);

const routeMatrix = await readFile(routeMatrixPath, "utf8");
for (const route of registry.routeMappings) {
  for (const codeFile of route.codeFiles) {
    check(await exists(path.join(repositoryRoot, codeFile)), `${route.id} route source ${codeFile} exists`);
  }
  for (const resolvedPath of route.resolvedPaths) {
    const basePath = resolvedPath.split("?")[0];
    check(routeMatrix.includes(`path: "${basePath}"`), `${route.id} resolved path ${basePath} is in the executable route matrix`);
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
for (const token of registry.bridgeTokens) {
  check(
    tokenMaps.some((tokenMap) => tokenMap.get(token.css) === normalized(token.value)),
    `${token.css} resolves to ${token.value}`,
  );
}
check(
  registry.tokenCollections.reduce((total, collection) => total + collection.count, 0) === 98,
  "token collection counts total 98",
);

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
