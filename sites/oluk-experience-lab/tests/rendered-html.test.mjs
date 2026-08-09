import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["/", "Explore the Olympus Labs UK range."],
  ["/shop", "Shop the range."],
  ["/product/mk-2866", "MK-2866"],
  ["/reviews", "Rendered review states for design approval."],
  ["/about", "A clearer relationship between product, proof and purchase."],
  ["/about/evidence-os", "The relationship system behind OpenLab."],
  ["/open-lab", "Product records, source context and testing methodology."],
  ["/open-lab/records", "Search and filter available product records."],
  ["/open-lab/records/source-bound-record", "MK-2866 record"],
  ["/open-lab/dossier/mk-2866", "MK-2866 product dossier."],
  ["/open-lab/batch-lookup", "Resolve a batch or product reference."],
  ["/open-lab/methodology", "How OpenLab presents source-owned evidence."],
  ["/open-lab/source-chain", "Trace each field to its owner."],
  ["/open-lab/compare", "Compare only what sources have in common."],
];

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function render(worker, pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders every approved experience route", async () => {
  const worker = await loadWorker();

  for (const [pathname, heading] of routes) {
    const response = await render(worker, pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);

    const html = await response.text();
    assert.match(html, new RegExp(`<h1[^>]*>[^<]*${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i"), pathname);
    assert.match(html, /EXPERIENCE LAB/i, pathname);
    assert.match(html, /STATIC DESIGN FIXTURES/i, pathname);
    assert.match(html, /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex[^"']*nofollow/i, pathname);
  }
});

test("keeps product, fixture and evidence boundaries intact", async () => {
  const worker = await loadWorker();
  const rendered = [];

  for (const [pathname] of routes) {
    const response = await render(worker, pathname);
    rendered.push(await response.text());
  }

  const html = rendered.join("\n");
  assert.match(html, /SARM SERIES/);
  assert.match(html, /MK-2866/);
  assert.match(html, /Ostarine/);
  assert.match(html, /80529-01/);
  assert.match(html, /15 MG/);
  assert.match(html, /90 SERVINGS/);
  assert.match(html, /&gt;99%|>99%/);
  assert.match(html, /£43/);
  assert.match(html, /RENDERED DESIGN FIXTURE/);
  assert.match(html, /NOT CUSTOMER DATA/);
  assert.match(html, /SOURCE-BOUND/);
  assert.match(html, /Not connected in preview/);

  assert.doesNotMatch(html, /90 CAPS(?:\b|ULES)/i);
  assert.doesNotMatch(html, /£\d+\.\d{2}/);
  assert.doesNotMatch(html, /OL2201|Janoshik|99\.55%|0 FAILURES|15 REPORTS/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the authored light-mode responsive contract in CSS", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /--cobalt:\s*#0057ff/i);
  assert.match(css, /--font-display/);
  assert.match(css, /--font-ui/);
  assert.match(css, /@media \(max-width: 1120px\)/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /overflow-x:\s*hidden/);
  assert.doesNotMatch(css, /prefers-color-scheme:\s*dark/i);
});
