import { ActionLink } from "./action-control";
import { DecisionSurface, EditorialSurface, TechnicalSurface } from "./content-surfaces";
import { ProductCommerceCard } from "./product-commerce-card";
import { getCustomerProductFixture } from "./product-content-adapter";
import { EvidenceStatusChip, type EvidenceAuthorityState } from "./program-components";
import styles from "./support-surface.module.css";

function requireSupportProduct() {
  const product = getCustomerProductFixture("mk-2866");
  if (!product) throw new Error("MK-2866 customer content projection is unavailable");
  return product;
}

const mk2866ContentFixture = requireSupportProduct();

export type SupportSurfaceKind =
  | "shipping-returns"
  | "faq"
  | "international"
  | "gift-cards"
  | "cookies"
  | "refunds"
  | "sitemap"
  | "legal"
  | "contact"
  | "delivery";

type SupportAction = Readonly<{ label: string; href: string; external?: boolean }>;
type SupportPathway = Readonly<{
  label: string;
  title: string;
  copy: string;
  action: SupportAction;
}>;
type SupportQuestion = Readonly<{ question: string; answer: string }>;
type SupportGuide = Readonly<{
  eyebrow: string;
  title: string;
  copy: string;
  points: readonly string[];
}>;
type SupportSurfaceContent = Readonly<{
  eyebrow: string;
  title: string;
  copy: string;
  primary: SupportAction;
  secondary?: SupportAction;
  pathwayTitle: string;
  pathwayCopy: string;
  pathways: readonly SupportPathway[];
  guide?: SupportGuide;
  questions?: readonly SupportQuestion[];
  unavailable?: boolean;
  continuation: Readonly<{
    eyebrow: string;
    title: string;
    copy: string;
    action: SupportAction;
  }>;
}>;

