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
import { OwnerReviewStateHarness } from "./owner-review-state-harness";

const baselineRoutes = [
  ["Homepage", "/", "739:50"],
  ["Shop", "/shop", "743:50"],
  ["MK-2866 PDP", "/product/mk-2866", "745:50"],
  ["Reviews", "/reviews", "614:75950"],
  ["About", "/about", "614:75952"],
  ["EvidenceOS", "/about/evidence-os", "626:11285"],
  ["OpenLab portal", "/open-lab", "750:182"],
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
      <ReviewHeading eyebrow="CONV-001 · ACTIVE FOUNDATION" title="One material grammar before route assembly." copy="The 86 convergence variables remain active and unpublished. The 128 legacy and quarantined variables are archived, while component elevation follows the approved graduated single-shadow decision." source={figmaReviewLinks.foundation} />
      <div className="oluk-candidate-foundation-grid">
        <article><h3>Colour lineage</h3><div className="oluk-candidate-swatches">{swatches.map(([name, value, token]) => <div key={name}><i data-swatch={token} /><strong>{name}</strong><span>{value}</span></div>)}</div></article>
        <article><h3>Shape hierarchy</h3><div className="oluk-candidate-radius-row"><span data-radius="compact">20</span><span data-radius="vertical">24</span><span data-radius="purchase">28</span><span data-radius="horizontal">34</span></div><p>Compact / Vertical / Purchase / Relation</p></article>
        <article><h3>Graduated elevation</h3><div className="oluk-candidate-shadow-grid"><div className="oluk-candidate-shadow-sample" data-elevation="compact">Compact<br />12 / 5 / .09</div><div className="oluk-candidate-shadow-sample" data-elevation="card">Vertical + Featured<br />60 / 24 / .10</div><div className="oluk-candidate-shadow-sample" data-elevation="purchase">PurchasePanel<br />50 / 20 / .18</div><div className="oluk-candidate-shadow-sample" data-elevation="relation">Relation<br />25 / 12 / .12</div></div><p>One shadow per component role; no archived two-layer recipe.</p></article>
        <article><h3>Typography</h3><strong className="oluk-candidate-display-sample">Plus Jakarta Sans</strong><p>Inter supports body, navigation, labels, metrics and controls. The 12px metadata / 15–16px body floor remains PROPOSED and non-controlling.</p></article>
      </div>
    </OlukSection>
  );
}

function ProvenanceGate() {
  return (
    <OlukSection className="oluk-candidate-section oluk-candidate-provenance" id="mf02b-provenance">
      <ReviewHeading eyebrow="CONV-001 · CONTROL GATE" title="Champion inheritance stays explicit." copy="The approved package preserves MF-01A material and anatomy, applies the current correction delta, and blocks later Make boards from replacing that inherited state wholesale." source={figmaReviewLinks.control} />
      <div className="oluk-candidate-gate-grid">
        <article><span>01</span><h3>INHERITED_CHAMPION_STATE</h3><p>MF-01A owns the persistent material relationships, anatomy and converging component grammar.</p><strong>CHAMPION</strong></article>
        <article><span>02</span><h3>THIS_RUN_DELTA</h3><p>Correct product truth, canonical source graph, graduated shadows and archived legacy variables.</p><strong>APPROVED</strong></article>
        <article><span>03</span><h3>DO_NOT_INHERIT</h3><p>Raw later-board composition, the wrapped Hero component and the archived two-layer shadow recipe.</p><strong>ENFORCED</strong></article>
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
      <ReviewHeading eyebrow="CANONICAL DOSSIER" title="Corrected structure is now sourced." copy="The corrected three-panel dossier has clear Product Facts, media and Product Composition regions, with the canonical source extracted from the repaired review frame." source={figmaReviewLinks.dossier} />
      <div><strong>IMPLEMENTED · HUMAN_REVIEW_REQUIRED</strong><p>The MF03 runtime carries intrinsic columns, safe long-value wrapping, product truth and direct record access without promoting the proposed type floor.</p></div>
    </OlukSection>
  );
}

