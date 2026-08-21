import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {fileURLToPath} from "node:url";

const siteRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const repoRoot=path.resolve(siteRoot,"../..");
const readSite=(file)=>readFile(path.join(siteRoot,file),"utf8");

test("PDP is a declared canonical module composition",async()=>{const registry=JSON.parse(await readFile(path.join(repoRoot,"authority/PDP-SECTION-MODULE-REGISTRY.json"),"utf8"));assert.equal(registry.runtimeAuthority,"NONE");assert.deepEqual(registry.composition,["PdpFirstFold","PurchasePanel","AssuranceRail","ProductDetailDisclosure","ProductDossier","ProductEvidenceSnapshot","UpsellContextRail","RelatedRail","MobileDecisionSummary"]);assert.equal(registry.modules.length,4);for(const entry of registry.modules){assert.ok(entry.dataOwner);assert.ok(entry.mobileStrategy);assert.ok(entry.runtimeExclusions.length);}});

test("PDP route mounts canonical sections and preserves approved content",async()=>{const [route,sections,firstFold]=await Promise.all([readSite("app/customer-routes.tsx"),readSite("app/design-system/pdp-sections.tsx"),readSite("app/design-system/pdp-first-fold.tsx")]);for(const component of ["PdpFirstFold","ProductDetailDisclosure","ProductEvidenceSnapshot","MobileDecisionSummary"])assert.match(route,new RegExp(`<${component}`));assert.match(firstFold,/data-figma-node="717:16137"/);assert.match(firstFold,/data-figma-visual-area="717:16140"/);assert.match(firstFold,/data-figma-purchase-panel="626:12659"/);assert.match(firstFold,/data-media-context="pdp-first-fold"/);assert.match(firstFold,/<PurchasePanel/);assert.match(sections,/Third-Party Tested\./);assert.match(sections,/15 MG|product\.strength/);assert.match(sections,/90 SERVINGS|product\.servings/);assert.match(sections,/product\.purity/);assert.doesNotMatch(`${sections}\n${firstFold}`,/fetch\(|XMLHttpRequest|WebSocket|localStorage|sessionStorage/);});

test("every frontier PDP uses the PdpD purchase anatomy and never invents missing product media",async()=>{const [route,presentation,chamber]=await Promise.all([readSite("app/product/[slug]/page.tsx"),readSite("app/design-system/frontier-product-presentation.ts"),readSite("app/design-system/product-media-chamber.tsx")]);for(const component of ["PdpFirstFold","AssuranceRail","ProductDetailDisclosure","ProductDossier","ProductEvidenceSnapshot","ProductContinuation","MobileDecisionSummary"])assert.match(route,new RegExp(`<${component}`));assert.match(route,/frontierProductPresentation/);assert.match(presentation,/if \(!asset \|\| !crops\) return null/);assert.match(chamber,/unpopulated-governed-chamber/);});

test("mobile decision module remains navigation-only and token governed",async()=>{const [sections,css]=await Promise.all([readSite("app/design-system/pdp-sections.tsx"),readSite("app/design-system/pdp-sections.module.css")]);assert.match(sections,/href="#purchase"/);assert.doesNotMatch(sections,/addToBag|order_prepare|payment_bridge|complete_payment/i);assert.match(css,/@media\(max-width:540px\)/);assert.match(css,/min-height:44px/);assert.doesNotMatch(css,/#(?:[0-9a-f]{3}){1,2}\b/i);});
