import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { auditRenderedCopySurfaces } from "../scripts/proof/customer-surface-grammar.mjs";
import { loadBuiltWorker, renderHtml, visibleText } from "../scripts/proof/rendered-audit-utils.mjs";

const candidateRoot = new URL("../app/review-studio/account-retention-candidates/", import.meta.url);
const app = new URL("../app/", import.meta.url);
const authority = new URL("../../../authority/", import.meta.url);
const candidateIds = ["decision-spine", "activity-history", "retention-lab"];

function candidateMain(html, candidate) {
  const match = html.match(new RegExp(`<main\\b[^>]*data-candidate=["']${candidate}["'][^>]*>[\\s\\S]*?<\\/main>`, "i"));
  assert.ok(match, `${candidate}: candidate main exists`);
  return match[0];
}

test("the account option catalogue contains three complete unselected architectures", async () => {
  const manifest = await readFile(new URL("account-retention-candidate-manifest.ts", candidateRoot), "utf8");

  for (const candidate of candidateIds) assert.match(manifest, new RegExp(`id: "${candidate}"`));
  assert.equal((manifest.match(/ {4}status: "CANDIDATE_READY"/g) ?? []).length, 3);
  assert.equal((manifest.match(/ {4}ownerSelected: false,/g) ?? []).length, 3);
  assert.equal((manifest.match(/ {4}recommendationStatus: "UNRANKED",/g) ?? []).length, 3);
  assert.doesNotMatch(manifest, /RECOMMENDED_AFTER_REVIEW|ownerSelected: true/);
  assert.match(manifest, /8-column order decision spine \/ 4-column account action context/);
  assert.match(manifest, /6-column order history \/ 6-column saved context and next actions/);
  assert.match(manifest, /3-column saved context \/ 6-column product decision \/ 3-column retention services/);
});

