import type { CSSProperties } from "react";
import { AssuranceRail } from "./assurance-rail";
import { CatalogueCategoryRail, CatalogueStateSpecimens } from "./catalogue-category-rail";
import { HomepageTriTick } from "./homepage-tri-tick";
import { MetricRail } from "./metric-rail";
import { ProductCommerceCard } from "./product-commerce-card";
import { EvidenceStatus, StockPill } from "./product-status";
import { mk2866Fixture, rad140Fixture } from "./product-fixtures";
import { CurrencySelector, ThemeSelector } from "./staging-preferences";
import styles from "./first-pass-foundations.module.css";

const colors = [["Canvas","var(--oluk-canvas)"],["Surface","var(--white)"],["Media","var(--oluk-surface-media)"],["Cobalt","var(--cobalt)"],["Border","var(--line)"],["Unavailable","#f4f5f7"]] as const;

export function FirstPassFoundationSpecimens() {
  return <>
    <section className={styles.section} id="foundation-colour"><header><span>FOUNDATION 03–07</span><h2>Material, type, spacing, elevation, and icon roles.</h2><p>Rendered specimens from current staging tokens, not prose-only inventory records.</p></header><div className={styles.swatches}>{colors.map(([label,value])=><article key={label} style={{"--specimen-color":value} as CSSProperties}><i/><strong>{label}</strong><code>{value}</code></article>)}</div><div className={styles.type}><article><span>DISPLAY</span><h3>Formulated to a higher standard.</h3><p>Plus Jakarta Sans ExtraBold carries high-value editorial hierarchy.</p></article><article><span>BODY + UI</span><h3>Product information stays readable.</h3><p>Inter supports navigation, labels, actions, metadata, and long-form explanation.</p></article></div><div className={styles.elevation}>{["compact","card","purchase","relation"].map((level)=><article data-level={level} key={level}><span>{level}</span><b>Raised surface</b></article>)}</div></section>
    <section className={styles.section} id="foundation-controls"><header><span>FOUNDATION 08–14</span><h2>Controls, statuses, rails, and responsive states.</h2><p>Shared controls preserve semantics while route composers decide placement.</p></header><div className={styles.controls}><div><span>CURRENCY</span><CurrencySelector/></div><div><span>THEME SELECTOR STATES</span><ThemeSelector/></div><div><span>STATUS FAMILY</span><StockPill state="in-stock"/><StockPill state="out-of-stock"/><EvidenceStatus state="verified"/></div></div><div className={styles.metric}><MetricRail product={mk2866Fixture}/></div><AssuranceRail/></section>
    <section className={styles.section} id="foundation-cards"><header><span>FOUNDATION 09–12</span><h2>Product-card and category-card families.</h2><p>Variants share identity, metric, status, media, price, and action primitives.</p></header><div className={styles.cards}><ProductCommerceCard product={mk2866Fixture} variant="compact"/><ProductCommerceCard product={rad140Fixture} variant="vertical"/></div><CatalogueCategoryRail/><CatalogueStateSpecimens/></section>
    <section className={styles.section} id="foundation-templates"><header><span>FOUNDATION 17–20</span><h2>Route-family template foundations.</h2><p>Homepage, catalogue, PDP, OpenLab Portal, and Archive each have named slot and state anatomy.</p></header><div className={styles.templates}>{["Homepage","Catalogue / PLP","PDP","OpenLab Portal","OpenLab Archive"].map((name)=><article key={name}><span>{name}</span><div><i/><i/><i/><i/></div><small>1440 · 1024 · 768 · 390</small></article>)}</div><HomepageTriTick/></section>
  </>;
}
