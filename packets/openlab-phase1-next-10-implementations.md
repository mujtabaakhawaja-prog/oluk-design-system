# FIGMA_AGENT_RESPONSE — Candidate Verification + Next 10 Implementations

**File:** BEPMuUt1HroEw8xjz8CVyN
**Date:** 2026-08-27
**Responding to:** Usable candidate complete + Media producer packet
**Verification method:** Live Plugin API node inspection of all claimed IDs

---

## CONFIRMED

Every structural claim in the submission is verified against live Figma evidence:

### Page and Section Structure ✅
- Page `1920:422` exists: "OPENLAB · PURPOSE + PROTOTYPE · V1"
- 10 sections present, correctly named 00–09:
  - `1920:423` — 00 · SOURCE REGISTER (1 child: Source Register 2800×1980)
  - `1920:424` — 01 · ROUTE PURPOSE ATLAS (1 child: Route Purpose Atlas 2800×2649)
  - `1920:425` — 02 · COMPONENT FAMILY ATLAS (5 children: atlas frame + 4 component sets)
  - `1920:426` — 03 · PORTAL / LIBRARY CHAMPION (4 children: title + annotation + 2 instances)
  - `1920:427` — 04 · MK-2866 SINGLE-PRODUCT CHAMPION (4 children: title + annotation + 2 instances)
  - `1920:428` — 05 · PDP EVIDENCE SNAPSHOT (4 children: title + annotation + PDP board + mobile snapshot)
  - `1920:429` — 06 · RECORD / REPORT / COA (4 children: title + annotation + records board + CoA mobile)
  - `1920:430` — 07 · STATE + RESPONSIVE MATRIX (11 children: EvidenceStateCard set + 1024/768 instances + EvidenceChart instances)
  - `1920:431` — 08 · DISPOSITION + SUPERSESSION (1 child: register 2800×2045)
  - `1920:432` — 09 · CODEX ADOPTION RECEIPT (1 child: receipt frame 2800×1358)

### Component Sets ✅ (5 new, all COMPONENT_SET type confirmed)
| Component | Node | Variants | Verified |
|-----------|------|----------|----------|
| `OpenLab / ChampionRoute` | `1950:83409` | 8 variants: Route=Portal\|Compound × Width=1440\|1024\|768\|390 | ✅ |
| `OpenLab / EvidenceStateCard` | `1953:83313` | 4 variants: State=Verified\|SourceReported\|SourceOnly\|Unavailable | ✅ |
| `OpenLab / ProductEvidenceSnapshot` | `1956:84529` | 2 variants: Width=Desktop\|Mobile | ✅ |
| `OpenLab / CoaDocumentViewer` | `1956:84727` | 2 variants: Width=Desktop\|Mobile, State=Unavailable | ✅ |
| `OpenLab / EvidenceChart` | `1967:84837` | 4 variants: Width=Desktop\|Mobile × State=StructuredPeak\|Unavailable | ✅ |

### Champion Instances ✅ (All 8 are INSTANCE type, correctly sized)
| Instance | Node | Width | Height | Type |
|----------|------|-------|--------|------|
| Portal 1440 | `1953:83318` | 1440 | 2071 | INSTANCE ✅ |
| Portal 1024 | `1953:83955` | 1024 | 2075 | INSTANCE ✅ |
| Portal 768 | `1953:84183` | 768 | 2195 | INSTANCE ✅ |
| Portal 390 | `1953:83546` | 390 | 2711 | INSTANCE ✅ |
| Compound 1440 | `1953:83695` | 1440 | 1826 | INSTANCE ✅ |
| Compound 1024 | `1953:84335` | 1024 | 2389 | INSTANCE ✅ |
| Compound 768 | `1953:84468` | 768 | 2546 | INSTANCE ✅ |
| Compound 390 | `1953:83830` | 390 | 2502 | INSTANCE ✅ |

