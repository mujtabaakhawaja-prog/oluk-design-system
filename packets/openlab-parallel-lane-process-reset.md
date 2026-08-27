# FIGMA_TO_CODEX_PACKET — OpenLab Parallel-Lane Process Reset

## META

- **File:** BEPMuUt1HroEw8xjz8CVyN (Final Design)
- **Sites File:** 67dsmMdok9JnLZ5GCdRhBL
- **OpenLab File:** GkC3KEt9V3RyG5K319iAUV (R6 reference — extrapolatory only)
- **Repo:** mujtabaakhawaja-prog/oluk-design-system
- **Registry:** authority/OPENLAB-SECTION-MODULE-REGISTRY.json (19 modules)
- **Prior packet:** packets/openlab-evidence-modules-phase-0-1.md
- **Canvas Shape Spreads:** Spread 6 (1878:251) + Spread 7 (1878:553)
- **Last verified:** 2026-08-27 — live Figma scan across 3 files + GitHub registry cross-reference
- **Owner decisions:** ALL RESOLVED (see §OWNER DECISIONS)

---

## 🔴 PROCESS DIAGNOSIS — THE DEADLOCK

**Observed from Figma:** Rich Figma-authored modules (B1–B12 on page 1660:422, D1–D5 on Spine workspace 556:32215) express brand identity but sit as static canvases. Codex produced dark-theme route pages (A1–A6 on page 672:2) that are structurally complete but visually unproofed.

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
| B2 | HeroOpenLab-light (preferred) | 1791:76121 | 1512×1079 | ✅ OWNER PREFERRED — needs tightening of spacing (some areas too tight, some too sparse) |
| B3 | HeroOpenLab-light (alt) | 1791:77015 | 1512×1061 | Alternative at 1061h — not selected |
| B4 | EvidenceArchive:margin | 1791:76375 | 1512×579 | Archive grid, searchable batch history |
| B5 | EvidencePortal:margin | 1791:76513 | 1512×520 | Portal gateway |
| B6 | EmbeddedEvidence:margin | 1791:76641 | 1512×735 | PDP inline evidence |
| B7 | CategoryRail:margin | 1791:76735 | 1512×388 | SARMs / Prohormones / Research / Stacks |
| B8 | OpenLabArchive | 1791:76826 | 1075×470 | CanvasSplit: editorial + ledger |
| B9 | OpenLabArchiveAlt | 1791:76921 | 1075×419 | Alternate split layout |
| B10 | OpenLabBanner | 1791:77147 | 1171×671 | ProductBanner (header+body+footer) |
| B11 | Realtime | 1791:77373 | 1171×365 | Live verification feed |
| B12 | openlab-realtime | 1791:77408 | 693×660 | HPLC purity chart + batch records table |

### CATEGORY B2: Evidence Charts (page "00 — Authority & Run Control")

**Section node: 1890:77164** — "Evidence Charts" — SECTION 3200×19500

| # | Frame | Node ID | Size | Variant |
|---|---|---|---|---|
| EC1 | Evidence Charts / 1440 / Light | 1890:77165 | 1440×3383 | Desktop Light |
| EC2 | Evidence Charts / 1440 / Dark | 1890:77565 | 1440×3383 | Desktop Dark |
| EC3 | Evidence Charts / 1024 / Light | 1890:78365 | 1024×2956 | Tablet Light |
| EC4 | Evidence Charts / 1024 / Dark | 1890:78365 | 1024×2956 | Tablet Dark |
| EC5 | Evidence Charts / 390 / Light | 1890:78765 | 390×2556 | Mobile Light |
| EC6 | Evidence Charts / 390 / Dark | 1890:79167 | 390×2556 | Mobile Dark |
| EC7–12 | Pixel Reference variants | 1890:79569–79574 | 400×300 each | 6 reference thumbnails |

**Evidence Charts content (from 1890:77165 — Light 1440):**
- **§1 Header** — "Governed analytical visualization" — 6 responsive modes, explicit model, no synthetic traces
- **§2 Full branded-record HPLC** — retention time axis (0–18 min), detector response, "Review peak" at ~9 min
- **§3 Compact PDP + Archive artifact** — dual card-scale HPLC displays
- **§4 Structured peak view** — bar chart, peak area % vs retention time, 4 peaks, cobalt highlight
- **§5 Public record trend** — line chart, purity vs published batch sequence, 2 series
- **§6 Missing-chart state** — "Chart unavailable" empty state

