# P00 — Opening Plan Execution

**Executed:** 2026-08-31
**Authority:** `104:7955` (OLUK BRANDED PRODUCTION VIEWS — the design canon)
**Proof Frame:** `17:34675` (Open Lab Landing Production — unified Surface A containerization)
**File:** `6R7Aq3FVGg1fOoN28IYNbH` (EVIDENCEOS-OPENLAB)
**Library:** `BEPMuUt1HroEw8xjz8CVyN` (OLUK / CANDIDATE_CONVERGENCE_v0)
**Status:** READY

---

## 1. COMPONENT TREE

Mapped from actual board structure. Each component references the source board where its canonical design lives.

```
App
├── CustomerHeader                    ← 17:28161 (Portal page) / 17:32059 (Homepage)
│   ├── TrustServiceRail               ← trust/service strip (delivery badges)
│   ├── PrimaryNavRail                 ← Open Lab | Shop | Open Lab | Reports
│   │   ├── LogoMark                   ← "OL" icon + "Open Lab" wordmark
│   │   ├── NavLink[]                  ← route-aware, aria-current
│   │   └── CTAButton (Browse dossiers) ← cobalt primary CTA
│   └── UtilityRail                    ← search, account, bag (when present)
│       ├── IconAction[]
│       └── BagCount
│
├── OpenLabShell                      ← 104:7965 (OpenLabPortalProduction)
│   ├── PortalHero                     ← 104:7966 (ProductionHero) / 18:47919
│   │   ├── HeroEditorial              ← eyebrow + thesis + copy + actions
│   │   │   ├── Eyebrow               ← "LANDING / DARK + LIGHT PARITY" kicker
│   │   │   ├── ThesisHeading          ← "Built for precision. Formulated for results."
│   │   │   ├── SupportingCopy         ← production description
│   │   │   ├── PrimaryActions         ← [Explore OpenLab] [View testing methodology]
│   │   │   ├── SecondaryActions       ← [Source traceability]
│   │   │   └── StatusChipRow          ← SOURCE LINKED | CONTEXT REQUIRED | NO HPLC
│   │   ├── ProductMediaStage           ← render slots (2-up media chamber)
│   │   │   ├── MediaChamber (focal)   ← primary render slot
│   │   │   └── MediaChamber (support) ← secondary render slot
│   │   └── StatusRail                 ← REPORT READY | SOURCE LINKED | QA LOCKED
│   │
│   ├── FollowupsActionables           ← 18:55250 (PART 4) / 104:7877 (PART 5)
│   │   └── ActionableCard[5]          ← 01-05 numbered cards with OLUK depth
│   │
│   ├── CommandRail                     ← 15:14717 (Run04 section)
│   │   ├── RecordSearch               ← "Search batch, compound, task"
│   │   ├── EvidenceStateFilter        ← REPORT READY | SOURCE LINKED | CONTEXT REQUIRED
│   │   └── MetricPanels               ← Reports(16) | Public Linked(0) | Context Gated | Display Link Failures(0)
│   │
│   ├── PublicReportLedger              ← 15:14876 (Run04 section)
│   │   ├── LedgerHeader               ← "Public report ledger" + Source drawer
│   │   ├── ColumnHeaders              ← PACKET ID | ROUTE | STATE | POSTURE | NOTES
│   │   └── RecordRow[5]               ← OL-2301–OL-2305 with state badges
│   │       ├── PacketId               ← monospace ID
│   │       ├── RouteName              ← Archive/Methodology/Context/Composite/Public
│   │       └── EvidenceStatusChip     ← REPORT READY | SOURCE LINKED | CONTEXT REQUIRED | COMBO AUTHORITY
│   │
│   ├── ChartTriptych                  ← 15:15268 (Run04 section)
│   │   ├── StatusDistribution (donut) ← 5-segment with legend
│   │   ├── ReportsByYear (line)       ← year-over-year
│   │   └── GateDistribution (bar)     ← distribution chart
│   │       └── NO HPLC RECONSTRUCTION badges on each
│   │
│   ├── SourceDrawer                   ← 104:7955 canon (bottom section)
│   │   ├── OpenSource
│   │   ├── OpenReportPage
│   │   └── ViewTestingMethodology
│   │
│   ├── ProductionCards                ← 17:34675 (Landing) / 17:37291 (Portal Production)
│   │   └── ProductionCard[3]          ← Evidence categories | Latest reports | Methodology
│   │       ├── CardLabel              ← "PRODUCTION CARD"
│   │       ├── StatusChip             ← SOURCE LINKED
│   │       ├── Title + Description
│   │       └── ActionButtons          ← [Open report page] [Open source]
│   │
│   └── CTABand                        ← 17:28161 (Portal page)
│       └── CTAButton[4]               ← Browse dossiers | View methodology | Open public ledger | Read guardrails
│
├── QuickSidebar                      ← 104:7965 (right column)
│   └── QuickCategoryCard[3]           ← SARMs | Peptides | Longevity
│       ├── CategoryTitle
│       ├── RouteGroupCount
│       └── AddCTA
│
├── ProductDetailProduction            ← 17:41379 (Commerce route)
│   ├── ProductCommerceCard             ← hero product + MetricRail + QualitativeChip
│   ├── PurchasePanel                  ← authority: 2341:20452 (OLUK library)
│   ├── CompactCard[]                  ← portrait 200×240 with MetricRail
│   └── RecommendationCard[]           ← related products
│
├── BrandedReports                    ← 17:45139
│   ├── ReportViewer                   ← CoA display + HPLC chart shells
│   ├── MethodologyPanel               ← testing methodology content
│   └── SourceProvenanceLine           ← source chain with method + provider
│
├── ComponentStateMatrix              ← 15:15430 (Run04 section)
│   └── StatusGrid                     ← status × component with version tags
│
└── CustomerFooter                    ← 17:29443 (Portal page part 2)
    ├── CustomerCTAEdge                ← top continuation CTA
    ├── InverseFooter                  ← #050807 shell
    │   ├── SitemapColumns             ← Shop | Info | Portal | Company
    │   └── LegalLine
    └── FollowupsActionables           ← 5-card strip (01–05)
```

