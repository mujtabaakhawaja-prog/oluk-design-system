import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const authority = await readFile(new URL("app/design-system/openlab-authority.ts", root), "utf8");
const routes = await readFile(new URL("app/program-routes.tsx", root), "utf8");

test("OpenLab fields carry value, source, state and supersession independently", () => {
  for (const field of ["value", "sourceRef", "status", "supersedes"]) assert.match(authority, new RegExp(field));
  assert.match(authority, /reportSource: unavailable<string>\(\)/);
  assert.match(authority, /method: unavailable<string>\(\)/);
  assert.match(authority, /concentration: unavailable<number>\(\)/);
  assert.match(authority, /analytes: \[\]/);
});
test("OpenLab arithmetic counts reports once and excludes threshold purity", () => {
  assert.match(authority, /new Set\(reports\.map\(\(\{ reportId \}\) => reportId\)\)\.size/);
  assert.match(authority, /typeof purity\.value === "number"/);
  assert.match(routes, /threshold \(>99%\), so no exact-value average is calculated/);
});

test("OpenLab fails closed for source, method, analytes and instrument visuals", () => {
  assert.match(authority, /canOpenOriginal/);
  assert.match(routes, /Original source unavailable/);
  assert.match(routes, /Report preview unavailable/);
  assert.match(routes, /Method unavailable/);
  assert.match(routes, /No generated instrument graph or reconstructed chromatogram/);
  assert.doesNotMatch(routes, /\bPASS\b|contaminants not detected|release approved|QA signoff/i);
});
