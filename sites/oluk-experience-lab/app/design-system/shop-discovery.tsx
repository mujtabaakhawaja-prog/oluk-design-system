"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { ProductCommerceCard } from "./product-commerce-card";
import { actualProductMedia, getFrontierProduct } from "./frontier-content";
import {
  mk2866Fixture,
  rad140Fixture,
  type ProductFixture,
  type ProductMediaAsset,
} from "./product-fixtures";
import {
  filterShopTaxonomyFixtures,
  SHOP_AVAILABILITY_OPTIONS,
  SHOP_FAMILY_OPTIONS,
  SHOP_FORM_OPTIONS,
  SHOP_GOAL_OPTIONS,
  SHOP_SERVINGS_OPTIONS,
  SHOP_TAXONOMY_FIXTURE_PRODUCTS,
  type ShopAvailabilityState,
  type ShopFamilySlug,
  type ShopFormSlug,
  type ShopGoalRouteSlug,
  type ShopServingsCount,
  type ShopTaxonomyFixtureProduct,
  type ShopTaxonomySelection,
} from "./shop-taxonomy";

type FilterState = {
  families: ShopFamilySlug[];
  goals: ShopGoalRouteSlug[];
  forms: ShopFormSlug[];
  servings: ShopServingsCount[];
  availability: ShopAvailabilityState[];
};

type SortMode = "featured" | "name" | "price";

const familySlugs = new Set<ShopFamilySlug>(SHOP_FAMILY_OPTIONS.map(({ slug }) => slug));
const goalSlugs = new Set<ShopGoalRouteSlug>(SHOP_GOAL_OPTIONS.map(({ slug }) => slug));
const formSlugs = new Set<ShopFormSlug>(SHOP_FORM_OPTIONS.map(({ slug }) => slug));
const servingsCounts = new Set<ShopServingsCount>(SHOP_SERVINGS_OPTIONS.map(({ count }) => count));
const availabilitySlugs = new Set<ShopAvailabilityState>(SHOP_AVAILABILITY_OPTIONS.map(({ slug }) => slug));
const SHOP_URL_CHANGE_EVENT = "oluk:shop-url-change";

function subscribeToLocation(callback: () => void): () => void {
  window.addEventListener("popstate", callback);
  window.addEventListener(SHOP_URL_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(SHOP_URL_CHANGE_EVENT, callback);
  };
}

function locationSearchSnapshot(): string {
  return window.location.search;
}

function serverLocationSearchSnapshot(): string {
  return "";
}

function selectedValues(params: URLSearchParams, key: string): string[] {
  return params
    .getAll(key)
    .flatMap((value) => value.split(","))
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function filtersFromUrl(params: URLSearchParams): FilterState {
  const families = selectedValues(params, "family").filter(
    (value): value is ShopFamilySlug => familySlugs.has(value as ShopFamilySlug),
  );
  const goals = selectedValues(params, "goal").filter(
    (value): value is ShopGoalRouteSlug => goalSlugs.has(value as ShopGoalRouteSlug),
  );
  const forms = selectedValues(params, "form").filter(
    (value): value is ShopFormSlug => formSlugs.has(value as ShopFormSlug),
  );
  const servings = selectedValues(params, "servings")
    .map(Number)
    .filter((value): value is ShopServingsCount => servingsCounts.has(value as ShopServingsCount));
  const availability = selectedValues(params, "availability").filter(
    (value): value is ShopAvailabilityState =>
      availabilitySlugs.has(value as ShopAvailabilityState),
  );

  return { families, goals, forms, servings, availability };
}

function writeFiltersToUrl(filters: FilterState): void {
  const url = new URL(window.location.href);
  ["family", "goal", "form", "servings", "availability"].forEach((key) =>
    url.searchParams.delete(key),
  );
  filters.families.forEach((value) => url.searchParams.append("family", value));
  filters.goals.forEach((value) => url.searchParams.append("goal", value));
  filters.forms.forEach((value) => url.searchParams.append("form", value));
  filters.servings.forEach((value) => url.searchParams.append("servings", String(value)));
  filters.availability.forEach((value) => url.searchParams.append("availability", value));
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new Event(SHOP_URL_CHANGE_EVENT));
}

function resetShopDiscovery(): void {
  const url = new URL(window.location.href);
  ["family", "goal", "form", "servings", "availability", "search"].forEach((key) =>
    url.searchParams.delete(key),
  );
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new Event(SHOP_URL_CHANGE_EVENT));
}

function toggleValue<T>(values: readonly T[], value: T): T[] {
  return values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value];
}

function formatPrice(minor: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(minor / 100);
}

function familyLabel(value: ShopFamilySlug): string {
  return SHOP_FAMILY_OPTIONS.find(({ slug }) => slug === value)?.label ?? value;
}

