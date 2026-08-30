# FIGMA_TO_CODEX_PACKET — Evidence Theater + Portal Navigation Design Role Split

**Date:** 2026-08-30
**File:** `6R7Aq3FVGg1fOoN28IYNbH` (EVIDENCEOS-OPENLAB)
**Library:** `BEPMuUt1HroEw8xjz8CVyN` (OLUK / CANDIDATE_CONVERGENCE_v0)
**Lane:** Figma Make implementation
**Runtime boundary:** Figma Design → Figma Make boards (Run 01–09)

---

## DESIGN ROLE SPLIT — THE DECISION

Two distinct design surfaces serve two distinct purposes:

### Surface A: Evidence Theater (Production Views)
**Authority Frame:** `104:7955` — EvidenceOS-OPENLAB-OLUK-BRANDED PRODUCTION VIEWS
**Purpose:** Data-rich analytical surfaces — dashboards, charts, ledgers, route-state summaries, command rails, source drawers, component state matrices.

**Design DNA:**
- Dashboard-first layout: hero statement → command rail → public report ledger → chart triptych → source drawer → actionables
- Card-based panels with OLUK card depth: `border/card` (#CEDCF1) strokes, `--oluk-shadow-card` (rgba(22,62,132,0.18) y:20 blur:50), 12px radius
- Surface/canvas (#F7F8FC) page ground with surface/card (#FFFFFF) panel lifts
- Route-state chips with status semantics (REPORT READY, SOURCE LINKED, CONTEXT REQUIRED, COMBO AUTHORITY)
- Data tables with monospace route IDs, state badges, posture labels, and action CTAs
- Chart shells for Status Distribution (donut), Reports by Year (line), Gate Distribution (bar)
- NO HPLC RECONSTRUCTION guardrail badges
- Compact/Comfort density toggle

**Figma Make Routes This Serves:**
- `#run01` through `#run09` — All Run boards
- `#evidenceauthority` — Evidence Authority Core
- `#publicledger` — Public Ledger Command Center
- `#nativeledger` — Native Ledger systems
- `#filteredsource` — Filtered Source Actions
- `#selectedreport` — Selected Report Dashboard
- `#completionqa` — Completion QA
- `#runtimeproofs` — Runtime Proofs
- `#qareadback` — QA Readback
- `#signoff` — Guardrail Sign-off

---

### Surface B: Portal & Navigation (MF-03 OPENLAB PORTAL)
**Authority Frame:** `21:56730` — MF-03 OPENLABN PORTAL (1512×6650)
**Purpose:** Consumer-facing portal, product showcase, navigation, commerce surfaces, evidence marketing.

**Design DNA:**
- Full-width marketing hero with product photography and trust badges
- "Proof built into every batch" — evidence-as-brand narrative sections
- Product commerce cards (Compact/QuickAdd density floor) with MetricRail + QualitativeChip
- Batch record viewer with HPLC chart visualization
- Browse-by-compound-family navigation (SARMs, Prohormones, Research Chemicals, Stacks)
- Live batch verification feed with real percentage data
- Portal summary tables with route-group counts
- Evidence ledger iconography (Identity Tested, Purity Measured, Concentration Confirms, Janoshik Verified, Tamper-Proof Sealed, Batch Traceable)
- Sticky header with nav: Shop → Open Lab → Reports → Lab Records
- Footer with full sitemap and trust reassurance

**Header node:** `21:56732` (h:80) — Sticky nav with delivery trust strip + main nav
**Main Content node:** `21:56773` (h:5428) — All portal sections
**Footer node:** `21:57816` (h:384) — Sitemap + trust footer

**Figma Make Routes This Serves:**
- `#portal` / `#home` — Landing/portal page
- `#catalogue` — Product catalogue/browse
- `#pdp` — Product detail pages (PurchasePanel)
- `#labrecords` — Lab record viewer
- `#methodology` — Testing methodology
- `#sourceorigin` — Source origin pages
- `#compoundfamily` — Compound family browser

---

## AUTHORITY NODES

| Node | ID | Role | Surface |
|------|-----|------|--------|
| Production Views | `104:7955` | Evidence Theater master | A |
| PART 5 | `104:7877` | Evidence Theater cards/actionables | A |
| Primitive Token Board | `104:5082` | OLUK token specimen | Shared |
| CSS Token Board | `104:5195` | Runtime intake / CSS mapping | Shared |
| Canvas Shape — Tokens | `104:7739` | CSS custom properties reference | Shared |
| MF-03 Portal | `21:56730` | Portal & Navigation master | B |
| MF-03 App | `21:56731` | Portal app shell (1512×5892) | B |
| OLUK Library | file:`BEPMuUt1HroEw8xjz8CVyN` | Variable/component source | Shared |

---

## OLUK TOKEN CONTRACT (Shared Across Both Surfaces)

| Token | Hex | Variable ID | Usage |
|-------|-----|-------------|-------|
| `surface/canvas` | #F7F8FC | `VariableID:eb855d42.../652:36` | Page ground (both surfaces) |
| `surface/card` | #FFFFFF | `VariableID:a259d3cd.../2319:37` | Card/panel lift (both surfaces) |
| `border/card` | #CEDCF1 | `VariableID:9f42cd3b.../2319:42` | Card borders, table dividers |
| `border/strong` | #AFC8FF | `VariableID:fd00a0d1.../2319:43` | Focus rings, active borders |
| `text/primary` | #141827 | `VariableID:c66a6aed.../2319:45` | Headings, body text |
| `text/secondary` | #53617D | `VariableID:1338e128.../2319:46` | Descriptions, captions |
| `accent/cobalt` | #0057FF | `VariableID:dfa46633.../2319:50` | CTAs, interactive, chips |
| `surface/cobalt-soft` | #EEF4FF | `VariableID:7fe2b61e.../2319:40` | Chip fills, soft accent |
| `--oluk-shadow-card` | rgba(22,62,132,0.18) y:20 blur:50 | Effect token (not variable) | Card/chip elevation |
| `--oluk-radius-metric` | 12px | Dimensions collection | Card/chart shell radius |

---

## FIGMA MAKE IMPLEMENTATION PLAN

### PHASE 1 — Token & Variable Foundation (5 actions)

| # | Action | Surface | Scope |
|---|--------|---------|-------|
| 1.1 | Publish OLUK library with all 98 variables + shadow effect style | Shared | File → Libraries in `BEPMuUt1HroEw8xjz8CVyN` |
| 1.2 | Subscribe all Make boards (Run 01–09) to published OLUK library | Shared | Each Make board file |
| 1.3 | Verify dual-mode variable inheritance (light ↔ dark) on Make boards | Shared | NO-BULK-REMAP: visual inspection only |
| 1.4 | Bind all stale hex fills to OLUK semantic variables on token boards | Shared | `104:5082`, `104:5195`, `104:7739` |
| 1.5 | Export updated `tokens.css` and `tokens.json` to `/export/tokens/` | Shared | GitHub push |

### PHASE 2 — Evidence Theater Boards (15 actions)

| # | Action | Target Board | Figma Make Task |
|---|--------|-------------|------------------|
| 2.1 | Build Hero Statement section | Run 01 | "Built for precision" hero with research-grade kicker |
| 2.2 | Build Command Rail component | Run 02 | Search + status filter chips + report/public-linked counters |
| 2.3 | Build Public Report Ledger table | Run 03 | 5-column route table with state badges + action CTAs |
| 2.4 | Build Chart Triptych (Status/Reports/Gate) | Run 04 | Three chart shells with NO HPLC badges |
| 2.5 | Build SourceDrawer component | Run 05 | Expandable drawer with open-source/report-page/methodology links |
| 2.6 | Build Component State Matrix | Run 06 | Status × component grid with version tags |
| 2.7 | Build Followups/Actionables strip | Run 07 | 5-card horizontal strip (01–05) with OLUK card depth |
| 2.8 | Build Quick/Quick sidebar | Run 08 | Route-group cards (SARMs/Peptides/Longevity) with Add CTAs |
| 2.9 | Build Context Gated + Display Link Failures panels | Run 04 | Metric panels with zero-state counters |
| 2.10 | Wire Compact/Comfort density toggle | Run 01 | Toggle switches card padding/spacing tokens |
| 2.11 | Build Native Ledger Table (desktop) | Run 04 | 6-row route table with mode badges + action links |
| 2.12 | Build Native Ledger Table (mobile) | Run 04 | Responsive stack layout of ledger rows |
| 2.13 | Build Responsive Behavior Board | Run 04 | Desktop topbar ↔ mobile wrapped variants |
| 2.14 | Build Status Distribution donut chart | Run 04 | 5-segment donut with legend (Report ready, Source linked, etc.) |
| 2.15 | Build Reports by Year line chart | Run 04 | Year-over-year line chart shell |

### PHASE 3 — Portal & Navigation Boards (15 actions)

| # | Action | Target | Figma Make Task |
|---|--------|--------|------------------|
| 3.1 | Build Portal Header with trust strip + nav | Portal | Delivery badges + Shop/Open Lab/Reports/Lab Records nav |
| 3.2 | Build Portal Hero section | Portal | "Shop the range and verify every batch" + product photography |
| 3.3 | Build Featured Product Card (MK-2866) | Portal | Product image + name + MetricRail + QualitativeChip + price + CTA |
| 3.4 | Build Live Batch Verification Feed | Portal | 4-column batch ID table with pass percentages |
| 3.5 | Build "Proof built into every batch" evidence section | Portal | Full-bleed product hero + trust statement |
| 3.6 | Build Evidence Ledger icon strip | Portal | 6 icons: Identity/Purity/Concentration/Janoshik/Tamper/Batch |
| 3.7 | Build Browse by Compound Family section | Portal | 4-column grid: SARMs/Prohormones/Research Chemicals/Stacks |
| 3.8 | Build Compact Card Density Floor | Portal | QuickAdd product grid with MetricRail + price + Add to bag |
| 3.9 | Build Batch Record Viewer | Lab Records | Certificate of analysis + HPLC chart + compound metadata |
| 3.10 | Build Portal Summary table | Portal | Route-group table with pass rates + dates |
| 3.11 | Build Portal Footer | Portal | Sitemap columns (Shop/Info/Portal/Company) + copyright |
| 3.12 | Build "The record, not a claim" section | Portal | Trust narrative + compound property checklist |
| 3.13 | Build PurchasePanel (Standard PDP) | PDP | node `2341:20452` authority (from OLUK library) |
| 3.14 | Wire compound family browse navigation | Portal | Category cards → filtered catalogue route |
| 3.15 | Build mobile responsive portal hero | Portal | Stacked layout with preserved trust badges |

### PHASE 4 — Component Promotion & Cleanup (10 actions)

| # | Action | Scope | Task |
|---|--------|-------|------|
| 4.1 | Componentize ProductCommerceCard family | Library | Convert Grid/QuickAdd/Featured/PDP variants to component set |
| 4.2 | Componentize CompactCard with portrait media | Library | Fix 200×240 portrait orientation, promote to component |
| 4.3 | Deprecate AttributeChip v3 | Library | Hide v3, v4 canvas is accepted authority |
| 4.4 | Promote PurchasePanel with radius/purchase (28px) binding | Library | Apply VariableID:634:61 |
| 4.5 | Clean green/success misappropriation | Library | `863:24842`, `1489:422` → reference OLUK/StockPill |
| 4.6 | Publish --oluk-shadow-card as effect style | Library | Publishable elevation for cards/chips/panels |
| 4.7 | Create "Evidence Theater" page template in Make | Make | Preset with hero + command rail + ledger + charts |
| 4.8 | Create "Portal Section" page template in Make | Make | Preset with header + hero + product grid + evidence + footer |
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

---

## ACCEPTANCE CHECKS

- [ ] All 45 actions tracked in Figma Make task board
- [ ] OLUK library published with shadow effect style
- [ ] Zero stale colors in file-wide audit
- [ ] Evidence Theater boards (Run 01–09) use Production Views design DNA
- [ ] Portal boards use MF-03 design DNA
- [ ] PurchasePanel authority (`2341:20452`) applied to all adaptive states
- [ ] CompactCard portrait orientation fixed (200×240)
- [ ] AttributeChip v3 deprecated, v4 authority
- [ ] Token boards (`104:5082`, `104:5195`, `104:7739`) reflect true hybrid state
- [ ] No editor artifacts (COPY BOUNDARY, VARIANT 01) in production output

## RISK NOTES

- PurchasePanel authority `2341:20452` lives in OLUK library file, not working file — cross-file reference required
- Shadow effect token is CSS composite, not a single Figma variable — published as effect style instead
- MF-03 portal sections reference product photography assets that need image slots in Make
- Run boards have dual-mode variables — never override variable-bound colors

## OPEN ITEMS

- [ ] Confirm PurchasePanel `2341:20452` node location and extract for Make boards
- [ ] Determine which Run boards map 1:1 to Evidence Theater sections vs. need new boards
- [ ] Asset export for portal product photography (MK-2866 hero, compound family thumbnails)
- [ ] Mobile responsive variants for Evidence Theater command rail and ledger table
