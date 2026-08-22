import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const checkOnly = process.argv.includes("--check");

const routeRegistryPath = resolve(repoRoot, "authority/imports/oluk-canonical-customer-route-registry.v1.json");
const productRegistryPath = resolve(repoRoot, "authority/imports/canonical-customer-product-registry.v2.json");
const [routeRegistry, productRegistry] = await Promise.all(
  [routeRegistryPath, productRegistryPath].map(async (path) => JSON.parse(await readFile(path, "utf8"))),
);

const sha256 = (value) => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const digestArtifact = (artifact) => sha256({ ...artifact, contentHash: undefined });
const source = (repository, path, ref, containment, disposition) => ({
  repository,
  path,
  ref,
  containment,
  disposition,
});
const relationships = (parentIds = [], childIds = [], allowedRouteIds = [], allowedSlotIds = []) => ({
  parentIds,
  childIds,
  allowedRouteIds,
  allowedSlotIds,
});
const entity = ({
  id,
  kind,
  customerPurpose,
  concern,
  owner = { repository: "oluk-design-system", concern },
  authorityClass = "canonical",
  integrationDisposition = "reuse",
  lifecycle = "inventory",
  exposure = "not_applicable",
  sources = [],
  winningSource,
  relation = relationships(),
  fieldIds = [],
  contentIds = [],
  mediaRoleIds = [],
  requiredStates = [],
  interactionIds = [],
  tests = [],
  receipts = [],
  contract = {},
}) => ({
  id,
  kind,
  customerPurpose,
  owner,
  sources,
  ...(winningSource ? { winningSource } : {}),
  authorityClass,
  sourceContainment: sources[0]?.containment ?? "CONTAINED",
  integrationDisposition,
  relationships: relation,
  fieldIds,
  contentIds,
  mediaRoleIds,
  requiredStates,
  interactionIds,
  lifecycle,
  exposure,
  tests,
  receipts,
  contract,
});

if (routeRegistry.contract !== "OLUK_CANONICAL_CUSTOMER_ROUTE_REGISTRY_V1" || routeRegistry.canonicalRouteCount !== 74 || routeRegistry.routes.length !== 74) {
  throw new Error("The imported Native Next route registry must contain exactly 74 canonical route definitions.");
}
if (productRegistry.contract !== "OLUK_CATALOGUE_AUTHORITY_V2" || productRegistry.products.length !== 15) {
  throw new Error("The imported customer product registry must contain exactly 15 canonical products.");
}

const routeSource = source(
  "olympus-plugin-initiator",
  "apps/olympus-shopper-ui/app/route-authority/oluk-canonical-customer-route-registry.v1.json",
  "d698d8bb6270bbcd984fda8589ccb8a6e9bd1dc4",
  "CONTAINED",
  "reuse",
);
const productSource = source(
  "olympus-plugin-initiator",
  "apps/olympus-shopper-ui/app/product-authority/canonical-customer-product-registry.v2.json",
  "d698d8bb6270bbcd984fda8589ccb8a6e9bd1dc4",
  "CONTAINED",
  "reuse",
);
const sitesSource = source(
  "oluk-design-system",
  "sites/oluk-experience-lab/app/design-system",
  "8b79a7d04342043d3f972c5cf844c9168547d401",
  "CONTAINED",
  "compare_and_adapt",
);

