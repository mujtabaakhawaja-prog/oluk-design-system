import Link from "next/link";

import { AssuranceRail } from "./assurance-rail";
import { DecisionSurface, EditorialSurface, TechnicalSurface } from "./content-surfaces";
import { frontierProductPresentation } from "./frontier-product-presentation";
import { type FrontierProductRecord, productBySlug } from "./frontier-content";
import { OpenLabProductExperience } from "./openlab-product-experience";
import type { PdpCandidateId, PdpStressProductSlug } from "./pdp-candidate-manifest";
import { PDP_CANDIDATES } from "./pdp-candidate-manifest";
import { ProductCommerceCard } from "./product-commerce-card";
import { ProductMediaChamber } from "./product-media-chamber";
import { PurchasePanel } from "./purchase-panel";
import { EvidenceStatusChip } from "./program-components";
import { Breadcrumbs } from "./customer-route-primitives";
import { MobileDecisionSummary } from "./pdp-sections";
import { YourStackBuilder } from "./your-stack-builder";
import styles from "./pdp-candidate-suite.module.css";

type CandidateProps = Readonly<{
  candidateId: PdpCandidateId;
  productSlug: PdpStressProductSlug;
}>;

const candidateCopy = {
  "mk-2866": {
    headline: "Build a stronger cutting or recomp base.",
    promise: "MK-2866 brings a clear 15 MG Ostarine format, 90 servings and an available OpenLab pathway into one product decision.",
    story: "Start with MK-2866 when lean mass and training quality need to stay central while the wider goal moves toward cutting or recomp.",
    guidance: "Use the comparison and stack entries to decide whether training output, lean mass or a harder finishing direction should come next.",
    contributions: ["TRAINING OUTPUT", "LEAN MASS", "BODY COMPOSITION"],
  },
  "rad-140": {
    headline: "Put strength and lean mass at the centre.",
    promise: "RAD-140 is the 8 MG, 60-serving Testolone step-up for customers building a stronger training phase.",
    story: "RAD-140 moves strength and lean mass to the front of the product decision with an 8 MG format and a clear advanced-step-up role.",
    guidance: "Compare LGD-4033 when lean mass should lead, MK-677 when recovery should support the phase, or MENT when size and power become the priority.",
    contributions: ["STRENGTH", "LEAN MASS", "RECOVERY"],
  },
  "lgd-4033": {
    headline: "Give a lean-mass phase more substance.",
    promise: "LGD-4033 brings a 5 MG Ligandrol format and a clear lean-mass direction. Servings are shown only when supplied.",
    story: "LGD-4033 is the lean-mass anchor when a heavier phase needs a more deliberate product centre.",
    guidance: "Compare RAD-140 when strength should lead or MK-677 when recovery support should become the next addition.",
    contributions: ["LEAN MASS", "STRENGTH", "RECOVERY"],
  },
} as const satisfies Readonly<Record<PdpStressProductSlug, Readonly<{
  headline: string;
  promise: string;
  story: string;
  guidance: string;
  contributions: readonly string[];
}>>>;

function strongerCustomerLanguage(copy: string) {
  return copy.replace(/\bsharper\b/gi, "stronger");
}

function CandidateActions({ product }: Readonly<{ product: FrontierProductRecord }>) {
  return (
    <div className={styles.actions}>
      <a className={styles.primaryAction} href="#purchase">Choose {product.name}</a>
      <a className={styles.secondaryAction} href="#lab-records">View OpenLab confidence</a>
    </div>
  );
}

function PropositionSurface({ product, productSlug }: Readonly<{ product: FrontierProductRecord; productSlug: PdpStressProductSlug }>) {
  const copy = candidateCopy[productSlug];
  return (
    <DecisionSurface
      actions={<CandidateActions product={product} />}
      copy={copy.promise}
      eyebrow={product.series}
      headingLevel="h1"
      title={copy.headline}
    >
      <ul className={styles.benefits}>
        {product.proposition.benefits.map((benefit) => <li key={benefit}>{strongerCustomerLanguage(benefit)}</li>)}
      </ul>
      <p className={styles.differentiator}>{strongerCustomerLanguage(product.proposition.differentiator)}</p>
    </DecisionSurface>
  );
}

