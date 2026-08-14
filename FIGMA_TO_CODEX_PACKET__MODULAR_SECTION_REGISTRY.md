# FIGMA_TO_CODEX_PACKET — MODULAR SECTION REGISTRY
## Olympus Labs UK — Complete Route + Section + Module Architecture
### Date: 2026-08-13
### Authority: 4 Figma reference files + Final-Design workspace

---

## PREAMBLE — WHAT THIS DOCUMENT IS

This is the **complete modular section registry** for the Olympus Labs UK site. Every section is defined as:
- **What** it is (component identity, visual description)
- **Why** it exists (commerce function, trust function, conversion function)
- **Where** it mounts (which pages, which routes)
- **When** it appears (customer journey stage)
- **Who** owns its data (source authority)
- **How** it reuses (cross-page mounting pattern, modular insertion rules)

Every section MUST make sense standalone AND be modularly insertable across pages.

---

## IMMUTABLE CONSTRAINTS (carried forward)

```
- Checkout is static presentation-only — zero Woo, zero Stripe SDK, zero callbacks
- Commerce mutation: Browser -> Shopper SSR -> tools-service ONLY
- No local cart authority — cart/checkout/order state from tools-service projections only
- Evidence boundary: OpenLab data is source-owned. No invented lab claims
- Search is fail-closed — never substitute, never "did you mean"
- EvidenceOS Command Center (`/open-lab/admin`) is an owner-only, noindex Sites specimen; identity/authentication remains deferred
- Stripe iframe on payment step is visual shell only
- 4-state honesty: Verified Evidence / Source Reported / Source Only / Unavailable
- Zero Grey Rule: all neutrals blue-shifted per CONV-004
- Currency continuity: GBP display, USD processing, both shown Review+Payment+Confirmation
- Canonical namespace: /open-lab (NOT /openlab)
- Product truth: MK-2866 Ostarine, 15 MG, 90 SERVINGS, >99%, GBP43, SKU 80529-01
```

---

## I. SHARED SHELL & GLOBAL MODULES

These mount on EVERY route. They are not optional.

### MOD-SHELL-01: Governed Shared Shell (Header)
- **What**: Global navigation bar — logo, nav links, search trigger, bag icon w/ count, account icon, mode toggle
- **Why**: Persistent wayfinding, bag access, identity access
- **Where**: Every route, every page
- **When**: Always visible
- **Data owner**: Shell state from Shopper SSR; bag count from tools-service projection
- **Variants**: Light/Dark mode, 1440/1024/390 responsive
- **Figma source**: SharedShell instances across all 4 files (e.g. `00 / Governed Shared Shell / Light`)
- **Cross-page**: Universal — never removed, never customized per-page beyond mode

### MOD-SHELL-02: Footer
- **What**: Site footer — company info, nav columns, newsletter signup, social links, legal links, payment badge strip
- **Why**: SEO, trust, legal compliance, secondary navigation
- **Where**: Every route
- **When**: Always visible (bottom of every page)
- **Data owner**: Static content
- **Variants**: Light/Dark, responsive
- **Figma source**: `footer` frame in every page composition

### MOD-SHELL-03: Cart Drawer
- **What**: Slide-over drawer from right edge showing bag contents, line items, subtotal, checkout CTA
- **Why**: Micro-conversion — keeps user in context while reviewing bag
- **Where**: Overlays any page when bag icon clicked
- **When**: Post-add-to-bag interaction
- **Data owner**: tools-service bag projection
- **Figma source**: `r6-cart-drawer` (PDP file, 440x1440 drawer over shop-all)
- **Route**: No dedicated route — overlay on current page

### MOD-SHELL-04: Search Results
- **What**: Full search results page with query echo, filter bar, product grid, empty state
- **Why**: Product discovery, fail-closed (no substitution, no "did you mean")
- **Where**: `/search?q=`
- **When**: User-initiated search
- **Data owner**: tools-service search endpoint
- **Figma source**: `r6-search-results` (PDP file)
- **Constraint**: Fail-closed — returns empty state on no match, never substitutes

---

## II. HOMEPAGE (`/`)

### Route: `/` — Homepage
**Journey stage**: Awareness / Entry
**Function**: Brand introduction, product discovery, trust establishment, conversion funneling

#### Sections (top to bottom):

