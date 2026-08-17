#!/usr/bin/env node

import { createHash } from "node:crypto";
import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const inputs = {
  schema: path.join(repoRoot, "authority/PRODUCT-CONTENT-CONTRACT.schema.json"),
  registry: path.join(repoRoot, "authority/PRODUCT-CONTENT-REGISTRY.json"),
  provenance: path.join(repoRoot, "authority/COPY-SOURCE-PROVENANCE-LEDGER.json"),
  routes: path.join(repoRoot, "authority/ROUTE-CONTENT-CONSUMPTION-MATRIX.json"),
  slots: path.join(repoRoot, "authority/PRODUCT-CONTENT-SLOT-CATALOGUE.json"),
  familyTemplates: path.join(repoRoot, "authority/FAMILY-CONTENT-TEMPLATE-CONTRACTS.json"),
};
const outputPath = path.join(siteRoot, "app/design-system/product-content.generated.json");
const cardOutputPath = path.join(siteRoot, "app/design-system/product-content-card.generated.json");
const routeSelectorOutputPath = path.join(siteRoot, "app/design-system/product-content-route-selectors.generated.json");
const familyTemplateOutputPath = path.join(siteRoot, "app/design-system/family-content-template-contracts.generated.json");

const CONTENT_STATES = new Set([
  "CONTENT_READY",
  "SOURCE_BOUND",
  "PENDING_EVIDENCE_BINDING",
  "EDITORIAL_CHOICE",
]);
const SOURCE_LAYERS = new Set([
  "LABEL",
  "FINAL_TRANSPARENT_RENDER",
  "OPENLAB_JANOSHIK",
  "WOO_C2",
  "APPROVED_EDITORIAL",
  "FIGMA_SITES_COMPOSITION",
]);
const EXPECTED_PRODUCTS = [
  "mk-2866", "rad-140", "lgd-4033", "mk-677", "gw-501516", "s-4", "yk-11", "s-23",
  "epistane", "ment", "m-sten", "trenavar", "bpc-157", "tb-500", "cjc-1295", "l-carnitine",
];
const UNSAFE_CUSTOMER_COPY = [
  /\b(?:diagnos(?:e|is)|treat(?:s|ment)?|cure[sd]?|prevent(?:s|ion)?|recommended dosage|daily dose|cycle length|post[- ]cycle|side effects?)\b/i,
  /\btake\s+\d+(?:\.\d+)?\s*(?:mg|mcg|capsules?)\b/i,
  /\b(?:lean mass|muscle growth|recovery support|sleep support|appetite support|cutting phase|bulking phase|performance gains?)\b/i,
  /\b(?:third[- ]party tested|openlab verified|clinically proven|provider file (?:ready|available))\b/i,
  /(?:£|\bInStock\b|https:\/\/schema\.org\/InStock)/i,
];

const digest = (value) => createHash("sha256").update(value).digest("hex");
const asArray = (value) => Array.isArray(value)
  ? value
  : value == null
    ? []
    : typeof value === "object"
      ? Object.values(value)
      : [value];
const idFor = (record) => record?.bindingId ?? record?.id ?? record?.sourceBindingId;
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isAtom = (value) => isObject(value) && CONTENT_STATES.has(value.state) && "value" in value;
const pointerKey = (pointer) => pointer.split(".").at(-1)?.replace(/\[\d+\]$/, "") ?? pointer;
const isUnavailableBoundary = (atom) => atom.value === "UNAVAILABLE"
  || asArray(atom.constraints).some((constraint) => constraint === "UNAVAILABLE_STATE_ONLY");
function hasPath(value, dottedPath) {
  for (const rawSegment of dottedPath.split(".")) {
    const arrayItem = rawSegment.endsWith("[]");
    const segment = arrayItem ? rawSegment.slice(0, -2) : rawSegment;
    if (!isObject(value) || !Object.hasOwn(value, segment)) return false;
    value = value[segment];
    if (arrayItem) {
      if (!Array.isArray(value) || !value.length) return false;
      [value] = value;
    }
  }
  return true;
}

