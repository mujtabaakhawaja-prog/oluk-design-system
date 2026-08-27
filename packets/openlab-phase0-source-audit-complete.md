# FIGMA_AGENT_RESPONSE — Phase 0 Source Audit Complete

**File:** BEPMuUt1HroEw8xjz8CVyN
**Date:** 2026-08-27
**Status:** CANDIDATE_PENDING_HUMAN_REVIEW
**Scope:** OPENLAB / EvidenceOS — Full Source Inventory, Disposition Register, Hero Spacing Audit, COA Viewer Structural Audit

---

## 1. INVENTORY COUNTS

| Category | Count |
|----------|-------|
| Required source nodes inspected | 13 / 13 |
| Published COMPONENT nodes (OpenLab family) | 17 |
| Published COMPONENT_SET nodes (OpenLab family) | 4 |
| Local FRAME route compositions | 7 (+ 7 duplicates = 14 total) |
| MAKE page evidence modules | 7 |
| OpenLab Spine page modules | 35 children total |
| COA Viewer frames (current page) | 8 |
| Evidence Charts section frames | 12 (6 route + 6 pixel ref) |
| Editorial module compositions (1838:12778) | 2 breakpoints (1440 + 390) |
| Total OpenLab-related frames across file | 78+ |
| Pages containing OpenLab content | 8 |

---

## 2. SOURCE DISPOSITION REGISTER

### A. PUBLISHED COMPONENTS (Page: 09 — Component Library, Section 1838:12778)