| Section ID | Name | What | Why (function) | Modular reuse | Data owner |
|---|---|---|---|---|---|
| HOME-01 | Flagship Hero | Full-bleed hero with headline, sub, primary CTA, product imagery | Entry conversion — immediate value prop | None (homepage-only) | Static + product catalog |
| HOME-02 | Primary Product Discovery | Product card grid or carousel — featured/bestseller products | Product discovery, revenue driver | Reusable as `UPSELL-GRID` on PDP, checkout, post-purchase | Product catalog via tools-service |
| HOME-03 | TrustEvidenceSpine | OpenLab evidence summary strip — purity %, batch count, methodology link | Trust establishment, evidence-first positioning | Reusable as `TRUST-STRIP` on PDP, shop, category | OpenLab source data |
| HOME-04 | Recent Batch Records | Latest OpenLab batch results — cards with compound, purity, date | Evidence freshness signal | Reusable on `/open-lab` portal, PDP | OpenLab source data |
| HOME-05 | Category Navigation | Visual category cards (White Series, etc.) with imagery | Discovery funneling by product line | None (homepage intent) | Product catalog |
| HOME-06 | Social Proof / Reviews | Customer testimonials or review highlights | Conversion trust | Reusable as `SOCIAL-PROOF-STRIP` on PDP, shop | Reviews source |
| HOME-07 | Newsletter / CTA Band | Email capture with incentive messaging | List building, retention | Reusable as `CTA-BAND` on any page pre-footer | Static |
| HOME-08 | Pre-Footer | About summary, value props, trust badges | Final trust reinforcement | Reusable on shop, category pages | Static |

**Figma sources**:
- `OPENLAB P2 / HOMEPAGE SUCCESSOR / Desktop / Light|Dark` (OPENLAB file) — 8 numbered sections
- Homepage page in Final-Design (764:50)

---

## III. SHOP & CATEGORY ROUTES

### Route: `/shop` — Shop All
**Journey stage**: Discovery / Browsing
**Function**: Full product catalog browsing

| Section ID | Name | What | Why | Modular reuse | Data owner |
|---|---|---|---|---|---|
| SHOP-01 | Shop Hero | Page title, breadcrumb, product count | Orientation | None | Static |
| SHOP-02 | Filter/Sort Toolbar | Category filters, sort dropdown, view toggle | Product narrowing | Shared with category pages | Static + catalog |
| SHOP-03 | Product Grid | Responsive product card grid | Product browsing, add-to-bag | Core commerce module — reused everywhere | Product catalog |

**Figma source**: `r6-shop-all` (PDP file), Shop page in Final-Design (765:50)
**Mobile**: `r6-mobile-shop-all` (PDP file)

### Route: `/shop/:category` — Category Page (e.g. `/shop/white-series`)
**Journey stage**: Discovery / Narrowing
**Function**: Category-scoped product browsing

| Section ID | Name | What | Why | Modular reuse | Data owner |
|---|---|---|---|---|---|
| CAT-01 | Category Hero | Category name, description, hero imagery | Category identity | None | Catalog |
| CAT-02 | Filter Toolbar | Active category filter, sub-filters, sort | Narrowing | Shared with shop | Catalog |
| CAT-03 | Product Grid | Category-filtered product cards | Browsing + conversion | Same as SHOP-03 | Catalog |

**Figma source**: `r6-category-white-series` (PDP file)
**Mobile**: `r6-mobile-category` (PDP file)

---

## IV. PRODUCT DETAIL PAGE (`/product/:slug`)

### Route: `/product/:slug` — PDP
**Journey stage**: Consideration / Decision
**Function**: Product deep-dive, evidence presentation, purchase conversion
**Figma sources**: PDP file (4 compound variants: MK-2866, MENT, RAD-140, MK-677), each at 1440/1024/390 x Light/Dark

#### Sections (top to bottom, from `r6-pdp-mk2866-complete`):

| Section ID | Name | What | Why | Modular reuse | Data owner |
|---|---|---|---|---|---|
| PDP-01 | Navigation Stack | Breadcrumb + back link | Wayfinding | None | Static |
| PDP-02 | Hero / Product Media + Purchase | Product image gallery + title + price + specs + quantity + Add to Bag CTA | Core conversion unit | None (PDP-only composition) | Product catalog |
| PDP-03 | OpenLab Evidence Strip | Inline purity %, batch verification link, evidence status chip | Trust at point of purchase | = HOME-03 `TRUST-STRIP` variant | OpenLab source |
| PDP-04 | Consolidated Assurance | Spec matrix — dosage, servings, purity, compound identity | Product truth | Standalone module `SPEC-MATRIX` | Product catalog |
| PDP-05 | Product Details / Tabs | Description, ingredients, usage, warnings in tabbed or accordion layout | Informed purchase decision | None | Product catalog |
| PDP-06 | Trust / Lab Verification | Full lab report panel — HPLC data, CoA link, batch lookup | Evidence depth | = `LAB-REPORT-PANEL` reusable on `/open-lab/records/:id` | OpenLab source |
| PDP-07 | Cross-Sell / Recommendations | "Frequently bought together" or "You may also like" product cards | AOV increase, discovery | = `RECOMMENDATION-RAIL` — reusable on bag, checkout, post-purchase | Product catalog + reco engine |
| PDP-08 | Reviews | Customer reviews section | Social proof at purchase point | = `SOCIAL-PROOF-STRIP` variant | Reviews source |
| PDP-09 | Pre-Footer | Value props, shipping info, guarantees | Final trust | = HOME-08 | Static |
| PDP-10 | Compound Dossier (OpenLab P2) | Deep compound info — molecular data, research summary, mechanism | Scientific trust, differentiation | = `COMPOUND-DOSSIER` section — reusable on `/open-lab/compounds/:slug` | OpenLab source |
| PDP-11 | Sticky Mobile CTA | Fixed bottom bar with price + Add to Bag on mobile | Mobile conversion | Mobile-only | Product catalog |

