#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const sourcePath = path.join(repoRoot, "authority/FEATURE-INTENT-SOURCE.json");
const ledgerPath = path.join(repoRoot, "authority/SITE-ROUTE-LEDGER.json");
const nativeNextRoutePath = path.join(repoRoot, "authority/imports/oluk-canonical-customer-route-registry.v1.json");
const featureRegistryPath = path.join(repoRoot, "authority/FEATURE-INTENT-REGISTRY.json");
const candidateRegistryPath = path.join(repoRoot, "authority/CANDIDATE-STANDALONE-ROUTE-REGISTRY.json");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const stableOutput = (value) => `${JSON.stringify(value, null, 2)}\n`;
const unique = (values) => [...new Set(values)];

const [sourceRaw, ledgerRaw, nativeNextRouteRaw] = await Promise.all([
  readFile(sourcePath, "utf8"),
  readFile(ledgerPath, "utf8"),
  readFile(nativeNextRoutePath, "utf8"),
]);
const source = JSON.parse(sourceRaw);
const ledger = JSON.parse(ledgerRaw);
const nativeNextRouteRegistry = JSON.parse(nativeNextRouteRaw);

if (!Array.isArray(ledger.routes) || ledger.routes.length !== 73) {
  throw new Error("The historical Sites route ledger must remain exactly 73 provenance rows");
}
if (
  nativeNextRouteRegistry.contract !== "OLUK_CANONICAL_CUSTOMER_ROUTE_REGISTRY_V1" ||
  nativeNextRouteRegistry.canonicalRouteCount !== 74 ||
  nativeNextRouteRegistry.routes?.length !== 74
) {
  throw new Error("The imported Native Next route authority must contain exactly 74 canonical routes");
}

const assertUnique = (values, label) => {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) throw new Error(`${label} contains duplicates: ${unique(duplicates).join(", ")}`);
};
const requireText = (value, label) => {
  if (typeof value !== "string" || value.trim().length === 0) throw new Error(`${label} must be non-empty text`);
};
const requireTextArray = (value, label, { allowEmpty = false } = {}) => {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0)) throw new Error(`${label} must be ${allowEmpty ? "an" : "a non-empty"} array`);
  value.forEach((item, index) => requireText(item, `${label}[${index}]`));
};

