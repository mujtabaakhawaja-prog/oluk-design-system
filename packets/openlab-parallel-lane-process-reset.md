# FIGMA_TO_CODEX_PACKET — OpenLab Parallel-Lane Process Reset

## META

- **File:** BEPMuUt1HroEw8xjz8CVyN (Final Design)
- **Sites File:** 67dsmMdok9JnLZ5GCdRhBL
- **Repo:** mujtabaakhawaja-prog/oluk-design-system
- **Registry:** authority/OPENLAB-SECTION-MODULE-REGISTRY.json (19 modules, SHA 223c097b)
- **Prior packet:** packets/openlab-evidence-modules-phase-0-1.md (SHA a276eeb8)
- **Verified:** 2026-08-26 — live Figma scan + GitHub registry cross-reference

---

## 🔴 PROCESS DIAGNOSIS — THE DEADLOCK

**Observed from Figma:** Rich Figma-authored modules (B1–B12 on page 1660:422, D1–D5 on Spine workspace 556:32215) express brand identity but sit as static canvases. Codex produced dark-theme route pages (A1–A7 on page 672:2) that are structurally complete but visually unproofed.

**Confirmed from GitHub:** AGENTS.md states: _"Candidate code must remain presentation-only"_ and _"Make-generated code remains disposable prototype machinery."_ The OPENLAB-SECTION-MODULE-REGISTRY.json defines 19 modules — every one has `runtimeExclusions` banning fetch, mutation, evidence-inference, live-search, analytical-reconstruction. Every module's `dataOwner` points to fixture projections, never live APIs.

**The deadlock:** Codex treats every module as requiring a complete design-proof cycle before prototyping with real data. The registry bans runtime behavior, so nothing gets real product data. The design boards never get proofed because there's no visual prototype to compare against. Nothing moves.

**The existence proof:** The Dossier (1384:17747, 1440×1372) works. It has both real MK-2866 product data AND design identity. Every other module should follow that pattern.

---

## 🔄 THE FIX — TWO PARALLEL LANES

### LANE 1: Design Identity (Figma-led)
Canonical brand expression — typography, color, spacing, composition. Uses existing Figma-authored modules as source of truth. Owns "how it looks."

### LANE 2: Functional Prototype (Codex-led, data-first)
Product-specific prototypes with governed fixture data that mirrors production shape. Uses registry modules as structural contracts. Owns "what it shows."

### THE MERGE POINT
Each module gets a design-contracted prototype — Lane 2's data-rich prototype re-skinned with Lane 1's identity tokens:
- Plus Jakarta Sans ExtraBold for display/headings
- Inter Variable for body/UI
- `#0057FF` cobalt for metrics/actions/selected states
- Cool luminous `#F7F8FC` canvas
- Raised white content planes with restrained cool elevation
- 15–16px body floor, 12px metadata/eyebrow floor (DEC-TYPE-FLOOR-001)

---

## 📦 VERIFIED INVENTORY — Every OpenLab/Evidence Frame

### CATEGORY A: Full Route Pages (page 672:2 — Codex-projected, dark-only)

| # | Frame | Node ID | Size | Status | Issue |
|---|---|---|---|---|---|
| A1 | EvidenceOS / 1440 / Dark | 1424:35082 | 1440×5571 | Codex-projected | No design proof, dark-only, violates "light mode only" law |
| A2 | Branded Lab Record / 1440 / Dark | 1424:33061 | 1440×2851 | Codex-projected | Needs typography + brand pass, no chromatogram viewer |
| A3 | Lab Records / 1440 / Dark | 1424:33484 | 1440×1020 | Codex-projected | Truncated — only header + nav + partial table |
| A4 | Methodology / 1440 / Dark | 1424:33718 | 1440×1553 | Codex-projected | Testing methodology page, needs editorial design |
| A5 | Source Chain / 1440 / Dark | 1424:33853 | 1440×2380 | Codex-projected | 6 articles + compare view nested inside |
| A6 | Homepage / 1440 / Dark | 1424:32006 | 1440×4623 | Codex-projected | Has Branded Lab Record nested as child |

### CATEGORY A2: Full Route Pages (page 672:19 — Figma-authored)

| # | Frame | Node ID | Size | Status |
|---|---|---|---|---|
| A7 | OPENLAB PORTAL / OPTION 01 | 1519:715 | 1512×1660 | Figma-authored, needs completion |
| A8 | OPENLAB RECORD / OPTION 01 | 1520:734 | 1512×1560 | Figma-authored, product-specific record detail |

