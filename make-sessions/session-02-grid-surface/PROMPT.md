# MF-02A — Grid Surface & Card Elevation Frontier (Run 3)

## Context

MF-01A produced 5 card densities in the Softform Arc direction. MF-01B tested whether those relationships survive in real page contexts. Human review cherry-picked: Direction A as baseline, B's PDP container approach, C's evidence section dynamics, and C's staggered planes card shape.

**Run 1** produced three directions. Human verdict: Direction C's planar language (staggered planes, elevation graduation, canvas-split rhythm) is the champion baseline. Run 1 universal failure: all three treated the homepage hero as a background-image overlay because the hero was provided as a PNG.

**Run 2** replaced the PNG with a native hero frame and tested three hero variants (A: two-column editorial + card, B: full-width unified surface, C: editorial-forward). Human verdict:

- **Hero A** — product card and editorial copy are separate floating objects, not combined into one card surface. Product toggles detached from the card.
- **Hero B** — too wide, too little emphasis on media chamber, overly saturated headline copy.
- **Hero C** — did not attempt the 2-fold vertical card directive.
- **CRITICAL: Below the hero, all three directions produced IDENTICAL compositions.** Grid, PDP S1, Dossier, Evidence, and Rail sections were copy-pasted across all three directions with no meaningful differentiation. The prompt asked for "three materially different grid and surface compositions" — it got three hero swaps + one shared page body.
- **TrustEvidenceSpine was flattened** — no Six-point record vertical checklist, no HPLC Purity Trace chart, no Batch Records data table. All three directions used the same generic "badges row" treatment.
- **Horizontal card truncated** — the Related/Upsell rail showed the horizontal card at a fixed width with an empty right side, not adaptive full-width.
- **Dossier deadspacing persists** — gap between headline and content still too generous.

Run 3 corrections:
- **Hero is NOW LOCKED** — use the proven Container frame (`470:6393`) as the structural template. No more hero experimentation.
- **Section-level differentiation is MANDATORY** — each direction must show materially different Grid, Dossier, Evidence, and Rail compositions. If the three directions look the same below the hero, the run has failed.
- **TrustEvidenceSpine must decompose the native input** — Six-point record checklist + HPLC chart + Batch Records table. Use the LabReports canvas-split pattern (`222:1332`) as structural reference.
- **Horizontal card must be adaptive full-width** — not a fixed-width card with empty right side.
- **Dir C planar philosophy must be visible THROUGHOUT** — in grid, dossier, evidence, and rail, not just the hero.

## Sealed MF-02A Input Manifest — 13 Native Frames

The sealed input manifest consists of **13 native Figma frames** copied directly into the Make file — 9 structural authority inputs + 4 reference pattern inputs. Native frames carry full layer structure, typography, spacing, fills, strokes, shadows, and component relationships.

Do not add additional native Figma nodes, `/all-pages`, system boards, dark/MENT references, or any file outside this manifest.

### Structural Authority Inputs (9)

1. **ProductCommerceCard / Vertical** — Vertical ProductGrid card (481×916, r=24). Bounded chamber + raised white purchase plane + MetricRail + QualitativeChips + quantity stepper + dual CTAs.
   - Source: `486:4634`
   - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634)

2. **ProductCommerceCard / Featured** — Featured/Derived vertical card (481×896, r=24). Same family as Vertical with SKU badge addition and side-by-side CTA layout.
   - Source: `486:4635`
   - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4635)

3. **ProductCommerceCard / Horizontal** — Horizontal Related/Upsell card (1060×542, r=34). Left media chamber + right purchase plane connected by sculpted seam. "Stacks well with MK-2866" relationship language. RAD-140/Testolone product.
   - Source: `486:4636`
   - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4636)

4. **ProductCommerceCard / Compact** — Compact QuickAdd card (302×382, r=20) in 5 interactive states: Default, Hover, Focus, Selected (cobalt 2px border), Added ("Added ✓" confirmation).
   - Source: `486:4642`
   - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4642)

5. **PurchasePanel** — PurchasePanel (420×687, r=28). The strongest single MF-01A card — white fill, blue-shifted shadow (blur=50, y=20), bordered stroke, OPENLAB VERIFIED badge, size selector, bordered MetricRail + QualitativeChips.
   - Source: `478:10367`
   - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=478-10367)