### PDP and Inherited Concerns ✅
- PDP board `1956:84532`: 1440×1028 FRAME ✅
- Desktop snapshot `1956:84659`: 1248×202 INSTANCE ✅
- Mobile snapshot `1956:84680`: 366×502 INSTANCE ✅
- ProductMediaChamber inherited `1956:84534`: 650×650 INSTANCE ✅
- PurchasePanel inherited `1956:84539`: 540×650 INSTANCE ✅

### CoA and Evidence ✅
- Records/report/CoA board `1959:3170`: 1440×1606 FRAME ✅
- CoA unavailable desktop `1959:3287`: 1248×260 INSTANCE ✅
- CoA unavailable mobile `1959:3300`: 366×468 INSTANCE ✅
- EvidenceChart matrix: 4 instances confirmed (desktop/mobile × structured-peak/unavailable) ✅

### Receipt ✅
- `1926:469` exists: "Codex Adoption Receipt — CANDIDATE_PENDING_HUMAN_REVIEW · MUTABLE · UNADOPTED · VERSION_PIN_BLOCKED_WITH_EXACT_FIGMA_CAPABILITY"
- Receipt text confirms: file key, page, sections, 34 candidate slot IDs, functional identity schema
- Status correctly reads: CANDIDATE_PENDING_HUMAN_REVIEW · MUTABLE · UNADOPTED

### Atlas Frames ✅
- Source Register `1923:422`: 2800×1980 ✅
- Route Purpose Atlas `1925:422`: 2800×2649 ✅
- Component Family Atlas `1926:422`: 2800×2315 ✅
- Disposition Register `1931:422`: 2800×2045 ✅

### Key Structural Verification
- Portal and MK-2866 jobs **are separated** — sections 03 and 04 contain distinct champion compositions ✅
- All champion instances are true INSTANCE type (not detached frames) ✅
- EvidenceStateCard covers all 4 fail-closed states ✅
- CoaDocumentViewer correctly shows only UNAVAILABLE variants (no reconstructed artifact) ✅
- EvidenceChart distinguishes StructuredPeak from Unavailable ✅
- PDP board inherits ProductMediaChamber and PurchasePanel as INSTANCE (not recreated) ✅
- Original source pages preserved — no deletions detected ✅

---

## CONTRADICTIONS

### 1. Hero Disposition Reversal
The Phase 0 audit (packets/openlab-phase0-source-audit-complete.md) recorded:
- `1791:76121` (1079h) → **ADOPT** (owner-selected canonical)
- `1791:77015` (1061h) → **ARCHIVE_CANDIDATE**

The candidate submission reverses this:
- `1791:77015` (1061h) → **ADAPT** ("Selected hero direction pending human approval")
- `1791:76121` (1079h) → **SUPERSEDE** ("replacement is 1791:77015")

**Figma evidence:** Spread 7 P0.1 (`1878:568`) currently reads "USE 1791:76121 (1079h)" — the owner correction applied earlier in this session. The candidate's disposition contradicts the corrected Spread 7.

**Resolution required:** Owner must confirm which hero is canonical. The Figma document says 76121; the candidate says 77015. This is **decision #1** below.

### 2. Evidence Charts Disposition Mismatch
Phase 0 audit: `1890:77164` → **ADOPT** (full breakpoint coverage, light + dark, 1440/1024/390)
Candidate submission: `1890:77164` → **DATA_ANATOMY_ONLY**

Evidence Charts has 12 children with full responsive coverage (1440/1024/390 × light/dark + 6 pixel references). This is more mature than DATA_ANATOMY_ONLY implies.

### 3. Version Pin Blocker
The candidate correctly identifies `saveVersionHistoryAsync` as unsupported. This is a genuine Figma Plugin API limitation — there is no programmatic version history API. The version must be created manually via File > Save to version history in Figma.

**This is not a Codex blocker for prototyping.** The mutable candidate with exact node IDs is sufficient for Lane 2 parallel work. The version pin blocks only the final adoption receipt binding.

---

## NEEDS CODEX

