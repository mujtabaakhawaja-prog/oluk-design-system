import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["/", "Shop the range and verify every batch."],
  ["/shop", "The Olympus Labs UK range."],
  ["/product/mk-2866", "MK-2866"],
  ["/reviews", "Experiences shared by Olympus customers."],
  ["/review", "Olympus Labs UK review surfaces."],
  ["/about", "Quality, made visible."],
  ["/about/evidence-os", "A clearer path from product to proof."],
  ["/open-lab", "Independent evidence, connected to every product."],
  ["/open-lab/records", "Every batch. Every report. Public."],
  ["/open-lab/records/source-bound-record", "MK-2866 · May 2026"],
  ["/open-lab/dossier/mk-2866", "MK-2866 product dossier."],
  ["/open-lab/batch-lookup", "Find a batch record."],
  ["/open-lab/methodology", "How finished products are verified."],
  ["/open-lab/source-chain", "From finished product to original report."],
  ["/open-lab/compare", "Compare finished-product records."],
];

const customerRoutes = routes.filter(([pathname]) => pathname !== "/review");

const reviewTargets = [
  ["/#hero", "/", "hero"],
  ["/#assurance", "/", "assurance"],
  ["/#compound-families", "/", "compound-families"],
  ["/#featured-products", "/", "featured-products"],
  ["/#reviews", "/", "reviews"],
  ["/#related-products", "/", "related-products"],
  ["/product/mk-2866#purchase", "/product/mk-2866", "purchase"],
  ["/product/mk-2866#dossier", "/product/mk-2866", "dossier"],
  ["/product/mk-2866#lab-records", "/product/mk-2866", "lab-records"],
  ["/open-lab", "/open-lab", null],
  ["/open-lab/records", "/open-lab/records", null],
  ["/open-lab/records/source-bound-record", "/open-lab/records/source-bound-record", null],
  ["/#footer", "/", "footer"],
];

