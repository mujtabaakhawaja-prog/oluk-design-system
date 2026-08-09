/* eslint-disable @next/next/no-img-element -- exact local Figma transparency assets are intentionally styled responsively in this private design lab. */
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext currently hydrates framework Link components incorrectly in this server-rendered experience. */

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
  | "reviews";

type ExperienceLabProps = {
  route: RouteKey;
};

const mk2866 = {
  series: "SARM SERIES",
  name: "MK-2866",
  alias: "Ostarine",
  sku: "80529-01",
  strength: "15 MG",
  servings: "90 SERVINGS",
  purity: ">99%",
  price: "£43",
};

const openLabRoutes = [
  {
    index: "01",
    title: "Lab Records",
    copy: "Search and filter the public record structure.",
    href: "/open-lab/records",
  },
  {
    index: "02",
    title: "Product dossier",
    copy: "Follow product truth into source-bound record context.",
    href: "/open-lab/dossier/mk-2866",
  },
  {
    index: "03",
    title: "Batch lookup",
    copy: "Resolve a batch or product reference to available records.",
    href: "/open-lab/batch-lookup",
  },
  {
    index: "04",
    title: "Methodology",
    copy: "Understand the language and fields used by OpenLab.",
    href: "/open-lab/methodology",
  },
  {
    index: "05",
    title: "Source chain",
    copy: "See how product, batch, lab, report and ledger relate.",
    href: "/open-lab/source-chain",
  },
  {
    index: "06",
    title: "Compare records",
    copy: "Compare only fields supplied by compatible sources.",
    href: "/open-lab/compare",
  },
];

const sourceStates = [
  ["REPORT READY", "A record document is available to open."],
  ["SOURCE LINKED", "A source action is available without recreating its content."],
  ["CONTEXT REQUIRED", "More source context is required before interpretation."],
  ["PUBLIC LINKED", "A governed public destination is connected."],
  ["COMBO AUTHORITY", "One record can contain multiple reported analytes."],
  ["QA LOCKED", "A state is held until its authority condition changes."],
];

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a className={secondary ? "button button-secondary" : "button"} href={href}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

function FixtureNotice() {
  return (
    <div className="fixture-notice" role="note">
      <span>EXPERIENCE LAB</span>
      <strong>STATIC DESIGN FIXTURES</strong>
      <span>No live inventory, reviews, evidence, cart or checkout is connected.</span>
    </div>
  );
}

function SiteHeader({ route }: { route: RouteKey }) {
  const openLabActive = [
    "openlab",
    "records",
    "record",
    "dossier",
    "lookup",
    "methodology",
    "source-chain",
    "compare",
  ].includes(route);
  const shopActive = ["shop", "product", "reviews"].includes(route);
  const aboutActive = ["about", "evidence-os"].includes(route);

  return (
    <header className="site-header">
      <div className="action-rail">
        <div className="shell action-rail-inner">
          <div className="action-rail-copy">
            <span className="rail-mark" aria-hidden="true" />
            <strong>OPENLAB</strong>
            <span>Read-only source navigation</span>
          </div>
          <a href="/open-lab/records">
            Browse Lab Records <Arrow />
          </a>
        </div>
      </div>

      <div className="primary-nav-plane">
        <div className="shell primary-nav">
          <a className="brand-link" href="/" aria-label="Olympus Labs UK home">
            <img src="/assets/brand/oluk-logo-on-light.png" alt="Olympus Labs UK" />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a aria-current={shopActive ? "page" : undefined} href="/shop">
              Shop
            </a>
            <a aria-current={openLabActive ? "page" : undefined} href="/open-lab">
              Open Lab
            </a>
            <a aria-current={aboutActive ? "page" : undefined} href="/about">
              About
            </a>
          </nav>

          <div className="nav-actions">
            <a className="records-action" href="/open-lab/records">
              Lab Records
            </a>
            <button className="bag-button" type="button" disabled aria-label="Bag is not connected in this design preview">
              Bag
            </button>
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

      <nav className="context-rail" aria-label="Experience sections">
        <div className="shell context-rail-inner">
          <span className="context-label">Browse</span>
          <a aria-current={route === "home" ? "page" : undefined} href="/">
            Featured
          </a>
          <a aria-current={route === "shop" ? "page" : undefined} href="/shop">
            Catalogue
          </a>
          <a aria-current={route === "product" ? "page" : undefined} href="/product/mk-2866">
            MK-2866
          </a>
          <a aria-current={route === "reviews" ? "page" : undefined} href="/reviews">
            Reviews
          </a>
          <a aria-current={route === "openlab" ? "page" : undefined} href="/open-lab">
            OpenLab Portal
          </a>
          <a aria-current={route === "records" ? "page" : undefined} href="/open-lab/records">
            Records
          </a>
        </div>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src="/assets/brand/oluk-logo-on-light.png" alt="Olympus Labs UK" />
          <p>Product details, shopping and OpenLab remain distinct—and connected through clear routes.</p>
        </div>
        <div>
          <h3>Shop</h3>
          <a href="/shop">Catalogue</a>
          <a href="/product/mk-2866">MK-2866</a>
          <a href="/reviews">Review states</a>
        </div>
        <div>
          <h3>OpenLab</h3>
          <a href="/open-lab">Portal</a>
          <a href="/open-lab/records">Lab Records</a>
          <a href="/open-lab/methodology">Methodology</a>
          <a href="/open-lab/source-chain">Source chain</a>
        </div>
        <div>
          <h3>About</h3>
          <a href="/about">Olympus Labs UK</a>
          <a href="/about/evidence-os">EvidenceOS</a>
          <span>Contact · route pending</span>
          <span>Privacy · route pending</span>
        </div>
      </div>
      <div className="shell footer-base">
        <span>Olympus Labs UK · Experience Lab</span>
        <span>Light design lane · Private review build</span>
      </div>
    </footer>
  );
}

