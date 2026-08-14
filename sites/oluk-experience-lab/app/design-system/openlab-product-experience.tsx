/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- technical tables are intentionally keyboard-reachable horizontal scrollers. */
"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import experience from "./openlab-product-depth.json";
import styles from "./openlab-product-experience.module.css";

const referenceViews = [
  "record",
  "report history",
  "label comparison",
  "analytes",
  "batch timeline",
  "availability",
  "source context",
] as const;

type ExperienceView = (typeof referenceViews)[number];
export type OpenLabProductReference = Readonly<{
  name: string;
  series: string;
  alias: string;
  strength: string;
  servings: string;
}>;

type OpenLabProductExperienceProps = Readonly<{
  id?: string;
  productSlug?: string;
  product?: OpenLabProductReference;
  variant?: "full" | "compact";
}>;

const viewLabel = (view: ExperienceView) => view.replace(/\b\w/g, (letter) => letter.toUpperCase());

/**
 * A customer-readable technical surface backed by the deterministic
 * OpenLabPublicProjection.v2 presentation. It uses source-owned numerical
 * comparison only; it never simulates an analytical trace or result.
 */
export function OpenLabProductExperience({ id, productSlug = "mk-2866", product, variant = "full" }: OpenLabProductExperienceProps) {
  const [view, setView] = useState<ExperienceView>("record");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelId = useId();
  const isReferenceProduct = productSlug === "mk-2866";

  if (!isReferenceProduct) {
    return <OpenLabAvailabilityPanel product={product ?? { name: productSlug, series: "", alias: "", strength: "", servings: "" }} productSlug={productSlug} variant={variant}/>;
  }

  const selectView = (next: ExperienceView, focus = false) => {
    setView(next);
    if (focus) window.requestAnimationFrame(() => tabRefs.current[referenceViews.indexOf(next)]?.focus());
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const current = referenceViews.indexOf(view);
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const offset = event.key === "ArrowRight" ? 1 : -1;
      selectView(referenceViews[(current + offset + referenceViews.length) % referenceViews.length], true);
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectView(referenceViews[0], true);
    }
    if (event.key === "End") {
      event.preventDefault();
      selectView(referenceViews.at(-1)!, true);
    }
  };

  return (
    <section className={styles.section} data-component="OpenLabProductExperience" data-mobile-strategy="summary-progressive-disclosure" data-reduced-motion="no-analytical-reconstruction" id={id}>
      <header className={styles.heading}>
        <span>OpenLab record</span>
        <h2>Know what this batch says before you decide.</h2>
        <p>Move from the product label to its named batch, source document and reported values in one clear view.</p>
      </header>

      <div aria-label="MK-2866 OpenLab views" className={styles.tabs} role="tablist">
        {referenceViews.map((option, index) => (
          <button
            aria-controls={`${panelId}-${option.replaceAll(" ", "-")}`}
            aria-selected={view === option}
            id={`${panelId}-tab-${option.replaceAll(" ", "-")}`}
            key={option}
            onClick={() => selectView(option)}
            onKeyDown={onTabKeyDown}
            ref={(element) => { tabRefs.current[index] = element; }}
            role="tab"
            tabIndex={view === option ? 0 : -1}
            type="button"
          >
            {viewLabel(option)}
          </button>
        ))}
      </div>

      <OpenLabTechnicalPanel panelId={panelId} view={view}/>
    </section>
  );
}

