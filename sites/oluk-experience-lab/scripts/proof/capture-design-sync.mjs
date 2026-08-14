#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  capturePng,
  closePage,
  createPage,
  evaluate,
  launchChrome,
  navigate,
  setViewport,
} from "./chrome-cdp.mjs";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const repoRoot = path.resolve(siteRoot, "../..");
const option = (name, fallback) => process.argv.find((argument) => argument.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const outputDirectory = path.resolve(option("output", "/tmp/oluk-design-sync-captures"));
const baseUrl = new URL(option("base-url", process.env.PROOF_BASE_URL ?? "http://127.0.0.1:4173"));
const registryPath = path.join(repoRoot, "authority/DESIGN-SYNC-REGISTRY.json");
const registry = JSON.parse(await readFile(registryPath, "utf8"));
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

const sha256 = async (filePath) => createHash("sha256").update(await readFile(filePath)).digest("hex");
const routeSlug = (pathname) => pathname === "/" ? "home" : pathname.replace(/^\//, "").replaceAll("/", "--");
const settle = `new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))`;

await mkdir(outputDirectory, { recursive: true });
const chrome = await launchChrome();
const captureByPath = new Map();
const errors = [];

try {
  for (const routePath of [...new Set(registry.records.map(({ siteReference }) => siteReference.path))].sort()) {
    const captures = {};
    for (const viewport of viewports) {
      const { client, targetId } = await createPage(chrome.port);
      try {
        await setViewport(client, viewport);
        await navigate(client, new URL(routePath, baseUrl).href);
        await evaluate(client, settle);
        const screenshot = `${routeSlug(routePath)}--${viewport.width}.png`;
        const screenshotPath = path.join(outputDirectory, screenshot);
        await capturePng(client, screenshotPath, { fullPage: false });
        captures[viewport.name] = { screenshot, sha256: await sha256(screenshotPath) };
      } catch (error) {
        errors.push({ routePath, width: viewport.width, error: error instanceof Error ? error.message : String(error) });
      } finally {
        await closePage(chrome.port, client, targetId);
      }
    }
    captureByPath.set(routePath, captures);
  }
} finally {
  await chrome.close();
}

const receipt = {
  schemaVersion: "oluk.design-sync-capture.v1",
  generatedAt: new Date().toISOString(),
  baseUrl: baseUrl.href,
  sourceCommit: option("source-commit", "unresolved"),
  sourceTreeHash: option("source-tree-hash", "unresolved"),
  outputDirectory,
  captures: Object.fromEntries(captureByPath),
  errors,
};
await writeFile(path.join(outputDirectory, "design-sync-capture-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ routeCount: captureByPath.size, captureCount: [...captureByPath.values()].reduce((count, entries) => count + Object.keys(entries).length, 0), errors }, null, 2)}\n`);
if (errors.length > 0) process.exitCode = 1;
