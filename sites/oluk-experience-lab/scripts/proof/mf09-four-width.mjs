#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  capturePng,
  closePage,
  createPage,
  evaluate,
  launchChrome,
  navigate,
  setViewport,
} from "./chrome-cdp.mjs";
import {
  GOVERNANCE_PATTERNS,
  routeSlug,
  selectRoutes,
  selectViewports,
} from "./route-matrix.mjs";

function option(name, fallback) {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) ?? fallback;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

async function sha256(filePath) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

function pageAuditExpression({ customer, expectedHeading, governancePatterns }) {
  return `(() => {
    const viewportWidth = window.innerWidth;
    const documentElement = document.documentElement;
    const bodyText = document.body?.innerText || "";
    const isVisible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
    };
    const describe = (element) => {
      const className = typeof element.className === "string" ? element.className.trim().split(/\\s+/).slice(0, 3).join(".") : "";
      return element.tagName.toLowerCase() + (element.id ? "#" + element.id : "") + (className ? "." + className : "");
    };
    const visible = [...document.body.querySelectorAll("*")].filter(isVisible);
    const horizontalOffenders = visible.flatMap((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.left >= -1 && rect.right <= viewportWidth + 1) return [];
      if (element.closest("[data-proof-allow-overflow]")) return [];
      return [{ selector: describe(element), left: Math.round(rect.left * 10) / 10, right: Math.round(rect.right * 10) / 10, width: Math.round(rect.width * 10) / 10 }];
    }).slice(0, 30);
    const hiddenOverflow = visible.flatMap((element) => {
      const style = getComputedStyle(element);
      const clipped = ["hidden", "clip"].includes(style.overflowX) && element.scrollWidth > element.clientWidth + 1;
      const authoredClipping =
        element.matches(".sr-only, .product-decision-media") ||
        style.textOverflow === "ellipsis";
      return clipped && !authoredClipping ? [{ selector: describe(element), clientWidth: element.clientWidth, scrollWidth: element.scrollWidth, overflowX: style.overflowX }] : [];
    }).slice(0, 30);
    const overlapContainers = [
      ...document.querySelectorAll(".product-grid, .commerce-card-grid, .qualitative-chips, .oluk-candidate-qualitative, .oluk-state-grid, .oluk-width-grid"),
    ];
    const overlaps = [];
    for (const container of overlapContainers) {
      const children = [...container.children].filter(isVisible);
      for (let leftIndex = 0; leftIndex < children.length; leftIndex += 1) {
        for (let rightIndex = leftIndex + 1; rightIndex < children.length; rightIndex += 1) {
          const left = children[leftIndex].getBoundingClientRect();
          const right = children[rightIndex].getBoundingClientRect();
          const intersectionWidth = Math.max(0, Math.min(left.right, right.right) - Math.max(left.left, right.left));
          const intersectionHeight = Math.max(0, Math.min(left.bottom, right.bottom) - Math.max(left.top, right.top));
          if (intersectionWidth > 1 && intersectionHeight > 1) {
            overlaps.push({ container: describe(container), a: describe(children[leftIndex]), b: describe(children[rightIndex]), area: Math.round(intersectionWidth * intersectionHeight) });
          }
        }
      }
    }
    const h1 = [...document.querySelectorAll("h1")].filter(isVisible).map((node) => node.innerText.trim());
    const missingImages = [...document.images].filter((image) => isVisible(image) && (!image.complete || image.naturalWidth === 0)).map(describe);
    const frameworkOverlay = Boolean(document.querySelector("nextjs-portal, vite-error-overlay, #webpack-dev-server-client-overlay, [data-nextjs-dialog-overlay]"));
    const footer = document.querySelector("footer");
    const footerBackground = footer ? getComputedStyle(footer).backgroundColor : null;
    const inverseColors = new Set(["rgb(20, 24, 39)", "rgba(20, 24, 39, 1)"]);
    const inverseOutsideFooter = visible.filter((element) => {
      const rect = element.getBoundingClientRect();
      return (
        !element.closest("footer") &&
        rect.bottom > 0 &&
        rect.top < innerHeight &&
        rect.right > 0 &&
        rect.left < innerWidth &&
        getComputedStyle(element).opacity !== "0" &&
        inverseColors.has(getComputedStyle(element).backgroundColor)
      );
    }).map(describe).slice(0, 20);
    const governanceHits = ${JSON.stringify(customer)} ? ${JSON.stringify(governancePatterns)}.filter((pattern) => bodyText.toUpperCase().includes(pattern.toUpperCase())) : [];
    return {
      title: document.title,
      url: location.href,
      h1,
      expectedHeading: ${JSON.stringify(expectedHeading)},
      documentWidth: documentElement.scrollWidth,
      viewportWidth,
      documentOverflowPx: Math.max(0, documentElement.scrollWidth - viewportWidth),
      horizontalOffenders,
      hiddenOverflow,
      overlaps,
      missingImages,
      frameworkOverlay,
      visible90Caps: /90\\s+CAPS(?:ULES)?/i.test(bodyText),
      governanceHits,
      hasMain: Boolean(document.querySelector("main")),
      hasHeader: Boolean(document.querySelector("header")),
      hasFooter: Boolean(footer),
      footerBackground,
      footerIsInverse: inverseColors.has(footerBackground),
      inverseOutsideFooter,
      candidateComponentCount: document.querySelectorAll("[data-candidate-component]").length,
      qualitativeChipCount: document.querySelectorAll(".qualitative-chip, .oluk-candidate-qualitative > *").length,
    };
  })()`;
}

