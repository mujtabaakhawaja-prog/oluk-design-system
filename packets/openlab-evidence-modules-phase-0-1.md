# FIGMA_TO_CODEX_PACKET — OpenLab Evidence Modules · Phase 0→1 Implementation Plan

## CONTEXT

- **Active repo/project:** mujtabaakhawaja-prog/oluk-design-system
- **Lane:** Design System Documentation → Codex Implementation
- **Runtime boundary:** apps/olympus-shopper-ui/** (no payment/Woo mutation)
- **Figma file:** BEPMuUt1HroEw8xjz8CVyN
- **Documentation page:** 📐 Canvas Shape — Grid Architecture (1623:2)
- **Spread 6:** OpenLab & Evidence Modules (1878:251) — 1440×1411, 56 children
- **Spread 7:** Phase 0→1 Implementation Plan (1878:553) — 1440×1331, 45 children

## PROCESS DIAGNOSIS

**CURRENT PROBLEM:** Codex treats everything as design proofs and does not prototype until proofs are human-approved. This creates a serial bottleneck where implementation waits on full design review.

**FIX:** Phase 0 canonicalizes designs in Figma (one canonical source per module). Phase 1 hands Codex proofed modules with explicit "implement now" authorization. Codex prototypes from canonical frames — no waiting for additional approval cycles.

**RULE:**
- PDP routes (`/product/:slug`) show **single-product** evidence (one compound, one batch, one HPLC trace)
- Portal/Homepage routes (`/openlab`, `/`) show **multi-product** evidence (grid of compounds, aggregate trust metrics, cross-product comparison)

---

## CONFIRMED — PUBLISHED COMPONENTS (Component Library 672:10)

| Component | Node ID | Type | Details |
|---|---|---|---|
| TrustEvidenceSpine / AssuranceCell | 556:34022 | COMPONENT_SET · 674×932 | claim=01–05 × density=full\|compact · 10 variants |
| TrustEvidenceSpine / AssuranceRail | 556:34122 | COMPONENT_SET · 1290×642 | density=full (1290×254) \| compact (350×164) |
| openlab-mega-menu-panel | 1199:28750 | COMPONENT · 1440×380 | Navigation mega-menu for /openlab routes |
| OpenLabContextNav | 1215:29690 | COMPONENT_SET · 1440×142 | Width=Desktop (1440×48) \| Mobile (390×52) |
| OpenLabPortalHero | 1263:5683 | COMPONENT · 1344×1061 | "Finished products. Verified evidence." |
| Stack / OpenLabConfidence | 1326:7659 | COMPONENT_SET · 1106×1179 | State=Foundation\|Maximum × Width=Desktop\|Mobile · 4 variants |
| Stack / OpenLabConfidence v3 | 1374:853 | COMPONENT_SET · 358×1231 | v3 mobile refresh: Foundation\|Maximum |

## CONFIRMED — FULL ROUTE COMPOSITIONS (MF-01 & MF-02 · 369:5500)

| Frame | Node ID | Dimensions | Route | Duplicate |
|---|---|---|---|---|
| openlab-portal-index | 1082:29137 | 1440×3299 | /openlab | ⚠ DUP at 1822:77602 |
| openlab-lab-records-archive | 1082:29460 | 1440×2281 | /openlab/records | ⚠ DUP at 1822:77931 |
| openlab-dossier-mk2866 | 1082:29876 | 1440×2742 | /openlab/:compound | ⚠ DUP at 1822:78399 |
| openlab-report-detail | 1082:30382 | 1440×1824 | /openlab/:compound/report | ⚠ DUP at 1822:78688 |
| openlab-batch-lookup | 1082:30582 | 1440×1064 | /openlab/batch | ⚠ DUP at 1822:78889 |
| openlab-compare | 1082:30895 | 1440×1467 | /openlab/compare | ⚠ DUP at 1822:79207 |
| openlab-evidenceos-command | 1082:30967 | 1440×1024 | /openlab/evidenceos | ⚠ DUP at 1822:79280 |

## CONFIRMED — CARD GRAMMAR MODULES (1572:70623)

| Module | Node ID | Dimensions | Purpose |
|---|---|---|---|
| OpenLabArchive | 1572:70704 | 1075×470 | CanvasSplit: editorial + ledger |
| OpenLabArchiveAlt | 1572:70800 | 1075×419 | Alternate split layout |
| TrustSpine:margin | 1572:71136 | 1171×724 | TrustEvidenceSpine + margin wrapper |
| EvidenceArchive:margin | 1572:71339 | 1171×638 | Archive grid (pad 0/20) |
| EmbeddedEvidence:margin | 1572:71476 | 1171×735 | Embedded evidence + margin |
| HeroOpenLab-light | 1572:71704 | 1512×1061 | Light hero: MediaChamber + QualitativeChips + TrustSpine |
| Realtime:margin | 1572:72014 | 1171×453 | Live batch verification feed |
| Embedded:margin | 1572:72122 | 1171×682 | Embedded evidence compact |
| EvidenceOS-Editorial | 1572:72278 | 1171×495 | ⚠ Unproofed concept — no route |
| OpenLabBanner | 1572:73407 | 1171×671 | ProductBanner (header+body+footer) |

## CONFIRMED — MF-03 NATIVE REVIEW FRAMES (1660:422)

| Frame | Node ID | Dimensions | Notes |
|---|---|---|---|
| EvidenceA | 1791:75921 | 1512×1074 | Full-width: HPLC trace + Ledger + Batch Records |
| HeroOpenLab-light (A) | 1791:76121 | 1512×1079 | ⚠ 18px taller than canonical |
| EvidenceArchive:margin | 1791:76375 | 1512×579 | Archive at review width |
| EvidencePortal:margin | 1791:76513 | 1512×520 | Portal entry to evidence ecosystem |
| EmbeddedEvidence:margin | 1791:76641 | 1512×735 | Embedded evidence review width |
| HeroOpenLab-light (B) | 1791:77015 | 1512×1061 | ✓ CANONICAL height (1061) |
| OpenLabBanner | 1791:77147 | 1171×671 | ProductBanner duplicate |
| Realtime | 1791:77373 | 1171×365 | Live batch feed (no margin) |
| openlab-realtime | 1791:77408 | 693×660 | HPLC purity trace + batch records |

## CONFIRMED — MAKE WORKSPACE (1384:15043)

| Frame | Node ID | Dimensions | Purpose |
|---|---|---|---|
| EvidenceD | 1384:16556 | 1440×851 | Evidence decision hero (MAKE) |
| EmbeddedEvidence:margin | 1384:17075 | 1184×514 | Embedded evidence MAKE variant |
| CanvasSplit | 1384:17238 | 1184×439 | Canvas split layout |
| EmbeddedEvidence | 1384:17333 | 1184×506 | Embedded without margin |
| CanvasSplit:margin | 1384:17462 | 1184×470 | Canvas split + margin |
| Dossier | 1384:17747 | 1440×1372 | Full product dossier |

## CONFIRMED — OPENLAB SPINE WORKSPACE (556:32215)

| Frame | Node ID | Dimensions | Purpose |
|---|---|---|---|
| TrustEvidenceSpine Master | 556:33832 | 1630×965 | Master light mount — source of truth |
| TrustEvidenceSpine instance | 556:33838 | 1440×853 | Desktop instance at viewport width |
| EvidenceLedgerIntro | 601:73924 | 564×672 | Ledger introduction component |
| openlab-realtime | 561:41625 | 693×660 | Original HPLC trace + batch records source |

## CONFIRMED — SITES SYNC COVERAGE

### Modules (1214:50) — 9 frames
- Portal (Desktop 1440 + Mobile 390)
- Tools (Desktop + Mobile)
- Guide (Desktop + Mobile)
- Workspace (Desktop + Mobile)
- Document Viewer (Desktop + Mobile)

### Routes (1214:51) — 47 frames (24 Desktop + 23 Mobile)
20 unique routes: portal, records, record, compound, batch lookup, methodology, source chain, compare, evidence, compound guide, research papers, lab partner, dosing calculator, cycle planner, case studies, glossary, COA viewer, report viewer, admin, stack builder, interaction checker, about Evidence OS

---

## DESIGN INCONSISTENCY FLAGS

| Issue | Evidence | Resolution |
|---|---|---|
| **DUPLICATE ROUTES** | 7 frames × 2 copies: 1082:xxxxx ↔ 1822:xxxxx on page 369:5500 | CANONICALIZE — keep 1082:xxxxx set, archive 1822:xxxxx |
| **HERO HEIGHT MISMATCH** | 1791:76121 (1079h) vs 1791:77015 (1061h) — 18px delta | USE 1061 CANONICAL — delete 1079 variant |
| **WIDTH INCONSISTENCY** | Card grammar at 1171w vs MF-03 at 1512w | RESOLVE — 1171 = content-width, 1440 = viewport, 1512 = review-only |
| **Embedded:margin ×3 DUPS** | 1572:72122 + 72605 + 73836 — 3 identical 1171×682 | DEDUPLICATE to single source |
| **Realtime:margin ×2 DUPS** | 1572:72014 + 73567 — 2 identical 1171×453 | DEDUPLICATE to single source |
| **EvidenceOS-Editorial UNPROOFED** | 1572:72278 — 1171×495 — no component or route | PROOF OR ARCHIVE |

---

## PHASE 0 — DESIGN PROOFING IN FIGMA

| # | Task | Source | Page | Action |
|---|---|---|---|---|
| P0.1 | Canonicalize HeroOpenLab-light | USE 1791:77015 (1061h) | 1660:422 | Delete 1791:76121 (1079h). Update component 1263:5683 if needed. |
| P0.2 | Deduplicate route compositions | KEEP 1082:xxxxx set | 369:5500 | Archive or delete 1822:xxxxx duplicates. |
| P0.3 | Deduplicate card grammar | KEEP first instance | 1572:70623 | Remove Embedded:margin extras (72605, 73836) and Realtime:margin extra (73567). |
| P0.4 | Resolve width convention | 1171=content / 1440=viewport | All pages | Card grammar at 1171w. Full routes at 1440w. MF-03 1512w is review-only. |
| P0.5 | Proof EvidenceOS-Editorial | DECIDE: component or archive | 1572:72278 | Promote to component with route, or mark archived. |
| P0.6 | Create light theme variants | Components needing light mode | Component Library | OpenLabPortalHero, OpenLabContextNav, TrustEvidenceSpine verified light variants. |
| P0.7 | Fix Codex card thumbnails | Bad thumbnails flagged | Codex Sites file | Re-export from canonical frames. |

## PHASE 1 — CODEX IMPLEMENTATION (POST-PROOFING)

| # | Module | Source Nodes | Route | Context |
|---|---|---|---|---|
| P1.1 | openlab-realtime | 561:41625 / 1791:77408 | /product/:slug (PDP) | HPLC purity trace SVG + batch records table. Single-product. |
| P1.2 | TrustEvidenceSpine | 556:34022 + 556:34122 | /product/:slug (PDP) | AssuranceCell ×5 + AssuranceRail. Cobalt-bordered. Single-product. |
| P1.3 | EmbeddedEvidence | 1572:71476 / 1384:17333 | /product/:slug (PDP) | Compact evidence block. Grid pad:0/20. Product-specific. |
| P1.4 | OpenLabPortalHero | 1263:5683 | /openlab | Portal hero. Multi-product gateway. |
| P1.5 | EvidenceArchive | 1572:71339 / 1791:76375 | /openlab/records | Searchable batch archive. Multi-product grid. |
| P1.6 | openlab-portal-index | 1082:29137 | /openlab | Full portal landing. Multi-product compound cards. |
| P1.7 | openlab-dossier-:compound | 1082:29876 | /openlab/:compound | Per-compound dossier. Single-product deep-dive. |
| P1.8 | openlab-batch-lookup | 1082:30582 | /openlab/batch | Batch verification tool. Cross-product search. |
| P1.9 | openlab-compare | 1082:30895 | /openlab/compare | Multi-product comparison. Side-by-side evidence. |

---

## PRODUCT-SPECIFIC PURITY PRESENTATION

### HPLC-DAD Purity Trace
- **Format:** SVG line chart
- **Routes:** PDP + /openlab/:compound
- **Spec:** Real chromatogram data rendered as interactive SVG. X-axis: retention time (minutes). Y-axis: absorbance (mAU). Peak annotation with purity %. Product-specific: one compound per trace.
- **Source frame:** openlab-realtime (561:41625 / 1791:77408)

### Batch Records Table
- **Format:** Structured data table
- **Routes:** PDP + /openlab/records
- **Columns:** Batch ID, Date, Purity %, Lab, Status
- **Spec:** Sortable, filterable. Green `#15803D` for verified status. Red for failed. Amber for pending.

### ChromatogramViewer
- **Format:** Embedded lab report
- **Routes:** /openlab/:compound
- **Spec:** Full-frame embedded COA document viewer. Zoomable PDF/image of actual lab certificate.

### Evidence Ledger
- **Format:** 6-step numbered list
- **Routes:** EvidenceA module (homepage, landing pages)
- **Steps:** 1. Raw material sourcing → 2. Synthesis → 3. In-house QC → 4. Third-party testing → 5. COA generation → 6. Batch release
- **Purpose:** Visual chain of custody

## 4-STATE HONESTY LANGUAGE

| State | Color | Component | Meaning |
|---|---|---|---|
| Verified Evidence | Green `#15803D` | EvidenceStatusChip | Third-party lab confirmed. COA available. HPLC trace matches batch. |
| Source Reported | Blue `#0057FF` | EvidenceStatusChip | Manufacturer-provided data. Not independently verified. |
| Source Only | Amber `#D97706` | EvidenceStatusChip | Specification from source. No lab data. Awaiting verification. |
| Unavailable | Grey `#6B7280` | EvidenceStatusChip | No evidence data exists. Transparently absent. |

---

## CANONICAL PAGE ASSIGNMENT

| Route | Context | Modules | Rule |
|---|---|---|---|
| `/product/:slug` (PDP) | Single-product | openlab-realtime, TrustEvidenceSpine, EmbeddedEvidence, CanvasSplit | One compound, one batch, one trace |
| `/openlab` | Multi-product portal | OpenLabPortalHero, openlab-portal-index, EvidencePortal, OpenLabBanner | Gateway to all evidence |
| `/openlab/:compound` | Single-product deep-dive | openlab-dossier, ChromatogramViewer, Evidence Ledger | Full compound dossier |
| `/openlab/records` | Multi-product archive | EvidenceArchive, openlab-lab-records-archive, Batch Records Table | Searchable cross-product archive |
| `/openlab/batch` | Cross-product tool | openlab-batch-lookup, Realtime | Batch ID verification |
| `/openlab/compare` | Multi-product tool | openlab-compare | Side-by-side compound comparison |
| `/` (Homepage) | Multi-product preview | EvidenceA, Realtime, OpenLabBanner | Trust messaging teaser |

---

## ACCEPTANCE CHECKS

- [ ] Phase 0 complete: all duplicates removed, canonical sources identified
- [ ] HeroOpenLab-light uses 1061h canonical only
- [ ] Width convention documented: 1171 content / 1440 viewport / 1512 review-only
- [ ] PDP routes show single-product evidence only
- [ ] Portal/Homepage routes show multi-product evidence
- [ ] HPLC trace renders as interactive SVG (not raster image)
- [ ] Batch Records table uses `#15803D` green for verified status
- [ ] 4-state honesty language applied to all EvidenceStatusChip instances
- [ ] No payment/Woo mutation/BiasPay in OpenLab evidence surfaces
- [ ] No editor artifacts (COPY BOUNDARY, VARIANT 01) in production output
- [ ] Codex card thumbnails re-exported from canonical frames

## RISK NOTES

- **7 duplicate route compositions** on page 369:5500 — must canonicalize before Codex implements or wrong source gets used
- **EvidenceOS-Editorial** (1572:72278) is unproofed — Codex must not implement until owner decision
- **ChromatogramViewer** is a concept — no Figma component exists yet. Requires COA embed architecture decision.
- **openlab-realtime HPLC trace** — SVG rendering of real chromatogram data requires backend API for batch-specific data
- Olympus runtime/payment/security concerns are out of scope per codex-bridge rules — Codex should follow AGENTS.md for any checkout-adjacent work

## OPEN ITEMS

- [ ] Owner decision on EvidenceOS-Editorial: promote or archive?
- [ ] ChromatogramViewer component needs Figma design (currently concept only)
- [ ] Backend API for HPLC trace data (batch-specific chromatogram SVG generation)
- [ ] Light theme verification for OpenLabPortalHero, OpenLabContextNav, TrustEvidenceSpine
- [ ] Codex Sites file (67dsmMdok9JnLZ5GCdRhBL) thumbnail audit and re-export
- [ ] Mobile variants for EvidenceA, EvidenceArchive, EvidencePortal (currently desktop-only)
