import type { Metadata } from "next";
import { OwnerReviewSpecimen } from "../../../design-system/owner-review-specimen";

export const metadata: Metadata = { title: "Product continuation review specimen", robots: { index: false, follow: false } };

/** The customer continuation is the PDP anchor, not a duplicate destination. */
export default function ProductContinuationReviewSpecimen() {
  return <OwnerReviewSpecimen id="product-continuation" eyebrow="OWNER REVIEW · NOT PUBLIC" title="Product continuation specimen." copy="The customer continuation remains in the MK-2866 PDP decision flow." returnHref="/product/mk-2866#product-continuation" returnLabel="Return to product continuation" />;
}