function readPath(value, dottedPath) {
  for (const segment of dottedPath.split(".")) {
    if (!isObject(value) || !Object.hasOwn(value, segment)) return undefined;
    value = value[segment];
  }
  return value;
}

function fail(message) {
  throw new Error(`Product content contract: ${message}`);
}

function visit(value, pointer, visitor) {
  visitor(value, pointer);
  if (Array.isArray(value)) value.forEach((item, index) => visit(item, `${pointer}[${index}]`, visitor));
  else if (isObject(value)) Object.entries(value).forEach(([key, item]) => visit(item, `${pointer}.${key}`, visitor));
}

function provenanceIds(atom) {
  return asArray(atom.provenanceBindingIds ?? atom.provenance).map((entry) => typeof entry === "string" ? entry : idFor(entry)).filter(Boolean);
}

function stateIndexFor(product) {
  const index = {};
  visit(product, "$", (value, pointer) => {
    if (!isAtom(value)) return;
    index[pointer] = {
      state: value.state,
      sourceLayers: value.sourceLayer
        ? [value.sourceLayer]
        : [...new Set(provenanceIds(value).flatMap((bindingId) => asArray(bindingById.get(bindingId)?.sourceLayers ?? bindingById.get(bindingId)?.sourceLayer)))],
      provenance: provenanceIds(value),
    };
  });
  return index;
}

function customerProjection(value) {
  if (isAtom(value)) {
    if (value.state === "CONTENT_READY") return value.value;
    if (value.state === "PENDING_EVIDENCE_BINDING" && value.value !== null && isUnavailableBoundary(value)) return value.value;
    return null;
  }
  if (Array.isArray(value)) return value.map(customerProjection).filter((item) => item !== undefined);
  if (!isObject(value)) return value;
  if (value.owner === "WOO_C2") {
    return {
      owner: "WOO_C2",
      resolverKey: value.resolverKey,
      runtimeType: value.runtimeType,
      fallback: value.fallback,
      value: null,
    };
  }
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, customerProjection(item)]));
}

function compactProjection(value) {
  if (Array.isArray(value)) {
    const items = value.map(compactProjection).filter((item) => item !== undefined);
    return items.length ? items : undefined;
  }
  if (!isObject(value)) return value === null ? undefined : value;
  if (value.owner === "WOO_C2") return { ...value, value: null };
  const entries = Object.entries(value)
    .map(([key, item]) => [key, compactProjection(item)])
    .filter(([, item]) => item !== undefined);
  return entries.length ? Object.fromEntries(entries) : undefined;
}

const rawEntries = await Promise.all(Object.entries(inputs).map(async ([key, file]) => [key, await readFile(file, "utf8")]));
const raw = Object.fromEntries(rawEntries);
const documents = Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, JSON.parse(value)]));
const { schema, registry, provenance, routes, slots, familyTemplates } = documents;

if (schema.properties?.schemaVersion?.const !== "oluk.product-content.v1" || !String(schema.title ?? "").startsWith("OLUK Product Content Contract")) fail("unexpected JSON schema identity");
if (registry.schemaVersion !== "oluk.product-content.v1") fail(`unsupported registry ${registry.schemaVersion}`);
if (!String(provenance.schemaVersion ?? "").startsWith("oluk.copy-source-provenance")) fail("unsupported provenance ledger");
if (!String(routes.schemaVersion ?? "").startsWith("oluk.route-content-consumption")) fail("unsupported route matrix");
if (!String(slots.schemaVersion ?? "").startsWith("oluk.product-content-slot")) fail("unsupported slot catalogue");
if (familyTemplates.schemaVersion !== "oluk.family-content-template-contracts.v1") fail("unsupported family template contract");

const products = asArray(registry.products);
const productIds = products.map((product) => product.canonicalProductId ?? product.productId ?? product.id);
if (productIds.length !== EXPECTED_PRODUCTS.length || new Set(productIds).size !== EXPECTED_PRODUCTS.length) fail("registry must contain 16 unique canonical products");
for (const id of EXPECTED_PRODUCTS) if (!productIds.includes(id)) fail(`missing canonical product ${id}`);

