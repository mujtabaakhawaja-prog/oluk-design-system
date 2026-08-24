import type { ReactNode } from "react";
import type { EvidenceState, HeadingLevel, InventoryState } from "./commerce-types";
import { ActionButton, ActionLink } from "./action-control";
import { FixtureStatusStack, PriceBlock, ProductIdentity } from "./commerce-parts";
import { classes } from "./component-utils";
import { MetricRail } from "./metric-rail";
import type {
  BenefitClaim,
  EvidenceTrustSignal,
  ProductFact,
  ProductFixture,
  ProductRelationship,
  ProductRelationshipType,
} from "./product-fixtures";
import { ProductMediaChamber } from "./product-media-chamber";
import { EvidenceStatus, StockPill } from "./product-status";
import { QuantityStepper } from "./quantity-stepper";
import styles from "./product-commerce-card.module.css";

export type {
  BenefitClaim,
  EvidenceTrustSignal,
  ProductFact,
  ProductRelationship,
} from "./product-fixtures";

export type ProductCardPosture = "destination" | "transactional";

export type VisualCommerceState =
  | "available"
  | "unavailable"
  | "loading"
  | "error";

export type ProductCardInteractionState =
  | "default"
  | "hover"
  | "focus"
  | "selected"
  | "added";

/** Review-inert purchase controls stay visually available without mutating candidate data. */
export type ReviewInteractionMode = "inert" | "interactive";

type SharedProductCommerceCardProps = Readonly<{
  product: ProductFixture;
  commerceState?: VisualCommerceState;
  interactionState?: ProductCardInteractionState;
  inventory?: InventoryState;
  headingLevel?: HeadingLevel;
  reviewInteractionMode?: ReviewInteractionMode;
  className?: string;
}>;

type CompactProductCommerceCardProps = SharedProductCommerceCardProps & Readonly<{
  variant: "compact";
}>;

type VerticalProductCommerceCardProps = SharedProductCommerceCardProps & Readonly<{
  variant?: "vertical";
  facts?: ReadonlyArray<ProductFact>;
  evidenceTrustSignal?: EvidenceTrustSignal;
}>;

type FeaturedProductCommerceCardProps = SharedProductCommerceCardProps & Readonly<{
  variant: "featured";
  benefitClaims?: ReadonlyArray<BenefitClaim>;
  evidenceTrustSignal?: EvidenceTrustSignal;
}> & (
  | Readonly<{
      posture: "destination";
      quantity?: never;
    }>
  | Readonly<{
      posture: "transactional";
      quantity?: number;
    }>
);

type RelationProductCommerceCardProps = SharedProductCommerceCardProps & Readonly<{
  variant: "relation";
  relationship: ProductRelationship;
  showPrice?: boolean;
}>;

export type ProductCommerceCardProps =
  | CompactProductCommerceCardProps
  | VerticalProductCommerceCardProps
  | FeaturedProductCommerceCardProps
  | RelationProductCommerceCardProps;

const relationshipLabels: Readonly<Record<ProductRelationshipType, string>> = {
  alternative: "ALTERNATIVE",
  comparison: "COMPARE",
  complement: "COMPLEMENTS",
  stack: "STACK RELATIONSHIP",
};

function presentationState(
  product: ProductFixture,
  interactionState: ProductCardInteractionState,
  commerceState: VisualCommerceState,
  inventory?: InventoryState,
  evidence?: EvidenceState,
) {
  const projectedInventory = inventory ?? product.presentationStatus.inventory;
  const resolvedInventory = commerceState === "unavailable" && projectedInventory === "in-stock"
    ? "unavailable"
    : projectedInventory;
  const resolvedEvidence = evidence ?? product.presentationStatus.evidence;
  const primaryLabel =
    commerceState === "loading"
      ? "Loading…"
      : commerceState === "error"
        ? "Unavailable"
        : interactionState === "added"
          ? "Added"
          : resolvedInventory === "out-of-stock"
            ? "Out of stock"
            : resolvedInventory === "unavailable"
              ? "Unavailable"
              : "Add to bag";

  return { inventory: resolvedInventory, evidence: resolvedEvidence, primaryLabel } as const;
}

