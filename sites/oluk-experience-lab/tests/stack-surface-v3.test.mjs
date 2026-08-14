import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const designSystem = new URL("../app/design-system/", import.meta.url);

test("Stack v3 uses the strict 12-column copy-surface and action grammar", async () => {
  const [source, css] = await Promise.all([
    readFile(new URL("your-stack-builder.tsx", designSystem), "utf8"),
    readFile(new URL("your-stack-builder.module.css", designSystem), "utf8"),
  ]);

  assert.match(source, /data-grammar-strict=\{host === "standalone" \? "true" : undefined\}/);
  assert.match(source, /<SurfaceGrid/);
  for (const zone of ["lead", "support", "full", "split-start", "split-end"]) {
    assert.match(source, new RegExp(`zone="${zone}"`));
  }
  assert.match(source, /<SectionIntroduction[\s\S]*eyebrow="Your Stack"/);
  assert.match(source, /<DecisionSurface/);
  assert.match(source, /<TechnicalSurface/);
  assert.match(source, /<ActionButton/);
  assert.match(source, /<ActionLink/);
  assert.doesNotMatch(source, /<(?:button|a)\b/);
  assert.doesNotMatch(source, /FORMAT["']\s*,\s*value:\s*["']CAPSULES|STATUS AVAILABLE|Open OpenLab status/);
  assert.match(css, /grid-template-rows:\s*auto auto/);
  assert.match(css, /background:\s*var\(--oluk-surface-cobalt-soft\)/);
  assert.match(source, /data-option-count=\{visibleProducts\.length\}/);
  assert.match(source, /\{visibleProducts\.length\} product options · Swipe to compare/);
  assert.match(css, /\.rail\[data-option-count="4"\][\s\S]*grid-template-columns:\s*repeat\(2,/);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(css, /\.mobileRailCue[\s\S]*color:\s*var\(--oluk-text-secondary\)/);
  assert.match(css, /flex-basis:\s*calc\(100vw - 80px\)/);
  assert.match(css, /\.page\[data-component="YourStackBuilder"\] h1,[\s\S]*word-spacing:\s*0\.12em/);
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*word-spacing:\s*0\.14em/);
  assert.doesNotMatch(css, /\.contributionChips\s+span|\.level\s*>\s*div\s*>\s*span/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i);
  assert.doesNotMatch(css, /font-size:\s*(?:1[0-4]|[0-9])px/);
});

test("Stack v3 keeps canonical product anatomy and customer-safe product states", async () => {
  const source = await readFile(new URL("your-stack-builder.tsx", designSystem), "utf8");

  assert.match(source, /<ProductCommerceCard/);
  assert.match(source, /commerceTreatment="selection"/);
  assert.match(source, /<PriceBlock/);
  assert.match(source, /<QualitativeChipList/);
  assert.match(source, /function ContributionChips[\s\S]*?<QualitativeChip/);
  assert.match(source, /aria-label="Stack level"[\s\S]*?<QualitativeChip/);
  assert.doesNotMatch(source, /contributionChips[^\n]*role="list"|<span[^>]*>\{contribution\}<\/span>/);
  assert.match(source, /PRODUCT ROLE/);
  assert.match(source, /WHAT IT ADDS/);
  assert.match(source, /Product image coming soon\./);
  assert.match(source, /UNAVAILABLE/);
  assert.match(source, /VERIFIED EVIDENCE/);
  assert.match(source, /Check OpenLab status/);
  assert.doesNotMatch(source, /governed media|render pending|unpopulated|substitute bottle|no servings value/i);
  assert.doesNotMatch(source, /<ProductMediaChamber|<MetricRail/);
});

test("Stack v3 preserves the deterministic commercial ladder and selected actions", async () => {
  const source = await readFile(new URL("your-stack-builder.tsx", designSystem), "utf8");

  for (const level of ["FOUNDATION", "STRONGER", "MAXIMUM"]) {
    assert.match(source, new RegExp(level));
  }
  assert.match(source, /Remove \$\{product\.name\}/);
  assert.match(source, /Review one selected product/);
  assert.match(source, /Review \{productCount\} selected products/);
  assert.match(source, /stackTotalFor\(baseline\.price, selectedProducts\.map/);
  assert.match(source, /now focuses on \$\{stackContributionPhrase\(contributions\)\}/);
  assert.doesNotMatch(source, /stackGoals\[goal\]\.outcome\} now define|contributionNarrative/);
  assert.match(source, /data-component="StackOpenLabConfidence"/);
  assert.doesNotMatch(source, /StackOutcomeProfile|goalFit|evidenceVisibility|complexity|intensity|out of 100|sharper/i);
});
