import { SiteFooter } from "../experience-lab";
import { CurrencyEqualityLock, LifecycleAmountRecord } from "./payment-trust";
import { ProductCommerceCard } from "./product-commerce-card";
import { SiteHeader } from "./site-header";
import { ProductDecisionHero } from "./product-decision-hero";
import { ProductDossier } from "./product-dossier";
import { mk2866Fixture } from "./product-fixtures";
import { PurchasePanel } from "./purchase-panel";
import { MobileDecisionSummary, ProductDetailDisclosure, ProductEvidenceSnapshot, ProductMediaGallery } from "./pdp-sections";
import { GrowthModules, ProductContinuation, ProductHero, ProductNarrative, StackExplorer } from "./frontier-sections";
import { productBySlug } from "./frontier-content";
import { EvidenceRecordExplainer, OpenLabComparison, OpenLabMethodologyPipeline, OpenLabPortalHero, OpenLabRegistryArchive, OpenLabSourceChain } from "./openlab-sections";
import {
  AnalyteTable,
  CheckoutStepIndicator,
  CustodyTimeline,
  EvidenceStatusChip,
  RecommendationCard,
  RestockCard,
  UnavailableEvidencePanel,
  UpsellContextRail,
} from "./program-components";
import styles from "../review-studio/review-studio.module.css";

const recommendationStates = ["default", "selected", "added", "unavailable", "out-of-stock"] as const;
const restockStates = ["active", "due-soon", "overdue", "paused"] as const;
const evidenceStates = ["verified-evidence", "source-reported", "source-only", "unavailable"] as const;
const checkoutSteps = ["information", "delivery", "review", "payment", "confirmation"] as const;

export function ReviewStudioGallery({ groupId }: { groupId: string }) {
  if (groupId === "shell-wayfinding") return <div className={styles.gallery}><div className={styles.shellSpecimen}><SiteHeader route="reviews" /></div><div className={styles.shellSpecimen}><SiteFooter /></div></div>;
  if (groupId === "commerce-decision") return <div className={styles.gallery}><ProductHero product={productBySlug["mk-2866"]}/><ProductNarrative product={productBySlug["mk-2866"]}/><ProductContinuation product={productBySlug["rad-140"]}/><ProductDecisionHero product={mk2866Fixture}/><ProductMediaGallery product={mk2866Fixture}/><PurchasePanel product={mk2866Fixture}/><ProductDetailDisclosure product={mk2866Fixture}/><ProductCommerceCard product={mk2866Fixture} variant="vertical"/><ProductDossier product={mk2866Fixture}/><ProductEvidenceSnapshot product={mk2866Fixture}/><MobileDecisionSummary product={mk2866Fixture}/></div>;
  if (groupId === "growth-continuation") return <div className={styles.gallery}><StackExplorer/><GrowthModules/><div className={styles.stateGrid}>{recommendationStates.map((state)=><RecommendationCard key={state} state={state}/>)}</div><div className={styles.stateGrid}>{restockStates.map((state)=><RestockCard key={state} state={state}/>)}</div><UpsellContextRail/></div>;
  if (groupId === "evidence-openlab") return <div className={styles.gallery}><div className={styles.atomRow}>{evidenceStates.map((state)=><EvidenceStatusChip key={state} state={state}/>)}</div><OpenLabPortalHero/><EvidenceRecordExplainer/><OpenLabRegistryArchive/><OpenLabMethodologyPipeline/><OpenLabSourceChain/><OpenLabComparison/><UnavailableEvidencePanel title="Source unavailable" copy="The original source is not registered; no substitute result is shown."/><AnalyteTable/><CustodyTimeline/></div>;
  return <div className={styles.gallery}><div className={styles.stateGrid}>{checkoutSteps.map((step)=><CheckoutStepIndicator current={step} key={step}/>)}</div><CurrencyEqualityLock/><LifecycleAmountRecord stage="confirmation"/><LifecycleAmountRecord stage="receipt"/></div>;
}
