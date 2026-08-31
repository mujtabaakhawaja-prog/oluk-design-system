# P10 — Surface A Convergence: Evidence as Theatre

> FIGMA_TO_CODEX_PACKET — OpenLab Make ↔ EvidenceOS Board Visual System Convergence

## CONTEXT

- **Active repo/project:** `mujtabaakhawaja-prog/oluk-design-system` on `main`
- **Lane:** Figma Design → Make convergence (design-first, not runtime)
- **Runtime boundary:** Design system and Make file only. No payment, Woo, or production runtime mutation.
- **Controller thread:** `019f1c9d-4da1-70d0-9bee-47b11217cc6f`
- **Executor thread:** `019f1a53-e77c-7753-a3ba-541a8e7bc05d`
- **Figma working file:** `6R7Aq3FVGg1fOoN28IYNbH` (EvidenceOS-OPENLAB)
- **OLUK library file:** `BEPMuUt1HroEw8xjz8CVyN`

## PROBLEM STATEMENT

The Make file outputs flat document layouts — raw text blocks, inverse-background cards, no depth hierarchy, no status chips, no metric rails — while the EvidenceOS boards and the live olympuslabs.uk site demonstrate the actual OLUK Surface A language: white elevated cards with blue-tinted shadow, cobalt metric values, bordered chip rails, ledger rows with state indicators, and proper section containerization.

The Codex source audit confirmed this is **systemic**, not an isolated hero defect:
- 172 hard-coded hex occurrences across 21 colors
- 23 customer-facing text treatments at 9–11px (below 12px minimum)
- 112 raw layout `div`s, 66 raw paragraphs, 9 locally styled buttons
- Only 3 shared styling primitives (`Button`, `EvidenceStatusChip`, `Eyebrow`)
- Local reimplementations of metrics, product tabs, record rows, analytical displays, tables, actions, fact groups, PDP media, purchase controls, and unavailable states

## AUTHORITY NODES

| Node | File | Purpose |
|------|------|---------|
| `11:3799` | OLUK Library (`BEPMuUt1HroEw8xjz8CVyN`) | Material, typography, radius, elevation, and surface rules |
| `11:3228` | OLUK Library (`BEPMuUt1HroEw8xjz8CVyN`) | Target fidelity and route-slot composition |
| `16:357` | Working file | Customer Journey — route anatomy reference (not foundation authority) |
| `17:34675` | Working file | EvidenceOS-OPENLAB portal — design pattern authority |
| `155:39264` | Working file | Make "Component and Route Planning" — convergence target |
| `155:40012` | Working file | PdpContinuation — **VIOLATION** (`rgb(20,24,39)` inverse, must be light) |
| `18:55250` | Working file | PART 4 — token/fill/effect reference exemplar |
| `85:25971` | Working file | Variable binding reference (OLUK Color Semantics) |

## SURFACE LAW (from node `11:3799`)

| Token | Hex | Usage |
|-------|-----|-------|
| `surface/canvas` | `#F7F8FC` | Root page background; visible separation between independent sibling objects ONLY |
| `surface/card` | `#FFFFFF` | Raised customer cards, controls, tables, rails, purchase planes |
| `surface/family` | `#F0F4FA` | Low-emphasis grouped editorial or family content |
| `surface/media` | — | Product imagery, bounded analytical visualization |
| `surface/cobalt-soft` | `#EEF4FF` | Selected, informational, or qualified-summary state |
| `inverse` | `#141827` | **Footer ONLY.** No dark trust rail, hero, commerce card, OpenLab section, evidence surface, or continuation rail. |

**Governing rule:** Footer is the sole inverse surface.

## IMMEDIATE SURFACE VIOLATIONS

| Node | Current | Required |
|------|---------|----------|
| `155:40012` PdpContinuation | `rgb(20,24,39)` inverse | Light `ProductEvidenceContinuation` using `surface/card` |
| Analytical plot well | `surface/canvas` | `surface/media` |
| Analytical table headers | `surface/canvas` | `surface/family` or `surface/cobalt-soft` |
| Nested sealed-fact groups | `surface/canvas` | Remove canvas; inherit parent card |

