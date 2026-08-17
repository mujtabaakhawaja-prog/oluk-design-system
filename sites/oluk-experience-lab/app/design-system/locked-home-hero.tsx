/* eslint-disable @next/next/no-img-element -- runtime-authored transparent product renders require direct picture-stage treatment. */
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { ActionButton, ActionLink } from "./action-control";
import { DecisionSurface, EditorialSurface } from "./content-surfaces";
import { MetricRail } from "./metric-rail";
import type { ProductFixture, ProductMediaAsset } from "./product-fixtures";
import { SurfaceGrid, SurfaceGridZone } from "./surface-grid";
import styles from "./locked-home-hero.module.css";

type HeroProduct = Readonly<{
  id: string;
  name: string;
  alias: string;
  strength: string;
  servings: string;
  purity: string;
  price: string;
  media: ProductMediaAsset;
  href: string;
}>;
type HeroProductId = string;
type LockedHomeHeroProps = Readonly<{
  product: ProductFixture & Readonly<{ media: ProductMediaAsset }>;
}>;

const featuredProductParam = "featured";

function isHeroProductId(products: readonly HeroProduct[], value: string | null): value is HeroProductId {
  return products.some((product) => product.id === value);
}

function featuredProductFromLocation(products: readonly HeroProduct[], defaultProductId: HeroProductId): HeroProductId {
  if (typeof window === "undefined") return defaultProductId;
  const featured = new URL(window.location.href).searchParams.get(featuredProductParam);
  return isHeroProductId(products, featured) ? featured : defaultProductId;
}

function writeFeaturedProductToLocation(productId: HeroProductId, defaultProductId: HeroProductId) {
  const url = new URL(window.location.href);
  if (productId === defaultProductId) url.searchParams.delete(featuredProductParam);
  else url.searchParams.set(featuredProductParam, productId);
  window.history.replaceState(window.history.state, "", url);
}

function relativeSlot(index: number, activeIndex: number, count: number) {
  let delta = index - activeIndex;
  if (delta > count / 2) delta -= count;
  if (delta < -count / 2) delta += count;
  return delta;
}