**Status:** ✅ Mature, production-ready spec. All 6 responsive variants exist.

### CATEGORY B3: CoA Viewer (OpenLab file GkC3KEt9V3RyG5K319iAUV — extrapolatory reference only)

**Owner assessment: "only extrapolatory and don't show any sign of maturity"**

| # | Frame | Node ID | Size | Page | Description |
|---|---|---|---|---|---|
| CoA-1 | r6-coa-viewer | 12:984 | 1440×1999 | R6-MF | Desktop dark CoA — Batch WS-0642, MK-2866, Janoshik certificate, QR, test results, PDF actions |
| CoA-2 | r6-mobile-coa-viewer | 12:1620 | 390×867 | R6-MF | Mobile dark CoA — compact test results + traceable archive |
| CoA-3 | r6-coa-viewer | 2:5046 | 1440×1999 | Evidence | Duplicate of CoA-1 |
| CoA-4 | r6-mobile-coa-viewer | 2:5519 | 390×867 | Evidence | Duplicate of CoA-2 |
| CoA-5 | R6 OpenLab / COA Report Viewer | 3:65653 | 620×390 | Openlab system | Compact card instance with chromatogram bars |

**Status:** R6 dark-theme structural reference only. Needs full OLUK identity redesign.

### CATEGORY C: Card Grammar Modules (page 1572:70623)

| # | Frame | Node ID | Size | Purpose | Status |
|---|---|---|---|---|---|
| C1 | OpenLabArchive | 1572:70704 | 1075×470 | CanvasSplit: editorial + ledger | — |
| C2 | OpenLabArchiveAlt | 1572:70800 | 1075×419 | Alternate split | — |
| C3 | HeroOpenLab-light | 1572:71704 | 1512×1061 | Hero at content grammar width | — |
| C4 | TrustSpine:margin | 1572:71136 | 1171×724 | TrustEvidenceSpine + margin | — |
| C5 | EvidenceArchive:margin | 1572:71339 | 1171×638 | Archive grid | — |
| C6 | EmbeddedEvidence:margin | 1572:71476 | 1171×735 | Embedded evidence | ⚠ DUP at 72122, 72605, 73836 |
| C7 | Realtime:margin | 1572:72014 | 1171×453 | Live batch feed | ⚠ DUP at 73567 |
| C8 | EvidenceOS-Editorial | 1572:72278 | 1171×495 | ✅ PROMOTED → OL-EDITORIAL-TEASER (see §OWNER DECISIONS) | — |
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

---

## 🏷️ OWNER DECISIONS — ALL RESOLVED ✅

### 1. HeroOpenLab-light — DECIDED

**Owner preference: 1791:76121 (1079h)** — the taller variant with the three-column layout showing:
- Left: OpenLab portal card (search, CTAs, archive section, live verification feed stats, search bar, methodology link)
- Center: MK-2866 product evidence card (SARM Series, MK-2866, Ostarine, SKU 80529-01, 15 MG, 90 Servings, >99% Purity, Class SARM, Form CAPSULES, Lab Formulated, Third Party Tested, £43, Add to bag + View Lab Record CTAs)
- Right: Category rail (SARMs, Prohormones, Research Chemicals, Stacks)

**Design tightening needed:** Some areas are either too tight, too and, or too sparse. This is a design-stage task — adjust spacing and rhythm within the existing composition. Height is TBD (design-stage decision, not decided now).

**Action:** Use 1791:76121 as the canonical base. Tighten spacing in a design pass. Do NOT archive — this is the preferred variant. The 1791:77015 (1061h) variant remains as alternative reference but is not the canonical choice.

### 2. CoA Viewer reference maturity — ASSESSED

**Owner assessment: "only extrapolatory and don't show any sign of maturity"**

The R6 CoA Viewer frames (12:984, 12:1620, 2:5046, 2:5519, 3:65653 in GkC3KEt9V3RyG5K319iAUV) are structural direction references only.

**Action:** These inform the content hierarchy for a net-new OLUK CoA Viewer design. Do not adopt wholesale. Design with OLUK's own identity and design system.

