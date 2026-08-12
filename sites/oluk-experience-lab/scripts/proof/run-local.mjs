#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const host = "127.0.0.1";
const port = Number(process.env.PROOF_PORT ?? 4173);
const baseUrl = `http://${host}:${port}`;
const outputDirectory = process.env.PROOF_OUTPUT ?? await mkdtemp(path.join(tmpdir(), "oluk-mf09-local-"));
await mkdir(outputDirectory, { recursive: true });

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(child) {
  for (let attempt = 0; attempt < 180; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`Dev server exited before readiness (${child.exitCode}).`);
    try {
      const response = await fetch(baseUrl, { redirect: "manual" });
      if (response.status >= 200 && response.status < 500) return;
    } catch {
      // Vite is still starting.
    }
    await delay(250);
  }
  throw new Error(`Timed out waiting for ${baseUrl}`);
}

function runNode(script, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...args], { cwd: siteRoot, stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${script} exited ${code ?? signal}`));
    });
  });
}

const server = spawn("npm", ["run", "dev", "--", "--host", host, "--port", String(port)], {
  cwd: siteRoot,
  detached: process.platform !== "win32",
  env: { ...process.env, CI: "1" },
  stdio: ["ignore", "pipe", "pipe"],
});
let serverOutput = "";
for (const stream of [server.stdout, server.stderr]) {
  stream.on("data", (chunk) => {
    serverOutput += chunk.toString();
    if (serverOutput.length > 40_000) serverOutput = serverOutput.slice(-40_000);
  });
}

const startedAt = new Date().toISOString();
let status = "PASS";
let failure = null;
try {
  await waitForServer(server);
  const proofFailures = [];
  for (const [script, args] of [
    ["scripts/proof/mf09-four-width.mjs", [`--base-url=${baseUrl}`, `--output=${outputDirectory}`, "--capture"]],
    ["scripts/proof/accessibility-smoke.mjs", [`--base-url=${baseUrl}`, `--output=${outputDirectory}`]],
    ["scripts/proof/contrast-zoom-stress.mjs", [`--base-url=${baseUrl}`, `--output=${outputDirectory}`]],
  ]) {
    try {
      await runNode(script, args);
    } catch (error) {
      proofFailures.push(error instanceof Error ? error.message : String(error));
    }
  }
  if (proofFailures.length > 0) throw new Error(proofFailures.join("; "));
} catch (error) {
  status = "FAIL";
  failure = error instanceof Error ? error.message : String(error);
  throw error;
} finally {
  const terminateServerGroup = (signal) => {
    if (server.exitCode !== null) return;
    if (process.platform !== "win32" && server.pid) {
      try {
        process.kill(-server.pid, signal);
        return;
      } catch {
        // Fall back to terminating the direct npm process.
      }
    }
    server.kill(signal);
  };
  terminateServerGroup("SIGTERM");
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    delay(2_000).then(() => {
      terminateServerGroup("SIGKILL");
    }),
  ]);
  await writeFile(path.join(outputDirectory, "local-proof-run.json"), `${JSON.stringify({ schemaVersion: 1, run: "MF-09_LOCAL_PROOF", status, startedAt, completedAt: new Date().toISOString(), baseUrl, outputDirectory, failure, serverOutput }, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({ status, baseUrl, outputDirectory, failure }, null, 2)}\n`);
}
