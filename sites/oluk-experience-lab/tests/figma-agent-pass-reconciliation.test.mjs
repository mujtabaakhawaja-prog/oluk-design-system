import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../../", import.meta.url);

test("Figma Agent passes remain honest about native component provenance and dual-reference readiness", async () => {
  const reconciliation = JSON.parse(
    await readFile(new URL("authority/FIGMA-AGENT-PASS-RECONCILIATION.json", root), "utf8"),
  );

  assert.equal(reconciliation.passes.length, 8);
  assert.equal(reconciliation.rules.sitesFirst, true);
  assert.equal(reconciliation.rules.nativeFigmaRequiredForSync, true);
  assert.equal(reconciliation.rules.portedProofBoardsOverrideAuthority, false);
  assert.equal(reconciliation.maturitySnapshot.routeLedger.total, 73);
  assert.equal(reconciliation.maturitySnapshot.routeLedger.dualReferenceReady, 1);

  const byId = Object.fromEntries(reconciliation.passes.map((pass) => [pass.id, pass]));
  assert.equal(byId["pass-1-your-stack"].result, "sites-and-figma-paired");
  assert.match(byId["pass-2-catalogue-discovery"].result, /awaiting-sync-capture/);
  assert.equal(byId["pass-6-faq-about"].result, "local-composition");
  assert.match(byId["pass-7-bundle-stack-explorer"].result, /superseded-by-your-stack-standard/);
});
