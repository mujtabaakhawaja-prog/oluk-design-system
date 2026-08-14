#!/usr/bin/env node

import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  closePage,
  createPage,
  evaluate,
  launchChrome,
  navigate,
  setViewport,
} from "./chrome-cdp.mjs";
import { ROUTES } from "./route-matrix.mjs";

function option(name, fallback = "") {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) ?? fallback;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function settleExpression() {
  return `(async () => {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const images = [...document.images];
    const height = Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0);
    const increment = Math.max(320, Math.floor(innerHeight * 0.8));
    for (let y = 0; y < height; y += increment) {
      scrollTo(0, y);
      await pause(12);
    }
    scrollTo(0, 0);
    await Promise.race([
      Promise.all(images.map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      }))),
      // All 1440/1024/768/390 assets are checked by the geometry matrix. This
      // reflow audit still waits for load/decode, but does not add a ten-second
      // timeout to every local route once the document has been traversed.
      pause(2_000),
    ]);
    await pause(40);
    return true;
  })()`;
}

function layoutAuditExpression() {
  return `(() => {
    const viewportWidth = window.innerWidth;
    const isVisible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
    };
    const describe = (element) => {
      const classes = typeof element.className === "string" ? element.className.trim().split(/\\s+/).slice(0, 2).join(".") : "";
      return element.tagName.toLowerCase() + (element.id ? "#" + element.id : "") + (classes ? "." + classes : "");
    };
    const visible = [...document.body.querySelectorAll("*")].filter(isVisible);
    const horizontalOffenders = visible.flatMap((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.left >= -1 && rect.right <= viewportWidth + 1) return [];
      if (element.closest("[data-proof-allow-overflow]")) return [];
      let ancestor = element.parentElement;
      while (ancestor) {
        const ancestorStyle = getComputedStyle(ancestor);
        if (["auto", "scroll"].includes(ancestorStyle.overflowX) && ancestor.scrollWidth > ancestor.clientWidth + 1) return [];
        ancestor = ancestor.parentElement;
      }
      if (element.matches(".sr-only")) return [];
      return [{ selector: describe(element), left: Math.round(rect.left * 10) / 10, right: Math.round(rect.right * 10) / 10, width: Math.round(rect.width * 10) / 10 }];
    }).slice(0, 30);
    const concealedOverflow = visible.flatMap((element) => {
      const style = getComputedStyle(element);
      const clips = ["hidden", "clip"].includes(style.overflowX) && element.scrollWidth > element.clientWidth + 2;
      const authored = element.matches(".sr-only, .product-decision-media") || style.textOverflow === "ellipsis" || Boolean(element.closest("[data-proof-allow-overflow]"));
      return clips && !authored ? [{ selector: describe(element), clientWidth: element.clientWidth, scrollWidth: element.scrollWidth, overflowX: style.overflowX }] : [];
    }).slice(0, 30);
    const bodyText = document.body.innerText || "";
    const marker = ${JSON.stringify("Accessibility stress wording with an intentionally extended customer-facing phrase to verify resilient wrapping at two hundred percent zoom.")};
    return {
      documentOverflowPx: Math.max(0, document.documentElement.scrollWidth - viewportWidth),
      horizontalOffenders,
      concealedOverflow,
      frameworkOverlay: Boolean(document.querySelector("nextjs-portal, vite-error-overlay, #webpack-dev-server-client-overlay, [data-nextjs-dialog-overlay]")),
      markerPresent: bodyText.includes(marker),
      h1Count: [...document.querySelectorAll("h1")].filter(isVisible).length,
      mainCount: [...document.querySelectorAll("main")].filter(isVisible).length,
      textScale: getComputedStyle(document.documentElement).getPropertyValue("--proof-text-scale").trim(),
      visibleCharacters: bodyText.length,
    };
  })()`;
}

const baseUrl = new URL(option("base-url", process.env.PROOF_BASE_URL ?? "http://127.0.0.1:4173"));
const outputDirectory = option("output") || await mkdtemp(path.join(tmpdir(), "oluk-contrast-zoom-"));
const resumeFrom = option("resume-from");
const routeFilter = option("routes");
const requested = routeFilter ? new Set(routeFilter.split(",").map((value) => value.trim()).filter(Boolean)) : null;
const routes = requested ? ROUTES.filter(({ path: routePath }) => requested.has(routePath)) : ROUTES;
const missingRoutes = requested ? [...requested].filter((routePath) => !ROUTES.some(({ path: known }) => known === routePath)) : [];
if (missingRoutes.length > 0) throw new Error(`Unknown route(s): ${missingRoutes.join(", ")}`);
const customerRoutes = routes.filter(({ customer }) => customer);
const includeReview = hasFlag("include-review");
const auditedRoutes = includeReview ? routes : customerRoutes;
// At 200% text zoom, 1440 CSS px provides the WCAG-equivalent 720px layout
// viewport used by the responsive proof while still exercising desktop shell reflow.
const viewport = { width: 1440, height: 1000 };
const axeSource = await readFile(fileURLToPath(import.meta.resolve("axe-core/axe.min.js")), "utf8");
await mkdir(outputDirectory, { recursive: true });

