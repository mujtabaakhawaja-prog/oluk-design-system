#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ROUTES } from "./route-matrix.mjs";
import { loadBuiltWorker, renderHtml, visibleText } from "./rendered-audit-utils.mjs";

const FORBIDDEN_CUSTOMER_LANGUAGE = Object.freeze([
  { id: "review-gate", pattern: /\b(?:HUMAN_REVIEW_REQUIRED|human review required)\b/i },
  { id: "internal-work-id", pattern: /\b(?:CONV|CX-NEXT|FG-NEXT)-\d+[A-Z0-9-]*\b/i },
  { id: "internal-mf-id", pattern: /\bMF\s*-?\s*\d{1,2}[A-Z]?\b/i },
  {
    id: "governance-runtime",
    pattern:
      /\b(?:governance|governed|runtime(?: owner| authority| translation)?|backend|back-end|telemetry|WooCommerce|Shopper SSR|tools-service|Code Connect|Figma)\b/i,
  },
  {
    id: "presentation-fixture",
    pattern: /\b(?:(?:design|presentation|route) fixture|demo state|mock state|prototype state|owner-only|not connected)\b/i,
  },
  { id: "source-bound", pattern: /\bsource[-\u2011\u2013 ]bound\b/i },
  { id: "control-plane", pattern: /\b(?:C2|Initiator|Processor)\b/ },
]);

const PROHIBITED_CLAIM_LANGUAGE = Object.freeze([
  {
    id: "medical-performance-claim",
    pattern:
      /\b(?:clinically proven|medical grade|pharmaceutical grade|side[- ]effect free|guaranteed (?:results|purity)|proven to (?:build|burn|increase)|cures?|treats?|prevents?)\b/i,
  },
  { id: "unsupplied-analytical-method", pattern: /\b(?:HPLC|LC-MS|GC-MS|certificate of analysis|COA)\b/i },
  { id: "fabricated-measured-result", pattern: /(?<!>)\b\d{2}(?:\.\d+)?%\b/ },
]);

const REQUIRED_MK2866_TRUTH = Object.freeze([
  "SARM SERIES",
  "MK-2866",
  "Ostarine",
  "80529-01",
  "15 MG",
  "90 SERVINGS",
  ">99%",
  "£43",
]);

const ANALYTICAL_REFERENCE_ROUTES = Object.freeze(["/open-lab"]);

function option(name, fallback = "") {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) ?? fallback;
}

function check(id, pass, detail, evidence = undefined) {
  return { id, status: pass ? "PASS" : "FAIL", detail, ...(evidence === undefined ? {} : { evidence }) };
}

function matchingRuleIds(text, rules) {
  return rules.filter(({ pattern }) => pattern.test(text)).map(({ id }) => id);
}

