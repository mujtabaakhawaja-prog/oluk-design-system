"use client";

import { useMemo, useState } from "react";

import { MetricRail } from "./metric-rail";
import { ProductMediaChamber } from "./product-media-chamber";
import type { ProductMediaAsset } from "./product-fixtures";
import { EvidenceStatusChip, type EvidenceAuthorityState } from "./program-components";
import { actualProductMedia, getFrontierProduct } from "./frontier-content";
import { stackLevelFor, stackTotalFor, uniqueStackContributions } from "./stack-commercial-model.mjs";
import styles from "./your-stack-builder.module.css";

type StackGoal = "Cutting" | "Bulking" | "Recomp" | "PCT";
type StackHost = "pdp" | "bag" | "confirmation" | "account" | "standalone";
type StackVariant = "full" | "compact" | "summary";
type StackProductId = "rad-140" | "ment" | "mk-677" | "lgd-4033" | "gw-501516" | "epistane";
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

/** Relationship content is separate from product truth so cards always read facts from the product registry. */
const stackRelationships: readonly StackRelationship[] = [
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
  const product = getFrontierProduct(slug) ?? getFrontierProduct("mk-2866");
  if (!product) throw new Error("MK-2866 baseline record is required.");

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

function OpenLabConfidenceSurface({ baseline, compact = false }: { baseline: StackBaseline; compact?: boolean }) {
  const available = baseline.evidenceState !== "unavailable";
  return (
    <aside className={styles.confidence} data-compact={compact || undefined} data-component="StackOpenLabConfidence">
      <div>
        <span className={styles.sectionLabel}>OpenLab confidence</span>
        <EvidenceStatusChip state={baseline.evidenceState} />
      </div>
      <h2>{available ? `See the batch behind ${baseline.name}.` : `Check the record status for ${baseline.name}.`}</h2>
      <p>
        {available
          ? "Open the product dossier, compare the label with the available record and move from the source back to the product."
          : "No public record is registered for this product yet. Its product facts stay visible and no substitute result is shown."}
      </p>
      <div className={styles.confidenceActions}>
        <a href={`/open-lab/compound/${baseline.slug}`}>Open product dossier</a>
        <a href="/open-lab/compare">Compare OpenLab status</a>
      </div>
    </aside>
  );
}

/** Canonical addition card: product facts come from the registry and the reason to add it comes from relationship data. */
export function StackOutcomeCard({ product, added, onAdd }: { product: StackProduct; added: boolean; onAdd: () => void }) {
  return (
    <article className={styles.card} data-component="StackAdditionCard" data-selected={added || undefined}>
      <button
        aria-label={`Select ${product.name}`}
        aria-pressed={added}
        className={styles.selectCard}
        onClick={onAdd}
        type="button"
      >
        <ProductMediaChamber context="card" media={product.media} />
        <div className={styles.identity}>
          <div>
            <span className={styles.seriesChip}>{product.series}</span>
            <h2>{product.name}</h2>
            <p>{product.alias}</p>
          </div>
          <b className={styles.selection}>{added ? "SELECTED" : "SELECT"}</b>
        </div>
      </button>
      <div className={styles.content}>
        <div className={styles.relevanceRow}>
          <ContextChip label="PRODUCT ROLE" value={product.focus} />
          <ContextChip label="WHAT IT ADDS" value={product.position} />
        </div>
        <MetricRail values={{ strength: product.strength, servings: product.servings, purity: product.purity }} />
        <ContributionChips contributions={product.contributions} />
        <p className={styles.rationale}>{product.rationale}</p>
        <a className={styles.evidenceEntry} href={`/open-lab/compound/${product.id}`}>
          <span>OpenLab</span>
          <EvidenceStatusChip state={product.evidenceState} />
        </a>
        <div className={styles.commerce}>
          <strong>{product.price}</strong>
          <div>
            <a href={`/product/${product.id}`}>View product</a>
            <button onClick={onAdd} type="button">{added ? "Added ✓" : "Add to stack"}</button>
          </div>
        </div>
      </div>
    </article>
  );
}

function BaselineSurface({ baseline, productCount }: { baseline: StackBaseline; productCount: number }) {
  return (
    <section className={styles.anchor} data-component="StackBaselineProduct">
      <div className={styles.anchorIdentity}>
        <ProductMediaChamber className={styles.anchorMedia} context="compact" media={baseline.media} />
        <div>
          <span className={styles.sectionLabel}>Your starting product</span>
          <strong>{baseline.name}</strong>
          <p>{baseline.alias} · {baseline.series}</p>
          <div className={styles.anchorChips}>
            <ContextChip label="PRODUCT" value={baseline.alias} />
            <ContextChip label="STARTING PRICE" value={baseline.price} />
          </div>
        </div>
      </div>
      <MetricRail className={styles.baselineMetrics} values={{ strength: baseline.strength, servings: baseline.servings, purity: baseline.purity }} />
      <div className={styles.count}>
        <small>Products selected</small>
        <b>{productCount}</b>
      </div>
    </section>
  );
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

      <section className={styles.summaryBody} data-component="StackDecisionSurface">
        <div>
          <span className={styles.sectionLabel}>Choose the result</span>
          <h2>{stackGoals[goal].headline(baseline)}</h2>
          <p>{stackGoals[goal].copy(baseline)}</p>
          <div aria-label="Choose your stack goal" className={styles.goalPicker} role="tablist">
            {(Object.keys(stackGoals) as StackGoal[]).map((option) => (
              <button aria-selected={goal === option} key={option} onClick={() => onGoal(option)} role="tab" type="button">{option}</button>
            ))}
          </div>
        </div>
        {nextProduct ? (
          <article className={styles.summaryOption}>
            <div>
              <span className={styles.seriesChip}>{nextProduct.series}</span>
              <h3>{nextProduct.name}</h3>
              <p>{nextProduct.rationale}</p>
              <ContributionChips contributions={nextProduct.contributions} />
            </div>
            <strong>{nextProduct.price}</strong>
            <button aria-pressed={added.includes(nextProduct.id)} onClick={() => onAdd(nextProduct.id)} type="button">
              {added.includes(nextProduct.id) ? "Added to stack" : `Add ${nextProduct.name}`}
            </button>
          </article>
        ) : null}
      </section>

      <section aria-live="polite" className={styles.summaryOutcome}>
        <div>
          <span className={styles.sectionLabel}>Your selected stack</span>
          <h2>{selectedLineup} · £{stackTotal}</h2>
          <p>{stackGoals[goal].outcome} now define this product line-up.</p>
        </div>
        <StackCommercialLevel contributions={contributions} productCount={productCount} />
        <a href={action.href}>{action.label} →</a>
      </section>

      <OpenLabConfidenceSurface baseline={baseline} compact />
    </div>
  );
}

