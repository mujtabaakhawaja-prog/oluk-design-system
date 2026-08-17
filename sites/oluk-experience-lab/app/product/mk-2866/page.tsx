import type { Metadata } from "next";
import { getFrontierProduct } from "../../design-system/frontier-content";
import { ProductPageComposition, productPageMetadata } from "../product-page";

const product = getFrontierProduct("mk-2866");
export const metadata: Metadata = product ? productPageMetadata(product) : {};

/** Retained concrete path delegates to the canonical dynamic PDP composition and metadata. */
export default function Mk2866CompatibilityPage() { return product ? <ProductPageComposition product={product} /> : null; }
