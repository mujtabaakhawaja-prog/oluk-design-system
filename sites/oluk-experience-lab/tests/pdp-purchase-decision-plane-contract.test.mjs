import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const designSystem = new URL("../app/design-system/", import.meta.url);

const [purchasePanel, firstFold, firstFoldCss, purchasePanelCss, fixtures] = await Promise.all([
  readFile(new URL("purchase-panel.tsx", designSystem), "utf8"),
  readFile(new URL("pdp-first-fold.tsx", designSystem), "utf8"),
  readFile(new URL("pdp-first-fold.module.css", designSystem), "utf8"),
  readFile(new URL("purchase-panel.module.css", designSystem), "utf8"),
  readFile(new URL("product-fixtures.ts", designSystem), "utf8"),
]);

function cssRule(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  assert.ok(match, `missing ${selector} rule`);
  return match[1];
}

test("PurchasePanel exposes three claim-safe content modes and keeps MK-2866 facts-only", () => {
  assert.match(
    purchasePanel,
    /export type PurchasePanelContentMode\s*=\s*[\s\S]*?"benefits-supported"[\s\S]*?"facts-only"[\s\S]*?"minimal";/,
  );
  assert.match(purchasePanel, /contentMode = "facts-only"/);
  assert.match(firstFold, /<PurchasePanel[\s\S]*?contentMode="facts-only"/);
  assert.match(fixtures, /name: "MK-2866"[\s\S]*?servings: "90 SERVINGS"/);

  assert.match(purchasePanel, /import type \{ BenefitClaim, ProductFixture \} from "\.\/product-fixtures"/);
  assert.doesNotMatch(purchasePanel, /type BenefitClaim(?:Props|Source)/);
  assert.match(purchasePanel, /function SourceBoundBenefitClaim/);
  assert.match(purchasePanel, /const sourceCoordinate = benefit\.sourceCoordinate\.trim\(\)/);
  assert.match(purchasePanel, /if \(!claim \|\| !sourceCoordinate\) return null/);
  assert.match(purchasePanel, /data-source-coordinate=\{sourceCoordinate\}/);
  assert.match(
    purchasePanel,
    /contentMode === "benefits-supported" && benefitClaim \? \([\s\S]*?<SourceBoundBenefitClaim benefit=\{benefitClaim\} \/>/,
  );
  assert.doesNotMatch(purchasePanel, /sourceHref|Source:/);
  assert.doesNotMatch(firstFold, /benefitClaim=/);
});

test("package configuration stays distinct from MetricRail servings and selected purchase quantity", () => {
  assert.match(purchasePanel, /const totalServings = servingsPerBottle \* packageCount/);
  assert.match(purchasePanel, /packageCount === 1 \? "BOTTLE" : "BOTTLES"/);
  assert.match(purchasePanel, /\{totalServings\} SERVINGS/);
  assert.match(purchasePanel, /selectedBottleCount: 1 \| 2 = state === "quantity-changed" \? 2 : 1/);
  assert.match(purchasePanel, /<QuantityStepper[\s\S]*?value=\{quantity \?\? 1\}/);

  const panelBody = purchasePanel.slice(purchasePanel.indexOf("export function PurchasePanel("));
  const metricIndex = panelBody.indexOf("<MetricRail product={product} />");
  const minimalBoundaryIndex = panelBody.indexOf('contentMode === "minimal" ? null');
  const configurationIndex = panelBody.indexOf("<PurchaseConfiguration");
  assert.ok(metricIndex >= 0);
  assert.ok(minimalBoundaryIndex > metricIndex);
  assert.ok(configurationIndex > minimalBoundaryIndex);
  assert.doesNotMatch(panelBody.slice(metricIndex, minimalBoundaryIndex), /packageCount|selectedBottleCount|quantity/);

  assert.equal(`${1} BOTTLE / ${90} SERVINGS`, "1 BOTTLE / 90 SERVINGS");
  assert.equal(`${2} BOTTLES / ${90 * 2} SERVINGS`, "2 BOTTLES / 180 SERVINGS");
  assert.doesNotMatch(purchasePanel, /90 CAPS|180 CAPS/);
});

test("review mode is inert while controls retain their available presentation", () => {
  assert.match(purchasePanel, /reviewMode = true/);
  assert.match(purchasePanel, /data-review-mode=\{reviewMode \? "inert" : "local-preview"\}/);
  assert.match(purchasePanel, /inert=\{reviewMode \? true : undefined\}/);
  assert.match(purchasePanel, /aria-disabled=\{reviewMode \|\| disabled \|\| undefined\}/);
  assert.match(purchasePanel, /onClick=\{reviewMode \|\| disabled \? undefined : \(\) => onSelect\?\.\(packageCount\)\}/);
  assert.match(firstFold, /\sreviewMode\s/);
  assert.match(
    purchasePanelCss,
    /\.panel\[data-review-mode="inert"\][\s\S]*?data-control-kind="button"[\s\S]*?background: var\(--oluk-cobalt\)/,
  );
});

test("PDP keeps a flat atmospheric field separate from the elevated 420px purchase plane", () => {
  assert.doesNotMatch(firstFold, /ProductMediaChamber/);
  assert.match(firstFold, /data-bounded-media-chamber="false"/);
  assert.match(firstFold, /data-plane-elevation="none"/);
  assert.match(firstFold, /data-surface-role="pdp-atmospheric-field"/);
  assert.match(purchasePanel, /data-elevation="independent"/);
  assert.match(purchasePanel, /data-surface-role="purchase-decision-plane"/);
  assert.match(firstFold, /data-object-pair="pdp-atmospheric-field purchase-decision-plane"/);

  const mediaRule = cssRule(firstFoldCss, ".media");
  assert.doesNotMatch(mediaRule, /(?:^|\n)\s*(?:border|border-radius|box-shadow)\s*:/);
  assert.match(cssRule(firstFoldCss, ".composition"), /align-items: end/);
  assert.match(cssRule(firstFoldCss, ".composition"), /minmax\(390px, 420px\)/);
  assert.match(cssRule(firstFoldCss, ".panel"), /max-width: 420px/);
  assert.match(cssRule(firstFoldCss, ".panel"), /box-shadow: var\(--shadow-purchase\)/);
  assert.match(firstFoldCss, /@media \(max-width: 760px\)[\s\S]*?\.panel\s*\{[\s\S]*?max-width: 358px/);
  assert.match(firstFoldCss, /@media \(max-width: 760px\)[\s\S]*?\.panel\[data-width\]\s*\{[\s\S]*?max-width: 358px/);
  assert.match(cssRule(firstFoldCss, ".media:after"), /contact|background|radial-gradient/);
});
