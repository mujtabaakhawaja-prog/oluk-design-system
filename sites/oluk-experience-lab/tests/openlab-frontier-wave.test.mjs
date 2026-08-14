import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { CUSTOMER_ROUTES } from "../app/design-system/site-route-data.mjs";

const root = new URL("..", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");
const routePaths = new Set(CUSTOMER_ROUTES.map((route) => route.path));
const expected = [
  "/open-lab/evidence", "/open-lab/compound-guide", "/open-lab/stack-builder",
  "/open-lab/dosing-calculator", "/open-lab/cycle-planner", "/open-lab/interaction-checker",
  "/open-lab/coa/r28868", "/open-lab/research-papers", "/open-lab/case-studies",
  "/open-lab/glossary", "/open-lab/lab-partner",
];

test("registers the eleven OpenLab frontier routes as executable route truth", () => {
  for (const path of expected) assert.ok(routePaths.has(path), `missing ${path}`);
});

test("renders source-backed OpenLab tools and the canonical Stack Builder", () => {
  const source = read("app/design-system/openlab-frontier.tsx");
  const dynamicPage = read("app/open-lab/[tool]/page.tsx");
  for (const marker of ["EvidencePage", "CompoundGuide", "StackBuilder", "DesignIncompletePage", "CoaViewer"]) {
    assert.match(source, new RegExp(`function ${marker}`));
  }
  assert.match(source, /YourStackBuilder host="standalone"/);
  assert.match(source, /"stack-builder": "SITES_FROZEN"/);
  assert.doesNotMatch(source, /StackBuilderHandoff|StackOutcomeProfile|effectiveness score|evidence visibility/i);
  assert.doesNotMatch(dynamicPage, /SupportContent/);
  assert.match(dynamicPage, /OpenLabFrontierPage/);
});

test("classifies unfinished tools honestly instead of exposing fabricated outputs", () => {
  const source = read("app/design-system/openlab-frontier.tsx");
  for (const tool of ["dosing-calculator", "cycle-planner", "interaction-checker", "research-papers", "case-studies", "glossary", "lab-partner"]) {
    assert.match(source, new RegExp(`"?${tool}"?: "DESIGN_INCOMPLETE"`));
  }
  assert.doesNotMatch(source, /12 records|Registry coverage|Recorded result series|scheduled days|8-WEEK VIEW|840 MG|Common recomp pairing/);
});

test("uses compiler facts, canonical copy surfaces, and compact responsive treatments", () => {
  const source = read("app/design-system/openlab-frontier.tsx");
  const css = read("app/design-system/openlab-frontier.module.css");
  assert.match(source, /product-experience-catalog\.json/);
  assert.match(source, /openlab-product-depth\.json/);
  for (const surface of ["EditorialSurface", "DecisionSurface", "TechnicalSurface"]) assert.match(source, new RegExp(surface));
  assert.match(source, /GW-50156/);
  assert.doesNotMatch(source, /GW-501516|MK-677[^\n]+10 MG/);
  assert.match(source, /The MK-2866 record is never copied into another product/);
  assert.doesNotMatch(source, /compiler-owned|deterministic product catalogue|legacy URL|another product's proof/);
  assert.match(source, /Open original report/);
  assert.match(source, /Build a stronger stack/);
  assert.match(css, /@media\(max-width:600px\)/);
  assert.match(css, /overflow-x:auto/);
  assert.match(css, /min-height:44px/);
});

test("moves every frontier route out of the deferred OpenLab registry", () => {
  const registry = JSON.parse(read("../../authority/OPENLAB-SECTION-MODULE-REGISTRY.json"));
  assert.deepEqual(registry.deferredRoutes, []);
  const mounts = new Set(registry.modules.flatMap((module) => module.mounts));
  for (const path of expected.map((path) => path === "/open-lab/coa/r28868" ? "/open-lab/coa/:id" : path)) assert.ok(mounts.has(path), `missing module mount ${path}`);
});