**Additional PDP integration components** (from OPENLAB file `PDP INTEGRATION — OpenLab Components`):
- `TrustStrip` — compact evidence summary (1171x125)
- `SpecMatrix` — dosage/purity/servings matrix (1171x409)
- `LabReportPanel` — full lab report with HPLC (1171x501)
- `pdp-compound-dossier` — compound science section (1440x396)
- `pdp-lab-verification` — verification chain inline (1440x706)

---

## V. CHECKOUT FLOW (`/checkout/*`)

### 14 Checkout Stages (from Commerce+Checkout file)
**Journey stage**: Purchase / Transaction
**Function**: Order completion — static presentation only
**Constraint**: ALL routes are static presentation-only. Zero Woo, zero Stripe SDK, zero callbacks. Commerce mutation: Browser -> Shopper SSR -> tools-service ONLY.

Each stage has 3 widths (1440/1024/390) x 2 modes (Light/Dark) = 6 variants in Figma.

| Route | Stage | What | Key sections | Data owner |
|---|---|---|---|---|
| `/bag` | Bag | Full bag review — line items, quantities, subtotal, promo code input | Line item list, promo input, subtotal, checkout CTA | tools-service bag projection |
| `/checkout/information` | Information | Email, name collection | Form fields, order summary sidebar | tools-service |
| `/checkout/delivery` | Delivery | Shipping address, delivery method selection | Address form, shipping options, cost display | tools-service |
| `/checkout/review` | Review | Full order review before payment — items, address, delivery, totals | Complete order summary, currency continuity (GBP + USD) | tools-service |
| `/checkout/payment` | Payment | Payment method selection | Payment method cards, Stripe iframe shell (visual only) | tools-service |
| `/checkout/payment-details` | Payment Details Open | Expanded payment form (card fields via iframe) | Stripe iframe visual shell, billing address | Visual shell only |
| `/checkout/processing` | Processing | Payment processing indicator | Spinner/progress, "do not close" messaging | tools-service status |
| `/checkout/confirmation` | Confirmation | Order confirmed | Order number, items summary, delivery estimate, currency continuity | tools-service order projection |
| `/checkout/tracking` | Tracking | Shipment tracking | Tracking number, carrier, status timeline | tools-service |
| `/account/orders` | Order History | Past orders list | Order cards with status, date, total | tools-service |
| `/account/orders/:id` | Order Details | Single order deep view | Full line items, statuses, tracking, addresses | tools-service |
| `/account/orders/:id/receipt` | Receipt | Printable receipt | Formatted receipt with all line items, totals, addresses | tools-service |
| `/account/orders/:id/return` | Return | Return initiation | Item selection, reason, return instructions | tools-service |
| `/account/orders/:id/refund` | Refund | Refund status | Refund amount, method, timeline | tools-service |

#### Checkout shared section: `CheckoutStepIndicator`
- **What**: Step progress bar (Bag > Info > Delivery > Review > Payment > Confirm)
- **Component**: `CheckoutStepIndicator` (1085:4511 in Final-Design)
- **Where**: Every checkout stage
- **Cross-page**: Checkout-universal

#### Checkout shared section: `UpsellContextRail`
- **What**: Collapsible side rail with product recommendations during checkout
- **Component**: `UpsellContextRail` (1082:4667 in Final-Design)
- **Where**: Information, Delivery, Review, Payment stages
- **Why**: AOV increase without interrupting checkout flow (Option E hybrid rail)
- **Cross-page**: Reusable as recommendation rail on any page

---

## VI. OPENLAB ROUTES (`/open-lab/*`)

### Route: `/open-lab` — OpenLab Portal / Landing
**Journey stage**: Trust / Research
**Function**: Entry point to evidence system

| Section ID | Name | What | Why | Modular reuse | Data owner |
|---|---|---|---|---|---|
| OL-01 | Portal Hero / Folded Panel | Full-width hero with evidence system introduction, search | Trust entry, evidence discoverability | None | Static |
| OL-02 | Choose the Way In | Navigation cards — by compound, by batch, by methodology | Discovery routing | None | Static |
| OL-03 | Evidence Workspace | Interactive evidence explorer — compound selector, purity charts | Deep evidence engagement | None (portal-only) | OpenLab source |
| OL-04 | What an OpenLab Record Contains | Explainer of record structure | User education | None | Static |
| OL-05 | Recent Batch Records | Latest batch cards | Freshness signal | = HOME-04, also on PDP | OpenLab source |
| OL-06 | Methodology Summary | Brief methodology explainer with link to full page | Trust depth | Summary reusable, links to OL-METH | Static |
| OL-07 | Source Chain Overview | Supply chain transparency summary | Trust depth | Summary reusable, links to OL-CHAIN | OpenLab source |

