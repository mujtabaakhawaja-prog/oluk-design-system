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

test("LockedHero preserves the customer stage job with local URL restoration and roving tabs", async () => {
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
  assert.match(source, /tabIndex=\{product\.id === active\.id \? 0 : -1\}/);
  assert.match(source, /loading=\{slot === 0 \? "eager" : "lazy"\}/);
  assert.match(source, /data-mobile-priority="active-product-first"/);
  assert.match(css, /data-slot="-2"/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|localStorage|sessionStorage/);
});

test("OpenLab dossier views are semantic, deep-linkable, and remain local presentation state", async () => {
  const [source, css, mapSource] = await Promise.all([
    readSite("app/design-system/openlab-product-experience.tsx"),
    readSite("app/design-system/openlab-product-experience.module.css"),
    readFile(path.join(repoRoot, "authority/RUNTIME-PRESERVATION-MAP.json"), "utf8"),
  ]);

  assert.match(mapSource, /product-dossier/);
  assert.match(source, /data-deep-link-contract="openlab-view-hash"/);
  assert.match(source, /window\.location\.hash/);
  assert.match(source, /window\.addEventListener\("hashchange"/);
  assert.match(source, /window\.addEventListener\("popstate"/);
  assert.match(source, /window\.addEventListener\("pageshow"/);
  assert.match(source, /aria-orientation="horizontal"/);
  assert.match(source, /aria-labelledby=\{tabId\}/);
  assert.match(source, /role="tabpanel"/);
  assert.match(source, /ArrowRight/);
  assert.match(source, /Home/);
  assert.match(css, /scroll-snap-type:x mandatory/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|WebSocket|localStorage|sessionStorage/);
});
