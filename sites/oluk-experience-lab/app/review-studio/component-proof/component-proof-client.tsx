"use client";

import { useMemo, useState } from "react";
import {
  COMPONENT_PROOF_FAMILIES,
  COMPONENT_PROOF_DECISION_STATE,
  COMPONENT_PROOF_REVIEW_DIMENSIONS,
  COMPONENT_PROOF_VIEWPORTS,
  type ComponentProofFamilyId,
  type ComponentProofViewport,
} from "./component-proof-contract";
import styles from "./component-proof.module.css";

const viewportPresentation: Readonly<Record<ComponentProofViewport, Readonly<{
  height: number;
  scale: number;
}>>> = {
  1440: { height: 1000, scale: 0.62 },
  1024: { height: 920, scale: 0.76 },
  768: { height: 880, scale: 0.88 },
  390: { height: 844, scale: 1 },
};

export function ComponentProofClient() {
  const [familyId, setFamilyId] = useState<ComponentProofFamilyId>("foundations-primitives");
  const [viewport, setViewport] = useState<ComponentProofViewport>(1440);
  const family = COMPONENT_PROOF_FAMILIES.find((entry) => entry.id === familyId)!;
  const { height, scale } = viewportPresentation[viewport];
  const specimenPath = `/review-studio/component-proof/specimen?family=${familyId}`;
  const frameStyle = useMemo(() => ({ height: `${height * scale}px` }), [height, scale]);
  const previewStyle = useMemo(() => ({
    height: `${height}px`,
    transform: `scale(${scale})`,
    width: `${viewport}px`,
  }), [height, scale, viewport]);

  return (
    <main className={styles.page} data-owner-only="true" id="main-content">
      <header className={styles.hero}>
        <span>OWNER-ONLY COMPONENT PROOF · HUMAN REVIEW REQUIRED</span>
        <h1>One four-width review surface for the active OLUK component grammar.</h1>
        <p>
          These are deterministic Sites specimens. They identify current source and responsive behaviour,
          but they do not approve, publish, promote, deploy, or claim live customer truth.
        </p>
        <nav aria-label="Review Studio navigation">
          <a href="/system-atlas">System Atlas</a>
          <a href="/review-studio">Champion Review Studio</a>
          <a href="/review-studio/pdp-candidates">PDP candidates</a>
        </nav>
      </header>

      <section className={styles.controls} aria-label="Component proof controls">
        <div>
          <strong>Specimen family</strong>
          <nav aria-label="Component specimen families">
            {COMPONENT_PROOF_FAMILIES.map((entry) => (
              <button
                aria-pressed={entry.id === familyId}
                key={entry.id}
                onClick={() => setFamilyId(entry.id)}
                type="button"
              >
                {entry.label}
              </button>
            ))}
          </nav>
        </div>
        <div>
          <strong>Viewport</strong>
          <nav aria-label="Component proof viewport">
            {COMPONENT_PROOF_VIEWPORTS.map((width) => (
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

      <section className={styles.preview}>
        <header>
          <div>
            <span>PAIRED TARGET / CURRENT REVIEW · {COMPONENT_PROOF_DECISION_STATE}</span>
            <h2>{family.label} · {viewport}px</h2>
            <p><strong>Target authority:</strong> <code>{family.targetAuthority}</code></p>
            <p><strong>Current render source:</strong> <code>{family.currentSource}</code></p>
          </div>
          <a href={specimenPath} rel="noreferrer" target="_blank">Open unscaled specimen</a>
        </header>
        {family.reviewDonors.length > 0 ? (
          <aside className={styles.donorMeta} aria-label={`${family.label} review-source dispositions`}>
            <strong>Owner-only geometry and composition donors</strong>
            <ul>
              {family.reviewDonors.map((donor) => (
                <li key={`${donor.source}-${donor.role}`}>
                  <code>{donor.source}</code>
                  <span>{donor.role}</span>
                  <b>{donor.disposition}</b>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
        <div className={styles.frame} style={frameStyle}>
          <iframe
            key={`${familyId}-${viewport}`}
            src={specimenPath}
            style={previewStyle}
            title={`${family.label}, ${viewport}px owner-only specimen`}
          />
        </div>
        <aside aria-label="Required comparison dimensions">
          <strong>Human comparison record required</strong>
          <p>{COMPONENT_PROOF_REVIEW_DIMENSIONS.join(" · ")}</p>
          <p>Machine checks may record deltas; they cannot mark this candidate visually accepted.</p>
        </aside>
      </section>
    </main>
  );
}
