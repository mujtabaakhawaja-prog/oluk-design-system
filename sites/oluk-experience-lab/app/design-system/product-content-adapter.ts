import contentProjection from "./product-content.generated.json";
import openLabExperience from "./openlab-product-experience.json";
import {
  productMediaRegistry,
  type ProductFixture,
  type ProductMediaAsset,
} from "./product-fixtures";

type CustomerAtomProjection = Readonly<{
  slug?: string;
  readinessState?: string;
  canonicalIdentity?: Readonly<{
    name?: string | null;
    aliases?: ReadonlyArray<string | null> | null;
  }>;
  media?: Readonly<{ render?: string | null }>;
  content?: Readonly<{
    customerThesis?: string | null;
    descriptions?: Readonly<{ short?: string | null; medium?: string | null; long?: string | null }>;
    facts?: Readonly<{
      series?: string | null;
      sku?: string | null;
      strength?: string | null;
      servings?: string | null;
      purity?: string | null;
      form?: string | null;
    }>;
    evidence?: Readonly<{
      availability?: "AVAILABLE" | "UNAVAILABLE" | null;
      summary?: string | null;
      statements?: ReadonlyArray<string | null> | null;
    }>;
    seo?: Readonly<{
      titleBase?: string | null;
      descriptionBase?: string | null;
      focusTerms?: ReadonlyArray<string | null> | null;
    }>;
    faqs?: ReadonlyArray<Readonly<{ question?: string | null; answer?: string | null }>> | null;
    routeVariants?: Readonly<Record<string, string | null>> | null;
  }>;
}>;

type GeneratedProduct = Readonly<{
  canonicalProductId: string;
  customer: CustomerAtomProjection;
  readiness: Readonly<Record<string, number>>;
}>;

const generatedProducts = contentProjection.products as unknown as ReadonlyArray<GeneratedProduct>;
const byId = new Map(generatedProducts.map((entry) => [entry.canonicalProductId, entry]));
const bySlug = new Map(generatedProducts.map((entry) => [entry.customer.slug ?? entry.canonicalProductId, entry]));

export const productContentSlugs = generatedProducts.map((entry) => entry.customer.slug ?? entry.canonicalProductId);

export function getProductContentEntry(slug: string) {
  return bySlug.get(slug) ?? byId.get(slug);
}

export function getProductContentReadiness(slug: string) {
  const entry = getProductContentEntry(slug);
  return entry ? { recordState: entry.customer.readinessState ?? "EDITORIAL_CHOICE", fields: entry.readiness } : null;
}

function mediaFor(productId: string, src: string | null | undefined): ProductMediaAsset | null {
  if (!src) return null;
  if (productId === "mk-2866" && productMediaRegistry["mk-2866"].src === src) return productMediaRegistry["mk-2866"];
  if (productId === "rad-140" && productMediaRegistry["rad-140"].src === src) return productMediaRegistry["rad-140"];
  return null;
}

function openLabContent(productId: string, availability: "AVAILABLE" | "UNAVAILABLE") {
  if (productId !== "mk-2866" || availability !== "AVAILABLE") return {};
  return {
    batchCode: openLabExperience.record.batchCode,
    reportId: openLabExperience.record.reportId,
    reportedPurity: openLabExperience.visualizations.purity.displayValue,
    reportedConcentration: openLabExperience.visualizations.concentration?.testedValue,
    labelClaim: openLabExperience.visualizations.concentration?.labelClaim ?? undefined,
    testedAt: openLabExperience.record.testedAt,
    labName: openLabExperience.record.labName,
  };
}

export function getCustomerProductFixture(slug: string): ProductFixture | null {
  const entry = getProductContentEntry(slug);
  const customer = entry?.customer;
  const productId = entry?.canonicalProductId;
  const name = customer?.canonicalIdentity?.name;
  if (!entry || !customer || !productId || !name) return null;

  const alias = customer.canonicalIdentity?.aliases?.find((value): value is string => typeof value === "string") ?? "";
  const facts = customer.content?.facts ?? {};
  const evidence = customer.content?.evidence;
  const availability = evidence?.availability === "AVAILABLE" ? "AVAILABLE" : "UNAVAILABLE";
  const faqs = (customer.content?.faqs ?? []).flatMap((faq) => faq.question && faq.answer ? [{ question: faq.question, answer: faq.answer }] : []);
  const form = facts.form ? [{ kind: "form" as const, label: "FORM", value: facts.form }] : [];

  return {
    id: productId,
    series: facts.series ?? "",
    name,
    alias,
    sku: facts.sku ?? undefined,
    strength: facts.strength ?? "",
    servings: facts.servings ?? "",
    purity: facts.purity ?? "",
    price: "",
    customerPath: `/product/${customer.slug ?? productId}`,
    evidencePath: `/open-lab/compound/${customer.slug ?? productId}`,
    media: mediaFor(productId, customer.media?.render),
    qualitativeFacts: form,
    presentationStatus: {
      inventory: "unavailable",
      evidence: availability === "AVAILABLE" ? "available" : "unavailable",
    },
    content: {
      thesis: customer.content?.customerThesis ?? null,
      descriptions: {
        short: customer.content?.descriptions?.short ?? null,
        medium: customer.content?.descriptions?.medium ?? null,
        long: customer.content?.descriptions?.long ?? null,
      },
      evidence: {
        availability,
        statusLabel: availability === "AVAILABLE" ? "Source-reported OpenLab record." : "OpenLab record unavailable.",
        summary: evidence?.summary ?? "No OpenLab record is currently bound to this product. No other product’s result is used in its place.",
        ...openLabContent(productId, availability),
      },
      faqs,
      routeVariants: customer.content?.routeVariants ?? {},
    },
    authority: {
      classification: "locked-product-truth",
      sourceRef: "authority/PRODUCT-CONTENT-REGISTRY.json via product-content.generated.json",
      truthScope: "complete-product-truth",
      runtimeOwner: "shopper-ssr-later",
      publicationState: "owner-only-review",
      live: false,
    },
  };
}

export function getProductSeo(slug: string) {
  const entry = getProductContentEntry(slug);
  const seo = entry?.customer.content?.seo;
  const name = entry?.customer.canonicalIdentity?.name;
  if (!entry || !name || !seo?.titleBase || !seo.descriptionBase) return null;
  return {
    title: seo.titleBase,
    description: seo.descriptionBase,
    canonical: `/product/${entry.customer.slug ?? entry.canonicalProductId}`,
    focusTerms: (seo.focusTerms ?? []).filter((value): value is string => typeof value === "string"),
  };
}

export function productJsonLdFromContent(slug: string) {
  const fixture = getCustomerProductFixture(slug);
  const seo = getProductSeo(slug);
  if (!fixture || !seo) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: fixture.name,
    alternateName: fixture.alias || undefined,
    sku: fixture.sku,
    description: seo.description,
    url: seo.canonical,
    brand: { "@type": "Brand", name: "Olympus Labs UK" },
  };
}

export function getProductRouteVariant(slug: string, variant: string) {
  return getCustomerProductFixture(slug)?.content?.routeVariants[variant] ?? null;
}
