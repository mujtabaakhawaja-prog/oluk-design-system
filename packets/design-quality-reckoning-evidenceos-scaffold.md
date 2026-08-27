# FIGMA_TO_CODEX_PACKET — Design Quality Reckoning + EvidenceOS Scaffold Adoption

## CONTEXT

- Active repos: `oluk-design-system` (Figma), `EvidenceOS-OPENLAB` (scaffold source)
- Lane: Design quality correction, component adoption planning, media producers
- Figma file: `BEPMuUt1HroEw8xjz8CVyN`
- EvidenceOS source: `mujtabaakhawaja-prog/EvidenceOS-OPENLAB`
- Make original: `figma.com/make/N40v2cUxw3oxfcpSZoluCh/Evidence-OS-Authority-System`
- Make copy: `figma.com/make/dWfYi44TMeh4vwUqKxKTAy/Evidence-OS-Authority-System--Copy-`

## DESIGN QUALITY DIAGNOSIS

Codex inserted structured data into the candidate page (1920:422) without design judgment. The most severe case is Section 09 (Codex Adoption Receipt at 1920:432) — a raw metadata dump with no hierarchy, no visual system, no design sensibility. It reads like a terminal log pasted onto canvas.

Spreads 1–12 on the grid architecture page are **contract documentation** — they record implementation state, blockers, and next steps. They are NOT design references. If any downstream process is reading spreads as design input, that is the source of the misdirection.

### Candidate Page Section Assessment

| Section | Assessment | Action |
|---|---|---|
| 00 · Source Register | Structured metadata. Acceptable as inventory. | Keep — format only |
| 01 · Route Purpose Atlas | Text-heavy atlas. Information architecture, not design. | Keep — format only |
| 02 · Component Family Atlas | Large inventory (14952px). Dense but purposeful. | Keep — add visual specimens |
| 03 · Portal / Library Champion | **Real component instances** (ChampionRoute). Design quality present. | **KEEP — primary design authority** |
| 04 · MK-2866 Champion | **Real component instances**. Structured peaks, methodology, custody. | **KEEP — primary design authority** |
| 05 · PDP Evidence Snapshot | Component instances (ProductEvidenceSnapshot). | KEEP — validate responsive |
| 06 · Record / Report / COA | Component instances (CoaDocumentViewer). | KEEP — validate states |
| 07 · State + Responsive Matrix | State × width validation grid (5121px). | KEEP — reference proof |
| 08 · Disposition + Supersession | Text-heavy disposition register. | Keep — format only |
| 09 · Codex Adoption Receipt | **RAW METADATA DUMP. No design. Terminal log on canvas.** | **REDESIGN or REMOVE** |

### Design Authority Hierarchy

1. Component instances on candidate page (sections 03–07) — primary
2. Evidence OS Authority System Make file — structural scaffold
3. 5 Figma component sets (ChampionRoute, EvidenceStateCard, ProductEvidenceSnapshot, CoaDocumentViewer, EvidenceChart)
4. 4 variable collections (112 tokens across Color Primitives, Color Semantics, Dimensions, Typography)
5. Spreads 1–12 — contract ledger ONLY (never design input)

## EVIDENCEOS SCAFFOLD — Adoption Assessment

The Evidence OS Authority System Make file (`EvidenceOS-OPENLAB` repo) provides a structurally better foundation than what Codex built from scratch on the candidate page.

### What it has

- **15 render boards** with dark/light modes and responsive viewports (1440/390)
- **Token system**: Archivo font, cobalt `#0057ff` primary, proper surface/board/chip/border semantics per mode
- **Export pipeline**: 6-step bridge (unpack → capture → fidelity review → import repair → codification → codex bridge)
- **Component families**: ImageWithFallback, closeout-ui, proofs-board, qa-readback, signoff-board
- **Manifest**: Proper board provenance with `importReadiness` states (READY/REVIEW)

### What needs updating before adoption

| Asset | Current (EvidenceOS) | Target (OLUK) |
|---|---|---|
| Display font | Archivo | Plus Jakarta Sans |
| Body font | Archivo | Inter Variable |
| Mono font | Cousine | (keep or map) |
| Radius base | 18px | Map to Dimensions collection |
| Color modes | dark/light tokens in JSON | Align to Color Semantics (31 vars) |
| Primary | `#0057ff` | `#0057ff` (same — cobalt) |
| Surfaces | `#050807` dark / `#f4f5f2` light | Map to `#f7f8fc` canvas / `#ffffff` card |
| Board structure | 15 boards with render slots | Route adoption scaffold per ChampionRoute variant |

### Authority classification