function OpenLabTechnicalPanel({ panelId, view }: Readonly<{ panelId: string; view: ExperienceView }>) {
  const concentration = experience.visualizations.concentration;
  const panelProps = {
    "aria-labelledby": `${panelId}-tab-${view.replaceAll(" ", "-")}`,
    id: `${panelId}-${view.replaceAll(" ", "-")}`,
    role: "tabpanel" as const,
    tabIndex: 0,
  };

  if (view === "record") {
    return <div {...panelProps} className={styles.recordGrid}>
      <article className={styles.primary}>
        <span>{experience.visualizations.purity.title}</span>
        <strong>{experience.visualizations.purity.displayValue}</strong>
        <p>Batch {experience.record.batchCode} · Report {experience.record.reportId} · tested {experience.record.testedAt}</p>
        <a href={experience.record.recordAction.href}>{experience.record.recordAction.label} →</a>
      </article>
      <article className={styles.detailCard}>
        <span>Record identity</span>
        <dl>
          <div><dt>Laboratory</dt><dd>{experience.record.labName}</dd></div>
          <div><dt>Batch</dt><dd>{experience.record.batchCode}</dd></div>
          <div><dt>Record status</dt><dd>Current record available</dd></div>
        </dl>
      </article>
    </div>;
  }

  if (view === "report history") {
    return <article {...panelProps} className={styles.technicalCard}>
      <span>Report history</span>
      <h3>See where this record sits.</h3>
      <p>Each entry keeps its batch code, test date and reported purity beside the source-linked report identity.</p>
      <ol className={styles.history}>
        {experience.visualizations.history.map((item) => <li key={item.reportId}>
          <strong>Report {item.reportId}</strong>
          <span>{item.batchCode} · {item.testedAt}</span>
          <b>{item.purity}</b>
        </li>)}
      </ol>
      <a href="/open-lab/records">Browse all records →</a>
    </article>;
  }

  if (view === "label comparison" && concentration) {
    return <article {...panelProps} className={styles.comparison}>
      <div><span>Label claim</span><strong>{concentration.labelClaim}</strong></div>
      <div><span>Tested concentration</span><strong>{concentration.testedValue}</strong></div>
      <div aria-label="Label claim and tested concentration comparison" className={styles.bars}>
        <div><i style={{ "--value": `${concentration.claimPercent}%` } as CSSProperties}/><span>Label claim</span></div>
        <div><i style={{ "--value": `${concentration.testedPercent}%` } as CSSProperties}/><span>Tested value</span></div>
      </div>
      <p>The comparison shows the supplied test value beside the product’s label claim for this named batch.</p>
      <TechnicalTable caption="Label claim and tested concentration" rows={concentration.tableFallback}/>
    </article>;
  }

  if (view === "analytes") {
    return <article {...panelProps} className={styles.technicalCard}>
      <span>Analytes</span>
      <h3>Read the reported composition.</h3>
      <p>Only compounds and values included in the available record appear here.</p>
      <div className={styles.tableScroller} role="region" aria-label="Reported analytes" tabIndex={0}>
        <table><thead><tr><th scope="col">Analyte</th><th scope="col">Reported purity</th><th scope="col">Reported concentration</th></tr></thead><tbody>
          {experience.analytes.map((item) => <tr key={item.compoundName}><td>{item.compoundName}</td><td>{item.purity.displayValue}</td><td>{item.concentration?.displayValue ?? "Unavailable"}</td></tr>)}
        </tbody></table>
      </div>
    </article>;
  }

  if (view === "batch timeline") {
    return <article {...panelProps} className={styles.technicalCard}>
      <span>Batch timeline</span>
      <h3>Follow this batch from label to record.</h3>
      <ol className={styles.timeline}>
        <li><b>Product label</b><span>MK-2866 · 15 MG · 90 SERVINGS</span></li>
        <li><b>Batch identified</b><span>{experience.record.batchCode}</span></li>
        <li><b>Report recorded</b><span>{experience.record.reportId} · {experience.record.testedAt}</span></li>
        <li><b>Source available</b><span>{experience.record.labName} original report</span></li>
      </ol>
      <a href={experience.record.sourceAction.href}>{experience.record.sourceAction.label} →</a>
    </article>;
  }

  if (view === "availability") {
    return <article {...panelProps} className={styles.technicalCard}>
      <span>Availability</span>
      <h3>What you can open today.</h3>
      <dl className={styles.availabilityList}>
        <div><dt>Product-linked record</dt><dd>Available</dd></div>
        <div><dt>Original source</dt><dd>Available</dd></div>
        <div><dt>Reported analytes</dt><dd>{experience.analytes.length} available</dd></div>
        <div><dt>Historical reports</dt><dd>{experience.visualizations.history.length} recorded</dd></div>
      </dl>
      <p>Availability reflects the record currently shown here; it does not infer findings from product copy.</p>
    </article>;
  }

  return <article {...panelProps} className={styles.technicalCard}>
    <span>Source context</span>
    <h3>See how to read the record.</h3>
    <p>The product label identifies the format. The batch connects that label to the report. The report supplies the values shown in this view.</p>
    <ol className={styles.sourceChain}>
      <li><b>Product</b><span>Identify the exact format.</span></li>
      <li><b>Batch</b><span>Connect it to {experience.record.batchCode}.</span></li>
      <li><b>Laboratory</b><span>Keep {experience.record.labName} visible.</span></li>
      <li><b>Report</b><span>Open the original source when you want more detail.</span></li>
    </ol>
    <div className={styles.actionRow}><a href={experience.record.sourceAction.href}>{experience.record.sourceAction.label} →</a><a href="/open-lab/methodology">How to read records →</a></div>
  </article>;
}

function OpenLabAvailabilityPanel({ product, productSlug, variant }: Readonly<{ product: OpenLabProductReference; productSlug: string; variant: "full" | "compact" }>) {
  return <section className={`${styles.section} ${variant === "compact" ? styles.compact : ""}`} data-component="OpenLabProductExperience" data-openlab-state="unavailable" data-mobile-strategy="summary-progressive-disclosure">
    <header className={styles.heading}>
      <span>OpenLab availability</span>
      <h2>Product details are ready. A linked record is not yet available.</h2>
      <p>{product.name} is shown with its labelled product facts while the OpenLab record path remains unavailable.</p>
    </header>
    <article className={styles.unavailableCard}>
      <div><span>{product.series}</span><h3>{product.name}</h3><p>{[product.alias, product.strength, product.servings].filter(Boolean).join(" · ")}</p></div>
      <dl><div><dt>Record</dt><dd>Unavailable</dd></div><div><dt>Original source</dt><dd>Unavailable</dd></div><div><dt>Reported analytes</dt><dd>Unavailable</dd></div></dl>
      <div className={styles.actionRow}><a href={`/product/${productSlug}`}>View product details →</a><a href="/open-lab/methodology">How availability works →</a></div>
    </article>
  </section>;
}

function TechnicalTable({ caption, rows }: Readonly<{ caption: string; rows: ReadonlyArray<Readonly<{ label: string; value: string }>> }>) {
  return <div className={styles.tableScroller} role="region" aria-label={caption} tabIndex={0}>
    <table><caption className="sr-only">{caption}</caption><tbody>{rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.value}</td></tr>)}</tbody></table>
  </div>;
}