| Node ID | Name | Type | Size | Disposition | Route Slot |
|---------|------|------|------|-------------|------------|
| 1839:422 | OpenLab / ReportAction / Customer | COMPONENT | 172×44 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-report-action` — /open-lab/report/:batchId, /open-lab/coa/:id |
| 1839:424 | OpenLab / EvidenceStatus / Source Reported | COMPONENT | 136×20 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-evidence-status` — all /open-lab routes |
| 1839:428 | OpenLab / LabRecord / Customer | COMPONENT | 591×247 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-lab-record-card` — /open-lab/records/:recordId, /product/:slug |
| 1839:455 | OpenLab / HplcPurityTrace / Customer | COMPONENT | 591×422 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-hplc-purity-trace` — /open-lab/records/:recordId, /product/:slug |
| 1839:470 | OpenLab / AnalytePeakTable / Customer | COMPONENT | 620×314 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-analyte-peak-table` — /open-lab/records/:recordId |
| 1841:427 | OpenLab / EvidenceHero / Customer | COMPONENT | 1248×450 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-evidence-hero` — /open-lab portal hero |
| 1841:446 | OpenLab / EvidenceLedger / Customer | COMPONENT | 1248×437 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-evidence-ledger` — /open-lab, /open-lab/records |
| 1841:507 | OpenLab / BatchRecordTable / Customer | COMPONENT | 1248×324 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-batch-record-table` — /open-lab/records, /open-lab/compound/:slug |
| 1841:559 | OpenLab / Methodology / Customer | COMPONENT | 620×292 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-methodology-card` — /open-lab/methodology, /open-lab/records/:recordId |
| 1841:570 | OpenLab / SourceCustody / Customer | COMPONENT | 620×428 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-source-custody` — /open-lab/source-chain, /open-lab/records/:recordId |
| 1856:13238 | OpenLab / RecordHistory / Customer | COMPONENT | 620×56 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-record-history` — /open-lab/records/:recordId |
| 1864:13254 | OpenLab / HplcPeakProfile / FivePeaks / Desktop | COMPONENT | 549×176 | **ADOPT** | CANDIDATE_SLOT_ID: `ol-hplc-peak-profile` — /open-lab/records/:recordId |
| 1864:13261 | OpenLab / HplcPeakProfile / FivePeaks / Mobile | COMPONENT | 302×130 | **ADOPT** | Same family as above (responsive variant) |
| 1843:745 | OpenLab / EvidenceHero / Customer / Mobile | COMPONENT | 366×997 | **ADOPT** | Mobile variant of `ol-evidence-hero` |
| 1843:763 | OpenLab / LabRecord / Customer / Mobile | COMPONENT | 334×520 | **ADOPT** | Mobile variant of `ol-lab-record-card` |
| 1843:785 | OpenLab / HplcPurityTrace / Customer / Mobile | COMPONENT | 334×370 | **ADOPT** | Mobile variant of `ol-hplc-purity-trace` |
| 1843:798 | OpenLab / BatchRecordTable / Customer / Mobile | COMPONENT | 366×406 | **ADOPT** | Mobile variant of `ol-batch-record-table` |

### B. PUBLISHED COMPONENT SETS (Shared OLUK assets)

| Node ID | Name | Type | Size | Disposition | Notes |
|---------|------|------|------|-------------|-------|
| 556:34022 | TrustEvidenceSpine / AssuranceCell | COMPONENT_SET | 674×932 | **ADOPT** | 10 variants: claim=01–05 × density=full\|compact |
| 556:34122 | TrustEvidenceSpine / AssuranceRail | COMPONENT_SET | 1290×642 | **ADOPT** | density=full (1290×254) \| compact (350×164) |
| 1326:7659 | Stack / OpenLabConfidence | COMPONENT_SET | 1106×1179 | **ADAPT** | State=Foundation\|Maximum × Width=Desktop\|Mobile — needs route binding |
| 1374:853 | Stack / OpenLabConfidence v3 | COMPONENT_SET | 358×1231 | **SUPERSEDE** → 1326:7659 | v3 mobile refresh — consolidate into main set |

### C. PUBLISHED COMPONENTS (Navigation)

| Node ID | Name | Type | Size | Disposition |
|---------|------|------|------|-------------|
| 1199:28750 | openlab-mega-menu-panel | COMPONENT | 1440×380 | **ADOPT** |
| 1215:29690 | OpenLabContextNav | COMPONENT_SET | 1440×142 | **ADOPT** — Width=Desktop (1440×48) \| Mobile (390×52) |
| 1263:5683 | OLUK / OpenLabPortalHero / Width=Desktop | COMPONENT | 1344×1061 | **STRUCTURAL_REFERENCE** — published but outdated vs. MF-03 candidates |

### D. HERO CANDIDATES (Page: 26 — MF-03 Native Review Options)

| Node ID | Name | Size | Disposition | Reason |
|---------|------|------|-------------|--------|
| 1791:76121 | HeroOpenLab-light (A) | 1512×1079 | **ADOPT** ✅ CANONICAL | Owner-selected. Spread 7 corrected. Requires spacing tightening (see §3) |
| 1791:77015 | HeroOpenLab-light (B) | 1512×1061 | **ARCHIVE_CANDIDATE** | Was default canonical height but owner chose A |

### E. ROUTE COMPOSITIONS (Page: WS — MF-01 & MF-02 · Primary Workspace)

All are local FRAME type — not components. All have ⚠ DUP (duplicate at 1822:xxxxx).

| Node ID | Name | Size | Route | Disposition |
|---------|------|------|-------|-------------|
| 1082:29137 | openlab-portal-index | 1440×3299 | /open-lab | **STRUCTURAL_REFERENCE** — 5 sections (Hero, Philosophy, Compound, Batch-Table, Metrics). Dark theme. DUP at 1822:77602 |
| 1082:29460 | openlab-lab-records-archive | 1440×2281 | /open-lab/records | **STRUCTURAL_REFERENCE** — 5 sections (Filters, Summary, Table, Pagination, Methodology). Dark. DUP at 1822:77931 |
| 1082:29876 | openlab-dossier-mk2866 | 1440×2742 | /open-lab/compound/mk-2866 | **STRUCTURAL_REFERENCE** — 3 sections (Header, Details, Related). Dark. DUP at 1822:78399 |
| 1082:30382 | openlab-report-detail | 1440×1824 | /open-lab/report/:batchId | **STRUCTURAL_REFERENCE** — 1 content wrapper. Dark. DUP at 1822:78688 |
| 1082:30582 | openlab-batch-lookup | 1440×1064 | /open-lab/batch-lookup | **STRUCTURAL_REFERENCE** — 2 sections. Dark. DUP at 1822:78889 |
| 1082:30895 | openlab-compare | 1440×1467 | /open-lab/compare | **STRUCTURAL_REFERENCE** — 2 sections. Dark. DUP at 1822:79207 |
| 1082:30967 | openlab-evidenceos-command | 1440×1024 | /open-lab/evidence | **STRUCTURAL_REFERENCE** — 2 sections. Dark. DUP at 1822:79280 |

**CRITICAL:** All 7 route compositions are dark theme. Per AGENTS.md: "Light mode only for the active lane." These are structural reference only — light champions required.

### F. EVIDENCE MODULES (Page: 26 — MF-03, current page 1660:422)

| Node ID | Name | Size | Disposition | Notes |
|---------|------|------|-------------|-------|
| 1791:75921 | EvidenceA | 1512×1074 | **ADOPT** | Full-width: HPLC trace + Ledger + Batch Records |
| 1791:76375 | EvidenceArchive:margin | 1512×579 | **ADOPT** | Archive at review width |
| 1791:76513 | EvidencePortal:margin | 1512×520 | **ADOPT** | Portal entry module |
| 1791:76641 | EmbeddedEvidence:margin | 1512×735 | **ADOPT** | Embedded evidence review width |
| 1791:76826 | OpenLabArchive | 1075×470 | **ADOPT** | CanvasSplit: editorial + ledger |
| 1791:76921 | OpenLabArchivealt | 1075×419 | **ARCHIVE_CANDIDATE** | Alternate split — choose one |
| 1791:77147 | OpenLabBanner | 1171×671 | **ADOPT** | ProductBanner (header+body+footer) |
| 1791:77408 | openlab-realtime | 693×660 | **ADAPT** | HPLC purity trace + batch records — needs real data shape |

### G. MAKE PAGE MODULES (Page: WS — MAKE, 1384:15043)

| Node ID | Name | Size | Disposition | Notes |
|---------|------|------|-------------|-------|
| 1384:16556 | EvidenceD | 1440×851 | **STRUCTURAL_REFERENCE** | Evidence decision hero |
| 1384:17075 | EmbeddedEvidence:margin | 1184×514 | **STRUCTURAL_REFERENCE** | MAKE variant — narrower than MF-03 |
| 1384:17238 | CanvasSplit | 1184×439 | **STRUCTURAL_REFERENCE** | Canvas split layout |
| 1384:17333 | EmbeddedEvidence | 1184×506 | **STRUCTURAL_REFERENCE** | Without margin |
| 1384:17462 | CanvasSplit:margin | 1184×470 | **STRUCTURAL_REFERENCE** | Canvas split + margin |
| 1384:17747 | Dossier | 1440×1372 | **ADOPT** | Full product dossier — best existence proof of real data + identity |

### H. OPENLAB PAGE COMPOSITIONS (Page: 18 — OpenLab)

| Node ID | Name | Size | Disposition | Notes |
|---------|------|------|-------------|-------|
| 1519:715 | OPENLAB PORTAL / OPTION 01 / PRODUCT RECORD ENTRY | 1512×1660 | **STRUCTURAL_REFERENCE** | Portal option — Figma-authored, light theme |
| 1520:734 | OPENLAB RECORD / OPTION 01 / PRODUCT INFORMATION VIEW | 1512×1560 | **STRUCTURAL_REFERENCE** | Record view — Figma-authored, light theme |
| 879:2683 | CONV-003 · OpenLab Acceptance Receipt | 1000×1200 | **DATA_ANATOMY_ONLY** | Historical acceptance receipt format |

### I. CODEX-PROJECTED DARK ROUTES (Page: 01 — Brand Overview)

| Node ID | Name | Size | Disposition | Notes |
|---------|------|------|-------------|-------|
| 1424:32006 | Homepage / 1440 / Dark | 1440×4623 | **STRUCTURAL_REFERENCE** | Dark theme — violates AGENTS.md |
| 1424:33061 | Branded Lab Record / 1440 / Dark | 1440×2851 | **STRUCTURAL_REFERENCE** | Dark theme |
| 1424:33484 | Lab Records / 1440 / Dark | 1440×1020 | **STRUCTURAL_REFERENCE** | Dark theme |
| 1424:33718 | Methodology / 1440 / Dark | 1440×1553 | **STRUCTURAL_REFERENCE** | Dark theme |
| 1424:33853 | Source Chain / 1440 / Dark | 1440×2380 | **STRUCTURAL_REFERENCE** | Dark theme |
| 1424:35082 | EvidenceOS / 1440 / Dark | 1440×5571 | **STRUCTURAL_REFERENCE** | Dark theme — full EvidenceOS command centre |

### J. COA VIEWER FRAMES (Added to current page from OPENLAB reference)

| Node ID | Name | Size | Theme | Disposition | Notes |
|---------|------|------|-------|-------------|-------|
| 1905:79576 | r6-coa-viewer | 1440×1999 | Dark | **ADAPT** | Desktop COA — batch table structure usable, chromatogram placeholder, needs light theme |
| 1905:79798 | r6-coa-viewer | 1440×1999 | Dark (navy variant) | **ARCHIVE_CANDIDATE** | Near-duplicate of 79576 — canonicalize to one |
| 1905:79715 | r6-mobile-coa-viewer | 390×844 | Dark | **REJECT** | Empty shell — nav only, no content |
| 1905:79937 | r6-mobile-coa-viewer | 390×867 | Dark | **ADAPT** | Best mobile COA — real content structure (5 test results, lab info, QR) |
| 1905:79730 | Frame | 390×759 | Dark | **DATA_ANATOMY_ONLY** | Content-only (no shell) — data shape reference |
| 1905:80065 | 04 / COA Viewer + Batch Comparison | 1440×580 | Dark | **ADAPT** | Section module — two INSTANCE cards (COA Report + Batch Comparison) |
| 1905:91167 | 05 / COA Viewer + Batch Comparison / G1 Light | 1440×580 | Light ✅ | **ADOPT** | Light theme section module — implementation-ready structure |
| 1905:80482 | OPENLAB DESTINATIONS / MACHINE REVIEW ROOT | 3440×55103 | Mixed | **DATA_ANATOMY_ONLY** | Massive review board — reference only |

### K. EVIDENCE CHARTS (Page: 00 — Authority, Section 1890:77164)

| Node ID | Name | Size | Disposition | Notes |
|---------|------|------|-------------|-------|
| 1890:77164 | Evidence Charts (SECTION) | 3200×19500 | **ADOPT** | Full breakpoint coverage |
| 1890:77165 | Evidence Charts / 1440 / Light | 1440×3383 | **ADOPT** | Desktop light ✅ |
| 1890:77565 | Evidence Charts / 1440 / Dark | 1440×3383 | **STRUCTURAL_REFERENCE** | Dark variant |
| 1890:77965 | Evidence Charts / 1024 / Light | 1024×2956 | **ADOPT** | Tablet light ✅ |
| 1890:78365 | Evidence Charts / 1024 / Dark | 1024×2956 | **STRUCTURAL_REFERENCE** | Dark variant |
| 1890:78765 | Evidence Charts / 390 / Light | 390×2556 | **ADOPT** | Mobile light ✅ |
| 1890:79167 | Evidence Charts / 390 / Dark | 390×2556 | **STRUCTURAL_REFERENCE** | Dark variant |

### L. EDITORIAL MODULE COMPOSITIONS (Section 1838:12778)

| Node ID | Name | Size | Disposition | Notes |
|---------|------|------|-------------|-------|
| 1838:12779 | OPENLAB_EDITORIAL_MODULE_MK2866_SELECTION_01 / 1440 | 1440×2915 | **ADOPT** | Desktop editorial — contains all 17 components |
| 1838:12780 | OPENLAB_EDITORIAL_MODULE_MK2866_SELECTION_01 / 390 | 390×5423 | **ADOPT** | Mobile editorial — responsive variant |
| 1842:479 | OpenLab / EvidenceApplicationFrame / 1440 / PortalLibraryComposition | 1248×2911 | **ADOPT** | Structured application frame |
| 1844:748 | OpenLab / EvidenceApplicationFrame / 390 / PortalLibraryComposition | 366×5391 | **ADOPT** | Mobile structured frame |

---

## 3. HERO SPACING AUDIT — Canonical 1791:76121

### Structure
```
HeroOpenLab-light (1512×1079, VERTICAL, gap:0, pad:0)
 └─ HeroLight (1344×1079, HORIZONTAL, gap:20, pad:48t/20r/0b/20l)
     ├─ LEFT: Unified Portal + Archive Card (440w)
     │   ├─ PortalCard Content (400h FIXED, pad:20 all, gap:16)
     │   │   ├─ Eyebrow (14h)
     │   │   ├─ Heading2 (pad-t:12) ⚠ TIGHT for ExtraBold display
     │   │   ├─ Paragraph:margin (pad-t:12)
     │   │   ├─ Search Container:margin (pad-t:22)
     │   │   └─ CTA Container:margin (pad-t:16) ⚠ TIGHT
     │   ├─ CobaltDensityBoundary (66h, pad:32t/32b) — 64px for 2px line
     │   ├─ ZZ/SUPERSEDED/Divider (420×2) ⚠ SUPERSEDED ELEMENT
     │   └─ "Every batch" content (pad:40 all, gap:16) ⚠ SPARSE vs 20px above
     │       ├─ Eyebrow (14h)
     │       ├─ Heading2 (pad-t:12)
     │       ├─ Paragraph:margin (pad-t:12)
     │       ├─ Stats Container:margin (pad-t:22)
     │       ├─ Search Container:margin (pad-t:16)
     │       └─ Link (39h FIXED, pad-t:18) ⚠ TIGHT
     └─ RIGHT: Container:cols-2-3 (906w)
         ├─ top-row (906×896, HORIZONTAL, gap:0)
         │   ├─ Media container (480w, center-aligned)
         │   └─ Cards container (420w, gap:12) ⚠ TIGHT for category cards
         └─ Bottom strip (906×135 FIXED, pad:0/24/0/24)
             ├─ Summary row (pad:17t/14b) ⚠ ASYMMETRIC
             └─ Category cards (792×96 FIXED)