**Figma sources**:
- `OPENLAB P2 / PORTAL SUCCESSOR / Desktop / Light|Dark` (OPENLAB file) — 9 sections
- `OpenLab Portal` instances (OPENLAB file) — 1440/1024/390 x Light/Dark
- Portal variants in OPENLAB Content page

### Route: `/open-lab/records` — Lab Records Archive
**Journey stage**: Research / Verification
**Function**: Searchable, filterable lab records registry

| Section ID | Name | What | Why | Modular reuse | Data owner |
|---|---|---|---|---|---|
| LR-01 | Archive Header | Title, description, record count | Orientation | None | OpenLab source |
| LR-02 | Search + Filters | Search bar, filter chips (compound, date, status), filter bar | Record discovery | Standalone `REGISTRY-SEARCH` | OpenLab source |
| LR-03 | Source-State Legend | 4-state honesty legend (Verified/Source Reported/Source Only/Unavailable) | User education on evidence states | Standalone `STATE-LEGEND` | Static |
| LR-04 | Registry Table | Paginated table of lab records with status chips, actions | Evidence browsing | Core table component | OpenLab source |
| LR-05 | Empty/Error States | No results, loading skeleton, error, unavailable states | UX completeness | Reusable pattern | Static |

**Figma sources**:
- `OPENLAB P2 / LABREPORTS ARCHIVE / Desktop / Light` (OPENLAB file)
- `LAB RECORDS / Page-Local Component System` (OPENLAB file) — 22 component specs
- `R6 V02 / LAB RECORDS / FINAL REGISTRY` — 1440/1024/390 x Light/Dark (OPENLAB file)

**Component inventory** (from Lab Records page):
- `EvidenceStatus` (component set, 6 variants)
- `BindingState` (component set)
- `ReportAvailability` (component set)
- `RegistryRow` (component set with interaction states)
- `RegistryTableHeader`, `RegistryTable`, `RegistrySearch`, `RegistryFilter`
- `RegistryFilterBar`, `RegistryStateLegend`, `RegistryPagination`
- `RegistryLoadingRows`, `RegistryEmptyState`, `RegistryNoResultsState`, `RegistryErrorState`

### Route: `/open-lab/records/:id` — Branded Lab Record (Single Record View)
**Journey stage**: Verification / Deep Trust
**Function**: Individual lab record with full analytical data

| Section ID | Name | What | Why | Modular reuse | Data owner |
|---|---|---|---|---|---|
| BLR-01 | Record Header | Product name, batch ID, date, status chips | Record identity | None | OpenLab source |
| BLR-02 | Batch Report | Batch details — source, date, methodology | Provenance | None | OpenLab source |
| BLR-03 | Analytical Results | HPLC data, purity %, identity confirmation | Evidence core | = `LAB-REPORT-PANEL` on PDP | OpenLab source |
| BLR-04 | Verification Chain | Chain of custody — lab > transport > analysis > publication | Trust depth | Standalone `VERIFICATION-CHAIN` | OpenLab source |
| BLR-05 | CoA Viewer | Certificate of Analysis document viewer | Document evidence | Standalone `COA-VIEWER` | OpenLab source |
| BLR-06 | Related Records | Other batches of same compound | Discovery | Cross-link module | OpenLab source |

**Figma sources**:
- `Branded Lab Record` instances (OPENLAB file) — 1440/1024/390 x Light/Dark
- `OPENLAB P2 / PRODUCT RECORD SUCCESSOR` — 12 numbered sections (OPENLAB file)

### Route: `/open-lab/compounds/:slug` — Compound Dossier
**Journey stage**: Research / Education
**Function**: Deep compound science page

| Section ID | Name | What | Why | Modular reuse | Data owner |
|---|---|---|---|---|---|
| CD-01 | Compound Header | Compound name, category, key metrics | Identity | None | OpenLab source |
| CD-02 | Molecular Profile | Structure, weight, classification | Scientific context | None | OpenLab source |
| CD-03 | Purity History | Historical purity chart across batches | Evidence trend | Chart reusable in `EVIDENCE-CHARTS` | OpenLab source |
| CD-04 | Research Summary | Published research citations, mechanism of action | Scientific trust | None | OpenLab source |
| CD-05 | Batch History | All batches for this compound | Record access | Table reusable from `REGISTRY-TABLE` | OpenLab source |
| CD-06 | Related Compounds | Similar compounds for comparison | Discovery | Cross-link module | OpenLab source |