function EvidenceStatus({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "evidence-status compact" : "evidence-status"}>
      <img src="/assets/evidence/openlab-atom.svg" alt="" />
      <span>OPENLAB VERIFIED</span>
      <em>DEMO STATE</em>
    </div>
  );
}

function MetricRail({ className = "" }: { className?: string }) {
  return (
    <dl className={`metric-rail ${className}`}>
      <div>
        <dt>{mk2866.strength}</dt>
        <dd>STRENGTH</dd>
      </div>
      <div>
        <dt>{mk2866.servings}</dt>
        <dd>QUANTITY</dd>
      </div>
      <div>
        <dt>{mk2866.purity}</dt>
        <dd>PURITY</dd>
      </div>
    </dl>
  );
}

function DemoState() {
  return <span className="demo-state">DEMO STATE</span>;
}

function InventoryState() {
  return (
    <div className="inventory-state">
      <span className="inventory-dot" aria-hidden="true" />
      <strong>IN STOCK</strong>
      <DemoState />
    </div>
  );
}

function QualitativeGrid() {
  const items = [
    ["CLASS", "SARM"],
    ["FORM", "CAPSULES"],
    ["QUALITY", "SOURCE-BOUND"],
    ["TESTED", "NOT CONNECTED"],
  ];
  return (
    <dl className="qualitative-grid">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProductCard({ label = "GOVERNED PRODUCT" }: { label?: string }) {
  return (
    <article className="product-card">
      <div className="product-media-chamber">
        <span className="specimen-label">{label}</span>
        <img src="/assets/products/mk-2866/front.png" alt="MK-2866 Ostarine bottle" />
      </div>
      <div className="product-purchase-plane">
        <div className="product-card-heading">
          <div>
            <span className="series-chip">{mk2866.series}</span>
            <h3>{mk2866.name}</h3>
            <p>{mk2866.alias}</p>
          </div>
          <div className="product-card-states">
            <InventoryState />
            <EvidenceStatus compact />
          </div>
        </div>
        <MetricRail />
        <QualitativeGrid />
        <div className="price-row">
          <strong>{mk2866.price}</strong>
          <span>SKU {mk2866.sku}</span>
        </div>
        <a className="button full" href="/product/mk-2866">
          View product <Arrow />
        </a>
        <a className="button button-secondary full" href="/open-lab/dossier/mk-2866">
          View Lab Record <Arrow />
        </a>
      </div>
    </article>
  );
}

function CatalogueSlot({ index }: { index: string }) {
  return (
    <article className="catalogue-slot">
      <span className="slot-index">{index}</span>
      <div className="slot-orbit" aria-hidden="true" />
      <div>
        <span className="eyebrow">CATALOGUE SOURCE PENDING</span>
        <h3>Product slot</h3>
        <p>Reserved for a governed catalogue product and approved render.</p>
      </div>
      <span className="source-bound">SOURCE-BOUND</span>
    </article>
  );
}

function DecisionSurface() {
  return (
    <div className="decision-surface">
      <div className="decision-heading">
        <div>
          <span className="eyebrow">FEATURED PRODUCT</span>
          <h2>{mk2866.name}</h2>
          <p>{mk2866.alias}</p>
        </div>
        <div className="decision-states">
          <InventoryState />
          <EvidenceStatus compact />
        </div>
      </div>
      <MetricRail className="decision-metrics" />
      <QualitativeGrid />
      <div className="decision-commerce-row">
        <div>
          <span>PRICE</span>
          <strong>{mk2866.price}</strong>
        </div>
        <div className="decision-actions">
          <a className="button button-secondary" href="/product/mk-2866">View product</a>
          <button className="button" type="button" disabled>Add to bag · demo state</button>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="home-hero section-shell">
        <div className="shell home-hero-grid">
          <div className="hero-copy-column">
            <div className="hero-editorial">
              <span className="eyebrow">COMMERCE + SOURCE CONTEXT</span>
              <h1>Explore the Olympus Labs UK range.</h1>
              <p>Browse product details and open available lab records from one clear starting point.</p>
              <div className="button-row">
                <ActionLink href="/shop">Shop the range</ActionLink>
                <ActionLink href="/open-lab/records" secondary>Browse Lab Records</ActionLink>
              </div>
            </div>
            <DecisionSurface />
          </div>
          <div className="hero-media-field">
            <div className="bottle-echo bottle-echo-left">
              <img src="/assets/products/mk-2866/front.png" alt="" />
            </div>
            <img className="hero-bottle" src="/assets/products/mk-2866/front.png" alt="MK-2866 Ostarine bottle" />
            <div className="bottle-echo bottle-echo-right">
              <img src="/assets/products/mk-2866/front.png" alt="" />
            </div>
            <div className="media-plinth" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow">CATEGORY NAVIGATION</span>
            <h2>Choose a clear starting point.</h2>
          </div>
          <p>Product categories remain source-bound; the current experience exposes only governed destinations.</p>
        </div>
        <div className="category-grid">
          <a className="category-card primary" href="/shop">
            <span>01</span><strong>SARM SERIES</strong><p>Browse the governed product family.</p><Arrow />
          </a>
          <a className="category-card" href="/product/mk-2866">
            <span>02</span><strong>PRODUCT DETAILS</strong><p>Review governed product truth and purchase details.</p><Arrow />
          </a>
          <a className="category-card" href="/open-lab/records">
            <span>03</span><strong>LAB RECORDS</strong><p>Navigate available source-owned records.</p><Arrow />
          </a>
          <a className="category-card" href="/open-lab/methodology">
            <span>04</span><strong>METHODOLOGY</strong><p>Understand source states and field language.</p><Arrow />
          </a>
        </div>
      </section>

      <section className="section section-tint">
        <div className="shell">
          <div className="section-heading">
            <span className="eyebrow">PRODUCT CATALOGUE</span>
            <h2>A clear product-card hierarchy.</h2>
            <p>The governed MK-2866 product is shown beside honest source-bound catalogue slots.</p>
          </div>
          <div className="product-grid">
            <ProductCard />
            <CatalogueSlot index="02" />
            <CatalogueSlot index="03" />
          </div>
        </div>
      </section>

      <OpenLabEvidenceBand />
      <ReviewsFixture compact />
      <RelatedProduct />
    </>
  );
}

function OpenLabEvidenceBand() {
  return (
    <section className="section shell evidence-band-section">
      <div className="evidence-band">
        <div className="evidence-editorial">
          <span className="eyebrow">OPENLAB</span>
          <h2>Product records and source context.</h2>
          <p>Browse available records, testing methodology and source links without reconstructing source documents.</p>
          <ActionLink href="/open-lab">Enter OpenLab</ActionLink>
        </div>
        <div className="evidence-ledger">
          {[
            ["01", "PRODUCT", "Governed product identity"],
            ["02", "BATCH", "Source-bound batch context"],
            ["03", "LAB", "Source attribution when supplied"],
            ["04", "REPORT", "Original document or action"],
            ["05", "PUBLIC LEDGER", "Customer-facing navigation state"],
            ["06", "CONTEXT", "No reconstructed analytical values"],
          ].map(([index, title, copy]) => (
            <div key={index}>
              <span>{index}</span>
              <strong>{title}</strong>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsFixture({ compact = false }: { compact?: boolean }) {
  const cards = [
    ["SAMPLE REVIEW A", "Example rating: 5/5", "Short review copy slot for layout testing."],
    ["SAMPLE REVIEW B", "Example rating: 4/5", "Longer sample copy demonstrates a two-line review treatment without representing customer testimony."],
    ["SAMPLE REVIEW C", "Example rating: —", "Moderation and unavailable-copy treatment for the rendered state."],
  ];

  return (
    <section className={compact ? "section section-tint reviews-section" : "section reviews-section"} id="reviews">
      <div className="shell">
        <div className="review-fixture-banner">
          <strong>RENDERED DESIGN FIXTURE</strong>
          <span>NOT CUSTOMER DATA</span>
        </div>
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow">REVIEWS</span>
            <h2>A complete review surface—without invented customers.</h2>
          </div>
          <dl className="review-summary">
            <div><dt>Rating summary</dt><dd>—</dd></div>
            <div><dt>Review count</dt><dd>No live count</dd></div>
          </dl>
        </div>
        <div className="review-grid">
          {cards.map(([title, rating, copy]) => (
            <article className="review-card" key={title}>
              <span className="demo-state">DESIGN FIXTURE</span>
              <h3>{title}</h3>
              <strong>{rating}</strong>
              <p>{copy}</p>
              <dl>
                <div><dt>Reviewer</dt><dd>Sample reviewer</dd></div>
                <div><dt>Date</dt><dd>Date slot</dd></div>
                <div><dt>Purchase</dt><dd>Purchase status slot</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <div className="review-state-grid">
          <div><span>EMPTY</span><strong>Review data is not connected in this design preview.</strong></div>
          <div><span>LOADING</span><strong>Review surface loading treatment.</strong></div>
          <div><span>UNAVAILABLE</span><strong>Review source unavailable treatment.</strong></div>
        </div>
      </div>
    </section>
  );
}

function RelatedProduct() {
  return (
    <section className="section related-section">
      <div className="shell">
        <div className="section-heading">
          <span className="eyebrow">RELATED PRODUCT · DESIGN FIXTURE</span>
          <h2>A full-width horizontal commerce relationship.</h2>
        </div>
        <article className="related-card">
          <div className="related-media">
            <span className="demo-state">UNPROMOTED RENDER · DESIGN FIXTURE</span>
            <img src="/assets/products/rad-140/front-design-fixture.png" alt="RAD-140 Testolone design fixture bottle" />
          </div>
          <div className="related-purchase">
            <span className="eyebrow">RELATED PRODUCT</span>
            <h3>RAD-140</h3>
            <p>Testolone</p>
            <dl className="metric-rail related-metrics">
              <div><dt>8 MG</dt><dd>STRENGTH</dd></div>
              <div><dt>60 SERVINGS</dt><dd>QUANTITY</dd></div>
              <div><dt>&gt;99%</dt><dd>PURITY</dd></div>
            </dl>
            <div className="related-note"><DemoState /><span>Catalogue and availability are not connected.</span></div>
            <div className="price-row"><strong>£46</strong><span>DESIGN FIXTURE</span></div>
            <div className="button-row">
              <button className="button" type="button" disabled>Add to bag · demo state</button>
              <a className="button button-secondary" href="/open-lab">Explore OpenLab</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="CATALOGUE"
        title="Shop the range."
        copy="A responsive catalogue shell that keeps product truth, source context and purchase actions distinct."
      />
      <section className="section shell catalogue-layout">
        <aside className="filter-panel">
          <span className="eyebrow">FILTERS · DESIGN STATE</span>
          <h2>Refine products</h2>
          <label><input type="checkbox" defaultChecked /> SARM SERIES</label>
          <label><input type="checkbox" /> Record available</label>
          <label><input type="checkbox" /> Reviews connected</label>
          <div className="filter-note">Only SARM SERIES is governed in this preview.</div>
        </aside>
        <div>
          <div className="catalogue-toolbar">
            <div><strong>Product catalogue</strong><span>1 governed product · 2 source-bound slots</span></div>
            <button type="button" disabled>Sort · Default · demo state</button>
          </div>
          <div className="product-grid shop-grid">
            <ProductCard label="CATALOGUE" />
            <CatalogueSlot index="02" />
            <CatalogueSlot index="03" />
          </div>
        </div>
      </section>
    </>
  );
}

function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <section className="page-hero section-shell">
      <div className="shell">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}

function ProductPage() {
  return (
    <>
      <section className="pdp-hero section-shell">
        <div className="shell pdp-hero-grid">
          <div className="pdp-media-field">
            <span className="eyebrow">{mk2866.series}</span>
            <img src="/assets/products/mk-2866/front.png" alt="MK-2866 Ostarine bottle" />
            <div className="pdp-media-controls" aria-label="Product media views">
              <span aria-current="true">Front</span><span>Label</span><span>Details</span>
            </div>
          </div>
          <aside className="purchase-panel">
            <div className="purchase-heading">
              <span className="series-chip">{mk2866.series}</span>
              <InventoryState />
            </div>
            <h1>{mk2866.name}</h1>
            <p>{mk2866.alias}</p>
            <EvidenceStatus />
            <MetricRail />
            <QualitativeGrid />
            <div className="price-row"><strong>{mk2866.price}</strong><span>SKU {mk2866.sku}</span></div>
            <button className="button full" type="button" disabled>Add to bag · demo state</button>
            <a className="button button-secondary full" href="/open-lab/dossier/mk-2866">View Lab Record <Arrow /></a>
          </aside>
        </div>
      </section>

      <section className="assurance-section section shell">
        <div className="section-heading"><span className="eyebrow">PRODUCT ASSURANCE</span><h2>Clear boundaries before evidence.</h2></div>
        <div className="assurance-grid">
          <div><span>01</span><strong>Product truth</strong><p>Commercial label details remain separate from analytical records.</p></div>
          <div><span>02</span><strong>Source context</strong><p>OpenLab exposes source actions without recreating their content.</p></div>
          <div><span>03</span><strong>Review state</strong><p>Review fixtures are visibly separated from customer data.</p></div>
        </div>
      </section>

      <ProductDossier />

      <section className="section shell lab-record-preview">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">LAB RECORDS</span><h2>Source context follows the dossier.</h2></div>
          <ActionLink href="/open-lab/records" secondary>Browse records</ActionLink>
        </div>
        <SourceBoundLedger />
      </section>

      <ReviewsFixture />
      <RelatedProduct />
    </>
  );
}

function ProductDossier() {
  return (
    <section className="section section-tint dossier-section">
      <div className="shell">
        <div className="section-heading dossier-heading">
          <span className="eyebrow">PRODUCT DOSSIER</span>
          <h2>Product facts, physical identity and source-bound composition.</h2>
          <p>Product, facts and composition are visible reference states in this design pass.</p>
        </div>
        <div className="dossier-grid">
          <article className="dossier-data-card">
            <div className="dossier-card-header"><span>01</span><h3>Product facts</h3></div>
            <dl>
              <div><dt>Compound</dt><dd>{mk2866.name}</dd></div>
              <div><dt>Alias</dt><dd>{mk2866.alias}</dd></div>
              <div><dt>Strength</dt><dd>{mk2866.strength}</dd></div>
              <div><dt>Quantity</dt><dd>{mk2866.servings}</dd></div>
              <div><dt>SKU</dt><dd>{mk2866.sku}</dd></div>
            </dl>
          </article>
          <article className="dossier-media-card">
            <div className="dossier-card-header"><span>02</span><h3>Physical product</h3></div>
            <img src="/assets/products/mk-2866/front.png" alt="MK-2866 Ostarine bottle" />
            <div><span>{mk2866.series}</span><strong>{mk2866.name}</strong><p>{mk2866.alias}</p></div>
            <MetricRail />
          </article>
          <article className="dossier-data-card composition-card">
            <div className="dossier-card-header"><span>03</span><h3>Composition</h3></div>
            <span className="source-bound">SOURCE-BOUND</span>
            <p>Composition details will appear when connected to the governed product record.</p>
            <dl>
              <div><dt>Record</dt><dd>Not connected</dd></div>
              <div><dt>Batch</dt><dd>Not connected</dd></div>
              <div><dt>Laboratory</dt><dd>Not connected</dd></div>
              <div><dt>Assay</dt><dd>Not supplied</dd></div>
            </dl>
          </article>
        </div>
        <div className="dossier-tabs" aria-label="Dossier reference tabs">
          <span aria-current="true">01 · Product</span><span>02 · Facts</span><span>03 · Composition</span>
        </div>
      </div>
    </section>
  );
}

function OpenLabNav({ active }: { active: RouteKey }) {
  const links: Array<[RouteKey, string, string]> = [
    ["openlab", "Overview", "/open-lab"],
    ["records", "Records", "/open-lab/records"],
    ["lookup", "Batch Lookup", "/open-lab/batch-lookup"],
    ["methodology", "Methodology", "/open-lab/methodology"],
    ["source-chain", "Source Chain", "/open-lab/source-chain"],
    ["compare", "Compare", "/open-lab/compare"],
  ];
  return (
    <nav className="openlab-nav" aria-label="OpenLab navigation">
      <div className="shell openlab-nav-inner">
        <a className="openlab-brand" href="/open-lab"><img src="/assets/evidence/openlab-atom.svg" alt="" /> OpenLab</a>
        <div>
          {links.map(([key, label, href]) => <a key={key} aria-current={active === key ? "page" : undefined} href={href}>{label}</a>)}
        </div>
      </div>
    </nav>
  );
}

function OpenLabPage() {
  return (
    <>
      <OpenLabNav active="openlab" />
      <section className="openlab-hero section-shell">
        <div className="shell openlab-hero-grid">
          <div>
            <span className="eyebrow">OPENLAB</span>
            <h1>Product records, source context and testing methodology.</h1>
            <p>Browse available product records and follow source actions without reconstructing source documents.</p>
            <div className="button-row"><ActionLink href="/open-lab/records">Browse Lab Records</ActionLink><ActionLink href="/open-lab/methodology" secondary>View methodology</ActionLink></div>
          </div>
          <article className="featured-dossier-card">
            <span className="source-bound">FEATURED GOVERNED PRODUCT</span>
            <div>
              <img src="/assets/products/mk-2866/front.png" alt="MK-2866 Ostarine bottle" />
              <div><span>{mk2866.series}</span><h2>{mk2866.name}</h2><p>{mk2866.alias}</p><MetricRail /></div>
            </div>
            <a href="/open-lab/dossier/mk-2866">Open product dossier <Arrow /></a>
          </article>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading"><span className="eyebrow">PORTAL WAYFINDING</span><h2>One route for each evidence task.</h2></div>
        <div className="wayfinding-grid">
          {openLabRoutes.map((item) => (
            <a href={item.href} className="wayfinding-card" key={item.index}>
              <span>{item.index}</span><h3>{item.title}</h3><p>{item.copy}</p><Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <div className="shell portal-record-grid">
          <div className="portal-record-editorial">
            <span className="eyebrow">FIND A RECORD</span><h2>Search by product or record ID.</h2>
            <label className="search-field"><span className="sr-only">Search product or record ID</span><input type="search" placeholder="Search product or record ID" /></label>
            <p>Search is a visual interaction in this private preview. Source results are not connected.</p>
          </div>
          <SourceBoundLedger />
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading"><span className="eyebrow">PUBLIC EVIDENCE CHAIN</span><h2>Follow the record without recreating it.</h2></div>
        <EvidenceChain />
      </section>

      <section className="section section-tint">
        <div className="shell">
          <div className="section-heading"><span className="eyebrow">SOURCE POSTURE</span><h2>States describe access and context—not scientific results.</h2></div>
          <div className="source-state-grid">
            {sourceStates.map(([state, copy]) => <div key={state}><span>{state}</span><p>{copy}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section shell commerce-return">
        <div><span className="eyebrow">RETURN TO COMMERCE</span><h2>Product details remain one clear route away.</h2><p>OpenLab does not own catalogue, inventory or payment state.</p></div>
        <ActionLink href="/shop">Shop products</ActionLink>
      </section>
    </>
  );
}

function SourceBoundLedger() {
  return (
    <div className="source-ledger" role="region" aria-label="Source-bound lab record preview">
      <div className="ledger-header"><span>PRODUCT</span><span>RECORD</span><span>STATUS</span><span>SOURCE</span><span>ACTION</span></div>
      <div className="ledger-row">
        <div><strong>{mk2866.name}</strong><span>{mk2866.alias}</span></div>
        <strong>SOURCE-BOUND</strong>
        <span className="state-chip">CONTEXT REQUIRED</span>
        <span>Not connected in preview</span>
        <span className="disabled-action" aria-disabled="true">Open report page</span>
      </div>
      <div className="ledger-footer">
        <span>Rendered source-bound state</span>
        <div className="ledger-footer-actions">
          <a href="/open-lab/records/source-bound-record">View record design <Arrow /></a>
          <a href="/open-lab/records">Browse archive <Arrow /></a>
        </div>
      </div>
    </div>
  );
}

function EvidenceChain() {
  return (
    <ol className="evidence-chain">
      {[
        ["01", "Product", "Governed catalogue identity"],
        ["02", "Batch", "Source-bound production context"],
        ["03", "Lab", "Attribution when source supplied"],
        ["04", "Report", "Original document state"],
        ["05", "Public ledger", "Customer navigation layer"],
      ].map(([index, title, copy]) => <li key={index}><span>{index}</span><strong>{title}</strong><p>{copy}</p></li>)}
    </ol>
  );
}

function RecordsPage() {
  return (
    <>
      <OpenLabNav active="records" />
      <section className="records-page section-shell">
        <div className="shell records-surface">
          <div className="records-intro">
            <span className="eyebrow">LAB RECORDS</span><h1>Search and filter available product records.</h1>
            <p>This preview renders the archive structure without invented report, laboratory, batch or result values.</p>
            <label className="search-field"><span className="sr-only">Search records</span><input type="search" placeholder="Search product or record ID" /></label>
            <a href="/open-lab/methodology">View testing methodology <Arrow /></a>
          </div>
          <div className="records-ledger-area">
            <div className="filter-chips" aria-label="Record state filters">
              {sourceStates.slice(0, 4).map(([state]) => <button type="button" disabled key={state}>{state}</button>)}
            </div>
            <SourceBoundLedger />
            <div className="record-state-specimens">
              <div><span>EMPTY</span><p>No record matches the current filter.</p></div>
              <div><span>LOADING</span><p>Record source is being resolved.</p></div>
              <div><span>UNAVAILABLE</span><p>Source action is not available in this preview.</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RecordPage() {
  return (
    <>
      <OpenLabNav active="records" />
      <section className="record-page section-shell">
        <div className="shell breadcrumb"><a href="/">Home</a><span aria-hidden="true">›</span><a href="/open-lab">OpenLab</a><span aria-hidden="true">›</span><a href="/open-lab/records">Lab Records</a><span aria-hidden="true">›</span><strong aria-current="page">Source-bound record</strong></div>
        <div className="shell record-hero">
          <div className="record-identity">
            <span className="eyebrow">OPENLAB · LAB RECORD</span>
            <span className="state-chip">CONTEXT REQUIRED · DESIGN FIXTURE</span>
            <h1>MK-2866 record</h1>
            <p>Independent source context will appear when a governed record is connected.</p>
            <div className="record-id"><span>LAB RECORD</span><strong>SOURCE-BOUND</strong></div>
          </div>
          <div className="record-media"><img src="/assets/products/mk-2866/front.png" alt="MK-2866 Ostarine bottle" /></div>
        </div>
        <dl className="shell record-fact-rail">
          <div><dt>Record</dt><dd>SOURCE-BOUND</dd></div>
          <div><dt>Batch</dt><dd>Not connected</dd></div>
          <div><dt>Laboratory</dt><dd>Not connected</dd></div>
          <div><dt>Tested</dt><dd>Not supplied</dd></div>
          <div><dt>Result</dt><dd>Context required</dd></div>
        </dl>
      </section>

      <section className="section shell record-content-grid">
        <div className="record-main-column">
          <div className="numbered-heading"><span>01</span><div><span className="eyebrow">COMMERCIAL LABEL CONTEXT</span><h2>Product label and source boundary</h2></div></div>
          <div className="analyte-table">
            <div><span>PRODUCT</span><span>PRODUCT LABEL</span><span>ASSAY</span><span>SOURCE</span></div>
            <div><strong>{mk2866.name}</strong><strong>{mk2866.purity} · LABEL ONLY</strong><span>Not connected</span><span>SOURCE-BOUND</span></div>
          </div>

          <div className="numbered-heading"><span>02</span><div><span className="eyebrow">PUBLIC ANALYTICAL DATA</span><h2>Source viewer</h2></div></div>
          <div className="source-viewer-slot">
            <span className="source-bound">RAW VIEWER LINK ONLY</span>
            <h3>No analytical chart is reconstructed in this preview.</h3>
            <p>When connected, this surface opens the governed source or report document.</p>
          </div>

          <div className="numbered-heading"><span>03</span><div><span className="eyebrow">LABORATORY METHODS</span><h2>Methods</h2></div></div>
          <div className="method-list"><div>Method · Not supplied</div><div>Comparator · Not supplied</div></div>
        </div>
        <aside className="record-action-rail">
          <span className="eyebrow">RECORD ACTIONS</span>
          <h3>Source document</h3>
          <p>The public source is not connected in this design preview.</p>
          <span className="disabled-action" aria-disabled="true">Open source</span>
          <span className="disabled-action" aria-disabled="true">Open report page</span>
          <a href="/open-lab/methodology">View testing methodology <Arrow /></a>
          <a href="/open-lab/records">Return to Lab Records <Arrow /></a>
        </aside>
      </section>
    </>
  );
}

function DossierPage() {
  return (
    <>
      <OpenLabNav active="openlab" />
      <PageHero eyebrow="OPENLAB DOSSIER" title="MK-2866 product dossier." copy="A product-to-record bridge that keeps governed commerce truth separate from source-owned evidence." />
      <ProductDossier />
      <section className="section shell"><div className="section-heading"><span className="eyebrow">RECORD ACCESS</span><h2>Source state remains explicit.</h2></div><SourceBoundLedger /></section>
    </>
  );
}

function LookupPage() {
  return (
    <>
      <OpenLabNav active="lookup" />
      <PageHero eyebrow="BATCH LOOKUP" title="Resolve a batch or product reference." copy="Lookup is a route to source context; it does not create a record when none is supplied." />
      <section className="section shell lookup-grid">
        <div className="lookup-form-card"><span className="eyebrow">SEARCH</span><h2>Find record context</h2><label className="search-field"><span className="sr-only">Batch, product or record ID</span><input type="search" placeholder="Batch, product or record ID" /></label><button className="button" type="button" disabled>Search preview · demo state</button></div>
        <div className="lookup-states"><h2>Required states</h2>{["Initial", "Loading", "Exact result", "Multiple matches", "No result", "Context required", "Error"].map((state) => <div key={state}><span>{state}</span><p>Source-safe {state.toLowerCase()} treatment.</p></div>)}</div>
      </section>
    </>
  );
}

function MethodologyPage() {
  const methods = [
    ["01", "Identity", "How a source names the reported compound or analyte."],
    ["02", "Result context", "How comparators and source language remain intact."],
    ["03", "Concentration", "How measured values stay separate from commercial label truth."],
    ["04", "Custody", "How product, batch, lab, report and public record relate."],
  ];
  return (
    <>
      <OpenLabNav active="methodology" />
      <PageHero eyebrow="METHODOLOGY" title="How OpenLab presents source-owned evidence." copy="OpenLab explains fields and source actions. It does not certify, reconstruct or reinterpret a laboratory document." />
      <section className="section shell"><div className="methodology-grid">{methods.map(([index, title, copy]) => <article key={index}><span>{index}</span><h2>{title}</h2><p>{copy}</p></article>)}</div><div className="policy-band"><span className="eyebrow">RESULT LANGUAGE POLICY</span><h2>Missing is not failure. Ready is not purity proof.</h2><p>Unavailable fields render as “Not supplied” or “Context required”—never zero, pass, fail or a reconstructed chart.</p></div></section>
    </>
  );
}

function SourceChainPage() {
  return (
    <>
      <OpenLabNav active="source-chain" />
      <PageHero eyebrow="SOURCE CHAIN" title="Trace each field to its owner." copy="Source disclosures show where product, batch, laboratory and report context originate." />
      <section className="section shell"><EvidenceChain /><div className="source-disclosure-grid">{["Product identity", "Batch context", "Laboratory attribution", "Report document", "Public record action", "Missing source"].map((title, index) => <details key={title}><summary><span>0{index + 1}</span>{title}</summary><p>Source fields are not connected in this design preview. The final route will disclose the originating record without recreating it.</p></details>)}</div></section>
    </>
  );
}

function ComparePage() {
  return (
    <>
      <OpenLabNav active="compare" />
      <PageHero eyebrow="COMPARE RECORDS" title="Compare only what sources have in common." copy="Select up to four compatible records. Missing fields remain visibly not supplied." />
      <section className="section shell compare-layout">
        <div className="compare-selector">{["Record slot 01", "Record slot 02", "Record slot 03", "Record slot 04"].map((slot, index) => <button type="button" disabled key={slot}><span>0{index + 1}</span><strong>{slot}</strong><small>Source not connected</small></button>)}</div>
        <div className="compare-empty"><span className="source-bound">ZERO SELECTED</span><h2>Select records to reveal the comparison matrix.</h2><p>Multi-analyte records remain one record. Incompatible or missing fields are never flattened into false equivalence.</p></div>
      </section>
    </>
  );
}

function EvidenceOsPage() {
  return (
    <>
      <PageHero eyebrow="EVIDENCEOS" title="The relationship system behind OpenLab." copy="A public explanation of ownership, route state and source actions—not an analytical authority or internal dashboard." />
      <section className="section shell evidence-os-layout">
        <div className="section-heading"><span className="eyebrow">RELATIONSHIP MAP</span><h2>Product → Batch → Lab → Report → Public Ledger</h2></div>
        <EvidenceChain />
        <div className="evidence-os-grid">
          <article><span>01</span><h3>Catalogue authority</h3><p>Product identity, labels and purchase state belong to the commerce catalogue.</p></article>
          <article><span>02</span><h3>Source authority</h3><p>Documents, methods and reported values remain owned by their source records.</p></article>
          <article><span>03</span><h3>OpenLab navigation</h3><p>OpenLab connects the customer to source state and source actions.</p></article>
          <article><span>04</span><h3>Runtime boundary</h3><p>Public route rendering does not grant evidence or payment authority.</p></article>
        </div>
        <div className="section-heading"><span className="eyebrow">STATE REGISTER</span><h2>Progressive disclosure instead of one endless table.</h2></div>
        <div className="source-state-grid">{sourceStates.map(([state, copy]) => <div key={state}><span>{state}</span><p>{copy}</p></div>)}</div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="ABOUT" title="A clearer relationship between product, proof and purchase." copy="The Olympus Labs UK experience is being rebuilt around governed product truth, bounded source context and a calm, luminous commerce system." />
      <section className="section shell about-grid">
        <article><span>01</span><h2>Product first</h2><p>Product identity, metrics and purchase actions remain legible and direct.</p></article>
        <article><span>02</span><h2>Evidence connected</h2><p>OpenLab provides routes and source context without inventing analytical truth.</p></article>
        <article><span>03</span><h2>Boundaries visible</h2><p>Design fixtures, source-bound fields and runtime authority are explicitly distinguished.</p></article>
      </section>
    </>
  );
}

function ReviewsPage() {
  return <><PageHero eyebrow="REVIEW SURFACE" title="Rendered review states for design approval." copy="Every card on this page is an explicit layout fixture, not customer testimony." /><ReviewsFixture /></>;
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
    default: content = <HomePage />;
  }

  return (
    <div className="experience-lab">
      <FixtureNotice />
      <SiteHeader route={route} />
      <main id="main-content">{content}</main>
      <SiteFooter />
    </div>
  );
}
