#!/usr/bin/env node

import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { closePage, createPage, evaluate, launchChrome, navigate, setViewport } from "./chrome-cdp.mjs";
import { selectRoutes, selectViewports } from "./route-matrix.mjs";

function option(name, fallback) {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) ?? fallback;
}

function domAuditExpression() {
  return `(() => {
    const isVisible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
    };
    const selector = (element) => element.tagName.toLowerCase() + (element.id ? "#" + element.id : "") + (typeof element.className === "string" && element.className.trim() ? "." + element.className.trim().split(/\\s+/).slice(0, 2).join(".") : "");
    const accessibleName = (element) => {
      const labelledBy = element.getAttribute("aria-labelledby");
      if (labelledBy) return labelledBy.split(/\\s+/).map((id) => document.getElementById(id)?.textContent || "").join(" ").trim();
      const labelText = element.labels ? [...element.labels].map((label) => label.textContent || "").join(" ").trim() : "";
      if (labelText) return labelText;
      return (element.getAttribute("aria-label") || element.getAttribute("alt") || element.getAttribute("title") || element.textContent || "").trim();
    };
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    const visibleImages = [...document.images].filter(isVisible);
    const missingImageAlt = visibleImages.filter((image) => !image.hasAttribute("alt")).map(selector);
    const emptyImageAlt = visibleImages.filter((image) => image.getAttribute("alt") === "" && !image.closest("[aria-hidden='true']")).map(selector);
    const interactive = [...document.querySelectorAll("a[href], button, input, select, textarea, [role='button'], [role='link'], [role='tab'], [tabindex]")].filter((element) => isVisible(element) && !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true" && element.tabIndex >= 0);
    const unnamedInteractive = interactive.filter((element) => !accessibleName(element)).map(selector);
    const formControls = [...document.querySelectorAll("input:not([type='hidden']), select, textarea")].filter(isVisible);
    const unlabeledControls = formControls.filter((control) => {
      if (control.getAttribute("aria-label") || control.getAttribute("aria-labelledby") || control.title) return false;
      return !(control.id && document.querySelector("label[for='" + CSS.escape(control.id) + "']")) && !control.closest("label");
    }).map(selector);
    const smallTouchTargets = interactive.flatMap((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width < 24 || rect.height < 24 ? [{ selector: selector(element), width: Math.round(rect.width), height: Math.round(rect.height) }] : [];
    });
    return {
      lang: document.documentElement.lang,
      title: document.title,
      h1Count: [...document.querySelectorAll("h1")].filter(isVisible).length,
      mainCount: [...document.querySelectorAll("main")].filter(isVisible).length,
      navCount: [...document.querySelectorAll("nav")].filter(isVisible).length,
      duplicateIds,
      missingImageAlt,
      emptyImageAlt,
      unnamedInteractive,
      unlabeledControls,
      smallTouchTargets,
      interactiveCount: interactive.length,
    };
  })()`;
}

async function tabSequence(client, count = 10) {
  await evaluate(client, "document.activeElement?.blur(); document.body.focus(); true");
  const sequence = [];
  for (let index = 0; index < count; index += 1) {
    await client.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await client.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    const focused = await evaluate(client, `(() => {
      const element = document.activeElement;
      if (!element) return null;
      return {
        tag: element.tagName.toLowerCase(),
        id: element.id || null,
        text: (element.getAttribute("aria-label") || element.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 120),
      };
    })()`);
    sequence.push(focused);
  }
  return sequence;
}

const baseUrl = new URL(option("base-url", process.env.PROOF_BASE_URL ?? "http://127.0.0.1:4173"));
const routes = selectRoutes(option("routes", ""));
const viewports = selectViewports(option("widths", "1440,390"));
const outputDirectory = option("output", "") || await mkdtemp(path.join(tmpdir(), "oluk-a11y-smoke-"));
await mkdir(outputDirectory, { recursive: true });

const chrome = await launchChrome();
const results = [];
let failed = false;

