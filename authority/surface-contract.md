# Olympus Labs UK — Adaptive Surface and Material Contract

> **2026-08-12 CONV-002 addendum:** 12 new convergence variables added to close the MF-01A standardization gap. Chip grammar, media gradient, and graduated border hierarchy now fully specified. `neutral/family` updated to #F8FAFC per champion decision. Total convergence variables: 98.

> **2026-08-11 CONV-001 supersession:** The append-only decision ledger and current-state snapshot now control. MF-01A material/anatomy relationships persist; later runs apply named deltas. The canonical graph remains unpublished and `HUMAN_REVIEW_REQUIRED`.

**Status:** Accepted relationship authority feeding the CONV-001 candidate graph
**Evidence state:** Extracted from frozen NR-04 native compositions, later live-node verification, and the G0 Universal Glue reference
**Applies to:** Light-mode design relationship review and FC-01 candidate containment
**Does not authorize:** Published-library promotion, a production `Light` mode, Shopper/runtime implementation, or production release

## CONV-002 material addendum — MF-01A standardization gap closure

### Problem resolved

The CONV-001 convergence palette (86 variables) captured the primary surface, text, and accent colors from MF-01A but missed the graduated border hierarchy and chip-specific values. Codex built structurally correct canonical components but used invented color values for borders and chip text because the tokens did not exist. This produced visual divergence from the MF-01A champion source despite correct variable binding methodology.

### New color primitives (VariableCollectionId:634:2)

| Variable | Hex | Role | MF-01A source evidence |
|---|---|---|---|
| `blue/border-chip` | `#D4E0F2` | QualitativeChip container strokes | 626:11885, 626:11900, 626:11912, 626:11925 |
| `blue/border-outer` | `#BECFE9` | Card outer wrapper / secondary perimeter | 626:11819, 626:11978 |
| `blue/border-identity` | `#BDD0F1` | Identity section borders | 626:11823, 626:11982 |
| `blue/border-inner` | `#B4CAF0` | Inner identity accent strokes | 626:11824, 626:11983 |
| `blue/border-family-bg` | `#D9E3F1` | Family container / background strokes | 626:11829, 626:11938, 626:11988 |
| `ink/chip-value` | `#17213F` | Chip value text (bold line in two-type grammar) | 626:11968 chip value text nodes |

### New semantic aliases (VariableCollectionId:634:20)

| Variable | Alias target | Semantic role |
|---|---|---|
| `border/chip` | `blue/border-chip` | QualitativeChip container stroke |
| `border/outer` | `blue/border-outer` | Card outer wrapper stroke |
| `border/identity` | `blue/border-identity` | Identity section stroke |
| `border/inner` | `blue/border-inner` | Inner identity accent stroke |
| `border/family-bg` | `blue/border-family-bg` | Family container / background stroke |
| `text/chip-value` | `ink/chip-value` | Chip value text fill |

### Updated primitive

| Variable | Old value | New value | Reason |
|---|---|---|---|
| `neutral/family` | `#FAFCFF` | `#F8FAFC` | Champion decision: adopt MF-01A's original identity family surface color |

### Graduated border hierarchy (complete)

The MF-01A material language uses a 8-value graduated border system. Each border serves a distinct semantic role at a specific depth in the card anatomy:

| Border | Hex | Semantic depth | Usage |
|---|---|---|---|
| `border/strong` | `#AFC8FF` | Highest contrast | MetricRail cells, specification containers |
| `border/family` | `#D2E4FF` | High | Family section boundaries |
| `border/chip` | `#D4E0F2` | Medium-high | QualitativeChip containers |
| `border/identity` | `#BDD0F1` | Medium | Identity section boundaries |
| `border/inner` | `#B4CAF0` | Medium | Inner identity accent |
| `border/card` | `#CEDCF1 @92%` | Medium-low | Card perimeter |
| `border/family-bg` | `#D9E3F1` | Low | Family container / background strokes |
| `border/outer` | `#BECFE9` | Lowest | Card outer wrapper |

### QualitativeChip grammar (MF-01A canonical)

