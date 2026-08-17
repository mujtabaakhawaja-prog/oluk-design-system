import type { Metadata } from "next";
import { CustomerSiteChrome } from "../experience-lab";
export const metadata: Metadata = { title: "Search products | Olympus Labs UK", robots: { index: false, follow: false } };
export default function SearchPage({ searchParams }: { searchParams?: { search?: string | string[] } }) {
  const rawQuery = Array.isArray(searchParams?.search) ? searchParams.search[0] : searchParams?.search ?? "";
  const query = rawQuery.slice(0, 80);
  return <CustomerSiteChrome route="search"><main data-route-disposition="utility-forwarder" data-search-state="utility-entry"><section className="page-hero"><div className="shell"><span className="eyebrow">SEARCH</span><h1>Find a product.</h1><form action="/shop" method="get" role="search"><label htmlFor="product-search">Search products</label><input defaultValue={query} id="product-search" name="search" placeholder="Try MK-2866" type="search"/><button type="submit">Search</button></form><a href="/shop">Browse the shop</a></div></section></main></CustomerSiteChrome>;
}
