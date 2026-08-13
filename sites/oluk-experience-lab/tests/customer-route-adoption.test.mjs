import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const coreCustomerPaths = [
  "/",
  "/shop",
  "/product/mk-2866",
  "/reviews",
  "/about",
  "/about/evidence-os",
  "/open-lab",
  "/open-lab/records",
  "/open-lab/records/source-bound-record",
  "/open-lab/dossier/mk-2866",
  "/open-lab/batch-lookup",
  "/open-lab/methodology",
  "/open-lab/source-chain",
  "/open-lab/compare",
];

const shellDestinationPaths = [
  "/lab-reports",
  "/search",
  "/bag",
  "/wholesale",
  "/account",
  "/contact",
  "/delivery",
  "/privacy",
  "/terms",
];

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return (await import(workerUrl.href)).default;
}

async function renderHtml(worker, pathname) {
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200, pathname);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);
  return response.text();
}

function visibleText(html) {
  return html
    .replace(/<head\b[\s\S]*?<\/head>/gi, " ")
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&gt;/gi, ">")
    .replace(/&pound;/gi, "£")
    .replace(/\s+/g, " ")
    .trim();
}

test("customer routes adopt the canonical design-system modules without page-local redraws", async () => {
  const shellSource = await readFile(new URL("../app/experience-lab.tsx", import.meta.url), "utf8");
  const routeSource = await readFile(new URL("../app/customer-routes.tsx", import.meta.url), "utf8");

  for (const localDuplicate of [
    "ProductCommerceCard",
    "PurchasePanel",
    "ProductDossier",
    "AssuranceRail",
    "MetricRail",
    "EvidenceStatus",
    "ProductDecisionHero",
  ]) {
    assert.doesNotMatch(
      shellSource,
      new RegExp(`function ${localDuplicate}\\b`),
      `${localDuplicate} must not be redrawn in the route shell`,
    );
  }

  for (const canonicalComponent of [
    "ProductCommerceCard",
    "PurchasePanel",
    "ProductDossier",
    "AssuranceRail",
    "RelatedRail",
    "ProductDecisionHero",
    "PresentationState",
  ]) {
    assert.match(routeSource, new RegExp(`<${canonicalComponent}\\b`), `${canonicalComponent} route adoption`);
  }

  const productRoute = routeSource.match(
    /export function ProductRoute\(\)[\s\S]*?\n}\n\nexport function OpenLabRoute/,
  )?.[0] ?? "";
  assert.match(productRoute, /className="pdp-media-stage"/, "PDP retains its flat atmospheric media exception");
  assert.doesNotMatch(productRoute, /<ProductMediaChamber\b/, "PDP first fold does not consume the bounded chamber master");
  assert.match(productRoute, /<PurchasePanel\b/);
  assert.match(productRoute, /<ProductDossier\b/);
  assert.match(productRoute, /<RelatedRail\b/);

  const dossierRoute = routeSource.match(
    /export function DossierRoute\(\)[\s\S]*?\n}\n\nfunction lookupStateFromReference/,
  )?.[0] ?? "";
  assert.match(dossierRoute, /<ProductDossier\b/, "OpenLab dossier reuses the PDP dossier component");
  assert.match(dossierRoute, /secondaryHref=\{mk2866Fixture\.customerPath\}/, "dossier return-to-commerce action targets the PDP");
  assert.match(dossierRoute, /secondaryLabel="Return to MK-2866"/, "dossier does not self-link through a lab-record label");
});

test("batch lookup renders accessible deterministic empty, entered, found, no-result and unavailable states", async () => {
  const worker = await loadWorker();
  const states = [
    ["/open-lab/batch-lookup", "empty", "Start with a reference."],
    ["/open-lab/batch-lookup?reference=MK-28", "entered", "Your reference is ready."],
    ["/open-lab/batch-lookup?reference=MK-2866", "found", "A product matches this reference."],
    ["/open-lab/batch-lookup?reference=NO-MATCH", "no-result", "No matching record was found."],
    ["/open-lab/batch-lookup?reference=OL-MK2866-PENDING", "unavailable", "Record details are unavailable."],
  ];

  for (const [pathname, state, title] of states) {
    const html = await renderHtml(worker, pathname);
    assert.match(html, new RegExp(`data-presentation-state=["']${state}["']`), `${state} state marker`);
    assert.match(html, /role=["']status["']/i, `${state} live status semantics`);
    assert.match(visibleText(html), new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${state} customer copy`);
    assert.match(html, /data-live-authority=["']false["']/i, `${state} remains explicitly non-live`);
  }

  const noResult = await renderHtml(worker, "/open-lab/batch-lookup?reference=NO-MATCH");
  assert.match(noResult, /aria-invalid=["']true["']/i, "no-result input exposes validation state");
  assert.match(noResult, /aria-errormessage=["']lookup-state["']/i, "no-result input identifies its message");
});

test("evidence routes keep unavailable records explicit without fabricated analytical detail", async () => {
  const worker = await loadWorker();

  for (const pathname of [
    "/open-lab/records",
    "/open-lab/records/source-bound-record",
    "/open-lab/dossier/mk-2866",
  ]) {
    const text = visibleText(await renderHtml(worker, pathname));
    assert.match(text, /Unavailable/i, `${pathname} unavailable state`);
    assert.doesNotMatch(text, /OL-MK2866-\d+/i, `${pathname} fabricated record identifier`);
    assert.doesNotMatch(text, /99\.1%|99\.3%|98\.9%/i, `${pathname} fabricated analytical result`);
    assert.doesNotMatch(text, /\bHPLC\b|Report available|May 2026/i, `${pathname} fabricated publication detail`);
  }
});

test("core and shell destination paths resolve with coherent landmarks and no orphan link", async () => {
  const worker = await loadWorker();
  const homeHtml = await renderHtml(worker, "/");

  assert.match(homeHtml, /<header\b/i);
  assert.match(homeHtml, /<main\b[^>]*\bid=["']main-content["']/i);
  assert.match(homeHtml, /<footer\b/i);

  for (const pathname of [...coreCustomerPaths, ...shellDestinationPaths]) {
    await renderHtml(worker, pathname);
  }

  for (const pathname of shellDestinationPaths) {
    assert.match(homeHtml, new RegExp(`href=["']${pathname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`), `shell destination ${pathname}`);
  }

  const compareHtml = await renderHtml(worker, "/open-lab/compare");
  assert.match(compareHtml, /role=["']region["'][^>]*tabindex=["']0["']/i, "comparison overflow region is keyboard operable");
  assert.match(compareHtml, /<caption\b[^>]*>Product facts and evidence availability comparison<\/caption>/i);

  const productHtml = await renderHtml(worker, "/product/mk-2866");
  assert.match(productHtml, /<nav\b[^>]*aria-label=["']Breadcrumb["']/i);
  assert.match(productHtml, /aria-current=["']page["']/i);
});
