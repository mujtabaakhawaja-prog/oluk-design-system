/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- the comparison table is an intentional keyboard-reachable horizontal scroller. */

import type { ReactNode } from "react";

import { AssuranceRail } from "./assurance-rail";
import { EditorialSurface, DecisionSurface, TechnicalSurface } from "./content-surfaces";
import { ActionLink, Arrow, Chevron } from "./customer-route-primitives";
import type { EvidenceRecordPresentation } from "./evidence-record-fixtures";
import { selectedEvidenceRecord } from "./evidence-record-fixtures";
import { PresentationState } from "./presentation-state";
import { ProductCommerceCard } from "./product-commerce-card";
import { ProductDossier } from "./product-dossier";
import { getFrontierProduct } from "./frontier-content";
import { createProductRelationship, mk2866Fixture, rad140Fixture } from "./product-fixtures";
import { OpenLabProductExperience } from "./openlab-product-experience";
import { EvidenceStatusChip } from "./program-components";
import styles from "./openlab-sections.module.css";

export const openLabPortalEntries = [
  { index: "01", title: "Lab records", copy: "See which products have a connected record and source path.", href: "/open-lab/records" },
  { index: "02", title: "Batch lookup", copy: "Start with the exact product, batch or report reference.", href: "/open-lab/batch-lookup" },
  { index: "03", title: "Methodology", copy: "Understand how labels, batches and reports stay distinct.", href: "/open-lab/methodology" },
  { index: "04", title: "Source chain", copy: "Follow a product from its format to the supplied report.", href: "/open-lab/source-chain" },
  { index: "05", title: "Compare products", copy: "Put product facts and record availability side by side.", href: "/open-lab/compare" },
  { index: "06", title: "Stack Builder", copy: "Use product confidence while building a stronger composition.", href: "/open-lab/stack-builder" },
] as const;

export const methodologyStages = [
  ["01", "Identity", "Connect the named product and compound to the record."],
  ["02", "Batch context", "Keep the finished-product reference attached when supplied."],
  ["03", "Source review", "Present the named source and its supplied scope."],
  ["04", "Method", "Keep the stated analytical method distinct from product copy."],
  ["05", "Result", "Render analytical values exactly as supplied by the record."],
  ["06", "Clear customer view", "Carry the source context into a record customers can read and revisit."],
] as const;

export const sourceChainStages = [
  ["01", "Product", "Label identity and product specifications"],
  ["02", "Batch", "The finished production reference, when supplied"],
  ["03", "Laboratory", "The named analytical source on the report"],
  ["04", "Report", "The original document and its stated scope"],
  ["05", "OpenLab", "The customer-facing projection of that source"],
  ["06", "Product decision", "A direct link back to the matching product"],
] as const;

export function OpenLabPortalHero() {
  return <section className={styles.portalHero} data-module="OpenLabPortalHero"><div className={styles.shell}><div className={styles.portalGrid}><EditorialSurface actions={<><ActionLink href="/open-lab/records">Browse lab records</ActionLink><ActionLink href="/open-lab/stack-builder" secondary>Build a stronger stack</ActionLink></>} copy="Move from the product into its available batch record, source context and comparison view—then return to the product decision with more confidence." eyebrow="OPENLAB" headingLevel="h1" title="Product confidence, made visible."><div className={styles.lenses} role="list" aria-label="OpenLab customer value"><span role="listitem">PRODUCT CONFIDENCE</span><span role="listitem">SOURCE ACCESS</span><span role="listitem">CONNECTED COMMERCE</span></div></EditorialSurface><ProductCommerceCard className={styles.portalProduct} headingLevel="h2" product={mk2866Fixture} variant="vertical"/></div></div></section>;
}

export function OpenLabWayfinding() {
  return <section className={styles.section} data-module="OpenLabWayfinding"><div className={styles.shell}><DecisionSurface copy="Enter through a product, exact reference, source explanation, comparison or stronger multi-product decision." eyebrow="CHOOSE THE WAY IN" title="Start with the question you want OpenLab to answer."><div className={styles.wayfinding}>{openLabPortalEntries.map((entry)=><a href={entry.href} key={entry.title}><span>{entry.index}</span><h3>{entry.title}</h3><p>{entry.copy}</p><Arrow/></a>)}</div></DecisionSurface></div></section>;
}