### CATEGORY A3: Route Compositions (page 369:5500 — ⚠ 7 DUPLICATED)

| Frame | Canonical ID | Duplicate ID | Size | Route |
|---|---|---|---|---|
| openlab-portal-index | 1082:29137 | 1822:77602 | 1440×3299 | /openlab |
| openlab-lab-records-archive | 1082:29460 | 1822:77931 | 1440×2281 | /openlab/records |
| openlab-dossier-mk2866 | 1082:29876 | 1822:78399 | 1440×2742 | /openlab/:compound |
| openlab-report-detail | 1082:30382 | 1822:78688 | 1440×1824 | /openlab/:compound/report |
| openlab-batch-lookup | 1082:30582 | 1822:78889 | 1440×1064 | /openlab/batch |
| openlab-compare | 1082:30895 | 1822:79207 | 1440×1467 | /openlab/compare |
| openlab-evidenceos-command | 1082:30967 | 1822:79280 | 1440×1024 | /openlab/evidenceos |

Also on page 369:5500 (no duplicates):
- openlab-methodology: 1082:30690 (1440×1268)
- openlab-source-chain: 1082:30786 (1440×1311)

### CATEGORY B: Route Slots / Section Modules (page 1660:422 — MF-03 Native Review)

| # | Frame | Node ID | Size | What It Shows |
|---|---|---|---|---|
| B1 | EvidenceA | 1791:75921 | 1512×1074 | Hero card + HPLC trace + Evidence Ledger + Batch Records |
| B2 | HeroOpenLab-light (A) | 1791:76121 | 1512×1079 | ⚠ 18px TALLER than canonical — ARCHIVE THIS |
| B3 | HeroOpenLab-light (B) | 1791:77015 | 1512×1061 | ✅ CANONICAL height (1061) |
| B4 | EvidenceArchive:margin | 1791:76375 | 1512×579 | Archive grid, searchable batch history |
| B5 | EvidencePortal:margin | 1791:76513 | 1512×520 | Portal gateway |
| B6 | EmbeddedEvidence:margin | 1791:76641 | 1512×735 | PDP inline evidence |
| B7 | CategoryRail:margin | 1791:76735 | 1512×388 | SARMs / Prohormones / Research / Stacks |
| B8 | OpenLabArchive | 1791:76826 | 1075×470 | CanvasSplit: editorial + ledger |
| B9 | OpenLabArchiveAlt | 1791:76921 | 1075×419 | Alternate split layout |
| B10 | OpenLabBanner | 1791:77147 | 1171×671 | ProductBanner (header+body+footer) |
| B11 | Realtime | 1791:77373 | 1171×365 | Live verification feed |
| B12 | openlab-realtime | 1791:77408 | 693×660 | HPLC purity chart + batch records table |
| B13 | OPENLAB (wireframe) | 1791:75831 | 646×283 | Early concept — reference only |
| B14 | horizontal cards | 1791:75863 | 1054×295 | Search-driven card row |

### CATEGORY C: Card Grammar Modules (page 1572:70623)

| # | Frame | Node ID | Size | Purpose | Duplicates |
|---|---|---|---|---|---|
| C1 | OpenLabArchive | 1572:70704 | 1075×470 | CanvasSplit: editorial + ledger | — |
| C2 | OpenLabArchiveAlt | 1572:70800 | 1075×419 | Alternate split | — |
| C3 | HeroOpenLab-light | 1572:71704 | 1512×1061 | ✅ Canonical hero at content grammar width | — |
| C4 | TrustSpine:margin | 1572:71136 | 1171×724 | TrustEvidenceSpine + margin | — |
| C5 | EvidenceArchive:margin | 1572:71339 | 1171×638 | Archive grid | — |
| C6 | EmbeddedEvidence:margin | 1572:71476 | 1171×735 | Embedded evidence | ⚠ DUP at 72122, 72605, 73836 |
| C7 | Realtime:margin | 1572:72014 | 1171×453 | Live batch feed | ⚠ DUP at 73567 |
| C8 | EvidenceOS-Editorial | 1572:72278 | 1171×495 | ⚠ UNPROOFED — no route | — |
| C9 | OpenLabBanner | 1572:73407 | 1171×671 | ProductBanner | — |

### CATEGORY D: MAKE Workspace (page 1384:15043)