function EvidenceAvailability({ compact = false, product, productSlug }: Readonly<{
  compact?: boolean;
  product: FrontierProductRecord;
  productSlug: PdpStressProductSlug;
}>) {
  const available = productSlug === "mk-2866";
  return (
    <TechnicalSurface
      actions={available
        ? <Link href="/open-lab/compound/mk-2866">Open the MK-2866 dossier</Link>
        : <Link href="/open-lab/records">Browse available OpenLab records</Link>}
      compact={compact}
      copy={available
        ? "The available MK-2866 record keeps product identity, batch context, reported values and original-source access connected to this decision."
        : `No OpenLab record is currently available for ${product.name}. Keep the exact product facts in view while you browse published records.`}
      eyebrow="OpenLab confidence"
      id={compact ? undefined : "lab-records"}
      state={available ? "default" : "unavailable"}
      title={available ? "See the record behind the product." : "See the product evidence currently available."}
    >
      <div className={styles.evidenceStatus}>
        <EvidenceStatusChip state={available ? "verified-evidence" : "unavailable"} />
        <dl>
          <div><dt>Product</dt><dd>{product.name}</dd></div>
          <div><dt>Compound</dt><dd>{product.alias}</dd></div>
          <div><dt>Pathway</dt><dd>{available ? "Dossier and source" : "Availability panel"}</dd></div>
        </dl>
      </div>
    </TechnicalSurface>
  );
}

function ProductContext({ product }: Readonly<{ product: FrontierProductRecord }>) {
  return (
    <DecisionSurface
      compact
      copy="Keep the product, format and purchase decision in view while you inspect the available confidence detail."
      eyebrow="Current product"
      title={`${product.name} · ${product.alias}`}
    >
      <dl className={styles.contextFacts}>
        <div><dt>Strength</dt><dd>{product.strength}</dd></div>
        <div><dt>Servings</dt><dd>{product.servings || "Not supplied"}</dd></div>
        <div><dt>Price</dt><dd>{product.price}</dd></div>
      </dl>
    </DecisionSurface>
  );
}

function ProductDecision({ candidateId, product, productSlug }: CandidateProps & Readonly<{ product: FrontierProductRecord }>) {
  const presentation = frontierProductPresentation(product);

  if (candidateId === "guided-decision") {
    return (
      <section className={styles.guidedDecision} data-layout="central-decision-spine">
        <div className={styles.guidedSpine}>
          <PropositionSurface product={product} productSlug={productSlug} />
          <ProductMediaChamber className={styles.decisionMedia} context="hero" media={presentation.media} priority />
        </div>
        <div className={styles.purchaseRail} id="purchase">
          <PurchasePanel evidence={productSlug === "mk-2866" ? "verified" : "unavailable"} headingLevel="h2" product={presentation} />
        </div>
      </section>
    );
  }

  if (candidateId === "confidence-workspace") {
    return (
      <section className={styles.confidenceDecision} data-layout="evidence-workspace">
        <div className={styles.workspaceContext}><ProductContext product={product} /></div>
        <div className={styles.workspaceDecision}>
          <PropositionSurface product={product} productSlug={productSlug} />
          <ProductMediaChamber className={styles.decisionMedia} context="hero" media={presentation.media} priority />
          <div id="purchase"><PurchasePanel evidence={productSlug === "mk-2866" ? "verified" : "unavailable"} headingLevel="h2" product={presentation} /></div>
        </div>
        <div className={styles.workspaceConfidence}><EvidenceAvailability compact product={product} productSlug={productSlug} /></div>
      </section>
    );
  }

  return (
    <section className={styles.theatreDecision} data-layout="asymmetric-decision-field">
      <ProductMediaChamber className={styles.decisionMedia} context="hero" media={presentation.media} priority />
      <div className={styles.theatreContent}>
        <PropositionSurface product={product} productSlug={productSlug} />
        <div id="purchase"><PurchasePanel evidence={productSlug === "mk-2866" ? "verified" : "unavailable"} headingLevel="h2" product={presentation} /></div>
      </div>
    </section>
  );
}

