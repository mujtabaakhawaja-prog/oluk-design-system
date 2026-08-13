import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const content = readFileSync(new URL("../app/design-system/frontier-content.ts", import.meta.url), "utf8");
const registry = JSON.parse(readFileSync(new URL("../../../authority/FRONTIER-SECTION-MOUNT-REGISTRY.json", import.meta.url), "utf8"));

test("frontier catalogue preserves fixed MK-2866 truth and RAD-140 8 MG correction", () => {
  assert.match(content, /slug:"mk-2866"[\s\S]*?strength:"15 MG"[\s\S]*?servings:"90 SERVINGS"[\s\S]*?purity:">99%"[\s\S]*?price:"£43"/);
  assert.match(content, /slug:"rad-140"[\s\S]*?strength:"8 MG"/);
  assert.doesNotMatch(content, /RAD-140[\s\S]{0,280}10 MG/);
  assert.equal((content.match(/record\(\{slug:/g) ?? []).length, 16);
});

test("frontier section registry covers all 75 creative actions with explicit mobile strategies", () => {
  assert.deepEqual(registry.creativeActionCoverage.documentationSourced, Array.from({length:50},(_,index)=>index+1));
  assert.deepEqual(registry.creativeActionCoverage.figmaSourced, Array.from({length:25},(_,index)=>index+51));
  assert.ok(registry.sections.every((section) => section.mobileStrategy && section.mounts.length));
  assert.deepEqual(registry.mobileContract.reviewWidths, [1440,390]);
});

test("frontier binds supplied product renders and ships bounded Make/agentic handoff kits", () => {
  assert.match(content, /"mk-2866": "\/assets\/products\/mk-2866\/front\.png"/);
  assert.match(content, /"rad-140": "\/assets\/products\/rad-140\/front-design-fixture\.png"/);
  const kitRoot = new URL("../../../make-sessions/frontier-site-expansion/", import.meta.url);
  for (const file of ["README.md", "assets.json", "app.tsx", "PROMPTS.md", "AGENTIC_PROMPTS.md"]) {
    assert.ok(readFileSync(new URL(file, kitRoot), "utf8").length > 200, file);
  }
  assert.doesNotMatch(readFileSync(new URL("PROMPTS.md", kitRoot), "utf8"), /RAD-140[^\n]{0,80}10 MG/);
});
