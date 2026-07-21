# OLUK R6 — Codex Deterministic Execution Order

> Priority-ordered task queue. Each task is atomic and can be executed by a Codex agent independently.  
> Tasks are grouped into **Priority Tiers** (P0 = blocking, P1 = high, P2 = medium, P3 = low).  
> Within each tier, tasks are numbered sequentially and MUST be executed in order.

---

## P0 — BLOCKING: Foundation Completeness

These tasks must complete before any P1+ work begins. They ensure the design system foundation is complete and all tokens are published.

### P0-01: LAYERS 3 G1 Token Binding — MAJESTIC System Frames

**Page:** LAYERS 3 (1238:29765)  
**Scope:** 127 frames — all hardcoded color fills must be replaced with G1 Semantic Aliases V02 variables  
**Method:** Batch `evaluate_script` using the `matchFillVar` heuristic from Phase F  
**Variable Collection:** VariableCollectionId:738:2248 (Light mode: 738:2, Dark mode: 738:3)  
**Acceptance:** 0 hardcoded fills remaining (decorative/gradient fills excluded with documented exceptions)

**Sub-tasks (execute sequentially):**

```
P0-01a: Bind MAJESTIC system overview frames (1238:29939 through 1238:30444) — 11 frames
         Targets: System Brand Overview, Source Doctrine, Page Families, Component Families,
         Do+Don't, Coverage Index, Component Reference, Commerce+Checkout, Stress Test,
         Unified Toolchain Architecture

P0-01b: Bind MAJESTIC primitive component frames (1238:30543 through 1238:31090) — 6 frames
         Targets: MajesticSkeleton, MajesticEmptyError, MajesticTransactionRail,
         MajesticCurrencyRail, PurchasePanel, MobilePDPLayout, MajesticBasketRail

P0-01c: Bind Purchase Panel + Bag frames (1238:31551 through 1238:31942) — 9 frames
         Targets: PurchasePanel Desktop Light/Dark, Bag Desktop Light/Dark,
         Bag Mobile Light/Dark, BasketRail Desktop/Mobile, BasketLineItem States

P0-01d: Bind OrderSummary + Checkout shell frames (1238:32080 through 1238:32503) — 15 frames
         Targets: OrderSummaryRail Variants, CheckoutShell Info/Delivery/Review/Payment/Success/
         Pending/Failed, Mobile Checkout 6 screens, MAJESTIC Checkout Lifecycle

P0-01e: Bind commerce journey + proof frames (1238:32657 through 1238:33430) — 8 frames
         Targets: Mobile Bag, Responsive Breakpoints, Proof Cockpit, Cart State System,
         Engine Layer Handoff, Commerce Narrative Graph, Checkout Lifecycle Graph,
         Mobile Cart Dense, CryoGlass Pass 78

P0-01f: Bind CryoGlass high-fidelity frames (1238:33645 through 1238:34166) — 4 frames
         Targets: CryoGlass Pass 80/86/88, Best-of-N V02 section

P0-01g: Bind checkout lifecycle corrected V02 section (1238:34932) — 1 large section
         Target: R6 CHECKOUT LIFECYCLE SHELL — CORRECTED V02

P0-01h: Bind proofboards checkout section (1238:36211) — 1 large section
         Target: R6/Proofboards/Checkout Lifecycle Rail/V02

P0-01i: Bind champion component + state intelligence frames (1238:40635 through 1238:40646) — 12 frames
         Targets: champion-component-inventory, champion-runtime-field-mapping,
         state-intelligence-matrix, state-intelligence-microcopy, reference images,
         r6-currency-component-states

P0-01j: Bind production checkout + bag V1 frames (1238:40727 through 1238:41508) — 12 frames
         Targets: r6-bag-drawer-production, r6-checkout-review-production,
         r6-secure-payment, r6-order-confirmation, r6-checkout-states-board,
         r6-m-bag, r6-m-checkout-review, r6-m-confirmation, r6-handoff-spec

P0-01k: Bind V2 + champion checkout frames (1238:41784 through 1238:43233) — 18 frames
         Targets: r6-codex-amendment-packet, r6-bag-drawer-v2, r6-checkout-review-v2,
         r6-m-checkout-v2, r6-m-payment-v2, r6-m-confirm-v2, r6-currency-rail-states-v2,
         r6-secure-payment-v2, r6-confirmation-v2, lockup studies A/B,
         r6-checkout-champion, r6-m-checkout-champion, r6-m-bag-champion,
         r6-bag-drawer-champion, r6-confirmation-champion

P0-01l: Bind currency + commerce lifecycle frames (1238:43297 through 1238:43929) — 10 frames
         Targets: r6-checkout-usd/eur/gbp-native, r6-mobile-checkout-usd/eur/gbp,
         r6-currency-lifecycle-states, r6-currency-journey-proofboard

P0-01m: Bind trust + payment + account frames (1238:44038 through 1238:44651) — 8 frames
         Targets: r6-trust-rail-variants, r6-payment-processing, r6-order-tracking,
         r6-returns-request, r6-order-history, r6-invoice-receipt, r6-write-review,
         r6-openlab-portal-home, r6-evidenceos-dashboard

P0-01n: Bind catalogue + account + utility pages (1238:44768 through 1238:46108) — 10 frames
         Targets: r6-research-library, r6-product-catalogue, r6-rewards-dashboard,
         r6-compound-comparison, r6-account-settings, r6-search-results,
         r6-wishlist, r6-dosage-calculator, r6-clinical-trials, r6-referral-program,
         r6-address-book, r6-payment-methods, r6-notification-prefs

P0-01o: Bind commerce + content pages (1238:46280 through 1238:47574) — 12 frames
         Targets: r6-bundle-builder, r6-quality-certificates, r6-community-forum,
         r6-lab-reports, r6-protocol-builder, r6-safety-data, r6-help-center,
         r6-shipping-policy, r6-contact-us, r6-subscriptions, r6-blog-insights,
         r6-about-us, r6-refund-confirmation

P0-01p: Bind remaining pages + mobile + system cover (1238:47632 through 1238:48100) — 8 frames
         Targets: r6-order-detail, r6-404-error, r6-mobile-order-tracking,
         r6-mobile-catalogue, r6-mobile-openlab, r6-trust-icon-candidates,
         R6 Design System Cover

P0-01q: Bind Proof Cards + Rails frame (1238:29789) — 1 frame
         Target: MAJESTIC/10/Proof Cards + Rails
```

