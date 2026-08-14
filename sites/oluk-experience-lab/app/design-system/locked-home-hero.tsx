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
import { lockedHomeHeroMedia } from "./locked-home-hero-media";
import { MetricRail } from "./metric-rail";
import { SurfaceGrid, SurfaceGridZone } from "./surface-grid";
import styles from "./locked-home-hero.module.css";

const products = [
  { id: "mk-2866", name: "MK-2866", alias: "Ostarine", strength: "15 MG", servings: "90 SERVINGS", purity: ">99%", price: "£43", media: lockedHomeHeroMedia["mk-2866"], href: "/product/mk-2866" },
  { id: "ment", name: "MENT", alias: "Trestolone", strength: "20 MG", servings: "30 SERVINGS", purity: ">99%", price: "£49", media: lockedHomeHeroMedia.ment, href: "/shop?search=MENT" },
  { id: "endurashred", name: "ENDURASHRED", alias: "LGD-4033 + MK-2866", strength: "16.5 MG", servings: "90 SERVINGS", purity: ">99%", price: "£59", media: lockedHomeHeroMedia.endurashred, href: "/shop?search=ENDURASHRED" },
  { id: "rad-140", name: "RAD-140", alias: "Testolone", strength: "8 MG", servings: "60 SERVINGS", purity: ">99%", price: "£55", media: lockedHomeHeroMedia["rad-140"], href: "/shop?search=RAD-140" },
  { id: "mk-677", name: "MK-677", alias: "Ibutamoren", strength: "15 MG", servings: "90 SERVINGS", purity: ">99%", price: "£45", media: lockedHomeHeroMedia["mk-677"], href: "/shop?search=MK-677" },
] as const;

type HeroProduct = (typeof products)[number];
type HeroProductId = HeroProduct["id"];

const defaultProductId = products[0].id;
const featuredProductParam = "featured";

function isHeroProductId(value: string | null): value is HeroProductId {
  return products.some((product) => product.id === value);
}

function featuredProductFromLocation(): HeroProductId {
  if (typeof window === "undefined") return defaultProductId;
  const featured = new URL(window.location.href).searchParams.get(featuredProductParam);
  return isHeroProductId(featured) ? featured : defaultProductId;
}

function writeFeaturedProductToLocation(productId: HeroProductId) {
  const url = new URL(window.location.href);
  if (productId === defaultProductId) url.searchParams.delete(featuredProductParam);
  else url.searchParams.set(featuredProductParam, productId);
  window.history.replaceState(window.history.state, "", url);
}

function relativeSlot(index: number, activeIndex: number) {
  const count = products.length;
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

export function LockedHomeHero() {
  const [activeId, setActiveId] = useState<HeroProductId>(defaultProductId);
  const rootRef = useRef<HTMLElement | null>(null);
  const activeIndex = products.findIndex((product) => product.id === activeId);
  const active = products[activeIndex];
  const ordered = useMemo(
    () => products.map((product, index) => ({ product, slot: relativeSlot(index, activeIndex) })),
    [activeIndex],
  );

  const selectProduct = useCallback((
    productId: HeroProductId,
    options?: Readonly<{ focus?: boolean; writeLocation?: boolean }>,
  ) => {
    setActiveId(productId);
    if (options?.writeLocation !== false) writeFeaturedProductToLocation(productId);
    if (options?.focus) {
      window.requestAnimationFrame(() => {
        rootRef.current
          ?.querySelector<HTMLButtonElement>(`[data-hero-product="${productId}"]`)
          ?.focus();
      });
    }
  }, []);

  useEffect(() => {
    const restoreProduct = () => setActiveId(featuredProductFromLocation());

    restoreProduct();
    window.addEventListener("popstate", restoreProduct);
    window.addEventListener("pageshow", restoreProduct);
    return () => {
      window.removeEventListener("popstate", restoreProduct);
      window.removeEventListener("pageshow", restoreProduct);
    };
  }, []);

  const moveFrom = useCallback((index: number, direction: -1 | 1) => {
    const nextIndex = (index + direction + products.length) % products.length;
    selectProduct(products[nextIndex].id, { focus: true });
  }, [selectProduct]);

  const onTabKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % products.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + products.length) % products.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = products.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectProduct(products[nextIndex].id, { focus: true });
  }, [selectProduct]);

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
            copy="Third-party tested products, clearly stated specifications and direct access to available lab records—before you choose."
            eyebrow="Formulated. Verified. Batch tracked."
            headingLevel="h1"
            title="Formulated to a higher standard."
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
                <strong>{active.price}</strong>
              </div>
              <div className={styles.commerceActions}>
                <ActionLink href={active.href} size="compact">View product</ActionLink>
                <ActionButton disabled size="compact" variant="secondary">Add to bag</ActionButton>
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
