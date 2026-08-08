# MF-02A — Intake: Native Component Registry & Transfer Verdicts

## Status

- **MF-01A:** COMPLETE — 5 card densities produced in Softform Arc direction
- **MF-01B:** COMPLETE — Transfer tested across 5 macro compositions, cherry-pick consolidated
- **Phase 1 Corrections:** COMPLETE — All cards componentized, typography consistent, compact states wired, horizontal card media height fixed
- **MF-02A Run 1:** COMPLETE — Direction C planar language selected as champion baseline
- **MF-02A Run 2:** READY TO RUN

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
**Universal failure:** Hero treated as background-image-with-overlay (caused by PNG input — fixed for Run 2).

## Input Strategy: 9 Native Frames (Run 2)

MF-02A Run 2 uses an **all-native input strategy** — 9 native Figma frames copied directly into the Make file, zero PNGs. This replaces the Run 1 hybrid strategy (8 native + 1 PNG).

**Why all-native?** The homepage hero PNG caused ALL THREE Run 1 directions to treat the hero as a flat wallpaper overlay instead of decomposing its two-fold structure. Providing the hero as a native frame with visible layer hierarchy (Left Container + Right Container) forces Make to read the structural split.

### Native Frame Inputs (9)

| # | Component | Node ID | Type | Dimensions | Source Page |
|---|---|---|---|---|---|
| 1 | ProductCommerceCard / Vertical | `486:4634` | COMPONENT | 481×916 | MF-01 and MF-02 |
| 2 | ProductCommerceCard / Featured | `486:4635` | COMPONENT | 481×896 | MF-01 and MF-02 |
| 3 | ProductCommerceCard / Horizontal | `486:4636` | COMPONENT | 1060×542 | MF-01 and MF-02 |
| 4 | ProductCommerceCard / Compact | `486:4642` | COMPONENT_SET | 302×382 per variant | MF-01 and MF-02 |
| 5 | PurchasePanel | `478:10367` | COMPONENT | 420×687 | 03 Identity Authority |
| 6 | PDP Section 1 — Control Test | `480:4503` | INSTANCE | 1440×879 | MF-01 and MF-02 |
| 7 | LIVE / TrustEvidenceSpine | `475:9098` | COMPONENT | 1440×851 | 03 Identity Authority |
| 8 | Dossier / Native Light VNext (Focus=Product) | `198:1292` | COMPONENT | (see set) | 03 Identity Authority |
| 9 | Homepage Hero Container | `462:6144` | FRAME | 1384×780 | HOMEPAGE HERO |

## Native Component Registry

All components verified live in Figma file `BEPMuUt1HroEw8xjz8CVyN`.

### MF-01A Card Family (Componentized)

| Component | Node ID | Type | Dimensions | Page | Figma Link |
|---|---|---|---|---|---|
| ProductCommerceCard / Vertical | `486:4634` | COMPONENT | 481×916 | MF-01 and MF-02 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634) |
| ProductCommerceCard / Featured | `486:4635` | COMPONENT | 481×896 | MF-01 and MF-02 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4635) |
| ProductCommerceCard / Horizontal | `486:4636` | COMPONENT | 1060×542 | MF-01 and MF-02 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4636) |
| ProductCommerceCard / Compact | `486:4642` | COMPONENT_SET | 302×382 per variant | MF-01 and MF-02 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4642) |
| — State=Default | `486:4637` | COMPONENT | 302×382 | | |
| — State=Hover | `486:4638` | COMPONENT | 302×382 | | |
| — State=Focus | `486:4639` | COMPONENT | 302×382 | | |
| — State=Selected | `486:4640` | COMPONENT | 302×384 | | |
| — State=Added | `486:4641` | COMPONENT | 302×384 | | |
| PurchasePanel | `478:10367` | COMPONENT | 420×687 | 03 Identity Authority | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=478-10367) |

### Native PDP & Page Composition Components

| Component | Node ID | Type | Dimensions | Page | Figma Link |
|---|---|---|---|---|---|
| Section 1: Full-Field Hero Rail | `475:9096` | COMPONENT | 1440×879 | 03 Identity Authority | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=475-9096) |
| Layout=Full Field (Media Chamber) | `202:1165` | COMPONENT | 760×800 | 03 Identity Authority | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=202-1165) |
| PurchaseRail / Native Light VNext | `202:1235` | COMPONENT | 540×784 | 03 Identity Authority | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=202-1235) |
| VA-06 — Sidebar Purchase Options | `475:9097` | COMPONENT | 1600×1280 | 03 Identity Authority | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=475-9097) |
| Dossier / Native Light VNext | `206:1899` | COMPONENT_SET | 4520×1333 | 03 Identity Authority | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=206-1899) |
| — Focus=Product | `198:1292` | COMPONENT | | | |
| — Focus=Facts | `206:1571` | COMPONENT | | | |
| — Focus=Composition | `206:1735` | COMPONENT | | | |
| LIVE / TrustEvidenceSpine | `475:9098` | COMPONENT | 1440×851 | 03 Identity Authority | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=475-9098) |
| Homepage Hero Container | `462:6144` | FRAME | 1384×780 | HOMEPAGE HERO | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=462-6144) |
| — Left Container (Decision Surface) | `462:6145` | FRAME | 581×780 | HOMEPAGE HERO | |
| — Right Container (Media Chamber) | `462:6203` | FRAME | 803×780 | HOMEPAGE HERO | |
| EvidenceStatus | `518:13092` | COMPONENT | 134×13 | 03 Identity Authority | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=518-13092) |

