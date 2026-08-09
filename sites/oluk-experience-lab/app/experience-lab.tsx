/* eslint-disable @next/next/no-img-element -- local transparent Figma assets require authored object-fit treatment. */
/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors preserve stable Vinext hydration in the private Sites build. */

type RouteKey =
  | "home"
  | "shop"
  | "product"
  | "openlab"
  | "records"
  | "record"
  | "dossier"
  | "lookup"
  | "methodology"
  | "source-chain"
  | "compare"
  | "evidence-os"
  | "about"
  | "reviews"
  | "review";

type ExperienceLabProps = { route: RouteKey };

type Product = {
  series: string;
  name: string;
  alias: string;
  sku?: string;
  strength: string;
  servings: string;
  purity: string;
  price: string;
  image: string;
};

const mk2866: Product = {
  series: "SARM SERIES",
  name: "MK-2866",
  alias: "Ostarine",
  sku: "80529-01",
  strength: "15 MG",
  servings: "90 SERVINGS",
  purity: ">99%",
  price: "£43",
  image: "/assets/products/mk-2866/front.png",
};

const rad140: Product = {
  series: "SARM SERIES",
  name: "RAD-140",
  alias: "Testolone",
  strength: "8 MG",
  servings: "60 SERVINGS",
  purity: ">99%",
  price: "£46",
  image: "/assets/products/rad-140/front-design-fixture.png",
};

const productRange: Product[] = [
  mk2866,
  rad140,
  {
    series: "GROWTH SERIES",
    name: "MK-677",
    alias: "Ibutamoren",
    strength: "25 MG",
    servings: "90 SERVINGS",
    purity: ">99%",
    price: "£44",
    image: "/assets/products/mk-2866/front.png",
  },
  {
    series: "SARM SERIES",
    name: "LGD-4033",
    alias: "Ligandrol",
    strength: "10 MG",
    servings: "90 SERVINGS",
    purity: ">99%",
    price: "£38",
    image: "/assets/products/mk-2866/front.png",
  },
];

const assuranceItems = [
  ["Identity Tested", "Compound identity confirmed using advanced analytical methods."],
  ["Purity Measured", "Purity measured to ensure each batch meets strict quality standards."],
  ["Concentration Confirmed", "Concentration verified to match labelled strength with high precision."],
  ["Janoshik Verified", "Results validated through an independent third-party verification platform."],
  ["Tamper-Proof Sealed", "Sealed before dispatch to protect integrity until it reaches you."],
  ["Batch Tracked", "Every batch is connected to its complete evidence record."],
];

const categoryFamilies = [
  ["01", "SARMs", "Selective compounds with receptor specificity.", "8 products"],
  ["02", "Prohormones", "Specialist formulations with product-specific specifications.", "4 products"],
  ["03", "Research Chemicals", "Clearly labelled with technical facts and Lab Record access.", "12 products"],
  ["04", "Stacks", "Curated multi-product selections, individually traceable.", "6 products"],
];

const portalCategories = [
  ["01", "SARMs", "Selective compounds with receptor specificity."],
  ["02", "Prohormones", "Specialist product-specific formulations."],
  ["03", "Research Chemicals", "Technical facts and Lab Record access."],
  ["04", "Stacks", "Multi-product selections, individually traceable."],
];

const batchTicker = [
  ["MK-677", "Verified 08 May 2026", "98.9%"],
  ["BPC-157", "Verified 07 May 2026", "99.2%"],
  ["CJC-1295", "Verified 06 May 2026", "99.0%"],
];

const reviews = [
  ["Excellent product detail", "A. Morgan", "18 July 2026", "The product information was clear and the Lab Record was easy to find.", "5"],
  ["Everything in one place", "Daniel R.", "04 July 2026", "Strength, servings and independent testing were simple to compare before ordering.", "5"],
  ["Clear and well presented", "M. Lewis", "22 June 2026", "A clean experience with the details I wanted without unnecessary clutter.", "4"],
];

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function Chevron() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="m7 4 6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="10.7" cy="10.7" r="6.7" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15.7 15.7 4.3 4.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5.5 8.5h13l-1 11h-11l-1-11Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
      <path d="M9 9V6.8a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function ActionLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <a className={secondary ? "button button-secondary" : "button"} href={href}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

