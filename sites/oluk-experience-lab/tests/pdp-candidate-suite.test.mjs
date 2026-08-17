import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { auditRenderedCopySurfaces } from "../scripts/proof/customer-surface-grammar.mjs";
import { loadBuiltWorker, renderHtml } from "../scripts/proof/rendered-audit-utils.mjs";

const designSystem = new URL("../app/design-system/", import.meta.url);
const app = new URL("../app/", import.meta.url);

test("the PDP option catalogue contains three complete unselected architectures", async () => {
  const manifest = await readFile(new URL("pdp-candidate-manifest.ts", designSystem), "utf8");

  for (const candidate of ["product-theatre", "guided-decision", "confidence-workspace"]) {
    assert.match(manifest, new RegExp(`id: "${candidate}"`));
  }
  assert.equal((manifest.match(/ {4}status: "CANDIDATE_READY"/g) ?? []).length, 3);
  assert.equal((manifest.match(/ {4}ownerSelected: false,/g) ?? []).length, 3);
  assert.equal((manifest.match(/ {4}recommendationStatus: "UNRANKED",/g) ?? []).length, 3);
  assert.doesNotMatch(manifest, /RECOMMENDED_AFTER_REVIEW|ownerSelected: true/);
  assert.match(manifest, /5-column product chamber \/ 7-column proposition and purchase field/);
  assert.match(manifest, /8-column decision spine \/ 4-column persistent purchase context/);
  assert.match(manifest, /3-column product context \/ 6-column decision field \/ 3-column OpenLab confidence rail/);
});

test("all three PDP candidates preserve the governed decision and content-surface suite", async () => {
  const source = await readFile(new URL("pdp-candidate-suite.tsx", designSystem), "utf8");

  for (const component of [
    "DecisionSurface",
    "EditorialSurface",
    "TechnicalSurface",
    "ProductMediaChamber",
    "PurchasePanel",
    "ProductCommerceCard",
  ]) {
    assert.match(source, new RegExp(`\\b${component}\\b`));
  }
  for (const sharedSection of [
    "ProductStory",
    "OpenLabConfidence",
    "QuestionsAndReviews",
  ]) {
    assert.match(source, new RegExp(`function ${sharedSection}\\b`));
  }
  assert.match(source, /<OpenLabConfidence expanded includeSummary=\{false\}/);
  assert.match(source, /<EvidenceStatusChip state=\{available \? "source-reported" : "unavailable"\}/);
  assert.doesNotMatch(source, /proof board|fixture|current main|component authority/i);
  assert.equal((source.match(/prefetch=\{false\}/g) ?? []).length, 2);
  assert.doesNotMatch(source, /product-count-level-pending/);
});

test("the product content projection keeps source facts separate from customer readiness and commerce state", async () => {
  const registry = JSON.parse(await readFile(new URL("../../../authority/PRODUCT-CONTENT-REGISTRY.json", import.meta.url), "utf8"));
  const generated = JSON.parse(await readFile(new URL("product-content.generated.json", designSystem), "utf8"));
  const adapter = await readFile(new URL("product-content-adapter.ts", designSystem), "utf8");
  const status = await readFile(new URL("product-status.tsx", designSystem), "utf8");
  const products = Object.fromEntries(registry.products.map((item) => [item.canonicalProductId, item]));

  assert.equal(registry.products.length, 16);
  assert.equal(products["mk-2866"].readinessState, "CONTENT_READY");
  assert.equal(products["rad-140"].readinessState, "SOURCE_BOUND");
  assert.equal(products["lgd-4033"].readinessState, "EDITORIAL_CHOICE");
  assert.deepEqual(
    [products["rad-140"].content.facts.strength.value, products["rad-140"].content.facts.servings.value],
    ["8 MG", "60 SERVINGS"],
  );
  assert.equal(products["lgd-4033"].content.facts.strength.value, null);
  assert.equal(products["lgd-4033"].media.render.value, null);

  for (const product of Object.values(products)) {
    for (const resolver of Object.values(product.commerce)) {
      assert.equal(resolver.owner, "WOO_C2");
      assert.equal(resolver.value, null);
    }
  }

  const projected = Object.fromEntries(generated.products.map((item) => [item.canonicalProductId, item.customer]));
  assert.ok(projected["mk-2866"].content.descriptions.long.length > 280);
  assert.equal(projected["mk-2866"].content.faqs.length, 3);
  assert.equal(projected["rad-140"].canonicalIdentity, undefined, "source-bound identity is not emitted as customer-ready copy");
  assert.equal(projected["lgd-4033"].canonicalIdentity, undefined, "editorial-choice identity is not emitted as customer-ready copy");
  assert.match(adapter, /price: ""/);
  assert.match(adapter, /inventory: "unavailable"/);
  assert.match(status, /state = "unavailable"/);
  assert.match(status, /verified: "SOURCE REPORTED"/);
});

test("owner review exposes live 1440 and 390 previews without a selection control", async () => {
  const review = await readFile(new URL("review-studio/pdp-candidates/pdp-candidate-review.tsx", app), "utf8");
  const route = await readFile(new URL("review-studio/pdp-candidates/[candidate]/[slug]/page.tsx", app), "utf8");

  assert.match(review, /useState<1440 \| 390>\(1440\)/);
  assert.match(review, /Nothing on this page selects, ranks, publishes or promotes an option/);
  assert.match(review, /Pending complete candidate review/);
  assert.doesNotMatch(review, /Approve candidate|Select candidate|OWNER_SELECTED/);
  assert.match(route, /PDP_STRESS_PRODUCT_SLUGS/);
  assert.match(route, /PDP_CANDIDATE_IDS/);
  assert.match(route, /PdpCandidateSuite/);
});

test("PDP candidate styles declare material desktop grids and deliberate mobile reordering", async () => {
  const css = await readFile(new URL("pdp-candidate-suite.module.css", designSystem), "utf8");

  assert.match(css, /grid-template-columns: minmax\(0, 5fr\) minmax\(0, 7fr\)/);
  assert.match(css, /grid-template-columns: minmax\(0, 8fr\) minmax\(320px, 4fr\)/);
  assert.match(css, /grid-template-columns: minmax\(220px, 3fr\) minmax\(0, 6fr\) minmax\(260px, 3fr\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /\.purchaseRail \{[\s\S]*?position: sticky/);
  assert.match(css, /\.workspaceContext \{\s*order: -4/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i);
});

test("all nine live PDP candidates keep headings and paragraphs inside governed surfaces", async () => {
  const worker = await loadBuiltWorker("pdp-candidate-suite");
  for (const candidate of ["product-theatre", "guided-decision", "confidence-workspace"]) {
    for (const product of ["mk-2866", "rad-140", "lgd-4033"]) {
      const html = await renderHtml(worker, `/review-studio/pdp-candidates/${candidate}/${product}`, 200);
      const groups = auditRenderedCopySurfaces(html);
      const loose = groups.filter(({ status }) => status === "LOOSE_CANVAS_COPY");
      assert.equal(loose.length, 0, `${candidate}/${product}: ${JSON.stringify(loose.slice(0, 4))}`);
      assert.ok(groups.length > 30, `${candidate}/${product} renders the complete downstream PDP suite`);
      assert.doesNotMatch(html, /\bsharper\b|current presentation/i);
    }
  }
});