```

### Recommended Spacing Changes

| Area | Current | Recommended | Reason |
|------|---------|-------------|--------|
| PortalCard Content padding | 20px all | 24px all | 5 children cramped in 400px FIXED |
| Eyebrow→Heading gap | 12px top | 16px top | Plus Jakarta ExtraBold needs breathing room |
| CTA Container top margin | 16px | 20px | Search→CTA transition too tight |
| "Every batch" section padding | 40px all | 32px all | 2× the PortalCard padding creates visual imbalance |
| Category card gap (right col) | 12px | 16px | Cards stacked in 420w need more separation |
| Bottom strip header | 17t/14b | 16t/16b | Normalize asymmetric padding |
| ZZ/SUPERSEDED/Divider | Present (420×2) | **REMOVE** | Named "ZZ / SUPERSEDED" — dead element |
| CobaltDensityBoundary | 66h (32t/2/32b) | Keep as-is | Governed rhythm per density system |

---

## 4. COA VIEWER MATURITY ASSESSMENT

### Ready for Prototype (governed fixture data)
- **Mobile COA** (1905:79937, 390×867): Real structure — Lab Info (Janoshik Analytical, ISO 17025, 12 Jun 2026), 5 Test Results (Identity=Confirmed, Purity HPLC=99.87%, Appearance=White Crystalline, Residue <0.01%, Heavy Metals=None Detected), QR archive, Download PDF CTA
- **Light section module** (1905:91167, 1440×580): Two instance cards — COA Report Viewer + Batch Comparison. Embeddable on PDP or /open-lab/records/:recordId

### Needs Design Work Before Prototype
- Desktop COA route: canonicalize 1905:79576 vs 1905:79798 (pick one, archive other)
- Empty mobile shell 1905:79715: REJECT — no content
- Chromatogram chart: replace spike placeholder with structured HPLC-DAD data or honest UNAVAILABLE state
- Batch comparison bars: add purity % values to labels
- Light-theme desktop route page: does not exist — create from section 05 template
- Generic "Frame" layer names: need semantic naming for implementation

### Evidence Honesty Issues
- Chromatogram in COA viewer shows a generic spike chart — **not source-owned structured numeric points**
- Per evidence honesty rules: if actual chromatogram data is absent, display honest UNAVAILABLE or SOURCE ONLY state
- Batch comparison shows batch IDs (R-2405, R-2409, R-2502, R-2507) but no purity values — either populate from source or mark SOURCE ONLY

---

## 5. ROUTE PURPOSE REGISTRY (Abbreviated — Full in Phase 1)

| Route | Customer Job | Component Family | Source Status |
|-------|-------------|-----------------|--------------|
| /open-lab | Multi-product editorial portal | EvidenceHero + EvidenceLedger + BatchRecordTable | Components ADOPTED, route composition STRUCTURAL_REFERENCE only (dark) |
| /open-lab/records | Searchable multi-product archive | EvidenceLedger + BatchRecordTable + filters | Components ADOPTED, route dark only |
| /open-lab/records/:recordId | Single record evidence state | LabRecord + HplcPurityTrace + AnalytePeakTable + Methodology + SourceCustody + RecordHistory | Components ADOPTED — strongest family |
| /open-lab/compound/:slug | Compound dossier | All single-product components | Components ADOPTED, Dossier frame at 1384:17747 |
| /open-lab/report/:batchId | Report detail | ReportAction + evidence state | Dark composition only |
| /open-lab/coa/:id | Supplied CoA viewer | COA Viewer frames | ADAPT — immature, needs light theme |
| /open-lab/batch-lookup | Exact batch lookup | Search + result state | Dark composition only |
| /open-lab/methodology | Methodology editorial | Methodology component | Component ADOPTED |
| /open-lab/source-chain | Source & custody narrative | SourceCustody component | Component ADOPTED |
| /open-lab/compare | Multi-product comparison | Batch Comparison instance | Section module exists (dark + light) |
| /open-lab/evidence | Evidence/trend presentation | Evidence Charts section | ADOPTED — full breakpoint coverage (1440/1024/390 × light/dark) |
| /product/:slug (PDP slot) | Single-product evidence snapshot | LabRecord + HplcPurityTrace + EvidenceStatus | Components ADOPTED, no dedicated PDP composition yet |
| Homepage evidence slot | Multi-product confidence preview | OpenLabConfidence stack | COMPONENT_SET exists, needs route binding |

---

## 6. CHAMPION SPLIT CONFIRMATION

### Current State
Node 1838:12778 (OPENLAB_EDITORIAL_MODULE_MK2866_SELECTION_01) **conflates** portal (multi-product) and record (single-product MK-2866) concerns in one section.

The EvidenceApplicationFrame (1842:479 desktop, 1844:748 mobile) inside it is named "PortalLibraryComposition" but contains single-product MK-2866 components (LabRecord, HplcPurityTrace, AnalytePeakTable).

### Required Split

**A. OPENLAB_PORTAL_LIBRARY_SELECTION_01**
- EvidenceHero (1841:427) — multi-product
- EvidenceLedger (1841:446) — multi-product
- BatchRecordTable (1841:507) — multi-product
- OpenLabConfidence stack — multi-product
- Archive continuation
- No single-compound dominance

**B. OPENLAB_COMPOUND_RECORD_MK2866_SELECTION_01**
- LabRecord (1839:428) — MK-2866 specific
- HplcPurityTrace (1839:455) — MK-2866 specific
- AnalytePeakTable (1839:470) — MK-2866 specific
- HplcPeakProfile (1864:13254) — MK-2866 specific
- Methodology (1841:559)
- SourceCustody (1841:570)
- RecordHistory (1856:13238)
- ReportAction (1839:422)
- EvidenceStatus (1839:424)

**Status:** CANDIDATE_PENDING_HUMAN_REVIEW — split not yet executed in Figma

---

## 7. DUPLICATE REGISTER

### Route Composition Duplicates (CANONICALIZE)
| Original | Duplicate | Route |
|----------|-----------|-------|
| 1082:29137 | 1822:77602 | /open-lab portal |
| 1082:29460 | 1822:77931 | /open-lab/records |
| 1082:29876 | 1822:78399 | /open-lab/compound/:slug |
| 1082:30382 | 1822:78688 | /open-lab/report/:batchId |
| 1082:30582 | 1822:78889 | /open-lab/batch-lookup |
| 1082:30895 | 1822:79207 | /open-lab/compare |
| 1082:30967 | 1822:79280 | /open-lab/evidence |

**Recommendation:** Keep 1082:xxxxx set as canonical structural reference, archive 1822:xxxxx set.

### COA Viewer Duplicates
| Keep | Archive | Reason |
|------|---------|--------|
| 1905:79576 | 1905:79798 | Near-identical desktop COA — canonicalize to one |

### Hero Duplicates (RESOLVED)
| Canonical | Archived | Reason |
|-----------|----------|--------|
| 1791:76121 (1079h) | 1791:77015 (1061h) | Owner-selected. Spread 7 corrected. |

### Module Duplicates (Spread 6 flags)
- Embedded:margin ×3: 1572:72122 + 72605 + 73836 — DEDUPLICATE
- Realtime:margin ×2: 1572:72014 + 73567 — DEDUPLICATE

---

## 8. DESIGN LAW VIOLATIONS

| Violation | Location | AGENTS.md Rule | Required Fix |
|-----------|----------|----------------|-------------|
| Dark theme on all 7 route compositions | 1082:29137–30967 | "Light mode only for the active lane" | Create light champions |
| Dark theme on all A1-A7 Codex pages | 1424:32006–35082 | Same | These are STRUCTURAL_REFERENCE only |
| Dark theme on desktop COA viewers | 1905:79576, 1905:79798 | Same | Create light variant |
| Dark theme on mobile COA | 1905:79937 | Same | Create light variant |
| Generic spike chart as "chromatogram" | COA viewer frames | Evidence honesty: source-owned data only | Replace with honest state or source data |
| ZZ/SUPERSEDED element in canonical hero | 1791:76143 inside 1791:76121 | Clean component hygiene | Remove dead element |

---

## 9. EVIDENCE GAPS

| Gap | Impact | Resolution |
|-----|--------|------------|
| No light-theme desktop COA route page | Cannot prototype /open-lab/coa/:id | Create from section 05 template |
| No PDP Evidence Snapshot composition | Cannot prototype /product/:slug evidence slot | Create from LabRecord + HplcPurityTrace + EvidenceStatus |
| Chromatogram not source-backed | Evidence honesty violation | Use SOURCE ONLY or UNAVAILABLE state |
| No 1024 or 768 breakpoints for OpenLab routes | Responsive gap | Only editorial module has 1440+390; Evidence Charts has 1440+1024+390 |
| Batch comparison has no purity values | Data presentation gap | Populate from governed fixture or mark SOURCE ONLY |
| Portal/record conflation not split | Architectural gap | Execute champion split |

---

## 10. GOVERNED FIXTURE DATA — MK-2866 Vertical Slice

Per AGENTS.md: "Candidate code must remain presentation-only."

```json
{
  "product": {
    "compound": "MK-2866",
    "commonName": "Ostarine",
    "series": "SARM SERIES",
    "sku": "80529-01",
    "dosage": "15 MG",
    "servings": "90 SERVINGS",
    "price": "£43"
  },
  "evidence": {
    "purityDisplay": ">99%",
    "purityComparator": "DISPLAY_COMPARATOR_ONLY",
    "evidenceState": "OPENLAB VERIFIED",
    "honesty": "Do NOT convert >99% to 99, average it, generate intermediate values, or create a time series from it"
  },
  "latestRecord": {
    "batchId": "GOVERNED_FIXTURE",
    "lab": "GOVERNED_FIXTURE",
    "date": "GOVERNED_FIXTURE",
    "methodology": "HPLC-MS (purity), HPLC-DAD (concentration), GC-MS (identification)"
  },
  "coaViewer": {
    "chromatogramSource": "UNAVAILABLE — no source-owned structured numeric points provided",
    "reportPdf": "UNAVAILABLE — no supplied report artifact",
    "testResults": [
      { "name": "Compound Identity", "result": "Confirmed", "method": "GC-MS" },
      { "name": "Purity (HPLC)", "result": "99.87%", "method": "HPLC-MS" },
      { "name": "Appearance", "result": "White Crystalline Powder", "method": "Visual" },
      { "name": "Residual Solvents", "result": "<0.01%", "method": "GC-FID" },
      { "name": "Heavy Metals", "result": "None Detected", "method": "ICP-MS" }
    ]
  }
}
```

---

## 11. HUMAN DECISIONS REQUIRED

| # | Decision | Options | Impact |
|---|----------|---------|--------|
| 1 | Hero spacing tightening | Apply recommended changes to 1791:76121 or adjust values | Blocks champion finalization |
| 2 | COA desktop canonicalization | Keep 1905:79576 or 1905:79798 | Blocks COA champion |
| 3 | Champion split execution | Split 1838:12778 into portal + record sections | Blocks Phase 1 composition |
| 4 | Route duplicate archival | Archive 1822:xxxxx set or keep both | Clean-up |
| 5 | Module duplicate dedup | Archive duplicate Embedded:margin and Realtime:margin | Clean-up |
| 6 | OpenLabArchive variant | Keep 1791:76826 or 1791:76921 (alt) | One archive layout |
| 7 | OpenLabConfidence v3 consolidation | Merge v3 into main COMPONENT_SET or keep separate | Component hygiene |
| 8 | ZZ/SUPERSEDED divider | Remove from canonical hero | Dead element removal |

---

## 12. NEXT EXECUTABLE CONTROLLER EDGE

### For Figma (this agent):
1. **IMMEDIATE** — Apply hero spacing tightening on 1791:76121 (pending owner approval of §3 values)
2. **IMMEDIATE** — Remove ZZ/SUPERSEDED divider from canonical hero
3. **PHASE 1** — Execute champion split: separate portal vs. record compositions
4. **PHASE 1** — Create light-theme desktop COA route page
5. **PHASE 1** — Create PDP Evidence Snapshot composition
6. **PHASE 2** — Build 1024 and 768 responsive variants

### For Codex (via relay):
1. Replace stale "Figma file required" hold with file BEPMuUt1HroEw8xjz8CVyN and the node IDs in this packet
2. Ingest the source-disposition register (§2) and candidate-slot IDs
3. Use governed fixture data (§10) for functional prototypes — **do not wait for design proof approval**
4. Run Lane 2 (functional prototype) in parallel with Lane 1 (design identity convergence)
5. Per AGENTS.md: light mode only, presentation-only code, no live APIs, preserve "90 SERVINGS"
6. Bind mobile COA (1905:79937) as first prototype target — strongest existing frame
7. Status: CANDIDATE_PENDING_HUMAN_REVIEW — do not claim production acceptance

---

*Packet generated by Figma agent. Status: CANDIDATE_PENDING_HUMAN_REVIEW.*
*Spread 7 P0.1 correction applied. Hero 1791:76121 confirmed canonical.*
*All dispositions are recommendations pending owner review.*
