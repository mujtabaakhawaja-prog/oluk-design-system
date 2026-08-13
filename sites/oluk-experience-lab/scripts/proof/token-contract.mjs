#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const repositoryRoot = path.resolve(siteRoot, "../..");
const tokenCssPath = path.join(siteRoot, "app/design-system/candidate-tokens.css");
const surfaceContractPath = path.join(repositoryRoot, "authority/surface-contract.md");
const currentStatePath = path.join(repositoryRoot, "authority/CURRENT-STATE.json");

const semanticCssMap = Object.freeze({
  "surface/canvas": ["--oluk-canvas", "#f7f8fc"],
  "surface/card": ["--oluk-surface-card", "#ffffff"],
  "surface/family": ["--oluk-surface-family", "#f8fafc"],
  "surface/media": ["--oluk-surface-media", "#f0f4fb"],
  "surface/cobalt-soft": ["--oluk-surface-cobalt-soft", "#eef4ff"],
  "surface/inverse": ["--oluk-inverse", "#141827"],
  "border/card": ["--oluk-border-card", "rgba(206,220,241,0.92)"],
  "border/strong": ["--oluk-border-strong", "#afc8ff"],
  "border/family": ["--oluk-border-family", "#d2e4ff"],
  "border/chip": ["--oluk-border-chip", "#d4e0f2"],
  "border/outer": ["--oluk-border-outer", "#becfe9"],
  "border/identity": ["--oluk-border-identity", "#bdd0f1"],
  "border/inner": ["--oluk-border-inner", "#b4caf0"],
  "border/family-bg": ["--oluk-border-family-bg", "#d9e3f1"],
  "text/primary": ["--oluk-text-primary", "#141827"],
  "text/secondary": ["--oluk-text-secondary", "#53617d"],
  "text/muted": ["--oluk-text-muted", "#64718a"],
  "text/on-inverse": ["--oluk-text-on-inverse", "#ffffff"],
  "text/on-inverse-muted": ["--oluk-text-on-inverse-muted", "#b9c7dd"],
  "text/chip-value": ["--oluk-text-chip-value", "#17213f"],
  "accent/cobalt": ["--oluk-cobalt", "#0057ff"],
  "accent/cobalt-interactive": ["--oluk-cobalt-alt", "#256dff"],
  "accent/cobalt-focus": ["--oluk-cobalt-focus", "rgba(0,87,255,0.28)"],
  "status/inventory": ["--oluk-inventory-green", "#15803d"],
  "status/inventory-soft": ["--oluk-inventory-green-soft", "#ecfdf3"],
});

const dimensionCssMap = Object.freeze({
  "space/1": ["--oluk-space-1", "4px", "GAP"],
  "space/2": ["--oluk-space-2", "8px", "GAP"],
  "space/3": ["--oluk-space-3", "12px", "GAP"],
  "space/4": ["--oluk-space-4", "16px", "GAP"],
  "space/5": ["--oluk-space-5", "20px", "GAP"],
  "space/6": ["--oluk-space-6", "24px", "GAP"],
  "space/8": ["--oluk-space-8", "32px", "GAP"],
  "space/10": ["--oluk-space-10", "40px", "GAP"],
  "space/12": ["--oluk-space-12", "48px", "GAP"],
  "space/16": ["--oluk-space-16", "64px", "GAP"],
  "space/18": ["--oluk-space-18", "72px", "GAP"],
  "space/24": ["--oluk-space-24", "96px", "GAP"],
  "border/width": ["--oluk-border-width", "1px", "STROKE_FLOAT"],
  "divider/width": ["--oluk-divider-width", "2px", "STROKE_FLOAT"],
  "focus/width": ["--oluk-focus-width", "2px", "STROKE_FLOAT"],
  "radius/control": ["--oluk-radius-control", "8px", "CORNER_RADIUS"],
  "radius/chip": ["--oluk-radius-chip", "10px", "CORNER_RADIUS"],
  "radius/metric": ["--oluk-radius-metric", "12px", "CORNER_RADIUS"],
  "radius/compact": ["--oluk-radius-compact", "20px", "CORNER_RADIUS"],
  "radius/vertical": ["--oluk-radius-vertical", "24px", "CORNER_RADIUS"],
  "radius/purchase": ["--oluk-radius-purchase", "28px", "CORNER_RADIUS"],
  "radius/horizontal": ["--oluk-radius-horizontal", "34px", "CORNER_RADIUS"],
  "radius/pill": ["--oluk-radius-pill", "999px", "CORNER_RADIUS"],
  "layout/content-max": ["--oluk-content-max", "1344px", "WIDTH_HEIGHT"],
  "layout/grid-gap": ["--oluk-grid-gap", "20px", "GAP"],
  "layout/gutter-desktop": ["--oluk-page-gutter-desktop", "48px", "GAP"],
  "layout/gutter-tablet": ["--oluk-page-gutter-tablet", "32px", "GAP"],
  "layout/gutter-mobile": ["--oluk-page-gutter-mobile", "16px", "GAP"],
});

