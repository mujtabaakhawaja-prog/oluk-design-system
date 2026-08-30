# FIGMA_TO_CODEX_PACKET — Unified Surface A Hierarchy: Design System → Production Containerization

**Date:** 2026-08-30 (revised)
**File:** `6R7Aq3FVGg1fOoN28IYNbH` (EVIDENCEOS-OPENLAB)
**Library:** `BEPMuUt1HroEw8xjz8CVyN` (OLUK / CANDIDATE_CONVERGENCE_v0)
**Lane:** Figma Make implementation
**Runtime boundary:** Figma Design → Figma Make boards (Run 01–09)
**Revision:** v2 — corrected Surface A/B model from marketing split to unified production hierarchy

---

## DESIGN ROLE MODEL — UNIFIED SURFACE A HIERARCHY

**There is no separate Surface B.** Surface A and Surface B are both Surface A.

- **Surface A** is the design system hierarchy: tokens, card depth, effects, typography scale, containerization patterns, and component semantics.
- **Surface B** is the production surface that **consumes** Surface A. It is NOT a consumer-facing marketing surface — it is the production container for routes, render slots, lab records, lab reports, and sub-route pages/actions.

Surface A provides the hierarchy. Surface B provides the containerization. Together they are one unified design language applied at different scales:

| Scale | What Surface A Provides | What Gets Containerized |
|-------|------------------------|------------------------|
| **Token level** | `surface/canvas`, `surface/card`, `border/card`, `--oluk-shadow-card` | Every card, panel, and section across all boards |
| **Component level** | MetricRail, QualitativeChip, StatusChip, ProductCommerceCard | Route-state badges, data panels, product entries |
| **Section level** | Card depth pattern (white lift + #CEDCF1 stroke + blue shadow + 12px radius) | Hero sections, ledger tables, chart shells, command rails |
| **Page level** | Nav bar, section rhythm, density toggles, CTA bands | Full portal pages, landing pages, evidence theater boards |
| **Route level** | Render slot containers, status rail patterns, source drawer shells | `#run01`–`#signoff` routes, `#portal`, `#labrecords`, `#methodology` |

### Proof: Run 09 Boards

The Run 09 boards (`17:34675` — Open Lab Landing Production) demonstrate the unified model:
- Surface A tokens (white cards, cobalt accents, blue-tinted shadows, canvas ground) containerize ALL production content
- Nav bar → Hero with render slots → Status rail → Search/metrics → Public report ledger → Production cards → CTA band → Followups/Actionables
- Every section uses the same OLUK card depth, the same token contract, the same component library
- The portal page is not "marketing" — it is production containerization of evidence routes using Surface A's design language

---

## SURFACE A — THE DESIGN SYSTEM HIERARCHY

**Authority Frames:**
- `104:7955` — EvidenceOS-OPENLAB-OLUK-BRANDED PRODUCTION VIEWS (design canon)
- `104:7878` — Authority Board with correct OLUK card depth (reference specimen)

**Design DNA:**
- Card-based panels: `border/card` (#CEDCF1) strokes, `--oluk-shadow-card` (rgba(22,62,132,0.18) y:20 blur:50), 12px radius
- Surface/canvas (#F7F8FC) page ground with surface/card (#FFFFFF) panel lifts
- Cobalt accent system: `accent/cobalt` (#0057FF) for CTAs, chips, interactive elements
- Status semantics: REPORT READY, SOURCE LINKED, CONTEXT REQUIRED, COMBO AUTHORITY, QA LOCKED
- Blue-tinted shadows throughout — no black shadows
- Component elevation: MetricRail + QualitativeChip use `DROP_SHADOW offset(0,5) blur(6) rgba(22,62,132,0.08)`
- Monospace route IDs, state badges, posture labels in data tables
- NO HPLC RECONSTRUCTION guardrail badges

---

## SURFACE A CONTAINERIZATION — What It Wraps

Surface A's design hierarchy has utility for containerizing:

### Evidence Theater (data-rich analytical surfaces)
- Dashboards, charts, ledgers, route-state summaries
- Command rails, source drawers, component state matrices
- Hero statement → command rail → public report ledger → chart triptych → source drawer → actionables

### Portal & Route Containers (production surface consuming Surface A)
- Portal pages, landing pages, navigation surfaces
- Product commerce cards, batch record viewers, compound family browsers
- Lab records, lab reports, and sub-route page/action containers
- Nav bar + hero + render slots + evidence sections + CTA band + footer
- Sticky header with nav: Shop → Open Lab → Reports → Lab Records

### The MF-03 Portal (`21:56730`) is Surface A consumed:
- **Header node:** `21:56732` (h:80) — nav + delivery trust strip (Surface A tokens)
- **Main Content node:** `21:56773` (h:5428) — all sections containerized with Surface A card depth
- **Footer node:** `21:57816` (h:384) — sitemap + trust footer (Surface A tokens)
- Every section in MF-03 should render with OLUK card depth, cobalt accents, canvas ground — because it IS Surface A

---

## AUTHORITY NODES

| Node | ID | Role | Hierarchy Position |
|------|-----|------|-------------------|
| Production Views | `104:7955` | Surface A design canon | Design system authority |
| Authority Board | `104:7878` | OLUK card depth specimen | Design system reference |
| PART 5 | `104:7877` | Cards/actionables authority | Design system components |
| Primitive Token Board | `104:5082` | OLUK token specimen | Design system foundation |
| CSS Token Board | `104:5195` | Runtime intake / CSS mapping | Design system bridge |
| Canvas Shape — Tokens | `104:7739` | CSS custom properties reference | Design system bridge |
| MF-03 Portal | `21:56730` | Portal containerization master | Production consuming Surface A |
| MF-03 App | `21:56731` | Portal app shell (1512×5892) | Production consuming Surface A |
| Run 09 Landing | `17:34675` | Open Lab Landing Production | Production consuming Surface A |
| Run 09 Boards | `17:32059`, `17:34675` | Runtime Production boards | Production consuming Surface A |
| OLUK Library | file:`BEPMuUt1HroEw8xjz8CVyN` | Variable/component source | Design system source of truth |

---

## OLUK TOKEN CONTRACT (The Unified Foundation)

| Token | Hex | Variable ID | Usage |
|-------|-----|-------------|-------|
| `surface/canvas` | #F7F8FC | `VariableID:eb855d42.../652:36` | Page ground everywhere |
| `surface/card` | #FFFFFF | `VariableID:a259d3cd.../2319:37` | Card/panel lift everywhere |
| `surface/family` | — | `VariableID:ed40246f.../2319:38` | Compound family sections |
| `surface/cobalt-soft` | #EEF4FF | `VariableID:7fe2b61e.../2319:40` | Chip fills, soft accent |
| `border/card` | #CEDCF1 | `VariableID:9f42cd3b.../2319:42` | Card borders, table dividers |
| `border/strong` | #AFC8FF | `VariableID:fd00a0d1.../2319:43` | Focus rings, active borders |
| `border/chip` | — | `VariableID:b1d9d907.../2319:119` | Chip outlines |
| `text/primary` | #141827 | `VariableID:c66a6aed.../2319:45` | Headings, body text |
| `text/secondary` | #53617D | `VariableID:1338e128.../2319:46` | Descriptions, captions |
| `text/muted` | — | `VariableID:8ecb5c79.../2319:47` | Tertiary/muted text |
| `text/on-inverse` | — | `VariableID:13d6d633.../2319:48` | Text on dark/inverse fills |
| `accent/cobalt` | #0057FF | `VariableID:dfa46633.../2319:50` | CTAs, interactive, chips |
| `status/success` | — | `VariableID:2a517071.../2319:53` | Success states (NOT inventory) |
| `--oluk-shadow-card` | rgba(22,62,132,0.18) y:20 blur:50 | Effect token (not variable) | Card/chip elevation |
| `--oluk-radius-metric` | 12px | Dimensions collection | Card/chart shell radius |

---

## FIGMA MAKE IMPLEMENTATION PLAN

### PHASE 1 — Token & Variable Foundation (5 actions)

| # | Action | Scope |
|---|--------|-------|
| 1.1 | Publish OLUK library with all 98 variables + shadow effect style | File → Libraries in `BEPMuUt1HroEw8xjz8CVyN` |
| 1.2 | Subscribe all Make boards (Run 01–09) to published OLUK library | Each Make board file |
| 1.3 | Verify dual-mode variable inheritance (light ↔ dark) on Make boards | NO-BULK-REMAP: visual inspection only |
| 1.4 | Bind all stale hex fills to OLUK semantic variables on token boards | `104:5082`, `104:5195`, `104:7739` |
| 1.5 | Export updated `tokens.css` and `tokens.json` to `/export/tokens/` | GitHub push |

### PHASE 2 — Evidence Theater: Surface A for Analytical Containerization (15 actions)

These boards demonstrate Surface A containerizing data-rich analytical content.

| # | Action | Target Board | Figma Make Task |
|---|--------|-------------|------------------|
| 2.1 | Build Hero Statement section | Run 01 | "Built for precision" hero with research-grade kicker |
| 2.2 | Build Command Rail component | Run 02 | Search + status filter chips + report/public-linked counters |
| 2.3 | Build Public Report Ledger table | Run 03 | 5-column route table with state badges + action CTAs |
| 2.4 | Build Chart Triptych (Status/Reports/Gate) | Run 04 | Three chart shells with NO HPLC badges |
| 2.5 | Build SourceDrawer component | Run 05 | Expandable drawer with open-source/report-page/methodology links |
| 2.6 | Build Component State Matrix | Run 06 | Status × component grid with version tags |
| 2.7 | Build Followups/Actionables strip | Run 07 | 5-card horizontal strip (01–05) with OLUK card depth |
| 2.8 | Build Quick sidebar | Run 08 | Route-group cards (SARMs/Peptides/Longevity) with Add CTAs |
| 2.9 | Build Context Gated + Display Link Failures panels | Run 04 | Metric panels with zero-state counters |
| 2.10 | Wire Compact/Comfort density toggle | Run 01 | Toggle switches card padding/spacing tokens |
| 2.11 | Build Native Ledger Table (desktop) | Run 04 | 6-row route table with mode badges + action links |
| 2.12 | Build Native Ledger Table (mobile) | Run 04 | Responsive stack layout of ledger rows |
| 2.13 | Build Responsive Behavior Board | Run 04 | Desktop topbar ↔ mobile wrapped variants |
| 2.14 | Build Status Distribution donut chart | Run 04 | 5-segment donut with legend |
| 2.15 | Build Reports by Year line chart | Run 04 | Year-over-year line chart shell |

### PHASE 3 — Portal Routes: Surface A Containerizing Production Pages (15 actions)

These boards demonstrate Surface A containerizing portal routes, render slots, lab records, and sub-route actions. The portal is NOT a marketing surface — it is production that consumes Surface A's hierarchy.

| # | Action | Target | Figma Make Task |
|---|--------|--------|------------------|
| 3.1 | Build Portal Header with trust strip + nav | Portal | Delivery badges + Shop/Open Lab/Reports/Lab Records nav — using Surface A tokens |
| 3.2 | Build Portal Hero section | Portal | Render slots + status rail — Surface A card depth containerizing hero content |
| 3.3 | Build Featured Product Card (MK-2866) | Portal | Product image + name + MetricRail + QualitativeChip + price — Surface A components |
| 3.4 | Build Live Batch Verification Feed | Portal | 4-column batch ID table — Surface A ledger pattern |
| 3.5 | Build Evidence Section | Portal | Evidence narrative using Surface A containerization of lab proof sections |
| 3.6 | Build Evidence Ledger icon strip | Portal | 6 icons: Identity/Purity/Concentration/Janoshik/Tamper/Batch |
| 3.7 | Build Browse by Compound Family section | Portal | 4-column grid — Surface A card depth on category cards |
| 3.8 | Build Compact Card Density Floor | Portal | QuickAdd product grid with MetricRail — Surface A component system |
| 3.9 | Build Batch Record Viewer | Lab Records | Certificate of analysis + HPLC chart — Surface A containerizing lab record data |
| 3.10 | Build Portal Summary table | Portal | Route-group table — Surface A ledger pattern with pass rates + dates |
| 3.11 | Build Portal Footer | Portal | Sitemap columns — Surface A tokens for typography/spacing |
| 3.12 | Build Lab Report Sub-route Container | Lab Reports | Surface A containerizing individual lab report pages and actions |
| 3.13 | Build PurchasePanel (Standard PDP) | PDP | node `2341:20452` authority (from OLUK library) — Surface A depth |
| 3.14 | Wire compound family browse navigation | Portal | Category cards → filtered catalogue route |
| 3.15 | Build Methodology + Source Origin pages | Sub-routes | Surface A containerizing testing methodology and source origin actions |

### PHASE 4 — Component Promotion & Cleanup (10 actions)

| # | Action | Scope | Task |
|---|--------|-------|------|
| 4.1 | Componentize ProductCommerceCard family | Library | Convert Grid/QuickAdd/Featured/PDP variants to component set |
| 4.2 | Componentize CompactCard with portrait media | Library | Fix 200×240 portrait orientation, promote to component |
| 4.3 | Deprecate AttributeChip v3 | Library | Hide v3, v4 canvas is accepted authority |
| 4.4 | Promote PurchasePanel with radius/purchase (28px) binding | Library | Apply VariableID:634:61 |
| 4.5 | Clean green/success misappropriation | Library | `863:24842`, `1489:422` → reference OLUK/StockPill |
| 4.6 | Publish --oluk-shadow-card as effect style | Library | Publishable elevation for cards/chips/panels |
| 4.7 | Create "Evidence Theater" page template in Make | Make | Preset with hero + command rail + ledger + charts (Surface A analytical) |
| 4.8 | Create "Route Container" page template in Make | Make | Preset with header + render slots + content sections + footer (Surface A portal) |
| 4.9 | Verify all Run 01–09 boards use OLUK card depth | Verification | Screenshot audit — no black shadows, no stale strokes |
| 4.10 | Final stale color audit across entire file | Verification | Zero instances of #050807, #F7F8F5, #586170, #7B8490, #2D74FF |

---

## STALE COLOR ERADICATION STATUS

| Color | Old Hex | OLUK Replacement | Status |
|-------|---------|------------------|--------|
| Primary text | #050807 | #141827 (text/primary) | ✅ Cleared in PART 4, PART 5, 3 Run boards |
| Beige background | #F7F8F5 | #FFFFFF (surface/card) | ✅ Cleared + variable bound |
| Secondary text | #586170 | #53617D (text/secondary) | ✅ Cleared in PART 4, 3 Run boards |
| Tertiary text | #7B8490 | #53617D (text/secondary) | ✅ Cleared in PART 4, 3 Run boards |
| Stale cobalt | #2D74FF | #0057FF (accent/cobalt) | ✅ Cleared in PART 4, 3 Run boards |
| Black shadow | rgba(0,0,0,0.22) | rgba(22,62,132,0.18) | ✅ 37 shadows corrected |

## GUARDRAILS

- ❌ **NO BULK REMAP** — No tolerance-based color matching across the node tree
- ❌ **NO variable override** on Make boards — dark mode IS correct on dual-mode boards
- ✅ **Surgical only** — exact hex match on unbound nodes, one frame at a time
- ✅ **Design-first** — data serves the design; the design does not serve the data
- ✅ **Layer 1 decision** — every route renders fully populated, no unavailable badges
- ✅ **Unified hierarchy** — Surface A IS the design language, everything else consumes it

---

## ACCEPTANCE CHECKS

- [ ] All 45 actions tracked in Figma Make task board
- [ ] OLUK library published with shadow effect style
- [ ] Zero stale colors in file-wide audit
- [ ] Evidence Theater boards (Run 01–09) use Surface A card depth + token contract
- [ ] Portal boards use Surface A card depth + token contract (NOT a separate visual language)
- [ ] Run 09 Landing Production demonstrates unified containerization pattern
- [ ] Lab records, lab reports, and sub-route pages containerized with Surface A
- [ ] PurchasePanel authority (`2341:20452`) applied to all adaptive states
- [ ] CompactCard portrait orientation fixed (200×240)
- [ ] AttributeChip v3 deprecated, v4 authority
- [ ] Token boards (`104:5082`, `104:5195`, `104:7739`) reflect true hybrid state
- [ ] No editor artifacts (COPY BOUNDARY, VARIANT 01) in production output

## RISK NOTES

- PurchasePanel authority `2341:20452` lives in OLUK library file, not working file — cross-file reference required
- Shadow effect token is CSS composite, not a single Figma variable — published as effect style instead
- Portal sections reference product photography assets that need image slots in Make
- Run boards have dual-mode variables — never override variable-bound colors
- The unified model means portal design QA uses the SAME token audit as evidence theater — no separate "marketing" pass needed

## OPEN ITEMS

- [ ] Confirm PurchasePanel `2341:20452` node location and extract for Make boards
- [ ] Determine which Run boards map 1:1 to Evidence Theater sections vs. need new boards
- [ ] Asset export for portal product photography (MK-2866 hero, compound family thumbnails)
- [ ] Mobile responsive variants for command rail, ledger table, and portal hero
- [ ] Verify MF-03 Portal (`21:56730`) sections all inherit OLUK card depth — currently mixed
- [ ] Lab report sub-route container template (new in v2 — Surface A containerizing report pages)
