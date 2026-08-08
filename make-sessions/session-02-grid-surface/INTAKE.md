# MF-02A — Intake: Native Component Registry & Transfer Verdicts

## Status

- **MF-01A:** COMPLETE — 5 card densities produced in Softform Arc direction
- **MF-01B:** COMPLETE — Transfer tested across 5 macro compositions, cherry-pick consolidated
- **Phase 1 Corrections:** COMPLETE — All cards componentized, typography consistent, compact states wired, horizontal card media height fixed
- **MF-02A:** READY TO RUN

## Input Strategy: Hybrid Native Frames + Creative-Direction PNG

MF-02A uses a **hybrid input strategy** — 8 native Figma frames copied directly into the Make file + 1 creative-direction PNG. This replaces the original 9-PNG manifest.

**Why hybrid?** Native frames carry full layer structure, typography values, spacing tokens, fills, strokes, shadows, and component relationships. Make can inspect and decompose these directly rather than interpreting rasterized pixels. This accelerates convergence and reduces material relationship drift. The homepage hero remains a PNG because its value is creative-direction atmosphere — Make should interpret the editorial intent, not decompose the layer tree.

### Native Frame Inputs (8)

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

### Creative-Direction PNG Input (1)

| # | Component | Node ID | Export Name | Source Page |
|---|---|---|---|---|
| 9 | homepageherocurrent | `462:6141` | `homepage-hero-current.png` | HOMEPAGE HERO |

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
| homepageherocurrent | `462:6141` | COMPONENT | 1440×780 | HOMEPAGE HERO | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=462-6141) |

### Control Test (Created During Phase 1)

| Composition | Node ID | Dimensions | Figma Link |
|---|---|---|---|
| PDP Section 1 — PurchasePanel Control Test | `480:4503` | 1440×879 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=480-4503) |

## Softform Arc Material Language (Locked from MF-01A)

| Property | Value | Source |
|---|---|---|
| PurchasePanel radius | r=28 | MF-01A |
| Vertical/Featured radius | r=24 | MF-01A |
| Compact radius | r=20 | MF-01A |
| Horizontal radius | r=34 | MF-01A |
| PurchasePanel shadow | r=50, y=20, rgba(22,62,132,0.18) | MF-01A |
| Compact shadow | r=12, y=5, rgba(24,61,120,0.09) | MF-01A |
| Card stroke | 1px rgba(206,220,241,0.92) | MF-01A |
| Display type | Plus Jakarta Sans ExtraBold | MF-01A |
| Body type | Inter (Medium/Bold/Extra Bold) | MF-01A |
| Core cobalt | #0057FF | Identity |
| Interactive cobalt | #256DFF | Identity |

## MF-01B Transfer Verdicts

| Transfer Test | Direction | Verdict | Carry Forward? |
|---|---|---|---|
| Hero entry | A (card-inside-hero) | PASS | Yes |
| PDP flat atmosphere | Independent test | PASS | Yes |
| Grid/Rail | A baseline + B/C borrow | PARTIAL | Yes |
| Embedded Evidence | C (with A elements) | PASS | Yes |
| Canvas Split | All | PASS | Yes |

### Cherry-Pick Consolidation (Human-Approved)

- **A as baseline** — strongest overall coherence, hero works, grid is clean
- **B's PDP container approach** — no canvas bg leaking in left container
- **C's evidence section** — more dynamic six-point record with HPLC chart
- **C's unique card shape** — staggered planes philosophy adds depth
- **Section spacing** — ALL 3 had too much inter-section gap, tighten in MF-02

### MF-01B Flagged Defects

1. Too much section spacing — canvas-as-margin reads as dead air
2. No complete PDP — no direction produced full-field media chamber + render slot + PurchasePanel
3. Cards didn't carry MF-01A polish — Softform Arc elevation was diluted
4. PDP left container let page canvas leak (except Dir B)
5. Dossier deadspacing — passive corridor between headline and content (from surface-contract.md negative evidence)

## Phase 1 Corrections (Complete)

| # | Task | Status | Details |
|---|---|---|---|
| 1.1 | Componentize 4 card densities | ✅ | Vertical, Featured, Horizontal as COMPONENT; Compact as COMPONENT_SET |
| 1.2 | Wire compact card states | ✅ | 5 variants: Default/Hover/Focus/Selected/Added via State property |
| 1.3 | RAD-140 8mg verification | ✅ | Already correct |
| 1.4 | Typography consistency | ✅ | Fixed horizontal OPENLAB VERIFIED weight 750→800 |
| 1.5 | Push convo.md | ✅ | Commit 8460180 |
| 1.6 | Horizontal card media height | ✅ | Fixed GRID panel height — left panel and media now fill full card height |

## Security / Constraint Directives

- Make-generated code is disposable prototype machinery — not a runtime handoff
- Do not run Porcelain, Atmospheric, or Frost as Make themes
- Make uses the accepted native light treatment only
- Do not ask Make to explore new typography or spacing systems
- Do not make Make responsible for callbacks, APIs, cart behavior, payment, telemetry
- Native Light treatment is directionally correct but Make must prevent "Figma Design" looking boards
- Zero grey: no generic achromatic/Tailwind grey leakage
- Dark mode and broad inverse sections remain out of scope
