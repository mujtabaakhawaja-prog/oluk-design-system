import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const designSystem = new URL("../app/design-system/", import.meta.url);

async function source(name) {
  return readFile(new URL(name, designSystem), "utf8");
}

function branch(sourceText, start, end) {
  const startIndex = sourceText.indexOf(start);
  const endIndex = end ? sourceText.indexOf(end, startIndex + start.length) : sourceText.length;
  assert.notEqual(startIndex, -1, `missing branch marker: ${start}`);
  assert.notEqual(endIndex, -1, `missing branch end marker: ${end}`);
  return sourceText.slice(startIndex, endIndex);
}

test("ProductCommerceCard publishes explicit role, posture, commerce, and review contracts", async () => {
  const card = await source("product-commerce-card.tsx");

  for (const exportedType of [
    "ProductFact",
    "EvidenceTrustSignal",
    "BenefitClaim",
    "ProductRelationship",
  ]) {
    assert.match(card, new RegExp(`\\b${exportedType}\\b`));
  }
  assert.match(card, /export type ProductCardPosture = "destination" \| "transactional"/);
  assert.match(card, /export type VisualCommerceState =\s*\| "available"\s*\| "unavailable"\s*\| "loading"\s*\| "error"/);
  assert.match(card, /export type ReviewInteractionMode = "inert" \| "interactive"/);
  assert.match(card, /commerceState\?: VisualCommerceState/);
  assert.match(card, /interactionState\?: ProductCardInteractionState/);
  assert.match(card, /data-commerce-state=\{commerceState\}/);
  assert.doesNotMatch(card, /showQualitative|commerceTreatment/);
});

test("each card role owns its action ceiling and forbidden controls", async () => {
  const card = await source("product-commerce-card.tsx");
  const compact = branch(card, 'if (props.variant === "compact")', 'if (props.variant === "relation")');
  const relation = branch(card, 'if (props.variant === "relation")', 'if (props.variant === "featured")');
  const featuredStart = card.indexOf('if (props.variant === "featured")');
  const verticalStart = card.lastIndexOf("\n  const signal = props.evidenceTrustSignal");
  assert.ok(featuredStart > -1 && verticalStart > featuredStart);
  const featured = card.slice(featuredStart, verticalStart);
  const vertical = card.slice(verticalStart);

  assert.match(compact, /actionCeiling=\{1\}/);
  assert.equal((compact.match(/<ActionLink\b/g) ?? []).length, 1);
  assert.match(compact, />\s*View product\s*</);
  assert.match(compact, /<StockPill\b/);
  assert.match(compact, /<MetricRail compact product=\{product\}/);
  assert.doesNotMatch(compact, /QuantityStepper|ActionButton|EvidenceDestination|Qualitative|Quick add|Lab Record/);

  assert.match(vertical, /actionCeiling=\{2\}/);
  assert.match(vertical, /boundedFacts\([^,]+, 2\)/);
  assert.match(vertical, /<ActionLink href=\{product\.customerPath\}>View product<\/ActionLink>/);
  assert.match(vertical, /<EvidenceDestination signal=\{signal\}/);
  assert.doesNotMatch(vertical, /QuantityStepper|ActionButton|Qualitative/);

  assert.match(featured, /actionCeiling=\{2\}/);
  assert.match(featured, /props\.posture === "transactional"/);
  assert.match(featured, /<QuantityStepper[\s\S]*?<ActionButton/);
  assert.match(featured, /:\s*\(\s*<ActionLink href=\{product\.customerPath\}>View product<\/ActionLink>/);
  assert.doesNotMatch(featured, /Quick add|StaticPurchaseActions/);

  assert.match(relation, /actionCeiling=\{1\}/);
  assert.equal((relation.match(/<ActionLink\b/g) ?? []).length, 1);
  assert.match(relation, /<SourceBackedFacts facts=\{relationship\.differences\}/);
  assert.match(relation, /<EvidenceTrust signal=\{relationship\.evidence\}/);
  assert.doesNotMatch(relation, /QuantityStepper|MetricRail|Qualitative|EvidenceDestination|ActionButton/);

  assert.equal((card.match(/actionCeiling=\{1\}/g) ?? []).length, 2);
  assert.equal((card.match(/actionCeiling=\{2\}/g) ?? []).length, 2);
});

test("featured posture makes destination and transaction controls mutually exclusive", async () => {
  const [card, css] = await Promise.all([
    source("product-commerce-card.tsx"),
    source("product-commerce-card.module.css"),
  ]);

  assert.match(
    card,
    /posture: "destination";\s*quantity\?: never;[\s\S]*?posture: "transactional";\s*quantity\?: number;/,
  );
  assert.match(card, /const posture: ProductCardPosture = props\.posture/);
  assert.match(card, /props\.posture === "transactional" \? \(props\.quantity \?\? 1\) : null/);
  assert.match(card, /aria-disabled=\{reviewInteractionMode === "inert" \|\| undefined\}/);
  assert.doesNotMatch(card, /\sdisabled=\{reviewInteractionMode === "inert"/);
  assert.match(card, /disabled=\{commerceState === "error" \|\| commerceState === "unavailable"/);
  assert.match(card, /pending=\{commerceState === "loading"\}/);
  assert.match(
    css,
    /\.featuredCard\[data-interaction-mode="inert"\]\[data-commerce-state="available"\][\s\S]*?button\[data-component="Button"\]\[aria-disabled="true"\][\s\S]*?background: var\(--oluk-cobalt\)/,
  );
});

test("relation and benefit contracts fail closed on missing source or anatomy", async () => {
  const [card, fixtures] = await Promise.all([
    source("product-commerce-card.tsx"),
    source("product-fixtures.ts"),
  ]);

  assert.match(fixtures, /export type BenefitClaim = Readonly<\{\s*claim: string;\s*sourceCoordinate: string;/);
  assert.match(
    fixtures,
    /differences:\s*\| readonly \[ProductFact, ProductFact\]\s*\| readonly \[ProductFact, ProductFact, ProductFact\]/,
  );
  assert.match(card, /differenceCount < 2 \|\| differenceCount > 3/);
  assert.match(card, /requireSourceCoordinate\(relationship\.reason\.sourceCoordinate, "relationship reason"\)/);
  assert.match(card, /requireSourceCoordinate\(relationship\.evidence\.sourceCoordinate, "relationship evidence"\)/);
  assert.match(card, /requireSourceCoordinate\(benefit\.sourceCoordinate, `benefit/);
  assert.match(card, /requires a reason and one relationship action/);
});

test("fixture helper derives differences and evidence without authoring benefit claims", async () => {
  const fixtures = await source("product-fixtures.ts");
  const helper = branch(fixtures, "export function createProductRelationship", "const defaultCrops");

  assert.match(helper, /options\.differenceFields \?\? \["strength", "servings", "purity"\]/);
  assert.match(helper, /new Set\(differenceFields\)\.size !== differenceFields\.length/);
  assert.match(helper, /value: `\$\{product\[field\]\} vs \$\{anchor\[field\]\}`/);
  assert.match(helper, /sourceCoordinate: fixtureFieldCoordinate\(anchor, product, field\)/);
  assert.match(helper, /options\.reason\.sourceCoordinate\.trim\(\)/);
  assert.match(helper, /product\.evidenceTrustSignal \?\?/);
  assert.match(helper, /action: options\.action/);
  assert.doesNotMatch(helper, /qualitativeFacts|goalTag|performance|benefitClaims/);
  assert.match(fixtures, /"mk-2866": createProductRelationship\(/);
  assert.match(fixtures, /"rad-140": createProductRelationship\(/);
});
