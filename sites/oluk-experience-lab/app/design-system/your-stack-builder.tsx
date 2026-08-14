"use client";

import { useMemo, useState } from "react";

import { ProductCommerceCard } from "./product-commerce-card";
import type { ProductFixture, ProductMediaAsset } from "./product-fixtures";
import { EvidenceStatusChip, type EvidenceAuthorityState } from "./program-components";
import { actualProductMedia, getFrontierProduct } from "./frontier-content";
import { DecisionSurface, TechnicalSurface } from "./content-surfaces";
import { stackLevelFor, stackTotalFor, uniqueStackContributions } from "./stack-commercial-model.mjs";
import styles from "./your-stack-builder.module.css";

type StackGoal = "Cutting" | "Bulking" | "Recomp" | "PCT";
type StackHost = "pdp" | "bag" | "confirmation" | "account" | "standalone";
type StackVariant = "full" | "compact" | "summary";
type StackProductId = "mk-2866" | "rad-140" | "ment" | "mk-677" | "lgd-4033" | "gw-501516" | "epistane";
type StackContribution =
  | "STRENGTH"
  | "LEAN MASS"
  | "BODY COMPOSITION"
  | "RECOVERY"
  | "APPETITE + SLEEP"
  | "TRAINING OUTPUT";

type StackRelationship = Readonly<{
  targetProduct: StackProductId;
  eligibleGoals: readonly StackGoal[];
  contributions: readonly StackContribution[];
  focus: string;
  position: string;
  customerRationale: string;
}>;

type StackProduct = Readonly<{
  id: StackProductId;
  series: string;
  name: string;
  alias: string;
  strength: string;
  servings: string;
  purity: string;
  price: string;
  focus: string;
  position: string;
  rationale: string;
  outcomes: readonly StackGoal[];
  contributions: readonly StackContribution[];
  evidenceState: EvidenceAuthorityState;
  media: ProductMediaAsset | null;
}>;

type StackBaseline = Readonly<{
  slug: string;
  series: string;
  name: string;
  alias: string;
  strength: string;
  servings: string;
  purity: string;
  price: string;
  goals: readonly string[];
  contributions: readonly StackContribution[];
  evidenceState: EvidenceAuthorityState;
  media: ProductMediaAsset | null;
}>;

const stackGoals: Readonly<Record<StackGoal, {
  headline: (baseline: StackBaseline) => string;
  copy: (baseline: StackBaseline) => string;
  outcome: string;
}>> = {
  Cutting: {
    headline: (baseline) => `Build a stronger ${baseline.alias} cutting stack.`,
    copy: (baseline) => `Start with ${baseline.name}, then add the product contribution that takes strength, body composition or training output further.`,
    outcome: "Strength, body composition and training output",
  },
  Bulking: {
    headline: (baseline) => `Build a stronger size-and-power stack from ${baseline.alias}.`,
    copy: (baseline) => `Use ${baseline.name} as the base, then add lean mass, strength or recovery support to make the build more complete.`,
    outcome: "Strength, lean mass and recovery",
  },
  Recomp: {
    headline: (baseline) => `Build a stronger recomp stack from ${baseline.alias}.`,
    copy: (baseline) => `Keep ${baseline.name} at the centre while you add lean mass, body-composition focus, training output or recovery support.`,
    outcome: "Lean mass, body composition and recovery",
  },
  PCT: {
    headline: (baseline) => `Build a stronger next-phase plan from ${baseline.alias}.`,
    copy: (baseline) => `Use ${baseline.name} as the starting point, then bring recovery, appetite and sleep support into the next product decision.`,
    outcome: "Recovery and next-phase support",
  },
};