export function EvidenceRecordExplainer() {
  return <section className={styles.section} data-module="EvidenceRecordExplainer"><div className={styles.shell}><EditorialSurface actions={<ActionLink href="/open-lab/methodology">Learn how to read a record</ActionLink>} copy="Product identity, batch context, source access and reported values stay distinct, making the record useful without turning missing fields into an implied finding." eyebrow="RECORD ANATOMY" title="See exactly what builds product confidence."><AssuranceRail/></EditorialSurface></div></section>;
}

export function OpenLabStateLegend() {
  return <section className={styles.legend} data-module="OpenLabStateLegend" aria-label="Evidence state legend">{(["verified-evidence","source-reported","source-only","unavailable"] as const).map((state)=><EvidenceStatusChip key={state} state={state}/>)}</section>;
}

export function OpenLabRegistryArchive({ record = selectedEvidenceRecord }: { record?: EvidenceRecordPresentation }) {
  return <section className={styles.section} data-module="OpenLabRegistryArchive"><div className={`${styles.shell} ${styles.archive}`}><DecisionSurface className={styles.searchCard} compact copy="Use a product, batch or report reference to find the exact connected record." eyebrow="SEARCH RECORDS" title="Start with the reference in front of you."><label htmlFor="record-search">Product or record reference</label><input id="record-search" placeholder="e.g. MK-2866" type="search"/><button className="button" disabled type="button">Search records</button><a href="/open-lab/batch-lookup">Have a batch number? <Arrow/></a></DecisionSurface><TechnicalSurface actions={<><ActionLink href={record.customerPath}>View {record.product.name}</ActionLink><ActionLink href="/open-lab/compare" secondary>Compare availability</ActionLink></>} className={styles.registry} copy="Product facts remain useful even when a connected record is unavailable; OpenLab keeps the missing evidence state explicit." eyebrow="PRODUCT RECORD PATH" state="unavailable" title={`${record.product.name} record availability.`}><OpenLabStateLegend/><div className={styles.registryRow} data-live-authority="false"><div><strong>{record.product.name}</strong><span>{record.product.alias} · {record.product.strength} · {record.product.servings}</span></div><dl><dt>Record</dt><dd>Unavailable</dd></dl><EvidenceStatusChip state="unavailable"/></div><PresentationState className={styles.registryState} state="unavailable"/></TechnicalSurface></div></section>;
}

export function OpenLabRecordDetail({ record = selectedEvidenceRecord }: { record?: EvidenceRecordPresentation }) {
  return <section className={styles.section} data-module="OpenLabRecordDetail"><div className={`${styles.shell} ${styles.recordDetail}`}><TechnicalSurface actions={<><ActionLink href="/open-lab/records">Return to records</ActionLink><ActionLink href="/open-lab/source-chain" secondary>View source chain</ActionLink></>} copy="No source-owned ID, date, method or analytical result is available for this record state. Product facts remain separate and accessible." eyebrow="CURRENT DETAIL" state="unavailable" title="Record detail is unavailable."><PresentationState state="unavailable"/><dl className={styles.factCard}><div><dt>Product</dt><dd>{record.product.name}</dd></div><div><dt>SKU</dt><dd>{record.product.sku}</dd></div><div><dt>Published</dt><dd>Unavailable</dd></div><div><dt>Result</dt><dd>Unavailable</dd></div></dl></TechnicalSurface><DecisionSurface actions={<><ActionLink href={record.product.customerPath}>View product · {record.product.price}</ActionLink><ActionLink href="/open-lab/stack-builder" secondary>Build a stronger stack</ActionLink></>} className={styles.productBridge} compact copy={`${record.product.alias} · ${record.product.strength} · ${record.product.servings} · ${record.product.purity}`} eyebrow="CONNECTED PRODUCT" title={record.product.name}/></div></section>;
}

export function OpenLabDossierComposition({ productSlug = "mk-2866" }: Readonly<{ productSlug?: string }>) {
  const isReferenceProduct = productSlug === "mk-2866";
  const product = getFrontierProduct(productSlug);
  const productReference = product ? { name: product.name, series: product.series, alias: product.alias, strength: product.strength, servings: product.servings } : undefined;
  return <div data-module="OpenLabDossierComposition" data-product-slug={productSlug}>
    {isReferenceProduct ? <ProductDossier evidenceHref="#openlab-product-experience" id="dossier" product={mk2866Fixture}/> : null}
    <OpenLabProductExperience id="openlab-product-experience" product={productReference} productSlug={productSlug}/>
    {isReferenceProduct ? <section className={styles.section}><div className={styles.shell}><ProductCommerceCard product={mk2866Fixture} relationship={createProductRelationship(rad140Fixture, mk2866Fixture, {
      type: "comparison",
      reason: {
        claim: "Return from the record context to the exact MK-2866 product decision.",
        sourceCoordinate: "authority/OPENLAB-RECORDS.json#mk-2866-to-product",
      },
      action: { href: mk2866Fixture.customerPath, label: "Return to MK-2866" },
    })} variant="relation"/></div></section> : null}
  </div>;
}