### P0-02: Lab Reports G1 Token Binding

**Page:** R6 Lab Reports (702:21328)  
**Scope:** 26 frames — OpenLab portal, Evidence OS, dossier templates, compare, batch lookup  
**Method:** Same `matchFillVar` heuristic  
**Acceptance:** 0 hardcoded fills remaining

```
P0-02a: Bind lab report + certificate frames (702:21329 through 702:22153) — 5 frames
P0-02b: Bind MAJESTIC OpenLab frames (799:3244 through 799:6390) — 16 frames
P0-02c: Bind RUN B OpenLab + Compare frames (799:6621 through 799:6838) — 5 frames
```

---

## P1 — HIGH: Champion Page Completion

These tasks build the authoritative champion screens using the now-complete token system.

### P1-01: Homepage Hero — FeaturedRail + QuickAddRail

**Page:** R6 Homepage Hero (702:15540) — currently empty  
**Dependencies:** ProductCommerceCard System (1185:4857), V02/Homepage (753:812)  
**Scope:**
- Create FeaturedRail section using FeaturedCard component instances
- Create QuickAddRail section using ProductCommerceCard instances
- Bind all fills to G1 tokens
- Reference V02/Homepage (753:812) for layout context

### P1-02: Checkout Champion Promotion

**Page:** R6 Checkout (702:21327) — currently empty  
**Source:** LAYERS 3 champion checkout frames (r6-checkout-champion 1238:42890, r6-m-checkout-champion 1238:43016, r6-m-bag-champion 1238:43096, r6-bag-drawer-champion 1238:43158, r6-confirmation-champion 1238:43233)  
**Scope:**
- Duplicate champion checkout frames from LAYERS 3 to R6 Checkout page
- Verify all G1 bindings (after P0-01k completes)
- Add checkout lifecycle state documentation

### P1-03: Trust & Currency System Build

**Page:** R6 TRUST AND CURRENCY (712:1311) — currently empty  
**Source:** LAYERS 3 currency frames (r6-currency-component-states 1238:40646, r6-currency-rail-states-v2 1238:42380, r6-currency-lifecycle-states 1238:43813, r6-currency-journey-proofboard 1238:43929, r6-trust-rail-variants 1238:44038)  
**Scope:**
- Duplicate currency system frames from LAYERS 3
- Build trust badge component set
- Create currency selector component with USD/EUR/GBP states
- Bind all to G1 tokens

### P1-04: Empty LAYERS Page Cleanup

**Pages:** LAYERS 1 (1238:4490), LAYERS 2 (1238:28562), LAYERS 4-6 (1238:48151/48289/48435), LAYERS 8 (1238:56802)  
**Scope:** All empty (0 children). Either:
- Archive with `[EMPTY — RESERVED]` prefix, OR
- Delete if confirmed non-essential by user review

---

## P2 — MEDIUM: New System Boards

These create the missing system documentation pages.

### P2-01: Handoff Spec Board

**Page:** R6 14 — Governance and Promotion (1:16) — add section  
**Scope:**
- Developer handoff specification template
- Component API documentation format
- Props → Figma property mapping guide
- Token → CSS custom property mapping
- Breakpoint behavior documentation

### P2-02: Motion + Interaction Board

**Target:** New section on R6 01 — Foundations (1:3)  
**Scope:**
- Transition duration tokens (fast: 150ms, normal: 250ms, slow: 400ms)
- Easing curves (ease-out for entrances, ease-in-out for state changes)
- Hover/focus/active state transition specs per component
- Loading skeleton animation spec
- Page transition patterns