### Controller Stall
The 18-minute controller stall is a Codex-side process issue. Figma cannot diagnose or fix Codex task allocation. The user should:
1. Restart the controller task
2. Feed it the exact file/page/section tuple
3. Instruct it to allocate a clean Design producer branch immediately

### Media Producer Dispatch
The `OLUK_MEDIA_LIBRARY_PROTOTYPE_V1.json` packet is a local file — Figma cannot verify its contents. The three media components (`BottleTheatre`, `LabelCommerceTriptych`, `DossierWrapReader`) do not yet exist as Figma components or frames in the current file. They are specifications only.

Per AGENTS.md: "Candidate code must remain presentation-only." The media producer specifications are valid design-to-code contracts but must not introduce live APIs, runtime mutation, or deployment.

---

## NEXT 10 IMPLEMENTATIONS

Ordered by dependency chain and parallel-lane applicability. Items 1–5 are Figma-led (Lane 1). Items 6–10 are Codex-led (Lane 2) using governed fixture data.

### IMPLEMENTATION 1 — Hero Canonical Decision + Spacing Tightening
**Owner:** Human (decision) → Figma agent (execution)
**Figma nodes:** `1791:76121` or `1791:77015`
**Blocker for:** All downstream champion visual identity

Confirm which hero is canonical:
- A) `1791:76121` (1079h) — per Spread 7 correction
- B) `1791:77015` (1061h) — per candidate submission

Then apply spacing tightening from the Phase 0 audit:
- PortalCard padding: 20→24px
- Eyebrow→Heading gap: 12→16px
- CTA Container top margin: 16→20px
- "Every batch" padding: 40→32px
- Category card gap: 12→16px
- Bottom strip header: 17t/14b→16t/16b
- Remove ZZ/SUPERSEDED divider (`1791:76143`)

**Acceptance:** Canonical hero has consistent spacing, no dead elements, and passes visual review.

### IMPLEMENTATION 2 — Light-Theme Desktop COA Route Page
**Owner:** Figma agent
**Source:** `1905:79576` (dark desktop COA) + `1905:91167` (light section module)
**Target route:** `/open-lab/coa/:id`
**Candidate slot:** `openlab-coa-document`

Create a light-theme 1440-width COA route page:
- Light canvas (#f7f8fc) + white content planes
- Nav (inherited OLUK)
- Breadcrumb: Home > OpenLab > Records > CoA
- Batch header: "Batch WS-0642 — MK-2866 Ostarine" (governed fixture)
- Test results table (5 compounds from governed fixture data)
- Honest UNAVAILABLE state for chromatogram
- Download PDF CTA (presentation-only)
- Dark footer (sanctioned inverse surface)

Add `CoaDocumentViewer / Width=Desktop, State=Supplied` variant to `1956:84727` once a real artifact exists.

**Acceptance:** Light desktop COA at 1440. No dark theme on customer canvas. Chromatogram honestly unavailable.

### IMPLEMENTATION 3 — Populate Empty Mobile COA Shell
**Owner:** Figma agent
**Source:** `1905:79937` (populated mobile COA) → populate `1905:79715` (empty shell)
**OR:** Archive `1905:79715` and create 390-width light mobile COA

The empty shell (`1905:79715`) has nav only. Either:
- A) Copy content structure from `1905:79937` into it
- B) Archive `1905:79715` as REJECT (per Phase 0 disposition) and create a new light-theme mobile COA

**Acceptance:** No empty mobile COA frames remain. Light theme. Content matches desktop COA.

### IMPLEMENTATION 4 — Batch Lookup + Methodology + Source Chain Champions
**Owner:** Figma agent
**Extends:** `OpenLab / ChampionRoute` component set (`1950:83409`)
**Target routes:** `/open-lab/batch-lookup`, `/open-lab/methodology`, `/open-lab/source-chain`

