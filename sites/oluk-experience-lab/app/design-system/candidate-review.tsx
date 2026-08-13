import type { ReactNode } from "react";
import {
  candidateContract,
  figmaReviewLinks,
} from "./contracts";
import {
  compactStates,
} from "./candidate-components";
import { AssuranceRail, ownerReviewAssuranceItems } from "./assurance-rail";
import { CobaltDensityBoundary } from "./cobalt-divider";
import { OlukCanvas, OlukSection } from "./candidate-primitives";
import { OwnerReviewStateHarness } from "./owner-review-state-harness";
import { ProductCommerceCard } from "./product-commerce-card";
import { mk2866Fixture, rad140Fixture } from "./product-fixtures";
import { PurchasePanelMatrix } from "./purchase-panel";
import { RelationCard } from "./related-rail";
import { CUSTOMER_ROUTES, routeReviewTargets } from "./site-route-map";
import { EvidenceStatus, StockPill } from "./product-status";

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
  const colourRoles = [
    ["Canvas", "#F7F8FC", "--oluk-canvas"],
    ["Card", "#FFFFFF", "--oluk-surface-card"],
    ["Family", "#F8FAFC", "--oluk-surface-family"],
    ["Media chamber", "#F0F4FB", "--oluk-surface-media"],
    ["Cobalt soft", "#EEF4FF", "--oluk-surface-cobalt-soft"],
    ["Border", "rgba(206,220,241,.92)", "--oluk-border-card"],
    ["Border strong", "#AFC8FF", "--oluk-border-strong"],
    ["Border family", "#D2E4FF", "--oluk-border-family"],
    ["Border chip", "#D4E0F2", "--oluk-border-chip"],
    ["Border outer", "#BECFE9", "--oluk-border-outer"],
    ["Border identity", "#BDD0F1", "--oluk-border-identity"],
    ["Border inner", "#B4CAF0", "--oluk-border-inner"],
    ["Border family background", "#D9E3F1", "--oluk-border-family-bg"],
    ["Text primary", "#141827", "--oluk-text-primary"],
    ["Text secondary", "#53617D", "--oluk-text-secondary"],
    ["Text muted", "#64718A", "--oluk-text-muted"],
    ["Cobalt", "#0057FF", "--oluk-cobalt"],
    ["Cobalt alt", "#0057FF", "--oluk-cobalt-alt"],
    ["Inventory", "#0057FF", "--oluk-stock-in-stock"],
    ["Inventory soft", "#EEF4FF", "--oluk-stock-in-stock-soft"],
    ["Inverse", "#141827", "--oluk-inverse"],
    ["On inverse", "#FFFFFF", "--oluk-text-on-inverse"],
  ] as const;

  const bodyScale = [
    ["18 / 28", "Editorial body for opening narratives and evidence context."],
    ["16 / 24", "Standard customer-facing body copy and section descriptions."],
    ["15 / 22", "Small customer copy floor. Never reduce this to 7–11px."],
    ["12 / 16", "Metadata + eyebrow floor."],
  ] as const;

  const densityRoles = [
    ["COMPACT", "20px", "12 / 5 / .09", "compact"],
    ["VERTICAL / FEATURED", "24px", "60 / 24 / .10", "card"],
    ["PURCHASEPANEL", "28px", "50 / 20 / .18", "purchase"],
    ["HORIZONTAL", "34px", "25 / 12 / .12", "relation"],
  ] as const;

  return (
    <OlukSection className="oluk-candidate-section oluk-candidate-foundation" id="foundation">
      <header className="oluk-candidate-foundation-hero">
        <div className="oluk-candidate-foundation-eyebrow-row">
          <span>FC-01 · CONVERGED FOUNDATION · HUMAN_REVIEW_REQUIRED</span>
          <FigmaLink href={figmaReviewLinks.foundation}>Open exact Figma candidate</FigmaLink>
        </div>
        <h2>OLUK candidate foundation convergence</h2>
        <p>A normalization layer for MF-01A through MF-03 relationships. It is not promoted design-system authority.</p>
        <div className="oluk-candidate-foundation-status" aria-label="Candidate foundation status">
          <span>112 LOCAL VARIABLES</span>
          <span>HIDDEN FROM PUBLISHING</span>
          <span>HUMAN SELECTION PENDING</span>
          <span>RUNTIME AUTHORITY: NONE</span>
        </div>
      </header>

      <article className="oluk-candidate-foundation-section" data-foundation-section="color">
        <span className="oluk-candidate-foundation-kicker">01 · COLOR</span>
        <h3>Cool luminous, blue-shifted materials</h3>
        <p>Canvas, raised surfaces, chambers, graduated borders, cobalt, inventory and inverse roles resolve through the current unpublished convergence semantics.</p>
        <div className="oluk-candidate-foundation-swatches" data-role-count={colourRoles.length}>
          {colourRoles.map(([name, value, token]) => (
            <div className="oluk-candidate-foundation-swatch" key={name}>
              <i aria-hidden="true" style={{ background: `var(${token})` }} />
              <strong>{name}</strong>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="oluk-candidate-foundation-section" data-foundation-section="typography">
        <span className="oluk-candidate-foundation-kicker">02 · TYPOGRAPHY</span>
        <h3>Plus Jakarta Sans leads. Inter supports.</h3>
        <p>DEC-TYPE-FLOOR-001 controls a 12px metadata and 15–16px body floor. The 11px QualitativeChip label is the named component exception.</p>
        <div className="oluk-candidate-foundation-type-grid">
          <div className="oluk-candidate-foundation-display-scale">
            <span>DISPLAY · PLUS JAKARTA SANS EXTRABOLD</span>
            <strong data-display-size="56">Formulated to a higher standard.</strong>
            <strong data-display-size="28">Every batch. Every report. Public.</strong>
          </div>
          <div className="oluk-candidate-foundation-body-scale">
            <span>BODY + UI · INTER VARIABLE</span>
            {bodyScale.map(([size, copy]) => <p key={size}><strong>{size}</strong><span>{copy}</span></p>)}
          </div>
        </div>
      </article>

      <article className="oluk-candidate-foundation-section" data-foundation-section="shape-elevation">
        <span className="oluk-candidate-foundation-kicker">03 · SHAPE + ELEVATION</span>
        <h3>Density-specific silhouette, one restrained elevation</h3>
        <p>20 / 24 / 28 / 34 are semantic density roles. Each uses one graduated shadow scaled by decision weight, never the superseded uniform two-layer recipe.</p>
        <div className="oluk-candidate-foundation-density-grid">
          {densityRoles.map(([label, radius, shadow, elevation]) => (
            <div data-elevation={elevation} key={label}>
              <span>{label}</span>
              <strong>{radius}</strong>
              <em>Softform Arc · {shadow}</em>
            </div>
          ))}
        </div>
      </article>

      <article className="oluk-candidate-foundation-section" data-foundation-section="surface-relationships">
        <span className="oluk-candidate-foundation-kicker">04 · SURFACE RELATIONSHIPS</span>
        <h3>Materials express structure, not decoration</h3>
        <p>Independent objects use canvas separation. Related chamber and purchase content remain one object with an embedded cobalt relational mark.</p>
        <div className="oluk-candidate-foundation-relationship-grid">
          <div className="oluk-candidate-foundation-embedded">
            <div><span>BOUNDED MEDIA CHAMBER</span><strong>Authored product environment</strong></div>
            <i aria-hidden="true" />
            <div><span>PURCHASE PLANE</span><strong>£43</strong><small>Primary action + Lab Record action</small></div>
          </div>
          <div className="oluk-candidate-foundation-canvas-split">
            <div><span>INDEPENDENT EDITORIAL PLANE</span><strong>Every batch. Every report. Public.</strong></div>
            <div><span>INDEPENDENT RECORD PLANE</span><strong>Batch records and source actions</strong></div>
          </div>
          <div className="oluk-candidate-foundation-inverse">
            <span>SOLE INVERSE SURFACE</span>
            <strong>Footer only.</strong>
            <small>No dark trust rail, hero, commerce card, OpenLab section or evidence surface.</small>
          </div>
        </div>
      </article>

      <article className="oluk-candidate-foundation-section oluk-candidate-foundation-gate" data-foundation-section="candidate-gate">
        <span className="oluk-candidate-foundation-kicker">05 · CANDIDATE GATE</span>
        <h3>Normalization rules before promotion</h3>
        <p>These values remain local and unpublished until an explicit MF-10 champion approval and separate System Gate.</p>
        <ul>
          <li>Exact product truth: 15 MG · 90 SERVINGS · &gt;99% · £43 · SKU 80529-01.</li>
          <li>No achromatic Tailwind grey; no cobalt outer card outline or decorative top edge.</li>
          <li>Cobalt StockPill InventoryStatus; exact EvidenceStatus; six distinct AssuranceRail icons.</li>
          <li>Families: SARMs · Prohormones · Research Chemicals · Stacks. Independent facets: form · servings · goals · availability.</li>
          <li>Footer is the sole inverse. Runtime authority remains NONE.</li>
        </ul>
      </article>
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
      <ReviewHeading eyebrow="SHARED STATUS ATOMS" title="Exact identity, explicit states." copy="StockPill and EvidenceStatus are isolated here so their geometry, colour and source links can be reviewed independently of any card composition." source={figmaReviewLinks.evidence} />
      <div className="oluk-candidate-atom-grid">
        <article id="mf02b-inventory-status">
          <h3>StockPill</h3>
          <div><StockPill /><StockPill state="out-of-stock" /><StockPill state="unavailable" /></div>
          <FigmaLink href={figmaReviewLinks.inventory}>Open canonical InventoryStatus set</FigmaLink>
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
      <ReviewHeading eyebrow="RESPONSIVE EVIDENCE" title="Three authored sources across four execution widths." copy="Desktop, tablet and mobile are authored sources; the tablet source governs both 1024px and 768px execution receipts. The current boundary pass reports zero semantic-content escapes. Authored bottle crops inside clipped media chambers and the exact EvidenceStatus atom overflow are separately classified." source={figmaReviewLinks.review1440} />
      <div className="oluk-candidate-width-grid">{widths.map(([width, href]) => <a href={href} target="_blank" rel="noreferrer" key={width}><strong>{width}</strong><span>Open Figma frame <Arrow /></span><em>BOUNDARY PASS</em></a>)}</div>
    </OlukSection>
  );
}

function PendingDossier() {
  return (
    <OlukSection className="oluk-candidate-section oluk-candidate-pending" id="mf02b-dossier">
      <ReviewHeading eyebrow="CANONICAL DOSSIER" title="Corrected structure is now sourced." copy="The corrected three-panel dossier has clear Product Facts, media and Product Composition regions, with the canonical source extracted from the repaired review frame." source={figmaReviewLinks.dossier} />
      <div><strong>IMPLEMENTED · HUMAN_REVIEW_REQUIRED</strong><p>The unpublished Sites candidate carries intrinsic columns, safe long-value wrapping, exact product truth and direct record access under the controlling DEC-TYPE-FLOOR-001.</p></div>
    </OlukSection>
  );
}

function PendingRelatedRail() {
  return (
    <OlukSection className="oluk-candidate-section oluk-candidate-pending" id="mf02b-related-rail">
      <ReviewHeading eyebrow="CANONICAL RELATED RAIL" title="Section-level convergence is implemented." copy="The RelatedRail now instantiates the adaptive canonical Relation component at desktop, tablet and mobile widths while preserving its surrounding copy and spacing." source={figmaReviewLinks.relatedRail} />
      <div><strong>IMPLEMENTED · HUMAN_REVIEW_REQUIRED</strong><p>The unpublished Sites candidate uses the same relation anatomy and the approved 25 / 12 / .12 single shadow; promotion remains behind the visual gate.</p></div>
    </OlukSection>
  );
}

function BaselineRouteIndex() {
  return (
    <OlukSection className="oluk-candidate-section" id="baseline-routes">
      <ReviewHeading eyebrow="MF01–MF03 PRIVATE ROUTES" title="Thirty-one governed candidate surfaces." copy="This index is generated from the same executable route registry used by the renderer and four-width proof. Direct frames are linked where they exist; other routes link to their current artifact-specific review board." source={figmaReviewLinks.productDecisionHero} />
      <div className="oluk-candidate-route-grid">
        {CUSTOMER_ROUTES.map((route) => {
          const target = routeReviewTargets[route.key];
          return <article data-review-target={target.kind} key={route.path}>
            <h3>{route.label}</h3>
            <div><a href={route.path}>Open page <Arrow /></a><a href={`https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=${target.nodeId.replace(":", "-")}`} target="_blank" rel="noreferrer">Figma {target.nodeId} <Arrow /></a></div>
          </article>
        })}
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
          <p>This unpublished review carries the inherited champion state plus the bounded CONV-004 reconciliation delta into MF01–MF03 customer surfaces. The rendered Homepage, Shop, PDP and OpenLab surfaces still require the human visual gate.</p>
          <div className="oluk-candidate-review-status"><strong>{candidateContract.id}</strong><span>{candidateContract.status}</span><span>RUNTIME AUTHORITY {candidateContract.runtimeAuthority}</span></div>
        </div>
        <nav aria-label="Candidate review items">
          <a href="#foundation">Foundation</a><a href="#mf02b-atoms">Status atoms</a><a href="#mf02b-vertical">Vertical</a><a href="#mf02b-featured">Featured</a><a href="#mf02b-compact-states">Compact states</a><a href="#mf02b-horizontal">Relation</a><a href="#mf02b-purchase-panel">PurchasePanel</a><a href="#mf02b-six-icons">Assurance</a><a href="#mf02b-related-rail">Related rail</a><a href="#mf02b-dossier">Dossier</a><a href="#mf09-local-state-harness">Local states</a><a href="#baseline-routes">Pages</a>
        </nav>
      </header>

      <div className="oluk-candidate-review-main">
        <ProvenanceGate />
        <FoundationSpecimen />
        <CobaltDensityBoundary />
        <AtomReview />
        <CobaltDensityBoundary />

        <OlukSection className="oluk-candidate-section" id="mf02b-card-family">
          <ReviewHeading eyebrow="ADAPTIVE CARD FAMILY" title="One component grammar across density and width." copy="The family shares bounded authored media, a connected white content plane, quantified MetricRail, icon-bearing QualitativeChips, exact EvidenceStatus, cobalt StockPill and role-specific single elevation." source={figmaReviewLinks.adaptivePage} />
          <div className="oluk-candidate-primary-grid">
            <div className="oluk-candidate-component-stage" id="mf02b-vertical">
              <ProductCommerceCard product={mk2866Fixture} variant="vertical" />
              <FigmaLink href={figmaReviewLinks.vertical}>Open vertical component set</FigmaLink>
            </div>
            <div className="oluk-candidate-component-stage" id="mf02b-featured">
              <ProductCommerceCard product={mk2866Fixture} variant="featured" />
              <FigmaLink href={figmaReviewLinks.featured}>Open featured component set</FigmaLink>
            </div>
          </div>
        </OlukSection>

        <CobaltDensityBoundary />

        <OlukSection className="oluk-candidate-section" id="mf02b-compact-states">
          <ReviewHeading eyebrow="COMPACT LOCAL STATES" title="Eight explicit static states." copy="These are visual-state specimens only. They do not call a cart, inventory API, payment service or telemetry." source={figmaReviewLinks.compact} />
          <div className="oluk-candidate-compact-grid">
            {compactStates.map(({ state, label }) => (
              <div className="oluk-candidate-state-stage" id={`mf02b-compact-${state}`} key={state}>
                <span className="oluk-candidate-state-label">{label}</span>
                <ProductCommerceCard
                  product={mk2866Fixture}
                  showQualitative={false}
                  state={state}
                  variant="compact"
                />
              </div>
            ))}
          </div>
        </OlukSection>

        <OlukSection className="oluk-candidate-section">
          <ReviewHeading eyebrow="HORIZONTAL RELATION" title="Adaptive product relationship." copy="Desktop uses the authored horizontal three-zone relationship; tablet and mobile use explicit stacked variants rather than squeezing fixed geometry." source={figmaReviewLinks.relation} />
          <div id="mf02b-horizontal">
            <RelationCard anchorProduct={mk2866Fixture} product={rad140Fixture} />
          </div>
        </OlukSection>

        <OlukSection className="oluk-candidate-section">
          <ReviewHeading eyebrow="PDP PURCHASE CONTEXT" title="Twelve explicit PurchasePanel variants." copy="Six states across Desktop and Mobile preserve the same metrics, qualitative facts and single 90 SERVINGS pack-size choice while proving the width axis registered in Figma." source={figmaReviewLinks.purchase} />
          <div id="mf02b-purchase-panel"><PurchasePanelMatrix product={mk2866Fixture} /></div>
        </OlukSection>

        <OlukSection className="oluk-candidate-section" id="mf02b-six-icons">
          <span aria-hidden="true" id="mf02b-assurance" />
          <ReviewHeading eyebrow="SIX-POINT ASSURANCE" title="Six distinct semantic icons." copy="The exact Figma glyphs and locked 01–06 order replace the generic modulo icon cycle. The rendered copy follows the controlling DEC-TYPE-FLOOR-001 customer typography floor." source={figmaReviewLinks.assurance} />
          <AssuranceRail items={ownerReviewAssuranceItems} />
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
          <div><strong>SYSTEM STATE</strong><span>CONV-004 RECONCILIATION</span><strong>SURFACE DECISION</strong><span>PENDING</span><strong>PUBLICATION</strong><span>BLOCKED</span></div>
        </OlukSection>
      </div>
    </OlukCanvas>
  );
}
