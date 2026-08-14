#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const productSourcePath = path.join(siteRoot, "app/design-system/frontier-content.ts");
const editorialCorpusPath = path.join(repoRoot, "authority/PRODUCT-EDITORIAL-SOURCE-CORPUS.json");
const openLabPath = path.join(repoRoot, "authority/fixtures/OPENLAB-PUBLIC-PROJECTION-V2-MK2866.json");
const outputPath = path.join(siteRoot, "app/design-system/product-experience-catalog.json");
const openLabOutputPath = path.join(siteRoot, "app/design-system/openlab-product-depth.json");
const digest = (value) => createHash("sha256").update(value).digest("hex");

function valueOf(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(valueOf);
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.filter(ts.isPropertyAssignment).map((property) => [property.name.getText().replaceAll('"', ""), valueOf(property.initializer)]));
  throw new Error(`Unsupported compiler input node: ${ts.SyntaxKind[node.kind]}`);
}

const productRaw = await readFile(productSourcePath, "utf8");
const editorialCorpusRaw = await readFile(editorialCorpusPath, "utf8");
const editorialCorpus = JSON.parse(editorialCorpusRaw);
const source = ts.createSourceFile(productSourcePath, productRaw, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
let products = [];
source.forEachChild((node) => {
  if (!ts.isVariableStatement(node)) return;
  for (const declaration of node.declarationList.declarations) {
    if (declaration.name.getText() !== "frontierProducts" || !declaration.initializer) continue;
    const expression = ts.isAsExpression(declaration.initializer) ? declaration.initializer.expression : declaration.initializer;
    if (!ts.isArrayLiteralExpression(expression)) continue;
    products = expression.elements.map((element) => {
      if (!ts.isCallExpression(element) || element.expression.getText() !== "record") throw new Error("Product catalogue must contain record({...}) calls only");
      return valueOf(element.arguments[0]);
    });
  }
});

const bySlug = Object.fromEntries(products.map((product) => [product.slug, product]));
const editorialBySlug = editorialCorpus.products ?? {};
const sourceCatalogue = editorialCorpus.sources ?? {};
if (editorialCorpus.schemaVersion !== "oluk.product-editorial-corpus.v1") throw new Error("Unsupported product editorial corpus schema");
if (products.length !== 16) throw new Error(`Expected 16 products, found ${products.length}`);
if (Object.keys(editorialBySlug).length !== products.length) throw new Error("Editorial corpus must cover every catalogue product exactly once");
for (const product of products) {
  const editorial = editorialBySlug[product.slug];
  if (!editorial) throw new Error(`Missing editorial corpus record for ${product.slug}`);
  if (!Array.isArray(editorial.sources) || !editorial.sources.length || !Array.isArray(editorial.locators) || editorial.sources.length !== editorial.locators.length) throw new Error(`Invalid editorial source attribution for ${product.slug}`);
  for (const sourceId of editorial.sources) {
    const sourceRecord = sourceCatalogue[sourceId];
    if (!sourceRecord?.sha256 || !sourceRecord?.kind || !sourceRecord?.title) throw new Error(`Unknown editorial source ${sourceId} for ${product.slug}`);
  }
  for (const field of ["summary", "researchProfile", "guidance", "considerations"]) {
    if (typeof editorial.editorial?.[field] !== "string" || editorial.editorial[field].trim().length < 24) throw new Error(`Editorial ${field} is incomplete for ${product.slug}`);
  }
  for (const field of ["eyebrow", "headline", "promise", "differentiator", "primaryAction", "mobileSummary"]) {
    if (typeof editorial.proposition?.[field] !== "string" || !editorial.proposition[field].trim()) throw new Error(`Customer proposition ${field} is incomplete for ${product.slug}`);
  }
  if (!Array.isArray(editorial.proposition.benefits) || editorial.proposition.benefits.length < 3) throw new Error(`Customer proposition benefits are incomplete for ${product.slug}`);
}
const locks = [
  ["mk-2866", "15 MG", "90 SERVINGS", "£43", "80529-01"],
  ["rad-140", "8 MG", "60 SERVINGS", "£55", "RAD140-08"],
  ["ment", "20 MG", "30 SERVINGS", "£49", "MENT-20"],
  ["mk-677", "15 MG", "90 SERVINGS", "£45", "MK677-15"],
  ["lgd-4033", "5 MG", "", "£44", "LGD4033-05"],
];
for (const [slug, strength, servings, price, sku] of locks) {
  const product = bySlug[slug];
  if (!product || product.strength !== strength || product.servings !== servings || product.price !== price || product.sku !== sku) throw new Error(`Locked product facts failed for ${slug}`);
}
if (/RAD-140[^\n]{0,120}10 MG|10 MG[^\n]{0,120}RAD-140/i.test(productRaw)) throw new Error("RAD-140 10 MG is forbidden");
if (bySlug.ment.series !== "PROHORMONE SERIES") throw new Error("MENT must remain PROHORMONE SERIES");
if (bySlug["gw-501516"].name !== "GW-50156" || bySlug["gw-501516"].strength !== "10 MG") throw new Error("Cardarine must display as GW-50156 · 10 MG while retaining the legacy gw-501516 slug");

const openLabRaw = await readFile(openLabPath, "utf8");
const projection = JSON.parse(openLabRaw);
const record = projection.records.find((candidate) => candidate.productSlug === "mk-2866");
if (!record?.analytes?.length) throw new Error("MK-2866 OpenLab projection unavailable");
const analyte = record.analytes[0];
const media = {
  "mk-2866": "/assets/products/mk-2866/front.png", "rad-140": "/assets/products/rad-140/front.png",
  "mk-677": "/assets/products/hero/mk-677/front.webp", "gw-501516": "/assets/products/shop/gw-501516.jpeg",
  epistane: "/assets/products/shop/epistane.webp", ment: "/assets/products/hero/ment/front.webp", "m-sten": "/assets/products/shop/m-sten.webp",
};
const attributionFor = (editorial) => editorial.sources.map((sourceId, index) => ({
  id: sourceId,
  kind: sourceCatalogue[sourceId].kind,
  title: sourceCatalogue[sourceId].title,
  sha256: sourceCatalogue[sourceId].sha256,
  locator: editorial.locators[index],
}));
const catalogue = products.map((product) => ({
  product,
  editorial: {
    ...editorialBySlug[product.slug].editorial,
    customerProposition: editorialBySlug[product.slug].proposition,
    sourceAttribution: attributionFor(editorialBySlug[product.slug]),
  },
  media: media[product.slug] ? [{ role: "front", src: media[product.slug], authority: "registered-actual-render" }] : [{ role: "front", src: null, authority: "governed-unpopulated-chamber" }],
  pdp: {
    sections: ["decision", "details", "evidence", "stack", "related", "reviews"],
    decision: editorialBySlug[product.slug].proposition,
    details: editorialBySlug[product.slug].editorial,
    related: product.related,
  },
  stacks: { goals: product.goal, additions: product.stack, baselineEligible: true, outcomeRole: editorialBySlug[product.slug].proposition.eyebrow },
  openLab: product.slug === "mk-2866"
    ? { recordId: record.labRecordId, reportId: record.reportId, status: record.availabilityState, experience: "compiled-product-dossier" }
    : { status: "unavailable", experience: "availability-panel" },
  discovery: { family: product.family, goals: product.goal, headline: editorialBySlug[product.slug].proposition.headline, mobileSummary: editorialBySlug[product.slug].proposition.mobileSummary },
  seo: {
    canonicalPath: `/product/${product.slug}`,
    title: `${product.name} ${product.strength} | Olympus Labs UK`,
    description: editorialBySlug[product.slug].editorial.summary,
    focusPhrases: [product.name, product.alias, ...product.goal],
  },
}));
const mkExperience = {
  record: { id: record.labRecordId, reportId: record.reportId, batchCode: record.batchCode, testedAt: record.sourceDrawer.testedAt, labName: record.sourceDrawer.labName, bindingState: record.bindingState, availabilityState: record.availabilityState, recordAction: record.compiledAction, sourceAction: record.sourceDrawer.reportUrl ? { label: "View original report", href: record.sourceDrawer.reportUrl } : null },
  analytes: record.analytes,
  visualizations: {
    purity: { title: "Reported purity", displayValue: record.reportPurityDisplayValue ?? analyte.purity.displayValue, comparator: analyte.purity.comparator, tableFallback: [{ label: "Reported purity", value: record.reportPurityDisplayValue ?? analyte.purity.displayValue }] },
    concentration: analyte.concentration ? { title: "Label-to-test comparison", testedValue: analyte.concentration.displayValue, labelClaim: analyte.concentration.labelClaimDisplayValue, testedPercent: Math.min(100, Math.round((analyte.concentration.value / Math.max(analyte.concentration.value, analyte.concentration.labelClaimValue)) * 100)), claimPercent: Math.min(100, Math.round((analyte.concentration.labelClaimValue / Math.max(analyte.concentration.value, analyte.concentration.labelClaimValue)) * 100)), tableFallback: [{ label: "Label claim", value: analyte.concentration.labelClaimDisplayValue }, { label: "Tested concentration", value: analyte.concentration.displayValue }] } : null,
    history: [{ reportId: record.reportId, batchCode: record.batchCode, testedAt: record.sourceDrawer.testedAt, purity: record.reportPurityDisplayValue ?? analyte.purity.displayValue, state: "current" }],
  },
  interactionContract: { selectableViews: ["record", "report history", "label comparison", "analytes", "source context"], keyboard: "arrow-key tabs and direct focus", reducedMotion: "no animated analytical reconstruction", mobile: "summary then progressive disclosure" },
};
const compiled = {
  schemaVersion: "oluk.product-experience.v2",
  productSourceHash: digest(productRaw),
  editorialCorpusHash: digest(editorialCorpusRaw),
  openLabSourceHash: digest(openLabRaw),
  products: catalogue,
  openLab: { "mk-2866": mkExperience },
};
const output = { ...compiled, contentHash: digest(JSON.stringify(compiled)) };
const rendered = `${JSON.stringify(output, null, 2)}\n`;
const openLabRendered = `${JSON.stringify({ schemaVersion: "oluk.openlab-product-depth.v1", sourceHash: digest(openLabRaw), ...mkExperience, contentHash: digest(JSON.stringify(mkExperience)) }, null, 2)}\n`;
if (process.argv.includes("--check")) {
  if (await readFile(outputPath, "utf8") !== rendered) throw new Error("Product experience output is stale; run npm run product:compile");
  if (await readFile(openLabOutputPath, "utf8") !== openLabRendered) throw new Error("OpenLab product depth output is stale; run npm run product:compile");
  process.stdout.write(`PASS Product experience ${digest(rendered)}\n`);
} else {
  await writeFile(outputPath, rendered);
  await writeFile(openLabOutputPath, openLabRendered);
  process.stdout.write(`WROTE Product experience ${digest(rendered)}\n`);
}