6. **PDP Section 1 — PurchasePanel Control Test** — PDP Section 1 composition (1440×879). Full-field atmospheric media chamber with render slot on left + PurchasePanel elevated on right. Proven transfer test — no canvas bleed, purchase plane reads as independently raised.
   - Source: `480:4503`
   - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=480-4503)

7. **LIVE / TrustEvidenceSpine** — TrustEvidenceSpine (1440×851). Six-point evidence ledger: Identity Tested, Purity Measured, Concentration Confirmed, JANOSHIK Verified, Tamper-Proof Sealed, Batch Tracked. Full-width section with editorial headline left + product bottle center + 6-point grid below.
   - Source: `475:9098`
   - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=475-9098)

8. **Dossier / Native Light VNext (Focus=Product)** — Product Dossier. The primary product information dossier showing detailed product specifications, composition data, and facts. Three variants exist (Product/Facts/Composition) — this shows the Product focus variant as the primary reference.
   - Source: `198:1292`
   - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=198-1292)

9. **Homepage Hero Container** — The homepage hero two-fold structure (1384×780). Left Container (decision surface: editorial copy + product card + tab controls) and Right Container (atmospheric media chamber with product bottle). This is the STRUCTURAL AUTHORITY for the hero — Make must decompose and compose from this native frame.
   - Source: `462:6144`
   - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=462-6144)

### Reference Pattern Inputs (4)

These frames demonstrate PROVEN PATTERNS that Make must study and apply. They are not compositions to reproduce — they are structural templates showing how OLUK handles vertical card flow, canvas splits, product toggling, and evidence layouts.

10. **Hero 2-Fold Vertical Card Template** — Container (440×685). THE definitive hero left-panel structure: eyebrow ("FORMULATED. VERIFIED. BATCH TRACKED.") → headline ("Formulated to a higher standard.") → body → dual CTAs (Shop the Range filled + View Lab Records outlined) → **cobalt blue embedded divider** → FEATURED PRODUCT section (MK-2866 — Ostarine, MetricRail chips, price £43, View Product + Add to Bag CTAs) → product toggle chips below card (MK-2866 active | MENT | ENDURASHRED | RAD-140 | MK-677). **This is the LOCKED hero left-panel structure for Run 3.**
    - Source: `470:6393`
    - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-6393)

11. **Product Selector Container** — Container (336×460). Demonstrates the product toggle pattern: editorial headline + product chip tabs (MK-2866 active, LGD-4033, RAD-140) in a compact vertical card. Shows how toggle controls can sit inside or below a card surface.
    - Source: `58:486`
    - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=58-486)

12. **LabReports / Canvas Split / Native Light** — Canvas-split evidence section (1344×630). OPENLAB ARCHIVE card on left (editorial headline + search + metrics: 15 Reports / 99.55% Avg Purity / 0 Failures + View testing methodology link) + Batch Records data table on right (Batch ID, Compound, Purity, Date, Lab, Record columns with linked View actions). **This is the structural template for how the Evidence section should be composed** — not as a flat badges row, but as a canvas-split with searchable archive card + tabular batch data.
    - Source: `222:1332`
    - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=222-1332)

13. **CanvasSplit:margin** — Full-width canvas-split variant (1075×470). Same OPENLAB ARCHIVE + Batch Records pattern at wider viewport. Shows how the canvas-split layout scales.
    - Source: `470:9078`
    - [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-9078)

These inputs are creative-direction evidence AND structural authority. Native frames give Make direct access to material relationships, card family language, and composition structure. Make must preserve these while improving grid density, surface transitions, section spacing, and card elevation patterns.

## What MF-02A Must Produce

Three materially different grid and surface compositions at desktop width (1440px). Each direction must demonstrate ALL SIX of these compositions. **"Materially different" means EVERY composition must vary across the three directions — not just the hero.** If Grid, Dossier, Evidence, or Rail look the same across two or more directions, the run has failed.

Direction C's planar language (staggered planes, elevation graduation, canvas-split rhythm) from Run 1 is the champion baseline — all three directions should explore different executions WITHIN this philosophy, applied to ALL six compositions.

### Composition 1: Homepage Hero Entry (LOCKED STRUCTURE)

The hero is a **two-fold horizontal split**: left=decision surface card, right=atmospheric media chamber.

**LEFT PANEL — 2-fold vertical card (LOCKED from `470:6393`):**