Each chip is an **icon-led, two-type bordered container**:

```
┌─────────────────────────────┐
│  [Icon]  LABEL   ← Inter Medium 11px, tracking 0.66px, UPPER, text/muted (#64718A)
│          VALUE   ← Inter Bold 12px, tracking 0.24px, text/chip-value (#17213F)
└─────────────────────────────┘
   Fill: surface/card (#FFFFFF)
   Stroke: border/chip (#D4E0F2), 1px
   Radius: radius/chip (10px)
   Icon: cobalt stroke vectors (#0057FF)
```

Content pattern (MK-2866):
- CLASS / SARM
- FORM / CAPSULES
- QUALITY / LAB FORMULATED
- TESTED / THIRD PARTY

State variants:
- **Default:** label = text/muted, value = text/chip-value, border = border/chip
- **Selected:** label = accent/cobalt, value = accent/cobalt, border = accent/cobalt
- **Disabled:** label = text/muted, value = text/muted, border = border/chip

### Media chamber gradient (MF-01A canonical)

The media chamber uses a diagonal linear gradient for atmospheric softform feel, NOT a solid fill:

| Property | Value |
|---|---|
| Type | `GRADIENT_LINEAR` |
| Stop 1 | `#F8FBFF` at position 5% (near-white ice) |
| Stop 2 | `#E4ECFA` at position 100% (deeper ice) |
| Direction | ~70° diagonal via transform matrix |
| Contact shelf | Secondary gradient `#FFFFFF` → `#E6EDFA` |