const bindings = asArray(provenance.bindings ?? provenance.fieldBindings ?? provenance.sourceBindings);
const bindingById = new Map(bindings.map((binding) => [idFor(binding), binding]));
if (!bindingById.size || bindingById.has(undefined)) fail("provenance ledger has invalid binding identities");

function fieldAtoms(value) {
  if (isAtom(value)) return [value];
  if (Array.isArray(value)) return value.flatMap(fieldAtoms);
  if (!isObject(value) || value.owner === "WOO_C2") return [];
  return Object.values(value).flatMap(fieldAtoms);
}

function fieldSelector(product, customer, fieldRef) {
  const source = readPath(product, fieldRef);
  const emittedValue = readPath(customer, fieldRef);
  if (isObject(source) && source.owner === "WOO_C2") {
    return {
      fieldRef,
      kind: "RUNTIME_RESOLVER",
      states: ["RUNTIME_RESOLVER_REQUIRED"],
      emission: "RUNTIME_RESOLVER_ONLY",
      provenanceBindingIds: provenanceIds(source),
      sourceLayers: ["WOO_C2"],
      resolver: {
        owner: "WOO_C2",
        resolverKey: source.resolverKey,
        fallback: source.fallback,
      },
    };
  }

  const atoms = fieldAtoms(source);
  const states = [...new Set(atoms.map((atom) => atom.state))];
  const bindingIds = [...new Set(atoms.flatMap(provenanceIds))];
  const sourceLayers = [...new Set(bindingIds.flatMap((bindingId) => asArray(bindingById.get(bindingId)?.sourceLayers ?? bindingById.get(bindingId)?.sourceLayer)))];
  const explicitUnavailable = atoms.some(isUnavailableBoundary) && emittedValue !== undefined;

  return {
    fieldRef,
    kind: atoms.length ? (Array.isArray(source) ? "ATOM_COLLECTION" : "CONTENT_ATOM") : "STRUCTURAL_FIELD",
    states: states.length ? states : [emittedValue === undefined ? "UNMAPPED" : "CONTENT_READY"],
    emission: emittedValue === undefined
      ? "OMIT"
      : explicitUnavailable
        ? "EXPLICIT_UNAVAILABLE"
        : "CUSTOMER_VALUE",
    provenanceBindingIds: bindingIds,
    sourceLayers,
  };
}