function SiteHeader({ route }: { route: RouteKey }) {
  const shopActive = ["shop", "product", "reviews"].includes(route);
  const labActive = ["openlab", "records", "record", "dossier", "lookup", "methodology", "source-chain", "compare"].includes(route);
  const aboutActive = ["about", "evidence-os"].includes(route);
  return (
    <header className="site-header">
      <div className="trust-rail">
        <div className="shell trust-rail-inner">
          <span><i />Free UK Delivery Over £50</span>
          <span><i />Free Int&apos;l Delivery £300+</span>
          <span><i />Third-Party Lab Verified</span>
          <span><i />JANOSHIK Validated</span>
          <span><i />Encrypted Checkout</span>
          <a href="/open-lab/records">Browse Lab Records <Arrow /></a>
        </div>
      </div>
      <div className="nav-plane">
        <div className="shell primary-nav">
          <a className="brand-link" href="/" aria-label="Olympus Labs UK home">
            <img src="/assets/brand/oluk-logo-on-light.png" alt="Olympus Labs UK" />
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a aria-current={shopActive ? "page" : undefined} href="/shop">Shop</a>
            <a aria-current={labActive ? "page" : undefined} href="/open-lab">Open Lab</a>
            <a aria-current={aboutActive ? "page" : undefined} href="/about">About</a>
          </nav>
          <div className="nav-actions">
            <a className="icon-action" href="/shop" aria-label="Search products"><SearchIcon /></a>
            <a className="records-action" href="/open-lab/records">Lab Records</a>
            <button className="bag-action" type="button" disabled aria-label="Bag"><BagIcon /><span>Bag</span></button>
          </div>
          <details className="mobile-menu">
            <summary>Menu</summary>
            <nav aria-label="Mobile navigation">
              <a href="/shop">Shop</a>
              <a href="/open-lab">Open Lab</a>
              <a href="/open-lab/records">Lab Records</a>
              <a href="/about">About</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <div className="footer-lockup">
            <span className="footer-mark">OL</span>
            <div><strong>OLYMPUS</strong><span>LABS / UK</span></div>
          </div>
          <p>Finished products, clear specifications and independently presented evidence.</p>
          <a href="/open-lab/records">Enter OpenLab <Arrow /></a>
        </div>
        <div><h3>Shop</h3><a href="/shop">Catalogue</a><a href="/product/mk-2866">MK-2866</a><a href="/reviews">Customer reviews</a></div>
        <div><h3>OpenLab</h3><a href="/open-lab">Portal</a><a href="/open-lab/records">Lab Records</a><a href="/open-lab/methodology">Methodology</a><a href="/open-lab/source-chain">Source chain</a></div>
        <div><h3>About</h3><a href="/about">Olympus Labs UK</a><a href="/about/evidence-os">EvidenceOS</a><span>Contact</span><span>Privacy</span></div>
      </div>
      <div className="shell footer-base"><span>© 2026 Olympus Labs UK</span><span>Quality, made visible.</span></div>
    </footer>
  );
}

function EvidenceStatus({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "evidence-status evidence-status-compact" : "evidence-status"}>
      <img src="/assets/evidence/openlab-atom.svg" alt="" />
      <span>OPENLAB VERIFIED</span>
    </span>
  );
}

function InventoryStatus() {
  return <span className="inventory-status"><i />IN STOCK</span>;
}

function MetricRail({ product = mk2866, compact = false }: { product?: Product; compact?: boolean }) {
  const servingValue = product.servings.replace(" SERVINGS", "");
  return (
    <dl className={compact ? "metric-rail metric-rail-compact" : "metric-rail"}>
      <div><dt>{product.strength}</dt><dd>STRENGTH</dd></div>
      <div><dt>{servingValue}</dt><dd>SERVINGS</dd></div>
      <div><dt>{product.purity}</dt><dd>PURITY</dd></div>
    </dl>
  );
}

function FactIcon({ kind }: { kind: string }) {
  if (kind === "class") return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="6" cy="6" r="1.6"/><circle cx="12" cy="6" r="1.6"/><circle cx="18" cy="6" r="1.6"/><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/><circle cx="6" cy="18" r="1.6"/><circle cx="12" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></svg>;
  if (kind === "form") return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7a4 4 0 0 1 0 6L13 17a4 4 0 0 1-6 0Z" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="m10 14 4 4" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>;
  if (kind === "quality") return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M7.5 16h9" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m12 3 7 3v5c0 4.7-2.9 8-7 10-4.1-2-7-5.3-7-10V6l7-3Z" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="m9 12 2 2 4-5" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>;
}

