"use client";

import { useMemo, useState } from "react";

import { MetricRail } from "./metric-rail";
import { ProductMediaChamber } from "./product-media-chamber";
import type { ProductMediaAsset } from "./product-fixtures";
import { getFrontierProduct } from "./frontier-content";
import styles from "./your-stack-builder.module.css";

type StackProduct = Readonly<{
  id: "rad-140" | "ment" | "mk-677" | "lgd-4033" | "gw-501516" | "epistane";
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
  profile: StackOutcomeProfile;
  media: ProductMediaAsset | null;
}>;

type StackGoal = "Cutting" | "Bulking" | "Recomp" | "PCT";
type StackOutcomeProfile = Readonly<{
  goalFit: number;
  intensity: number;
  complexity: number;
  recoveryEmphasis: number;
  evidenceVisibility: number;
}>;

type StackHost = "pdp" | "bag" | "confirmation" | "account" | "standalone";
type StackVariant = "full" | "compact" | "summary";
type StackBaseline = Readonly<{
  slug: string;
  series: string;
  name: string;
  alias: string;
  strength: string;
  servings: string;
  price: string;
  goals: readonly string[];
  profile: StackOutcomeProfile;
}>;

const baselineProfiles: Readonly<Record<string, StackOutcomeProfile>> = {
  "mk-2866": { goalFit: 52, intensity: 38, complexity: 20, recoveryEmphasis: 34, evidenceVisibility: 92 },
  "rad-140": { goalFit: 54, intensity: 62, complexity: 30, recoveryEmphasis: 18, evidenceVisibility: 78 },
  "lgd-4033": { goalFit: 56, intensity: 50, complexity: 28, recoveryEmphasis: 22, evidenceVisibility: 66 },
  "mk-677": { goalFit: 48, intensity: 28, complexity: 18, recoveryEmphasis: 66, evidenceVisibility: 72 },
  "gw-501516": { goalFit: 54, intensity: 34, complexity: 20, recoveryEmphasis: 30, evidenceVisibility: 70 },
  epistane: { goalFit: 50, intensity: 54, complexity: 34, recoveryEmphasis: 16, evidenceVisibility: 64 },
  ment: { goalFit: 58, intensity: 70, complexity: 42, recoveryEmphasis: 18, evidenceVisibility: 70 },
};

const fallbackBaselineProfile: StackOutcomeProfile = { goalFit: 50, intensity: 36, complexity: 22, recoveryEmphasis: 30, evidenceVisibility: 64 };

