import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const designSystem = new URL("../app/design-system/", import.meta.url);

function luminance(hex) {
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((left, right) => right - left);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

function governedHex(tokens, name) {
  const match = tokens.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})\\s*;`, "i"));
  assert.ok(match, `candidate-tokens.css must declare a six-digit governed value for --${name}`);
  return match[1];
}

test("ActionControl is the sole canonical link and button source", async () => {
  const source = await readFile(new URL("action-control.tsx", designSystem), "utf8");
  const css = await readFile(new URL("action-control.module.css", designSystem), "utf8");
  const compatibility = await readFile(new URL("customer-route-primitives.tsx", designSystem), "utf8");

  for (const component of ["ActionControl", "ActionLink", "ActionButton"]) {
    assert.match(source, new RegExp(`export function ${component}\\b`));
  }
  for (const variant of ["primary", "secondary", "quiet"]) assert.match(source, new RegExp(`"${variant}"`));
  assert.match(source, /data-component="Button"/);
  assert.match(source, /data-control-kind="link"/);
  assert.match(source, /data-control-kind="button"/);
  assert.match(source, /data-figma-intent-source="1337:8963"/);
  assert.match(source, /data-variant=\{variant\}/);
  assert.doesNotMatch(source, /data-figma-node="1337:8963"/);
  assert.match(source, /aria-busy=/);
  assert.match(source, /aria-disabled=/);
  assert.match(source, /leadingIcon/);
  assert.match(source, /trailingIcon/);
  assert.match(source, /trailingIcon=\{unavailable \? undefined : trailingIcon\}/);
  assert.match(source, /pendingLabel/);
  assert.doesNotMatch(source, /"button button-secondary"/);
  assert.doesNotMatch(source, /&& "button"/);

  assert.match(css, /border-radius: var\(--oluk-radius-control\)/);
  assert.doesNotMatch(css, /border-radius: var\(--oluk-radius-pill\)/);
  assert.match(css, /min-height: 48px/);
  assert.match(css, /\.control\.quiet \{[\s\S]*?min-height: 44px/);
  assert.match(css, /\.control\.compact \{[\s\S]*?min-height: 44px/);
  assert.match(css, /overflow-wrap: anywhere/);
  assert.match(css, /@media \(max-width: 540px\)[\s\S]*?width: 100%/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.control:disabled,[\s\S]*?color: var\(--oluk-text-secondary\)/);
  assert.match(css, /\.control:disabled,[\s\S]*?background: var\(--oluk-surface-family\)/);
  assert.doesNotMatch(css, /\.control:disabled,[\s\S]*?color: var\(--oluk-text-disabled\)/);
  assert.doesNotMatch(css, /\.control:disabled,[\s\S]*?background: var\(--oluk-surface-subtle\)/);

  assert.match(compatibility, /export \{ ActionButton, ActionControl, ActionLink \} from "\.\/action-control"/);
  assert.doesNotMatch(compatibility, /function ActionLink\b/);
});

test("every ActionControl label treatment meets the AA 4.5 contrast floor", async () => {
  const tokens = await readFile(new URL("candidate-tokens.css", designSystem), "utf8");
  const cobalt = governedHex(tokens, "oluk-cobalt");
  const canvas = governedHex(tokens, "oluk-canvas");
  const card = governedHex(tokens, "oluk-surface-card");
  const family = governedHex(tokens, "oluk-surface-family");
  const secondary = governedHex(tokens, "oluk-text-secondary");
  const onInverse = governedHex(tokens, "oluk-text-on-inverse");
  const treatments = {
    primary: contrast(onInverse, cobalt),
    secondary: contrast(cobalt, card),
    quietOnCard: contrast(cobalt, card),
    quietOnCanvas: contrast(cobalt, canvas),
    disabled: contrast(secondary, family),
    pending: contrast(secondary, family),
  };
  for (const [treatment, ratio] of Object.entries(treatments)) {
    assert.ok(ratio >= 4.5, `${treatment} contrast ${ratio.toFixed(2)} must meet 4.5:1`);
  }
});

test("the surface grid exposes declared 12-column zones and a bounded canvas introduction", async () => {
  const source = await readFile(new URL("surface-grid.tsx", designSystem), "utf8");
  const css = await readFile(new URL("surface-grid.module.css", designSystem), "utf8");
  const specimen = await readFile(new URL("../review-studio/surface-grammar/page.tsx", designSystem), "utf8");

  assert.match(source, /data-grid-contract="12-column"/);
  assert.match(source, /data-grid-zone=\{zone\}/);
  assert.match(source, /data-canvas-exception="eyebrow-heading-only"/);
  assert.match(source, /data-copy-surface="section-introduction"/);
  assert.doesNotMatch(source, /copy\?:/);
  assert.doesNotMatch(source, /actions\?:/);
  assert.match(css, /repeat\(var\(--oluk-doc-grid-columns\), minmax\(0, 1fr\)\)/);
  assert.match(css, /\.full \{ grid-column: 1 \/ 13; \}/);
  assert.match(css, /\.pdp-media \{ grid-column: 1 \/ 8; \}/);
  assert.match(css, /\.pdp-purchase \{ grid-column: 8 \/ 13; \}/);
  assert.doesNotMatch(css, /\.introduction > span \{[^}]*(?:background|border|border-radius|padding):/);
  assert.match(css, /@media \(max-width: 700px\)/);
  assert.match(specimen, /data-grammar-strict="true"/);
  assert.match(specimen, /<ActionLink disabled href="\/shop">Unavailable link<\/ActionLink>/);
  assert.match(specimen, /A deliberately long quiet action label that remains readable at 390/);
});

test("the PDP media and purchase pair is the only declared surface exception", async () => {
  const firstFold = await readFile(new URL("pdp-first-fold.tsx", designSystem), "utf8");
  assert.match(firstFold, /data-surface-exception="pdp-media-purchase-decision-pair"/);
  assert.match(firstFold, /<PurchasePanel/);
});
