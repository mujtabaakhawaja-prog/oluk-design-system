import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../app/workbench/page.tsx", import.meta.url), "utf8");
const viteConfig = readFileSync(new URL("../vite.config.ts", import.meta.url), "utf8");
const client = readFileSync(new URL("../app/workbench/visual-workbench-client.tsx", import.meta.url), "utf8");
const bridge = readFileSync(new URL("../app/workbench/design-inspect-bridge.tsx", import.meta.url), "utf8");
const types = readFileSync(new URL("../app/workbench/workbench-types.ts", import.meta.url), "utf8");
const messageContract = JSON.parse(readFileSync(new URL("../../../authority/generated/OLUK-WORKBENCH-MESSAGE-V1.json", import.meta.url), "utf8"));
const nodeContract = JSON.parse(readFileSync(new URL("../../../authority/generated/OLUK-DESIGN-NODE-CONTRACT-V1.json", import.meta.url), "utf8"));

test("Visual Workbench is an explicitly enabled loopback-only owner route", () => {
  assert.match(viteConfig, /process\.env\.OLUK_VISUAL_WORKBENCH === "1"/);
  assert.match(viteConfig, /__OLUK_VISUAL_WORKBENCH_ENABLED__/);
  assert.match(page, /__OLUK_VISUAL_WORKBENCH_ENABLED__/);
  assert.match(page, /127\.0\.0\.1/);
  assert.match(page, /localhost/);
  assert.match(page, /public and production hosts fail closed/);
  assert.match(page, /notFound\(\)/);
  assert.doesNotMatch(page, /SiteHeader|CustomerSiteChrome|SiteFooter/);
});

test("Workbench consumes the generated producer contracts without redefining them", () => {
  assert.match(page, /OLUK-DESIGN-NODE-CONTRACT-V1\.json/);
  assert.match(page, /OLUK-DESIGN-CONNECT-V1\.json/);
  assert.match(page, /OLUK-WORKBENCH-MESSAGE-V1\.json/);
  assert.match(page, /OLUK-DESIGN-PATCH-V1\.schema\.json/);
  assert.match(page, /OLUK-VISUAL-WORKBENCH-DIGESTS-V1\.json/);
  assert.match(types, /OLUK_DESIGN_NODE_CONTRACT_V1/);
  assert.equal(nodeContract.contract, "OLUK_DESIGN_NODE_CONTRACT_V1");
});

test("Workbench bridge uses the exact message vocabulary and strict origin targets", () => {
  const eventNames = messageContract.events.map((event) => event.type);
  assert.deepEqual(eventNames, [
    "node.select",
    "node.highlight",
    "node.parents",
    "projection.change",
    "viewport.change",
    "state.change",
    "annotation.create",
    "annotation.resolve",
    "capture.request",
  ]);
  assert.match(client, /bundle\.messageContract\.events\.map\(\(event\) => event\.type\)/);
  assert.match(client, /http:\/\/127\.0\.0\.1:4193/);
  assert.match(client, /http:\/\/127\.0\.0\.1:4191/);
  assert.match(client, /allowedOrigins\.has\(event\.origin\)/);
  assert.match(client, /event\.source !== iframeRef\.current\?\.contentWindow/);
  assert.match(client, /postMessage\([\s\S]*PREVIEW_TARGETS\[target\]/);
  assert.doesNotMatch(client, /postMessage\([\s\S]*,\s*["']\*["']/);
});

test("Workbench provides semantic-first inspection, exact annotations, and read-only patches", () => {
  for (const field of ["nodeId", "routeId", "viewport", "state", "digest", "text"]) assert.match(client, new RegExp(field));
  assert.match(client, /Semantic/);
  assert.match(client, /Raw DOM/);
  assert.match(client, /READ_ONLY_PREVIEW/);
  assert.match(client, /writeCapability: "NONE"/);
  assert.match(client, /No apply action exists/);
  assert.doesNotMatch(client, /fetch\s*\(/);
  assert.doesNotMatch(client, /XMLHttpRequest|localStorage|sessionStorage|WebSocket/);
  assert.doesNotMatch(client, /applyPatch|writeFile|sourceWrite|commerceMutation/);
});

test("Sites inspection bridge is semantic, origin-bound, and read only", () => {
  assert.match(bridge, /data-oluk-node/);
  assert.match(bridge, /document\.referrer/);
  assert.match(bridge, /WORKBENCH_ORIGINS\.has\(parentOrigin\)/);
  assert.match(bridge, /event\.source !== window\.parent/);
  assert.match(bridge, /node\.select/);
  assert.match(bridge, /node\.parents/);
  assert.doesNotMatch(bridge, /fetch\s*\(|XMLHttpRequest|WebSocket|writeFile|applyPatch/);
});