These routes have functional identities and candidate slot IDs but were not expanded into champion boards in the bounded vertical slice. Add Route variants:
- `Route=BatchLookup, Width=1440|390` — search input + fail-closed result state
- `Route=Methodology, Width=1440|390` — editorial explanation using `OpenLab / Methodology / Customer` (`1841:559`)
- `Route=SourceChain, Width=1440|390` — custody narrative using `OpenLab / SourceCustody / Customer` (`1841:570`)

**Acceptance:** 6 new ChampionRoute variants. Each uses existing components. Light theme. Honest empty/unavailable states.

### IMPLEMENTATION 5 — Duplicate Route Archival + Layer Naming Pass
**Owner:** Figma agent
**Scope:** 7 duplicate route frames (1822:xxxxx set) + generic "Frame" layer names in COA viewers

Archive the duplicate route compositions:
| Archive | Original kept |
|---------|---------------|
| `1822:77602` | `1082:29137` openlab-portal-index |
| `1822:77931` | `1082:29460` openlab-lab-records-archive |
| `1822:78399` | `1082:29876` openlab-dossier-mk2866 |
| `1822:78688` | `1082:30382` openlab-report-detail |
| `1822:78889` | `1082:30582` openlab-batch-lookup |
| `1822:79207` | `1082:30895` openlab-compare |
| `1822:79280` | `1082:30967` openlab-evidenceos-command |

Rename generic layers in COA viewers:
- "Frame" → semantic names matching functional role
- Content children → match component family naming convention

**Acceptance:** Duplicates moved to archive section. No deletion. Layer names are semantic.

### IMPLEMENTATION 6 — EvidenceStateCard React Implementation
**Owner:** Codex (Lane 2)
**Figma source:** `1953:83313` — 4 variants (Verified, SourceReported, SourceOnly, Unavailable)
**Consumer:** `components/openlab/EvidenceStateCard`
**Governed fixture:** 4-state matrix from `state-render.matrix.json`

```
components/openlab/
  EvidenceStateCard/
    EvidenceStateCard.tsx
    EvidenceStateCard.module.css
    EvidenceStateCard.test.tsx
```

Props:
```typescript
interface EvidenceStateCardProps {
  state: 'VERIFIED' | 'SOURCE_REPORTED' | 'SOURCE_ONLY' | 'UNAVAILABLE';
  compoundLabel?: string;  // e.g. "MK-2866 · OL2201"
}
```

Design tokens: canvas #f7f8fc, card #ffffff, cobalt #0057ff, Plus Jakarta Sans ExtraBold (display), Inter Variable (body).

**Acceptance:** Renders all 4 states. No state outside the permitted set. Presentation-only. No live API. Light theme only (dark footer exception not applicable to cards).

### IMPLEMENTATION 7 — ProductEvidenceSnapshot React Implementation
**Owner:** Codex (Lane 2)
**Figma source:** `1956:84529` — 2 variants (Desktop, Mobile)
**Consumer:** `components/openlab/ProductEvidenceSnapshot`
**Route:** `/product/[slug]` evidence slot below commerce opening
**Governed fixture:** MK-2866 data from Phase 0 §10

```typescript
interface ProductEvidenceSnapshotProps {
  compound: string;           // "MK-2866"
  commonName: string;         // "Ostarine"
  purityDisplay: string;      // ">99%"
  evidenceState: EvidenceState;
  latestRecordLabel: string;  // "MK-2866 · OL2201"
  continuationHref: string;   // "/open-lab/compound/mk-2866"
}
```

Do NOT convert `>99%` to a number. Do NOT generate trend data. Do NOT create a time series. `purityDisplay` is a string display comparator only.

**Acceptance:** Desktop and mobile variants. Inherits ProductMediaChamber and PurchasePanel grammar. Presentation-only. 15–16px body floor, 12px metadata floor per DEC-TYPE-FLOOR-001.

### IMPLEMENTATION 8 — Primitive Adapters + Visible Identifier Formatting
**Owner:** Codex (Lane 2)
**Scope:** Deterministic customer-facing label generation

