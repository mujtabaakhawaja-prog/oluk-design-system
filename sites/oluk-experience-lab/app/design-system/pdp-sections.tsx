import type { ProductFixture } from "./product-fixtures";
import { mk2866Fixture } from "./product-fixtures";
import { ProductMediaChamber } from "./product-media-chamber";
import { EvidenceStatusChip } from "./program-components";
import styles from "./pdp-sections.module.css";

export type PdpSectionProps = Readonly<{ product?: ProductFixture }>;

export function ProductMediaGallery({ product = mk2866Fixture }: PdpSectionProps) {
  return <section aria-label={`${product.name} product media`} className={styles.gallery} data-component="ProductMediaGallery"><div className={styles.mediaMeta}><span>FINISHED PRODUCT</span>{product.sku ? <span>SKU {product.sku}</span> : <span>SKU unavailable</span>}</div><ProductMediaChamber context="hero" media={product.media} priority/><div className={styles.viewIndex} role="list" aria-label="Available product views"><span aria-current="true" role="listitem">Front</span><span role="listitem">1 OF 1</span></div></section>;
}

export function ProductDetailDisclosure({ product = mk2866Fixture }: PdpSectionProps) {
  const form = product.qualitativeFacts.find((fact) => fact.kind === "form")?.value;
  return <section className={styles.details} data-component="ProductDetailDisclosure" data-copy-surface="technical" id="product-details"><header><span>PRODUCT DETAIL</span><h2>Product facts, kept with their source.</h2><p>Label-bound facts remain separate from analytical results. Missing facts stay unavailable until their owner source is bound.</p></header><div className={styles.disclosureGrid}><details open><summary>Product facts</summary><dl><div><dt>Series</dt><dd>{product.series || "Unavailable"}</dd></div><div><dt>Strength</dt><dd>{product.strength || "Unavailable"}</dd></div><div><dt>Servings</dt><dd>{product.servings || "Unavailable"}</dd></div><div><dt>SKU</dt><dd>{product.sku || "Unavailable"}</dd></div></dl></details><details><summary>Label information</summary><dl><div><dt>Compound</dt><dd>{product.alias || "Unavailable"}</dd></div><div><dt>Form</dt><dd>{form || "Unavailable"}</dd></div><div><dt>Label purity claim</dt><dd>{product.purity || "Unavailable"}</dd></div></dl></details><details><summary>Customer information</summary><p>{product.content?.descriptions.medium ?? "Customer information is unavailable pending editorial approval."}</p></details></div></section>;
}

export function ProductEvidenceSnapshot({ product = mk2866Fixture }: PdpSectionProps) {
  const evidence = product.content?.evidence;
  const available = evidence?.availability === "AVAILABLE";
  return <section className={styles.evidence} data-component="ProductEvidenceSnapshot" data-copy-surface="technical" data-section-id="evidence-snapshot" data-state={available ? "available" : "unavailable"} id="lab-records"><div><span>OPENLAB SNAPSHOT</span><h2>{available ? evidence.statusLabel : "OpenLab record unavailable."}</h2><p>{evidence?.summary ?? "No OpenLab record is currently bound to this product. No other product’s result is used in its place."}</p><a href={product.evidencePath}>{available ? `Open the ${product.name} evidence pathway` : "View OpenLab record availability"} →</a></div><div className={styles.evidenceFacts}><EvidenceStatusChip state={available ? "source-reported" : "unavailable"}/><dl><div><dt>Product</dt><dd>{product.name}</dd></div><div><dt>Compound</dt><dd>{product.alias}</dd></div>{available && evidence.reportedPurity ? <div><dt>Reported purity</dt><dd>{evidence.reportedPurity}</dd></div> : <div><dt>Record</dt><dd>{available ? "Available" : "Unavailable"}</dd></div>}{available && evidence.batchCode ? <div><dt>Batch</dt><dd>{evidence.batchCode}</dd></div> : null}</dl></div></section>;
}

export function ProductContentNarrative({ product = mk2866Fixture }: PdpSectionProps) {
  const content = product.content;
  if (!content?.descriptions.long) return null;
  return <section className={styles.details} data-component="ProductContentNarrative" data-copy-surface="editorial"><header><span>PRODUCT OVERVIEW</span><h2>{content.thesis ?? `${product.name} product overview.`}</h2><p>{content.descriptions.long}</p></header></section>;
}

export function ProductContentFaqs({ product = mk2866Fixture }: PdpSectionProps) {
  const faqs = product.content?.faqs ?? [];
  if (!faqs.length) return null;
  return <section className={styles.details} data-component="ProductContentFaqs" data-copy-surface="technical" id="product-questions"><header><span>PRODUCT QUESTIONS</span><h2>Product and evidence questions.</h2></header><div className={styles.disclosureGrid}>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>;
}

export function MobileDecisionSummary({ product = mk2866Fixture }: PdpSectionProps) {
  return <aside aria-label="Mobile product decision summary" className={styles.mobileDecision} data-component="MobileDecisionSummary"><div><span>{product.name}</span><strong>{product.price.trim() ? product.price : "Price unavailable"}</strong></div><a href="#purchase" style={{ color: "var(--oluk-text-on-inverse)" }}>View purchase options</a></aside>;
}
