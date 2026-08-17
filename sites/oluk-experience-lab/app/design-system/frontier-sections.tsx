/* eslint-disable @next/next/no-img-element -- explicit local product render, dimensions and loading policy are audited. */
import Link from "next/link";
import type { FrontierProductRecord } from "./frontier-content";
import { actualProductMedia, frontierFaq, frontierProducts } from "./frontier-content";
import { EvidenceStatusChip, RecommendationCard, RestockCard } from "./program-components";
import { YourStackBuilder } from "./your-stack-builder";
import { ProductCommerceCard } from "./product-commerce-card";
import { mk2866Fixture } from "./product-fixtures";
import { TransactionPresentation, type TransactionStage } from "./transaction-presentation";
import styles from "./frontier-sections.module.css";

export function FrontierShell({eyebrow,title,children,copy="Make the next choice with clear product facts, focused guidance and direct access to the detail that matters."}:{eyebrow:string;title:string;children:React.ReactNode;copy?:string}){return <main className={styles.page}><header className={styles.hero}><span>{eyebrow}</span><h1>{title}</h1><p>{copy}</p></header>{children}</main>}
export function ProductHero({product}:{product:FrontierProductRecord}){const media=actualProductMedia[product.slug];return <section className={styles.productHero}><div className={styles.productVisual}>{media&&<img alt={`${product.name} finished product`} decoding="async" height={media.height} loading="eager" src={media.src} width={media.width}/>}<span>{product.series}</span><strong>{product.name}</strong><em>{product.alias}</em><small>{product.strength} · {product.servings}</small></div><div><span className={styles.eyebrow}>{product.proposition.eyebrow}</span><h1>{product.name}</h1><p className={styles.alias}>{product.alias}</p><h2>{product.proposition.headline}</h2><p>{product.proposition.promise}</p><ul>{product.proposition.benefits.map((benefit)=><li key={benefit}>{benefit}</li>)}</ul><dl className={styles.specs}><div><dt>Strength</dt><dd>{product.strength}</dd></div><div><dt>Servings</dt><dd>{product.servings}</dd></div><div><dt>Purity</dt><dd>{product.purity}</dd></div><div><dt>SKU</dt><dd>{product.sku}</dd></div></dl><div className={styles.decision}><strong>{product.price}</strong><button type="button">Add to bag</button></div></div></section>}
export function ProductNarrative({product}:{product:FrontierProductRecord}){const evidenceAvailable=product.slug==="mk-2866";return <><section className={styles.twoCol}><article><span className={styles.eyebrow}>Research profile</span><h2>Understand what makes {product.alias} different.</h2><p>{product.researchProfile}</p></article><article><span className={styles.eyebrow}>Before you choose</span><h2>See the format, focus and fit.</h2><p>{product.guidance}</p><p>{product.considerations}</p></article></section><section className={styles.tabSet}><details open><summary>Product detail</summary><p>{product.summary}</p></details><details><summary>Evidence</summary><EvidenceStatusChip state={evidenceAvailable?"source-reported":"unavailable"}/><p>{evidenceAvailable?"Open the source-connected record to review its reported batch values.":"No OpenLab record is currently bound to this product. No other product’s result is used in its place."}</p></details><details><summary>Reviews</summary><p>See what customers say about ordering, delivery and the finished product.</p></details></section></>}
/** Reuses the accepted Your Stack composition across PDP, bundle, bag and post-purchase hosts. */
export function ProductContinuation({product}:{product:FrontierProductRecord}){return <section aria-label={`Build more from ${product.name}`} className={styles.continuation} data-component="ProductContinuation"><YourStackBuilder baselineSlug={product.slug} host="pdp"/></section>}
/** The legacy Good/Better/Best grid is superseded by the accepted outcome-led stack builder. */
export function StackExplorer(){return <section aria-label="Build your stack" className={styles.stackExplorer} data-component="StackExplorer"><YourStackBuilder host="standalone"/></section>}
export function ProductCollection({products=frontierProducts}:{products?:ReadonlyArray<FrontierProductRecord>}){return <section className={styles.collection}><div className={styles.collectionHead}><span className={styles.eyebrow}>Shop the range</span><h2>Start with the result you want.</h2><p>Browse by strength, body composition, recovery or product family, then compare the formats that fit your goal.</p></div><div className={styles.catalogueGrid}>{products.map((product)=><Link className={styles.catalogueCard} href={`/product/${product.slug}`} key={product.slug}><span>{product.family}</span><h3>{product.name}</h3><p>{product.alias}</p><strong>{product.strength}</strong><small>{product.servings} · {product.price}</small></Link>)}</div></section>}
export function GrowthModules(){return <section className={styles.growth}><div><span className={styles.eyebrow}>Keep building</span><h2>Get more from the products already in your plan.</h2><p>Add the next product, time a repeat order or reach free UK delivery without losing sight of the decision you came to make.</p></div><div className={styles.growthGrid}><RecommendationCard/><RestockCard state="due-soon"/><article className={styles.offer}><span>Free UK delivery</span><h3>£7 away from delivery on us</h3><p>Add one useful extra now, or keep the order exactly as it is.</p></article></div></section>}
const checkoutLifecycleStage: Record<string, TransactionStage> = {
  bag: "bag",
  information: "details",
  delivery: "delivery",
  review: "review",
  payment: "order-pay",
  handoff: "handoff",
  processing: "processing",
  pending: "pending",
  confirmation: "confirmation",
  tracking: "tracking",
  history: "order-history",
  details: "order-details",
  receipt: "receipt",
  return: "return",
  refund: "refund",
  failure: "failure",
  cancelled: "cancelled",
  retry: "retry",
};

