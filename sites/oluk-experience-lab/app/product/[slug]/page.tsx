import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCustomerProductFixture,
  getProductContentEntry,
  getProductRouteVariant,
  getProductSeo,
  productContentSlugs,
  productJsonLdFromContent,
} from "../../design-system/product-content-adapter";
import {
  MobileDecisionSummary,
  ProductContentFaqs,
  ProductContentNarrative,
  ProductDetailDisclosure,
  ProductEvidenceSnapshot,
} from "../../design-system/pdp-sections";
import { PdpFirstFold } from "../../design-system/pdp-first-fold";
import { PresentationState } from "../../design-system/presentation-state";
import { ProductDossier } from "../../design-system/product-dossier";
import { CustomerSiteChrome } from "../../experience-lab";

export function generateStaticParams() {
  return productContentSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  if (!getProductContentEntry(params.slug)) return {};
  const seo = getProductSeo(params.slug);
  if (!seo) {
    return {
      title: "Product information unavailable | Olympus Labs UK",
      robots: { index: false, follow: true },
    };
  }
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const entry = getProductContentEntry(params.slug);
  if (!entry) return notFound();
  const product = getCustomerProductFixture(params.slug);
  if (!product) {
    return <CustomerSiteChrome route="product"><main><section className="section"><div className="shell"><PresentationState action={<a href="/shop">Browse available products →</a>} copy="We can’t show this product’s details until its customer information is ready." eyebrow="PRODUCT INFORMATION" headingLevel="h1" state="unavailable" title="Product information is not available yet."/></div></section></main></CustomerSiteChrome>;
  }

  const jsonLd = productJsonLdFromContent(params.slug);
  const dossierCopy = getProductRouteVariant(params.slug, "pdpDossier") ?? undefined;
  return <CustomerSiteChrome route="product"><main>{jsonLd ? <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }} type="application/ld+json"/> : null}<PdpFirstFold product={product}/><ProductDetailDisclosure product={product}/><ProductContentNarrative product={product}/><ProductDossier copy={dossierCopy} evidenceHref={product.evidencePath} id="dossier" product={product}/><ProductEvidenceSnapshot product={product}/><ProductContentFaqs product={product}/><MobileDecisionSummary product={product}/></main></CustomerSiteChrome>;
}
