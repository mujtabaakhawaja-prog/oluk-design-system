import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

import { loadBuiltWorker, renderHtml, visibleText } from "../scripts/proof/rendered-audit-utils.mjs";

const content = readFileSync(new URL("../app/design-system/frontier-content.ts", import.meta.url), "utf8");
const registry = JSON.parse(readFileSync(new URL("../../../authority/FRONTIER-SECTION-MOUNT-REGISTRY.json", import.meta.url), "utf8"));

test("frontier catalogue preserves fixed MK-2866 truth and RAD-140 8 MG correction", () => {
  assert.match(content, /slug:"mk-2866"[\s\S]*?strength:"15 MG"[\s\S]*?servings:"90 SERVINGS"[\s\S]*?purity:">99%"[\s\S]*?price:"£43"/);
  assert.match(content, /slug:"rad-140"[\s\S]*?strength:"8 MG"/);
  assert.doesNotMatch(content, /RAD-140[\s\S]{0,280}10 MG/);
  assert.equal((content.match(/record\(\{slug:/g) ?? []).length, 15);
  assert.doesNotMatch(content, /slug:"bpc-157"/);
  for (const canonicalProductId of ["endurashred", "halo", "mass-gh"]) assert.match(content, new RegExp(`slug:"${canonicalProductId}"`));
});

test("frontier product records use outcome-led copy and match the approved Your Stack product facts", () => {
  const stackBuilder = readFileSync(new URL("../app/design-system/your-stack-builder.tsx", import.meta.url), "utf8");
  const kitRoot = new URL("../../../make-sessions/frontier-site-expansion/", import.meta.url);
  const stackData = JSON.parse(readFileSync(new URL("runs/01-canonical-your-stack/product-data.json", kitRoot), "utf8"));

  for (const product of stackData.recommendations) {
    assert.match(content, new RegExp(`slug:"${product.id}"[\\s\\S]*?strength:"${product.strength}"[\\s\\S]*?servings:"${product.servings}"[\\s\\S]*?price:"${product.price}"`));
    assert.match(stackBuilder, new RegExp(`targetProduct: "${product.id}"`));
  }

  const productRecords = content.slice(content.indexOf("export const frontierProducts"), content.indexOf("export const productBySlug"));
  assert.doesNotMatch(productRecords, /(?:research route|collection route|related collection|product decision|comparison presentation)/i);
  assert.match(productRecords, /strength and lean mass/i);
  assert.match(productRecords, /size and power/i);
  assert.match(productRecords, /appetite, sleep and recovery/i);
});

test("every catalogue PDP renders its own customer proposition without implementation vocabulary", async () => {
  const products = [
    ["mk-2866", "MK-2866", "15 MG", "90 SERVINGS", "£43"],
    ["rad-140", "RAD-140", "8 MG", "60 SERVINGS", "£55"],
    ["lgd-4033", "LGD-4033", "5 MG", "", "£44"],
    ["mk-677", "MK-677", "15 MG", "90 SERVINGS", "£45"],
    ["gw-501516", "GW-50156", "10 MG", "60 SERVINGS", "£42"],
    ["s-4", "S-4", "25 MG", "60 SERVINGS", "£40"],
    ["yk-11", "YK-11", "10 MG", "60 SERVINGS", "£47"],
    ["s-23", "S-23", "10 MG", "60 SERVINGS", "£47"],
    ["epistane", "Epistane", "20 MG", "60 SERVINGS", "£44"],
    ["ment", "MENT", "20 MG", "30 SERVINGS", "£49"],
    ["m-sten", "M-STEN", "10 MG", "60 SERVINGS", "£48"],
    ["trenavar", "Trenavar", "30 MG", "60 SERVINGS", "£48"],
    ["endurashred", "ENDURASHRED", "16.5 MG", "90 SERVINGS", ""],
    ["halo", "HALO", "", "", ""],
    ["mass-gh", "MASS GH", "", "", ""],
  ];
  const worker = await loadBuiltWorker("frontier-product-propositions");
  for (const [slug, name, strength, servings, price] of products) {
    const text = visibleText(await renderHtml(worker, `/product/${slug}`, 200));
    for (const value of [name, strength, servings, price]) assert.ok(text.includes(value), `${slug}: ${value}`);
    assert.doesNotMatch(text, /\b(?:route|module|workspace|fixture|proof|presentation|component)\b/i, slug);
  }
});

test("frontier section registry covers all 75 creative actions with explicit mobile strategies", () => {
  assert.deepEqual(registry.creativeActionCoverage.documentationSourced, Array.from({length:50},(_,index)=>index+1));
  assert.deepEqual(registry.creativeActionCoverage.figmaSourced, Array.from({length:25},(_,index)=>index+51));
  assert.ok(registry.sections.every((section) => section.mobileStrategy && section.mounts.length));
  assert.deepEqual(registry.mobileContract.reviewWidths, [1440,390]);
});

test("frontier binds supplied product renders and ships bounded Make/agentic handoff kits", () => {
  assert.match(content, /"mk-2866": \{ src: "\/assets\/products\/mk-2866\/front\.png", width: 1365, height: 2048 \}/);
  assert.match(content, /"rad-140": \{ src: "\/assets\/products\/rad-140\/front\.png", width: 1024, height: 1536 \}/);
  assert.match(content, /"mk-677": \{ src: "\/assets\/products\/hero\/mk-677\/front\.webp", width: 1024, height: 1536 \}/);
  assert.match(content, /"ment": \{ src: "\/assets\/products\/hero\/ment\/front\.webp", width: 1024, height: 1536 \}/);
  assert.match(content, /"gw-501516": \{ src: "\/assets\/products\/shop\/gw-501516\.jpeg", width: 300, height: 450 \}/);
  assert.match(content, /"epistane": \{ src: "\/assets\/products\/shop\/epistane\.webp", width: 300, height: 450 \}/);
  assert.match(content, /"m-sten": \{ src: "\/assets\/products\/shop\/m-sten\.webp", width: 300, height: 450 \}/);
  const kitRoot = new URL("../../../make-sessions/frontier-site-expansion/", import.meta.url);
  for (const file of ["README.md", "assets.json", "app.tsx", "PROMPTS.md", "AGENTIC_PROMPTS.md", "BULK-RUN-MANIFEST.json"]) {
    assert.ok(readFileSync(new URL(file, kitRoot), "utf8").length > 200, file);
  }
  const assetManifest = JSON.parse(readFileSync(new URL("assets.json", kitRoot), "utf8"));
  const radAsset = readFileSync(new URL("../public/assets/products/rad-140/front.png", import.meta.url));
  const radMaster = readFileSync(new URL("../../../make-sessions/frontier-site-expansion/assets/rad-140-master.png", import.meta.url));
  const radManifest = assetManifest.productRenders.find((asset) => asset.product === "RAD-140");
  assert.equal(radManifest.width, 2048);
  assert.equal(radManifest.height, 3072);
  assert.equal(radManifest.deliveryWidth, 1024);
  assert.equal(radManifest.deliveryHeight, 1536);
  assert.equal(createHash("sha256").update(radMaster).digest("hex"), radManifest.sha256);
  assert.equal(createHash("sha256").update(radAsset).digest("hex"), radManifest.deliverySha256);
  for (const source of [
    readFileSync(new URL("../app/design-system/product-fixtures.ts", import.meta.url), "utf8"),
    readFileSync(new URL("../app/design-system/shop-taxonomy.ts", import.meta.url), "utf8"),
    readFileSync(new URL("../app/design-system/locked-home-hero-media.ts", import.meta.url), "utf8"),
  ]) assert.match(source, /\/assets\/products\/rad-140\/front\.png/);
  assert.match(readFileSync(new URL("../app/design-system/homepage-design-candidate.ts", import.meta.url), "utf8"), /lockedHomeHeroMedia\["rad-140"\]/);
  assert.doesNotMatch(readFileSync(new URL("../app/design-system/locked-home-hero.tsx", import.meta.url), "utf8"), /lockedHomeHeroMedia/);
  assert.doesNotMatch(readFileSync(new URL("PROMPTS.md", kitRoot), "utf8"), /RAD-140[^\n]{0,80}10 MG/);
});

test("first Make run is a self-contained canonical Your Stack frontier", () => {
  const kitRoot = new URL("../../../make-sessions/frontier-site-expansion/", import.meta.url);
  const runRoot = new URL("runs/01-canonical-your-stack/", kitRoot);
  const manifest = JSON.parse(readFileSync(new URL("BULK-RUN-MANIFEST.json", kitRoot), "utf8"));
  const productData = JSON.parse(readFileSync(new URL("product-data.json", runRoot), "utf8"));
  const prompt = readFileSync(new URL("PROMPT.md", runRoot), "utf8");
  const app = readFileSync(new URL("app.tsx", runRoot), "utf8");
  const correctionPrompt = readFileSync(new URL("CORRECTION-PROMPT.md", runRoot), "utf8");

  assert.equal(manifest.firstRun.id, "01");
  assert.equal(manifest.firstRun.directions, 3);
  assert.deepEqual(manifest.firstRun.widths, [1440, 390]);
  assert.equal(manifest.firstRun.attachments.length, 5);
  assert.equal(manifest.firstRun.variantContract.desktopDefault.nodeId, "743:50");
  assert.equal(manifest.firstRun.variantContract.desktopPromoted.nodeId, "743:281");
  assert.equal(manifest.firstRun.variantContract.desktopPromoted.maximumPerDirection, 1);
  assert.equal(manifest.firstRun.variantContract.mobileDefault.nodeId, "742:50");
  assert.equal(manifest.firstRun.variantContract.horizontalMicroContextOnly.nodeId, "743:520");
  assert.equal(manifest.firstRun.variantContract.localAnatomyComposition, "REJECTED");
  for (const attachment of manifest.firstRun.attachments) assert.ok(readFileSync(new URL(attachment, kitRoot)).length > 100, attachment);
  for (const controlFile of [manifest.firstRun.manifest, manifest.firstRun.prompt, manifest.firstRun.instructions, manifest.firstRun.runbook]) {
    assert.ok(readFileSync(new URL(controlFile, kitRoot), "utf8").length > 200, controlFile);
  }
  assert.match(readFileSync(new URL(manifest.firstRun.manifest, kitRoot), "utf8"), /not MF-01 ProductCommerceCard/i);
  for (const proof of manifest.firstRun.referenceProofs) {
    const image = readFileSync(new URL(proof.path, kitRoot));
    assert.equal(createHash("sha256").update(image).digest("hex"), proof.sha256);
  }

  assert.match(prompt, /INHERITED_CHAMPION_STATE/);
  assert.match(prompt, /THIS_RUN_DELTA/);
  assert.match(prompt, /DO_NOT_INHERIT/);
  assert.match(prompt, /Direction 1 — Editorial Stack Rail/);
  assert.match(prompt, /Direction 2 — Guided Decision Ladder/);
  assert.match(prompt, /Direction 3 — Product Stage Continuation/);
  assert.match(prompt, /Vertical `743:50` as the default desktop recommendation card/);
  assert.match(prompt, /Compact `742:50` and show one decision at a time/);
  assert.match(prompt, /Relation `743:520` only for a truly horizontal related-product micro-context/);
  assert.match(prompt, /customer module only/i);
  assert.match(prompt, /quantified serving value/i);
  assert.match(correctionPrompt, /1200:34256/);
  assert.match(correctionPrompt, /three separate instances of the two-level QualitativeChip relationship from `733:17342`/);
  assert.match(correctionPrompt, /ProductMetricRail must follow canonical `733:95`/);
  assert.equal(productData.heading, "Build more from your MK-2866 stack.");
  assert.match(productData.introduction, /strength and lean mass[\s\S]*size and power[\s\S]*growth, appetite, sleep and recovery/i);
  assert.doesNotMatch(productData.heading, /research route/i);
  assert.doesNotMatch(productData.introduction, /testing language|direct route|complements|makes sense|product path|direction|continuation/i);
  assert.match(correctionPrompt, /Use all caps only inside visibly bounded chips, pills, metric cells, or compact status atoms/i);
  assert.match(prompt, /never simply stack the full desktop section vertically/i);
  assert.doesNotMatch(prompt, /10 MG[^\n]*RAD-140|RAD-140[^\n]*10 MG/i);

  assert.deepEqual(productData.recommendations.map(({name, strength, servings}) => [name, strength, servings]), [
    ["RAD-140", "8 MG", "60 SERVINGS"],
    ["MENT", "20 MG", "30 SERVINGS"],
    ["MK-677", "15 MG", "90 SERVINGS"],
  ]);
  assert.equal(productData.recommendations.find(({id}) => id === "ment").family, "Metabolics");
  for (const product of productData.recommendations) {
    assert.ok(product.primaryBenefit.length > 5);
    assert.ok(product.stackPosition.length > 5);
    assert.ok(product.rationale.length > 90);
    const asset = readFileSync(new URL(product.image, runRoot));
    assert.equal(createHash("sha256").update(asset).digest("hex"), product.imageSha256);
  }
  assert.match(app, /scroll-snap-type:x mandatory/);
  assert.match(app, /Added ✓/);
  assert.match(app, /ContextChip label="PRODUCT" value=\{data\.anchorProduct\.alias\}/);
  assert.match(app, /product\.primaryBenefit/);
  assert.match(app, /product\.stackPosition/);
  assert.match(app, /product\.servings\.replace\(\/\\s\+SERVINGS\$\/i, ""\)/);
  assert.doesNotMatch(app, /product\.inventory|product\.evidence|stackRole|stackFit|research route|testing language|direct route to product detail|Choose what complements|performance direction/i);
  assert.doesNotMatch(app, /lorem ipsum|placeholder|this goes here/i);
});

test("Your Stack wraps the canonical commerce card with governed commercial decision content", () => {
  const stackBuilder = readFileSync(new URL("../app/design-system/your-stack-builder.tsx", import.meta.url), "utf8");
  assert.match(stackBuilder, /export function StackOutcomeCard/);
  assert.match(stackBuilder, /<ProductCommerceCard[\s\S]*commerceTreatment="selection"/);
  assert.match(stackBuilder, /<DecisionSurface/);
  assert.match(stackBuilder, /<TechnicalSurface/);
  assert.doesNotMatch(stackBuilder, /<ProductMediaChamber|<MetricRail/);
  assert.match(stackBuilder, /PRODUCT ROLE/);
  assert.match(stackBuilder, /WHAT IT ADDS/);
  assert.match(stackBuilder, /const stackRelationships/);
  assert.match(stackBuilder, /function baselineFor[\s\S]*getFrontierProduct\(slug\)/);
  assert.match(stackBuilder, /Build a stronger \$\{baseline\.alias\} cutting stack[\s\S]*Build a stronger size-and-power stack from \$\{baseline\.alias\}[\s\S]*Build a stronger recomp stack from \$\{baseline\.alias\}/i);
  assert.match(stackBuilder, /baseline\.name.*selectedProducts|selectedProducts.*baseline\.name/i);
  assert.match(stackBuilder, /FOUNDATION[\s\S]*STRONGER[\s\S]*MAXIMUM/);
  assert.match(stackBuilder, /host === "bag" \|\| host === "confirmation"/);
  assert.match(stackBuilder, /host === "account"/);
  assert.match(stackBuilder, /function StackSummary/);
  assert.doesNotMatch(stackBuilder, /function StackCard/);
});

test("Your Stack uses deterministic commercial levels, contributions and separate OpenLab confidence", () => {
  const source = readFileSync(new URL("../app/design-system/your-stack-builder.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../app/design-system/your-stack-builder.module.css", import.meta.url), "utf8");
  for (const level of ["FOUNDATION", "STRONGER", "MAXIMUM"]) assert.match(source, new RegExp(level));
  for (const contribution of ["STRENGTH", "LEAN MASS", "BODY COMPOSITION", "RECOVERY", "APPETITE [+] SLEEP", "TRAINING OUTPUT"]) assert.match(source, new RegExp(contribution));
  assert.match(source, /data-component="StackOpenLabConfidence"/);
  assert.match(source, /confidenceSelection\(baseline, selectedProducts\)/);
  assert.match(source, /Confirm or change your baseline/);
  assert.match(source, /host === "standalone" \? selectBaseline : undefined/);
  assert.match(source, /EvidenceStatusChip/);
  assert.match(source, /stackTotal/);
  assert.doesNotMatch(css, /font-size:\s*11px/);
  assert.doesNotMatch(source, /goalFit|evidenceVisibility|StackOutcomeProfile|out of 100|sharper/i);
});