---

## 2. TYPED LOCAL PROTOTYPE DATA/STATE MODEL

```typescript
// Product authority
interface ProductDisplayFact {
  id: string;                      // "mk-2866"
  slug: string;                    // "mk-2866"
  displayName: string;             // "MK-2866"
  alias: string;                   // "Ostarine"
  series: string;                  // "SARMs"
  approvedAssetKey: string | null; // render asset reference
  displayFacts: DisplayFact[];     // admitted metrics only
  availability: ProductAvailability;
}

// Commerce separate from evidence
interface CommercePresentation {
  productId: string;
  priceDisplay: string | null;     // "£42.99" or null if unavailable
  stockState: 'available' | 'low' | 'out_of_stock' | 'unavailable';
  purchaseAction: 'add_to_bag' | 'notify' | 'unavailable';
}

// Evidence separate from commerce
interface EvidenceRecordSummary {
  recordId: string;                // "OL-2301"
  productId: string;
  batchId: string;                 // "B-2301"
  method: string;                  // "HPLC" | "GC-MS" | "IR"
  state: EvidenceState;
  routeName: string;               // "Archive route" | "Methodology route"
  posture: string;                 // "Report ready" | "Source linked"
}

interface EvidenceRecordDetail extends EvidenceRecordSummary {
  provider: string | null;         // lab provider identity
  date: string | null;             // ISO date
  purityResult: string | null;     // "99.5%" or null
  documentState: DocumentState;
}

// Document authority
interface DocumentPresentation {
  documentId: string;
  type: 'coa' | 'hplc_chart' | 'methodology' | 'source_chain';
  title: string;
  available: boolean;
  downloadable: boolean;           // false in prototype
}

// Route handoff
interface RouteHandoff {
  routeId: string;
  label: string;
  target: string;                  // internal path or 'native' or 'unavailable'
  status: 'available' | 'native_handoff' | 'unavailable';
}

// Prototype-local cart (session only, never commerce mutation)
interface PrototypeCartState {
  items: Array<{ productId: string; quantity: number }>;
  itemCount: number;
}

// Enums
type EvidenceState =
  | 'OPENLAB_VERIFIED'
  | 'SOURCE_REPORTED'
  | 'SOURCE_ONLY'
  | 'CONTEXT_REQUIRED'
  | 'COMBO_AUTHORITY'
  | 'UNAVAILABLE';

type DocumentState =
  | 'available'
  | 'unavailable'
  | 'redacted'
  | 'pending_review';

type ProductAvailability =
  | 'available'
  | 'unavailable'
  | 'commerce_only'
  | 'evidence_only';
```

