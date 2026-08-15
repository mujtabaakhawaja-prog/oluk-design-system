/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- technical tables are intentional keyboard-reachable horizontal scrollers. */
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

import { ActionButton, ActionLink } from "./action-control";
import { DecisionSurface, EditorialSurface, TechnicalSurface } from "./content-surfaces";
import experience from "./openlab-product-depth.json";
import styles from "./openlab-product-experience.module.css";
import { EvidenceStatusChip } from "./program-components";
import { SurfaceGrid, SurfaceGridZone } from "./surface-grid";

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
export type OpenLabAvailabilityState = "available" | "partial" | "unavailable";
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
  evidenceState?: OpenLabAvailabilityState;
  variant?: "full" | "compact";
}>;

const viewLabel = (view: ExperienceView) => view.replace(/\b\w/g, (letter) => letter.toUpperCase());

function viewSlug(view: ExperienceView) {
  return view.replaceAll(" ", "-");
}

function viewHash(view: ExperienceView) {
  return `#openlab-${viewSlug(view)}`;
}

function isExperienceView(value: string | null): value is ExperienceView {
  return Boolean(value) && referenceViews.includes(value as ExperienceView);
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
 * Customer-facing confidence theatre backed by the deterministic
 * OpenLabPublicProjection.v2 presentation. Every analytical value comes from
 * that projection; a missing projection becomes an explicit partial or
 * unavailable state rather than a cloned MK-2866 record.
 */
export function OpenLabProductExperience({
  id,
  productSlug = "mk-2866",
  product,
  evidenceState = productSlug === "mk-2866" ? "available" : "unavailable",
  variant = "full",
}: OpenLabProductExperienceProps) {
  const [view, setView] = useState<ExperienceView>("record");
  const rootRef = useRef<HTMLElement | null>(null);
  const generatedId = useId().replaceAll(":", "");
  const instanceId = id ? `${id}-views` : `openlab-product-experience-${generatedId}`;
  const available = productSlug === "mk-2866" && evidenceState === "available";

  const selectView = useCallback((
    next: ExperienceView,
    options?: Readonly<{ focus?: boolean; writeLocation?: boolean }>,
  ) => {
    setView(next);
    if (options?.writeLocation !== false) writeViewToLocation(next);
    if (options?.focus) {
      window.requestAnimationFrame(() => {
        rootRef.current
          ?.querySelector<HTMLButtonElement>(`[data-openlab-view="${viewSlug(next)}"]`)
          ?.focus();
      });
    }
  }, []);

  useEffect(() => {
    if (!available) return;
    const restoreView = () => {
      const next = viewFromLocationHash();
      setView(next ?? "record");
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
  }, [available]);

  if (!available) {
    return (
      <OpenLabAvailabilityPanel
        evidenceState={evidenceState === "available" ? "partial" : evidenceState}
        product={product ?? { name: productSlug, series: "", alias: "", strength: "", servings: "" }}
        productSlug={productSlug}
        variant={variant}
      />
    );
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % referenceViews.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + referenceViews.length) % referenceViews.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = referenceViews.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectView(referenceViews[nextIndex], { focus: true });
  };

  return (
    <section
      className={`${styles.section} ${variant === "compact" ? styles.compact : ""}`}
      data-component="OpenLabProductExperience"
      data-deep-link-contract="openlab-view-hash"
      data-focus-contract="roving-tabs"
      data-mobile-strategy="summary-progressive-disclosure"
      data-openlab-state="available"
      data-reduced-motion="static-data-views"
      data-visualization-contract="chart-with-table-equivalent"
      id={id}
      ref={rootRef}
    >
      <span aria-atomic="true" aria-live="polite" className="sr-only">Showing {viewLabel(view)}.</span>
      <SurfaceGrid className={styles.layout}>
        <SurfaceGridZone zone="full">
          <EditorialSurface
            actions={<><ActionLink href="/product/mk-2866">View MK-2866</ActionLink><ActionLink href="/open-lab/records" variant="secondary">Browse records</ActionLink></>}
            compact={variant === "compact"}
            copy="OpenLab connects the exact MK-2866 format to its named batch, supplied report and reported values, giving you a clearer reason to trust the product decision."
            eyebrow="OPENLAB CONFIDENCE"
            title="See what stands behind MK-2866."
          >
            <div className={styles.confidenceFacts}>
              <EvidenceStatusChip state="source-reported" />
              <dl>
                <div><dt>Batch</dt><dd>{experience.record.batchCode}</dd></div>
                <div><dt>Report</dt><dd>{experience.record.reportId}</dd></div>
                <div><dt>Reported purity</dt><dd>{experience.visualizations.purity.displayValue}</dd></div>
              </dl>
            </div>
          </EditorialSurface>
        </SurfaceGridZone>

        <SurfaceGridZone zone="full">
          <DecisionSurface
            compact
            copy="Start with the named record, then move into the label comparison, analytes, chronology or original-source context without leaving the product journey."
            eyebrow="CHOOSE YOUR VIEW"
            title="Open the detail that gives you confidence."
          >
            <div
              aria-label="MK-2866 OpenLab views"
              aria-orientation="horizontal"
              className={styles.tabs}
              role="tablist"
            >
              {referenceViews.map((option, index) => (
                <ActionButton
                  aria-controls={`${instanceId}-panel-${viewSlug(option)}`}
                  aria-selected={view === option}
                  className={styles.tabControl}
                  data-openlab-view={viewSlug(option)}
                  id={`${instanceId}-tab-${viewSlug(option)}`}
                  key={option}
                  onClick={() => selectView(option)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  role="tab"
                  size="compact"
                  tabIndex={view === option ? 0 : -1}
                  variant={view === option ? "primary" : "secondary"}
                >
                  {viewLabel(option)}
                </ActionButton>
              ))}
            </div>
          </DecisionSurface>
        </SurfaceGridZone>

        <SurfaceGridZone zone="full">
          <OpenLabTechnicalPanel instanceId={instanceId} view={view}/>
        </SurfaceGridZone>
      </SurfaceGrid>
    </section>
  );
}

function OpenLabTechnicalPanel({ instanceId, view }: Readonly<{ instanceId: string; view: ExperienceView }>) {
  const concentration = experience.visualizations.concentration;
  const panelProps = {
    "aria-labelledby": `${instanceId}-tab-${viewSlug(view)}`,
    className: styles.panel,
    "data-focus-target": "technical-view",
    "data-openlab-panel": viewSlug(view),
    id: `${instanceId}-panel-${viewSlug(view)}`,
    role: "tabpanel" as const,
    tabIndex: 0,
  };

  if (view === "record") {
    return <div {...panelProps}>
      <TechnicalSurface
        actions={<ConfidenceActions sourceHref={experience.record.sourceAction.href}/>}
        copy="Confirm the exact batch, report identity and laboratory before returning to the product. These values come from the registered source, not product marketing copy."
        eyebrow="NAMED RECORD"
        title="Connect MK-2866 to its source."
      >
        <div className={styles.recordGrid}>
          <div className={styles.primaryMetric}>
            <span>{experience.visualizations.purity.title}</span>
            <strong>{experience.visualizations.purity.displayValue}</strong>
            <small>Batch {experience.record.batchCode} · tested {experience.record.testedAt}</small>
          </div>
          <dl className={styles.recordIdentity}>
            <div><dt>Laboratory</dt><dd>{experience.record.labName}</dd></div>
            <div><dt>Report</dt><dd>{experience.record.reportId}</dd></div>
            <div><dt>Binding</dt><dd>{experience.record.bindingState}</dd></div>
            <div><dt>Availability</dt><dd>{experience.record.availabilityState}</dd></div>
          </dl>
        </div>
      </TechnicalSurface>
    </div>;
  }

  if (view === "report history") {
    return <div {...panelProps}>
      <TechnicalSurface
        actions={<ConfidenceActions/>}
        copy="A single available report appears as one dated event. OpenLab does not turn one source point into a fabricated trend."
        eyebrow="REPORT HISTORY"
        title="See where the current record sits."
      >
        <ol className={styles.history}>
          {experience.visualizations.history.map((item) => <li key={item.reportId}>
            <strong>Report {item.reportId}</strong>
            <span>{item.batchCode} · {item.testedAt}</span>
            <b>{item.purity}</b>
          </li>)}
        </ol>
      </TechnicalSurface>
    </div>;
  }

  if (view === "label comparison" && concentration) {
    return <div {...panelProps}>
      <TechnicalSurface
        actions={<ConfidenceActions/>}
        copy="Read the labelled 15 MG format beside the reported 16.02 mg concentration for this named batch. The bars compare those two supplied values; they are not a performance score."
        eyebrow="LABEL COMPARISON"
        title="Put the label beside the reported value."
      >
        <div className={styles.comparisonValues}>
          <div><span>Label claim</span><strong>{concentration.labelClaim}</strong></div>
          <div><span>Reported concentration</span><strong>{concentration.testedValue}</strong></div>
        </div>
        <div
          aria-label="Label claim and reported concentration comparison"
          className={styles.bars}
          data-visualization="numeric-comparison"
        >
          <div><i style={{ "--value": `${concentration.claimPercent}%` } as CSSProperties}/><span>Label claim</span></div>
          <div><i style={{ "--value": `${concentration.testedPercent}%` } as CSSProperties}/><span>Reported value</span></div>
        </div>
        <TechnicalTable compact caption="Label claim and reported concentration" rows={concentration.tableFallback}/>
      </TechnicalSurface>
    </div>;
  }

  if (view === "analytes") {
    return <div {...panelProps}>
      <TechnicalSurface
        actions={<ConfidenceActions/>}
        copy="See exactly which analytes and values the available record supplies. Nothing is added to make the table look more complete."
        eyebrow="ANALYTES"
        title="Read the reported composition."
      >
        <div className={styles.tableScroller} role="region" aria-label="Reported analytes" tabIndex={0}>
          <table><thead><tr><th scope="col">Analyte</th><th scope="col">Reported purity</th><th scope="col">Reported concentration</th></tr></thead><tbody>
            {experience.analytes.map((item) => <tr key={item.compoundName}><td>{item.compoundName}</td><td>{item.purity.displayValue}</td><td>{item.concentration?.displayValue ?? "Unavailable"}</td></tr>)}
          </tbody></table>
        </div>
      </TechnicalSurface>
    </div>;
  }

  if (view === "batch timeline") {
    return <div {...panelProps}>
      <TechnicalSurface
        actions={<ConfidenceActions sourceHref={experience.record.sourceAction.href}/>}
        copy="Follow the minimum source-owned sequence from the labelled product to the batch, report and original source."
        eyebrow="BATCH TIMELINE"
        title="Trace the product back to the report."
      >
        <ol className={styles.timeline}>
          <li><b>Product label</b><span>MK-2866 · 15 MG · 90 SERVINGS</span></li>
          <li><b>Batch identified</b><span>{experience.record.batchCode}</span></li>
          <li><b>Report recorded</b><span>{experience.record.reportId} · {experience.record.testedAt}</span></li>
          <li><b>Source available</b><span>{experience.record.labName} original report</span></li>
        </ol>
      </TechnicalSurface>
    </div>;
  }

  if (view === "availability") {
    return <div {...panelProps}>
      <TechnicalSurface
        actions={<ConfidenceActions/>}
        copy="Know which source-backed details you can open now and which claims OpenLab refuses to infer. Availability belongs to this record, not every product."
        eyebrow="AVAILABILITY"
        title="See what is available today."
      >
        <dl className={styles.availabilityList}>
          <div><dt>Product-linked record</dt><dd>Available</dd></div>
          <div><dt>Original source</dt><dd>Available</dd></div>
          <div><dt>Reported analytes</dt><dd>{experience.analytes.length} available</dd></div>
          <div><dt>Historical reports</dt><dd>{experience.visualizations.history.length} recorded</dd></div>
        </dl>
      </TechnicalSurface>
    </div>;
  }

  return <div {...panelProps}>
    <TechnicalSurface
      actions={<ConfidenceActions sourceHref={experience.record.sourceAction.href}/>}
      copy="Use the product, batch, named laboratory and original report together. Keeping those relationships visible is what turns technical detail into product confidence."
      eyebrow="SOURCE CONTEXT"
      title="Understand where every value comes from."
    >
      <ol className={styles.sourceChain}>
        <li><b>Product</b><span>Identify the exact MK-2866 format.</span></li>
        <li><b>Batch</b><span>Connect it to {experience.record.batchCode}.</span></li>
        <li><b>Laboratory</b><span>Keep {experience.record.labName} visible.</span></li>
        <li><b>Report</b><span>Open the source when you want the full context.</span></li>
      </ol>
    </TechnicalSurface>
  </div>;
}

function ConfidenceActions({ sourceHref }: Readonly<{ sourceHref?: string }>) {
  return <>
    {sourceHref ? <ActionLink href={sourceHref}>Open original report</ActionLink> : <ActionLink href="/product/mk-2866">View MK-2866</ActionLink>}
    <ActionLink href="/open-lab/compare" variant="secondary">Compare products</ActionLink>
    <ActionLink href="/open-lab/stack-builder" variant="secondary">Build a stronger stack</ActionLink>
  </>;
}

function OpenLabAvailabilityPanel({
  evidenceState,
  product,
  productSlug,
  variant,
}: Readonly<{
  evidenceState: Exclude<OpenLabAvailabilityState, "available">;
  product: OpenLabProductReference;
  productSlug: string;
  variant: "full" | "compact";
}>) {
  const partial = evidenceState === "partial";
  const facts = [product.alias, product.strength, product.servings].filter(Boolean).join(" · ");

  return <section
    className={`${styles.section} ${variant === "compact" ? styles.compact : ""}`}
    data-component="OpenLabProductExperience"
    data-mobile-strategy="summary-progressive-disclosure"
    data-openlab-state={evidenceState}
    data-reduced-motion="static-data-views"
  >
    <SurfaceGrid className={styles.layout}>
      <SurfaceGridZone zone="full">
        <EditorialSurface
          actions={<><ActionLink href={`/product/${productSlug}`}>View {product.name}</ActionLink><ActionLink href="/open-lab/stack-builder" variant="secondary">Build a stronger stack</ActionLink></>}
          compact={variant === "compact"}
          copy={partial
            ? `OpenLab can show the source context currently connected to ${product.name}, while unavailable report fields remain visibly withheld.`
            : `${product.name} keeps its labelled product facts and commerce path visible without borrowing the MK-2866 report or inventing technical results.`}
          eyebrow="OPENLAB CONFIDENCE"
          state={partial ? "default" : "unavailable"}
          title={partial ? "A source path exists. Full record detail is still pending." : "Product details are ready. A linked record is not yet available."}
        >
          <div className={styles.unavailableIdentity}>
            <EvidenceStatusChip state={partial ? "source-only" : "unavailable"}/>
            <div><span>{product.series}</span><strong>{product.name}</strong><small>{facts || "Product facts available on the product page"}</small></div>
          </div>
        </EditorialSurface>
      </SurfaceGridZone>
      <SurfaceGridZone zone="full">
        <TechnicalSurface
          actions={<><ActionLink href="/open-lab/methodology">How OpenLab works</ActionLink><ActionLink href="/open-lab/compare" variant="secondary">Compare availability</ActionLink></>}
          compact
          copy="OpenLab does not clone values from another product. Each product receives its own record only when its projection supplies one."
          eyebrow="CURRENT AVAILABILITY"
          state={partial ? "default" : "unavailable"}
          title={partial ? "Source context only." : "No product-linked record supplied."}
        >
          <dl className={styles.availabilityList}>
            <div><dt>Record</dt><dd>{partial ? "Partial" : "Unavailable"}</dd></div>
            <div><dt>Original source</dt><dd>{partial ? "Source Only" : "Unavailable"}</dd></div>
            <div><dt>Reported analytes</dt><dd>Unavailable</dd></div>
            <div><dt>Product path</dt><dd>Available</dd></div>
          </dl>
        </TechnicalSurface>
      </SurfaceGridZone>
    </SurfaceGrid>
  </section>;
}

function TechnicalTable({ caption, compact = false, rows }: Readonly<{ caption: string; compact?: boolean; rows: ReadonlyArray<Readonly<{ label: string; value: string }>> }>) {
  return <div className={`${styles.tableScroller} ${compact ? styles.compactTable : ""}`} role="region" aria-label={caption} tabIndex={0}>
    <table><caption className="sr-only">{caption}</caption><tbody>{rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.value}</td></tr>)}</tbody></table>
  </div>;
}