const commonShell = [
  ["shell.utility", "required"],
  ["shell.header", "required"],
  ["shell.mega-menu", "required"],
];
const commonFooter = [["shell.footer", "required"]];
const templateSlots = {
  "template.homepage": [...commonShell, ["home.opening", "required"], ["home.featured-product", "conditional_data"], ["home.discovery", "required"], ["home.openlab", "conditional_data"], ...commonFooter],
  "template.discovery": [...commonShell, ["discovery.heading", "required"], ["discovery.controls", "required"], ["discovery.results", "conditional_data"], ["discovery.relationships", "conditional_data"], ...commonFooter],
  "template.product-detail": [
    ...commonShell,
    ["pdp.breadcrumb", "required"],
    ["pdp.first-fold", "required"],
    ["pdp.assurance", "conditional_data"],
    ["pdp.label-media", "conditional_data"],
    ["pdp.narrative", "conditional_data"],
    ["pdp.dossier", "conditional_data"],
    ["pdp.openlab-evidence", "conditional_data"],
    ["pdp.relationships", "conditional_data"],
    ["pdp.builder", "optional_flagged"],
    ["pdp.faq-education", "conditional_data"],
    ["pdp.continuation", "conditional_data"],
    ["mobile.sticky-decision", "required"],
    ...commonFooter,
  ],
  "template.openlab": [...commonShell, ["openlab.opening", "required"], ["openlab.records", "conditional_data"], ["openlab.detail", "conditional_data"], ["openlab.actions", "conditional_data"], ...commonFooter],
  "template.checkout": [...commonShell, ["checkout.progress", "required"], ["checkout.content", "conditional_data"], ["checkout.summary", "conditional_data"], ["checkout.action", "conditional_data"], ...commonFooter],
  "template.payment-preserve": [...commonShell, ["payment.handoff", "preserve_only"], ...commonFooter],
  "template.account": [...commonShell, ["account.navigation", "required"], ["account.content", "conditional_data"], ["account.actions", "conditional_data"], ...commonFooter],
  "template.post-purchase": [...commonShell, ["order.status", "conditional_data"], ["order.summary", "conditional_data"], ["order.actions", "conditional_data"], ...commonFooter],
  "template.support": [...commonShell, ["support.heading", "required"], ["support.content", "conditional_data"], ["support.actions", "conditional_data"], ...commonFooter],
  "template.decision-tool": [...commonShell, ["decision.intro", "required"], ["decision.workspace", "conditional_data"], ["decision.summary", "conditional_data"], ...commonFooter],
  "template.owner-review": [["owner.review-navigation", "owner_only"], ["owner.review-content", "owner_only"]],
  "template.shared-shell": [...commonShell, ["shared.message", "conditional_data"], ...commonFooter],
};

const familyTemplate = (family) => {
  if (family === "homepage") return "template.homepage";
  if (family === "catalogue_search_collections" || family === "selection_bundle_builder") return "template.discovery";
  if (family === "product_detail") return "template.product-detail";
  if (family.startsWith("openlab_")) return "template.openlab";
  if (family === "bag_checkout") return "template.checkout";
  if (family === "complete_payment") return "template.payment-preserve";
  if (family === "account") return "template.account";
  if (family === "post_purchase") return "template.post-purchase";
  if (family === "decision_tools") return "template.decision-tool";
  if (family === "governance_review") return "template.owner-review";
  if (family === "shared_shell") return "template.shared-shell";
  return "template.support";
};

