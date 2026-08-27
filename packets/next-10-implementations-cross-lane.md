# FIGMA_TO_CODEX_PACKET — Next 10 Implementations + Media Producer Cross-Lane

## CONTEXT

- **Active repo/project:** mujtabaakhawaja-prog/oluk-design-system
- **Lane 1:** OpenLab/EvidenceOS candidate → Native Next consumer adoption
- **Lane 2:** Media Library Producer → paired design/code components
- **Runtime boundary:** apps/olympus-shopper-ui/** — no payment, Woo, BiasPay, processor, egress, or deployment
- **Controller thread:** 019f1c9d-4da1-70d0-9bee-47b11217cc6f
- **Executor thread:** 019f1a53-e77c-7753-a3ba-541a8e7bc05d

## CONTROL SURFACE

- **Computer Use:** Not active this packet
- **Figma MCP:** Active — file BEPMuUt1HroEw8xjz8CVyN verified
- **GitHub connector:** Active — repo mujtabaakhawaja-prog/oluk-design-system @ main
- **Browser / preview:** Not active

## CONFIRMED

- Candidate page 1920:422 exists with all 10 sections (00–09) fully populated
- 5 component sets verified: ChampionRoute (8 variants), EvidenceStateCard (4), ProductEvidenceSnapshot (2), CoaDocumentViewer (2), EvidenceChart (4)
- 8 champion instances verified: Portal × 4 widths + Compound × 4 widths
- PDP board (1956:84532), Records/CoA board (1959:3170), disposition register (1931:422), route atlas (1925:422), receipt (1926:469) — all exist
- 34 unique CANDIDATE_SLOT_ID values across 13 customer routes
- 4 fail-closed evidence states implemented
- Responsive proofs at 1440, 1024, 768, and 390
- Customer-surface backend/projection/fixture/raw-key copy hits: **0**
- Stale canonical `/openlab` path hits: **0**
- Candidate status: CANDIDATE_PENDING_HUMAN_REVIEW · MUTABLE · UNADOPTED
- Version pin: VERSION_PIN_BLOCKED_WITH_EXACT_FIGMA_CAPABILITY
- Media producer packet submitted (SHA-256: ea6682b9…) but controller stalled — 0 events for 18+ minutes
- No repository, branch, PR, runtime, deployment, or production configuration changed
- Primary worktrees (Design f7300d74… + Native 209b630d…) preserved untouched

## AUTHORITY NODES

### Page & Sections
- Page: `1920:422` — OPENLAB · PURPOSE + PROTOTYPE · V1
- 00 Source Register: `1920:423`
- 01 Route Purpose Atlas: `1920:424`
- 02 Component Family Atlas: `1920:425`
- 03 Portal/Library Champion: `1920:426`
- 04 MK-2866 Single-Product Champion: `1920:427`
- 05 PDP Evidence Snapshot: `1920:428`
- 06 Record/Report/CoA: `1920:429`
- 07 State + Responsive Matrix: `1920:430`
- 08 Disposition + Supersession: `1920:431`
- 09 Codex Adoption Receipt: `1920:432`

### Component Sets
- `1950:83409` — OpenLab / ChampionRoute (Route=Portal|Compound × Width=1440|1024|768|390)
- `1953:83313` — OpenLab / EvidenceStateCard (Verified, SourceReported, SourceOnly, Unavailable)
- `1956:84529` — OpenLab / ProductEvidenceSnapshot (Desktop, Mobile)
- `1956:84727` — OpenLab / CoaDocumentViewer (Desktop+Mobile Unavailable; available variant held)
- `1967:84837` — OpenLab / EvidenceChart (Width × State; explicitly not a reconstructed chromatogram)

### Champion Instances
- Portal 1440: `1953:83318` · 1024: `1953:83955` · 768: `1953:84183` · 390: `1953:83546`
- Compound 1440: `1953:83695` · 1024: `1953:84335` · 768: `1953:84468` · 390: `1953:83830`

### Key Boards & Registers
- PDP board: `1956:84532` · desktop snapshot: `1956:84659` · mobile snapshot: `1956:84680`
- Records/report/CoA board: `1959:3170`
- CoA unavailable: desktop `1959:3287` · mobile `1959:3300`
- EvidenceChart matrix: `1967:84841`, `1967:84855`, `1967:84863`, `1967:84877`
- Source register: `1923:422` · Route atlas: `1925:422` · Component atlas: `1926:422`
- Disposition register: `1931:422` · Receipt: `1926:469`

### Documentation Spreads (page 1623:2)
- Spread 6: `1878:251` — OpenLab & Evidence Modules inventory
- Spread 7: `1878:553` — Phase 0→1 Implementation Plan
- Spread 8: `1899:2` — Route Identity Registry
- Spread 9: `1994:2752` — Next 10 Implementations + Media Producer

---

## REQUIRED CODEX ACTIONS — NEXT 10 IMPLEMENTATIONS

### IMPLEMENTATION 01 — GATE: Human Visual Approval

**Lane:** GATE (blocks all downstream)  
**Depends on:** None — first gate  
**Figma source:** `1920:422` (all 10 sections)  
**Runtime target:** No code change — approval enables all downstream  
**Status:** BLOCKED_PENDING_HUMAN

**Action:** A named human reviewer must inspect the candidate page, all champion instances at all four widths, evidence state cards, PDP snapshot, records/CoA board, evidence charts, disposition register, and adoption receipt. The reviewer confirms:
- Portal and compound champions correctly separate multi-product vs single-product jobs
- Evidence honesty states are fail-closed (no invented data)
- Responsive recomposition is correct at 1440/1024/768/390
- No backend projection, reconstructed CoA, inferred trend, or stale `/openlab` path
- Component family registry matches the functional identity records

---

### IMPLEMENTATION 02 — GATE: Figma Version Pin Resolution

**Lane:** GATE  
**Depends on:** #01 approved  
**Figma source:** `1926:469` (receipt node)  
**Runtime target:** Rebind VERSION_PIN from BLOCKED → genuine version ID in receipt  
**Status:** BLOCKED_NO_API

**Action:** `saveVersionHistoryAsync` is not a supported Plugin API. Manual resolution required:
1. Open file BEPMuUt1HroEw8xjz8CVyN in Figma
2. File menu → Add to version history
3. Title: `OPENLAB_PURPOSE_PROTOTYPE_V1_APPROVED`
4. Description: `Candidate approved by [reviewer name] on [date]. Sections 00-09 complete.`
5. Save and capture the version URL/ID from version history panel
6. Update receipt node `1926:469` text to replace `VERSION_PIN_BLOCKED_WITH_EXACT_FIGMA_CAPABILITY` with the genuine version identifier
7. Update status from `CANDIDATE_PENDING_HUMAN_REVIEW` → `CANDIDATE_APPROVED`
8. Update mutability from `MUTABLE` → `VERSION_PINNED`

---

### IMPLEMENTATION 03 — EvidenceStateCard (React + CSS)

**Lane:** LANE 1 — OpenLab/EvidenceOS  
**Depends on:** #01 approved  
**Figma source:** `1953:83313` — 4 variants (Verified, SourceReported, SourceOnly, Unavailable)  
**Runtime target:**

```
Files:
- components/openlab/EvidenceStateCard.tsx
- components/openlab/EvidenceStateCard.module.css
- components/openlab/__tests__/EvidenceStateCard.test.tsx
```

**Changes:**
- Create `EvidenceStateCard` component with `state` prop: `'verified' | 'source-reported' | 'source-only' | 'unavailable'`
- Map to 4-state honesty language: OPENLAB VERIFIED (#0B6E4F), SOURCE REPORTED (#1A56DB), SOURCE ONLY (#7C6A0A), UNAVAILABLE (#6B7280)
- Fail-closed: if state is unknown or missing, render UNAVAILABLE — never omit the card
- Use inherited OLUK tokens: `--oluk-canvas`, `--oluk-card`, `--oluk-cobalt`
- Typography: Inter Variable body, Plus Jakarta Sans for state label
- Variant dimensions from Figma: 300×172 (Verified/Unavailable), 300×194 (SourceReported/SourceOnly)

---

### IMPLEMENTATION 04 — ProductEvidenceSnapshot (PDP Continuation)

**Lane:** LANE 1  
**Depends on:** #03 (uses EvidenceStateCard internally)  
**Figma source:** `1956:84529` — 2 variants (Desktop 1248×202, Mobile 366×502)  
**Runtime target:**

```
Files:
- components/openlab/ProductEvidenceSnapshot.tsx
- components/openlab/ProductEvidenceSnapshot.module.css
- components/openlab/__tests__/ProductEvidenceSnapshot.test.tsx
```

**Changes:**
- Create `ProductEvidenceSnapshot` component for PDP placement below commerce opening
- Props: `productSlug`, `latestRecord` (admitted record data), `evidenceState`
- Compose `EvidenceStateCard` internally for state display
- Desktop: inline below PurchasePanel; Mobile: full-width below commerce
- Reuses PDP primitives: `ProductMediaChamber` instance `1956:84534`, `PurchasePanel` instance `1956:84539`
- Link to `/open-lab/compound/:slug` for full evidence view
- Render UNAVAILABLE state when no admitted record exists

---

### IMPLEMENTATION 05 — BottleTheatre Vertical Slice (Media Producer)

**Lane:** LANE 2 — Media Producer  
**Depends on:** Controller allocation (BLOCKER_V1 receipt SHA 678f3289…)  
**Figma source:** New component — paired with spec from OLUK_MEDIA_LIBRARY_PROTOTYPE_V1.json  
**Runtime target:**

```
Files:
- components/media/BottleTheatre.tsx
- components/media/BottleTheatre.module.css
- Editable Figma component: Media/BottleTheatre (new page/section in design file)
```

**Changes:**
- Implement paired design+code producer per OLUK_MEDIA_LIBRARY_PROTOTYPE_V1.json spec
- TypeScript props, exact MK-2866 asset hashes, named editable-design layers matching DOM/CSS anatomy
- States: default, active, focus-visible, loading, unavailable, blocked, mobile, reduced-motion
- 1440/1024/768/390 recomposition per producer spec
- 44px touch target, keyboard nav, accessibility contracts
- Inherit: `#f7f8fc` canvas, `#ffffff` card, `#f0f4fb` media surface, `#0057ff` cobalt, Plus Jakarta Sans + Inter Variable
- No new palette, dark-blue dashboard, media-specific token layer, or provenance canvas
- **BLOCKED** until controller allocates clean Design successor + editable-design lease

---

### IMPLEMENTATION 06 — ChampionRoute Shared Portal/Compound

**Lane:** LANE 1  
**Depends on:** #03, #04  
**Figma source:** `1950:83409` — 8 variants (Route=Portal|Compound × Width=1440|1024|768|390)  
**Runtime target:**

```
Files:
- components/openlab/ChampionRoute.tsx
- components/openlab/ChampionRoute.module.css
- app/open-lab/page.tsx (portal variant)
- app/open-lab/compound/[slug]/page.tsx (compound variant)
```

**Changes:**
- Create `ChampionRoute` component with `route: 'portal' | 'compound'` and responsive width handling
- Portal variant: multi-product editorial discovery with openlab-portal-hero, portal-ledger, portal-records, portal-methodology slots
- Compound variant: single-product dossier with compound-header, current-record, history, related-records slots
- Compose EvidenceStateCard and ProductEvidenceSnapshot as child slots
- Responsive: auto-recompose at 1440→1024→768→390 breakpoints
- Use canonical `/open-lab` prefix (hyphenated, NOT `/openlab`)

---

### IMPLEMENTATION 07 — Record/Report/CoA Artifact Boundaries

**Lane:** LANE 1  
**Depends on:** #03  
**Figma source:** `1959:3170` (board), `1956:84727` (CoaDocumentViewer, Unavailable variants only)  
**Runtime target:**

```
Files:
- components/openlab/CoaDocumentViewer.tsx
- app/open-lab/records/[recordId]/page.tsx
- app/open-lab/report/[batchId]/page.tsx
- app/open-lab/coa/[id]/page.tsx
```

**Changes:**
- Create `CoaDocumentViewer` with honest unavailable state (desktop 1248×260, mobile 366×468)
- Available variant intentionally held — awaits real supplied CoA artifact
- Record page: header + evidence + analytes + methodology + custody slots
- Report page: summary + analytes + source-action + document slots
- CoA page: document viewer + metadata + unavailable state
- Fail-closed: if no artifact supplied, render UNAVAILABLE — never show placeholder or reconstructed document

---

### IMPLEMENTATION 08 — EvidenceChart Structured-Peak Renderer

**Lane:** LANE 1  
**Depends on:** #03  
**Figma source:** `1967:84837` — 4 variants (Width=Desktop|Mobile × State=StructuredPeak|Unavailable)  
**Runtime target:**

```
Files:
- components/openlab/EvidenceChart.tsx
- components/openlab/EvidenceChart.module.css
- app/open-lab/evidence/page.tsx
```

**Changes:**
- Create `EvidenceChart` component — renders source-owned numeric peak data, NOT a reconstructed chromatogram
- Label as "Structured Peak Summary" — never "Chromatogram" unless displaying an actual instrument trace image
- Desktop: 620×374, Mobile: 334×350
- Unavailable state: honest disclosure when no numeric data admitted
- `>99%` remains a display comparator — not coerced, averaged, interpolated, or turned into a time series
- HPLC-MS purity, HPLC-DAD concentration, GC-MS identification remain separate evidence dimensions

---

### IMPLEMENTATION 09 — C2 Admitted-Record Field Mapping + 4-State Eligibility

**Lane:** SHARED (cross-lane)  
**Depends on:** #03  
**Figma source:** Route atlas `1925:422`, 34 CANDIDATE_SLOT_IDs, 4 evidence states  
**Runtime target:**

```
Files:
- lib/openlab/admitted-record-adapter.ts
- lib/openlab/evidence-eligibility.ts
- types/openlab.ts
```

**Changes:**
- Create TypeScript types for admitted record fields matching the route atlas's 34 candidate slots
- Implement deterministic visible-identifier formatting: `MK-2866 · OL2201` (full canonical identifier is metadata/detail concern)
- Implement 4-state eligibility evaluator:
  - OPENLAB VERIFIED: source-owned analytic + OLUK review
  - SOURCE REPORTED: source-reported but not independently verified
  - SOURCE ONLY: raw source data without context
  - UNAVAILABLE: no data admitted
- Fail-closed: unknown/missing → UNAVAILABLE
- Map C2 record fields to component props for EvidenceStateCard, ProductEvidenceSnapshot, ChampionRoute

---

### IMPLEMENTATION 10 — PDP Evidence Slot Integration

**Lane:** LANE 1  
**Depends on:** #04, #09  
**Figma source:** `1956:84532` (PDP board), `1956:84659` (desktop snapshot), `1956:84680` (mobile snapshot)  
**Runtime target:**

```
Files:
- app/product/[slug]/page.tsx (insert ProductEvidenceSnapshot below commerce)
```

**Changes:**
- Insert `ProductEvidenceSnapshot` into PDP page below `PurchasePanel`
- Wire `admitted-record-adapter` to fetch latest admitted record for product slug
- Wire `evidence-eligibility` to determine 4-state display
- Candidate slot ID: `pdp-evidence-snapshot`
- Responsive: desktop inline below commerce, mobile full-width
- Reuse existing PDP primitives: ProductMediaChamber, PurchasePanel
- If no record admitted for product, render UNAVAILABLE state

---

## FOLLOWUPS — After Next 10

| # | Item | Lane | Depends On |
|---|---|---|---|
| F1 | LabelCommerceTriptych | Lane 2 | #05 seals producer grammar |
| F2 | DossierWrapReader | Lane 2 | #05 seals producer grammar |
| F3 | Inter → Inter Variable typography gap closure | Shared | 78 inherited segments |
| F4 | Hero direction human selection | Gate | 1791:77015 vs 1791:76121 |
| F5 | Duplicate route frame supersession/archive | Gate | 9 exact duplicates pending human decision |
| F6 | Batch/methodology/source-chain/compare champion expansion | Lane 1 | Functional identities exist, no visual champions |
| F7 | CoaDocumentViewer "available" variant | Lane 1 | Awaits real CoA artifact |
| F8 | Multi-product trend/comparison numeric series | Lane 1 | No commensurable series admitted |
| F9 | OpenLab Spine → Sites Sync alignment | Shared | 9 modules, 47 route frames |
| F10 | Design producer lock + Native Next adoption | Gate | #01 + #02 gates clear |

## PROCESS FEEDBACK

### What's Working

1. **Serial bottleneck fixed** — Champion split (portal vs compound) enables parallel lane work. Design proofs no longer block prototyping.
2. **Source-gated honesty enforced** — 0 backend projection, 0 reconstructed CoA, 0 inferred trend, 0 stale `/openlab` path across all customer surfaces.
3. **Evidence dimensions separated** — HPLC-MS purity, HPLC-DAD concentration, GC-MS identification, analytes, and report results remain independent and are not conflated.
4. **Component family registry complete** — 5 new component sets with correct variant matrices; 17 reused editorial components mapped.
5. **Responsive proofs at all widths** — 1440/1024/768/390 verified for both champions and PDP.

### What's Blocked

1. **VERSION PIN** — `saveVersionHistoryAsync` is not a supported Plugin API. Manual version history save did not expose immutable ID on readback. This blocks adoption receipt binding. Resolution: manual human action required.
2. **CONTROLLER STALL** — Media producer controller emitted 0 events for 18+ minutes after receiving producer packet. No branch, lease, or worker allocated. BottleTheatre vertical slice is spec-complete but execution-blocked. Resolution: escalated to source coordinator; do not bypass controller singularity.
3. **MISSING SOURCE NODES** — Named companion files without inspected nodes remain MISSING_SOURCE_NODE. Contents were not inferred. Resolution: inspect companion files when accessible.

### What Needs Attention

1. **Typography gap** — 78 inherited library segments use plain Inter instead of Inter Variable. Not a blocker but accumulating design-system debt.
2. **Consumer matrix** — 6 CANDIDATE, 6 UNASSIGNED, 0 ADOPTED. All `canonicalSlotId: null`. Route mapping informs purpose but does not gate adoption. This is correct posture but should be explicitly tracked.
3. **Hero direction** — The 1061px light hero (1791:77015) requires named human selection vs the 1079px alternate (1791:76121). Neither is blocked but the portal champion currently uses the preferred direction pending approval.
4. **Duplicate routes** — 9 exact duplicate route frames (1082:xxxxx ↔ 1822:xxxxx) exist. No superseded node should be deleted until consumers, review boards, and archive decision receive human approval.

## ACCEPTANCE CHECKS

- [ ] #01 Human visual approval recorded with reviewer name and date
- [ ] #02 Genuine Figma version ID bound to receipt node 1926:469
- [ ] #03 EvidenceStateCard renders all 4 states; fail-closed on unknown input
- [ ] #04 ProductEvidenceSnapshot renders at desktop and mobile; composes EvidenceStateCard
- [ ] #05 BottleTheatre paired design+code with hash receipt; all states at all widths
- [ ] #06 ChampionRoute renders portal and compound variants at all 4 widths
- [ ] #07 CoaDocumentViewer honestly renders unavailable; no placeholder/reconstructed document
- [ ] #08 EvidenceChart labeled "Structured Peak Summary" not "Chromatogram"; >99% not coerced
- [ ] #09 Admitted-record adapter maps all 34 slots; eligibility evaluator is fail-closed
- [ ] #10 PDP evidence slot renders below commerce; UNAVAILABLE when no record admitted
- [ ] No payment, Woo mutation, BiasPay, processor, egress, or deployment in any implementation
- [ ] No editor artifacts (COPY BOUNDARY, VARIANT 01, generated route labels) in production output
- [ ] No `/openlab` (unhyphenated) paths in any route definition
- [ ] apps/olympus-shopper-ui/** kept separate from payment-authoritative plugin surfaces
- [ ] Build passes with TypeScript strict mode
- [ ] All 4 responsive widths verified per component

## RISK NOTES

- **Version pin unresolvable by automation** — requires manual Figma UI action. Do not claim VERSION_PINNED until human produces and binds genuine version ID.
- **Controller stall may recur** — if controller fails to allocate after escalation, consider manual branch creation as recovery, but do not bypass controller singularity without coordinator approval.
- **CoA available variant intentionally held** — do not implement a placeholder or mock CoA viewer. The unavailable state is the honest truth.
- **>99% is display only** — do not create aggregation, averaging, interpolation, or time-series logic for purity comparators.
- **Dirty worktrees preserved** — Design (9 paths) and Native (1,048 paths) primary worktrees are untouched. Do not clean, reset, or force-push.

## OPEN ITEMS

- Named companion files without inspected Figma nodes remain MISSING_SOURCE_NODE
- CoaDocumentViewer "available" variant awaits real supplied artifact
- State-coverage skill was absent from installed skill directory; repository matrix used instead (SHA fd7445ab…)
- Consumer matrix has 0 ADOPTED entries — correct posture but explicit tracking needed

## FIGMA SPREAD

- **Spread 9:** `1994:2752` — Next 10 Implementations + Media Producer (page 1623:2, x=12320, y=2000)
- **Dimensions:** 1440×2358
