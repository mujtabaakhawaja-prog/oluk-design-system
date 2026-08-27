# FIGMA_TO_CODEX_PACKET — OpenLab / EvidenceOS Route Purpose, Functional Identity, Visual Identity & Champion Prototype Compiler

## STATUS: PHASE 0 COMPLETE — SECTIONS 00-02, 08-09 BUILT

**Last updated:** 2026-08-27
**Figma file:** BEPMuUt1HroEw8xjz8CVyN
**Page:** OPENLAB · PURPOSE + PROTOTYPE · V1 [1920:422]

### CREATED FIGMA NODES

| Section | Section Node | Content Frame | Status |
|---|---|---|---|
| 00 · SOURCE REGISTER | 1920:423 | 1923:422 (23 source entries) | ✅ BUILT |
| 01 · ROUTE PURPOSE ATLAS | 1920:424 | 1925:422 (13 route cards) | ✅ BUILT |
| 02 · COMPONENT FAMILY ATLAS | 1920:425 | 1926:422 (15 component families) | ✅ BUILT |
| 03 · PORTAL / LIBRARY CHAMPION | 1920:426 | — | ⏳ PLACEHOLDER (design agent) |
| 04 · MK-2866 SINGLE-PRODUCT CHAMPION | 1920:427 | — | ⏳ PLACEHOLDER (design agent) |
| 05 · PDP EVIDENCE SNAPSHOT | 1920:428 | — | ⏳ PLACEHOLDER (design agent) |
| 06 · RECORD / REPORT / COA | 1920:429 | — | ⏳ PLACEHOLDER (design agent) |
| 07 · STATE + RESPONSIVE MATRIX | 1920:430 | — | ⏳ PLACEHOLDER (design agent) |
| 08 · DISPOSITION + SUPERSESSION | 1920:431 | 1931:422 (20 disposition entries) | ✅ BUILT |
| 09 · CODEX ADOPTION RECEIPT | 1920:432 | 1926:469 | ✅ BUILT |

---

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

## OWNER DECISIONS — ALL RESOLVED

| Decision | Resolution | Date |
|---|---|---|
| HeroOpenLab-light preference | 1791:76121 (1079px) preferred over 1791:77015 (1061px) | 2026-08-27 |
| EvidenceOS-Editorial (1572:72278) | ADAPT → OL-EDITORIAL-TEASER. Compact evidence staging: left = lab record/report visual, right = HPLC chart | 2026-08-27 |
| Chromatogram format | Deferred to Codex decision | 2026-08-27 |
| Champion split (1838:12778) | Required — portal (multi-product) vs compound record (single-product MK-2866) | 2026-08-27 |

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

### EVIDENCE CHARTS — 1890:77164 (SECTION · 3200×19500 · 00 — Authority & Run Control)

| Node ID | Name | Dimensions | Disposition | Content |
|---|---|---|---|---|
| 1890:77165 | EC Light 1440 | ~1440×wide | **ADOPT** | Full HPLC trace, Compact PDP+Archive, Structured peak view, Public record trend, Missing-chart state |
| + 5 variants | EC Light 1024/768/390 + pixel refs | Various | **ADOPT** | 6 responsive variants × 6 chart modes |

### FULL ROUTE COMPOSITIONS — MF-01 & MF-02 (369:5500)

| Node ID | Name | Dimensions | Disposition | Canonical Route |
|---|---|---|---|---|
| 1082:29137 | openlab-portal-index | 1440×3299 | **STRUCTURAL_REFERENCE** | /open-lab |
| 1082:29460 | openlab-lab-records-archive | 1440×2281 | **STRUCTURAL_REFERENCE** | /open-lab/records |
| 1082:29876 | openlab-dossier-mk2866 | 1440×2742 | **STRUCTURAL_REFERENCE** | /open-lab/compound/:slug |
| 1082:30382 | openlab-report-detail | 1440×1824 | **STRUCTURAL_REFERENCE** | /open-lab/records/:recordId |
| 1082:30582 | openlab-batch-lookup | 1440×1064 | **STRUCTURAL_REFERENCE** | /open-lab/batch-lookup |
| 1082:30895 | openlab-compare | 1440×1467 | **STRUCTURAL_REFERENCE** | /open-lab/compare |
| 1082:30967 | openlab-evidenceos-command | 1440×1024 | **DATA_ANATOMY_ONLY** | /open-lab/evidence |

### DUPLICATE COMPOSITIONS — 1822:xxxxx series → ARCHIVE_CANDIDATE

