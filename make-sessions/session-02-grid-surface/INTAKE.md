# MF-02A — Intake: Native Component Registry & Transfer Verdicts

## Status

- **MF-01A:** COMPLETE — 5 card densities produced in Softform Arc direction
- **MF-01B:** COMPLETE — Transfer tested across 5 macro compositions, cherry-pick consolidated
- **Phase 1 Corrections:** COMPLETE — All cards componentized, typography consistent, compact states wired, horizontal card media height fixed
- **MF-02A Run 1:** COMPLETE — Direction C planar language selected as champion baseline
- **MF-02A Run 2:** COMPLETE — Hero variants tested; section differentiation failure identified
- **MF-02A Run 3:** READY TO RUN

## Run 1 Results Summary

| Composition | Dir A | Dir B | Dir C (Champion) |
|---|---|---|---|
| Hero | Background-image failure | Background-image failure | Background-image failure |
| Grid | Clean 3-card | Mixed density | Staggered planes |
| PDP S1 | Partial | Container filled | Planar elevation |
| Dossier | Deadspace | Deadspace | Right-side deadspace |
| Evidence | Static | Static | Dynamic (chart) |
| Rail | Canvas split | Canvas split | Canvas-split rhythm |

**Champion:** Direction C — staggered planes, elevation graduation, canvas-split rhythm, dynamic evidence.

## Run 2 Results Summary

| Composition | Dir A | Dir B | Dir C |
|---|---|---|---|
| Hero | Separate card + copy (not combined) | Full-width (too wide, weak media) | Editorial-forward (did not attempt card) |
| Grid | 4 compact cards | 4 compact cards (SAME) | 4 compact cards (SAME) |
| PDP S1 | Standard | Standard (SAME) | Standard (SAME) |
| Dossier | Three-column | Three-column (SAME) | Three-column (SAME) |
| Evidence | Badge row (FLATTENED) | Badge row (SAME) | Badge row (SAME) |
| Rail | Truncated card | Truncated card (SAME) | Truncated card (SAME) |

**Critical failures:**
1. No direction achieved the 2-fold vertical card hero
2. ALL compositions below the hero were IDENTICAL across all 3 directions
3. TrustEvidenceSpine flattened into generic badges — no Six-point record, no HPLC chart, no Batch Records
4. Horizontal card truncated with empty right side
5. Dossier deadspacing persists

## Input Strategy: 13 Native Frames (Run 3)

MF-02A Run 3 uses **13 native Figma frames** — 9 structural authority inputs + 4 reference pattern inputs. Zero PNGs.

### Structural Authority Inputs (9)

| # | Component | Node ID | Figma Link | Type | Dimensions | Source Page |
|---|---|---|---|---|---|---|
| 1 | ProductCommerceCard / Vertical | `486:4634` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634) | COMPONENT | 481×916 | MF-01 and MF-02 |
| 2 | ProductCommerceCard / Featured | `486:4635` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4635) | COMPONENT | 481×896 | MF-01 and MF-02 |
| 3 | ProductCommerceCard / Horizontal | `486:4636` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4636) | COMPONENT | 1060×542 | MF-01 and MF-02 |
| 4 | ProductCommerceCard / Compact | `486:4642` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4642) | COMPONENT_SET | 302×382 per variant | MF-01 and MF-02 |
| 5 | PurchasePanel | `478:10367` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=478-10367) | COMPONENT | 420×687 | 03 Identity Authority |
| 6 | PDP Section 1 — Control Test | `480:4503` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=480-4503) | INSTANCE | 1440×879 | MF-01 and MF-02 |
| 7 | LIVE / TrustEvidenceSpine | `475:9098` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=475-9098) | COMPONENT | 1440×851 | 03 Identity Authority |
| 8 | Dossier / Native Light VNext | `198:1292` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=198-1292) | COMPONENT | (see set) | 03 Identity Authority |
| 9 | Homepage Hero Container | `462:6144` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=462-6144) | FRAME | 1384×780 | HOMEPAGE HERO |

### Reference Pattern Inputs (4 — NEW for Run 3)

| # | Component | Node ID | Figma Link | Type | Dimensions | Source Page | Purpose |
|---|---|---|---|---|---|---|---|
| 10 | Hero 2-Fold Card Template | `470:6393` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-6393) | FRAME | 440×685 | 03 Identity Authority | LOCKED hero left-panel structure |
| 11 | Product Selector Container | `58:486` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=58-486) | FRAME | 336×460 | 03 Identity Authority | Product toggle pattern |
| 12 | LabReports / Canvas Split | `222:1332` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=222-1332) | INSTANCE | 1344×630 | 03 Identity Authority | Evidence section template |
| 13 | CanvasSplit:margin | `470:9078` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-9078) | FRAME | 1075×470 | 03 Identity Authority | Wide canvas-split variant |

## Native Component Registry

All components verified live in Figma file `BEPMuUt1HroEw8xjz8CVyN`.

