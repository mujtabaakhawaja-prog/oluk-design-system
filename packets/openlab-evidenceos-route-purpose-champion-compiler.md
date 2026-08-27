# FIGMA_TO_CODEX_PACKET — OpenLab / EvidenceOS Route Purpose, Functional Identity, Visual Identity & Champion Prototype Compiler

## CONTEXT

- **Active repo/project:** mujtabaakhawaja-prog/oluk-design-system
- **Lane:** Design System Documentation → Codex Implementation
- **Runtime boundary:** apps/olympus-shopper-ui/** (no payment/Woo mutation)
- **Figma file:** BEPMuUt1HroEw8xjz8CVyN
- **Canvas Shape page:** 1623:2
- **Reference spreads:** 1878:251 (OpenLab Modules), 1878:553 (Phase 0→1), 1899:2 (Route Registry)
- **Editorial selection:** 1838:12778 (OPENLAB_EDITORIAL_MODULE_MK2866_SELECTION_01)
- **File variables:** 60 COLOR · 50 FLOAT · 2 STRING
- **File styles:** 10 paint · 50 text · 5 effect · 1 grid

---

## VALIDATED SOURCE DISPOSITION TABLE

Every source node inspected against file BEPMuUt1HroEw8xjz8CVyN with exact node IDs, types, dimensions, and disposition.

### EDITORIAL SELECTION — 1838:12778 (SECTION · 3500×6500 · Component Library 672:10)

| Node ID | Name | Type | Dimensions | Disposition | Reason | Route/Slot |
|---|---|---|---|---|---|---|
| 1838:12779 | EDITORIAL_MK2866 / 1440 | FRAME | 1440×2915 | **ADAPT** | Conflates portal + compound jobs. Split into two champions. | Split → A (portal) + B (compound) |
| 1838:12780 | EDITORIAL_MK2866 / 390 | FRAME | 390×5423 | **ADAPT** | Mobile counterpart of above. Same split needed. | Split → A (portal/390) + B (compound/390) |
| 1839:422 | ReportAction / Customer | COMPONENT | 172×44 | **ADOPT** | Clean customer-facing report CTA. No backend prose. | /open-lab/records/:recordId · /open-lab/report/:batchId |
| 1839:424 | EvidenceStatus / Source Reported | COMPONENT | 136×20 | **ADOPT** | Matches 4-state honesty language. Extend to full set. | All evidence routes |
| 1839:428 | LabRecord / Customer | COMPONENT | 591×247 | **ADOPT** | Customer-facing lab record card. Source-bound. | /open-lab/records · /open-lab/compound/:slug |
| 1839:455 | HplcPurityTrace / Customer | COMPONENT | 591×422 | **ADOPT** | Structured peak summary (NOT chromatogram). Honest label needed. | /open-lab/compound/:slug · /product/:slug |
| 1839:470 | AnalytePeakTable / Customer | COMPONENT | 620×314 | **ADOPT** | Analyte table. Source-bound numeric data. | /open-lab/compound/:slug · /open-lab/records/:recordId |
| 1841:427 | EvidenceHero / Customer | COMPONENT | 1248×450 | **ADOPT** | Multi-product editorial hero. Portal gateway. | /open-lab |
| 1841:446 | EvidenceLedger / Customer | COMPONENT | 1248×437 | **ADOPT** | Evidence chain of custody ledger. | /open-lab · Homepage evidence slot |
| 1841:507 | BatchRecordTable / Customer | COMPONENT | 1248×324 | **ADOPT** | Batch records data table. Sortable. | /open-lab/records · /open-lab/compound/:slug |
| 1841:559 | Methodology / Customer | COMPONENT | 620×292 | **ADOPT** | Methodology explanation module. | /open-lab/methodology · /open-lab/compound/:slug |
| 1841:570 | SourceCustody / Customer | COMPONENT | 620×428 | **ADOPT** | Source chain & custody narrative. | /open-lab/source-chain · /open-lab/compound/:slug |
| 1843:745 | EvidenceHero / Customer / Mobile | COMPONENT | 366×997 | **ADOPT** | Mobile responsive variant of EvidenceHero. | /open-lab (390) |
| 1843:763 | LabRecord / Customer / Mobile | COMPONENT | 334×520 | **ADOPT** | Mobile lab record card. | /open-lab/records (390) |
| 1843:785 | HplcPurityTrace / Customer / Mobile | COMPONENT | 334×370 | **ADOPT** | Mobile peak summary. | /open-lab/compound/:slug (390) |
| 1843:798 | BatchRecordTable / Customer / Mobile | COMPONENT | 366×406 | **ADOPT** | Mobile batch table (table-to-card transform). | /open-lab/records (390) |
| 1856:13238 | RecordHistory / Customer | COMPONENT | 620×56 | **ADOPT** | Record history timeline row. | /open-lab/compound/:slug · /open-lab/records/:recordId |
| 1864:13254 | HplcPeakProfile / FivePeaks / Desktop | COMPONENT | 549×176 | **ADOPT** | Structured 5-peak profile. Source-bound only. NOT a chromatogram. | /open-lab/compound/:slug · /product/:slug |
| 1864:13261 | HplcPeakProfile / FivePeaks / Mobile | COMPONENT | 302×130 | **ADOPT** | Mobile 5-peak profile variant. | /open-lab/compound/:slug (390) |

### PUBLISHED COMPONENTS — Component Library (672:10)

| Node ID | Name | Type | Disposition | Route/Slot |
|---|---|---|---|---|
| 556:34022 | TrustEvidenceSpine / AssuranceCell | COMPONENT_SET | **ADOPT** | /product/:slug · /open-lab/compound/:slug |
| 556:34122 | TrustEvidenceSpine / AssuranceRail | COMPONENT_SET | **ADOPT** | /product/:slug · /open-lab |
| 1199:28750 | openlab-mega-menu-panel | COMPONENT | **ADOPT** | All /open-lab/* routes (shell nav) |
| 1215:29690 | OpenLabContextNav | COMPONENT_SET | **ADOPT** | All /open-lab/* routes (context nav) |
| 1263:5683 | OpenLabPortalHero / Width=Desktop | COMPONENT | **ADOPT** | /open-lab (portal hero) |
| 1326:7659 | Stack / OpenLabConfidence | COMPONENT_SET | **ADOPT** | /open-lab/stack-builder |
| 1374:853 | Stack / OpenLabConfidence v3 | COMPONENT_SET | **ADOPT** | /open-lab/stack-builder (v3 mobile) |

### FULL ROUTE COMPOSITIONS — MF-01 & MF-02 (369:5500)

| Node ID | Name | Dimensions | Disposition | Canonical Route |
|---|---|---|---|---|
| 1082:29137 | openlab-portal-index | 1440×3299 | **STRUCTURAL_REFERENCE** | /open-lab — use as section-map reference, rebuild with new components |
| 1082:29460 | openlab-lab-records-archive | 1440×2281 | **STRUCTURAL_REFERENCE** | /open-lab/records — section structure valid, components need swap |
| 1082:29876 | openlab-dossier-mk2866 | 1440×2742 | **STRUCTURAL_REFERENCE** | /open-lab/compound/:slug — section layout reference |
| 1082:30382 | openlab-report-detail | 1440×1824 | **STRUCTURAL_REFERENCE** | /open-lab/records/:recordId |
| 1082:30582 | openlab-batch-lookup | 1440×1064 | **STRUCTURAL_REFERENCE** | /open-lab/batch-lookup |
| 1082:30895 | openlab-compare | 1440×1467 | **STRUCTURAL_REFERENCE** | /open-lab/compare |
| 1082:30967 | openlab-evidenceos-command | 1440×1024 | **DATA_ANATOMY_ONLY** | /open-lab/evidence — unproofed concept |

### DUPLICATE COMPOSITIONS — MF-01 & MF-02 (369:5500) — 1822:xxxxx series

| Node ID | Name | Dimensions | Disposition | Reason |
|---|---|---|---|---|
| 1822:77602 | openlab-portal-index | 1440×3299 | **ARCHIVE_CANDIDATE** | Duplicate of 1082:29137 — canonicalize to 1082 series |
| 1822:77931 | openlab-lab-records-archive | 1440×2281 | **ARCHIVE_CANDIDATE** | Duplicate of 1082:29460 |
| 1822:78399 | openlab-dossier-mk2866 | 1440×2742 | **ARCHIVE_CANDIDATE** | Duplicate of 1082:29876 |
| 1822:78688 | openlab-report-detail | 1440×1824 | **ARCHIVE_CANDIDATE** | Duplicate of 1082:30382 |
| 1822:78889 | openlab-batch-lookup | 1440×1064 | **ARCHIVE_CANDIDATE** | Duplicate of 1082:30582 |
| 1822:79207 | openlab-compare | 1440×1467 | **ARCHIVE_CANDIDATE** | Duplicate of 1082:30895 |
| 1822:79280 | openlab-evidenceos-command | 1440×1024 | **ARCHIVE_CANDIDATE** | Duplicate of 1082:30967 |

### HERO CANDIDATES — MF-03 (1660:422)

| Node ID | Name | Dimensions | Disposition | Reason |
|---|---|---|---|---|
| 1791:77015 | HeroOpenLab-light | 1512×1061 | **ADOPT** | ✓ Canonical height (1061). Use as hero reference. |
| 1791:76121 | HeroOpenLab-light | 1512×1079 | **SUPERSEDE** | ✗ 18px taller than canonical. Padding error. Delete after verification. |

### CARD GRAMMAR DUPLICATES — (1572:70623)

| Node ID | Name | Disposition | Reason |
|---|---|---|---|
| 1572:72605 | Embedded:margin | **ARCHIVE_CANDIDATE** | Duplicate of 1572:72122 |
| 1572:73836 | Embedded:margin | **ARCHIVE_CANDIDATE** | Duplicate of 1572:72122 |
| 1572:73567 | Realtime:margin | **ARCHIVE_CANDIDATE** | Duplicate of 1572:72014 |
| 1572:72278 | EvidenceOS-Editorial | **DATA_ANATOMY_ONLY** | Unproofed concept — no route assignment |

---

## CHAMPION SPLIT SPECIFICATION

The editorial selection 1838:12778 currently conflates single-product (MK-2866 compound record) and multi-product (portal/library) purposes in one composition. This must split into two independent champion candidates.

### A. OPENLAB_PORTAL_LIBRARY_SELECTION_01

**Customer job:** "I want to understand what evidence Olympus Labs has for all their products and explore their testing transparency."

**Route:** /open-lab
**Product context:** Multi-product
**Shell:** AppShell + OpenLabContextNav + openlab-mega-menu-panel

**Required sections (top to bottom):**
1. EvidenceHero (1841:427 desktop / 1843:745 mobile) — Multi-product editorial gateway
2. EvidenceLedger (1841:446) — Chain of custody explanation
3. Compound navigation grid — Multi-product cards (NOT MK-2866 only)
4. BatchRecordTable (1841:507 / 1843:798) — Recent/admitted records across products
5. Archive continuation CTA → /open-lab/records
6. Comparison/wayfinding module → /open-lab/compare

**Components from editorial selection:**
- EvidenceHero / Customer (1841:427 + 1843:745)
- EvidenceLedger / Customer (1841:446)
- BatchRecordTable / Customer (1841:507 + 1843:798)

**Inherited OLUK components:**
- OpenLabPortalHero (1263:5683)
- OpenLabContextNav (1215:29690)
- openlab-mega-menu-panel (1199:28750)
- QualitativeChip for compound navigation
- SiteHeader (754:18224) + SiteFooter (754:18226)

**NOT included (belongs to compound champion):**
- HplcPurityTrace (single-compound specific)
- LabRecord (single-record specific)
- AnalytePeakTable (single-compound specific)
- Methodology (compound-specific placement)
- SourceCustody (compound-specific placement)
- RecordHistory (single-compound timeline)
- HplcPeakProfile (single-compound visualization)

### B. OPENLAB_COMPOUND_RECORD_MK2866_SELECTION_01

**Customer job:** "I want to see all evidence for MK-2866 specifically — purity results, lab records, methodology, and how to access the actual reports."

**Route:** /open-lab/compound/:slug (first instance: /open-lab/compound/mk-2866)
**Product context:** Single-product
**Shell:** AppShell + OpenLabContextNav

**Required sections (top to bottom):**
1. Compound identity header — MK-2866 name + canonical identifier
2. HplcPurityTrace (1839:455 / 1843:785) — Structured peak summary with honest label
3. HplcPeakProfile (1864:13254 / 1864:13261) — 5-peak source-bound profile
4. LabRecord (1839:428 / 1843:763) — Latest admitted record card
5. AnalytePeakTable (1839:470) — Analyte measurements table
6. EvidenceStatus (1839:424) — 4-state honesty chip
7. ReportAction (1839:422) — CTA to view/download report
8. RecordHistory (1856:13238) — Timeline of admitted records for this compound
9. Methodology (1841:559) — Testing methodology explanation
10. SourceCustody (1841:570) — Source chain & custody narrative
11. Related compounds continuation → /open-lab/records

**Components from editorial selection:**
- ALL 17 components (this is the primary consumer)
- Desktop + Mobile variants form one responsive family

**Inherited OLUK components:**
- AssuranceRail / TrustEvidenceSpine (556:34122 + 556:34022)
- EvidenceStatusChip (1085:4390)
- OpenLabContextNav (1215:29690)
- SiteHeader + SiteFooter

**Reusability:** The MK-2866 instance becomes the product-agnostic template. Product facts (compound name, batch IDs, purity values, peak data) are inputs. Component structure, responsive behavior, section order, and state handling are shared across all compounds.

---

## CANONICAL ROUTE LAW — /open-lab PREFIX

**IMPORTANT:** The canonical runtime route prefix is `/open-lab` (hyphenated), NOT `/openlab` (Figma shorthand).

| Canonical Path | Customer Job | Product Context | Key Components |
|---|---|---|---|
| Homepage evidence slot | Brief multi-product confidence preview | Multi-product | EvidenceLedger, BatchRecordTable (preview) |
| /product/:slug | ProductEvidenceSnapshot below commerce | Single-product | HplcPeakProfile, EvidenceStatus, ReportAction |
| /open-lab | Multi-product editorial portal | Multi-product | EvidenceHero, EvidenceLedger, BatchRecordTable |
| /open-lab/records | Searchable multi-product archive | Multi-product | BatchRecordTable (full), search/filter |
| /open-lab/records/:recordId | Single record detail | Single-product | LabRecord, AnalytePeakTable, ReportAction |
| /open-lab/compound/:slug | Single compound dossier | Single-product | ALL editorial components |
| /open-lab/report/:batchId | Report-detail presentation | Single-product | ReportAction, EvidenceStatus |
| /open-lab/coa/:id | Supplied CoA/report viewer | Single-product | Document embed (MISSING_SOURCE — no component exists) |
| /open-lab/batch-lookup | Exact batch lookup | Cross-product | Search input + result state |
| /open-lab/methodology | Editorial methodology | No-product | Methodology (expanded) |
| /open-lab/source-chain | Source & custody narrative | No-product | SourceCustody (expanded) |
| /open-lab/compare | Multi-product comparison | Multi-product | Commensurable fields only |
| /open-lab/evidence | Multi-product evidence/trends | Multi-product | Source-owned numeric data only |

---

## FUNCTIONAL IDENTITY RECORDS — PRIORITY ROUTES

### FID-001: OpenLab Portal

```
concernId: openlab-portal
name: OpenLab Evidence Portal
customerWho: A prospective or returning buyer who wants to evaluate Olympus Labs UK's overall testing transparency
customerQuestion: "How do I know these products are what they claim to be?"
customerJob: Discover the evidence ecosystem, understand testing methodology, browse recent results, navigate to specific compounds
whyItExists: Trust conversion — customers who see evidence buy with higher confidence and AOV
whenItAppears: Direct navigation via header mega-menu, footer link, or homepage evidence CTA
commerceValue: Trust-driven conversion lift. Not a direct purchase surface.
trustValue: PRIMARY — this is the trust anchor for the entire brand
primitiveData: Admitted batch records (multi-product), methodology text, compound list, evidence status per product
dataOwner: Evidence API (read-only projection of admitted records)
evidenceEligibility: fail-closed per 4-state honesty language
primitiveShape: Editorial portal with hero + ledger + grid + table + CTAs
componentFamily: OpenLabPortal
routeFamily: /open-lab
candidateRouteSlots: CANDIDATE_SLOT_ID:openlab-portal-hero, CANDIDATE_SLOT_ID:openlab-portal-ledger, CANDIDATE_SLOT_ID:openlab-portal-compounds, CANDIDATE_SLOT_ID:openlab-portal-records, CANDIDATE_SLOT_ID:openlab-portal-archive-cta
informationHierarchy: Hero headline → Trust narrative → Compound grid → Recent records → Archive CTA
interactions: Compound card click → /open-lab/compound/:slug, Record row click → /open-lab/records/:recordId, Archive CTA → /open-lab/records
responsiveLaw: 1440 two-column hero | 1024 narrowed | 768 stacked | 390 single-column, table→card
contentRules: No invented metrics. No aggregate purity averages. No "live" feeds. Recent records from admitted projections only.
visibleIdentifierRule: Compound names as headlines. Batch IDs as MK-2866 · OL2201 format.
emptyState: "We're preparing our evidence records. Check back soon."
unavailableState: "Evidence data is currently unavailable for this product."
sourceOnlyState: "This data is provided by the manufacturer and has not been independently verified."
sourceReportedState: "Source reported — awaiting independent verification."
verifiedState: "OPENLAB VERIFIED — Confirmed by third-party laboratory analysis."
sourceNodes: 1082:29137 (structural reference), 1841:427 + 1841:446 + 1841:507 (components)
inheritedOLUKComponents: OpenLabPortalHero (1263:5683), OpenLabContextNav (1215:29690), openlab-mega-menu-panel (1199:28750), QualitativeChip, SiteHeader, SiteFooter
implementationConsumer: app/(open-lab)/page.tsx
acceptanceChecks: Hero renders at all 4 breakpoints | No invented data | 4-state honesty applied | Compound cards navigate correctly | Table responsive transform works
openDecision: How many compounds to feature on portal vs. showing all | Archive pagination strategy
nextExecutableEdge: Build portal champion at 1440 + 390 using ADOPT components
```

### FID-002: OpenLab Compound Dossier (MK-2866 first)

```
concernId: openlab-compound-dossier
name: Compound Evidence Dossier
customerWho: A buyer researching a specific compound's testing history and purity evidence
customerQuestion: "What exactly has been tested for MK-2866 and what were the results?"
customerJob: See all admitted evidence for one compound — purity, analytes, lab records, methodology, report access
whyItExists: Deep trust for considered purchase. Single-product evidence depth.
whenItAppears: Click from portal compound card, PDP evidence link, or direct URL
commerceValue: High-intent purchase validation. Customers viewing evidence are in decision mode.
trustValue: CRITICAL — product-specific evidence is the strongest trust signal
primitiveData: Compound identity, admitted batch/report records, HPLC peak data (source-bound), analyte measurements, methodology, custody chain
dataOwner: Evidence API (compound-scoped projection)
evidenceEligibility: fail-closed. OPENLAB VERIFIED only when explicit. Peak profile from source-owned numeric points only.
primitiveShape: Single-product dossier with identity header + peak summary + record card + analyte table + methodology + custody + history
componentFamily: OpenLabCompoundDossier
routeFamily: /open-lab/compound
candidateRouteSlots: CANDIDATE_SLOT_ID:compound-identity-header, CANDIDATE_SLOT_ID:compound-peak-summary, CANDIDATE_SLOT_ID:compound-peak-profile, CANDIDATE_SLOT_ID:compound-lab-record, CANDIDATE_SLOT_ID:compound-analyte-table, CANDIDATE_SLOT_ID:compound-evidence-status, CANDIDATE_SLOT_ID:compound-report-action, CANDIDATE_SLOT_ID:compound-record-history, CANDIDATE_SLOT_ID:compound-methodology, CANDIDATE_SLOT_ID:compound-source-custody, CANDIDATE_SLOT_ID:compound-related-cta
informationHierarchy: Compound name → Peak summary → Latest record → Analytes → Status → Report CTA → History → Methodology → Custody → Related
interactions: Report CTA → /open-lab/report/:batchId or /open-lab/coa/:id, History row → /open-lab/records/:recordId, Related → /open-lab/compound/:otherSlug
responsiveLaw: 1440 two-column (peak+record left, analytes+method+custody right) | 1024 narrowed | 768 stacked | 390 single-column linear
contentRules: Peak profile from source-owned structured numeric points ONLY. Label as "Structured Peak Summary" NOT "Chromatogram". Do not invent intermediate values from >99%.
visibleIdentifierRule: "MK-2866 · OL2201" format on cards. Full record ID in detail views and accessibility text.
emptyState: "No evidence records have been admitted for this compound yet."
unavailableState: "Evidence data is currently unavailable."
sourceOnlyState: "Manufacturer-provided specification. Not independently verified."
sourceReportedState: "Source reported value — independent verification pending."
verifiedState: "OPENLAB VERIFIED — Third-party laboratory confirmed."
sourceNodes: 1082:29876 (structural reference), ALL 17 editorial components (1839:422 through 1864:13261)
inheritedOLUKComponents: AssuranceRail (556:34122), AssuranceCell (556:34022), EvidenceStatusChip (1085:4390), OpenLabContextNav (1215:29690), SiteHeader, SiteFooter
implementationConsumer: app/(open-lab)/compound/[slug]/page.tsx
acceptanceChecks: MK-2866 renders at all 4 breakpoints | Peak profile source-bound | No invented data | All states represented | Report action functional | History timeline accurate
openDecision: Whether CoA viewer is embedded or opens in new tab | Peak profile data format from API
nextExecutableEdge: Build MK-2866 compound champion at 1440 + 390 using ADOPT components, then extract product-agnostic template
```

---

## COMPONENT FAMILY REGISTRY

### OpenLabEvidence family (17 components from 1838:12778)

| Family | Desktop Component | Mobile Component | Customer Job |
|---|---|---|---|
| EvidenceHero | 1841:427 (1248×450) | 1843:745 (366×997) | Multi-product trust gateway |
| EvidenceLedger | 1841:446 (1248×437) | — (reflows) | Chain of custody narrative |
| BatchRecordTable | 1841:507 (1248×324) | 1843:798 (366×406) | Record browsing + search |
| LabRecord | 1839:428 (591×247) | 1843:763 (334×520) | Single record card |
| HplcPurityTrace | 1839:455 (591×422) | 1843:785 (334×370) | Structured peak summary |
| HplcPeakProfile | 1864:13254 (549×176) | 1864:13261 (302×130) | 5-peak source-bound profile |
| AnalytePeakTable | 1839:470 (620×314) | — (table→card) | Analyte measurements |
| Methodology | 1841:559 (620×292) | — (reflows) | Testing methodology |
| SourceCustody | 1841:570 (620×428) | — (reflows) | Source chain & custody |
| RecordHistory | 1856:13238 (620×56) | — (reflows) | Record timeline row |
| EvidenceStatus | 1839:424 (136×20) | — (same) | 4-state honesty chip |
| ReportAction | 1839:422 (172×44) | — (same) | Report view/download CTA |

### Missing components (CANDIDATE for creation)

| Candidate | Purpose | Route | Status |
|---|---|---|---|
| CoaViewer | Embedded CoA/report document viewer | /open-lab/coa/:id | MISSING_SOURCE — no component exists |
| CompoundIdentityHeader | Compound name + badge + nav | /open-lab/compound/:slug | Can be composed from existing primitives |
| ProductEvidenceSnapshot | Compact evidence teaser for PDP | /product/:slug | Compose from HplcPeakProfile + EvidenceStatus + ReportAction |
| EvidenceComparisonTable | Side-by-side compound comparison | /open-lab/compare | MISSING_SOURCE — structural reference only at 1082:30895 |

---

## FIGMA OUTPUT STRUCTURE — PROPOSED

New page: **OPENLAB · PURPOSE + PROTOTYPE · V1**

```
00 · SOURCE REGISTER
    Source disposition table (all nodes with ADOPT/ADAPT/STRUCTURAL_REFERENCE/ARCHIVE_CANDIDATE)

01 · ROUTE PURPOSE ATLAS
    Functional identity cards for all 13 /open-lab routes + homepage slot + PDP slot

02 · COMPONENT FAMILY ATLAS
    17 editorial components + inherited OLUK components + missing candidates

03 · PORTAL / LIBRARY CHAMPION
    OPENLAB_PORTAL_LIBRARY_SELECTION_01 at 1440 + 390
    Multi-product editorial portal using EvidenceHero + EvidenceLedger + BatchRecordTable

04 · MK-2866 SINGLE-PRODUCT CHAMPION
    OPENLAB_COMPOUND_RECORD_MK2866_SELECTION_01 at 1440 + 390
    All 17 editorial components in compound dossier layout

05 · PDP EVIDENCE SNAPSHOT
    ProductEvidenceSnapshot for /product/:slug placement
    Compact: HplcPeakProfile + EvidenceStatus + ReportAction

06 · RECORD / REPORT / COA
    Record detail, report presentation, CoA viewer candidates

07 · STATE + RESPONSIVE MATRIX
    All 4 honesty states × all 4 breakpoints for key components

08 · DISPOSITION + SUPERSESSION
    Duplicates archived, heroes resolved, card grammar deduplicated

09 · CODEX ADOPTION RECEIPT
    Status: CANDIDATE_PENDING_HUMAN_REVIEW
    All created node IDs, route-slot candidates, implementation order
```

---

## EVIDENCE HONESTY RULES (FAIL-CLOSED)

| Rule | Enforcement |
|---|---|
| >99% is a display comparator | Do NOT convert to 99, average, or generate time series |
| HPLC peak profile | Draw ONLY from source-owned structured numeric points |
| "Structured Peak Summary" | Correct label. NOT "Chromatogram" unless actual chromatogram data |
| CoA viewer | Display ONLY supplied report/image/PDF. If missing → UNAVAILABLE state |
| Aggregate counts | Do NOT invent record counts, average purity, lab names, batch IDs, dates |
| "Live" feeds | Do NOT create live/realtime data feeds from static projections |
| Evidence dimensions | Keep HPLC-MS purity, HPLC-DAD concentration, GC-MS identification as SEPARATE dimensions |
| Identifier format | Cards: "MK-2866 · OL2201". Detail: full canonical ID. Never invent 5-char abbreviations. |

---

## DESIGN SYSTEM INHERITANCE RULES

OpenLab is an **editorial evidence expression of the same OLUK identity system** — not a separate blue dashboard.

| Rule | Value |
|---|---|
| Canvas | Luminous cool light |
| Content planes | Raised white |
| Accent | Cobalt (existing --oluk-accent-cobalt) |
| Display headings | Plus Jakarta Sans ExtraBold |
| Body & UI | Inter Variable |
| Dark/inverse | Footer only (sanctioned) |
| Media | Accepted OLUK product renders |
| Responsive | Recomposition, not desktop scaling |
| Variables | Use named --oluk-* tokens, not hard-coded values |
| New colors | Do NOT create colors merely to distinguish OpenLab |

---

## ACCEPTANCE CHECKS

- [ ] Portal and MK-2866 compound jobs are no longer conflated
- [ ] Customer-facing boards contain no backend projection prose
- [ ] Every visualization is source-backed or honestly unavailable
- [ ] CoA viewer is distinct from structured peak summary
- [ ] Shared commerce primitives (ProductCommerceCard, PurchasePanel, etc.) are visibly inherited
- [ ] All champion nodes use current OLUK identity tokens
- [ ] 1440, 1024, 768, and 390 share one component family
- [ ] Each route/module has who, what, why, when, how, and where
- [ ] Every route placement has a CANDIDATE_SLOT_ID
- [ ] Duplicates have recorded disposition
- [ ] Exact Figma nodes and pending adoption receipt returned
- [ ] Nothing is labeled production-approved
- [ ] No payment/Woo mutation/BiasPay in evidence surfaces
- [ ] /open-lab prefix used (NOT /openlab shorthand)

## RISK NOTES

- **1838:12778 conflation** — The editorial selection mixes portal + compound. Must split before Codex implements.
- **CoaViewer component** — MISSING_SOURCE. No Figma component exists. Requires architecture decision (embed vs. new tab).
- **Peak profile data format** — Backend API must supply structured numeric points for HplcPeakProfile. Format TBD.
- **7 duplicate route compositions** — Must canonicalize 1082:xxxxx, archive 1822:xxxxx before implementation.
- **HeroOpenLab-light 18px delta** — 1791:76121 (1079h) must be superseded by 1791:77015 (1061h).
- **EvidenceOS-Editorial** (1572:72278) — Unproofed concept. Do not implement until owner decision.
- Olympus runtime/payment/security concerns out of scope per codex-bridge rules.

## OPEN ITEMS

- [ ] Owner decision: Split 1838:12778 into portal + compound champions (this packet proposes the split)
- [ ] Owner decision: CoaViewer embed architecture (iframe PDF, image viewer, or external link)
- [ ] Owner decision: EvidenceOS-Editorial — promote or archive?
- [ ] Backend: Evidence API schema for compound-scoped batch record projection
- [ ] Backend: HPLC peak profile structured numeric data format
- [ ] Design: Create CompoundIdentityHeader component
- [ ] Design: Create ProductEvidenceSnapshot for PDP placement
- [ ] Design: 1024 and 768 responsive proofs for all editorial components
- [ ] Design: Full state matrix (verified × source-reported × source-only × unavailable) for each component
- [ ] Figma: Build OPENLAB · PURPOSE + PROTOTYPE · V1 page with 10 sections

## NEXT EXECUTABLE EDGE

**Phase 0.1:** Create the OPENLAB · PURPOSE + PROTOTYPE · V1 page. Build Section 00 (Source Register) and Section 01 (Route Purpose Atlas) programmatically from this packet's disposition table and functional identity records. This unblocks Phase 1 (champion split prototyping) without waiting on any owner decisions.