**Figma sources**:
- `OpenLab — MK-2866 Dossier` instances (OPENLAB file) — 5 compound dossiers in Commerce+Checkout
- `OPEN LAB — Product Dossiers` (OPENLAB Content page) — MK-2866, MENT variants
- `OPENLAB P2 / PDP SUCCESSOR` — compound integration sections (OPENLAB file)

### Route: `/open-lab/methodology` — Methodology
**Journey stage**: Trust / Transparency
**Function**: Testing methodology explainer

**Figma source**: `Methodology` instances (OPENLAB file) — 1440/1024/390 x Light/Dark
**Mobile**: `r6-mobile-methodology`, `r6-methodology` (OPENLAB Content page)

### Route: `/open-lab/source-chain` — Source Chain
**Journey stage**: Trust / Transparency
**Function**: Supply chain transparency page

**Figma source**: `Source Chain` instances (OPENLAB file) — 1440/1024/390 x Light/Dark
**Content frames**: `r6-supply-chain` (OPENLAB Content page)

### Route: `/open-lab/batch-lookup` — Batch Lookup
**Journey stage**: Verification
**Function**: Customer-facing batch number lookup tool (fail-closed)

**Figma source**: `Batch Lookup` instances (OPENLAB file) — 1440/1024/390 x Light/Dark
**Constraint**: Fail-closed — returns no match on no match, never substitutes

### Route: `/open-lab/compare` — Compound/Batch Compare
**Journey stage**: Research / Decision
**Function**: Side-by-side comparison of compounds or batches

**Figma sources**:
- `OpenLab Compare` instances (OPENLAB file)
- `r6-batch-comparison`, `r6-product-compare` (OPENLAB/PDP Content pages)
- `r6-mobile-batch-compare`, `r6-m-product-compare`

### Route: `/open-lab/evidence` — Evidence Charts Dashboard
**Journey stage**: Research / Trust
**Function**: Aggregated evidence visualizations — purity trends, compound profiles

**Figma source**: `Evidence Charts` instances (OPENLAB file) — 1440/1024/390 x Light/Dark
**Content**: `r6-purity-trends` (OPENLAB Content page)

### Route: `/open-lab/coa/:id` — CoA Viewer
**Journey stage**: Verification
**Function**: Individual Certificate of Analysis document viewer

**Figma source**: `r6-coa-viewer`, `r6-mobile-coa-viewer` (OPENLAB Evidence page)

### Route: `/open-lab/route-study` — Route Study
**Journey stage**: Internal / Research
**Function**: OpenLab route architecture study

**Figma source**: `OpenLab Route Study` instances (OPENLAB file)

### Route: `/open-lab/admin` — EvidenceOS Command Center
**Journey stage**: Admin / Internal
**Function**: Evidence management dashboard — batch intake, report management, publication controls
**Constraint**: AUTH GATED — not a public route

**Figma source**: `EvidenceOS` instances (OPENLAB file) — 1440/1024/390 x Light/Dark (massive: 5571px tall desktop)

---

## VII. CONTENT & EDITORIAL ROUTES

### Route: `/open-lab/compound-guide` — Compound Guide
**Figma**: `r6-compound-guide` (OPENLAB Content) — 1440x2141
**Mobile**: `r6-mobile-compound-guide`
**Function**: Educational compound overview for customers

### Route: `/open-lab/stack-builder` — Stack Builder
**Figma**: `r6-stack-builder` (OPENLAB Content) — 1440x1554
**Mobile**: `r6-mobile-stack-builder`
**Function**: Interactive compound stacking tool

### Route: `/open-lab/dosing-calculator` — Dosing Calculator
**Figma**: `r6-dosing-calculator` (OPENLAB Content) — sidebar + content layout
**Mobile**: `r6-m-dosing-calc`
**Function**: Dosing guidance tool

### Route: `/open-lab/cycle-planner` — Cycle Planner
**Figma**: `r6-cycle-planner` (OPENLAB Content) — sidebar + content layout
**Mobile**: `r6-m-cycle-planner`
**Function**: Cycle planning tool

### Route: `/open-lab/interaction-checker` — Interaction Checker
**Figma**: `r6-interaction-checker` (OPENLAB Content) — 1440x1302
**Mobile**: `r6-m-interaction-checker`
**Function**: Compound interaction safety checker

### Route: `/open-lab/research-papers` — Research Papers
**Figma**: `r6-research-papers` (OPENLAB Content) — 1440x1256
**Mobile**: `r6-m-research-papers`
**Function**: Curated research paper archive

### Route: `/open-lab/case-studies` — Case Studies
**Figma**: `r6-case-studies` (OPENLAB Content) — sidebar layout
**Mobile**: `r6-m-case-studies`
**Function**: User/research case studies

