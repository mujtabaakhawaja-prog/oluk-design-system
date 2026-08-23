import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "../../..");
const authorityDir = resolve(repoRoot, "authority");
const generatedDir = resolve(authorityDir, "generated");
const checkOnly = process.argv.includes("--check");

const paths = {
  nodeSource: resolve(authorityDir, "OLUK-DESIGN-NODE-SOURCE-V1.json"),
  patchTargets: resolve(authorityDir, "OLUK-DESIGN-PATCH-TARGETS-V1.json"),
  sourceRegister: resolve(authorityDir, "OLUK-VISUAL-WORKBENCH-SOURCE-REGISTER-V1.json"),
  census: resolve(generatedDir, "OLUK-COMPONENT-CENSUS-V1.json"),
  inventory: resolve(generatedDir, "OLUK-SURFACE-INVENTORY-V1.json"),
  presentation: resolve(generatedDir, "OLUK-PRESENTATION-SYSTEM-V2.json"),
  routeAuthority: resolve(generatedDir, "OLUK-ROUTE-PRESENTATION-AUTHORITY-V1.json"),
  routeImport: resolve(authorityDir, "imports/oluk-canonical-customer-route-registry.v1.json"),
  productImport: resolve(authorityDir, "imports/canonical-customer-product-registry.v2.json"),
};

const outputs = {
  nodeContract: resolve(generatedDir, "OLUK-DESIGN-NODE-CONTRACT-V1.json"),
  designConnect: resolve(generatedDir, "OLUK-DESIGN-CONNECT-V1.json"),
  messageContract: resolve(generatedDir, "OLUK-WORKBENCH-MESSAGE-V1.json"),
  patchSchema: resolve(generatedDir, "OLUK-DESIGN-PATCH-V1.schema.json"),
  patchTargets: resolve(generatedDir, "OLUK-DESIGN-PATCH-TARGETS-V1.json"),
  digests: resolve(generatedDir, "OLUK-VISUAL-WORKBENCH-DIGESTS-V1.json"),
  approval: resolve(generatedDir, "OLUK-PRESENTATION-APPROVAL-V1.pending.json"),
};

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

function canonical(value) {
  return JSON.stringify(stable(value));
}

