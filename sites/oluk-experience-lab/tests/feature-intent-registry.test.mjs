import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const readJson = async (file) => JSON.parse(await readFile(path.join(repoRoot, file), "utf8"));

test("feature inventory is exhaustive, attributed and contract-bound", async () => {
  const registry = await readJson("authority/FEATURE-INTENT-REGISTRY.json");
  assert.equal(registry.authorityDirection, "CODEX_SITES_IS_COMPOSITION_AUTHORITY");
  assert.equal(registry.historicalSitesRouteLedger.routeCount, 73);
  assert.equal(registry.historicalSitesRouteLedger.mutation, "NONE");
  assert.equal(registry.historicalSitesRouteLedger.authority, "HISTORICAL_PRESENTATION_PROVENANCE_ONLY");
  assert.equal(registry.nativeNextRouteAuthority.routeCount, 74);
  assert.deepEqual(registry.routeCountLaw.admittedDelta, ["/bundle-builder"]);
  assert.equal(registry.routeCountLaw.canonicalNativeNextRouteDefinitions, 74);
  assert.ok(registry.stats.total >= 80);
  assert.match(registry.contentHash, /^[a-f0-9]{64}$/);
  assert.equal(registry.features.length, registry.stats.total);
  assert.equal(new Set(registry.features.map(({ id }) => id)).size, registry.features.length);
  for (const feature of registry.features) {
    assert.ok(feature.customerJob);
    assert.ok(feature.commercialJob);
    assert.ok(feature.relationshipAndStateIntent.length > 0);
    assert.ok(feature.contentRequirements.length > 0);
    assert.ok(feature.runtimeDependencies.length > 0);
    assert.ok(feature.canonicalOlukDependencies.length > 0);
    assert.ok(feature.provenanceRequirements.data.length > 0);
    assert.ok(feature.provenanceRequirements.media.length > 0);
    assert.ok(feature.sourceAttribution.length > 0);
    for (const source of feature.sourceAttribution) {
      assert.equal(source.authority === "INTENT_ONLY" || source.authority === "CONTENT_INPUT_REQUIRES_COMPILER_ATTRIBUTION" || source.authority === "COMPOSITION_AUTHORITY", true);
      assert.ok(source.sourceClass);
    }
  }
});

test("the feature registry covers the required commerce, confidence and lifecycle suites", async () => {
  const registry = await readJson("authority/FEATURE-INTENT-REGISTRY.json");
  const ids = new Set(registry.features.map(({ id }) => id));
  const required = [
    "pdp-decision-fold",
    "product-comparison-workspace",
    "outcome-stack-builder",
    "bundle-builder",
    "comparison-drawer",
    "openlab-portal",
    "openlab-product-dossier",
    "openlab-report-viewer",
    "openlab-purity-concentration",
    "bag-review",
    "checkout-review",
    "payment-handoff",
    "checkout-processing-recovery",
    "checkout-confirmation",
    "return-refund",
    "account-dashboard",
    "quick-reorder",
    "subscriptions",
    "loyalty",
    "referrals-ambassador",
    "faq-help-centre",
    "evidence-os-story",
    "shop-mega-menu",
    "openlab-mega-menu",
  ];
  for (const id of required) assert.equal(ids.has(id), true, `missing required feature ${id}`);
});

test("the historical 73-row Sites ledger plus Bundle Builder resolves to the canonical 74-route authority", async () => {
  const [ledger, candidates] = await Promise.all([
    readJson("authority/SITE-ROUTE-LEDGER.json"),
    readJson("authority/CANDIDATE-STANDALONE-ROUTE-REGISTRY.json"),
  ]);
  const canonicalPaths = new Set(ledger.routes.map(({ path: routePath }) => routePath));
  const expected = [
    "/recommendations",
    "/quick-reorder",
    "/wishlist",
    "/subscriptions",
    "/loyalty",
    "/referrals",
    "/account/research-profile",
    "/journal",
    "/expert-qa",
    "/service-status",
    "/accessibility",
    "/careers",
    "/press",
    "/podcast",
    "/video",
    "/community",
    "/api",
    "/ar-viewer",
  ];
  assert.equal(candidates.historicalSitesRouteLedger.routeCount, 73);
  assert.equal(candidates.nativeNextRouteAuthority.routeCount, 74);
  assert.deepEqual(candidates.routeCountLaw.admittedDelta, ["/bundle-builder"]);
  assert.equal(candidates.candidateCount, expected.length);
  assert.deepEqual(new Set(candidates.routes.map(({ path: routePath }) => routePath)), new Set(expected));
  for (const route of candidates.routes) {
    assert.equal(route.canonicalRouteMembership, false);
    assert.equal(route.publicNavigationState, "NOT_PROMOTED");
    assert.equal(canonicalPaths.has(route.path), false);
    assert.ok(route.featureIds.length > 0);
  }
  assert.equal(candidates.promotedCanonicalRoutes.length, 1);
  assert.equal(candidates.promotedCanonicalRoutes[0].path, "/bundle-builder");
  assert.equal(candidates.promotedCanonicalRoutes[0].canonicalRouteMembership, true);
  assert.equal(candidates.promotedCanonicalRoutes[0].publicNavigationState, "ROUTE_ADMITTED_PRESENTATION_NOT_PROMOTED");
});