function taxonomyMedia(product: ShopTaxonomyFixtureProduct): ProductMediaAsset {
  if (product.fixtureId === "rad-140") return rad140Fixture.media;
  return {
    id: `${product.fixtureId}-front`,
    productId: product.fixtureId,
    src: product.imageSrc,
    alt: product.imageAlt,
    width: 300,
    height: 450,
    fit: "contain",
    hasTransparency: false,
    sourceRef: `SHOP-TAXONOMY-CONTRACT audited catalogue media · ${product.imageSourceUrl}`,
    authority: "confirmed-design-fixture",
    live: false,
    crops: mk2866Fixture.media.crops,
  };
}

/**
 * Shop is a product-decision surface, so every catalogue result is rendered
 * through the canonical ProductCommerceCard anatomy. The taxonomy drives
 * filtering; the frontier record supplies the customer-facing facts and
 * proposition. This deliberately removes the former parallel shop card.
 */
function catalogueFixture(product: ShopTaxonomyFixtureProduct): ProductFixture {
  if (product.fixtureId === "mk-2866") return mk2866Fixture;
  if (product.fixtureId === "rad-140") return rad140Fixture;

  const frontier = getFrontierProduct(product.fixtureId);
  const mediaSource = actualProductMedia[product.fixtureId];
  const media = mediaSource
    ? {
        ...taxonomyMedia(product),
        src: mediaSource.src,
        width: mediaSource.width,
        height: mediaSource.height,
        authority: "confirmed-product-asset" as const,
        sourceRef: "OLUK registered product render library",
      }
    : taxonomyMedia(product);

  return {
    id: product.fixtureId as ProductFixture["id"],
    series: frontier?.series ?? `${product.familySlugs.map(familyLabel).join(" ").toUpperCase()} SERIES`,
    name: frontier?.name ?? product.displayName,
    alias: frontier?.alias ?? product.displayAlias ?? product.displayName,
    sku: frontier?.sku ?? product.sku ?? undefined,
    strength: frontier?.strength ?? "FORMAT",
    servings: frontier?.servings ?? (product.servingsCount ? `${product.servingsCount} SERVINGS` : "CAPSULE FORMAT"),
    purity: frontier?.purity ?? "PRODUCT DETAIL",
    price: frontier?.price ?? formatPrice(product.capturedPriceMinor),
    customerPath: frontier ? `/product/${frontier.slug}` : product.customerPath,
    evidencePath: "/open-lab/records",
    media,
    qualitativeFacts: [
      { kind: "class", label: "FOCUS", value: frontier?.goal[0]?.toUpperCase() ?? "DISCOVERY" },
      { kind: "form", label: "FORM", value: product.formSlug?.toUpperCase() ?? "CAPSULES" },
      { kind: "quality", label: "RANGE", value: frontier?.family.toUpperCase() ?? "OLYMPUS" },
      { kind: "tested", label: "DETAIL", value: "VIEW PRODUCT" },
    ],
    presentationStatus: {
      inventory: product.availabilityState === "in-stock" ? "in-stock" : product.availabilityState === "out-of-stock" ? "out-of-stock" : "unavailable",
      evidence: "available",
    },
    authority: {
      classification: "design-review-fixture",
      sourceRef: "Frontier product record plus audited catalogue taxonomy",
      truthScope: "presentation-fixture",
      runtimeOwner: "shopper-ssr-later",
      publicationState: "owner-only-review",
      live: false,
    },
  } as ProductFixture;
}

