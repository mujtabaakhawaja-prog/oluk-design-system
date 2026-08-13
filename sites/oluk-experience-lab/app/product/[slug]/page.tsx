import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductContinuation, ProductHero, ProductNarrative } from "../../design-system/frontier-sections";
import { frontierProducts, getFrontierProduct, productJsonLd } from "../../design-system/frontier-content";

export function generateStaticParams(){return frontierProducts.map(({slug})=>({slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{const product=getFrontierProduct(params.slug);return product?{title:`${product.name} ${product.strength} | Olympus Labs UK`,description:product.summary,alternates:{canonical:`/product/${product.slug}`}}:{};}
export default function FrontierProductPage({params}:{params:{slug:string}}){const product=getFrontierProduct(params.slug);if(!product)return notFound();return <main><script dangerouslySetInnerHTML={{__html:JSON.stringify(productJsonLd(product))}} type="application/ld+json"/><ProductHero product={product}/><ProductNarrative product={product}/><ProductContinuation product={product}/></main>;}
