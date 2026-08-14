import Link from "next/link";

type SupportSurfaceKind = "shipping-returns" | "faq" | "international" | "gift-cards" | "cookies" | "refunds" | "sitemap" | "legal" | "contact" | "delivery";

type SupportAction = Readonly<{ label: string; href: string }>;
type SupportPathway = Readonly<{ title: string; copy: string; action: SupportAction }>;
type SupportQuestion = Readonly<{ question: string; answer: string }>;
type SupportSurfaceContent = Readonly<{
  label: string;
  title: string;
  copy: string;
  primary: SupportAction;
  secondary?: SupportAction;
  pathways: readonly SupportPathway[];
  guide?: Readonly<{ title: string; copy: string; points: readonly string[] }>;
  questions?: readonly SupportQuestion[];
}>;

const content: Record<SupportSurfaceKind, SupportSurfaceContent> = {
  contact: {
    label: "Contact",
    title: "Start with the question that needs answering.",
    copy: "Choose product, order, wholesale or OpenLab support so you arrive with the context that makes the next conversation useful.",
    primary: { label: "Open help centre", href: "/faq-help-centre" },
    secondary: { label: "View your account", href: "/account/dashboard" },
    pathways: [
      { title: "Order support", copy: "Open your account first to keep the relevant order, delivery and receipt information together.", action: { label: "View your account", href: "/account/dashboard" } },
      { title: "Wholesale", copy: "Bring the product range and available record context into a focused wholesale conversation.", action: { label: "Contact wholesale", href: "/wholesale" } },
      { title: "OpenLab", copy: "Find the product or batch first when the question is about a record, report or source context.", action: { label: "Find a batch", href: "/open-lab/batch-lookup" } },
    ],
  },
  delivery: {
    label: "Delivery",
    title: "Choose delivery with the order in view.",
    copy: "Enter your destination, compare the delivery choices that apply and keep the product total clear before you move to payment.",
    primary: { label: "Choose delivery", href: "/checkout/information" },
    secondary: { label: "Track an order", href: "/checkout/tracking" },
    pathways: [
      { title: "Set the destination", copy: "Start with the delivery address so the right options can be shown for the order you are building.", action: { label: "Enter delivery details", href: "/checkout/information" } },
      { title: "Review the choices", copy: "See the available delivery method and the full order value before payment.", action: { label: "Choose delivery", href: "/checkout/delivery" } },
      { title: "Follow the order", copy: "Return to your order or account to see tracking information when it becomes available.", action: { label: "Track an order", href: "/checkout/tracking" } },
    ],
  },
  "shipping-returns": {
    label: "Delivery and returns",
    title: "Keep the order clear from checkout to the next step.",
    copy: "Choose delivery with the order in view, follow the tracking path when it becomes available, and return to the order details if you need help after purchase.",
    primary: { label: "Choose delivery", href: "/checkout/information" },
    secondary: { label: "Track an order", href: "/checkout/tracking" },
    pathways: [
      { title: "Choose delivery", copy: "Enter the destination first, then compare the delivery choices shown for your order before payment.", action: { label: "Choose delivery", href: "/checkout/delivery" } },
      { title: "Follow the order", copy: "Use the order reference to keep dispatch and delivery updates connected to the products you selected.", action: { label: "Track an order", href: "/checkout/tracking" } },
      { title: "Get the right help", copy: "Start from the relevant order whenever a return, refund or delivery question needs a closer look.", action: { label: "View refund guidance", href: "/refunds" } },
    ],
    guide: {
      title: "Start with the information that changes the next step.",
      copy: "The useful detail is kept close to the order so you can make a decision without repeating the same context.",
      points: ["Delivery choices are shown after the destination is entered.", "The order remains the reference for tracking and support.", "Return and refund guidance starts with the original order details."],
    },
  },
  faq: {
    label: "Help centre",
    title: "Find the answer, then get back to the decision.",
    copy: "Product facts, delivery questions and available OpenLab records are kept together so the next step is clear whether you are choosing, ordering or checking a batch.",
    primary: { label: "Browse products", href: "/shop" },
    secondary: { label: "Find a batch", href: "/open-lab/batch-lookup" },
    pathways: [
      { title: "Choose a product", copy: "Compare the format, strength, servings and price before you open the full product detail.", action: { label: "Browse products", href: "/shop" } },
      { title: "Check a record", copy: "Find a batch, open the available report path or compare the products that are already on your shortlist.", action: { label: "Explore OpenLab", href: "/open-lab" } },
      { title: "Manage an order", copy: "Review delivery, tracking and account information from the place that already holds your order context.", action: { label: "View your account", href: "/account/dashboard" } },
    ],
    questions: [
      { question: "Where can I find batch information?", answer: "Use Batch Lookup to find the available record by its product or batch reference, then open the connected report and source information." },
      { question: "What can I review before I choose a product?", answer: "Every product page keeps the product identity, strength, servings, price and available OpenLab path close to the main decision." },
      { question: "When do I see delivery choices?", answer: "Enter your destination at checkout to see the delivery options that apply before payment." },
      { question: "How do I track an order?", answer: "Open the tracking view from your account or the order pathway when delivery updates are available." },
      { question: "What do the evidence labels mean?", answer: "Available record context is shown as Verified Evidence, Source Reported, Source Only or Unavailable. Each label keeps the source position clear without overstating what is available." },
    ],
  },
  international: {
    label: "International orders",
    title: "Start with the destination, then see the order clearly.",
    copy: "International customers can choose a destination first, review the options shown for that order and keep the selected customer currency clear through payment.",
    primary: { label: "Choose a destination", href: "/checkout/information" },
    secondary: { label: "Get support", href: "/contact" },
    pathways: [
      { title: "Set the destination", copy: "Begin with the delivery address so the relevant order choices can be shown in one place.", action: { label: "Choose a destination", href: "/checkout/information" } },
      { title: "Review before payment", copy: "Keep the product total, delivery choice and customer currency in view before moving to payment.", action: { label: "Review your order", href: "/checkout/review" } },
      { title: "Return to the order", copy: "Use your order or account when you need tracking, receipt or support context after checkout.", action: { label: "View your account", href: "/account/dashboard" } },
    ],
  },
  "gift-cards": {
    label: "Gift cards",
    title: "Give them the choice to build their own next step.",
    copy: "Start with a value that fits the occasion, then point the recipient toward clear product facts, comparisons and the range they want to explore.",
    primary: { label: "Browse the range", href: "/shop" },
    secondary: { label: "Build a stack", href: "/open-lab/stack-builder" },
    pathways: [
      { title: "Start with the range", copy: "Help them compare product families, formats and the outcomes they want to build toward.", action: { label: "Browse products", href: "/shop" } },
      { title: "Build a direction", copy: "Use the stack builder to compare additions around a selected baseline and see the combined outcome.", action: { label: "Build a stack", href: "/open-lab/stack-builder" } },
      { title: "See the detail", copy: "Product pages keep the key format and available record path together before the next decision.", action: { label: "View MK-2866", href: "/product/mk-2866" } },
    ],
  },
  cookies: {
    label: "Cookie settings",
    title: "Keep your choices easy to find.",
    copy: "Read how essential site settings and saved preferences support the customer experience, then open the published privacy information when you need the fuller picture.",
    primary: { label: "Read privacy information", href: "/privacy" },
    secondary: { label: "View terms", href: "/terms" },
    pathways: [
      { title: "Essential settings", copy: "Read the information that helps the site operate as expected when you move between products, OpenLab and support.", action: { label: "Read privacy information", href: "/privacy" } },
      { title: "Your preferences", copy: "Use the published information to understand the choices available for your customer experience.", action: { label: "Read the current policy", href: "/privacy" } },
      { title: "Need an answer?", copy: "Move into the help centre when the question is about a product, delivery or an existing order.", action: { label: "Open help centre", href: "/faq-help-centre" } },
    ],
  },
  refunds: {
    label: "Refunds",
    title: "Start with the order, then see the next step clearly.",
    copy: "Keep the product, original order value and order details together before you review the refund amount or ask for support.",
    primary: { label: "View your orders", href: "/account/orders" },
    secondary: { label: "Contact support", href: "/contact" },
    pathways: [
      { title: "Find the order", copy: "Open the relevant order first so the product, delivery and original payment context stay together.", action: { label: "View your orders", href: "/account/orders" } },
      { title: "Review the amount", copy: "Use the order details to keep the displayed GBP total and fixed USD equivalent visible when they apply.", action: { label: "Review the order", href: "/account/orders" } },
      { title: "Ask with context", copy: "Choose support when the order needs a closer look and bring the relevant order reference with you.", action: { label: "Contact support", href: "/contact" } },
    ],
  },
  sitemap: {
    label: "Sitemap",
    title: "Go straight to the decision you came to make.",
    copy: "Move directly into the range, your next stack, an OpenLab record, your account or the customer support path that fits the moment.",
    primary: { label: "Browse products", href: "/shop" },
    secondary: { label: "Explore OpenLab", href: "/open-lab" },
    pathways: [
      { title: "Shop the range", copy: "Browse product families, goals and product facts before you choose.", action: { label: "Browse products", href: "/shop" } },
      { title: "Build your stack", copy: "Start with a goal and baseline product, then compare the additions that change the outcome.", action: { label: "Build a stack", href: "/open-lab/stack-builder" } },
      { title: "Open a record", copy: "Find a batch, read an available report or compare compounds in OpenLab.", action: { label: "Explore OpenLab", href: "/open-lab" } },
    ],
  },
  legal: {
    label: "Legal information",
    title: "Read the information that supports your order.",
    copy: "Open the current published policy or terms when you need the full details, then return to support, delivery or your account with the right context.",
    primary: { label: "Read privacy information", href: "/privacy" },
    secondary: { label: "Read terms", href: "/terms" },
    pathways: [
      { title: "Privacy", copy: "Open the current privacy information to understand how customer information is handled.", action: { label: "Read privacy information", href: "/privacy" } },
      { title: "Terms", copy: "Open the current terms and conditions that apply to the customer service.", action: { label: "Read terms", href: "/terms" } },
      { title: "Get practical help", copy: "For a product, delivery or order question, use the help centre rather than searching through legal information.", action: { label: "Open help centre", href: "/faq-help-centre" } },
    ],
  },
};

