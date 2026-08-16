#!/usr/bin/env node

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const { stdout } = await execFileAsync(process.execPath, ["scripts/generate-sites-handoff-baseline.mjs", "--check"], { cwd: siteRoot });
assert.match(stdout, /PASS Sites handoff V2: 73 routes, 128 tokens/);
process.stdout.write(stdout);
