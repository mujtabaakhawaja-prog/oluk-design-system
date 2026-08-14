/* eslint-disable @next/next/no-img-element -- runtime-authored transparent product renders require direct picture-stage treatment. */
"use client";

import { useMemo, useState } from "react";

import styles from "./locked-home-hero.module.css";

const products = [
  { id: "mk-2866", name: "MK-2866", alias: "Ostarine", strength: "15 MG", servings: "90 SERVINGS", purity: ">99%", price: "£43", image: "/assets/products/mk-2866/front.png", width: 1365, height: 2048, href: "/product/mk-2866" },
  { id: "ment", name: "MENT", alias: "Trestolone", strength: "20 MG", servings: "30 SERVINGS", purity: ">99%", price: "£49", image: "/assets/products/hero/ment/front.webp", width: 1024, height: 1536, href: "/shop?search=MENT" },
  { id: "endurashred", name: "ENDURASHRED", alias: "LGD-4033 + MK-2866", strength: "16.5 MG", servings: "90 SERVINGS", purity: ">99%", price: "£59", image: "/assets/products/hero/endurashred/front.webp", width: 1024, height: 1536, href: "/shop?search=ENDURASHRED" },
  { id: "rad-140", name: "RAD-140", alias: "Testolone", strength: "8 MG", servings: "60 SERVINGS", purity: ">99%", price: "£55", image: "/assets/products/rad-140/front.png", width: 1024, height: 1536, href: "/shop?search=RAD-140" },
  { id: "mk-677", name: "MK-677", alias: "Ibutamoren", strength: "15 MG", servings: "90 SERVINGS", purity: ">99%", price: "£30", image: "/assets/products/hero/mk-677/front.webp", width: 1024, height: 1536, href: "/shop?search=MK-677" },
] as const;

function relativeSlot(index: number, activeIndex: number) {
  const count = products.length;
  let delta = index - activeIndex;
  if (delta > count / 2) delta -= count;
  if (delta < -count / 2) delta += count;
  return delta;
}

export function LockedHomeHero() {
  const [activeId, setActiveId] = useState<(typeof products)[number]["id"]>("mk-2866");
  const activeIndex = products.findIndex((product) => product.id === activeId);
  const active = products[activeIndex];
  const ordered = useMemo(() => products.map((product, index) => ({ product, slot: relativeSlot(index, activeIndex) })), [activeIndex]);

  return (
    <section className={styles.canvas} data-figma-node="1155:29963" data-motion-contract="runtime-product-stage-5-3-1" id="hero">
      <div className={styles.hero}>
        <div className={styles.editorial}>
          <div className={styles.copy}>
            <span>Formulated. Verified. Batch tracked.</span>
            <h1>Formulated to a higher standard.</h1>
            <p>Third-party tested products, clearly stated specifications and direct access to available lab records—before you choose.</p>
            <div className={styles.actions}><a className="button" href="/shop">Shop the range <b aria-hidden="true">→</b></a><a className="button button-secondary" href="/open-lab/records">View Lab Records <b aria-hidden="true">→</b></a></div>
          </div>
          <div className={styles.divider}/>
          <article aria-live="polite" className={styles.decision}>
            <div className={styles.identity}><span>Featured product</span><h2>{active.name}</h2><p>{active.alias}</p></div>
            <dl className={styles.metrics}><div><dd>{active.strength}</dd><dt>Strength</dt></div><div><dd>{active.servings}</dd><dt>Quantity</dt></div><div><dd>{active.purity}</dd><dt>Purity</dt></div></dl>
            <div className={styles.buyRow}><div><span>Price</span><strong>{active.price}</strong></div><div><a href={active.href}>View product</a><button disabled type="button">Add to bag</button></div></div>
            <div aria-label="Featured product" className={styles.tabs} role="tablist">
              {products.map((product) => <button aria-selected={product.id === active.id} key={product.id} onClick={() => setActiveId(product.id)} role="tab" type="button">{product.name}</button>)}
            </div>
          </article>
        </div>
        <div className={styles.stage} data-figma-stage-node="462:4684">
          <span aria-hidden="true" className={styles.glow}/>
          {ordered.map(({ product, slot }) => <button aria-label={`Feature ${product.name}`} className={styles.bottle} data-active={slot === 0 || undefined} data-slot={slot} key={product.id} onClick={() => setActiveId(product.id)} type="button"><img alt={slot === 0 ? `${product.name} ${product.alias} bottle` : ""} decoding="async" fetchPriority={slot === 0 ? "high" : "auto"} height={product.height} loading={slot === 0 ? "eager" : "lazy"} sizes="(max-width: 760px) 48vw, 24vw" src={product.image} width={product.width}/></button>)}
          <div className={styles.stageControls}><button aria-label="Previous featured product" onClick={() => setActiveId(products[(activeIndex - 1 + products.length) % products.length].id)} type="button">←</button><span>{String(activeIndex + 1).padStart(2,"0")} / 05</span><button aria-label="Next featured product" onClick={() => setActiveId(products[(activeIndex + 1) % products.length].id)} type="button">→</button></div>
        </div>
      </div>
    </section>
  );
}
