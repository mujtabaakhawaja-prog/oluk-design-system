import path from "node:path";
import { fileURLToPath } from "node:url";

export const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export function decodeHtmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

export function visibleText(html) {
  return decodeHtmlEntities(
    html
      .replace(/<head\b[\s\S]*?<\/head>/gi, " ")
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
      .replace(
        /<([a-z][a-z0-9-]*)\b(?=[^>]*\baria-hidden=["']true["'])[^>]*>[\s\S]*?<\/\1>/gi,
        " ",
      )
      .replace(/<!--([\s\S]*?)-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

export function parseTagAttributes(tag) {
  const attributes = {};
  const source = tag.replace(/^<\/?[a-z0-9-]+\b/i, "").replace(/\/?\s*>$/, "");
  const attributePattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of source.matchAll(attributePattern)) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return attributes;
}

export async function loadBuiltWorker(label = "audit") {
  const workerUrl = new URL("../../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(label, `${process.pid}-${Date.now()}-${Math.random()}`);
  try {
    return (await import(workerUrl.href)).default;
  } catch (error) {
    throw new Error(
      `Built worker is unavailable. Run npm run build before this audit. ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function renderHtml(worker, pathname, expectedStatus = 200) {
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
  if (response.status !== expectedStatus) throw new Error(`${pathname} rendered HTTP ${response.status}`);
  const contentType = response.headers.get("content-type") ?? "";
  if (!/^text\/html\b/i.test(contentType)) {
    throw new Error(`${pathname} rendered unexpected content type ${JSON.stringify(contentType)}`);
  }
  return response.text();
}