function StackBuilderState({ baselineSlug, host }: { baselineSlug: string; host: StackHost }) {
  const baseline = useMemo(() => baselineFor(baselineSlug), [baselineSlug]);
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
      <section className={styles.intro} data-component="StackGoalSelector">
        <span>Choose the result</span>
        <h1>{stackGoals[goal].headline(baseline)}</h1>
        <p>{stackGoals[goal].copy(baseline)}</p>
        <div aria-label="Choose your stack goal" className={styles.goalPicker} role="tablist">
          {(Object.keys(stackGoals) as StackGoal[]).map((option) => (
            <button aria-selected={goal === option} key={option} onClick={() => selectGoal(option)} role="tab" type="button">{option}</button>
          ))}
        </div>
      </section>

      <BaselineSurface baseline={baseline} productCount={productCount} />

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
        <section aria-live="polite" className={styles.outcome}>
          <div>
            <span className={styles.sectionLabel}>Your stack is getting stronger</span>
            <h2>{selectedLineup} · £{stackTotal}</h2>
            <p>
              {productCount === 1
                ? `${baseline.name} is your foundation. Add the first contribution to make the selected build stronger.`
                : `${stackGoals[goal].outcome} now define this ${productCount}-product build.`}
            </p>
          </div>
          <StackCommercialLevel contributions={contributions} productCount={productCount} />
        </section>
        <OpenLabConfidenceSurface baseline={baseline} />
      </div>

      <section className={styles.continue}>
        <div>
          <span>Your selected products</span>
          <h2>{productCount === 1 ? "Choose the first addition to your stack." : `Review your £${stackTotal} ${stackLevelFor(productCount).toLowerCase()} stack.`}</h2>
          <p>
            {productCount === 1
              ? "Set the goal, then choose what each new product should add to the result."
              : `${selectedLineup} brings ${contributions.join(", ").toLowerCase()} into one clear product decision.`}
          </p>
        </div>
        <button aria-disabled={productCount === 1} type="button">Review selected products · {productCount}</button>
      </section>
    </div>
  );
}

export function YourStackBuilder({ baselineSlug = "mk-2866", host = "standalone" }: { baselineSlug?: string; host?: StackHost }) {
  return <StackBuilderState baselineSlug={baselineSlug} host={host} key={`${host}-${baselineSlug}`} />;
}