const stackGoals: Readonly<Record<StackGoal, { headline: (baseline: StackBaseline) => string; copy: (baseline: StackBaseline) => string; outcome: string }>> = {
  Cutting: {
    headline: (baseline) => `Build a sharper ${baseline.alias} cutting stack.`,
    copy: (baseline) => `Keep ${baseline.name} at the centre, then add endurance, definition or lean-mass intensity where it earns its place.`,
    outcome: "Leaner, harder training emphasis",
  },
  Bulking: {
    headline: (baseline) => `Build more size and power around ${baseline.alias}.`,
    copy: (baseline) => `Use ${baseline.name} as the base, then choose the lean-mass, intensity and recovery additions that suit the next phase.`,
    outcome: "Mass and power emphasis",
  },
  Recomp: {
    headline: (baseline) => `Build a more capable recomp stack around ${baseline.alias}.`,
    copy: (baseline) => `Keep ${baseline.name} in the picture while you add training output, a harder finish or more recovery capacity.`,
    outcome: "Strength and body-composition emphasis",
  },
  PCT: {
    headline: (baseline) => `Plan the next phase from your ${baseline.alias} base.`,
    copy: (baseline) => `Use ${baseline.name} as the reference point while you compare recovery-led additions and decide what comes next.`,
    outcome: "Next-phase planning emphasis",
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

function media(id: StackProduct["id"], alias: string, src: string, width = 1024, height = 1536): ProductMediaAsset {
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

const products: readonly StackProduct[] = [
  {
    id: "lgd-4033", series: "SARM SERIES", name: "LGD-4033", alias: "Ligandrol", strength: "5 MG", servings: "", purity: ">99%", price: "£44",
    focus: "Lean mass", position: "Mass option one", rationale: "Add a 5 MG lean-mass direction when building a heavier phase around the products already selected.",
    outcomes: ["Bulking", "Recomp"], profile: { goalFit: 28, intensity: 22, complexity: 16, recoveryEmphasis: 2, evidenceVisibility: 66 }, media: null,
  },
  {
    id: "rad-140",
    series: "SARM SERIES",
    name: "RAD-140",
    alias: "Testolone",
    strength: "8 MG",
    servings: "60 SERVINGS",
    purity: ">99%",
    price: "£55",
    focus: "Strength + lean mass",
    position: "Maximum intensity",
    rationale:
      "Add serious strength and lean-mass focus with the strongest SARM in the Olympus range—an 8 MG step up for a more aggressive training phase.",
    outcomes: ["Cutting", "Bulking", "Recomp"],
    profile: { goalFit: 24, intensity: 30, complexity: 18, recoveryEmphasis: 4, evidenceVisibility: 78 },
    media: media("rad-140", "Testolone", "/assets/products/rad-140/front.png"),
  },
  {
    id: "ment",
    series: "PROHORMONE SERIES",
    name: "MENT",
    alias: "Trestolone",
    strength: "20 MG",
    servings: "30 SERVINGS",
    purity: ">99%",
    price: "£49",
    focus: "Mass + power",
    position: "Advanced builder",
    rationale:
      "Take the stack into a heavier mass-and-power phase with Trestolone—a high-intensity choice for experienced customers building beyond a SARM-only plan.",
    outcomes: ["Bulking", "Recomp"],
    profile: { goalFit: 28, intensity: 38, complexity: 24, recoveryEmphasis: 5, evidenceVisibility: 70 },
    media: media("ment", "Trestolone", "/assets/products/hero/ment/front.webp"),
  },
  {
    id: "mk-677",
    series: "RESEARCH SERIES",
    name: "MK-677",
    alias: "Ibutamoren",
    strength: "15 MG",
    servings: "90 SERVINGS",
    purity: ">99%",
    price: "£45",
    focus: "Growth + recovery",
    position: "Daily support",
    rationale:
      "Build recovery capacity around the stack with a 90-serving Ibutamoren format supporting appetite, deeper sleep and recovery between hard sessions.",
    outcomes: ["Bulking", "Cutting", "Recomp", "PCT"],
    profile: { goalFit: 18, intensity: 8, complexity: 14, recoveryEmphasis: 42, evidenceVisibility: 72 },
    media: media("mk-677", "Ibutamoren", "/assets/products/hero/mk-677/front.webp"),
  },
  {
    id: "gw-501516", series: "METABOLIC SERIES", name: "GW-501516", alias: "Cardarine", strength: "10 MG", servings: "60 SERVINGS", purity: ">99%", price: "£42",
    focus: "Endurance + cutting", position: "Cutting pathway", rationale: "Add endurance-led support when the goal is a sharper cutting or recomp phase.",
    outcomes: ["Cutting", "Recomp"], profile: { goalFit: 34, intensity: 12, complexity: 12, recoveryEmphasis: 8, evidenceVisibility: 70 }, media: media("gw-501516", "Cardarine", "/assets/products/shop/gw-501516.jpeg", 300, 450),
  },
  {
    id: "epistane", series: "PROHORMONE SERIES", name: "Epistane", alias: "Epistane", strength: "20 MG", servings: "60 SERVINGS", purity: ">99%", price: "£44",
    focus: "Recomp finish", position: "Finishing option", rationale: "Compare a harder finishing option once the core recomp stack is already clear.",
    outcomes: ["Recomp"], profile: { goalFit: 25, intensity: 26, complexity: 20, recoveryEmphasis: 2, evidenceVisibility: 64 }, media: media("epistane", "Epistane", "/assets/products/shop/epistane.webp", 300, 450),
  },
] as const;

function baselineFor(slug: string): StackBaseline {
  const product = getFrontierProduct(slug) ?? getFrontierProduct("mk-2866");

  if (!product) {
    throw new Error("MK-2866 baseline record is required.");
  }

  return {
    slug: product.slug,
    series: product.series,
    name: product.name,
    alias: product.alias,
    strength: product.strength,
    servings: product.servings,
    price: product.price,
    goals: product.goal,
    profile: baselineProfiles[product.slug] ?? fallbackBaselineProfile,
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

function priceValue(value: string) {
  return Number(value.replace(/[^0-9.]/g, ""));
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

const profileLabels: ReadonlyArray<readonly [keyof StackOutcomeProfile, string]> = [
  ["goalFit", "Goal fit"], ["intensity", "Intensity"], ["complexity", "Complexity"],
  ["recoveryEmphasis", "Recovery emphasis"], ["evidenceVisibility", "Evidence visibility"],
];

export function StackOutcomeProfileView({ profile }: { profile: StackOutcomeProfile }) {
  return <div className={styles.profile} data-component="StackOutcomeProfile">{profileLabels.map(([key, label]) => <div key={key}><span><b>{label}</b><strong>{profile[key]}</strong></span><i aria-label={`${label}: ${profile[key]} out of 100`} aria-valuemax={100} aria-valuemin={0} aria-valuenow={profile[key]} role="meter" style={{ "--score": `${profile[key]}%` } as React.CSSProperties} /></div>)}</div>;
}

/**
 * Canonical outcome-led stack card. Hosts reuse this rather than returning to
 * the generic commerce-card status treatment: the decision is the outcome,
 * the product format, and the reason to add it.
 */
export function StackOutcomeCard({
  baseline,
  product,
  added,
  onAdd,
}: {
  baseline: StackBaseline;
  product: StackProduct;
  added: boolean;
  onAdd: () => void;
}) {
  return (
    <article className={styles.card} data-selected={added || undefined}>
      <button
        aria-label={`Select ${product.name}`}
        aria-pressed={added}
        className={styles.selectCard}
        onClick={onAdd}
        type="button"
      >
        {product.media ? <ProductMediaChamber context="card" media={product.media} /> : <div aria-label={`${product.name} product image coming soon`} className={styles.unpopulatedChamber}><span>Product image coming soon</span><strong>{product.name}</strong></div>}
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
          <ContextChip label="STACK FOCUS" value={product.focus} />
          <ContextChip label="WHY ADD IT" value={product.position} />
        </div>
        <MetricRail
          values={{
            strength: product.strength,
            servings: product.servings,
            purity: product.purity,
          }}
        />
        <p className={styles.rationale}>{product.rationale.replaceAll("MK-2866", baseline.name)}</p>
        <div className={styles.commerce}>
          <strong>{product.price}</strong>
          <div>
            <a href={`/product/${product.id}`}>View product</a>
            <button onClick={onAdd} type="button">
              {added ? "Added ✓" : "Add to stack"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function StackSummary({
  added,
  baseline,
  goal,
  onAdd,
  onGoal,
  outcomeProfile,
  selectedProducts,
  stackTotal,
  variant,
  host,
  visibleProducts,
}: Readonly<{
  added: readonly StackProduct["id"][];
  baseline: StackBaseline;
  goal: StackGoal;
  onAdd: (id: StackProduct["id"]) => void;
  onGoal: (goal: StackGoal) => void;
  outcomeProfile: StackOutcomeProfile;
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
    <div className={styles.page} data-baseline={baseline.slug} data-component="YourStackBuilder" data-host={host} data-mobile-strategy="summary" data-variant={variant}>
      <section className={styles.anchor}>
        <div>
          <span className={styles.sectionLabel}>{variant === "compact" ? "Build on this order" : "Your current product"}</span>
          <strong>{baseline.name}</strong>
          <div className={styles.anchorChips}>
            <ContextChip label="PRODUCT" value={baseline.alias} />
            <ContextChip label="STRENGTH" value={baseline.strength} />
            <ContextChip label="FORMAT" value={baseline.servings || "FORMAT SHOWN ON PRODUCT"} />
          </div>
        </div>
        <div className={styles.count}>
          <small>{added.length ? "In your stack" : "Next addition"}</small>
          <b>{added.length || 1}</b>
        </div>
      </section>

      <section className={styles.summaryBody}>
        <div>
          <span className={styles.sectionLabel}>Your outcome</span>
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
              <p>{nextProduct.focus}. {nextProduct.position}.</p>
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
          <span className={styles.sectionLabel}>{added.length ? "Your selected stack" : "Your starting point"}</span>
          <h2>{added.length ? `${selectedLineup} · £${stackTotal}` : `${baseline.name} · ${baseline.price}`}</h2>
          <p>{added.length ? `${stackGoals[goal].outcome} now leads this selection.` : "Select an addition to see the combined stack outcome and total."}</p>
        </div>
        <StackOutcomeProfileView profile={outcomeProfile} />
        <a href={action.href}>{action.label} →</a>
      </section>
    </div>
  );
}

export function YourStackBuilder({ baselineSlug = "mk-2866", host = "standalone" }: { baselineSlug?: string; host?: StackHost }) {
  const baseline = useMemo(() => baselineFor(baselineSlug), [baselineSlug]);
  const variant = hostVariant(host);
  const [added, setAdded] = useState<StackProduct["id"][]>([]);
  const [goal, setGoal] = useState<StackGoal>(() => initialGoal(baseline));
  const count = useMemo(() => added.length, [added]);
  const visibleProducts = products.filter((product) => product.id !== baseline.slug && product.outcomes.includes(goal));
  const selectedProducts = products.filter((product) => added.includes(product.id));
  const stackSignal = count === 0 ? "Base set" : count === 1 ? "Focused build" : count === 2 ? "Elevated build" : "Full build";
  const outcomeProfile = useMemo(() => {
    const keys = Object.keys(baseline.profile) as Array<keyof StackOutcomeProfile>;
    return Object.fromEntries(keys.map((key) => [key, Math.min(100, baseline.profile[key] + selectedProducts.reduce((sum, product) => sum + product.profile[key], 0))])) as unknown as StackOutcomeProfile;
  }, [baseline.profile, selectedProducts]);
  const stackTotal = priceValue(baseline.price) + selectedProducts.reduce((sum, product) => sum + priceValue(product.price), 0);
  const toggleAddition = (id: StackProduct["id"]) => setAdded((current) => current.includes(id) ? current.filter((currentId) => currentId !== id) : [...current, id]);

  if (variant !== "full") {
    return <StackSummary added={added} baseline={baseline} goal={goal} host={host} onAdd={toggleAddition} onGoal={setGoal} outcomeProfile={outcomeProfile} selectedProducts={selectedProducts} stackTotal={stackTotal} variant={variant} visibleProducts={visibleProducts} />;
  }

  return (
    <div className={styles.page} data-baseline={baseline.slug} data-component="YourStackBuilder" data-host={host} data-mobile-strategy="carousel" data-variant={variant}>
      <section className={styles.anchor}>
        <div>
          <span className={styles.sectionLabel}>Your starting product</span>
          <strong>{baseline.name}</strong>
          <div className={styles.anchorChips}>
            <ContextChip label="PRODUCT" value={baseline.alias} />
            <ContextChip label="STRENGTH" value={baseline.strength} />
            <ContextChip label="FORMAT" value={baseline.servings || "FORMAT SHOWN ON PRODUCT"} />
          </div>
        </div>
        <div className={styles.count}>
          <small>Added to stack</small>
          <b>{count}</b>
        </div>
      </section>

      <section className={styles.intro}>
        <span>Build your stack</span>
        <h1>{stackGoals[goal].headline(baseline)}</h1>
        <p>{stackGoals[goal].copy(baseline)}</p>
        <div aria-label="Choose your stack goal" className={styles.goalPicker} role="tablist">
          {(Object.keys(stackGoals) as StackGoal[]).map((option) => (
            <button aria-selected={goal === option} key={option} onClick={() => setGoal(option)} role="tab" type="button">{option}</button>
          ))}
        </div>
      </section>

      <section aria-label={`${goal} stack products`} className={styles.rail}>
        {visibleProducts.map((product) => (
          <StackOutcomeCard
            added={added.includes(product.id)}
            baseline={baseline}
            key={product.id}
            onAdd={() => toggleAddition(product.id)}
            product={product}
          />
        ))}
      </section>

      <section aria-live="polite" className={styles.outcome}>
        <div>
          <span>Build outcome</span>
          <h2>{stackSignal}: {stackGoals[goal].outcome}</h2>
          <p>{count === 0 ? `${baseline.name} is your base. Select one or more additions to see the shape of the full stack.` : `${baseline.name}${selectedProducts.length ? ` + ${selectedProducts.map((product) => product.name).join(" + ")}` : ""} puts ${stackGoals[goal].outcome.toLowerCase()} at the centre of this selection.`}</p>
        </div>
        <StackOutcomeProfileView profile={outcomeProfile} />
      </section>

      <section className={styles.continue}>
        <div>
          <span>Your stack</span>
          <h2>{count ? `Your £${stackTotal} stack is taking shape.` : "Choose the first addition to your stack."}</h2>
          <p>
            {count
              ? `You have added ${count} ${count === 1 ? "product" : "products"} around ${baseline.name}. Review the line-up or keep building toward ${goal.toLowerCase()}.`
              : "Set your goal, then build the product line-up that moves the result forward."}
          </p>
        </div>
        <button aria-disabled={count === 0} type="button">
          Review my stack · {count}
        </button>
      </section>
    </div>
  );
}
