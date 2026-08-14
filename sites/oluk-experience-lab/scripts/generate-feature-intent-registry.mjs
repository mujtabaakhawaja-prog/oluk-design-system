#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const sourcePath = path.join(repoRoot, "authority/FEATURE-INTENT-SOURCE.json");
const ledgerPath = path.join(repoRoot, "authority/SITE-ROUTE-LEDGER.json");
const featureRegistryPath = path.join(repoRoot, "authority/FEATURE-INTENT-REGISTRY.json");
const candidateRegistryPath = path.join(repoRoot, "authority/CANDIDATE-STANDALONE-ROUTE-REGISTRY.json");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const stableOutput = (value) => `${JSON.stringify(value, null, 2)}\n`;
const unique = (values) => [...new Set(values)];

const [sourceRaw, ledgerRaw] = await Promise.all([readFile(sourcePath, "utf8"), readFile(ledgerPath, "utf8")]);
const source = JSON.parse(sourceRaw);
const ledger = JSON.parse(ledgerRaw);

if (!Array.isArray(ledger.routes) || ledger.routes.length !== 73) {
  throw new Error("The canonical route ledger must remain exactly 73 routes");
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
const canonicalPaths = new Set(ledger.routes.map(({ path: routePath }) => routePath));
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
  canonicalRouteLedger: {
    path: "authority/SITE-ROUTE-LEDGER.json",
    sha256: sha256(ledgerRaw),
    routeCount: ledger.routes.length,
    mutation: "NONE",
  },
  laws: {
    figmaDisposition: "feature and relationship inventory only; never component or copy authority",
    generatedCodeDisposition: "discard",
    duplicateConceptPolicy: "one shared contract and one feature identity per customer job",
    runtimeBoundary: "presentation intent only; live authority remains separately gated",
    routeBoundary: "candidate standalone paths do not enter the canonical 73-route ledger without owner selection",
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

const compiledCandidateRoutes = source.candidateStandaloneRoutes.map((candidate) => {
  requireText(candidate.path, "candidate route path");
  if (!candidate.path.startsWith("/")) throw new Error(`candidate path ${candidate.path} must be absolute`);
  if (canonicalPaths.has(candidate.path)) throw new Error(`candidate path ${candidate.path} already exists in the canonical 73-route ledger`);
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
    canonicalLedgerMembership: false,
    promotionRequirement: "complete Sites and native Figma options plus explicit owner selection",
    featureIds: candidate.featureIds,
    customerJob: candidate.customerJob,
    commercialJob: candidate.commercialJob,
    standaloneValue: candidate.standaloneValue,
    crossMountValue: candidate.crossMountValue,
    navigationCandidates: candidate.navigationCandidates,
    publicNavigationState: "NOT_PROMOTED",
  };
}).sort((a, b) => a.path.localeCompare(b.path));

const candidateBase = {
  schemaVersion: "oluk.candidate-standalone-route-registry.v1",
  registryId: "OLUK-CANDIDATE-STANDALONE-ROUTES-001",
  status: "CANDIDATES_SEPARATE_FROM_CANONICAL_73_ROUTE_LEDGER",
  featureRegistry: {
    path: "authority/FEATURE-INTENT-REGISTRY.json",
    contentHash: featureContentHash,
  },
  canonicalRouteLedger: {
    path: "authority/SITE-ROUTE-LEDGER.json",
    sha256: sha256(ledgerRaw),
    routeCount: ledger.routes.length,
    mutation: "NONE",
  },
  allowedStates: [...candidateStates].sort(),
  candidateCount: compiledCandidateRoutes.length,
  routes: compiledCandidateRoutes,
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
  process.stdout.write(`PASS feature intent ${featureRegistry.contentHash} · ${compiledFeatures.length} features · ${compiledCandidateRoutes.length} candidate routes · canonical ledger ${ledger.routes.length}\n`);
} else {
  for (const [outputPath, output] of outputs) await writeFile(outputPath, output);
  process.stdout.write(`WROTE feature intent ${featureRegistry.contentHash} · ${compiledFeatures.length} features · ${compiledCandidateRoutes.length} candidate routes · canonical ledger ${ledger.routes.length}\n`);
}
