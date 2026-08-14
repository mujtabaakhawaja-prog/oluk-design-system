import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const readJson = async (file) => JSON.parse(await readFile(path.join(repoRoot, file), "utf8"));

test("the Sites template catalogue gives every ledger route three unselected customer-composition architectures", async () => {
  const [ledger, catalogue] = await Promise.all([
    readJson("authority/SITE-ROUTE-LEDGER.json"),
    readJson("authority/SITE-TEMPLATE-COMPOSITION-CATALOGUE.json"),
  ]);
  assert.equal(catalogue.ledgerSource.routeCount, 73);
  assert.equal(catalogue.routes.length, ledger.routes.length);
  assert.deepEqual(new Set(catalogue.routes.map(({ routeId }) => routeId)), new Set(ledger.routes.map(({ id }) => id)));
  for (const route of catalogue.routes) {
    assert.equal(route.candidateCompositions.length, 3);
    assert.equal(new Set(route.candidateCompositions.map(({ id }) => id)).size, 3);
    assert.equal(route.ownerSelection, "PENDING_COMPLETE_CANDIDATE_REVIEW");
    for (const candidate of route.candidateCompositions) {
      assert.equal(candidate.ownerSelected, false);
      assert.equal(candidate.recommendationStatus, "UNRANKED");
      assert.equal(candidate.state, "ARCHITECTURE_DEFINED");
      assert.ok(candidate.desktopGrid);
      assert.ok(candidate.mobileStrategy);
      assert.ok(candidate.commercialThesis);
      assert.ok(candidate.differentiator);
      assert.equal(candidate.tradeoffs.length, 2);
      assert.deepEqual(candidate.sectionOrder, route.plannedSectionOrder.map(({ id }) => id));
    }
    assert.ok(route.plannedSectionOrder.length > 0);
    for (const section of route.plannedSectionOrder) {
      assert.ok(section.id);
      assert.ok(section.customerPurpose);
      assert.ok(section.mobileStrategy);
      assert.ok(Array.isArray(section.dataRequirements) && section.dataRequirements.length > 0);
      assert.ok(section.mediaPolicy);
    }
  }
});

test("the promotion matrix consumes unselected Sites template architectures without upgrading visual maturity", async () => {
  const matrix = await readJson("authority/ROUTE-PROMOTION-MATRIX.json");
  assert.equal(matrix.schemaVersion, "oluk.route-promotion.v3");
  assert.equal(matrix.templateCompositionSource, "authority/SITE-TEMPLATE-COMPOSITION-CATALOGUE.json");
  for (const route of matrix.routeDispositions) {
    assert.ok(route.templateComposition);
    assert.equal(route.templateComposition.candidateCompositions.length, 3);
    assert.equal(route.templateComposition.ownerSelection, "PENDING_COMPLETE_CANDIDATE_REVIEW");
    assert.ok(Array.isArray(route.templateComposition.plannedSectionOrder));
    assert.ok(Array.isArray(route.templateComposition.currentSectionOrder));
    if (route.designMaturity === "DESIGN_INCOMPLETE") assert.equal(route.promotedPlacements.length, 0);
  }
});
