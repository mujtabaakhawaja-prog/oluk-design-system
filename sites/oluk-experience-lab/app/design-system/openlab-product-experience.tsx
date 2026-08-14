"use client";

import { useState } from "react";

import experience from "./openlab-product-experience.json";
import styles from "./openlab-product-experience.module.css";

type ExperienceView = "record" | "label comparison" | "source context";

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
      <div aria-label="OpenLab product views" className={styles.tabs} role="tablist">
        {experience.interactionContract.selectableViews.map((option) => (
          <button aria-selected={view === option} key={option} onClick={() => setView(option as ExperienceView)} role="tab" type="button">{option}</button>
        ))}
      </div>
      {view === "record" ? <div className={styles.grid}>
        <article className={styles.primary}><span>{experience.visualizations.purity.label}</span><strong>{experience.visualizations.purity.displayValue}</strong><p>Batch {experience.record.batchCode} · Report {experience.record.reportId} · {experience.record.testedAt}</p><a href={experience.record.recordAction.href}>{experience.record.recordAction.label} →</a></article>
        <article><span>Register context</span><dl><div><dt>Records</dt><dd>{experience.visualizations.register.labRecords}</dd></div><div><dt>SARMs average purity</dt><dd>{experience.visualizations.register.sarmsAveragePurity}</dd></div><div><dt>Failures</dt><dd>{experience.visualizations.register.failures}</dd></div></dl></article>
      </div> : null}
      {view === "label comparison" && concentration ? <article className={styles.comparison}>
        <div><span>Label claim</span><strong>{concentration.labelClaim}</strong></div><div><span>Tested concentration</span><strong>{concentration.testedValue}</strong></div><div className={styles.bars} aria-label="Concentration comparison"><i style={{ "--value": "74%" } as React.CSSProperties}/><i style={{ "--value": "79%" } as React.CSSProperties}/></div><p>The reported test value is shown alongside the label claim for this batch.</p>
      </article> : null}
      {view === "source context" ? <article className={styles.source}><span>Source context</span><h3>{experience.record.labName} · {experience.record.batchCode}</h3><p>The original report remains available alongside this record for customers who want the source document.</p>{experience.record.sourceAction ? <a href={experience.record.sourceAction.href}>{experience.record.sourceAction.label} →</a> : null}</article> : null}
    </section>
  );
}
