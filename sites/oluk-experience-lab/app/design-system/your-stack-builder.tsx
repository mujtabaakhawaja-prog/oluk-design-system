"use client";

import { useMemo, useState } from "react";

import { MetricRail } from "./metric-rail";
import { ProductMediaChamber } from "./product-media-chamber";
import type { ProductMediaAsset } from "./product-fixtures";
import styles from "./your-stack-builder.module.css";

type StackProduct = Readonly<{
  id: "rad-140" | "ment" | "mk-677";
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
  media: ProductMediaAsset;
}>;

type StackGoal = "Cutting" | "Bulking" | "Recomp" | "PCT";

const stackGoals: Readonly<Record<StackGoal, { headline: string; copy: string; outcome: string }>> = {
  Cutting: {
    headline: "Build a sharper cutting stack.",
    copy: "Keep MK-2866 as your base, then add the product direction that pushes training output, lean mass focus or recovery capacity further.",
    outcome: "Leaner, harder training emphasis",
  },
  Bulking: {
    headline: "Build size and power into the plan.",
    copy: "Start with MK-2866, then layer the products that put more weight behind strength, mass and recovery through a harder phase.",
    outcome: "Mass and power emphasis",
  },
  Recomp: {
    headline: "Build a more capable recomp stack.",
    copy: "Keep the base clean, then select the additions that give your training phase more strength, body-composition and recovery support.",
    outcome: "Strength and body-composition emphasis",
  },
  PCT: {
    headline: "Plan the next phase with intent.",
    copy: "Use your MK-2866 starting point to compare the products you want in view before you move into the next training block.",
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

function media(id: StackProduct["id"], alias: string, src: string): ProductMediaAsset {
  return {
    id: `${id}-front`,
    productId: id,
    src,
    alt: `${id.toUpperCase()} ${alias} bottle`,
    width: 1024,
    height: 1536,
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
    media: media("mk-677", "Ibutamoren", "/assets/products/hero/mk-677/front.webp"),
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

/**
 * Canonical outcome-led stack card. Hosts reuse this rather than returning to
 * the generic commerce-card status treatment: the decision is the outcome,
 * the product format, and the reason to add it.
 */
export function StackOutcomeCard({
  product,
  selected,
  added,
  onSelect,
  onAdd,
}: {
  product: StackProduct;
  selected: boolean;
  added: boolean;
  onSelect: () => void;
  onAdd: () => void;
}) {
  return (
    <article className={styles.card} data-selected={selected || undefined}>
      <button
        aria-label={`Select ${product.name}`}
        aria-pressed={selected}
        className={styles.selectCard}
        onClick={onSelect}
        type="button"
      >
        <ProductMediaChamber context="card" media={product.media} />
        <div className={styles.identity}>
          <div>
            <span className={styles.seriesChip}>{product.series}</span>
            <h2>{product.name}</h2>
            <p>{product.alias}</p>
          </div>
          <b className={styles.selection}>{selected ? "SELECTED" : "SELECT"}</b>
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

export function YourStackBuilder() {
  const [selected, setSelected] = useState<StackProduct["id"]>("rad-140");
  const [added, setAdded] = useState<StackProduct["id"][]>([]);
  const [goal, setGoal] = useState<StackGoal>("Cutting");
  const count = useMemo(() => added.length, [added]);
  const visibleProducts = products.filter((product) => product.outcomes.includes(goal));
  const selectedProducts = products.filter((product) => added.includes(product.id));
  const stackSignal = count === 0 ? "Base set" : count === 1 ? "Focused build" : count === 2 ? "Elevated build" : "Full build";

  return (
    <div className={styles.page} data-component="YourStackBuilder" data-mobile-strategy="carousel">
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
            onSelect={() => setSelected(product.id)}
            product={product}
            selected={selected === product.id}
          />
        ))}
      </section>

      <section aria-live="polite" className={styles.outcome}>
        <div>
          <span>Build outcome</span>
          <h2>{stackSignal}: {stackGoals[goal].outcome}</h2>
          <p>{count === 0 ? "MK-2866 is your base. Select one or more additions to see the shape of the full stack." : `MK-2866${selectedProducts.length ? ` + ${selectedProducts.map((product) => product.name).join(" + ")}` : ""} puts ${stackGoals[goal].outcome.toLowerCase()} at the centre of this selection.`}</p>
        </div>
        <div aria-label={`${count + 1} of 4 stack positions selected`} className={styles.signal}>
          {[0, 1, 2, 3].map((step) => <i data-active={step <= count || undefined} key={step} />)}
          <strong>{count + 1} product{count ? "s" : ""} selected</strong>
        </div>
      </section>

      <section className={styles.continue}>
        <div>
          <span>Your stack</span>
          <h2>{count ? "Your stack is taking shape." : "Choose the first addition to your stack."}</h2>
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
