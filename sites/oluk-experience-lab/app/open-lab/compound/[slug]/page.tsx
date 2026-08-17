import { notFound } from "next/navigation";
import { OpenLabDossierComposition } from "../../../design-system/openlab-sections";
import { getCustomerProductFixture, getProductContentEntry, productContentSlugs } from "../../../design-system/product-content-adapter";
import { PresentationState } from "../../../design-system/presentation-state";
import { CustomerSiteChrome } from "../../../experience-lab";

export function generateStaticParams(){return productContentSlugs.map((slug)=>({slug}));}
export default function CompoundDossierPage({params}:{params:{slug:string}}){const entry=getProductContentEntry(params.slug);if(!entry)return notFound();const product=getCustomerProductFixture(params.slug);if(!product)return <CustomerSiteChrome route="openlab"><main><section className="section"><div className="shell"><PresentationState action={<a href="/open-lab/records">Browse available records →</a>} copy="No product record or analytical value from another product is used in its place." eyebrow="OPENLAB AVAILABILITY" headingLevel="h1" state="unavailable" title="Product evidence is not available yet."/></div></section></main></CustomerSiteChrome>;return <CustomerSiteChrome route="openlab"><main data-compound={product.id}><h1 className="sr-only">{product.name} / {product.alias}</h1><OpenLabDossierComposition productSlug={product.id}/></main></CustomerSiteChrome>}
