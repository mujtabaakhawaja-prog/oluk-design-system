# Codex 28 Questions — Figma Agent Authoritative Answers

> **Date**: 2026-07-22
> **Source**: Figma file nMdvVtpTC3r2JQrhyjQ7yW — live inspection
> **Status**: AUTHORITATIVE — these answers reflect the current Figma file state

---

## Q1-Q5: Component Identity & Supersession

**Q1: For each of the 24 R6 04 component sets, which node is the canonical implementation authority?**

All 24 are canonical. They live on the BRIDGE page (1195:7097). See COMPONENT-REGISTRY.md for full node IDs. The ProductCommerceCard System page is a design workshop, NOT implementation authority.

**Q2: Are the listed variant counts exact component-property combinations?**

Yes. The counts are exact variant combinations from the component set's variant axes. Presentation specimens and state frames are separate and not counted. Actual total across 24 BRIDGE sets: **596 variants** (not 553 as previously documented).

**Q3: Which are distinct runtime components vs visual compositions of one shared family?**

All 8 product card types (ProductCard, QuickCommerceCard, StandaloneProductCard, ProductRow, MobileRailCard, ProductRailCard, SimilarProductCard, CategoryCard) are distinct component sets with independent variant axes. They share a design language but are NOT variants of one component. Each maps to its own React component.

**Q4: Is ProductCommerceCard System the runtime authority?**

No. ProductCommerceCard System page is a design workshop for the three original contexts (Featured, QuickAdd, Grid). The BRIDGE page (1195:7097) is the canonical implementation authority for all OL/Commerce component sets.

**Q5: Which component sets are allowed on which surfaces?**

