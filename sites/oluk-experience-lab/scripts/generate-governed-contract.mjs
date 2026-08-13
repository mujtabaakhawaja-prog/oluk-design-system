import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(siteRoot, "../..");

const sources = {
  bridge: path.join(repoRoot, "authority/FIGMA-CODE-BRIDGE.json"),
  routes: path.join(repoRoot, "authority/SITE-ROUTE-LEDGER.json"),
  intents: path.join(repoRoot, "authority/FIGMA-INTENT-REGISTRY.json"),
  programComponents: path.join(repoRoot, "authority/PROGRAM-COMPONENT-REGISTRY.json"),
  pdpSections: path.join(repoRoot, "authority/PDP-SECTION-MODULE-REGISTRY.json"),
  openLabSections: path.join(repoRoot, "authority/OPENLAB-SECTION-MODULE-REGISTRY.json"),
  runtime: path.join(repoRoot, "authority/generated/OLYMPUS-RUNTIME-CONTRACT.json"),
  tokens: path.join(siteRoot, "tests/contracts/governed-token-manifest.json"),
};

const stable = (value) => {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
};

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const entries = await Promise.all(Object.entries(sources).map(async ([key, file]) => {
  const raw = await readFile(file, "utf8");
  return [key, { file: path.relative(repoRoot, file), sha256: sha256(raw), value: JSON.parse(raw) }];
}));
const input = Object.fromEntries(entries);

const payload = stable({
  schemaVersion: 1,
  contractId: "oluk.governed-design-contract.v1",
  status: "HUMAN_REVIEW_REQUIRED_UNPUBLISHED",
  runtimeAuthority: "NONE",
  generatedFrom: Object.fromEntries(Object.entries(input).map(([key, item]) => [key, { file: item.file, sha256: item.sha256 }])),
  designSystem: {
    figmaFileKey: input.bridge.value.authority.figmaFileKey,
    figmaReceipt: input.bridge.value.authority.conv004CurrentReceipt,
    publicationState: input.bridge.value.authority.publicationState,
    variableCount: input.bridge.value.figmaCloseoutProof.variables.total,
    tokenCollections: input.bridge.value.tokenCollections,
    componentMappings: input.bridge.value.componentMappings,
    programComponentMappings: input.programComponents.value.components,
    sectionModuleMappings: [...input.pdpSections.value.modules, ...input.openLabSections.value.modules],
    sectionModuleCount: input.pdpSections.value.modules.length + input.openLabSections.value.modules.length,
    componentCount: input.bridge.value.componentMappings.length + input.programComponents.value.components.length,
    tokenManifest: input.tokens.value,
  },
  routeAuthority: {
    terminalContract: input.routes.value.terminalContract,
    canonicalOpenLabNamespace: input.routes.value.canonicalOpenLabNamespace,
    aliases: input.routes.value.aliasPolicy,
    routes: input.routes.value.routes,
  },
  intentAuthority: input.intents.value,
  runtimeContractSnapshot: {
    schemaVersion: input.runtime.value.schemaVersion,
    contentHash: input.runtime.value.contentHash,
    status: input.runtime.value.status,
    browserDirectServiceCallsAllowed: input.runtime.value.authority.browserDirectServiceCallsAllowed,
  },
  immutableProductTruth: {
    series: "SARM SERIES",
    product: "MK-2866",
    alias: "Ostarine",
    sku: "80529-01",
    strength: "15 MG",
    servings: "90 SERVINGS",
    purity: ">99%",
    displayPrice: "£43",
  },
  boundaries: {
    sites: "governed design and review candidate",
    shopperSsr: "public first paint, route shells, same-origin bridge and hydration",
    toolsService: "server-side cart, checkout, lifecycle, order and evidence projections",
    woo: "catalogue and order ledger",
    initiator: "final payment verification and verified Woo mutation",
    browserDirectServiceCalls: false,
  },
});

const contract = { ...payload, contractHash: sha256(JSON.stringify(payload)) };
const rendered = `${JSON.stringify(contract, null, 2)}\n`;
const outputs = [
  path.join(repoRoot, "authority/generated/OLUK-DESIGN-CONTRACT.json"),
  path.join(siteRoot, "public/.well-known/oluk-governed-design-contract.json"),
];

if (process.argv.includes("--check")) {
  for (const output of outputs) {
    const current = await readFile(output, "utf8").catch(() => "");
    if (current !== rendered) throw new Error(`stale governed contract: ${path.relative(repoRoot, output)}`);
  }
  process.stdout.write(`PASS governed contract ${contract.contractHash} · ${contract.routeAuthority.routes.length} routes · ${contract.designSystem.componentCount} components\n`);
} else {
  for (const output of outputs) {
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, rendered);
  }
  process.stdout.write(`WROTE governed contract ${contract.contractHash}\n`);
}
