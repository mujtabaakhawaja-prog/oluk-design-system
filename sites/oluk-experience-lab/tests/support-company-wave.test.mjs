import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

import { auditRenderedCopySurfaces } from "../scripts/proof/customer-surface-grammar.mjs";
import { loadBuiltWorker, renderHtml, visibleText } from "../scripts/proof/rendered-audit-utils.mjs";

const supportSource = readFileSync(new URL("../app/design-system/support-surface.tsx", import.meta.url), "utf8");
const supportCss = readFileSync(new URL("../app/design-system/support-surface.module.css", import.meta.url), "utf8");
const programSource = readFileSync(new URL("../app/design-system/program-components.tsx", import.meta.url), "utf8");
const tokenSource = readFileSync(new URL("../app/design-system/candidate-tokens.css", import.meta.url), "utf8");

function readTsxTree(directory) {
  return readdirSync(directory, { withFileTypes: true }).map((entry) => {
    const child = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    if (entry.isDirectory()) return readTsxTree(child);
    return entry.name.endsWith(".tsx") ? readFileSync(child, "utf8") : "";
  }).join("\n");
}

const renderedAppSource = readTsxTree(new URL("../app/", import.meta.url));

function tokenHex(name) {
  const match = tokenSource.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})\\s*;`, "i"));
  assert.ok(match, `${name}: governed six-digit color exists`);
  return match[1];
}

function luminance(hex) {
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((left, right) => right - left);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

const routes = new Map([
  ["/about", ["Quality, made visible at every product decision.", "Evidence adds another dimension", "Check relationship availability"]],
  ["/about/evidence-os", ["Turn product evidence into customer confidence.", "Source Reported", "Open the MK-2866 dossier"]],
  ["/faq", ["Find the answer, then get back to the decision.", "Where can I find batch information?", "Browse products"]],
  ["/faq-help-centre", ["Find the answer, then get back to the decision.", "Source Reported", "View your orders"]],
  ["/contact", ["Start with the question that needs answering.", "Start from the order.", "Find a batch"]],
  ["/delivery", ["Choose delivery with the order in view.", "Delivery choices appear", "Track an order"]],
  ["/shipping-returns", ["Keep the order clear from checkout to resolution.", "Return and refund guidance begins", "Read refund guidance"]],
  ["/international", ["Start with the destination, then review the order.", "review the products, delivery and total", "Browse products"]],
  ["/gift-cards", ["Gift card purchase is not available here yet.", "Compare products", "Explore OpenLab"]],
  ["/privacy", ["Read the published information behind your customer experience.", "Read the privacy policy", "View your orders"]],
  ["/terms", ["Read the published terms behind your order.", "Read the terms and conditions", "View your orders"]],
  ["/cookies", ["Read the published privacy information", "A preference manager is not available", "Open the sitemap"]],
  ["/refunds", ["Start with the order, then see the next step clearly.", "Eligibility, timing and amount are confirmed", "Open the help centre"]],
  ["/legal/privacy", ["Read the published information behind your customer experience.", "Source document", "View your orders"]],
  ["/legal/terms", ["Read the published terms behind your order.", "Source document", "View your orders"]],
  ["/legal/cookies", ["Cookie information", "Read the privacy policy", "Open the sitemap"]],
  ["/sitemap", ["Go straight to the decision you came to make.", "Find the confidence behind a product.", "Browse products"]],
  ["/wholesale", ["Begin a wholesale conversation with product clarity.", "Explore OpenLab", "Commercial terms stay specific"]],
]);

function supportMain(html, path) {
  const match = html.match(/<main\b[^>]*data-support-surface=["'][^"']+["'][^>]*>[\s\S]*?<\/main>/i);
  assert.ok(match, `${path}: governed support main exists`);
  return match[0];
}

test("support and company routes resolve uncertainty and return to a customer decision", async () => {
  const worker = await loadBuiltWorker("support-company-wave");
  for (const [path, required] of routes) {
    const html = await renderHtml(worker, path, 200);
    const main = supportMain(html, path);
    const text = visibleText(main);
    for (const phrase of required) assert.ok(text.includes(phrase), `${path}: ${phrase}`);
    assert.doesNotMatch(text, /\b(?:route|module|fixture|workspace|component|implementation|data owner|presentation)\b/i, path);
    assert.match(main, /href=["']\/(?:shop|product|compare|open-lab|account|checkout|contact|faq|refunds|sitemap|wholesale)/i, `${path}: onward customer link`);
    assert.match(main, /data-component=["']Button["']/, `${path}: canonical action control`);
    assert.match(main, /data-figma-intent-source=["']1337:8963["']/, `${path}: canonical action provenance`);
    assert.doesNotMatch(main, /class=["'][^"']*\bbutton(?:-secondary)?\b/i, `${path}: no legacy button class`);
  }
});

test("every support and company heading or paragraph stays inside a governed copy surface", async () => {
  const worker = await loadBuiltWorker("support-company-copy-surfaces");
  for (const path of routes.keys()) {
    const main = supportMain(await renderHtml(worker, path, 200), path);
    const copyGroups = auditRenderedCopySurfaces(main);
    const loose = copyGroups.filter((group) => group.status === "LOOSE_CANVAS_COPY");
    assert.deepEqual(loose, [], `${path}: ${JSON.stringify(loose)}`);
    assert.ok(copyGroups.length >= 4, `${path}: meaningful governed copy coverage`);
  }
});

test("support work uses canonical surfaces, product anatomy and customer-safe evidence labels", async () => {
  assert.match(supportSource, /EditorialSurface/);
  assert.match(supportSource, /DecisionSurface/);
  assert.match(supportSource, /TechnicalSurface/);
  assert.match(supportSource, /ProductCommerceCard/);
  assert.doesNotMatch(supportSource, /<article\b|page-hero|support-surface-grid|support-guide/);

  const worker = await loadBuiltWorker("support-company-evidence-states");
  const text = visibleText(supportMain(await renderHtml(worker, "/about/evidence-os", 200), "/about/evidence-os"));
  for (const label of ["Source Reported", "Source Only", "Unavailable"]) {
    assert.ok(text.includes(label), label);
    assert.match(programSource, new RegExp(`"${label}"`));
  }
  assert.match(text, /available record/i);
  assert.doesNotMatch(text, /Verified Evidence|OPENLAB VERIFIED/i);
  assert.match(programSource, /"verified-evidence": "Source Reported"/);
  assert.doesNotMatch(programSource, /"verified-evidence": "Verified Evidence"/);
  assert.doesNotMatch(text, /£43|\bIN STOCK\b|Third-Party Tested/i);
  assert.doesNotMatch(text, /Verified evidence|Source reported|Source only/);
  assert.doesNotMatch(renderedAppSource, /Verified evidence|Source reported|Source only/);
});

test("support styles preserve governed type, color and action laws", () => {
  assert.doesNotMatch(supportCss, /#[0-9a-f]{3,8}\b/i);
  for (const match of supportCss.matchAll(/font-family\s*:\s*([^;]+)/gi)) {
    assert.ok(match[1].trim().startsWith("var("), match[0]);
  }
  assert.doesNotMatch(supportCss, /font-size\s*:\s*(?:[0-9]|1[0-1])px/i);
  assert.doesNotMatch(supportCss, /color\s*:\s*var\(--oluk-text-muted\)/);
  assert.doesNotMatch(supportCss, /border-radius\s*:\s*999px/);
  assert.match(supportSource, /import \{ ActionLink \} from "\.\/action-control"/);
  assert.match(supportSource, /<ActionLink\b/);
  assert.doesNotMatch(supportSource, /className=["']button|button-secondary|<a\b|<button\b|next\/link/);

  const surfaces = [tokenHex("oluk-surface-card"), tokenHex("oluk-surface-family"), tokenHex("oluk-canvas")];
  for (const textToken of ["oluk-text-primary", "oluk-text-body", "oluk-text-secondary"]) {
    for (const surface of surfaces) {
      assert.ok(contrast(tokenHex(textToken), surface) >= 4.5, `${textToken} must remain AA on ${surface}`);
    }
  }
});

test("support copy does not manufacture legal, delivery or service detail", () => {
  assert.doesNotMatch(supportSource, /\b(?:next-day|same-day|business days?|free shipping|guaranteed delivery|refund within|return window|minimum order|wholesale price)\b/i);
  assert.match(supportSource, /Delivery choices appear after you enter a destination/);
  assert.match(supportSource, /Eligibility, timing and amount are confirmed through support using those details/);
  assert.match(supportSource, /A preference manager is not available on this page/);
  assert.match(supportSource, /Gift card purchase is not available here yet/);
});

test("support copy uses customer production language rather than audit disclaimers", () => {
  assert.doesNotMatch(supportSource, /customer-facing|does not (?:invent|assume|claim)|without (?:inventing|assuming)|unsupported (?:general )?(?:promise|service)|no destination coverage|intentionally not presented|this customer destination/i);
});

test("public delivery and refund guidance do not masquerade as active checkout steps", async () => {
  const worker = await loadBuiltWorker("support-company-context-navigation");
  for (const path of ["/delivery", "/shipping-returns", "/international", "/refunds"]) {
    const html = await renderHtml(worker, path, 200);
    assert.doesNotMatch(html, /data-component=["']CheckoutStepIndicator\.Context["']/, path);
  }
  assert.match(supportCss, /summary::-webkit-details-marker/);
  assert.match(supportCss, /\.aboutProduct\s+:global\(\.qualitative-chips\)[^{]*\{[^}]*grid-template-columns:\s*1fr/s);
});