function SupportActionLink({ action, secondary = false }: Readonly<{ action: SupportAction; secondary?: boolean }>) {
  return (
    <Link className={secondary ? "button button-secondary" : "button"} href={action.href}>
      <span>{action.label}</span><span aria-hidden="true">→</span>
    </Link>
  );
}

export function SupportSurface({ kind }: Readonly<{ kind: SupportSurfaceKind }>) {
  const surface = content[kind];

  return (
    <main className="support-surface">
      <header className="page-hero support-hero">
        <div className="shell">
          <span className="support-label">{surface.label}</span>
          <h1>{surface.title}</h1>
          <p>{surface.copy}</p>
          <div className="button-row"><SupportActionLink action={surface.primary} />{surface.secondary ? <SupportActionLink action={surface.secondary} secondary /> : null}</div>
        </div>
      </header>
      <section aria-label={`${surface.label} pathways`} className="shell support-surface-grid">
        {surface.pathways.map((pathway, index) => (
          <article key={pathway.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{pathway.title}</h2>
            <p>{pathway.copy}</p>
            <Link href={pathway.action.href}>{pathway.action.label} <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </section>
      {surface.guide ? <section className="shell support-guide"><div><span className="support-label">Keep the right context close</span><h2>{surface.guide.title}</h2><p>{surface.guide.copy}</p></div><ol>{surface.guide.points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span>{point}</li>)}</ol></section> : null}
      {surface.questions ? <section className="shell support-faq"><div><span className="support-label">Common questions</span><h2>Clear answers before the next step.</h2><p>Start with the page that holds the detail you need, rather than retracing an order or product decision.</p></div><div>{surface.questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section> : null}
    </main>
  );
}

export function AboutExperience() {
  const pathways = [
    { title: "Start with the product", copy: "Product identity, strength, servings and price stay legible before you commit to the next product or stack decision.", action: { label: "Browse products", href: "/shop" } },
    { title: "Go deeper when it matters", copy: "OpenLab keeps batch lookup, available reports and source context connected to the product rather than buried elsewhere.", action: { label: "Explore OpenLab", href: "/open-lab" } },
    { title: "Build from a real baseline", copy: "Choose the goal, set the product already in your plan and compare the additions that change the result you are working toward.", action: { label: "Build a stack", href: "/open-lab/stack-builder" } },
  ] satisfies readonly SupportPathway[];

  return <main className="support-surface"><header className="page-hero support-hero"><div className="shell"><span className="support-label">About Olympus Labs UK</span><h1>Quality, made visible.</h1><p>Olympus Labs UK brings finished products, readable specifications and available record pathways into one focused customer experience.</p><div className="button-row"><SupportActionLink action={{ label: "Browse products", href: "/shop" }} /><SupportActionLink action={{ label: "Explore OpenLab", href: "/open-lab" }} secondary /></div></div></header><section aria-label="How Olympus supports product decisions" className="shell support-surface-grid">{pathways.map((pathway, index) => <article key={pathway.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{pathway.title}</h2><p>{pathway.copy}</p><Link href={pathway.action.href}>{pathway.action.label} <span aria-hidden="true">→</span></Link></article>)}</section><section className="shell support-guide"><div><span className="support-label">What stays connected</span><h2>Build every product decision with the important detail in view.</h2><p>Shop, OpenLab and your saved product decisions each have a distinct job, but they keep the context you need close when you move between them.</p></div><ol><li><span>01</span>Compare the products and formats that fit the outcome you want.</li><li><span>02</span>Open the available record path when you want more source context.</li><li><span>03</span>Return to a saved product, stack or order without starting again.</li></ol></section></main>;
}

export function PolicyBridge({ kind }: Readonly<{ kind: "privacy" | "terms" }>) {
  const privacy = kind === "privacy";
  const documentLabel = privacy ? "privacy policy" : "terms and conditions";
  const href = privacy ? "https://olympuslabs.uk/privacy-policy/" : "https://olympuslabs.uk/terms-and-conditions/";

  return <main className="support-surface"><header className="page-hero support-hero"><div className="shell"><span className="support-label">{privacy ? "Privacy" : "Terms"}</span><h1>{privacy ? "Read the information behind your customer experience." : "Read the terms behind your order."}</h1><p>{privacy ? "Open the published privacy policy for the full detail, then return to products, orders or support with the right context." : "Open the published terms and conditions for the full detail, then return to the customer path that fits your next step."}</p><div className="button-row"><a className="button" href={href} rel="external"><span>Read the {documentLabel}</span><span aria-hidden="true">→</span></a><SupportActionLink action={{ label: "Open help centre", href: "/faq-help-centre" }} secondary /></div></div></header><section className="shell support-guide"><div><span className="support-label">Keep the right detail close</span><h2>Use the published document for the full terms that apply.</h2><p>Product, delivery and order questions have their own faster path when you do not need the full legal information.</p></div><ol><li><span>01</span>Open the published {documentLabel} for the complete detail.</li><li><span>02</span>Use the help centre for product, delivery or account questions.</li><li><span>03</span>Return to your order when you need the detail behind an existing purchase.</li></ol></section></main>;
}
