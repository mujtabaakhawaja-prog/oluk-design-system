/* eslint-disable @next/next/no-img-element -- local transparent Figma assets require authored object-fit treatment. */

import type { ReactNode } from "react";

import {
  AboutRoute,
  CompareRoute,
  DossierRoute,
  EvidenceOsRoute,
  HomeRoute,
  LookupRoute,
  MethodologyRoute,
  OpenLabRoute,
  ProductRoute,
  RecordRoute,
  RecordsRoute,
  ReviewsRoute,
  SourceChainRoute,
} from "./customer-routes";
import { ShopDiscovery } from "./design-system/shop-discovery";
import { type CoreCustomerRouteKey } from "./design-system/site-route-map";
import { SiteHeader } from "./design-system/site-header";
import { TransactionPresentation } from "./design-system/transaction-presentation";

type ProgramRouteKey = "product-continuation" | "checkout-information" | "checkout-payment" | "checkout-processing" | "checkout-review" | "checkout-tracking" | "openlab-admin" | "compound" | "report" | "openlab-evidence" | "compound-guide" | "stack-builder" | "dosing-calculator" | "cycle-planner" | "interaction-checker" | "coa" | "research-papers" | "case-studies" | "glossary" | "lab-partner";
type ExperienceRouteKey = Exclude<CoreCustomerRouteKey, "review" | "review-studio" | ProgramRouteKey>;
type ExperienceLabProps = { route: ExperienceRouteKey; lookupReference?: string };

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="10.7" cy="10.7" r="6.7" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m15.7 15.7 4.3 4.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function ActionLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return (
    <a className={secondary ? "button button-secondary" : "button"} href={href}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <div className="footer-lockup"><img alt="Olympus Labs UK" src="/assets/brand/option-b/footer-logo.svg" /></div>
          <p>Finished products, clear specifications and independently presented evidence.</p>
          <a href="/open-lab">Enter OpenLab <Arrow /></a>
        </div>
        <nav aria-label="Shop links" className="footer-links"><h3>Shop</h3><a href="/shop">Catalogue</a><a href="/product/mk-2866">MK-2866</a><a href="/reviews">Customer reviews</a></nav>
        <nav aria-label="OpenLab links" className="footer-links"><h3>OpenLab</h3><a href="/open-lab">Portal</a><a href="/lab-reports">Lab Records</a><a href="/open-lab/methodology">Methodology</a><a href="/open-lab/source-chain">Source chain</a></nav>
        <nav aria-label="Company links" className="footer-links"><h3>Company</h3><a href="/about">About</a><a href="/wholesale">Wholesale</a><a href="/account">Your account</a><a href="/about/evidence-os">EvidenceOS</a></nav>
        <nav aria-label="Help and legal links" className="footer-links"><h3>Help &amp; legal</h3><a href="/contact">Contact</a><a href="/delivery">Delivery</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav>
      </div>
      <div className="shell footer-base"><span>© 2026 Olympus Labs UK</span><span>Quality, made visible.</span></div>
    </footer>
  );
}

export function GovernedProgramShell({ children, lane = "openlab" }: { children: ReactNode; lane?: "openlab" | "checkout" }) {
  return <><SiteHeader route={lane === "openlab" ? "openlab" : "checkout"}/><main data-live-authority={lane === "checkout" ? "false" : undefined} id="main-content">{children}</main><SiteFooter/></>;
}

export function CustomerSiteChrome({ children, route }: { children: ReactNode; route: string }) {
  return <><SiteHeader route={route}/><div id="main-content">{children}</div><SiteFooter/></>;
}
function PageHero({ eyebrow, title, copy, actions }: { eyebrow: string; title: string; copy: string; actions?: ReactNode }) {
  return <section className="page-hero"><div className="shell"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p>{actions && <div className="button-row">{actions}</div>}</div></section>;
}

function ShopPage() {
  return (
    <>
      <PageHero eyebrow="SHOP" title="The Olympus Labs UK range." copy="Compare clear product specifications, then move directly into available Lab Records." />
      <ShopDiscovery />
    </>
  );
}

function SearchPage() {
  return <><PageHero eyebrow="SEARCH" title="Find a product." copy="Search the Olympus Labs UK catalogue by product, compound or series." /><section className="section"><div className="shell utility-page-grid"><form action="/shop" className="utility-search-card" method="get"><label htmlFor="site-search">What are you looking for?</label><div><SearchIcon /><input id="site-search" name="search" placeholder="Search the catalogue" required type="search" /><button className="button" type="submit">Search <Arrow /></button></div></form><aside className="utility-card"><span className="eyebrow">BROWSE INSTEAD</span><h2>Explore the full range.</h2><p>Filter by family, goal, form, servings and availability from the catalogue.</p><a href="/shop">Open the shop <Arrow /></a></aside></div></section></>;
}

function WholesalePage() {
  return <><PageHero eyebrow="WHOLESALE" title="Wholesale with product clarity built in." copy="Start a wholesale conversation with the product range, evidence access and fulfilment context kept together." actions={<ActionLink href="/contact">Contact wholesale</ActionLink>} /><section className="section"><div className="shell about-grid">{[["01", "Range", "Discuss the products and formats relevant to your channel."], ["02", "Evidence", "Connect available product records to the range under consideration."], ["03", "Fulfilment", "Confirm operational requirements before an account is opened."]].map(([index, title, copy]) => <article key={title}><span>{index}</span><h2>{title}</h2><p>{copy}</p></article>)}</div></section></>;
}

