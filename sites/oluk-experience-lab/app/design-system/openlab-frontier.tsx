/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- technical tables are intentional keyboard-reachable horizontal scrollers. */
import Link from "next/link";

import { DecisionSurface, EditorialSurface, TechnicalSurface } from "./content-surfaces";
import { ActionLink } from "./customer-route-primitives";
import { OpenLabProductExperience } from "./openlab-product-experience";
import openLabExperience from "./openlab-product-depth.json";
import productCatalogue from "./product-experience-catalog.json";
import { EvidenceStatusChip } from "./program-components";
import { YourStackBuilder } from "./your-stack-builder";
import styles from "./openlab-frontier.module.css";

export const openLabFrontierTools = [
  "evidence",
  "compound-guide",
  "stack-builder",
  "dosing-calculator",
  "cycle-planner",
  "interaction-checker",
  "research-papers",
  "case-studies",
  "glossary",
  "lab-partner",
] as const;

export type OpenLabFrontierTool = (typeof openLabFrontierTools)[number];
export type OpenLabToolMaturity = "SITES_FROZEN" | "DESIGN_INCOMPLETE";

export const openLabToolMaturity: Readonly<Record<OpenLabFrontierTool, OpenLabToolMaturity>> = {
  evidence: "SITES_FROZEN",
  "compound-guide": "SITES_FROZEN",
  "stack-builder": "SITES_FROZEN",
  "dosing-calculator": "DESIGN_INCOMPLETE",
  "cycle-planner": "DESIGN_INCOMPLETE",
  "interaction-checker": "DESIGN_INCOMPLETE",
  "research-papers": "DESIGN_INCOMPLETE",
  "case-studies": "DESIGN_INCOMPLETE",
  glossary: "DESIGN_INCOMPLETE",
  "lab-partner": "DESIGN_INCOMPLETE",
};

const nav = [
  ["Evidence", "/open-lab/evidence", "evidence"],
  ["Compound guide", "/open-lab/compound-guide", "compound-guide"],
  ["Stack builder", "/open-lab/stack-builder", "stack-builder"],
  ["Dose calculator", "/open-lab/dosing-calculator", "dosing-calculator"],
  ["Cycle planner", "/open-lab/cycle-planner", "cycle-planner"],
  ["Interaction checker", "/open-lab/interaction-checker", "interaction-checker"],
  ["Research papers", "/open-lab/research-papers", "research-papers"],
  ["Case studies", "/open-lab/case-studies", "case-studies"],
  ["Glossary", "/open-lab/glossary", "glossary"],
  ["Lab partner", "/open-lab/lab-partner", "lab-partner"],
] as const;

const featuredProductSlugs = ["mk-2866", "rad-140", "mk-677", "ment", "gw-501516"] as const;
const featuredProducts = productCatalogue.products.filter(({ product }) =>
  featuredProductSlugs.includes(product.slug as (typeof featuredProductSlugs)[number]),
);

const incompleteToolCopy: Readonly<Record<Exclude<OpenLabFrontierTool, "evidence" | "compound-guide" | "stack-builder">, Readonly<{
  eyebrow: string;
  title: string;
  copy: string;
  alternative: string;
}>>> = {
  "dosing-calculator": {
    eyebrow: "PRODUCT FORMAT",
    title: "Start with labelled product facts.",
    copy: "A source-backed calculator is not published here. Compare the labelled strength and servings on each product without turning them into an invented schedule.",
    alternative: "Use the Compound Guide to compare formats, then open the exact product before making a purchase decision.",
  },
  "cycle-planner": {
    eyebrow: "PLANNING",
    title: "Keep product selection separate from a personal schedule.",
    copy: "A guided planning experience is not published here. OpenLab currently supports product identity, available records and source context—not personalised duration or dosing output.",
    alternative: "Use Compare for product facts and the Stack Builder for a stronger product composition without a fabricated timeline.",
  },
  "interaction-checker": {
    eyebrow: "PRODUCT COMPARISON",
    title: "Compare each product on its own facts.",
    copy: "A combined-use recommendation is not published here. OpenLab does not infer compatibility from product labels or from another product's analytical record.",
    alternative: "Compare products side by side, then open each available record independently.",
  },
  "research-papers": {
    eyebrow: "SOURCE LIBRARY",
    title: "A curated reading library is still being assembled.",
    copy: "OpenLab will not present invented paper counts, reading times or unsupported collections. Current source actions remain attached to the records that actually supply them.",
    alternative: "Browse current records or read the methodology while the attributed research library is prepared.",
  },
  "case-studies": {
    eyebrow: "PRODUCT STORIES",
    title: "Case studies need attributable source material.",
    copy: "No generic customer or laboratory story is being substituted for a documented case. The current MK-2866 record remains available as the complete source-backed specimen.",
    alternative: "Open the MK-2866 dossier to follow the connected product, batch and source path.",
  },
  glossary: {
    eyebrow: "OPENLAB LANGUAGE",
    title: "Technical definitions are being source-checked.",
    copy: "A complete glossary is not yet published. Current technical terms stay explained beside the record or methodology where their context is clear.",
    alternative: "Read the methodology or open a current record for definitions in context.",
  },
  "lab-partner": {
    eyebrow: "LABORATORY PARTNERS",
    title: "The public partner journey is not yet open.",
    copy: "OpenLab keeps the named laboratory and original source visible on available records. It does not imply an intake programme, service level or partnership workflow that has not been established.",
    alternative: "See how the current source chain preserves laboratory identity and report access.",
  },
};

