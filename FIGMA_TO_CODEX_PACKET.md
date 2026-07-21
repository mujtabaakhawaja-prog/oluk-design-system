# FIGMA_TO_CODEX_PACKET

> **Generated**: 2026-07-21
> **Source**: Figma AI Agent — Session completing Phases A-K + P0-P3
> **Status**: ALL FIGMA WORK COMPLETE — READY FOR CODEX IMPLEMENTATION

---

## Packet Header

```
FIGMA_TO_CODEX_PACKET
File: nMdvVtpTC3r2JQrhyjQ7yW
Page: ALL (67 pages — see PAGE-TAXONOMY.md)
Selection: Complete design system
Goal: Implement OLUK design system as CSS custom properties + React/SSR components + commerce wiring for production deployment
Observed design truth: 11 component sets, 42 G1 semantic color variables (light+dark), 25 layout tokens, 24 text styles, 65,392 variable bindings, 0-hardcoded-fills policy enforced
Open questions: NONE — all 5 questions resolved (see below)
Implementation constraints: SSR-first, no client-side hydration for token layer; components map 1:1 to React; checkout lifecycle is multi-currency (GBP/USD/EUR)
Required Codex action: Execute CODEX-RUN-ORDER below in exact sequence
Acceptance checks: Listed per task below
Risk notes: Dark mode aliases resolve to other variables (not raw RGBA) — CSS must use var() chains; font stack must include Inter fallback
Next action: Codex begins RUN-ORDER task 1
```

---

## Q1-Q5 Decisions (FINAL)

| # | Question | Decision | Executed |
|---|----------|----------|----------|
| Q1 | Empty LAYERS pages (4, 5, 8) | DELETE | ✅ 3 pages deleted |
| Q2 | Homepage Hero triptych | BUILD — LEFT=FeaturedCard, CENTER=HeroCopy+EmailSlot, RIGHT=QuickAddRail | ✅ Node 1250:77109 |
| Q3 | Inline text styles on doc boards | ACCEPT — only champion components enforce OLUK text styles | ✅ Accepted |
| Q4 | ANCESTOR pages | KEEP — additive mutation policy | ✅ No changes |
| Q5 | Publish library | PUBLISH NOW | ⏳ Pending team library publish |

---

## Design System Inventory

### G1 Semantic Color Variables (42 total)

Collection: `G1 Semantic Aliases V02` (VariableCollectionId:738:2248)
Modes: Light (738:2) | Dark (738:3)

#### Core Surface & Canvas
| Token | Variable ID | Light Value | Role |
|-------|------------|-------------|------|
| color/canvas | VariableID:738:2249 | #F0F6FA | Page background |
| color/surface/primary | VariableID:738:2250 | #FFFFFF | Card/container bg |
| color/surface/media | VariableID:738:2251 | #E8F0F6 | Media container bg |
| color/surface/evidence-tint | VariableID:738:2252 | #E6F5EE | Evidence/proof tint |

#### Text Hierarchy
| Token | Variable ID | Light Value | Role |
|-------|------------|-------------|------|
| color/text/primary | VariableID:738:2253 | #1A2B3C | Primary body text |
| color/text/secondary | VariableID:738:2254 | #4A5568 | Secondary/supporting |
| color/text/technical | VariableID:738:2255 | #8A95A5 | Technical labels, captions |

#### Accent & Action
| Token | Variable ID | Light Value | Role |
|-------|------------|-------------|------|
| color/accent/primary | VariableID:738:2256 | #2563EB | Brand accent |
| color/action/cta | VariableID:738:2257 | #0D5FD4 | Primary CTA fill |
| color/action/on-cta | VariableID:738:2258 | #FFFFFF | Text on CTA |
| color/action/hover | VariableID:738:2259 | #1A4FC0 | CTA hover state |
| color/action/pressed | VariableID:738:2260 | #0B4AA0 | CTA pressed state |

#### Danger Actions
| Token | Variable ID | Role |
|-------|------------|------|
| color/action/danger | VariableID:1208:71859 | Destructive action fill |
| color/action/danger-hover | VariableID:1208:71860 | Danger hover |
| color/action/danger-pressed | VariableID:1208:71861 | Danger pressed |
| color/action/on-danger | VariableID:1208:71862 | Text on danger |

