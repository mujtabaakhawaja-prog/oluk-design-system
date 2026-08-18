import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the Sites runtime boundary is source-local and fail-closed by default", async () => {
  const source = await readFile(
    new URL("../app/runtime-adapters/sites-runtime-boundary.ts", import.meta.url),
    "utf8",
  );

  assert.match(source, /source: "unbound"/);
  assert.match(source, /c2Projection: null/);
  assert.match(source, /wooProjection: null/);
  assert.match(source, /initiatorBoundary: "preserved-unbound"/);
  const gateSource = await readFile(
    new URL("../app/runtime-adapters/sites-runtime-boundary-gate.tsx", import.meta.url),
    "utf8",
  );
  assert.match(gateSource, /function SitesRuntimeBoundaryGate/);
  assert.match(gateSource, /Nothing is available to purchase yet/);
  assert.doesNotMatch(source, /from\s+["'](?:https?:|@c2|woo|initiator)/i);
});