`STAGING_NOT_AUTHORITY` (per manifest.json) — design/review input only, not runtime authority. Use as structural scaffold after foundation updates.

## OPENLAB COMPONENT FAMILY — Implementation Plan

### Priority 1: ChampionRoute (`1950:83409`)
- 8 variants: Route=Portal|Compound × Width=1440|1024|768|390
- Adopt EvidenceOS board structure as route scaffold
- Map each board to a ChampionRoute variant
- Publish after human visual review

### Priority 2: EvidenceStateCard (`1953:83313`)
- 4 states: Verified, SourceReported, SourceOnly, Unavailable
- Validate state colors against Color Semantics variables
- Align to 4-state honesty language

### Priority 3: ProductEvidenceSnapshot (`1956:84529`)
- 2 variants: Desktop, Mobile
- Inherit ProductMediaChamber pattern from EvidenceOS
- Validate image slot quality

### Priority 4: CoaDocumentViewer (`1956:84727`)
- 2 variants: Desktop+Mobile Unavailable (Available held)
- Complete Available variants using EvidenceOS record board as structural reference

### Priority 5: EvidenceChart (`1967:84837`)
- 4 variants: Width × State
- Adopt EvidenceOS chart primitives for bar rendering
- Preserve "not chromatogram" constraint (discrete bars only)

## MEDIA PAGE (1930:424) — Current State

| Section | Size | Status |
|---|---|---|
| 00 · Producer Lease | 1600×900 | Present |
| 01 · Bottle Theatre · Editable Component | 4200×2500 | Present — primary media producer |
| 02 · Bottle Theatre · Customer Review Specimens | 4400×2600 | Present |
| LabelCommerceTriptych | — | **NOT YET BUILT** (blocked — writer lease) |
| DossierWrapReader | — | **NOT YET BUILT** (blocked — writer lease) |

## RECOMMENDED NEXT ACTIONS

1. **STOP using spreads as design input** — they are the ledger, not the blueprint
2. **Redesign or remove Section 09** (Codex Adoption Receipt) — raw metadata is not design
3. **Clone EvidenceOS-OPENLAB locally**, run dev server, capture board screenshots for reference
4. **Use EvidenceOS board structure as scaffold** for ChampionRoute route adoption
5. **Remap EvidenceOS tokens**: Archivo → PJS/Inter Variable, align to Figma variable collections
6. **Build LabelCommerceTriptych and DossierWrapReader** on media page (after writer lease resolves)
7. **Complete CoaDocumentViewer Available variants** using EvidenceOS record board as structural reference
8. **Human visual review of sections 03–07** before any component publication
9. **Separate concerns**: spreads = contract ledger, candidate sections = design authority, Make = scaffold

## AUTHORITY NODES

- Candidate page: `1920:422` — OPENLAB · PURPOSE + PROTOTYPE · V1
- Media page: `1930:424` — MEDIA LIBRARY · DESIGN PRODUCER · V1
- Spread 12: `2117:2231` — Design Quality Reckoning + EvidenceOS Scaffold Plan
- Component sets: `1950:83409`, `1953:83313`, `1956:84529`, `1956:84727`, `1967:84837`
- Variable collections: `634:2`, `634:20`, `634:40`, `634:69`
- EvidenceOS repo: `mujtabaakhawaja-prog/EvidenceOS-OPENLAB`

## ACCEPTANCE CHECKS

- [ ] Section 09 redesigned or removed — no raw metadata dumps on candidate page
- [ ] EvidenceOS repo cloned and dev server verified locally
- [ ] Token remapping documented: Archivo → PJS/Inter Variable
- [ ] ChampionRoute variants mapped to EvidenceOS board structures
- [ ] No payment, Woo mutation, BiasPay, processor, egress, deployment, or public runtime promotion
- [ ] Spreads explicitly labeled as contract documentation, not design references

## RISK NOTES

- EvidenceOS Make file is marked `STAGING_NOT_AUTHORITY` — must not be promoted to runtime without full pipeline
- Token remapping (Archivo → PJS/IV) may reveal structural dependencies in EvidenceOS components
- Writer lease stall continues to block media page completion
- 475 remote library Inter segments remain unfixable from this file

## OPEN ITEMS

- Human decision: redesign Section 09 as a proper design artifact, or remove it entirely?
- Human decision: which EvidenceOS boards to adopt first for route scaffolding?
- Make file preview routes (`?page=majestic&mode=dark&density=compact`) — need live verification
- Writer lease resolution for media page producers

---

No Native source, C2, Woo, payment/provider, customer route, Figma node, deployment, production, or public endpoint was mutated.