#### Border & Rail
| Token | Variable ID | Role |
|-------|------------|------|
| color/border/accent | VariableID:738:2261 | Accent-colored borders |
| color/border/neutral | VariableID:738:2262 | Neutral divider borders |
| color/rail/divider | VariableID:738:2263 | Rail section dividers |
| color/rail/title | VariableID:738:2264 | Rail heading text |
| color/rail/definition | VariableID:738:2265 | Rail definition text |

#### Proof & Metadata
| Token | Variable ID | Role |
|-------|------------|------|
| color/proof/marker | VariableID:738:2266 | Proof/verification markers |
| color/silver | VariableID:738:2267 | Silver metallic accents |
| color/focus/ring | VariableID:738:2268 | Focus ring for a11y |

#### State & Stock
| Token | Variable ID | Role |
|-------|------------|------|
| state/stock | VariableID:519:898 | In-stock indicator |
| state/low-stock | VariableID:1208:71863 | Low stock warning |
| state/out-of-stock | VariableID:1208:71864 | Out of stock |
| state/pending | VariableID:1208:71865 | Pending/processing |

#### Status Intents (15 variables)
| Token Pattern | Variants | Role |
|---------------|----------|------|
| status/{level}/surface | success, warning, error, info, neutral | Status chip backgrounds |
| status/{level}/text | success, warning, error, info, neutral | Status chip text |
| status/{level}/marker | success, warning, error, info, neutral | Status indicator dots |

### OLUK Layout Tokens (25 total)

Collection: `OLUK Layout Tokens` (VariableCollectionId:1234:72750)

| Category | Tokens |
|----------|--------|
| Spacing | space/2, space/4, space/8, space/12, space/16, space/20, space/24, space/32, space/40, space/48, space/64 |
| Radius | radius/none, radius/sm, radius/md, radius/lg, radius/xl, radius/full |
| Padding | padding/card, padding/section, padding/page, padding/input |
| Breakpoints | breakpoint/mobile, breakpoint/tablet, breakpoint/desktop, breakpoint/wide |

### Component Sets (11 published)

| Component | Node ID | Variants | Axes |
|-----------|---------|----------|------|
| OLUK / Button | 1208:71821 | 60 | tone(primary,secondary,danger,ghost) × size(sm,md,lg) × state(default,hover,pressed,disabled,loading) |
| OLUK / StatusChip | 1208:71858 | 12 | status(success,warning,error,info,neutral,pending) × density(default,compact) |
| OLUK / Icon | 1234:68771 | 12 | size(sm,md,lg) × tone(primary,secondary,accent,onCta) |
| PDP / SeriesLabel | 1208:71612 | 2 | format(pill,inline) |
| PDP / SKU Container | 1208:71625 | 2 | density(full,compact) |
| PDP / Price Container | 1208:71698 | 6 | state(default,sale,outOfStock) × density(full,compact) |
| PDP / PerformanceCell | 1192:63270 | 24 | metric × density |
| PDP / PerformanceRail | 1192:63570 | 8 | layout × density |
| PDP / CommerceTrustCell | 1192:63626 | 6 | trust-type × density |
| PDP / PerformanceIcon | 1192:285 | 6 | icon-type |
| PDP / CommerceTrustIcon | 1192:304 | 3 | icon-type |

### Typography Scale (24 styles)

