import Link from "next/link";

import { CustomerSiteChrome } from "../experience-lab";
import { LockedHomeHero } from "./locked-home-hero";
import { PdpFirstFold } from "./pdp-first-fold";
import { mk2866Fixture } from "./product-fixtures";
import { ProductStatusStack } from "./product-status";
import styles from "./phase-one-system.module.css";

type PhaseOnePage = Readonly<{
  slug: string;
  order: number;
  group: "Law" | "Grammar" | "Components" | "Applied templates" | "Proof" | "Consumer bridge";
  title: string;
  purpose: string;
  evidence: string;
}>;

export const phaseOnePages: readonly PhaseOnePage[] = [
  { slug: "law", order: 1, group: "Law", title: "Authority and run control", purpose: "Separates Sites presentation authority from C2, Woo, Shopper and payment truth.", evidence: "A source revision, owner map and explicit fixture boundary are named." },
  { slug: "route-contract", order: 2, group: "Law", title: "Route contract", purpose: "Makes the 73-pattern ledger, family templates and system/owner entries inspectable.", evidence: "Each consumer route maps to a family template or a recorded source constraint." },
  { slug: "tokens", order: 3, group: "Grammar", title: "Semantic light tokens", purpose: "Publishes the light-only semantic roles that customer templates consume.", evidence: "Roles are traceable to the 128-role source and do not alias legacy Majestic values." },
  { slug: "type-layout", order: 4, group: "Grammar", title: "Typography and layout", purpose: "Records the customer hierarchy, fonts, grids, spacing and responsive composition law.", evidence: "Plus Jakarta display, Inter UI/body and real route use are shown together." },
  { slug: "material-motion", order: 5, group: "Grammar", title: "Material and motion", purpose: "Defines surfaces, focus, media chambers, elevation and reduced-motion contracts.", evidence: "Motion is proved in an actual template; future dark mode may change colour/fill roles only." },
  { slug: "components", order: 6, group: "Components", title: "Component library", purpose: "Catalogues shared shell, actions, inputs, cards, metrics and media by semantic job.", evidence: "Each entry has an anatomy, state and accessibility contract." },
  { slug: "commerce-atoms", order: 7, group: "Components", title: "Commerce atoms", purpose: "Keeps availability, evidence, completed action, error, pending, disabled and unavailable semantics separate.", evidence: "In-stock is cobalt over cobalt-soft; it is never a generic green success state." },
  { slug: "homepage", order: 8, group: "Applied templates", title: "Homepage specimen", purpose: "Shows the actual shell, trust rails and 5-3-1 hero composition rather than a diagnostic approximation.", evidence: "The template carries the product-stage motion and URL restoration contract." },
  { slug: "pdp-mk-2866", order: 9, group: "Applied templates", title: "PDP and MK-2866 specimen", purpose: "Shows the PDP first-fold and dossier family as a presentation template with a declared runtime preservation envelope.", evidence: "MK-2866 is a specimen, never the authority for live product or commerce values." },
  { slug: "commerce-openlab", order: 10, group: "Applied templates", title: "Commerce and OpenLab specimen", purpose: "Connects cards, metrics, availability, evidence, media, Stack and OpenLab modules.", evidence: "Fixture/source-only status is visible until a Shopper server adapter binds a projection." },
  { slug: "proof", order: 11, group: "Proof", title: "Proof board", purpose: "Collects source revision, template, asset/font, responsive and interaction receipts.", evidence: "A screenshot alone cannot promote a route or a customer data claim." },
  { slug: "consumer-bridge", order: 12, group: "Consumer bridge", title: "Typed Shopper consumer bridge", purpose: "States how Sites templates receive server-owned Shopper/C2/Woo/OpenLab data.", evidence: "No browser-direct service call, local cart, price derivation or payment authority is permitted." },
] as const;

