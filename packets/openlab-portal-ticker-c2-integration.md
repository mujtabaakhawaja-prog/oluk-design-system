# FIGMA_TO_CODEX_PACKET — OpenLab Portal/Ticker C2 Integration Cycle

## CONTEXT

- Active repo/project: `oluk-design-system` (Figma design system) ↔ `oluk-frontier` (implementation)
- Lane: OpenLab portal summary, ticker, C2-backed row contract
- Runtime boundary: `sites/oluk-experience-lab/app/design-system/`
- Design successor branch: `codex/oluk-frontier-design-library-integration-v1`
- Design successor HEAD: `183f1b26bd8f444d345e917e6a7e2924066e7bae`
- Push/merge/publication: none

## CONTROL SURFACE

- Figma MCP: active — file `BEPMuUt1HroEw8xjz8CVyN`
- GitHub connector: active — this packet
- Browser / preview: not applicable (no deployed preview)

## CONFIRMED

- Row contract split implemented: `lab-reports.contract.ts` (tracked) and `openlab-report-record.contract.ts` (untracked candidate)
- Portal renders 15 C2-backed product/report rows
- Ticker aggregates: 15 Reports, 99.5% Avg SARMS Purity, 7 eligible, 0 Failures
- Per-row state: `Source reported` (uniform — not per-row PASS/Janoshik)
- Ticker context: `HPLC` (generic — not blanket HPLC-MS/DAD)
- C2 owner independently recompiled at `732542ff951d06444da99026db1b1f2c10ce02f2`
- All 15 Design ticker tuples matched C2 exactly: record ID, product name/slug, batch, purity display, tested date, source-reported state
- Zero missing, zero extra IDs
- 40/40 tests pass (PDP, MK-2866, OpenLab, portal, library, media)
- TypeScript pass, ESLint pass, zero warnings
- Token proof: 112 Figma vars, 128 CSS props, 0 ungoverned, 0 rejected
- PDP 4-width proof: pass (1440/1024/768/390)
- Worktree: clean

## PORTAL TICKER — C2-Governed Aggregate Values

| Metric | Value | Source |
|---|---|---|
| Total records | 15 | C2 portal policy count |
| Avg SARMS purity | 99.5% | Display rounding of raw 99.4686… |
| Eligible reports | 7 | C2 strict-SARMS contributor count |
| Failures | 0 | C2 failure policy result |
| Per-row state | Source reported | Uniform — not per-row PASS/Janoshik |
| Ticker context | HPLC | Generic — not blanket HPLC-MS/DAD |

## EXCLUDED FROM PORTAL — Evidence Honesty

- ✕ BPC-157 (not in admitted C2 product set)
- ✕ Placeholder products and invented verification dates
- ✕ "Live batch feed" language
- ✕ `OPENLAB VERIFIED` where not admitted
- ✕ `LAB_REPORTS_CARD_PROOF_FIXTURE_ROWS`
- ✕ Mock RAD-140, 24-FX-RAD140, 2026-08-26, example CDN values
- ✕ Per-row PASS, Janoshik, PDF availability, source-document claims
- ✕ Blanket HPLC-MS/HPLC-DAD attribution across all portal records
- ✕ Exact method dimensions remain in identity-pinned producers (e.g. MK-2866) only

## CONTRACT BOUNDARY — Native Binding Status

| Contract File | SHA-256 (first 16) | Status |
|---|---|---|
| `lab-reports.contract.ts` | `4fd560640dc9…` | Tracked, clean @ Native `209b630d`. LabReportsCardRow reference |
| `openlab-report-record.contract.ts` | `90b4d842e249…` | Untracked, dirty tree only. Candidate shape — not commit-owned |
| Native binding | — | `HELD_MISSING_COMMIT_OWNED_OPENLAB_REPORT_RECORD_PRODUCER` |

## PRIMARY IMPLEMENTATION FILES

- `sites/oluk-experience-lab/app/design-system/openlab-portal-summary.tsx` — Portal summary and ticker
- `sites/oluk-experience-lab/app/design-system/openlab-portal-view-model.json` — C2-backed portal view model
- `sites/oluk-experience-lab/app/design-system/openlab-hero-light.tsx` — Hero Light composition
- `sites/oluk-experience-lab/app/design-system/oluk-library/index.ts` — OLUK library export surface
- `sites/oluk-experience-lab/tests/openlab-portal-summary.test.mjs` — Focused authority and absence tests

## OLUK LIBRARY EXPORTS — Corrected

- ProductCommerceCard · PurchasePanel · ProductMediaChamber
- QualitativeChip · QualitativeChipList · EvidenceStatus
- LabRecord · HplcPurityTrace · StructuredPeakTable · AnalytePeakTable
- Methodology · RecordHistory · SourceCustody · ReportAction
- ProductEvidenceSnapshot · MK2866ProductEvidencePrototype
- OpenLabPortalSummary · OpenLabHeroLight (NEW — portal/ticker)
- BottleTheatre · LabelCommerceTriptych · DossierWrapReader (media)
- 3 RF03 context families