export async function auditCustomerCopy() {
  const worker = await loadBuiltWorker("customer-copy");
  const customerRoutes = ROUTES.filter(({ customer }) => customer);
  const rendered = [];
  for (const route of customerRoutes) {
    const html = await renderHtml(worker, route.path);
    rendered.push({ route: route.path, html, text: visibleText(html) });
  }

  const governanceHits = rendered.flatMap(({ route, text }) =>
    matchingRuleIds(text, FORBIDDEN_CUSTOMER_LANGUAGE).map((rule) => ({ route, rule })),
  );
  const prohibitedClaimHits = rendered.flatMap(({ route, text }) =>
    matchingRuleIds(text, PROHIBITED_CLAIM_LANGUAGE)
      .filter((rule) =>
        !(
          (rule === "unsupplied-analytical-method" || rule === "fabricated-measured-result") &&
          ANALYTICAL_REFERENCE_ROUTES.some((prefix) => route.startsWith(prefix))
        ),
      )
      .map((rule) => ({ route, rule })),
  );
  const rejectedCommerceHits = rendered.flatMap(({ route, html, text }) => {
    const hits = [];
    if (/90\s+CAPS(?:ULES)?\b/i.test(text)) hits.push("90-caps");
    const approvedPaymentTrustStudy = route.startsWith("/checkout/") &&
      text.includes("£128.97") && text.includes("$175.01") &&
      text.includes("USD equivalent");
    if (/£\d+\.\d{2}\b/.test(text) && !approvedPaymentTrustStudy) hits.push("decimal-price");
    if (/(?:per|\/)\s*serving\b/i.test(text)) hits.push("per-serving-price");
    if (/<(?:del|s)\b/i.test(html)) hits.push("crossed-price");
    return hits.map((rule) => ({ route, rule }));
  });
  const inconsistentProductLabels = rendered.flatMap(({ route, text }) => {
    const hits = [];
    if (/\bMK[ \u2011\u2013]2866\b/.test(text)) hits.push("MK-2866 punctuation");
    if (/\bSARMS SERIES\b/.test(text)) hits.push("SARM SERIES pluralisation");
    if (/\bOstarin(?:e)?\b/i.test(text) && !/\bOstarine\b/.test(text)) hits.push("Ostarine spelling");
    if (/\bOpen[-\u2011\u2013]Lab\b/i.test(text)) hits.push("OpenLab hyphenation");
    return hits.map((rule) => ({ route, rule }));
  });

  const product = rendered.find(({ route }) => route === "/product/mk-2866");
  const missingProductTruth = REQUIRED_MK2866_TRUTH.filter((value) => !product?.text.includes(value));
  const home = rendered.find(({ route }) => route === "/");
  const missingHomeTruth = ["MK-2866", "Ostarine", "15 MG", "90 SERVINGS", ">99%", "£43"].filter(
    (value) => !home?.text.includes(value),
  );
  const shop = rendered.find(({ route }) => route === "/shop");
  const missingShopTruth = ["MK-2866", "Ostarine", "90 SERVINGS", "£43"].filter(
    (value) => !shop?.text.includes(value),
  );
  const unavailableRecord = rendered.find(({ route }) => route === "/open-lab/records/source-bound-record");
  const unavailableRecordTruth = ["MK-2866 evidence record", "Record details are unavailable.", "Unavailable"].filter(
    (value) => !unavailableRecord?.text.includes(value),
  );
  const customerRouteStatus = rendered.map(({ route, text }) => ({
    route,
    visibleCharacters: text.length,
    status:
      governanceHits.some((hit) => hit.route === route) ||
      prohibitedClaimHits.some((hit) => hit.route === route) ||
      rejectedCommerceHits.some((hit) => hit.route === route) ||
      inconsistentProductLabels.some((hit) => hit.route === route)
        ? "FAIL"
        : "PASS",
  }));

  const checks = [
    check(
      "all-customer-routes-rendered",
      rendered.length === customerRoutes.length,
      "Every customer route in the canonical matrix rendered for visible-copy inspection.",
      customerRouteStatus,
    ),
    check(
      "no-governance-or-backend-language",
      governanceHits.length === 0,
      "Customer-visible text contains no review gate, governance, backend, runtime or control-plane vocabulary.",
      governanceHits,
    ),
    check(
      "no-prohibited-claims",
      prohibitedClaimHits.length === 0,
      "Customer-visible text contains no prohibited medical or guaranteed-performance language.",
      prohibitedClaimHits,
    ),
    check(
      "no-rejected-commerce-copy",
      rejectedCommerceHits.length === 0,
      "Customer-visible commerce copy contains no 90 CAPS, ungoverned decimal/crossed price or per-serving price; the locked non-live payment-trust equality study is the sole decimal exception.",
      rejectedCommerceHits,
    ),
    check(
      "consistent-product-and-openlab-labels",
      inconsistentProductLabels.length === 0,
      "Product and OpenLab labels preserve approved punctuation, spelling and series terminology.",
      inconsistentProductLabels,
    ),
    check(
      "mk2866-pdp-truth",
      missingProductTruth.length === 0,
      "The PDP visibly carries every locked MK-2866 product-truth field.",
      { required: REQUIRED_MK2866_TRUTH, missing: missingProductTruth },
    ),
    check(
      "mk2866-cross-route-truth",
      missingHomeTruth.length === 0 && missingShopTruth.length === 0,
      "Homepage and Shop use the same locked MK-2866 name, alias, metric and whole-pound price vocabulary.",
      { missingHomeTruth, missingShopTruth },
    ),
    check(
      "unavailable-evidence-language",
      unavailableRecordTruth.length === 0 &&
        !/(?<!>)\b\d{2}(?:\.\d+)?%\b/.test(unavailableRecord?.text ?? ""),
      "The unavailable record route names the product and state without inventing analytical values.",
      { missing: unavailableRecordTruth },
    ),
  ];

  return {
    schemaVersion: 1,
    run: "CX-NEXT-045_CUSTOMER_COPY_TERMINOLOGY",
    candidateState: "HUMAN_REVIEW_REQUIRED_UNPUBLISHED",
    generatedAt: new Date().toISOString(),
    customerRouteCount: customerRoutes.length,
    routePassCount: customerRouteStatus.filter(({ status }) => status === "PASS").length,
    routeFailCount: customerRouteStatus.filter(({ status }) => status === "FAIL").length,
    passCount: checks.filter(({ status }) => status === "PASS").length,
    failCount: checks.filter(({ status }) => status === "FAIL").length,
    checks,
  };
}

async function main() {
  const receipt = await auditCustomerCopy();
  const output = option("output");
  if (output) await writeFile(path.resolve(output), `${JSON.stringify(receipt, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
  if (receipt.failCount > 0) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