try {
  for (const route of routes) {
    for (const viewport of viewports) {
      const { client, targetId } = await createPage(chrome.port);
      try {
        await setViewport(client, viewport);
        await navigate(client, new URL(route.path, baseUrl).href);
        const dom = await evaluate(client, domAuditExpression());
        await client.send("Accessibility.enable");
        const { nodes: accessibilityNodes } = await client.send("Accessibility.getFullAXTree", { depth: -1 });
        const unnamedAxInteractive = accessibilityNodes
          .filter((node) => !node.ignored && ["button", "link", "checkbox", "radio", "textbox", "combobox", "searchbox", "tab", "image"].includes(node.role?.value) && !node.name?.value)
          .map((node) => ({ nodeId: node.nodeId, role: node.role?.value }));
        const focusSequence = await tabSequence(client);
        await client.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
        const reducedMotion = await evaluate(client, `({
          mediaMatches: matchMedia("(prefers-reduced-motion: reduce)").matches,
          activeAnimations: document.getAnimations().filter((animation) => animation.playState === "running").length,
        })`);
        const failures = [];
        const warnings = [];
        if (!dom.lang) failures.push("html lang is missing");
        if (!dom.title) failures.push("document title is missing");
        if (dom.h1Count !== 1) failures.push(`expected one visible h1; found ${dom.h1Count}`);
        if (dom.mainCount !== 1) failures.push(`expected one visible main; found ${dom.mainCount}`);
        if (dom.duplicateIds.length > 0) failures.push(`duplicate ids: ${dom.duplicateIds.join(", ")}`);
        if (dom.missingImageAlt.length > 0) failures.push(`images without alt attributes: ${dom.missingImageAlt.join(", ")}`);
        if (dom.unnamedInteractive.length > 0) failures.push(`unnamed interactive controls: ${dom.unnamedInteractive.join(", ")}`);
        if (dom.unlabeledControls.length > 0) failures.push(`unlabelled form controls: ${dom.unlabeledControls.join(", ")}`);
        if (unnamedAxInteractive.length > 0) failures.push(`${unnamedAxInteractive.length} unnamed controls in accessibility tree`);
        if (!focusSequence.some((item) => item && item.tag !== "body")) failures.push("Tab did not reach an interactive element");
        if (dom.emptyImageAlt.length > 0) warnings.push(`decorative images requiring review: ${dom.emptyImageAlt.join(", ")}`);
        if (dom.smallTouchTargets.length > 0) failures.push(`${dom.smallTouchTargets.length} targets below the 24px minimum target threshold`);
        if (!reducedMotion.mediaMatches) failures.push("reduced-motion emulation did not apply");
        if (reducedMotion.activeAnimations > 0) warnings.push(`${reducedMotion.activeAnimations} animation(s) remain active under reduced motion`);
        if (failures.length > 0) failed = true;
        results.push({ route: route.path, viewport, status: failures.length === 0 ? "PASS" : "FAIL", failures, warnings, dom, unnamedAxInteractive, focusSequence, reducedMotion });
      } catch (error) {
        failed = true;
        results.push({ route: route.path, viewport, status: "ERROR", failures: [error instanceof Error ? error.message : String(error)] });
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
  run: "MF-09_ACCESSIBILITY_SMOKE",
  candidateState: "HUMAN_REVIEW_REQUIRED_UNPUBLISHED",
  generatedAt: new Date().toISOString(),
  baseUrl: baseUrl.href,
  outputDirectory,
  routeCount: routes.length,
  widthCount: viewports.length,
  caseCount: results.length,
  passCount: results.filter(({ status }) => status === "PASS").length,
  failCount: results.filter(({ status }) => status !== "PASS").length,
  results,
};
await writeFile(path.join(outputDirectory, "mf09-accessibility-smoke.json"), `${JSON.stringify(receipt, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ ...receipt, results: results.map(({ route, viewport, status, failures, warnings }) => ({ route, width: viewport.width, status, failures, warnings })) }, null, 2)}\n`);
if (failed) process.exitCode = 1;
