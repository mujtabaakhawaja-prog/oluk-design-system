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

test("all three PDP candidates reuse one governed product and continuation module suite", async () => {
  const source = await readFile(new URL("pdp-candidate-suite.tsx", designSystem), "utf8");

  for (const component of [
    "DecisionSurface",
    "EditorialSurface",
    "TechnicalSurface",
    "ProductMediaChamber",
    "PurchasePanel",
    "ProductCommerceCard",
    "AssuranceRail",
  ]) {
    assert.match(source, new RegExp(`\\b${component}\\b`));
  }
  for (const sharedSection of [
    "ProductStory",
    "OpenLabConfidence",
    "ProductComparison",
    "StackBundleEntry",
    "RelatedProducts",
    "QuestionsAndReviews",
    "AssuranceAndClosure",
  ]) {
    assert.match(source, new RegExp(`function ${sharedSection}\\b`));
  }
  assert.doesNotMatch(source, /StackOutcomeProfile|Evidence visibility|\bComplexity\b|Build a sharper/i);
  assert.doesNotMatch(source, /proof board|fixture|current main|component authority/i);
  assert.match(source, /Build a stronger stack/);
  assert.match(source, /data-stack-contract="product-count-level-pending"/);
});

test("PDP stress products preserve exact fact, media and evidence boundaries", async () => {
  const content = await readFile(new URL("frontier-content.ts", designSystem), "utf8");
  const presentation = await readFile(new URL("frontier-product-presentation.ts", designSystem), "utf8");
  const purchasePanel = await readFile(new URL("purchase-panel.tsx", designSystem), "utf8");
  const catalogue = JSON.parse(await readFile(new URL("product-experience-catalog.json", designSystem), "utf8"));
  const products = Object.fromEntries(catalogue.products.map((item) => [item.product.slug, item]));

  assert.deepEqual(
    [products["mk-2866"].product.strength, products["mk-2866"].product.servings, products["mk-2866"].product.purity, products["mk-2866"].product.price, products["mk-2866"].product.sku],
    ["15 MG", "90 SERVINGS", ">99%", "£43", "80529-01"],
  );
  assert.deepEqual(
    [products["rad-140"].product.strength, products["rad-140"].product.servings, products["rad-140"].product.price, products["rad-140"].openLab.status],
    ["8 MG", "60 SERVINGS", "£55", "unavailable"],
  );
  assert.deepEqual(
    [products["lgd-4033"].product.strength, products["lgd-4033"].product.servings, products["lgd-4033"].product.price, products["lgd-4033"].media[0].authority],
    ["5 MG", "", "£44", "governed-unpopulated-chamber"],
  );
  assert.match(content, /"rad-140"[^\n]+strength:"8 MG",servings:"60 SERVINGS"[^\n]+price:"£55"/);
  assert.match(content, /"lgd-4033"[^\n]+strength:"5 MG",servings:""[^\n]+price:"£44"/);
  assert.doesNotMatch(presentation, /export function frontierProductPresentation[\s\S]*?if \(product\.slug === "rad-140"\) return rad140Fixture/);
  assert.match(presentation, /presentationStatus: \{ inventory: "in-stock", evidence: "unavailable" \}/);
  assert.match(purchasePanel, /product\.servings\.trim\(\) \|\| "Not supplied"/);
  assert.match(purchasePanel, /product\.servings\.trim\(\) \|\| "Servings not supplied"/);
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
