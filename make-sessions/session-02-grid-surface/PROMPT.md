# MF-02A — Grid Surface & Card Elevation Frontier (Run 2)

## Context

MF-01A produced 5 card densities in the Softform Arc direction. MF-01B tested whether those relationships survive in real page contexts. Human review cherry-picked: Direction A as baseline, B's PDP container approach, C's evidence section dynamics, and C's staggered planes card shape.

**Run 1 produced three directions.** Human verdict: Direction C's planar language (staggered planes, elevation graduation, canvas-split rhythm) is the champion baseline. Run 1 failures: ALL THREE directions treated the homepage hero as a background-image-with-overlay composition (because the hero was provided as a PNG). The hero is structurally a two-fold container — left=decision surface, right=media chamber. Run 2 replaces the PNG with the native hero frame to fix this.

Run 2 corrections:
- Hero is now a native frame — Make must read and decompose the two-fold structure
- Direction C's planar language is the champion baseline — other directions should explore different executions of this same philosophy
- Tighten inter-section spacing further — Run 1 still had excess canvas corridors
- Surface contract colors must use blue-shifted neutrals only (dividers: rgb(206,220,241), near-black: rgb(20,24,39))
- Right-side deadspace in grid and Dossier compositions must be eliminated

## Sealed MF-02A Input Manifest — 9 Native Frames

The sealed input manifest consists of **9 native Figma frames** copied directly into the Make file. Native frames carry full layer structure, typography, spacing, fills, strokes, shadows, and component relationships — providing Make with higher-fidelity structural authority than rasterized PNGs.

Do not add additional native Figma nodes, `/all-pages`, system boards, dark/MENT references, or any file outside this manifest.

### Native Frame Inputs (9)

1. **ProductCommerceCard / Vertical** — Vertical ProductGrid card (481×916, r=24). Bounded chamber + raised white purchase plane + MetricRail + QualitativeChips + quantity stepper + dual CTAs. Source: `486:4634`
2. **ProductCommerceCard / Featured** — Featured/Derived vertical card (481×896, r=24). Same family as Vertical with SKU badge addition and side-by-side CTA layout. Source: `486:4635`
3. **ProductCommerceCard / Horizontal** — Horizontal Related/Upsell card (1060×542, r=34). Left media chamber + right purchase plane connected by sculpted seam. "Stacks well with MK-2866" relationship language. RAD-140/Testolone product. Source: `486:4636`
4. **ProductCommerceCard / Compact** — Compact QuickAdd card (302×382, r=20) in 5 interactive states: Default, Hover, Focus, Selected (cobalt 2px border), Added ("Added ✓" confirmation). Source: `486:4642`
5. **PurchasePanel** — PurchasePanel (420×687, r=28). The strongest single MF-01A card — white fill, blue-shifted shadow (r=50, y=20), bordered stroke, OPENLAB VERIFIED badge, size selector, bordered MetricRail + QualitativeChips. Source: `478:10367`
6. **PDP Section 1 — PurchasePanel Control Test** — PDP Section 1 composition (1440×879). Full-field atmospheric media chamber with render slot on left + PurchasePanel elevated on right. Proven transfer test — no canvas bleed, purchase plane reads as independently raised. Source: `480:4503`
7. **LIVE / TrustEvidenceSpine** — TrustEvidenceSpine (1440×851). Six-point evidence ledger: Identity Tested, Purity Measured, Concentration Confirmed, JANOSHIK Verified, Tamper-Proof Sealed, Batch Tracked. Full-width section with editorial headline left + product bottle center + 6-point grid below. Source: `475:9098`
8. **Dossier / Native Light VNext (Focus=Product)** — Product Dossier. The primary product information dossier showing detailed product specifications, composition data, and facts. Three variants exist (Product/Facts/Composition) — this shows the Product focus variant as the primary reference. Source: `198:1292`
9. **Homepage Hero Container** — The homepage hero two-fold structure (1384×780). Left Container (decision surface: editorial copy + product card + tab controls) and Right Container (atmospheric media chamber with product bottle). This is the STRUCTURAL AUTHORITY for the hero — Make must decompose and compose from this native frame, not treat it as a flat image. Source: `462:6144`

