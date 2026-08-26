# FIGMA_TO_CODEX_PACKET — Route Identity Capture & Production Implementation

## CONTEXT

- **Active repo/project:** mujtabaakhawaja-prog/oluk-design-system
- **Lane:** Design System Documentation → Codex Implementation
- **Runtime boundary:** apps/olympus-shopper-ui/** (no payment/Woo mutation)
- **Figma file:** BEPMuUt1HroEw8xjz8CVyN (Final Design)
- **OpenLab file:** GkC3KEt9V3RyG5K319iAUV (R6 reference — extrapolatory only)
- **Reference spreads:** Spread 6 (1878:251) + Spread 7 (1878:553) on Canvas Shape page
- **Evidence Charts spec:** 1890:77164 (6 responsive variants, mature)
- **Sites Sync Routes page:** 1214:51 (156 frames · 78 unique routes · Desktop + Mobile)
- **Sites Sync Modules page:** 1214:50 (29 module frames)
- **Full route compositions:** MF-01 & MF-02 workspace (369:5500) — 24 frames

---

## FIGMA AGENT PROMPT — ROUTE IDENTITY RECONSTRUCTION (v2)

This prompt is designed to be pasted into the Figma Agent to systematically reconstruct and capture the identity of each route surface in the OLUK design system. It produces a structured identity card per route that bridges design intent to production implementation.

### WHAT THIS PROMPT DOES

1. **Inspects** the canonical design frame for a given route
2. **Extracts** every design decision — layout, typography, color, spacing, component usage, data shape
3. **Produces** a structured ROUTE IDENTITY CARD that serves as the single source of truth for:
   - Codex implementation (what to build)
   - Design system adoption (what to publish)
   - Production contract (how to ship)

### OLUK DESIGN LAWS (embedded — the agent must enforce these)

```
TYPOGRAPHY
- Display/Headings: Plus Jakarta Sans ExtraBold
- Body/UI: Inter Variable
- Body floor: 15–16px (DEC-TYPE-FLOOR-001)
- Metadata/eyebrow floor: 12px

COLOR
- Canvas: #F7F8FC (cool luminous)
- Cobalt: #0057FF (metrics, actions, selected states, links)
- Content planes: raised white with restrained cool elevation
- Light mode only — dark footer is the sole inverse surface

SPACING TIERS
- Section margins: 0 | 24 | 80 | 100 | 128 px
- Content max-width: 1171px
- Viewport: 1440px
- Review-only: 1512px (never ship at this width)

EVIDENCE — 4-STATE HONESTY LANGUAGE
- Verified: #15803D (green)
- Source Reported: #0057FF (cobalt)
- Source Only: #D97706 (amber)
- Unavailable: #6B7280 (grey)

PRODUCT TRUTH (canonical reference)
- MK-2866, Ostarine, SKU 80529-01
- 15 MG, 90 Servings (never CAPS), >99% purity, £43
- Class: SARM, Form: CAPSULES
- Quality: LAB FORMULATED, Tested: THIRD PARTY

EVIDENCE CHART TYPES (from 1890:77164)
1. Full branded HPLC trace — retention time axis, detector response, review peak annotation
2. Compact PDP/Archive HPLC — card-scale chromatogram
3. Structured peak view — bar chart, peak area % vs retention time
4. Public record trend — line chart, purity vs published batch sequence
5. Missing-chart state — "Chart unavailable" empty state
6. Responsive: 1440 / 1024 / 390 × Light / Dark
```

### PROMPT START

```
You are auditing the OLUK design system file (BEPMuUt1HroEw8xjz8CVyN) to produce a ROUTE IDENTITY CARD for each unique route surface.

A route identity card is a structured record that captures everything needed to:
1. Implement the route in production (Next.js app router)
2. Adopt its patterns into the design system (publish components, tokens, patterns)
3. Verify the implementation matches the design (acceptance criteria)

You have access to the full Figma file. For each route I select, inspect the canonical design frame thoroughly — read every layer, measure spacing, identify components, extract text content, note colors and typography. Do not guess. Do not infer from names alone. Read the actual node properties.

OLUK DESIGN LAWS you must verify against:
- Typography: Plus Jakarta Sans ExtraBold (display/headings), Inter Variable (body/UI)
- Body text floor: 15–16px. Metadata/eyebrow floor: 12px.
- Canvas: #F7F8FC. Cobalt: #0057FF for metrics/actions. Light mode only (dark footer exception).
- Section margin tiers: 0 | 24 | 80 | 100 | 128 px
- Content max-width: 1171px within 1440px viewport
- Evidence routes must use 4-state honesty language: Verified (#15803D), Source Reported (#0057FF), Source Only (#D97706), Unavailable (#6B7280)
- PDP = single-product evidence. Portal/Homepage = multi-product evidence.
- Product truth: MK-2866, Ostarine, SKU 80529-01, 15 MG, 90 Servings (never CAPS), >99% purity, £43

For each route, produce this EXACT structure:

---

## ROUTE IDENTITY CARD

### ROUTE
| Field | Value |
|---|---|
| path | (URL path, e.g. /openlab, /product/:slug) |
| slug | (kebab-case identifier, e.g. openlab-portal) |
| title | (user-visible page title) |
| description | (one-sentence purpose) |
| product_context | single-product \| multi-product \| cross-product \| no-product |

### CLASSIFICATION
| Field | Value |
|---|---|
| domain | commerce \| evidence \| account \| checkout \| content \| navigation |
| auth_required | true \| false |
| data_dependency | static \| product-api \| evidence-api \| woo-api \| mixed |
| implementation_tier | P0-critical \| P1-core \| P2-enhancement \| P3-future |
| runtime_exclusions | (list any banned behaviors per AGENTS.md / module registry) |

### DESIGN AUTHORITY
| Field | Value |
|---|---|
| canonical_desktop_frame | (node ID — the 1440w design) |
| canonical_mobile_frame | (node ID — the 390w design, if exists) |
| canonical_tablet_frame | (node ID — the 1024w design, if exists) |
| sync_desktop_frame | (from Sites Sync Routes page 1214:51) |
| sync_mobile_frame | (from Sites Sync Routes page 1214:51) |
| full_composition_frame | (from 369:5500, use 1082:xxxxx IDs NOT 1822:xxxxx duplicates) |
| design_status | proofed \| review-required \| unproofed \| legacy |
| width | (actual frame width — note if 1171/1440/1512) |
| height | (actual frame height) |
| known_issues | (inconsistencies, duplicates, missing breakpoints, spacing problems) |

### SHELL CONTRACT
| Field | Value |
|---|---|
| shell | AppShell \| CheckoutShell \| AccountShell \| MinimalShell |
| header | SiteHeader \| CheckoutHeader \| none |
| footer | SiteFooter \| none |
| context_nav | OpenLabContextNav \| CommerceDiscoveryFilters \| none |
| mega_menu | shop-mega-menu-panel \| openlab-mega-menu-panel \| none |
| breadcrumb | (pattern, e.g. "Open Lab → MK-2866 → Batch WS-0642") |

### SECTION MAP
For each section in the route (top to bottom):

| # | Section Name | Node ID | Height | Module Type | Grid System | Margin Tier | Components Used | Responsive |
|---|---|---|---|---|---|---|---|---|
| 1 | (layer name) | (id) | (px) | hero\|navigation\|content\|grid\|evidence\|commerce\|form\|footer | (grid name) | 0\|24\|80\|100\|128 | (list) | stack\|collapse\|hide\|reflow\|scroll |

### EVIDENCE INTEGRATION (evidence/commerce routes only)
| Field | Value |
|---|---|
| evidence_scope | single-product \| multi-product \| cross-product |
| chart_types_used | (from Evidence Charts spec: full-hplc, compact-hplc, structured-peak, trend, missing-state) |
| honesty_states_used | (which of the 4 states appear on this route) |
| data_fixtures_needed | (what governed fixture shape this route needs) |
| chromatogram_context | section-level \| card-level \| none |

### COMPONENT REGISTRY
For each unique component instance used:

| Component | Library Node ID | Variant Props | Count | Data Binding |
|---|---|---|---|---|
| (name) | (from Component Library page 672:10) | (specific variant) | (instances) | static \| product \| evidence \| user |

### TOKEN FOOTPRINT
| Category | Tokens Used |
|---|---|
| Surface | (background tokens) |
| Text | (text color tokens) |
| Spacing | (spacing tokens) |
| Radius | (radius tokens) |
| Elevation | (elevation tokens) |
| Accent | (accent/brand tokens) |

### TYPOGRAPHY AUDIT
| Role | Font | Weight | Size | Line Height | Compliant? |
|---|---|---|---|---|---|
| Page title | (actual) | (actual) | (actual) | (actual) | ✅/❌ + reason |
| Section heading | ... | ... | ... | ... | ... |
| Body text | ... | ... | ... | ... | ... |
| Metadata/eyebrow | ... | ... | ... | ... | ... |
| CTA/button | ... | ... | ... | ... | ... |

### PRODUCTION CONTRACT
| Field | Value |
|---|---|
| next_route_file | (e.g. app/(shop)/product/[slug]/page.tsx) |
| layout_file | (shared layout) |
| required_components | (React components to implement) |
| required_api_calls | (data fetches — governed fixture, WooCommerce, evidence API, static) |
| seo_title_template | (e.g. "{product.name} \| OpenLab Evidence \| Olympus Labs UK") |
| og_image_source | hero \| product \| evidence-chart \| none |
| structured_data | Product \| Article \| FAQPage \| BreadcrumbList \| none |

### DESIGN SYSTEM ADOPTION
| Category | Items |
|---|---|
| components_to_publish | (local frames → published components) |
| tokens_to_add | (missing tokens this route reveals) |
| patterns_to_document | (reusable layout patterns worth extracting) |
| variants_needed | (missing component variants) |
| evidence_charts_needed | (which of the 6 chart types from 1890:77164) |

### ACCEPTANCE CRITERIA
- [ ] Desktop (1440) matches canonical frame pixel-accurately
- [ ] Mobile (390) matches canonical frame (if exists)
- [ ] Tablet (1024) matches canonical frame (if exists)
- [ ] Content max-width = 1171px within 1440 viewport
- [ ] All components use published variants (no detached instances)
- [ ] Section margins follow 0/24/80/100/128 tier system
- [ ] Typography uses Plus Jakarta Sans ExtraBold (headings) + Inter Variable (body)
- [ ] Body text ≥ 15px, metadata ≥ 12px
- [ ] Canvas = #F7F8FC, cobalt = #0057FF for metrics/actions
- [ ] Evidence data uses 4-state honesty language (evidence routes)
- [ ] PDP shows single-product evidence / Portal shows multi-product (evidence routes)
- [ ] Product truth matches: MK-2866, Ostarine, 80529-01, 15 MG, 90 Servings, >99%, £43
- [ ] No dark theme outside footer
- [ ] No editor artifacts in production output
- [ ] Route title and meta match SEO template
- [ ] Structured data schema validates
- [ ] No payment/Woo mutation/runtime authority in evidence surfaces

---

Now apply this template to each route I select. Start with the routes I provide.

CRITICAL RULES:
1. USE canonical 1082:xxxxx IDs from MF-01/MF-02 workspace (369:5500), NEVER the 1822:xxxxx duplicates
2. PDP routes = single-product evidence (one compound, one batch, one HPLC trace)
3. Portal/Homepage routes = multi-product evidence (grid of compounds, aggregate metrics)
4. Shell contract must specify which navigation components wrap this route
5. Every component reference must include the Component Library node ID from page 672:10
6. Design status must be honest — "review-required" if frame has known issues
7. Token footprint = only tokens the route actually uses, not the full system
8. Evidence Charts integration must reference specific chart types from the 1890:77164 spec
9. CoA Viewer routes must include HPLC chromatogram + structured peak view + 4-state honesty
10. Width = 1512 means review-only frame, not a shippable dimension
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
| OpenLab record | /openlab/records/:id | Report detail + CoA viewer |
| Search | /search | Discovery enhancement |
| Reviews | /product/:slug/reviews | Social proof |
| About Evidence OS | /openlab/about | Brand positioning |
| OpenLab Evidence | /openlab/evidence | Evidence Charts multi-product trends |

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
SiteFooter (754:18226) — dark footer (sole inverse surface)
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

## OPEN ITEMS

- [ ] Run route identity prompt against P0 routes first (Home, PDP, Shop, Bag)
- [ ] Verify each full composition's section structure matches SYNC route modules
- [ ] Create missing mobile full compositions (currently only desktop 1440w compositions exist)
- [ ] Document token footprint per route domain (commerce vs evidence vs account)
- [ ] Define structured data schemas per route type (Product, Article, FAQPage)
- [ ] Map Next.js app router file structure to route registry
- [ ] Design CoA Viewer with OLUK identity (net-new, R6 as structural reference only)
- [ ] Design EvidenceCommerceCard with OLUK identity (net-new card variant concept)
- [ ] Connect Evidence Charts spec (1890:77164) to route identity cards for evidence routes
