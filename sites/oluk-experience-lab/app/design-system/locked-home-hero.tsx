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
import { MetricRail } from "./metric-rail";
import styles from "./locked-home-hero.module.css";

export type LockedHomeHeroProduct = Readonly<{
  canonicalProductId: string;
  productName: string;
  alias?: string | null;
  strengthDisplay?: string | null;
  servingsDisplay?: string | null;
  purityDisplay?: string | null;
  priceDisplay?: string | null;
  href: string;
  media: Readonly<{
    src: string;
    width: number;
    height: number;
  }>;
}>;

export type LockedHomeHeroContent = Readonly<{
  eyebrow: string;
  title: string;
  description?: string | null;
  primaryAction: Readonly<{ href: string; label: string }>;
  secondaryAction?: Readonly<{ href: string; label: string }> | null;
}>;

export type LockedHomeHeroProps = Readonly<{
  /**
   * Exactly five canonical, server-bound products are required by the 5-3-1
   * stage. The component suppresses itself rather than restoring fixtures.
   */
  products?: readonly LockedHomeHeroProduct[];
  /** Owner-approved customer copy. No candidate copy is supplied locally. */
  content?: LockedHomeHeroContent | null;
}>;

const emptyProducts: readonly LockedHomeHeroProduct[] = [];
const featuredProductParam = "featured";

function isHeroProductId(
  value: string | null,
  products: readonly LockedHomeHeroProduct[],
): value is string {
  return Boolean(value) && products.some((product) => product.canonicalProductId === value);
}

function featuredProductFromLocation(products: readonly LockedHomeHeroProduct[]) {
  const defaultProductId = products[0]?.canonicalProductId ?? "";
  if (typeof window === "undefined" || !defaultProductId) return defaultProductId;
  const featured = new URL(window.location.href).searchParams.get(featuredProductParam);
  return isHeroProductId(featured, products) ? featured : defaultProductId;
}

