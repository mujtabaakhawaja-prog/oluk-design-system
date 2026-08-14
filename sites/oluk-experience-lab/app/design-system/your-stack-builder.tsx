"use client";

import { useMemo, useState } from "react";

import { MetricRail } from "./metric-rail";
import { ProductMediaChamber } from "./product-media-chamber";
import type { ProductMediaAsset } from "./product-fixtures";
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

const baselineProfile: StackOutcomeProfile = { goalFit: 52, intensity: 38, complexity: 20, recoveryEmphasis: 34, evidenceVisibility: 92 };

const stackGoals: Readonly<Record<StackGoal, { headline: string; copy: string; outcome: string }>> = {
  Cutting: {
    headline: "Build a sharper cutting stack.",
    copy: "Add lean-mass intensity or recovery emphasis to MK-2866.",
    outcome: "Leaner, harder training emphasis",
  },
  Bulking: {
    headline: "Build size and power into the plan.",
    copy: "Add strength, mass or recovery focus to MK-2866.",
    outcome: "Mass and power emphasis",
  },
  Recomp: {
    headline: "Build a more capable recomp stack.",
    copy: "Add strength, recomp or recovery emphasis to MK-2866.",
    outcome: "Strength and body-composition emphasis",
  },
  PCT: {
    headline: "Plan the next phase with intent.",
    copy: "Use MK-2866 as the reference while you compare the next phase.",
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
    focus: "Lean mass", position: "Mass option one", rationale: "Add a lean-mass direction without inventing a product render. The governed chamber stays intentionally unpopulated until the registered LGD-4033 render exists.",
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
    focus: "Endurance + cutting", position: "Cutting pathway", rationale: "Add an endurance-led pathway around the MK-2866 baseline when the goal is a sharper cutting or recomp phase.",
    outcomes: ["Cutting", "Recomp"], profile: { goalFit: 34, intensity: 12, complexity: 12, recoveryEmphasis: 8, evidenceVisibility: 70 }, media: media("gw-501516", "Cardarine", "/assets/products/shop/gw-501516.jpeg", 300, 450),
  },
  {
    id: "epistane", series: "PROHORMONE SERIES", name: "Epistane", alias: "Epistane", strength: "20 MG", servings: "60 SERVINGS", purity: ">99%", price: "£44",
    focus: "Recomp finish", position: "Finishing option", rationale: "Compare a harder finishing presentation after the MK-2866 and Cardarine base is already clear.",
    outcomes: ["Recomp"], profile: { goalFit: 25, intensity: 26, complexity: 20, recoveryEmphasis: 2, evidenceVisibility: 64 }, media: media("epistane", "Epistane", "/assets/products/shop/epistane.webp", 300, 450),
  },
] as const;

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
  product,
  added,
  onAdd,
}: {
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
        {product.media ? <ProductMediaChamber context="card" media={product.media} /> : <div aria-label={`${product.name} render unavailable`} className={styles.unpopulatedChamber}><span>Registered render pending</span><strong>{product.name}</strong></div>}
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
        <p className={styles.rationale}>{product.rationale}</p>
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

export function YourStackBuilder({ baselineSlug = "mk-2866", host = "standalone" }: { baselineSlug?: string; host?: "pdp" | "bag" | "confirmation" | "account" | "standalone" }) {
  const [added, setAdded] = useState<StackProduct["id"][]>([]);
  const [goal, setGoal] = useState<StackGoal>("Cutting");
  const count = useMemo(() => added.length, [added]);
  const visibleProducts = products.filter((product) => product.outcomes.includes(goal));
  const selectedProducts = products.filter((product) => added.includes(product.id));
  const stackSignal = count === 0 ? "Base set" : count === 1 ? "Focused build" : count === 2 ? "Elevated build" : "Full build";
  const outcomeProfile = useMemo(() => {
    const keys = Object.keys(baselineProfile) as Array<keyof StackOutcomeProfile>;
    return Object.fromEntries(keys.map((key) => [key, Math.min(100, baselineProfile[key] + selectedProducts.reduce((sum, product) => sum + product.profile[key], 0))])) as unknown as StackOutcomeProfile;
  }, [selectedProducts]);
  const stackTotal = 43 + selectedProducts.reduce((sum, product) => sum + Number(product.price.replace(/[^0-9.]/g, "")), 0);

  return (
    <div className={styles.page} data-baseline={baselineSlug} data-component="YourStackBuilder" data-host={host} data-mobile-strategy="carousel">
      <section className={styles.anchor}>
        <div>
          <span className={styles.sectionLabel}>Your starting product</span>
          <strong>MK-2866</strong>
          <div className={styles.anchorChips}>
            <ContextChip label="PRODUCT" value="Ostarine" />
            <ContextChip label="STRENGTH" value="15 MG" />
            <ContextChip label="FORMAT" value="90 SERVINGS" />
          </div>
        </div>
        <div className={styles.count}>
          <small>Added to stack</small>
          <b>{count}</b>
        </div>
      </section>

      <section className={styles.intro}>
        <span>Build your stack</span>
        <h1>{stackGoals[goal].headline}</h1>
        <p>{stackGoals[goal].copy}</p>
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
            key={product.id}
            onAdd={() =>
              setAdded((current) =>
                current.includes(product.id)
                  ? current.filter((id) => id !== product.id)
                  : [...current, product.id],
              )
            }
            product={product}
          />
        ))}
      </section>

      <section aria-live="polite" className={styles.outcome}>
        <div>
          <span>Build outcome</span>
          <h2>{stackSignal}: {stackGoals[goal].outcome}</h2>
          <p>{count === 0 ? "MK-2866 is your base. Select one or more additions to see the shape of the full stack." : `MK-2866${selectedProducts.length ? ` + ${selectedProducts.map((product) => product.name).join(" + ")}` : ""} puts ${stackGoals[goal].outcome.toLowerCase()} at the centre of this selection.`}</p>
        </div>
        <StackOutcomeProfileView profile={outcomeProfile} />
      </section>

      <section className={styles.continue}>
        <div>
          <span>Your stack</span>
          <h2>{count ? `Your £${stackTotal} stack is taking shape.` : "Choose the first addition to your stack."}</h2>
          <p>
            {count
              ? `You have added ${count} ${count === 1 ? "product" : "products"} around MK-2866. Review the line-up or keep building toward ${goal.toLowerCase()}.`
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
