#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const readJson = async (relative) => JSON.parse(await readFile(path.join(repoRoot, relative), "utf8"));
const digest = (value) => createHash("sha256").update(value).digest("hex");
const output = (value) => `${JSON.stringify(value, null, 2)}\n`;

const [ledgerRaw, ledger, mounts, topology] = await Promise.all([
  readFile(path.join(repoRoot, "authority/SITE-ROUTE-LEDGER.json"), "utf8"),
  readJson("authority/SITE-ROUTE-LEDGER.json"),
  readJson("authority/FRONTIER-SECTION-MOUNT-REGISTRY.json"),
  readJson("authority/ROUTE-PROMOTION-TOPOLOGY.json"),
]);

if (!Array.isArray(ledger.routes) || ledger.routes.length !== 73) throw new Error("The route ledger must contain exactly 73 routes");

const matchPath = (pattern, concretePath) => {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = concretePath.split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) return false;
  return patternParts.every((part, index) => part.startsWith(":") || part === pathParts[index]);
};

const templateFor = (route) => topology.templates.find((template) => template.families.includes(route.family))?.id ?? "support";
const moduleById = new Map(mounts.sections.map((section) => [section.id, section]));

const placement = (moduleId, state, template, route) => {
  const section = moduleById.get(moduleId);
  const rule = topology.modules[moduleId];
  if (!section || !rule) throw new Error(`Missing section/rule for ${moduleId}`);
  return {
    module: moduleId,
    state,
    insertionPoint: rule.insertionPoint,
    customerPurpose: rule.customerPurpose,
    sourceContent: section.dataContext,
    actualMediaPolicy: rule.actualMediaPolicy,
    mobileStrategy: section.mobileStrategy,
    standaloneDestination: rule.standaloneDestination,
    invalidatedConsumers: ledger.routes.filter((candidate) => section.mounts.some((mount) => matchPath(mount, candidate.path))).map(({ id }) => id),
    declaredStates: section.states,
    template,
    routeId: route.id,
  };
};

const routeDispositions = ledger.routes.map((route) => {
  const template = templateFor(route);
  const definition = topology.templates.find(({ id }) => id === template);
  const actualModules = mounts.sections
    .filter((section) => section.mounts.some((mount) => matchPath(mount, route.path)))
    .map(({ id }) => id);
  const promotedPlacements = route.designMaturity === "DESIGN_INCOMPLETE"
    ? []
    : actualModules.map((moduleId) => placement(moduleId, "PROMOTED", template, route));
  const promotableIds = definition.promotable.filter((moduleId) => !actualModules.includes(moduleId));
  return {
    routeId: route.id,
    path: route.path,
    family: route.family,
    template,
    designMaturity: route.designMaturity,
    runtimeReadiness: route.runtimeReadiness,
    disposition: route.disposition,
    promoted: promotedPlacements.length > 0,
    promotedPlacements,
    promotablePlacements: promotableIds.map((moduleId) => placement(moduleId, "PROMOTABLE", template, route)),
    standaloneDestinations: definition.standaloneDestinations,
  };
});

const compiled = {
  schemaVersion: "oluk.route-promotion.v2",
  status: "LEDGER_BOUND_CURRENT_PLACEMENTS",
  authority: "Codex Sites is the composition source of truth. PROMOTED means a Section Mount Registry declaration currently matches this route; Figma references alone never establish a placement.",
  stateModel: "authority/DESIGN-SYNC-STATE-MODEL.json",
  topologySource: "authority/ROUTE-PROMOTION-TOPOLOGY.json",
  ledgerSource: {
    path: "authority/SITE-ROUTE-LEDGER.json",
    sha256: digest(ledgerRaw),
    routeCount: ledger.routes.length,
  },
  routeDispositions,
};

const matrixPath = path.join(repoRoot, "authority/ROUTE-PROMOTION-MATRIX.json");
if (process.argv.includes("--check")) {
  if (await readFile(matrixPath, "utf8") !== output(compiled)) throw new Error("Route promotion matrix is stale; run npm run promotion:generate");
  process.stdout.write(`PASS route promotion matrix ${compiled.ledgerSource.sha256}\n`);
} else {
  await writeFile(matrixPath, output(compiled));
  process.stdout.write(`WROTE route promotion matrix ${compiled.ledgerSource.sha256}\n`);
}