function ArrowIcon({ direction }: Readonly<{ direction: "previous" | "next" }>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path
        d={direction === "previous" ? "M12.75 4.75 7.5 10l5.25 5.25" : "m7.25 4.75 5.25 5.25-5.25 5.25"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function LockedHomeHero({ product: readyProduct }: LockedHomeHeroProps) {
  const products = useMemo<readonly HeroProduct[]>(() => [{
    id: readyProduct.id,
    name: readyProduct.name,
    alias: readyProduct.alias,
    strength: readyProduct.strength,
    servings: readyProduct.servings,
    purity: readyProduct.purity,
    price: readyProduct.price,
    media: readyProduct.media,
    href: readyProduct.customerPath,
  }], [readyProduct]);
  const defaultProductId = products[0].id;
  const [activeId, setActiveId] = useState<HeroProductId>(defaultProductId);
  const rootRef = useRef<HTMLElement | null>(null);
  const activeIndex = products.findIndex((product) => product.id === activeId);
  const active = products[activeIndex];
  const ordered = useMemo(
    () => products.map((product, index) => ({ product, slot: relativeSlot(index, activeIndex, products.length) })),
    [activeIndex, products],
  );

  const selectProduct = useCallback((
    productId: HeroProductId,
    options?: Readonly<{ focus?: boolean; writeLocation?: boolean }>,
  ) => {
    setActiveId(productId);
    if (options?.writeLocation !== false) writeFeaturedProductToLocation(productId, defaultProductId);
    if (options?.focus) {
      window.requestAnimationFrame(() => {
        rootRef.current
          ?.querySelector<HTMLButtonElement>(`[data-hero-product="${productId}"]`)
          ?.focus();
      });
    }
  }, [defaultProductId]);

  useEffect(() => {
    const restoreProduct = () => {
      const productId = featuredProductFromLocation(products, defaultProductId);
      setActiveId(productId);
      writeFeaturedProductToLocation(productId, defaultProductId);
    };

    restoreProduct();
    window.addEventListener("popstate", restoreProduct);
    window.addEventListener("pageshow", restoreProduct);
    return () => {
      window.removeEventListener("popstate", restoreProduct);
      window.removeEventListener("pageshow", restoreProduct);
    };
  }, [defaultProductId, products]);

  const moveFrom = useCallback((index: number, direction: -1 | 1) => {
    const nextIndex = (index + direction + products.length) % products.length;
    selectProduct(products[nextIndex].id, { focus: true });
  }, [products, selectProduct]);

  const onTabKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % products.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + products.length) % products.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = products.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectProduct(products[nextIndex].id, { focus: true });
  }, [products, selectProduct]);

  return (
    <section
      className={styles.canvas}
      data-figma-node="1155:29963"
      data-motion-contract="runtime-product-stage-5-3-1"
      data-state-restoration="url-featured-product"
      id="hero"
      ref={rootRef}
    >
      <SurfaceGrid className={styles.composition}>
        <SurfaceGridZone className={styles.editorialZone} zone="split-start">
          <EditorialSurface
            actions={(
              <>
                <ActionLink href="/shop">Shop the range</ActionLink>
                <ActionLink href="/open-lab/records" variant="secondary">View Lab Records</ActionLink>
              </>
            )}
            className={styles.editorialSurface}
            copy="Label-bound product details and available source records stay clearly separated before you choose."
            eyebrow="Product facts. Source context. Clear boundaries."
            headingLevel="h1"
            title="Product facts, made easier to review."
          />
        </SurfaceGridZone>

        <SurfaceGridZone className={styles.stageZone} zone="split-end">
          <div
            aria-labelledby={`hero-product-tab-${active.id}`}
            className={styles.stage}
            data-figma-stage-node="462:4684"
            data-mobile-priority="active-product-first"
            data-proof-allow-overflow
            data-reduced-motion="static-state"
            id="hero-product-stage"
            role="tabpanel"
            tabIndex={0}
          >
            <span aria-hidden="true" className={styles.glow} />
            {ordered.map(({ product, slot }) => (
              /* A bottle is the authored media-stage selector itself, not a locally
                 redrawn visible action. All labelled action controls below use ActionControl. */
              <button
                aria-label={`Show ${product.name} in the featured product stage`}
                aria-pressed={slot === 0}
                className={styles.bottle}
                data-control-exception="authored-media-stage-selector"
                data-active={slot === 0 || undefined}
                data-stage-media-selector
                data-slot={slot}
                key={product.id}
                onClick={() => selectProduct(product.id)}
                tabIndex={slot === 0 ? 0 : -1}
                type="button"
              >
                <img
                  alt={slot === 0 ? `${product.name} ${product.alias} bottle` : ""}
                  decoding="async"
                  fetchPriority={slot === 0 ? "high" : "auto"}
                  height={product.media.height}
                  loading={slot === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 700px) 50vw, 24vw"
                  src={product.media.src}
                  width={product.media.width}
                />
              </button>
            ))}
            <div className={styles.stageControls}>
              <ActionButton
                aria-label="Previous featured product"
                className={styles.stageControl}
                onClick={() => moveFrom(activeIndex, -1)}
                size="compact"
                variant="secondary"
              >
                <ArrowIcon direction="previous" />
              </ActionButton>
              <span aria-live="polite" className={styles.stageCount}>
                {String(activeIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
              </span>
              <ActionButton
                aria-label="Next featured product"
                className={styles.stageControl}
                onClick={() => moveFrom(activeIndex, 1)}
                size="compact"
                variant="secondary"
              >
                <ArrowIcon direction="next" />
              </ActionButton>
            </div>
          </div>
        </SurfaceGridZone>

        <SurfaceGridZone className={styles.decisionZone} zone="split-start">
          <DecisionSurface
            className={styles.decisionSurface}
            compact
            copy={active.alias}
            eyebrow="FEATURED PRODUCT"
            title={active.name}
          >
            <p aria-atomic="true" aria-live="polite" className="sr-only">
              Featured product changed to {active.name}, {active.alias}.
            </p>
            <MetricRail
              className={styles.metrics}
              values={{
                purity: active.purity,
                servings: active.servings,
                strength: active.strength,
              }}
            />
            <div className={styles.commerceRow}>
              <div className={styles.price}>
                <span>Price</span>
                <strong>{active.price || "Price unavailable"}</strong>
              </div>
              <div className={styles.commerceActions}>
                <ActionLink href={active.href} size="compact">View product</ActionLink>
                <ActionButton disabled size="compact" variant="secondary">Unavailable</ActionButton>
              </div>
            </div>
            <div
              aria-label="Featured product"
              aria-orientation="horizontal"
              className={styles.tabs}
              role="tablist"
            >
              {products.map((product, index) => (
                <ActionButton
                  aria-controls="hero-product-stage"
                  aria-selected={product.id === active.id}
                  className={styles.tabControl}
                  data-hero-product={product.id}
                  id={`hero-product-tab-${product.id}`}
                  key={product.id}
                  onClick={() => selectProduct(product.id)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  role="tab"
                  size="compact"
                  tabIndex={product.id === active.id ? 0 : -1}
                  variant={product.id === active.id ? "primary" : "secondary"}
                >
                  {product.name}
                </ActionButton>
              ))}
            </div>
          </DecisionSurface>
        </SurfaceGridZone>
      </SurfaceGrid>
    </section>
  );
}