function settlePageExpression() {
  return `(async () => {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const images = [...document.images];
    for (const image of images) image.loading = "eager";
    const height = Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0);
    const increment = Math.max(320, Math.floor(innerHeight * 0.8));
    for (let y = 0; y < height; y += increment) {
      scrollTo(0, y);
      await pause(20);
    }
    scrollTo(0, 0);
    await Promise.race([
      Promise.all(images.map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      })),
      pause(12_000),
    ]);
    await pause(60);
    return { imageCount: images.length, settled: images.filter((image) => image.complete).length };
  })()`;
}

const baseUrl = new URL(option("base-url", process.env.PROOF_BASE_URL ?? "http://127.0.0.1:4173"));
const routes = selectRoutes(option("routes", ""));
const viewports = selectViewports(option("widths", ""));
const capture = hasFlag("capture") || hasFlag("full-page");
const fullPage = hasFlag("full-page");
const outputDirectory = option("output", "") || await mkdtemp(path.join(tmpdir(), "oluk-mf09-proof-"));
await mkdir(outputDirectory, { recursive: true });

const chrome = await launchChrome();
const results = [];
let failed = false;

try {
  for (const route of routes) {
    for (const viewport of viewports) {
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
        await evaluate(client, settlePageExpression());
        const audit = await evaluate(client, pageAuditExpression({
          customer: route.customer,
          expectedHeading: route.heading,
          governancePatterns: GOVERNANCE_PATTERNS,
        }));
        const response = documentResponses.findLast(({ url: responseUrl }) => responseUrl === url) ?? documentResponses.at(-1);
        const failures = [];
        if (response && response.status !== 200) failures.push(`document response ${response.status}`);
        if (audit.h1.length !== 1 || audit.h1[0] !== route.heading) failures.push(`h1 expected ${JSON.stringify(route.heading)}; received ${JSON.stringify(audit.h1)}`);
        if (!audit.hasMain) failures.push("missing main landmark");
        if (!audit.hasHeader) failures.push("missing header landmark");
        if (route.customer && !audit.hasFooter) failures.push("missing footer landmark");
        if (audit.documentOverflowPx > 1) failures.push(`horizontal document overflow ${audit.documentOverflowPx}px`);
        if (audit.hiddenOverflow.length > 0) failures.push(`${audit.hiddenOverflow.length} element(s) conceal horizontal overflow`);
        if (audit.overlaps.length > 0) failures.push(`${audit.overlaps.length} repeated-grid overlap(s)`);
        if (audit.missingImages.length > 0) failures.push(`${audit.missingImages.length} missing visible image(s)`);
        if (audit.frameworkOverlay) failures.push("framework error overlay visible");
        if (audit.visible90Caps) failures.push("rejected 90 CAPS metric visible");
        if (audit.governanceHits.length > 0) failures.push(`customer governance leakage: ${audit.governanceHits.join(", ")}`);
        if (route.customer && !audit.footerIsInverse) failures.push(`footer is not the sole-inverse color (${audit.footerBackground})`);
        if (route.customer && audit.inverseOutsideFooter.length > 0) failures.push(`inverse surface outside footer: ${audit.inverseOutsideFooter.join(", ")}`);
        if (exceptions.length > 0) failures.push(`${exceptions.length} uncaught browser exception(s)`);
        if (logs.some(({ level }) => level === "error")) failures.push(`${logs.filter(({ level }) => level === "error").length} browser console error(s)`);

        let screenshot = null;
        let screenshotSha256 = null;
        if (capture) {
          screenshot = `${routeSlug(route.path)}--${viewport.width}.png`;
          const screenshotPath = path.join(outputDirectory, screenshot);
          await capturePng(client, screenshotPath, { fullPage });
          screenshotSha256 = await sha256(screenshotPath);
        }

        if (failures.length > 0) failed = true;
        results.push({
          route: route.path,
          customer: route.customer,
          viewport,
          response,
          status: failures.length === 0 ? "PASS" : "FAIL",
          failures,
          audit,
          logs,
          exceptions,
          screenshot,
          screenshotSha256,
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
      }
    }
  }
} finally {
  await chrome.close();
}

const receipt = {
  schemaVersion: 1,
  run: "MF-09_FOUR_WIDTH_ROUTE_PROOF",
  candidateState: "HUMAN_REVIEW_REQUIRED_UNPUBLISHED",
  generatedAt: new Date().toISOString(),
  baseUrl: baseUrl.href,
  outputDirectory,
  captureMode: capture ? (fullPage ? "full-page" : "viewport") : "none",
  routeCount: routes.length,
  widthCount: viewports.length,
  caseCount: results.length,
  passCount: results.filter(({ status }) => status === "PASS").length,
  failCount: results.filter(({ status }) => status !== "PASS").length,
  results,
};

await writeFile(path.join(outputDirectory, "mf09-four-width-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ ...receipt, results: results.map(({ route, viewport, status, failures, screenshotSha256 }) => ({ route, width: viewport.width, status, failures, screenshotSha256 })) }, null, 2)}\n`);
if (failed) process.exitCode = 1;
