import { CustomerSiteChrome, GovernedProgramShell } from "./experience-lab";
import { AnalyteTable, CustodyTimeline, RecommendationCard, ReportIdentityHeader, UnavailableEvidencePanel, UpsellContextRail, type CheckoutStep } from "./design-system/program-components";
import { canOpenOriginal, exactPurityAverage, mk2866OpenLabProjection, reportCount } from "./design-system/openlab-authority";
import { TransactionPresentation, type TransactionStage } from "./design-system/transaction-presentation";
import styles from "./program-routes.module.css";

function Hero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) { return <section className={styles.hero}><div className={styles.shell}><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div></section>; }
function Card({ title, copy, children }: { title: string; copy: string; children?: React.ReactNode }) { return <article className={styles.card}><h2>{title}</h2><p>{copy}</p>{children}</article>; }

export function OpenLabCompoundPage({ slug }: { slug: string }) { const known=slug === "mk-2866"; const reports=known?[mk2866OpenLabProjection]:[]; const average=exactPurityAverage(reports); return <GovernedProgramShell><Hero eyebrow="OPENLAB · COMPOUND" title={known ? "MK-2866 / Ostarine" : "Compound record unavailable"} copy="Commercial identity and analytical specimen identity remain separate. This dossier never infers a result from catalogue copy."/><section className={styles.section}><div className={`${styles.shell} ${styles.grid}`}><ReportIdentityHeader state={known?"source-reported":"unavailable"}/><Card title="Report coverage" copy={`${reportCount(reports)} report-level record. Multi-analyte rows do not increase this count.`}/><AnalyteTable rows={mk2866OpenLabProjection.analytes.map(({analyte,value,unit})=>({analyte,value:String(value),unit}))}/><CustodyTimeline/><Card title="Purity history" copy={average === null ? "The source-owned value is a threshold (>99%), so no exact-value average is calculated." : `Exact-value average: ${average}%`}/>{canOpenOriginal(mk2866OpenLabProjection)?<a className={styles.button} href={mk2866OpenLabProjection.reportSource.value!}>Open original source</a>:<UnavailableEvidencePanel title="Original source unavailable" copy="No registered source URL or PDF is available for this report-level record."/>}<RecommendationCard state="default"/></div></section></GovernedProgramShell>; }

export function OpenLabReportPage({ batchId }: { batchId: string }) { return <GovernedProgramShell><Hero eyebrow="OPENLAB · REPORT" title={`Report ${batchId}`} copy="Original-first report presentation with field-level provenance and explicit absence."/><section className={styles.section}><div className={`${styles.shell} ${styles.grid}`}><ReportIdentityHeader state="unavailable"/><UnavailableEvidencePanel title="Report preview unavailable" copy="No original report is registered. No generated instrument graph or reconstructed chromatogram is shown in its place."/><AnalyteTable/><UnavailableEvidencePanel title="Method unavailable" copy="No source-owned analytical method is registered for this report."/><CustodyTimeline/></div></section></GovernedProgramShell>; }

export function OpenLabAdminPage() { return <GovernedProgramShell><Hero eyebrow="OWNER REVIEW · NOT PUBLIC" title="OpenLab command centre." copy="This surface is a private Sites specimen. Identity, authorization and operational data contracts are not approved for Shopper SSR."/><section className={styles.section}><div className={`${styles.shell} ${styles.grid3}`}><Card title="Registry health" copy="Owner-only placeholder; no live operational feed."/><Card title="Source coverage" copy="Owner-only placeholder; no inferred completeness."/><Card title="Review queue" copy="Owner-only placeholder; no public actions."/></div></section></GovernedProgramShell>; }

const checkoutStageMap: Record<CheckoutStep, TransactionStage> = {
  information: "details",
  delivery: "delivery",
  review: "review",
  payment: "order-pay",
  confirmation: "confirmation",
};

export function CheckoutProgramPage({ step }: { step: CheckoutStep }) {
  return (
    <CustomerSiteChrome route="checkout">
      <main data-live-authority="false">
        <TransactionPresentation stage={checkoutStageMap[step]} />
      </main>
    </CustomerSiteChrome>
  );
}

export function CheckoutProcessingPage() { return <CustomerSiteChrome route="checkout"><main data-live-authority="false"><TransactionPresentation stage="processing" /></main></CustomerSiteChrome>; }
export function CheckoutTrackingPage() { return <CustomerSiteChrome route="checkout"><main data-live-authority="false"><TransactionPresentation stage="tracking" /></main></CustomerSiteChrome>; }
export function GrowthRailPage() { return <GovernedProgramShell><Hero eyebrow="PRODUCT CONTINUATION" title="Recommendations and restock, kept together." copy="Explore related products or return to a future restock decision without interrupting the first purchase choice."/><section className={styles.section}><div className={styles.shell}><UpsellContextRail/></div></section></GovernedProgramShell>; }