## TOKEN CONTRACT

| Token | Variable ID | Hex |
|-------|-------------|-----|
| `surface/canvas` | `VariableID:eb855d42.../652:36` | `#F7F8FC` |
| `surface/card` | `VariableID:a259d3cd.../2319:37` | `#FFFFFF` |
| `surface/family` | `VariableID:ed40246f.../2319:38` | `#F0F4FA` |
| `surface/cobalt-soft` | `VariableID:7fe2b61e.../2319:40` | `#EEF4FF` |
| `border/card` | `VariableID:9f42cd3b.../2319:42` | `#CEDCF1` |
| `border/strong` | `VariableID:fd00a0d1.../2319:43` | `#AFC8FF` |
| `border/chip` | `VariableID:b1d9d907.../2319:119` | `#CEDCF1` |
| `text/primary` | `VariableID:c66a6aed.../2319:45` | `#141827` |
| `text/secondary` | `VariableID:1338e128.../2319:46` | `#53617D` |
| `text/muted` | `VariableID:8ecb5c79.../2319:47` | `#8B95A8` |
| `text/on-inverse` | `VariableID:13d6d633.../2319:48` | `#FFFFFF` |
| `accent/cobalt` | `VariableID:dfa46633.../2319:50` | `#0057FF` |
| `status/success` | `VariableID:2a517071.../2319:53` | — |

**Shadow token:** `--oluk-shadow-card: 0 20px 50px rgba(22, 62, 132, 0.18)` — blue-tinted, not black.
**Component elevation:** `DROP_SHADOW offset(0,5) blur(6) rgba(22,62,132,0.08)`

## SEMANTIC TYPE RULES

| Role | Min size | Font |
|------|----------|------|
| Display headings | 28–36px | Plus Jakarta Sans ExtraBold |
| Body copy | 15–16px | Inter Variable |
| Table values | 14px | Inter Variable |
| Metadata / eyebrows | 12px | Inter Variable (small-caps mono where applicable) |
| Buttons | 15px | Inter Variable Medium |

**Hard floor:** No customer text below 12px. The 23 treatments at 9–11px found in the Codex audit must all be corrected.

---

## MAKE TASK SET: Evidence as Theatre

### Phase 1 — Foundation (Token Application)

#### T-01: Card Elevation Foundation
**Problem:** Make outputs flat rectangles with no depth.

