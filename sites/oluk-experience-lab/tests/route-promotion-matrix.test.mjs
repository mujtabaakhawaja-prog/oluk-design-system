import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");
const readJson = async (file) => JSON.parse(await readFile(path.join(repoRoot, file), "utf8"));

test("the promotion matrix derives a promoted and promotable disposition for every ledger route", async () => {
  const [ledger, matrix] = await Promise.all([
    readJson("authority/SITE-ROUTE-LEDGER.json"),
    readJson("authority/ROUTE-PROMOTION-MATRIX.json"),
  ]);
  assert.equal(matrix.ledgerSource.routeCount, 73);
  assert.match(matrix.ledgerSource.sha256, /^[a-f0-9]{64}$/);
  assert.equal(matrix.routeDispositions.length, ledger.routes.length);
  assert.deepEqual(new Set(matrix.routeDispositions.map(({ routeId }) => routeId)), new Set(ledger.routes.map(({ id }) => id)));
  for (const route of matrix.routeDispositions) {
    assert.ok(route.template);
    assert.ok(Array.isArray(route.promotableFrom));
    assert.equal(typeof route.promoted, "boolean");
  }
});