export function ShopDiscovery() {
  const [sort, setSort] = useState<SortMode>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const locationSearch = useSyncExternalStore(
    subscribeToLocation,
    locationSearchSnapshot,
    serverLocationSearchSnapshot,
  );
  const params = useMemo(() => new URLSearchParams(locationSearch), [locationSearch]);
  const filters = useMemo(() => filtersFromUrl(params), [params]);
  const searchTerm = params.get("search")?.trim() ?? "";

  const results = useMemo(() => {
    const selection: ShopTaxonomySelection = filters;
    const normalizedSearch = searchTerm.toLocaleLowerCase("en-GB");
    const matched = filterShopTaxonomyFixtures(selection).filter((product) => {
      if (!normalizedSearch) return true;
      const familyTerms = product.familySlugs.flatMap((slug) => {
        const option = SHOP_FAMILY_OPTIONS.find((entry) => entry.slug === slug);
        return [slug, option?.label, `${option?.label ?? slug} series`];
      });
      const goalTerms = product.goalTagSlugs.flatMap((slug) => {
        const option = SHOP_GOAL_OPTIONS.find((entry) => entry.wooTagSlug === slug);
        return [slug, option?.slug, option?.label];
      });
      return [
        product.displayName,
        product.displayAlias,
        product.wooSlug,
        product.sku,
        product.formSlug,
        product.servingsCount ? `${product.servingsCount} servings` : null,
        ...familyTerms,
        ...goalTerms,
      ]
        .filter((value): value is string => Boolean(value))
        .some((value) => value.toLocaleLowerCase("en-GB").includes(normalizedSearch));
    });
    if (sort === "name") return matched.sort((a, b) => a.displayName.localeCompare(b.displayName));
    if (sort === "price") return matched.sort((a, b) => a.capturedPriceMinor - b.capturedPriceMinor);
    return matched;
  }, [filters, searchTerm, sort]);

  const activeCount = Object.values(filters).reduce((count, values) => count + values.length, 0);

  function setDimension<Key extends keyof FilterState>(
    key: Key,
    values: FilterState[Key],
  ): void {
    writeFiltersToUrl({
      ...filters,
      [key]: values,
    });
  }

  return (
    <section
      aria-label="Product catalogue"
      className="section shop-discovery"
      data-live-authority="false"
      data-selection-law="or-within-and-across"
    >
      <div className="shell catalogue-layout">
        <aside aria-label="Filter products" className="filter-panel">
          <div className="filter-panel-heading">
            <div><span className="eyebrow">FILTERS</span><h2>Refine products</h2></div>
            <div className="filter-panel-actions">
              <button aria-controls="shop-filter-groups" aria-expanded={filtersOpen} className="filter-toggle" onClick={() => setFiltersOpen((open) => !open)} type="button">{filtersOpen ? "Close" : "Open"}</button>
              {activeCount > 0 || searchTerm ? <button onClick={resetShopDiscovery} type="button">Clear all</button> : null}
            </div>
          </div>
          <div className="shop-filter-groups" data-open={filtersOpen} id="shop-filter-groups">
            <fieldset>
              <legend>Family</legend>
              {SHOP_FAMILY_OPTIONS.map(({ label, slug }) => (
                <label key={slug}>
                  <input checked={filters.families.includes(slug)} onChange={() => setDimension("families", toggleValue(filters.families, slug))} type="checkbox" />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Goal</legend>
              {SHOP_GOAL_OPTIONS.map(({ label, slug }) => (
                <label key={slug}>
                  <input checked={filters.goals.includes(slug)} onChange={() => setDimension("goals", toggleValue(filters.goals, slug))} type="checkbox" />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Form</legend>
              {SHOP_FORM_OPTIONS.map(({ label, slug }) => (
                <label key={slug}>
                  <input checked={filters.forms.includes(slug)} onChange={() => setDimension("forms", toggleValue(filters.forms, slug))} type="checkbox" />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Servings</legend>
              {SHOP_SERVINGS_OPTIONS.map(({ count, label }) => (
                <label key={count}>
                  <input checked={filters.servings.includes(count)} onChange={() => setDimension("servings", toggleValue(filters.servings, count))} type="checkbox" />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Availability</legend>
              {SHOP_AVAILABILITY_OPTIONS.map(({ label, slug }) => (
                <label key={slug}>
                  <input checked={filters.availability.includes(slug)} onChange={() => setDimension("availability", toggleValue(filters.availability, slug))} type="checkbox" />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
          </div>
        </aside>
        <div className="catalogue-main">
          <div className="catalogue-toolbar">
            <output aria-live="polite">
              {results.length} {results.length === 1 ? "product" : "products"}
              {activeCount > 0 ? ` · ${activeCount} ${activeCount === 1 ? "filter" : "filters"}` : ""}
              {searchTerm ? ` for “${searchTerm}”` : ""}
            </output>
            <label>
              Sort
              <select onChange={(event) => setSort(event.target.value as SortMode)} value={sort}>
                <option value="featured">Featured</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </label>
          </div>
          {results.length > 0 ? (
            <div className="shop-result-grid">
              {results.map((product) => (
                <ProductCommerceCard
                  className="shop-result-card shop-result-card-canonical"
                  key={product.fixtureId}
                  product={catalogueFixture(product)}
                  variant="compact"
                />
              ))}
            </div>
          ) : (
            <div className="shop-empty-state" role="status">
              <span className="eyebrow">NO MATCHES</span>
              <h2>Try a broader combination.</h2>
              <p>No products match every selected filter. Remove one or clear the filters to see the full range.</p>
              <button className="button" onClick={resetShopDiscovery} type="button">Clear search and filters</button>
            </div>
          )}
          <p className="shop-result-scope">
            {SHOP_TAXONOMY_FIXTURE_PRODUCTS.length} products are available in the current range.
          </p>
        </div>
      </div>
    </section>
  );
}