const chrome = await launchChrome();
let results = [];
if (resumeFrom) {
  const previous = JSON.parse(await readFile(resumeFrom, "utf8"));
  results = (previous.results ?? []).filter((result) => result.status === "PASS");
}
const completedRoutes = new Set(results.map((result) => result.route));
let failed = results.some((result) => result.status !== "PASS");

function buildReceipt() {
  const receiptPath = path.join(outputDirectory, "cx38-contrast-zoom-long-copy.json");
  return {
    schemaVersion: 1,
    run: "CX-NEXT-038_CONTRAST_ZOOM_LONG_COPY",
    candidateState: "HUMAN_REVIEW_REQUIRED_UNPUBLISHED",
    generatedAt: new Date().toISOString(),
    baseUrl: baseUrl.href,
    outputDirectory,
    receiptPath,
    coverage: "All customer routes by default; owner-only /review excluded unless --include-review is supplied.",
    contrastEngine: "axe-core",
    axeVersion: null,
    zoomMethod: "Verify Chrome page scale 2, reset it, then apply deterministic 200% root text scaling for reflow inspection.",
    longCopyMethod: "Inject an extended 131-character customer phrase into the first visible main text/action target.",
    routeCount: auditedRoutes.length,
    completedRouteCount: results.length,
    passCount: results.filter(({ status }) => status === "PASS").length,
    failCount: results.filter(({ status }) => status !== "PASS").length,
    contrastViolationRuleCount: results.reduce((total, result) => total + (result.axe?.violations.length ?? 0), 0),
    contrastIncompleteRuleCount: results.reduce((total, result) => total + (result.axe?.incomplete.length ?? 0), 0),
    zoomOverflowRouteCount: results.filter((result) => (result.layout?.documentOverflowPx ?? 0) > 1).length,
    longCopyFailureRouteCount: results.filter((result) => result.layout && !result.layout.markerPresent).length,
    results,
  };
}

async function checkpoint() {
  await writeFile(
    path.join(outputDirectory, "cx38-contrast-zoom-progress.json"),
    `${JSON.stringify({ ...buildReceipt(), status: failed ? "FAIL" : "IN_PROGRESS" }, null, 2)}\n`,
  );
}