### Route: `/open-lab/glossary` — Glossary
**Figma**: `r6-glossary` (OPENLAB Content) — 1440x1881 + `r6-glossary-terms` (sidebar variant)
**Mobile**: `r6-m-glossary-terms`
**Function**: Terminology reference

### Route: `/open-lab/lab-partner` — Lab Partner Program
**Figma**: `r6-lab-partner` (OPENLAB Content) — 1440x1271
**Mobile**: `r6-m-lab-partner`
**Function**: Lab partnership information and onboarding

### Route: `/blog` — Blog / Journal
**Figma**: `r6-blog-journal` (PDP file) — 1440x2548
**Function**: Brand editorial content

### Route: `/about` — About
**Figma**: `r6-about` (PDP file) — 1440x2718
**Function**: Brand story, team, mission

### Route: `/shipping-returns` — Shipping & Returns
**Figma**: `r6-shipping-returns` (PDP file) — 1440x2941
**Function**: Shipping policy, returns process

### Route: `/faq` — FAQ / Help Centre
**Figma**: `r6-faq-help-centre` (PDP file) — 1440x1792
**Function**: Customer support, organized by category

### Route: `/contact` — Contact
**Figma**: `r6-contact` (PDP file) — 1440x2070
**Function**: Contact form, support channels

### Route: `/legal` — Legal Hub
**Figma**: `r6-legal-hub` (PDP file) — 1440x1409
**Function**: Legal documents index (terms, privacy, cookies)

---

## VIII. ACCOUNT ROUTES (`/account/*`)

All from Commerce+Growth file (Users page). Each has desktop + mobile variant.

| Route | Frame name | Function | Key sections |
|---|---|---|---|
| `/account` | r6-account-dashboard | Account overview | Overview cards, recent orders, quick actions |
| `/account/subscriptions` | r6-subscriptions | Subscription management | Active subs, skip/pause/cancel, next delivery |
| `/account/wishlist` | r6-wishlist | Saved products | Product card grid, add-to-bag from wishlist |
| `/account/orders/:id/confirmation` | r6-order-confirmation | Order confirmation (post-checkout) | Order summary, delivery estimate, next steps |
| `/account/notifications` | notification-prefs | Notification preferences | Channel toggles, frequency settings |
| `/account/addresses` | address-book | Address management | Address cards, add/edit/delete, default selection |
| `/account/payment-methods` | payment-methods | Saved payment methods | Card list, add new, set default |
| `/account/orders/:id/tracking` | order-tracking | Package tracking | Tracking timeline, carrier info, delivery map |
| `/account/returns` | returns-status | Returns status | Return requests, status timeline, refund status |
| `/account/security` | security-centre | Security settings | Password change, 2FA, login history |
| `/account/research-profile` | research-profile | OpenLab research profile | Saved compounds, viewed records, research preferences |
| `/account/gdpr` | gdpr-portal | GDPR / Privacy portal | Data export, deletion request, consent management |
| `/account/subscriptions/portal` | subscription-portal | Subscription management portal | Deep subscription management |
| `/account/affiliate` | affiliate-dashboard | Affiliate/ambassador dashboard | Referral links, earnings, tier progress |

**Figma source**: Commerce+Growth file, Users page — 28 frames total (14 desktop + ~11 mobile + 3 additional states)

---

## IX. COMMERCE GROWTH MODULES (Cross-page insertable)

These are modular sections from Commerce+Growth (Instances page) designed for cross-page insertion.

### Commerce Instances (19 frames):

| Module ID | Frame name | Function | Mounts on | Journey stage |
|---|---|---|---|---|
| GROWTH-01 | loyalty | Loyalty program section — points, tier, rewards | Homepage, Account, Post-purchase | Retention |
| GROWTH-02 | referral | Referral program — share link, rewards, track referrals | Account, Post-purchase, Homepage | Advocacy |
| GROWTH-03 | wholesale | Wholesale inquiry / bulk pricing | Shop, PDP (high-quantity) | B2B conversion |
| GROWTH-04 | international | International shipping info & currency | Checkout, Shipping page | Purchase confidence |
| GROWTH-05 | bundle-builder | Interactive bundle builder — select compounds, see savings | PDP, Shop, Homepage | AOV increase |
| GROWTH-06 | gift-cards | Gift card purchase & redemption | Shop, Checkout, Account | Revenue + Acquisition |
| GROWTH-07 | quick-reorder | One-click reorder from past purchases | Account, Homepage (returning), Post-purchase | Retention |
| GROWTH-08 | ar-viewer | AR product viewer (3D product visualization) | PDP | Engagement |
| GROWTH-09 | recommendations | ML-powered product recommendations | PDP, Homepage, Checkout, Post-purchase | Discovery + AOV |
| GROWTH-10 | smart-restock | Predictive restock reminders based on usage | Account, Homepage (returning), Email | Retention |

### Growth Strategy Components (from Commerce+Growth Strategies page, P0-P3):

