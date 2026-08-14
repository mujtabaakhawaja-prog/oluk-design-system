"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

import experience from "./openlab-product-depth.json";
import styles from "./openlab-product-experience.module.css";

type ExperienceView = "record" | "report history" | "label comparison" | "analytes" | "source context";

const selectableViews = experience.interactionContract.selectableViews as readonly ExperienceView[];

function viewSlug(view: ExperienceView) {
  return view.replaceAll(" ", "-");
}

function viewHash(view: ExperienceView) {
  return `#openlab-${viewSlug(view)}`;
}

function isExperienceView(value: string | null): value is ExperienceView {
  return Boolean(value) && selectableViews.includes(value as ExperienceView);
}

function viewFromLocationHash() {
  if (typeof window === "undefined") return null;
  const candidate = window.location.hash.replace(/^#openlab-/, "").replaceAll("-", " ");
  return isExperienceView(candidate) ? candidate : null;
}

function writeViewToLocation(view: ExperienceView) {
  const url = new URL(window.location.href);
  url.hash = viewHash(view);
  window.history.replaceState(window.history.state, "", url);
}

/**
 * Customer-facing technical detail derived from the deterministic
 * OpenLabPublicProjection.v2 experience compiler. It deliberately renders
 * source-owned values as numbers and bars, never as fabricated chromatograms.
 */
export function OpenLabProductExperience() {
  const [view, setView] = useState<ExperienceView>("record");
  const tabRefs = useRef<Partial<Record<ExperienceView, HTMLButtonElement | null>>>({});
  const concentration = experience.visualizations.concentration;

  const selectView = useCallback((nextView: ExperienceView, options?: { focus?: boolean; writeLocation?: boolean }) => {
    setView(nextView);
    if (options?.writeLocation !== false) writeViewToLocation(nextView);
    if (options?.focus) window.requestAnimationFrame(() => tabRefs.current[nextView]?.focus());
  }, []);

  useEffect(() => {
    const restoreView = () => {
      const nextView = viewFromLocationHash();
      if (nextView) setView(nextView);
    };

    restoreView();
    window.addEventListener("hashchange", restoreView);
    window.addEventListener("popstate", restoreView);
    window.addEventListener("pageshow", restoreView);
    return () => {
      window.removeEventListener("hashchange", restoreView);
      window.removeEventListener("popstate", restoreView);
      window.removeEventListener("pageshow", restoreView);
    };
  }, []);

  const onTabKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % selectableViews.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + selectableViews.length) % selectableViews.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = selectableViews.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectView(selectableViews[nextIndex], { focus: true });
  }, [selectView]);

  const panelId = `openlab-panel-${viewSlug(view)}`;
  const tabId = `openlab-tab-${viewSlug(view)}`;

  return (
    <section className={styles.section} data-component="OpenLabProductExperience" data-deep-link-contract="openlab-view-hash" data-mobile-strategy="progressive-disclosure" data-reduced-motion="static-data-views">
      <header>
        <span>MK-2866 OpenLab</span>
        <h2>See the record behind the product.</h2>
        <p>Review the named batch, the reported purity and the tested concentration without leaving the product story.</p>
      </header>
      <p aria-atomic="true" aria-live="polite" className="sr-only">Showing {view}.</p>
      <div aria-label="OpenLab product views" aria-orientation="horizontal" className={styles.tabs} role="tablist">
        {selectableViews.map((option, index) => (
          <button aria-controls={`openlab-panel-${viewSlug(option)}`} aria-selected={view === option} id={`openlab-tab-${viewSlug(option)}`} key={option} onClick={() => selectView(option)} onKeyDown={(event) => onTabKeyDown(event, index)} ref={(node) => { tabRefs.current[option] = node; }} role="tab" tabIndex={view === option ? 0 : -1} type="button">{option}</button>
        ))}
      </div>
      {view === "record" ? <div aria-labelledby={tabId} className={styles.grid} id={panelId} role="tabpanel" tabIndex={0}>
        <article className={styles.primary}><span>{experience.visualizations.purity.title}</span><strong>{experience.visualizations.purity.displayValue}</strong><p>Batch {experience.record.batchCode} · Report {experience.record.reportId} · {experience.record.testedAt}</p><a href={experience.record.recordAction.href}>{experience.record.recordAction.label} →</a></article>
        <article><span>Record identity</span><dl><div><dt>Laboratory</dt><dd>{experience.record.labName}</dd></div><div><dt>Binding</dt><dd>{experience.record.bindingState}</dd></div><div><dt>Availability</dt><dd>{experience.record.availabilityState}</dd></div></dl></article>
      </div> : null}
      {view === "report history" ? <article aria-labelledby={tabId} className={styles.source} id={panelId} role="tabpanel" tabIndex={0}><span>Report history</span><h3>Current and historical binding</h3><ol>{experience.visualizations.history.map((item)=><li key={item.reportId}><strong>{item.reportId}</strong><span>{item.batchCode} · {item.testedAt} · {item.purity}</span></li>)}</ol><a href="/open-lab/records">Browse all records →</a></article> : null}
      {view === "label comparison" && concentration ? <article aria-labelledby={tabId} className={styles.comparison} id={panelId} role="tabpanel" tabIndex={0}>
        <div><span>Label claim</span><strong>{concentration.labelClaim}</strong></div><div><span>Tested concentration</span><strong>{concentration.testedValue}</strong></div><div className={styles.bars} aria-label="Concentration comparison"><i style={{ "--value": `${concentration.claimPercent}%` } as CSSProperties}/><i style={{ "--value": `${concentration.testedPercent}%` } as CSSProperties}/></div><p>The reported test value is shown alongside the label claim for this batch.</p><table><tbody>{concentration.tableFallback.map((row)=><tr key={row.label}><th>{row.label}</th><td>{row.value}</td></tr>)}</tbody></table>
      </article> : null}
      {view === "analytes" ? <article aria-labelledby={tabId} className={styles.source} id={panelId} role="tabpanel" tabIndex={0}><span>Analyte view</span><h3>Reported composition</h3><table><thead><tr><th>Analyte</th><th>Purity</th><th>Concentration</th></tr></thead><tbody>{experience.analytes.map((item)=><tr key={item.compoundName}><td>{item.compoundName}</td><td>{item.purity.displayValue}</td><td>{item.concentration?.displayValue ?? "Unavailable"}</td></tr>)}</tbody></table></article> : null}
      {view === "source context" ? <article aria-labelledby={tabId} className={styles.source} id={panelId} role="tabpanel" tabIndex={0}><span>Source context</span><h3>{experience.record.labName} · {experience.record.batchCode}</h3><p>The original report remains available alongside this record for customers who want the source document.</p>{experience.record.sourceAction ? <a href={experience.record.sourceAction.href}>{experience.record.sourceAction.label} →</a> : null}<a href="/open-lab/compare">Compare product evidence →</a></article> : null}
    </section>
  );
}