/** Historical frontier export retained as an alias; the canonical lifecycle owns all visible composition and copy. */
export function CheckoutLifecycle({stage}:{stage:string}){
  return <TransactionPresentation stage={checkoutLifecycleStage[stage] ?? "details"}/>;
}
export function AccountHub({mode}:{mode:string}){const title=mode==="dashboard"?"Everything you need, ready when you return.":mode==="orders"?"Your orders, receipts and tracking in one place.":mode==="loyalty"?"Turn every order into your next advantage.":`Manage your ${mode.replaceAll("-"," ")}.`;return <section className={styles.account}><header><span className={styles.eyebrow}>MY OLYMPUS</span><h1>{title}</h1><p>Pick up where you left off, make the next order easy, and keep your strongest product decisions close.</p></header><div className={styles.accountGrid}><article><span>ORDER HISTORY</span><h3>MK-2866</h3><p>Track the delivery, open the receipt, or return to the product in one place.</p><Link href="/checkout/tracking">Track order →</Link></article><article><span>RESTOCK LAB</span><h3>Ready for the next phase</h3><p>Stay ahead of your next order with a clear return window and a one-tap path back to the product.</p><Link href="/product/mk-2866">View restock plan →</Link></article><article><span>LOYALTY</span><h3>320 points</h3><p>See your tier, unlock the next reward, and make every order go further.</p><Link href="/account/loyalty">View rewards →</Link></article></div><div className={styles.growthGrid}><RestockCard state="due-soon"/><RecommendationCard state="default"/><ProductCommerceCard contextKicker="READY TO REORDER" product={mk2866Fixture} secondaryHref="/checkout/tracking" secondaryLabel="Track latest order" variant="compact"/></div><YourStackBuilder baselineSlug="mk-2866" host="account"/></section>}
export function SupportContent({kind}:{kind:"about"|"faq"|"bundle"|"tool"}){if(kind==="faq")return <section className={styles.faq}><span className={styles.eyebrow}>HELP CENTRE</span><h1>Get the answer and get moving.</h1>{frontierFaq.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>;if(kind==="bundle")return <><FrontierShell eyebrow="BUNDLE BUILDER" title="Build the stack around your goal." copy="Choose the result, compare the products and see the full stack before you add anything to your bag."><StackExplorer/><GrowthModules/></FrontierShell></>;return <FrontierShell eyebrow={kind==="about"?"ABOUT OLYMPUS":"OPENLAB TOOLS"} title={kind==="about"?"Products made clearer from first look to lab record.":"Turn product research into a clearer decision."} copy={kind==="about"?"Explore the product standards, testing access and UK customer experience behind Olympus Labs UK.":"Compare compounds, build a stack or find the exact batch detail you came for."}><section className={styles.twoCol}><article><h2>Know what you are choosing.</h2><p>Clear product specifications, purposeful comparisons and direct lab-record access keep the important detail close to every decision.</p></article><article><h2>Move from research to action.</h2><p>Focused tools help you compare options, save a plan and return to the right product without wading through unnecessary detail.</p></article></section></FrontierShell>}