const stateDefinitions = [
  ["default", "The complete steady customer presentation."],
  ["hover", "Pointer affordance without layout change."],
  ["focus-visible", "Keyboard focus with a visible target outline."],
  ["selected", "The customer-selected option."],
  ["added", "Successful same-origin addition acknowledgement."],
  ["loading", "Reserved structure while an owned source resolves."],
  ["empty", "Valid result set with no items."],
  ["unavailable", "Required source is unavailable without invented data."],
  ["error", "Recoverable source or action failure."],
  ["retry", "Customer-controlled retry action."],
  ["in-stock", "Purchasable stock state."],
  ["low-stock", "Limited stock state supplied by commerce authority."],
  ["out-of-stock", "Not currently purchasable."],
  ["long-copy", "Wrapping and overflow stress specimen."],
  ["missing-media", "Product-safe media fallback."],
  ["responsive-reorder", "Declared mobile child order."],
  ["reduced-motion", "Non-animated equivalent."],
  ["logged-out", "Unauthenticated customer state."],
  ["authenticated", "Authorized customer state."],
];
const fieldDefinitions = [
  ["field.product.series-name", "Product series shown above identity.", "product-registry"],
  ["field.product.name", "Canonical customer product name.", "product-registry"],
  ["field.product.alias", "Optional customer alias.", "product-registry"],
  ["field.product.strength-display", "Product-specific canonical strength.", "c2-product-projection"],
  ["field.product.servings-display", "Product-specific canonical serving count.", "c2-product-projection"],
  ["field.evidence.purity-display", "Record-specific reported purity display.", "c2-openlab-projection"],
  ["field.evidence.state", "Customer evidence state; REPORTED controls.", "c2-openlab-projection"],
  ["field.commerce.stock-state", "Provider-neutral stock state.", "c2-commerce-projection"],
  ["field.commerce.price", "Minor-unit amount and currency.", "c2-commerce-projection"],
  ["field.commerce.quantity", "Minimum, maximum, step, and default quantity.", "c2-purchase-contract"],
  ["field.commerce.purchasable", "Provider-neutral purchase permission.", "c2-commerce-projection"],
  ["field.media.contract-identity", "Opaque Native Next media binding.", "oluk-media-registry"],
];
const tokenDefinitions = [
  ["token.canvas", "Page canvas role."],
  ["token.surface", "Contained customer surface role."],
  ["token.media-chamber", "Atmospheric product-media plane."],
  ["token.cobalt", "Primary OLUK action and identity role."],
  ["token.ink", "Primary readable text role."],
  ["token.border", "Contained surface separation."],
  ["token.radius", "Named component radius scale."],
  ["token.elevation", "Named surface elevation scale."],
  ["token.type", "Display, body, meta, and mono roles."],
  ["token.motion", "Reduced-motion-aware transition roles."],
  ["token.breakpoint", "1440, 1024, 768, and 390 contracts."],
];
const primitives = [
  ["primitive.surface", "Contained background, border, radius, elevation, and padding."],
  ["primitive.route-grid", "Named responsive grid and slot placement."],
  ["primitive.section-slot", "Ordered route module host."],
  ["primitive.media-chamber", "Product-safe image stage."],
  ["primitive.status", "Inventory and evidence status semantics."],
  ["primitive.action", "Link and button semantics with 44px targets."],
  ["primitive.disclosure", "Keyboard-operable progressive disclosure."],
  ["primitive.type", "Semantic heading, body, meta, and data roles."],
];
const componentDefinitions = [
  ["component.product-commerce-card", "Product decision card", ["field.product.name", "field.commerce.stock-state", "field.commerce.price", "field.commerce.quantity", "field.evidence.state"]],
  ["component.pdp-first-fold", "Product media and purchase decision composition", fieldDefinitions.map(([id]) => id)],
  ["component.purchase-panel", "Identity, evidence, commerce, quantity, and actions", fieldDefinitions.filter(([id]) => !id.startsWith("field.media")).map(([id]) => id)],
  ["component.product-media-chamber", "Canonical bottle and V3 media presentation", ["field.product.name", "field.media.contract-identity"]],
  ["component.metric-rail", "Strength, servings, and purity", ["field.product.strength-display", "field.product.servings-display", "field.evidence.purity-display"]],
  ["component.openlab-records-rail", "Static customer record links", ["field.evidence.state", "field.evidence.purity-display"]],
  ["component.product-dossier", "Facts, media, composition, and evidence linkage", ["field.product.name", "field.media.contract-identity", "field.evidence.state"]],
  ["component.builder", "Product selection and authoritative bag handoff", ["field.product.name", "field.commerce.price", "field.commerce.quantity"]],
  ["component.navigation", "Shared header, Mega Menu, and route navigation", []],
  ["component.lifecycle-surface", "Bag, checkout, account, and post-purchase presentation", ["field.commerce.price", "field.commerce.quantity"]],
];
const contentDefinitions = [
  ["content.shell", "Navigation, utility, and footer language."],
  ["content.product-identity", "Series, name, alias, proposition, and summary."],
  ["content.product-depth", "Narrative, education, FAQ, comparison, and relationships."],
  ["content.evidence", "Reported record, result, methodology, and missing-state language."],
  ["content.commerce-state", "Stock, price, quantity, action, and error language."],
  ["content.lifecycle", "Bag, checkout, account, support, and post-purchase language."],
  ["content.metadata", "SEO, social, and mobile summaries."],
];
const mediaDefinitions = [
  ["media.bottle", "Canonical product bottle render."],
  ["media.label-panel", "Approved V3 Front, Product Facts, or Product Composition panel."],
  ["media.label-wrap", "Approved V3 continuous full wrap."],
  ["media.editorial", "Approved route-specific editorial image."],
  ["media.openlab-document", "Record-owned report or document."],
  ["media.icon", "Presentation-system icon role."],
  ["media.atmosphere", "Non-semantic background and lighting asset."],
];
const interactionDefinitions = [
  ["interaction.navigate", "Same-origin route navigation.", "navigation"],
  ["interaction.quantity", "Bounded quantity selection.", "next-shopper-action"],
  ["interaction.add-to-bag", "Authoritative same-origin bag mutation.", "next-shopper-action"],
  ["interaction.compare", "Product comparison selection.", "next-route-state"],
  ["interaction.view-record", "Open product-specific record.", "navigation"],
  ["interaction.disclose", "Reveal contained supporting content.", "component-state"],
  ["interaction.retry", "Retry a failed named server adapter.", "next-server-adapter"],
];