function PageNavigation({ current }: Readonly<{ current?: string }>) {
  return <nav aria-label="Phase 1 system pages" className={styles.navigation}>
    {phaseOnePages.map((page) => <Link aria-current={current === page.slug ? "page" : undefined} href={`/design-system/${page.slug}`} key={page.slug}><span>{String(page.order).padStart(2, "0")}</span>{page.title}</Link>)}
  </nav>;
}

function Overview() {
  return <>
    <header className={styles.intro} data-oluk-template-id="sites-phase-one-index" data-oluk-template-revision="W05">
      <p className="eyebrow">Codex Sites · Phase 1</p>
      <h1>Presentation authority, made inspectable.</h1>
      <p>These pages document the runnable light-mode Sites grammar and its consumer boundary. They do not create product, evidence, cart, order or payment truth.</p>
      <div className={styles.flags}><span>Light system authority</span><span>Dark colours deferred</span><span>Shopper is a consumer</span></div>
    </header>
    <section className={styles.grid} aria-label="Phase 1 build order">{phaseOnePages.map((page) => <article key={page.slug}><span>{String(page.order).padStart(2, "0")} · {page.group}</span><h2>{page.title}</h2><p>{page.purpose}</p><Link href={`/design-system/${page.slug}`}>Open contract <b aria-hidden="true">→</b></Link></article>)}</section>
  </>;
}

function HomepageSpecimen() {
  return <section className={styles.specimen} data-oluk-template-id="sites-homepage-locked-5-3-1"><p className={styles.note}>Runnable source specimen · the displayed facts are source fixtures and remain non-runtime authority.</p><LockedHomeHero /></section>;
}

function PdpSpecimen() {
  return <section className={styles.specimen} data-oluk-template-id="sites-pdp-first-fold-dossier"><p className={styles.note}>MK-2866 is an anatomy specimen. Shopper replaces fixture values with the established server projection and preserves its dossier interactions.</p><PdpFirstFold product={mk2866Fixture} /></section>;
}

function CommerceAtoms() {
  return <section className={styles.atomGrid} data-oluk-template-id="sites-commerce-state-contract"><article><span>Availability</span><ProductStatusStack inventory="in-stock" evidence="verified" /></article><article><span>Unavailable projection</span><ProductStatusStack inventory="unavailable" evidence="unavailable" /></article><p>Availability originates with Woo/C2. Evidence is source-owned. A successful customer action is a separate status treatment and is never substituted for stock.</p></section>;
}

export function PhaseOneSystem({ page }: Readonly<{ page?: string }>) {
  const selected = page ? phaseOnePages.find((item) => item.slug === page) : undefined;
  return <CustomerSiteChrome route="review"><main className={styles.main} id="main-content"><div className={styles.shell}><Link className={styles.back} href="/design-system">← Phase 1 system</Link><PageNavigation current={selected?.slug} />{!page ? <Overview /> : !selected ? <section className={styles.missing}><h1>System page not found</h1><p>The Phase 1 route registry does not declare this page.</p></section> : <section className={styles.detail} data-oluk-system-page={selected.slug}><p className="eyebrow">{String(selected.order).padStart(2, "0")} · {selected.group}</p><h1>{selected.title}</h1><p>{selected.purpose}</p><div className={styles.evidence}><strong>Acceptance</strong><span>{selected.evidence}</span></div>{selected.slug === "homepage" ? <HomepageSpecimen /> : null}{selected.slug === "pdp-mk-2866" ? <PdpSpecimen /> : null}{selected.slug === "commerce-atoms" ? <CommerceAtoms /> : null}{selected.slug === "consumer-bridge" ? <pre>{`Sites template props\n  -> Shopper SSR server adapter\n    -> C2/OpenLab projection + Woo-backed commerce\n      -> same-origin action bridge\n\nNo fixture commerce truth · no browser-direct C2/Woo/payment · no local cart authority`}</pre> : null}</section>}</div></main></CustomerSiteChrome>;
}