const forbiddenCustomerVocabulary = [
  /\bGOVERNED(?: PRODUCT)?\b/i,
  /CATALOGUE SOURCE PENDING/i,
  /\bSOURCE[-\u2011\u2013 ]BOUND\b/i,
  /\bDESIGN FIXTURE\b/i,
  /\bDEMO[-\u2011\u2013 ]STATE\b/i,
  /\bNOT CONNECTED\b/i,
  /RENDERED DESIGN FIXTURE/i,
  /UNPROVISIONED RENDER/i,
  /No reconstructed analytical values/i,
  /\bSample reviewer\b/i,
  /\bDate slot\b/i,
  /\bPurchase status slot\b/i,
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

function visibleText(html) {
  return decodeHtmlEntities(
    html
      .replace(/<head\b[\s\S]*?<\/head>/gi, " ")
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
      .replace(/<!--([\s\S]*?)-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
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

async function renderHtml(worker, pathname) {
  const response = await render(worker, pathname);
  assert.equal(response.status, 200, pathname);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, pathname);
  return response.text();
}

test("server-renders all 15 approved routes with their v3 headings and private indexing policy", async () => {
  assert.equal(routes.length, 15);
  const worker = await loadWorker();

  for (const [pathname, heading] of routes) {
    const html = await renderHtml(worker, pathname);
    const h1Matches = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) ?? [];

    assert.equal(h1Matches.length, 1, `${pathname} should render exactly one h1`);
    assert.equal(visibleText(h1Matches[0]), heading, `${pathname} h1`);
    assert.match(
      html,
      /<meta(?=[^>]*\bname=["']robots["'])(?=[^>]*\bcontent=["'][^"']*\bnoindex\b[^"']*\bnofollow\b[^"']*["'])[^>]*>/i,
      `${pathname} robots policy`,
    );
  }
});

test("preserves exact MK-2866 commerce truth and removes backend vocabulary from customer routes", async () => {
  const worker = await loadWorker();
  const productHtml = await renderHtml(worker, "/product/mk-2866");
  const productText = visibleText(productHtml);

  for (const expected of [
    "SARM SERIES",
    "MK-2866",
    "Ostarine",
    "80529-01",
    "15 MG",
    "90 SERVINGS",
    ">99%",
    "£43",
  ]) {
    assert.match(productText, new RegExp(escapeRegExp(expected)), `MK-2866 truth: ${expected}`);
  }

  assert.doesNotMatch(productText, /90 CAPS(?:\b|ULES)/i);
  assert.doesNotMatch(productText, /£43\.00\b/);
  assert.doesNotMatch(productHtml, /<del\b/i);
  assert.doesNotMatch(productText, /(?:per|\/)\s*serving/i);

  for (const [pathname] of customerRoutes) {
    const html = await renderHtml(worker, pathname);
    const text = visibleText(html);

    for (const forbidden of forbiddenCustomerVocabulary) {
      assert.doesNotMatch(text, forbidden, `${pathname} visibly contains ${forbidden}`);
    }
  }
});

test("locks the luminous canvas, Softform Arc radii and responsive recomposition contract", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /--canvas:\s*#f7f8fc\s*;/i);
  assert.match(css, /body\s*\{[\s\S]*?background:\s*var\(--canvas\)\s*;/i);
  assert.match(css, /--line:\s*rgba\(206,\s*220,\s*241,\s*0\.92\)\s*;/i);
  assert.match(css, /body\s*\{[\s\S]*?overflow-x:\s*clip\s*;/i);
  assert.match(css, /\.experience-lab\s*\{[\s\S]*?overflow-x:\s*clip\s*;/i);

  assert.match(css, /\.hero-category-cards\s*>\s*a\s*\{[\s\S]*?border-radius:\s*20px\s*;/i);
  assert.match(css, /\.product-commerce-card\s*\{[\s\S]*?border-radius:\s*24px\s*;/i);
  assert.match(css, /\.purchase-panel\s*\{[\s\S]*?border-radius:\s*28px\s*;/i);
  assert.match(css, /\.horizontal-product-card\s*\{[\s\S]*?border-radius:\s*34px\s*;/i);

  for (const breakpoint of [1180, 960, 760, 540]) {
    assert.match(css, new RegExp(`@media \\(max-width: ${breakpoint}px\\)`), `${breakpoint}px breakpoint`);
  }

  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.hero-composition\s*\{[\s\S]*?grid-template-columns:\s*1fr\s*;/i);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.product-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr\s*;/i);
  assert.match(css, /@media \(max-width: 540px\)[\s\S]*?\.shell\s*\{[\s\S]*?padding-inline:\s*16px\s*;/i);
  assert.doesNotMatch(css, /prefers-color-scheme:\s*dark/i);
});

test("keeps the private review index linked to stable customer-surface anchors", async () => {
  const worker = await loadWorker();
  const reviewHtml = await renderHtml(worker, "/review");
  const renderedByPath = new Map();

  for (const [href, pathname, anchor] of reviewTargets) {
    assert.match(reviewHtml, new RegExp(`href=["']${escapeRegExp(href)}["']`), `/review link ${href}`);

    if (anchor) {
      if (!renderedByPath.has(pathname)) {
        renderedByPath.set(pathname, await renderHtml(worker, pathname));
      }
      assert.match(
        renderedByPath.get(pathname),
        new RegExp(`\\bid=["']${escapeRegExp(anchor)}["']`, "i"),
        `${href} target anchor`,
      );
    }
  }

  const homeHtml = renderedByPath.get("/") ?? await renderHtml(worker, "/");
  const reviewsHtml = await renderHtml(worker, "/reviews");
  assert.match(homeHtml, /href=["']\/reviews["']/i, "homepage full-reviews link");
  assert.match(reviewsHtml, /\bid=["']reviews["']/i, "reviews route stable section anchor");
});
