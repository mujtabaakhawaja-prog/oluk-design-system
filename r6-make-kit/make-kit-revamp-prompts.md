# R6 Make Kit — Revamp-Then-Freeze Prompts

These prompts are designed for Figma Make runs that revamp existing generic/incomplete frames into branded, launch-ready authority surfaces. Each prompt targets a specific problem area identified in the file inventory.

The workflow is:
1. Run the Make prompt against the target page/frame
2. Review candidates in the Lab file
3. Promote the best candidate to Champion status
4. Freeze as authority in Production or Routes file
5. Codex implements against the frozen champion

---

## TIER 1 — Launch-Blocking Routes (Sprint 1)

### 1.1 Homepage Hero — Range Horizon Branded Refinement

```
TARGET: Homepage Hero section on the Range Horizon page
AUTHORITY: Dark hero frame 1420:813, Light hero frame 1420:843
DESIGN SYSTEM: R6 token pipeline — Primitive → Semantic (Light/Dark) → Component aliases
SPACING: Frozen scale 2·4·8·12·16·24·32·48·64·80·120

REQUIREMENTS:
- Hero must work in both dark and light modes using semantic tokens only
- RangeHeroCTA component must be the primary action
- Product identity hierarchy: Compound → Alias → Metrics → Price → Classification → CTA
- Background treatment must use the established gradient/image overlay pattern
- Typography must use the R6 type scale (no custom sizes)
- Responsive breakpoints: desktop (1440), tablet (768), mobile (390)

GENERATE:
- 3 hero variants that refine the existing Range Horizon direction
- Each variant should explore a different composition strategy
- Preserve the product-first, trust-evidence-supported hierarchy
- No generic stock imagery — use the existing product photography assets

CONSTRAINTS:
- Do not introduce new components — use existing R6 component library
- Do not create new color tokens — use semantic pipeline
- All text must be real copy, not lorem ipsum
- CTA must link to /product/ routes
```

### 1.2 PDP — Product Detail Page Corrected V02 Polish

```
TARGET: Product Detail Page system
AUTHORITY: Champion PDP frame 777:813, ProductCommerceCard system 1185:4857
DESIGN SYSTEM: R6 tokens + TrustEvidenceSpine + ProductCommerceCard

REQUIREMENTS:
- Purchase panel must follow the ProductCommerceCard system hierarchy:
  Compound → Alias → Metrics → Price → Classification → CTA
- TrustEvidenceSpine must appear in the correct position
- Lab report links must be functional route references
- Variant selector must handle: size, quantity, subscription options
- Price display must support: base, sale, subscription, bulk pricing
- Mobile-first responsive: product image gallery, sticky purchase CTA

GENERATE:
- 2 PDP variants refining the Corrected V02 champion direction
- 1 variant exploring mobile-optimized purchase flow
- Evidence section placement options (inline vs sidebar vs tabbed)

CONSTRAINTS:
- ProductCommerceCard is the authority component — do not redesign it
- Price formatting must match existing runtime patterns
- No payment UI — purchase panel stops at Add to Bag
- Use RAD-140 as the fixture product (see r6-make-kit/fixtures/rad-140.json)
```

### 1.3 Catalogue — Product Grid and Filtering

```
TARGET: Catalogue/Shop page system
AUTHORITY: R6 08 — Catalogue System page
DESIGN SYSTEM: R6 tokens + ProductCommerceCard

REQUIREMENTS:
- Product grid using ProductCommerceCard instances
- Category filtering: by product type, goal, ingredient
- Sort controls: price, popularity, newest
- Grid density options: compact (4-col), standard (3-col), detailed (2-col)
- Empty state for no-results
- Mobile: single column with horizontal scroll category pills

GENERATE:
- 2 catalogue page variants with different filtering UX
- 1 search results variant
- Category landing variant (e.g., /category/sarms/)

CONSTRAINTS:
- Cards must be ProductCommerceCard instances, not custom designs
- Filter UI must use existing R6 form components
- Pagination or infinite scroll — pick one and commit
- Real product names from the OLUK catalogue
```