const crops = {
  card: {
    desktop: { objectPosition: "50% 50%", scale: 1, translateY: "6px" },
    tablet: { objectPosition: "50% 49%", scale: 0.98, translateY: "5px" },
    mobile: { objectPosition: "50% 48%", scale: 0.94, translateY: "3px" },
  },
  compact: {
    desktop: { objectPosition: "50% 48%", scale: 0.94, translateY: "2px" },
    tablet: { objectPosition: "50% 48%", scale: 0.92, translateY: "2px" },
    mobile: { objectPosition: "50% 47%", scale: 0.9, translateY: "1px" },
  },
  featured: {
    desktop: { objectPosition: "50% 50%", scale: 1, translateY: "6px" },
    tablet: { objectPosition: "50% 49%", scale: 0.98, translateY: "5px" },
    mobile: { objectPosition: "50% 48%", scale: 0.94, translateY: "3px" },
  },
  relation: {
    desktop: { objectPosition: "50% 50%", scale: 0.96, translateY: "4px" },
    tablet: { objectPosition: "50% 49%", scale: 0.94, translateY: "3px" },
    mobile: { objectPosition: "50% 48%", scale: 0.9, translateY: "2px" },
  },
  hero: {
    desktop: { objectPosition: "50% 50%", scale: 1.04, translateY: "6px" },
    tablet: { objectPosition: "50% 49%", scale: 1, translateY: "4px" },
    mobile: { objectPosition: "50% 48%", scale: 0.94, translateY: "2px" },
  },
  dossier: {
    desktop: { objectPosition: "50% 50%", scale: 0.92, translateY: "4px" },
    tablet: { objectPosition: "50% 49%", scale: 0.9, translateY: "3px" },
    mobile: { objectPosition: "50% 47%", scale: 0.86, translateY: "2px" },
  },
} as const;

function media(id: string, alias: string, src: string, width: number, height: number): ProductMediaAsset {
  return {
    id: `${id}-front`,
    productId: id,
    src,
    alt: `${id.toUpperCase()} ${alias} bottle`,
    width,
    height,
    fit: "contain",
    hasTransparency: true,
    sourceRef: "OLUK product render library",
    authority: "confirmed-product-asset",
    live: false,
    crops,
  };
}

function mediaForProduct(slug: string, alias: string) {
  const asset = actualProductMedia[slug];
  return asset ? media(slug, alias, asset.src, asset.width, asset.height) : null;
}

const evidenceStateByProduct: Readonly<Record<string, EvidenceAuthorityState>> = {
  "mk-2866": "verified-evidence",
};

function evidenceStateFor(slug: string): EvidenceAuthorityState {
  return evidenceStateByProduct[slug] ?? "unavailable";
}

const productContributionMap: Readonly<Record<string, readonly StackContribution[]>> = {
  "mk-2866": ["LEAN MASS", "BODY COMPOSITION"],
  "rad-140": ["STRENGTH", "LEAN MASS"],
  "lgd-4033": ["LEAN MASS"],
  "mk-677": ["RECOVERY", "APPETITE + SLEEP"],
  "gw-501516": ["BODY COMPOSITION", "TRAINING OUTPUT"],
  epistane: ["STRENGTH", "BODY COMPOSITION"],
  ment: ["STRENGTH", "LEAN MASS"],
};

const baselineCandidates = ["mk-2866", "rad-140", "lgd-4033", "gw-501516"] as const;