## INTEGRATED DESIGN SUCCESSOR

| Coordinate | Value |
|---|---|
| Branch | `codex/oluk-frontier-design-library-integration-v1` |
| HEAD | `183f1b26bd8f444d345e917e6a7e2924066e7bae` |
| Tests | 40/40 (PDP, MK-2866, OpenLab, portal, library, media) |
| TypeScript | Pass · ESLint pass · zero warnings |
| Token proof | 112 Figma vars · 128 CSS props · 0 ungoverned · 0 rejected |
| Build | Sanctioned Vinext pass |
| PDP 4-width | Pass (1440/1024/768/390) |
| Worktree | Clean |
| Push/merge | None |

## RF05 LIFECYCLE — Rehashed Against origin/main 091b66d5

| Lane | Result | Residual |
|---|---|---|
| Bag/checkout | Boundary pass · lifecycle 3/3, bounded prepare 6/6 · shipping pass | Dynamic route NOT_PROVEN (lease lacks node_modules/next) |
| Post-purchase | Post-purchase 6/6 · lifecycle 3/3, cold-session pass · runtime guard pass | None inside declared scope |
| complete_payment | Boundary pass · prepare 12/12, lifecycle 3/3 · PHP lint 5/5 | Preserve-only · zero delta |

## FIGMA STATUS

- Candidate page `1920:422`: `CANDIDATE_PENDING_HUMAN_REVIEW · MUTABLE · UNADOPTED`
- Portal placeholder correction: `NOT_PROVEN_NO_DURABLE_WRITER_RECEIPT_AFTER_BOUNDED_RECOVERY`
- Writer task `01a040a9…`: idle after 2 bounded recovery turns — no competing writer opened
- Version pin: `VERSION_PIN_BLOCKED_WITH_EXACT_FIGMA_CAPABILITY`
- Spread 11 built: node `2102:2` on page `1623:2` at x=15400

## AUTHORITY NODES

- Candidate page: `1920:422` — OPENLAB · PURPOSE + PROTOTYPE · V1 (10 sections)
- Receipt: `1926:469` — Codex Adoption Receipt
- Hero (human-selected): `1791:76121` — HeroOpenLab-light 1512×1079
- Spread 11: `2102:2` — Portal/Ticker Integration Cycle
- Component sets: `1950:83409` ChampionRoute, `1953:83313` EvidenceStateCard, `1956:84529` ProductEvidenceSnapshot, `1956:84727` CoaDocumentViewer, `1967:84837` EvidenceChart
- Variable collections: `VariableCollectionId:634:2` Color Primitives, `VariableCollectionId:634:20` Color Semantics, `VariableCollectionId:634:40` Dimensions, `VariableCollectionId:634:69` Typography

## NEXT EDGES

1. Resume or release writer lease → correct Figma hero/ticker in place → human visual approval
2. Private human review: `/review-studio/oluk-library`, `/review-studio/pdp-evidence-continuation`, `/review-studio/media-library`
3. Media Figma counterparts: LabelCommerceTriptych and DossierWrapReader on page `1930:424` (blocked on writer lease)
4. Component/token publication: 5 component families + 4 variable collections (after acceptance)
5. Version pin: manual Figma version history save required
6. Remote library typography: 475 Inter segments in 9 R6 remote components — fix in source library

## ACCEPTANCE CHECKS

- [ ] Portal renders exactly 15 C2-backed rows with correct aggregate ticker values
- [ ] No excluded content (BPC-157, fixtures, mock values, unadmitted claims) appears in portal output
- [ ] Contract boundary correctly separates tracked `lab-reports.contract.ts` from untracked candidate
- [ ] 40/40 tests pass on clean worktree
- [ ] Token proof: 0 ungoverned, 0 rejected
- [ ] PDP responsive proof: 1440/1024/768/390 pass
- [ ] No payment, Woo mutation, BiasPay, processor, egress, deployment, or public runtime promotion
- [ ] No private credentials, payment data, customer data, or API keys

## RISK NOTES

- `openlab-report-record.contract.ts` is untracked — candidate shape only, not commit-owned
- Native binding held until commit-owned producer exists
- Figma candidate diverges from sealed code producer on hero preference, unadmitted claims, structured rows, and Sig values
- Writer lease stall blocks Figma-side correction
- No push/merge/publication executed — all changes are local worktree only

## OPEN ITEMS

- Figma hero/ticker correction: blocked on writer lease resolution
- Material drift D1–D4: hero preference, strip unadmitted claims, fix structured rows 3→4, fix Sig=230,8→220,8
- Media producers LabelCommerceTriptych and DossierWrapReader: Figma counterparts blocked
- Code Connect: not proven for any component family

---

Durable controller receipt: `CONTROLLER_CYCLE_OPENLAB_RUNTIME_CONTRACT_INTEGRATION_V1`
Receipt SHA-256: `3e625960ffad…`

No Native source, C2, Woo, payment/provider, customer route, Figma node, deployment, production, or public endpoint was mutated.