### 1.4 OpenLab Portal — Hub Page Refinement

```
TARGET: OpenLab portal hub page
AUTHORITY: Champion OpenLab Portal V2 frame 766:816
DESIGN SYSTEM: R6 tokens + evidence components

REQUIREMENTS:
- Hub must surface: latest lab reports, testing methodology, product certificates
- Navigation to individual lab report pages
- Trust hierarchy: certification badges → methodology overview → recent results
- Search/filter for lab reports by product, date, test type
- Mobile-optimized card layout for report entries

GENERATE:
- 2 portal hub variants refining the V2 champion
- 1 individual lab report page template
- 1 methodology/about page variant

CONSTRAINTS:
- Must use TrustEvidenceSpine for evidence display
- Lab data visualizations are consumed by parent routes, not surfaced wholesale
- No standalone chart components as pages — charts live inside report cards
- Real lab report structure from existing OLUK testing data
```

---

## TIER 2 — Core Experience Routes (Sprint 2)

### 2.1 Header + Navigation System Polish

```
TARGET: Header Stack component system
AUTHORITY: Champion Header Stack 1169:4859, R6 06 — Navigation page
DESIGN SYSTEM: R6 tokens + Brand Logo component

REQUIREMENTS:
- Header states: default, scrolled/sticky, mobile hamburger, search active
- Navigation hierarchy: Site → Product → OpenLab → Account
- Bag indicator with item count badge
- Account menu: logged-in vs guest states
- Brand Logo component must be used (not a static image)
- Announcement bar slot (optional, collapsible)

GENERATE:
- Desktop header with mega-menu for Product category
- Mobile header with slide-out navigation
- Search overlay state
- All header states in both light and dark modes

CONSTRAINTS:
- Header Stack is the authority — refine, don't redesign
- Navigation items must match the 83-route inventory
- Sticky behavior must not interfere with page scroll performance
- Logo must link to homepage
```

### 2.2 Bag + Checkout Flow

```
TARGET: Bag and Checkout route system
AUTHORITY: R6 11 — Bag and Checkout page, Codex checkout proofs
DESIGN SYSTEM: R6 tokens + ProductCommerceCard + form components

REQUIREMENTS:
- Bag: line items with quantity adjust, remove, subtotal
- Checkout steps: Information → Shipping → Payment → Confirmation
- Order summary sidebar (desktop) / collapsible (mobile)
- Form validation states for all input fields
- Discount code input (max 25% cap — hard constraint)
- Trust signals throughout checkout flow

GENERATE:
- Bag page (empty + populated states)
- 4 checkout step pages
- Order confirmation page
- Mobile-optimized single-column checkout

CONSTRAINTS:
- No payment UI implementation — use placeholder payment form
- No real WooCommerce integration references
- Discount cap ≤25% must be visually communicated
- Use existing Codex checkout proofs as reference for runtime parity
```

### 2.3 Account System

```
TARGET: Account route family
AUTHORITY: R6 route inventory — 13 account routes
DESIGN SYSTEM: R6 tokens + form components

REQUIREMENTS:
- Account hub/dashboard with order history, profile, addresses
- Login / Register pages with form validation
- Order detail page with status tracking
- Address book management
- Password reset flow
- Subscription management (if applicable)

GENERATE:
- Account dashboard hub
- Login + Register (tabbed or split)
- Order history list + order detail
- Profile edit + address management
- Password reset flow (3 states)

CONSTRAINTS:
- No PII in fixtures — use placeholder data
- Forms must use R6 form components
- Post-launch priority — keep scope minimal but complete
- All 13 account routes should have at least a wireframe-level representation
```

---

## TIER 3 — Content + Support Routes (Sprint 3)

### 3.1 Content Pages — Blog, About, Legal

