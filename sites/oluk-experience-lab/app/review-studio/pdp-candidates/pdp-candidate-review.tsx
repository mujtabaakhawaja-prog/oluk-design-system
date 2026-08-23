"use client";

import { useMemo, useState } from "react";

import {
  type PdpCandidateId,
  type PdpStressProductSlug,
  PDP_CANDIDATES,
  PDP_CANDIDATE_IDS,
  PDP_STRESS_PRODUCT_SLUGS,
} from "../../design-system/pdp-candidate-manifest";
import styles from "./pdp-candidate-review.module.css";

const productLabels: Readonly<Record<PdpStressProductSlug, string>> = {
  "mk-2866": "MK-2866",
  "rad-140": "RAD-140",
  "lgd-4033": "LGD-4033",
};

const REVIEW_VIEWPORTS = [1440, 1024, 768, 390] as const;
type ReviewViewport = (typeof REVIEW_VIEWPORTS)[number];

const viewportPresentation: Readonly<Record<ReviewViewport, Readonly<{
  height: number;
  scale: number;
}>>> = {
  1440: { height: 980, scale: 0.62 },
  1024: { height: 920, scale: 0.76 },
  768: { height: 880, scale: 0.88 },
  390: { height: 820, scale: 1 },
};

export function PdpCandidateReview() {
  const [candidateId, setCandidateId] = useState<PdpCandidateId>("product-theatre");
  const [productSlug, setProductSlug] = useState<PdpStressProductSlug>("mk-2866");
  const [viewport, setViewport] = useState<ReviewViewport>(1440);
  const candidate = PDP_CANDIDATES[candidateId];
  const path = `/review-studio/pdp-candidates/${candidateId}/${productSlug}`;
  const { height, scale } = viewportPresentation[viewport];
  const previewStyle = useMemo(() => ({
    height: `${height}px`,
    transform: `scale(${scale})`,
    width: `${viewport}px`,
  }), [height, scale, viewport]);

  return (
    <main className={styles.page} data-owner-only="true" id="main-content">
      <header className={styles.hero}>
        <span>OWNER REVIEW · UNSELECTED OPTIONS</span>
        <h1>Three complete PDP directions.</h1>
        <p>Inspect the same product truth and module suite through three materially different commercial compositions. Nothing on this page selects, ranks, publishes or promotes an option.</p>
        <nav aria-label="Owner review destinations">
          <a href="/review-studio">Return to Champion Review Studio</a>
          {" · "}
          <a href="/review-studio/component-proof">Open the four-width component proof</a>
        </nav>
      </header>

      <section className={styles.controls} aria-label="PDP candidate inspection controls">
        <div>
          <strong>Composition</strong>
          <nav aria-label="PDP compositions">
            {PDP_CANDIDATE_IDS.map((id) => <button aria-pressed={candidateId === id} key={id} onClick={() => setCandidateId(id)} type="button">{PDP_CANDIDATES[id].label}</button>)}
          </nav>
        </div>
        <div>
          <strong>Stress product</strong>
          <nav aria-label="PDP stress products">
            {PDP_STRESS_PRODUCT_SLUGS.map((slug) => <button aria-pressed={productSlug === slug} key={slug} onClick={() => setProductSlug(slug)} type="button">{productLabels[slug]}</button>)}
          </nav>
        </div>
        <div>
          <strong>Viewport</strong>
          <nav aria-label="PDP preview viewport">
            {REVIEW_VIEWPORTS.map((width) => (
              <button
                aria-pressed={viewport === width}
                key={width}
                onClick={() => setViewport(width)}
                type="button"
              >
                {width}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <section className={styles.brief}>
        <div>
          <span>{candidate.status}</span>
          <h2>{candidate.label}</h2>
          <p>{candidate.commercialThesis}</p>
        </div>
        <dl>
          <div><dt>Friction removed</dt><dd>{candidate.customerFrictionRemoved}</dd></div>
          <div><dt>Desktop grid</dt><dd>{candidate.desktopGrid}</dd></div>
          <div><dt>Differentiator</dt><dd>{candidate.differentiator}</dd></div>
          <div><dt>Owner selection</dt><dd>Pending complete candidate review</dd></div>
        </dl>
        <div className={styles.orderGrid}>
          <div><h3>Section order</h3><ol>{candidate.sectionOrder.map((section) => <li key={section}>{section}</li>)}</ol></div>
          <div><h3>Mobile journey</h3><ol>{candidate.mobileJourney.map((step) => <li key={step}>{step}</li>)}</ol></div>
          <div><h3>Trade-offs</h3><ul>{candidate.tradeoffs.map((tradeoff) => <li key={tradeoff}>{tradeoff}</li>)}</ul></div>
        </div>
      </section>

      <section className={styles.preview}>
        <header><div><span>LIVE SITES CANDIDATE</span><h2>{productLabels[productSlug]} · {viewport}px</h2></div><a href={path} rel="noreferrer" target="_blank">Open unscaled candidate</a></header>
        <div className={styles.frame} style={{ height: `${height * scale}px` }}>
          <iframe key={`${path}-${viewport}`} src={path} style={previewStyle} title={`${candidate.label}, ${productLabels[productSlug]}, ${viewport}px`} />
        </div>
      </section>
    </main>
  );
}
