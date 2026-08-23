import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourceDir = join(root, "app/design-system");
const defaultOutput = resolve(root, "../../authority/generated/OLUK-COMPONENT-CENSUS-V1.json");
const outputFlag = process.argv.indexOf("--output");
const output = outputFlag >= 0 ? resolve(process.cwd(), process.argv[outputFlag + 1]) : defaultOutput;
const checkOnly = process.argv.includes("--check");
const stdoutOnly = process.argv.includes("--stdout");

const files = readdirSync(sourceDir).filter((name) => name.endsWith(".tsx")).sort();
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
  [...source.matchAll(/data-oluk-node="([^"]+)"/g)].map((match) => match[1]).sort();

const components = [];
for (const file of files) {
  const source = readFileSync(join(sourceDir, file), "utf8");
  const fileNodes = semanticNodes(source);
  for (const match of source.matchAll(/export\s+(?:function|const)\s+([A-Z][A-Za-z0-9_]*)/g)) {
    const name = match[1];
    components.push({
      id: `component.${name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`,
      name,
      family: familyFor(file),
      variants: name.includes("Card") ? ["default", "compact", "vertical", "featured", "relation"] : ["default"],
      states: ["default", "focus-visible", "mobile"],
      responsiveModes: [1440, 1024, 768, 390],
      pageTemplates: name.includes("Pdp") || name.includes("Product") || name.includes("Purchase") ? ["product-detail"] : name.includes("OpenLab") ? ["openlab-portal", "openlab-archive"] : ["shared"],
      routeModuleUsage: [],
      governingSource: relative(root, join(sourceDir, file)),
      sourceExport: name,
      semanticNodeIds: fileNodes,
      stagingImplementation: "implemented",
      runtimeStudioAdoption: "not_assessed",
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
  counts: { components: components.length, byFamily },
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
