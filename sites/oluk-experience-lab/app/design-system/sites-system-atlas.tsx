import inventory from "../../../../authority/generated/OLUK-SURFACE-INVENTORY-V1.json";
import presentation from "../../../../authority/generated/OLUK-PRESENTATION-SYSTEM-V2.json";
import routeAuthority from "../../../../authority/generated/OLUK-ROUTE-PRESENTATION-AUTHORITY-V1.json";
import { PdpFirstFold } from "./pdp-first-fold";
import { mk2866Fixture } from "./product-fixtures";
import styles from "./sites-system-atlas.module.css";

const taxonomy = [
  "Authority & Run Control", "Brand Overview & Logo", "Token & Theme Specimens", "Color System",
  "Typography", "Spacing + Radius", "Elevation + Effects", "Iconography", "Navigation + Shell",
  "Component Library", "Cards + Rails", "Commerce Patterns", "Data Display", "Responsive Matrix",
  "Motion + Interaction", "Do + Don't", "Handoff Spec", "PDP", "OpenLab", "Mobile", "Checkout",
  "All Grammar", "System Board", "Proof Boards", "Sandbox & Playground", "Changelog & Version History",
] as const;

const entitiesByKind = inventory.counts.byKind as Record<string, number>;

export function SitesSystemAtlas() {
  return (
    <main className={styles.atlas} data-owner-only="true" id="main-content">
      <header className={styles.hero}>
        <span>OWNER TOOLING · PRESENTATION INVENTORY</span>
        <h1>OLUK System Atlas</h1>
        <p>One generated surface graph connects the 74 Native Next route definitions to templates, slots, modules, components, primitives, tokens, fields, states, sources, and receipts.</p>
        <div className={styles.digestRow}>
          <code>inventory {inventory.contentHash.slice(0, 12)}</code>
          <code>presentation {presentation.contentHash.slice(0, 12)}</code>
          <code>routes {routeAuthority.contentHash.slice(0, 12)}</code>
        </div>
      </header>

      <section className={styles.summary} aria-label="Inventory totals">
        <article><strong>{inventory.counts.routeDefinitions}</strong><span>route definitions</span></article>
        <article><strong>{inventory.counts.productRouteInstances}</strong><span>product instances</span></article>
        <article><strong>{inventory.counts.entities}</strong><span>surface entities</span></article>
        <article><strong>{presentation.responsiveViewports.length}</strong><span>review widths</span></article>
      </section>

      <section className={styles.section}>
        <header><span>00–25</span><h2>Inventory navigation</h2><p>The screenshot taxonomy becomes generated navigation, not a competing authority hierarchy.</p></header>
        <ol className={styles.taxonomy}>{taxonomy.map((label, index) => <li key={label}><b>{String(index).padStart(2, "0")}</b><span>{label}</span></li>)}</ol>
      </section>

      <section className={styles.section}>
        <header><span>SURFACE GRAPH</span><h2>Every visible concern is countable.</h2><p>Authority, containment, integration, lifecycle, and exposure remain independent dimensions.</p></header>
        <div className={styles.kindGrid}>{Object.entries(entitiesByKind).map(([kind, count]) => <article key={kind}><strong>{count}</strong><span>{kind.replaceAll("_", " ")}</span></article>)}</div>
      </section>

      <section className={styles.section}>
        <header><span>PDP VERTICAL SLICE</span><h2>Full media chamber and purchase panel.</h2><p>The fixture demonstrates anatomy only. Native Next supplies product, commerce, quantity, and REPORTED evidence through named adapters.</p></header>
        <div className={styles.pdpPreview}><PdpFirstFold product={mk2866Fixture}/></div>
        <a className={styles.reviewLink} href="/review-studio?family=product_detail">Review the PDP contract →</a>
      </section>

      <section className={styles.section}>
        <header><span>ROUTE AUTHORITY</span><h2>Complete 74-route staging map.</h2><p>Dynamic instances remain separate from route definitions. Bundle Builder is canonical route 74.</p></header>
        <ol className={styles.routeGrid}>{routeAuthority.routes.map((route, index) => <li key={route.routeId}><b>{String(index + 1).padStart(2, "0")}</b><code>{route.path}</code><span>{route.family.replaceAll("_", " ")}</span><small>{route.templateId.replace("template.", "")}</small></li>)}</ol>
      </section>
    </main>
  );
}