### MF-01A Card Family (Componentized)

| Component | Node ID | Figma Link | Type | Dimensions | Page |
|---|---|---|---|---|---|
| ProductCommerceCard / Vertical | `486:4634` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634) | COMPONENT | 481×916 | MF-01 and MF-02 |
| ProductCommerceCard / Featured | `486:4635` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4635) | COMPONENT | 481×896 | MF-01 and MF-02 |
| ProductCommerceCard / Horizontal | `486:4636` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4636) | COMPONENT | 1060×542 | MF-01 and MF-02 |
| ProductCommerceCard / Compact | `486:4642` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4642) | COMPONENT_SET | 302×382 per variant | MF-01 and MF-02 |
| — State=Default | `486:4637` | | COMPONENT | 302×382 | |
| — State=Hover | `486:4638` | | COMPONENT | 302×382 | |
| — State=Focus | `486:4639` | | COMPONENT | 302×382 | |
| — State=Selected | `486:4640` | | COMPONENT | 302×384 | |
| — State=Added | `486:4641` | | COMPONENT | 302×384 | |
| PurchasePanel | `478:10367` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=478-10367) | COMPONENT | 420×687 | 03 Identity Authority |

### Native PDP & Page Composition Components

| Component | Node ID | Figma Link | Type | Dimensions | Page |
|---|---|---|---|---|---|
| Section 1: Full-Field Hero Rail | `475:9096` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=475-9096) | COMPONENT | 1440×879 | 03 Identity Authority |
| Layout=Full Field (Media Chamber) | `202:1165` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=202-1165) | COMPONENT | 760×800 | 03 Identity Authority |
| PurchaseRail / Native Light VNext | `202:1235` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=202-1235) | COMPONENT | 540×784 | 03 Identity Authority |
| Dossier / Native Light VNext | `206:1899` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=206-1899) | COMPONENT_SET | 4520×1333 | 03 Identity Authority |
| — Focus=Product | `198:1292` | | COMPONENT | | |
| — Focus=Facts | `206:1571` | | COMPONENT | | |
| — Focus=Composition | `206:1735` | | COMPONENT | | |
| LIVE / TrustEvidenceSpine | `475:9098` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=475-9098) | COMPONENT | 1440×851 | 03 Identity Authority |
| Homepage Hero Container | `462:6144` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=462-6144) | FRAME | 1384×780 | HOMEPAGE HERO |
| — Left Container (Decision Surface) | `462:6145` | | FRAME | 581×780 | HOMEPAGE HERO |
| — Right Container (Media Chamber) | `462:6203` | | FRAME | 803×780 | HOMEPAGE HERO |
| EvidenceStatus | `518:13092` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=518-13092) | COMPONENT | 134×13 | 03 Identity Authority |

### Reference Pattern Components (NEW for Run 3)

| Component | Node ID | Figma Link | Type | Dimensions | Page | Purpose |
|---|---|---|---|---|---|---|
| Hero 2-Fold Card Template | `470:6393` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-6393) | FRAME | 440×685 | 03 Identity Authority | LOCKED hero structure |
| Product Selector Container | `58:486` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=58-486) | FRAME | 336×460 | 03 Identity Authority | Product toggle pattern |
| LabReports / Canvas Split | `222:1332` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=222-1332) | INSTANCE | 1344×630 | 03 Identity Authority | Evidence canvas-split template |
| CanvasSplit:margin | `470:9078` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-9078) | FRAME | 1075×470 | 03 Identity Authority | Wide canvas-split variant |

### Control Test (Created During Phase 1)

| Composition | Node ID | Figma Link | Dimensions |
|---|---|---|---|
| PDP Section 1 — PurchasePanel Control Test | `480:4503` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=480-4503) | 1440×879 |

## Hero Structure (LOCKED for Run 3)

The hero left panel uses the 2-fold vertical card from `470:6393`. Structure:

1. **Single continuous card surface** (r=24 or r=28, white fill, Softform Arc shadow, ~440px wide)
2. **Hero copy zone** — Eyebrow ("FORMULATED. VERIFIED. BATCH TRACKED.") + Headline ("Formulated to a higher standard.") + Body + Dual CTAs (Shop the Range filled + View Lab Records outlined)
3. **Cobalt blue embedded divider** — #256DFF, 2px, inside the card
4. **Featured product zone** — FEATURED PRODUCT eyebrow + MK-2866 — Ostarine + MetricRail chips (15mg/90 servings/>99%) + Price (£43) + Add to Bag CTA
5. **Product toggle chips BELOW the card** — MK-2866 (active/filled) | MENT | ENDURASHRED | RAD-140 | MK-677
6. **Media chamber on the right** — atmospheric product bottle, full height, strong visual weight

No more hero experimentation. All three directions use this structure.

## Section-Level Differentiation Contract (NEW for Run 3)