**Make prompt:**
> Replace every flat content container with a white card (`surface/card` #FFFFFF) on a `surface/canvas` (#F7F8FC) background. Apply `border/card` (#CEDCF1) 1px border and `--oluk-shadow-card` drop shadow (0 20px 50px rgba(22,62,132,0.18)). Cards use 24px padding, 16px radius. No black shadows. No inverse (dark background) cards unless explicitly a footer.

**Acceptance:** Every content section floats on canvas with blue-tinted depth. Zero flat grey/inverse rectangles remain in content areas.

#### T-02: Section Heading Hierarchy
**Problem:** Headings are unstyled or use a single weight.

**Make prompt:**
> Apply the three-tier heading hierarchy to every section. Tier 1: `text/muted` (#8B95A8) small-caps 12px eyebrow (section category). Tier 2: `text/primary` (#141827) Plus Jakarta Sans ExtraBold 28-36px display title. Tier 3: `text/secondary` (#53617D) Inter 16px supporting description. Spacing: 8px eyebrow-to-title, 12px title-to-description, 24px description-to-content. No orphaned headings without eyebrow context. No body text below 15px. No eyebrows below 12px.

**Acceptance:** Every section reads top-down with category → claim → explanation. Zero text treatments below 12px.

### Phase 2 — Primitives (Component Families)

#### T-03: Metric Rail Pattern
**Problem:** Metrics appear as raw inline text.

**Make prompt:**
> Convert every group of 2+ related numbers into a canonical MetricRail component. Each cell: cobalt (`accent/cobalt` #0057FF) large value on top (Plus Jakarta Sans ExtraBold 28px), `text/secondary` (#53617D) Inter 12px small-caps label beneath. Cells separated by 1px `border/card` vertical dividers. The rail sits inside a card with component-level `DROP_SHADOW offset(0,5) blur(6) rgba(22,62,132,0.08)`. Use for: report counts, purity averages, failure counts, eligible/contributing ratios, product-to-evidence sequence numbers (01 PRODUCT → 02 BATCH → 03 REPORT).

**Acceptance:** No raw inline numbers. Every quantified claim lives inside a MetricRail cell.

#### T-04: Status Chip System (EvidenceStatus)
**Problem:** Status appears as raw text labels or inverse badges. Generic `OPENLAB VERIFIED` persists.

**Make prompt:**
> Replace every status indicator with a canonical EvidenceStatus chip. Chip anatomy: `surface/card` fill, `border/chip` (#CEDCF1) 1px border, 6px 12px padding, 12px mono small-caps label. Cobalt-filled variant for primary status (`SOURCE LINKED`). Ghost/outline variant for secondary states (`CONTEXT REQUIRED`, `QA LOCKED`). No background-color-only status. No inverse chips. Group related chips into a horizontal StatusRail with 8px gap. Remove `OPENLAB VERIFIED` — replace with exact states: `SOURCE REPORTED`, `SOURCE LINKED`, `REPORT READY`, `CONTEXT REQUIRED`, `QA LOCKED`, `COMBO AUTHORITY`. Add `PROVIDER VERIFIED` as a separate binding when the source model admits it.

**Acceptance:** Every state indicator uses canonical chip anatomy. No generic VERIFIED, PASS, or blanket claims.

### Phase 3 — Containers (Ledger, Cards, Controls)

#### T-05: Ledger Row Pattern (OpenLabRecordRow)
**Problem:** Route listings and record tables use raw text lines.

**Make prompt:**
> Convert every tabular listing (routes, records, packets, components) into canonical OpenLabRecordRow format. Each row: left-aligned ID in mono `text/muted` 14px, primary label in `text/primary` Inter 15px, trailing EvidenceStatus chip right-aligned. Rows separated by 1px `border/card` horizontal rules. Container uses `surface/card` fill with `border/card` outer border. Header row uses `surface/cobalt-soft` (#EEF4FF) background with `text/secondary` 12px small-caps column labels. For record rows specifically: PRODUCT, BATCH, RESULT, METHOD, EVIDENCE columns with trailing "View lab record" action button in cobalt.

**Acceptance:** Route maps, packet sequences, component lists, and record tables all use ledger anatomy.

#### T-06: Production Card Family
**Problem:** Component descriptions appear as flat text blocks.

**Make prompt:**
> Wrap every component family description in a ProductionCard. Anatomy: `surface/card` fill, `border/card` border, blue-tinted shadow. Top row: `text/muted` 12px small-caps category label ("PRODUCTION CARD") left + EvidenceStatus chip right. Title in `text/primary` Plus Jakarta Sans Bold 20px. Description in `text/secondary` Inter 15px. Bottom: two ghost buttons with `border/card` border ("Open report page" / "Open source"). Cards arrange in 3-column grid with 16px gap. Use for: Featured Products, Evidence Highlights, Trust Rail, Evidence Categories, Latest Reports, Methodology.

**Acceptance:** Component families are visually scannable cards, not paragraphs.

#### T-07: Search + Filter Control Row
**Problem:** Search/filter missing or raw text.

**Make prompt:**
> Add a search/filter control row above every archive or ledger section. Search input: `border/card` border, search icon left, `text/muted` placeholder ("Search exact record, batch or product"), Inter 15px. Filter row: "All evidence states" dropdown + "Read methodology" cobalt ghost button. Control strip uses `surface/family` (#F0F4FA) background, lives inside section card flush below section heading. Filter chips: ghost = inactive, cobalt-fill = active.

**Acceptance:** Archive, route, record, and component sections have search + filter controls.

### Phase 4 — Sections (CTA, Actionables, Ledger Containers)

#### T-08: PdpContinuation → Light ProductEvidenceContinuation
**Problem:** `PdpContinuation` (node `155:40012`) uses `rgb(20,24,39)` inverse fill. Footer is the sole inverse surface.

**Make prompt:**
> Replace the dark PdpContinuation section with a light ProductEvidenceContinuation. Anatomy: `surface/card` (#FFFFFF) fill, `border/card` border, blue-tinted shadow. Two-column layout: left column = "OPENLAB ARCHIVE" eyebrow + "Find an available record." title + description + "Browse records" cobalt primary button + "Batch lookup" ghost button; right column = "PRODUCT TO EVIDENCE" eyebrow + "Facts first. Records when available." title + description + MetricRail (01 PRODUCT / 02 BATCH / 03 REPORT) + "Follow the source chain →" link. Each product card below uses `surface/card` with product name, compound, price, EvidenceStatus chip, and "View record →" cobalt link. No dark fills. No inverse.

**Acceptance:** Zero inverse surfaces outside the footer. The continuation reads as a light elevated decision surface.

#### T-09: CTA Band + Follow-Up Actionables
**Problem:** CTAs are scattered; next-step actions are prose paragraphs.

**Make prompt:**
> Add a CTA Band at the bottom of major page sections. Anatomy: `surface/cobalt-soft` (#EEF4FF) background strip, cobalt eyebrow ("OPENLAB · CUSTOMER EVIDENCE"), `text/primary` bold title ("Start with the product. Continue into the exact record."), cobalt primary button ("Browse lab records →"). Below each output section, add a Followups/Actionables rail: `text/muted` 12px small-caps label "5 FOLLOWUPS / ACTIONABLES", five equal-width cells with mono numbers (01–05) and Inter 14px action labels, `border/card` cell borders, 12px padding.

**Acceptance:** Every section closes with clear CTA. Every task output ends with 5 numbered next actions.

#### T-10: PublicReportLedger Container
**Problem:** Report/record listing lacks proper containerization.

**Make prompt:**
> Wrap the record/report listing in a PublicReportLedger container. `surface/cobalt-soft` (#EEF4FF) eyebrow label "PUBLICREPORTLEDGER", Plus Jakarta Sans Bold 24px section title "Public report ledger", right-aligned "Source drawer" toggle button. Column header row: `text/muted` 12px small-caps (PACKET ID | ROUTE | STATE). Below: OpenLabRecordRow per T-05. Container uses `surface/card` fill with `border/strong` (#AFC8FF) 1px border for emphasis. Packet IDs in mono (OL-2301, OL-2302, etc.). Route names in `text/primary`. Status chips per T-04.

**Acceptance:** The report archive reads as a structured ledger with named columns.

---

## COMPONENT MIGRATION TABLE

| Current Make Construct | Canonical Replacement | Task |
|---|---|---|
| `Button` | `ActionControl` | T-08, T-09 |
| `EvidenceStatusChip` | Canonical `EvidenceStatus` | T-04 |
| `Eyebrow` | Semantic `SectionEyebrow` | T-02 |
| Local `MetricRail` | Canonical `MetricRail` | T-03 |
| `ProductSelector` | `ProductTabs` | — (separate packet) |
| Raw `RecordRow` | `OpenLabRecordRow` | T-05 |
| `AnalyticalPlot` | `DiscretePeakProfile` | — (separate packet) |
| `PeakTable` | `AnalyticalResultTable` | — (separate packet) |
| Raw record/methodology panels | `Dossier`, `FactList`, `DefinitionList` | — (separate packet) |
| Local document copy | `ReportDocumentStateList` | — (separate packet) |
| Local report actions | `ReportActionGroup` | — (separate packet) |
| Local PDP markup | `ProductMediaChamber` + `PurchasePanel` | — (separate packet) |
| Dark `PdpContinuation` | Light `ProductEvidenceContinuation` | T-08 |

Recurring copy to componentize: `SectionIntro`, `CopyBlock`, `FactLabel`, `FactValue`, `QualifierCopy`, `UnavailableCopy`, `Breadcrumbs`, `ActionSupportCopy`.

## ROUTE IMPLEMENTATION SEQUENCE

1. `/open-lab` — Recompose from `11:3228`: unified portal/archive, contained `ProductCommerceCard.featured`, category rail, latest-record ticker. Remove duplicate portfolio summary and dark continuation.
2. **Record detail** — `Breadcrumbs` + `SectionIntro` + `Dossier` + exact evidence states + `DiscretePeakProfile` + `AnalyticalResultTable` + methodology definitions + document states + independent actions.
3. **Report detail** — Canonical `/open-lab/report/:batchId` (redirect or retire plural `/reports/:reportId`). Separate `Source reported`, `Provider verified`, document availability, provider page/file.
4. **Methodology + source chain** — Shared definition and source-chain components. Honest absence.
5. **Product route** — `ProductMediaChamber` + `PurchasePanel`. Commerce independent from evidence. Move `cartAuthority` to diagnostics.
6. **Unavailable states** — One `UnavailableState` family with route/product/record/report/document variants.
7. **Route parity** — `/open-lab/records`, `/open-lab/report/:batchId`, `/open-lab/coa/:id`, `/open-lab/batch-lookup`, `/open-lab/compare`, `/open-lab/evidence`, `/open-lab/compound/:slug`.

## EXECUTION GATES (9-gate dependency order)

| Gate | Action | Tasks |
|------|--------|-------|
| G1 | Freeze route + screenshot baseline | — |
| G2 | Semantic foundations + surface/type guards | T-01, T-02 |
| G3 | Primitive specimens | T-03, T-04 |
| G4 | OpenLab + commerce component producers | T-05, T-06, T-07 |
| G5 | Section containers + violations | T-08, T-09, T-10 |
| G6 | Migrate existing routes (sequence above) | — |
| G7 | Add missing route parity | — |
| G8 | Replace Make-local facts with public-safe projection | — |
| G9 | Responsive + interaction + accessibility + customer-copy hardening | — |

## ACCEPTANCE CHECKS

- [ ] No hard-coded UI colors outside token definitions and approved asset data
- [ ] Inverse used only by footer
- [ ] Canvas used only by page root or explicit independent-object separation
- [ ] No customer text below 12px
- [ ] No generic `Verified`, `OPENLAB VERIFIED`, or PASS
- [ ] No customer-visible implementation vocabulary ("prototype", "contract", "nothing was invented", `cartAuthority`)
- [ ] Exact `Provider verified` binding present and distinct
- [ ] Independent document and action states
- [ ] No continuous chart reconstructed from discrete source rows
- [ ] 1440 / 1024 / 768 / 390 reviews across available, unavailable, empty, disabled, selected, keyboard, and long-copy states
- [ ] No page-level horizontal overflow
- [ ] Producer → projection → component → rendered route tracing for every visible fact
- [ ] Batch ID consistency: `OL2201` canonical (not `OL2201-2`)
- [ ] Route path canonical: `/open-lab/report/:batchId` (not `/reports/:reportId`)

## DATA CORRECTIONS

| Field | Current | Canonical |
|-------|---------|----------|
| MK-2866 batch | `OL2201-2` (some locations) | `OL2201` |
| Report route | `/open-lab/reports/:reportId` | `/open-lab/report/:batchId` |
| Generic status | `OPENLAB VERIFIED` | Remove; use exact states only |
| Provider status | Missing | Add `PROVIDER VERIFIED` when source model admits |

## RISK NOTES

- Authority nodes `11:3799` and `11:3228` are in the OLUK library file, not the working file. Cross-file reference only.
- Chrome native host limitation: cannot automate live route-by-route capture. Source pass is complete; rendered capture requires host reinstall.
- No payment, Woo, or production runtime mutation in this packet.
- Dark mode on existing EvidenceOS boards (MF prefix) is CORRECT — do not touch.

## OPEN ITEMS

- `ProductSelector` → `ProductTabs` migration (separate packet)
- `AnalyticalPlot` → `DiscretePeakProfile` migration (separate packet)
- `PeakTable` → `AnalyticalResultTable` migration (separate packet)
- Responsive breakpoint specimens at 1024/768/390
- Keyboard and screen-reader hardening pass
- Chrome native host reinstall for rendered route capture gate