```typescript
// Deterministic visible identifier
function formatRecordLabel(compound: string, batchShort: string): string {
  return `${compound} · ${batchShort}`;
}
// e.g. formatRecordLabel("MK-2866", "OL2201") → "MK-2866 · OL2201"
```

Four-state eligibility adapter:
```typescript
function resolveEvidenceState(record: GovernedFixture): EvidenceState {
  if (!record) return 'UNAVAILABLE';
  if (!record.purityDisplay) return 'SOURCE_ONLY';
  if (!record.verificationFlag) return 'SOURCE_REPORTED';
  return 'VERIFIED';
}
```

**Acceptance:** Full canonical identifier preserved in metadata/accessibility. Customer surfaces show short deterministic label. No invented batch IDs, dates, or lab names.

### IMPLEMENTATION 9 — CoaDocumentViewer React Implementation
**Owner:** Codex (Lane 2)
**Figma source:** `1956:84727` — currently only UNAVAILABLE variants
**Consumer:** `components/openlab/CoaDocumentViewer`
**Route:** `/open-lab/coa/:id`

```typescript
interface CoaDocumentViewerProps {
  state: 'SUPPLIED' | 'UNAVAILABLE';
  documentUrl?: string;       // Only when state === 'SUPPLIED'
  batchLabel: string;         // "MK-2866 · OL2201"
  labName?: string;           // Only if source-provided
  testDate?: string;          // Only if source-provided
}
```

When `state === 'UNAVAILABLE'`: render honest unavailable message. Do NOT reconstruct a CoA from inferred data. Do NOT show a placeholder chromatogram.

When `state === 'SUPPLIED'`: render the supplied PDF/image artifact. The supplied-artifact Figma variant is intentionally held until a real document exists.

**Acceptance:** Honestly unavailable when no artifact. Presentation-only. No live API fetch. Light theme.

### IMPLEMENTATION 10 — ChampionRoute Shell + Portal Route
**Owner:** Codex (Lane 2)
**Figma source:** `1950:83409` — Route=Portal variants at all 4 widths
**Consumer:** `components/openlab/ChampionRoute` + `app/open-lab/page.tsx`
**Candidate slots:** `openlab-portal-hero`, `openlab-portal-ledger`, `openlab-portal-records`, `openlab-portal-methodology`

Shared responsive shell:
```typescript
interface ChampionRouteProps {
  route: 'portal' | 'compound';
  children: React.ReactNode;
}
```

Portal page composition:
```
<ChampionRoute route="portal">
  <EvidenceHero />           {/* openlab-portal-hero */}
  <EvidenceLedger />         {/* openlab-portal-ledger */}
  <BatchRecordTable />       {/* openlab-portal-records */}
  <MethodologyCard />        {/* openlab-portal-methodology */}
</ChampionRoute>
```

Responsive recomposition (not desktop scaling):
- 1440: full 2-column + hero
- 1024: narrowed 2-column
- 768: stacked single-column
- 390: mobile vertical stack

Per AGENTS.md: preserve "90 SERVINGS" (not "90 CAPS"). Light mode only. Dark footer is sole inverse surface.

**Acceptance:** Route renders at all 4 widths. Slot IDs map to Figma champion instances. No live API. No Woo/cart mutation. Presentation-only.

---

## FOLLOWUPS AND FEEDBACK

### 1. Parallel Lane Execution Is Now Unblocked
The candidate verification confirms the Figma source is complete and structurally sound. Codex should not wait for:
- Hero canonical decision (Lane 1) — use either hero; the components are identical in structure
- Version pin resolution (manual Figma UI) — the mutable node tuple is sufficient for prototype work
- CoA supplied-artifact variant — implement UNAVAILABLE first; add SUPPLIED when a real document arrives

### 2. Inter Variable vs. Plain Inter Gap
78 inherited library segments use plain "Inter" instead of "Inter Variable." This is an inherited design-system gap, not a candidate defect. Resolution:
- Figma: audit inherited components for Inter → Inter Variable migration
- Codex: use `Inter Variable` in all new code per AGENTS.md typography contract
- Do not block prototyping on this — it's a design-system maintenance task

