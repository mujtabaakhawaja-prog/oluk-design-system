import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const siteRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const repoRoot=path.resolve(siteRoot,"../..");
const readSite=(file)=>readFile(path.join(siteRoot,file),"utf8");

test("OpenLab core is a declared canonical module system",async()=>{const registry=JSON.parse(await readFile(path.join(repoRoot,"authority/OPENLAB-SECTION-MODULE-REGISTRY.json"),"utf8"));assert.equal(registry.runtimeAuthority,"NONE");assert.equal(registry.canonicalNamespace,"/open-lab");assert.ok(registry.modules.length>=18);assert.deepEqual(registry.ownerOnlyRoutes,["/open-lab/admin"]);assert.deepEqual(registry.deferredRoutes,[]);for(const entry of registry.modules){assert.ok(entry.export);assert.ok(entry.dataOwner);assert.ok(entry.mounts.length);assert.ok(entry.mobileStrategy);assert.ok(entry.runtimeExclusions.length);}});

test("P0 and P1 OpenLab routes mount canonical section exports",async()=>{const route=await readSite("app/customer-routes.tsx");for(const component of ["OpenLabPortalHero","OpenLabWayfinding","EvidenceRecordExplainer","OpenLabRegistryArchive","OpenLabRecordDetail","OpenLabDossierComposition","OpenLabMethodologyPipeline","OpenLabSourceChain","OpenLabComparison"])assert.match(route,new RegExp(`<${component}\\b`),component);});

test("OpenLab section modules stay presentation-only and responsive",async()=>{const [source,css]=await Promise.all([readSite("app/design-system/openlab-sections.tsx"),readSite("app/design-system/openlab-sections.module.css")]);assert.doesNotMatch(source,/fetch\(|XMLHttpRequest|WebSocket|localStorage|sessionStorage|order_prepare|payment_bridge|complete_payment/i);assert.match(source,/EvidenceStatusChip/);assert.match(source,/OpenLabRegistryArchive/);assert.match(css,/@media\(max-width:900px\)/);assert.match(css,/@media\(max-width:600px\)/);assert.match(css,/overflow-x:auto/);assert.doesNotMatch(css,/#(?:[0-9a-f]{3}){1,2}\b/i);});

test("modular packet uses the canonical PDP and OpenLab namespaces",async()=>{const packet=await readFile(path.join(repoRoot,"FIGMA_TO_CODEX_PACKET__MODULAR_SECTION_REGISTRY.md"),"utf8");assert.match(packet,/PRODUCT DETAIL PAGE \(`\/product\/:slug`\)/);assert.doesNotMatch(packet,/PRODUCT DETAIL PAGE \(`\/shop\/:slug`\)/);assert.match(packet,/Canonical namespace: \/open-lab/);assert.doesNotMatch(packet,/\/openlab\/admin/);});
