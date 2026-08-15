import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");

const readJson = async (file) =>
  JSON.parse(await readFile(path.join(repoRoot, file), "utf8"));

test("the selected Account composition remains a C-led directive without changing the canonical route ledger", async () => {
  const [decisionLedger, routeLedger] = await Promise.all([
    readJson("authority/DECISION-LEDGER.json"),
    readJson("authority/SITE-ROUTE-LEDGER.json"),
  ]);
  const decision = decisionLedger.events.find(
    ({ id }) => id === "DEC-ACCOUNT-RETENTION-001",
  );

  assert.ok(decision);
  assert.equal(decision.status, "CHAMPION");
  assert.equal(
    decision.reviewStatus,
    "OWNER_REVIEWED_AND_SELECTED_FOR_FUTURE_ACCOUNT_WAVE",
  );
  assert.equal(decision.scope, "COMPOSITION_DIRECTIVE_ONLY");
  assert.equal(decision.selection.primaryComposition, "retention-lab");
  assert.equal(
    decision.selection.firstAvailableAction,
    "decision-spine when a known order or product exists",
  );
  assert.equal(
    decision.selection.supportingContext,
    "activity-history only when genuine order records exist",
  );
  assert.deepEqual(decision.candidateSource.reviewedViewports, [1440, 390]);
  assert.equal(decision.candidateSource.head, "e597d24b369b6b1c524efc95923b8fc537082301");
  assert.equal(decision.canonical73RouteLedger.routeCount, 73);
  assert.equal(decision.canonical73RouteLedger.mutation, "NONE");
  assert.equal(decision.canonical73RouteLedger.promotion, "NONE");
  assert.equal(routeLedger.routes.length, 73);
  assert.ok(decision.excluded.includes("Account runtime implementation"));
  assert.ok(decision.excluded.includes("candidate PR #42 rebase or merge"));
  assert.ok(decision.excluded.includes("Figma Make"));
});
