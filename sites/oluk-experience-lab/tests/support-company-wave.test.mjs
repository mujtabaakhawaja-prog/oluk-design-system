import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { loadBuiltWorker, renderHtml, visibleText } from "../scripts/proof/rendered-audit-utils.mjs";

const supportSource = readFileSync(new URL("../app/design-system/support-surface.tsx", import.meta.url), "utf8");

test("support and company surfaces lead with a usable customer next step", async () => {
  const worker = await loadBuiltWorker("support-company-wave");
  const expectations = new Map([
    ["/about", ["Quality, made visible.", "Build every product decision with the important detail in view.", "Build a stack"]],
    ["/faq-help-centre", ["Find the answer, then get back to the decision.", "Where can I find batch information?", "Verified Evidence"]],
    ["/contact", ["Start with the question that needs answering.", "Order support", "Wholesale"]],
    ["/delivery", ["Choose delivery with the order in view.", "Set the destination", "Track an order"]],
    ["/privacy", ["Read the information behind your customer experience.", "Read the privacy policy", "Open help centre"]],
    ["/terms", ["Read the terms behind your order.", "Read the terms and conditions", "Open help centre"]],
    ["/shipping-returns", ["Keep the order clear from checkout to the next step.", "Choose delivery", "View refund guidance"]],
  ]);

  for (const [path, required] of expectations) {
    const text = visibleText(await renderHtml(worker, path, 200));
    for (const phrase of required) assert.ok(text.includes(phrase), `${path}: ${phrase}`);
    assert.doesNotMatch(text, /\b(?:workspace|fixture|proof|presentation|component)\b/i, path);
  }
});

test("support surfaces preserve the four evidence labels and link only to declared customer destinations", () => {
  for (const label of ["Verified Evidence", "Source Reported", "Source Only", "Unavailable"]) assert.match(supportSource, new RegExp(label));
  assert.doesNotMatch(supportSource, /checkout\/refund/);
  assert.match(supportSource, /support-faq/);
  assert.match(supportSource, /export function AboutExperience/);
  assert.match(supportSource, /export function PolicyBridge/);
});
