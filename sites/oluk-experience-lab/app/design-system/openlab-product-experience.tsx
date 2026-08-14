"use client";

import { useState } from "react";

import experience from "./openlab-product-depth.json";
import styles from "./openlab-product-experience.module.css";

type ExperienceView = "record" | "report history" | "label comparison" | "analytes" | "source context";

/**
 * Customer-facing technical detail derived from the deterministic
 * OpenLabPublicProjection.v2 experience compiler. It deliberately renders
 * source-owned values as numbers and bars, never as fabricated chromatograms.
 */
export function OpenLabProductExperience() {
  const [view, setView] = useState<ExperienceView>("record");
  const concentration = experience.visualizations.concentration;

  return (
    <section className={styles.section} data-component="OpenLabProductExperience" data-mobile-strategy="collapse">
      <header>
        <span>MK-2866 OpenLab</span>
        <h2>See the record behind the product.</h2>
        <p>Review the named batch, the reported purity and the tested concentration without leaving the product story.</p>
      </header>
      <div aria-label="OpenLab product views" className={styles.tabs} onKeyDown={(event) => { if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return; const views = experience.interactionContract.selectableViews as ExperienceView[]; const current = views.indexOf(view); const next = event.key === "ArrowRight" ? (current + 1) % views.length : (current - 1 + views.length) % views.length; setView(views[next]); }} role="tablist" tabIndex={0}>
        {experience.interactionContract.selectableViews.map((option) => (
          <button aria-controls={`openlab-${option.replaceAll(" ", "-")}`} aria-selected={view === option} id={`openlab-tab-${option.replaceAll(" ", "-")}`} key={option} onClick={() => setView(option as ExperienceView)} role="tab" tabIndex={view === option ? 0 : -1} type="button">{option}</button>
        ))}
      </div>
      {view === "record" ? <div className={styles.grid} id="openlab-record" role="tabpanel">
        <article className={styles.primary}><span>{experience.visualizations.purity.title}</span><strong>{experience.visualizations.purity.displayValue}</strong><p>Batch {experience.record.batchCode} · Report {experience.record.reportId} · {experience.record.testedAt}</p><a href={experience.record.recordAction.href}>{experience.record.recordAction.label} →</a></article>
        <article><span>Record identity</span><dl><div><dt>Laboratory</dt><dd>{experience.record.labName}</dd></div><div><dt>Binding</dt><dd>{experience.record.bindingState}</dd></div><div><dt>Availability</dt><dd>{experience.record.availabilityState}</dd></div></dl></article>
      </div> : null}
      {view === "report history" ? <article className={styles.source} id="openlab-report-history" role="tabpanel"><span>Report history</span><h3>Current and historical binding</h3><ol>{experience.visualizations.history.map((item)=><li key={item.reportId}><strong>{item.reportId}</strong><span>{item.batchCode} · {item.testedAt} · {item.purity}</span></li>)}</ol><a href="/open-lab/records">Browse all records →</a></article> : null}
      {view === "label comparison" && concentration ? <article className={styles.comparison} id="openlab-label-comparison" role="tabpanel">
        <div><span>Label claim</span><strong>{concentration.labelClaim}</strong></div><div><span>Tested concentration</span><strong>{concentration.testedValue}</strong></div><div className={styles.bars} aria-label="Concentration comparison"><i style={{ "--value": `${concentration.claimPercent}%` } as React.CSSProperties}/><i style={{ "--value": `${concentration.testedPercent}%` } as React.CSSProperties}/></div><p>The reported test value is shown alongside the label claim for this batch.</p><table><tbody>{concentration.tableFallback.map((row)=><tr key={row.label}><th>{row.label}</th><td>{row.value}</td></tr>)}</tbody></table>
      </article> : null}
      {view === "analytes" ? <article className={styles.source} id="openlab-analytes" role="tabpanel"><span>Analyte view</span><h3>Reported composition</h3><table><thead><tr><th>Analyte</th><th>Purity</th><th>Concentration</th></tr></thead><tbody>{experience.analytes.map((item)=><tr key={item.compoundName}><td>{item.compoundName}</td><td>{item.purity.displayValue}</td><td>{item.concentration?.displayValue ?? "Unavailable"}</td></tr>)}</tbody></table></article> : null}
      {view === "source context" ? <article className={styles.source} id="openlab-source-context" role="tabpanel"><span>Source context</span><h3>{experience.record.labName} · {experience.record.batchCode}</h3><p>The original report remains available alongside this record for customers who want the source document.</p>{experience.record.sourceAction ? <a href={experience.record.sourceAction.href}>{experience.record.sourceAction.label} →</a> : null}<a href="/open-lab/compare">Compare product evidence →</a></article> : null}
    </section>
  );
}
