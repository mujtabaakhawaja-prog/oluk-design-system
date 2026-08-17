import type { Metadata } from "next";
import { OwnerReviewSpecimen } from "../../design-system/owner-review-specimen";

export const metadata: Metadata = { title: "Collection review specimen", robots: { index: false, follow: false } };

/** Not a public collection destination: canonical discovery stays finite at /shop. */
export default function CollectionFamilyReviewSpecimen() {
  return <OwnerReviewSpecimen id="shop-family" eyebrow="OWNER REVIEW · NOT PUBLIC" title="Collection-family specimen." copy="Family filtering is reviewed through the canonical shop rather than emitted as a duplicate public collection." returnHref="/shop" returnLabel="Return to the shop" />;
}