function pretty(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function sha256Text(value) {
  return createHash("sha256").update(value).digest("hex");
}

function contentDigest(value) {
  return sha256Text(canonical(value));
}

function patchControlSchema(control) {
  if (control.type === "enum") return { enum: control.values };
  if (control.type === "boolean") return { type: "boolean" };
  if (control.type === "number") return { type: "number" };
  return { type: "string" };
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function fileDigest(path) {
  return sha256Text(await readFile(path));
}

function unique(values) {
  return [...new Set(values)].sort();
}

function titleFromId(id) {
  return id
    .split(".")
    .slice(1)
    .join(" ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function mergeDefaults(node, defaults) {
  return {
    id: node.id,
    name: node.name,
    kind: node.kind,
    ...(node.renderAs ? { renderAs: node.renderAs } : {}),
    ownership: {
      repository: "design",
      sourcePath: node.sourcePath,
      exportName: node.exportName,
    },
    relationships: {
      parentIds: unique(node.parentIds ?? []),
      childIds: unique(node.childIds ?? []),
      allowedSlotIds: unique(node.allowedSlotIds ?? defaults.allowedSlotIds ?? []),
      allowedRouteIds: unique(node.allowedRouteIds ?? defaults.allowedRouteIds ?? []),
    },
    controls: node.controls ?? [],
    variants: node.variants ?? defaults.variants ?? ["default"],
    states: node.states ?? defaults.states ?? ["default"],
    responsiveModes: node.responsiveModes ?? ["1440", "1024", "768", "390"],
    fieldIds: unique(node.fieldIds ?? []),
    contentIds: unique(node.contentIds ?? []),
    mediaRoleIds: unique(node.mediaRoleIds ?? []),
    adoption: node.adoption ?? defaults.adoption,
  };
}

function synthesizeDependencyNodes(nodes, kind, property) {
  const ids = unique(nodes.flatMap((node) => node[property] ?? []));
  return ids.map((id) => {
    const parents = nodes.filter((node) => (node[property] ?? []).includes(id));
    const owner = parents[0];
    return {
      id,
      name: `${kind === "field" ? "Field" : "Content"} / ${titleFromId(id)}`,
      kind,
      ownership: owner.ownership,
      relationships: {
        parentIds: unique(parents.map((node) => node.id)),
        childIds: [],
        allowedSlotIds: unique(parents.flatMap((node) => node.relationships.allowedSlotIds)),
        allowedRouteIds: unique(parents.flatMap((node) => node.relationships.allowedRouteIds)),
      },
      controls: [],
      variants: ["default"],
      states: unique(parents.flatMap((node) => node.states)),
      responsiveModes: ["1440", "1024", "768", "390"],
      fieldIds: kind === "field" ? [id] : [],
      contentIds: kind === "content" ? [id] : [],
      mediaRoleIds: [],
      adoption: owner.adoption,
    };
  });
}

function validateSource({ nodeSource, presentation, routeAuthority, inventory, census, routeImport, productImport }) {
  const allowedKinds = new Set(["primitive", "component", "module", "slot", "template", "content", "field"]);
  const ids = nodeSource.nodes.map((node) => node.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) throw new Error(`Duplicate semantic node IDs: ${unique(duplicates).join(", ")}`);
  const unknownKinds = nodeSource.nodes.filter((node) => !allowedKinds.has(node.kind));
  if (unknownKinds.length) throw new Error(`Unknown node kinds: ${unknownKinds.map((node) => `${node.id}:${node.kind}`).join(", ")}`);
  for (const node of nodeSource.nodes) {
    if (!node.sourcePath || !node.exportName) throw new Error(`Missing source ownership for ${node.id}`);
  }
  if (routeImport.routes?.length !== 74 || routeAuthority.routeCount !== 74 || inventory.counts?.routeDefinitions !== 74) {
    throw new Error("The Native Next route snapshot, route authority, and inventory must each contain exactly 74 routes");
  }
  if (productImport.products?.length !== 15 || inventory.counts?.productRouteInstances !== 15) {
    throw new Error("The product snapshot and surface inventory must each contain exactly 15 PDP instances");
  }
  if (!Array.isArray(census.components) || census.components.length === 0) throw new Error("Component census is empty");
  if (!nodeSource.projectionModes?.includes("real")) throw new Error("Projection modes must include exact `real` mode");

  const forbiddenAliases = new Set([
    "component.pdp-media-chamber",
    "component.product-attribute-grid",
    "component.pdp-first-fold",
    "field.product.strength-display",
    "field.product.servings-display",
    "field.evidence.purity-display",
    "field.commerce.quantity",
  ]);
  const serializedActiveContracts = JSON.stringify({ nodeSource, inventory, presentation, routeAuthority });
  const activeAliases = [...forbiddenAliases].filter((id) => serializedActiveContracts.includes(`"${id}"`));
  if (activeAliases.length) throw new Error(`Forbidden current-slice semantic aliases: ${activeAliases.join(", ")}`);

  for (const component of census.components) {
    if (!component.semanticDisposition || !component.semanticDispositionReason || !component.routeTrain) {
      throw new Error(`Census export lacks explicit semantic disposition: ${component.governingSource}#${component.sourceExport}`);
    }
    if (component.pageTemplates?.includes("shared") || component.runtimeStudioAdoption === "not_assessed" || !component.routeModuleUsage?.length) {
      throw new Error(`Census export retains ambiguous active metadata: ${component.governingSource}#${component.sourceExport}`);
    }
    if (component.semanticDisposition === "INVENTORY_ONLY" && !component.requiresRegistrationBeforeAdoption) {
      throw new Error(`Inventory-only export must fail closed before adoption: ${component.governingSource}#${component.sourceExport}`);
    }
  }
}

function nextTargetFor(node) {
  const explicit = {
    "component.product-commerce-card": "src/components/commerce/ProductCommerceCard.tsx#ProductCommerceCard",
    "component.product-media-chamber": "app/sites-home/design-system/product-media-chamber.tsx#ProductMediaChamber",
    "component.metric-rail": "app/presentation-system/components/MetricRail.tsx#MetricRail",
    "component.metric-cell.strength": "app/presentation-system/components/MetricRail.tsx#MetricCell",
    "component.metric-cell.servings": "app/presentation-system/components/MetricRail.tsx#MetricCell",
    "component.metric-cell.purity": "app/presentation-system/components/MetricRail.tsx#MetricCell",
    "component.pdp-atmospheric-media-field": "app/presentation-system/modules/pdp/PdpAtmosphericMediaField.tsx#PdpAtmosphericMediaField",
    "component.purchase-panel": "app/presentation-system/modules/pdp/PurchasePanel.tsx#PurchasePanel",
    "component.product-identity": "app/presentation-system/modules/pdp/PurchasePanel.tsx#ProductIdentity",
    "component.status-stack": "app/presentation-system/modules/pdp/PurchasePanel.tsx#StatusStack",
    "status.stock": "app/presentation-system/modules/pdp/PurchasePanel.tsx#StockStatus",
    "status.evidence": "app/presentation-system/modules/pdp/PurchasePanel.tsx#EvidenceStatus",
    "component.purchase-configuration": "app/presentation-system/modules/pdp/PurchasePanel.tsx#PurchaseConfiguration",
    "primitive.purchase-package-option": "app/presentation-system/modules/pdp/PurchasePanel.tsx#PurchasePackageOption",
    "component.price-block": "app/presentation-system/modules/pdp/PurchasePanel.tsx#PriceBlock",
    "component.quantity-stepper": "app/presentation-system/modules/pdp/PurchasePanel.tsx#QuantityStepper",
    "component.purchase-actions": "app/presentation-system/modules/pdp/PurchasePanel.tsx#PurchaseActions",
    "action.purchase.primary": "app/presentation-system/modules/pdp/PurchasePanel.tsx#PrimaryAction",
    "action.openlab.record": "app/presentation-system/modules/pdp/PurchasePanel.tsx#OpenLabAction",
    "module.pdp-first-fold": "app/presentation-system/modules/pdp/PdpFirstFoldCandidate.tsx#PdpFirstFoldCandidate",
  };
  if (explicit[node.id]) return explicit[node.id];
  if (node.kind === "field" || node.kind === "content") return "app/presentation-system/adapters/pdp-view-model.ts";
  return null;
}

async function emit(path, value) {
  const serialized = pretty(value);
  if (checkOnly) {
    let current;
    try {
      current = await readFile(path, "utf8");
    } catch {
      throw new Error(`Missing generated output: ${path}`);
    }
    if (current !== serialized) throw new Error(`Generated output drift: ${path}`);
    return;
  }
  await writeFile(path, serialized);
}

const [nodeSource, patchTargetSource, sourceRegister, census, inventory, presentation, routeAuthority, routeImport, productImport] = await Promise.all([
  readJson(paths.nodeSource),
  readJson(paths.patchTargets),
  readJson(paths.sourceRegister),
  readJson(paths.census),
  readJson(paths.inventory),
  readJson(paths.presentation),
  readJson(paths.routeAuthority),
  readJson(paths.routeImport),
  readJson(paths.productImport),
]);

validateSource({ nodeSource, presentation, routeAuthority, inventory, census, routeImport, productImport });

const explicitNodes = nodeSource.nodes.map((node) => mergeDefaults(node, nodeSource.defaults));
const dependencyNodes = [
  ...synthesizeDependencyNodes(explicitNodes, "field", "fieldIds"),
  ...synthesizeDependencyNodes(explicitNodes, "content", "contentIds"),
];
const allNodes = [...explicitNodes, ...dependencyNodes].sort((left, right) => left.id.localeCompare(right.id));
const allIds = new Set(allNodes.map((node) => node.id));
const emittedSemanticNodeIds = unique(census.components.flatMap((component) => component.fileSemanticNodeIds ?? []));
const unknownEmittedSemanticNodeIds = emittedSemanticNodeIds.filter((id) => !allIds.has(id));
if (unknownEmittedSemanticNodeIds.length) {
  throw new Error(`Design source emits unregistered data-oluk-node values: ${unknownEmittedSemanticNodeIds.join(", ")}`);
}
for (const node of allNodes) {
  const unknownChildren = node.relationships.childIds.filter((id) => !allIds.has(id));
  if (unknownChildren.length) throw new Error(`${node.id} has unknown children: ${unknownChildren.join(", ")}`);
  const unknownParents = node.relationships.parentIds.filter((id) => !allIds.has(id));
  if (unknownParents.length) throw new Error(`${node.id} has unknown parents: ${unknownParents.join(", ")}`);
}

const explicitNodesByCoordinate = new Map();
for (const node of explicitNodes) {
  const coordinate = `${node.ownership.sourcePath}#${node.ownership.exportName}`;
  explicitNodesByCoordinate.set(coordinate, [...(explicitNodesByCoordinate.get(coordinate) ?? []), node.id].sort());
}
const sharedExportGroupsByCoordinate = new Map(
  (nodeSource.sharedExportGroups ?? []).map((group) => [`${group.sourcePath}#${group.exportName}`, group]),
);
for (const [coordinate, nodeIds] of explicitNodesByCoordinate) {
  if (nodeIds.length < 2) continue;
  const group = sharedExportGroupsByCoordinate.get(coordinate);
  if (!group || !group.justification?.trim() || JSON.stringify([...group.nodeIds].sort()) !== JSON.stringify(nodeIds)) {
    throw new Error(`Shared export lacks an exact semantic-role justification: ${coordinate} -> ${nodeIds.join(", ")}`);
  }
}
for (const [coordinate, group] of sharedExportGroupsByCoordinate) {
  if (!explicitNodesByCoordinate.has(coordinate)) throw new Error(`Shared-export group references an unknown source export: ${group.id}`);
}

const requiredPdpNodeIds = [
  "component.product-commerce-card",
  "component.product-media-chamber",
  "component.pdp-atmospheric-media-field",
  "component.purchase-panel",
  "component.metric-rail",
  "module.pdp-first-fold",
];
for (const id of requiredPdpNodeIds) {
  if (!allIds.has(id)) throw new Error(`Current PDP semantic slice is not registered: ${id}`);
  if (!inventory.entities.some((entity) => entity.id === id)) throw new Error(`Surface inventory is missing current PDP semantic node: ${id}`);
  const ids = id.startsWith("module.") ? presentation.moduleIds : presentation.componentIds;
  if (!ids.includes(id)) throw new Error(`Presentation V2 is missing current PDP semantic node: ${id}`);
}

const explicitNodesById = new Map(explicitNodes.map((node) => [node.id, node]));
for (const target of patchTargetSource.targets) {
  const node = explicitNodesById.get(target.nodeId);
  if (!node) throw new Error(`Patch target references unknown node: ${target.nodeId}`);
  if (target.sourcePath !== node.ownership.sourcePath || target.targetExport !== node.ownership.exportName) {
    throw new Error(`Patch target ownership drift for ${target.nodeId}`);
  }
  const patchableControls = new Map(node.controls.filter((control) => control.patchable).map((control) => [control.id, control]));
  for (const control of target.controls) {
    const declared = patchableControls.get(control.id);
    if (!declared) throw new Error(`Patch target exposes undeclared control: ${target.nodeId}.${control.id}`);
    if (declared.type !== control.type || declared.sourceProp !== control.sourceProp) {
      throw new Error(`Patch target control drift for ${target.nodeId}.${control.id}`);
    }
  }
}

const patchTargets = {
  contract: "OLUK_DESIGN_PATCH_TARGETS_V1",
  schemaVersion: "1.0.0",
  status: "LOCAL_DESIGN_WRITER_ALLOWLIST",
  targetRepository: "oluk-design-system",
  laws: patchTargetSource.laws,
  targets: await Promise.all(patchTargetSource.targets.map(async (target) => ({
    ...target,
    sourceSha256: await fileDigest(resolve(repoRoot, target.sourcePath)),
  }))),
};
const patchTargetsDigest = contentDigest(patchTargets);

const censusReconciliation = census.components.map((component) => {
  const sourcePath = component.governingSource.startsWith("sites/")
    ? component.governingSource
    : `sites/oluk-experience-lab/${component.governingSource}`;
  return {
    sourcePath,
    exportName: component.sourceExport,
    family: component.family,
    semanticNodeIds: component.semanticNodeIds,
    disposition: component.semanticDisposition,
    reason: component.semanticDispositionReason,
    routeTrain: component.routeTrain,
    pageTemplates: component.pageTemplates,
    routeModuleUsage: component.routeModuleUsage,
    runtimeStudioAdoption: component.runtimeStudioAdoption,
    requiresRegistrationBeforeAdoption: component.requiresRegistrationBeforeAdoption,
  };
});

const nodeContract = {
  contract: "OLUK_DESIGN_NODE_CONTRACT_V1",
  schemaVersion: "1.0.0",
  status: "CANDIDATE_PENDING_HUMAN_REVIEW",
  projectionModes: nodeSource.projectionModes,
  responsiveModes: nodeSource.responsiveModes.map(String),
  routeAuthority: {
    owner: "native-next",
    snapshotSourceSha: nodeSource.routeImport.snapshotSourceSha,
    snapshotSha256: await fileDigest(paths.routeImport),
    routeCount: routeImport.routes.length,
    productInstanceCount: productImport.products.length,
    legacyEmbeddedSourceIsProvenanceOnly: true,
  },
  counts: {
    nodes: allNodes.length,
    explicitNodes: explicitNodes.length,
    synthesizedFieldNodes: dependencyNodes.filter((node) => node.kind === "field").length,
    synthesizedContentNodes: dependencyNodes.filter((node) => node.kind === "content").length,
    censusExports: census.components.length,
    registeredEditableExports: censusReconciliation.filter((entry) => entry.disposition === "REGISTERED_EDITABLE_NODE").length,
    inventoryOnlyExports: censusReconciliation.filter((entry) => entry.disposition === "INVENTORY_ONLY").length,
    emittedSemanticNodeIds: emittedSemanticNodeIds.length,
  },
  laws: [
    "Semantic node names supplement correct HTML; they never replace accessible headings, actions, lists, definitions, landmarks, or disclosures.",
    "PDP atmospheric media and bounded non-PDP media chambers are distinct contracts.",
    "Fixture, contract, and real projections never substitute for one another.",
    "Feature exposure applies to an approved route placement, never to component anatomy or truth.",
    "Source, approval, merge, deployment, and live-proof states remain distinct.",
  ],
  nodes: allNodes,
  censusReconciliation,
  sourceRegisterDigest: contentDigest(sourceRegister),
};

const nodeContractDigest = contentDigest(nodeContract);
const designConnect = {
  contract: "OLUK_DESIGN_CONNECT_V1",
  schemaVersion: "1.0.0",
  status: "CANDIDATE_PENDING_NEXT_BINDING",
  nodeContractDigest,
  designSource: {
    repository: "oluk-design-system",
    baseSha: sourceRegister.base.sha,
    candidateSha: null,
  },
  reviewSurfaces: {
    systemAtlas: "http://127.0.0.1:4193/system-atlas",
    reviewStudio: "http://127.0.0.1:4193/review-studio",
    sitesPdp: "http://127.0.0.1:4193/product/mk-2866",
    workbench: "http://127.0.0.1:4195/workbench",
    runtimeStudio: "http://127.0.0.1:4191/owner-tools/runtime-studio",
  },
  mappings: allNodes.map((node) => ({
    nodeId: node.id,
    designSource: `${node.ownership.sourcePath}#${node.ownership.exportName}`,
    atlasSpecimen: `/system-atlas?node=${encodeURIComponent(node.id)}`,
    reviewCandidate: `/review-studio?node=${encodeURIComponent(node.id)}`,
    sitesPlacement: node.relationships.allowedRouteIds.includes("route.product") ? "/product/mk-2866" : null,
    nextImplementation: nextTargetFor(node),
    runtimeStudioSpecimen: `/owner-tools/runtime-studio?node=${encodeURIComponent(node.id)}`,
    nativeNextSlotIds: node.relationships.allowedSlotIds,
    adoption: node.adoption,
    bindingRole: node.kind,
    sharedExportGroup: sharedExportGroupsByCoordinate.get(`${node.ownership.sourcePath}#${node.ownership.exportName}`)?.id ?? null,
    sharedExportJustification: sharedExportGroupsByCoordinate.get(`${node.ownership.sourcePath}#${node.ownership.exportName}`)?.justification ?? (node.kind === "field" || node.kind === "content" ? "Synthesized dependency binding owned by its presentation adapter." : null),
  })),
};

const messageContract = {
  contract: "OLUK_WORKBENCH_MESSAGE_V1",
  schemaVersion: "1.0.0",
  status: "LOCAL_ONLY_READ_ONLY_V1",
  allowedOrigins: [
    "http://127.0.0.1:4191",
    "http://localhost:4191",
    "http://127.0.0.1:4193",
    "http://localhost:4193",
    "http://127.0.0.1:4195",
    "http://localhost:4195",
  ],
  events: [
    { type: "node.select", direction: "bidirectional", payload: ["nodeId", "routeId", "viewport", "state", "digest"] },
    { type: "node.highlight", direction: "workbench_to_preview", payload: ["nodeId"] },
    { type: "node.parents", direction: "preview_to_workbench", payload: ["nodeId", "parentIds"] },
    { type: "projection.change", direction: "bidirectional", payload: ["projection"] },
    { type: "viewport.change", direction: "workbench_to_preview", payload: ["viewport"] },
    { type: "state.change", direction: "workbench_to_preview", payload: ["nodeId", "state"] },
    { type: "annotation.create", direction: "workbench_local", payload: ["annotationId", "nodeId", "routeId", "viewport", "state", "digest", "text"] },
    { type: "annotation.resolve", direction: "workbench_local", payload: ["annotationId", "digest"] },
    { type: "capture.request", direction: "workbench_to_preview", payload: ["routeId", "viewport", "state", "digest"] },
  ],
  security: {
    wildcardOriginsForbidden: true,
    arbitraryJavaScriptForbidden: true,
    rawHtmlReplacementForbidden: true,
    directSourceWritingForbidden: true,
    publicRuntimeForbidden: true,
  },
};

const patchSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "OLUK_DESIGN_PATCH_V1",
  title: "OLUK Design Patch V1",
  type: "object",
  additionalProperties: false,
  required: ["contract", "patchId", "nodeId", "base", "changes", "targetRepository", "targetExport"],
  properties: {
    contract: { const: "OLUK_DESIGN_PATCH_V1" },
    patchId: { type: "string", pattern: "^sha256:[a-f0-9]{64}$" },
    nodeId: { type: "string", minLength: 1 },
    base: {
      type: "object",
      additionalProperties: false,
      required: ["nodeContractDigest", "targetRegistryDigest", "sourceSha256"],
      properties: {
        nodeContractDigest: { type: "string", pattern: "^[a-f0-9]{64}$" },
        targetRegistryDigest: { type: "string", pattern: "^[a-f0-9]{64}$" },
        sourceSha256: { type: "string", pattern: "^[a-f0-9]{64}$" },
      },
    },
    changes: {
      type: "object",
      minProperties: 1,
      additionalProperties: { oneOf: [{ type: "string" }, { type: "number" }, { type: "boolean" }] },
    },
    targetRepository: { const: "oluk-design-system" },
    targetExport: { type: "string", minLength: 1 },
  },
  oneOf: patchTargetSource.targets.map((target) => ({
    properties: {
      nodeId: { const: target.nodeId },
      targetExport: { const: target.targetExport },
      changes: {
        type: "object",
        minProperties: 1,
        additionalProperties: false,
        properties: Object.fromEntries(target.controls.map((control) => [control.id, patchControlSchema(control)])),
      },
    },
  })),
  laws: [
    "Version one writes only the Design producer; downstream Native Next adoption is a separate generated-consumer operation.",
    "Only controls declared patchable by the semantic node may appear in changes.",
    "The exact node-contract, target-registry, and source digests must match before preview or apply.",
    "Version one forbids arbitrary CSS and free-form source editing.",
    "The browser may export a canonical patch but has no filesystem write authority.",
    "An immutable CLI preview receipt and exact confirmation phrase precede explicit local apply.",
  ],
};

const baseArtifactDigests = {
  inventory: contentDigest(inventory),
  presentation: contentDigest(presentation),
  routeAuthority: contentDigest(routeAuthority),
  componentCensus: contentDigest(census),
  nodeContract: nodeContractDigest,
  designConnect: contentDigest(designConnect),
  messageContract: contentDigest(messageContract),
  patchSchema: contentDigest(patchSchema),
  patchTargets: patchTargetsDigest,
  sourceRegister: contentDigest(sourceRegister),
};

const digestManifest = {
  contract: "OLUK_VISUAL_WORKBENCH_DIGESTS_V1",
  schemaVersion: "1.0.0",
  algorithm: "sha256(canonical-json-recursive-key-sort)",
  status: "CANDIDATE_PENDING_HUMAN_REVIEW",
  routeSnapshotSha256: await fileDigest(paths.routeImport),
  productSnapshotSha256: await fileDigest(paths.productImport),
  artifacts: baseArtifactDigests,
};

const approval = {
  contract: "OLUK_PRESENTATION_APPROVAL_V1",
  schemaVersion: "1.0.0",
  status: "PENDING_HUMAN_REVIEW",
  design: {
    baseSha: sourceRegister.base.sha,
    candidateSha: null,
    inventoryDigest: baseArtifactDigests.inventory,
    presentationDigest: baseArtifactDigests.presentation,
    routeAuthorityDigest: baseArtifactDigests.routeAuthority,
    nodeContractDigest: baseArtifactDigests.nodeContract,
    designConnectDigest: baseArtifactDigests.designConnect,
    messageContractDigest: baseArtifactDigests.messageContract,
    patchSchemaDigest: baseArtifactDigests.patchSchema,
    patchTargetsDigest: baseArtifactDigests.patchTargets,
  },
  next: { candidateSha: null, bindingDigest: null },
  scope: {
    routeIds: ["route.product"],
    slotIds: ["slot.product-detail.pdp.first-fold"],
    moduleIds: ["module.pdp-first-fold"],
    nodeIds: explicitNodes.map((node) => node.id),
    productInstanceCount: 15,
    projections: ["contract", "fixture", "real"],
  },
  captures: [1440, 1024, 768, 390].map((viewport) => ({ viewport, sitesSha256: null, nextSha256: null })),
  decision: null,
  decidedAt: null,
  decidedBy: null,
};

await emit(outputs.nodeContract, nodeContract);
await emit(outputs.designConnect, designConnect);
await emit(outputs.messageContract, messageContract);
await emit(outputs.patchSchema, patchSchema);
await emit(outputs.patchTargets, patchTargets);
await emit(outputs.digests, digestManifest);
await emit(outputs.approval, approval);

console.log(JSON.stringify({
  ok: true,
  mode: checkOnly ? "check" : "write",
  routeCount: routeImport.routes.length,
  productInstanceCount: productImport.products.length,
  explicitNodes: explicitNodes.length,
  totalNodes: allNodes.length,
  digests: baseArtifactDigests,
}, null, 2));
