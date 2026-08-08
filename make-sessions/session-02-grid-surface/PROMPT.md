# MF-02A — Grid Surface & Card Elevation Frontier

## Context

MF-01A produced 5 card densities in the Softform Arc direction. MF-01B tested whether those relationships survive in real page contexts. Human review cherry-picked: Direction A as baseline, B's PDP container approach, C's evidence section dynamics, and C's staggered planes card shape. All three MF-01B directions had too much section spacing and no complete PDP.

Phase 1 corrections have been completed: all 5 card densities are now componentized with consistent typography (Plus Jakarta Sans ExtraBold display + Inter body) and the compact card has 5 interactive state variants (Default/Hover/Focus/Selected/Added).

MF-02A is the first real-node frontier. Its job is to compose the proven MF-01A card family into CSS grid layouts, surface compositions, and card elevation patterns — using real native compositions as reference, not inventing new ones from scratch.

## Sealed MF-02A Input Manifest — Hybrid Native Frames + Creative-Direction PNG

The sealed input manifest consists of **8 native Figma frames** copied directly into the Make file plus **1 creative-direction PNG**. Native frames carry full layer structure, typography, spacing, fills, strokes, shadows, and component relationships — providing Make with higher-fidelity structural authority than rasterized PNGs. The single PNG (homepage hero) serves as creative-direction evidence where the composition matters more than editable structure.

Do not add additional native Figma nodes, `/all-pages`, system boards, dark/MENT references, or any file outside this manifest.

### Native Frame Inputs (8)

1. **ProductCommerceCard / Vertical** — Vertical ProductGrid card (481×916, r=24). Bounded chamber + raised white purchase plane + MetricRail + QualitativeChips + quantity stepper + dual CTAs. Source: `486:4634`
2. **ProductCommerceCard / Featured** — Featured/Derived vertical card (481×896, r=24). Same family as Vertical with SKU badge addition and side-by-side CTA layout. Source: `486:4635`
3. **ProductCommerceCard / Horizontal** — Horizontal Related/Upsell card (1060×542, r=34). Left media chamber + right purchase plane connected by sculpted seam. "Stacks well with MK-2866" relationship language. RAD-140/Testolone product. Source: `486:4636`
4. **ProductCommerceCard / Compact** — Compact QuickAdd card (302×382, r=20) in 5 interactive states: Default, Hover, Focus, Selected (cobalt 2px border), Added ("Added ✓" confirmation). Source: `486:4642`
5. **PurchasePanel** — PurchasePanel (420×687, r=28). The strongest single MF-01A card — white fill, blue-shifted shadow (r=50, y=20), bordered stroke, OPENLAB VERIFIED badge, size selector, bordered MetricRail + QualitativeChips. Source: `478:10367`
6. **PDP Section 1 — PurchasePanel Control Test** — PDP Section 1 composition (1440×879). Full-field atmospheric media chamber with render slot on left + PurchasePanel elevated on right. Proven transfer test — no canvas bleed, purchase plane reads as independently raised. Source: `480:4503`
7. **LIVE / TrustEvidenceSpine** — TrustEvidenceSpine (1440×851). Six-point evidence ledger: Identity Tested, Purity Measured, Concentration Confirmed, JANOSHIK Verified, Tamper-Proof Sealed, Batch Tracked. Full-width section with editorial headline left + product bottle center + 6-point grid below. Source: `475:9098`
8. **Dossier / Native Light VNext (Focus=Product)** — Product Dossier. The primary product information dossier showing detailed product specifications, composition data, and facts. Three variants exist (Product/Facts/Composition) — this shows the Product focus variant as the primary reference. Source: `198:1292`

### Creative-Direction PNG Input (1)

9. **homepage-hero-current.png** — Homepage hero composition (1440×780). The authoritative homepage entry — atmospheric bottle composition with product identity and editorial headline. This is provided as a PNG because the composition serves as creative-direction evidence; Make should interpret the visual atmosphere and editorial intent, not decompose its layer structure. Source: `462:6141`

These inputs are creative-direction evidence AND structural authority. Native frames give Make direct access to material relationships, card family language, and composition structure. Make must preserve these while improving grid density, surface transitions, section spacing, and card elevation patterns.

## What MF-02A Must Produce

Three materially different grid and surface compositions at desktop width (1440px). Each direction must demonstrate ALL SIX of these compositions:

