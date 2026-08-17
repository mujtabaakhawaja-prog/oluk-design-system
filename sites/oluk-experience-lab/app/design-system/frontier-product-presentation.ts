import { actualProductMedia, type FrontierProductRecord } from "./frontier-content";
import { mk2866Fixture, rad140Fixture, type ProductFixture, type ProductMediaAsset } from "./product-fixtures";

function mediaFor(product: FrontierProductRecord): ProductMediaAsset | null {
  if (product.slug === "mk-2866") return mk2866Fixture.media;
  if (product.slug === "rad-140") return rad140Fixture.media;

  const asset = actualProductMedia[product.slug];
  const crops = mk2866Fixture.media?.crops;
  if (!asset || !crops) return null;

  return {
    id: `${product.slug}-front`,
    productId: product.slug,
    src: asset.src,
    alt: `${product.name} ${product.alias} bottle`,
    width: asset.width,
    height: asset.height,
    fit: "contain",
    hasTransparency: true,
    sourceRef: "Frontier product-media registry",
    authority: "confirmed-product-asset",
    live: false,
    crops,
  };
}

/** Maps every catalogue record into the single PdpD/purchase-panel anatomy. */
export function frontierProductPresentation(product: FrontierProductRecord): ProductFixture {
  if (product.slug === "mk-2866") return mk2866Fixture;

  return {
    id: product.slug as ProductFixture["id"],
    series: product.series,
    name: product.name,
    alias: product.alias,
    sku: product.sku,
    strength: product.strength,
    servings: product.servings,
    purity: product.purity,
    price: product.price,
    customerPath: `/product/${product.slug}`,
    evidencePath: `/open-lab/compound/${product.slug}`,
    media: mediaFor(product),
    qualitativeFacts: [],
    presentationStatus: { inventory: "unavailable", evidence: "unavailable" },
    authority: {
      classification: "design-review-fixture",
      sourceRef: "Frontier product-content registry",
      truthScope: "presentation-fixture",
      runtimeOwner: "shopper-ssr-later",
      publicationState: "owner-only-review",
      live: false,
    },
  };
}