const typographyCssMap = Object.freeze({
  "family/display": ["--oluk-font-display", '"Plus Jakarta Sans", sans-serif', "FONT_FAMILY"],
  "family/body": ["--oluk-font-body", '"Inter", sans-serif', "FONT_FAMILY"],
  "display/xl/size": ["--oluk-type-display-xl-size", "56px", "FONT_SIZE"],
  "display/xl/line": ["--oluk-type-display-xl-line", "60px", "LINE_HEIGHT"],
  "display/xl/track": ["--oluk-type-display-xl-track", "-4px", "LETTER_SPACING"],
  "display/lg/size": ["--oluk-type-display-lg-size", "40px", "FONT_SIZE"],
  "display/lg/line": ["--oluk-type-display-lg-line", "44px", "LINE_HEIGHT"],
  "display/lg/track": ["--oluk-type-display-lg-track", "-3.2px", "LETTER_SPACING"],
  "display/md/size": ["--oluk-type-display-md-size", "28px", "FONT_SIZE"],
  "display/md/line": ["--oluk-type-display-md-line", "34px", "LINE_HEIGHT"],
  "display/md/track": ["--oluk-type-display-md-track", "-2.4px", "LETTER_SPACING"],
  "body/lg/size": ["--oluk-type-body-lg-size", "18px", "FONT_SIZE"],
  "body/lg/line": ["--oluk-type-body-lg-line", "28px", "LINE_HEIGHT"],
  "body/md/size": ["--oluk-type-body-size", "16px", "FONT_SIZE"],
  "body/md/line": ["--oluk-type-body-line", "24px", "LINE_HEIGHT"],
  "body/sm/size": ["--oluk-type-body-sm-size", "15px", "FONT_SIZE"],
  "body/sm/line": ["--oluk-type-body-sm-line", "22px", "LINE_HEIGHT"],
  "label/size": ["--oluk-type-label-size", "13px", "FONT_SIZE"],
  "label/line": ["--oluk-type-label-line", "18px", "LINE_HEIGHT"],
  "eyebrow/size": ["--oluk-type-eyebrow-size", "12px", "FONT_SIZE"],
  "eyebrow/line": ["--oluk-type-eyebrow-line", "16px", "LINE_HEIGHT"],
  "eyebrow/track": ["--oluk-type-eyebrow-track", "0.12em", "LETTER_SPACING"],
});

function normalizeCssValue(value) {
  return value.toLowerCase().replace(/\s+/g, "").replace(/0?\.(\d+)/g, "0.$1");
}

function parseCssVariables(css) {
  return Object.fromEntries(
    [...css.matchAll(/(--oluk-[a-z0-9-]+)\s*:\s*([^;]+);/gi)].map((match) => [match[1], match[2].trim()]),
  );
}

function parseTable(section) {
  return [...section.matchAll(/^\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|\s*`(VariableID:[^`]+)`\s*\|$/gm)].map((match) => ({
    name: match[1],
    valueOrAlias: match[2],
    figmaId: match[3],
  }));
}

function parseGovernedTable(section) {
  return [...section.matchAll(/^\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|\s*`(VariableID:[^`]+)`\s*\|$/gm)].map((match) => ({
    name: match[1],
    rawValue: match[2],
    scope: match[3],
    webSyntax: match[4],
    figmaId: match[5],
  }));
}

function getSection(markdown, startHeading, endHeading) {
  const start = markdown.indexOf(startHeading);
  const end = markdown.indexOf(endHeading, start + startHeading.length);
  assert.notEqual(start, -1, `missing ${startHeading}`);
  assert.notEqual(end, -1, `missing ${endHeading}`);
  return markdown.slice(start, end);
}