### Control Test (Created During Phase 1)

| Composition | Node ID | Dimensions | Figma Link |
|---|---|---|---|
| PDP Section 1 — PurchasePanel Control Test | `480:4503` | 1440×879 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=480-4503) |

## Hero Variant Specification (NEW for Run 2)

### Variant A — Sectioned Decision Surface
The left panel contains distinct zones (editorial copy + product card + tabs) that share the panel space but are visually distinguished. Make determines the spatial relationship.

### Variant B — 2-Fold Vertical Card with Embedded Dividers
The left panel is ONE continuous vertical card surface. Three semantic zones separated by embedded dividers (not canvas gaps):

1. **Hero copy zone** — Eyebrow ("FORMULATED. VERIFIED. BATCH TRACKED.") + Headline ("Formulated to a higher standard.") + Body + Dual CTAs (Shop the Range filled + View Lab Records outlined)
2. **Embedded divider** — 1-2px, cobalt (#256DFF) OR blue-shifted neutral (rgb(206,220,241))
3. **Purchase panel zone** — Featured Product eyebrow + MK-2866 name + MetricRail chips (15mg/90 servings/>99%) + Price (£43) + CTAs (View Product outlined + Add to Bag filled)
4. **Embedded divider** — same treatment as above
5. **Product tab controls** — Pill-shaped chip row: MK-2866 (active/filled) | MENT | ENDURASHRED | RAD-140 | MK-677

Key structural rules:
- Card radius: r=24 or r=28 (Softform Arc family)
- Card fill: white (#FFFFFF)
- Card shadow: blue-shifted, consistent with elevation system
- Internal padding: 24-32px
- Item spacing between zones: 0 (dividers provide separation)
- Cobalt top-edge (optional): 2px authority accent at card top
- Purchase content is INLINE (part of the card surface) — not a nested card-within-card

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

### Cherry-Pick Consolidation (Human-Approved)

- **C as champion baseline** — strongest planar language, staggered planes, elevation graduation
- **B's PDP container approach** — no canvas bg leaking in left container
- **C's evidence section** — more dynamic six-point record with HPLC chart
- **C's staggered planes** — depth and visual interest without clutter
- **Section spacing** — STILL too much in Run 1, tighten further in Run 2

### Run 1 Flagged Defects (Fixed for Run 2)

1. Hero background-image failure — ALL 3 directions (caused by PNG input → fixed with native frame)
2. Right-side deadspace in Dir C grid + Dossier — must fill available width
3. Section spacing still too generous — tighten further
4. TrustEvidence pre-contract colors — fixed at source (19 color instances updated)
5. Hero left panel not decomposed — now provided as native two-fold structure with explicit variant spec

## Phase 1 Corrections (Complete)

| # | Task | Status | Details |
|---|---|---|---|
| 1.1 | Componentize 4 card densities | ✅ | Vertical, Featured, Horizontal as COMPONENT; Compact as COMPONENT_SET |
| 1.2 | Wire compact card states | ✅ | 5 variants: Default/Hover/Focus/Selected/Added via State property |
| 1.3 | RAD-140 8mg verification | ✅ | Already correct |
| 1.4 | Typography consistency | ✅ | Fixed horizontal OPENLAB VERIFIED weight 750→800 |
| 1.5 | Push convo.md | ✅ | Commit 8460180 |
| 1.6 | Horizontal card media height | ✅ | Fixed GRID panel height — left panel and media now fill full card height |

## Run 2 Pre-Make Corrections (Complete)

| # | Task | Status | Details |
|---|---|---|---|
| 2.1 | Hero decision surface wrapper | ✅ | Created wrapper in Left Container (462:6145) around Article + Tab List |
| 2.2 | TrustEvidenceSpine colors | ✅ | Updated 19 instances: 5 dividers, 1 text, 13 strokes to contract colors |
| 2.3 | Replace PNG with native hero | ✅ | Hero Container (462:6144) replaces homepage-hero-current.png |
| 2.4 | Add 2-fold vertical card variant | ✅ | Added to PROMPT.md as Variant B with full structural spec |

## Security / Constraint Directives

- Make-generated code is disposable prototype machinery — not a runtime handoff
- Do not run Porcelain, Atmospheric, or Frost as Make themes
- Make uses the accepted native light treatment only
- Do not ask Make to explore new typography or spacing systems
- Do not make Make responsible for callbacks, APIs, cart behavior, payment, telemetry
- Native Light treatment is directionally correct but Make must prevent "Figma Design" looking boards
- Zero grey: no generic achromatic/Tailwind grey leakage
- Dark mode and broad inverse sections remain out of scope