/** Relationship content is separate from product truth so cards always read facts from the product registry. */
const stackRelationships: readonly StackRelationship[] = [
  {
    targetProduct: "mk-2866",
    eligibleGoals: ["Cutting", "Bulking", "Recomp"],
    contributions: productContributionMap["mk-2866"],
    focus: "Lean mass + body composition",
    position: "Ostarine base",
    customerRationale: "Add a 15 MG Ostarine direction with 90 servings when lean mass and body composition belong in the selected build.",
  },
  {
    targetProduct: "lgd-4033",
    eligibleGoals: ["Bulking", "Recomp"],
    contributions: productContributionMap["lgd-4033"],
    focus: "Lean mass",
    position: "Lean-mass expansion",
    customerRationale: "Add a 5 MG lean-mass direction when you want the selected build to carry more mass focus.",
  },
  {
    targetProduct: "rad-140",
    eligibleGoals: ["Cutting", "Bulking", "Recomp"],
    contributions: productContributionMap["rad-140"],
    focus: "Strength + lean mass",
    position: "Strength step-up",
    customerRationale: "Add serious strength and lean-mass focus with an 8 MG step-up built for a harder training phase.",
  },
  {
    targetProduct: "ment",
    eligibleGoals: ["Bulking", "Recomp"],
    contributions: productContributionMap.ment,
    focus: "Mass + power",
    position: "Heavyweight builder",
    customerRationale: "Take the build toward heavyweight size and power with a 20 MG Trestolone option beyond a SARM-only line-up.",
  },
  {
    targetProduct: "mk-677",
    eligibleGoals: ["Bulking", "Cutting", "Recomp", "PCT"],
    contributions: productContributionMap["mk-677"],
    focus: "Recovery + appetite",
    position: "Daily support",
    customerRationale: "Bring appetite, sleep and recovery support into the build with a 90-serving Ibutamoren format.",
  },
  {
    targetProduct: "gw-501516",
    eligibleGoals: ["Cutting", "Recomp"],
    contributions: productContributionMap["gw-501516"],
    focus: "Training output + cutting",
    position: "Cutting pathway",
    customerRationale: "Add training-output and body-composition focus when you want the cutting or recomp build to go further.",
  },
  {
    targetProduct: "epistane",
    eligibleGoals: ["Recomp"],
    contributions: productContributionMap.epistane,
    focus: "Strength + body composition",
    position: "Finishing option",
    customerRationale: "Add a more defined strength-and-body-composition finish after the core recomp products are clear.",
  },
] as const;

const products: readonly StackProduct[] = stackRelationships.map((relationship) => {
  const product = getFrontierProduct(relationship.targetProduct);
  if (!product) throw new Error(`Missing stack product record: ${relationship.targetProduct}`);

  return {
    id: relationship.targetProduct,
    series: product.series,
    name: product.name,
    alias: product.alias,
    strength: product.strength,
    servings: product.servings,
    purity: product.purity,
    price: product.price,
    focus: relationship.focus,
    position: relationship.position,
    rationale: relationship.customerRationale,
    outcomes: relationship.eligibleGoals,
    contributions: relationship.contributions,
    evidenceState: evidenceStateFor(product.slug),
    media: mediaForProduct(product.slug, product.alias),
  };
});

function baselineFor(slug: string): StackBaseline {
  const product = getFrontierProduct(slug);
  if (!product) throw new Error(`Stack baseline product is not registered: ${slug}`);

  return {
    slug: product.slug,
    series: product.series,
    name: product.name,
    alias: product.alias,
    strength: product.strength,
    servings: product.servings,
    purity: product.purity,
    price: product.price,
    goals: product.goal,
    contributions: productContributionMap[product.slug] ?? [],
    evidenceState: evidenceStateFor(product.slug),
    media: mediaForProduct(product.slug, product.alias),
  };
}

function stackFixture(product: StackProduct | StackBaseline): ProductFixture {
  const id = "id" in product ? product.id : product.slug;
  return {
    id,
    series: product.series,
    name: product.name,
    alias: product.alias,
    strength: product.strength,
    servings: product.servings,
    purity: product.purity,
    price: product.price,
    customerPath: `/product/${id}`,
    evidencePath: `/open-lab/compound/${id}`,
    media: product.media,
    qualitativeFacts: [],
    presentationStatus: {
      inventory: "in-stock",
      evidence: product.evidenceState === "verified-evidence" ? "verified" : "unavailable",
    },
    authority: {
      classification: "design-review-fixture",
      sourceRef: "Frontier product registry and stack relationship compiler",
      truthScope: "presentation-fixture",
      runtimeOwner: "shopper-ssr-later",
      publicationState: "owner-only-review",
      live: false,
    },
  };
}

