import cardProjection from "./product-content-card.generated.json";
import {
  productMediaRegistry,
  type ProductFixture,
  type ProductMediaAsset,
} from "./product-fixtures";

type CardRecord = Readonly<{
  canonicalProductId: string;
  slug: string;
  name: string;
  aliases: ReadonlyArray<string | null>;
  render: string;
  facts: Readonly<{
    series?: string | null;
    sku?: string | null;
    strength?: string | null;
    servings?: string | null;
    purity?: string | null;
    form?: string | null;
  }>;
  evidence: Readonly<{
    availability: "AVAILABLE" | "UNAVAILABLE";
    summary: string | null;
  }>;
}>;

const records = cardProjection.products as unknown as ReadonlyArray<CardRecord>;
const bySlug = new Map(records.map((record) => [record.slug, record]));

export function getCustomerProductCardFixture(slug: string): ProductFixture | null {
  const record = bySlug.get(slug);
  const media = (productMediaRegistry as Readonly<Record<string, ProductMediaAsset>>)[record?.canonicalProductId ?? ""];
  if (!record || !media || media.src !== record.render) return null;
  const alias = record.aliases.find((value): value is string => typeof value === "string") ?? "";
  const availability = record.evidence.availability === "AVAILABLE" ? "AVAILABLE" : "UNAVAILABLE";
  return {
    id: record.canonicalProductId,
    series: record.facts.series ?? "",
    name: record.name,
    alias,
    sku: record.facts.sku ?? undefined,
    strength: record.facts.strength ?? "",
    servings: record.facts.servings ?? "",
    purity: record.facts.purity ?? "",
    price: "",
    customerPath: `/product/${record.slug}`,
    evidencePath: `/open-lab/compound/${record.slug}`,
    media,
    qualitativeFacts: record.facts.form ? [{ kind: "form", label: "FORM", value: record.facts.form }] : [],
    presentationStatus: {
      inventory: "unavailable",
      evidence: availability === "AVAILABLE" ? "available" : "unavailable",
    },
    content: {
      thesis: null,
      descriptions: { short: null, medium: null, long: null },
      evidence: {
        availability,
        statusLabel: availability === "AVAILABLE" ? "Source-reported OpenLab record." : "OpenLab record unavailable.",
        summary: record.evidence.summary ?? "No OpenLab record is currently bound to this product.",
      },
      faqs: [],
      routeVariants: {},
    },
    authority: {
      classification: "locked-product-truth",
      sourceRef: "authority/PRODUCT-CONTENT-REGISTRY.json via product-content-card.generated.json",
      truthScope: "complete-product-truth",
      runtimeOwner: "shopper-ssr-later",
      publicationState: "owner-only-review",
      live: false,
    },
  };
}