function resolveCommerceState(
  product: ProductFixture,
  inventory?: InventoryState,
  commerceState?: VisualCommerceState,
): VisualCommerceState {
  if (commerceState) return commerceState;
  return (inventory ?? product.presentationStatus.inventory) === "in-stock"
    ? "available"
    : "unavailable";
}

function requireSourceCoordinate(sourceCoordinate: string, field: string) {
  if (!sourceCoordinate.trim()) {
    throw new Error(`ProductCommerceCard requires a source coordinate for ${field}.`);
  }
}

function boundedFacts(facts: ReadonlyArray<ProductFact>, maximum: number) {
  if (facts.length > maximum) {
    throw new Error(`ProductCommerceCard accepts at most ${maximum} source-backed facts.`);
  }

  for (const fact of facts) {
    requireSourceCoordinate(fact.sourceCoordinate, `fact "${fact.label}"`);
  }

  return facts;
}

function boundedBenefitClaims(claims: ReadonlyArray<BenefitClaim>, maximum: number) {
  if (claims.length > maximum) {
    throw new Error(`ProductCommerceCard accepts at most ${maximum} benefit claims.`);
  }

  for (const benefit of claims) {
    requireSourceCoordinate(benefit.sourceCoordinate, `benefit "${benefit.claim}"`);
  }

  return claims;
}

function validatedRelationship(relationship: ProductRelationship) {
  const differenceCount = relationship.differences.length;
  if (differenceCount < 2 || differenceCount > 3) {
    throw new Error("ProductCommerceCard.Relation requires two or three differences.");
  }

  requireSourceCoordinate(relationship.reason.sourceCoordinate, "relationship reason");
  requireSourceCoordinate(relationship.evidence.sourceCoordinate, "relationship evidence");
  boundedFacts(relationship.differences, 3);

  if (!relationship.reason.claim.trim() || !relationship.action.href.trim() || !relationship.action.label.trim()) {
    throw new Error("ProductCommerceCard.Relation requires a reason and one relationship action.");
  }

  return relationship;
}