function writeFeaturedProductToLocation(productId: string, defaultProductId: string) {
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

export function LockedHomeHero({
  content,
  products = emptyProducts,
}: LockedHomeHeroProps = {}) {
  const defaultProductId = products.length === 5 ? products[0]?.canonicalProductId ?? "" : "";
  const [activeId, setActiveId] = useState(defaultProductId);
  const rootRef = useRef<HTMLElement | null>(null);
  const resolvedIndex = products.findIndex((product) => product.canonicalProductId === activeId);
  const activeIndex = resolvedIndex >= 0 ? resolvedIndex : 0;
  const active = products[activeIndex];
  const ordered = useMemo(
    () => products.map((product, index) => ({
      product,
      slot: relativeSlot(index, activeIndex, products.length),
    })),
    [activeIndex, products],
  );

  const selectProduct = useCallback((
    productId: string,
    options?: Readonly<{ focus?: boolean; writeLocation?: boolean }>,
  ) => {
    if (!isHeroProductId(productId, products)) return;
    setActiveId(productId);
    if (options?.writeLocation !== false) {
      writeFeaturedProductToLocation(productId, defaultProductId);
    }
    if (options?.focus) {
      window.requestAnimationFrame(() => {
        rootRef.current
          ?.querySelector<HTMLButtonElement>(`[data-hero-product="${productId}"]`)
          ?.focus();
      });
    }
  }, [defaultProductId, products]);

  useEffect(() => {
    if (!defaultProductId) return;
    const restoreProduct = () => setActiveId(featuredProductFromLocation(products));

    restoreProduct();
    window.addEventListener("popstate", restoreProduct);
    window.addEventListener("pageshow", restoreProduct);
    return () => {
      window.removeEventListener("popstate", restoreProduct);
      window.removeEventListener("pageshow", restoreProduct);
    };
  }, [defaultProductId, products]);

  const moveFrom = useCallback((index: number, direction: -1 | 1) => {
    if (products.length !== 5) return;
    const nextIndex = (index + direction + products.length) % products.length;
    selectProduct(products[nextIndex].canonicalProductId, { focus: true });
  }, [products, selectProduct]);

  const onTabKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (products.length !== 5) return;
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % products.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + products.length) % products.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = products.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectProduct(products[nextIndex].canonicalProductId, { focus: true });
  }, [products, selectProduct]);

  if (!content || products.length !== 5 || !active) return null;

  return (
    <section
      className={styles.canvas}
      data-motion-contract="runtime-product-stage-5-3-1"
      data-state-restoration="url-featured-product"
      id="hero"
      ref={rootRef}
    >
      <div className={styles.hero} data-home-family="locked-5-3-1">
        <div className={styles.editorial}>
          <div
            className={styles.copy}
            data-copy-sequence="eyebrow-title-primary-actions"
            data-copy-surface="editorial"
            data-mobile-strategy="recompose"
          >
            <span>{content.eyebrow}</span>
            <h1>{content.title}</h1>
            {content.description ? <p>{content.description}</p> : null}
            <div className={styles.actions}>
              <ActionLink href={content.primaryAction.href}>{content.primaryAction.label}</ActionLink>
              {content.secondaryAction ? (
                <ActionLink href={content.secondaryAction.href} variant="secondary">
                  {content.secondaryAction.label}
                </ActionLink>
              ) : null}
            </div>
          </div>
          <div aria-hidden="true" className={styles.divider} />
          <section className={styles.decision} data-copy-surface="decision">
            <div className={styles.identity}>
              <span>Featured product</span>
              <h2>{active.productName}</h2>
              {active.alias ? <p>{active.alias}</p> : null}
            </div>
            <p aria-atomic="true" aria-live="polite" className="sr-only">
              Featured product changed to {active.productName}
              {active.alias ? `, ${active.alias}` : ""}.
            </p>
            <MetricRail
              className={styles.metrics}
              values={{
                purity: active.purityDisplay ?? null,
                servings: active.servingsDisplay ?? null,
                strength: active.strengthDisplay ?? null,
              }}
            />
            <div className={styles.commerceRow}>
              {active.priceDisplay ? (
                <div className={styles.price}>
                  <span>Price</span>
                  <strong>{active.priceDisplay}</strong>
                </div>
              ) : null}
              <div className={styles.commerceActions}>
                <ActionLink href={active.href} size="compact">View product</ActionLink>
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
                  aria-selected={product.canonicalProductId === active.canonicalProductId}
                  className={styles.tabControl}
                  data-hero-product={product.canonicalProductId}
                  id={`hero-product-tab-${product.canonicalProductId}`}
                  key={product.canonicalProductId}
                  onClick={() => selectProduct(product.canonicalProductId)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  role="tab"
                  size="compact"
                  tabIndex={product.canonicalProductId === active.canonicalProductId ? 0 : -1}
                  variant={product.canonicalProductId === active.canonicalProductId ? "primary" : "secondary"}
                >
                  {product.productName}
                </ActionButton>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.stageColumn}>
          <div
            aria-labelledby={`hero-product-tab-${active.canonicalProductId}`}
            className={styles.stage}
            data-mobile-priority="active-product-first"
            data-proof-allow-overflow
            data-reduced-motion="static-state"
            id="hero-product-stage"
            role="tabpanel"
            tabIndex={0}
          >
            <span aria-hidden="true" className={styles.glow} />
            {ordered.map(({ product, slot }) => (
              <button
                aria-label={`Show ${product.productName} in the featured product stage`}
                aria-pressed={slot === 0}
                className={styles.bottle}
                data-control-exception="authored-media-stage-selector"
                data-active={slot === 0 || undefined}
                data-stage-media-selector
                data-slot={slot}
                key={product.canonicalProductId}
                onClick={() => selectProduct(product.canonicalProductId)}
                tabIndex={slot === 0 ? 0 : -1}
                type="button"
              >
                <img
                  alt={slot === 0
                    ? `${product.productName}${product.alias ? ` ${product.alias}` : ""} bottle`
                    : ""}
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
        </div>
      </div>
    </section>
  );
}