export function OpenLabMethodologyPipeline() {
  return <section className={styles.section} data-module="OpenLabMethodologyPipeline"><div className={styles.shell}><EditorialSurface actions={<><ActionLink href="/open-lab/records">View record states</ActionLink><ActionLink href="/shop" secondary>Return to products</ActionLink></>} copy="Each stage keeps product copy, source context and reported analytical values in their proper place, so confidence grows without turning absence into a claim." eyebrow="HOW OPENLAB WORKS" title="Follow the evidence relationship from product to record."><div className={styles.pipeline}>{methodologyStages.map(([index,title,copy])=><article key={title}><span>{index}</span><h2>{title}</h2><p>{copy}</p></article>)}</div></EditorialSurface></div></section>;
}

export function OpenLabSourceChain() {
  return <section className={styles.section} data-module="OpenLabSourceChain"><div className={styles.shell}><TechnicalSurface actions={<><ActionLink href="/open-lab/records">Find a record</ActionLink><ActionLink href="/open-lab/stack-builder" secondary>Build a stronger stack</ActionLink></>} copy="The chain makes a technical record persuasive by keeping the exact product, batch and source connected all the way back to the next commerce decision." eyebrow="SOURCE CHAIN" title="See how product confidence is assembled."><div className={styles.chain}>{sourceChainStages.map(([index,title,copy])=><article key={title}><span>{index}</span><div><h2>{title}</h2><p>{copy}</p></div><Chevron/></article>)}</div></TechnicalSurface></div></section>;
}

export function OpenLabComparison() {
  return <section className={styles.section} data-module="OpenLabComparison"><div className={styles.shell}><DecisionSurface actions={<><ActionLink href="/product/mk-2866">View MK-2866</ActionLink><ActionLink href="/open-lab/stack-builder" secondary>Build a stronger stack</ActionLink></>} className={styles.compare} copy="Compare labelled product facts beside each product's own record availability. MK-2866 evidence is never copied into the RAD-140 column." eyebrow="COMPARISON TOOL" title="Put product truth and OpenLab availability side by side."><div className={styles.tableScroller} role="region" aria-label="Scrollable product comparison" tabIndex={0}><table><caption className="sr-only">Product facts and evidence availability comparison</caption><thead><tr><th scope="col">Field</th><th scope="col">MK-2866</th><th scope="col">RAD-140</th></tr></thead><tbody><tr><th scope="row">Series</th><td>{mk2866Fixture.series}</td><td>{rad140Fixture.series}</td></tr><tr><th scope="row">Strength</th><td>{mk2866Fixture.strength}</td><td>{rad140Fixture.strength}</td></tr><tr><th scope="row">Servings</th><td>{mk2866Fixture.servings}</td><td>{rad140Fixture.servings}</td></tr><tr><th scope="row">Label purity</th><td>{mk2866Fixture.purity}</td><td>{rad140Fixture.purity}</td></tr><tr><th scope="row">OpenLab detail</th><td><EvidenceStatusChip state="source-reported"/></td><td><EvidenceStatusChip state="unavailable"/></td></tr><tr><th scope="row">Product path</th><td><a href="/product/mk-2866">View product</a></td><td><a href="/product/rad-140">View product</a></td></tr></tbody></table></div></DecisionSurface></div></section>;
}

export function OpenLabUnavailableBoundary({ children }: { children?: ReactNode }) {
  return <section className={styles.section} data-module="OpenLabUnavailableBoundary"><div className={styles.shell}><TechnicalSurface actions={children} copy="Batch, laboratory, document and result fields stay visibly unavailable whenever the product's current projection supplies no value." eyebrow="OPENLAB AVAILABILITY" state="unavailable" title="Missing evidence is not replaced with product copy."><PresentationState state="unavailable"/></TechnicalSurface></div></section>;
}
