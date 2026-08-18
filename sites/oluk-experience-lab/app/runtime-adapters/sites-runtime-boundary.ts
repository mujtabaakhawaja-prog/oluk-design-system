/**
 * The only host-local seam for runtime-owned values in the recovered Sites app.
 *
 * This module deliberately contains no transport, environment, or provider
 * import. A production host may supply checked server projections here later;
 * until then every authority-owned field is explicitly unavailable.  Route
 * components retain their literal Sites composition and must never fall back
 * to a design fixture through this boundary.
 */

export type SitesRuntimeFamily =
  | "discovery"
  | "product"
  | "openlab"
  | "selection"
  | "lifecycle"
  | "support-system";

export type RuntimeAvailability = "pending" | "unavailable" | "ready";

export type SitesRuntimeBoundary = Readonly<{
  source: "host-server" | "unbound";
  families: Readonly<Record<SitesRuntimeFamily, RuntimeAvailability>>;
  /**
   * C2 projections may be supplied by the host server only after their
   * identity/binding guard accepts them. Browser C2 transport is prohibited.
   */
  c2Projection: null;
  /** Woo availability, price and purchasability remain unavailable by default. */
  wooProjection: null;
  /** The existing same-origin cart/signed-checkout seam remains host-owned. */
  initiatorBoundary: "preserved-unbound";
}>;

export const unboundSitesRuntimeBoundary: SitesRuntimeBoundary = Object.freeze({
  source: "unbound",
  families: Object.freeze({
    discovery: "pending",
    product: "pending",
    openlab: "pending",
    selection: "pending",
    lifecycle: "pending",
    "support-system": "pending",
  }),
  c2Projection: null,
  wooProjection: null,
  initiatorBoundary: "preserved-unbound",
});

export function requireReadyFamily(
  boundary: SitesRuntimeBoundary,
  family: SitesRuntimeFamily,
): boolean {
  return boundary.families[family] === "ready";
}

/**
 * Gates the recovered app at its source root. It preserves the literal route
 * graph beneath it, while preventing fixture-derived commerce/evidence/media
 * from becoming customer DOM before a checked server adapter is supplied.
 */