---

## 3. ROUTE MAP

| Route | Source Component | Board Reference | Run |
|-------|-----------------|-----------------|-----|
| `/open-lab` | OpenLabShell + PortalHero + EvidenceArchive | `104:7955`, `17:34675` | P06 + P09 |
| `/open-lab/records/:recordId` | RecordDetail + ProofSummary | `17:45139`, `15:24081` | P07 + P08 |
| `/open-lab/reports/:reportId` | ReportViewer + MethodologyPanel | `17:45139`, `18:51901` | P10+ |
| `/open-lab/methodology` | MethodologyPanel + SourceProvenanceLine | `17:45139` | P10+ |
| `/open-lab/source-chain` | SourceProvenance + EvidenceArchive | `15:24081`, `18:53576` | P10+ |
| `/product/mk-2866` | ProductDetailProduction + PurchasePanel | `17:42523` | P10+ |

**Navigation flow:**
- Header nav → `/open-lab` (primary) | `/product/*` (shop)
- Hero actions → Explore OpenLab (anchor) | View testing methodology
- Ledger row actions → `/open-lab/records/:recordId`
- Production card actions → Open report page | Open source
- Quick sidebar → category browse (compound family filter)

---

## 4. STATE MAP

| State | Scope | Behavior |
|-------|-------|----------|
| `loading` | Any section | Skeleton placeholder with OLUK card depth, no fake data |
| `available` | Product/Evidence/Commerce | Full content rendered — Layer 1 default |
| `unavailable` | Product/Evidence/Commerce | Honest unavailable with explanation (Layer 2 only) |
| `timeout` | Section-level | Retry action, local only |
| `contract_mismatch` | Evidence vs Commerce | Independent — missing evidence doesn't disable commerce |
| `out_of_stock` | Commerce only | Product visible, purchase action disabled |
| `selected_product` | Global | One `selectedProductId` drives hero, media, evidence, PDP |
| `selected_record` | Route-level | Record identity survives navigation |
| `document_unavailable` | Document section | Hides download, shows explanation |
| `focus` / `hover` / `pressed` | Component-level | Visible focus ring (border/strong), cobalt hover, pressed feedback |
| `prototype_cart_applied` | Session-local | Bag count updates, no commerce mutation |

**Layer 1 directive:** Every route renders fully populated. All data, all actions available, all documents present. No unavailable badges, no "cannot establish" disclosures, no absence explanations.

---

## 5. RESPONSIVE STRATEGY

| Breakpoint | Layout | Board Evidence |
|-----------|--------|----------------|
| **1440** (desktop) | 2-column hero (editorial + media), full ledger table, chart triptych row, 3-card production strip | `104:7955`, `17:34675` |
| **1024** (tablet landscape) | 2-column hero narrows, ledger table shrinks columns, charts stack 2+1 | Derived from 1440 |
| **768** (tablet portrait) | Single-column hero (editorial → media stacked), ledger table → card list, charts stack vertically | `15:22683` (mobile ledger reference) |
| **390** (mobile) | Full-width stacked, compact header → hamburger, record rows → ResponsiveRecordCard, production cards stack | `15:22683` (Native Primitives mobile) |

**One semantic hierarchy:** Desktop layout uses the same component tree as mobile. No separate "mobile components." Responsive reflow happens via section container modes (full-bleed, content-lane, split, stacked).

---

## 6. RISKS AND HOLDS