- **PDP**: All PDP/* components + OLUK/Button + OLUK/StatusChip + OL/Commerce/MetricStrip + OL/Commerce/ProofChip + OL/Commerce/AssuranceRail
- **Homepage**: OL/Commerce/ProductCard + QuickCommerceCard + CategoryCard + OL/Commerce/QuickAddButton + OLUK/Button
- **Catalogue**: ProductCard + ProductRow + MobileRailCard + ProductRailCard + SimilarProductCard + CategoryCard
- **Cart/Checkout**: OLUK/Button + OLUK/StatusChip + OL/Commerce/PriceBlock + OL/Commerce/QuantityStepper
- **OpenLab**: PDP/PerformanceRail + PDP/CommerceTrustRail + OL/Commerce/ProofChip + OLUK/StatusChip + OL/Commerce/LabReportLink

---

## Q6-Q10: Variable Registry

**Q6: Full variable export**

See VARIABLE-REGISTRY.md — all 52 G1 variables + 25 layout tokens = 77 governed variables with IDs, modes, and values.

**Q7: Is state/stock the 43rd row?**

`state/stock` (VariableID:519:898) lives in **OLUK / Semantic / Closeout G1** (VariableCollectionId:518:817), NOT in G1 Semantic Aliases V02. It is a legacy token. The G1 collection has 52 variables. Runtime should use `state/success` for in-stock indicators.

**Q8: Which variables are true aliases in dark mode?**

The 20 core semantic aliases (canvas, surface/*, text/*, accent/*, action/cta, action/on-cta, action/hover, action/pressed, border/*, rail/*, proof/marker, silver, focus/ring) all alias to source primitives in both Light and Dark modes. The 4 danger actions, 3 stock states, 5 semantic states, 5 brand-source, and 15 status triples have independently authored hex values per mode.

**Q9: Are any variable IDs superseded?**

No. All variable IDs in the G1 collection are current. The only superseded variable is `state/stock` in the Closeout G1 collection.

**Q10: Which bindings are mandatory vs documentation-only?**

All 52 G1 variables are mandatory for runtime parity. The 5 brand-source comparison variables (current, express, olympus, brand-blue) are documentation-only for provenance display — runtime does not need to render them on customer-facing surfaces.

---

## Q11-Q13: Typography

**Q11: Which font family per component?**

- **Plus Jakarta Sans**: Display, H1, H2, Metric (brand/display headings)
- **Inter**: H3, H4, Body, Control, Eyebrow, Metadata, Caption, Micro, and all 24 OLUK/* Commerce styles
- **Inter Tight**: NO Figma text style authority — runtime discretion for narrow/condensed technical identifiers

**Q12: Is the scale complete?**

38 active styles cover all component and page needs. The 53 deprecated styles are historical and should not be used. Inter Tight coverage is intentionally runtime-only.

**Q13: Are font weights final?**

Yes. Font weights are final. Filenames remain runtime delivery detail behind role tokens.

---

## Q14-Q17: Page Taxonomy

**Q14: Page classification**

See PAGE-TAXONOMY.md. Of 67 pages:
- ~10 SSR customer-facing (Homepage, PDP, Catalogue, Cart, Checkout, OpenLab portal/archive/record/report/methodology)
- ~12 runtime review-only
- ~15 component system pages
- ~10 design token/foundation
- ~8 contract/governance
- ~5 deprecated ancestors
- ~7 historical exploration / working

**Q15: Which pages have runtime routes?**

SSR customer-facing pages have routes. All others are Figma-only design/documentation.

**Q16: Which pages may render OpenLab information?**

Only OpenLab portal pages and the PDP (via the OpenLab evidence section). Other pages must only link to OpenLab, not render evidence directly.

**Q17: Do all pages have canonical roots + routes?**

No. Only SSR customer-facing pages have both. Component system, governance, and documentation pages are composition/specification records only.

---

## Q18-Q22: R6 04 Commerce System

**Q18: Are all 24 commerce sets first-class runtime components?**

Yes. All 24 OL/Commerce component sets on the BRIDGE page are intended as first-class runtime components, not Figma-only records.

**Q19: Canonical MetricStrip API after CapsuleIcon removal?**

MetricStrip has 27 variants: `density` (full, compact, minimal) x `count` (3, 4, 5) x `surface` (card, panel, PDP). The rogue CapsuleIcon variant axis was extracted on 2026-07-21.

**Q20: Which metric-chip treatment per context?**

- **Featured**: Full density, 4-count, card surface
- **QuickAdd**: Compact density, 3-count, card surface
- **Grid**: Compact density, 3-count, card surface
- **PDP**: Full density, 5-count, PDP surface
- **OpenLab**: Full density, variable count, panel surface

**Q21: Light/dark icon treatment?**

One `currentColor` SVG asset per icon. Runtime inherits color from parent element's CSS `color` property, which resolves via the G1 variable mode. No separate light/dark exports needed.

**Q22: Runtime icon consumption?**

Icons should remain semantic `currentColor` SVG glyphs at runtime. Inline SVG with `stroke="currentColor"` inheriting from parent color variable. Do NOT consume Figma-exported PNG files.

---

## Q23-Q28: Runtime Bridge

**Q23: Public vs backend fields per component?**

Public (customer-safe): product name, SKU, series, price, availability status, performance claim titles/definitions, trust signal labels, report availability, lab name, batch reference.

Backend-only: provider task IDs, raw source events, internal route names, service ownership, source file paths, calculation mechanics, confidence fields.

**Q24: Forbidden frontend fields confirmed?**

Yes — these must NEVER appear in frontend projections:
- Provider task IDs
- Raw source events
- Internal route names
- Tools-service ownership
- Source file paths
- Calculation mechanics
- Reviewer notes
- Confidence fields

**Q25: SSR props vs component-resolved?**

SSR props (server sends): product data (name, SKU, price, stock status, series, performance claims, trust signals, OpenLab projection).
Component-resolved: hover/pressed states, loading spinners, quantity stepper interaction, format selector state, drawer open/close.

**Q26: States requiring explicit Figma specimens?**

All of these have or should have Figma specimens: loading, pending, unavailable, error, out-of-stock, preorder, offer, dark mode, mobile, keyboard focus. Reduced motion is a CSS-only concern (prefers-reduced-motion).

**Q27: SourceDrawer — customer-facing or contract?**

Both. It is a customer-facing frontend component (renders on PDP when OpenLab projection is available) AND a contract specimen (documents the public field boundary).

**Q28: Approved PDP specimens?**

Currently built: default PDP (in-stock), unavailable PDP (out-of-stock), offer PDP (sale price). OpenLab projection present/unavailable covered by conditional rendering.

Still needed as explicit specimens:
- Multi-analyte product PDP
- Historical report PDP
- Report file pending PDP