import type { ReactNode } from "react";
import type { HeadingLevel } from "./commerce-types";
import {
  FixtureStatusStack,
  PriceBlock,
  ProductIdentity,
  StaticPurchaseActions,
} from "./commerce-parts";
import { classes } from "./component-utils";
import { MetricRail } from "./metric-rail";
import type { ProductFixture } from "./product-fixtures";
import { mk2866Fixture } from "./product-fixtures";
import { ProductMediaChamber } from "./product-media-chamber";

export type HeroDecisionSurfaceProps = Readonly<{
  product?: ProductFixture;
  headingLevel?: HeadingLevel;
  className?: string;
}>;

export function HeroDecisionSurface({
  product = mk2866Fixture,
  headingLevel = "h2",
  className,
}: HeroDecisionSurfaceProps) {
  return (
    <article
      aria-label={`Featured ${product.name} product decision surface`}
      className={classes("hero-decision-surface", "oluk-hero-decision-surface", className)}
      data-component="HeroDecisionSurface"
      data-copy-surface="decision"
    >
      <div className="hero-decision-heading">
        <ProductIdentity
          headingLevel={headingLevel}
          product={product}
          status={<FixtureStatusStack product={product} />}
        />
      </div>
      <MetricRail compact product={product} />
      <div className="hero-decision-commerce">
        <PriceBlock price={product.price} />
        <StaticPurchaseActions
          evidenceHref={product.evidencePath}
          productHref={product.customerPath}
          showProductLink
          state={product.presentationStatus.inventory}
        />
      </div>
    </article>
  );
}

export type ProductDecisionHeroProps = Readonly<{
  product?: ProductFixture;
  eyebrow?: string;
  title?: string;
  copy?: string;
  className?: string;
  priorityMedia?: boolean;
  actions?: ReactNode;
}>;

export function ProductDecisionHero({
  product = mk2866Fixture,
  eyebrow = "FEATURED PRODUCT",
  title,
  copy,
  className,
  priorityMedia = true,
  actions,
}: ProductDecisionHeroProps) {
  return (
    <section
      className={classes("product-decision-hero", "oluk-product-decision-hero", className)}
      data-component="ProductDecisionHero"
    >
      <div className="product-decision-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title ?? product.name}</h1>
        <p>{copy ?? `${product.alias} · ${product.strength} · ${product.servings} · ${product.purity}`}</p>
        {actions ? <div className="button-row">{actions}</div> : null}
      </div>
      <ProductMediaChamber
        className="product-decision-media"
        context="hero"
        media={product.media}
        priority={priorityMedia}
      />
      <HeroDecisionSurface product={product} />
    </section>
  );
}