### P2-03: Responsive Matrix Board

**Target:** R6 12 — Responsive States (1:14) — populate  
**Scope:**
- Breakpoint definitions (mobile: 390px, tablet: 768px, desktop: 1024px, wide: 1440px)
- Component responsive behavior matrix (which components change at which breakpoints)
- Layout shift documentation (sidebar collapse, grid column reduction, stack reflow)
- Typography scale responsive adjustments

### P2-04: Data Display Board

**Target:** New section on R6 05 — Evidence Components (1:7)  
**Scope:**
- PerformanceCell data formatting rules
- Metric value display patterns (rounding, units, thresholds)
- Chart/graph component specs (if applicable)
- Table layout patterns for evidence data
- Empty state / loading state / error state for data displays

### P2-05: Commerce Patterns Board

**Target:** R6 04 — Commerce Components (1:6) — extend  
**Scope:**
- Add-to-bag flow (button states, drawer open, confirmation)
- Price display patterns (sale, comparison, per-unit, bulk)
- Stock status display rules (in-stock, low-stock, out-of-stock, pre-order)
- Currency formatting patterns (USD/EUR/GBP)
- Shipping/delivery estimation display

### P2-06: Mobile Compaction Champion Strategy Board

**Target:** R6 12 — Responsive States (1:14) — extend  
**Scope:**
- Mobile-first component compaction rules
- Touch target minimum sizes (44×44px)
- Bottom sheet patterns for drawers/modals
- Mobile navigation patterns (hamburger, tab bar, back)
- Thumb-zone optimization documentation
- Density reduction rules for mobile components

---

## P3 — LOW: Polish + Governance

### P3-01: Full-File Hardcoded Fill Audit

**Scope:** Sweep ALL 70 pages for remaining hardcoded fills  
**Method:** `evaluate_script` walker across all pages  
**Acceptance:** Document all remaining hardcoded fills with justification (decorative, gradient, image)

### P3-02: Style Consistency Check

**Scope:** Verify all text nodes use OLUK text styles (not raw font assignments)  
**Method:** Compare each TEXT node's `textStyleId` against published style IDs  
**Acceptance:** Report of unbound text nodes per page

### P3-03: Component Promotion Verification

**Scope:** Verify all CHAMPION page components are published to library  
**Method:** Check `component.remote` and `componentSet.remote` flags  
**Acceptance:** All champion components show as published

### P3-04: Page Taxonomy Enforcement

**Scope:** Update page names/descriptions to include classification tags  
**Method:** Prefix or suffix pages with `[CHAMPION]`, `[ANCESTOR]`, `[SUPPLEMENTAL]` where not already clear  
**Acceptance:** Every page has clear classification

### P3-05: Dark Mode Completeness Audit

**Scope:** Verify all components have correct Dark mode variable values  
**Method:** Switch to Dark mode (738:3) and check each component set  
**Acceptance:** No visual regressions in Dark mode

### P3-06: Promotion Register Population

**Page:** R6 — Promotion Register (1:18) — currently empty  
**Scope:** Document the promotion pipeline: which components are promoted, when, and to where

### P3-07: Human Review Gallery Population  

**Page:** R6 — Human Review Gallery (33:2) — currently empty  
**Scope:** Populate with human review screenshots and decision annotations

### P3-08: Human Feedback Register Population

**Page:** R6 — Human Feedback Register (33:3) — currently empty  
**Scope:** Populate with structured feedback entries

---

## Execution Dependencies Graph

```
P0-01 (LAYERS 3 binding) ──┐
                            ├──► P1-02 (Checkout promotion — needs bound frames)
                            ├──► P1-03 (Trust & Currency — needs bound source)
                            └──► P3-01 (Full audit — needs all binding complete)

P0-02 (Lab Reports binding) ──► P3-01 (Full audit)

P1-01 (Homepage Hero) ── independent, can run in parallel with P0

P1-04 (Empty LAYERS cleanup) ── independent, can run anytime

P2-01..P2-06 (System boards) ── independent, can run in parallel

P3-01 (Full audit) ── depends on P0-01 + P0-02
P3-02..P3-08 ── can run in parallel after P0 completes
```

---

## Estimated Codex Agent Allocation

| Tier | Tasks | Est. Agent-Hours | Parallelizable |
|---|---|---|---|
| P0 | 2 tasks (19 sub-tasks) | 8-12 hours | Sub-tasks within P0-01 are sequential; P0-01 and P0-02 can run in parallel |
| P1 | 4 tasks | 4-6 hours | P1-01 parallel with P0; P1-02/P1-03 after P0; P1-04 anytime |
| P2 | 6 tasks | 3-4 hours | All parallel |
| P3 | 8 tasks | 4-6 hours | Most parallel after P0 |
| **Total** | **20 tasks** | **19-28 hours** | |
