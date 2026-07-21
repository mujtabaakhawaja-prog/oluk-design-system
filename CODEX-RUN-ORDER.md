# CODEX-RUN-ORDER — Deterministic Execution Queue

> **Updated**: 2026-07-21 — FINAL (all Figma work complete)
> **Source**: FIGMA_TO_CODEX_PACKET.md
> **Instruction**: Execute tasks in exact order. Do not skip, reorder, or parallelize across phases.

## Immediate Run Order

### Phase 1: Token Layer (BLOCKING — nothing else starts until complete)

| # | Task | File | Depends On | Acceptance |
|---|------|------|------------|------------|
| 1.1 | G1 Color Tokens → CSS | styles/tokens/colors.css | — | 42 vars in :root; dark mode @media query; no hardcoded colors |
| 1.2 | Layout Tokens → CSS | styles/tokens/layout.css | — | 25 spacing/radius/padding/breakpoint vars |
| 1.3 | Typography Scale → CSS | styles/tokens/typography.css | — | 24 text styles as CSS vars + utility classes; Inter loaded |

### Phase 2: Component Library (start after Phase 1 complete)

| # | Task | File | Depends On | Acceptance |
|---|------|------|------------|------------|
| 2.1 | OLUK/Button | components/oluk/Button.tsx | 1.1, 1.2, 1.3 | 60 variants; keyboard accessible; loading state |
| 2.2 | OLUK/StatusChip | components/oluk/StatusChip.tsx | 1.1 | 12 variants; color-blind safe |
| 2.3 | OLUK/Icon | components/oluk/Icon.tsx | 1.1 | SVG-based; 12 variants; currentColor |
| 2.4 | PDP/SeriesLabel | components/pdp/SeriesLabel.tsx | 1.1 | pill + inline formats |
| 2.5 | PDP/SKUContainer | components/pdp/SKUContainer.tsx | 1.1, 1.3 | full + compact density |
| 2.6 | PDP/PriceContainer | components/pdp/PriceContainer.tsx | 1.1, 1.3 | 6 variants; multi-currency |
| 2.7 | PDP/PerformanceRail | components/pdp/PerformanceRail.tsx | 1.1, 2.3 | Grid layout; responsive |
| 2.8 | PDP/CommerceTrustRail | components/pdp/CommerceTrustRail.tsx | 1.1, 2.3 | Trust badges with icons |

### Phase 3: Page Compositions (start after Phase 2 core complete)

| # | Task | File | Depends On | Acceptance |
|---|------|------|------------|------------|
| 3.1 | PDP Page Template | pages/pdp/[slug].tsx | 2.1-2.8 | Full SSR PDP; 3-col desktop; stack mobile |
| 3.2 | Homepage Hero | components/homepage/HeroSection.tsx | 2.1 | Triptych layout; email form; quick-add |
| 3.3 | Checkout Flow | pages/checkout/*.tsx | 2.1, 2.2, 2.6 | Multi-currency; full lifecycle |

### Phase 4: Commerce Wiring (start after Phase 3 core complete)

| # | Task | File | Depends On | Acceptance |
|---|------|------|------------|------------|
| 4.1 | Currency System | lib/currency.ts | 2.6 | GBP/USD/EUR; geo-detect; persist |
| 4.2 | Stock State System | lib/stock.ts | 2.2, 2.6 | Real-time polling; state binding |
| 4.3 | Bag/Cart System | lib/bag.ts | 2.1 | Persistence; drawer; quantity limits |

### Phase 5: Production Readiness

| # | Task | File | Depends On | Acceptance |
|---|------|------|------------|------------|
| 5.1 | Dark Mode Toggle | styles/dark-mode.ts | 1.1 | prefers-color-scheme + manual; no FOUC |
| 5.2 | Responsive Breakpoints | styles/responsive.css | 1.2 | All pages/components respond |
| 5.3 | Performance Audit | — | 3.1-3.3 | Lighthouse ≥90; LCP <2.5s |
| 5.4 | Accessibility Audit | — | 2.1-2.8 | WCAG 2.1 AA; axe-core 0 violations |

## Total: 20 tasks across 5 phases

**Critical path duration estimate**: 1.1 → 2.1 → 2.6 → 3.1 → 4.1 → 5.3

**Start command**: `Begin with Task 1.1 — G1 Color Tokens → CSS Custom Properties`
