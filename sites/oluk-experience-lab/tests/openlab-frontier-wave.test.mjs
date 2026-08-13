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

test("renders distinct frontier experiences instead of one generic tool page", () => {
  const source = read("app/design-system/openlab-frontier.tsx");
  const dynamicPage = read("app/open-lab/[tool]/page.tsx");
  for (const marker of ["EvidencePage", "CompoundGuide", "StackBuilder", "Calculator", "CyclePlanner", "InteractionChecker", "ResearchPapers", "CaseStudies", "Glossary", "LabPartner", "CoaViewer"]) {
    assert.match(source, new RegExp(`function ${marker}`));
  }
  assert.doesNotMatch(dynamicPage, /SupportContent/);
  assert.match(dynamicPage, /OpenLabFrontierPage/);
});

test("shares the authored sidebar workspace across the four matching route patterns", () => {
  const source = read("app/design-system/openlab-frontier.tsx");
  assert.match(source, /function Workspace/);
  for (const active of ["dosing-calculator", "cycle-planner", "case-studies", "glossary"]) {
    assert.match(source, new RegExp(`active="${active}"`));
  }
});

test("preserves corrected product truth and compact responsive treatments", () => {
  const source = read("app/design-system/openlab-frontier.tsx");
  const css = read("app/design-system/openlab-frontier.module.css");
  assert.match(source, /RAD-140[^\n]+8 MG/);
  assert.match(source, /MK-2866[^\n]+15 MG/);
  assert.match(source, /90 SERVINGS/);
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
