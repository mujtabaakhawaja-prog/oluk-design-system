/* eslint-disable @next/next/no-img-element -- transparent product render requires authored alpha and crop treatment. */

import { Breadcrumbs } from "./customer-route-primitives";
import type { ProductFixture } from "./product-fixtures";
import { PurchasePanel } from "./purchase-panel";
import styles from "./pdp-first-fold.module.css";

export function PdpFirstFold({ product }: Readonly<{ product: ProductFixture }>) {
  return (
    <section className={styles.fold} data-figma-node="1155:30632" id="purchase">
      <div className={`shell ${styles.breadcrumb}`}><Breadcrumbs items={[{ label: "Shop", href: "/shop" },{ label: "SARMs", href: "/shop?family=sarms" },{ label: product.name }]}/></div>
      <div className={`shell ${styles.composition}`}>
        <div className={styles.media}>
          <span aria-hidden="true" className={styles.atmosphere}/>
          <img alt={`${product.name} ${product.alias} bottle`} decoding="async" fetchPriority="high" height={product.media.height} loading="eager" sizes="(max-width: 760px) 82vw, 48vw" src={product.media.src} width={product.media.width}/>
        </div>
        <PurchasePanel className={styles.panel} headingLevel="h1" product={product}/>
      </div>
    </section>
  );
}
