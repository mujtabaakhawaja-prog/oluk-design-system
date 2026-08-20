import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(siteRoot, "../..");

async function readSite(file) {
  return readFile(path.join(siteRoot, file), "utf8");
}

test("LockedHero preserves its accepted stage behavior and fails closed without owner data", async () => {
  const [source, css, mapSource] = await Promise.all([
    readSite("app/design-system/locked-home-hero.tsx"),
    readSite("app/design-system/locked-home-hero.module.css"),
    readFile(path.join(repoRoot, "authority/RUNTIME-PRESERVATION-MAP.json"), "utf8"),
  ]);

  assert.match(mapSource, /homepage-product-stage/);
  assert.match(source, /data-motion-contract="runtime-product-stage-5-3-1"/);
  assert.match(source, /data-state-restoration="url-featured-product"/);
  assert.match(source, /window\.history\.replaceState/);
  assert.match(source, /window\.addEventListener\("popstate"/);
  assert.match(source, /window\.addEventListener\("pageshow"/);
  assert.match(source, /ArrowRight/);
  assert.match(source, /ArrowLeft/);
  assert.match(source, /aria-controls="hero-product-stage"/);
  assert.match(source, /tabIndex=\{product\.canonicalProductId === active\.canonicalProductId \? 0 : -1\}/);
  assert.match(source, /loading=\{slot === 0 \? "eager" : "lazy"\}/);
  assert.match(source, /data-mobile-priority="active-product-first"/);
  assert.match(source, /data-home-family="locked-5-3-1"/);
  assert.match(source, /data-copy-surface="editorial"/);
  assert.match(source, /className=\{styles\.editorial\}/);
  assert.match(source, /className=\{styles\.decision\}/);
  assert.match(source, /<MetricRail/);
  assert.match(source, /<ActionButton/);
  assert.match(source, /<ActionLink/);
  assert.match(source, /products\.length !== 5 \|\| !active\) return null/);
  assert.match(source, /strengthDisplay\?: string \| null/);
  assert.match(source, /priceDisplay\?: string \| null/);
  assert.doesNotMatch(source, /const products = \[/);
  assert.doesNotMatch(source, /price: "£|lockedHomeHeroMedia|Add to bag/);
  assert.doesNotMatch(source, /Formulated\. Verified|Third-party tested|OPENLAB VERIFIED|RECORD AVAILABLE/);
  assert.doesNotMatch(source, /data-figma-node|data-figma-stage-node/);
  assert.doesNotMatch(source, /className="button|styles\.buyRow|<dl className=\{styles\.metrics\}/);
  assert.match(css, /\.hero \{[\s\S]*grid-template-columns: minmax\(0, 0\.84fr\) minmax\(0, 1\.16fr\)/);
  assert.match(css, /\.divider \{[\s\S]*background: var\(--oluk-cobalt\)/);
  assert.doesNotMatch(css, /var\(--canvas\)|var\(--white\)|var\(--line\)/);
  assert.match(css, /\.bottle\[data-slot="-2"\]/);
  assert.match(css, /\.bottle\[data-slot="-2"\],[\s\S]*\.bottle\[data-slot="2"\][\s\S]*display: none/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|localStorage|sessionStorage/);
});

test("LockedHero permits one raw authored-media selector while visible actions stay canonical", async () => {
  const source = await readSite("app/design-system/locked-home-hero.tsx");
  const rawButtons = source.match(/<button\b[\s\S]*?>/g) ?? [];

  assert.equal(rawButtons.length, 1, "LockedHero may have only its authored bottle selector as a raw button");
  assert.match(rawButtons[0], /data-stage-media-selector/);
  assert.match(rawButtons[0], /data-control-exception="authored-media-stage-selector"/);
  assert.match(source, /<ActionButton[\s\S]*aria-label="Previous featured product"/);
  assert.match(source, /<ActionButton[\s\S]*aria-label="Next featured product"/);
  assert.match(source, /<ActionButton[\s\S]*role="tab"/);
});

test("OpenLab dossier views are semantic, deep-linkable, and remain local presentation state", async () => {
  const [source, css, mapSource, customerRoutes] = await Promise.all([
    readSite("app/design-system/openlab-product-experience.tsx"),
    readSite("app/design-system/openlab-product-experience.module.css"),
    readFile(path.join(repoRoot, "authority/RUNTIME-PRESERVATION-MAP.json"), "utf8"),
    readSite("app/customer-routes.tsx"),
  ]);
  const dossierRoute = customerRoutes.slice(
    customerRoutes.indexOf("export function DossierRoute"),
    customerRoutes.indexOf("function lookupStateFromReference"),
  );

  assert.match(mapSource, /product-dossier/);
  assert.match(source, /data-deep-link-contract="openlab-view-hash"/);
  assert.match(source, /window\.location\.hash/);
  assert.match(source, /window\.history\.replaceState/);
  assert.match(source, /window\.addEventListener\("hashchange"/);
  assert.match(source, /window\.addEventListener\("popstate"/);
  assert.match(source, /window\.addEventListener\("pageshow"/);
  assert.match(source, /aria-orientation="horizontal"/);
  assert.match(source, /"aria-labelledby"/);
  assert.match(source, /role: "tabpanel"/);
  assert.match(source, /ArrowRight/);
  assert.match(source, /ArrowDown/);
  assert.match(source, /Home/);
  assert.match(source, /data-focus-target/);
  assert.match(source, /data-visualization-contract="chart-with-table-equivalent"/);
  assert.match(source, /<SurfaceGrid/);
  assert.match(source, /<ActionButton/);
  assert.match(source, /<TechnicalTable compact/);
  assert.match(source, /Source Only/);
  assert.match(source, /Unavailable/);
  assert.match(css, /scroll-snap-type: x proximity/);
  assert.match(css, /\.compactTable table[\s\S]*min-width: 0/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(dossierRoute, /<SurfaceGrid>/);
  assert.match(dossierRoute, /<EditorialSurface/);
  assert.doesNotMatch(dossierRoute, /<PageHero/);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|localStorage|sessionStorage/);
});
