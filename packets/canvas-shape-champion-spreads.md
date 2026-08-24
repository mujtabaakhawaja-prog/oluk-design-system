# FIGMA_TO_CODEX_PACKET — Canvas Shape Champion Spreads

## CONTEXT
- **Active repo/project:** oluk-design-system
- **Lane:** Design System Documentation + Implementation Contract
- **Runtime boundary:** apps/olympus-shopper-ui (shopper UI only — no payment/Woo mutation)
- **Figma file:** BEPMuUt1HroEw8xjz8CVyN
- **Page:** 📐 Canvas Shape — Grid Architecture (1623:2)
- **Referenced file:** Codex Sites (67dsmMdok9JnLZ5GCdRhBL)

## CONTROL SURFACE
- **Figma MCP:** ACTIVE — all spreads built via evaluate_script
- **GitHub connector:** ACTIVE — this packet
- **Browser / preview:** PENDING — runtime validation after implementation

---

## CONFIRMED — Design Authority Evidence

### Page Structure (11 top-level frames on 1623:2)
| Frame | Node ID | Content |
|---|---|---|
| Canvas Shape — Shell Architecture | 1623:3 | AppShell stack diagram + breakpoints |
| Canvas Shape — Section Margins | 1623:47 | 5-tier vertical rhythm |
| Canvas Shape — Grid Systems | 1623:84 | Hero/Product/Chip grid patterns |
| Canvas Shape — Card Component Map | 1623:168 | 14-row taxonomy |
| Canvas Shape — Tokens | 1623:234 | CSS custom properties |
| Canvas Shape — Surface Grid Mapping | 1623:372 | 6 surface cards |
| **Spread 1 — Primitives & Foundations** | **1648:2** | 11 primitives + token reference |
| **Spread 2 — Cards & Commerce Surfaces** | **1648:91** | 14 card sets + state matrix |
| **Spread 3 — Shells, Navigation & Grids** | **1648:216** | 5 nav + 8 grids + shell diagram |
| **Spread 4 — Commerce Flows** | **1648:326** | PDP/OpenLab/Checkout flows |
| **Spread 5 — Surface Contracts & Runtime** | **1648:431** | 9 routes + 8 correction rules |

---

## SPREAD 1 — PRIMITIVES & FOUNDATIONS (1648:2)