| # | Frame | Node ID | Size | Purpose |
|---|---|---|---|---|
| D1 | EvidenceD | 1384:16556 | 1440×851 | Evidence decision hero |
| D2 | EmbeddedEvidence:margin | 1384:17075 | 1184×514 | MAKE embedded evidence |
| D3 | CanvasSplit | 1384:17238 | 1184×439 | Archive editorial+ledger |
| D4 | EmbeddedEvidence | 1384:17333 | 1184×506 | Embedded without margin |
| D5 | CanvasSplit:margin | 1384:17462 | 1184×470 | Canvas split + margin |
| D6 | Dossier | 1384:17747 | 1440×1372 | ✅ EXISTENCE PROOF — real data + real identity |
| D7 | PdpD | 1384:16367 | 1440×879 | PDP dark section |

### CATEGORY E: OpenLab Spine (page 556:32215)

| # | Frame | Node ID | Size | Purpose |
|---|---|---|---|---|
| E1 | TrustEvidenceSpine Master | 556:33832 | 1630×965 | Master light mount — source of truth |
| E2 | TrustEvidenceSpine instance | 556:33838 | 1440×853 | Desktop instance at viewport width |
| E3 | EvidenceLedgerIntro | 601:73924 | 564×672 | Ledger intro component |
| E4 | openlab-realtime (original) | 561:41625 | 693×660 | Original HPLC trace + batch records source |
| E5 | CategoryFamilyRail | 561:41860 | 1171×543 | Category family navigation |

### CATEGORY F: Published Components (page 672:10 — Component Library)

| Component | Node ID | Type | Details |
|---|---|---|---|
| TrustEvidenceSpine / AssuranceCell | 556:34022 | COMPONENT_SET · 674×932 | claim=01–05 × density=full\|compact · 10 variants |
| TrustEvidenceSpine / AssuranceRail | 556:34122 | COMPONENT_SET · 1290×642 | density=full\|compact |
| openlab-mega-menu-panel | 1199:28750 | COMPONENT · 1440×380 | Navigation mega-menu for /openlab |
| OpenLabContextNav | 1215:29690 | COMPONENT_SET · 1440×142 | Desktop (1440×48) \| Mobile (390×52) |
| OpenLabPortalHero | 1263:5683 | COMPONENT · 1344×1061 | "Finished products. Verified evidence." |
| Stack / OpenLabConfidence | 1326:7659 | COMPONENT_SET · 1106×1179 | State=Foundation\|Maximum × Width=Desktop\|Mobile |
| Stack / OpenLabConfidence v3 | 1374:853 | COMPONENT_SET · 358×1231 | v3 mobile: Foundation\|Maximum |

### CATEGORY G: MF-03 Components (page 1660:422)

| Component | Node ID | Type | Details |
|---|---|---|---|
| AttributeIcon / v3 | 1671:2124 | COMPONENT_SET · 344×72 | 17 roles (Lean Mass, Fat Loss, Recovery, etc.) |
| AttributeChip / v3 | 1671:2532 | COMPONENT_SET · 952×366 | 17 roles |
| AttributeMatrix / v3 | 1672:2639 | COMPONENT_SET · 1512×676 | 15 products (MK-2866 through ENDURA SHRED) |
| PurchasePanel / Profile v3 | 1672:3078 | COMPONENT_SET · 818×670 | Desktop + Mobile |

---

## 🚨 DESIGN INCONSISTENCIES — VERIFIED

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 1 | **Duplicate HeroOpenLab-light** | 1791:76121 (1079h) vs 1791:77015 (1061h) — 18px delta | USE 1061 (1791:77015). Archive 1791:76121. |
| 2 | **7 duplicate route compositions** | 1082:xxxxx ↔ 1822:xxxxx on page 369:5500 | KEEP 1082:xxxxx set. Archive 1822:xxxxx. |
| 3 | **3× Embedded:margin duplicates** | 1572:72122, 1572:72605, 1572:73836 on card grammar | KEEP 1572:71476. Deduplicate. |
| 4 | **2× Realtime:margin duplicates** | 1572:72014, 1572:73567 on card grammar | KEEP 1572:72014. Deduplicate. |
| 5 | **2× CategoryRail duplicates** | 1572:71279, 1572:71646 on card grammar | Canonicalize one. |
| 6 | **Dark-only Codex pages** | A1–A6 all dark theme on page 672:2 | Violates "light mode only" design law. Reclassify as structural reference. |
| 7 | **Bad product thumbnails** | Codex-generated cards use backend-projected placeholders | Replace with brand-correct renders per AGENTS.md |
| 8 | **Portal = flat spreadsheet** | Codex openlab-portal-index treats portal as data dump | Rebuild from Figma-authored editorial modules |
| 9 | **EvidenceOS-Editorial unproofed** | 1572:72278 — no route, no component | Owner decision: promote or archive |
| 10 | **CoA Viewer missing** | OL-COA-VIEWER registered in module registry but no Figma frame exists | NEEDS CREATION — core "present actual lab reports" gap |
| 11 | **Evidence Charts missing** | OL-EVIDENCE-CHARTS registered but no Figma frame | NEEDS CREATION — multi-product purity trends |
| 12 | **Width convention unclear** | Card grammar at 1171w, routes at 1440w, MF-03 review at 1512w | Document: 1171=content, 1440=viewport, 1512=review-only |

