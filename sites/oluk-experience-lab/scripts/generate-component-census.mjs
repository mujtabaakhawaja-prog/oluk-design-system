import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const repoRoot = resolve(root, "../..");
const sourceDir = join(root, "app/design-system");
const defaultOutput = resolve(root, "../../authority/generated/OLUK-COMPONENT-CENSUS-V1.json");
const outputFlag = process.argv.indexOf("--output");
const output = outputFlag >= 0 ? resolve(process.cwd(), process.argv[outputFlag + 1]) : defaultOutput;
const checkOnly = process.argv.includes("--check");
const stdoutOnly = process.argv.includes("--stdout");

const files = readdirSync(sourceDir).filter((name) => name.endsWith(".tsx")).sort();
const nodeSource = JSON.parse(readFileSync(join(repoRoot, "authority/OLUK-DESIGN-NODE-SOURCE-V1.json"), "utf8"));
const routeRegistry = JSON.parse(readFileSync(join(repoRoot, "authority/imports/oluk-canonical-customer-route-registry.v1.json"), "utf8"));
const routesById = new Map(routeRegistry.routes.map((route) => [`route.${route.id}`, route]));
const familyFor = (file) => {
  if (file.includes("header") || file.includes("navigation")) return "shell";
  if (file.includes("openlab") || file.includes("evidence")) return "openlab";
  if (file.includes("product") || file.includes("commerce") || file.includes("metric") || file.includes("price")) return "commerce";
  if (file.includes("pdp") || file.includes("dossier") || file.includes("purchase")) return "pdp";
  if (file.includes("review") || file.includes("atlas") || file.includes("workbench")) return "owner_tooling";
  if (file.includes("surface") || file.includes("token") || file.includes("action") || file.includes("status") || file.includes("divider")) return "foundation";
  return "route_module";
};
const semanticNodes = (source) =>
  [...new Set([...source.matchAll(/data-oluk-node="([^"]+)"/g)].map((match) => match[1]))].sort();
const sourcePathFor = (file) => `sites/oluk-experience-lab/app/design-system/${file}`;
const explicitNodes = nodeSource.nodes.map((node) => ({
  ...node,
  allowedRouteIds: node.allowedRouteIds ?? nodeSource.defaults.allowedRouteIds ?? [],
  allowedSlotIds: node.allowedSlotIds ?? nodeSource.defaults.allowedSlotIds ?? [],
  adoption: node.adoption ?? nodeSource.defaults.adoption,
}));
const nodesByCoordinate = new Map();
for (const node of explicitNodes) {
  const key = `${node.sourcePath}#${node.exportName}`;
  const existing = nodesByCoordinate.get(key) ?? [];
  existing.push(node);
  nodesByCoordinate.set(key, existing);
}
const routeTrainFor = (family) => ({
  shell: "shell-homepage",
  openlab: "openlab",
  commerce: "pdp-commerce",
  pdp: "pdp",
  owner_tooling: "owner-tooling",
  foundation: "shared-foundation",
  route_module: "route-family-modules",
}[family] ?? "route-family-modules");
const inventoryReasonFor = (family, routeTrain) => family === "owner_tooling"
  ? "Owner-only tooling export; register only if it becomes an editable Workbench specimen."
  : `Deferred to the ${routeTrain} route train; it cannot enter Runtime Studio or customer adoption until it receives a semantic node and explicit route/slot ownership.`;

const components = [];
for (const file of files) {
  const source = readFileSync(join(sourceDir, file), "utf8");
  const fileNodes = semanticNodes(source);
  for (const match of source.matchAll(/export\s+(?:function|const)\s+([A-Z][A-Za-z0-9_]*)/g)) {
    const name = match[1];
    const sourcePath = sourcePathFor(file);
    const coordinate = `${sourcePath}#${name}`;
    const registeredNodes = nodesByCoordinate.get(coordinate) ?? [];
    const family = familyFor(file);
    const routeTrain = routeTrainFor(family);
    const registered = registeredNodes.length > 0;
    const routeIds = [...new Set(registeredNodes.flatMap((node) => node.allowedRouteIds))].sort();
    const slotIds = [...new Set(registeredNodes.flatMap((node) => node.allowedSlotIds))].sort();
    const templates = [...new Set(routeIds.map((routeId) => routesById.get(routeId)?.family).filter(Boolean))].sort();
    components.push({
      id: `component.${name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`,
      name,
      family,
      variants: name.includes("Card") ? ["default", "compact", "vertical", "featured", "relation"] : ["default"],
      states: ["default", "focus-visible", "mobile"],
      responsiveModes: [1440, 1024, 768, 390],
      pageTemplates: registered ? (templates.length ? templates : ["owner-only"]) : [`inventory-only:${routeTrain}`],
      routeModuleUsage: registered
        ? (() => {
            const usage = [...new Set([
              ...routeIds,
              ...slotIds,
              ...registeredNodes
                .flatMap((node) => [...(node.parentIds ?? []), ...(node.childIds ?? [])])
                .filter((id) => id.startsWith("module.")),
            ])].sort();
            return usage.length ? usage : ["owner-tooling.system-atlas"];
          })()
        : [`route-train.${routeTrain}`],
      governingSource: relative(root, join(sourceDir, file)),
      sourceExport: name,
      fileSemanticNodeIds: fileNodes,
      semanticNodeIds: registeredNodes.map((node) => node.id).sort(),
      semanticDisposition: registered ? "REGISTERED_EDITABLE_NODE" : "INVENTORY_ONLY",
      semanticDispositionReason: registered
        ? "Exact source export is owned by one or more explicit semantic roles in OLUK_DESIGN_NODE_SOURCE_V1."
        : inventoryReasonFor(family, routeTrain),
      routeTrain,
      requiresRegistrationBeforeAdoption: !registered,
      stagingImplementation: "implemented",
      runtimeStudioAdoption: registered
        ? [...new Set(registeredNodes.map((node) => node.adoption.next))].sort().join("+")
        : "inventory_only_until_route_train",
      openGates: ["human_review"],
    });
  }
}
components.sort((a, b) => a.id.localeCompare(b.id));
const families = [...new Set(components.map((entry) => entry.family))].sort();
const byFamily = Object.fromEntries(families.map((family) => [family, components.filter((entry) => entry.family === family).length]));
const content = {
  contract: "OLUK_COMPONENT_CENSUS_V1",
  schemaVersion: "1.0.0",
  generatedFrom: "sites/oluk-experience-lab/app/design-system/*.tsx",
  counts: {
    components: components.length,
    registeredEditable: components.filter((component) => component.semanticDisposition === "REGISTERED_EDITABLE_NODE").length,
    inventoryOnly: components.filter((component) => component.semanticDisposition === "INVENTORY_ONLY").length,
    emittedSemanticNodeIds: [...new Set(components.flatMap((component) => component.fileSemanticNodeIds))].length,
    byFamily,
  },
  laws: [
    "Registered editable exports resolve to explicit semantic roles and route or owner-only usage.",
    "Inventory-only exports carry a named route train and exact deferral reason; they are not eligible for Runtime Studio or customer adoption.",
    "File-level emitted node markers are evidence only and are not assigned to every export in that file.",
  ],
  components,
};
const contentHash = createHash("sha256").update(JSON.stringify(content)).digest("hex");
const serialized = `${JSON.stringify({ ...content, contentHash }, null, 2)}\n`;

if (stdoutOnly) {
  process.stdout.write(serialized);
} else if (checkOnly) {
  if (readFileSync(output, "utf8") !== serialized) throw new Error("OLUK component census is stale");
  console.log(`OLUK component census verified: ${components.length} components · ${contentHash}`);
} else {
  writeFileSync(output, serialized);
  console.log(`OLUK component census generated: ${components.length} components · ${contentHash}`);
}
