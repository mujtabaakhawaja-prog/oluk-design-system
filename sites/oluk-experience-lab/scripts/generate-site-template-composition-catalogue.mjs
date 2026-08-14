#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const sourcePath = path.join(repoRoot, "authority/SITE-TEMPLATE-COMPOSITION-SOURCE.json");
const ledgerPath = path.join(repoRoot, "authority/SITE-ROUTE-LEDGER.json");
const outputPath = path.join(repoRoot, "authority/SITE-TEMPLATE-COMPOSITION-CATALOGUE.json");
const digest = (value) => createHash("sha256").update(value).digest("hex");
const stringify = (value) => `${JSON.stringify(value, null, 2)}\n`;

const [sourceRaw, ledgerRaw] = await Promise.all([readFile(sourcePath, "utf8"), readFile(ledgerPath, "utf8")]);
const source = JSON.parse(sourceRaw);
const ledger = JSON.parse(ledgerRaw);

if (!Array.isArray(ledger.routes) || ledger.routes.length !== 73) {
  throw new Error("The route ledger must contain exactly 73 routes");
}

const requiredSectionFields = ["id", "customerPurpose", "mobileStrategy", "dataRequirements", "mediaPolicy"];
const clone = (value) => JSON.parse(JSON.stringify(value));

const applyPatch = (sections, patch = {}) => {
  const replacements = patch.replace ?? {};
  const removed = new Set(patch.remove ?? []);
  return sections
    .filter((section) => !removed.has(section.id))
    .map((section) => clone(replacements[section.id] ?? section));
};

const compositionFor = (route) => {
  const templateId = source.familyTemplates[route.family];
  if (!templateId) throw new Error(`No template declared for ${route.id} (${route.family})`);
  const template = source.templates[templateId];
  if (!template) throw new Error(`Template ${templateId} is not declared`);
  if (!Array.isArray(template.candidateLayoutIds) || template.candidateLayoutIds.length !== 3) {
    throw new Error(`Template ${templateId} must declare exactly three layout candidates`);
  }
  if (new Set(template.candidateLayoutIds).size !== 3) throw new Error(`Template ${templateId} repeats a layout candidate`);
  if (template.ownerSelection !== "PENDING_COMPLETE_CANDIDATE_REVIEW") throw new Error(`Template ${templateId} must remain unselected until complete candidate review`);
  for (const candidateId of template.candidateLayoutIds) {
    if (!source.candidateLayouts[candidateId]) throw new Error(`Template ${templateId} references unknown candidate ${candidateId}`);
  }
  const profileName = source.routeProfileOverrides[route.id] ?? template.sectionProfile;
  const baseSections = source.profiles[template.sectionProfile];
  if (!Array.isArray(baseSections) || baseSections.length === 0) throw new Error(`Template ${templateId} lacks a section profile`);
  const sections = applyPatch(baseSections, source.profilePatches[profileName]);
  if (new Set(sections.map(({ id }) => id)).size !== sections.length) throw new Error(`Route ${route.id} has duplicate section ids`);
  for (const section of sections) {
    for (const field of requiredSectionFields) {
      if (section[field] === undefined || section[field] === "" || (Array.isArray(section[field]) && section[field].length === 0)) {
        throw new Error(`Route ${route.id} section ${section.id} is missing ${field}`);
      }
    }
  }
  return {
    routeId: route.id,
    path: route.path,
    family: route.family,
    designMaturity: route.designMaturity,
    runtimeReadiness: route.runtimeReadiness,
    templateId,
    profile: profileName,
    candidateCompositions: template.candidateLayoutIds.map((id) => ({
      id,
      ...source.candidateLayouts[id],
      sectionOrder: sections,
      state: "ARCHITECTURE_DEFINED",
      ownerSelected: false,
    })),
    ownerSelection: template.ownerSelection,
    plannedSectionOrder: sections,
  };
};

const compiled = {
  schemaVersion: "oluk.site-template-composition-catalogue.v1",
  status: "SITES_COMPOSITION_ARCHITECTURES_UNSELECTED",
  authority: source.authority,
  source: {
    path: "authority/SITE-TEMPLATE-COMPOSITION-SOURCE.json",
    sha256: digest(sourceRaw),
  },
  ledgerSource: {
    path: "authority/SITE-ROUTE-LEDGER.json",
    sha256: digest(ledgerRaw),
    routeCount: ledger.routes.length,
  },
  routes: ledger.routes.map(compositionFor),
};

const next = stringify(compiled);
if (process.argv.includes("--check")) {
  if (await readFile(outputPath, "utf8") !== next) {
    throw new Error("Site template composition catalogue is stale; run npm run template-catalogue:generate");
  }
  process.stdout.write(`PASS site template composition catalogue ${compiled.source.sha256}\n`);
} else {
  await writeFile(outputPath, next);
  process.stdout.write(`WROTE site template composition catalogue ${compiled.source.sha256}\n`);
}