7 duplicates of the 1082 series. All marked ARCHIVE_CANDIDATE, canonicalized to 1082 originals.

### HERO CANDIDATES — MF-03 (1660:422)

| Node ID | Name | Dimensions | Disposition | Reason |
|---|---|---|---|---|
| 1791:76121 | HeroOpenLab-light | 1512×1079 | **ADOPT** | ✓ Owner-preferred variant |
| 1791:77015 | HeroOpenLab-light | 1512×1061 | **ARCHIVE_CANDIDATE** | Owner prefers 1791:76121 |

### CARD GRAMMAR — (1572:70623)

| Node ID | Name | Disposition | Reason |
|---|---|---|---|
| 1572:72605 | Embedded:margin | **ARCHIVE_CANDIDATE** | Duplicate |
| 1572:73836 | Embedded:margin | **ARCHIVE_CANDIDATE** | Duplicate |
| 1572:73567 | Realtime:margin | **ARCHIVE_CANDIDATE** | Duplicate |
| 1572:72278 | EvidenceOS-Editorial | **ADAPT** | Promoted → OL-EDITORIAL-TEASER for compact evidence staging |

### CROSS-FILE SOURCES

| File | Node | Disposition | Reason |
|---|---|---|---|
| GkC3KEt9V3RyG5K319iAUV | r6-coa-viewer (12:984) | **DATA_ANATOMY_ONLY** | R6 dark-theme. Content hierarchy useful. Only extrapolatory per owner. |
| GkC3KEt9V3RyG5K319iAUV | r6-mobile-coa-viewer (12:1620) | **DATA_ANATOMY_ONLY** | R6 dark mobile. Same assessment. |
| 67dsmMdok9JnLZ5GCdRhBL | EvidenceOS-Editorial (6:3962) | **ADAPT** | Codex Sites instance → OL-EDITORIAL-TEASER |

---

## CHAMPION SPLIT SPECIFICATION

The editorial selection 1838:12778 conflates single-product (MK-2866 compound record) and multi-product (portal/library) purposes. Split into two independent champion candidates.

### A. OPENLAB_PORTAL_LIBRARY_SELECTION_01

**Customer job:** "I want to understand what evidence Olympus Labs has for all their products and explore their testing transparency."

**Route:** /open-lab
**Product context:** Multi-product
**Shell:** AppShell + OpenLabContextNav + openlab-mega-menu-panel

**Required sections (top to bottom):**
1. EvidenceHero (1841:427 / 1843:745) — Multi-product editorial gateway
2. EvidenceLedger (1841:446) — Chain of custody explanation
3. Compound navigation grid — Multi-product cards (NOT MK-2866 only)
4. BatchRecordTable (1841:507 / 1843:798) — Recent admitted records across products
5. Archive continuation CTA → /open-lab/records
6. Comparison/wayfinding module → /open-lab/compare

### B. OPENLAB_COMPOUND_RECORD_MK2866_SELECTION_01

**Customer job:** "I want to see all evidence for MK-2866 specifically."

**Route:** /open-lab/compound/:slug (first instance: /open-lab/compound/mk-2866)
**Product context:** Single-product (MK-2866: Ostarine, SKU 80529-01, 15 mg, 90 servings, >99% purity, £43)

**Required sections (top to bottom):**
1. Compound identity header
2. HplcPurityTrace (1839:455 / 1843:785)
3. HplcPeakProfile (1864:13254 / 1864:13261)
4. LabRecord (1839:428 / 1843:763)
5. AnalytePeakTable (1839:470)
6. EvidenceStatus (1839:424)
7. ReportAction (1839:422)
8. RecordHistory (1856:13238)
9. Methodology (1841:559)
10. SourceCustody (1841:570)
11. Related compounds continuation

---

## FUNCTIONAL IDENTITY RECORDS — PRIORITY ROUTES

### FID-001: OpenLab Portal