function ToolNav({ active }: Readonly<{ active: OpenLabFrontierTool }>) {
  return <nav className={styles.toolNav} aria-label="OpenLab tools">
    {nav.map(([label, href, tool]) => <Link aria-current={tool === active ? "page" : undefined} href={href} key={href}>{label}</Link>)}
  </nav>;
}

function PageFrame({ active, children }: Readonly<{ active: OpenLabFrontierTool; children: React.ReactNode }>) {
  return <div className={styles.page} data-design-maturity={openLabToolMaturity[active]} data-openlab-tool={active}>
    <div className={styles.shell}><ToolNav active={active}/>{children}</div>
  </div>;
}

function EvidencePage() {
  return <PageFrame active="evidence">
    <EditorialSurface
      actions={<><ActionLink href="/open-lab/records">Browse current records</ActionLink><ActionLink href="/open-lab/compare" secondary>Compare product confidence</ActionLink></>}
      copy="OpenLab turns the record that actually exists into a clearer product decision. Source-owned values stay attached to their product; missing records become explicit unavailable states."
      eyebrow="OPENLAB EVIDENCE"
      headingLevel="h1"
      title="See what stands behind the product."
    >
      <div className={styles.valueChips} role="list" aria-label="OpenLab customer value">
        <span role="listitem">PRODUCT CONFIDENCE</span><span role="listitem">SOURCE ACCESS</span><span role="listitem">CONNECTED COMMERCE</span>
      </div>
    </EditorialSurface>

    <OpenLabProductExperience variant="compact"/>

    <DecisionSurface
      actions={<><ActionLink href="/open-lab/compare">Compare products</ActionLink><ActionLink href="/open-lab/stack-builder" secondary>Build a stronger stack</ActionLink></>}
      copy="The guide below uses each product's labelled facts and its own OpenLab availability. The MK-2866 record is never copied into another product."
      eyebrow="PRODUCT AVAILABILITY"
      title="Keep product truth and evidence availability side by side."
    >
      <ProductAvailabilityList/>
    </DecisionSurface>
  </PageFrame>;
}

function CompoundGuide() {
  return <PageFrame active="compound-guide">
    <EditorialSurface
      actions={<><ActionLink href="/open-lab/compare">Compare products</ActionLink><ActionLink href="/open-lab/stack-builder" secondary>Build a stronger stack</ActionLink></>}
      copy="Move from customer-relevant product direction into the labelled format, the product page and whatever OpenLab record is genuinely available."
      eyebrow="COMPOUND GUIDE"
      headingLevel="h1"
      title="Choose the product direction. Then inspect the facts."
    />
    <DecisionSurface
      copy="Cardarine keeps its customer-facing GW-50156 identity alongside the exact strength, servings, price and OpenLab availability supplied for each product."
      eyebrow="FEATURED PRODUCT DIRECTIONS"
      title="Compare formats without borrowing another product's record."
    >
      <div className={styles.guideGrid}>{featuredProducts.map(({ product, editorial, openLab }) => {
        const available = openLab.status === "available";
        return <article className={styles.guideCard} key={product.slug}>
          <div className={styles.cardHeader}><span>{product.series}</span><EvidenceStatusChip state={available ? "source-reported" : "unavailable"}/></div>
          <h2>{product.name}</h2>
          <p className={styles.alias}>{product.alias}</p>
          <p>{editorial.customerProposition.mobileSummary}</p>
          <dl>
            <div><dt>Strength</dt><dd>{product.strength}</dd></div>
            <div><dt>Servings</dt><dd>{product.servings || "Not supplied"}</dd></div>
            <div><dt>Price</dt><dd>{product.price}</dd></div>
            <div><dt>OpenLab record</dt><dd>{available ? "Available" : "Unavailable"}</dd></div>
          </dl>
          <div className={styles.cardActions}><Link href={`/product/${product.slug}`}>View product →</Link><Link href={`/open-lab/compound/${product.slug}`}>{available ? "Open record" : "View availability"} →</Link></div>
        </article>;
      })}</div>
    </DecisionSurface>
  </PageFrame>;
}

