import { CustomerSiteChrome } from "../experience-lab";
import { ProductCommerceCard } from "../design-system/product-commerce-card";
import { getCustomerProductFixture, productContentSlugs } from "../design-system/product-content-adapter";
import { PresentationState } from "../design-system/presentation-state";

export default function ComparePage() {
  const products = productContentSlugs.flatMap((slug) => {
    const product = getCustomerProductFixture(slug);
    return product ? [product] : [];
  });
  return <CustomerSiteChrome route="shop"><main><section className="page-hero"><div className="shell"><span className="eyebrow">COMPARE PRODUCTS</span><h1>Compare source-ready product facts.</h1><p>Only customer-ready facts from each product’s own content record can enter this view.</p></div></section><section className="section"><div className="shell">{products.length < 2 ? <PresentationState action={<a href="/shop">Browse available products →</a>} copy="A comparison needs at least two products with customer-ready facts. No incomplete product or borrowed evidence is shown." eyebrow="COMPARISON" state="unavailable" title="Product comparison is not available yet."/> : <div className="product-relation-grid">{products.map((product) => <ProductCommerceCard commerceTreatment="selection" contextKicker="COMPARE" key={product.id} product={product} secondaryHref={product.customerPath} secondaryLabel="View product" variant="relation"/>)}</div>}</div></section></main></CustomerSiteChrome>;
}