### Composition 1: Homepage Hero Entry
Use homepage-hero-current.png as creative-direction authority. Integrate MF-01A card language into the hero (Direction A's card-inside-hero approach won the transfer test). The hero must feel like an authored entry composition, not a mechanical copy of PDP Section 1.

### Composition 2: Product Grid / Rail
Demonstrate compact cards in a CSS grid or rail layout. Test equal-density peers (Direction A's 3-card approach was cleanest) AND mixed-density hierarchy (one Featured card promoting above compact peers). Grid must have tight, purposeful spacing — no dead air between cards.

### Composition 3: PDP Section 1 — Full Field + PurchasePanel
Use the native PDP Section 1 Control Test frame as structural authority. The left media chamber must be fully filled (Direction B's approach — no page canvas leaking). PurchasePanel elevated on the right with its own shadow creating separation from the flat atmospheric field. This is the PDP first-fold exception: flat and without plane elevation on the background, only the purchase plane is raised.

### Composition 4: Product Dossier
Use the native Dossier frame as structural authority. The Dossier is a detailed product information section with tabbed focus variants (Product/Facts/Composition). It must sit between the PDP Section 1 and the Evidence section in the page flow. Spacing must serve continuity with Section 1 above — no passive corridor between the headline stack and dossier content. Reduce the current deadspacing flagged in the surface contract.

### Composition 5: Evidence Section
Use the native TrustEvidenceSpine frame as structural authority. Six-point evidence record with vertical checklist + HPLC chart + data table (Direction C's dynamic approach). Cobalt authority dots must survive inside evidence context without competing with card-level cobalt.

### Composition 6: Related/Upsell Rail with Canvas Split
Horizontal cards in a rail or grid below an editorial section. True canvas separation between editorial content and the card rail. The canvas gap must read as intentional rhythm, not dead space.

## Surface and Spacing Laws

These are inherited from the accepted surface-contract.md and MF-01B verdicts:

1. **Canvas as margin** — cool luminous canvas establishes the reading lane. Visible between independent sections. Never passive deadspacing.
2. **Raised commerce planes** — cards and panels rise from canvas through optical white, structural edges, and restrained cool elevation. No redundant white wrappers.
3. **Bounded media chambers** — product environments are peers of purchase planes, bounded and atmospheric. Not page backgrounds.
4. **PDP flat atmospheric exception** — Section 1 only. Flat field, no plane elevation on background, raised purchase plane only.
5. **Section spacing tightened** — ALL MF-01B directions had too much inter-section gap. Reduce spacing between compositions. Canvas rhythm must come from composition variety, not empty bands.
6. **No Blue-Eyebrow on cards** — cobalt top-edge accent is for authorized non-hero sections only, never on ProductCommerceCard.
7. **Embedded dividers inside joined objects** — no canvas gap between a card's media chamber and its purchase content. Use internal seams or transparent dividers.
8. **Zero grey** — no generic achromatic/Tailwind grey. Approved blue-shifted neutrals only.
9. **No Dossier deadspacing** — the current Product Dossier spacing is negative evidence (surface-contract.md Appendix B). The large corridor between headline stack and dossier container must be removed.

## Card Elevation Graduation (Must Be Demonstrated)

The MF-01A card family uses a graduated elevation system. MF-02A must make this visible across compositions:

| Card Density | Radius | Shadow | Context |
|---|---|---|---|
| Compact | r=20 | r=12, y=5, rgba(24,61,120,0.09) | Grid/rail, lightweight |
| Vertical | r=24 | (between compact and PurchasePanel) | Product grid, browsing |
| Featured | r=24 | (between compact and PurchasePanel) | Promoted in mixed grid |
| Horizontal | r=34 | (broadest card radius) | Related/upsell rail |
| PurchasePanel | r=28 | r=50, y=20, rgba(22,62,132,0.18) | PDP purchase decision |

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
- No cobalt card perimeter or decorative top eyebrow on cards

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

## Deliverable

Show the three directions as continuous vertical page compositions at 1440px desktop width. Each direction must flow through all 6 compositions in a believable page scroll: Hero → Grid → PDP Section 1 → Dossier → Evidence → Related/Upsell Rail. The compositions must feel like one continuous page experience with purposeful section transitions and tight canvas rhythm.

Do not select a winner automatically. Human review will choose grid patterns, surface transitions, elevation graduation, and spacing rhythm for MF-02B integration. Stop before synthesis or native integration.