### 3. Controller Stall Recovery
The Codex controller stalled for 18+ minutes. Recommended recovery:
1. Kill the stalled task
2. Create a new task with the exact file/page/section tuple from the receipt
3. Set first action: allocate clean Design producer branch from `origin/main`
4. Feed it this packet's IMPLEMENTATION 6–10 as the immediate work queue
5. Do not re-run Phase 0 audit — it's complete

### 4. Media Producer Components Are Phase 2
`BottleTheatre`, `LabelCommerceTriptych`, and `DossierWrapReader` are media presentation components. They depend on:
- Accepted MK-2866 transparent bottle renders (authority `717edc82`)
- Accepted label media (authority `def25463`)
- ProductMediaChamber as the existing OLUK grammar

These should sequence AFTER implementations 6–10. The existing `ProductMediaChamber` instance (`1956:84534`) in the PDP board proves the inheritance model works. The new media components extend it, they don't replace it.

### 5. Dark Theme Route Compositions Remain Structural Reference
All 7 original route compositions (`1082:29137`–`1082:30967`) and all A1-A7 Codex pages are dark theme. Per AGENTS.md "light mode only for the active lane." These remain STRUCTURAL_REFERENCE — use them for section structure and content hierarchy, never for visual identity. The light champion instances on page `1920:422` are the authoritative visual source.

### 6. Evidence Honesty Enforcement
Codex must enforce at the component level:
- `>99%` is a string, never parsed to a number
- No trend lines, time series, or interpolated values from a single comparator
- HPLC-MS (purity) ≠ HPLC-DAD (concentration) ≠ GC-MS (identification) — separate dimensions
- CoA viewer shows supplied artifacts or honest UNAVAILABLE — no reconstruction
- EvidenceChart shows StructuredPeak only from source-owned numeric points, else UNAVAILABLE

### 7. Candidate Slot ID Governance
All 34 `CANDIDATE_SLOT_ID` values have `canonicalSlotId: null`. They become canonical only after:
1. Human visual approval of the champion instances
2. Controller lock on the Design producer
3. Native Next route-slot adoption

Do not hardcode slot IDs as canonical in prototype code. Use them as organizational constants that can be renamed before adoption.

### 8. Responsive Proof Coverage
The candidate covers 1440/1024/768/390 for Portal and Compound champions. Still missing responsive proofs:
- Batch lookup (1024/768)
- Methodology (1024/768)
- Source chain (1024/768)
- Records archive (all widths — only structural reference exists)
- Report detail (all widths)

Implementation 4 addresses the first three. Records and Report need their own champion expansion in Phase 2.

### 9. Version Pin — Manual Resolution Path
The Figma UI version history action is: **File menu → Save to version history** (or Cmd+Option+S on Mac). Title the version:
```
OPENLAB_PURPOSE_PROTOTYPE_V1_CANDIDATE
```
Description:
```
Portal/library and MK-2866 single-product champions separated.
5 component sets, 8 champion instances, 34 candidate slot IDs.
STATUS: CANDIDATE_PENDING_HUMAN_REVIEW
```
After saving, the version ID from the version history panel should be recorded in receipt node `1926:469`.

### 10. Consumer Matrix Gap
The consumer matrix shows 6 CANDIDATE, 6 UNASSIGNED, 0 ADOPTED. The UNASSIGNED entries (BottleTheatre → collection/OpenLab compound, etc.) should not be force-assigned. They represent future expansion surfaces that depend on:
- Collection page design (not yet championed)
- OpenLab compound page maturation beyond MK-2866
- Homepage evidence slot design

Leave them UNASSIGNED until those surfaces have their own champion instances.

---

## IMPLEMENTATION DEPENDENCY GRAPH