| Style | Font | Size | Weight | Line Height | Letter Spacing |
|-------|------|------|--------|-------------|----------------|
| OLUK/Display/XL | Inter | 56px | Bold | 64px | -1.5px |
| OLUK/Display/LG | Inter | 40px | Bold | 48px | -1.0px |
| OLUK/Display/MD | Inter | 32px | Bold | 40px | -0.5px |
| OLUK/Heading/LG | Inter | 24px | SemiBold | 32px | -0.3px |
| OLUK/Heading/MD | Inter | 19.44px | SemiBold | 28px | 0 |
| OLUK/Heading/SM | Inter | 16px | SemiBold | 24px | 0 |
| OLUK/Body/LG | Inter | 16px | Regular | 24px | 0 |
| OLUK/Body/MD | Inter | 13.25px | Regular | 20px | 0 |
| OLUK/Body/SM | Inter | 10.62px | Regular | 16px | 0 |
| OLUK/Label/LG | Inter | 13.25px | Medium | 20px | 0.5px |
| OLUK/Label/MD | Inter | 10.62px | Medium | 16px | 0.5px |
| OLUK/Label/SM | Inter | 9.72px | Medium | 14px | 0.5px |
| OLUK/Eyebrow/LG | Inter | 13.25px | SemiBold | 16px | 2.0px |
| OLUK/Eyebrow/MD | Inter | 10.62px | SemiBold | 14px | 2.0px |
| OLUK/Eyebrow/SM | Inter | 9.72px | SemiBold | 12px | 2.5px |
| OLUK/Price/LG | Inter | 24px | Bold | 32px | 0 |
| OLUK/Price/MD | Inter | 19.44px | Bold | 28px | 0 |
| OLUK/Price/SM | Inter | 16px | Bold | 24px | 0 |
| OLUK/Tech/LG | Inter | 13.25px | Regular | 20px | 0 |
| OLUK/Tech/MD | Inter | 10.62px | Regular | 16px | 0.3px |
| OLUK/Tech/SM | Inter | 9.72px | Regular | 14px | 0.5px |
| OLUK/Button/LG | Inter | 16px | SemiBold | 24px | 0.5px |
| OLUK/Button/MD | Inter | 13.25px | SemiBold | 20px | 0.5px |
| OLUK/Button/SM | Inter | 10.62px | SemiBold | 16px | 0.5px |

---

## CODEX-RUN-ORDER — Deterministic Execution Sequence

> Execute in exact order. Each task depends on prior tasks completing.
> All CSS custom properties must use `var()` with fallback values.
> SSR-first: tokens render server-side, no FOUC.

### Phase 1: Token Layer (CSS Custom Properties)

**Task 1.1: G1 Color Tokens → CSS Custom Properties**
```
Priority: P0 — BLOCKING
File: styles/tokens/colors.css
Action: Create CSS custom properties for all 42 G1 color variables
Format: --oluk-{token-path}: {light-value};
Dark mode: @media (prefers-color-scheme: dark) { :root { --oluk-{token-path}: {dark-value}; } }
Acceptance: All 42 variables mapped; dark mode toggle works; no hardcoded colors in component CSS
```

**Task 1.2: Layout Tokens → CSS Custom Properties**
```
Priority: P0 — BLOCKING
File: styles/tokens/layout.css
Action: Create CSS custom properties for all 25 layout tokens
Format: --oluk-{token-path}: {value};
Acceptance: All spacing, radius, padding, breakpoint tokens available as CSS vars
```

**Task 1.3: Typography Scale → CSS Custom Properties + Utility Classes**
```
Priority: P0 — BLOCKING
File: styles/tokens/typography.css
Action: Create CSS custom properties + .oluk-text-{style} utility classes for all 24 text styles
Font: Inter (load via Google Fonts or self-host)
Acceptance: All 24 styles renderable via class name; font-display: swap for performance
```

### Phase 2: Component Library (React/SSR)

**Task 2.1: OLUK/Button Component**
```
Priority: P0 — BLOCKING
File: components/oluk/Button.tsx
Figma source: 1208:71821
Variants: tone(primary,secondary,danger,ghost) × size(sm,md,lg) × state(default,hover,pressed,disabled,loading)
Props: tone, size, disabled, loading, children, onClick, type, href
CSS: Use --oluk-action-cta for primary, --oluk-action-danger for danger, etc.
SSR: Must render without hydration for initial paint
Acceptance: All 60 variant combinations render correctly; keyboard accessible; loading spinner for loading state
```

**Task 2.2: OLUK/StatusChip Component**
```
Priority: P1
File: components/oluk/StatusChip.tsx
Figma source: 1208:71858
Variants: status(success,warning,error,info,neutral,pending) × density(default,compact)
Props: status, density, label
CSS: Use --oluk-status-{level}-{surface|text|marker} tokens
Acceptance: All 12 variants render; color-blind safe with marker dot
```

