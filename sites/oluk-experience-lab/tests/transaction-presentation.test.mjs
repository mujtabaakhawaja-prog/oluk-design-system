import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const appRoot = new URL("../app/", import.meta.url);
const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectRelativeImportGraph(entryPath, seen = new Set(), bareImports = new Set()) {
  const resolvedEntry = path.resolve(entryPath);
  if (seen.has(resolvedEntry)) return seen;
  seen.add(resolvedEntry);
  const source = await readFile(resolvedEntry, "utf8");
  const imports = [...source.matchAll(/(?:from\s+|import\s*|import\s*\()["']([^"']+)["']\)?/g)].map((match) => match[1]);
  for (const specifier of imports) {
    if (!specifier.startsWith(".")) {
      bareImports.add(specifier);
      continue;
    }
    if (/\.(?:css|json|svg|png|jpe?g|webp)$/i.test(specifier)) continue;
    const base = path.resolve(path.dirname(resolvedEntry), specifier);
    const candidates = [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts"), path.join(base, "index.tsx")];
    const target = await candidates.reduce(async (foundPromise, candidate) => {
      const found = await foundPromise;
      return found ?? ((await exists(candidate)) ? candidate : null);
    }, Promise.resolve(null));
    if (target) await collectRelativeImportGraph(target, seen, bareImports);
  }
  return seen;
}

const routes = [
  ["bag", "bag"],
  ["checkout", "checkout"],
  ["checkout/delivery", "checkout-delivery"],
  ["checkout/payment-handoff", "checkout-payment-handoff"],
  ["checkout/order-pay", "checkout-order-pay"],
  ["checkout/confirmation", "checkout-confirmation"],
  ["checkout/failure", "checkout-failure"],
  ["checkout/retry", "checkout-retry"],
];

test("MF-07 route pages form one static transaction lifecycle", async () => {
  for (const [pathname, route] of routes) {
    const source = await readFile(new URL(`${pathname}/page.tsx`, appRoot), "utf8");
    if (["checkout/delivery", "checkout/confirmation"].includes(pathname)) {
      assert.match(source, /<CheckoutProgramPage step="(?:delivery|confirmation)"\s*\/>/, pathname);
    } else {
      assert.match(source, new RegExp(`<ExperienceLab\\s+route="${route}"\\s*/>`), pathname);
    }
  }
});

test("transaction presentation preserves exact MK-2866 truth and deterministic inert actions", async () => {
  const source = await readFile(new URL("design-system/transaction-presentation.tsx", appRoot), "utf8");

  for (const truth of [
    "mk2866Fixture.series",
    "mk2866Fixture.name",
    "mk2866Fixture.alias",
    "mk2866Fixture.price",
    "mk2866Fixture.evidencePath",
  ]) {
    assert.match(source, new RegExp(truth.replace(".", "\\.")), truth);
  }

  assert.match(source, /<MetricRail compact product=\{mk2866Fixture\}\s*\/>/);
  assert.match(source, /data-live-authority="false"/);
  assert.match(source, /<button[^>]*disabled[^>]*>Pay \{mk2866Fixture\.price\}<\/button>/);
  assert.doesNotMatch(source, /fetch\s*\(|axios|XMLHttpRequest|use server|server action|woocommerce|stripe|biaspay|initiator|tools-service|C2/i);
  assert.doesNotMatch(source, /90 CAPS(?:\b|ULES)|£43\.00|<del\b/i);
  assert.doesNotMatch(source, /<form\b|\bformAction\s*=|\bonSubmit\s*=/i);
});

test("transaction import graph and dependencies cannot acquire runtime callbacks", async () => {
  const graph = new Set();
  const bareImports = new Set();
  for (const [pathname] of routes) {
    await collectRelativeImportGraph(path.join(siteRoot, `app/${pathname}/page.tsx`), graph, bareImports);
  }
  assert.ok(graph.size >= routes.length + 5, `expected all eight route entries and their shared graph, received ${graph.size} files`);

  const forbiddenRuntime = /\bfetch\s*\(|\baxios\b|\bXMLHttpRequest\b|\bWebSocket\b|\bEventSource\b|\blocalStorage\b|\bsessionStorage\b|\buse server\b|\bserver action\b|\bformAction\b|\bonSubmit\b|\bwoocommerce\b|\bstripe\b|\bbiaspay\b|\binitiator\b|\btools-service\b|\btelemetry\b/i;
  for (const filePath of graph) {
    const source = await readFile(filePath, "utf8");
    assert.doesNotMatch(source, forbiddenRuntime, path.relative(siteRoot, filePath));
  }

  const manifest = JSON.parse(await readFile(path.join(siteRoot, "package.json"), "utf8"));
  const dependencies = Object.keys({
    ...manifest.dependencies,
    ...manifest.devDependencies,
    ...manifest.optionalDependencies,
    ...manifest.peerDependencies,
  });
  const importAndDependencyNames = [...bareImports, ...dependencies];
  assert.equal(
    importAndDependencyNames.filter((name) => /stripe|woocommerce|paypal|adyen|braintree|square|shopify|commerce|payment|biaspay/i.test(name)).length,
    0,
    "transaction route graph must not import or declare commerce or payment SDKs",
  );
});

test("transaction lifecycle connects bag through recovery without customer-facing control vocabulary", async () => {
  const source = await readFile(new URL("design-system/transaction-presentation.tsx", appRoot), "utf8");
  const expectedPaths = [
    "/bag",
    "/checkout",
    "/checkout/delivery",
    "/checkout/payment-handoff",
    "/checkout/order-pay",
    "/checkout/confirmation",
    "/checkout/failure",
    "/checkout/retry",
  ];

  for (const path of expectedPaths) assert.match(source, new RegExp(path.replaceAll("/", "\\/")), path);
  for (const forbidden of ["HUMAN_REVIEW_REQUIRED", "DESIGN FIXTURE", "DEMO STATE", "NOT CONNECTED", "RUNTIME OWNER", "SOURCE-BOUND"]) {
    assert.doesNotMatch(source, new RegExp(forbidden, "i"), forbidden);
  }
});

test("transaction layout recomposes without overflow clipping", async () => {
  const css = await readFile(new URL("transaction-presentation.module.css", appRoot), "utf8");
  assert.match(css, /\.layout,[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\)/);
  assert.match(css, /@media \(max-width: 980px\)[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.fieldGrid,[\s\S]*?grid-template-columns:\s*1fr/);
  assert.doesNotMatch(css, /overflow-x:\s*(?:clip|hidden)/i);
});
