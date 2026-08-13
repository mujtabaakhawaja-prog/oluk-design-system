/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- the comparison table is an intentional keyboard-reachable horizontal scroller. */

import type { ReactNode } from "react";

import { AssuranceRail } from "./assurance-rail";
import { ActionLink, Arrow, Chevron, SectionHeading } from "./customer-route-primitives";
import type { EvidenceRecordPresentation } from "./evidence-record-fixtures";
import { selectedEvidenceRecord } from "./evidence-record-fixtures";
import { PresentationState } from "./presentation-state";
import { ProductCommerceCard } from "./product-commerce-card";
import { ProductDossier } from "./product-dossier";
import { mk2866Fixture, rad140Fixture } from "./product-fixtures";
import { EvidenceStatusChip } from "./program-components";
import styles from "./openlab-sections.module.css";

export const openLabPortalEntries = [
  { index: "01", title: "Lab Records", copy: "Browse the record index.", href: "/open-lab/records" },
  { index: "02", title: "Batch Lookup", copy: "Check a product or batch reference.", href: "/open-lab/batch-lookup" },
  { index: "03", title: "Methodology", copy: "Understand the evidence vocabulary.", href: "/open-lab/methodology" },
  { index: "04", title: "Source Chain", copy: "Follow product identity toward a report.", href: "/open-lab/source-chain" },
  { index: "05", title: "Compare", copy: "Compare product facts and record availability.", href: "/open-lab/compare" },
  { index: "06", title: "EvidenceOS", copy: "See how the evidence pathway fits together.", href: "/about/evidence-os" },
] as const;

export const methodologyStages = [
  ["01", "Identity", "Connect the named product and compound to the record."],
  ["02", "Batch context", "Keep the finished-product reference attached when supplied."],
  ["03", "Source review", "Present the named source and its supplied scope."],
  ["04", "Method", "Keep the stated analytical method distinct from product copy."],
  ["05", "Result", "Render analytical values exactly as supplied by the record."],
  ["06", "Customer projection", "Carry source context into a readable OpenLab presentation."],
] as const;

export const sourceChainStages = [
  ["01", "Product", "Label identity and product specifications"],
  ["02", "Batch", "The finished production reference, when supplied"],
  ["03", "Laboratory", "The named analytical source on the report"],
  ["04", "Report", "The original document and its stated scope"],
  ["05", "OpenLab", "The customer-facing projection of that source"],
  ["06", "Product decision", "A direct route back to the matching product"],
] as const;

export function OpenLabPortalHero() {
  return <section className={styles.portalHero} data-module="OpenLabPortalHero"><div className={styles.shell}><div className={styles.portalGrid}><div><span className="eyebrow">OPENLAB</span><h1>Independent evidence, connected to every product.</h1><p>Move from product facts into records, methodology and source context without losing the commerce relationship.</p><div className={styles.lenses} role="list" aria-label="OpenLab experience lenses"><span role="listitem">Technical</span><span role="listitem">Product evidence</span><span role="listitem">Commerce</span></div><div className="button-row"><ActionLink href="/open-lab/records">Browse Lab Records</ActionLink><ActionLink href="/open-lab/methodology" secondary>Explore methodology</ActionLink></div></div><ProductCommerceCard className={styles.portalProduct} headingLevel="h2" product={mk2866Fixture} showQualitative={false} variant="vertical"/></div></div></section>;
}

export function OpenLabWayfinding() {
  return <section className={styles.section} data-module="OpenLabWayfinding"><div className={styles.shell}><SectionHeading copy="Enter through a product, an exact reference, the testing method or a side-by-side comparison." eyebrow="CHOOSE THE WAY IN" title="One evidence system. Four clear paths."/><div className={styles.wayfinding}>{openLabPortalEntries.map((entry)=><a href={entry.href} key={entry.title}><span>{entry.index}</span><h3>{entry.title}</h3><p>{entry.copy}</p><Arrow/></a>)}</div></div></section>;
}

export function EvidenceRecordExplainer() {
  return <section className={styles.section} data-module="EvidenceRecordExplainer"><div className={styles.shell}><SectionHeading copy="The same structure carries from archive to record detail and back into the product decision." eyebrow="RECORD ANATOMY" title="What an OpenLab record contains."/><AssuranceRail/></div></section>;
}

export function OpenLabStateLegend() {
  return <section className={styles.legend} data-module="OpenLabStateLegend" aria-label="Evidence state legend">{(["verified-evidence","source-reported","source-only","unavailable"] as const).map((state)=><EvidenceStatusChip key={state} state={state}/>)}</section>;
}

