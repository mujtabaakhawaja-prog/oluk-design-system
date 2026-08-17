import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shop family specimen | Olympus Labs UK",
  robots: { index: false, follow: false },
};

export default function ShopFamilySpecimen({ params }: { params: { family: string } }) {
  return (
    <main data-owner-specimen="shop-family" data-route-disposition="specimen-only">
      <h1>Shop family specimen</h1>
      <p>
        The <code>{params.family}</code> family path is retained for owner review only. Customer
        discovery uses the finite collection and Shop facet destinations.
      </p>
    </main>
  );
}
