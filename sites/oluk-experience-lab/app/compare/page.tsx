import { CustomerSiteChrome } from "../experience-lab";
import { frontierProducts } from "../design-system/frontier-content";
import { frontierProductPresentation } from "../design-system/frontier-product-presentation";
import { ProductCommerceCard } from "../design-system/product-commerce-card";
import { createProductRelationship } from "../design-system/product-fixtures";

const compared = ["mk-2866", "rad-140", "mk-677"];

export default function ComparePage() {
  const products = compared.map((slug) => frontierProducts.find((product) => product.slug === slug)).filter(Boolean).map((product) => frontierProductPresentation(product!));
  return <CustomerSiteChrome route="shop"><main><section className="page-hero"><div className="shell"><span className="eyebrow">COMPARE PRODUCTS</span><h1>Choose the product direction that matches the result you want.</h1><p>Put strength, serving format and product focus side by side, then take the next decision into the full product detail.</p></div></section><section className="section"><div className="shell"><div className="section-heading"><span className="eyebrow">SIDE BY SIDE</span><h2>See the difference before you build.</h2></div><div className="product-relation-grid">{products.map((product, index) => {
    const anchor = products[index === 0 ? 1 : 0] ?? product;
    return <ProductCommerceCard key={product.id} product={product} relationship={createProductRelationship(anchor, product, {
      type: "comparison",
      reason: {
        claim: `Compare ${product.name} with ${anchor.name} using their labelled product facts.`,
        sourceCoordinate: `${product.authority.sourceRef} | ${anchor.authority.sourceRef}`,
      },
      action: { href: product.customerPath, label: "View product" },
    })} variant="relation"/>;
  })}</div></div></section></main></CustomerSiteChrome>;
}