const entities = [];
for (const [id, purpose] of tokenDefinitions) entities.push(entity({ id, kind: "token", customerPurpose: purpose, concern: "tokens", sources: [sitesSource], requiredStates: ["state.default"], tests: ["surface-inventory.test.mjs"] }));
for (const [id, purpose] of primitives) entities.push(entity({ id, kind: "primitive", customerPurpose: purpose, concern: "primitives", sources: [sitesSource], relation: relationships([], tokenDefinitions.map(([tokenId]) => tokenId)), requiredStates: ["state.default", "state.focus-visible", "state.reduced-motion"], tests: ["surface-inventory.test.mjs"] }));
for (const [name, purpose] of stateDefinitions) entities.push(entity({ id: `state.${name}`, kind: "state", customerPurpose: purpose, concern: "state-coverage", sources: [sitesSource], tests: ["surface-inventory.test.mjs"] }));
for (const [id, purpose, owner] of fieldDefinitions) entities.push(entity({ id, kind: "field_binding", customerPurpose: purpose, concern: owner, owner: { repository: owner.startsWith("c2") ? "c2_monorepo_scaffold" : "olympus-plugin-initiator", concern: owner }, sources: [sitesSource], authorityClass: "runtime_current", integrationDisposition: "reuse", requiredStates: ["state.unavailable"], tests: ["surface-inventory.test.mjs"] }));
for (const [id, purpose] of contentDefinitions) entities.push(entity({ id, kind: "content", customerPurpose: purpose, concern: "customer-content", sources: [sitesSource], requiredStates: ["state.default", "state.unavailable", "state.long-copy"], tests: ["customer-copy-audit.test.mjs"] }));
for (const [id, purpose] of mediaDefinitions) entities.push(entity({ id, kind: "media_role", customerPurpose: purpose, concern: "media", sources: [sitesSource], requiredStates: ["state.default", "state.missing-media"], tests: ["surface-inventory.test.mjs"] }));
for (const [id, purpose, owner] of interactionDefinitions) entities.push(entity({ id, kind: "interaction", customerPurpose: purpose, concern: owner, sources: [sitesSource], requiredStates: ["state.default", "state.focus-visible", "state.unavailable"], tests: ["surface-inventory.test.mjs"], contract: { semanticElement: id === "interaction.disclose" ? "button" : "link-or-button-by-action", keyboard: "native", actionOwner: owner, sameOrigin: true, mutationPosture: id === "interaction.add-to-bag" ? "authoritative-session-mutation" : "read-or-local-state" } }));
for (const [id, purpose, fields] of componentDefinitions) entities.push(entity({ id, kind: "component", customerPurpose: purpose, concern: "component-library", sources: [sitesSource], relation: relationships(["primitive.surface", "primitive.route-grid"]), fieldIds: fields, contentIds: ["content.product-identity", "content.commerce-state"], mediaRoleIds: id.includes("media") || id.includes("pdp") ? ["media.bottle", "media.label-panel", "media.label-wrap"] : [], requiredStates: stateDefinitions.map(([name]) => `state.${name}`), interactionIds: interactionDefinitions.map(([interactionId]) => interactionId), tests: ["surface-inventory.test.mjs"] }));

