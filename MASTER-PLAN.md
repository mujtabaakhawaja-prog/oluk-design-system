# OLUK R6 Design System — Master Plan

> Living document. Refined across subsequent passes.

---

## Phase A — Button Revert + SourceDrawer Binding ✅

**Status:** COMPLETE  
**Scope:** Restore OLUK/Button to 60-variant production state; bind SourceDrawer FE V02 to G1 tokens.

### A1: Button Revert
- Reverted OLUK/Button (1208:71821) from broken state back to 60 variants
- Axes: `tone` (primary/danger) × `size` (sm/md/lg) × `state` (default/hover/pressed/disabled/loading)
- All fills bound to G1 semantic variables

### A2: SourceDrawer Binding
- OLUK/SourceDrawer FE V02 (inside 1216:1158) — 4 variants
- Bound all hardcoded fills to G1 tokens
- Dark mode explicitly set via `setExplicitVariableModeForCollection()`

### A3: Icon Fixes + Deprecation
- Fixed PDP/PerformanceIcon (1192:285) — 6 variants
- Fixed PDP/CommerceTrustIcon (1192:304) — 3 variants
- Deprecated old icon variants with `[DEPRECATED]` prefix

### A4: StatusChip Intents
- OLUK/StatusChip (1208:71858) — 12 variants
- Added 5 semantic status intent variable groups: success/warning/error/info/neutral
- Each with surface/text/marker sub-tokens

### A5: Board Audit + Semantic Status Variables
- Created 15 new semantic status variables in G1 collection
- Audited all system boards for consistency

---

## Phase B — Icon System + Naming ✅

**Status:** COMPLETE

### B1: Icon Renames
- Renamed all icon components to follow `PDP/PerformanceIcon` and `PDP/CommerceTrustIcon` naming
- Standardized variant property names

### B2: Icon Wrapper Component
- Created OLUK/Icon (1234:68771) — 12 variants
- Axes: `size` (sm/md/lg) × `tone` (primary/secondary/accent/on-cta)
- All fills bound to G1 semantic variables

---

## Phase C — Purchase Panel System ✅

**Status:** COMPLETE

### C1: Purchase Panel Rebuild
- PDP/Purchase Panel System Components (page 1167:180) — 9 component sets
- PDP/SeriesLabel (1208:71612) — format=pill|inline
- PDP/SKU Container (1208:71625) — density=full|compact
- PDP/Price Container (1208:71698) — 6 variants: state×density

### C2: CTA Integration
- Resolved duplicate CTA issue (Price Container internal vs OLUK/Button)
- Hidden internal CTAs, kept OLUK/Button instances

### C3: Dark Mode Panel
- Built dark variant with explicit G1 Dark mode binding
- Both panels verified: Light and Dark

---

## Phase D — Typography System ✅

**Status:** COMPLETE  
**Deliverable:** 24 OLUK text styles published

### Scale (Inter family throughout)
| Style | Weight | Size/Line | Tracking |
|---|---|---|---|
| Display/Hero | Bold | 56/64 | -1.5 |
| Display/Section | Bold | 45.94/64.49 | -0.5 |
| Heading/Product | Bold | 45.94/64.49 | 0 |
| Heading/Alias | Medium | 19.44/27.39 | 0 |
| Heading/Card | Semi Bold | 19.44/27.39 | 0 |
| Heading/Section | Semi Bold | 24/32 | 0 |
| Body/Default | Regular | 13.25/18.55 | 0 |
| Body/Emphasis | Medium | 13.25/18.55 | 0 |
| Body/Large | Regular | 16/24 | 0 |
| Price/Primary | Bold | 33.57/46.82 | 0 |
| Price/Secondary | Regular | 10.62/14.87 | 0 |
| Price/Strikethrough | Regular | 19.44/27.39 | 0 |
| Label/Eyebrow | Semi Bold | 9.72/13.25 | 2.5 |
| Label/Button | Semi Bold | 12.37/17.67 | 0.5 |
| Label/Status | Semi Bold | 8.83/12.37 | 1.5 |
| Label/Rail Title | Semi Bold | 9.72/13.25 | 2 |
| Label/Metric Value | Semi Bold | 13.25/18.55 | 0 |
| Label/Metric Label | Regular | 7.95/11.48 | 1 |
| Technical/Legal | Regular | 9.72/13.25 | 0 |
| Technical/Rail Definition | Regular | 7.95/11.48 | 0 |
| Technical/SKU | Medium | 10.62/14.87 | 1 |
| Navigation/Link | Medium | 13.25/18.55 | 0 |
| Navigation/Breadcrumb | Regular | 10.62/14.87 | 0 |
| Navigation/Tab | Semi Bold | 12.37/17.67 | 0.5 |