### Authority Nodes
| Component | Node ID | Variants | Role |
|---|---|---|---|
| OLUK / ActionControl v3 | 1352:8763 | 8 variants | CTA / secondary / utility buttons |
| OLUK / CopySurface Grammar v1 | 1354:8952 | 8 variants | Eyebrow + headline + body copy patterns |
| OLUK / StockPill | 732:2902 | 3 states | In Stock (#15803D) · Unavailable · Out of Stock |
| QualitativeChip | 733:17342 | 3 states | Filled icons 16px · label/value split |
| OLUK / QualitativeIcon | 844:926 | 4 variants | Icon primitive: grid, capsule, flask, shield |
| MetricRail | 733:95 | 3 widths (D/T/M) | 3-col equal grid: strength | servings | purity |
| OLUK / ContentSurface | 1319:6409 | 4 variants | Container primitive with border + radius |
| OLUK / Grid Law v1 | 1361:10094 | 2 variants | Grid constraint enforcement |
| OLUK / EvidenceStatusChip | 1085:4390 | 7 states | Evidence verification badges |
| AttributeChips (Component) | — | Adaptive GRID | 2-col wrap · outlined icons 25px |
| QualitativeChips (Component) | — | Adaptive GRID | 2-col wrap · filled icons 16px |

### Foundation Reference Nodes
| Spec | Node ID | Content |
|---|---|---|
| Typography Specimens | 865:50 | 103 type specimens — full scale |
| Spacing + Radius Matrix | 865:154 | 78 spacing/radius specimens |
| Elevation System | 866:110 | Shadow/elevation specs |
| Buttons | 1337:8963 | 18 button primitives |

### Primitive Tokens
```css
--card-radius: 8px (compact) → 10px (chips) → 16px (evidence) → 20px (featured) → 24px (purchase) → 28px (hero)
--card-border: 1px solid rgb(212, 224, 242)
--card-padding: 24px (standard) | 16px (compact)
--chip-attribute-icon: 25px
--chip-qualitative-icon: 16px
--chip-gap-attribute: 11px
--chip-gap-qualitative: 8px
--color-cobalt: #0057FF (brand/interactive)
--color-stock-green: #15803D (inventory)
--color-border-subtle: rgb(212, 224, 242)
--page-bg: #F7F8FC
--card-bg: #FFFFFF
```

---

## SPREAD 2 — CARDS & COMMERCE SURFACES (1648:91)

### Commerce Cards
| Component | Node ID | Variants | Grid Placement |
|---|---|---|---|
| ProductCommerceCard / Compact | 742:50 | 8 states | CatalogueGrid 4-col · QuickAdd |
| ProductCommerceCard / Vertical | 743:50 | 2 widths (D 481×916, M 358×974) | Vertical ProductGrid · carries QualitativeChips |
| ProductCommerceCard / Featured | 743:281 | 2 widths | Hero slot left column |
| ProductCommerceCard / Relation | 743:520 | 3 widths (D/T/M) | HorizontalRelatedUpsell rail · carries AttributeChips |

### Decision & Purchase Surfaces
| Component | Node ID | Variants | Role |
|---|---|---|---|
| PurchasePanel | 745:50 | 12 (6 states × 2 widths) | PDP sidebar + OpenLab · MINIMAL / FACTS ONLY / UNAVAILABLE |
| ProductDecisionHero | 739:50 | 3 (D/T/M) | PDP first fold · cols-2-3 split |
| HeroDecisionSurface | 736:17458 | 3 (D/T/M) | Panel container inside hero |
| OLUK / MediaChamber | 1022:4099 | 4 (Context × Width) | Product image · no floating chips |

### Stack Builder Cards
| Component | Node ID | Variants | Role |
|---|---|---|---|
| OLUK / Stack / AdditionCard | 1325:7801 | 8 desktop | Stack product selection |
| OLUK / Stack / AdditionCard v3 Mobile | 1375:3619 | 6 mobile | Mobile stack card |
| OLUK / Stack / AdditionCard v3 Desktop | 1376:4243 | 3 desktop | Desktop stack v3 |
| OLUK / Stack / CommercialSummary | 1326:7562 | 4 | Stack pricing summary |
| OLUK / Stack / OpenLabConfidence | 1326:7659 | 4 | Lab confidence panel |
| OLUK / Stack / GoalSelector | 1321:6478 | 8 | Goal input wizard |

### State Matrix — ProductCommerceCard
`DEFAULT → HOVER → FOCUS → SELECTED → ADDED → UNAVAILABLE → OUT OF STOCK → DISABLED`

### Responsive Rules
- All cards use adaptive/intrinsic sizing — **no hardcoded pixel dimensions**
- Compact: CatalogueGrid 4→2→1 col collapse at 1024→390px
- Vertical/Featured: ProductGrid auto-fit minmax(280px, 1fr)
- Relation: HorizontalRelated rail with horizontal scroll at mobile
- Stack cards: Vertical wizard flow, full-width at all breakpoints

---

## SPREAD 3 — SHELLS, NAVIGATION & GRIDS (1648:216)

### Shell & Navigation
| Component | Node ID | Variants | Role |
|---|---|---|---|
| SiteHeader | 754:18224 | 3 (D/T/M) | flex-row gap:24px pad:0 32px (mobile 0 18px) |
| SiteFooter | 754:18226 | 3 (D/T/M) | Grid layout pad:12 22 |
| OLUK / Navigation / mobile-menu-sheet | 1215:29652 | 3 | Full-screen mobile overlay |
| OLUK / Navigation / shop-mega-menu-panel | 1199:28749 | — | Desktop mega menu dropdown |
| CommerceDiscoveryFilters | 794:3821 | 4 | Category filter pills + dropdown |

### Grid Systems
| Pattern | CSS | Usage |
|---|---|---|
| Hero Split (cols-2-3) | `grid: auto 1fr` | PDP + OpenLab hero · gap:20px pad:48px 20px 0 |
| CatalogueGrid (GridC) | `repeat(4, 1fr)` | Shop page · 4→2→1 col at 1024→390px · gap:12px |
| ProductGrid (auto-fit) | `auto-fit minmax(280px, 1fr)` | Vertical/Featured/Derived · gap:12-20px |
| Evidence Stacked | `VERTICAL gap:0` | OpenLab evidence archive · pad:0 20px |
| Rail Horizontal | `HORIZONTAL scroll` | Related products · gap:24px |
| Checkout Sidebar | `grid: 2fr 1fr` | Bag page · LineItems | Summary split |
| Stack Wizard | `VERTICAL gap:12` | Stack explorer · tier cards HORIZONTAL gap:24 |
| Dossier Editorial | `VERTICAL gap:0` | OpenLab dossier · editorial sections |

### Grid Grammar Master Specs
| Spec | Node ID | Content |
|---|---|---|
| GRAMMAR / Desktop / 1440 | 1349:53 | Full desktop grid grammar |
| GRAMMAR / Mobile / 390 | 1349:54 | Full mobile grid grammar |
| Runtime Taxonomy Shell | 868:24967 | Shell + runtime mapping · CONV-003 |

### AppShell Contract
```
┌─ AppShell ──────────────────── max-width: 1512px ─┐
│ Header        flex-row  gap:24  pad:0 32px        │
├───────────────────────────────────────────────────│
│ MainContent   flex-col  flex:1  pad-bottom:120px  │
│  ┌─ Section:margin ──── pad-top:0/24/80/100/128 ─┐│
│  │  Hero / Grid / Rail / Evidence / Content       ││
│  └────────────────────────────────────────────────┘│
├───────────────────────────────────────────────────│
│ Footer        grid  pad:12 22                     │
└───────────────────────────────────────────────────┘
```

### Shell Tokens
```css
--shell-max-width: 1512px
--shell-content-width: 1344px    /* 1512 - 2×84 */
--shell-content-narrow: 1171px   /* Canonical desktop */
--shell-gutter: 20px             /* Side padding */
--shell-gutter-wide: 48px        /* Hero/grid outer */
```

### Breakpoints
| Breakpoint | Shell Width | Grid Columns | Card Layout | Chip Grid |
|---|---|---|---|---|
| 1440+ | 1512px max | 4-col catalogue, cols-2-3 hero | Desktop horizontal Relation | 2×2 |
| 1024 | 1024px | 2-col catalogue, stacked hero | Tablet stacked Relation | 2×2 |
| 768 | 768px | 2-col catalogue | Tablet, vertical stack | 2×2 |
| 390 | 390px | 1-col | Mobile stacked, full-width | 1-col stack |

---

## SPREAD 4 — COMMERCE FLOWS (1648:326)

### PDP Product Detail Page Flow
| Step | Section | Components | Grid | Margin |
|---|---|---|---|---|
| 1 | PDP First Fold — Decision Hero | ProductDecisionHero (739:50) · MediaChamber (1022:4099) · PurchasePanel (745:50) · AttributeChips · MetricRail (733:95) · StockPill (732:2902) | cols-2-3 split: auto 1fr, gap:20px | pad-top: 0px (hero) |
| 2 | PDP Continuation — Product Details | OLUK/Section/PDPContinuation (1210:4738) · CopySurface Grammar (1354:8952) · TrustEvidenceSpine (556:34160) | VERTICAL stack, gap:0, pad:48px 20px | pad-top: 80px |
| 3 | PDP Upsell — Complete Your Stack | UpsellContextRail (1082:4667) · RecommendationCard (1082:4465) · AttributeChips | HORIZONTAL tabbed rail, gap:24px | pad-top: 80px |
| 4 | PDP Related Products | RelatedRail (753:18136) · ProductCommerceCard/Relation (743:520) | HORIZONTAL scroll rail, gap:24px | pad-top: 100px |

### OpenLab Portal Flow
| Step | Section | Components | Grid | Margin |
|---|---|---|---|---|
| 1 | OpenLab Portal Hero | OpenLabPortalHero (1263:5683/5814) · MediaChamber · PurchasePanel · QualitativeChips | cols-2-3 split: auto 1fr | pad-top: 0px (hero) |
| 2 | TrustSpine — Evidence Overview | TrustEvidenceSpine (556:34160) — 16 variants | VERTICAL, 2 children | pad-top: 80px |
| 3 | Evidence Archive | EvidenceArchive cards · HPLC traces · batch records | GRID stacked cards, pad:0 20px | pad-top: 100px |
| 4 | Embedded Evidence & Product Banner | EmbeddedEvidence · ProductBanner · lab verification (61:34990) | GRID stacked, pad:52 all | pad-top: 100px |

### Checkout Lifecycle Flow
| Step | Section | Components | Grid | Margin |
|---|---|---|---|---|
| 1 | Bag — Cart View | OLUK/Checkout/Bag (1210:5000) · CheckoutStepIndicator (1085:4511) State=Bag | HORIZONTAL split: 2/3 + 1/3 (grid: 2fr 1fr) | pad-top: 0px |
| 2 | Review — Order Review | OLUK/Checkout/Review (1210:30892) · CheckoutStepIndicator State=Review | VERTICAL + 2/3+1/3 persistent sidebar | pad-top: 0px |
| 3 | Confirmation — Order Received | OLUK/Checkout/Confirmation (1210:30848) · CheckoutStepIndicator State=Confirmation | Centered VERTICAL · receipt layout | pad-top: 0px |

### CheckoutStepIndicator States
`BAG → SHIPPING → PAYMENT → REVIEW → CONFIRMATION` (5 states at 1085:4511)

---

## SPREAD 5 — SURFACE CONTRACTS & RUNTIME MAPPING (1648:431)

### Route → Section → Component Contract
| Route | Path | Sections | SYNC Modules |
|---|---|---|---|
| Commerce Discovery (Shop) | `/` | Header → CategoryRail → CatalogueGrid (4-col Compact) → Pagination → Footer | Shell Navigation · Catalogue Discovery |
| Product Detail Page | `/product/:slug` | Header → PdpDecisionHero (cols-2-3) → PDPContinuation → UpsellContextRail → RelatedRail → Footer | Shell Navigation · PDP First Fold · Product narrative |
| OpenLab Portal | `/openlab` | Header → OpenLabPortalHero (cols-2-3) → TrustSpine → EvidenceArchive → EmbeddedEvidence → ProductBanner → Footer | Shell Navigation · OpenLab Portal · OpenLab tools |
| OpenLab Dossier | `/openlab/:compound` | Header → DossierHero → EvidenceTimeline → HPLCTraces → BatchRecords → LabVerification → Footer | OpenLab tools (desktop + mobile) |
| Stack Explorer | `/stack` | Header → SectionNarrative → GoalSelector → TierCards (3 AdditionCards) → CommercialSummary → OpenLabConfidence → Footer | Shell Navigation · Your Stack |
| Account Hub | `/account` | Header → AccountHeader → DashboardTiles (2×2) → QuickReorder (3 RestockCards) → SavedItems → OrderHistory → Footer | Shell Navigation · Account Hub |
| Checkout — Bag | `/checkout/bag` | Header → CheckoutStepIndicator[Bag] → ContentLayout (2/3 + 1/3) → Footer | Shell Navigation · Checkout Review |
| Checkout — Review | `/checkout/review` | Header → CheckoutStepIndicator[Review] → ReviewSections (VERTICAL + sidebar) → Footer | Shell Navigation · Checkout Review |
| Checkout — Confirmation | `/checkout/confirmation` | Header → CheckoutStepIndicator[Confirmation] → ConfirmationReceipt (Centered) → Footer | Shell Navigation · Post Purchase |

### Runtime Correction Rules
1. ✅ StockPill → `#15803D` green for in-stock (NOT cobalt `#0057FF`) · 3 states: `in_stock / unavailable / out_of_stock`
2. ✅ PurchasePanel default mode → MINIMAL (no SKU row, no secondary CTA) unless FACTS ONLY explicitly requested
3. ✅ AttributeChips → PDP PurchasePanel + Upsell/Relation cards only · 3 features + 1 qualitative (THIRD PARTY TESTED)
4. ✅ QualitativeChips → Catalog + Vertical + Featured grids only · source-backed facts (Class/Form/Quality/Tested)
5. ✅ QuickAdd → MetricRail only, no chips · 3-col equal grid (strength | servings | purity)
6. ✅ No floating metric chips over product media · no hardcoded pixel widths on any chip/card container
7. ✅ OpenLab Verified icon → ⊗ lattice verification glyph, not generic placeholder
8. ✅ All 15 products must have governed data coordinates per Lane C product registry contract

### Sites Sync Inventory
- **Modules (1214:50):** 29 SYNC module frames covering all surface contracts
- **Routes (1214:51):** 171 route composition frames — full lifecycle coverage
- **Grid & Copy Grammar (1349:52):** 2 master grammar specs (Desktop 1440 + Mobile 390)
- **Module categories:** Shell Navigation · Your Stack · Catalogue Discovery · PDP First Fold · OpenLab Portal · Checkout Review · Account Hub · Product Compare · Support Surface · Post Purchase · Not Found · Product narrative · OpenLab tools
- **Route categories:** Checkout lifecycle · Order lifecycle · Account hub · Commerce discovery · PDP · OpenLab portal · OpenLab Batch lookup · OpenLab Methodology · OpenLab Source chain (desktop + mobile pairs)

---

## REQUIRED CODEX ACTIONS

### PRIORITY 1 — CSS Custom Properties (from Spread 1 + 3)
```css
:root {
  /* Shell */
  --shell-max-width: 1512px;
  --shell-content-width: 1344px;
  --shell-content-narrow: 1171px;
  --shell-gutter: 20px;
  --shell-gutter-wide: 48px;

  /* Section rhythm */
  --section-gap-standard: 80px;
  --section-gap-heavy: 100px;
  --section-gap-deep: 128px;
  --section-gap-tight: 24px;
  --main-content-bleed: 120px;

  /* Grid */
  --grid-gap-cards: 12px;
  --grid-gap-cards-wide: 20px;
  --grid-gap-rails: 24px;
  --grid-gap-hero: 20px;
  --grid-gap-pdp: 48px;

  /* Card */
  --card-radius: 8px;
  --card-radius-large: 10px;
  --card-padding: 24px;
  --card-padding-tight: 16px;
  --card-border: 1px solid rgb(212, 224, 242);

  /* Chip */
  --chip-attribute-icon: 25px;
  --chip-qualitative-icon: 16px;
  --chip-gap-attribute: 11px;
  --chip-gap-qualitative: 8px;

  /* Colors */
  --color-cobalt: #0057FF;
  --color-stock-green: #15803D;
  --color-border-subtle: rgb(212, 224, 242);
}
```

### PRIORITY 2 — Grid Templates (from Spread 3)
Wire grid templates per surface map — each page type uses specific grid patterns documented in Spread 3 and Spread 5.

### PRIORITY 3 — Chip Routing (from Spread 5 corrections)
Apply the corrected chip routing table from Lane B. Enforce variant-conditional rendering from Lane A.

### PRIORITY 4 — Product Registry (Lane C)
Validate all 15 products have governed data coordinates per the product data contract.

---

## ACCEPTANCE CHECKS
- [ ] All 6 page types render with correct section stacking order (Spread 4)
- [ ] CatalogueGrid collapses 4→2→1 columns at correct breakpoints
- [ ] Hero cols-2-3 split stacks vertically below 768px
- [ ] Section margins match: hero=0px, standard=80px, heavy=100px, deep=128px
- [ ] AttributeChips render in PurchasePanel; QualitativeChips render in CatalogueGrid cards
- [ ] StockPill shows #15803D for in-stock state (not cobalt)
- [ ] No chips appear in QuickAdd — MetricRail only
- [ ] PurchasePanel default mode = MINIMAL (no stray SKU row or secondary CTA)
- [ ] OpenLab Verified icon renders ⊗ lattice glyph
- [ ] All 15 products have complete governed data records
- [ ] No hardcoded pixel widths on any chip or card container
- [ ] Grid patterns match per page type (Spread 3)
- [ ] Token values match specifications (Spread 1)
- [ ] All 31 component sets render with correct variant logic

## RISK NOTES
- Stack Builder is complex (AdditionCard has 17 total variants across v1/v3)
- Grid variant selection (GridA/B/C/D) may need CMS integration
- Checkout 2/3+1/3 split is a separate grid pattern from main CatalogueGrid
- Changing StockPill color from cobalt to green affects every product page

## OPEN ITEMS
- Does Codex have a CSS variable/token system, or should these ship as raw values?
- Grid variant selection (GridA/B/C/D) — editorial-driven or content-count-driven?
- Lane C product registry — 15 products need governed data coordinate validation
