import { ActionLink } from "./customer-route-primitives";
import { ProductCommerceCard } from "./product-commerce-card";
import { mk2866Fixture } from "./product-fixtures";

const categories = [
  ["01", "SARMs", "Selective receptor modulators.", "/shop?family=sarms"],
  ["02", "Prohormones", "Formulations grouped by the live catalogue family.", "/shop?family=prohormones"],
  ["03", "Research Chemicals", "Research compounds in the current catalogue.", "/shop?family=research-chemicals"],
  ["04", "Stacks", "Curated multi-product relationships and stacks.", "/shop?family=stacks"],
] as const;

const ticker = [
  ["MK-677", "98.9%", "Verified 08 May 2026"],
  ["BPC-157", "99.2%", "Verified 07 May 2026"],
  ["CJC-1295", "99.0%", "Verified 06 May 2026"],
] as const;

function SearchGlyph() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" fill="none" r="6.2" stroke="currentColor" strokeWidth="1.6"/><path d="m15.2 15.2 4.2 4.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6"/></svg>;
}

export function OpenLabHeroLight() {
  return (
    <section className="section-blue-wash openlab-hero-light" data-figma-node="614:75995" data-module="OpenLabHeroLight" id="openlab-hero-light">
      <div className="shell hero-composition">
        <div className="hero-left-stack">
          <article className="hero-panel portal-card">
            <span className="eyebrow">OpenLab portal</span>
            <h1>Shop the range and verify every batch.</h1>
            <p>Browse products, check batch records, and access lab reports in one place.</p>
            <label className="hero-search"><SearchGlyph/><span className="sr-only">Search OpenLab</span><input placeholder="Search products, batches, or compounds" type="search"/></label>
            <div className="button-row"><ActionLink href="/shop">Shop the range</ActionLink><ActionLink href="/open-lab/records" secondary>View lab records</ActionLink></div>
          </article>
          <article className="hero-panel archive-card">
            <div className="archive-card-copy"><span className="eyebrow">OpenLab archive</span><h2>Every batch. Every report. Public.</h2><p>Independent laboratory records remain connected to the batches and products they describe.</p></div>
            <div className="archive-metrics"><div><strong>15</strong><span>Reports</span></div><div><strong>99.55%</strong><span>Avg purity</span></div><div><strong>0</strong><span>Failures</span></div></div>
            <a href="/open-lab/records">View the records archive →</a>
          </article>
        </div>
        <ProductCommerceCard headingLevel="h2" product={mk2866Fixture} variant="featured"/>
        <div className="hero-category-cards">
          {categories.map(([index,title,copy,href]) => <a href={href} key={title}><span>{index}</span><h3>{title}</h3><p>{copy}</p><strong>Browse →</strong></a>)}
        </div>
        <article className="batch-ticker">
          <div className="ticker-heading"><span><i/>Live batch verification feed</span><a href="/open-lab/records">All reports →</a></div>
          <div className="ticker-grid">{ticker.map(([name,purity,status]) => <a href="/open-lab/records" key={name}><div><strong>{name}</strong><span>{status}</span></div><div><strong>{purity}</strong><span>HPLC</span></div></a>)}</div>
        </article>
      </div>
    </section>
  );
}