function ProductStory({ product, productSlug }: Readonly<{ product: FrontierProductRecord; productSlug: PdpStressProductSlug }>) {
  const presentation = frontierProductPresentation(product);
  const copy = candidateCopy[productSlug];
  return (
    <EditorialSurface
      copy={copy.story}
      eyebrow="Product detail"
      id="product-details"
      title={`Understand where ${product.alias} fits.`}
    >
      <div className={styles.storyGrid}>
        <article>
          <h3>Why choose this format</h3>
          <p>{copy.guidance}</p>
        </article>
        <article>
          <h3>Product facts</h3>
          <dl>
            <div><dt>Series</dt><dd>{presentation.series}</dd></div>
            <div><dt>Strength</dt><dd>{presentation.strength}</dd></div>
            <div><dt>Servings</dt><dd>{presentation.servings || "Not supplied"}</dd></div>
            <div><dt>Purity</dt><dd>{presentation.purity}</dd></div>
            <div><dt>SKU</dt><dd>{presentation.sku}</dd></div>
          </dl>
        </article>
        <article>
          <h3>Before you decide</h3>
          <p>{strongerCustomerLanguage(product.considerations)}</p>
          <a href="#compare">Compare the nearest product decisions</a>
        </article>
      </div>
    </EditorialSurface>
  );
}

function OpenLabConfidence({ expanded, product, productSlug }: Readonly<{
  expanded: boolean;
  product: FrontierProductRecord;
  productSlug: PdpStressProductSlug;
}>) {
  return (
    <section className={styles.lowerSection}>
      <EvidenceAvailability product={product} productSlug={productSlug} />
      {expanded && productSlug === "mk-2866" ? (
        <TechnicalSurface
          copy="Move from the compact confidence summary into record identity, report history, label comparison, analytes and source context without leaving the product journey."
          eyebrow="Available record detail"
          title="Inspect the MK-2866 record in context."
        >
          <div className={styles.openLabExperience}>
            <OpenLabProductExperience />
          </div>
        </TechnicalSurface>
      ) : null}
    </section>
  );
}

function ProductComparison({ product }: Readonly<{ product: FrontierProductRecord }>) {
  const related = product.related.slice(0, 2).map((slug) => productBySlug[slug]).filter(Boolean);
  return (
    <TechnicalSurface
      copy={`Put ${product.name} beside the nearest product directions, then choose what should lead the next phase.`}
      eyebrow="Compare products"
      id="compare"
      title="Make the next product difference visible."
    >
      <div className={styles.comparisonGrid}>
        {related.map((item) => (
          <div className={styles.comparisonItem} key={item.slug}>
            <ProductCommerceCard
              evidence={item.slug === "mk-2866" ? "verified" : "unavailable"}
              headingLevel="h3"
              product={frontierProductPresentation(item)}
              variant="compact"
            />
            <p>{strongerCustomerLanguage(item.proposition.promise)}</p>
          </div>
        ))}
      </div>
    </TechnicalSurface>
  );
}

function StackBundleEntry({ productSlug }: Readonly<{ productSlug: PdpStressProductSlug }>) {
  return (
    <div id="product-continuation">
      <YourStackBuilder baselineSlug={productSlug} host="pdp" />
    </div>
  );
}

function RelatedProducts({ product }: Readonly<{ product: FrontierProductRecord }>) {
  const related = product.related.slice(0, 3).map((slug) => productBySlug[slug]).filter(Boolean);
  return (
    <EditorialSurface
      copy="Each product stays tied to the role it contributes, with exact format truth and an honest OpenLab availability state."
      eyebrow="Related products"
      title="Keep the next useful product close."
    >
      <div className={styles.relatedGrid}>
        {related.map((item) => (
          <ProductCommerceCard
            evidence={item.slug === "mk-2866" ? "verified" : "unavailable"}
            headingLevel="h3"
            key={item.slug}
            product={frontierProductPresentation(item)}
            variant="relation"
          />
        ))}
      </div>
    </EditorialSurface>
  );
}