function QualitativeChips() {
  const facts = [["class", "CLASS", "SARM"], ["form", "FORM", "CAPSULES"], ["quality", "QUALITY", "LAB FORMULATED"], ["tested", "TESTED", "THIRD PARTY"]];
  return (
    <dl className="qualitative-chips">
      {facts.map(([kind, label, value]) => <div key={label}><FactIcon kind={kind} /><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>
  );
}

function ProductCommerceCard({ product = mk2866, variant = "vertical", showQualitative = true }: { product?: Product; variant?: "vertical" | "featured" | "compact"; showQualitative?: boolean }) {
  return (
    <article className={`product-commerce-card product-commerce-card-${variant}`}>
      <div className="product-media-chamber">
        <div className="media-orbit" aria-hidden="true" />
        <img src={product.image} alt={`${product.name} ${product.alias} bottle`} />
      </div>
      <div className="product-content-plane">
        <div className="product-identity-row">
          <div><span className="product-series">{product.series}</span><h3>{product.name}</h3><p>{product.alias}</p></div>
          <div className="product-status-stack"><InventoryStatus /><EvidenceStatus compact /></div>
        </div>
        <MetricRail product={product} compact={variant === "compact"} />
        {showQualitative && <QualitativeChips />}
        {variant === "featured" && product.sku && <div className="card-sku"><span>SKU {product.sku}</span><a href="/product/mk-2866">View product <Arrow /></a></div>}
        <div className="purchase-row">
          <div className="price-block"><span>PRICE</span><strong>{product.price}</strong></div>
          <div className="quantity-stepper" aria-label="Quantity"><button type="button" disabled>−</button><span>1</span><button type="button" disabled>+</button></div>
        </div>
        <div className="card-actions">
          <button className="button" type="button" disabled>Add to bag</button>
          <a className="button button-secondary" href={product.name === "MK-2866" ? "/open-lab/dossier/mk-2866" : "/open-lab/records"}>View Lab Record <Arrow /></a>
        </div>
      </div>
    </article>
  );
}

function AssuranceRail({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "assurance-rail assurance-rail-compact" : "assurance-rail"}>
      {assuranceItems.map(([title, copy], index) => (
        <article key={title}>
          <span className="assurance-number">0{index + 1}</span>
          <div className="assurance-icon"><FactIcon kind={index % 4 === 0 ? "class" : index % 4 === 1 ? "quality" : index % 4 === 2 ? "tested" : "form"} /></div>
          <div><h3>{title}</h3>{!compact && <p>{copy}</p>}</div>
        </article>
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy?: string; action?: React.ReactNode }) {
  return (
    <div className="section-heading">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
      {action && <div className="section-heading-action">{action}</div>}
    </div>
  );
}

function PortalCard() {
  return (
    <article className="portal-card hero-panel">
      <span className="eyebrow">OPENLAB PORTAL</span>
      <h1>Shop the range and verify every batch.</h1>
      <p>Browse products, check batch records and access lab reports in one place.</p>
      <label className="hero-search"><SearchIcon /><span className="sr-only">Search products or batches</span><input type="search" placeholder="Search products, batches or compounds" /></label>
      <div className="button-row"><ActionLink href="/shop">Shop the range</ActionLink><ActionLink href="/open-lab/records" secondary>View Lab Records</ActionLink></div>
    </article>
  );
}

function ArchiveCard() {
  return (
    <article className="archive-card hero-panel">
      <div className="archive-card-copy"><span className="eyebrow">OPENLAB ARCHIVE</span><h2>Every batch. Every report. Public.</h2><p>Independent testing records, connected directly to the products they verify.</p></div>
      <div className="archive-metrics"><div><strong>15</strong><span>REPORTS</span></div><div><strong>99.55%</strong><span>AVG PURITY</span></div><div><strong>0</strong><span>FAILURES</span></div></div>
      <a href="/open-lab/methodology">Read our methodology <Arrow /></a>
    </article>
  );
}

function HeroCategoryCards() {
  return <div className="hero-category-cards">{portalCategories.map(([index, title, copy]) => <a href="/shop" key={title}><span>{index}</span><h3>{title}</h3><p>{copy}</p><strong>Browse <Arrow /></strong></a>)}</div>;
}

function BatchTicker() {
  return (
    <aside className="batch-ticker" aria-label="Latest batch reports">
      <div className="ticker-heading"><span><i />Latest batch reports</span><a href="/open-lab/records">All reports <Arrow /></a></div>
      <div className="ticker-grid">{batchTicker.map(([product, date, result]) => <a href="/open-lab/records" key={product}><div><strong>{product}</strong><span>{date}</span></div><div><strong>{result}</strong><span>HPLC</span></div></a>)}</div>
    </aside>
  );
}

function HomeHero() {
  return (
    <section className="mf03-hero" id="hero">
      <div className="shell hero-composition">
        <div className="hero-left-stack"><PortalCard /><ArchiveCard /></div>
        <ProductCommerceCard variant="featured" />
        <HeroCategoryCards />
        <BatchTicker />
      </div>
    </section>
  );
}

function CompoundFamilies() {
  return (
    <section className="section" id="compound-families">
      <div className="shell family-layout">
        <div className="family-editorial"><span className="eyebrow">COMPOUND FAMILIES</span><h2>The full range.</h2><p>Explore products by compound family, with technical facts and Lab Record access presented in the same clear system.</p><a href="/shop">View all families <Arrow /></a></div>
        <div className="family-grid">{categoryFamilies.map(([index, title, copy, count]) => <a href="/shop" key={title}><span className="family-index">{index}</span><h3>{title}</h3><p>{copy}</p><div><span>{count}</span><strong>Explore <Arrow /></strong></div></a>)}</div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  return (
    <section className="section section-blue-wash" id="featured-products">
      <div className="shell">
        <SectionHeading eyebrow="OPENLAB PRODUCT RANGE" title="Finished products. Verified evidence." copy="Shop product specifications and move directly into available independent records." action={<a href="/shop">View all products <Arrow /></a>} />
        <div className="product-grid">{productRange.slice(0, 3).map((product) => <ProductCommerceCard key={product.name} product={product} />)}</div>
      </div>
    </section>
  );
}

function AssuranceSection() {
  return (
    <section className="section" id="assurance">
      <div className="shell assurance-section">
        <SectionHeading eyebrow="THE OLYMPUS STANDARD" title="Six points of assurance." copy="Each product connects clear label information with a consistent evidence pathway." action={<a href="/open-lab/methodology">How testing works <Arrow /></a>} />
        <AssuranceRail />
      </div>
    </section>
  );
}

function ReviewsSection({ full = false }: { full?: boolean }) {
  return (
    <section className="section reviews-section" id="reviews">
      <div className="shell">
        <SectionHeading eyebrow="CUSTOMER REVIEWS" title="What customers are saying." copy="Straightforward experiences with product information, ordering and OpenLab access." action={<a href="/reviews">Read all reviews <Arrow /></a>} />
        <div className="review-grid">{reviews.map(([title, name, date, copy, stars]) => <article className="review-card" key={title}><div className="stars" aria-label={`${stars} out of 5 stars`}>{"★★★★★".slice(0, Number(stars))}<span>{"★★★★★".slice(Number(stars))}</span></div><h3>{title}</h3><p>“{copy}”</p><div className="review-author"><div><strong>{name}</strong><span>{date}</span></div><span className="verified-purchase">Verified purchase</span></div></article>)}</div>
        {full && <div className="review-pagination"><button type="button" disabled>Previous</button><span>1 / 1</span><button type="button" disabled>Next</button></div>}
      </div>
    </section>
  );
}

function RelatedProduct() {
  return (
    <section className="section related-section" id="related-products">
      <div className="shell">
        <SectionHeading eyebrow="RELATED PRODUCTS" title="Frequently paired together." copy="Continue through the range without losing product specifications or evidence access." />
        <article className="horizontal-product-card">
          <div className="horizontal-media"><div className="media-orbit" aria-hidden="true" /><img src={rad140.image} alt="RAD-140 Testolone bottle" /></div>
          <div className="horizontal-content"><div className="product-identity-row"><div><span className="product-series">{rad140.series}</span><h3>{rad140.name}</h3><p>{rad140.alias}</p></div><div className="product-status-stack"><InventoryStatus /><EvidenceStatus compact /></div></div><MetricRail product={rad140} /><QualitativeChips /><div className="purchase-row"><div className="price-block"><span>PRICE</span><strong>{rad140.price}</strong></div><div className="card-actions"><button className="button" type="button" disabled>Add to bag</button><a className="button button-secondary" href="/open-lab/records">View Lab Record <Arrow /></a></div></div></div>
        </article>
      </div>
    </section>
  );
}

function HomePage() {
  return <><HomeHero /><AssuranceSection /><CompoundFamilies /><FeaturedProducts /><EvidenceArchiveSection /><ReviewsSection /><RelatedProduct /></>;
}

function PageHero({ eyebrow, title, copy, actions }: { eyebrow: string; title: string; copy: string; actions?: React.ReactNode }) {
  return <section className="page-hero"><div className="shell"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p>{actions && <div className="button-row">{actions}</div>}</div></section>;
}

function ShopPage() {
  return (
    <>
      <PageHero eyebrow="SHOP" title="The Olympus Labs UK range." copy="Compare clear product specifications, then move directly into available Lab Records." />
      <section className="section"><div className="shell catalogue-layout"><aside className="filter-panel"><span className="eyebrow">FILTERS</span><h2>Refine products</h2>{["SARMs", "Peptides", "Longevity", "Nootropics"].map((item, index) => <label key={item}><input type="checkbox" defaultChecked={index === 0} />{item}</label>)}<hr /><label><input type="checkbox" />Lab Record available</label></aside><div className="catalogue-main"><div className="catalogue-toolbar"><span>8 products</span><label>Sort <select defaultValue="featured"><option value="featured">Featured</option><option value="price">Price</option></select></label></div><div className="product-grid product-grid-catalogue">{productRange.map((product) => <ProductCommerceCard key={product.name} product={product} showQualitative={false} />)}</div></div></div></section>
    </>
  );
}

function PurchasePanel() {
  return (
    <div className="purchase-panel">
      <div className="product-identity-row"><div><span className="product-series">{mk2866.series}</span><h1>{mk2866.name}</h1><p>{mk2866.alias}</p></div><div className="product-status-stack"><InventoryStatus /><EvidenceStatus compact /></div></div>
      <p className="product-intro">A finished capsule product with clear label specifications and direct access to available OpenLab records.</p>
      <MetricRail />
      <QualitativeChips />
      <div className="sku-line"><span>SKU {mk2866.sku}</span><a href="#lab-records">View Lab Records <Arrow /></a></div>
      <div className="purchase-row"><div className="price-block"><span>PRICE</span><strong>{mk2866.price}</strong></div><div className="quantity-stepper"><button type="button" disabled>−</button><span>1</span><button type="button" disabled>+</button></div></div>
      <button className="button button-large" type="button" disabled>Add to bag</button>
    </div>
  );
}

function ProductDossier() {
  return (
    <section className="section dossier-section" id="dossier">
      <div className="shell">
        <SectionHeading eyebrow="PRODUCT DOSSIER" title="Product facts, label truth and batch evidence." copy="A compact view of the product, its specifications and the records connected to it." />
        <div className="dossier-tabs" aria-label="Dossier sections"><span aria-current="true">Product</span><span>Facts</span><span>Composition</span></div>
        <div className="dossier-card">
          <article className="dossier-panel dossier-facts"><span className="panel-index">01</span><h3>Product Facts</h3><p>Essential label information, clearly separated from analytical results.</p><dl><div><dt>Series</dt><dd>{mk2866.series}</dd></div><div><dt>Strength</dt><dd>{mk2866.strength}</dd></div><div><dt>Servings</dt><dd>{mk2866.servings}</dd></div><div><dt>SKU</dt><dd>{mk2866.sku}</dd></div></dl></article>
          <article className="dossier-media"><img src={mk2866.image} alt="MK-2866 Ostarine bottle" /><MetricRail compact /></article>
          <article className="dossier-panel dossier-composition"><span className="panel-index">03</span><h3>Product Composition</h3><p>Presented as labelled product detail, with report results kept in their own record.</p><dl><div><dt>Form</dt><dd>Capsules</dd></div><div><dt>Compound</dt><dd>Ostarine</dd></div><div><dt>Label purity</dt><dd>{mk2866.purity}</dd></div><div><dt>Testing</dt><dd>Third party</dd></div></dl><a href="#lab-records">Open evidence records <Arrow /></a></article>
        </div>
      </div>
    </section>
  );
}

function LabRecordsSection() {
  const records = [["OL-MK2866-0526", "May 2026", "Report available", "99.1%"], ["OL-MK2866-0226", "February 2026", "Report available", "99.3%"], ["OL-MK2866-1125", "November 2025", "Report available", "99.0%"]];
  return (
    <section className="section section-blue-wash lab-records-section" id="lab-records"><div className="shell"><SectionHeading eyebrow="OPENLAB RECORDS" title="Independent records for MK-2866." copy="Browse available batch records and open each report from its original record page." action={<a href="/open-lab/records">View complete archive <Arrow /></a>} /><div className="record-card-grid">{records.map(([id, date, state, result]) => <a className="record-card" href="/open-lab/records/source-bound-record" key={id}><div><span>LAB RECORD</span><strong>{id}</strong></div><dl><div><dt>Published</dt><dd>{date}</dd></div><div><dt>Purity</dt><dd>{result}</dd></div><div><dt>Status</dt><dd>{state}</dd></div></dl><span className="record-open">Open record <Arrow /></span></a>)}</div></div></section>
  );
}

function ProductPage() {
  return (
    <>
      <section className="pdp-first-fold" id="purchase"><div className="shell pdp-grid"><div className="pdp-media"><div className="pdp-media-stage"><span className="media-tag">01 / FRONT</span><div className="pdp-halo" /><img src={mk2866.image} alt="MK-2866 Ostarine bottle" /></div><div className="media-controls" id="media-controls"><button type="button" disabled aria-current="true">Front</button><button type="button" disabled>Side</button><button type="button" disabled>Label</button><button type="button" disabled>Details</button></div></div><PurchasePanel /></div></section>
      <section className="section pdp-assurance" id="pdp-assurance"><div className="shell"><AssuranceRail compact /></div></section>
      <ProductDossier />
      <LabRecordsSection />
      <RelatedProduct />
    </>
  );
}

function OpenLabNav({ active }: { active: string }) {
  const links = [["overview", "Overview", "/open-lab"], ["records", "Records", "/open-lab/records"], ["lookup", "Batch Lookup", "/open-lab/batch-lookup"], ["methodology", "Methodology", "/open-lab/methodology"], ["chain", "Source Chain", "/open-lab/source-chain"], ["compare", "Compare", "/open-lab/compare"]];
  return <nav className="openlab-nav" aria-label="OpenLab navigation"><div className="shell"><a className="openlab-wordmark" href="/open-lab"><img src="/assets/evidence/openlab-atom.svg" alt="" />OPENLAB</a><div>{links.map(([key, label, href]) => <a aria-current={active === key ? "page" : undefined} href={href} key={key}>{label}</a>)}</div></div></nav>;
}

function EvidenceArchiveSection() {
  return (
    <section className="section evidence-archive-section"><div className="shell evidence-archive-grid"><article className="archive-search-card"><span className="eyebrow">OPENLAB ARCHIVE</span><h2>Find a report.</h2><p>Search finished products and published batch records from one clear starting point.</p><label className="hero-search"><SearchIcon /><span className="sr-only">Search the archive</span><input type="search" placeholder="Search product, batch or record" /></label><div className="button-row"><ActionLink href="/open-lab/records">Browse records</ActionLink><ActionLink href="/open-lab/methodology" secondary>Methodology</ActionLink></div></article><article className="archive-summary-card"><span className="eyebrow">ARCHIVE AT A GLANCE</span><h2>Evidence shaped around the product.</h2><p>Each record keeps product identity, batch context, method and original report access together.</p><div className="summary-metrics"><div><strong>15</strong><span>REPORTS</span></div><div><strong>12</strong><span>PRODUCTS</span></div><div><strong>3</strong><span>METHODS</span></div></div><a href="/open-lab">Enter the portal <Arrow /></a></article></div></section>
  );
}

function OpenLabPage() {
  return (
    <><OpenLabNav active="overview" /><section className="openlab-portal-hero"><div className="shell openlab-portal-grid"><div className="openlab-intro"><span className="eyebrow">OPENLAB</span><h1>Independent evidence, connected to every product.</h1><p>Browse finished-product records, trace each batch and open the original report from one public archive.</p><div className="button-row"><ActionLink href="/open-lab/records">Browse Lab Records</ActionLink><ActionLink href="/open-lab/methodology" secondary>How testing works</ActionLink></div></div><div className="openlab-feature-card"><div><img src={mk2866.image} alt="MK-2866 Ostarine bottle" /></div><span>{mk2866.series}</span><h2>{mk2866.name}</h2><p>{mk2866.alias}</p><MetricRail compact /><a href="/open-lab/dossier/mk-2866">Open product dossier <Arrow /></a></div></div></section><section className="section"><div className="shell"><SectionHeading eyebrow="SIX-POINT ASSURANCE" title="What every record is built to show." copy="A consistent route from product identity through testing and batch tracking." /><AssuranceRail /></div></section><EvidenceArchiveSection /><section className="section section-blue-wash"><div className="shell portal-route-grid">{[["01", "Lab Records", "Search published records.", "/open-lab/records"], ["02", "Batch Lookup", "Find a specific batch.", "/open-lab/batch-lookup"], ["03", "Methodology", "Understand each testing method.", "/open-lab/methodology"], ["04", "Source Chain", "Follow product to report.", "/open-lab/source-chain"], ["05", "Compare", "Review compatible records.", "/open-lab/compare"], ["06", "EvidenceOS", "Explore the evidence framework.", "/about/evidence-os"]].map(([index, title, copy, href]) => <a href={href} key={title}><span>{index}</span><h3>{title}</h3><p>{copy}</p><Arrow /></a>)}</div></section></>
  );
}

function RecordsTable() {
  const rows = [["MK-2866", "OL-MK2866-0526", "May 2026", "99.1%", "Report available"], ["RAD-140", "OL-RAD140-0426", "April 2026", "99.3%", "Report available"], ["MK-677", "OL-MK677-0326", "March 2026", "98.9%", "Report available"], ["LGD-4033", "OL-LGD4033-0226", "February 2026", "99.2%", "Report available"]];
  return <div className="records-table"><div className="records-table-head"><span>Product</span><span>Record</span><span>Published</span><span>Purity</span><span>Status</span><span /></div>{rows.map((row) => <a href="/open-lab/records/source-bound-record" className="records-table-row" key={row[1]}>{row.map((value, index) => <span key={value} data-label={["Product", "Record", "Published", "Purity", "Status"][index]}>{value}</span>)}<strong>Open <Arrow /></strong></a>)}</div>;
}

function RecordsPage() {
  return <><OpenLabNav active="records" /><PageHero eyebrow="OPENLAB ARCHIVE" title="Every batch. Every report. Public." copy="Search finished products and independently published records." actions={<><ActionLink href="/open-lab/methodology" secondary>Testing methodology</ActionLink></>} /><section className="section"><div className="shell records-layout"><aside className="records-filter"><span className="eyebrow">FILTER RECORDS</span><label className="hero-search"><SearchIcon /><span className="sr-only">Search records</span><input type="search" placeholder="Product or record ID" /></label>{["Report available", "HPLC", "Identity", "Purity"].map((filter, index) => <label key={filter}><input type="checkbox" defaultChecked={index === 0} />{filter}</label>)}</aside><div><div className="records-toolbar"><span>15 records</span><a href="/open-lab/batch-lookup">Have a batch number? <Arrow /></a></div><RecordsTable /></div></div></section></>;
}

function RecordPage() {
  return <><OpenLabNav active="records" /><section className="record-hero"><div className="shell"><div className="breadcrumb"><a href="/open-lab">OpenLab</a><span>/</span><a href="/open-lab/records">Records</a><span>/</span><strong>OL-MK2866-0526</strong></div><div className="record-hero-grid"><div><span className="eyebrow">LAB RECORD</span><h1>MK-2866 · May 2026</h1><p>A published purity record connected to the finished MK-2866 product.</p><div className="record-state"><EvidenceStatus /><span>Report available</span></div></div><img src={mk2866.image} alt="MK-2866 Ostarine bottle" /></div></div></section><section className="section"><div className="shell record-detail-layout"><main className="record-main"><article className="record-result-card"><span className="eyebrow">REPORTED RESULT</span><div className="result-value"><strong>99.1%</strong><span>HPLC PURITY</span></div><dl><div><dt>Product</dt><dd>MK-2866</dd></div><div><dt>Record</dt><dd>OL-MK2866-0526</dd></div><div><dt>Published</dt><dd>May 2026</dd></div><div><dt>Method</dt><dd>HPLC</dd></div></dl></article><article className="trace-card"><div className="trace-heading"><span className="eyebrow">HPLC TRACE</span><strong>Analytical profile</strong></div><svg viewBox="0 0 820 230" role="img" aria-label="HPLC trace illustration"><path className="trace-grid" d="M0 45h820M0 90h820M0 135h820M0 180h820M82 0v230M164 0v230M246 0v230M328 0v230M410 0v230M492 0v230M574 0v230M656 0v230M738 0v230"/><path className="trace-line" d="M0 193 95 190 151 187 185 177 211 187 260 185 292 175 313 182 348 180 372 169 391 179 437 176 472 160 495 168 525 164 548 39 568 165 609 172 643 159 672 169 720 164 758 151 780 165 820 160"/></svg></article></main><aside className="record-side"><span className="eyebrow">REPORT ACCESS</span><h2>Original record</h2><p>Open the published document or review how Olympus presents testing methods.</p><a className="button" href="#report">Open report <Arrow /></a><a href="/open-lab/methodology">View methodology <Arrow /></a><hr /><h3>Connected product</h3><a href="/product/mk-2866">MK-2866 · {mk2866.price} <Arrow /></a></aside></div></section></>;
}

function DossierPage() {
  return <><OpenLabNav active="overview" /><PageHero eyebrow="PRODUCT DOSSIER" title="MK-2866 product dossier." copy="Product facts, label detail and available OpenLab records in one continuous view." /><ProductDossier /><LabRecordsSection /></>;
}

function LookupPage() {
  return <><OpenLabNav active="lookup" /><PageHero eyebrow="BATCH LOOKUP" title="Find a batch record." copy="Enter a batch or record number to move directly into its published OpenLab detail." /><section className="section"><div className="shell lookup-layout"><article className="lookup-card"><span className="eyebrow">SEARCH OPENLAB</span><h2>Batch or record number</h2><label className="lookup-input"><input type="search" placeholder="e.g. OL-MK2866-0526" /><button type="button" disabled>Find record <Arrow /></button></label><p>You can find the reference on the product label or order documentation.</p></article><aside className="lookup-guide"><span>01</span><h3>Find the reference</h3><p>Locate the batch or record number on the product.</p><span>02</span><h3>Search the archive</h3><p>Enter the complete reference above.</p><span>03</span><h3>Open the report</h3><p>Review the connected record and original document.</p></aside></div></section></>;
}

function MethodologyPage() {
  return <><OpenLabNav active="methodology" /><PageHero eyebrow="TESTING METHODOLOGY" title="How finished products are verified." copy="A clear explanation of the methods used across identity, purity and concentration records." /><section className="section"><div className="shell methodology-grid">{[["01", "Identity", "Confirms the compound named in the finished product record."], ["02", "Purity", "Measures the proportion of the target compound in the submitted sample."], ["03", "Concentration", "Checks measured concentration against the product label."], ["04", "Source custody", "Keeps each result connected to its batch and original report."]].map(([index, title, copy]) => <article key={title}><span>{index}</span><h2>{title}</h2><p>{copy}</p><a href="/open-lab/records">View records <Arrow /></a></article>)}</div></section><section className="section section-blue-wash"><div className="shell"><SectionHeading eyebrow="ASSURANCE RAIL" title="The same six checks, everywhere." /><AssuranceRail /></div></section></>;
}

function SourceChainPage() {
  return <><OpenLabNav active="chain" /><PageHero eyebrow="SOURCE CHAIN" title="From finished product to original report." copy="Follow each evidence step without losing the product or batch it belongs to." /><section className="section"><div className="shell source-chain">{[["01", "Product", "Label identity and specifications"], ["02", "Batch", "The finished production reference"], ["03", "Laboratory", "Independent testing context"], ["04", "Report", "The original published document"], ["05", "OpenLab", "The customer-facing record"]].map(([index, title, copy]) => <article key={title}><span>{index}</span><div><h2>{title}</h2><p>{copy}</p></div><Chevron /></article>)}</div></section></>;
}

function ComparePage() {
  return <><OpenLabNav active="compare" /><PageHero eyebrow="COMPARE RECORDS" title="Compare finished-product records." copy="Review compatible identity, purity and concentration fields side by side." /><section className="section"><div className="shell compare-grid">{[mk2866, rad140].map((product) => <article key={product.name}><div className="compare-product"><img src={product.image} alt={`${product.name} bottle`} /><div><span>{product.series}</span><h2>{product.name}</h2><p>{product.alias}</p></div></div><MetricRail product={product} /><dl><div><dt>Latest record</dt><dd>Report available</dd></div><div><dt>Method</dt><dd>HPLC</dd></div><div><dt>OpenLab</dt><dd><a href="/open-lab/records">View record <Arrow /></a></dd></div></dl></article>)}</div></section></>;
}

function EvidenceOsPage() {
  return <><PageHero eyebrow="EVIDENCEOS" title="A clearer path from product to proof." copy="The system that keeps product identity, testing records and customer access connected." /><section className="section"><div className="shell"><SectionHeading eyebrow="THE EVIDENCE MODEL" title="Five connected layers." /><div className="source-chain">{[["01", "Product", "What the customer is buying"], ["02", "Batch", "Which finished run it came from"], ["03", "Laboratory", "Who performed the analysis"], ["04", "Report", "What the document records"], ["05", "OpenLab", "Where customers can inspect it"]].map(([index, title, copy]) => <article key={title}><span>{index}</span><div><h2>{title}</h2><p>{copy}</p></div><Chevron /></article>)}</div></div></section><AssuranceSection /></>;
}

function AboutPage() {
  return <><PageHero eyebrow="ABOUT OLYMPUS LABS UK" title="Quality, made visible." copy="A product experience built around clear specifications, considered design and accessible independent records." /><section className="section"><div className="shell about-grid"><article><span>01</span><h2>Product first.</h2><p>Every detail begins with a clear product identity and readable specifications.</p></article><article><span>02</span><h2>Evidence connected.</h2><p>OpenLab keeps available records one direct route away from the product.</p></article><article><span>03</span><h2>Calm by design.</h2><p>Cool luminous surfaces, precise hierarchy and focused cobalt actions create a confident experience.</p></article></div></section><RelatedProduct /></>;
}

function ReviewsPage() {
  return <><PageHero eyebrow="CUSTOMER REVIEWS" title="Experiences shared by Olympus customers." copy="Product, delivery and OpenLab feedback presented in a clear, consistent review surface." /><ReviewsSection full /></>;
}

const reviewItems = [
  ["Header + opening composition", "/#hero", "614:75950", "Two left containers, Featured card, right categories and BatchTicker"],
  ["Six-point assurance", "/#assurance", "556:34627", "Full and compact AssuranceRail"],
  ["Compound families", "/#compound-families", "561:41860", "Four equal white family cards"],
  ["Product card family", "/#featured-products", "486:4634", "Bounded chamber, metric rail, facts and purchase plane"],
  ["Customer reviews", "/#reviews", "614:75950", "Rendered three-card customer state"],
  ["Related product", "/#related-products", "486:4636", "Adaptive horizontal ProductCommerceCard"],
  ["PDP first fold", "/product/mk-2866#purchase", "551:31570", "Media and PurchasePanel"],
  ["PDP dossier", "/product/mk-2866#dossier", "551:27148", "Three-panel responsive dossier"],
  ["PDP Lab Records", "/product/mk-2866#lab-records", "551:31665", "Record cards and OpenLab handoff"],
  ["OpenLab portal", "/open-lab", "588:67272", "Portal composition"],
  ["Lab Records archive", "/open-lab/records", "588:67449", "Archive filters and record grid"],
  ["Individual record", "/open-lab/records/source-bound-record", "588:67788", "Record summary, trace and report access"],
  ["Footer", "/#footer", "614:75950", "Sole inverse surface"],
];

function ReviewIndex() {
  return <section className="review-index"><div className="shell"><span className="eyebrow">PRIVATE DESIGN REVIEW · VERSION 3</span><h1>Olympus Labs UK review surfaces.</h1><p>Each item links directly to the current implementation and its Figma reference. Populated records, reviews, availability, delivery and assurance copy are presentation content for this private design review; live sources are connected only after visual approval.</p><div className="review-index-grid">{reviewItems.map(([title, href, node, copy], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p><div><a href={href}>Open current surface <Arrow /></a><a href={`https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=${node.replace(":", "-")}`} target="_blank" rel="noreferrer">Open Figma target <Arrow /></a></div><strong>READY FOR REVIEW</strong></article>)}</div><section className="review-notes"><h2>Review sequence</h2><ol><li>Check structure and card relationships at 1440 px.</li><li>Check recomposition at 1024, 768 and 390 px.</li><li>Record pass or correction against each linked item.</li></ol></section></div></section>;
}

export function ExperienceLab({ route }: ExperienceLabProps) {
  let content: React.ReactNode;
  switch (route) {
    case "shop": content = <ShopPage />; break;
    case "product": content = <ProductPage />; break;
    case "openlab": content = <OpenLabPage />; break;
    case "records": content = <RecordsPage />; break;
    case "record": content = <RecordPage />; break;
    case "dossier": content = <DossierPage />; break;
    case "lookup": content = <LookupPage />; break;
    case "methodology": content = <MethodologyPage />; break;
    case "source-chain": content = <SourceChainPage />; break;
    case "compare": content = <ComparePage />; break;
    case "evidence-os": content = <EvidenceOsPage />; break;
    case "about": content = <AboutPage />; break;
    case "reviews": content = <ReviewsPage />; break;
    case "review": content = <ReviewIndex />; break;
    default: content = <HomePage />;
  }
  if (route === "review") return <div className="experience-lab"><main id="main-content">{content}</main></div>;
  return <div className="experience-lab"><SiteHeader route={route} /><main id="main-content">{content}</main><div id="footer"><SiteFooter /></div></div>;
}
