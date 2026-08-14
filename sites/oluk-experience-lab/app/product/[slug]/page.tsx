import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductContinuation, ProductNarrative } from "../../design-system/frontier-sections";
import { frontierProducts, getFrontierProduct, productJsonLd } from "../../design-system/frontier-content";
import { frontierProductPresentation } from "../../design-system/frontier-product-presentation";
import { MobileDecisionSummary, ProductDetailDisclosure, ProductEvidenceSnapshot } from "../../design-system/pdp-sections";
import { AssuranceRail } from "../../design-system/assurance-rail";
import { ProductDossier } from "../../design-system/product-dossier";
import { PdpFirstFold } from "../../design-system/pdp-first-fold";
import { CustomerSiteChrome } from "../../experience-lab";

export function generateStaticParams(){return frontierProducts.map(({slug})=>({slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{const product=getFrontierProduct(params.slug);return product?{title:`${product.name} ${product.strength} | Olympus Labs UK`,description:product.summary,alternates:{canonical:`/product/${product.slug}`}}:{};}
export default function FrontierProductPage({params}:{params:{slug:string}}){const product=getFrontierProduct(params.slug);if(!product)return notFound();const presentation=frontierProductPresentation(product);return <CustomerSiteChrome route="product"><main><script dangerouslySetInnerHTML={{__html:JSON.stringify(productJsonLd(product))}} type="application/ld+json"/><PdpFirstFold product={presentation}/><section className="section pdp-assurance"><div className="shell"><AssuranceRail variant="compact"/></div></section><ProductDetailDisclosure product={presentation}/><ProductNarrative product={product}/><ProductDossier evidenceHref={presentation.evidencePath} id="dossier" product={presentation}/><ProductEvidenceSnapshot product={presentation}/><ProductContinuation product={product}/><MobileDecisionSummary product={presentation}/></main></CustomerSiteChrome>;}