function initialGoal(baseline: StackBaseline): StackGoal {
  return baseline.goals.find((goal): goal is StackGoal => ["Cutting", "Bulking", "Recomp", "PCT"].includes(goal)) ?? "Recomp";
}

function hostVariant(host: StackHost): StackVariant {
  if (host === "bag" || host === "confirmation") return "compact";
  if (host === "account") return "summary";
  return "full";
}

const hostActions: Readonly<Record<Exclude<StackHost, "pdp" | "standalone">, { href: string; label: string }>> = {
  bag: { href: "/open-lab/stack-builder", label: "Build my stack" },
  confirmation: { href: "/open-lab/stack-builder", label: "Keep building" },
  account: { href: "/open-lab/stack-builder", label: "Open stack builder" },
};

function ContextChip({ label, value }: { label: string; value: string }) {
  return (
    <span className={styles.contextChip}>
      <i aria-hidden="true" />
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </span>
  );
}

function ContributionChips({ contributions }: { contributions: readonly string[] }) {
  return (
    <div aria-label="Selected product contributions" className={styles.contributionChips}>
      {contributions.map((contribution) => <span key={contribution}>{contribution}</span>)}
    </div>
  );
}

const stackLevelCopy = {
  FOUNDATION: "Your goal and starting product are set.",
  STRONGER: "One deliberate product contribution has been added.",
  MAXIMUM: "Multiple deliberate product contributions are selected in one build.",
} as const;

function StackCommercialLevel({ contributions, productCount }: { contributions: readonly string[]; productCount: number }) {
  const level = stackLevelFor(productCount);
  return (
    <div className={styles.level} data-component="StackCommercialLevel" data-level={level}>
      <div>
        <span>{level}</span>
        <small>{productCount} {productCount === 1 ? "product" : "products"}</small>
      </div>
      <p>{stackLevelCopy[level]}</p>
      <ContributionChips contributions={contributions} />
    </div>
  );
}

type StackConfidenceProduct = Readonly<{
  slug: string;
  name: string;
  evidenceState: EvidenceAuthorityState;
}>;

function OpenLabConfidenceSurface({ products: confidenceProducts, compact = false }: { products: readonly StackConfidenceProduct[]; compact?: boolean }) {
  const availableCount = confidenceProducts.filter(({ evidenceState }) => evidenceState !== "unavailable").length;
  return (
    <aside data-compact={compact || undefined} data-component="StackOpenLabConfidence">
      <TechnicalSurface
        actions={(
          <div className={styles.confidenceActions}>
            <a href={`/open-lab/compound/${confidenceProducts[0]?.slug ?? "mk-2866"}`}>Open baseline dossier</a>
            <a href="/open-lab/compare">Compare OpenLab status</a>
          </div>
        )}
        className={styles.confidence}
        compact={compact}
        copy={availableCount > 0
          ? "Every selected product keeps its own record status. Open the available dossier when you want source context before adding the full selection."
          : "No public record is registered for these selected products yet. Their product facts stay visible and no substitute result is shown."}
        eyebrow="OpenLab confidence"
        state={availableCount > 0 ? "default" : "unavailable"}
        title={availableCount > 0 ? "Check the records behind your selection." : "See the record status for every selected product."}
      >
        <ul className={styles.confidenceProducts}>
          {confidenceProducts.map((product) => (
            <li key={product.slug}>
              <strong>{product.name}</strong>
              <EvidenceStatusChip state={product.evidenceState} />
              <a href={`/open-lab/compound/${product.slug}`}>{product.evidenceState === "unavailable" ? "View status" : "Open dossier"}</a>
            </li>
          ))}
        </ul>
      </TechnicalSurface>
    </aside>
  );
}