### 3. EvidenceOS-Editorial — PROMOTED as OL-EDITORIAL-TEASER ✅

**Owner decision: PROMOTE — repurpose as a compact evidence visual presentation section.**

Current state (1572:72278, 1171×495 in Sites file as 6:3962): Two-column split layout at 1171px content width.
- Left side: "OpenLab / public evidence" eyebrow, "Proof built into every batch." headline, supporting copy about finished-product identity/purity/concentration connected to lab records, "EXPLORE OPENLAB" CTA
- Right side: Product Facts / Media / Composition tab bar, product identifier "OL-5081 / MK-2866", circular product image placeholder, "Assay 15.82 %" annotation

**Promoted purpose:** Compact staging ground for evidence visual presentation. Redesign the right column to show the HPLC chromatogram (line graph from Evidence Charts §2) alongside the lab record/report hero copy on the left. Target contexts:
- PDP page — embedded evidence teaser section
- Lab record detail — compact visual summary before full record
- OpenLab portal — featured evidence spotlight

**New registry entry:** OL-EDITORIAL-TEASER
- **Layout:** Two-column split (left: editorial hero copy, right: HPLC line graph or structured peak view)
- **Width:** 1171px content within 1440px viewport
- **Evidence Charts integration:** Right column uses EC §2 (full HPLC trace) or EC §4 (structured peak view) depending on context
- **Data scope:** Single-product when on PDP, featured-product when on Portal
- **Design task:** Redesign right column from product image placeholder → HPLC chromatogram visual. Keep left column editorial structure. Apply OLUK identity throughout.

### 4. EvidenceCommerceCard concept — ACCEPTED (design pending)

**Action:** Must be designed with OLUK identity, not adopted wholesale from RAD-140 reference. New card variant concept alongside existing Vertical/Horizontal/Featured.

### 5. Chromatogram format — DEFERRED TO CODEX ✅

**Owner decision: Codex decides the chromatogram rendering format.**

Options for Codex to evaluate:
- **PDF embed** — if lab API returns PDF certificates, embed viewer
- **Rasterized PNG** — if lab API returns pre-rendered chart images
- **Inline SVG** — if fixture/API returns raw data points, render client-side with Recharts/D3

Codex should determine based on what the lab API (Janoshik / Eurofins) actually returns. The Evidence Charts spec (1890:77164) defines the visual contract regardless of rendering format — the chart must match the spec's anatomy (retention time axis, detector response, peak annotations, missing-chart state).

**Constraint:** Whatever format Codex chooses, the governed fixture must supply enough data to render at least the 5 chart types from the Evidence Charts spec. The format decision is implementation detail; the visual output must match the spec.

---

## 🚨 DESIGN INCONSISTENCIES — VERIFIED (All Resolved)

| # | Issue | Evidence | Status |
|---|---|---|---|
| 1 | **HeroOpenLab-light spacing** | 1791:76121 (1079h, preferred) — areas too tight/sparse | ✅ DECIDED — tighten in design pass |
| 2 | **7 duplicate route compositions** | 1082:xxxxx ↔ 1822:xxxxx on page 369:5500 | KEEP 1082:xxxxx. Archive 1822:xxxxx. |
| 3 | **3× Embedded:margin duplicates** | 1572:72122, 1572:72605, 1572:73836 on card grammar | KEEP 1572:71476. Deduplicate. |
| 4 | **2× Realtime:margin duplicates** | 1572:72014, 1572:73567 on card grammar | KEEP 1572:72014. Deduplicate. |
| 5 | **2× CoA Viewer duplicates** | 12:984 = 2:5046, 12:1620 = 2:5519 in OpenLab file | Reference only. |
| 6 | **Dark-only Codex pages** | A1–A6 all dark theme on page 672:2 | Structural reference only. |
| 7 | **Bad product thumbnails** | Codex-generated cards use backend-projected placeholders | Replace with brand-correct renders. |
| 8 | **Portal = flat spreadsheet** | Codex openlab-portal-index treats portal as data dump | Rebuild from editorial modules. |
| 9 | ~~EvidenceOS-Editorial unproofed~~ | 1572:72278 | ✅ RESOLVED — PROMOTED as OL-EDITORIAL-TEASER |
| 10 | **CoA Viewer needs OLUK redesign** | R6 dark-theme references exist but lack OLUK identity | NET-NEW design task. |
| 11 | ~~Evidence Charts missing~~ | **FOUND at 1890:77164** | ✅ RESOLVED |
| 12 | **Width convention** | 1171=content, 1440=viewport, 1512=review-only | ✅ DOCUMENTED |

