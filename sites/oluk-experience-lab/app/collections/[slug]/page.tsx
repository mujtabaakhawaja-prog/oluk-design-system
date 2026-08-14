import { notFound } from "next/navigation";

import { frontierProducts, productFamilies } from "../../design-system/frontier-content";
import { ProductCollection } from "../../design-system/frontier-sections";
import { CustomerSiteChrome } from "../../experience-lab";

const collections = {
  featured: { title: "Featured products", family: null },
  sarms: { title: "SARMs", family: "Research Chemicals" },
  "research-chemicals": { title: "Research chemicals", family: "Research Chemicals" },
  prohormones: { title: "Prohormones", family: "Metabolics" },
  stacks: { title: "Stacks", family: null },
} as const;

export function generateStaticParams() { return Object.keys(collections).map((slug) => ({ slug })); }

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = collections[params.slug as keyof typeof collections];
  if (!collection) return notFound();
  const products = collection.family
    ? frontierProducts.filter((product) => product.family === collection.family)
    : collection.title === "Featured products"
      ? frontierProducts.slice(0, 8)
      : frontierProducts.filter((product) => product.stack.length > 0);
  const familySummary = collection.family ? productFamilies.find(({ name }) => name === collection.family)?.summary : "Shop proven combinations by outcome, then choose the products that make the next phase work harder.";
  return <CustomerSiteChrome route="shop"><main><section className="page-hero"><div className="shell"><span className="eyebrow">COLLECTION</span><h1>{collection.title}</h1><p>{familySummary}</p></div></section><ProductCollection products={products}/></main></CustomerSiteChrome>;
}
