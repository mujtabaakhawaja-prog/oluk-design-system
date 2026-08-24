import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { validateCompactionContract, validateTouchTargets } from "../scripts/proof/mobile-compaction-contract.mjs";

const siteRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),".."); const repoRoot=path.resolve(siteRoot,"../.."); const read=async(file)=>readFile(path.join(repoRoot,file),"utf8");
test("review studio exposes exactly twelve portable owner decisions",async()=>{const contract=JSON.parse(await read("authority/REVIEW-STUDIO-CONTRACT.json"));assert.equal(contract.families.length,6);assert.equal(contract.moduleGroups.length,5);assert.equal(contract.decisionCount,12);assert.equal(contract.runtimeAuthority,"NONE");const client=await read("sites/oluk-experience-lab/app/review-studio/review-studio-client.tsx");assert.match(client,/oluk\.champion-review\.v1/);assert.match(client,/URL\.createObjectURL/);assert.doesNotMatch(client,/localStorage|sessionStorage|fetch\(|XMLHttpRequest|WebSocket/i);});
test("studio is owner-only, noindex, and absent from customer navigation",async()=>{const routes=await read("sites/oluk-experience-lab/app/design-system/site-route-data.mjs");const layout=await read("sites/oluk-experience-lab/app/review-studio/layout.tsx");const experience=await read("sites/oluk-experience-lab/app/experience-lab.tsx");assert.match(routes,/review-studio.+owner-review/);assert.match(layout,/index:false,follow:false/);assert.doesNotMatch(experience,/href="\/review-studio"/);});
test("mobile contract rejects missing strategy, false reorder, and undersized targets",()=>{const valid={mobileStrategy:"reorder",mobileOrder:["b","a"],desktopOrder:["a","b"],scrollDepthWarningVh:12};assert.deepEqual(validateCompactionContract(valid),[]);assert.ok(validateCompactionContract({...valid,mobileStrategy:"unknown"}).length);assert.ok(validateCompactionContract({...valid,mobileOrder:["a","b"]}).some((failure)=>failure.includes("does not change")));assert.equal(validateTouchTargets([{width:43,height:44},{width:44,height:44},{width:50,height:30}],44).length,2);});
test("all program modules declare compaction and touch contracts",async()=>{const registry=JSON.parse(await read("authority/PROGRAM-COMPONENT-REGISTRY.json"));for(const component of registry.components){assert.ok(component.responsive.mobileStrategy);assert.equal(component.responsive.touchTargetPx,44);}});
test("review payload includes compiled OpenLab provenance without runtime authority",async()=>{const payload=JSON.parse(await read("sites/oluk-experience-lab/app/design-system/review-studio-payload.json"));assert.equal(payload.openLabExperience.sourceContract,"OpenLabPublicProjection.v2");assert.match(payload.openLabExperience.sourceHash,/^[a-f0-9]{64}$/);assert.equal(payload.openLabExperience.product,"mk-2866");assert.equal(payload.openLabExperience.chartPolicy,"numeric bars and source-owned tabular values only");});

test("MetricRail review specimens stay bounded, centered, and adaptive without narrowing the reusable rail", async () => {
  const [specimens, styles, globals] = await Promise.all([
    read("sites/oluk-experience-lab/app/review-studio/component-proof/component-proof-specimens.tsx"),
    read("sites/oluk-experience-lab/app/review-studio/component-proof/component-proof.module.css"),
    read("sites/oluk-experience-lab/app/globals.css"),
  ]);

  for (const state of ["default", "compact", "unavailable"]) {
    assert.match(specimens, new RegExp(`data-state="${state}"`));
  }

  assert.match(styles, /\.metricStack\s*\{[^}]*align-items:\s*flex-start[^}]*display:\s*flex[^}]*flex-wrap:\s*wrap[^}]*gap:\s*var\(--oluk-space-2\)[^}]*justify-content:\s*center/s);
  assert.match(styles, /\.metricSpecimen\s*\{[^}]*flex:\s*1 1 280px[^}]*inline-size:\s*100%[^}]*max-inline-size:\s*420px[^}]*min-inline-size:\s*0/s);
  assert.match(styles, /\.metricSpecimen :global\(\.metric-rail\)\s*\{[^}]*inline-size:\s*100%/s);
  assert.match(globals, /\.metric-rail > div\s*\{[^}]*align-items:\s*center[^}]*justify-content:\s*center/s);
  assert.match(globals, /@container \(max-width: 260px\)\s*\{[\s\S]*?\.metric-rail dt\s*\{[^}]*font-size:\s*11px[^}]*letter-spacing:\s*0\.01em/s);

  const reusableRail = globals.match(/\.metric-rail\s*\{([^}]*)\}/s)?.[1];
  assert.ok(reusableRail, "reusable MetricRail block is present");
  assert.doesNotMatch(reusableRail, /max-(?:inline-)?width/, "reusable MetricRail remains host-sized");
});
