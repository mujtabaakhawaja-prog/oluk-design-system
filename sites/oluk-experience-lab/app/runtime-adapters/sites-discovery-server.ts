import "server-only";

import type { SitesRuntimeBoundary } from "./sites-runtime-boundary";

const CONTRACT = "Olympus.SitesRuntimeProjectionEnvelope.v1";
const ENDPOINT_PATH = "/api/shopper/runtime/sites/discovery-projection/v1";
const SCHEMA_SHA256 = "1a073f18cf19e06bda77ace78c27d929575af9cad07603cb7380e9d6c2eac294";
const FAMILY_PACKET_SHA256 = "d8a987c23da69029250814234384a57d7221f61267a8af1bb5c614bb1586255f";

export type SitesDiscoveryModel = Readonly<{
  canonicalProductId: string;
  canonicalSlug: string;
  label: Readonly<{ form: string | null; capsuleCount: number | null; strengthMg: number | null; totalActive: string | null }> | null;
  render: Readonly<{ artifactId: string; contentHashSha256: string }> | null;
  evidence: "reported" | "unavailable";
  commerce: "unavailable";
}>;

export type SitesDiscoveryLoad = Readonly<{ boundary: SitesRuntimeBoundary; models: readonly SitesDiscoveryModel[] }>;
const pending = (): SitesDiscoveryLoad => ({ boundary: { source: "unbound", families: { discovery: "pending", product: "pending", openlab: "pending", selection: "pending", lifecycle: "pending", "support-system": "pending" }, c2Projection: null, wooProjection: null, initiatorBoundary: "preserved-unbound" }, models: [] });

function record(value: unknown): Record<string, unknown> | null { return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null; }
function text(value: unknown): string | null { return typeof value === "string" && value.length > 0 ? value : null; }
function hash(value: unknown): string | null { const result = text(value); return result && /^[a-f0-9]{64}$/.test(result) ? result : null; }

function decode(value: unknown): SitesDiscoveryModel[] | null {
  const envelope = record(value); const payload = record(envelope?.payload); const authority = record(envelope?.authority);
  if (envelope?.contract !== CONTRACT || envelope?.family !== "discovery" || authority?.customerIdentityAuthority !== "sites" || authority?.c2Role !== "evidence_and_commerce_projection_adapter_only" || !hash(authority?.sitesIdentityBindingSha256)) return null;
  if (!payload || !Array.isArray(payload.identities) || payload.identities.length !== 19) return null;
  const seen = new Set<string>(); const models: SitesDiscoveryModel[] = [];
  for (const raw of payload.identities) {
    const item = record(raw); const id = text(item?.sitesCanonicalProductId); const slug = text(item?.sitesCanonicalPublicSlug); const render = record(item?.render); const commerce = record(item?.commerce); const evidence = record(item?.evidence);
    if (!id || !slug || seen.has(slug) || commerce?.state !== "unavailable" || !Array.isArray(commerce?.reasons) || (evidence?.state !== "reported" && evidence?.state !== "unavailable")) return null;
    seen.add(slug);
    const mapped = render?.state === "mapped" ? { artifactId: text(render.artifactId), contentHashSha256: hash(render.contentHashSha256) } : null;
    if (render?.state !== "mapped" && render?.state !== "unavailable") return null;
    if (mapped && (!mapped.artifactId || !mapped.contentHashSha256)) return null;
    const labelRaw = item?.labelContent === null ? null : record(item?.labelContent);
    if (item?.labelContent !== null && !labelRaw) return null;
    const checkedRender = mapped?.artifactId && mapped.contentHashSha256 ? { artifactId: mapped.artifactId, contentHashSha256: mapped.contentHashSha256 } : null;
    models.push({ canonicalProductId: id, canonicalSlug: slug, label: labelRaw ? { form: typeof labelRaw.form === "string" ? labelRaw.form : null, capsuleCount: typeof labelRaw.capsuleCount === "number" ? labelRaw.capsuleCount : null, strengthMg: typeof labelRaw.strengthMg === "number" ? labelRaw.strengthMg : null, totalActive: typeof labelRaw.totalActive === "string" ? labelRaw.totalActive : null } : null, render: checkedRender, evidence: evidence.state as "reported" | "unavailable", commerce: "unavailable" });
  }
  return models;
}

export async function loadSitesDiscoveryProjection(): Promise<SitesDiscoveryLoad> {
  const origin = process.env.OLYMPUS_SITES_DISCOVERY_PROJECTION_ORIGIN?.replace(/\/$/, "");
  const token = process.env.OLYMPUS_SITES_DISCOVERY_PROJECTION_TOKEN;
  const session = process.env.OLYMPUS_SITES_DISCOVERY_SESSION_ID;
  const audit = process.env.OLYMPUS_SITES_DISCOVERY_AUDIT_ID;
  if (!origin || !token || !session || !audit) return pending();
  try {
    const endpoint = new URL(`${origin}${ENDPOINT_PATH}`);
    endpoint.search = new URLSearchParams({ routeId: "home" }).toString();
    const response = await fetch(endpoint, { cache: "no-store", headers: { "X-Olympus-Sites-Discovery-Token": token, "X-Olympus-Caller": "olympus-shopper-ssr", "X-Olympus-Capability": "sites-discovery-projection-v1-read", "X-Olympus-Client-Boundary": "server-only", "X-Session-ID": session, "X-Olympus-Audit-ID": audit, "sec-fetch-mode": "" } });
    const models = response.ok ? decode(await response.json()) : null;
    return models ? { boundary: { ...pending().boundary, source: "host-server", families: { ...pending().boundary.families, discovery: "ready" }, c2Projection: null }, models } : pending();
  } catch { return pending(); }
}