function ProductAvailabilityList() {
  return <div className={styles.availabilityList} role="list">{featuredProducts.map(({ product, openLab }) => {
    const available = openLab.status === "available";
    return <article key={product.slug} role="listitem">
      <div><span>{product.series}</span><h2>{product.name}</h2><p>{product.alias} · {product.strength}{product.servings ? ` · ${product.servings}` : ""}</p></div>
      <EvidenceStatusChip state={available ? "source-reported" : "unavailable"}/>
      <Link href={`/open-lab/compound/${product.slug}`}>{available ? "Open record" : "View availability"} →</Link>
    </article>;
  })}</div>;
}

function StackBuilder() {
  return <YourStackBuilder host="standalone"/>;
}

function DesignIncompletePage({ tool }: Readonly<{ tool: Exclude<OpenLabFrontierTool, "evidence" | "compound-guide" | "stack-builder"> }>) {
  const content = incompleteToolCopy[tool];
  return <PageFrame active={tool}>
    <EditorialSurface
      actions={<><ActionLink href="/open-lab/records">Browse current records</ActionLink><ActionLink href="/open-lab/compare" secondary>Compare products</ActionLink></>}
      copy={content.copy}
      eyebrow={content.eyebrow}
      headingLevel="h1"
      title={content.title}
    />
    <TechnicalSurface
      actions={<><ActionLink href="/open-lab/compound/mk-2866">Open the MK-2866 dossier</ActionLink><ActionLink href="/product/mk-2866" secondary>Return to product</ActionLink></>}
      copy={content.alternative}
      eyebrow="CURRENT OPENLAB PATH"
      state="unavailable"
      title="Use the source-backed experience available now."
    >
      <dl className={styles.stateList}>
        <div><dt>Product facts</dt><dd>Available</dd></div>
        <div><dt>Current records</dt><dd>Available</dd></div>
        <div><dt>Source-backed guided output</dt><dd>Unavailable</dd></div>
        <div><dt>Product return path</dt><dd>Available</dd></div>
      </dl>
    </TechnicalSurface>
  </PageFrame>;
}

export function CoaViewer({ id }: Readonly<{ id: string }>) {
  return <div className={styles.page} data-openlab-source-policy="OpenLabPublicProjection.v2-only">
    <div className={styles.shell}>
      <EditorialSurface
        actions={<><ActionLink href={openLabExperience.record.sourceAction.href}>Open original report</ActionLink><ActionLink href="/product/mk-2866" secondary>View MK-2866</ActionLink></>}
        copy="Review the product identity, batch, named laboratory and supplied analytical values together. No method, trend or additional result is reconstructed."
        eyebrow="CERTIFICATE VIEWER"
        headingLevel="h1"
        title="A source-connected MK-2866 record."
      />
      <div className={styles.documentGrid}>
        <TechnicalSurface copy="These identifiers come from the current compiled record." eyebrow="RECORD IDENTITY" title={`Report ${id.toUpperCase()}`}>
          <dl className={styles.stateList}>
            <div><dt>Product</dt><dd>MK-2866</dd></div>
            <div><dt>Batch</dt><dd>{openLabExperience.record.batchCode}</dd></div>
            <div><dt>Laboratory</dt><dd>{openLabExperience.record.labName}</dd></div>
            <div><dt>Test date</dt><dd>{openLabExperience.record.testedAt}</dd></div>
          </dl>
        </TechnicalSurface>
        <TechnicalSurface
          actions={<><ActionLink href="/open-lab/compare">Compare products</ActionLink><ActionLink href="/open-lab/stack-builder" secondary>Build a stronger stack</ActionLink></>}
          copy="The label and reported concentration remain separate supplied values so the customer can read the comparison exactly as provided."
          eyebrow="SUPPLIED VALUES"
          title="Read the result in product context."
        >
          <div className={styles.tableScroller} role="region" aria-label="MK-2866 supplied analytical values" tabIndex={0}>
            <table><caption className="sr-only">MK-2866 source-owned values</caption><thead><tr><th scope="col">Field</th><th scope="col">Supplied value</th></tr></thead><tbody>
              <tr><th scope="row">Reported purity</th><td>{openLabExperience.analytes[0].purity.displayValue}</td></tr>
              <tr><th scope="row">Label claim</th><td>{openLabExperience.analytes[0].concentration.labelClaimDisplayValue}</td></tr>
              <tr><th scope="row">Reported concentration</th><td>{openLabExperience.analytes[0].concentration.displayValue}</td></tr>
              <tr><th scope="row">Availability</th><td>{openLabExperience.record.availabilityState}</td></tr>
            </tbody></table>
          </div>
        </TechnicalSurface>
      </div>
    </div>
  </div>;
}

export function OpenLabFrontierPage({ tool }: Readonly<{ tool: OpenLabFrontierTool }>) {
  if (tool === "evidence") return <EvidencePage/>;
  if (tool === "compound-guide") return <CompoundGuide/>;
  if (tool === "stack-builder") return <StackBuilder/>;
  return <DesignIncompletePage tool={tool}/>;
}
