import { notFound } from "next/navigation";
import { OpenLabDossierComposition } from "../../../design-system/openlab-sections";
import { getFrontierProduct, frontierProducts } from "../../../design-system/frontier-content";
export function generateStaticParams(){return frontierProducts.slice(0,4).map(({slug})=>({slug}));}
export default function CompoundDossierPage({params}:{params:{slug:string}}){const product=getFrontierProduct(params.slug);if(!product)return notFound();return <main data-compound={product.slug}><h1 className="sr-only">{product.name} / {product.alias}</h1><OpenLabDossierComposition/></main>}
