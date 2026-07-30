> [!CAUTION]
> **SUPERSEDED — DO NOT RUN.** The active light identity build is
> `make-runs/light-identity-authority-v1/`. This file is preserved only as a
> historical receipt of the discarded card-first path.

# Olympus R6 — Product Card Creative Frontier

## Mission
Discover the strongest product card architecture for a pharmaceutical-grade supplement brand.
The card must communicate scientific authority through information density — not decoration.

## Product truth (do not invent)
- MK-2866 / Ostarine / 15 MG / 90 SERVINGS / >99% / SARM / Capsules / £43.00
- RAD-140 / 8 MG / 60 SERVINGS / SARM / Capsules
- MK-677 / Ibutamoren / 15 MG / 90 SERVINGS / >99% / GH Secretagogue / Capsules
- SERVINGS and CAPSULES are distinct concepts. Never combine them.
- Do not invent product names, claims, prices, or purity values.

## Visual constraints
- Light mode only
- Zero box-shadow on any UI surface
- Depth through hairline borders (1px, low opacity), whitespace, and ruled boundaries
- Brand cobalt #0057FF used only for: primary CTA fill, active/selected state, section eyebrows, featured card perimeter
- Default card border: 1px rgba(0,87,255,0.08) — cobalt at 8% opacity
- Featured/hover card border: 1px solid #0057FF
- Do not wash the card in blue or border every surface in cobalt
- White #FFFFFF is the only canvas color
- Elevation = hairline border only, never shadow
- Media chamber fill: radial gradient (white center → #F3F8FF mid → #DDEEFF edge)
- Studio render against neutral-to-cool chamber — bottle IS the color

## Card slot contract (immutable order)
1. ProductIdentityStack — compound name, alias, series. Always eyebrow position.
2. ProductMediaChamber — studio render container. White-to-ice-blue gradient fill.
3. ProductMetricRail — strength | qty | purity as a RULED RAIL (not chips, not tags).
4. PriceDisplay — Inter Semibold 18/22. SUBORDINATE to metrics. Metrics carry authority.
5. ProductCardAction — Add to Bag capsule CTA. Full-width cobalt.
6. ProductSpecificationRail — CLASS · FORM · FORMULATION · TESTING. Featured only.

Slots are included or excluded per context. Never reordered.

## Context envelopes
- Grid (≈225w): Identity → Media → MetricRail → Price → CTA. Compact.
- Featured (≈412w): All 6 slots. Staged media. Full specification rail.
- QuickAdd (≈176w): Identity → Media (condensed) → Price → CTA. Minimal.

## What's currently wrong
- MetricChips float loosely instead of forming a ruled rail
- Price dominates visually when it should be subordinate
- Media chamber proportions don't prove product scale
- Cards feel like generic e-commerce tiles, not pharmaceutical specimens
- No hierarchy difference between Grid/Featured/QuickAdd contexts
- The identity stack (eyebrow) lacks authority

## What's already right (proven on this page)
- CategoryFamilyRail cards: cobalt hairline border, NarrativeRail left, white card surfaces
- ProductCommerceCardFeatured: correct slot order, MetricRail as structured horizontal band
- OverlapIsland: minimal card skeleton proving the contract at smallest context
- Asymmetric Lab Records section: NarrativeRail + OperationalPanel split grammar

## Creative frontier
You are expected to surprise. Push beyond the current baseline.
Each direction should feel like it was designed by a different world-class creative director.
Differences must be architectural and compositional — not just color or spacing variations.
The CategoryFamilyRail cobalt-hairline language is the system grammar — product cards inherit it.
