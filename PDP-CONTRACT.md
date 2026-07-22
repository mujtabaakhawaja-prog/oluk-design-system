# [CONTRACT] PACKETS 01-10 — EXECUTED ADDITIVELY

> **Updated**: 2026-07-22
> **Status**: FIGMA COMPLETE — PENDING RUNTIME CONFIRMATION

PDP Commerce Design System -> Runtime Bridge
Figma governs anatomy, typography, variable bindings, states, responsive behavior, accessibility intent, and runtime props. Shopper SSR remains authority for customer-safe product, price, availability, and evidence projections. No browser component fetches Woo, tools-service, or provider sources directly.

## RUNTIME COMPONENT REGISTRY

| # | Component | Variants | Notes |
|---|---|---|---|
| 01 | PerformanceIcon | 6 variants | variable-bound |
| 02 | CommerceTrustIcon | 3 variants | variable-bound |
| 03 | SeriesLabel | pill/inline | + seriesName |
| 04 | SKU Container | full/compact | + text props |
| 05 | Price Container | 3 states x 2 densities | + commerce props |
| 06 | PerformanceCell/Rail | 24 cells + 8 rail | variable-bound |
| 07 | CommerceTrustCell | 6 variants | variable-bound |
| 08 | OLUK/Button | 60 variants | tone x size x state |
| 09 | Semantic StatusChip | 12 variants | status x density |
| 10 | Bridge | this governed contract | |

## FIGMA -> REACT MAPPING

| Figma Component | React Component |
|---|---|
| PDP / PerformanceIcon | `<PerformanceIcon />` |
| PDP / CommerceTrustIcon | `<CommerceTrustIcon />` |
| PDP / SeriesLabel | `<SeriesLabel />` |
| PDP / SKU Container | `<SKUContainer />` |
| PDP / Price Container | `<PriceContainer />` |
| PDP / PerformanceCell | `<PerformanceCell />` |
| PDP / PerformanceRail | `<PerformanceRail />` |
| PDP / CommerceTrustCell | `<CommerceTrustCell />` |
| OLUK / Button | `<Button />` |
| OLUK / StatusChip / Semantic V02 | `<StatusChip />` |
| OLUK / Input | `<Input />` |
| OLUK / SourceDrawer / FE V02 | `<SourceDrawer />` |

## TOKEN AUTHORITY

- Collection: OLUK / TrustEvidenceSpine / G1 Semantic Aliases V02
- Modes: Light 738:2 / Dark 738:3
- Variables: 52 color (G1) + 25 layout = 77 total governed
- Adoption token: color/brand/blue = #0057FF Light / #4D7FFF Dark
- state/stock (VariableID:519:898) is in Closeout G1 — legacy, replaced by state/success

## TYPOGRAPHY AND FONT DELIVERY

- Display: Plus Jakarta Sans Variable -> headings/brand display
- Interface: Inter Variable -> navigation, controls, commerce, evidence
- Condensed: Inter Tight Variable -> narrow identifiers (runtime discretion, no Figma style authority)
- All three include upright + italic WOFF2. OFL preserved.
- 38 active text styles (14 G1/Type + 24 Commerce). 53 deprecated.

## BOARD SEPARATION LAW

- [FE] Customer-visible product cards, grids, drawers, controls, chips, icons, responsive states, and production copy. No routes, provider IDs, source events, or implementation labels.
- [BE] Runtime ownership, routes, state machines, mutation law, service topology.
- [CONTRACT] Props, tokens, typography roles, responsive rules, accessibility, telemetry, source-drawer public fields.

## SOURCE DRAWER PUBLIC CONTRACT

Public fields: reportId, labName, batchCode, compoundName, testedAt, verificationStatus, reportUrl.
SSR compiles and signs the projection. FE renders it and may link to a verified report.
Forbidden in FE: provider task IDs, raw source events, internal route names, calculation mechanics, service ownership, local paths, and claim derivation.

## ACCESSIBILITY AND MOTION

Buttons and inputs use focus-visible treatment. Interactive targets >= 44x44. Status meaning never color-only: dot + text/icon. Decorative glyphs aria-hidden. Async updates use aria-live=polite. Motion 150ms, respects prefers-reduced-motion.

## TELEMETRY CONTRACT

- bot_view: component/surface impression
- bot_rec: product recommendation exposure/action
- bot_add: Add to bag from ProductCard, QuickAddRail, FeaturedCard, or PDP
- bot_csat_click: feedback action

All events include client_ts and coupon/offer parameters. No PII or provider/source IDs.

## PROMOTION GATE

Design complete in Figma staging. No production deployment performed. Required next gate: runtime implementation review -> visual SSR captures Light/Dark x desktop/mobile -> lint/build/typecheck -> human approval -> library/runtime promotion.