```
concernId: openlab-portal
name: OpenLab Evidence Portal
customerWho: A prospective or returning buyer evaluating testing transparency
customerQuestion: "How do I know these products are what they claim to be?"
customerJob: Discover evidence ecosystem, understand methodology, browse results, navigate to compounds
whyItExists: Trust conversion — evidence-aware customers buy with higher confidence and AOV
whenItAppears: Header mega-menu, footer link, homepage evidence CTA
commerceValue: Trust-driven conversion lift (not a direct purchase surface)
trustValue: PRIMARY — trust anchor for the brand
primitiveData: Admitted batch records (multi-product), methodology, compound list, evidence status
dataOwner: Evidence API (read-only projection)
evidenceEligibility: fail-closed per 4-state honesty
componentFamily: OpenLabPortal
routeFamily: /open-lab
candidateRouteSlots: CANDIDATE_SLOT_ID:openlab-portal-hero, CANDIDATE_SLOT_ID:openlab-portal-ledger, CANDIDATE_SLOT_ID:openlab-portal-compounds, CANDIDATE_SLOT_ID:openlab-portal-records, CANDIDATE_SLOT_ID:openlab-portal-archive-cta
responsiveLaw: 1440 two-column | 1024 narrowed | 768 stacked | 390 single-column table→card
contentRules: No invented metrics, no aggregate purity averages, no "live" feeds
implementationConsumer: app/(open-lab)/page.tsx
```

### FID-002: Compound Dossier (MK-2866 first)

```
concernId: openlab-compound-dossier
name: Compound Evidence Dossier
customerWho: A buyer researching a specific compound's testing history
customerQuestion: "What exactly has been tested for MK-2866 and what were the results?"
customerJob: See all admitted evidence for one compound — purity, analytes, records, methodology, report access
whyItExists: Deep trust for considered purchase
whenItAppears: Click from portal compound card, PDP evidence link, or direct URL
commerceValue: High-intent purchase validation
trustValue: CRITICAL — product-specific evidence is the strongest trust signal
primitiveData: Compound identity, batch/report records, HPLC peak data (source-bound), analyte measurements, methodology, custody
dataOwner: Evidence API (compound-scoped projection)
evidenceEligibility: fail-closed. Peak profile from source-owned numeric points only.
componentFamily: OpenLabCompoundDossier
routeFamily: /open-lab/compound
candidateRouteSlots: CANDIDATE_SLOT_ID:compound-identity-header, CANDIDATE_SLOT_ID:compound-peak-summary, CANDIDATE_SLOT_ID:compound-peak-profile, CANDIDATE_SLOT_ID:compound-lab-record, CANDIDATE_SLOT_ID:compound-analyte-table, CANDIDATE_SLOT_ID:compound-evidence-status, CANDIDATE_SLOT_ID:compound-report-action, CANDIDATE_SLOT_ID:compound-record-history, CANDIDATE_SLOT_ID:compound-methodology, CANDIDATE_SLOT_ID:compound-source-custody, CANDIDATE_SLOT_ID:compound-related-cta
responsiveLaw: 1440 two-column | 1024 narrowed | 768 stacked | 390 single-column linear
contentRules: Peak profile from source-owned structured numeric points ONLY. Label "Structured Peak Summary" NOT "Chromatogram". Do not invent intermediate values from >99%.
implementationConsumer: app/(open-lab)/compound/[slug]/page.tsx
```

---

## COMPONENT FAMILY REGISTRY (15 families documented in section 02)

### OpenLabEvidence family (17 components from 1838:12778)

| Family | Desktop | Mobile | Customer Job |
|---|---|---|---|
| EvidenceHero | 1841:427 | 1843:745 | Multi-product trust gateway |
| EvidenceLedger | 1841:446 | reflows | Chain of custody narrative |
| BatchRecordTable | 1841:507 | 1843:798 | Record browsing + search |
| LabRecord | 1839:428 | 1843:763 | Single record card |
| HplcPurityTrace | 1839:455 | 1843:785 | Structured peak summary |
| HplcPeakProfile | 1864:13254 | 1864:13261 | 5-peak source-bound profile |
| AnalytePeakTable | 1839:470 | table→card | Analyte measurements |
| Methodology | 1841:559 | reflows | Testing methodology |
| SourceCustody | 1841:570 | reflows | Source chain & custody |
| RecordHistory | 1856:13238 | reflows | Record timeline row |
| EvidenceStatus | 1839:424 | same | 4-state honesty chip |
| ReportAction | 1839:422 | same | Report view/download CTA |

### Inherited OLUK concerns

ProductCommerceCard, PurchasePanel, ProductMediaChamber, AttributeChip, QualitativeChip, ProductMetricRail, TrustEvidenceSpine / AssuranceRail, EvidenceStatus, InventoryStatus

### Missing components (CANDIDATE for creation)

| Candidate | Purpose | Route | Status |
|---|---|---|---|
| CoaViewer | CoA/report document viewer | /open-lab/coa/:id | MISSING_SOURCE |
| CompoundIdentityHeader | Compound name + badge + nav | /open-lab/compound/:slug | Compose from primitives |
| ProductEvidenceSnapshot | Compact evidence teaser for PDP | /product/:slug | Compose from HplcPeakProfile + EvidenceStatus + ReportAction |
| EvidenceComparisonTable | Side-by-side comparison | /open-lab/compare | MISSING_SOURCE |

