# Olympus Labs UK — Adaptive Surface and Material Contract

**Status:** Accepted relationship authority; MF-01A/MF-01B are complete and their selected relationships carry into MF-03
**Evidence state:** Extracted from frozen NR-04 native compositions, later live-node verification, and the G0 Universal Glue reference
**Applies to:** Light-mode design convergence, including the active MF-03 Codex Sites lane
**Does not authorize:** Foundation promotion, token publication, native Figma mutation, runtime implementation, or production release

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
- may use a white-to-ice atmosphere, product-local cobalt and contact grounding;
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

The footer is a quiet terminal plane. It uses the lightest structural edge needed to close the page without becoming an inverse slab.

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

Specification rails may use a lighter cobalt edge and joined internal dividers. They communicate classified product information, not the same authority as quantified metrics.

### Qualitative attributes

Qualitative attributes use quieter blue-shifted structural edges by default. A cobalt variant may exist for an explicitly selected or emphasized state, but qualitative content must not compete with quantified truth.

### Structural borders and embedded dividers

Structural edges are the lightest and least saturated. They clarify containment, cell boundaries or section termination without becoming identity decoration.

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
| Bounded media chamber | current peer elevation and structural edge | ProductMediaChamber `202:1165` |
| PDP Section 1 | no plane effects | Hero rail `126:37` |
| Metric cells | heavier cobalt edge, approximately 8 px radius | ProductMetricRail `248:4105` |
| Specification rail | lighter cobalt edge, approximately 10 px radius | ProductSpecificationRail `259:3914` |
| Qualitative rail | blue-shifted structural edge, approximately 10 px radius | Transparent-Chips `252:5801` |
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

## Review and promotion

This document controls the relationship model for the current Make frontier. It does not promote the appendix values. Exact surface, spacing, radius, stroke and elevation values remain Phase 05 candidates and require later system validation and human promotion.
