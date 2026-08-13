import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentUrl = new URL(
  "../app/design-system/owner-review-state-harness.tsx",
  import.meta.url,
);
const stylesUrl = new URL(
  "../app/design-system/owner-review-state-harness.module.css",
  import.meta.url,
);
const reviewUrl = new URL("../app/design-system/candidate-review.tsx", import.meta.url);
const contractsUrl = new URL("../app/design-system/contracts.ts", import.meta.url);
const customerRoutesUrl = new URL("../app/experience-lab.tsx", import.meta.url);

const [component, styles, review, contracts, customerRoutes] = await Promise.all([
  readFile(componentUrl, "utf8"),
  readFile(stylesUrl, "utf8"),
  readFile(reviewUrl, "utf8"),
  readFile(contractsUrl, "utf8"),
  readFile(customerRoutesUrl, "utf8"),
]);

test("mounts the client-only owner harness on the private review route and nowhere in customer routes", () => {
  assert.match(component, /^"use client";/);
  assert.match(component, /data-owner-only="true"/);
  assert.match(component, /data-runtime-authority="none"/);
  assert.match(component, /data-network-authority="none"/);
  assert.match(component, /OWNER-ONLY · LOCAL STATE HARNESS/);

  assert.match(review, /import \{ OwnerReviewStateHarness \}/);
  assert.match(review, /id="mf09-local-state-harness"/);
  assert.match(review, /href="#mf09-local-state-harness"/);
  assert.match(review, /<OwnerReviewStateHarness \/>/);
  assert.doesNotMatch(customerRoutes, /OwnerReviewStateHarness|mf09-local-state-harness/);
});

test("keeps every harness interaction deterministic and in memory", () => {
  for (const requiredState of [
    /useState<ReviewTab>\("product"\)/,
    /useState\(1\)/,
    /useState<Availability>\("ready"\)/,
    /setAdded\(true\)/,
    /"unavailable"/,
    /"out-of-stock"/,
    /setQuery\(/,
    /setRecordFilter\(/,
    /setRevealedRecordId\(/,
    /Math\.min\(9, Math\.max\(1, quantity \+ delta\)\)/,
  ]) {
    assert.match(component, requiredState);
  }

  for (const forbiddenCallback of [
    /\bfetch\s*\(/,
    /XMLHttpRequest/,
    /navigator\.sendBeacon/,
    /\bWebSocket\b/,
    /localStorage/,
    /sessionStorage/,
    /\/api\//,
    /wc\/store/,
    /add-to-cart/i,
    /onSubmit=/,
    /action=/,
  ]) {
    assert.doesNotMatch(component, forbiddenCallback);
  }

  assert.match(component, /No cart or backend was contacted/);
  assert.match(component, /Runtime callback<\/dt><dd>NONE/);
});

test("exposes keyboard, naming, disclosure and live-status semantics", () => {
  for (const semantic of [
    /role="status"/,
    /aria-live="polite"/,
    /aria-atomic="true"/,
    /role="tablist"/,
    /role="tab"/,
    /aria-selected=/,
    /aria-controls=/,
    /role="tabpanel"/,
    /aria-labelledby=/,
    /aria-expanded=/,
    /type="search"/,
    /<fieldset/,
    /<legend>/,
    /aria-label=\{`Decrease \$\{product\.name\} quantity`\}/,
    /aria-label=\{`Increase \$\{product\.name\} quantity`\}/,
    /event\.key === "ArrowRight"/,
    /event\.key === "ArrowLeft"/,
    /event\.key === "Home"/,
    /event\.key === "End"/,
  ]) {
    assert.match(component, semantic);
  }

  assert.match(styles, /:focus-visible/);
  assert.match(styles, /@media \(max-width: 620px\)/);
  assert.doesNotMatch(styles, /overflow-x\s*:\s*clip/);
});

test("inherits exact locked MK-2866 truth without creating analytical claims", () => {
  assert.match(component, /const product = mk2866Fixture/);
  assert.match(component, /import \{ ProductCommerceCard \} from "\.\/product-commerce-card"/);
  assert.match(component, /<ProductCommerceCard/);
  assert.doesNotMatch(component, /<Image|<MetricRail|<QualitativeChipList/);
  for (const exactTruth of [
    'series: "SARM SERIES"',
    'name: "MK-2866"',
    'alias: "Ostarine"',
    'sku: "80529-01"',
    'strength: "15 MG"',
    'servings: "90 SERVINGS"',
    'purity: ">99%"',
    'price: "£43"',
  ]) {
    assert.match(contracts, new RegExp(exactTruth.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.doesNotMatch(component, /90 CAPS(?:\b|ULES)/i);
  assert.doesNotMatch(component, /\b99\.\d+%/);
  assert.match(component, /No analytical result is asserted here/);
});
