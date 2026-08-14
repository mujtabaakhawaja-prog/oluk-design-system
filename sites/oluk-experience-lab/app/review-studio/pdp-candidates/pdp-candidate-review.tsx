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

export function PdpCandidateReview() {
  const [candidateId, setCandidateId] = useState<PdpCandidateId>("product-theatre");
  const [productSlug, setProductSlug] = useState<PdpStressProductSlug>("mk-2866");
  const [viewport, setViewport] = useState<1440 | 390>(1440);
  const candidate = PDP_CANDIDATES[candidateId];
  const path = `/review-studio/pdp-candidates/${candidateId}/${productSlug}`;
  const scale = viewport === 1440 ? 0.62 : 1;
  const previewStyle = useMemo(() => ({
    height: viewport === 1440 ? "980px" : "820px",
    transform: `scale(${scale})`,
    width: `${viewport}px`,
  }), [scale, viewport]);

  return (
    <main className={styles.page} data-owner-only="true" id="main-content">
      <header className={styles.hero}>
        <span>OWNER REVIEW · UNSELECTED OPTIONS</span>
        <h1>Three complete PDP directions.</h1>
        <p>Inspect the same product truth and module suite through three materially different commercial compositions. Nothing on this page selects, ranks, publishes or promotes an option.</p>
        <a href="/review-studio">Return to Champion Review Studio</a>
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
            <button aria-pressed={viewport === 1440} onClick={() => setViewport(1440)} type="button">1440</button>
            <button aria-pressed={viewport === 390} onClick={() => setViewport(390)} type="button">390</button>
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
        <div className={styles.frame} style={{ height: `${(viewport === 1440 ? 980 : 820) * scale}px` }}>
          <iframe key={`${path}-${viewport}`} src={path} style={previewStyle} title={`${candidate.label}, ${productLabels[productSlug]}, ${viewport}px`} />
        </div>
      </section>
    </main>
  );
}