const assetPaths = [];
const referencedBindingIds = new Set();
for (const product of products) {
  const productId = product.canonicalProductId ?? product.productId ?? product.id;
  let atomCount = 0;
  visit(product, `$products.${productId}`, (value, pointer) => {
    if (!isAtom(value)) {
      if (isObject(value) && value.owner === "WOO_C2" && value.value !== null) fail(`${pointer} freezes a commerce value`);
      const key = pointerKey(pointer);
      if (/^(?:price|inventory|purchasability|offers?)$/i.test(key) && !isObject(value) && value !== null && value !== undefined) fail(`${pointer} contains a static commerce value`);
      return;
    }
    atomCount += 1;
    if (value.sourceLayer && !SOURCE_LAYERS.has(value.sourceLayer)) fail(`${pointer} has invalid source layer ${value.sourceLayer}`);
    if (value.state === "CONTENT_READY" && value.value === null) fail(`${pointer} is content-ready without a value`);
    if (value.state === "PENDING_EVIDENCE_BINDING" && value.value !== null && !isUnavailableBoundary(value)) {
      fail(`${pointer} pending evidence value must be null or an explicitly constrained unavailable boundary`);
    }
    const references = provenanceIds(value);
    references.forEach((bindingId) => referencedBindingIds.add(bindingId));
    if (value.value !== null && !references.length) fail(`${pointer} has no field-level provenance`);
    for (const bindingId of references) {
      const binding = bindingById.get(bindingId);
      if (!binding) fail(`${pointer} references unknown provenance ${bindingId}`);
      for (const sourceLayer of asArray(binding.sourceLayers ?? binding.sourceLayer)) {
        if (!SOURCE_LAYERS.has(sourceLayer)) fail(`${pointer} resolves to invalid source layer ${sourceLayer}`);
      }
      const status = String(binding.status ?? binding.verificationState ?? "").toUpperCase();
      if (/INVALID|REJECT|NONEXISTENT|FAILED/.test(status)) fail(`${pointer} uses rejected provenance ${bindingId}`);
    }
    if ((value.state === "CONTENT_READY" || isUnavailableBoundary(value)) && typeof value.value === "string") {
      for (const pattern of UNSAFE_CUSTOMER_COPY) if (pattern.test(value.value)) fail(`${pointer} contains unsafe customer copy matching ${pattern}`);
    }
    const assetSrc = typeof value.value === "string" && value.value.startsWith("/assets/")
      ? value.value
      : value.value && isObject(value.value) && typeof value.value.src === "string" && value.value.src.startsWith("/assets/")
        ? value.value.src
        : null;
    if (assetSrc) assetPaths.push(path.join(siteRoot, "public", assetSrc));
  });
  if (!atomCount) fail(`${productId} has no content atoms`);
  if (product.readinessState === "CONTENT_READY") {
    const longCopy = product.content?.descriptions?.long;
    if (!isAtom(longCopy) || longCopy.state !== "CONTENT_READY" || typeof longCopy.value !== "string" || longCopy.value.length < 280) {
      fail(`${productId} must carry a customer-ready long description of at least 280 characters`);
    }
  }
}
await Promise.all(assetPaths.map((assetPath) => access(assetPath)));
for (const bindingId of bindingById.keys()) if (!referencedBindingIds.has(bindingId)) fail(`unused provenance binding ${bindingId}`);

const registryText = JSON.stringify(registry);
if (/"@type":"Offer"|schema\.org\/InStock/.test(registryText)) fail("registry contains a static structured-data Offer");
const gw = products.find((product) => (product.canonicalProductId ?? product.productId ?? product.id) === "gw-501516");
if (!gw || !JSON.stringify(gw).includes("GW-501516")) fail("GW-501516 canonical identity is missing");

const routeRows = asArray(routes.consumers ?? routes.routes ?? routes.routeFamilies ?? routes.rows);
if (!routeRows.length) fail("route matrix has no consumption rows");
for (const [index, row] of routeRows.entries()) {
  for (const key of ["module", "sourceLayers", "audience", "desktopBehavior", "mobileBehavior", "forbidden"]) {
    if (row[key] === undefined && row.component !== undefined && key === "module") continue;
    if (row[key] === undefined) fail(`route row ${index} is missing ${key}`);
  }
  for (const sourceLayer of asArray(row.sourceLayers)) if (!SOURCE_LAYERS.has(sourceLayer)) fail(`route row ${index} has invalid source layer ${sourceLayer}`);
  for (const fieldRef of asArray(row.fieldRefs)) if (!hasPath(products[0], fieldRef)) fail(`route row ${index} references unknown field ${fieldRef}`);
}
if (JSON.stringify(routes.responsiveProofContract?.viewportWidths) !== JSON.stringify([1440, 1024, 768, 390])) fail("route matrix must retain the exact four-width proof contract");

const slotRows = asArray(slots.slots ?? slots.components ?? slots.catalogue);
if (!slotRows.length) fail("slot catalogue has no reusable slots");
for (const [index, slot] of slotRows.entries()) {
  for (const sourceLayer of asArray(slot.sourceLayers)) if (!SOURCE_LAYERS.has(sourceLayer)) fail(`slot ${index} has invalid source layer ${sourceLayer}`);
  for (const fieldRef of asArray(slot.fieldRefs)) if (!hasPath(products[0], fieldRef)) fail(`slot ${index} references unknown field ${fieldRef}`);
}