/** Canonical addition card: product facts come from the registry and the reason to add it comes from relationship data. */
export function StackOutcomeCard({ product, added, onAdd }: { product: StackProduct; added: boolean; onAdd: () => void }) {
  return (
    <div className={styles.stackChoice} data-component="StackAdditionCard" data-selected={added || undefined}>
      <ProductCommerceCard
        commerceTreatment="selection"
        headingLevel="h2"
        product={stackFixture(product)}
        showQualitative={false}
        state={added ? "selected" : "default"}
        variant="vertical"
      />
      <DecisionSurface
        actions={(
          <div className={styles.stackChoiceActions}>
            <strong>{product.price}</strong>
            <a href={`/product/${product.id}`}>View product</a>
            <button aria-pressed={added} onClick={onAdd} type="button">{added ? "Added ✓" : "Add to stack"}</button>
          </div>
        )}
        className={styles.stackChoiceDecision}
        compact
        copy={product.rationale}
        eyebrow={product.position}
        headingLevel="h3"
        title={added ? `${product.name} is in your stack.` : `Add ${product.name} for ${product.focus.toLowerCase()}.`}
      >
        <div className={styles.relevanceRow}>
          <ContextChip label="PRODUCT ROLE" value={product.focus} />
          <ContextChip label="WHAT IT ADDS" value={product.position} />
        </div>
        <ContributionChips contributions={product.contributions} />
        <a className={styles.evidenceEntry} href={`/open-lab/compound/${product.id}`}>
          <span>OpenLab</span>
          <EvidenceStatusChip state={product.evidenceState} />
        </a>
      </DecisionSurface>
    </div>
  );
}

