import type { Metadata } from "next";
import { AssuranceRail } from "../design-system/assurance-rail";
import type { FrontierProductRecord } from "../design-system/frontier-content";
import { productJsonLd } from "../design-system/frontier-content";
import { ProductContinuation, ProductNarrative } from "../design-system/frontier-sections";
import { frontierProductPresentation } from "../design-system/frontier-product-presentation";
import { PdpFirstFold } from "../design-system/pdp-first-fold";
import { MobileDecisionSummary, ProductDetailDisclosure, ProductEvidenceSnapshot } from "../design-system/pdp-sections";
import { ProductDossier } from "../design-system/product-dossier";
import { CustomerSiteChrome } from "../experience-lab";

export function productPageMetadata(product: FrontierProductRecord): Metadata {
  return { title: `${product.name} ${product.strength} | Olympus Labs UK`, description: product.summary, alternates: { canonical: `/product/${product.slug}` } };
}

/** The dynamic PDP composition shared by canonical and retained concrete paths. */
export function ProductPageComposition({ product }: Readonly<{ product: FrontierProductRecord }>) {
  const presentation = frontierProductPresentation(product);
  return <CustomerSiteChrome route="product"><main>
    <script dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }} type="application/ld+json" />
    <PdpFirstFold product={presentation} />
    <section className="section pdp-assurance"><div className="shell"><AssuranceRail variant="compact" /></div></section>
    <ProductDetailDisclosure product={presentation} />
    <ProductNarrative product={product} />
    <ProductDossier evidenceHref={presentation.evidencePath} id="dossier" product={presentation} />
    <ProductEvidenceSnapshot product={presentation} />
    <ProductContinuation product={product} />
    <MobileDecisionSummary product={presentation} />
  </main></CustomerSiteChrome>;
}