```
HUMAN DECISION
  └─ [1] Hero canonical + spacing
       └─ [2] Light desktop COA
       └─ [3] Mobile COA populate/archive
       └─ [4] Batch/Methodology/SourceChain champions
       └─ [5] Duplicate archival + naming
  
PARALLEL (Lane 2 — no Figma dependency)
  ├─ [6] EvidenceStateCard.tsx
  ├─ [7] ProductEvidenceSnapshot.tsx
  ├─ [8] Primitive adapters
  ├─ [9] CoaDocumentViewer.tsx
  └─ [10] ChampionRoute shell + Portal route

[6]–[8] can run immediately.
[9] depends on [8] (adapter).
[10] depends on [6] + [7] (uses both components).
```

---

## FIGMA_TO_CODEX_PACKET

```
File: BEPMuUt1HroEw8xjz8CVyN
Page: 1920:422 — OPENLAB · PURPOSE + PROTOTYPE · V1
Selection: Full page verified (10 sections, 5 component sets, 8 champion instances)

Goal: Unblock Lane 2 prototyping with verified Figma source tuple.

Observed design truth:
  - 5 COMPONENT_SET nodes with correct variant matrices
  - 8 INSTANCE champion boards at 4 breakpoints
  - 4 fail-closed evidence states (Verified/SourceReported/SourceOnly/Unavailable)
  - PDP board inherits ProductMediaChamber + PurchasePanel as INSTANCE
  - CoA viewer honestly UNAVAILABLE (no reconstructed artifact)
  - EvidenceChart distinguishes StructuredPeak from Unavailable
  - Receipt correctly reads CANDIDATE_PENDING_HUMAN_REVIEW · MUTABLE · UNADOPTED
  - All 34 candidate slot IDs recorded with canonicalSlotId: null
  - Portal and compound champion jobs cleanly separated

Open questions:
  1. Hero canonical: 1791:76121 (Spread 7 says) vs 1791:77015 (candidate says)?
  2. Evidence Charts disposition: ADOPT (Phase 0) vs DATA_ANATOMY_ONLY (candidate)?
  3. Controller stall recovery — who restarts the task?

Implementation constraints:
  - Per AGENTS.md: presentation-only, no live APIs, no Woo/cart mutation
  - Light mode only (dark footer sole exception)
  - Plus Jakarta Sans ExtraBold (display) + Inter Variable (body)
  - 15–16px body floor, 12px metadata floor (DEC-TYPE-FLOOR-001)
  - >99% is display comparator string only — never parse to number
  - "90 SERVINGS" not "90 CAPS"
  - Do not publish components, activate Code Connect, deploy Sites, or claim promotion

Required Codex action:
  1. Restart stalled controller
  2. Allocate clean Design producer branch
  3. Begin implementations 6–10 (Lane 2, parallel, no Figma dependency)
  4. Use governed fixture data from Phase 0 packet
  5. Implement EvidenceStateCard → ProductEvidenceSnapshot → adapters → CoaDocumentViewer → ChampionRoute

Acceptance checks:
  - All 4 evidence states render correctly
  - Responsive at 1440/1024/768/390
  - No backend projection prose on customer surfaces
  - >99% preserved as string
  - CoA shows UNAVAILABLE when no artifact
  - No live API calls
  - TypeScript strict, presentation-only

Risk notes:
  - Hero disposition contradiction between Phase 0 and candidate — resolve before Lane 1 visual work
  - 78 inherited Inter (non-Variable) segments — migration is maintenance, not blocker
  - Media producer components (BottleTheatre etc.) are Phase 2 — don't start until 6–10 complete
  - Version pin is manual — do not block Lane 2 on it

Next action:
  - Human: confirm hero canonical selection (decision #1)
  - Figma: execute implementation 1 (spacing tightening) once decided
  - Codex: begin implementations 6–8 immediately (no dependency)
```

---

*Packet generated by Figma agent. All node IDs verified against live document.*
*Previous packet: packets/openlab-phase0-source-audit-complete.md (commit 585f9422)*
