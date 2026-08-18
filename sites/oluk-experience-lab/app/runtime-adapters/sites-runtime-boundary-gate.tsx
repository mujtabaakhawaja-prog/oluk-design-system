import type { ReactNode } from "react";

import {
  requireReadyFamily,
  type SitesRuntimeBoundary,
  type SitesRuntimeFamily,
  unboundSitesRuntimeBoundary,
} from "./sites-runtime-boundary";

/** Source-root guard: fixture output stays unreachable until a checked server adapter binds it. */
export function SitesRuntimeBoundaryGate({
  boundary = unboundSitesRuntimeBoundary,
  family = "discovery",
  children,
}: Readonly<{ boundary?: SitesRuntimeBoundary; family?: SitesRuntimeFamily; children: ReactNode }>) {
  if (requireReadyFamily(boundary, family)) return children;
  return <main data-runtime-boundary={boundary.source} id="main-content"><section className="page-hero"><div className="shell"><span className="eyebrow">OLYMPUS LABS UK</span><h1>The experience is preparing its verified product information.</h1><p>Product, evidence and purchase information are unavailable until their source-owned projections are connected.</p></div></section><section className="section"><div className="shell"><article className="utility-card" aria-live="polite" role="status"><span className="eyebrow">PROVIDER PENDING</span><h2>Nothing is available to purchase yet.</h2><p>This customer surface does not substitute fixture prices, media, evidence, stock, or actions while provider data is unavailable.</p></article></div></section></main>;
}