const moduleForTemplate = {
  "template.homepage": "module.homepage",
  "template.discovery": "module.discovery",
  "template.product-detail": "module.product-detail",
  "template.openlab": "module.openlab",
  "template.checkout": "module.checkout",
  "template.payment-preserve": "module.payment-preserve",
  "template.account": "module.account",
  "template.post-purchase": "module.post-purchase",
  "template.support": "module.support",
  "template.decision-tool": "module.decision-tool",
  "template.owner-review": "module.owner-review",
  "template.shared-shell": "module.shared-shell",
};
for (const [templateId, slots] of Object.entries(templateSlots)) {
  const routeIds = routeRegistry.routes.filter((route) => familyTemplate(route.family) === templateId).map((route) => `route.${route.id}`);
  entities.push(entity({ id: templateId, kind: "route_template", customerPurpose: `Compose the ${templateId.replace("template.", "").replaceAll("-", " ")} route family.`, concern: "route-composition", sources: [sitesSource], relation: relationships([], slots.map(([slotId]) => `slot.${templateId.replace("template.", "")}.${slotId}`), routeIds), requiredStates: ["state.default", "state.loading", "state.unavailable", "state.error", "state.responsive-reorder"], tests: ["surface-inventory.test.mjs"] }));
  const moduleId = moduleForTemplate[templateId];
  entities.push(entity({ id: moduleId, kind: "module", customerPurpose: `Route-level ${templateId.replace("template.", "").replaceAll("-", " ")} capability.`, concern: "route-modules", sources: [sitesSource], relation: relationships([templateId], [], routeIds), requiredStates: ["state.default", "state.unavailable", "state.error"], tests: ["surface-inventory.test.mjs"] }));
  slots.forEach(([slotName, policy], order) => {
    const slotId = `slot.${templateId.replace("template.", "")}.${slotName}`;
    const placementId = `placement.${templateId.replace("template.", "")}.${slotName}`;
    entities.push(entity({ id: slotId, kind: "slot", customerPurpose: `Named ${slotName} placement in ${templateId}.`, concern: "route-slots", sources: [sitesSource], relation: relationships([templateId], [placementId], routeIds), requiredStates: ["state.default", "state.unavailable"], tests: ["surface-inventory.test.mjs"], contract: { role: slotName, order, placementPolicy: policy, desktopSpan: "named-grid-area", responsiveStrategy: "template-owned", mobileOrder: order } }));
    entities.push(entity({ id: placementId, kind: "placement", customerPurpose: `Mount the approved ${slotName} module.`, concern: "route-placements", sources: [sitesSource], relation: relationships([slotId], [moduleId], routeIds, [slotId]), fieldIds: templateId === "template.product-detail" ? fieldDefinitions.map(([id]) => id) : [], contentIds: contentDefinitions.map(([id]) => id), mediaRoleIds: templateId === "template.product-detail" ? ["media.bottle", "media.label-panel", "media.label-wrap"] : [], requiredStates: ["state.default", "state.loading", "state.unavailable", "state.error", "state.responsive-reorder"], interactionIds: interactionDefinitions.map(([id]) => id), exposure: policy === "optional_flagged" ? "disabled" : "not_applicable", tests: ["surface-inventory.test.mjs"], contract: { placementPolicy: policy, featureId: policy === "optional_flagged" ? "feature.pdp-builder" : null } }));
  });
}

