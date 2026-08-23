#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { capturePng, closePage, createPage, launchChrome, navigate, setViewport } from "./chrome-cdp.mjs";
import { routeSlug } from "./route-matrix.mjs";

function option(name, fallback = "") {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) ?? fallback;
}
const receiptPath = option("decision-receipt");
if (!receiptPath) throw new Error("Champion mode requires --decision-receipt=/absolute/path.json");
const baseUrl = new URL(option("base-url", process.env.PROOF_BASE_URL ?? "http://127.0.0.1:4173"));
const outputDirectory = option("output") || await mkdtemp(path.join(tmpdir(), "oluk-champion-capture-"));
const reviewPayload = JSON.parse(await readFile(path.resolve("public/.well-known/oluk-review-studio.json"), "utf8"));
const decisionReceipt = JSON.parse(await readFile(receiptPath, "utf8"));
if (decisionReceipt.schemaVersion !== "oluk.champion-review.v1") throw new Error("Unsupported champion receipt schema");
if (decisionReceipt.designContractHash !== reviewPayload.designContractHash || decisionReceipt.sourceTreeHash !== reviewPayload.sourceTreeHash) throw new Error("Champion receipt is stale for this design contract or source tree");
await mkdir(outputDirectory, { recursive: true });

const decisions = [
  ...decisionReceipt.families.filter(({ decision }) => decision === "approved" || decision === "deferred").map((entry) => ({ kind:"family", ...entry })),
  ...decisionReceipt.moduleGroups.filter(({ decision }) => decision === "approved" || decision === "deferred").map((entry) => ({ kind:"module", ...entry })),
];
const championWidths = [1440, 1024, 768, 390];
const viewportHeights = { 1440: 1000, 1024: 900, 768: 900, 390: 844 };
const chrome = await launchChrome();
const results = [];
try {
  for (const decision of decisions) {
    const targets = decision.kind === "family"
      ? decision.representativeRoutes.map((route) => ({ route, url: route }))
      : [{ route:`/review-studio?module=${decision.id}`, url:`/review-studio?module=${decision.id}` }];
    const images = [];
    for (const target of targets) for (const width of championWidths) {
      const { client, targetId } = await createPage(chrome.port);
      try {
        await setViewport(client, { width, height: viewportHeights[width] });
        await navigate(client, new URL(target.url, baseUrl).href);
        const filename = `${decision.kind}-${decision.id}--${routeSlug(target.route.split("?")[0])}--${width}.png`;
        await capturePng(client, path.join(outputDirectory, filename), { fullPage:false });
        const sha256 = createHash("sha256").update(await readFile(path.join(outputDirectory, filename))).digest("hex");
        images.push({ route:target.route, width, filename, sha256 });
      } finally { await closePage(chrome.port, client, targetId); }
    }
    const sheet = `${decision.kind}-${decision.id}.html`;
    const cards = images.map((image) => `<figure><img alt="${image.route} at ${image.width}px" src="${image.filename}"><figcaption>${image.route} · ${image.width}px</figcaption></figure>`).join("");
    await writeFile(path.join(outputDirectory, sheet), `<!doctype html><meta charset="utf-8"><title>${decision.id}</title><style>body{font:16px sans-serif;background:#f7f8fc;color:#101114;margin:24px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}figure{margin:0;background:white;padding:12px;border:1px solid #becfe9;border-radius:16px}img{width:100%;height:auto;display:block}figcaption{padding:10px 2px 0}</style><h1>${decision.id}</h1><main>${cards}</main>`);
    results.push({ id:decision.id, kind:decision.kind, decision:decision.decision, baselineState:decision.decision === "approved" ? "CHAMPION_APPROVED" : "DEFERRED", contactSheet:sheet, images });
  }
} finally { await chrome.close(); }
const consolidated = { schemaVersion:"oluk.champion-capture.v1", status:"HUMAN_REVIEW_RECORDED_UNPUBLISHED", generatedAt:new Date().toISOString(), sourceGitSha:decisionReceipt.sourceGitSha, sourceTreeHash:decisionReceipt.sourceTreeHash, designContractHash:decisionReceipt.designContractHash, decisionReceiptHash:createHash("sha256").update(await readFile(receiptPath)).digest("hex"), widths:championWidths, results };
await writeFile(path.join(outputDirectory,"champion-capture-receipt.json"), `${JSON.stringify(consolidated,null,2)}\n`);
process.stdout.write(`${JSON.stringify({outputDirectory,decisionCount:results.length,imageCount:results.reduce((sum,item)=>sum+item.images.length,0)},null,2)}\n`);
