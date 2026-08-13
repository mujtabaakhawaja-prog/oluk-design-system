import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const CHROME_CANDIDATES = [
  process.env.CHROME_BIN,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function executableExists(filePath) {
  try {
    const handle = await import("node:fs/promises").then(({ access }) => access(filePath));
    return handle === undefined;
  } catch {
    return false;
  }
}

export async function resolveChromeBinary() {
  for (const candidate of CHROME_CANDIDATES) {
    if (await executableExists(candidate)) return candidate;
  }
  throw new Error(
    "Chrome was not found. Set CHROME_BIN to a Chrome/Chromium executable before running browser proof.",
  );
}

export class CdpConnection {
  #socket;
  #nextId = 1;
  #pending = new Map();
  #listeners = new Map();

  constructor(webSocketUrl) {
    this.#socket = new WebSocket(webSocketUrl);
  }

  async open() {
    if (this.#socket.readyState === WebSocket.OPEN) return;
    await new Promise((resolve, reject) => {
      this.#socket.addEventListener("open", resolve, { once: true });
      this.#socket.addEventListener("error", reject, { once: true });
    });
    this.#socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (message.id) {
        const pending = this.#pending.get(message.id);
        if (!pending) return;
        this.#pending.delete(message.id);
        if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
        else pending.resolve(message.result ?? {});
        return;
      }
      const listeners = this.#listeners.get(message.method) ?? [];
      for (const listener of [...listeners]) listener(message.params ?? {});
    });
  }

  send(method, params = {}) {
    const id = this.#nextId++;
    return new Promise((resolve, reject) => {
      this.#pending.set(id, { method, resolve, reject });
      this.#socket.send(JSON.stringify({ id, method, params }));
    });
  }

  waitFor(method, timeoutMs = 15_000) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.off(method, listener);
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
      const listener = (params) => {
        clearTimeout(timeout);
        this.off(method, listener);
        resolve(params);
      };
      this.on(method, listener);
    });
  }

  on(method, listener) {
    const listeners = this.#listeners.get(method) ?? [];
    listeners.push(listener);
    this.#listeners.set(method, listeners);
  }

  off(method, listener) {
    const listeners = this.#listeners.get(method) ?? [];
    this.#listeners.set(method, listeners.filter((candidate) => candidate !== listener));
  }

  close() {
    this.#socket.close();
  }
}

async function waitForDevToolsPort(profileDirectory, child) {
  const activePortPath = path.join(profileDirectory, "DevToolsActivePort");
  for (let attempt = 0; attempt < 200; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`Chrome exited before DevTools started (${child.exitCode}).`);
    try {
      const [port] = (await readFile(activePortPath, "utf8")).trim().split("\n");
      if (port) return Number(port);
    } catch {
      // Chrome creates the file asynchronously.
    }
    await delay(50);
  }
  throw new Error("Timed out waiting for Chrome DevTools port.");
}

export async function launchChrome() {
  const binary = await resolveChromeBinary();
  const profileDirectory = await mkdtemp(path.join(tmpdir(), "oluk-cdp-"));
  const child = spawn(
    binary,
    [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${profileDirectory}`,
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-extensions",
      "--disable-features=Translate,BackForwardCache",
      "--disable-sync",
      "--hide-scrollbars",
      "--metrics-recording-only",
      "--no-first-run",
      "--no-default-browser-check",
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  let stderr = "";
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
    if (stderr.length > 10_000) stderr = stderr.slice(-10_000);
  });
  const port = await waitForDevToolsPort(profileDirectory, child);

  return {
    port,
    async close() {
      if (child.exitCode === null) child.kill("SIGTERM");
      await Promise.race([
        new Promise((resolve) => child.once("exit", resolve)),
        delay(2_000).then(() => {
          if (child.exitCode === null) child.kill("SIGKILL");
        }),
      ]);
      await rm(profileDirectory, { recursive: true, force: true });
    },
    stderr() {
      return stderr;
    },
  };
}

export async function createPage(port) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" });
  if (!response.ok) throw new Error(`Could not create Chrome target: ${response.status}`);
  const target = await response.json();
  const client = new CdpConnection(target.webSocketDebuggerUrl);
  await client.open();
  await Promise.all([
    client.send("Page.enable"),
    client.send("Runtime.enable"),
    client.send("Log.enable"),
    client.send("Network.enable"),
  ]);
  return { client, targetId: target.id };
}

export async function setViewport(client, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: false,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });
}

export async function navigate(client, url) {
  const loaded = client.waitFor("Page.loadEventFired", 30_000);
  const result = await client.send("Page.navigate", { url });
  if (result.errorText) throw new Error(`Navigation failed for ${url}: ${result.errorText}`);
  await loaded;
  await client.send("Runtime.evaluate", {
    expression: "document.fonts ? document.fonts.ready : Promise.resolve()",
    awaitPromise: true,
  });
}

export async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    const description = result.exceptionDetails.exception?.description ?? result.exceptionDetails.text;
    throw new Error(`Browser evaluation failed: ${description}`);
  }
  return result.result?.value;
}

export async function capturePng(client, filePath, { fullPage = true } = {}) {
  let clip;
  if (fullPage) {
    const metrics = await client.send("Page.getLayoutMetrics");
    const size = metrics.cssContentSize ?? metrics.contentSize;
    clip = { x: 0, y: 0, width: size.width, height: size.height, scale: 1 };
  }
  const result = await client.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: fullPage,
    fromSurface: true,
    ...(clip ? { clip } : {}),
  });
  await writeFile(filePath, Buffer.from(result.data, "base64"));
}

export async function closePage(port, client, targetId) {
  client.close();
  await fetch(`http://127.0.0.1:${port}/json/close/${targetId}`).catch(() => undefined);
}