function SourceBackedFacts({ facts }: Readonly<{ facts: ReadonlyArray<ProductFact> }>) {
  if (facts.length === 0) return null;

  return (
    <dl aria-label="Product consideration facts" className={styles.factList}>
      {facts.map((fact) => (
        <div data-source-coordinate={fact.sourceCoordinate} key={`${fact.label}-${fact.value}`}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function BenefitClaims({ claims }: Readonly<{ claims: ReadonlyArray<BenefitClaim> }>) {
  if (claims.length === 0) return null;

  return (
    <ul aria-label="Product benefit context" className={styles.benefitList}>
      {claims.map((benefit) => (
        <li data-source-coordinate={benefit.sourceCoordinate} key={benefit.claim}>
          {benefit.claim}
        </li>
      ))}
    </ul>
  );
}

function EvidenceTrust({ signal }: Readonly<{ signal: EvidenceTrustSignal }>) {
  return (
    <div aria-label="Evidence trust" className={styles.evidenceTrust} data-source-coordinate={signal.sourceCoordinate}>
      <EvidenceStatus compact state={signal.state} />
      <p>{signal.label}</p>
    </div>
  );
}

function CardShell({
  actionCeiling,
  children,
  className,
  component,
  interactionMode,
  commerceState,
  label,
  posture,
  interactionState,
  variant,
}: Readonly<{
  actionCeiling: 1 | 2;
  children: ReactNode;
  className: string;
  component: string;
  commerceState: VisualCommerceState;
  interactionMode: ReviewInteractionMode;
  label: string;
  posture: ProductCardPosture | "relation";
  interactionState: ProductCardInteractionState;
  variant: "compact" | "vertical" | "featured" | "relation";
}>) {
  return (
    <article
      aria-label={label}
      aria-busy={commerceState === "loading" || undefined}
      className={className}
      data-action-ceiling={actionCeiling}
      data-component={component}
      data-copy-surface="commerce"
      data-commerce-state={commerceState}
      data-interaction-mode={interactionMode}
      data-oluk-node="component.product-commerce-card"
      data-posture={posture}
      data-state={interactionState}
      data-variant={variant}
    >
      {children}
    </article>
  );
}

function EvidenceDestination({ signal }: Readonly<{ signal?: EvidenceTrustSignal }>) {
  if (!signal?.destination) return null;

  return (
    <ActionLink href={signal.destination.href} variant="secondary">
      {signal.destination.label}
    </ActionLink>
  );
}

export function ProductCommerceCard(props: ProductCommerceCardProps) {
  const {
    className,
    commerceState: requestedCommerceState,
    headingLevel = "h3",
    interactionState = "default",
    inventory,
    product,
    reviewInteractionMode = "inert",
  } = props;
  const commerceState = resolveCommerceState(product, inventory, requestedCommerceState);

  if (props.variant === "compact") {
    const resolved = presentationState(product, interactionState, commerceState, inventory);

    return (
      <CardShell
        actionCeiling={1}
        className={classes(
          "product-commerce-card",
          "product-commerce-card-compact",
          "oluk-candidate-compact",
          styles.compactCard,
          className,
        )}
        component="ProductCommerceCard.compact"
        commerceState={commerceState}
        interactionMode={reviewInteractionMode}
        label={`${product.name} compact product presentation`}
        posture="destination"
        interactionState={interactionState}
        variant="compact"
      >
        <div className="oluk-candidate-compact-top">
          <ProductMediaChamber
            className="oluk-candidate-compact-media"
            context="compact"
            media={product.media}
          />
          <ProductIdentity headingLevel={headingLevel} product={product} />
        </div>
        <MetricRail compact product={product} />
        <div className={styles.compactCommerce}>
          <div className={styles.compactStatusPrice}>
            <StockPill state={resolved.inventory} />
            <PriceBlock price={product.price} />
          </div>
          <ActionLink href={product.customerPath} size="compact">
            View product
          </ActionLink>
        </div>
      </CardShell>
    );
  }

  if (props.variant === "relation") {
    const relationship = validatedRelationship(props.relationship);

    return (
      <CardShell
        actionCeiling={1}
        className={classes(
          "horizontal-product-card",
          "product-commerce-card-relation",
          styles.relationCard,
          className,
        )}
        component="ProductCommerceCard.Relation"
        commerceState={commerceState}
        interactionMode={reviewInteractionMode}
        label={`${product.name} ${relationship.type} relationship`}
        posture="relation"
        interactionState={interactionState}
        variant="relation"
      >
        <ProductMediaChamber className="horizontal-media" context="relation" media={product.media} />
        <div className={classes("horizontal-content", styles.relationContent)}>
          <header className={styles.relationshipLead}>
            <span>{relationshipLabels[relationship.type]}</span>
            <p data-source-coordinate={relationship.reason.sourceCoordinate}>
              {relationship.reason.claim}
            </p>
          </header>
          <ProductIdentity headingLevel={headingLevel} product={product} />
          <SourceBackedFacts facts={relationship.differences} />
          <EvidenceTrust signal={relationship.evidence} />
          {props.showPrice ? <PriceBlock price={product.price} /> : null}
          <div className={styles.singleAction}>
            <ActionLink href={relationship.action.href}>{relationship.action.label}</ActionLink>
          </div>
        </div>
      </CardShell>
    );
  }

  if (props.variant === "featured") {
    const posture: ProductCardPosture = props.posture;
    const signal = props.evidenceTrustSignal ?? product.evidenceTrustSignal;
    const resolved = presentationState(product, interactionState, commerceState, inventory, signal?.state);
    const benefits = boundedBenefitClaims(props.benefitClaims ?? product.benefitClaims ?? [], 2);
    const quantity = props.posture === "transactional" ? (props.quantity ?? 1) : null;

    return (
      <CardShell
        actionCeiling={2}
        className={classes(
          "product-commerce-card",
          "product-commerce-card-featured",
          styles.featuredCard,
          className,
        )}
        component="ProductCommerceCard.featured"
        commerceState={commerceState}
        interactionMode={reviewInteractionMode}
        label={`${product.name} featured ${posture} presentation`}
        posture={posture}
        interactionState={interactionState}
        variant="featured"
      >
        <div className="product-commerce-card-inner">
          <ProductMediaChamber context="featured" media={product.media} />
          <div className={classes("product-content-plane", styles.contentPlane)}>
            <ProductIdentity
              headingLevel={headingLevel}
              product={product}
              status={(
                <FixtureStatusStack
                  evidence={resolved.evidence}
                  inventory={resolved.inventory}
                  product={product}
                />
              )}
            />
            <MetricRail product={product} />
            <BenefitClaims claims={benefits} />
            {props.posture === "transactional" ? (
              <div className="purchase-row">
                <PriceBlock price={product.price} />
                <QuantityStepper
                  unavailable={commerceState !== "available" || resolved.inventory !== "in-stock"}
                  value={quantity ?? 1}
                />
              </div>
            ) : (
              <div className={styles.priceOnly}>
                <PriceBlock price={product.price} />
              </div>
            )}
            <div className={styles.actionRow}>
              {props.posture === "transactional" ? (
                <ActionButton
                  aria-disabled={reviewInteractionMode === "inert" || undefined}
                  disabled={commerceState === "error" || commerceState === "unavailable" || resolved.inventory !== "in-stock"}
                  pending={commerceState === "loading"}
                  pendingLabel="Loading…"
                >
                  {resolved.primaryLabel}
                </ActionButton>
              ) : (
                <ActionLink href={product.customerPath}>View product</ActionLink>
              )}
              <EvidenceDestination signal={signal} />
            </div>
          </div>
        </div>
      </CardShell>
    );
  }

  const signal = props.evidenceTrustSignal ?? product.evidenceTrustSignal;
  const resolved = presentationState(product, interactionState, commerceState, inventory, signal?.state);
  const facts = boundedFacts(props.facts ?? product.considerationFacts ?? [], 2);

  return (
    <CardShell
      actionCeiling={2}
      className={classes(
        "product-commerce-card",
        "product-commerce-card-vertical",
        styles.verticalCard,
        className,
      )}
      component="ProductCommerceCard.vertical"
      commerceState={commerceState}
      interactionMode={reviewInteractionMode}
      label={`${product.name} vertical consideration presentation`}
      posture="destination"
      interactionState={interactionState}
      variant="vertical"
    >
      <div className="product-commerce-card-inner">
        <ProductMediaChamber className={styles.verticalMedia} context="card" media={product.media} />
        <div className={classes("product-content-plane", styles.contentPlane)}>
          <ProductIdentity
            headingLevel={headingLevel}
            product={product}
            status={(
              <FixtureStatusStack
                evidence={resolved.evidence}
                inventory={resolved.inventory}
                product={product}
              />
            )}
          />
          <MetricRail product={product} />
          <SourceBackedFacts facts={facts} />
          <div className={styles.verticalCommerce}>
            <PriceBlock price={product.price} />
            <div className={styles.actionRow}>
              <ActionLink href={product.customerPath}>View product</ActionLink>
              <EvidenceDestination signal={signal} />
            </div>
          </div>
        </div>
      </div>
    </CardShell>
  );
}
