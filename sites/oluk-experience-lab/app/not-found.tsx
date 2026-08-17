import Link from "next/link";

import { SiteFooter } from "./design-system/site-footer";
import { SiteHeader } from "./design-system/site-header";

export default function NotFound() {
  return <><SiteHeader route="shop"/><main className="not-found-surface"><section className="page-hero"><div className="shell"><span className="eyebrow">PAGE NOT FOUND</span><h1>Let’s get you back to the next product decision.</h1><p>The page you were looking for has moved or is no longer available. Browse the range, compare products, or open OpenLab.</p><div className="button-row"><Link className="button" href="/shop">Shop the range →</Link><Link className="button button-secondary" href="/open-lab">Open OpenLab →</Link></div></div></section><div className="shell not-found-links"><Link href="/product/mk-2866"><span>01</span><strong>MK-2866</strong><small>Return to the featured product.</small></Link><Link href="/compare"><span>02</span><strong>Compare products</strong><small>Put the next decision side by side.</small></Link><Link href="/faq-help-centre"><span>03</span><strong>Get help</strong><small>Find delivery and product answers.</small></Link></div></main><SiteFooter/></>;
}