const content: Record<SupportSurfaceKind, SupportSurfaceContent> = {
  contact: {
    eyebrow: "Contact",
    title: "Start with the question that needs answering.",
    copy: "Choose the customer path that already holds the useful context for a product, order, wholesale or OpenLab question.",
    primary: { label: "Open the help centre", href: "/faq-help-centre" },
    secondary: { label: "View your orders", href: "/account/orders" },
    pathwayTitle: "Bring the right context into the conversation.",
    pathwayCopy: "Starting from the relevant product, record or order keeps the next answer focused and avoids repeating information.",
    pathways: [
      { label: "Order support", title: "Start from the order.", copy: "Keep the product, delivery and receipt details together before you ask for help.", action: { label: "View your orders", href: "/account/orders" } },
      { label: "Wholesale", title: "Start from the range.", copy: "Review the products and available OpenLab paths before opening a wholesale conversation.", action: { label: "Explore wholesale", href: "/wholesale" } },
      { label: "OpenLab", title: "Start from the batch.", copy: "Find the product or batch first when your question concerns a record, report or source.", action: { label: "Find a batch", href: "/open-lab/batch-lookup" } },
    ],
    continuation: {
      eyebrow: "Product questions",
      title: "Compare the product facts before you ask what comes next.",
      copy: "The shop keeps source-ready product facts and available OpenLab context close to the customer decision.",
      action: { label: "Browse products", href: "/shop" },
    },
  },
  delivery: {
    eyebrow: "Delivery",
    title: "Choose delivery with the order in view.",
    copy: "Enter the destination first, then review the delivery choices shown for that order before moving to payment.",
    primary: { label: "Enter delivery details", href: "/checkout/information" },
    secondary: { label: "Track an order", href: "/checkout/tracking" },
    pathwayTitle: "One order, one clear delivery path.",
    pathwayCopy: "Delivery choices, the selected method and later updates stay connected to the same order.",
    pathways: [
      { label: "Destination", title: "Tell us where the order is going.", copy: "The destination is the input used to show the choices available for the order.", action: { label: "Enter the destination", href: "/checkout/information" } },
      { label: "Choice", title: "Review the option before payment.", copy: "Keep the selected method and complete order value visible before the payment step.", action: { label: "Choose delivery", href: "/checkout/delivery" } },
      { label: "Progress", title: "Return to the order after checkout.", copy: "Use the tracking path when delivery updates are available for the order.", action: { label: "Track an order", href: "/checkout/tracking" } },
    ],
    guide: {
      eyebrow: "What is confirmed",
      title: "The checkout shows what applies to this order.",
      copy: "Delivery choices appear after you enter a destination. Review the method shown for the order before payment.",
      points: ["Enter the destination before comparing delivery choices.", "Review the selected method beside the complete order value.", "Use the order record for tracking and post-purchase support."],
    },
    continuation: {
      eyebrow: "Need order help?",
      title: "Keep the order reference close.",
      copy: "Order history is the fastest way back to the product, delivery and receipt information already connected to a purchase.",
      action: { label: "View your orders", href: "/account/orders" },
    },
  },
  "shipping-returns": {
    eyebrow: "Delivery and returns",
    title: "Keep the order clear from checkout to resolution.",
    copy: "Choose delivery from the options shown for the order, follow its progress when updates exist, and begin any return or refund question from the original order details.",
    primary: { label: "Choose delivery", href: "/checkout/information" },
    secondary: { label: "View your orders", href: "/account/orders" },
    pathwayTitle: "Stay with the order at every step.",
    pathwayCopy: "The relevant product, delivery and payment context should remain attached to the customer journey.",
    pathways: [
      { label: "Before payment", title: "Choose the delivery shown for the order.", copy: "Enter the destination and review the available choice before payment.", action: { label: "Choose delivery", href: "/checkout/delivery" } },
      { label: "After checkout", title: "Follow the order when updates exist.", copy: "Use the order reference to keep tracking connected to the products selected.", action: { label: "Track an order", href: "/checkout/tracking" } },
      { label: "Need resolution", title: "Begin with the original order details.", copy: "Start there when a delivery, return or refund question needs a closer look.", action: { label: "Read refund guidance", href: "/refunds" } },
    ],
    guide: {
      eyebrow: "Useful order context",
      title: "Bring the information that changes the next step.",
      copy: "Delivery choices appear after the destination is entered. Return and refund guidance begins with the original order details.",
      points: ["The destination determines which delivery choices are shown.", "The order remains the reference for tracking and support.", "Return and refund questions begin with the original order details."],
    },
    continuation: {
      eyebrow: "Product question instead?",
      title: "Return to the product or its OpenLab record.",
      copy: "Product facts and available source context have a faster path than order support.",
      action: { label: "Open the help centre", href: "/faq-help-centre" },
    },
  },
  faq: {
    eyebrow: "Help centre",
    title: "Find the answer, then get back to the decision.",
    copy: "Move between product facts, available OpenLab records and order support without losing the customer context that makes the answer useful.",
    primary: { label: "Browse products", href: "/shop" },
    secondary: { label: "Find a batch", href: "/open-lab/batch-lookup" },
    pathwayTitle: "Choose the question you are trying to resolve.",
    pathwayCopy: "Each pathway returns you to the place that contains the underlying product, evidence or order detail.",
    pathways: [
      { label: "Choose", title: "Compare source-ready product facts.", copy: "Comparison stays unavailable until at least two products have customer-ready records.", action: { label: "Check comparison availability", href: "/compare" } },
      { label: "Check", title: "Find an available record.", copy: "Use the product or batch reference to open the record and source context that exists.", action: { label: "Explore OpenLab", href: "/open-lab" } },
      { label: "Resolve", title: "Return to an existing order.", copy: "Keep delivery, tracking and receipt information attached to the order in question.", action: { label: "View your orders", href: "/account/orders" } },
    ],
    questions: [
      { question: "Where can I find batch information?", answer: "Use Batch Lookup to search by the available product or batch reference, then open the connected record and source action." },
      { question: "What can I compare before choosing a product?", answer: "A product page can show customer-ready identity, labelled facts and its own OpenLab availability. A comparison appears only when at least two eligible product records exist." },
      { question: "When are delivery choices shown?", answer: "Enter the destination at checkout to see the choices presented for that order before payment." },
      { question: "How do I track an order?", answer: "Open the tracking view from your order pathway when delivery updates are available." },
      { question: "What do the OpenLab evidence labels mean?", answer: "OpenLab uses Available Record, Source Reported, Source Only and Unavailable so the source position stays clear without overstating what exists." },
    ],
    continuation: {
      eyebrow: "Product relationships",
      title: "Check whether approved product relationships are available.",
      copy: "No compatibility, outcome or combined-use relationship is inferred while editorial approval is pending.",
      action: { label: "Check relationship availability", href: "/open-lab/stack-builder" },
    },
  },
  international: {
    eyebrow: "International orders",
    title: "Start with the destination, then review the order.",
    copy: "Enter the destination first so checkout can present the choices for that order, then review the products, delivery and total before payment.",
    primary: { label: "Enter the destination", href: "/checkout/information" },
    secondary: { label: "Get customer support", href: "/contact" },
    pathwayTitle: "Keep destination, order and support together.",
    pathwayCopy: "After the destination is entered, review the choices presented for that order and keep its reference for later support.",
    pathways: [
      { label: "Destination", title: "Enter the address first.", copy: "That gives checkout the information needed to present the next available choice.", action: { label: "Start checkout", href: "/checkout/information" } },
      { label: "Review", title: "Check the complete order before payment.", copy: "Keep the products, delivery choice and displayed customer currency in view.", action: { label: "Review your order", href: "/checkout/review" } },
      { label: "Support", title: "Return with the order reference.", copy: "Use your order history when you need tracking, receipt or customer support after checkout.", action: { label: "View your orders", href: "/account/orders" } },
    ],
    continuation: {
      eyebrow: "Before checkout",
      title: "Choose the products, then check the destination.",
      copy: "Compare the product facts and available OpenLab context, then continue with the order you want to place.",
      action: { label: "Browse products", href: "/shop" },
    },
  },
  "gift-cards": {
    eyebrow: "Gift cards",
    title: "Gift card purchase is not available here yet.",
    copy: "Gift card purchase and redemption are not available here yet. You can still help someone choose from the current product range.",
    primary: { label: "Browse the range", href: "/shop" },
    secondary: { label: "Compare products", href: "/compare" },
    pathwayTitle: "Give them a useful product starting point instead.",
    pathwayCopy: "Use product and OpenLab pathways while the gift-card experience remains unavailable.",
    pathways: [
      { label: "Range", title: "Start with product discovery.", copy: "Review product formats and customer-ready facts without filling missing information.", action: { label: "Browse products", href: "/shop" } },
      { label: "Comparison", title: "Check whether comparison is available.", copy: "The comparison view stays unavailable until at least two eligible product records exist.", action: { label: "Check comparison availability", href: "/compare" } },
      { label: "OpenLab", title: "Check the record path.", copy: "OpenLab shows whether a record is available for the product being reviewed.", action: { label: "Explore OpenLab", href: "/open-lab" } },
    ],
    unavailable: true,
    continuation: {
      eyebrow: "Need product confidence?",
      title: "Open the record path before choosing.",
      copy: "OpenLab connects available product records and source context back to commerce.",
      action: { label: "Explore OpenLab", href: "/open-lab" },
    },
  },
  cookies: {
    eyebrow: "Cookie information",
    title: "Read the published privacy information behind the experience.",
    copy: "Use the published privacy policy for the current information about cookies and customer data. A preference manager is not available on this page.",
    primary: { label: "Read the privacy policy", href: "https://olympuslabs.uk/privacy-policy/", external: true },
    secondary: { label: "Open the help centre", href: "/faq-help-centre" },
    pathwayTitle: "Choose the information that answers your question.",
    pathwayCopy: "Policy questions and practical product or order questions have different customer paths.",
    pathways: [
      { label: "Privacy", title: "Read the current published policy.", copy: "Use the published privacy document for the complete information currently provided.", action: { label: "Read the privacy policy", href: "https://olympuslabs.uk/privacy-policy/", external: true } },
      { label: "Terms", title: "Review the terms behind an order.", copy: "Open the published terms when the question concerns the customer service or purchase.", action: { label: "Read the terms", href: "/terms" } },
      { label: "Practical help", title: "Resolve a product or order question.", copy: "Use the help centre when a policy document is not the useful next step.", action: { label: "Open the help centre", href: "/faq-help-centre" } },
    ],
    continuation: {
      eyebrow: "Return to the customer journey",
      title: "Find the product, record or order you came to manage.",
      copy: "The sitemap groups the public customer destinations for faster access.",
      action: { label: "Open the sitemap", href: "/sitemap" },
    },
  },
  refunds: {
    eyebrow: "Refund guidance",
    title: "Start with the order, then see the next step clearly.",
    copy: "Keep the original product, order value and order details together before asking for refund support. Eligibility, timing and amount are confirmed through support using those details.",
    primary: { label: "View your orders", href: "/account/orders" },
    secondary: { label: "Contact support", href: "/contact" },
    pathwayTitle: "Use the original order as the source of context.",
    pathwayCopy: "The order details determine which support step is relevant to the request.",
    pathways: [
      { label: "Find", title: "Open the relevant order.", copy: "Keep the purchased product, delivery and original payment context together.", action: { label: "View your orders", href: "/account/orders" } },
      { label: "Review", title: "Check the order details.", copy: "Use the recorded order values and status rather than estimating what applies.", action: { label: "Review the order", href: "/account/orders" } },
      { label: "Resolve", title: "Ask for help with the order reference.", copy: "Bring the order context into customer support when the next step needs review.", action: { label: "Contact support", href: "/contact" } },
    ],
    continuation: {
      eyebrow: "Different question?",
      title: "Use the help centre for product, delivery or OpenLab answers.",
      copy: "Move directly to the customer pathway that owns the information you need.",
      action: { label: "Open the help centre", href: "/faq-help-centre" },
    },
  },
  sitemap: {
    eyebrow: "Sitemap",
    title: "Go straight to the decision you came to make.",
    copy: "Move directly into the range, OpenLab, your orders or the customer support path that fits the moment.",
    primary: { label: "Browse products", href: "/shop" },
    secondary: { label: "Explore OpenLab", href: "/open-lab" },
    pathwayTitle: "Choose a customer destination.",
    pathwayCopy: "Choose the product, confidence, order or support path that matches what you need.",
    pathways: [
      { label: "Shop", title: "Discover products by their available facts.", copy: "Browse the range and open a product record without substituting missing copy or commerce state.", action: { label: "Browse products", href: "/shop" } },
      { label: "OpenLab", title: "Find the confidence behind a product.", copy: "Open the portal, find a batch or read the methodology and source chain.", action: { label: "Explore OpenLab", href: "/open-lab" } },
      { label: "Orders and help", title: "Return to an order or resolve a question.", copy: "Use account history, delivery guidance or the help centre with the right context.", action: { label: "Open the help centre", href: "/faq-help-centre" } },
    ],
    continuation: {
      eyebrow: "Product relationships",
      title: "Relationship guidance remains unavailable until approved.",
      copy: "The relationship view does not infer compatibility, combined use or outcomes from incomplete product records.",
      action: { label: "Check relationship availability", href: "/open-lab/stack-builder" },
    },
  },
  legal: {
    eyebrow: "Legal information",
    title: "Open the published information that supports your order.",
    copy: "Use the current published privacy policy or terms for complete legal detail, then return to the customer path that owns a practical product or order question.",
    primary: { label: "Read privacy information", href: "/privacy" },
    secondary: { label: "Read the terms", href: "/terms" },
    pathwayTitle: "Separate policy detail from practical customer help.",
    pathwayCopy: "Open each published document for its complete policy detail, or choose practical support for a product or order question.",
    pathways: [
      { label: "Privacy", title: "Read the published privacy policy.", copy: "Open the current source document for complete privacy information.", action: { label: "Read privacy information", href: "/privacy" } },
      { label: "Terms", title: "Read the published terms and conditions.", copy: "Open the current source document for the terms that apply to the customer service.", action: { label: "Read the terms", href: "/terms" } },
      { label: "Customer help", title: "Resolve a product or order question.", copy: "Use the help centre when a legal document is not the useful next step.", action: { label: "Open the help centre", href: "/faq-help-centre" } },
    ],
    continuation: {
      eyebrow: "Existing order",
      title: "Return to the order when the question is specific to a purchase.",
      copy: "Keep the product, delivery and receipt detail attached to the customer request.",
      action: { label: "View your orders", href: "/account/orders" },
    },
  },
};

