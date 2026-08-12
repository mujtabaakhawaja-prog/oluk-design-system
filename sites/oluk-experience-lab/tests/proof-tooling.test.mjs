import assert from "node:assert/strict";
import { execFile as execFileCallback } from "node:child_process";
import { promisify } from "node:util";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { ROUTES, VIEWPORTS, routeSlug } from "../scripts/proof/route-matrix.mjs";
import { buildTokenManifest } from "../scripts/proof/token-contract.mjs";

const execFile = promisify(execFileCallback);
const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("MF-09 matrix names all 31 routes at 1440/1024/768/390 without collisions", () => {
  assert.equal(ROUTES.length, 31);
  assert.deepEqual(VIEWPORTS.map(({ width }) => width), [1440, 1024, 768, 390]);
  const ids = ROUTES.flatMap((route) => VIEWPORTS.map((viewport) => `${routeSlug(route.path)}--${viewport.width}`));
  assert.equal(ids.length, 124);
  assert.equal(new Set(ids).size, 124);
  assert.equal(ROUTES.filter(({ customer }) => customer).length, 30);
  assert.equal(ROUTES.find(({ path: pathname }) => pathname === "/review")?.customer, false);
});

test("governed token manifest remains a deterministic projection of authority and CSS", async () => {
  const generated = await buildTokenManifest();
  const committed = JSON.parse(await readFile(new URL("./contracts/governed-token-manifest.json", import.meta.url), "utf8"));
  assert.deepEqual(generated, committed);
  assert.equal(generated.figmaActiveVariableCount, 98);
  assert.equal(generated.colorPrimitives.length, 23);
  assert.equal(generated.colorSemantics.length, 25);
  assert.equal(generated.dimensions.length, 28);
  assert.equal(generated.typography.length, 22);
  assert.equal(generated.individuallyDocumentedFigmaVariableCount, 98);
  assert.equal(generated.remainingIndividualFigmaVariablesToDocument, 0);
});

test("component provenance static checker rejects page-local drift and legacy patterns", async () => {
  const { stdout } = await execFile(process.execPath, ["scripts/proof/component-provenance.mjs"], { cwd: siteRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.failCount, 0);
  assert.ok(result.passCount >= 40);
});

test("visual baseline manifest captures the full route-width matrix without claiming champion-reviewed baselines", async () => {
  const { stdout } = await execFile(process.execPath, ["scripts/proof/visual-baseline.mjs"], { cwd: siteRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.caseCount, 124);
  assert.equal(result.reviewed, 0);
  assert.equal(result.capturedUnreviewed, 124);
  assert.equal(result.pending, 0);
});

test("browser proof runners preserve unpublished review posture and keep evidence outside source by default", async () => {
  const [fourWidth, accessibility, contrastZoom] = await Promise.all([
    readFile(new URL("../scripts/proof/mf09-four-width.mjs", import.meta.url), "utf8"),
    readFile(new URL("../scripts/proof/accessibility-smoke.mjs", import.meta.url), "utf8"),
    readFile(new URL("../scripts/proof/contrast-zoom-stress.mjs", import.meta.url), "utf8"),
  ]);
  for (const source of [fourWidth, accessibility, contrastZoom]) {
    assert.match(source, /HUMAN_REVIEW_REQUIRED_UNPUBLISHED/);
    assert.match(source, /mkdtemp\(path\.join\(tmpdir\(\)/);
  }
  assert.match(fourWidth, /horizontal document overflow/);
  assert.match(fourWidth, /framework error overlay visible/);
  assert.match(fourWidth, /visible90Caps/);
  assert.match(accessibility, /Accessibility\.getFullAXTree/);
  assert.match(accessibility, /prefers-reduced-motion/);
  assert.match(contrastZoom, /axe\.run/);
  assert.match(contrastZoom, /color-contrast/);
  assert.match(contrastZoom, /Emulation\.setPageScaleFactor/);
  assert.match(contrastZoom, /font-size: 200%/);
  assert.match(contrastZoom, /data-proof-long-copy/);
});