function PendingRelatedRail() {
  return (
    <OlukSection className="oluk-candidate-section oluk-candidate-pending" id="mf02b-related-rail">
      <ReviewHeading eyebrow="CANONICAL RELATED RAIL" title="Section-level convergence is implemented." copy="The RelatedRail now instantiates the adaptive canonical Relation component at desktop, tablet and mobile widths while preserving its surrounding copy and spacing." source={figmaReviewLinks.relatedRail} />
      <div><strong>IMPLEMENTED · HUMAN_REVIEW_REQUIRED</strong><p>The runtime uses the same relation anatomy and the approved 25 / 12 / .12 single shadow; promotion remains behind the visual gate.</p></div>
    </OlukSection>
  );
}

function BaselineRouteIndex() {
  return (
    <OlukSection className="oluk-candidate-section" id="baseline-routes">
      <ReviewHeading eyebrow="MF01–MF03 PRIVATE ROUTES" title="Converged candidate surfaces." copy="Homepage, Shop, PDP and OpenLab carry the approved champion state into a private implementation. Route coverage is evidence, not visual promotion." source={figmaReviewLinks.productDecisionHero} />
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
          <p>This unpublished review carries the approved CONV-001 champion state into MF01–MF03 runtime surfaces. The system decisions are inherited; the rendered Homepage, Shop, PDP and OpenLab surfaces still require the human visual gate.</p>
          <div className="oluk-candidate-review-status"><strong>{candidateContract.id}</strong><span>{candidateContract.status}</span><span>RUNTIME AUTHORITY {candidateContract.runtimeAuthority}</span></div>
        </div>
        <nav aria-label="Candidate review items">
          <a href="#foundation">Foundation</a><a href="#mf02b-atoms">Status atoms</a><a href="#mf02b-vertical">Vertical</a><a href="#mf02b-featured">Featured</a><a href="#mf02b-compact-default">Compact states</a><a href="#mf02b-horizontal">Relation</a><a href="#mf02b-purchase-panel">PurchasePanel</a><a href="#mf02b-six-icons">Assurance</a><a href="#mf02b-related-rail">Related rail</a><a href="#mf02b-dossier">Dossier</a><a href="#mf09-local-state-harness">Local states</a><a href="#baseline-routes">Pages</a>
        </nav>
      </header>

      <div className="oluk-candidate-review-main">
        <ProvenanceGate />
        <FoundationSpecimen />
        <AtomReview />

        <OlukSection className="oluk-candidate-section" id="mf02b-card-family">
          <ReviewHeading eyebrow="ADAPTIVE CARD FAMILY" title="One component grammar across density and width." copy="The family shares bounded ice media, a connected white content plane, quantified MetricRail, icon-bearing QualitativeChips, exact EvidenceStatus, green inventory and role-specific single elevation." source={figmaReviewLinks.adaptivePage} />
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
          <ReviewHeading eyebrow="SIX-POINT ASSURANCE" title="Six distinct semantic icons." copy="The exact Figma glyphs and locked 01–06 order replace the generic modulo icon cycle. The rendered copy explores the proposed floor without promoting it to champion status." source={figmaReviewLinks.assurance} />
          <AssuranceRail />
        </OlukSection>

        <PendingRelatedRail />
        <PendingDossier />

        <OlukSection className="oluk-candidate-section" id="mf09-local-state-harness">
          <ReviewHeading eyebrow="MF-09 · LOCAL INTERACTION PROOF" title="State transitions without runtime authority." copy="This owner-only client harness exercises quantity, added, unavailable, out-of-stock, search, filters, tabs and record reveal entirely in memory. It does not contact commerce, evidence or publication services." source={figmaReviewLinks.review390} />
          <OwnerReviewStateHarness />
        </OlukSection>

        <ViewportLedger />
        <BaselineRouteIndex />

        <OlukSection className="oluk-candidate-section oluk-candidate-selection" id="mf02b-selection-receipt">
          <span>HUMAN GATE</span><h2>Rendered surface approval remains open.</h2><p>Approve, reject or request bounded corrections against the linked canonical Figma sources and MF01–MF03 candidate routes. No library or runtime promotion occurs from this build.</p>
          <div><strong>SYSTEM STATE</strong><span>CONV-001 APPROVED</span><strong>SURFACE DECISION</strong><span>PENDING</span><strong>PUBLICATION</strong><span>BLOCKED</span></div>
        </OlukSection>
      </div>
    </OlukCanvas>
  );
}
