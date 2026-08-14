import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const content = readFileSync(new URL("../app/design-system/frontier-content.ts", import.meta.url), "utf8");
const registry = JSON.parse(readFileSync(new URL("../../../authority/FRONTIER-SECTION-MOUNT-REGISTRY.json", import.meta.url), "utf8"));

test("frontier catalogue preserves fixed MK-2866 truth and RAD-140 8 MG correction", () => {
  assert.match(content, /slug:"mk-2866"[\s\S]*?strength:"15 MG"[\s\S]*?servings:"90 SERVINGS"[\s\S]*?purity:">99%"[\s\S]*?price:"£43"/);
  assert.match(content, /slug:"rad-140"[\s\S]*?strength:"8 MG"/);
  assert.doesNotMatch(content, /RAD-140[\s\S]{0,280}10 MG/);
  assert.equal((content.match(/record\(\{slug:/g) ?? []).length, 16);
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
    readFileSync(new URL("../app/design-system/locked-home-hero.tsx", import.meta.url), "utf8"),
    readFileSync(new URL("../app/design-system/shop-taxonomy.ts", import.meta.url), "utf8"),
  ]) assert.match(source, /\/assets\/products\/rad-140\/front\.png/);
  assert.doesNotMatch(readFileSync(new URL("PROMPTS.md", kitRoot), "utf8"), /RAD-140[^\n]{0,80}10 MG/);
});

test("first Make run is a self-contained canonical Your Stack frontier", () => {
  const kitRoot = new URL("../../../make-sessions/frontier-site-expansion/", import.meta.url);
  const runRoot = new URL("runs/01-canonical-your-stack/", kitRoot);
  const manifest = JSON.parse(readFileSync(new URL("BULK-RUN-MANIFEST.json", kitRoot), "utf8"));
  const productData = JSON.parse(readFileSync(new URL("product-data.json", runRoot), "utf8"));
  const prompt = readFileSync(new URL("PROMPT.md", runRoot), "utf8");
  const app = readFileSync(new URL("app.tsx", runRoot), "utf8");

  assert.equal(manifest.firstRun.id, "01");
  assert.equal(manifest.firstRun.directions, 3);
  assert.deepEqual(manifest.firstRun.widths, [1440, 390]);
  assert.equal(manifest.firstRun.attachments.length, 5);
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
  assert.match(prompt, /never simply stack the full desktop section vertically/i);
  assert.doesNotMatch(prompt, /10 MG[^\n]*RAD-140|RAD-140[^\n]*10 MG/i);

  assert.deepEqual(productData.recommendations.map(({name, strength, servings}) => [name, strength, servings]), [
    ["RAD-140", "8 MG", "60 SERVINGS"],
    ["MENT", "20 MG", "30 SERVINGS"],
    ["MK-677", "15 MG", "90 SERVINGS"],
  ]);
  assert.equal(productData.recommendations.find(({id}) => id === "ment").family, "Metabolics");
  for (const product of productData.recommendations) {
    const asset = readFileSync(new URL(product.image, runRoot));
    assert.equal(createHash("sha256").update(asset).digest("hex"), product.imageSha256);
  }
  assert.match(app, /scroll-snap-type:x mandatory/);
  assert.match(app, /Added ✓/);
  assert.doesNotMatch(app, /lorem ipsum|placeholder|this goes here/i);
});