---

## 📦 REGISTRY ↔ FIGMA CROSS-REFERENCE

| Registry ID | Export | Figma Source | Status |
|---|---|---|---|
| OL-01 | OpenLabPortalHero | 1263:5683 (component) + 1572:71704 (card grammar) | ✅ Has Figma source |
| OL-02 | OpenLabWayfinding | Part of openlab-portal-index 1082:29137 | ✅ Has route frame |
| OL-04 | EvidenceRecordExplainer | EvidenceA 1791:75921 | ✅ Has Figma source |
| LR-02-LR-05 | OpenLabRegistryArchive | EvidenceArchive 1791:76375 + 1082:29460 | ✅ Has both |
| BLR-01-BLR-06 | OpenLabRecordDetail | Branded Lab Record 1424:33061 + 1082:30382 | ⚠ Dark-only, needs brand pass |
| CD-01-CD-06 | OpenLabDossierComposition | Dossier 1384:17747 + 1082:29876 | ✅ EXISTENCE PROOF |
| OL-PRODUCT-EXPERIENCE | OpenLabProductExperience | openlab-realtime 1791:77408 / 561:41625 | ✅ Has Figma source |
| OL-METH | OpenLabMethodologyPipeline | Methodology 1424:33718 + 1082:30690 | ⚠ Codex-projected, dark-only |
| OL-CHAIN | OpenLabSourceChain | Source Chain 1424:33853 + 1082:30786 | ⚠ Codex-projected, dark-only |
| OL-COMPARE | OpenLabComparison | 1082:30895 | ⚠ Codex-projected |
| OL-UNAVAILABLE | OpenLabUnavailableBoundary | — | ⚠ No dedicated Figma frame |
| OL-EVIDENCE-CHARTS | OpenLabFrontierPage:evidence | — | ❌ MISSING — needs creation |
| OL-COMPOUND-GUIDE | OpenLabFrontierPage:compound-guide | — | Frontier — deferred |
| OL-STACK-BUILDER | OpenLabFrontierPage:stack-builder | — | Frontier — deferred |
| OL-SIDEBAR-WORKSPACE | Workspace | — | Frontier — deferred |
| OL-INTERACTION-CHECKER | OpenLabFrontierPage:interaction-checker | — | Frontier — deferred |
| OL-COA-VIEWER | CoaViewer | — | ❌ MISSING — needs creation |
| OL-RESEARCH-ARCHIVE | OpenLabFrontierPage:research-papers | — | Frontier — deferred |
| OL-LAB-PARTNER | OpenLabFrontierPage:lab-partner | — | Frontier — deferred |

---

## 🧪 PRODUCT-SPECIFIC PURITY PRESENTATION

The Dossier proves the pattern. These modules need the same treatment — governed fixture data rendered with brand identity:

| Presentation | Figma Source | Governed Fixture Shape | Target Route |
|---|---|---|---|
| HPLC Purity Trace | openlab-realtime 1791:77408 | `{batchId:"OL-MK28-240Q", trace:[{x:"Std1",y:98.2},{x:"Std2",y:99.1},{x:"SampleA",y:99.3},{x:"SampleB",y:99.0},{x:"Std3",y:99.2}], specLimit:99}` | PDP (single-product) |
| Batch Records Table | openlab-realtime bottom half | `[{compound:"MK-2866",batch:"OL-MK28-240Q",purity:">99%",lab:"Eurofins",date:"2024-Q3",status:"PASS"}]` | PDP (filtered), Lab Records (full) |
| ChromatogramViewer | ❌ MISSING — OL-COA-VIEWER | `{imageUrl, retentionTimeAxis, peakAnnotations, metadata}` | /open-lab/coa/:id |
| Evidence Ledger (6-step) | EvidenceA 1791:75921 | Identity Tested → Purity Measured → Concentration Confirmed → Janoshik Verified → Tamper-Proof Sealed → Batch Tracked | Homepage, Portal |
| 4-State Honesty | Codex portal (unproofed) | Verified (#15803D) / Source Reported (#0057FF) / Source Only (#D97706) / Unavailable (#6B7280) | Portal, Methodology |
| Compound Tracker Cards | Codex portal (bad thumbnails) | Per-product: name, chemical name, latest batch, purity %, CTA | Portal |
| Live Batch Feed | Realtime 1791:77373 | `[{compound, date, purity, method}]` polling/SSE | Homepage footer, Portal |

---

## 🏗️ PHASE 0→1 — PARALLEL LANES

### PHASE 0: Foundation (both lanes start simultaneously)

#### Lane 1 — Figma (Design Identity)

| Step | Task | Frames | Output |
|---|---|---|---|
| 0.1 | Canonicalize HeroOpenLab-light | USE 1791:77015 (1061h), ARCHIVE 1791:76121 (1079h) | Single canonical hero |
| 0.2 | Deduplicate route compositions | KEEP 1082:xxxxx, ARCHIVE 1822:xxxxx (7 frames) | Clean route page |
| 0.3 | Deduplicate card grammar | Remove Embedded:margin extras (72605, 73836), Realtime:margin extra (73567) | Clean grammar page |
| 0.4 | Create CoA Viewer frame (OL-COA-VIEWER) | NEW — chromatogram + analyte table + custody timeline | Missing module filled |
| 0.5 | Create Evidence Charts frame (OL-EVIDENCE-CHARTS) | NEW — multi-product purity trends | Missing module filled |
| 0.6 | Decide EvidenceOS-Editorial | 1572:72278 → promote to component or archive | Resolved |
| 0.7 | Document width convention | 1171=content, 1440=viewport, 1512=review-only | Codified |

#### Lane 2 — Codex (Functional Prototypes with Governed Fixture Data)

| Step | Task | Fixture Data | Output |
|---|---|---|---|
| 0.1 | Build openlab-realtime with MK-2866 HPLC fixture | `{batchId:"OL-MK28-240Q", compound:"MK-2866", purity:">99%", lab:"Eurofins", method:"HPLC-UV", reported:"2024-Q3", trace:[...5 points], specLimit:99}` | Working SVG chart + batch records table |
| 0.2 | Build EvidenceA multi-product section | Fixture for MK-2866, RAD-140, MK-677, GW-501516 | Hero card + Evidence Ledger + multi-compound table |
| 0.3 | Build OpenLabRegistryArchive searchable table | All compound fixtures, searchable by compound/batch/lab | Functional search + filter |
| 0.4 | Build ProductEvidenceSnapshot for PDP | MK-2866 specific, embedded openlab-realtime | PDP-ready evidence section |

### PHASE 0.5: Merge Point

Each Lane 2 prototype re-skinned with Lane 1's identity tokens. The Dossier (D6) is the template for how merged output should look.

### PHASE 1: Route Assembly

| Priority | Route | Composed From (registry IDs) | Data Scope |
|---|---|---|---|
| P1.1 | /product/mk-2866 (PDP) | OL-PRODUCT-EXPERIENCE + CD-01-CD-06 + EmbeddedEvidence | Single-product, product-specific purity |
| P1.2 | /open-lab (Portal) | OL-01 + OL-02 + OL-04 + CategoryRail + Realtime | Multi-product, aggregate stats |
| P1.3 | /open-lab/records | LR-02-LR-05 | All compounds, searchable |
| P1.4 | /open-lab/records/:recordId | BLR-01-BLR-06 + OL-COA-VIEWER | Single batch, full chromatogram |
| P1.5 | /open-lab/methodology | OL-METH | Static editorial |
| P1.6 | /open-lab/source-chain | OL-CHAIN | 6 articles |
| P1.7 | /open-lab/compare | OL-COMPARE | Multi-product side-by-side |
| P1.8 | /open-lab/evidence | OL-EVIDENCE-CHARTS | Multi-product purity trends |
| P1.9 | Homepage evidence | EvidenceA + Realtime feed | Featured compounds |

---

## ✅ REQUIRED CODEX ACTIONS

```
FIGMA_TO_CODEX_PACKET — PROCESS RESET

CRITICAL CHANGE: Stop treating design boards as the gate for prototyping.
The Dossier (1384:17747) is the existence proof — real data + real identity.
Every other module should follow that pattern.

1. CREATE governed fixture file: authority/fixtures/openlab-evidence-fixtures.json
   Shape: {
     compounds: {
       "MK-2866": {
         batchId: "OL-MK28-240Q",
         compound: "MK-2866",
         alias: "Ostarine",
         purity: ">99%",
         lab: "Eurofins",
         method: "HPLC-UV",
         specLimit: 99,
         reported: "2024-Q3",
         trace: [
           {x: "Std1", y: 98.2},
           {x: "Std2", y: 99.1},
           {x: "SampleA", y: 99.3},
           {x: "SampleB", y: 99.0},
           {x: "Std3", y: 99.2}
         ],
         status: "PASS"
       },
       // RAD-140, MK-677, GW-501516, LGD-4033 with same shape
     },
     stats: {
       totalRecords: 847,
       avgPurity: "99.2%",
       labCount: 6
     }
   }

2. BUILD openlab-realtime component IMMEDIATELY
   - React + Recharts/D3 for HPLC purity trace
   - Trace-state toggle (real/summary/unavailable)
   - Batch records table with PASS/FAIL badges
   - Uses governed fixture, NOT live API
   - Single-product scoped for PDP

3. BUILD EvidenceA multi-product section
   - Hero card + 6-step Evidence Ledger + batch records
   - Multi-product: shows latest batch per compound
   - Homepage/Portal scoped

4. BUILD ProductEvidenceSnapshot for PDP
   - Wraps openlab-realtime with product-specific filter
   - Inline PDP section

5. DO NOT WAIT for design proof approval to start Lane 2.
   The registry's runtimeExclusions are respected — all data
   comes from governed fixtures, not live APIs. This is compliant.
```

## ✅ ACCEPTANCE CHECKS

- [ ] Lane 2 prototypes render real HPLC charts with governed fixture data — not after a design proof cycle
- [ ] Lane 1 design identity frames created for CoA Viewer and Evidence Charts
- [ ] Merge point produces design-contracted prototypes with both identity AND data
- [ ] Dossier pattern replicated across all evidence modules
- [ ] PDP routes show single-product evidence only
- [ ] Portal/Homepage routes show multi-product evidence
- [ ] HPLC trace renders as SVG with correct Y-axis (97–100%) and 99% spec-limit dashed line
- [ ] Product images use brand-correct renders, never backend thumbnail fallbacks
- [ ] 4-State Honesty Language uses correct status colors
- [ ] No payment/Woo mutation/BiasPay in OpenLab evidence surfaces
- [ ] All duplicates resolved before Codex implements

## ⚠️ RISK NOTES

- AGENTS.md says "Candidate code must remain presentation-only" — Lane 2 prototypes use governed fixtures, not live APIs, so this is compliant
- Dark-only Codex pages (A1–A6) violate "light mode only" design law — reclassify as structural reference, not visual authority
- OL-COA-VIEWER and OL-EVIDENCE-CHARTS are registered but have no Figma frames — biggest gaps for "presenting actual lab reports"
- ChromatogramViewer format TBD: PDF embed vs. rasterized PNG — Codex needs to confirm lab API returns
- 7 duplicate route compositions on page 369:5500 must be canonicalized before Codex implements
- Olympus runtime, payment, and security work out of scope per codex-bridge rules and AGENTS.md

## 🎯 NEXT ACTIONS

**Owner decisions needed:**
1. Which HeroOpenLab-light is canonical? (Recommendation: 1791:77015 at 1061h)
2. EvidenceOS-Editorial (1572:72278): promote to component with route, or archive?
3. Chromatogram format: PDF embed or rasterized PNG?

**Figma (Lane 1):** Begin Phase 0.1–0.3 cleanup (canonicalize, deduplicate). Then 0.4–0.5 (create missing CoA Viewer and Evidence Charts frames).

**Codex (Lane 2):** Create governed fixture file and build openlab-realtime with real MK-2866 chart data immediately. Don't wait for design proof approval. The Dossier proves this works.