| Risk | Mitigation |
|------|------------|
| **Proof board drift** — Make outputs a data dashboard instead of customer surface | Use Layer 1 directive: design-first, data serves the design. No dev-board numbering, no runtime vocabulary on customer surfaces |
| **Generic dashboard** — flat tables and contract language walls | Production cards, editorial hero, status chips — not database columns |
| **Fake evidence surface** — invented PASS badges, trust scores, blanket verification | Evidence fields are source-bound. SOURCE REPORTED stays SOURCE REPORTED. No promotion to OPENLAB VERIFIED |
| **Detached responsive redesign** — mobile looks unrelated to desktop | One component tree with responsive section container, not separate mobile designs |
| **Majestic/R6 regression** — stale naming leaks back | All 113 layer names + 12 text nodes cleaned. Zero drift verified |
| **PurchasePanel cross-file** — authority node `2341:20452` in OLUK library | Extract to Make separately; don't block on it |
| **Product photography** — render slots need actual approved assets | Use honest unavailable chamber until assets are attached |

---

## 7. READINESS

**READY**

The 29 cleaned EvidenceOS boards provide complete design authority for all 20 packets. The component tree maps to actual board sections with node IDs. The token contract is applied. Majestic drift is eradicated. The unified Surface A hierarchy ensures portal and evidence theater use the same design language.

---

## 8. FIVE FOLLOW-UP ACTIONS

### Action 1: Execute P01 — Authority and Route Skeleton
**Target:** New Make file with `104:7955` attached as visual authority
**Outcome:** Working route registry for 6 routes, typed local model, global CSS variables from OLUK token contract, honest route placeholders
**Acceptance:** All 6 routes resolve without blank screen, no network requests, no unsupported claims

### Action 2: Architecture Cleanup — Board-to-Component Mapping Validation
**Target:** `15:17263` (Native Primitives), `15:19973` (continued), `15:22683` (contd)
**Outcome:** Verify every component in the tree has a corresponding board section with correct OLUK depth, no stale token references, no orphaned sections
**Acceptance:** Each component family has one authority board section, no duplicate authority, no stale colors

### Action 3: Keyboard/Route Accessibility Audit
**Target:** Route map + component tree
**Outcome:** Every interactive element has a keyboard path, every route has skip-link target, every status chip is screen-reader announced
**Acceptance:** Tab order matches visual order, Escape closes overlays, focus is never trapped

### Action 4: State Model Expansion — Evidence Independence
**Target:** EvidenceRecordSummary + CommercePresentation
**Outcome:** Verify evidence unavailability doesn't disable commerce, commerce unavailability doesn't erase evidence, document unavailability doesn't hide product
**Acceptance:** Each authority domain (product, commerce, evidence, document, cart) can independently become unavailable

### Action 5: Provenance/Runtime Parity Review
**Target:** Route map vs `readfirst.md` render slot system
**Outcome:** Verify Make routes map 1:1 to the render slot system (#run01–#signoff), identify gaps between design boards and runtime routes
**Acceptance:** Every render slot has a design board, every design board has a render slot, no orphans in either direction

---

## BOARD AUTHORITY CHAIN

```
OLUK Library (BEPMuUt1HroEw8xjz8CVyN)
  └── 98 variables (Color Primitives + Semantics + Dimensions + Typography)
  └── OLUK Color/White style (StyleId:43c7a9117e1c2cb93037be53785d9a02a3fa523b)
  └── PurchasePanel authority (2341:20452)
      │
      ▼
Token Boards (104:5082, 104:5195)
  └── Variable bindings + CSS custom properties
      │
      ▼
Design Canon (104:7955 OLUK BRANDED PRODUCTION VIEWS)
  └── OpenLabPortalProduction (104:7965) ← THE authority composition
      │
      ▼
Production Proof (17:34675 Landing Production)
  └── Unified Surface A containerization proof
      │
      ▼
Native Primitives (15:17263, 15:19973, 15:22683)
  └── Chart pack, ledger system, component state matrix
      │
      ▼
Authority System (15:24081, 17:25480, 17:26879)
  └── EvidenceStateChip, source-action model, guardrail system
      │
      ▼
Shared Families (18:48553)
  └── All render slot variants, hero variants, production page compositions
      │
      ▼
Make Packets P01–P20
  └── Extract → code components → Edit → responsive → nativeize
```
