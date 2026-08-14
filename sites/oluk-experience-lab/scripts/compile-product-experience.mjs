#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const productSourcePath = path.join(siteRoot, "app/design-system/frontier-content.ts");
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
const catalogue = products.map((product) => ({
  product,
  editorial: { summary: product.summary, researchProfile: product.researchProfile, guidance: product.guidance, considerations: product.considerations },
  media: media[product.slug] ? [{ role: "front", src: media[product.slug], authority: "registered-actual-render" }] : [{ role: "front", src: null, authority: "governed-unpopulated-chamber" }],
  pdp: { sections: ["decision", "details", "evidence", "stack", "related"], related: product.related },
  stacks: { goals: product.goal, additions: product.stack },
  openLab: product.slug === "mk-2866" ? { recordId: record.labRecordId, reportId: record.reportId, status: record.availabilityState } : { status: "unavailable" },
  discovery: { family: product.family, goals: product.goal },
  seo: { canonicalPath: `/product/${product.slug}`, title: `${product.name} ${product.strength} | Olympus Labs UK`, description: product.summary },
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
const compiled = { schemaVersion: "oluk.product-experience.v1", productSourceHash: digest(productRaw), openLabSourceHash: digest(openLabRaw), products: catalogue, openLab: { "mk-2866": mkExperience } };
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