function AccountPage() {
  return <><PageHero eyebrow="YOUR ACCOUNT" title="Orders and account access." copy="Use the account area to return to orders, delivery details and saved information." /><section className="section"><div className="shell utility-page-grid"><form className="utility-form-card"><h2>Sign in</h2><label>Email address<input autoComplete="email" type="email" /></label><label>Password<input autoComplete="current-password" type="password" /></label><button className="button" disabled type="button">Sign in</button></form><aside className="utility-card"><span className="eyebrow">NEW CUSTOMER</span><h2>Browse before you create an account.</h2><p>Compare the range and available Lab Records without signing in.</p><a href="/shop">Browse products <Arrow /></a></aside></div></section></>;
}

function ContactPage() {
  return <><PageHero eyebrow="CONTACT" title="Start with the right team." copy="Choose the team that best matches your product, order or wholesale question." /><section className="section"><div className="shell about-grid">{[["01", "Order support", "Return to your account for order and delivery context.", "/account"], ["02", "Wholesale", "Open a product and fulfilment conversation with the wholesale team.", "/wholesale"], ["03", "OpenLab", "Find a product or batch record before asking an evidence question.", "/lab-reports"]].map(([index, title, copy, href]) => <article key={title}><span>{index}</span><h2>{title}</h2><p>{copy}</p><a href={href}>Continue <Arrow /></a></article>)}</div></section></>;
}

function DeliveryPage() {
  return <><PageHero eyebrow="DELIVERY" title="Delivery information, kept clear." copy="Review the core delivery stages before moving into checkout." /><section className="section"><div className="shell about-grid">{[["01", "Destination", "Available delivery methods depend on the destination entered at checkout."], ["02", "Method", "The applicable options and cost are shown before an order is placed."], ["03", "Tracking", "Where tracking is available, it remains connected to the order record."]].map(([index, title, copy]) => <article key={title}><span>{index}</span><h2>{title}</h2><p>{copy}</p></article>)}</div></section></>;
}

function PolicyBridgePage({ kind }: { kind: "privacy" | "terms" }) {
  const privacy = kind === "privacy";
  const liveHref = privacy ? "https://olympuslabs.uk/privacy-policy/" : "https://olympuslabs.uk/terms-and-conditions/";
  return <><PageHero eyebrow={privacy ? "PRIVACY" : "TERMS"} title={privacy ? "Privacy information." : "Terms and conditions."} copy={privacy ? "Review how Olympus Labs UK handles information across the current customer service." : "Review the terms that apply to the current Olympus Labs UK customer service."} actions={<a className="button" href={liveHref} rel="external">Read the current {privacy ? "privacy policy" : "terms"} <Arrow /></a>} /><section className="section"><div className="shell utility-card utility-policy-card"><span className="eyebrow">CUSTOMER INFORMATION</span><h2>{privacy ? "Use the current published privacy policy." : "Use the current published terms."}</h2><p>Open the full document above to read the applicable information.</p></div></section></>;
}

const routeRenderers = {
  home: () => <HomeRoute />,
  shop: () => <ShopPage />,
  product: () => <ProductRoute />,
  reviews: () => <ReviewsRoute />,
  about: () => <AboutRoute />,
  "evidence-os": () => <EvidenceOsRoute />,
  account: () => <AccountPage />,
  bag: () => <TransactionPresentation stage="bag" />,
  checkout: () => <TransactionPresentation stage="details" />,
  "checkout-delivery": () => <TransactionPresentation stage="delivery" />,
  "checkout-payment-handoff": () => <TransactionPresentation stage="handoff" />,
  "checkout-order-pay": () => <TransactionPresentation stage="order-pay" />,
  "checkout-confirmation": () => <TransactionPresentation stage="confirmation" />,
  "checkout-failure": () => <TransactionPresentation stage="failure" />,
  "checkout-retry": () => <TransactionPresentation stage="retry" />,
  contact: () => <ContactPage />,
  delivery: () => <DeliveryPage />,
  "lab-reports": () => <RecordsRoute />,
  openlab: () => <OpenLabRoute />,
  records: () => <RecordsRoute />,
  record: () => <RecordRoute />,
  dossier: () => <DossierRoute />,
  lookup: (lookupReference?: string) => <LookupRoute reference={lookupReference} />,
  methodology: () => <MethodologyRoute />,
  "source-chain": () => <SourceChainRoute />,
  compare: () => <CompareRoute />,
  privacy: () => <PolicyBridgePage kind="privacy" />,
  search: () => <SearchPage />,
  terms: () => <PolicyBridgePage kind="terms" />,
  wholesale: () => <WholesalePage />,
} satisfies Readonly<Record<ExperienceRouteKey, (lookupReference?: string) => ReactNode>>;

export function ExperienceLab({ route, lookupReference }: ExperienceLabProps) {
  const content = routeRenderers[route](lookupReference);
  return <div className="experience-lab"><SiteHeader route={route} /><main id="main-content">{content}</main><SiteFooter /></div>;
}
