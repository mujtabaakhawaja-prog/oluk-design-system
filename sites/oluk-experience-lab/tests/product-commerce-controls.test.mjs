import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { loadBuiltWorker, renderHtml } from "../scripts/proof/rendered-audit-utils.mjs";

const designSystem = new URL("../app/design-system/", import.meta.url);

async function source(name) {
  return readFile(new URL(name, designSystem), "utf8");
}

function cardElements(html) {
  return [...html.matchAll(/<article\b(?=[^>]*\bdata-component="ProductCommerceCard\.[^"]+")[\s\S]*?<\/article>/g)]
    .map((match) => match[0]);
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
  assert.match(
    staticActions,
    /<ActionButton\s+data-oluk-node="action\.purchase\.primary"\s+disabled>/,
  );
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

test("rendered product cards keep enabled-link arrows and disabled unavailable actions", async () => {
  const worker = await loadBuiltWorker("product-commerce-controls");
  const guideHtml = await renderHtml(worker, "/open-lab/compound-guide");
  const guideCards = cardElements(guideHtml);
  const longLabelCard = guideCards.find((html) => html.includes("View record availability"));
  assert.ok(longLabelCard, "compound guide renders the long unavailable-record label");

  const enabledLinks = [...longLabelCard.matchAll(/<a\b(?=[^>]*\bdata-component="Button")(?=[^>]*\bdata-control-kind="link")(?=[^>]*\bhref=)[^>]*>[\s\S]*?<\/a>/g)]
    .map((match) => match[0]);
  assert.ok(enabledLinks.length >= 1, "product card exposes a canonical enabled link");
  for (const link of enabledLinks) {
    assert.match(link, /→/, "enabled ActionLink keeps its directional arrow");
    assert.doesNotMatch(link, /aria-disabled="true"/);
  }

  const reviewHtml = await renderHtml(worker, "/review");
  const unavailableCard = cardElements(reviewHtml).find((html) => /data-state="unavailable"/.test(html));
  assert.ok(unavailableCard, "owner review renders an unavailable compact state");
  assert.match(
    unavailableCard,
    /<button\b(?=[^>]*\bdata-component="Button")(?=[^>]*\bdata-control-kind="button")(?=[^>]*\bdisabled(?:="")?)[^>]*>/,
  );
  assert.doesNotMatch(unavailableCard, /class="[^"]*(?:^|\s)button(?:\s|$)[^"]*"/);
  assert.match(
    reviewHtml,
    /<div\b(?=[^>]*\bdata-component="QuantityStepper")(?=[^>]*\bdata-state="unavailable")(?=[^>]*\baria-disabled="true")[^>]*>/,
  );
});
