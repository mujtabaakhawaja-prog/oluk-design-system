import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { loadBuiltWorker, renderHtml } from "../scripts/proof/rendered-audit-utils.mjs";

const designSystem = new URL("../app/design-system/", import.meta.url);

async function source(name) {
  return readFile(new URL(name, designSystem), "utf8");
}

test("ProductCommerceCard and StaticPurchaseActions use the canonical action controls", async () => {
  const card = await source("product-commerce-card.tsx");
  const parts = await source("commerce-parts.tsx");
  const partsCss = await source("commerce-parts.module.css");
  const cardCss = await source("product-commerce-card.module.css");
  const candidateCss = await source("candidate-review.css");

  assert.match(card, /import \{ ActionButton, ActionLink \} from "\.\/action-control"/);
  assert.match(parts, /import \{ ActionButton, ActionLink \} from "\.\/action-control"/);
  assert.doesNotMatch(card, /<(?:a|button)\b/);

  const staticActions = parts.slice(parts.indexOf("export function StaticPurchaseActions"));
  assert.match(staticActions, /state = "unavailable"/, "missing commerce state fails closed");
  assert.match(staticActions, /<ActionButton disabled>/);
  assert.equal((staticActions.match(/<ActionLink\b/g) ?? []).length, 2);
  assert.doesNotMatch(staticActions, /<(?:a|button)\b/);
  assert.doesNotMatch(staticActions, /(?:^|["'\s])button(?:-secondary)?(?:["'\s]|$)/);

  assert.match(partsCss, /\.actions\s*\{[\s\S]*?grid-template-columns: 1fr/);
  assert.match(partsCss, /\.actions\s*\{[\s\S]*?min-width: 0/);
  assert.match(partsCss, /\.actions > \*\s*\{[\s\S]*?width: 100%/);
  assert.match(cardCss, /@media \(max-width: 540px\)[\s\S]*?\.compactActions\s*\{[\s\S]*?grid-template-columns: 1fr/);
  assert.doesNotMatch(candidateCss, /oluk-candidate-button|oluk-candidate-actions|oluk-candidate-quantity/);
});

test("QuantityStepper is the only named raw-button exception in the card control family", async () => {
  const quantity = await source("quantity-stepper.tsx");
  const css = await source("quantity-stepper.module.css");
  const parts = await source("commerce-parts.tsx");
  const card = await source("product-commerce-card.tsx");
  const purchase = await source("purchase-panel.tsx");

  assert.match(quantity, /export function QuantityStepper\b/);
  assert.match(quantity, /data-component="QuantityStepper"/);
  assert.match(quantity, /data-behavior="static-presentation"/);
  assert.match(quantity, /data-control-exception="segmented-quantity-control"/);
  assert.match(quantity, /aria-disabled=\{unavailable \|\| undefined\}/);
  assert.equal((quantity.match(/<button\b/g) ?? []).length, 2);
  assert.equal((quantity.match(/<button[^>]*\bdisabled\b/g) ?? []).length, 2);
  assert.doesNotMatch(quantity, /(?:import[^\n]*action-control|<Action(?:Button|Control|Link)\b)/);
  assert.doesNotMatch(parts, /StaticQuantityStepper|quantity-stepper/);
  assert.match(card, /<QuantityStepper[\s\S]*?unavailable=\{resolved\.inventory !== "in-stock"\}/);
  assert.match(purchase, /<QuantityStepper[\s\S]*?unavailable=\{\(inventory \?\? presentation\.inventory\) !== "in-stock"\}/);

  assert.match(css, /grid-template-columns: repeat\(3, minmax\(44px, 1fr\)\)/);
  assert.match(css, /min-block-size: 44px/);
  assert.match(css, /min-inline-size: 44px/);
  assert.match(css, /data-state="unavailable"/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i);
});

test("the rendered adopted PDP keeps unresolved commerce unavailable while preserving canonical controls", async () => {
  const worker = await loadBuiltWorker("product-commerce-controls");
  const productHtml = await renderHtml(worker, "/product/mk-2866");

  assert.match(productHtml, /data-component="PurchasePanel"/);
  assert.match(productHtml, /data-component="QuantityStepper"[^>]*data-state="unavailable"/);
  assert.match(productHtml, /Price unavailable/);
  assert.match(productHtml, /Source Reported/i);
  assert.match(
    productHtml,
    /<button\b(?=[^>]*\bdata-component="Button")(?=[^>]*\bdata-control-kind="button")(?=[^>]*\bdisabled(?:="")?)[^>]*>/,
  );
  assert.doesNotMatch(productHtml, /£43|\bIN STOCK\b|Third-Party Tested/i);
});