const familyRows = asArray(familyTemplates.families);
if (familyRows.length !== 3 || new Set(familyRows.map((family) => family.id)).size !== 3) fail("family template contract must contain three unique families");
const slotById = new Map(slotRows.map((slot) => [slot.id, slot]));
for (const family of familyRows) {
  for (const key of ["id", "name", "scope", "audience", "sourceLayers", "slots", "forbidden", "responsiveBehavior"]) {
    if (family[key] === undefined) fail(`family template ${family.id ?? "unknown"} is missing ${key}`);
  }
  for (const sourceLayer of asArray(family.sourceLayers)) if (!SOURCE_LAYERS.has(sourceLayer)) fail(`family template ${family.id} has invalid source layer ${sourceLayer}`);
  if (!asArray(family.slots).length) fail(`family template ${family.id} has no slots`);
  for (const slot of family.slots) {
    if (!slotById.has(slot.referencedSlot)) fail(`family template ${family.id}.${slot.id} references unknown reusable slot ${slot.referencedSlot}`);
    for (const fieldRef of asArray(slot.fieldRefs)) if (!hasPath(products[0], fieldRef)) fail(`family template ${family.id}.${slot.id} references unknown field ${fieldRef}`);
    for (const state of asArray(slot.allowedStates)) if (!CONTENT_STATES.has(state)) fail(`family template ${family.id}.${slot.id} has invalid content state ${state}`);
  }
  if (family.id === "family-1-discovery") {
    const consumerRows = asArray(family.consumerRows);
    const expectedPaths = ["/", "/shop", "/collections/:slug", "/search", "/compare", "/collections/sarms", "/collections/research-chemicals", "/collections/prohormones", "/collections/stacks", "/shop?goal=:goal"];
    if (consumerRows.length !== expectedPaths.length || new Set(consumerRows.map((row) => row.path)).size !== expectedPaths.length) fail("Discovery family must contain ten unique canonical consumer rows");
    for (const expectedPath of expectedPaths) if (!consumerRows.some((row) => row.path === expectedPath)) fail(`Discovery family is missing ${expectedPath}`);
    for (const row of consumerRows) {
      if (!row.id || !row.semantics || !asArray(row.slots).length) fail("Discovery consumer row is incomplete");
      for (const slotId of row.slots) if (!family.slots.some((slot) => slot.id === slotId) && !slotById.has(slotId)) fail(`Discovery consumer row ${row.id} references unknown slot ${slotId}`);
    }
  }
  if (!family.responsiveBehavior?.desktop || !family.responsiveBehavior?.mobile) fail(`family template ${family.id} lacks responsive behavior`);
}

const generatedProducts = products.map((product) => {
  const canonicalProductId = product.canonicalProductId ?? product.productId ?? product.id;
  const stateIndex = stateIndexFor(product);
  const readiness = Object.values(stateIndex).reduce((counts, atom) => ({ ...counts, [atom.state]: (counts[atom.state] ?? 0) + 1 }), {});
  return {
    canonicalProductId,
    customer: compactProjection(customerProjection(product)),
    readiness,
  };
});
const compiled = {
  schemaVersion: "oluk.product-content-projection.v1",
  sourceHashes: Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, digest(value)])),
  products: generatedProducts,
  routeConsumption: {
    matrixId: routes.matrixId ?? routes.contractId ?? null,
    slotCatalogueId: slots.catalogueId ?? slots.contractId ?? null,
    rowCount: routeRows.length,
    slotCount: slotRows.length,
  },
};
const output = { ...compiled, contentHash: digest(JSON.stringify(compiled)) };
const rendered = `${JSON.stringify(output, null, 2)}\n`;
const cardProjection = {
  schemaVersion: "oluk.product-content-card-projection.v1",
  products: generatedProducts.flatMap(({ canonicalProductId, customer }) => {
    const name = customer?.canonicalIdentity?.name;
    const render = customer?.media?.render;
    if (!name || !render) return [];
    return [{
      canonicalProductId,
      slug: customer.slug ?? canonicalProductId,
      name,
      aliases: customer.canonicalIdentity?.aliases ?? [],
      render,
      facts: customer.content?.facts ?? {},
      evidence: {
        availability: customer.content?.evidence?.availability ?? "UNAVAILABLE",
        summary: customer.content?.evidence?.summary ?? null,
      },
    }];
  }),
};
const cardOutput = { ...cardProjection, contentHash: digest(JSON.stringify(cardProjection)) };
const cardRendered = `${JSON.stringify(cardOutput, null, 2)}\n`;