The left panel is ONE continuous vertical card surface. The card contains two semantic zones separated by an embedded cobalt blue divider:

```
┌─────────────────────────────────────────┐
│  CARD SURFACE (continuous white, r=24   │
│  or r=28, Softform Arc shadow)          │
│                                         │
│  FORMULATED. VERIFIED. BATCH TRACKED.   │
│  (cobalt eyebrow, spaced caps)          │
│                                         │
│  Formulated to a                        │
│  higher standard.                       │
│  (Plus Jakarta Sans ExtraBold display)  │
│                                         │
│  Third-party tested. Strength,          │
│  servings, and fulfilment confirmed     │
│  before checkout.                       │
│  (Inter body)                           │
│                                         │
│  ┌──────────────┐ ┌──────────────┐      │
│  │ Shop the     │ │ View Lab     │      │
│  │ Range ■■■■■■ │ │ Records ○○○○ │      │
│  └──────────────┘ └──────────────┘      │
│  (filled cobalt)   (outlined cobalt)    │
│                                         │
├═══ COBALT BLUE DIVIDER (#256DFF 2px) ═══┤
│                                         │
│  FEATURED PRODUCT                       │
│  (cobalt eyebrow, spaced caps)          │
│                                         │
│  MK-2866 — Ostarine                     │
│  (Plus Jakarta Sans ExtraBold)          │
│                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ 15 MG  │ │ 90     │ │ >99%   │       │
│  │STRENGTH│ │SERVINGS│ │ PURITY │       │
│  └────────┘ └────────┘ └────────┘       │
│  (MetricRail — cobalt values, bordered) │
│                                         │
│  £43          ┌─────────────────┐       │
│               │   Add to Bag    │       │
│               └─────────────────┘       │
│               (filled cobalt CTA)       │
│                                         │
└─────────────────────────────────────────┘

  Product toggle chips (BELOW the card):
  [MK-2866●] [MENT] [ENDURASHRED] [RAD-140] [MK-677]
  (pill-shaped, MK-2866 active/filled cobalt)
```