These inputs are creative-direction evidence AND structural authority. Native frames give Make direct access to material relationships, card family language, and composition structure. Make must preserve these while improving grid density, surface transitions, section spacing, and card elevation patterns.

## What MF-02A Must Produce

Three materially different grid and surface compositions at desktop width (1440px). Each direction must demonstrate ALL SIX of these compositions. Direction C's planar language (staggered planes, elevation graduation, canvas-split rhythm) from Run 1 is the champion baseline — all three directions should explore different executions within this philosophy.

### Composition 1: Homepage Hero Entry

Use the native Homepage Hero Container (`462:6144`) as structural authority. The hero is a **two-fold horizontal split**: left=decision surface, right=atmospheric media chamber.

The LEFT PANEL (decision surface) must be tested in **two variant approaches**:

**Variant A — Sectioned decision surface (existing approach):**
Editorial copy (eyebrow + headline + body + dual CTAs) flows above a featured product card section and product switcher tabs. Sections are visually distinguished but share the same panel. Make should determine the best spatial relationship between copy zone and commerce zone.

**Variant B — 2-fold vertical card with embedded dividers:**
The entire left panel is treated as ONE continuous vertical card surface (r=24 or r=28). Three semantic zones live inside the card, separated by embedded dividers — not by canvas gaps:

```
┌─────────────────────────────────────┐
│  CARD SURFACE (continuous white)    │
│                                     │
│  Eyebrow + Headline + Body + CTAs   │
│  (hero editorial copy)              │
│                                     │
├─── embedded divider (cobalt/none) ──┤
│                                     │
│  Featured Product Purchase Panel    │
│  (MK-2866 / metrics / price / CTA) │
│                                     │
├─── embedded divider (cobalt/none) ──┤
│                                     │
│  Product Tab Controls               │
│  (MK-2866 | MENT | ENDURASHRED |   │
│   RAD-140 | MK-677)                 │
│                                     │
└─────────────────────────────────────┘
```

Key rules for Variant B:
- **One continuous card surface** — no canvas leaks between sections. The card's white fill and border radius contain ALL three zones.
- **Embedded dividers** — thin horizontal separators (1-2px) living INSIDE the card. Either cobalt blue (`#256DFF`) for authority accent OR no-color (blue-shifted neutral `rgb(206,220,241)`) for structural separation. Test both.
- **Zero item spacing** — sections stack with no gap. Internal padding provides breathing room, not inter-section margins.
- **Cobalt top-edge** — optional 2px cobalt accent at the card's top edge (authority marker). This is NOT the same as a "blue eyebrow on cards" — it's structural authority on the hero decision surface specifically.
- **Purchase panel zone uses the same content** as the PurchasePanel component (MetricRail chips, price, CTAs) but rendered INSIDE the card surface, not as a separate elevated card-within-card.
- **Product tab controls** are the product switcher chips (MK-2866 | MENT | ENDURASHRED | RAD-140 | MK-677) — pill-shaped toggles that switch the featured product.

The RIGHT PANEL (media chamber) remains atmospheric: product bottle render with bounded environment, bleed-free. No canvas leaking between the two panels.

Each of the three directions must test at least one of these variants. At least one direction MUST use Variant B. Ideally, show both variants across the three directions so human review can compare.