for (const route of routeRegistry.routes) {
  const templateId = familyTemplate(route.family);
  entities.push(entity({ id: `route.${route.id}`, kind: "route_definition", customerPurpose: `Compose the customer route ${route.path}.`, concern: "route-admission", owner: { repository: "olympus-plugin-initiator", concern: "Native Next route authority" }, sources: [routeSource], winningSource: routeSource, authorityClass: "canonical", integrationDisposition: "reuse", lifecycle: "next_synced", relation: relationships([], [templateId]), requiredStates: ["state.default", "state.loading", "state.unavailable", "state.error"], tests: ["surface-inventory.test.mjs"], contract: { path: route.path, family: route.family, disposition: route.disposition, runtimeOwner: route.owner, templateId } }));
}
for (const product of productRegistry.products) {
  entities.push(entity({ id: `route-instance.product.${product.canonicalProductId}`, kind: "route_instance", customerPurpose: `Render the canonical ${product.canonicalProductId} PDP instance.`, concern: "product-route-instances", owner: { repository: "olympus-plugin-initiator", concern: "canonical customer product registry" }, sources: [productSource], winningSource: productSource, authorityClass: "canonical", integrationDisposition: "reuse", lifecycle: "next_synced", relation: relationships(["route.product"]), fieldIds: fieldDefinitions.map(([id]) => id), contentIds: ["content.product-identity", "content.product-depth", "content.evidence", "content.commerce-state", "content.metadata"], mediaRoleIds: ["media.bottle", "media.label-panel", "media.label-wrap"], requiredStates: ["state.default", "state.loading", "state.unavailable", "state.error", "state.out-of-stock", "state.missing-media", "state.long-copy", "state.reduced-motion"], interactionIds: ["interaction.quantity", "interaction.add-to-bag", "interaction.view-record"], tests: ["surface-inventory.test.mjs"], contract: { canonicalProductId: product.canonicalProductId, path: `/product/${product.slug}`, publication: product.publication, mediaContractIdentity: product.renderContractIdentity } }));
}

const featurePlacementId = "placement.product-detail.pdp.builder";
entities.push(entity({ id: "feature.pdp-builder", kind: "feature_exposure", customerPurpose: "Expose an approved PDP builder placement without changing its component contract.", concern: "server-only-exposure", sources: [sitesSource], lifecycle: "sites_candidate", exposure: "disabled", relation: relationships([featurePlacementId], [], ["route.product"], [featurePlacementId.replace("placement.", "slot.")]), requiredStates: ["state.default", "state.unavailable"], tests: ["surface-inventory.test.mjs"], contract: { routeId: "product", slotId: "pdp.builder", moduleId: "module.product-detail", approvalDigest: null, defaultEnabled: false, killSwitchEnvironmentKey: "OLUK_FC_PDP_BUILDER" } }));

const sourceCandidates = [
  ["source.reference-canon", "reference_canon.md", "INTEGRATE_BOUNDED_DELTA", "compare_and_adapt"],
  ["source.system-taxonomy", "system-atlas screenshots", "GENERATED_EVIDENCE_ONLY", "compare_and_adapt"],
  ["source.atlas-shell", "702e17d1b796726299b9dceeca39a8bcd0cbeaa2", "INTEGRATE_BOUNDED_DELTA", "compare_and_adapt"],
  ["source.current-design-registries", "authority/*REGISTRY.json", "CONTAINED", "reuse"],
  ["source.next-sites-home", "apps/olympus-shopper-ui/app/sites-home/design-system", "CONFLICT_REQUIRES_CHAMPION", "compare_and_adapt"],
  ["source.next-components", "apps/olympus-shopper-ui/src/components", "CONFLICT_REQUIRES_CHAMPION", "compare_and_adapt"],
  ["source.next-route-local", "apps/olympus-shopper-ui/app/**", "CONFLICT_REQUIRES_CHAMPION", "compare_and_adapt"],
  ["source.old-runtime-studio", "reports/runtime-studio", "OBSOLETE_VITE_RUNTIME", "superseded"],
  ["source.precision-wrap", "Precision-Wrap recovery", "SUPERSEDED_WITH_REASON", "superseded"],
];
for (const [id, path, containment, disposition] of sourceCandidates) entities.push(entity({ id, kind: "source_candidate", customerPurpose: "Classify a bounded presentation-system source concern.", concern: "source-reconciliation", sources: [source(id.startsWith("source.next") ? "olympus-plugin-initiator" : "oluk-design-system", path, path.includes("702e17d") ? path : "CURRENT", containment, disposition)], authorityClass: containment === "CONTAINED" ? "runtime_current" : "candidate", integrationDisposition: disposition, lifecycle: disposition === "superseded" ? "retired" : "inventory", tests: ["surface-inventory.test.mjs"], contract: { removalCondition: disposition === "compare_and_adapt" ? "Retire after the winning concern is mapped into OLUK_PRESENTATION_SYSTEM_V2 and verified in both studios." : null } }));

