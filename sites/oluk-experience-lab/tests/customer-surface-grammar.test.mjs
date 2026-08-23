import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  auditCssText,
  auditRenderedCopySurfaces,
  auditTsxText,
  buildCustomerSurfaceGrammarAudit,
} from "../scripts/proof/customer-surface-grammar.mjs";

const designSystem = new URL("../app/design-system/", import.meta.url);

test("governed copy surfaces contain customer copy and expose mobile intent", async () => {
  const source = await readFile(new URL("content-surfaces.tsx", designSystem), "utf8");
  const css = await readFile(new URL("content-surfaces.module.css", designSystem), "utf8");

  for (const component of ["EditorialSurface", "DecisionSurface", "TechnicalSurface", "TransactionIntroCard"]) {
    assert.match(source, new RegExp(`export function ${component}\\b`));
  }
  assert.match(source, /data-copy-surface=\{kind\}/);
  assert.match(source, /data-copy-sequence=/);
  assert.match(source, /data-mobile-strategy=\{compact \? "summary" : "recompose"\}/);
  assert.match(css, /font-size: var\(--oluk-type-body-size\)/);
  assert.match(css, /font-size: var\(--oluk-type-eyebrow-size\)/);
  assert.match(css, /color: var\(--oluk-text-secondary\)/);
  assert.doesNotMatch(css, /color: var\(--oluk-text-muted\)/);
  assert.match(css, /@media \(max-width: 540px\)/);
  assert.deepEqual(auditCssText(css, "app/design-system/content-surfaces.module.css"), []);
});

test("rendered grammar audit distinguishes governed copy from loose canvas copy", () => {
  const groups = auditRenderedCopySurfaces(`
    <main>
      <h1>Loose page headline</h1>
      <section data-copy-surface="editorial"><h2>Contained story</h2><p>Readable customer copy.</p></section>
      <p>Loose continuation.</p>
    </main>
  `);

  assert.deepEqual(groups.map(({ status }) => status), [
    "LOOSE_CANVAS_COPY",
    "CONTAINED",
    "CONTAINED",
    "LOOSE_CANVAS_COPY",
  ]);
});

test("the only canvas introduction exception permits an eyebrow and heading, not copy or controls", () => {
  const groups = auditRenderedCopySurfaces(`
    <main>
      <header data-copy-surface="section-introduction">
        <span>Bounded eyebrow</span><h1>Allowed canvas headline</h1><p>Not allowed here.</p><a href="/shop">Not allowed here</a>
      </header>
    </main>
  `);

  assert.deepEqual(groups.map(({ status }) => status), [
    "CANVAS_INTRO_EXCEPTION",
    "INVALID_CANVAS_EXCEPTION",
    "INVALID_CANVAS_EXCEPTION",
  ]);
});

test("source grammar catches type, color, media, redraw and rejected stack drift", () => {
  const cssFindings = auditCssText(`
    .copy { color: #123456; font-family: Arial; font-size: 13px; }
    .meta { font-size: 10px; }
    .qualitative-chip-label { font-size: 11px; }
  `);
  assert.ok(cssFindings.some(({ rule }) => rule === "literal-color"));
  assert.ok(cssFindings.some(({ rule }) => rule === "literal-font-family"));
  assert.ok(cssFindings.some(({ rule }) => rule === "body-type-below-15"));
  assert.ok(cssFindings.some(({ rule }) => rule === "metadata-type-below-12"));
  assert.ok(cssFindings.some(({ rule }) => rule === "muted-customer-copy") === false);
  assert.equal(cssFindings.some(({ value }) => value === "11px"), false, "QualitativeChip retains its sole 11px exception");

  const tsxFindings = auditTsxText(`
    export function ProductCommerceCard() { return <img src="/assets/products/generic.png"/>; }
    export function StackBuilder() { return <div data-component="YourStackBuilder">Build a sharper stack <span>Complexity</span></div>; }
  `, "app/design-system/stack-local.tsx");
  assert.ok(tsxFindings.some(({ rule }) => rule === "local-canonical-redraw"));
  assert.ok(tsxFindings.some(({ rule }) => rule === "direct-unregistered-product-media"));
  assert.ok(tsxFindings.some(({ rule }) => rule === "sharper-stack-copy"));
  assert.ok(tsxFindings.some(({ rule }) => rule === "rejected-complexity-score"));

  const mutedCopyFindings = auditCssText(`.story p { color: var(--oluk-text-muted); font-size: 16px; }`);
  assert.ok(mutedCopyFindings.some(({ rule }) => rule === "muted-customer-copy"));
  assert.equal(
    auditCssText(`.status { color: var(--oluk-text-muted); font-size: 12px; }`).some(({ rule }) => rule === "muted-customer-copy"),
    false,
  );
});

test("ProductMetricRail fits long and unavailable product truth without collision contracts", async () => {
  const source = await readFile(new URL("metric-rail.tsx", designSystem), "utf8");
  const css = await readFile(new URL("../globals.css", designSystem), "utf8");

  assert.match(source, /strength: string \| null/);
  assert.match(source, /data-availability=\{value === "—" \? "unavailable" : "available"\}/);
  assert.match(source, /data-component="ProductMetricRail"/);
  assert.match(css, /\.metric-rail \{[\s\S]*?container-type: inline-size/);
  assert.match(css, /\.metric-rail \[data-fit="long"\] dd \{[\s\S]*?overflow-wrap: anywhere/);
  assert.match(css, /\.metric-rail \[data-availability="unavailable"\] dd/);
  assert.match(css, /\.metric-rail dt \{[\s\S]*?white-space: nowrap/);
});

test("the committed audit truthfully covers the 44 core Product, OpenLab and continuation routes", async () => {
  const committed = JSON.parse(
    await readFile(new URL("../../../authority/generated/CUSTOMER-SURFACE-GRAMMAR-AUDIT.json", import.meta.url), "utf8"),
  );
  const current = await buildCustomerSurfaceGrammarAudit();

  assert.equal(current.auditedRouteCount, 44);
  assert.equal(current.currentState, "FOUNDATION_READY_ROUTE_REFACTOR_REQUIRED");
  assert.equal(current.strictScope.status, "STRICT_READY");
  assert.ok(current.routeRefactorCount > 0, "legacy route grammar debt remains explicit rather than falsely passing");
  assert.ok(current.looseCopyGroupCount > 0, "loose canvas copy is captured for downstream route refactors");
  assert.deepEqual(current, committed, "the committed route-level grammar audit is current");
});
