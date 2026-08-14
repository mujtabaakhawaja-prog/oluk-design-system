import { CustomerSiteChrome } from "../experience-lab";
import { frontierProducts } from "../design-system/frontier-content";
import { frontierProductPresentation } from "../design-system/frontier-product-presentation";
import { ProductCommerceCard } from "../design-system/product-commerce-card";

const compared = ["mk-2866", "rad-140", "mk-677"];

export default function ComparePage() {
  const products = compared.map((slug) => frontierProducts.find((product) => product.slug === slug)).filter(Boolean).map((product) => frontierProductPresentation(product!));
  return <CustomerSiteChrome route="shop"><main><section className="page-hero"><div className="shell"><span className="eyebrow">COMPARE PRODUCTS</span><h1>Choose the product direction that matches the result you want.</h1><p>Put strength, serving format and product focus side by side, then take the next decision into the full product detail.</p></div></section><section className="section"><div className="shell"><div className="section-heading"><span className="eyebrow">SIDE BY SIDE</span><h2>See the difference before you build.</h2></div><div className="product-relation-grid">{products.map((product) => <ProductCommerceCard contextKicker="COMPARE" key={product.id} product={product} secondaryHref={product.customerPath} secondaryLabel="View product" variant="relation"/>)}</div></div></section></main></CustomerSiteChrome>;
}
