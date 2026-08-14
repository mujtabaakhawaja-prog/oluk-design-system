#!/usr/bin/env node

import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  closePage,
  createPage,
  evaluate,
  launchChrome,
  navigate,
  setViewport,
} from "./chrome-cdp.mjs";

function option(name, fallback) {
  const prefix = `--${name}=`;
  return process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length) ?? fallback;
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitFor(client, expression, message, timeoutMs = 12_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (await evaluate(client, expression)) return;
    await delay(50);
  }
  throw new Error(`Timed out: ${message}`);
}

function serialized(value) {
  return JSON.stringify(value);
}

async function inspect(client, expression) {
  return evaluate(client, `(() => (${expression}))()`);
}

function suite(id, route, viewport) {
  return { id, route, viewport, status: "PASS", cases: [] };
}

async function proofCase(targetSuite, id, run) {
  try {
    const evidence = await run();
    targetSuite.cases.push({ id, status: "PASS", evidence: evidence ?? null });
  } catch (error) {
    targetSuite.status = "FAIL";
    targetSuite.cases.push({
      id,
      status: "FAIL",
      failure: error instanceof Error ? error.message : String(error),
    });
  }
}

function requireCondition(condition, message, evidence) {
  if (!condition) throw new Error(message);
  return evidence;
}

async function clickByText(client, selector, label) {
  return inspect(client, `(() => {
    const wanted = ${serialized(label)};
    const element = [...document.querySelectorAll(${serialized(selector)})]
      .find((candidate) => candidate.textContent?.trim() === wanted);
    if (!element) return { clicked: false, reason: "missing", wanted };
    element.click();
    return { clicked: true, text: element.textContent?.trim() ?? "" };
  })()`);
}

async function chooseRadio(client, legend, label) {
  return inspect(client, `(() => {
    const fieldset = [...document.querySelectorAll("fieldset")]
      .find((candidate) => candidate.querySelector("legend")?.textContent?.trim() === ${serialized(legend)});
    const control = fieldset && [...fieldset.querySelectorAll("label")]
      .find((candidate) => candidate.textContent?.trim() === ${serialized(label)})?.querySelector("input");
    if (!control) return { clicked: false };
    control.click();
    return { clicked: true, checked: control.checked, value: control.value };
  })()`);
}

async function setSearchValue(client, selector, value) {
  return inspect(client, `(() => {
    const input = document.querySelector(${serialized(selector)});
    if (!(input instanceof HTMLInputElement)) return { changed: false };
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    setter?.call(input, ${serialized(value)});
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return { changed: true, value: input.value };
  })()`);
}

async function submitLookup(client, reference) {
  await setSearchValue(client, "#record-reference", reference);
  await inspect(client, `(() => {
    const button = document.querySelector("form.lookup-input button[type='submit']");
    if (!(button instanceof HTMLButtonElement)) return false;
    button.click();
    return true;
  })()`);
  const expected = new URLSearchParams({ reference }).toString();
  await waitFor(
    client,
    `location.search === ${serialized(`?${expected}`)}`,
    `lookup navigation for ${reference}`,
  );
}