const evidenceStates: readonly EvidenceAuthorityState[] = ["verified-evidence", "source-reported", "source-only", "unavailable"];

function SupportActionLink({ action, secondary = false }: Readonly<{ action: SupportAction; secondary?: boolean }>) {
  return <ActionLink href={action.href} rel={action.external ? "external" : undefined} variant={secondary ? "secondary" : "primary"}>{action.label}</ActionLink>;
}

function PathwayList({ pathways }: Readonly<{ pathways: readonly SupportPathway[] }>) {
  return <ol className={styles.pathwayList}>{pathways.map((pathway, index) => <li key={pathway.title}><span className={styles.pathwayIndex}>{String(index + 1).padStart(2, "0")}</span><div><span className={styles.pathwayLabel}>{pathway.label}</span><h3>{pathway.title}</h3><p>{pathway.copy}</p></div><SupportActionLink action={pathway.action} secondary /></li>)}</ol>;
}

function GuideList({ points }: Readonly<{ points: readonly string[] }>) {
  return <ol className={styles.guideList}>{points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span>{point}</li>)}</ol>;
}

function QuestionList({ questions }: Readonly<{ questions: readonly SupportQuestion[] }>) {
  return <div className={styles.questions}>{questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>;
}

function EvidenceLegend() {
  return <ul aria-label="OpenLab evidence states" className={styles.evidenceLegend}>{evidenceStates.map((state) => <li key={state}><EvidenceStatusChip state={state} /></li>)}</ul>;
}

export function SupportSurface({ kind }: Readonly<{ kind: SupportSurfaceKind }>) {
  const surface = content[kind];
  return <main className={styles.page} data-support-surface={kind}><div className={styles.shell}>
    <EditorialSurface actions={<><SupportActionLink action={surface.primary} />{surface.secondary ? <SupportActionLink action={surface.secondary} secondary /> : null}</>} eyebrow={surface.eyebrow} headingLevel="h1" state={surface.unavailable ? "unavailable" : "default"} title={surface.title} copy={surface.copy} />
    <DecisionSurface eyebrow="Choose the next step" title={surface.pathwayTitle} copy={surface.pathwayCopy}><PathwayList pathways={surface.pathways} /></DecisionSurface>
    {surface.guide ? <TechnicalSurface eyebrow={surface.guide.eyebrow} title={surface.guide.title} copy={surface.guide.copy}><GuideList points={surface.guide.points} /></TechnicalSurface> : null}
    {surface.questions ? <TechnicalSurface eyebrow="Common questions" title="Clear answers before the next step." copy="Open the answer that matches your question, then return to the product, record or order that holds the useful detail."><QuestionList questions={surface.questions} /><EvidenceLegend /></TechnicalSurface> : null}
    <DecisionSurface actions={<SupportActionLink action={surface.continuation.action} />} compact eyebrow={surface.continuation.eyebrow} title={surface.continuation.title} copy={surface.continuation.copy} />
  </div></main>;
}

export function AboutExperience() {
  return <main className={styles.page} data-support-surface="about"><div className={styles.shell}>
    <EditorialSurface actions={<><SupportActionLink action={{ label: "Browse products", href: "/shop" }} /><SupportActionLink action={{ label: "Explore OpenLab", href: "/open-lab" }} secondary /></>} eyebrow="About Olympus Labs UK" headingLevel="h1" title="Quality, made visible at every product decision." copy="Olympus Labs UK brings a premium product experience, readable specifications and available source context into one customer journey designed to build confidence before purchase." />
    <section aria-label="Product confidence" className={styles.commerceStory}>
      <ProductCommerceCard className={styles.aboutProduct} commerceTreatment="selection" headingLevel="h2" product={mk2866ContentFixture} showQualitative variant="vertical" />
      <DecisionSurface actions={<SupportActionLink action={{ label: "View MK-2866", href: "/product/mk-2866" }} />} eyebrow="Product confidence" title="Start with the product truth a customer can use." copy="Identity, labelled strength, servings and label purity claim remain together on the product card. OpenLab adds available record and source context beside the product decision."><ul className={styles.principles}><li>Product desire begins with a clear product and customer proposition.</li><li>Quantified product facts stay together and easy to compare.</li><li>Available records provide confidence and a return path to commerce.</li></ul></DecisionSurface>
    </section>
    <TechnicalSurface actions={<SupportActionLink action={{ label: "Find a batch", href: "/open-lab/batch-lookup" }} />} eyebrow="OpenLab confidence" title="Evidence adds another dimension to the product experience." copy="OpenLab gives customers a distinct place to find a batch, read an available record, compare reported values and return to the product with greater confidence."><EvidenceLegend /></TechnicalSurface>
    <DecisionSurface actions={<SupportActionLink action={{ label: "Check relationship availability", href: "/open-lab/stack-builder" }} />} eyebrow="Product relationships" title="Use only approved relationship guidance." copy="No compatibility, outcome or combined-use relationship is shown while editorial approval is pending." state="unavailable" />
  </div></main>;
}

export function EvidenceOsExperience() {
  return <main className={styles.page} data-support-surface="evidence-os"><div className={styles.shell}>
    <EditorialSurface actions={<><SupportActionLink action={{ label: "Explore OpenLab", href: "/open-lab" }} /><SupportActionLink action={{ label: "Browse products", href: "/shop" }} secondary /></>} eyebrow="Evidence OS" headingLevel="h1" title="Turn product evidence into customer confidence." copy="Evidence OS connects product identity, record availability, source context and the next customer action across OpenLab and commerce." />
    <TechnicalSurface eyebrow="Evidence state" title="Make the source position visible before the customer goes deeper." copy="These labels preserve the distinction between an available record, reported source content, source-only context and unavailable information."><EvidenceLegend /><GuideList points={["Start with the finished product and its available record state.", "Open only the report or source action that exists.", "Return to the product with the source context intact."]} /></TechnicalSurface>
    <section aria-label="Evidence to commerce" className={styles.commerceStory}>
      <ProductCommerceCard className={styles.aboutProduct} commerceTreatment="selection" headingLevel="h2" product={mk2866ContentFixture} showQualitative variant="vertical" />
      <DecisionSurface actions={<SupportActionLink action={{ label: "Open the MK-2866 dossier", href: "/open-lab/dossier/mk-2866" }} />} eyebrow="Confidence returns to commerce" title="The technical path should help close the product decision." copy="A customer can inspect the available batch and source context, then return to the product or compare it without losing the commercial journey." />
    </section>
  </div></main>;
}

export function WholesaleExperience() {
  const pathways: readonly SupportPathway[] = [
    { label: "Range", title: "Start with the products relevant to your channel.", copy: "Review the available formats and product facts before discussing a commercial relationship.", action: { label: "Browse the range", href: "/shop" } },
    { label: "Confidence", title: "Bring available OpenLab context into the range review.", copy: "Use available product and batch records to add specific confidence to the range review.", action: { label: "Explore OpenLab", href: "/open-lab" } },
    { label: "Conversation", title: "Continue with the useful product context in hand.", copy: "Use the contact pathway to discuss product fit. Pricing, minimums, eligibility and fulfilment terms are confirmed in the conversation.", action: { label: "Open contact pathways", href: "/contact" } },
  ];
  return <main className={styles.page} data-support-surface="wholesale"><div className={styles.shell}>
    <EditorialSurface actions={<><SupportActionLink action={{ label: "Browse products", href: "/shop" }} /><SupportActionLink action={{ label: "Explore OpenLab", href: "/open-lab" }} secondary /></>} eyebrow="Wholesale" headingLevel="h1" title="Begin a wholesale conversation with product clarity." copy="Bring the relevant range, product facts and available OpenLab records into view before discussing a commercial relationship." />
    <DecisionSurface eyebrow="Prepare the conversation" title="Start with what your customers need to understand." copy="Review the range and available OpenLab records, then contact us to confirm pricing, minimums, availability and account terms."><PathwayList pathways={pathways} /></DecisionSurface>
    <TechnicalSurface eyebrow="Details confirmed in conversation" title="Commercial terms stay specific to your requirements." copy="Pricing, order minimums, destination support and fulfilment requirements are confirmed through the wholesale conversation." state="unavailable" />
  </div></main>;
}

export function PolicyBridge({ kind }: Readonly<{ kind: "privacy" | "terms" }>) {
  const privacy = kind === "privacy";
  const documentLabel = privacy ? "privacy policy" : "terms and conditions";
  const href = privacy ? "https://olympuslabs.uk/privacy-policy/" : "https://olympuslabs.uk/terms-and-conditions/";
  return <main className={styles.page} data-support-surface={kind}><div className={styles.shell}>
    <EditorialSurface actions={<><SupportActionLink action={{ label: `Read the ${documentLabel}`, href, external: true }} /><SupportActionLink action={{ label: "Open the help centre", href: "/faq-help-centre" }} secondary /></>} eyebrow={privacy ? "Privacy" : "Terms"} headingLevel="h1" title={privacy ? "Read the published information behind your customer experience." : "Read the published terms behind your order."} copy={privacy ? "Open the published privacy policy for the complete information currently provided, then return to products, orders or support with the right context." : "Open the published terms and conditions for the complete information currently provided, then return to the customer path that fits your next step."} />
    <TechnicalSurface eyebrow="Source document" title={`Use the published ${documentLabel} for the full detail.`} copy="Open the published document for complete legal information. Product, delivery and order questions keep their own direct customer pathways."><GuideList points={[`Open the published ${documentLabel} for the complete information.`, "Use the help centre for practical product, delivery or OpenLab questions.", "Return to the relevant order when a question concerns an existing purchase."]} /></TechnicalSurface>
    <DecisionSurface actions={<SupportActionLink action={{ label: "View your orders", href: "/account/orders" }} />} compact eyebrow="Existing purchase" title="Keep the order details attached to a customer request." copy="Order history holds the product, delivery and receipt context that a general policy page cannot provide." />
  </div></main>;
}

export function LegalDocumentSurface({ doc }: Readonly<{ doc: string }>) {
  if (doc === "privacy") return <PolicyBridge kind="privacy" />;
  if (doc === "terms") return <PolicyBridge kind="terms" />;
  if (doc === "cookies") return <SupportSurface kind="cookies" />;
  return <SupportSurface kind="legal" />;
}