| Component | Variants | Function | Mounts on |
|---|---|---|---|
| Promotion Card | 6 variants | Sale/promo display | Homepage, Shop, PDP, Category |
| Bundle Builder | 4 variants | Bundle configuration | PDP, Shop, dedicated `/bundles` |
| Incentive Engine Card | 6 card types | Gamified incentive display | Account, Homepage, Post-purchase |
| Ambassador Programme | 4 tiers (Bronze/Silver/Gold/Platinum) | Ambassador tier display | Account, dedicated `/ambassador` |
| Social Proof Cards | 4 types | Social proof widgets | PDP, Homepage, Shop |
| Exit-Intent Offer | 4 modal variants | Exit-intent conversion rescue | Overlay on any page |
| Subscription Upgrade | Upgrade offer cards | Sub tier upgrade prompts | Account, PDP |
| Streak Bonuses | Streak/seasonal multiplier display | Gamification engagement | Account, Homepage |

---

## X. OPENLAB CUSTOMER JOURNEY FLOW

From Commerce+Growth (Customer Journey page) — 7 desktop + 3 mobile flow frames:

These define the **sequential experience** of a customer moving through the OpenLab evidence system:

1. **Discovery** — Landing/Portal entry, evidence overview
2. **Exploration** — Browse records, filter by compound
3. **Deep Dive** — Individual record, analytical results, CoA
4. **Comparison** — Compare compounds/batches side-by-side
5. **Verification** — Batch lookup, source chain tracing
6. **Integration** — Evidence context on PDP during purchase
7. **Post-Purchase** — Record access from order, saved to research profile

---

## XI. MODULAR SECTION CROSS-REFERENCE MATRIX

Sections that mount on multiple pages (the "connective tissue"):

| Module | Homepage | PDP | Shop/Cat | Checkout | OpenLab | Account | Post-Purchase |
|---|---|---|---|---|---|---|---|
| `TRUST-STRIP` (TrustEvidenceSpine) | HOME-03 | PDP-03 | Header variant | -- | OL landing | -- | -- |
| `RECOMMENDATION-RAIL` | HOME-02 variant | PDP-07 | -- | UpsellContextRail | -- | GROWTH-07 | Confirmation |
| `SOCIAL-PROOF-STRIP` | HOME-06 | PDP-08 | Shop variant | -- | -- | -- | -- |
| `CTA-BAND` (Newsletter/Promo) | HOME-07 | Pre-footer | Pre-footer | -- | Pre-footer | -- | Post-purchase CTA |
| `SPEC-MATRIX` | -- | PDP-04 | -- | Line item detail | Dossier | -- | Order detail |
| `LAB-REPORT-PANEL` | -- | PDP-06 | -- | -- | BLR-03 | Research profile | -- |
| `COMPOUND-DOSSIER` | -- | PDP-10 | -- | -- | CD-01..06 | -- | -- |
| `VERIFICATION-CHAIN` | -- | PDP variant | -- | -- | BLR-04 | -- | -- |
| `BUNDLE-BUILDER` | Feature section | PDP upsell | Shop feature | -- | -- | Quick reorder | -- |
| `PROMOTION-CARD` | Hero/feature | PDP badge | Shop grid | Checkout promo | -- | Account offers | -- |
| `PRODUCT-CARD` (grid item) | HOME-02 | PDP-07 | SHOP-03 | Bag line items | -- | Wishlist, Orders | Confirmation |
| `EXIT-INTENT-OFFER` | Overlay | Overlay | Overlay | -- | -- | -- | -- |
| `LOYALTY-DISPLAY` | Feature band | -- | -- | Points earned | -- | GROWTH-01 | Points summary |

---

## XII. COMPLETE ROUTE LEDGER (Updated)

Total physical routes from all 4 reference files:

### Core Commerce (7 routes)
```
/                           Homepage
/shop                       Shop All
/shop/:category             Category (White Series, etc.)
/product/:slug              PDP
/search                     Search Results
/bundles                    Bundle Builder (dedicated)
/gift-cards                 Gift Cards
```

### Checkout Flow (8 routes)
```
/bag                        Bag
/checkout/information       Information
/checkout/delivery          Delivery
/checkout/review            Review
/checkout/payment           Payment
/checkout/payment-details   Payment Details
/checkout/processing        Processing
/checkout/confirmation      Confirmation
```

### Account (16 routes)
```
/account                    Dashboard
/account/subscriptions      Subscriptions
/account/subscriptions/portal  Subscription Portal
/account/wishlist           Wishlist
/account/orders             Order History
/account/orders/:id         Order Details
/account/orders/:id/receipt Receipt
/account/orders/:id/return  Return
/account/orders/:id/refund  Refund
/account/orders/:id/tracking  Tracking
/account/orders/:id/confirmation  Order Confirmation
/account/notifications      Notification Preferences
/account/addresses          Address Book
/account/payment-methods    Payment Methods
/account/security           Security Centre
/account/affiliate          Affiliate Dashboard
/account/research-profile   Research Profile
/account/gdpr               GDPR Portal
```

