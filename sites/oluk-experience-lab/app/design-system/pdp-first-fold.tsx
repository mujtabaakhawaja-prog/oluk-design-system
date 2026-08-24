/* eslint-disable @next/next/no-img-element -- transparent product render requires authored alpha and crop treatment. */

import { Breadcrumbs } from "./customer-route-primitives";
import type { ProductFixture } from "./product-fixtures";
import { PurchasePanel } from "./purchase-panel";
import styles from "./pdp-first-fold.module.css";

export function PdpAtmosphericMediaField({ product }: Readonly<{ product: ProductFixture }>) {
  return (
    <div
      className={styles.media}
      data-bounded-media-chamber="false"
      data-media-context="pdp-first-fold"
      data-plane-elevation="none"
      data-oluk-node="component.pdp-atmospheric-media-field"
      data-surface-role="pdp-atmospheric-field"
    >
      <span aria-hidden="true" className={styles.atmosphere} data-oluk-node="primitive.pdp-atmosphere-light" />
      {product.media ? (
        <img
          alt={`${product.name} ${product.alias} bottle`}
          data-oluk-node="media.pdp-product-render"
          decoding="async"
          fetchPriority="high"
          height={product.media.height}
          loading="eager"
          sizes="(max-width: 760px) 82vw, 48vw"
          src={product.media.src}
          width={product.media.width}
        />
      ) : (
        <div
          aria-label={`${product.name} product render coming soon`}
          className={styles.unpopulatedMedia}
          data-oluk-node="state.pdp-missing-media"
        >
          <span>{product.series}</span>
          <strong>{product.name}</strong>
          <small>Product render coming soon</small>
        </div>
      )}
    </div>
  );
}

export function PdpFirstFold({ product }: Readonly<{ product: ProductFixture }>) {
  return (
    <section
      className={styles.fold}
      data-figma-node="717:16137"
      data-figma-purchase-panel="626:12659"
      data-figma-reference-nodes="551:25865 599:69630 1384:16367"
      data-figma-visual-area="717:16140"
      data-object-pair="pdp-atmospheric-field purchase-decision-plane"
      data-oluk-node="module.pdp-first-fold"
      data-oluk-slot="slot.product-detail.pdp.first-fold"
      data-surface-exception="pdp-media-purchase-decision-pair"
      id="purchase"
    >
      <div className={`shell ${styles.breadcrumb}`} data-oluk-node="slot.product-detail.pdp.breadcrumb"><Breadcrumbs items={[{ label: "Shop", href: "/shop" },{ label: "SARMs", href: "/shop?family=sarms" },{ label: product.name }]}/></div>
      <div className={`shell ${styles.composition}`} data-oluk-node="template.product-detail.first-fold">
        <PdpAtmosphericMediaField product={product} />
        <PurchasePanel
          bottleOptions
          className={styles.panel}
          contentMode="facts-only"
          headingLevel="h1"
          product={product}
          reviewMode
          width="desktop"
        />
      </div>
    </section>
  );
}