function QuestionsAndReviews({ product }: Readonly<{ product: FrontierProductRecord }>) {
  return (
    <section className={styles.questionsGrid} id="reviews">
      <EditorialSurface
        copy="Get the product-format and decision questions answered without leaving the product page."
        eyebrow="Product questions"
        title={`Before you choose ${product.name}.`}
      >
        <div className={styles.disclosures}>
          <details open><summary>What should I compare first?</summary><p>Start with strength, servings when supplied, product role and the contribution you want the next product to make.</p></details>
          <details><summary>Where can I see OpenLab information?</summary><p>Use the confidence surface above to open the available dossier or browse the records archive. An unavailable state never substitutes another product’s result.</p></details>
          <details><summary>Can I build from this product?</summary><p>Yes. Open Stack Builder or Bundle Builder with this product as the starting decision, then add products by what they contribute.</p></details>
        </div>
      </EditorialSurface>
      <TechnicalSurface
        copy="Customer reviews will appear here when available. In the meantime, compare the exact product facts and available OpenLab records before you decide."
        eyebrow="Customer reviews"
        state="unavailable"
        title="See what customers say when reviews are available."
      >
        <Link href="/reviews">Visit customer reviews</Link>
      </TechnicalSurface>
    </section>
  );
}

function AssuranceAndClosure({ product }: Readonly<{ product: FrontierProductRecord }>) {
  return (
    <>
      <TechnicalSurface
        copy="Product identity, strength, pack information and any available record stay in their correct source context."
        eyebrow="Product assurance"
        title="Confidence stays attached to the decision."
      >
        <AssuranceRail variant="compact" />
      </TechnicalSurface>
      <DecisionSurface
        actions={<div className={styles.actions}><a className={styles.primaryAction} href="#purchase">Choose {product.name}</a><Link className={styles.secondaryAction} href="/shop">Return to the range</Link></div>}
        copy={`Return to the purchase decision, compare nearby products or take ${product.name} into a stronger stack.`}
        eyebrow="Your next move"
        title={`Make ${product.name} the start of a clearer plan.`}
      />
    </>
  );
}

export function PdpCandidateSuite({ candidateId, productSlug }: CandidateProps) {
  const product = productBySlug[productSlug];
  const presentation = frontierProductPresentation(product);
  const candidate = PDP_CANDIDATES[candidateId];
  const evidenceFirst = candidateId === "confidence-workspace";
  const comparisonFirst = candidateId === "guided-decision";

  return (
    <main
      className={styles.page}
      data-candidate={candidateId}
      data-candidate-status={candidate.status}
      data-owner-selected="false"
      data-product={productSlug}
    >
      <div className={styles.shell}>
        <Breadcrumbs items={[{ label: "Shop", href: "/shop" }, { label: product.family, href: "/shop" }, { label: product.name }]} />
        <ProductDecision candidateId={candidateId} product={product} productSlug={productSlug} />
        <section className={styles.lowerSection}><TechnicalSurface compact copy="Product and evidence statements stay connected to their source context throughout the page." eyebrow="Decision assurance" title="Clear facts before the next click."><AssuranceRail variant="compact" /></TechnicalSurface></section>
        {evidenceFirst ? <OpenLabConfidence expanded product={product} productSlug={productSlug} /> : null}
        <section className={styles.lowerSection}><ProductStory product={product} productSlug={productSlug} /></section>
        {comparisonFirst ? <section className={styles.lowerSection}><ProductComparison product={product} /></section> : null}
        {!evidenceFirst ? <OpenLabConfidence expanded={false} product={product} productSlug={productSlug} /> : null}
        {!comparisonFirst ? <section className={styles.lowerSection}><ProductComparison product={product} /></section> : null}
        <section className={styles.lowerSection}><StackBundleEntry productSlug={productSlug} /></section>
        <section className={styles.lowerSection}><RelatedProducts product={product} /></section>
        <section className={styles.lowerSection}><QuestionsAndReviews product={product} /></section>
        <section className={styles.lowerSection}><AssuranceAndClosure product={product} /></section>
      </div>
      <MobileDecisionSummary product={presentation} />
    </main>
  );
}
