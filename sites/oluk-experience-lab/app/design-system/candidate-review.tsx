import type { ReactNode } from "react";
import {
  candidateContract,
  figmaReviewLinks,
  mk2866Specimen,
} from "./contracts";
import {
  AssuranceRail,
  CompactCard,
  EvidenceStatus,
  InventoryStatus,
  ProductCommerceCard,
  PurchasePanel,
  RelationCard,
  compactStates,
  purchasePanelStates,
} from "./candidate-components";
import { OlukCanvas, OlukSection } from "./candidate-primitives";

const baselineRoutes = [
  ["Homepage", "/", "614:75994"],
  ["Shop", "/shop", "626:8099"],
  ["MK-2866 PDP", "/product/mk-2866", "626:8664"],
  ["Reviews", "/reviews", "614:75950"],
  ["About", "/about", "614:75952"],
  ["EvidenceOS", "/about/evidence-os", "626:11285"],
  ["OpenLab portal", "/open-lab", "626:11754"],
  ["Lab Records", "/open-lab/records", "626:10899"],
  ["Individual record", "/open-lab/records/source-bound-record", "626:11285"],
  ["MK-2866 dossier", "/open-lab/dossier/mk-2866", "551:27148"],
  ["Batch lookup", "/open-lab/batch-lookup", "626:10899"],
  ["Methodology", "/open-lab/methodology", "457:4661"],
  ["Source chain", "/open-lab/source-chain", "626:11285"],
  ["Compare", "/open-lab/compare", "564:64871"],
] as const;

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function FigmaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="oluk-candidate-source-link" href={href} target="_blank" rel="noreferrer">
      {children} <Arrow />
    </a>
  );
}

function ReviewHeading({
  eyebrow,
  title,
  copy,
  source,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  source: string;
}) {
  return (
    <header className="oluk-candidate-section-heading">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <FigmaLink href={source}>Open exact Figma candidate</FigmaLink>
    </header>
  );
}

function FoundationSpecimen() {
  const swatches = [
    ["Canvas", "#f7f8fc", "canvas"],
    ["Card", "#ffffff", "card"],
    ["Media", "#f0f4fb", "media"],
    ["Cobalt", "#0057ff", "cobalt"],
    ["Inventory", "#15803d", "inventory"],
    ["Inverse", "#141827", "inverse"],
  ];
  return (
    <OlukSection className="oluk-candidate-section" id="foundation">
      <ReviewHeading eyebrow="FC-01 · CANDIDATE FOUNDATION" title="One material grammar before route assembly." copy="Local variables, semantic wrappers and the exact Softform Arc recipe are review candidates only. They are hidden from publishing and have no runtime authority." source={figmaReviewLinks.foundation} />
      <div className="oluk-candidate-foundation-grid">
        <article><h3>Colour lineage</h3><div className="oluk-candidate-swatches">{swatches.map(([name, value, token]) => <div key={name}><i data-swatch={token} /><strong>{name}</strong><span>{value}</span></div>)}</div></article>
        <article><h3>Shape hierarchy</h3><div className="oluk-candidate-radius-row"><span data-radius="compact">20</span><span data-radius="vertical">24</span><span data-radius="purchase">28</span><span data-radius="horizontal">34</span></div><p>Compact / Vertical / Purchase / Horizontal</p></article>
        <article><h3>Elevation</h3><div className="oluk-candidate-shadow-sample">Softform Arc</div><p>Two restrained layers; no generic shadow-md or decorative cobalt perimeter.</p></article>
        <article><h3>Typography</h3><strong className="oluk-candidate-display-sample">Plus Jakarta Sans</strong><p>Inter supports body, navigation, labels, metrics and controls. Metadata floor 12px; body floor 15px.</p></article>
      </div>
    </OlukSection>
  );
}

function ProvenanceGate() {
  return (
    <OlukSection className="oluk-candidate-section oluk-candidate-provenance" id="mf02b-provenance">
      <ReviewHeading eyebrow="MF-02B · CONTROL GATE" title="Selection provenance stays explicit." copy="The normalized adaptive family is now implemented as review evidence. MF-01A and MF-01B historical selections remain unproven, and no automated check can fill the human receipt." source={figmaReviewLinks.adaptivePage} />
      <div className="oluk-candidate-gate-grid">
        <article><span>01</span><h3>MF-01A</h3><p>Exploration artifacts present; named human selection receipt absent.</p><strong>RATIFICATION REQUIRED</strong></article>
        <article><span>02</span><h3>MF-01B</h3><p>Transfer exploration complete; selection provenance incomplete.</p><strong>RATIFICATION REQUIRED</strong></article>
        <article><span>03</span><h3>MF-02B</h3><p>Adaptive evidence prepared at 1440, 1024, 768 and 390.</p><strong>HUMAN SELECTION REQUIRED</strong></article>
      </div>
    </OlukSection>
  );
}