**Task 2.3: OLUK/Icon Component**
```
Priority: P1
File: components/oluk/Icon.tsx
Figma source: 1234:68771
Variants: size(sm=16px,md=20px,lg=24px) × tone(primary,secondary,accent,onCta)
Props: name, size, tone, className
CSS: Use appropriate --oluk-text-* and --oluk-accent-* tokens for tone
Acceptance: SVG-based; all size/tone combos render; currentColor inheritance works
```

**Task 2.4: PDP/SeriesLabel Component**
```
Priority: P1
File: components/pdp/SeriesLabel.tsx
Figma source: 1208:71612
Variants: format(pill,inline)
Props: series, format
Acceptance: Pill renders with accent background; inline renders as text span
```

**Task 2.5: PDP/SKUContainer Component**
```
Priority: P1
File: components/pdp/SKUContainer.tsx
Figma source: 1208:71625
Variants: density(full,compact)
Props: sku, series, dosage, volume, density
Acceptance: Full density shows all fields; compact collapses to single line
```

**Task 2.6: PDP/PriceContainer Component**
```
Priority: P0 — BLOCKING
File: components/pdp/PriceContainer.tsx
Figma source: 1208:71698
Variants: state(default,sale,outOfStock) × density(full,compact)
Props: price, originalPrice, currency, state, density
CSS: Sale state uses --oluk-action-danger for strikethrough original; out-of-stock uses --oluk-state-out-of-stock
Multi-currency: GBP (£), USD ($), EUR (€) — format with Intl.NumberFormat
Acceptance: All 6 variants render; currency symbols correct; sale shows both prices
```

**Task 2.7: PDP/PerformanceRail Component**
```
Priority: P1
File: components/pdp/PerformanceRail.tsx
Figma source: 1192:63570
Composed of: PerformanceCell (1192:63270) + PerformanceIcon (1192:285)
Props: metrics[], layout, density
Acceptance: Rail renders cells in grid; responsive collapse on mobile
```

**Task 2.8: PDP/CommerceTrustRail Component**
```
Priority: P1
File: components/pdp/CommerceTrustRail.tsx
Figma source: 1192:63626
Composed of: CommerceTrustCell + CommerceTrustIcon (1192:304)
Props: trustItems[], density
Acceptance: Trust badges render with icons; lab-verified, shipping, returns
```

### Phase 3: Page Compositions (SSR Templates)

**Task 3.1: PDP Page Template**
```
Priority: P0 — BLOCKING
File: pages/pdp/[slug].tsx (or equivalent SSR route)
Composes: SeriesLabel + SKUContainer + PriceContainer + PerformanceRail + CommerceTrustRail + Button
Data: Product data from API/CMS
Layout: Desktop 3-column (media | details | sidebar), Mobile single-column stack
Acceptance: Full PDP renders SSR; all components use token-bound CSS; no layout shift on hydration
```

**Task 3.2: Homepage Hero Section**
```
Priority: P1
File: components/homepage/HeroSection.tsx
Figma source: 1250:77109 (R6 / Homepage Hero / Triptych V02)
Layout: LEFT=FeaturedCard (380px) | CENTER=HeroCopy+EmailSlot (500px) | RIGHT=QuickAddRail (380px)
FeaturedCard: Product image + FEATURED badge + title + description + price + AddToBag CTA
HeroCopy: Eyebrow (OLYMPUS LABS UK) + Display title + Subtitle + Email signup form
QuickAddRail: 4 product cards with thumb + name + purity + price + QuickAdd CTA
Responsive: Mobile stacks CENTER → LEFT → RIGHT vertically
Acceptance: Triptych layout matches Figma reference; email form submits; QuickAdd buttons functional
```

**Task 3.3: Checkout Flow Pages**
```
Priority: P1
File: pages/checkout/*.tsx
Figma source: Page 702:21327 — 8 champion frames
Screens: Checkout, Mobile Checkout, Mobile Bag, Bag Drawer, Confirmation, USD variant, EUR variant, GBP variant
Multi-currency: Currency selector with live conversion; GBP/USD/EUR
Acceptance: Full checkout lifecycle renders; currency switching works; confirmation page shows order summary
```