const entityIds = new Set();
for (const item of entities) {
  if (entityIds.has(item.id)) throw new Error(`Duplicate surface inventory entity: ${item.id}`);
  entityIds.add(item.id);
}

const inventory = {
  contract: "OLUK_SURFACE_INVENTORY_V1",
  schemaVersion: "1.0.0",
  status: "EXECUTABLE_FOUNDATION",
  sources: {
    routeRegistry: { contract: routeRegistry.contract, count: routeRegistry.routes.length, sha256: sha256(routeRegistry), coordinate: routeSource },
    productRegistry: { contract: productRegistry.contract, count: productRegistry.products.length, sha256: sha256(productRegistry), coordinate: productSource },
  },
  counts: {
    routeDefinitions: routeRegistry.routes.length,
    productRouteInstances: productRegistry.products.length,
    entities: entities.length,
    byKind: Object.fromEntries([...new Set(entities.map((item) => item.kind))].sort().map((kind) => [kind, entities.filter((item) => item.kind === kind).length])),
  },
  enums: {
    authorityClass: ["canonical", "runtime_current", "candidate", "evidence_only", "historical"],
    sourceContainment: ["CONTAINED", "PATCH_EQUIVALENT", "INTEGRATE_BOUNDED_DELTA", "CONFLICT_REQUIRES_CHAMPION", "SUPERSEDED_WITH_REASON", "GENERATED_EVIDENCE_ONLY", "OBSOLETE_VITE_RUNTIME", "UNCOMMITTED_SOURCE_REQUIRES_EXTRACTION", "NO_RECOVERABLE_OUTPUT"],
    integrationDisposition: ["reuse", "compare_and_adapt", "replace", "suppress", "reject", "superseded", "blocked_by_authority", "blocked_by_data"],
    lifecycle: ["inventory", "sites_candidate", "sites_ready", "next_synced", "human_approved", "merged", "deployed", "proven_live", "retired"],
    exposure: ["not_applicable", "disabled", "enabled", "killed"],
    placementPolicy: ["required", "optional_flagged", "conditional_data", "owner_only", "preserve_only"],
  },
  laws: [
    "Native Next owns the canonical 74 customer route definitions.",
    "Codex Sites stages presentation and never owns customer runtime truth.",
    "Feature exposure applies only to approved optional placements.",
    "Missing producer data renders a declared conditional state.",
    "OPENLAB VERIFIED with its icon is the approved product evidence status; Sites fixtures cannot synthesize underlying evidence facts.",
    "Media never supplies product, evidence, price, stock, or purchase truth.",
    "No Figma coordinate is required for generation or approval.",
  ],
  entities,
};
inventory.contentHash = digestArtifact(inventory);

const routeAuthority = {
  contract: "OLUK_ROUTE_PRESENTATION_AUTHORITY_V1",
  schemaVersion: "1.0.0",
  status: "SITES_READY_NEXT_SYNC_REQUIRED",
  sourceInventoryDigest: inventory.contentHash,
  routeRegistryDigest: inventory.sources.routeRegistry.sha256,
  routeCount: routeRegistry.routes.length,
  routes: routeRegistry.routes.map((route) => {
    const templateId = familyTemplate(route.family);
    return {
      routeId: route.id,
      path: route.path,
      family: route.family,
      templateId,
      orderedSlots: templateSlots[templateId].map(([role, placementPolicy], order) => ({
        id: `slot.${templateId.replace("template.", "")}.${role}`,
        role,
        order,
        placementPolicy,
        featureId: placementPolicy === "optional_flagged" ? "feature.pdp-builder" : null,
      })),
      instanceRequirement: route.id === "product" ? { kind: "canonical-products", count: productRegistry.products.length } : route.path.includes(":") ? { kind: "dynamic-authority", status: "blocked_by_data" } : null,
      sitesPreviewPath: route.id === "product" ? "/product/mk-2866" : route.path.replace(/:([A-Za-z]+)/g, "sample-$1").replace("?", ""),
      nativeNextTarget: route.id === "product" ? "app/product/[slug]/page.next.tsx" : "canonical-route-mapping",
      requiredFieldIds: route.id === "product" ? fieldDefinitions.map(([id]) => id) : [],
      requiredStates: ["default", "loading", "unavailable", "error", "responsive-reorder"],
      lifecycle: route.id === "product" ? "sites_ready" : route.disposition === "owner-only" ? "inventory" : "inventory",
    };
  }),
};
routeAuthority.contentHash = digestArtifact(routeAuthority);

