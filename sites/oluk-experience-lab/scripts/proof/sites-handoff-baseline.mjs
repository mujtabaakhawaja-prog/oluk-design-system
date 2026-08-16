import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = resolve(fileURLToPath(new URL(".", import.meta.url)));
const appRoot = resolve(scriptDirectory, "../..");
const repositoryRoot = resolve(appRoot, "../..");
const handoffRoot = resolve(repositoryRoot, "authority/handoffs/OLUK_SITES_HANDOFF_BASELINE_V1");

const sourceTokenPath = resolve(appRoot, "app/design-system/candidate-tokens.css");
const sourceLedgerPath = resolve(repositoryRoot, "authority/SITE-ROUTE-LEDGER.json");
const expected = {
  tokenSha256: "c93ad3fedf4d54d0693c416c65bc37f394b77ef254ac9a060f15832d3c833b8d",
  ledgerSha256: "329b48a822b99de8728d1d0d28e037a8b5fcb2244c19421e8a0e12489de53ce7",
  tokenDeclarationCount: 128,
  ledgerEntryCount: 73,
};

const requiredArtifacts = [
  "README.md",
  "SITES-001-SOURCE-TOPOLOGY.md",
  "OLUK_TOKEN_MANIFEST_V1.json",
  "OLUK_AVAILABILITY_EVIDENCE_CONTRACT_V1.json",
  "OLUK_TYPE_AND_MATERIAL_CONTRACT_V1.json",
  "OLUK_RUNTIME_PRIMITIVE_CATALOG_V1.json",
  "OLUK_MODULE_VARIANT_CATALOG_V1.json",
  "OLUK_FAMILY_TEMPLATE_CATALOG_V1.json",
  "OLUK_ROUTE_RENDER_MANIFEST_V1.json",
  "OLUK_MOBILE_COMPACTION_MANIFEST_V1.json",
  "OLUK_ROUTE_PROOF_REGISTER_V1.json",
];

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

const failures = [];
const tokenSource = await readFile(sourceTokenPath, "utf8");
const ledgerSource = await readFile(sourceLedgerPath, "utf8");
const tokenRoles = [...tokenSource.matchAll(/--oluk-[a-z0-9-]+\s*:/g)].map(([match]) => match.replace(/\s*:/, ""));
const tokenManifest = await readJson(resolve(handoffRoot, "OLUK_TOKEN_MANIFEST_V1.json"));
const availability = await readJson(resolve(handoffRoot, "OLUK_AVAILABILITY_EVIDENCE_CONTRACT_V1.json"));
const routes = await readJson(sourceLedgerPath);

for (const artifact of requiredArtifacts) {
  try {
    await stat(resolve(handoffRoot, artifact));
  } catch {
    failures.push(`missing handoff artifact: ${artifact}`);
  }
}

if (sha256(tokenSource) !== expected.tokenSha256) failures.push("token source hash drift");
if (sha256(ledgerSource) !== expected.ledgerSha256) failures.push("route ledger hash drift");
if (new Set(tokenRoles).size !== expected.tokenDeclarationCount) failures.push("token declaration count drift");
if (routes.routes?.length !== expected.ledgerEntryCount) failures.push("route ledger count drift");
if (tokenManifest.authoritativeDeclarationSet.sha256 !== expected.tokenSha256) failures.push("token manifest source identity drift");
if (tokenManifest.authoritativeDeclarationSet.declarationCount !== expected.tokenDeclarationCount) failures.push("token manifest count drift");
if (availability.inventory.states["in-stock"].foreground !== "#0057FF") failures.push("StockPill cobalt contract drift");
if (availability.actionAndSystemState.success.value !== "#15803D") failures.push("success contract drift");
if (availability.actionAndSystemState.forbidden.every((rule) => !rule.includes("#4ADE80"))) failures.push("green collision guard missing");

if (failures.length) {
  console.error(`sites-handoff-baseline: FAIL\n- ${failures.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log(`sites-handoff-baseline: PASS (${tokenRoles.length} token declarations, ${routes.routes.length} route patterns)`);
}
