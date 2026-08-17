import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { frontierProducts, getFrontierProduct } from "../../design-system/frontier-content";
import { ProductPageComposition, productPageMetadata } from "../product-page";

export function generateStaticParams(){return frontierProducts.map(({slug})=>({slug}));}
export function generateMetadata({params}:{params:{slug:string}}):Metadata{const product=getFrontierProduct(params.slug);return product?productPageMetadata(product):{};}
export default function FrontierProductPage({params}:{params:{slug:string}}){const product=getFrontierProduct(params.slug);if(!product)return notFound();return <ProductPageComposition product={product}/>;}