```
TARGET: Content route family (16 routes)
AUTHORITY: R6 route inventory
DESIGN SYSTEM: R6 tokens + typography system

REQUIREMENTS:
- Blog listing + article template
- About page with brand story sections
- Legal pages: Terms, Privacy, Refund Policy, Shipping
- FAQ page with accordion pattern
- Contact page with form

GENERATE:
- Blog listing page with featured post + grid
- Article template with typography showcase
- About page (brand story, team, mission)
- Legal page template (reusable across Terms/Privacy/etc)
- FAQ with search + category filter
- Contact page with form + location info

CONSTRAINTS:
- Content pages are post-launch — design for template reuse
- Typography must demonstrate the full R6 type scale
- No custom components — compose from existing library
- Legal content can be placeholder but must show realistic structure
```

### 3.2 Support + Growth Routes

```
TARGET: Support (7 routes) + Growth (9 routes)
AUTHORITY: R6 route inventory
DESIGN SYSTEM: R6 tokens

REQUIREMENTS:
- Support: Help center hub, ticket submission, order lookup, returns
- Growth: Referral program, loyalty/rewards, newsletter, promotions
- Both families should feel like natural extensions of the core experience

GENERATE:
- Help center hub with category cards
- Ticket/contact form
- Referral program landing page
- Promotions/sale landing page template

CONSTRAINTS:
- Lowest priority — wireframe-to-mid-fidelity is acceptable
- Must still use R6 tokens and components
- No loyalty point system UI — just the landing page
- Referral must not promise specific discount amounts beyond 25% cap
```

---

## TIER 4 — Component-Level Revamps

### 4.1 Data Visualization Components — Consumed, Not Surfaced

```
TARGET: Evidence chart components (line graphs, bar charts, purity meters)
AUTHORITY: R6 05 — Evidence Components
DESIGN SYSTEM: R6 tokens + semantic color pipeline

PROBLEM: Data viz components are currently surfaced as standalone review
surfaces. They should be consumed by parent routes (PDP evidence section,
OpenLab report pages) not presented as independent pages.

REQUIREMENTS:
- Audit all evidence/chart components
- Design them as embeddable slots with standard sizing
- Create composition examples showing charts inside parent routes
- Define the chart color palette using semantic tokens only

GENERATE:
- Chart component sizing guide (S/M/L for different contexts)
- 3 composition examples: chart in PDP, chart in lab report, chart in portal
- Evidence card that wraps a chart with title + context + source link

CONSTRAINTS:
- Charts are components, not pages
- No standalone chart review surfaces after this revamp
- Colors must come from semantic pipeline, not hardcoded
- Must work in both light and dark modes
```

### 4.2 Brand Logo + Identity Consolidation

```
TARGET: Brand Logo component and identity assets
AUTHORITY: Champion Brand Logo 1185:4735
DESIGN SYSTEM: R6 00 — Brand Identity

REQUIREMENTS:
- Logo variants: full, mark-only, wordmark-only
- Size constraints: minimum size, clear space
- Color variants: on-dark, on-light, monochrome
- Favicon and app icon derivations
- Social media avatar sizing

GENERATE:
- Logo usage guide frame showing all variants
- Clear space and minimum size specification
- Do/don't examples

CONSTRAINTS:
- Champion logo is frozen — do not redesign
- Guide is for documentation, not exploration
- Export-ready assets at standard sizes
```

---

## Prompt Usage Notes

### How to run a Make sprint

1. Copy the relevant prompt section
2. Open the Lab file (`scM4viMDHV6Jv6Fxccm71g`)
3. Navigate to the appropriate Lab page
4. Run Figma Make with the prompt
5. Review generated candidates
6. Use Figma Agent to audit candidates against the authority
7. Human promotes the best candidate
8. Move champion to Production or Routes file
9. Freeze as authority
10. Codex implements against the frozen champion

### Fixture data

Product fixtures are in `r6-make-kit/fixtures/`. Use `rad-140.json` for PDP and product card testing — it includes null values for edge case coverage.

### Token references

- Primitive collection: `518:816`
- Semantic collection: `518:817` (Light mode `518:1`, Dark mode `518:2`)
- Frozen spacing scale: 2·4·8·12·16·24·32·48·64·80·120
- Text styles: 38 published
- Effect styles: 12 published
