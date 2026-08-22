/* eslint-disable @next/next/no-img-element -- registered product render is required for the authored staging composition. */

import { AssuranceRail } from "./assurance-rail";
import { EvidenceStatus } from "./product-status";
import { productMediaRegistry } from "./product-fixtures";
import styles from "./homepage-tri-tick.module.css";

export function HomepageAssuranceTransition() {
  return (
    <section className={styles.assurance} data-component="EvidenceOSAssuranceTransition" data-copy-surface="technical" id="assurance">
      <div className={`shell ${styles.assuranceInner}`}>
        <div className={styles.assuranceCopy}>
          <span>EVIDENCE OS</span>
          <h2>Product confidence, kept close to the decision.</h2>
          <p>Six consistent signals connect the finished product, its labelled specification, and the OpenLab record pathway.</p>
        </div>
        <AssuranceRail variant="compact"/>
      </div>
    </section>
  );
}

export function HomepageTriTick() {
  const media = productMediaRegistry["mk-2866"];
  return (
    <section className={styles.section} data-component="HomepageTriTick" data-copy-surface="commerce" data-media-context="homepage-technical-banner">
      <div className={`shell ${styles.grid}`}>
        <div className={styles.media}>
          <span>FINISHED PRODUCT</span>
          <img alt={media.alt} decoding="async" height={media.height} loading="lazy" sizes="(max-width: 900px) 82vw, 38vw" src={media.src} width={media.width}/>
        </div>
        <div className={styles.content}>
          <div className={styles.heading}><span>PRODUCT STANDARD</span><h2>Three signals. One connected product story.</h2><EvidenceStatus state="verified"/></div>
          <div className={styles.ticks}>
            <article><b>01</b><div><h3>Labelled specification</h3><p>Strength, servings, and product identity stay legible before the next action.</p></div></article>
            <article><b>02</b><div><h3>Finished-product clarity</h3><p>The product render remains the focal object inside an authored commerce surface.</p></div></article>
            <article><b>03</b><div><h3>OpenLab connection</h3><p>The relevant record path stays close, so product detail and supporting information remain easy to explore.</p></div></article>
          </div>
          <a href="/product/mk-2866">Explore MK-2866 <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