function AtomReview() {
  return (
    <OlukSection className="oluk-candidate-section" id="mf02b-atoms">
      <ReviewHeading eyebrow="SHARED STATUS ATOMS" title="Exact identity, explicit states." copy="Inventory and EvidenceStatus are isolated here so their geometry, colour and source links can be reviewed independently of any card composition." source={figmaReviewLinks.evidence} />
      <div className="oluk-candidate-atom-grid">
        <article id="mf02b-inventory-status">
          <h3>InventoryStatus</h3>
          <div><InventoryStatus /><InventoryStatus state="out-of-stock" /><InventoryStatus state="unavailable" /></div>
          <FigmaLink href={figmaReviewLinks.inventory}>Open InventoryStatus set</FigmaLink>
        </article>
        <article id="mf02b-evidence-status">
          <h3>EvidenceStatus</h3>
          <div><EvidenceStatus /></div>
          <FigmaLink href={figmaReviewLinks.evidence}>Open exact atom component</FigmaLink>
        </article>
      </div>
    </OlukSection>
  );
}

function ViewportLedger() {
  const widths = [
    ["1440", figmaReviewLinks.review1440],
    ["1024", figmaReviewLinks.review1024],
    ["768", figmaReviewLinks.review768],
    ["390", figmaReviewLinks.review390],
  ];
  return (
    <OlukSection className="oluk-candidate-section" id="mf02b-responsive-ledger">
      <ReviewHeading eyebrow="RESPONSIVE EVIDENCE" title="Four authored review frames." copy="The current boundary pass reports zero semantic-content escapes. Authored bottle crops inside clipped media chambers and the exact EvidenceStatus atom overflow are separately classified." source={figmaReviewLinks.review1440} />
      <div className="oluk-candidate-width-grid">{widths.map(([width, href]) => <a href={href} target="_blank" rel="noreferrer" key={width}><strong>{width}</strong><span>Open Figma frame <Arrow /></span><em>BOUNDARY PASS</em></a>)}</div>
    </OlukSection>
  );
}

function PendingDossier() {
  return (
    <OlukSection className="oluk-candidate-section oluk-candidate-pending" id="mf02b-dossier">
      <ReviewHeading eyebrow="DOSSIER VNEXT" title="Correction remains open." copy="The three-panel relationship is retained, but node 551:27148 still clips Product Composition and overlaps central metrics. It is deliberately not presented as a selected champion." source={figmaReviewLinks.dossier} />
      <div><strong>CORRECTION REQUIRED</strong><p>Next candidate must prove intrinsic columns, min-width: 0, 15–16px copy, compact media, safe long-value wrapping and four-width containment.</p></div>
    </OlukSection>
  );
}

function PendingRelatedRail() {
  return (
    <OlukSection className="oluk-candidate-section oluk-candidate-pending" id="mf02b-related-rail">
      <ReviewHeading eyebrow="RELATED PRODUCT RAIL" title="Section-level convergence remains open." copy="The bounded Relation card proves the horizontal component relationship, but it does not yet prove the full-width adaptive rail, surrounding copy, spacing or four-width section behavior." source={figmaReviewLinks.relatedRail} />
      <div><strong>FULL RAIL REQUIRED</strong><p>Next candidate must reconcile nodes 551:26896, 545:24677 and 486:4636 through the shared horizontal-card grammar without fixed inner geometry or clipped mobile content.</p></div>
    </OlukSection>
  );
}

function BaselineRouteIndex() {
  return (
    <OlukSection className="oluk-candidate-section" id="baseline-routes">
      <ReviewHeading eyebrow="CURRENT PRIVATE ROUTES" title="Rejected v3 comparison surfaces." copy="These owner-only pages remain useful before/after evidence. Their presence does not convert route coverage into design approval." source={figmaReviewLinks.review1440} />
      <div className="oluk-candidate-route-grid">
        {baselineRoutes.map(([label, href, node]) => (
          <article key={href}>
            <h3>{label}</h3>
            <div><a href={href}>Open page <Arrow /></a><a href={`https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=${node.replace(":", "-")}`} target="_blank" rel="noreferrer">Figma {node} <Arrow /></a></div>
          </article>
        ))}
      </div>
    </OlukSection>
  );
}