---

## EVIDENCE HONESTY RULES (FAIL-CLOSED)

| Rule | Enforcement |
|---|---|
| >99% is a display comparator | Do NOT convert to 99, average, or generate time series |
| HPLC peak profile | Draw ONLY from source-owned structured numeric points |
| "Structured Peak Summary" | Correct label. NOT "Chromatogram" unless actual chromatogram data |
| CoA viewer | Display ONLY supplied report/image/PDF. If missing → UNAVAILABLE |
| Aggregate counts | Do NOT invent record counts, average purity, lab names, batch IDs, dates |
| "Live" feeds | Do NOT create live/realtime data feeds from static projections |
| Evidence dimensions | Keep HPLC-MS purity, HPLC-DAD concentration, GC-MS identification SEPARATE |
| Identifier format | Cards: "MK-2866 · OL2201". Detail: full canonical ID. |

---

## DISPOSITION + SUPERSESSION REGISTER (20 entries in section 08)

| Category | Count | Disposition |
|---|---|---|
| Duplicate route compositions (1822 series) | 7 | SUPERSEDE → canonicalize to 1082 series |
| Duplicate card grammar instances | 2 entries (3+2 instances) | DEDUPLICATE |
| Dark Codex proof pages (A1-A6) | 6 | STRUCTURAL_REFERENCE |
| HeroOpenLab-dark (1791:77015) | 1 | ARCHIVE_CANDIDATE |
| R6 CoA Viewers (cross-file) | 2 | DATA_ANATOMY_ONLY |
| EvidenceOS-Editorial | 1 | ADAPT → OL-EDITORIAL-TEASER |
| 1838:12778 (conflated) | 1 | ADAPT → split into portal + compound champions |

---

## IMPLEMENTATION ORDER (proposed)

1. Governed fixture file (authority/fixtures/openlab-evidence-fixtures.json)
2. Evidence Charts components (contract: 1890:77164)
3. openlab-realtime component (HPLC trace + batch table)
4. OL-EDITORIAL-TEASER redesign
5. ProductEvidenceSnapshot for PDP
6. LabRecord + HplcPurityTrace components
7. Portal composition
8. Compound dossier composition
9. Records archive
10. CoA Viewer (awaits OLUK design direction)

---

## ACCEPTANCE STATUS

- [x] Portal and MK-2866 compound jobs are no longer conflated (champion split specified)
- [x] Source register built (23 entries, section 00)
- [x] Route purpose atlas built (13 routes, section 01)
- [x] Component family atlas built (15 families, section 02)
- [x] Disposition + supersession register built (20 entries, section 08)
- [x] Codex adoption receipt built (section 09)
- [x] Every route placement has a CANDIDATE_SLOT_ID
- [x] Duplicates have recorded disposition
- [x] /open-lab prefix used (NOT /openlab shorthand)
- [x] Nothing is labeled production-approved
- [ ] Champion prototype boards (sections 03-07) — PENDING design agent
- [ ] 1440, 1024, 768, and 390 responsive proofs — PENDING
- [ ] Full state matrix (4 states × 4 breakpoints) — PENDING

---

## UNRESOLVED HUMAN DECISIONS

1. Champion prototype visual approval (sections 03-07 await design creation)
2. EvidenceOS-Editorial right-column redesign approval
3. HeroOpenLab-light (1791:76121) spacing tightening approval
4. CoA Viewer OLUK design direction approval

---

## NEXT EXECUTABLE EDGE

**For Figma:** Build champion prototype boards in sections 03-07 using the design agent — portal at 1440+390, MK-2866 compound at 1440+390, PDP evidence snapshot, record/report/CoA compositions, and state+responsive matrix.

**For Codex (controller):**
1. Replace stale "Figma file required" hold with file BEPMuUt1HroEw8xjz8CVyN and page 1920:422
2. Ingest source-disposition register (23 entries) and candidate-slot registries
3. Bind champion/version into pending receipt at CANDIDATE_PENDING_HUMAN_REVIEW
4. After visual approval → unlock bounded Design producer lock
5. Then sequence: C2 compatibility → Native Next route-slot adoption → deployment → public readback

**Status:** CANDIDATE_PENDING_HUMAN_REVIEW
This receipt does NOT claim Native Next adoption, deployment, or production acceptance.