The solid `surface/media` (#F0F4FB) remains available as a fallback for contexts where gradients are impractical (e.g., small chips, status indicators). The gradient is the primary media chamber treatment.

`DEC-MEDIA-002` governs one bounded literal-paint exception: Figma gradient stops `#F8FBFF` and `#E4ECFA` may remain literal because the paint recipe, rather than an individually bindable stop, is the controlled artifact. The exception is limited to this exact two-stop media gradient, must appear in validation receipts, and does not authorize any other unbound or invented component color. Codex/Sites uses the governed `--oluk-media-gradient` custom property for the same recipe.

`DEC-MEDIA-003` clarifies the complete authored recipe without rewriting the earlier event: the bounded exception includes both the outer chamber `#F8FBFF→#E4ECFA` gradient and the contact-shelf `#FFFFFF→#E6EDFA` gradient. Those four stop colors are permitted literally only within this MF-01A atmospheric media construction; every other component fill and stroke must resolve through an active convergence variable.

### Total convergence variable count

| Collection | CONV-001 | CONV-002 | Delta |
|---|---|---|---|
| Color Primitives (634:2) | 17 | 23 | +6 |
| Color Semantics (634:20) | 19 | 25 | +6 |
| Dimensions (634:40) | 28 | 28 | 0 |
| Typography (634:69) | 22 | 22 | 0 |
| **Total** | **86** | **98** | **+12** |

---

## CONV-001 material addendum

The active candidate foundations are the 4 convergence collections/98 variables. The 2 legacy plus 1 quarantined collections/128 variables are archived provenance. New work binds only to the active convergence collections. None is published or promoted.

Current effect authority is graduated single shadows: Compact y5/blur12/.09, Vertical/Featured y24/blur60/.10, PurchasePanel y20/blur50/.18 and Relation y12/blur25/.12. The former two-layer Softform Arc recipe is archived evidence. Commerce taxonomy remains `SARMs / Prohormones / Research Chemicals / Stacks`; the dossier index remains non-interactive unless a later decision explicitly authorizes interaction; the dark footer is the sole inverse surface. The proposed 12px metadata / 15–16px body floor does not control until explicitly approved.

## Purpose

This contract names the surfaces in the Olympus Labs UK light-mode system, explains how they relate, and defines the jobs performed by canvas, elevation, edges, shapes and cobalt accents.

It locks relationships, not final pixel values. The exact colors, radii, spacing, strokes and shadows observed in NR-04 are evidence that the relationships can work; they remain candidates until foundation extraction, system validation and human promotion.

MF-01A and MF-01B may produce alternative expressions when they preserve the hierarchy and semantic jobs below. Make is expected to improve silhouette, spacing rhythm, elevation character, chamber proportion and chip geometry rather than trace the current native values.

## I. Canvas roles

Canvas is structural space. Every exposed area of canvas must perform an identifiable job.

### 1. Canvas as margin — default

Canvas establishes the outer reading lane around sections, rails, cards and chambers. Its most common expression is the visible left and right inset between the page edge and customer content.

Rules:

- Use canvas to establish horizontal breathing room and a stable reading measure.
- Keep content aligned to a coherent lane even when adjacent sections use different shapes.
- Let raised cards and planes create their own contrast against the canvas; do not add a second white wrapper merely to manufacture separation.
- Adapt the inset to viewport, content density and section job. The current native padding is evidence, not a fixed token.

### 2. Canvas as rhythm

Canvas may appear between vertically flowing sections to pulse the scroll and make a transition legible.

Rules:

- A canvas interval should separate two meaningful compositions, not compensate for unresolved internal layout.
- Vary section silhouette, height and density so the rhythm comes from composition rather than repeated empty bands.
- The gap must be proportionate to the transition it communicates and should not interrupt a relationship that belongs inside one composition.

### 3. Canvas as divider — occasional

Canvas may divide editorial or headline assets from horizontally or vertically flowing card containers when the cards visibly rise from the canvas. PDP Section 4 and G0 Universal Glue provide useful evidence for this relationship.

Rules:

- Use this pattern when the separated groups are independent objects with different reading or interaction jobs.
- Let the cards provide the white elevated surfaces; the canvas is the ground between them.
- Preserve enough visible canvas to clarify independence without creating a broad, inactive band.
- Prefer distinct section and card silhouettes over white outlines or redundant white wrappers.

### 4. Embedded divider — when the relationship must remain joined

Canvas is not the correct divider when content belongs to one continuous semantic object. In that case, keep the composition joined and use an internal seam, hairline, transparent embedded divider or controlled material transition. PDP Section 3 and the MF-01A ProductCommerceCard relationships demonstrate this pattern.

Rules:

- Use embedded dividers for tightly related chamber/content, evidence/detail or multi-cell rail relationships.
- Do not expose page canvas inside one ProductCommerceCard between its media chamber and purchase content.
- A divider should clarify a change of job without making the joined object look like unrelated cards.

### Separation decision test

1. If two regions are one semantic object, use an embedded divider or authored seam.
2. If they are independent peer jobs, expose controlled canvas between their raised planes.
3. If the composition is the PDP first-fold exception, keep the atmospheric field flat and raise only the decision plane.
4. If a gap adds no reading, containment or hierarchy benefit, remove it.

### 5. Canvas anti-patterns

#### Deadspacing

Deadspacing is exposed canvas or canvas-like surface that has no active role as margin, rhythm, divider, reading measure or intentional pause.

The current Product Dossier capture is negative evidence: the large corridor between the headline stack and the dossier container weakens continuity and delays information without establishing a new section relationship.

Reject canvas spacing when it:

- separates a heading from the content it directly introduces;
- repeats internal padding and external gaps until the composition feels hollow;
- creates a passive corridor before the next useful object;
- reduces information density without improving comprehension;
- makes a container appear vertically stranded;
- uses whitespace as a substitute for shape, hierarchy or composition.

#### Canvas as decoration

Do not use wide pale bands merely to alternate section colors. Canvas must retain a structural job and must not become blanket grey or a generic tinted section background.

## II. Surface hierarchy

### Lowest customer-facing surface — Route and section canvas

The default light-mode content ground and the primary source of margins, reading lanes and controlled inter-module separation.

Relationship:

- cooler and lower than raised planes;
- visually continuous enough to establish page rhythm;
- not elevated;
- never allowed to become passive deadspacing.

The Figma editor/page surround is workspace chrome, not an additional customer-facing surface layer. It must never be promoted into the interface palette merely because it appears behind frames in the authoring file.

### Layer 2 — Raised information and commerce planes

Cards, purchase panels, information planes and authored rails rise from the canvas through optical white, structural edges and restrained cool elevation.

Relationship:

- white or optically white against the cooler canvas;
- the plane itself creates the pop;
- elevation communicates semantic containment and decision priority;
- a redundant white outline or wrapper must not be used to fake elevation;
- elevation strength remains adaptive to scale and context.

### Layer 2 peer — Bounded media chamber

Outside the PDP Section 1 exception, a media chamber is an authored product environment that is a peer of the raised commerce plane.

Relationship:

- bounded, not a page or section background;
- uses the MF-01A atmospheric gradient (`#F8FBFF` 5% → `#E4ECFA` 100%, diagonal) for softform depth;
- shares the raised hierarchy of the purchase plane without requiring the identical silhouette or shadow;
- connects to related purchase content through an embedded divider or authored seam;
- separates from independent objects through canvas.

Plane elevation and product-object grounding are different systems. A bottle may carry localized cobalt float and neutral contact shadow without turning the entire chamber into a blue glow.

### Flat atmospheric exception — PDP Section 1

PDP Section 1 is a continuous atmospheric field, not an elevated card or an oversized bounded chamber.

Relationship:

- flat and without plane elevation;
- may extend across the full first-fold composition;
- hosts the render slot and an independently raised purchase panel;
- uses atmosphere and product imagery to create depth;
- has no Blue-Eyebrow, cobalt top edge or four-sided card border;
- does not authorize full-field backgrounds elsewhere.

### Authored entry composition — Homepage hero

The homepage hero is a distinct page-entry composition, not another ProductCommerceCard and not a mechanical copy of the PDP first fold.

Relationship:

- uses an authored silhouette and media/copy relationship appropriate to page entry;
- may integrate a featured commerce object without wrapping the entire hero in a universal card shell;
- keeps the surrounding canvas legible as page structure;
- does not inherit the PDP full-field exception automatically;
- must preserve the same surface hierarchy when it transfers selected MF-01A relationships in MF-01B.

### Structural terminal surface — Footer

The footer is the sole permitted inverse terminal plane in the FC-01 candidate relationships. It uses `rgb(20,24,39)` with restrained structure and may not authorize a second inverse section, dark route or broad dark pacing slab.

## III. Accent and edge authority

Cobalt weight scales with semantic authority:

> **quantified metric > specification > qualitative attribute > structural edge**

### Blue-Eyebrow / continuous cobalt edge

The Blue-Eyebrow is a valid relational accent for authorized non-hero white sections and multi-cell rails.

Use:

- to mark the upper relationship of a genuine section or continuous rail;
- when the accent joins multiple cells or a complete content relationship.

Do not use:

- on ProductCommerceCard;
- on PDP Section 1;
- as a four-sided border;
- as decorative chrome on every raised plane.

### Quantified metrics

ProductMetricRail has the strongest small-scale cobalt edge treatment because it carries quantified product truth. Metric value and label remain distinct, with cobalt concentrated in the semantic signal rather than used as a filled pill or wallpaper.

### Specifications

Specification rails may use a lighter cobalt edge and joined internal dividers. They communicate classified product information, not the same authority as quantified truth.

### Qualitative attributes

Qualitative attributes use the two-type chip grammar (see CONV-002 addendum above). Default state uses `border/chip` (#D4E0F2) structural edges. A cobalt variant exists for the Selected state only. Qualitative content must not compete with quantified truth.

### Structural borders and embedded dividers

Structural edges use the graduated border hierarchy (see CONV-002 addendum). They clarify containment, cell boundaries or section termination without becoming identity decoration. The hierarchy runs from `border/strong` (#AFC8FF, highest contrast) through `border/outer` (#BECFE9, lowest).

## IV. Adaptive shape grammar

Shape follows semantic scale and composition:

> **chip cells use the tightest curvature → rail containers use a middle curvature → raised planes use the broadest curvature**

This is a proportional relationship, not a fixed radius scale.

Rules:

- Metric, specification and qualitative forms must remain visibly distinct.
- Joined rails should read as one authored object with internal divisions, not a collection of unrelated pills.
- Card and chamber silhouettes may be asymmetric or context-specific when the family relationship remains legible.
- Larger surfaces may carry broader curvature and more gradual transitions.
- MF-01A may explore chip, rail, chamber and plane geometry within these relationships.
- Exact radii are candidate foundation values and must not be promoted by this document.

## V. Spacing and information density

Spacing must serve reading order, containment or rhythm.

Rules:

- Prioritize meaningful proximity between a headline and the object it introduces.
- Prefer information-rich, clearly shaped compositions over large passive voids.
- Use internal padding to protect legibility, not to create an empty stage around ordinary content.
- Adjust spacing by density, viewport and semantic job rather than applying one universal gap.
- Use distinct section and card shapes to carry rhythm before adding more canvas.
- Maintain the minimum customer-readable copy requirements defined by the active Make Constitution.

MF-01A may explore spacing ratios. It does not publish spacing tokens.

## VI. MF-01A/MF-01B application boundary

ProductCommerceCard is the first bounded laboratory for this contract. MF-01A tests canvas, bounded chamber, raised purchase plane, embedded divider, seam, elevation, spacing, metrics, qualitative geometry and actions inside one adaptive family.

MF-01A locks no final surface recipe. It produces three architectural hypotheses and a human relationship selection. MF-01B then tests whether the selected relationships transfer into homepage entry, PDP first fold, embedded evidence and true canvas-split evidence/rail fragments before a champion is formalized.

MF-01A must preserve:

- canvas as active margin and separation around independent cards;
- no canvas gap inside one card between chamber and purchase content;
- bounded chamber outside the PDP Section 1 exception;
- raised white or optically white purchase content;
- stronger authority for metrics than qualitative attributes;
- no Blue-Eyebrow or cobalt perimeter on ProductCommerceCard;
- no deadspacing, cream, broad inverse, blanket grey or technical-OS decoration.

MF-01A may explore:

- surface values within the cool light-mode hierarchy;
- card, chamber, rail and chip geometry;
- shadow character and elevation strength;
- spacing rhythm and information density;
- chamber-to-content transition;
- product grounding and scale;
- context-specific silhouettes and action placement.

The homepage hero, PDP Section 1 and evidence fragments test transfer in MF-01B. They do not expand the sealed MF-01A visual manifest.

## Appendix A — NR-04 observed reference values

The following values are verified observations of the frozen NR-04 native authority. They are not promoted tokens or mandatory Make outputs.

| Observed job | Current expression | Evidence |
|---|---|---|
| Section canvas | `#F7F8FC` | PDP route and section frames |
| G0 canvas variant | `#F5F8FD` | G0 Universal Glue reference |
| Footer surface | `#FCFCFE` with a light structural top edge | Footer `126:350` |
| Raised commerce plane | `#FFFFFF`, approximately 18 px radius, cool shadow | PurchaseRail `202:1235` |
| Bounded media chamber | MF-01A gradient `#F8FBFF→#E4ECFA` diagonal | ProductMediaChamber `202:1165`, MF-01A `626:11821` |
| PDP Section 1 | no plane effects | Hero rail `126:37` |
| Metric cells | heavier cobalt edge, approximately 8 px radius | ProductMetricRail `248:4105` |
| Specification rail | lighter cobalt edge, approximately 10 px radius | ProductSpecificationRail `259:3914` |
| Qualitative rail | blue-shifted structural edge (`#D4E0F2`), approximately 10 px radius | MF-01A `626:11968` |
| Standard section inset | currently 48 px on the referenced desktop PDP | PDP sections under `126:4` |
| Embedded-divider inset | currently wider at 150 px in the referenced composition | Lab Verification section under `126:4` |

`#EDF0F5` is the Figma editor/page surround observed behind the customer-facing frames. It is authoring chrome, not a route surface, candidate token or Make color instruction.

The current raised-plane shadow observed on PurchaseRail is approximately `rgba(15,26,51,0.12)`, 32 px blur and 12 px vertical offset. It is evidence of restrained cool elevation, not a binding recipe.

## Appendix B — Negative and positive evidence

### Positive

- G0 Universal Glue: canvas as margin, varied section silhouettes, dense readable content and cards that create their own elevation.
- PDP Section 4: macro evidence for an editorial intro beside a raised horizontal rail. Its repeated local cobalt hairlines and cobalt perimeters are defects, not authority; only one continuous relational top accent may survive where justified.
- PDP Section 3: directional evidence for embedded dividers inside one continuous evidence composition. Its nested white/elevation wrappers are not final authority.
- LabReports `222:1332`: the cleaner current example of independent raised planes separated by actual canvas.
- MF-01A PNGs: bounded chambers, raised purchase content, quantified metrics and context-specific seams without Blue-Eyebrow.

### Negative

- Current Product Dossier spacing: canvas-like space becomes a passive corridor between the headline stack and the introduced content.
- Lab Verification Canvas Split `188:926`: the white outer wrapper prevents its internal gap from reading as true page canvas; retain the intended split relationship, not the current wrapper.
- White wrappers around already raised white cards: duplicate the surface job and misrepresent the canvas relationship.
- Full-width pale bands outside the PDP first-fold exception: turn structural canvas into decoration.

## Appendix C — CONV-002 complete convergence palette (98 variables)

### Color Primitives (23 variables)

| Variable | Hex | Figma ID |
|---|---|---|
| `neutral/canvas` | `#F7F8FC` | `VariableID:634:3` |
| `neutral/white` | `#FFFFFF` | `VariableID:634:4` |
| `neutral/family` | `#F8FAFC` | `VariableID:634:5` |
| `neutral/media` | `#F0F4FB` | `VariableID:634:6` |
| `blue/cobalt-soft` | `#EEF4FF` | `VariableID:634:7` |
| `blue/border-card` | `#CEDCF1 @92%` | `VariableID:634:8` |
| `blue/border-strong` | `#AFC8FF` | `VariableID:634:9` |
| `blue/border-family` | `#D2E4FF` | `VariableID:634:10` |
| `blue/border-chip` | `#D4E0F2` | `VariableID:824:294` |
| `blue/border-outer` | `#BECFE9` | `VariableID:824:295` |
| `blue/border-identity` | `#BDD0F1` | `VariableID:824:296` |
| `blue/border-inner` | `#B4CAF0` | `VariableID:824:297` |
| `blue/border-family-bg` | `#D9E3F1` | `VariableID:824:298` |
| `ink/primary` | `#141827` | `VariableID:634:11` |
| `ink/secondary` | `#53617D` | `VariableID:634:12` |
| `ink/muted` | `#64718A` | `VariableID:634:13` |
| `ink/inverse-muted` | `#B9C7DD` | `VariableID:634:14` |
| `ink/chip-value` | `#17213F` | `VariableID:824:299` |
| `blue/cobalt` | `#0057FF` | `VariableID:634:15` |
| `blue/interactive` | `#256DFF` | `VariableID:634:16` |
| `blue/focus` | `#0057FF @28%` | `VariableID:634:17` |
| `green/inventory` | `#15803D` | `VariableID:634:18` |
| `green/inventory-soft` | `#ECFDF3` | `VariableID:634:19` |

### Color Semantics (25 variables)

| Variable | Alias target | Figma ID |
|---|---|---|
| `surface/canvas` | `neutral/canvas` | `VariableID:634:21` |
| `surface/card` | `neutral/white` | `VariableID:634:22` |
| `surface/family` | `neutral/family` | `VariableID:634:23` |
| `surface/media` | `neutral/media` | `VariableID:634:24` |
| `surface/cobalt-soft` | `blue/cobalt-soft` | `VariableID:634:25` |
| `surface/inverse` | `ink/primary` | `VariableID:634:26` |
| `border/card` | `blue/border-card` | `VariableID:634:27` |
| `border/strong` | `blue/border-strong` | `VariableID:634:28` |
| `border/family` | `blue/border-family` | `VariableID:634:29` |
| `border/chip` | `blue/border-chip` | `VariableID:824:300` |
| `border/outer` | `blue/border-outer` | `VariableID:824:301` |
| `border/identity` | `blue/border-identity` | `VariableID:824:302` |
| `border/inner` | `blue/border-inner` | `VariableID:838:298` |
| `border/family-bg` | `blue/border-family-bg` | `VariableID:838:299` |
| `text/primary` | `ink/primary` | `VariableID:634:30` |
| `text/secondary` | `ink/secondary` | `VariableID:634:31` |
| `text/muted` | `ink/muted` | `VariableID:634:32` |
| `text/on-inverse` | `neutral/white` | `VariableID:634:33` |
| `text/on-inverse-muted` | `ink/inverse-muted` | `VariableID:634:34` |
| `text/chip-value` | `ink/chip-value` | `VariableID:824:303` |
| `accent/cobalt` | `blue/cobalt` | `VariableID:634:35` |
| `accent/cobalt-interactive` | `blue/interactive` | `VariableID:634:36` |
| `accent/cobalt-focus` | `blue/focus` | `VariableID:634:37` |
| `status/inventory` | `green/inventory` | `VariableID:634:38` |
| `status/inventory-soft` | `green/inventory-soft` | `VariableID:634:39` |

### Dimensions (28 variables)

| Variable | Value | Scope | WEB syntax | Figma ID |
|---|---:|---|---|---|
| `space/1` | `4` | `GAP` | `var(--oluk-space-1)` | `VariableID:634:41` |
| `space/2` | `8` | `GAP` | `var(--oluk-space-2)` | `VariableID:634:42` |
| `space/3` | `12` | `GAP` | `var(--oluk-space-3)` | `VariableID:634:43` |
| `space/4` | `16` | `GAP` | `var(--oluk-space-4)` | `VariableID:634:44` |
| `space/5` | `20` | `GAP` | `var(--oluk-space-5)` | `VariableID:634:45` |
| `space/6` | `24` | `GAP` | `var(--oluk-space-6)` | `VariableID:634:46` |
| `space/8` | `32` | `GAP` | `var(--oluk-space-8)` | `VariableID:634:47` |
| `space/10` | `40` | `GAP` | `var(--oluk-space-10)` | `VariableID:634:48` |
| `space/12` | `48` | `GAP` | `var(--oluk-space-12)` | `VariableID:634:49` |
| `space/16` | `64` | `GAP` | `var(--oluk-space-16)` | `VariableID:634:50` |
| `space/18` | `72` | `GAP` | `var(--oluk-space-18)` | `VariableID:634:51` |
| `space/24` | `96` | `GAP` | `var(--oluk-space-24)` | `VariableID:634:52` |
| `border/width` | `1` | `STROKE_FLOAT` | `var(--oluk-border-width)` | `VariableID:634:53` |
| `divider/width` | `2` | `STROKE_FLOAT` | `var(--oluk-divider-width)` | `VariableID:634:54` |
| `focus/width` | `2` | `STROKE_FLOAT` | `var(--oluk-focus-width)` | `VariableID:634:55` |
| `radius/control` | `8` | `CORNER_RADIUS` | `var(--oluk-radius-control)` | `VariableID:634:56` |
| `radius/chip` | `10` | `CORNER_RADIUS` | `var(--oluk-radius-chip)` | `VariableID:634:57` |
| `radius/metric` | `12` | `CORNER_RADIUS` | `var(--oluk-radius-metric)` | `VariableID:634:58` |
| `radius/compact` | `20` | `CORNER_RADIUS` | `var(--oluk-radius-compact)` | `VariableID:634:59` |
| `radius/vertical` | `24` | `CORNER_RADIUS` | `var(--oluk-radius-vertical)` | `VariableID:634:60` |
| `radius/purchase` | `28` | `CORNER_RADIUS` | `var(--oluk-radius-purchase)` | `VariableID:634:61` |
| `radius/horizontal` | `34` | `CORNER_RADIUS` | `var(--oluk-radius-horizontal)` | `VariableID:634:62` |
| `radius/pill` | `999` | `CORNER_RADIUS` | `var(--oluk-radius-pill)` | `VariableID:634:63` |
| `layout/content-max` | `1344` | `WIDTH_HEIGHT` | `var(--oluk-content-max)` | `VariableID:634:64` |
| `layout/grid-gap` | `20` | `GAP` | `var(--oluk-grid-gap)` | `VariableID:634:65` |
| `layout/gutter-desktop` | `48` | `GAP` | `var(--oluk-page-gutter-desktop)` | `VariableID:634:66` |
| `layout/gutter-tablet` | `32` | `GAP` | `var(--oluk-page-gutter-tablet)` | `VariableID:634:67` |
| `layout/gutter-mobile` | `16` | `GAP` | `var(--oluk-page-gutter-mobile)` | `VariableID:634:68` |

### Typography (22 variables)

| Variable | Value | Scope | WEB syntax | Figma ID |
|---|---:|---|---|---|
| `family/display` | `Plus Jakarta Sans` | `FONT_FAMILY` | `var(--oluk-font-display)` | `VariableID:634:70` |
| `family/body` | `Inter` | `FONT_FAMILY` | `var(--oluk-font-body)` | `VariableID:634:71` |
| `display/xl/size` | `56` | `FONT_SIZE` | `var(--oluk-type-display-xl-size)` | `VariableID:634:72` |
| `display/xl/line` | `60` | `LINE_HEIGHT` | `var(--oluk-type-display-xl-line)` | `VariableID:634:73` |
| `display/xl/track` | `-4` | `LETTER_SPACING` | `var(--oluk-type-display-xl-track)` | `VariableID:634:74` |
| `display/lg/size` | `40` | `FONT_SIZE` | `var(--oluk-type-display-lg-size)` | `VariableID:634:75` |
| `display/lg/line` | `44` | `LINE_HEIGHT` | `var(--oluk-type-display-lg-line)` | `VariableID:634:76` |
| `display/lg/track` | `-3.2` | `LETTER_SPACING` | `var(--oluk-type-display-lg-track)` | `VariableID:634:77` |
| `display/md/size` | `28` | `FONT_SIZE` | `var(--oluk-type-display-md-size)` | `VariableID:634:78` |
| `display/md/line` | `34` | `LINE_HEIGHT` | `var(--oluk-type-display-md-line)` | `VariableID:634:79` |
| `display/md/track` | `-2.4` | `LETTER_SPACING` | `var(--oluk-type-display-md-track)` | `VariableID:634:80` |
| `body/lg/size` | `18` | `FONT_SIZE` | `var(--oluk-type-body-lg-size)` | `VariableID:634:81` |
| `body/lg/line` | `28` | `LINE_HEIGHT` | `var(--oluk-type-body-lg-line)` | `VariableID:634:82` |
| `body/md/size` | `16` | `FONT_SIZE` | `var(--oluk-type-body-size)` | `VariableID:634:83` |
| `body/md/line` | `24` | `LINE_HEIGHT` | `var(--oluk-type-body-line)` | `VariableID:634:84` |
| `body/sm/size` | `15` | `FONT_SIZE` | `var(--oluk-type-body-sm-size)` | `VariableID:634:85` |
| `body/sm/line` | `22` | `LINE_HEIGHT` | `var(--oluk-type-body-sm-line)` | `VariableID:634:86` |
| `label/size` | `13` | `FONT_SIZE` | `var(--oluk-type-label-size)` | `VariableID:634:87` |
| `label/line` | `18` | `LINE_HEIGHT` | `var(--oluk-type-label-line)` | `VariableID:634:88` |
| `eyebrow/size` | `12` | `FONT_SIZE` | `var(--oluk-type-eyebrow-size)` | `VariableID:634:89` |
| `eyebrow/line` | `16` | `LINE_HEIGHT` | `var(--oluk-type-eyebrow-line)` | `VariableID:634:90` |
| `eyebrow/track` | `12` | `LETTER_SPACING` | `var(--oluk-type-eyebrow-track)` | `VariableID:634:91` |

## Review and promotion

This document controls the relationship model for the current Make frontier. It does not promote the appendix values. Exact surface, spacing, radius, stroke and elevation values remain Phase 05 candidates and require later system validation and human promotion.