test("account candidates use the governed surface, grid, action and product grammar", async () => {
  const source = await readFile(new URL("account-retention-candidate-suite.tsx", candidateRoot), "utf8");

  for (const component of [
    "SurfaceGrid",
    "SurfaceGridZone",
    "SectionIntroduction",
    "EditorialSurface",
    "DecisionSurface",
    "TechnicalSurface",
    "ActionLink",
    "ProductCommerceCard",
    "EvidenceStatusChip",
  ]) assert.match(source, new RegExp(`\\b${component}\\b`));

  assert.doesNotMatch(source, /<a\b|<button\b|className=["'][^"']*\bbutton\b/i);
  assert.doesNotMatch(source, /YourStackBuilder|StackOutcomeProfile|Evidence visibility|\bComplexity\b|Build a sharper/i);
  assert.doesNotMatch(source, /without calling it personal|without treating it as|without scanning an unrelated dashboard/i);
  assert.match(source, /commerceTreatment="selection"/);
  assert.doesNotMatch(source, /inventory="(?:unavailable|in-stock|out-of-stock)"/);
  assert.match(source, /OL-10428/);
  assert.match(source, /mk2866Fixture/);

  const activitySource = source.match(/function ActivityHistoryCandidate\(\)[\s\S]*?function RetentionLabCandidate\(\)/)?.[0] ?? "";
  assert.equal(
    (activitySource.match(/<ResponsiveAccountProductCard \/>/g) ?? []).length,
    1,
    "activity candidate renders one known-order product card",
  );
});

test("account candidates do not invent balances, schedules or mutable service claims", async () => {
  const source = await readFile(new URL("account-retention-candidate-suite.tsx", candidateRoot), "utf8");

  assert.doesNotMatch(source, /\b320 points\b|\bdue soon\b|\boverdue\b|\bnext delivery\b|\bin stock\b|\bsubscription active\b|\breward balance\b/i);
  assert.doesNotMatch(source, /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b|\b\d{4}-\d{2}-\d{2}\b/);
  for (const honestState of [
    "No saved stack is available yet.",
    "Restock timing is not available.",
    "Rewards information is not available.",
    "No subscription information is available.",
    "Recommendations are not available yet.",
  ]) assert.match(source, new RegExp(honestState.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("candidate paths remain owner-only and do not inflate the 73-route ledger", async () => {
  const ledger = JSON.parse(await readFile(new URL("SITE-ROUTE-LEDGER.json", authority), "utf8"));
  const manifest = await readFile(new URL("account-retention-candidate-manifest.ts", candidateRoot), "utf8");
  const route = await readFile(new URL("review-studio/account-retention-candidates/[candidate]/page.tsx", app), "utf8");

  assert.equal(ledger.routes.length, 73);
  assert.equal(ledger.routes.some(({ path }) => path.startsWith("/review-studio/account-retention-candidates")), false);
  assert.match(manifest, /Owner-only candidate paths stay outside the canonical 73-route ledger/);
  assert.match(route, /robots: \{ index: false, follow: false \}/);
  assert.match(route, /ACCOUNT_RETENTION_CANDIDATE_IDS/);
  assert.match(route, /params\.candidate === "catalogue"/);
});

test("account candidate styles declare material grids and deliberate 390 recomposition", async () => {
  const css = await readFile(new URL("account-retention-candidate-suite.module.css", candidateRoot), "utf8");

  assert.match(css, /grid-template-columns: minmax\(220px, 3fr\) minmax\(0, 6fr\) minmax\(240px, 3fr\)/);
  assert.match(css, /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.match(css, /\.retentionDecision \{\s*order: -3/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i);
  assert.doesNotMatch(css, /color\s*:\s*var\(--oluk-text-muted\)/);
  assert.doesNotMatch(css, /font-size\s*:\s*(?:[0-9]|1[0-1])px/i);
  assert.doesNotMatch(css, /border-radius\s*:\s*999px/);
});

test("all three live account candidates keep customer copy on governed surfaces", async () => {
  const worker = await loadBuiltWorker("account-retention-candidates");

  for (const candidate of candidateIds) {
    const html = await renderHtml(worker, `/review-studio/account-retention-candidates/${candidate}`, 200);
    const main = candidateMain(html, candidate);
    const groups = auditRenderedCopySurfaces(main);
    const loose = groups.filter(({ status }) => status === "LOOSE_CANVAS_COPY");
    const text = visibleText(main);

    assert.deepEqual(loose, [], `${candidate}: ${JSON.stringify(loose.slice(0, 6))}`);
    assert.ok(groups.length >= 16, `${candidate}: complete governed composition`);
    assert.match(main, /data-grid-contract=["']12-column["']/);
    assert.match(main, /data-component=["']Button["']/);
    assert.match(main, /data-component=["']ProductMetricRail["']/);
    assert.match(main, /class=["'][^"']*qualitative-chip/);
    assert.match(text, /OL-10428/);
    assert.match(text, /MK-2866/);
    assert.doesNotMatch(text, /\b(?:route|module|fixture|workspace|component|implementation|data owner|presentation)\b/i);
    assert.doesNotMatch(text, /\b320 points\b|\bdue soon\b|\bin stock\b|\bsharper\b/i);

    if (candidate === "retention-lab") {
      const disabledActions = main.match(/<a\b(?=[^>]*aria-disabled=["']true["'])[^>]*>[\s\S]*?<\/a>/gi) ?? [];
      assert.equal(disabledActions.length, 4, "retention services expose four honest disabled actions");
      for (const action of disabledActions) {
        assert.match(action, /data-state=["']disabled["']/i);
        assert.match(action, /tabindex=["']-1["']/i);
        assert.doesNotMatch(action, /\bhref=/i);
        assert.doesNotMatch(action, /→/, "disabled account actions do not imply forward navigation");
      }
    }
  }
});

test("owner review exposes all six live 1440 and 390 previews without client selection state", async () => {
  const review = await readFile(new URL("review-studio/account-retention-candidates/account-retention-candidate-review.tsx", app), "utf8");
  const worker = await loadBuiltWorker("account-retention-candidate-review");
  const html = await renderHtml(worker, "/review-studio/account-retention-candidates/catalogue", 200);

  assert.match(review, /Nothing on this page selects, ranks, publishes or promotes an option/);
  assert.match(review, /Pending complete candidate review/);
  assert.match(review, /ACCOUNT_RETENTION_CANDIDATE_IDS\.map/);
  assert.doesNotMatch(review, /"use client"|useState|useMemo|ActionButton|aria-pressed/);
  assert.equal((html.match(/<iframe\b/g) ?? []).length, 6);
  assert.equal((html.match(/, 1440px["']/g) ?? []).length, 3);
  assert.equal((html.match(/, 390px["']/g) ?? []).length, 3);
  assert.doesNotMatch(review, /Approve candidate|Select candidate|OWNER_SELECTED/);
});
