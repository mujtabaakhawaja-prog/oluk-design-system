import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

import { loadBuiltWorker, renderHtml, visibleText } from "../scripts/proof/rendered-audit-utils.mjs";

const content = readFileSync(new URL("../app/design-system/frontier-content.ts", import.meta.url), "utf8");
const registry = JSON.parse(readFileSync(new URL("../../../authority/FRONTIER-SECTION-MOUNT-REGISTRY.json", import.meta.url), "utf8"));
const generatedContent = JSON.parse(readFileSync(new URL("../app/design-system/product-content.generated.json", import.meta.url), "utf8"));
const productAdapter = readFileSync(new URL("../app/design-system/product-content-adapter.ts", import.meta.url), "utf8");
const productPage = readFileSync(new URL("../app/product/[slug]/page.tsx", import.meta.url), "utf8");
const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

test("Wave 2 quarantines the legacy frontier catalogue behind the generated product-content projection", () => {
  assert.equal((content.match(/record\(\{slug:/g) ?? []).length, 16);
  assert.equal(generatedContent.schemaVersion, "oluk.product-content-projection.v1");
  assert.equal(generatedContent.products.length, 16);
  assert.equal(generatedContent.products.filter(({ customer }) => customer.readinessState === "CONTENT_READY").length, 1);

  const mk2866 = generatedContent.products.find(({ canonicalProductId }) => canonicalProductId === "mk-2866");
  const rad140 = generatedContent.products.find(({ canonicalProductId }) => canonicalProductId === "rad-140");
  assert.deepEqual(
    [mk2866.customer.content.facts.strength, mk2866.customer.content.facts.servings, mk2866.customer.content.facts.purity],
    ["15 MG", "90 SERVINGS", ">99%"],
  );
  assert.equal(mk2866.customer.commerce.price.value, null);
  assert.equal(mk2866.customer.commerce.inventory.value, null);
  assert.equal(rad140.customer.readinessState, "SOURCE_BOUND");
  assert.equal(rad140.customer.canonicalIdentity, undefined, "source-bound identity does not enter customer output before content readiness");

  assert.match(productAdapter, /product-content\.generated\.json/);
  assert.match(productPage, /getCustomerProductFixture/);
  assert.doesNotMatch(productPage, /frontier-content|product-experience-catalog/);
  assert.doesNotMatch(content.slice(content.indexOf("export function productJsonLd")), /offers|InStock|priceCurrency/);
});

test("the former product-experience compiler remains an explicitly isolated legacy command", () => {
  assert.equal(packageJson.scripts["product:compile"], "node scripts/compile-product-content.mjs");
  assert.equal(packageJson.scripts["product:check"], "node scripts/compile-product-content.mjs --check");
  assert.equal(packageJson.scripts["product:legacy:compile"], "node scripts/compile-product-experience.mjs");
  assert.equal(packageJson.scripts["product:legacy:check"], "node scripts/compile-product-experience.mjs --check");
  assert.doesNotMatch(productAdapter, /product-experience-catalog|PRODUCT-EDITORIAL-SOURCE-CORPUS|frontier-content/);
});

test("dynamic PDPs render MK-2866 source-ready copy and fail closed for every non-ready product", async () => {
  const worker = await loadBuiltWorker("frontier-product-propositions");

  const mkText = visibleText(await renderHtml(worker, "/product/mk-2866", 200));
  for (const value of ["MK-2866", "Ostarine", "15 MG", "90 SERVINGS", ">99%", "Source Reported", "Price unavailable"]) {
    assert.ok(mkText.includes(value), `mk-2866: ${value}`);
  }
  assert.doesNotMatch(mkText, /£43|\bIN STOCK\b|OPENLAB VERIFIED|Third-Party Tested/i);
  assert.doesNotMatch(mkText, /strength and lean mass|size and power|appetite, sleep and recovery/i);

  for (const { canonicalProductId, customer } of generatedContent.products) {
    if (customer.readinessState === "CONTENT_READY") continue;
    const html = await renderHtml(worker, `/product/${canonicalProductId}`, 200);
    const text = visibleText(html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "");
    assert.match(text, /Product information is not available yet\./, canonicalProductId);
    assert.match(text, /until its customer information is ready\./, canonicalProductId);
    assert.doesNotMatch(text, /£\d|\bIN STOCK\b|OPENLAB VERIFIED|Third-Party Tested/i, canonicalProductId);
    assert.doesNotMatch(text, /strength and lean mass|size and power|appetite, sleep and recovery/i, canonicalProductId);
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
  const heroSource = readFileSync(new URL("../app/design-system/locked-home-hero.tsx", import.meta.url), "utf8");
  const routeSource = readFileSync(new URL("../app/customer-routes.tsx", import.meta.url), "utf8");
  assert.match(heroSource, /LockedHomeHero\(\{ product: readyProduct \}/);
  assert.match(routeSource, /const heroProduct = getCustomerProductFixture\("mk-2866"\)/);
  assert.match(routeSource, /<LockedHomeHero product=\{heroProduct\}/);
  assert.doesNotMatch(heroSource, /lockedHomeHeroMedia|£43|£55|£49/);
  assert.doesNotMatch(readFileSync(new URL("PROMPTS.md", kitRoot), "utf8"), /RAD-140[^\n]{0,80}10 MG/);
});

test("the first Make run remains self-contained, unpublished historical evidence", () => {
  const kitRoot = new URL("../../../make-sessions/frontier-site-expansion/", import.meta.url);
  const runRoot = new URL("runs/01-canonical-your-stack/", kitRoot);
  const manifest = JSON.parse(readFileSync(new URL("BULK-RUN-MANIFEST.json", kitRoot), "utf8"));
  const productData = JSON.parse(readFileSync(new URL("product-data.json", runRoot), "utf8"));
  const prompt = readFileSync(new URL("PROMPT.md", runRoot), "utf8");
  const app = readFileSync(new URL("app.tsx", runRoot), "utf8");
  const correctionPrompt = readFileSync(new URL("CORRECTION-PROMPT.md", runRoot), "utf8");

  assert.equal(manifest.firstRun.id, "01");
  assert.equal(manifest.status, "HUMAN_REVIEW_REQUIRED_UNPUBLISHED");
  assert.equal(manifest.promotion, "SELECT_RELATIONSHIPS_THEN_REBUILD_IN_SITES");
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
  assert.match(correctionPrompt, /Use all caps only inside visibly bounded chips, pills, metric cells, or compact status atoms/i);
  assert.match(prompt, /never simply stack the full desktop section vertically/i);
  assert.doesNotMatch(prompt, /10 MG[^\n]*RAD-140|RAD-140[^\n]*10 MG/i);

  for (const product of productData.recommendations) {
    const asset = readFileSync(new URL(product.image, runRoot));
    assert.equal(createHash("sha256").update(asset).digest("hex"), product.imageSha256);
  }
  assert.match(app, /scroll-snap-type:x mandatory/);
  assert.doesNotMatch(app, /lorem ipsum|placeholder|this goes here/i);
  assert.doesNotMatch(productAdapter, /frontier-site-expansion|canonical-your-stack/);
});

test("the public stack-builder fails closed until product relationships have approved customer copy", async () => {
  const openLabFrontier = readFileSync(new URL("../app/design-system/openlab-frontier.tsx", import.meta.url), "utf8");
  const legacyBuilder = readFileSync(new URL("../app/design-system/your-stack-builder.tsx", import.meta.url), "utf8");
  assert.match(openLabFrontier, /"stack-builder": "DESIGN_INCOMPLETE"/);
  assert.match(openLabFrontier, /Stack building is not available yet\./);
  assert.match(openLabFrontier, /No customer-ready stack rationale is approved\./);
  assert.doesNotMatch(openLabFrontier, /<YourStackBuilder|product-experience-catalog|frontier-content/);
  assert.match(legacyBuilder, /evidence: product\.evidenceState === "verified-evidence" \? "available" : "unavailable"/);
  assert.doesNotMatch(legacyBuilder, /evidence: product\.evidenceState === "verified-evidence" \? "verified"/);

  const worker = await loadBuiltWorker("frontier-stack-unavailable");
  const html = await renderHtml(worker, "/open-lab/stack-builder", 200);
  const text = visibleText(html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "");
  assert.match(text, /Stack building is not available yet\./);
  assert.match(text, /No customer-ready stack rationale is approved\./);
  assert.doesNotMatch(text, /£\d|\bIN STOCK\b|OPENLAB VERIFIED|strength and lean mass|size and power|appetite, sleep and recovery/i);
});