async function ownerReviewSuite(chromePort, baseUrl) {
  const targetSuite = suite("owner-review-local-state-harness", "/review", { width: 1440, height: 1000 });
  const { client, targetId } = await createPage(chromePort);
  const callbackRequests = [];
  const webSockets = [];
  client.on("Network.requestWillBeSent", (request) => {
    if (["Fetch", "XHR", "EventSource"].includes(request.type)) {
      callbackRequests.push({ type: request.type, method: request.request?.method, url: request.request?.url });
    }
  });
  client.on("Network.webSocketCreated", (request) => {
    webSockets.push({ type: "WebSocket", url: request.url });
  });

  try {
    await setViewport(client, targetSuite.viewport);
    await navigate(client, new URL(targetSuite.route, baseUrl).href);
    await waitFor(client, `document.querySelector("[data-owner-only='true']") !== null`, "owner harness hydration");
    await delay(300);
    callbackRequests.length = 0;
    webSockets.length = 0;

    await proofCase(targetSuite, "owner-only-authority-guard", async () => {
      const state = await inspect(client, `(() => {
        const root = document.querySelector("[data-owner-only='true']");
        return root ? {
          ownerOnly: root.getAttribute("data-owner-only"),
          runtimeAuthority: root.getAttribute("data-runtime-authority"),
          networkAuthority: root.getAttribute("data-network-authority"),
          copy: root.textContent?.includes("There are no network") ?? false,
        } : null;
      })()`);
      return requireCondition(
        state?.ownerOnly === "true" && state.runtimeAuthority === "none" && state.networkAuthority === "none" && state.copy,
        `owner-only guard mismatch: ${JSON.stringify(state)}`,
        state,
      );
    });

    await proofCase(targetSuite, "exact-mk-2866-truth", async () => {
      const text = await inspect(client, `document.querySelector("[data-owner-only='true']")?.textContent?.replace(/\\s+/g, " ").trim() ?? ""`);
      const exact = ["SARM SERIES", "MK-2866", "Ostarine", "80529-01", "15 MG", "90 SERVINGS", ">99%", "£43", "OPENLAB VERIFIED"];
      const missing = exact.filter((value) => !text.includes(value));
      return requireCondition(missing.length === 0 && !/90 CAPS(?:\\b|ULES)/i.test(text), `MK truth drift: ${missing.join(", ")}`, { exact, missing, has90Caps: /90 CAPS(?:\\b|ULES)/i.test(text) });
    });

    await proofCase(targetSuite, "keyboard-tabs-arrow-navigation", async () => {
      await inspect(client, `(() => {
        const tab = [...document.querySelectorAll("[role='tab']")].find((candidate) => candidate.textContent?.trim() === "Product");
        tab?.focus();
        return Boolean(tab);
      })()`);
      await client.send("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
      await client.send("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
      await waitFor(client, `[...document.querySelectorAll("[role='tab']")].some((tab) => tab.textContent?.trim() === "Evidence" && tab.getAttribute("aria-selected") === "true" && document.activeElement === tab)`, "Evidence tab keyboard selection");
      return inspect(client, `({ selected: document.activeElement?.textContent?.trim(), role: document.activeElement?.getAttribute("role") })`);
    });

    await proofCase(targetSuite, "record-search", async () => {
      await setSearchValue(client, "input[type='search'][placeholder='Record ID or method']", "0526");
      await waitFor(client, `[...document.querySelectorAll("[aria-live='polite']")].some((node) => node.textContent?.includes("1 local record"))`, "filtered record count");
      const evidence = await inspect(client, `({ query: document.querySelector("input[type='search'][placeholder='Record ID or method']")?.value, count: [...document.querySelectorAll("[aria-live='polite']")].find((node) => node.textContent?.includes("local record"))?.textContent?.trim() })`);
      return requireCondition(evidence.query === "0526" && evidence.count?.includes("1 local record"), "record search did not filter", evidence);
    });

    await proofCase(targetSuite, "record-type-filter", async () => {
      const choice = await chooseRadio(client, "Filter records by evidence type", "Purity");
      await waitFor(client, `document.querySelector("input[value='purity']")?.checked === true`, "Purity filter selection");
      return requireCondition(choice.clicked, "Purity filter missing", choice);
    });

    await proofCase(targetSuite, "record-reveal", async () => {
      await clickByText(client, "button", "Reveal record details");
      await waitFor(client, `[...document.querySelectorAll("button")].some((button) => button.textContent?.trim() === "Hide record details" && button.getAttribute("aria-expanded") === "true")`, "record reveal");
      const evidence = await inspect(client, `(() => {
        const button = [...document.querySelectorAll("button")].find((candidate) => candidate.textContent?.trim() === "Hide record details");
        const detail = button?.getAttribute("aria-controls") ? document.getElementById(button.getAttribute("aria-controls")) : null;
        return { expanded: button?.getAttribute("aria-expanded"), detailVisible: Boolean(detail && !detail.hidden), text: detail?.textContent?.trim() };
      })()`);
      return requireCondition(evidence.expanded === "true" && evidence.detailVisible, "record detail did not reveal", evidence);
    });

    await proofCase(targetSuite, "commerce-tab-selection", async () => {
      await clickByText(client, "[role='tab']", "Commerce");
      await waitFor(client, `[...document.querySelectorAll("[role='tab']")].some((tab) => tab.textContent?.trim() === "Commerce" && tab.getAttribute("aria-selected") === "true")`, "Commerce tab selection");
      return inspect(client, `({ selected: [...document.querySelectorAll("[role='tab']")].find((tab) => tab.getAttribute("aria-selected") === "true")?.textContent?.trim() })`);
    });

    await proofCase(targetSuite, "quantity-change", async () => {
      await inspect(client, `(() => {
        const button = document.querySelector("button[aria-label='Increase MK-2866 quantity']");
        if (!(button instanceof HTMLButtonElement)) return false;
        button.click();
        return true;
      })()`);
      await waitFor(client, `document.querySelector("output[aria-label='MK-2866 quantity']")?.textContent?.trim() === "2"`, "quantity increment");
      return inspect(client, `({ quantity: document.querySelector("output[aria-label='MK-2866 quantity']")?.textContent?.trim(), live: document.querySelector("[data-owner-only='true'] [role='status']")?.textContent?.trim() })`);
    });

    await proofCase(targetSuite, "added-local-state", async () => {
      await clickByText(client, "button", "Add locally");
      await waitFor(client, `[...document.querySelectorAll("button")].some((button) => button.textContent?.trim() === "Added locally" && button.getAttribute("data-added") === "true")`, "local added state");
      const evidence = await inspect(client, `({ button: [...document.querySelectorAll("button")].find((button) => button.getAttribute("data-added") === "true")?.textContent?.trim(), receipt: [...document.querySelectorAll("dd")].some((node) => node.textContent?.includes("YES · LOCAL ONLY")) })`);
      return requireCondition(evidence.button === "Added locally" && evidence.receipt, "added receipt mismatch", evidence);
    });

    await proofCase(targetSuite, "unavailable-local-state", async () => {
      await chooseRadio(client, "Choose a local inventory specimen", "Unavailable");
      await waitFor(client, `[...document.querySelectorAll("button")].some((button) => button.textContent?.trim() === "Unavailable" && button.disabled)`, "unavailable state");
      return inspect(client, `({ inventory: [...document.querySelectorAll("dd")].find((node) => node.textContent?.trim() === "UNAVAILABLE")?.textContent?.trim(), disabled: [...document.querySelectorAll("button")].some((button) => button.textContent?.trim() === "Unavailable" && button.disabled) })`);
    });

    await proofCase(targetSuite, "out-of-stock-local-state", async () => {
      await chooseRadio(client, "Choose a local inventory specimen", "Out of stock");
      await waitFor(client, `[...document.querySelectorAll("button")].some((button) => button.textContent?.trim() === "Out of stock" && button.disabled)`, "out-of-stock state");
      return inspect(client, `({ inventory: [...document.querySelectorAll("dd")].find((node) => node.textContent?.trim() === "OUT OF STOCK")?.textContent?.trim(), disabled: [...document.querySelectorAll("button")].some((button) => button.textContent?.trim() === "Out of stock" && button.disabled) })`);
    });

    await proofCase(targetSuite, "reset-local-states", async () => {
      await clickByText(client, "button", "Reset local states");
      await waitFor(client, `[...document.querySelectorAll("[role='tab']")].some((tab) => tab.textContent?.trim() === "Product" && tab.getAttribute("aria-selected") === "true")`, "reset to Product tab");
      await clickByText(client, "[role='tab']", "Commerce");
      await waitFor(client, `document.querySelector("output[aria-label='MK-2866 quantity']")?.textContent?.trim() === "1"`, "reset quantity");
      const evidence = await inspect(client, `({ quantity: document.querySelector("output[aria-label='MK-2866 quantity']")?.textContent?.trim(), ready: document.querySelector("input[value='ready']")?.checked, added: [...document.querySelectorAll("dd")].some((node) => node.textContent?.trim() === "YES · LOCAL ONLY"), callback: [...document.querySelectorAll("dd")].some((node) => node.textContent?.trim() === "NONE") })`);
      return requireCondition(evidence.quantity === "1" && evidence.ready && !evidence.added && evidence.callback, "reset state mismatch", evidence);
    });

    await proofCase(targetSuite, "zero-runtime-network-callbacks", async () => {
      await delay(250);
      const requests = [...callbackRequests, ...webSockets];
      return requireCondition(requests.length === 0, `owner harness emitted network callbacks: ${JSON.stringify(requests)}`, { requestCount: requests.length, requests });
    });
  } finally {
    await closePage(chromePort, client, targetId);
  }

  return targetSuite;
}

async function shopSuite(chromePort, baseUrl) {
  const targetSuite = suite("shop-combinable-facets", "/shop?search=mk", { width: 1440, height: 1000 });
  const { client, targetId } = await createPage(chromePort);
  try {
    await setViewport(client, targetSuite.viewport);
    await navigate(client, new URL(targetSuite.route, baseUrl).href);
    await waitFor(client, `document.querySelector(".shop-discovery") !== null`, "Shop discovery hydration");

    await proofCase(targetSuite, "query-seeded-results", async () => {
      await waitFor(client, `[...document.querySelectorAll("output")].some((node) => node.textContent?.includes("for “mk”"))`, "Shop query output");
      const evidence = await inspect(client, `({ search: location.search, output: [...document.querySelectorAll("output")].find((node) => node.textContent?.includes("for “mk”"))?.textContent?.replace(/\\s+/g, " ").trim() })`);
      return requireCondition(evidence.search.includes("search=mk"), "Shop query missing", evidence);
    });

    const facets = [
      ["Family", "SARMs", "family", "sarms"],
      ["Goal", "Strength", "goal", "strength"],
      ["Form", "Capsules", "form", "capsules"],
      ["Servings", "90 servings", "servings", "90"],
      ["Availability", "In stock", "availability", "in-stock"],
    ];
    for (const [legend, label, key, value] of facets) {
      await proofCase(targetSuite, `facet-${key}`, async () => {
        const choice = await chooseRadio(client, legend, label);
        await waitFor(client, `new URLSearchParams(location.search).getAll(${serialized(key)}).includes(${serialized(value)})`, `${legend} URL facet`);
        const evidence = await inspect(client, `({ search: location.search, checked: Boolean([...document.querySelectorAll("fieldset")].find((fieldset) => fieldset.querySelector("legend")?.textContent?.trim() === ${serialized(legend)})?.querySelector("input:checked")), selectedValue: new URLSearchParams(location.search).getAll(${serialized(key)}) })`);
        return requireCondition(choice.clicked && evidence.checked && evidence.selectedValue.includes(value), `${legend} facet mismatch`, evidence);
      });
    }

    await proofCase(targetSuite, "combined-query-and-five-facets", async () => {
      await waitFor(client, `[...document.querySelectorAll(".catalogue-toolbar output")].some((node) => node.textContent?.includes("1 product") && node.textContent?.includes("5 filters") && node.textContent?.includes("for “mk”"))`, "combined Shop result");
      const evidence = await inspect(client, `({ output: document.querySelector(".catalogue-toolbar output")?.textContent?.replace(/\\s+/g, " ").trim(), products: [...document.querySelectorAll(".shop-result-card :is(h2, h3)")].map((node) => node.textContent?.trim()), selectionLaw: document.querySelector(".shop-discovery")?.getAttribute("data-selection-law"), liveAuthority: document.querySelector(".shop-discovery")?.getAttribute("data-live-authority") })`);
      return requireCondition(evidence.products.length === 1 && evidence.products[0] === "MK-2866" && evidence.selectionLaw === "or-within-and-across" && evidence.liveAuthority === "false", "combined facet result mismatch", evidence);
    });

    await setViewport(client, { width: 390, height: 844 });
    await navigate(client, new URL("/shop", baseUrl).href);
    await waitFor(client, `document.querySelector(".filter-toggle") !== null`, "mobile Shop filter disclosure");

    await proofCase(targetSuite, "mobile-filter-disclosure-closed", async () => {
      const evidence = await inspect(client, `(() => {
        const button = document.querySelector(".filter-toggle");
        const groups = document.querySelector("#shop-filter-groups");
        return { expanded: button?.getAttribute("aria-expanded"), text: button?.textContent?.trim(), open: groups?.getAttribute("data-open"), display: groups ? getComputedStyle(groups).display : null };
      })()`);
      return requireCondition(evidence.expanded === "false" && evidence.open === "false" && evidence.display === "none", "mobile disclosure should start closed", evidence);
    });

    await proofCase(targetSuite, "mobile-filter-disclosure-open-close", async () => {
      await clickByText(client, ".filter-toggle", "Open");
      await waitFor(client, `document.querySelector(".filter-toggle")?.getAttribute("aria-expanded") === "true" && getComputedStyle(document.querySelector("#shop-filter-groups")).display !== "none"`, "mobile disclosure open");
      const opened = await inspect(client, `({ expanded: document.querySelector(".filter-toggle")?.getAttribute("aria-expanded"), text: document.querySelector(".filter-toggle")?.textContent?.trim(), display: getComputedStyle(document.querySelector("#shop-filter-groups")).display })`);
      await clickByText(client, ".filter-toggle", "Close");
      await waitFor(client, `document.querySelector(".filter-toggle")?.getAttribute("aria-expanded") === "false" && getComputedStyle(document.querySelector("#shop-filter-groups")).display === "none"`, "mobile disclosure close");
      const closed = await inspect(client, `({ expanded: document.querySelector(".filter-toggle")?.getAttribute("aria-expanded"), text: document.querySelector(".filter-toggle")?.textContent?.trim(), display: getComputedStyle(document.querySelector("#shop-filter-groups")).display })`);
      return requireCondition(opened.expanded === "true" && closed.expanded === "false", "mobile disclosure toggle mismatch", { opened, closed });
    });
  } finally {
    await closePage(chromePort, client, targetId);
  }
  return targetSuite;
}

async function lookupSuite(chromePort, baseUrl) {
  const targetSuite = suite("openlab-lookup-transitions", "/open-lab/batch-lookup", { width: 1024, height: 900 });
  const { client, targetId } = await createPage(chromePort);
  try {
    await setViewport(client, targetSuite.viewport);
    await navigate(client, new URL(targetSuite.route, baseUrl).href);
    await waitFor(client, `document.querySelector("#record-reference") !== null`, "lookup form hydration");

    await proofCase(targetSuite, "lookup-empty-state", async () => {
      const evidence = await inspect(client, `({ state: document.querySelector("[data-presentation-state]")?.getAttribute("data-presentation-state"), title: document.querySelector("[data-presentation-state] h3")?.textContent?.trim(), input: document.querySelector("#record-reference")?.value })`);
      return requireCondition(evidence.state === "empty" && evidence.input === "", "lookup did not start empty", evidence);
    });

    await proofCase(targetSuite, "lookup-no-result-transition", async () => {
      await submitLookup(client, "NO-MATCH");
      await waitFor(client, `document.querySelector("[data-presentation-state='no-result']") !== null`, "no-result state");
      const evidence = await inspect(client, `({ state: document.querySelector("[data-presentation-state]")?.getAttribute("data-presentation-state"), invalid: document.querySelector("#record-reference")?.getAttribute("aria-invalid"), title: document.querySelector("[data-presentation-state] h3")?.textContent?.trim() })`);
      return requireCondition(evidence.state === "no-result" && evidence.invalid === "true", "no-result semantics mismatch", evidence);
    });

    await proofCase(targetSuite, "lookup-found-transition", async () => {
      await submitLookup(client, "MK-2866");
      await waitFor(client, `document.querySelector("[data-presentation-state='found']") !== null`, "found state");
      const evidence = await inspect(client, `({ state: document.querySelector("[data-presentation-state]")?.getAttribute("data-presentation-state"), title: document.querySelector("[data-presentation-state] h3")?.textContent?.trim(), product: [...document.querySelectorAll("h3")].some((node) => node.textContent?.trim() === "MK-2866") })`);
      return requireCondition(evidence.state === "found" && evidence.product, "found product mismatch", evidence);
    });

    await proofCase(targetSuite, "lookup-found-truth-boundary", async () => {
      const evidence = await inspect(client, `(() => {
        const card = document.querySelector(".lookup-card .product-commerce-card");
        const metrics = [...(card?.querySelectorAll(".metric-rail > div") ?? [])].map((cell) => ({ value: cell.querySelector("dt")?.textContent?.trim(), label: cell.querySelector("dd")?.textContent?.trim() }));
        const text = card?.textContent?.replace(/\\s+/g, " ").trim() ?? "";
        return { text, metrics, name: card?.querySelector("h3")?.textContent?.trim(), price: [...(card?.querySelectorAll("strong") ?? [])].map((node) => node.textContent?.trim()).find((value) => value === "£43"), fabricatedMeasuredPurity: /99\\.\\d+%/.test(text) };
      })()`);
      const metricTruth = evidence.metrics.some((metric) => metric.value === "15 MG" && metric.label === "STRENGTH")
        && evidence.metrics.some((metric) => metric.value === "90" && metric.label === "SERVINGS")
        && evidence.metrics.some((metric) => metric.value === ">99%" && metric.label === "PURITY");
      return requireCondition(evidence.name === "MK-2866" && evidence.price === "£43" && metricTruth && !evidence.fabricatedMeasuredPurity, "lookup found truth drift", evidence);
    });

    await proofCase(targetSuite, "lookup-unavailable-transition", async () => {
      await submitLookup(client, "OL-MK2866-PENDING");
      await waitFor(client, `document.querySelector("[data-presentation-state='unavailable']") !== null`, "unavailable state");
      const evidence = await inspect(client, `({ state: document.querySelector("[data-presentation-state]")?.getAttribute("data-presentation-state"), title: document.querySelector("[data-presentation-state] h3")?.textContent?.trim(), productCard: Boolean(document.querySelector(".lookup-card .product-commerce-card")) })`);
      return requireCondition(evidence.state === "unavailable" && !evidence.productCard, "unavailable boundary mismatch", evidence);
    });
  } finally {
    await closePage(chromePort, client, targetId);
  }
  return targetSuite;
}

async function transactionSuite(chromePort, baseUrl) {
  const transactionRoutes = [
    "/bag",
    "/checkout",
    "/checkout/delivery",
    "/checkout/payment-handoff",
    "/checkout/order-pay",
    "/checkout/confirmation",
    "/checkout/failure",
    "/checkout/retry",
  ];
  const targetSuite = suite("static-transaction-zero-callbacks", "MF-07 lifecycle", { width: 1440, height: 1000 });
  const { client, targetId } = await createPage(chromePort);
  const callbackRequests = [];
  const webSockets = [];
  client.on("Network.requestWillBeSent", (request) => {
    if (["Fetch", "XHR", "EventSource"].includes(request.type)) {
      callbackRequests.push({ type: request.type, method: request.request?.method, url: request.request?.url });
    }
  });
  client.on("Network.webSocketCreated", (request) => {
    webSockets.push({ type: "WebSocket", url: request.url });
  });

  try {
    await setViewport(client, targetSuite.viewport);
    for (const route of transactionRoutes) {
      await proofCase(targetSuite, `inert-${route.replaceAll("/", "-").replace(/^-/, "")}`, async () => {
        await navigate(client, new URL(route, baseUrl).href);
        await waitFor(client, `document.querySelector("[data-live-authority='false']") !== null`, `${route} static authority marker`);
        await delay(250);
        callbackRequests.length = 0;
        webSockets.length = 0;
        const surface = await inspect(client, `(() => {
          const transaction = document.querySelector("[data-live-authority='false'][data-transaction-stage]");
          const withinTransaction = (selector) => transaction ? [...transaction.querySelectorAll(selector)] : [];
          return {
            authority: transaction?.getAttribute("data-live-authority"),
            forms: withinTransaction("form").length,
            enabledButtons: withinTransaction("button").filter((button) => !button.disabled).length,
            externalActions: withinTransaction("a").filter((link) => {
              try { return new URL(link.href, location.href).origin !== location.origin; } catch { return true; }
            }).length,
            paymentScripts: [...document.scripts].filter((script) => /stripe|paypal|woocommerce|biaspay|payment/i.test(script.src)).map((script) => script.src),
          };
        })()`);
        await delay(200);
        const requests = [...callbackRequests, ...webSockets];
        return requireCondition(
          surface.authority === "false" && surface.forms === 0 && surface.enabledButtons === 0 && surface.externalActions === 0 && surface.paymentScripts.length === 0 && requests.length === 0,
          `${route} crossed the inert transaction boundary: ${JSON.stringify({ surface, requests })}`,
          { route, surface, requests },
        );
      });
    }
  } finally {
    await closePage(chromePort, client, targetId);
  }
  return targetSuite;
}

const baseUrl = new URL(option("base-url", process.env.PROOF_BASE_URL ?? "http://127.0.0.1:4173"));
const outputDirectory = path.resolve(option("output", "") || await mkdtemp(path.join(tmpdir(), "oluk-interaction-proof-")));
await mkdir(outputDirectory, { recursive: true });

const chrome = await launchChrome();
const suites = [];
try {
  suites.push(await ownerReviewSuite(chrome.port, baseUrl));
  suites.push(await shopSuite(chrome.port, baseUrl));
  suites.push(await lookupSuite(chrome.port, baseUrl));
  suites.push(await transactionSuite(chrome.port, baseUrl));
} finally {
  await chrome.close();
}

const cases = suites.flatMap((targetSuite) => targetSuite.cases.map((result) => ({ suite: targetSuite.id, ...result })));
const receipt = {
  schemaVersion: "oluk.interaction-state-proof.v1",
  run: "CX-NEXT-037_INTERACTION_STATE_PROOF",
  candidateState: "HUMAN_REVIEW_REQUIRED_UNPUBLISHED",
  generatedAt: new Date().toISOString(),
  baseUrl: baseUrl.href,
  outputDirectory,
  constraints: {
    ownerHarness: "OWNER_ONLY_LOCAL_STATE",
    runtimeMutationAuthorized: false,
    customerUiMutationPerformed: false,
    evidencePublicationAuthorized: false,
  },
  suiteCount: suites.length,
  caseCount: cases.length,
  passCount: cases.filter(({ status }) => status === "PASS").length,
  failCount: cases.filter(({ status }) => status !== "PASS").length,
  status: cases.every(({ status }) => status === "PASS") ? "PASS" : "FAIL",
  suites,
};

const receiptPath = path.join(outputDirectory, "cx37-interaction-state-proof.json");
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ ...receipt, suites: suites.map(({ id, route, viewport, status, cases: suiteCases }) => ({ id, route, viewport, status, passCount: suiteCases.filter(({ status: caseStatus }) => caseStatus === "PASS").length, failCount: suiteCases.filter(({ status: caseStatus }) => caseStatus !== "PASS").length })) }, null, 2)}\n`);
if (receipt.status !== "PASS") process.exitCode = 1;
