/* eslint-disable @next/next/no-img-element -- runtime-authored transparent product renders require direct picture-stage treatment. */
"use client";

import { useMemo, useState } from "react";

import styles from "./locked-home-hero.module.css";
import { MK2866_RENDER } from "../runtime-adapters/sites-canonical-render";
import { resolveCanonicalRender } from "../runtime-adapters/sites-canonical-render";
import type { SitesDiscoveryModel } from "../runtime-adapters/sites-discovery-server";

const slots = ["01", "02", "03", "04", "05"] as const;

function relativeSlot(index: number, activeIndex: number) {
  const count = slots.length;
  let delta = index - activeIndex;
  if (delta > count / 2) delta -= count;
  if (delta < -count / 2) delta += count;
  return delta;
}

export function LockedHomeHero({ models = [] }: Readonly<{ models?: readonly SitesDiscoveryModel[] }>) {
  const bound = models.find((model) => model.canonicalSlug === "mk-2866");
  const renderUrl = bound?.render ? resolveCanonicalRender(bound.render) : null;
  const [activeIndex, setActiveIndex] = useState(0);
  const ordered = useMemo(() => slots.map((slot, index) => ({ slot, position: relativeSlot(index, activeIndex) })), [activeIndex]);

  return (
    <section className={styles.canvas} data-figma-node="1155:29963" data-motion-contract="runtime-product-stage-5-3-1" id="hero">
      <div className={styles.hero}>
        <div className={styles.editorial}>
          <div className={styles.copy}>
            <span>Formulated. Verified. Batch tracked.</span>
            <h1>Formulated to a higher standard.</h1>
            <p>Third-party tested products, clearly stated specifications and direct access to available lab records—before you choose.</p>
            <div className={styles.actions}><a className="button" href="/shop">Browse the range <b aria-hidden="true">→</b></a><a className="button button-secondary" href="/open-lab/records">OpenLab <b aria-hidden="true">→</b></a></div>
          </div>
          <div className={styles.divider}/>
          <article aria-live="polite" className={styles.decision}>
            <div className={styles.identity}><span>Featured product</span><h2>{bound?.canonicalProductId ?? "Product information pending"}</h2><p>{bound ? "Source-bound canonical identity" : "Source-owned details will appear when available."}</p></div>
            <dl className={styles.metrics}><div><dd>{bound?.label?.strengthMg ? `${bound.label.strengthMg} MG` : "—"}</dd><dt>Strength</dt></div><div><dd>{bound?.label?.capsuleCount ?? "—"}</dd><dt>Quantity</dt></div><div><dd>{bound?.evidence ?? "—"}</dd><dt>Evidence</dt></div></dl>
            <div className={styles.buyRow}><div><span>Commerce</span><strong>Unavailable</strong></div><div><button disabled type="button">Purchase unavailable</button></div></div>
            <div aria-label="Featured product" className={styles.tabs} role="tablist">
              {slots.map((slot, index) => <button aria-selected={index === activeIndex} key={slot} onClick={() => setActiveIndex(index)} role="tab" type="button">Slot {slot}</button>)}
            </div>
          </article>
        </div>
        <div className={styles.stage} data-figma-stage-node="462:4684" data-proof-allow-overflow>
          <span aria-hidden="true" className={styles.glow}/>
          {ordered.map(({ slot, position }) => <button aria-label={slot === "01" && renderUrl ? "MK-2866 product render" : `Product slot ${slot} pending`} className={styles.bottle} data-active={position === 0 || undefined} data-slot={position} key={slot} onClick={() => setActiveIndex(slots.indexOf(slot))} type="button">{slot === "01" && renderUrl ? <img alt="MK-2866 product render" height="1536" src={renderUrl} width="1024"/> : <span aria-hidden="true">{position === 0 ? "Pending" : ""}</span>}</button>)}
          <div className={styles.stageControls}><button aria-label="Previous product slot" onClick={() => setActiveIndex((activeIndex - 1 + slots.length) % slots.length)} type="button">←</button><span>{String(activeIndex + 1).padStart(2,"0")} / 05</span><button aria-label="Next product slot" onClick={() => setActiveIndex((activeIndex + 1) % slots.length)} type="button">→</button></div>
        </div>
      </div>
    </section>
  );
}