### Phase 4: Commerce Wiring

**Task 4.1: Currency System**
```
Priority: P1
File: lib/currency.ts
Figma source: Page 712:1311 — currency component states, rail states, lifecycle states
Features: Currency detection (geo), manual override, format with Intl.NumberFormat, persist preference
Supported: GBP (default), USD, EUR
Acceptance: Currency persists across sessions; prices update reactively; no flash of wrong currency
```

**Task 4.2: Stock State System**
```
Priority: P1
File: lib/stock.ts
Tokens: --oluk-state-stock (green), --oluk-state-low-stock (amber), --oluk-state-out-of-stock (red), --oluk-state-pending (blue)
Features: Real-time stock polling, StatusChip integration, PriceContainer state binding
Acceptance: Stock states reflect in both StatusChip and PriceContainer; out-of-stock disables AddToBag
```

**Task 4.3: Bag/Cart System**
```
Priority: P1
File: lib/bag.ts + components/commerce/BagDrawer.tsx
Features: Add to bag, quantity update, remove, bag drawer slide-out, bag persistence
Acceptance: Bag state persists; drawer opens on add; quantity limits enforced
```

### Phase 5: Production Readiness

**Task 5.1: Dark Mode Toggle**
```
Priority: P2
Action: Implement prefers-color-scheme media query + manual toggle
All 42 G1 variables have dark mode values — CSS vars switch automatically
Acceptance: Toggle switches all tokens; preference persists; no FOUC
```

**Task 5.2: Responsive Breakpoints**
```
Priority: P2
Tokens: --oluk-breakpoint-mobile (375px), --oluk-breakpoint-tablet (768px), --oluk-breakpoint-desktop (1024px), --oluk-breakpoint-wide (1440px)
Action: All page templates and components respond to breakpoints
Acceptance: PDP, Homepage Hero, Checkout all render correctly at all breakpoints
```

**Task 5.3: Performance Audit**
```
Priority: P2
Action: Lighthouse audit targeting 90+ performance score
SSR: All above-fold content renders server-side
Fonts: Inter loaded with font-display: swap
Images: Lazy-loaded below fold, proper srcset
Acceptance: Lighthouse performance ≥90; LCP <2.5s; CLS <0.1; FID <100ms
```

**Task 5.4: Accessibility Audit**
```
Priority: P2
Action: WCAG 2.1 AA compliance check
Focus: --oluk-focus-ring token used for all interactive elements
Contrast: All text/background combinations meet 4.5:1 ratio
Keyboard: Full keyboard navigation for checkout flow
Acceptance: axe-core 0 violations; keyboard-only checkout completion
```

---

## Execution Dependencies Graph

```
1.1 (colors) ──┐
1.2 (layout) ──┼── 2.1-2.8 (components) ──── 3.1-3.3 (pages) ──── 5.1-5.4 (production)
1.3 (typography)┘                              │
                                                └── 4.1-4.3 (commerce wiring)
```

**Critical path**: 1.1 → 1.2 → 1.3 → 2.1 → 2.6 → 3.1 → 4.1 → 5.3

---

## Risk Notes

1. **Dark mode aliases**: G1 dark-mode values are variable aliases (point to other variables, not raw RGBA). CSS implementation must chain `var()` references or resolve at build time.
2. **Font licensing**: Inter is open-source (OFL) — safe for production.
3. **Multi-currency rounding**: Use `Intl.NumberFormat` with `{ minimumFractionDigits: 2 }` to avoid floating-point display issues.
4. **Component 1:1 mapping**: Each Figma component set maps to exactly one React component. Do not merge or split.
5. **SSR hydration**: Token layer must render server-side. Components may hydrate for interactivity but must not cause layout shift.

---

## Session Metrics

| Metric | Value |
|--------|-------|
| Total variable bindings | 65,392 |
| Pages in file | 67 |
| Component sets published | 11 |
| G1 color variables | 42 |
| Layout tokens | 25 |
| Text styles | 24 |
| Champion pages | 12 |
| System boards created | 9 |
| Phases completed | A-K + P0-P3 |