const routeSelectorProjection = {
  schemaVersion: "oluk.product-content-route-selectors.v1",
  attachmentPolicy: {
    state: "PREPARED_NOT_ATTACHED",
    prerequisite: "BOUNDED_SHOPPER_C2_V1_INTEGRATION_PROOF",
    credentials: "NONE",
    browserAuthorityCalls: false,
    runtimeMutationAuthorized: false,
    publicationAuthorized: false,
  },
  sourceHashes: {
    registry: digest(raw.registry),
    provenance: digest(raw.provenance),
    routes: digest(raw.routes),
  },
  routeSelectors: routeRows.map((row) => ({
    id: row.id,
    routePatterns: row.routePatterns,
    scopeClass: row.scopeClass,
    module: row.module,
    component: row.component,
    audience: row.audience,
    sourceLayers: row.sourceLayers,
    fieldRefs: row.fieldRefs,
    missingContentBehavior: row.missingContentBehavior,
    forbidden: row.forbidden,
    stateReadiness: row.stateReadiness,
  })),
  products: generatedProducts.map(({ canonicalProductId, customer }) => ({
    canonicalProductId,
    slug: customer.slug ?? canonicalProductId,
    fields: Object.fromEntries([...new Set(routeRows.flatMap((row) => asArray(row.fieldRefs)))].map((fieldRef) => [
      fieldRef,
      fieldSelector(
        products.find((product) => product.canonicalProductId === canonicalProductId),
        customer,
        fieldRef,
      ),
    ])),
  })),
};
const routeSelectorOutput = { ...routeSelectorProjection, contentHash: digest(JSON.stringify(routeSelectorProjection)) };
const routeSelectorRendered = `${JSON.stringify(routeSelectorOutput, null, 2)}\n`;

const familyTemplateProjection = {
  schemaVersion: "oluk.family-content-template-projection.v1",
  status: familyTemplates.status,
  runtimeAuthority: "NONE",
  sourceHashes: {
    registry: digest(raw.registry),
    provenance: digest(raw.provenance),
    slots: digest(raw.slots),
    templates: digest(raw.familyTemplates),
  },
  globalLaws: familyTemplates.globalLaws,
  families: familyRows,
};
const familyTemplateOutput = { ...familyTemplateProjection, contentHash: digest(JSON.stringify(familyTemplateProjection)) };
const familyTemplateRendered = `${JSON.stringify(familyTemplateOutput, null, 2)}\n`;

if (process.argv.includes("--check")) {
  if (await readFile(outputPath, "utf8") !== rendered) fail("generated projection is stale; run npm run product:compile");
  if (await readFile(cardOutputPath, "utf8") !== cardRendered) fail("generated card projection is stale; run npm run product:compile");
  if (await readFile(routeSelectorOutputPath, "utf8") !== routeSelectorRendered) fail("generated route-selector projection is stale; run npm run product:compile");
  if (await readFile(familyTemplateOutputPath, "utf8") !== familyTemplateRendered) fail("generated family template projection is stale; run npm run product:compile");
  process.stdout.write(`PASS Product content ${digest(rendered)} ${digest(cardRendered)} ${digest(routeSelectorRendered)} ${digest(familyTemplateRendered)}\n`);
} else {
  await Promise.all([
    writeFile(outputPath, rendered),
    writeFile(cardOutputPath, cardRendered),
    writeFile(routeSelectorOutputPath, routeSelectorRendered),
    writeFile(familyTemplateOutputPath, familyTemplateRendered),
  ]);
  process.stdout.write(`WROTE Product content ${digest(rendered)} ${digest(cardRendered)} ${digest(routeSelectorRendered)} ${digest(familyTemplateRendered)}\n`);
}