const presentationSystem = {
  contract: "OLUK_PRESENTATION_SYSTEM_V2",
  schemaVersion: "2.0.0",
  status: "SITES_PRODUCER_FOUNDATION",
  sourceInventoryDigest: inventory.contentHash,
  routeAuthorityDigest: routeAuthority.contentHash,
  tokenIds: entities.filter((item) => item.kind === "token").map((item) => item.id),
  primitiveIds: entities.filter((item) => item.kind === "primitive").map((item) => item.id),
  componentIds: entities.filter((item) => item.kind === "component").map((item) => item.id),
  moduleIds: entities.filter((item) => item.kind === "module").map((item) => item.id),
  templateIds: entities.filter((item) => item.kind === "route_template").map((item) => item.id),
  fieldIds: entities.filter((item) => item.kind === "field_binding").map((item) => item.id),
  stateIds: entities.filter((item) => item.kind === "state").map((item) => item.id),
  interactionIds: entities.filter((item) => item.kind === "interaction").map((item) => item.id),
  sourceDispositions: entities.filter((item) => item.kind === "source_candidate").map((item) => ({ id: item.id, containment: item.sourceContainment, disposition: item.integrationDisposition, removalCondition: item.contract.removalCondition })),
  responsiveViewports: [1440, 1024, 768, 390],
  approvalLaw: "Human approval binds exact Design and Native Next digests plus four-width capture hashes; it cannot be inferred from source, tests, or deployment.",
};
presentationSystem.contentHash = digestArtifact(presentationSystem);

const approval = {
  contract: "OLUK_PRESENTATION_APPROVAL_V1",
  schemaVersion: "1.0.0",
  status: "PENDING_HUMAN_REVIEW",
  design: {
    inventoryDigest: inventory.contentHash,
    presentationDigest: presentationSystem.contentHash,
    routeAuthorityDigest: routeAuthority.contentHash,
    sourceSha: null,
  },
  next: { candidateSha: null, bindingDigest: null },
  scope: { routeIds: ["home"], moduleIds: ["module.homepage"], productInstanceCount: 5 },
  captures: [1440, 1024, 768, 390].map((viewport) => ({ viewport, sitesSha256: null, nextSha256: null })),
  decision: null,
  decidedAt: null,
  decidedBy: null,
};
approval.contentHash = digestArtifact(approval);

const outputs = [
  ["authority/generated/OLUK-SURFACE-INVENTORY-V1.json", inventory],
  ["authority/generated/OLUK-PRESENTATION-SYSTEM-V2.json", presentationSystem],
  ["authority/generated/OLUK-ROUTE-PRESENTATION-AUTHORITY-V1.json", routeAuthority],
  ["authority/generated/OLUK-PRESENTATION-APPROVAL-V1.pending.json", approval],
];
for (const [relativePath, value] of outputs) {
  const path = resolve(repoRoot, relativePath);
  const serialized = `${JSON.stringify(value, null, 2)}\n`;
  if (checkOnly) {
    const current = await readFile(path, "utf8").catch(() => "");
    if (current !== serialized) throw new Error(`${relativePath} is stale; run npm run surface:generate.`);
  } else {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, serialized);
  }
}
console.log(JSON.stringify({
  contract: inventory.contract,
  routes: inventory.counts.routeDefinitions,
  productInstances: inventory.counts.productRouteInstances,
  entities: inventory.counts.entities,
  inventoryDigest: inventory.contentHash,
  presentationDigest: presentationSystem.contentHash,
  routeAuthorityDigest: routeAuthority.contentHash,
  mode: checkOnly ? "check" : "write",
}, null, 2));
