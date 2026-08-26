# FIGMA_TO_CODEX_PACKET — Route Identity Capture & Production Implementation

## CONTEXT

- **Active repo/project:** mujtabaakhawaja-prog/oluk-design-system
- **Lane:** Design System Documentation → Codex Implementation
- **Runtime boundary:** apps/olympus-shopper-ui/** (no payment/Woo mutation)
- **Figma file:** BEPMuUt1HroEw8xjz8CVyN
- **Reference spread:** Spread 7 — Phase 0→1 Implementation Plan (1878:553)
- **Sites Sync Routes page:** 1214:51 (156 frames · 78 unique routes · Desktop + Mobile)
- **Sites Sync Modules page:** 1214:50 (29 module frames)
- **Full route compositions:** MF-01 & MF-02 workspace (369:5500) — 24 frames

---

## FIGMA AGENT PROMPT — ROUTE IDENTITY RECONSTRUCTION

This prompt is designed to be pasted into the Figma Agent to systematically reconstruct and capture the identity of each route surface in the OLUK design system. It produces a structured identity card per route that bridges design intent to production implementation.

### PROMPT START

```
You are auditing the OLUK design system file to produce a ROUTE IDENTITY CARD for each unique route surface. A route identity card is a structured record that captures everything needed to bring a route from Figma design to production implementation AND design system adoption.

For each route, I need you to inspect the canonical design frame and produce this exact structure:

---

ROUTE IDENTITY CARD

ROUTE
- path: (the URL path, e.g. /openlab, /product/:slug, /checkout/bag)
- slug: (kebab-case route identifier, e.g. openlab-portal, pdp-decision, checkout-bag)
- title: (user-visible page title, e.g. "OpenLab · Verified Evidence")
- description: (one-sentence purpose of this route)

CLASSIFICATION
- domain: (commerce | evidence | account | checkout | content | navigation)
- product_context: (single-product | multi-product | cross-product | no-product)
- auth_required: (true | false)
- data_dependency: (static | product-api | evidence-api | woo-api | mixed)
- implementation_tier: (P0-critical | P1-core | P2-enhancement | P3-future)

DESIGN AUTHORITY
- canonical_desktop_frame: (node ID of the 1440w desktop design)
- canonical_mobile_frame: (node ID of the 390w mobile design)
- sync_desktop_frame: (node ID from Sites Sync — Routes page)
- sync_mobile_frame: (node ID from Sites Sync — Routes page)
- full_composition_frame: (node ID of full-page composition if exists, else NONE)
- design_status: (proofed | review-required | unproofed | legacy)
- known_issues: (list any inconsistencies, duplicates, missing breakpoints)

SHELL CONTRACT
- shell: (AppShell | CheckoutShell | AccountShell | MinimalShell)
- header: (SiteHeader | none)
- footer: (SiteFooter | none)
- context_nav: (OpenLabContextNav | CommerceDiscoveryFilters | none)
- mega_menu: (shop-mega-menu-panel | openlab-mega-menu-panel | none)

SECTION MAP
For each section in the route (top to bottom), record:
- section_index: (1, 2, 3...)
- section_name: (from the Figma layer name)
- section_node_id: (node ID)
- module_type: (hero | navigation | content | grid | evidence | commerce | form | footer)
- grid_system: (Hero Split | CatalogueGrid | ProductGrid | Evidence Stacked | Rail Horizontal | Checkout Sidebar | Stack Wizard | Dossier Editorial | Custom)
- margin_tier: (0 | 24 | 80 | 100 | 128)
- components_used: (list component names used in this section)
- responsive_behavior: (stack | collapse | hide | reflow | scroll)

COMPONENT REGISTRY
List every unique component instance used on this route:
- component_name:
- component_node_id: (from Component Library)
- variant_used: (specific variant props)
- instance_count: (how many times on this route)
- binding: (what data feeds this component — static copy, product data, evidence data, user data)

TOKEN FOOTPRINT
List CSS custom properties / design tokens this route depends on:
- --oluk-surface-*: (background tokens)
- --oluk-text-*: (text color tokens)
- --oluk-spacing-*: (spacing tokens)
- --oluk-radius-*: (radius tokens)
- --oluk-elevation-*: (elevation tokens)
- --oluk-accent-*: (accent color tokens)

PRODUCTION CONTRACT
- next_route_file: (expected file path in Next.js app router, e.g. app/(shop)/product/[slug]/page.tsx)
- layout_file: (shared layout, e.g. app/(shop)/layout.tsx)
- required_components: (list of React components to implement)
- required_api_calls: (list of data fetches — WooCommerce, evidence API, static)
- seo_title_template: (e.g. "{product.name} | OpenLab Evidence | Olympus Labs UK")
- og_image_source: (hero image, product image, evidence chart, none)
- structured_data: (Product, Article, FAQPage, BreadcrumbList, none)

DESIGN SYSTEM ADOPTION
- components_to_publish: (any local frames that should become published components)
- tokens_to_add: (any missing tokens this route needs)
- patterns_to_document: (any reusable layout patterns worth extracting)
- variants_needed: (any component variants this route reveals are missing)

ACCEPTANCE CRITERIA
- [ ] Desktop (1440) matches canonical frame
- [ ] Mobile (390) matches canonical frame
- [ ] All components use published variants (no detached instances)
- [ ] Section margins follow the 0/24/80/100/128 tier system
- [ ] Grid columns match Grid Grammar specs
- [ ] Evidence data uses 4-state honesty language
- [ ] No editor artifacts in production output
- [ ] Route title and meta match SEO template
- [ ] Structured data schema validates

---

Now apply this template to each route. Start with the routes I select.

IMPORTANT RULES:
1. PDP routes (/product/:slug) show SINGLE-PRODUCT evidence — one compound, one batch, one HPLC trace
2. Portal/Homepage routes (/openlab, /) show MULTI-PRODUCT evidence — grid of compounds, aggregate metrics
3. Use canonical frame IDs from MF-01 & MF-02 workspace (1082:xxxxx series), NOT the 1822:xxxxx duplicates
4. Shell contract must specify which navigation components wrap this route
5. Every component reference must include the Component Library node ID
6. Design status must be honest — mark "review-required" if frame has known issues
7. Token footprint should only list tokens the route actually uses, not the full system
```

### PROMPT END

---

## CONFIRMED — COMPLETE ROUTE REGISTRY

### Commerce Routes (14 unique)

| Route Name | Path | Desktop Sync | Mobile Sync | Full Comp | Domain |
|---|---|---|---|---|---|
| Home | / | 1247:15070 | 1247:15147 | — | commerce |
| Shop | /shop | 1247:15158 | 1247:15170 | — | commerce |
| Collection | /collections/:slug | 1247:15178 | 1247:15190 | — | commerce |
| Shop goal | /shop/:goal | 1247:15198 | 1247:15210 | — | commerce |
| SARMs collection | /collections/sarms | 1247:15218 | 1247:15230 | — | commerce |
| Research chemicals | /collections/research-chemicals | 1247:15238 | 1247:15250 | — | commerce |
| Prohormones | /collections/prohormones | 1247:15258 | 1247:15270 | — | commerce |
| Stacks collection | /collections/stacks | 1247:15278 | 1247:15290 | — | commerce |
| Search | /search | 1247:15298 | 1247:15310 | — | commerce |
| Product compare | /compare | 1247:15318 | 1247:15322 | — | commerce |
| Commerce discovery | /shop (filtered) | 1240:2293 | 1240:2737 | — | commerce |
| Product (PDP) | /product/:slug | 1247:15326 | 1247:15336 | via PdpD | commerce |
| PDP (Sync) | /product/:slug | 1262:24455 | 1262:25038 | — | commerce |
| Reviews | /product/:slug/reviews | 1247:15344 | 1247:15354 | — | commerce |

### OpenLab Evidence Routes (22 unique)

| Route Name | Path | Desktop Sync | Mobile Sync | Full Comp | Domain |
|---|---|---|---|---|---|
| OpenLab portal | /openlab | 1242:3886 | 1242:4017 | 1082:29137 | evidence |
| OpenLab records | /openlab/records | 1247:15408 | 1247:15539 | 1082:29460 | evidence |
| OpenLab record | /openlab/records/:id | 1247:15544 | 1247:15675 | 1082:30382 | evidence |
| OpenLab compound | /openlab/:compound | 1247:15680 | 1247:15811 | 1082:29876 | evidence |
| OpenLab Batch lookup | /openlab/batch | 1243:4055 | 1243:4069 | 1082:30582 | evidence |
| OpenLab Methodology | /openlab/methodology | 1243:4083 | 1243:4097 | 1082:30690 | evidence |
| OpenLab Source chain | /openlab/source-chain | 1243:4111 | 1243:4125 | 1082:30786 | evidence |
| OpenLab Compare | /openlab/compare | 1243:4139 | 1243:4153 | 1082:30895 | evidence |
| OpenLab Evidence | /openlab/evidence | 1243:4167 | 1243:4181 | — | evidence |
| OpenLab Compound guide | /openlab/guide/:compound | 1243:4195 | 1243:4209 | — | evidence |
| OpenLab Research papers | /openlab/research | 1243:4223 | 1243:4237 | — | evidence |
| OpenLab Lab partner | /openlab/lab-partner | 1243:4251 | 1243:4265 | — | evidence |
| OpenLab Dosing calculator | /openlab/dosing | 1243:4279 | 1243:4293 | — | evidence |
| OpenLab Cycle planner | /openlab/cycle-planner | 1243:4307 | 1243:4321 | — | evidence |
| OpenLab Case studies | /openlab/case-studies | 1243:4335 | 1243:4349 | — | evidence |
| OpenLab Glossary | /openlab/glossary | 1243:4363 | 1243:4377 | — | evidence |
| OpenLab COA viewer | /openlab/coa/:id | 1243:4391 | 1243:4405 | — | evidence |
| OpenLab Report viewer | /openlab/report/:id | 1243:4419 | 1243:4433 | — | evidence |
| OpenLab admin | /openlab/admin | 1247:15816 | 1247:15830 | — | evidence |
| OpenLab stack builder | /openlab/stack-builder | 1247:15844 | 1247:15863 | — | evidence |
| About Evidence OS | /openlab/about | 1247:15873 | 1247:15887 | 1082:30967 | evidence |
| OpenLab interaction checker | /openlab/interactions | 1247:57126 | 1247:57140 | — | evidence |

### Checkout Routes (14 unique)

| Route Name | Path | Desktop Sync | Mobile Sync | Domain |
|---|---|---|---|---|
| Bag | /checkout/bag | 1245:4055 | 1245:4063 | checkout |
| Checkout information | /checkout/information | 1245:4070 | 1245:4078 | checkout |
| Checkout delivery | /checkout/delivery | 1245:4085 | 1245:4093 | checkout |
| Checkout review | /checkout/review | 1245:4100 | 1245:4108 | checkout |
| Checkout payment | /checkout/payment | 1245:4115 | 1245:4123 | checkout |
| Checkout processing | /checkout/processing | 1245:4130 | 1245:4138 | checkout |
| Checkout confirmation | /checkout/confirmation | 1245:4145 | 1245:4153 | checkout |
| Checkout failure | /checkout/failure | 1245:4160 | 1245:4168 | checkout |
| Checkout retry | /checkout/retry | 1245:4175 | 1245:4183 | checkout |
| Checkout tracking | /checkout/tracking | 1245:4190 | 1245:4198 | checkout |
| Checkout order pay | /checkout/order-pay | 1245:4205 | 1245:4213 | checkout |
| Checkout payment handoff | /checkout/payment-handoff | 1245:4220 | 1245:4228 | checkout |
| Checkout lifecycle | /checkout (lifecycle) | 1237:635 | 1237:1084 | checkout |
| Order lifecycle | /order (lifecycle) | 1237:1513 | 1237:1821 | checkout |

### Account Routes (7 unique)

| Route Name | Path | Desktop Sync | Mobile Sync | Domain |
|---|---|---|---|---|
| Account hub | /account | 1239:2088 | 1239:2206 | account |
| Account | /account (alt) | 1245:4310 | 1245:4317 | account |
| Account orders | /account/orders | 1245:4323 | 1245:4330 | account |
| Account order detail | /account/orders/:id | 1245:4336 | 1245:4343 | account |
| Account profile | /account/profile | 1245:4349 | 1245:4356 | account |
| Account addresses | /account/addresses | 1245:4362 | 1245:4369 | account |
| Order success/pending/failed/cancelled/tracking | /order/:status | 1245:4235–4303 | 1245:4243–4303 | account |

### Content & Legal Routes (15 unique)

| Route Name | Path | Desktop Sync | Mobile Sync | Domain |
|---|---|---|---|---|
| About | /about | 1244:4055 | 1244:4062 | content |
| Contact | /contact | 1244:4069 | 1244:4076 | content |
| Delivery | /delivery | 1244:4083 | 1244:4090 | content |
| Shipping and returns | /shipping-returns | 1244:4097 | 1244:4104 | content |
| FAQ | /faq | 1244:4111 | 1244:4118 | content |
| Privacy | /privacy | 1244:4125 | 1244:4132 | content |
| Terms | /terms | 1244:4139 | 1244:4146 | content |
| Cookies | /cookies | 1244:4153 | 1244:4160 | content |
| Refunds | /refunds | 1244:4167 | 1244:4174 | content |
| Wholesale | /wholesale | 1244:4181 | 1244:4188 | content |
| International | /international | 1244:4195 | 1244:4202 | content |
| Gift cards | /gift-cards | 1244:4209 | 1244:4216 | content |
| Sitemap | /sitemap | 1244:4223 | 1244:4230 | content |
| Legal document | /legal/:slug | 1247:15929 | 1247:15936 | content |
| Lab reports | /lab-reports | 1247:15901 | 1247:15915 | content |

### Utility Routes (3 unique)

| Route Name | Path | Desktop Sync | Mobile Sync | Domain |
|---|---|---|---|---|
| Not found | /404 | 1247:15362 | 1247:15385 | utility |
| Owner review | /owner-review | 1247:15943 | 1247:15953 | utility |
| Product (PDP alt) | /product/:slug (PdpD variant) | 1262:24455 | 1262:25038 | commerce |

---

## FULL ROUTE COMPOSITION SECTION MAPS

These are the fully designed route compositions with their internal section structure:

### openlab-portal-index (1082:29137) — /openlab — 1440×3299
| # | Section | Node ID | Height | Purpose |
|---|---|---|---|---|
| 1 | Hero-Section | 1082:29138 | 464 | Portal hero with headline + product showcase |
| 2 | Philosophy-Section | 1082:29180 | 508 | Brand philosophy + evidence methodology |
| 3 | Compound-Section | 1082:29213 | 712 | Multi-product compound cards grid |
| 4 | Batch-Table-Section | 1082:29349 | 1351 | Aggregate batch records table |
| 5 | Metrics-Section | 1082:29449 | 264 | Trust metrics summary |

### openlab-lab-records-archive (1082:29460) — /openlab/records — 1440×2281
| # | Section | Node ID | Height | Purpose |
|---|---|---|---|---|
| 1 | Header-Filters-Block | 1082:29461 | 273 | Search + filter controls |
| 2 | Results-Summary | 1082:29494 | 49 | Result count + sort |
| 3 | Main-Table-Section | 1082:29502 | 1717 | Batch records data table |
| 4 | Pagination-Section | 1082:29851 | 80 | Page navigation |
| 5 | Methodology-Banner | 1082:29867 | 162 | Testing methodology CTA |

### openlab-dossier-mk2866 (1082:29876) — /openlab/:compound — 1440×2742
| # | Section | Node ID | Height | Purpose |
|---|---|---|---|---|
| 1 | Dossier-Header-Section | 1082:29877 | 304 | Compound name + purity badge + nav |
| 2 | Details-Container | 1082:29901 | 2038 | Full evidence chain + HPLC + batch data |
| 3 | Related-Rail-Wrapper | 1082:30111 | 400 | Related compounds rail |

### openlab-report-detail (1082:30382) — /openlab/records/:id — 1440×1824
| # | Section | Node ID | Height | Purpose |
|---|---|---|---|---|
| 1 | content_wrapper | 1082:30383 | 1824 | Full report/COA viewer embedded |

### openlab-batch-lookup (1082:30582) — /openlab/batch — 1440×1064
| # | Section | Node ID | Height | Purpose |
|---|---|---|---|---|
| 1 | Search Block | 1082:30583 | 384 | Batch ID input + search |
| 2 | Results Block | 1082:30593 | 680 | Batch verification results |

### openlab-compare (1082:30895) — /openlab/compare — 1440×1467
| # | Section | Node ID | Height | Purpose |
|---|---|---|---|---|
| 1 | Selection Block | 1082:30896 | 376 | Compound selector (2–4 products) |
| 2 | Comparison Block | 1082:30910 | 1091 | Side-by-side evidence comparison |

### openlab-methodology (1082:30690) — /openlab/methodology — 1440×1268
| # | Section | Node ID | Height | Purpose |
|---|---|---|---|---|
| 1 | Header Block | 1082:30691 | 295 | Methodology title + intro |
| 2 | Content Block | 1082:30695 | 973 | Full methodology documentation |

### openlab-source-chain (1082:30786) — /openlab/source-chain — 1440×1311
| # | Section | Node ID | Height | Purpose |
|---|---|---|---|---|
| 1 | Header Block | 1082:30787 | 295 | Source chain title + intro |
| 2 | Content Block | 1082:30791 | 1016 | Full source chain documentation |

### openlab-evidenceos-command (1082:30967) — /openlab/about — 1440×1024
| # | Section | Node ID | Height | Purpose |
|---|---|---|---|---|
| 1 | Header Block | 1082:30968 | 183 | EvidenceOS brand header |
| 2 | Content Block | 1082:30977 | 745 | About EvidenceOS platform |

---

## IMPLEMENTATION PRIORITY BY DOMAIN

### P0 — Critical (implement first)
| Route | Path | Reason |
|---|---|---|
| Home | / | Primary landing, trust messaging entry |
| Product (PDP) | /product/:slug | Revenue-critical, evidence integration |
| Shop | /shop | Core commerce discovery |
| Bag | /checkout/bag | Conversion funnel entry |

### P1 — Core (implement second)
| Route | Path | Reason |
|---|---|---|
| OpenLab portal | /openlab | Evidence platform gateway |
| OpenLab records | /openlab/records | Batch record archive |
| OpenLab compound | /openlab/:compound | Per-compound evidence deep-dive |
| Collection | /collections/:slug | Category browsing |
| Checkout flow | /checkout/* | Full purchase flow |
| Account hub | /account | User dashboard |

### P2 — Enhancement (implement third)
| Route | Path | Reason |
|---|---|---|
| OpenLab Batch lookup | /openlab/batch | Trust tool |
| OpenLab Compare | /openlab/compare | Comparison tool |
| OpenLab record | /openlab/records/:id | Report detail |
| Search | /search | Discovery enhancement |
| Reviews | /product/:slug/reviews | Social proof |
| About Evidence OS | /openlab/about | Brand positioning |

### P3 — Future (implement when ready)
| Route | Path | Reason |
|---|---|---|
| OpenLab Dosing calculator | /openlab/dosing | Tool — needs backend |
| OpenLab Cycle planner | /openlab/cycle-planner | Tool — needs backend |
| OpenLab interaction checker | /openlab/interactions | Tool — needs backend |
| OpenLab Research papers | /openlab/research | Content — needs CMS |
| OpenLab Case studies | /openlab/case-studies | Content — needs CMS |
| OpenLab Glossary | /openlab/glossary | Content — needs CMS |
| OpenLab stack builder | /openlab/stack-builder | Complex tool |
| OpenLab admin | /openlab/admin | Internal tool |

---

## SHELL CONTRACTS BY DOMAIN

### AppShell (commerce + evidence + content)
```
SiteHeader (754:18224)
├── shop-mega-menu-panel (1199:28749) — commerce routes
├── openlab-mega-menu-panel (1199:28750) — evidence routes
├── OpenLabContextNav (1215:29690) — /openlab/* routes only
└── CommerceDiscoveryFilters (794:3821) — /shop, /collections/* only
SiteFooter (754:18226)
```

### CheckoutShell (checkout routes)
```
Checkout Header (minimal — logo + step indicator)
└── CheckoutStepIndicator (5 steps: Bag → Information → Delivery → Review → Payment)
No SiteFooter (checkout isolation)
```

### AccountShell (account routes)
```
SiteHeader (754:18224)
├── Account sidebar navigation
└── Breadcrumb (account > section)
SiteFooter (754:18226)
```

---

## ACCEPTANCE CHECKS

- [ ] Route identity prompt produces valid structured cards per route
- [ ] All 78 unique routes have Desktop + Mobile sync frames
- [ ] Full composition frames use 1082:xxxxx canonical IDs (not 1822:xxxxx)
- [ ] Shell contracts assign correct navigation per domain
- [ ] Implementation priority respects revenue-critical ordering
- [ ] PDP routes enforce single-product evidence context
- [ ] Portal/Homepage routes enforce multi-product evidence context
- [ ] No payment/Woo mutation in evidence route implementations
- [ ] No editor artifacts in production output

## RISK NOTES

- **7 duplicate route compositions** (1082:xxxxx ↔ 1822:xxxxx) — must canonicalize before Codex implements
- **Content/Legal routes** (15) share identical 720px height — likely template placeholders, not proofed designs
- **OpenLab tool routes** (dosing calc, cycle planner, interaction checker) — SYNC frames exist but no full compositions, need backend API design before implementation
- **Checkout routes** — out of scope per codex-bridge security rules. Codex should follow AGENTS.md for checkout-adjacent work
- Olympus runtime/payment/security concerns out of scope per codex-bridge rules

## OPEN ITEMS

- [ ] Run route identity prompt against P0 routes first (Home, PDP, Shop, Bag)
- [ ] Verify each full composition's section structure matches SYNC route modules
- [ ] Create missing mobile full compositions (currently only desktop 1440w compositions exist)
- [ ] Document token footprint per route domain (commerce vs evidence vs account)
- [ ] Define structured data schemas per route type (Product, Article, FAQPage)
- [ ] Map Next.js app router file structure to route registry
