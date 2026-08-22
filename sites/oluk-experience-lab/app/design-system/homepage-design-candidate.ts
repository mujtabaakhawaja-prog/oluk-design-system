import type {
  LockedHomeHeroContent,
  LockedHomeHeroProduct,
} from "./locked-home-hero";
import { lockedHomeHeroMedia } from "./locked-home-hero-media";

/**
 * Deterministic Sites-only inputs for the first Homepage design wave.
 *
 * These values stage the visual and interaction contract. Native Next replaces
 * them with server-owned presentation adapters; this file is never a commerce,
 * inventory, or evidence provider.
 */
export const homepageHeroContent = {
  eyebrow: "FORMULATED. VERIFIED. BATCH TRACKED.",
  title: "Formulated to a higher standard.",
  description:
    "Third-party tested. Strength, servings, and fulfilment confirmed before checkout.",
  primaryAction: { href: "/shop", label: "Shop the range" },
  secondaryAction: { href: "/open-lab", label: "View Lab Records" },
} as const satisfies LockedHomeHeroContent;

export const homepageHeroProducts = [
  {
    canonicalProductId: "mk-2866",
    productName: "MK-2866",
    alias: "Ostarine",
    strengthDisplay: "15 MG",
    servingsDisplay: "90 SERVINGS",
    purityDisplay: ">99%",
    priceDisplay: "£43",
    href: "/product/mk-2866",
    inventoryState: "in-stock",
    evidenceState: "verified",
    media: lockedHomeHeroMedia["mk-2866"],
  },
  {
    canonicalProductId: "ment",
    productName: "MENT",
    alias: "Trestolone",
    strengthDisplay: "20 MG",
    servingsDisplay: "30 SERVINGS",
    purityDisplay: ">99%",
    priceDisplay: "£49",
    href: "/product/ment",
    inventoryState: "in-stock",
    evidenceState: "verified",
    media: lockedHomeHeroMedia.ment,
  },
  {
    canonicalProductId: "endurashred",
    productName: "ENDURASHRED",
    alias: "LGD-4033 + MK-2866",
    strengthDisplay: "16.5 MG",
    servingsDisplay: "90 SERVINGS",
    purityDisplay: ">99%",
    priceDisplay: null,
    href: "/product/endurashred",
    inventoryState: "unavailable",
    evidenceState: "verified",
    media: lockedHomeHeroMedia.endurashred,
  },
  {
    canonicalProductId: "rad-140",
    productName: "RAD-140",
    alias: "Testolone",
    strengthDisplay: "8 MG",
    servingsDisplay: "60 SERVINGS",
    purityDisplay: ">99%",
    priceDisplay: "£55",
    href: "/product/rad-140",
    inventoryState: "in-stock",
    evidenceState: "verified",
    media: lockedHomeHeroMedia["rad-140"],
  },
  {
    canonicalProductId: "mk-677",
    productName: "MK-677",
    alias: "Ibutamoren",
    strengthDisplay: "15 MG",
    servingsDisplay: "90 SERVINGS",
    purityDisplay: ">99%",
    priceDisplay: "£45",
    href: "/product/mk-677",
    inventoryState: "in-stock",
    evidenceState: "verified",
    media: lockedHomeHeroMedia["mk-677"],
  },
] as const satisfies readonly LockedHomeHeroProduct[];
