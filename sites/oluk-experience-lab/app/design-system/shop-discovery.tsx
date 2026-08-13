"use client";

/* eslint-disable @next/next/no-img-element -- audited Woo catalogue media is intentionally exercised as a non-live design fixture. */

import { useMemo, useState, useSyncExternalStore } from "react";
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

const EMPTY_FILTERS: FilterState = {
  families: [],
  goals: [],
  forms: [],
  servings: [],
  availability: [],
};

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

function availabilityLabel(value: ShopAvailabilityState): string {
  return SHOP_AVAILABILITY_OPTIONS.find(({ slug }) => slug === value)?.label ?? "Availability pending";
}

function familyLabel(value: ShopFamilySlug): string {
  return SHOP_FAMILY_OPTIONS.find(({ slug }) => slug === value)?.label ?? value;
}

function ShopResultCard({ product }: { product: ShopTaxonomyFixtureProduct }) {
  const purchaseLabel =
    product.availabilityState === "in-stock"
      ? "Add to bag"
      : product.availabilityState === "on-backorder"
        ? "Backorder"
        : product.availabilityState === "out-of-stock"
          ? "Out of stock"
          : "Unavailable";
  return (
    <article
      aria-labelledby={`shop-product-${product.fixtureId}`}
      className="shop-result-card"
      data-live-authority="false"
    >
      <div className="shop-result-media">
        <div aria-hidden="true" className="shop-result-orbit" />
        <img
          alt={product.imageAlt}
          decoding="async"
          height={450}
          loading="lazy"
          sizes="(max-width: 720px) calc(100vw - 32px), (max-width: 1180px) 50vw, 360px"
          src={product.imageSrc}
          width={300}
        />
      </div>
      <div className="shop-result-content">
        <div className="shop-result-heading">
          <div>
            <span className="product-series">{product.familySlugs.map(familyLabel).join(" · ")}</span>
            <h2 id={`shop-product-${product.fixtureId}`}>{product.displayName}</h2>
            {product.displayAlias ? <p>{product.displayAlias}</p> : null}
          </div>
          <span className="shop-result-availability" data-state={product.availabilityState}>
            <i aria-hidden="true" />
            {availabilityLabel(product.availabilityState)}
          </span>
        </div>
        <dl className="shop-result-facts">
          <div>
            <dt>Form</dt>
            <dd>{product.formSlug === "capsules" ? "Capsules" : "Details pending"}</dd>
          </div>
          <div>
            <dt>Pack</dt>
            <dd>{product.servingsCount ? `${product.servingsCount} servings` : "Details pending"}</dd>
          </div>
        </dl>
        <div className="shop-result-goals" aria-label="Product goals">
          {product.goalTagSlugs.map((goal) => <span key={goal}>{goal.replaceAll("-", " ")}</span>)}
        </div>
        <div className="shop-result-commerce">
          <strong>{formatPrice(product.capturedPriceMinor)}</strong>
          <div>
            <a className="button button-secondary" href={product.customerPath}>View product <span aria-hidden="true">→</span></a>
            <button className={product.availabilityState === "in-stock" ? "button" : "button shop-result-action-unavailable"} disabled type="button">{purchaseLabel}</button>
          </div>
        </div>
      </div>
    </article>
  );
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
      return [product.displayName, product.displayAlias, product.wooSlug]
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
              {activeCount > 0 ? <button onClick={() => writeFiltersToUrl(EMPTY_FILTERS)} type="button">Clear all</button> : null}
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
              {results.map((product) => <ShopResultCard key={product.fixtureId} product={product} />)}
            </div>
          ) : (
            <div className="shop-empty-state" role="status">
              <span className="eyebrow">NO MATCHES</span>
              <h2>Try a broader combination.</h2>
              <p>No products match every selected filter. Remove one or clear the filters to see the full range.</p>
              <button className="button" onClick={() => writeFiltersToUrl(EMPTY_FILTERS)} type="button">Clear filters</button>
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