Key rules:
- **One continuous card surface** — no canvas leaks between hero copy and featured product. Card fill is white, card border uses the standard 1px rgba(206,220,241,0.92) stroke.
- **Cobalt blue embedded divider** (#256DFF, 2px) separates the editorial zone from the purchase zone INSIDE the card.
- **Product toggle chips sit BELOW the card** — they are not part of the card surface.
- **Purchase content is INLINE** — part of the card surface, not a nested card-within-card. No separate elevation or border radius on the purchase zone.
- **Card width ~440px** — matching the reference frame `470:6393`.
- **Card radius** — r=24 or r=28, consistent with Softform Arc.
- **Card shadow** — blue-shifted, consistent with elevation system.

**RIGHT PANEL — Atmospheric media chamber:**
- Product bottle render with bounded atmospheric environment.
- Full-height, bleed-free.
- Must have strong visual weight — at LEAST equal emphasis to the left card. The media chamber is not a sidebar; it is the hero's primary visual anchor.
- No canvas leaking between the two panels.

**The hero is LOCKED.** All three directions use this same hero structure. The differentiation comes from the six compositions BELOW the hero.

### Composition 2: Product Grid / Rail (MUST DIFFERENTIATE)

Demonstrate compact cards in a CSS grid or rail layout. **Each direction must show a DIFFERENT grid approach:**

- **Direction A approach:** Equal-density peers — 4 compact cards in a tight row (proven from Run 1/2). Test whether staggered vertical offsets (Dir C planes) add depth.
- **Direction B approach:** Mixed-density hierarchy — one Featured card (481×896, r=24) promoting above compact peers (302×382, r=20). Featured card breaks the row to establish visual hierarchy.
- **Direction C approach:** Alternative layout — 2-column, 3-column, asymmetric grid, or rail with horizontal scroll. Explore a structurally different grid geometry.

All approaches must:
- Fill the full available width — **no right-side deadspace**
- Show tight, purposeful spacing between cards
- Make the elevation graduation visually legible (compact shadow lighter than Featured shadow)
- Use Dir C's planar language (staggered offsets, depth cues)

### Composition 3: PDP Section 1 — Full Field + PurchasePanel (MUST DIFFERENTIATE)

Use the native PDP Section 1 Control Test frame (`480:4503`, [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=480-4503)) as structural authority.

The left media chamber must be fully filled (Direction B's approach — no page canvas leaking). PurchasePanel elevated on the right. This is the PDP first-fold exception: flat and without plane elevation on the background, only the purchase plane is raised.

**Differentiation:** Each direction should explore different panel proportions (60/40 vs 55/45 vs 50/50), different media chamber atmospheres, or different PurchasePanel alignments (top-aligned vs centered vs bottom-weighted).

### Composition 4: Product Dossier (MUST DIFFERENTIATE)

Use the native Dossier frame (`198:1292`, [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=198-1292)) as structural authority.

The Dossier is a detailed product information section with tabbed focus variants (Product/Facts/Composition). It must sit between PDP Section 1 and Evidence in the page flow.

**Differentiation:** Each direction must show a DIFFERENT dossier layout:
- **Direction A approach:** Three-column (facts left, bottle center, composition right) with tight headline connection.
- **Direction B approach:** Two-panel split (facts+bottle left panel, composition right panel) — canvas-split pattern.
- **Direction C approach:** Full-width single column with horizontal data sections, or tabbed accordion, or stacked panels with planar elevation.

All approaches must:
- **Eliminate deadspacing** — tight connection between "Product facts, label truth and batch evidence" headline and the dossier content below. No passive corridor.
- **Fill the available width** — no right-side deadspace.
- Connect to PDP Section 1 above without a passive spacing corridor.
- Use the same raised white plane treatment as commerce cards.

### Composition 5: Evidence Section (MUST DIFFERENTIATE)

Use the native TrustEvidenceSpine (`475:9098`, [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=475-9098)) AND the LabReports canvas-split pattern (`222:1332`, [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=222-1332)) as structural authority.

**The Evidence section is NOT a row of badge icons.** Run 2 flattened the TrustEvidenceSpine into generic badges. Run 3 must decompose the native inputs and show the FULL evidence architecture:

- **Six-point record** — vertical checklist with cobalt authority dots: Compound Identity (Match declaration), Purity (Measured by HPLC), Concentration (Per-serving assay), Microbiology (Screening result), Heavy Metals (Limit result), Certificate (Linked document)
- **HPLC Purity Trace chart** — line chart showing purity measurements across standards and samples (Std 1, Std 2, Sample A, Sample B, Std 3) with percentage scale (97%-100%). Includes batch metadata (Batch: Linked batch, Lab: Lab, Method: HPLC-UV, Reported: Date)
- **Batch Records data table** — tabular data: Compound, Batch, Purity, Lab, Date, Status columns. MK-2866 / RAD-140 / LGD-4033 / GW-501516 rows, all >99%, with linked "Record" status
- **OPENLAB ARCHIVE card** — from LabReports reference (`222:1332`): headline "Every batch. Every report. Public." + search bar + aggregate metrics (15 Reports / 99.55% Avg Purity / 0 Failures) + "View testing methodology" link

**Differentiation:** Each direction must show a DIFFERENT evidence layout:
- **Direction A approach:** Canvas-split — OPENLAB ARCHIVE card left + Batch Records table right (following `222:1332` pattern), with Six-point record below.
- **Direction B approach:** Full-width evidence dashboard — Six-point record + HPLC chart + Batch Records in a three-column or two-row layout.
- **Direction C approach:** Stacked planar evidence — Six-point record as an elevated card, HPLC chart as a separate plane, Batch Records as a data table plane — using Dir C's elevation graduation.

### Composition 6: Related/Upsell Rail with Canvas Split (MUST DIFFERENTIATE)

Horizontal cards in a rail or grid below an editorial section. True canvas separation between editorial content and the card rail.

**The horizontal card MUST be adaptive full-width.** The ProductCommerceCard / Horizontal (`486:4636`, [Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4636)) is 1060×542 at native width. In a 1440px page, it must either:
- **Span the full content width** as an adaptive wide-screen card (left media chamber + right purchase plane expanding to fill)
- **Or sit at native width with a purposeful canvas treatment** — not empty truncation

Run 2 showed the horizontal card with a missing right side. This is wrong. The card is designed for widescreen — the media chamber and purchase plane should expand.

**Differentiation:**
- **Direction A approach:** Single horizontal card spanning full width, editorial intro above.
- **Direction B approach:** Two horizontal cards stacked with different products, compact editorial inline.
- **Direction C approach:** Horizontal card with adjacent compact upsell cards (mixed rail), canvas-split rhythm.

## Surface and Spacing Laws

These are inherited from the accepted surface-contract.md and MF-01B verdicts, with Run 1+2 corrections:

1. **Canvas as margin** — cool luminous canvas (`#f7f8fc`) establishes the reading lane. Visible between independent sections. Never passive deadspacing.
2. **Raised commerce planes** — cards and panels rise from canvas through optical white, structural edges, and restrained cool elevation. No redundant white wrappers.
3. **Bounded media chambers** — product environments are peers of purchase planes, bounded and atmospheric. Not page backgrounds.
4. **PDP flat atmospheric exception** — Section 1 only. Flat field, no plane elevation on background, raised purchase plane only.
5. **Section spacing tightened** — Run 1 AND Run 2 both had too much inter-section gap. Adjacent sections must feel CONNECTED, not isolated. Maximum canvas gap between sections: 48px. Reduce further where visual continuity demands it.
6. **No Blue-Eyebrow on ProductCommerceCards** — cobalt top-edge accent is for authorized non-hero sections only, never on ProductCommerceCard family cards. The hero card's cobalt top-edge is structural authority, not decorative.
7. **Embedded dividers inside joined objects** — no canvas gap between a card's media chamber and its purchase content. Use internal seams or transparent dividers.
8. **Zero grey** — no generic achromatic/Tailwind grey. Approved blue-shifted neutrals only. Dividers: `rgb(206,220,241)`. Near-black: `rgb(20,24,39)`. Card borders: `rgba(206,220,241,0.92)`.
9. **No Dossier deadspacing** — the large corridor between headline stack and dossier container must be ELIMINATED. Headline and content must feel like one unit.
10. **Marginless container stacking** — when semantic sections share a single card surface (as in the hero card), use zero item-spacing between zones. Internal padding (24-32px) provides breathing room. Dividers are the ONLY visual separation between zones.
11. **Embedded divider palette** — embedded dividers inside continuous card surfaces use cobalt blue (#256DFF, 2px, authority accent) for primary separators. Never achromatic grey. Never thicker than 2px.
12. **Adaptive card scaling** — horizontal cards and full-width compositions must fill the available content width. No truncated cards with empty right sides. Cards either expand to fill or sit within a purposeful canvas treatment.

## Card Elevation Graduation (Must Be Demonstrated)

The MF-01A card family uses a graduated elevation system. MF-02A must make this visible across compositions:

| Card Density | Radius | Shadow | Context |
|---|---|---|---|
| Compact | r=20 | blur=12, y=5, rgba(24,61,120,0.09) | Grid/rail, lightweight |
| Vertical | r=24 | blur=60, y=24, rgba(34,70,126,0.1) | Product grid, browsing |
| Featured | r=24 | blur=60, y=24, rgba(34,70,126,0.1) | Promoted in mixed grid |
| Horizontal | r=34 | blur=25, y=12, rgba(24,61,120,0.12) | Related/upsell rail |
| PurchasePanel | r=28 | blur=50, y=20, rgba(22,62,132,0.18) | PDP purchase decision |

Elevation increases with decision weight. Compact cards for browsing are lightest; PurchasePanel for purchase commitment is heaviest. This graduation must be visually legible.

## Typography Contract (Locked)

- Display/product names/prices/metric values: Plus Jakarta Sans ExtraBold
- Body/labels/buttons/metadata: Inter (Medium for labels, Bold for values, Extra Bold for badges)
- Minimum body: 15-16px. Minimum metadata/eyebrows: 10-12px.
- No Barlow Condensed, Archivo, Cousine, or Inter Variable.

## Cobalt Authority Order (Locked)

> quantified metric > specification > qualitative attribute > structural edge

- Core identity cobalt: `#0057FF`
- Interactive cobalt: `#256DFF`
- MetricRail gets the strongest cobalt treatment
- QualitativeChips get blue-shifted structural edges, cobalt icons, dark text
- No cobalt card perimeter or decorative top eyebrow on ProductCommerceCards

## Product Truth (Locked)

Primary product: MK-2866 / Ostarine / SARM SERIES / SKU 80529-01 / 15 MG / 90 SERVINGS / >99% / £43
Secondary product (horizontal card): RAD-140 / Testolone / SARM SERIES / 8 MG / 60 SERVINGS / >99% / £46

## Interactive States (Reference Only)

The compact card's 5 interactive states (Default/Hover/Focus/Selected/Added) are shown in the native Compact component set. MF-02A does not need to implement these as working interactions — show Default state in grid compositions. The state system is reference for MF-02B.

## Dossier Integration Notes

The Dossier has three focus variants: Product (primary reference), Facts, and Composition. MF-02A should show the Product variant in the page flow. The tab-switching mechanism is reference only — show the Product tab as active.

Key Dossier relationships to preserve:
- Dossier sits between PDP Section 1 and Evidence in the page scroll
- Must connect to PDP Section 1 above without a passive spacing corridor
- Uses the same raised white plane treatment as commerce cards
- Product specifications inside the Dossier use the same chip geometry as QualitativeChips
- The Dossier headline introduces its content — proximity must be tight

## Direction C Champion Baseline (Run 1 Inheritance)

Direction C won the planar language competition. These C-specific patterns are the baseline for ALL compositions, not just the hero:
- **Staggered planes** — cards at different vertical offsets creating depth, not flat uniform rows. Apply to GRID and RAIL.
- **Elevation graduation** — visible shadow difference between card densities. Apply to GRID and PDP.
- **Canvas-split rhythm** — intentional horizontal canvas bands separating semantic sections. Apply to EVIDENCE and RAIL.
- **Dynamic evidence** — six-point record with chart integration, not static list. Apply to EVIDENCE.

All three Run 3 directions must execute WITHIN this philosophy. The question is no longer "which philosophy?" — it's "how does the planar language execute differently across grid, PDP, dossier, evidence, and rail?"

## Section-Level Differentiation Contract

This is the most important requirement. Run 2 failed because all three directions shared identical compositions below the hero. Run 3 must produce genuinely different executions:

| Composition | Dir A Must Show | Dir B Must Show | Dir C Must Show |
|---|---|---|---|
| Hero | LOCKED (same) | LOCKED (same) | LOCKED (same) |
| Grid | Equal-density 4-across | Mixed-density Featured+Compact | Alternative geometry |
| PDP S1 | 60/40 split | 55/45 split | 50/50 split |
| Dossier | Three-column | Two-panel split | Full-width stacked |
| Evidence | Canvas-split (archive+table) | Full-width dashboard | Stacked planar |
| Rail | Single full-width card | Two stacked cards | Mixed rail |

This table is a MINIMUM differentiation requirement. Each direction may explore further variation within these constraints, but no two directions may use the same layout approach for any composition.

## Reject

- Cream or warm-beige canvas
- Broad inverse or dark sections
- Blanket grey fields
- Full-width colored section backgrounds (except PDP Section 1 atmospheric exception)
- White wrappers around already-raised white cards
- Empty media placeholders when the approved render is available
- Design-system documentation boards, component libraries, or specification sheets
- Runtime, API, telemetry, payment, loading architecture
- Dark mode, MENT, or black-label work
- Decorative technical-OS chrome, reticles, barcodes
- Generic dashboard metrics
- Green inventory icons or live inventory implications
- Passive spacing corridors between headlines and introduced content
- Background-image-with-overlay hero treatment (the hero is a TWO-FOLD STRUCTURE with a vertical card)
- Card-within-card nesting (the hero purchase zone is INLINE content, not a nested elevated card)
- Right-side deadspace in grid, dossier, or rail compositions
- Truncated horizontal cards with empty right sides
- Identical compositions across directions (each composition MUST vary)
- Generic evidence badge rows (evidence must show Six-point record + HPLC chart + Batch Records)
- Hero experimentation (hero structure is LOCKED from `470:6393`)

## Deliverable

Show the three directions as continuous vertical page compositions at 1440px desktop width. Each direction must flow through all 6 compositions in a believable page scroll: Hero → Grid → PDP Section 1 → Dossier → Evidence → Related/Upsell Rail. The compositions must feel like one continuous page experience with purposeful section transitions and tight canvas rhythm.

The hero is locked across all three directions. The differentiation comes from Grid, PDP S1, Dossier, Evidence, and Rail — each must show a materially different layout approach per the Section-Level Differentiation Contract above.

Do not select a winner automatically. Human review will choose grid patterns, surface transitions, elevation graduation, and spacing rhythm for MF-02B integration. Stop before synthesis or native integration.