---

## 📦 REGISTRY ↔ FIGMA CROSS-REFERENCE (Updated)

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
| OL-EVIDENCE-CHARTS | OpenLabFrontierPage:evidence | **1890:77164** — 6 responsive variants, mature | ✅ FOUND |
| **OL-EDITORIAL-TEASER** | **EvidenceEditorialTeaser** | **1572:72278 (card grammar) / 6:3962 (Sites)** | ✅ **NEW — PROMOTED from EvidenceOS-Editorial** |
| OL-COMPOUND-GUIDE | OpenLabFrontierPage:compound-guide | — | Frontier — deferred |
| OL-STACK-BUILDER | OpenLabFrontierPage:stack-builder | — | Frontier — deferred |
| OL-SIDEBAR-WORKSPACE | Workspace | — | Frontier — deferred |
| OL-INTERACTION-CHECKER | OpenLabFrontierPage:interaction-checker | — | Frontier — deferred |
| OL-COA-VIEWER | CoaViewer | R6 refs: 12:984, 12:1620 (GkC3KEt9V3RyG5K319iAUV) | ⚠ R6 refs only — needs OLUK identity redesign |
| OL-RESEARCH-ARCHIVE | OpenLabFrontierPage:research-papers | — | Frontier — deferred |
| OL-LAB-PARTNER | OpenLabFrontierPage:lab-partner | — | Frontier — deferred |

---

## 🧪 PRODUCT-SPECIFIC PURITY PRESENTATION

The Dossier proves the pattern. Evidence Charts (1890:77164) provides the visualization spec. EvidenceOS-Editorial (OL-EDITORIAL-TEASER) provides the compact teaser format.

| Presentation | Figma Source | Evidence Charts Ref | Target Route |
|---|---|---|---|
| HPLC Purity Trace (full branded) | openlab-realtime 1791:77408 | EC §2 — full retention-time axis, review peak annotation | PDP (single-product), Lab Record detail |
| HPLC Compact (PDP/Archive) | — | EC §3 — dual compact HPLC at card scale | PDP card, Archive card |
| Structured Peak View | — | EC §4 — bar chart, peak area % vs retention time | Lab Record detail, CoA Viewer |
| Public Record Trend | — | EC §5 — line chart, purity trend across published batches | Portal (multi-product), Compare |
| Missing-Chart State | — | EC §6 — "Chart unavailable" empty state | Any route when data absent |
| **Editorial Teaser (compact)** | **OL-EDITORIAL-TEASER 1572:72278** | **EC §2 or §4 in right column** | **PDP evidence section, Portal spotlight** |
| Batch Records Table | openlab-realtime bottom half | — | PDP (filtered), Lab Records (full) |
| ChromatogramViewer | R6 refs (dark, extrapolatory) | EC §2 + §4 for spec | /openlab/coa/:id (net-new OLUK design) |
| Evidence Ledger (6-step) | EvidenceA 1791:75921 | — | Homepage, Portal |
| 4-State Honesty | Codex portal (unproofed) | — | Portal, Methodology, CoA Viewer |
| Live Batch Feed | Realtime 1791:77373 | — | Homepage footer, Portal |

---

## 🏗️ PHASE 0→1 — PARALLEL LANES (Updated — All Decisions Resolved)

### PHASE 0: Foundation (both lanes start simultaneously)

#### Lane 1 — Figma (Design Identity)

