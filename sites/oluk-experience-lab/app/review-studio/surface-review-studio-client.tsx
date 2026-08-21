"use client";

import { useMemo, useState } from "react";
import styles from "./surface-review-studio.module.css";

type RouteSlot = Readonly<{ id: string; role: string; order: number; placementPolicy: string; featureId: string | null }>;
type RouteRecord = Readonly<{ routeId: string; path: string; family: string; templateId: string; orderedSlots: readonly RouteSlot[]; sitesPreviewPath: string; requiredStates: readonly string[]; lifecycle: string }>;
type RouteAuthority = Readonly<{ contract: string; contentHash: string; sourceInventoryDigest: string; routes: readonly RouteRecord[] }>;
type PresentationSystem = Readonly<{ contract: string; contentHash: string; responsiveViewports: readonly number[] }>;

export function SurfaceReviewStudioClient({ routeAuthority, presentation }: Readonly<{ routeAuthority: RouteAuthority; presentation: PresentationSystem }>) {
  const productRoute = routeAuthority.routes.find((route) => route.routeId === "product") ?? routeAuthority.routes[0];
  const [routeId, setRouteId] = useState(productRoute.routeId);
  const [viewport, setViewport] = useState(1440);
  const [reviewedWidths, setReviewedWidths] = useState<number[]>([]);
  const [decision, setDecision] = useState<"accepted" | "changes_requested" | null>(null);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const route = routeAuthority.routes.find((item) => item.routeId === routeId) ?? productRoute;
  const scale = viewport > 1024 ? 0.58 : viewport > 768 ? 0.68 : viewport > 390 ? 0.82 : 1;
  const frame = useMemo(() => ({ width: `${viewport}px`, height: viewport <= 390 ? "820px" : "900px", transform: `scale(${scale})` }), [viewport, scale]);

  function markReviewed(nextViewport: number) {
    setViewport(nextViewport);
    setReviewedWidths((current) => current.includes(nextViewport) ? current : [...current, nextViewport].sort((a, b) => b - a));
  }

  function exportDecision() {
    if (!decision || reviewedWidths.length !== presentation.responsiveViewports.length || (decision === "changes_requested" && !notes.trim())) {
      setMessage("Review all four widths, choose a decision, and add notes when changes are requested.");
      return;
    }
    const receipt = {
      contract: "OLUK_PRESENTATION_REVIEW_DECISION_V1",
      status: "LOCAL_HUMAN_DECISION",
      presentationDigest: presentation.contentHash,
      routeAuthorityDigest: routeAuthority.contentHash,
      inventoryDigest: routeAuthority.sourceInventoryDigest,
      routeId,
      moduleIds: routeId === "product" ? ["module.product-detail"] : [],
      reviewedWidths,
      decision,
      notes,
      decidedAt: new Date().toISOString(),
      captureHashesRequiredForPromotion: true,
    };
    const url = URL.createObjectURL(new Blob([`${JSON.stringify(receipt, null, 2)}\n`], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `oluk-presentation-review-${routeId}-${presentation.contentHash.slice(0, 12)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("Local decision exported. Promotion still requires exact Sites and Native Next capture hashes.");
  }

  return (
    <main className={styles.studio} data-owner-only="true" id="main-content">
      <header className={styles.hero}>
        <span>CODEX SITES · OWNER REVIEW</span>
        <h1>Presentation Review Studio</h1>
        <p>Review the generated 74-route surface graph without giving fixtures, Figma, or Sites customer-runtime authority.</p>
        <div><code>presentation {presentation.contentHash.slice(0, 12)}</code><code>routes {routeAuthority.contentHash.slice(0, 12)}</code></div>
        <a href="/system-atlas">Open System Atlas →</a>
      </header>

      <section className={styles.controls}>
        <label>Route<select onChange={(event) => setRouteId(event.target.value)} value={routeId}>{routeAuthority.routes.map((item) => <option key={item.routeId} value={item.routeId}>{item.path} · {item.family}</option>)}</select></label>
        <div aria-label="Review widths">{presentation.responsiveViewports.map((width) => <button aria-pressed={viewport === width} data-reviewed={reviewedWidths.includes(width)} key={width} onClick={() => markReviewed(width)} type="button">{width}</button>)}</div>
        <a href={route.sitesPreviewPath} target="_blank">Open unscaled route</a>
      </section>

      <section className={styles.contract}>
        <header><span>{route.family.replaceAll("_", " ")}</span><h2>{route.path}</h2><p>{route.templateId} · {route.lifecycle}</p></header>
        <ol>{route.orderedSlots.map((slot) => <li data-policy={slot.placementPolicy} key={slot.id}><b>{String(slot.order).padStart(2, "0")}</b><span>{slot.role}</span><small>{slot.placementPolicy.replaceAll("_", " ")}</small>{slot.featureId ? <code>{slot.featureId}</code> : null}</li>)}</ol>
      </section>

      <section className={styles.preview} style={{ height: `${(viewport <= 390 ? 820 : 900) * scale}px` }}>
        <iframe key={`${routeId}-${viewport}`} src={route.sitesPreviewPath} style={frame} title={`${route.path} at ${viewport}px`} />
      </section>

      <section className={styles.decision}>
        <span>HUMAN DECISION</span>
        <h2>Bind the exact generated candidate.</h2>
        <div><button aria-pressed={decision === "accepted"} onClick={() => setDecision("accepted")} type="button">Accept candidate</button><button aria-pressed={decision === "changes_requested"} onClick={() => setDecision("changes_requested")} type="button">Request changes</button></div>
        <label>Decision notes<textarea onChange={(event) => setNotes(event.target.value)} value={notes}/></label>
        <button onClick={exportDecision} type="button">Export immutable decision receipt</button>
        <output aria-live="polite">{message}</output>
      </section>
    </main>
  );
}