| Composition | Dir A Must Show | Dir B Must Show | Dir C Must Show |
|---|---|---|---|
| Hero | LOCKED (same) | LOCKED (same) | LOCKED (same) |
| Grid | Equal-density 4-across | Mixed-density Featured+Compact | Alternative geometry |
| PDP S1 | 60/40 split | 55/45 split | 50/50 split |
| Dossier | Three-column | Two-panel split | Full-width stacked |
| Evidence | Canvas-split (archive+table) | Full-width dashboard | Stacked planar |
| Rail | Single full-width card | Two stacked cards | Mixed rail |

If any composition looks identical across two or more directions, the run has FAILED.

## Softform Arc Material Language (Locked from MF-01A)

| Property | Value | Source |
|---|---|---|
| PurchasePanel radius | r=28 | MF-01A |
| Vertical/Featured radius | r=24 | MF-01A |
| Compact radius | r=20 | MF-01A |
| Horizontal radius | r=34 | MF-01A |
| PurchasePanel shadow | blur=50, y=20, rgba(22,62,132,0.18) | MF-01A |
| Vertical/Featured shadow | blur=60, y=24, rgba(34,70,126,0.1) | MF-01A |
| Horizontal shadow | blur=25, y=12, rgba(24,61,120,0.12) | MF-01A |
| Compact shadow | blur=12, y=5, rgba(24,61,120,0.09) | MF-01A |
| Card stroke | 1px rgba(206,220,241,0.92) | MF-01A |
| Display type | Plus Jakarta Sans ExtraBold | MF-01A |
| Body type | Inter (Medium/Bold/Extra Bold) | MF-01A |
| Core cobalt | #0057FF | Identity |
| Interactive cobalt | #256DFF | Identity |
| Canvas color | #f7f8fc | Surface contract |
| Divider color | rgb(206,220,241) | Surface contract |
| Near-black | rgb(20,24,39) | Surface contract |

## MF-01B Transfer Verdicts

| Transfer Test | Direction | Verdict | Carry Forward? |
|---|---|---|---|
| Hero entry | A (card-inside-hero) | PASS | Yes |
| PDP flat atmosphere | Independent test | PASS | Yes |
| Grid/Rail | A baseline + B/C borrow | PARTIAL | Yes |
| Embedded Evidence | C (with A elements) | PASS | Yes |
| Canvas Split | All | PASS | Yes |

## Phase 1 Corrections (Complete)

| # | Task | Status | Details |
|---|---|---|---|
| 1.1 | Componentize 4 card densities | ✅ | Vertical, Featured, Horizontal as COMPONENT; Compact as COMPONENT_SET |
| 1.2 | Wire compact card states | ✅ | 5 variants: Default/Hover/Focus/Selected/Added via State property |
| 1.3 | RAD-140 8mg verification | ✅ | Already correct |
| 1.4 | Typography consistency | ✅ | Fixed horizontal OPENLAB VERIFIED weight 750→800 |
| 1.5 | Push convo.md | ✅ | Commit 8460180 |
| 1.6 | Horizontal card media height | ✅ | Fixed GRID panel height |

## Run 2 Pre-Make Corrections (Complete)

| # | Task | Status | Details |
|---|---|---|---|
| 2.1 | Hero decision surface wrapper | ✅ | Created wrapper in Left Container (462:6145) |
| 2.2 | TrustEvidenceSpine colors | ✅ | Updated 19 instances to contract colors |
| 2.3 | Replace PNG with native hero | ✅ | Hero Container (462:6144) replaces PNG |
| 2.4 | Add 2-fold vertical card variant | ✅ | Added to PROMPT.md as Variant B |

## Run 3 Pre-Make Corrections (Complete)

| # | Task | Status | Details |
|---|---|---|---|
| 3.1 | Lock hero from `470:6393` | ✅ | Hero structure locked — no more experimentation |
| 3.2 | Add 4 reference pattern inputs | ✅ | `470:6393`, `58:486`, `222:1332`, `470:9078` added |
| 3.3 | Add Section Differentiation Contract | ✅ | Per-composition differentiation requirements for all 3 dirs |
| 3.4 | Fix Evidence section spec | ✅ | Must show Six-point record + HPLC chart + Batch Records |
| 3.5 | Fix horizontal card adaptive | ✅ | Must be full-width, not truncated |
| 3.6 | Add explicit reject rules | ✅ | Identical compositions, generic badges, truncated cards |

## Security / Constraint Directives

- Make-generated code is disposable prototype machinery — not a runtime handoff
- Do not run Porcelain, Atmospheric, or Frost as Make themes
- Make uses the accepted native light treatment only
- Do not ask Make to explore new typography or spacing systems
- Do not make Make responsible for callbacks, APIs, cart behavior, payment, telemetry
- Native Light treatment is directionally correct but Make must prevent "Figma Design" looking boards
- Zero grey: no generic achromatic/Tailwind grey leakage
- Dark mode and broad inverse sections remain out of scope