### Composition 2: Product Grid / Rail
Demonstrate compact cards in a CSS grid or rail layout. Test equal-density peers (Direction A's 3-card approach was cleanest) AND mixed-density hierarchy (one Featured card promoting above compact peers). Grid must have tight, purposeful spacing — no dead air between cards. **Eliminate right-side deadspace** — grid must fill the full available width.

### Composition 3: PDP Section 1 — Full Field + PurchasePanel
Use the native PDP Section 1 Control Test frame as structural authority. The left media chamber must be fully filled (Direction B's approach — no page canvas leaking). PurchasePanel elevated on the right with its own shadow creating separation from the flat atmospheric field. This is the PDP first-fold exception: flat and without plane elevation on the background, only the purchase plane is raised.

### Composition 4: Product Dossier
Use the native Dossier frame as structural authority. The Dossier is a detailed product information section with tabbed focus variants (Product/Facts/Composition). It must sit between the PDP Section 1 and the Evidence section in the page flow. Spacing must serve continuity with Section 1 above — no passive corridor between the headline stack and dossier content. **Eliminate deadspacing** — tight connection between headline and content. **Eliminate right-side deadspace** — content fills the available width.

### Composition 5: Evidence Section
Use the native TrustEvidenceSpine frame as structural authority. Six-point evidence record with vertical checklist + HPLC chart + data table (Direction C's dynamic approach). Cobalt authority dots must survive inside evidence context without competing with card-level cobalt.

### Composition 6: Related/Upsell Rail with Canvas Split
Horizontal cards in a rail or grid below an editorial section. True canvas separation between editorial content and the card rail. The canvas gap must read as intentional rhythm, not dead space.

## Surface and Spacing Laws

These are inherited from the accepted surface-contract.md and MF-01B verdicts, with Run 1 corrections:

1. **Canvas as margin** — cool luminous canvas establishes the reading lane. Visible between independent sections. Never passive deadspacing.
2. **Raised commerce planes** — cards and panels rise from canvas through optical white, structural edges, and restrained cool elevation. No redundant white wrappers.
3. **Bounded media chambers** — product environments are peers of purchase planes, bounded and atmospheric. Not page backgrounds.
4. **PDP flat atmospheric exception** — Section 1 only. Flat field, no plane elevation on background, raised purchase plane only.
5. **Section spacing tightened** — Run 1 STILL had too much inter-section gap. Reduce further. Canvas rhythm must come from composition variety, not empty bands. Adjacent sections should feel connected, not isolated.
6. **No Blue-Eyebrow on ProductCommerceCards** — cobalt top-edge accent is for authorized non-hero sections only, never on ProductCommerceCard family cards. Exception: the hero decision surface Variant B's cobalt top-edge is structural authority, not decorative.
7. **Embedded dividers inside joined objects** — no canvas gap between a card's media chamber and its purchase content. Use internal seams or transparent dividers.
8. **Zero grey** — no generic achromatic/Tailwind grey. Approved blue-shifted neutrals only.
9. **No Dossier deadspacing** — the current Product Dossier spacing is negative evidence. The large corridor between headline stack and dossier container must be removed.
10. **Marginless container stacking** — when semantic sections share a single card surface (as in Variant B hero), use zero item-spacing between zones. Internal padding (24-32px) provides breathing room. Dividers are the ONLY visual separation between zones.
11. **Embedded divider palette** — embedded dividers inside continuous card surfaces use either cobalt blue (#256DFF, 2px, authority accent) or blue-shifted neutral (rgb(206,220,241), 1px, structural separator). Never achromatic grey. Never thicker than 2px.

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

- Core identity cobalt: #0057FF
- Interactive cobalt: #256DFF
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

Direction C won the planar language competition. These C-specific patterns are the baseline:
- **Staggered planes** — cards at different vertical offsets creating depth, not flat uniform rows
- **Elevation graduation** — visible shadow difference between card densities
- **Canvas-split rhythm** — intentional horizontal canvas bands separating semantic sections
- **Dynamic evidence** — six-point record with chart integration, not static list

All three Run 2 directions should explore WITHIN this philosophy. The question is no longer "stacked vs staggered vs flowing" — it's "how does the planar language execute differently across hero, grid, PDP, dossier, evidence, and rail?"

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
- Background-image-with-overlay hero treatment (the hero is a TWO-FOLD STRUCTURE, not a wallpaper)
- Card-within-card nesting (the Variant B hero purchase zone is INLINE content, not a nested elevated card)
- Right-side deadspace in grid or Dossier compositions

## Deliverable

Show the three directions as continuous vertical page compositions at 1440px desktop width. Each direction must flow through all 6 compositions in a believable page scroll: Hero → Grid → PDP Section 1 → Dossier → Evidence → Related/Upsell Rail. The compositions must feel like one continuous page experience with purposeful section transitions and tight canvas rhythm.

At least one direction must use Variant B (2-fold vertical card) for the hero. Ideally all three test different hero approaches so human review can compare Variant A vs Variant B execution.

Do not select a winner automatically. Human review will choose grid patterns, surface transitions, elevation graduation, and spacing rhythm for MF-02B integration. Stop before synthesis or native integration.