try {
  for (const route of auditedRoutes) {
    if (completedRoutes.has(route.path)) continue;
    const { client, targetId } = await createPage(chrome.port);
    const logs = [];
    const exceptions = [];
    const documentResponses = [];
    client.on("Log.entryAdded", ({ entry }) => {
      if (["error", "warning"].includes(entry.level)) logs.push({ level: entry.level, text: entry.text, url: entry.url });
    });
    client.on("Runtime.exceptionThrown", ({ exceptionDetails }) => {
      exceptions.push(exceptionDetails.exception?.description ?? exceptionDetails.text);
    });
    client.on("Network.responseReceived", ({ response, type }) => {
      if (type === "Document") documentResponses.push({ url: response.url, status: response.status });
    });

    try {
      await setViewport(client, viewport);
      const url = new URL(route.path, baseUrl).href;
      await navigate(client, url);
      await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 600))");
      await evaluate(client, settleExpression());
      await evaluate(client, axeSource);
      const axe = await evaluate(
        client,
        `axe.run(document, { runOnly: { type: "rule", values: ["color-contrast"] }, resultTypes: ["violations", "incomplete"] }).then((result) => ({
          violations: result.violations.map(({ id, impact, description, nodes }) => ({ id, impact, description, nodes: nodes.map(({ target, failureSummary, html }) => ({ target, failureSummary, html: html.slice(0, 300) })) })),
          incomplete: result.incomplete.map(({ id, impact, description, nodes }) => ({ id, impact, description, nodes: nodes.map(({ target, failureSummary, html }) => ({ target, failureSummary, html: html.slice(0, 300) })) })),
          passes: result.passes.map(({ id, nodes }) => ({ id, nodeCount: nodes.length })),
        }))`,
      );

      await client.send("Emulation.setPageScaleFactor", { pageScaleFactor: 2 });
      const browserZoom = await evaluate(client, `({
        requested: 2,
        visualViewportScale: window.visualViewport?.scale ?? null,
      })`);
      await client.send("Emulation.setPageScaleFactor", { pageScaleFactor: 1 });
      await evaluate(
        client,
        `(() => {
          document.documentElement.style.setProperty("--proof-text-scale", "200%");
          const style = document.createElement("style");
          style.id = "cx38-zoom-long-copy-stress";
          style.textContent = ":root { font-size: 200% !important; }";
          document.head.append(style);
          const target = document.querySelector("main p, main h1, main h2, main a, main button");
          if (target) {
            target.setAttribute("data-proof-long-copy", "true");
            target.textContent = "Accessibility stress wording with an intentionally extended customer-facing phrase to verify resilient wrapping at two hundred percent zoom.";
          }
          return Boolean(target);
        })()`,
      );
      await evaluate(client, settleExpression());
      const layout = await evaluate(client, layoutAuditExpression());
      const response = documentResponses.findLast(({ url: responseUrl }) => responseUrl === url) ?? documentResponses.at(-1);
      const failures = [];
      const warnings = [];
      if (response && response.status !== 200) failures.push(`document response ${response.status}`);
      if (axe.violations.length > 0) failures.push(`${axe.violations.length} axe contrast violation rule(s)`);
      if ((browserZoom.visualViewportScale ?? 0) < 1.99) failures.push(`browser 200% zoom did not apply (${browserZoom.visualViewportScale})`);
      if (layout.documentOverflowPx > 1) failures.push(`200% zoom document overflow ${layout.documentOverflowPx}px`);
      if (layout.horizontalOffenders.length > 0) failures.push(`${layout.horizontalOffenders.length} 200% zoom horizontal offender(s)`);
      if (layout.concealedOverflow.length > 0) failures.push(`${layout.concealedOverflow.length} 200% zoom concealed-overflow element(s)`);
      if (layout.frameworkOverlay) failures.push("framework error overlay visible");
      if (!layout.markerPresent) failures.push("long-copy stress marker did not render");
      if (layout.h1Count !== 1) failures.push(`expected one visible h1; found ${layout.h1Count}`);
      if (layout.mainCount !== 1) failures.push(`expected one visible main; found ${layout.mainCount}`);
      if (layout.textScale !== "200%") failures.push("200% text-scale marker did not apply");
      if (exceptions.length > 0) failures.push(`${exceptions.length} uncaught browser exception(s)`);
      if (logs.some(({ level }) => level === "error")) failures.push(`${logs.filter(({ level }) => level === "error").length} browser console error(s)`);
      if (axe.incomplete.length > 0) warnings.push(`${axe.incomplete.length} axe contrast rule(s) require manual review`);
      if (failures.length > 0) failed = true;
      results.push({
        route: route.path,
        customer: route.customer,
        viewport,
        browserZoom,
        cssRootFontScale: "200%",
        longCopyTarget: "first main p/h1/h2/a/button",
        response,
        status: failures.length === 0 ? "PASS" : "FAIL",
        failures,
        warnings,
        axe,
        layout,
        logs,
        exceptions,
      });
    } catch (error) {
      failed = true;
      results.push({
        route: route.path,
        customer: route.customer,
        viewport,
        status: "ERROR",
        failures: [error instanceof Error ? error.message : String(error)],
        logs,
        exceptions,
      });
    } finally {
      await closePage(chrome.port, client, targetId);
      await checkpoint();
    }
  }
} finally {
  await chrome.close();
}

const receipt = buildReceipt();
receipt.axeVersion = (await import("axe-core/package.json", { with: { type: "json" } })).default.version;
const receiptPath = receipt.receiptPath;

await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({
  ...receipt,
  results: results.map(({ route, status, failures, warnings, axe, layout }) => ({
    route,
    status,
    failures,
    warnings,
    contrastViolationRuleCount: axe?.violations.length ?? null,
    contrastIncompleteRuleCount: axe?.incomplete.length ?? null,
    zoomOverflowPx: layout?.documentOverflowPx ?? null,
    horizontalOffenderCount: layout?.horizontalOffenders.length ?? null,
    concealedOverflowCount: layout?.concealedOverflow.length ?? null,
    longCopyMarkerPresent: layout?.markerPresent ?? null,
  })),
}, null, 2)}\n`);
if (failed) process.exitCode = 1;
