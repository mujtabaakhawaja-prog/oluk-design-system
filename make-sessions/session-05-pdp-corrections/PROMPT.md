# MF-05 — PDP Page Figma Corrections

**File:** `BEPMuUt1HroEw8xjz8CVyN`
**Target page:** `512:4651` (MF-02)
**Method:** Figma edit_design (corrections to existing nodes)

## Status

Dossier correction on `551:27148` is COMPLETE (hybrid A+B applied). Remaining PDP work below.

## Corrections

### 1. PDP Media + Purchase Panel

**Nodes:** `563:42661`, `563:42740`
**Reference:** `486:4634` (card makeup), `470:6393` (2-fold template)

- Media chamber with product render, bounded `rgb(240,244,251)` fill
- PurchasePanel: r=28, white fill, Softform Arc shadow
- MetricRail with bordered chips
- QualitativeChips with icons
- EvidenceStatus + InventoryStatus
- Price + quantity stepper + Add to Bag
- `90 SERVINGS` not `90 CAPS`

### 2. AssuranceRail `551:31587`

**Reference:** `556:34627` (AssuranceRail component)

- Use exact 6-point component: Identity Tested · Purity Measured · Concentration Confirmed · Janoshik Verified · Tamper-Proof Sealed · Batch Tracked
- Compact horizontal strip format

### 3. Dossier — COMPLETE ✓

Node `551:27148` corrected with hybrid A+B: compact header, three-panel [Facts|Media|Composition], in-family surface, ≥15px copy, reference-only tabs.

### 4. Lab Record Sections

**Nodes:** `551:31570`, `551:31665`, `551:31706`
**Reference:** `545:22790` (HPLC chart), `545:22831` (Batch Records), `588:67652` (Embedded Evidence)

- HPLC Purity Trace with chart
- Batch Records table
- Six-point record display
- Canvas-split layout per `222:1332`

### 5. Related Content

**Nodes:** `551:28672`, `551:28685`
**Reference:** `486:4636` (Horizontal card), `551:26896` (rail)

- Horizontal ProductCommerceCards with full makeup
- r=34 for horizontal density
- "Frequently paired together" — customer copy, not meta-commentary

## Work Split

| Work | Owner |
|------|-------|
| Figma node corrections (this file) | Figma agent |
| CSS/HTML implementation | Codex (CODEX-CORRECTION-PASS.md) |
| Dossier CSS clipping repair | Codex |
| Responsive breakpoints | Codex |
| Runtime binding | Codex (after v3 visual gate) |
