"use client";

import { useId, useState } from "react";
import styles from "./program-components.module.css";

export type EvidenceAuthorityState = "verified-evidence" | "source-reported" | "source-only" | "unavailable";
const evidenceLabels: Record<EvidenceAuthorityState, string> = {
  "verified-evidence": "Verified Evidence",
  "source-reported": "Source Reported",
  "source-only": "Source Only",
  unavailable: "Unavailable",
};

export function EvidenceStatusChip({ state }: { state: EvidenceAuthorityState }) {
  return <span className={styles.statusChip} data-candidate-component="EvidenceStatusChip" data-state={state}><svg aria-hidden="true" viewBox="0 0 16 16"><path d="M8 1.5 13 4v3.8c0 3-2 5.4-5 6.7-3-1.3-5-3.7-5-6.7V4l5-2.5Z" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="m5.5 8 1.5 1.5L10.7 6" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>{evidenceLabels[state]}</span>;
}

export type RecommendationState = "default" | "selected" | "added" | "unavailable" | "out-of-stock";
export function RecommendationCard({ state = "default", name = "MK-2866", alias = "Ostarine" }: { state?: RecommendationState; name?: string; alias?: string }) {
  const disabled = state === "unavailable" || state === "out-of-stock";
  return <article className={styles.recommendation} data-candidate-component="RecommendationCard" data-state={state}><EvidenceStatusChip state={disabled ? "unavailable" : "source-only"}/><div><span className="eyebrow">SARM SERIES</span><h3>{name}</h3><p>{alias}</p></div><dl className={styles.facts}><div><dt>Strength</dt><dd>15 MG</dd></div><div><dt>Servings</dt><dd>90 SERVINGS</dd></div><div><dt>Price</dt><dd>£43</dd></div></dl><button aria-disabled="true" className={styles.action} disabled type="button">{state === "added" ? "Added ✓" : disabled ? "Unavailable" : "Add to bag"}</button></article>;
}

export type RestockState = "active" | "due-soon" | "overdue" | "paused";
export function RestockCard({ state = "active" }: { state?: RestockState }) {
  const progress = { active: 38, "due-soon": 76, overdue: 100, paused: 52 }[state];
  return <article className={styles.restock} data-candidate-component="RestockCard" data-state={state}><span className="eyebrow">RESTOCK LAB · {state.replace("-", " ")}</span><h3>Keep the next decision visible.</h3><p>Timing and eligibility appear here when they are available for your order.</p><progress aria-label="Illustrative restock cycle" max="100" value={progress}/><button className={styles.action} disabled type="button">Not available</button></article>;
}

export function UpsellContextRail() {
  const [tab, setTab] = useState<"recommendations" | "restock">("recommendations");
  const id = useId();
  return <section className={styles.rail} data-candidate-component="UpsellContextRail"><div aria-label="Product continuation" className={styles.tablist} role="tablist">{(["recommendations", "restock"] as const).map((key)=><button aria-controls={`${id}-${key}`} aria-selected={tab===key} id={`${id}-${key}-tab`} key={key} onClick={()=>setTab(key)} role="tab" type="button">{key === "recommendations" ? "Recommendations" : "Restock Lab"}</button>)}</div><div aria-labelledby={`${id}-${tab}-tab`} className={styles.panel} id={`${id}-${tab}`} role="tabpanel">{tab === "recommendations" ? <RecommendationCard/> : <RestockCard/>}</div></section>;
}

export type CheckoutStep = "information" | "delivery" | "review" | "payment" | "confirmation";
const steps: CheckoutStep[] = ["information", "delivery", "review", "payment", "confirmation"];
export function CheckoutStepIndicator({ current }: { current: CheckoutStep }) {
  const currentIndex = steps.indexOf(current);
  return <ol aria-label="Checkout progress" className={styles.stepper} data-candidate-component="CheckoutStepIndicator">{steps.map((step,index)=><li aria-current={index===currentIndex?"step":undefined} data-active={index<=currentIndex} key={step}><span>{index+1}</span>{step[0].toUpperCase()+step.slice(1)}</li>)}</ol>;
}

export function ReportIdentityHeader({ state = "unavailable" }: { state?: EvidenceAuthorityState }) { return <header className={styles.openLabModule}><EvidenceStatusChip state={state}/><span className="eyebrow">OPENLAB RECORD</span><h3>MK-2866 evidence record</h3><p>Only registered source fields are shown. Missing method, analyte, result, publication and original-source fields remain unavailable.</p></header>; }
export function AnalyteTable({ rows = [] }: { rows?: Array<{ analyte: string; value: string; unit: string }> }) { return <section className={styles.openLabModule}><h3>Analyte results</h3>{rows.length ? <table className={styles.analytes}><thead><tr><th>Analyte</th><th>Reported value</th><th>Unit</th></tr></thead><tbody>{rows.map(row=><tr key={row.analyte}><td>{row.analyte}</td><td>{row.value}</td><td>{row.unit}</td></tr>)}</tbody></table> : <p>No source-owned analyte results are available for this presentation record.</p>}</section>; }
export function CustodyTimeline({ stages = ["Finished-product identity registered", "Original source availability checked", "Customer-safe projection prepared"] }: { stages?: string[] }) { return <section className={styles.openLabModule}><h3>Source chain</h3><ol className={styles.timeline}>{stages.map(stage=><li key={stage}>{stage}</li>)}</ol></section>; }

export function UnavailableEvidencePanel({ title, copy }: { title: string; copy: string }) { return <section className={styles.openLabModule} data-candidate-component="UnavailableEvidencePanel"><EvidenceStatusChip state="unavailable"/><h3>{title}</h3><p>{copy}</p></section>; }
