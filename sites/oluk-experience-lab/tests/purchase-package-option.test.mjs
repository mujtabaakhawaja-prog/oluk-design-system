import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../app/design-system/purchase-panel.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../app/design-system/pdp-first-fold.module.css", import.meta.url), "utf8");
const nodeSource = JSON.parse(
  readFileSync(new URL("../../../authority/OLUK-DESIGN-NODE-SOURCE-V1.json", import.meta.url), "utf8"),
);

test("PurchasePackageOption is a registered semantic button with separate package and servings fields", () => {
  assert.match(source, /export function PurchasePackageOption/);
  assert.match(source, /<button[\s\S]*aria-pressed=\{selected\}[\s\S]*data-oluk-node="primitive\.purchase-package-option"/);
  assert.match(source, /data-oluk-node="field\.purchase\.package-count"/);
  assert.match(source, /data-oluk-node="field\.purchase\.total-servings"/);
  assert.match(source, /packageCount === 1 \? "BOTTLE" : "BOTTLES"/);
  assert.match(source, /\{totalServings\} SERVINGS/);
  assert.doesNotMatch(source, /90 CAPS|180 CAPS/);

  const node = nodeSource.nodes.find(({ id }) => id === "primitive.purchase-package-option");
  assert.ok(node);
  assert.equal(node.kind, "primitive");
  assert.equal(node.renderAs, "button");
  assert.equal(node.exportName, "PurchasePackageOption");
  assert.deepEqual(node.parentIds, ["component.purchase-configuration"]);
  assert.deepEqual(node.fieldIds, ["field.purchase.package-count", "field.purchase.total-servings"]);
  assert.deepEqual(node.states, ["selected", "unselected", "disabled", "focus-visible"]);
});

test("the two package options retain one equal-width row and a bounded focus-visible control", () => {
  assert.match(styles, /\.oluk-candidate-bottle-options[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(styles, /\.oluk-candidate-purchase-package-option\)[\s\S]*min-height: 56px[\s\S]*width: 100%/);
  assert.match(styles, /\.oluk-candidate-purchase-package-option:focus-visible\)/);
  assert.doesNotMatch(styles, /@media \(max-width: 390px\)[\s\S]*\.oluk-candidate-bottle-options[\s\S]*grid-template-columns: 1fr/);
});

test("package selection and the separate purchase quantity do not collapse into one field", () => {
  assert.match(source, /selectedBottleCount: 1 \| 2 = state === "quantity-changed" \? 2 : 1/);
  assert.match(source, /selectedBottleCount=\{presentation\.selectedBottleCount\}/);
  assert.match(source, /<QuantityStepper[\s\S]*value=\{quantity \?\? 1\}/);
});