export function CandidateReviewIndex() {
  return (
    <OlukCanvas className="oluk-candidate-root">
      <header className="oluk-candidate-review-hero">
        <div>
          <span>OWNER-ONLY DESIGN REVIEW</span>
          <h1>Olympus Labs UK review surfaces.</h1>
          <p>This is an unpublished component-convergence review, not an accepted design-system milestone. Customer routes remain the rejected v3 comparison baseline while the adaptive family awaits human selection.</p>
          <div className="oluk-candidate-review-status"><strong>{candidateContract.id}</strong><span>{candidateContract.status}</span><span>RUNTIME AUTHORITY {candidateContract.runtimeAuthority}</span></div>
        </div>
        <nav aria-label="Candidate review items">
          <a href="#foundation">Foundation</a><a href="#mf02b-atoms">Status atoms</a><a href="#mf02b-vertical">Vertical</a><a href="#mf02b-featured">Featured</a><a href="#mf02b-compact-default">Compact states</a><a href="#mf02b-horizontal">Relation</a><a href="#mf02b-purchase-panel">PurchasePanel</a><a href="#mf02b-six-icons">Assurance</a><a href="#mf02b-related-rail">Related rail</a><a href="#mf02b-dossier">Dossier</a><a href="#baseline-routes">Pages</a>
        </nav>
      </header>

      <div className="oluk-candidate-review-main">
        <ProvenanceGate />
        <FoundationSpecimen />
        <AtomReview />

        <OlukSection className="oluk-candidate-section" id="mf02b-card-family">
          <ReviewHeading eyebrow="ADAPTIVE CARD FAMILY" title="One component grammar across density and width." copy="The family shares bounded ice media, a connected white content plane, quantified MetricRail, icon-bearing QualitativeChips, exact EvidenceStatus, green inventory, and the candidate Softform Arc elevation." source={figmaReviewLinks.adaptivePage} />
          <div className="oluk-candidate-primary-grid">
            <ProductCommerceCard product={mk2866Specimen.value} variant="vertical" id="mf02b-vertical" sourceLink={<FigmaLink href={figmaReviewLinks.vertical}>Open vertical component set</FigmaLink>} />
            <ProductCommerceCard product={mk2866Specimen.value} variant="featured" id="mf02b-featured" sourceLink={<FigmaLink href={figmaReviewLinks.featured}>Open featured component set</FigmaLink>} />
          </div>
        </OlukSection>

        <OlukSection className="oluk-candidate-section" id="mf02b-compact-states">
          <ReviewHeading eyebrow="COMPACT LOCAL STATES" title="Eight explicit static states." copy="These are visual-state specimens only. They do not call a cart, inventory API, payment service or telemetry." source={figmaReviewLinks.compact} />
          <div className="oluk-candidate-compact-grid">{compactStates.map((item) => <CompactCard key={item.state} {...item} />)}</div>
        </OlukSection>

        <OlukSection className="oluk-candidate-section">
          <ReviewHeading eyebrow="HORIZONTAL RELATION" title="Adaptive product relationship." copy="Desktop uses the authored horizontal three-zone relationship; tablet and mobile use explicit stacked variants rather than squeezing fixed geometry." source={figmaReviewLinks.relation} />
          <RelationCard />
        </OlukSection>

        <OlukSection className="oluk-candidate-section">
          <ReviewHeading eyebrow="PDP PURCHASE CONTEXT" title="Six explicit PurchasePanel states." copy="Default, quantity-changed, added, unavailable, out-of-stock and disabled variants preserve the same metrics, qualitative facts and single 90 SERVINGS pack-size choice." source={figmaReviewLinks.purchase} />
          <div className="oluk-candidate-purchase-state-grid" id="mf02b-purchase-panel">
            {purchasePanelStates.map((item) => <div className="oluk-candidate-purchase-stage" key={item.state}><PurchasePanel id={`mf02b-purchase-panel-${item.state}`} {...item} /></div>)}
          </div>
        </OlukSection>

        <OlukSection className="oluk-candidate-section" id="mf02b-assurance">
          <ReviewHeading eyebrow="SIX-POINT ASSURANCE" title="Six distinct semantic icons." copy="The exact Figma glyphs and locked 01–06 order replace the generic modulo icon cycle. Definitions are lifted to the 15px customer-copy floor in this candidate." source={figmaReviewLinks.assurance} />
          <AssuranceRail />
        </OlukSection>

        <PendingRelatedRail />
        <PendingDossier />
        <ViewportLedger />
        <BaselineRouteIndex />

        <OlukSection className="oluk-candidate-section oluk-candidate-selection" id="mf02b-selection-receipt">
          <span>HUMAN GATE</span><h2>Adaptive champion selection remains open.</h2><p>Approve, reject or request bounded corrections against the linked Figma candidates. Route convergence remains paused until this receipt is named and dated.</p>
          <div><strong>DECISION</strong><span>PENDING</span><strong>REVIEWER</strong><span>PENDING</span><strong>DATE</strong><span>PENDING</span></div>
        </OlukSection>
      </div>
    </OlukCanvas>
  );
}