| Step | Task | Frames | Output |
|---|---|---|---|
| 0.1 | **Tighten HeroOpenLab-light spacing** | 1791:76121 (preferred, 1079h) | Balanced spacing — fix tight/sparse areas |
| 0.2 | Deduplicate route compositions | KEEP 1082:xxxxx, ARCHIVE 1822:xxxxx (7 frames) | Clean route page |
| 0.3 | Deduplicate card grammar | Remove Embedded:margin extras (72605, 73836), Realtime:margin extra (73567) | Clean grammar page |
| 0.4 | **Design CoA Viewer (OL-COA-VIEWER)** | NET-NEW at 1440/1024/390 — R6 refs as structural reference only | OLUK light-mode CoA with HPLC chromatogram, 4-state honesty, test results table |
| 0.5 | ~~Create Evidence Charts~~ | **ALREADY EXISTS at 1890:77164** | ✅ No action needed |
| 0.6 | **Redesign OL-EDITORIAL-TEASER** | 1572:72278 — replace right-column product placeholder with HPLC chromatogram | Compact evidence visual presentation section |
| 0.7 | Document width convention | 1171=content, 1440=viewport, 1512=review-only | Codified |
| 0.8 | **Design EvidenceCommerceCard** | NET-NEW card variant with inline HPLC trace + test chips | OLUK identity, alongside existing card grammar |

#### Lane 2 — Codex (Functional Prototypes with Governed Fixture Data)

| Step | Task | Fixture Data | Output |
|---|---|---|---|
| 0.1 | Build openlab-realtime with MK-2866 HPLC fixture | See fixture shape below | Working SVG chart + batch records table |
| 0.2 | Build EvidenceA multi-product section | Fixture for MK-2866, RAD-140, MK-677, GW-501516 | Hero card + Evidence Ledger + multi-compound table |
| 0.3 | Build OpenLabRegistryArchive searchable table | All compound fixtures, searchable by compound/batch/lab | Functional search + filter |
| 0.4 | Build ProductEvidenceSnapshot for PDP | MK-2866 specific, embedded openlab-realtime | PDP-ready evidence section |
| 0.5 | **Build Evidence Charts components** | Use 1890:77164 spec as visual contract | All 6 chart types from the spec |
| 0.6 | **Decide chromatogram rendering format** | Evaluate lab API return format (PDF/PNG/raw data) | Format decision + implementation |

### PHASE 0.5: Merge Point

Each Lane 2 prototype re-skinned with Lane 1's identity tokens. The Dossier (D6) is the template for how merged output should look.

### PHASE 1: Route Assembly

| Priority | Route | Composed From (registry IDs) | Data Scope |
|---|---|---|---|
| P1.1 | /product/mk-2866 (PDP) | OL-PRODUCT-EXPERIENCE + CD-01-CD-06 + EmbeddedEvidence + OL-EDITORIAL-TEASER | Single-product, product-specific purity |
| P1.2 | /openlab (Portal) | OL-01 + OL-02 + OL-04 + CategoryRail + Realtime + OL-EDITORIAL-TEASER | Multi-product, aggregate stats |
| P1.3 | /openlab/records | LR-02-LR-05 | All compounds, searchable |
| P1.4 | /openlab/records/:recordId | BLR-01-BLR-06 + OL-COA-VIEWER | Single batch, full chromatogram |
| P1.5 | /openlab/methodology | OL-METH | Static editorial |
| P1.6 | /openlab/source-chain | OL-CHAIN | 6 articles |
| P1.7 | /openlab/compare | OL-COMPARE | Multi-product side-by-side |
| P1.8 | /openlab/evidence | OL-EVIDENCE-CHARTS | Multi-product purity trends |
| P1.9 | Homepage evidence | EvidenceA + Realtime feed + OL-EDITORIAL-TEASER | Featured compounds |

---

## ✅ REQUIRED CODEX ACTIONS