### OpenLab (16 routes)
```
/open-lab                   Portal Landing
/open-lab/records           Lab Records Archive
/open-lab/records/:id       Branded Lab Record
/open-lab/compounds/:slug   Compound Dossier (5 compounds)
/open-lab/methodology       Methodology
/open-lab/source-chain      Source Chain
/open-lab/batch-lookup      Batch Lookup
/open-lab/compare           Compare
/open-lab/evidence          Evidence Charts
/open-lab/coa/:id           CoA Viewer
/open-lab/compound-guide    Compound Guide
/open-lab/stack-builder     Stack Builder
/open-lab/dosing-calculator Dosing Calculator
/open-lab/cycle-planner     Cycle Planner
/open-lab/interaction-checker  Interaction Checker
/open-lab/research-papers   Research Papers
/open-lab/case-studies      Case Studies
/open-lab/glossary          Glossary
/open-lab/lab-partner       Lab Partner Program
/open-lab/admin             EvidenceOS Command Center [AUTH GATED]
```

### Content & Support (6 routes)
```
/blog                       Blog / Journal
/about                      About
/shipping-returns           Shipping & Returns
/faq                        FAQ / Help Centre
/contact                    Contact
/legal                      Legal Hub
```

### Commerce Growth (dedicated routes, 4)
```
/loyalty                    Loyalty Program
/referral                   Referral Program
/wholesale                  Wholesale Inquiry
/ambassador                 Ambassador Programme
```

### TOTAL: ~57 physical routes (some with dynamic segments producing more views)

---

## XIII. COMPONENT DEPENDENCY MAP

Components from Final-Design (Page 09) and their cross-route usage:

| Component | Asset ID | Used on routes |
|---|---|---|
| CobaltDivider | 1010:27053 | Universal section separator |
| MediaChamber | 1022:4099 | PDP hero, OpenLab dossier, product cards |
| CobaltDensityBoundary | 1026:27046 | Content sections, spacing control |
| RecommendationCard | 1082:4465 | PDP, Homepage, Checkout rail, Post-purchase |
| RestockCard | 1082:4564 | Account, Homepage (returning users) |
| UpsellContextRail | 1082:4667 | Checkout stages (Option E rail) |
| EvidenceStatusChip | 1085:4390 | Lab Records, PDP, OpenLab portal |
| CheckoutStepIndicator | 1085:4511 | All checkout stages |

---

## XIV. ACCEPTANCE CHECKS FOR CODEX

```
[ ] Every route from Section XII has a physical page component
[ ] Every section from Sections II-IX renders with governed CONV-004 tokens
[ ] Modular sections from Section XI mount correctly on every listed page
[ ] 4-state honesty enum used for all evidence status displays
[ ] Fail-closed search returns empty state, never substitutes
[ ] Checkout routes render static-only — zero SDK imports
[ ] Currency continuity (GBP + USD) on Review, Payment, Confirmation
[ ] All neutrals blue-shifted per Zero Grey Rule
[ ] Product truth matches: MK-2866 Ostarine, 15 MG, 90 SERVINGS, >99%, GBP43
[ ] /open-lab namespace (not /openlab) used everywhere
[ ] EvidenceOS (/open-lab/admin) has auth gate
[ ] SharedShell + Footer on every route
[ ] Each modular section works standalone AND inserted cross-page
[ ] Mobile variants exist for all customer-facing routes
[ ] Light/Dark mode support on all routes
```

---

## XV. RISK NOTES

1. **Scope explosion**: 57+ routes is massive. Codex should batch by domain (Commerce > OpenLab > Account > Content) with clear wave boundaries
2. **Modular sections need a component contract**: Each cross-page section needs typed props so it can receive different data contexts (e.g. `RECOMMENDATION-RAIL` on PDP gets compound-related products, on checkout gets frequently-bought-together)
3. **OpenLab depth**: The evidence system alone is 20 routes. Lab Records component system has 22 components. This is a product within a product.
4. **Growth modules are P1-P3**: Loyalty, referral, wholesale, ambassador, streak bonuses are future features. Codex should scaffold routes but NOT implement business logic
5. **EvidenceOS is an admin tool**: Full dashboard (5571px tall at 1440). Separate auth, separate data access patterns. Should be its own wave.
6. **Dynamic routes need source data contracts**: `/product/:slug`, `/open-lab/records/:id`, `/open-lab/compounds/:slug`, `/account/orders/:id` all need typed data interfaces from tools-service

---

## NEXT ACTION

Codex acknowledges this packet, maps it against current route maturity ledger, identifies gaps, and produces an updated wave plan that covers ALL 57+ routes with the modular section architecture. Each wave should specify which modular sections are being built, where they mount, and what data contracts they need.