export function OpenLabRegistryArchive({ record = selectedEvidenceRecord }: { record?: EvidenceRecordPresentation }) {
  return <section className={styles.section} data-module="OpenLabRegistryArchive"><div className={`${styles.shell} ${styles.archive}`}><aside className={styles.searchCard}><span className="eyebrow">SEARCH RECORDS</span><h2>Find an exact product or record reference.</h2><label htmlFor="record-search">Product or record reference</label><input id="record-search" placeholder="e.g. MK-2866" type="search"/><button className="button" disabled type="button">Search records</button><a href="/open-lab/batch-lookup">Have a batch number? <Arrow/></a></aside><div className={styles.registry}><OpenLabStateLegend/><article className={styles.registryRow} data-live-authority="false"><div><span className="eyebrow">PRODUCT RECORD PATH</span><h2>{record.product.name}</h2><p>{record.product.alias} · {record.product.strength} · {record.product.servings}</p></div><dl><dt>Record</dt><dd>Unavailable</dd></dl><EvidenceStatusChip state="unavailable"/><a href={record.customerPath}>Open state <Arrow/></a></article><PresentationState className={styles.registryState} state="unavailable"/></div></div></section>;
}

export function OpenLabRecordDetail({ record = selectedEvidenceRecord }: { record?: EvidenceRecordPresentation }) {
  return <section className={styles.section} data-module="OpenLabRecordDetail"><div className={`${styles.shell} ${styles.recordDetail}`}><div><PresentationState action={<><ActionLink href="/open-lab/records">Return to records</ActionLink><ActionLink href="/open-lab/source-chain" secondary>View source chain</ActionLink></>} state="unavailable"/><article className={styles.factCard}><span className="eyebrow">CURRENT DETAIL</span><dl><div><dt>Product</dt><dd>{record.product.name}</dd></div><div><dt>SKU</dt><dd>{record.product.sku}</dd></div><div><dt>Published</dt><dd>Unavailable</dd></div><div><dt>Result</dt><dd>Unavailable</dd></div></dl></article></div><aside className={styles.productBridge}><span className="eyebrow">CONNECTED PRODUCT</span><h2>{record.product.name}</h2><p>{record.product.alias} · {record.product.strength} · {record.product.servings} · {record.product.purity}</p><a href={record.product.customerPath}>View product · {record.product.price} <Arrow/></a><a href="/open-lab/dossier/mk-2866">Open product dossier <Arrow/></a></aside></div></section>;
}

export function OpenLabDossierComposition() {
  return <div data-module="OpenLabDossierComposition"><ProductDossier evidenceHref="#dossier-record-state" id="dossier" product={mk2866Fixture}/><section className={styles.section} id="dossier-record-state"><div className={styles.shell}><PresentationState action={<><ActionLink href="/open-lab/records">Browse records</ActionLink><ActionLink href="/open-lab/methodology" secondary>Read methodology</ActionLink></>} state="unavailable"/></div></section><section className={styles.section}><div className={styles.shell}><ProductCommerceCard contextKicker="RETURN TO COMMERCE" product={mk2866Fixture} secondaryHref={mk2866Fixture.customerPath} secondaryLabel="Return to MK-2866" showQualitative={false} variant="relation"/></div></section></div>;
}

export function OpenLabMethodologyPipeline() {
  return <section className={styles.section} data-module="OpenLabMethodologyPipeline"><div className={styles.shell}><div className={styles.pipeline}>{methodologyStages.map(([index,title,copy])=><article key={title}><span>{index}</span><h2>{title}</h2><p>{copy}</p><a href="/open-lab/records">View record states <Arrow/></a></article>)}</div></div></section>;
}

export function OpenLabSourceChain() {
  return <section className={styles.section} data-module="OpenLabSourceChain"><div className={styles.shell}><div className={styles.chain}>{sourceChainStages.map(([index,title,copy])=><article key={title}><span>{index}</span><div><h2>{title}</h2><p>{copy}</p></div><Chevron/></article>)}</div></div></section>;
}

export function OpenLabComparison() {
  return <section className={styles.section} data-module="OpenLabComparison"><div className={`${styles.shell} ${styles.compare}`}><span className="eyebrow">COMPARISON TOOL</span><div className={styles.tableScroller} role="region" aria-label="Scrollable product comparison" tabIndex={0}><table><caption className="sr-only">Product facts and evidence availability comparison</caption><thead><tr><th scope="col">Field</th><th scope="col">MK-2866</th><th scope="col">RAD-140</th></tr></thead><tbody><tr><th scope="row">Series</th><td>{mk2866Fixture.series}</td><td>{rad140Fixture.series}</td></tr><tr><th scope="row">Strength</th><td>{mk2866Fixture.strength}</td><td>{rad140Fixture.strength}</td></tr><tr><th scope="row">Servings</th><td>{mk2866Fixture.servings}</td><td>{rad140Fixture.servings}</td></tr><tr><th scope="row">Label purity</th><td>{mk2866Fixture.purity}</td><td>{rad140Fixture.purity}</td></tr><tr><th scope="row">Evidence detail</th><td><EvidenceStatusChip state="unavailable"/></td><td><EvidenceStatusChip state="unavailable"/></td></tr><tr><th scope="row">Product path</th><td><a href="/product/mk-2866">View product</a></td><td><a href="/shop?family=sarms">View family</a></td></tr></tbody></table></div></div></section>;
}

export function OpenLabUnavailableBoundary({ children }: { children?: ReactNode }) {
  return <section className={styles.section} data-module="OpenLabUnavailableBoundary"><div className={styles.shell}><PresentationState action={children} copy="Batch, laboratory, document and result details remain explicit whenever the current projection has no value." state="unavailable"/></div></section>;
}
