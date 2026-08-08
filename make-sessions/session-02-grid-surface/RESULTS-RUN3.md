# MF-02A Run 3 — Results & Cherry-Pick Consolidation

## Run Configuration

- **File:** `BEPMuUt1HroEw8xjz8CVyN`
- **Page:** `512:4651` (Make output page)
- **Input count:** 13 native frames (9 structural + 4 reference), zero PNGs
- **Hero:** Locked from `470:6393` (2-fold vertical card)
- **Baseline philosophy:** Direction C planar language (staggered planes, elevation graduation, canvas-split rhythm)

## Direction Node IDs

| Direction | Node ID | Figma Link | Dimensions |
|---|---|---|---|
| A | `545:23339` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-23339) | 1512×5399 |
| B | `545:20048` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-20048) | 1512×5724 |
| C | `545:21638` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-21638) | 1512×6179 |

## Section Differentiation Check

Did Run 3 achieve section-level differentiation? **YES** — major improvement over Run 2.

| Composition | Dir A | Dir B | Dir C | Different? |
|---|---|---|---|---|
| Hero | Locked 2-fold card | Locked 2-fold card | Locked 2-fold card | LOCKED (intentional) |
| Grid | Equal-density 4-across | Mixed-density Featured+Compact | Alternative 2x2+sidebar | ✅ |
| PDP S1 | 60/40 full-field | 55/45 | 50/50 | ✅ |
| Dossier | Three-column (wider cards) | Two-panel (compact header) | Full-width stacked | ✅ |
| Evidence | Canvas-split (archive+table) | Full-width dashboard | Stacked planar | ✅ |
| Rail | Single full-width card | Two stacked cards | Mixed rail | ✅ |

## Per-Section Verdicts

### Section 1: Homepage Hero (LOCKED)

**Verdict:** Structure works — the 2-fold vertical card is present across all three directions. Two corrections needed before champion:

1. **DecisionSurface card contract colors** — The hero card currently uses black default text. It must inherit the same color contract as the MF-01A card family: near-black `rgb(20,24,39)` for heading/value text, cobalt `#0057FF` / `#256DFF` for eyebrows and metric values, Inter/Plus Jakarta Sans typography per the locked contract.

2. **Cobalt blue line position** — There is a cobalt blue accent line on the RIGHT SIDE of the card. This should be either:
   - **Removed entirely** from the right side, OR
   - **Relocated to the embedded divider** between the hero copy zone (upper) and the featured product zone (lower) — which is where the cobalt divider was originally specified in the `470:6393` template.

**Winner:** All three (locked structure) — with corrections above.

### Section 2: Product Grid / Rail

**Winner: Direction A** — equal-density layout.

**Correction:** Upgrade from compact/quickrail cards to **3 ProductGrid Vertical cards** across (`486:4634`, 481×916, r=24). Three Vertical cards at 481px each = 1443px, tight fit at 1440px desktop with minimal inter-card spacing. The compact cards (`486:4642`, 302×382) are for QuickAdd/rail contexts, not the primary product grid.

**Resolved:** 3 cards across (not 4). 481px × 3 = 1443px at desktop width.

- Source component: `486:4634` — [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634)

### Section 3: PDP Section 1 — Full Field + PurchasePanel

**Winner: Direction A** — full-field atmospheric media preset.

- 60/40 split ratio: left media chamber fully filled, right PurchasePanel elevated
- PDP first-fold exception correctly applied: flat atmospheric background, only PurchasePanel raised
- No canvas leaking in left container
- Source component: `480:4503` — [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=480-4503)

### Section 4: Product Dossier

**Winner: Hybrid A + B**

Cherry-pick:
- **B's compact header treatment** — the headline "Product facts, label truth and batch evidence" is tighter and more connected to the dossier content below
- **A's wider card approach** — the data cards are wider and more readable than C's narrow stacked layout