export async function buildTokenManifest() {
  const [css, surfaceContract, currentStateSource] = await Promise.all([
    readFile(tokenCssPath, "utf8"),
    readFile(surfaceContractPath, "utf8"),
    readFile(currentStatePath, "utf8"),
  ]);
  const currentState = JSON.parse(currentStateSource);
  const cssVariables = parseCssVariables(css);
  const primitives = parseTable(getSection(surfaceContract, "### Color Primitives (23 variables)", "### Color Semantics (25 variables)"));
  const semantics = parseTable(getSection(surfaceContract, "### Color Semantics (25 variables)", "### Dimensions (28 variables)"));
  const dimensions = parseGovernedTable(getSection(surfaceContract, "### Dimensions (28 variables)", "### Typography (22 variables)"));
  const typography = parseGovernedTable(getSection(surfaceContract, "### Typography (22 variables)", "## Review and promotion"));

  assert.equal(currentState.variables.keepAndExtend.variableCount, 98, "current-state active variable count");
  assert.equal(primitives.length, 23, "primitive color inventory");
  assert.equal(semantics.length, 25, "semantic color inventory");
  assert.equal(dimensions.length, 28, "dimension inventory");
  assert.equal(typography.length, 22, "typography inventory");
  assert.equal(new Set([...primitives, ...semantics, ...dimensions, ...typography].map(({ figmaId }) => figmaId)).size, 98, "all active Figma IDs must be unique");
  assert.deepEqual(new Set(semantics.map(({ name }) => name)), new Set(Object.keys(semanticCssMap)), "semantic CSS mapping must cover all 25 color aliases");
  assert.deepEqual(new Set(dimensions.map(({ name }) => name)), new Set(Object.keys(dimensionCssMap)), "dimension CSS mapping must cover all 28 variables");
  assert.deepEqual(new Set(typography.map(({ name }) => name)), new Set(Object.keys(typographyCssMap)), "typography CSS mapping must cover all 22 variables");

  const semanticMappings = semantics.map((entry) => {
    const [cssProperty, expectedValue] = semanticCssMap[entry.name];
    const cssValue = cssVariables[cssProperty];
    assert.ok(cssValue, `${entry.name} is missing ${cssProperty}`);
    assert.equal(normalizeCssValue(cssValue), normalizeCssValue(expectedValue), `${entry.name} CSS value`);
    return { ...entry, cssProperty, cssValue };
  });

  function mapGovernedCss(entry, contract) {
    const [cssProperty, expectedValue, expectedScope] = contract[entry.name];
    const cssValue = cssVariables[cssProperty];
    assert.ok(cssValue, `${entry.name} is missing ${cssProperty}`);
    assert.equal(normalizeCssValue(cssValue), normalizeCssValue(expectedValue), `${entry.name} CSS value`);
    assert.equal(entry.scope, expectedScope, `${entry.name} Figma scope`);
    assert.equal(entry.webSyntax, `var(${cssProperty})`, `${entry.name} WEB syntax`);
    return { ...entry, cssProperty, cssValue, hiddenFromPublishing: true };
  }

  const dimensionMappings = dimensions.map((entry) => mapGovernedCss(entry, dimensionCssMap));
  const typographyMappings = typography.map((entry) => mapGovernedCss(entry, typographyCssMap));

  assert.equal(cssVariables["--oluk-media-gradient"], "linear-gradient(70deg, #f8fbff 5%, #e4ecfa 100%)");
  assert.equal(cssVariables["--oluk-media-contact-shelf-gradient"], "linear-gradient(180deg, #ffffff 0%, #e6edfa 100%)");

  return {
    schemaVersion: "oluk.governed-token-manifest.v1",
    status: "CANDIDATE_HUMAN_REVIEW_REQUIRED_UNPUBLISHED",
    authority: {
      currentState: "authority/CURRENT-STATE.json",
      surfaceContract: "authority/surface-contract.md#appendix-c--conv-002-complete-convergence-palette-98-variables",
      figmaFileKey: "BEPMuUt1HroEw8xjz8CVyN",
    },
    collections: [
      { name: "Color Primitives", figmaCollectionId: "VariableCollectionId:634:2", variableCount: 23, individualInventory: "complete" },
      { name: "Color Semantics", figmaCollectionId: "VariableCollectionId:634:20", variableCount: 25, individualInventory: "complete" },
      { name: "Dimensions", figmaCollectionId: "VariableCollectionId:634:40", variableCount: 28, individualInventory: "complete" },
      { name: "Typography", figmaCollectionId: "VariableCollectionId:634:69", variableCount: 22, individualInventory: "complete" },
    ],
    figmaActiveVariableCount: 98,
    individuallyDocumentedFigmaVariableCount: 98,
    remainingIndividualFigmaVariablesToDocument: 0,
    colorPrimitives: primitives,
    colorSemantics: semanticMappings,
    dimensions: dimensionMappings,
    typography: typographyMappings,
    governedLiteralGradientExceptions: [
      { cssProperty: "--oluk-media-gradient", value: cssVariables["--oluk-media-gradient"], decision: "DEC-MEDIA-001/002/003" },
      { cssProperty: "--oluk-media-contact-shelf-gradient", value: cssVariables["--oluk-media-contact-shelf-gradient"], decision: "DEC-MEDIA-003" },
    ],
    cssCustomProperties: Object.fromEntries(Object.entries(cssVariables).sort(([left], [right]) => left.localeCompare(right))),
  };
}

function option(name) {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const manifest = await buildTokenManifest();
  const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
  const writeTarget = option("write");
  const checkTarget = option("check");
  if (writeTarget) await writeFile(path.resolve(writeTarget), serialized);
  if (checkTarget) assert.equal(await readFile(path.resolve(checkTarget), "utf8"), serialized, `${checkTarget} is stale; regenerate with --write`);
  process.stdout.write(`${JSON.stringify({ status: "PASS", figmaActiveVariableCount: manifest.figmaActiveVariableCount, documented: manifest.individuallyDocumentedFigmaVariableCount, pendingIndividualInventory: manifest.remainingIndividualFigmaVariablesToDocument, cssCustomPropertyCount: Object.keys(manifest.cssCustomProperties).length }, null, 2)}\n`);
}