assertUnique(source.sources.map(({ id }) => id), "source ids");
assertUnique(source.sharedContracts.map(({ id }) => id), "shared contract ids");
assertUnique(source.features.map(({ id }) => id), "feature ids");
assertUnique(source.candidateStandaloneRoutes.map(({ path: routePath }) => routePath), "candidate route paths");
assertUnique(source.features.map(({ name }) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-")), "normalized feature names");

const sourcesById = new Map(source.sources.map((entry) => [entry.id, entry]));
const contractsById = new Map(source.sharedContracts.map((entry) => [entry.id, entry]));
const featureIds = new Set(source.features.map(({ id }) => id));
const historicalSitesPaths = new Set(ledger.routes.map(({ path: routePath }) => routePath));
const nativeNextCanonicalPaths = new Set(nativeNextRouteRegistry.routes.map(({ path: routePath }) => routePath));
const admittedDelta = [...nativeNextCanonicalPaths].filter((routePath) => !historicalSitesPaths.has(routePath)).sort();
const removedHistoricalPaths = [...historicalSitesPaths].filter((routePath) => !nativeNextCanonicalPaths.has(routePath)).sort();
if (admittedDelta.length !== 1 || admittedDelta[0] !== "/bundle-builder" || removedHistoricalPaths.length !== 0) {
  throw new Error(
    `Route-count law drift: expected historical Sites 73 + /bundle-builder = Native Next 74; admitted=${admittedDelta.join(",") || "none"}; removed=${removedHistoricalPaths.join(",") || "none"}`,
  );
}
const dispositions = new Set(["REBUILD", "INTENT_ONLY", "BLOCKED", "SUPERSEDED"]);
const candidateStates = new Set(["STANDALONE_READY", "CONTENT_INCOMPLETE", "DESIGN_INCOMPLETE"]);

const compiledFeatures = source.features.map((feature) => {
  ["id", "name", "family", "contract", "customerJob", "commercialJob", "disposition"].forEach((field) => requireText(feature[field], `feature ${feature.id ?? "unknown"}.${field}`));
  ["relationshipAndStateIntent", "contentRequirements", "runtimeDependencies", "standaloneHosts", "crossMountHosts"].forEach((field) => requireTextArray(feature[field], `feature ${feature.id}.${field}`, { allowEmpty: field === "standaloneHosts" || field === "crossMountHosts" || field === "runtimeDependencies" }));
  if (!dispositions.has(feature.disposition)) throw new Error(`feature ${feature.id} has an unsupported disposition`);
  const contract = contractsById.get(feature.contract);
  if (!contract) throw new Error(`feature ${feature.id} references unknown contract ${feature.contract}`);
  if (!Array.isArray(feature.sourceRefs) || feature.sourceRefs.length === 0) throw new Error(`feature ${feature.id} requires source attribution`);

  const sourceAttribution = feature.sourceRefs.map((reference) => {
    const origin = sourcesById.get(reference.sourceId);
    if (!origin) throw new Error(`feature ${feature.id} references unknown source ${reference.sourceId}`);
    return {
      sourceId: origin.id,
      title: origin.title,
      kind: origin.kind,
      fileKey: origin.fileKey ?? null,
      nodeId: reference.nodeId ?? origin.rootNodeId ?? null,
      sourceClass: origin.sourceClass,
      authority: origin.authority,
    };
  });

  return {
    id: feature.id,
    name: feature.name,
    family: feature.family,
    sharedContract: feature.contract,
    disposition: feature.disposition,
    customerJob: feature.customerJob,
    commercialJob: feature.commercialJob,
    relationshipAndStateIntent: feature.relationshipAndStateIntent,
    contentRequirements: feature.contentRequirements,
    runtimeDependencies: unique([...contract.defaultRuntimeDependencies, ...feature.runtimeDependencies]),
    hosts: {
      standalone: feature.standaloneHosts,
      crossMount: feature.crossMountHosts,
    },
    canonicalOlukDependencies: contract.canonicalDependencies,
    provenanceRequirements: {
      data: contract.dataProvenance,
      media: contract.mediaProvenance,
    },
    sourceAttribution,
  };
}).sort((a, b) => a.id.localeCompare(b.id));

const contractUsage = Object.fromEntries(
  source.sharedContracts
    .map((contract) => [contract.id, compiledFeatures.filter(({ sharedContract }) => sharedContract === contract.id).map(({ id }) => id)])
    .sort(([a], [b]) => a.localeCompare(b)),
);
for (const [contractId, consumers] of Object.entries(contractUsage)) {
  if (consumers.length === 0) throw new Error(`shared contract ${contractId} has no feature consumer`);
}

const featureStats = {
  total: compiledFeatures.length,
  byDisposition: Object.fromEntries([...dispositions].sort().map((disposition) => [disposition, compiledFeatures.filter((feature) => feature.disposition === disposition).length])),
  byFamily: Object.fromEntries(unique(compiledFeatures.map(({ family }) => family)).sort().map((family) => [family, compiledFeatures.filter((feature) => feature.family === family).length])),
};

const registryBase = {
  schemaVersion: "oluk.feature-intent-registry.v1",
  registryId: "OLUK-FEATURE-INTENT-001",
  status: "ATTRIBUTED_BUILD_INVENTORY_SITES_AUTHORITY_FIGMA_INTENT_ONLY",
  authorityDirection: source.authorityDirection,
  source: {
    path: "authority/FEATURE-INTENT-SOURCE.json",
    sha256: sha256(sourceRaw),
  },
  historicalSitesRouteLedger: {
    path: "authority/SITE-ROUTE-LEDGER.json",
    sha256: sha256(ledgerRaw),
    routeCount: ledger.routes.length,
    mutation: "NONE",
    authority: "HISTORICAL_PRESENTATION_PROVENANCE_ONLY",
  },
  nativeNextRouteAuthority: {
    path: "authority/imports/oluk-canonical-customer-route-registry.v1.json",
    sha256: sha256(nativeNextRouteRaw),
    routeCount: nativeNextRouteRegistry.routes.length,
    authority: "CANONICAL_CUSTOMER_ROUTE_ADMISSION",
  },
  routeCountLaw: {
    historicalSitesRouteDefinitions: ledger.routes.length,
    admittedDelta,
    canonicalNativeNextRouteDefinitions: nativeNextRouteRegistry.routes.length,
    equation: "73 historical Sites route definitions + /bundle-builder = 74 canonical Native Next route definitions",
  },
  laws: {
    figmaDisposition: "feature and relationship inventory only; never component or copy authority",
    generatedCodeDisposition: "discard",
    duplicateConceptPolicy: "one shared contract and one feature identity per customer job",
    runtimeBoundary: "presentation intent only; live authority remains separately gated",
    routeBoundary: "The 73-row Sites ledger is historical provenance; Native Next owns 74 canonical route definitions, with /bundle-builder as the explicit admitted delta.",
  },
  sharedContracts: source.sharedContracts.map((contract) => ({
    ...contract,
    featureIds: contractUsage[contract.id],
  })),
  stats: featureStats,
  features: compiledFeatures,
};
const featureContentHash = sha256(stableOutput(registryBase));
const featureRegistry = { ...registryBase, contentHash: featureContentHash };

const compileCandidate = (candidate, canonicalRouteMembership) => {
  requireText(candidate.path, "candidate route path");
  if (!candidate.path.startsWith("/")) throw new Error(`candidate path ${candidate.path} must be absolute`);
  if (historicalSitesPaths.has(candidate.path)) throw new Error(`candidate path ${candidate.path} already exists in the historical 73-row Sites ledger`);
  if (!candidateStates.has(candidate.status)) throw new Error(`candidate path ${candidate.path} has an unsupported status`);
  requireTextArray(candidate.featureIds, `candidate ${candidate.path}.featureIds`);
  candidate.featureIds.forEach((featureId) => {
    if (!featureIds.has(featureId)) throw new Error(`candidate path ${candidate.path} references unknown feature ${featureId}`);
  });
  ["customerJob", "commercialJob", "standaloneValue", "crossMountValue"].forEach((field) => requireText(candidate[field], `candidate ${candidate.path}.${field}`));
  requireTextArray(candidate.navigationCandidates, `candidate ${candidate.path}.navigationCandidates`);
  return {
    path: candidate.path,
    state: candidate.status,
    canonicalRouteMembership,
    routeAuthority: canonicalRouteMembership ? "NATIVE_NEXT_CANONICAL_ROUTE" : "UNADMITTED_ROUTE_CANDIDATE",
    promotionRequirement: canonicalRouteMembership
      ? "route is admitted; presentation remains gated by its explicit lifecycle state"
      : "complete Sites and Native Next candidates plus explicit route-authority admission",
    featureIds: candidate.featureIds,
    customerJob: candidate.customerJob,
    commercialJob: candidate.commercialJob,
    standaloneValue: candidate.standaloneValue,
    crossMountValue: candidate.crossMountValue,
    navigationCandidates: candidate.navigationCandidates,
    publicNavigationState: canonicalRouteMembership ? "ROUTE_ADMITTED_PRESENTATION_NOT_PROMOTED" : "NOT_PROMOTED",
  };
};
const promotedCanonicalRoutes = source.candidateStandaloneRoutes
  .filter((candidate) => nativeNextCanonicalPaths.has(candidate.path))
  .map((candidate) => compileCandidate(candidate, true))
  .sort((a, b) => a.path.localeCompare(b.path));
const compiledCandidateRoutes = source.candidateStandaloneRoutes
  .filter((candidate) => !nativeNextCanonicalPaths.has(candidate.path))
  .map((candidate) => compileCandidate(candidate, false))
  .sort((a, b) => a.path.localeCompare(b.path));

const candidateBase = {
  schemaVersion: "oluk.candidate-standalone-route-registry.v1",
  registryId: "OLUK-CANDIDATE-STANDALONE-ROUTES-001",
  status: "CANDIDATES_SEPARATE_FROM_NATIVE_NEXT_CANONICAL_74_ROUTE_AUTHORITY",
  featureRegistry: {
    path: "authority/FEATURE-INTENT-REGISTRY.json",
    contentHash: featureContentHash,
  },
  historicalSitesRouteLedger: {
    path: "authority/SITE-ROUTE-LEDGER.json",
    sha256: sha256(ledgerRaw),
    routeCount: ledger.routes.length,
    mutation: "NONE",
    authority: "HISTORICAL_PRESENTATION_PROVENANCE_ONLY",
  },
  nativeNextRouteAuthority: {
    path: "authority/imports/oluk-canonical-customer-route-registry.v1.json",
    sha256: sha256(nativeNextRouteRaw),
    routeCount: nativeNextRouteRegistry.routes.length,
    authority: "CANONICAL_CUSTOMER_ROUTE_ADMISSION",
  },
  routeCountLaw: {
    historicalSitesRouteDefinitions: ledger.routes.length,
    admittedDelta,
    canonicalNativeNextRouteDefinitions: nativeNextRouteRegistry.routes.length,
    equation: "73 historical Sites route definitions + /bundle-builder = 74 canonical Native Next route definitions",
  },
  allowedStates: [...candidateStates].sort(),
  candidateCount: compiledCandidateRoutes.length,
  routes: compiledCandidateRoutes,
  promotedCanonicalRoutes,
};
const candidateRegistry = { ...candidateBase, contentHash: sha256(stableOutput(candidateBase)) };

const outputs = [
  [featureRegistryPath, stableOutput(featureRegistry), "feature intent registry"],
  [candidateRegistryPath, stableOutput(candidateRegistry), "candidate standalone route registry"],
];
if (process.argv.includes("--check")) {
  for (const [outputPath, output, label] of outputs) {
    if (await readFile(outputPath, "utf8") !== output) throw new Error(`${label} is stale; run npm run feature-intent:generate`);
  }
  process.stdout.write(`PASS feature intent ${featureRegistry.contentHash} · ${compiledFeatures.length} features · ${compiledCandidateRoutes.length} unadmitted candidates · ${promotedCanonicalRoutes.length} promoted candidate · canonical Native Next routes ${nativeNextRouteRegistry.routes.length}\n`);
} else {
  for (const [outputPath, output] of outputs) await writeFile(outputPath, output);
  process.stdout.write(`WROTE feature intent ${featureRegistry.contentHash} · ${compiledFeatures.length} features · ${compiledCandidateRoutes.length} unadmitted candidates · ${promotedCanonicalRoutes.length} promoted candidate · canonical Native Next routes ${nativeNextRouteRegistry.routes.length}\n`);
}