**Corrections needed:**
1. **Central media chamber must be more compact** — delete the logo and SKU from the media chamber, move the render higher, reduce vertical height
2. **Bring content into the card horizontally aligned** — Product Facts and Product Composition sections should sit inside the card surface, horizontally aligned with the media chamber, not in separate flanking columns
3. **Reduce card width** — less wide overall, tighter content density
4. **Improve copy readability** — the specification text is still too small or too dense to read comfortably. Ensure minimum 15-16px body per typography contract

**Resolved:** Dossier tabs (Product/Facts/Composition) are **reference-only** for Make — show Product tab as active, do not implement switching.

- Source component: `198:1292` — [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=198-1292)

### Section 5: Evidence / TrustEvidenceSpine

**Winner: Direction B** — clear winner.

- Full-width evidence dashboard layout
- Shows the Six-point record + HPLC chart + Batch Records integration
- OPENLAB ARCHIVE card with aggregate metrics visible
- Cobalt authority dots survive in evidence context
- Source component: `475:9098` — [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=475-9098)
- Reference pattern: `222:1332` — [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=222-1332)

### Section 6: Related/Upsell Rail with Canvas Split

**Winner: Direction A** — single horizontal card approach.

**Correction:** The combo media chamber + horizontal purchase panel must stretch **full-width adaptively**. Currently at fixed width with truncated right side. The horizontal card (`486:4636`, 1060×542 native) must expand — both the media chamber and the purchase plane scale to fill the 1440px content width.

**Resolved:** One adaptive horizontal card (RAD-140). No second product card.

- Current state: `545:24677` — [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-24677) — Container at 1512×622, needs adaptive stretch
- Source component: `486:4636` — [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4636)

## Champion Composite (LOCKED for MF-02B)

| Composition | Source Dir | Key Pattern | Corrections | Resolved |
|---|---|---|---|---|
| Hero | LOCKED | 2-fold vertical card from `470:6393` | Card contract colors, cobalt line to divider | — |
| Grid | A | Equal-density 3-across | Upgrade to ProductGrid Vertical cards (`486:4634`) | **3 cards** (481px × 3) |
| PDP S1 | A | Full-field media 60/40 | None — passes as-is | — |
| Dossier | A+B hybrid | B's compact header + A's wider cards | Compact media, horizontal content, better readability | **Tabs reference-only** |
| Evidence | B | Full-width dashboard | None — clear winner | — |
| Rail | A | Single full-width card | Adaptive full-width stretch | **1 card** (RAD-140) |

## What Carries to MF-02B

### Proven Patterns (Lock)
- Hero 2-fold vertical card structure (from `470:6393`)
- Dir C planar language as composition philosophy
- Equal-density grid with 3 Vertical cards across
- Full-field PDP S1 with 60/40 split
- Full-width evidence dashboard (Dir B)
- Single adaptive horizontal card for upsell rail
- Dossier tabs are reference-only (Product tab active)

### Corrections Needed Before MF-02B
1. Hero DecisionSurface → MF-01A card contract colors (near-black `rgb(20,24,39)`, cobalt accents)
2. Hero cobalt line → removed from right side OR relocated to embedded divider
3. Grid cards → 3× ProductGrid Vertical (`486:4634`, 481×916) not Compact (`486:4642`, 302×382)
4. Dossier media chamber → more compact (delete logo/SKU, raise render), horizontal content alignment, better copy readability
5. Horizontal card → adaptive full-width (media chamber + purchase plane expand to fill)

## Run History

| Run | Hero Approach | Section Differentiation | Key Outcome |
|---|---|---|---|
| Run 1 | Background-image failure (PNG) | Partial — Dir C planes won | Dir C planar language selected |
| Run 2 | 3 hero variants tested, none correct | FAILED — identical below hero | Section differentiation contract added |
| Run 3 | Locked from `470:6393` | PASSED — all sections differentiated | Cherry-pick consolidation complete |