---

## Phase E — Layout Tokens + Elevation ✅

**Status:** COMPLETE

### E1: Layout Token Variables (25 total)
**Collection:** OLUK Layout Tokens (VariableCollectionId:1234:72750)

| Category | Tokens |
|---|---|
| spacing | 2xs(2), xs(4), sm(8), md(12), lg(16), xl(24), 2xl(32), 3xl(48), 4xl(64), section(80), page(120) |
| radius | none(0), sm(4), md(8), lg(12), xl(16), pill(999) |
| padding | button-sm(8), button-md(10), button-lg(14), card(20), panel(24), section(32), page-x(24), page-y(48) |

### E2: Elevation Styles (4 effect styles)
| Style | Shadow |
|---|---|
| OLUK/Elevation/Subtle | 0 1 2 rgba(0,0,0,0.05) |
| OLUK/Elevation/Default | 0 2 8 rgba(0,0,0,0.08) |
| OLUK/Elevation/Raised | 0 4 16 rgba(0,0,0,0.12) |
| OLUK/Elevation/Overlay | 0 8 32 rgba(0,0,0,0.16) |

---

## Phase F — Bridge Reconciliation ✅

**Status:** COMPLETE  
**Deliverable:** 4,756 G1 variable bindings across 24 OL/Commerce component sets

### F1: Bridge Inventory
- BRIDGE page (1195:7097) — 76 top-level nodes
- 24 OL/Commerce component sets identified
- 37 unique hardcoded colors across blue and green palettes

### F2: Batch Binding
- Built semantic role-based color matcher (matchFillVar heuristic)
- Primary pass: 4,643 bindings
- Cleanup pass: 113 additional bindings (6 unmapped color patterns resolved)
- Final: 70 remaining unmatchable (decorative/gradient fills — acceptable)

---

## Phase G — TES Integration ✅

**Status:** COMPLETE

- TrustEvidenceSpine Production V01 (644:812) — already 99%+ G1 bound
- 920 bound vs 16 hardcoded at start
- Bound remaining 10 fills + created Evidence registry on system page

---

## Phase H — System Page Population ✅

**Status:** COMPLETE  
**Deliverable:** 11 registry pages populated

### Pages Created/Populated
1. R6 00 — Brand Identity
2. R6 01 — Foundations
3. R6 02 — Design Tokens
4. R6 03 — Primitive Components
5. R6 04 — Commerce Components
6. R6 05 — Evidence Components
7. R6 06 — Navigation and Shell
8. R6 07 — Homepage Sections
9. R6 08 — Catalogue System
10. R6 09 — Product Detail System
11. R6 10 — OpenLab System

---

## Phase I — Cross-References ✅

**Status:** COMPLETE  
All registry pages cross-linked with component IDs, variable references, and style dependencies.

---

## Phase J — FRONTIER Archiving ✅

**Status:** COMPLETE  
9 FRONTIER V02 pages archived with `[ARCHIVED]` annotations and supersession links to champion pages.

---

## Phase K — System Board Finalization ✅

**Status:** COMPLETE

- Master Index on R6 System Boards (1230:10515)
- Phase Completion Status board (1235:74773)
- CLOSEOUT pages superseded with links to R6 system pages

---

## Post-K Expansion — In Progress

See [CODEX-EXECUTION-ORDER.md](./CODEX-EXECUTION-ORDER.md) for the complete deterministic task queue.

### L: LAYERS 3 G1 Token Binding
LAYERS 3 (1238:29765) contains 127 frames — the MAJESTIC system including checkout lifecycle, commerce flows, OpenLab pages, and 30+ full page designs. All hardcoded fills must be replaced with G1 semantic variables.

### M: Homepage Hero Expansion
Homepage Hero (702:15540) needs FeaturedRail and QuickAddRail integration using ProductCommerceCard system components.

### N: Checkout + Commerce Modernization
LAYERS 3 checkout frames (r6-checkout-champion, r6-bag-drawer-champion, etc.) need G1 binding and system component integration.

### O: Lab Reports + OpenLab Modernization
R6 Lab Reports (702:21328) — 26 frames covering OpenLab portal, Evidence OS, dossiers. Need G1 binding audit.

### P: New System Boards
- Handoff Spec
- Motion + Interaction
- Responsive Matrix
- Data Display
- Commerce Patterns
- Mobile Compaction Champion Strategy

### Q: Trust & Currency System
R6 TRUST AND CURRENCY (712:1311) — currently empty. Currency rail states and trust badge system need to be built from LAYERS 3 source material.

### R: Final Audit + Publication
Full-file hardcoded fill sweep, style consistency check, component promotion verification.
