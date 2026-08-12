import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appRoot = new URL("../app/", import.meta.url);

const routes = [
  ["bag", "bag"],
  ["checkout", "checkout-details"],
  ["checkout/delivery", "checkout-delivery"],
  ["checkout/payment-handoff", "payment-handoff"],
  ["checkout/order-pay", "order-pay"],
  ["checkout/confirmation", "confirmation"],
  ["checkout/failure", "failure"],
  ["checkout/retry", "retry"],
];

test("MF-07 route pages form one static transaction lifecycle", async () => {
  for (const [pathname, route] of routes) {
    const source = await readFile(new URL(`${pathname}/page.tsx`, appRoot), "utf8");
    assert.match(source, new RegExp(`<ExperienceLab\\s+route="${route}"\\s*/>`), pathname);
  }
});

test("transaction presentation preserves exact MK-2866 truth and deterministic inert actions", async () => {
  const source = await readFile(new URL("design-system/transaction-presentation.tsx", appRoot), "utf8");

  for (const truth of [
    "mk2866Fixture.series",
    "mk2866Fixture.name",
    "mk2866Fixture.alias",
    "mk2866Fixture.price",
    "mk2866Fixture.evidencePath",
  ]) {
    assert.match(source, new RegExp(truth.replace(".", "\\.")), truth);
  }

  assert.match(source, /<MetricRail compact product=\{mk2866Fixture\}\s*\/>/);
  assert.match(source, /data-live-authority="false"/);
  assert.match(source, /<button[^>]*disabled[^>]*>Pay \{mk2866Fixture\.price\}<\/button>/);
  assert.doesNotMatch(source, /fetch\s*\(|axios|XMLHttpRequest|use server|server action|woocommerce|stripe|biaspay|initiator|tools-service|C2/i);
  assert.doesNotMatch(source, /90 CAPS(?:\b|ULES)|£43\.00|<del\b/i);
});

test("transaction lifecycle connects bag through recovery without customer-facing control vocabulary", async () => {
  const source = await readFile(new URL("design-system/transaction-presentation.tsx", appRoot), "utf8");
  const expectedPaths = [
    "/bag",
    "/checkout",
    "/checkout/delivery",
    "/checkout/payment-handoff",
    "/checkout/order-pay",
    "/checkout/confirmation",
    "/checkout/failure",
    "/checkout/retry",
  ];

  for (const path of expectedPaths) assert.match(source, new RegExp(path.replaceAll("/", "\\/")), path);
  for (const forbidden of ["HUMAN_REVIEW_REQUIRED", "DESIGN FIXTURE", "DEMO STATE", "NOT CONNECTED", "RUNTIME OWNER", "SOURCE-BOUND"]) {
    assert.doesNotMatch(source, new RegExp(forbidden, "i"), forbidden);
  }
});

test("transaction layout recomposes without overflow clipping", async () => {
  const css = await readFile(new URL("transaction-presentation.module.css", appRoot), "utf8");
  assert.match(css, /\.layout,[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\)/);
  assert.match(css, /@media \(max-width: 980px\)[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.fieldGrid,[\s\S]*?grid-template-columns:\s*1fr/);
  assert.doesNotMatch(css, /overflow-x:\s*(?:clip|hidden)/i);
});