function BaselineSurface({ baseline, onBaselineChange, productCount }: { baseline: StackBaseline; onBaselineChange?: (slug: string) => void; productCount: number }) {
  return (
    <section className={styles.anchor} data-component="StackBaselineProduct">
      <ProductCommerceCard
        className={styles.baselineCard}
        commerceTreatment="selection"
        headingLevel="h2"
        product={stackFixture(baseline)}
        state="selected"
        variant="compact"
      />
      <DecisionSurface
        className={styles.baselineDecision}
        compact
        copy={onBaselineChange
          ? "Keep this starting product or change it before adding the next product contribution."
          : "This product is fixed as the starting point for the current page and its price is included in the stack total."}
        eyebrow="Your starting product"
        headingLevel="h3"
        title={`${baseline.name} · ${baseline.price}`}
      >
        <div className={styles.anchorChips}>
          <ContextChip label="PRODUCT" value={baseline.alias} />
          <ContextChip label="STARTING PRICE" value={baseline.price} />
          <ContextChip label="PRODUCTS SELECTED" value={String(productCount)} />
        </div>
        {onBaselineChange ? (
          <fieldset className={styles.baselinePicker}>
            <legend>Confirm or change your baseline</legend>
            <div>
              {baselineCandidates.map((slug) => {
                const candidate = baselineFor(slug);
                return (
                  <button aria-pressed={baseline.slug === slug} key={slug} onClick={() => onBaselineChange(slug)} type="button">
                    {candidate.name} · {candidate.price}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ) : null}
      </DecisionSurface>
    </section>
  );
}

function confidenceSelection(baseline: StackBaseline, selectedProducts: readonly StackProduct[]): readonly StackConfidenceProduct[] {
  return [
    { slug: baseline.slug, name: baseline.name, evidenceState: baseline.evidenceState },
    ...selectedProducts.map((product) => ({ slug: product.id, name: product.name, evidenceState: product.evidenceState })),
  ];
}

function StackSummary({
  added,
  baseline,
  contributions,
  goal,
  onAdd,
  onGoal,
  productCount,
  selectedProducts,
  stackTotal,
  variant,
  host,
  visibleProducts,
}: Readonly<{
  added: readonly StackProductId[];
  baseline: StackBaseline;
  contributions: readonly string[];
  goal: StackGoal;
  onAdd: (id: StackProductId) => void;
  onGoal: (goal: StackGoal) => void;
  productCount: number;
  selectedProducts: readonly StackProduct[];
  stackTotal: number;
  variant: Exclude<StackVariant, "full">;
  host: StackHost;
  visibleProducts: readonly StackProduct[];
}>) {
  const nextProduct = visibleProducts.find((product) => !added.includes(product.id)) ?? visibleProducts[0];
  const action = hostActions[host === "bag" || host === "confirmation" || host === "account" ? host : "bag"];
  const selectedLineup = [baseline.name, ...selectedProducts.map((product) => product.name)].join(" + ");

  return (
    <div className={styles.page} data-baseline={baseline.slug} data-component="YourStackBuilder" data-host={host} data-mobile-strategy="guided-summary" data-variant={variant}>
      <BaselineSurface baseline={baseline} productCount={productCount} />

      <div className={styles.summaryBody} data-component="StackDecisionSurface">
        <DecisionSurface
          className={styles.summaryDecision}
          compact
          copy={stackGoals[goal].copy(baseline)}
          eyebrow="Choose the result"
          title={stackGoals[goal].headline(baseline)}
        >
          <div aria-label="Choose your stack goal" className={styles.goalPicker} role="group">
            {(Object.keys(stackGoals) as StackGoal[]).map((option) => (
              <button aria-pressed={goal === option} key={option} onClick={() => onGoal(option)} type="button">{option}</button>
            ))}
          </div>
        </DecisionSurface>
        {nextProduct ? (
          <DecisionSurface
            actions={(
              <div className={styles.summaryOptionActions}>
                <strong>{nextProduct.price}</strong>
                <button aria-pressed={added.includes(nextProduct.id)} onClick={() => onAdd(nextProduct.id)} type="button">
                  {added.includes(nextProduct.id) ? "Added to stack" : `Add ${nextProduct.name}`}
                </button>
              </div>
            )}
            className={styles.summaryOption}
            compact
            copy={nextProduct.rationale}
            eyebrow={nextProduct.series}
            headingLevel="h3"
            title={nextProduct.name}
          >
            <ContributionChips contributions={nextProduct.contributions} />
          </DecisionSurface>
        ) : null}
      </div>

      <div aria-live="polite" data-component="StackSummarySurface">
        <DecisionSurface
          actions={<a className={styles.summaryAction} href={action.href}>{action.label} →</a>}
          className={styles.summaryOutcome}
          compact
          copy={`${stackGoals[goal].outcome} now define this product line-up.`}
          eyebrow="Your selected stack"
          title={`${selectedLineup} · £${stackTotal}`}
        >
          <StackCommercialLevel contributions={contributions} productCount={productCount} />
        </DecisionSurface>
      </div>

      <OpenLabConfidenceSurface compact products={confidenceSelection(baseline, selectedProducts)} />
    </div>
  );
}

function StackBuilderState({ baselineSlug, host }: { baselineSlug: string; host: StackHost }) {
  const [currentBaselineSlug, setCurrentBaselineSlug] = useState(baselineSlug);
  const baseline = useMemo(() => baselineFor(currentBaselineSlug), [currentBaselineSlug]);
  const variant = hostVariant(host);
  const [added, setAdded] = useState<StackProductId[]>([]);
  const [goal, setGoal] = useState<StackGoal>(() => initialGoal(baseline));

  const visibleProducts = products.filter((product) => product.id !== baseline.slug && product.outcomes.includes(goal));
  const selectedProducts = products.filter((product) => added.includes(product.id));
  const productCount = selectedProducts.length + 1;
  const stackTotal = stackTotalFor(baseline.price, selectedProducts.map((product) => product.price));
  const contributions = uniqueStackContributions([baseline.contributions, ...selectedProducts.map((product) => product.contributions)]);

  const toggleAddition = (id: StackProductId) => {
    setAdded((current) => current.includes(id) ? current.filter((currentId) => currentId !== id) : [...current, id]);
  };
  const selectGoal = (nextGoal: StackGoal) => {
    setGoal(nextGoal);
    setAdded((current) => current.filter((id) => products.find((product) => product.id === id)?.outcomes.includes(nextGoal)));
  };
  const selectBaseline = (nextSlug: string) => {
    const nextBaseline = baselineFor(nextSlug);
    setCurrentBaselineSlug(nextSlug);
    setGoal(initialGoal(nextBaseline));
    setAdded([]);
  };

  if (variant !== "full") {
    return (
      <StackSummary
        added={added}
        baseline={baseline}
        contributions={contributions}
        goal={goal}
        host={host}
        onAdd={toggleAddition}
        onGoal={selectGoal}
        productCount={productCount}
        selectedProducts={selectedProducts}
        stackTotal={stackTotal}
        variant={variant}
        visibleProducts={visibleProducts}
      />
    );
  }

  const selectedLineup = [baseline.name, ...selectedProducts.map((product) => product.name)].join(" + ");

  return (
    <div className={styles.page} data-baseline={baseline.slug} data-component="YourStackBuilder" data-host={host} data-mobile-strategy="guided-sequence" data-variant={variant}>
      <div data-component="StackGoalSelector">
        <DecisionSurface
          className={styles.intro}
          copy={stackGoals[goal].copy(baseline)}
          eyebrow="Choose the result"
          headingLevel="h1"
          title={stackGoals[goal].headline(baseline)}
        >
          <div aria-label="Choose your stack goal" className={styles.goalPicker} role="group">
            {(Object.keys(stackGoals) as StackGoal[]).map((option) => (
              <button aria-pressed={goal === option} key={option} onClick={() => selectGoal(option)} type="button">{option}</button>
            ))}
          </div>
        </DecisionSurface>
      </div>

      <BaselineSurface baseline={baseline} onBaselineChange={host === "standalone" ? selectBaseline : undefined} productCount={productCount} />

      <section aria-label={`${goal} stack additions`} className={styles.rail}>
        {visibleProducts.map((product) => (
          <StackOutcomeCard
            added={added.includes(product.id)}
            key={product.id}
            onAdd={() => toggleAddition(product.id)}
            product={product}
          />
        ))}
      </section>

      <div className={styles.outcomeGrid}>
        <div aria-live="polite" data-component="StackSummarySurface">
          <DecisionSurface
            className={styles.outcome}
            copy={productCount === 1
              ? `${baseline.name} is your foundation. Add the first contribution to make the selected build stronger.`
              : `${stackGoals[goal].outcome} now define this ${productCount}-product build.`}
            eyebrow="Your stack is getting stronger"
            title={`${selectedLineup} · £${stackTotal}`}
          >
            <StackCommercialLevel contributions={contributions} productCount={productCount} />
          </DecisionSurface>
        </div>
        <OpenLabConfidenceSurface products={confidenceSelection(baseline, selectedProducts)} />
      </div>

      <DecisionSurface
        actions={productCount === 1
          ? <button disabled type="button">Review selected products · {productCount}</button>
          : <a className={styles.continueAction} href="/bundle-builder">Review selected products · {productCount}</a>}
        className={styles.continue}
        compact
        copy={productCount === 1
          ? "Set the goal, then choose what each new product should add to the result."
          : `${selectedLineup} brings ${contributions.join(", ").toLowerCase()} into one clear product decision.`}
        eyebrow="Your selected products"
        title={productCount === 1 ? "Choose the first addition to your stack." : `Review your £${stackTotal} ${stackLevelFor(productCount).toLowerCase()} stack.`}
      />
    </div>
  );
}

export function YourStackBuilder({ baselineSlug = "mk-2866", host = "standalone" }: { baselineSlug?: string; host?: StackHost }) {
  return <StackBuilderState baselineSlug={baselineSlug} host={host} key={`${host}-${baselineSlug}`} />;
}