```
FIGMA_TO_CODEX_PACKET — PROCESS RESET (v3 — ALL OWNER DECISIONS RESOLVED)

CHANGES FROM v2:
1. EvidenceOS-Editorial PROMOTED as OL-EDITORIAL-TEASER — compact evidence visual presentation
   section (left: lab record hero copy, right: HPLC line graph). Available for PDP, Portal, Record detail.
2. Chromatogram format DEFERRED TO CODEX — evaluate lab API return format and decide.
3. All owner decisions resolved. No pending blockers.

UNCHANGED:
- HeroOpenLab-light canonical = 1791:76121 (1079h)
- Evidence Charts spec at 1890:77164
- CoA Viewer R6 refs are extrapolatory only
- Dossier (1384:17747) is the existence proof

1. CREATE governed fixture file: authority/fixtures/openlab-evidence-fixtures.json
   Shape: {
     compounds: {
       "MK-2866": {
         batchId: "OL-MK28-240Q",
         compound: "MK-2866",
         alias: "Ostarine",
         sku: "80529-01",
         strength: "15 MG",
         servings: "90 Servings",
         purity: ">99%",
         price: "£43",
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
       }
       // RAD-140, MK-677, GW-501516, LGD-4033 with same shape
     },
     stats: {
       totalRecords: 847,
       avgPurity: "99.2%",
       labCount: 6
     }
   }

2. BUILD Evidence Charts components using 1890:77164 spec — UNBLOCKED NOW

3. BUILD openlab-realtime component — UNBLOCKED NOW

4. DECIDE chromatogram rendering format:
   - Evaluate what Janoshik / Eurofins lab APIs return (PDF? PNG? raw data points?)
   - Choose: PDF embed, rasterized PNG, or inline SVG (Recharts/D3)
   - Visual output must match Evidence Charts spec regardless of format
   - Report decision back via bridge packet

5. BUILD OL-EDITORIAL-TEASER component:
   - Two-column split at 1171px
   - Left: editorial hero copy (headline + supporting text + CTA)
   - Right: HPLC chromatogram (line graph from EC §2) or structured peak (bar from EC §4)
   - Data scope: single-product on PDP, featured-product on Portal
   - Await Lane 1 redesign of right column before final implementation

6. DO NOT WAIT for design proof to build items 1–3.
   Governed fixtures only. Presentation-only per AGENTS.md.
```

## ✅ ACCEPTANCE CHECKS

- [ ] Lane 2 prototypes render real HPLC charts with governed fixture data
- [ ] Evidence Charts components match the 6 presentation modes in 1890:77164
- [ ] HeroOpenLab-light spacing tightened at 1791:76121
- [ ] CoA Viewer designed with OLUK identity (not R6 dark-theme adopted)
- [ ] EvidenceCommerceCard designed with OLUK identity (not RAD-140 reference adopted)
- [ ] OL-EDITORIAL-TEASER redesigned: right column shows HPLC chromatogram
- [ ] Chromatogram format decided by Codex based on lab API evaluation
- [ ] Merge point produces design-contracted prototypes with both identity AND data
- [ ] Dossier pattern replicated across all evidence modules
- [ ] PDP routes show single-product evidence only
- [ ] Portal/Homepage routes show multi-product evidence
- [ ] Product truth: MK-2866, Ostarine, SKU 80529-01, 15 MG, 90 Servings (never CAPS), >99% purity, £43
- [ ] All duplicates resolved before Codex implements

## ⚠️ RISK NOTES

- AGENTS.md: "Candidate code must remain presentation-only" — Lane 2 prototypes use governed fixtures, not live APIs
- Dark-only Codex pages (A1–A6) violate "light mode only" design law — structural reference only
- CoA Viewer is the biggest remaining design gap — R6 refs inform content hierarchy but not visual identity
- Evidence Charts spec is mature and complete — Codex can begin building chart components immediately
- OL-EDITORIAL-TEASER right-column redesign blocks the final merge for that module
- 7 duplicate route compositions on page 369:5500 must be canonicalized before Codex implements
- Olympus runtime, payment, and security work out of scope per codex-bridge rules and AGENTS.md

## 🎯 NEXT ACTIONS — NO PENDING OWNER DECISIONS

**Figma (Lane 1) — all unblocked:**
1. Tighten HeroOpenLab-light (1791:76121) spacing — design pass
2. Phase 0.2–0.3 cleanup (deduplicate route compositions + card grammar)
3. Redesign OL-EDITORIAL-TEASER right column (product placeholder → HPLC chromatogram)
4. Design CoA Viewer with OLUK identity (net-new, use R6 for content hierarchy)
5. Design EvidenceCommerceCard with OLUK identity (net-new concept)

**Codex (Lane 2) — all unblocked:**
1. Create governed fixture file immediately
2. Build Evidence Charts components using 1890:77164 as visual contract
3. Build openlab-realtime with MK-2866 HPLC fixture
4. Evaluate lab API return format and decide chromatogram rendering approach
5. Build OL-EDITORIAL-TEASER component structure (await Lane 1 for right-column visual)
