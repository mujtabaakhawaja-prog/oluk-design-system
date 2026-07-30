# Session 01A — Product Card Divergence

## Setup

1. Create a fresh Figma Make project.
2. Add `guidelines.md` from this folder to the project guidelines.
3. Copy and attach exactly one Figma frame:
   - File: `yNAyIQhewnbofeZWMGkKVa`
   - Page: `431:2`
   - Frame: `454:171` — `05 — SESSION 01 INPUT / Product Card Creative Frontier`
4. Paste the prompt below.

Do not attach source boards, previous Make outputs, ZIP bundles, or additional reference frames.

## Prompt

```text
Act as a senior visual systems designer.

Your task is divergence, not selection.

Build only one artifact:
an equal-scale comparison board containing five materially different OLUK R6 ProductCommerceCard candidates in GRID context.

Use the attached Session 01 input frame and project guidelines as authority.

CORE PROBLEM

The current product card behaves like a generic stacked commerce tile:
- product media is too small and passive;
- metrics behave like floating boxes or chips;
- price and repeated blue CTAs flatten hierarchy;
- Grid, Featured, and QuickAdd do not yet feel like one authored family;
- stale content has been copied between specimens.

Resolve the Grid primitive first.

LOCKED SEMANTICS

Use the same content in all five candidates:
- MK-2866
- Ostarine
- SARM Series
- 15 MG / STRENGTH
- 90 / SERVINGS
- £43.00 as the display fixture
- Add to Bag
- the governed MK-2866 studio render from the attachment

Do not show Purity in the Grid MetricRail.
Do not replace SERVINGS with CAPS or CAPSULES.
Capsules is FORM and may be omitted in Grid.
Do not invent claims, evidence, statuses, or product fields.

The semantic reading order is fixed:
1. Identity
2. Media
3. Metrics
4. Price
5. Action

The geometry is not fixed.
You may use split, inset, overlap, island, edge-to-edge chamber, or ruled-surface compositions as long as the visual and accessibility sequence remains unambiguous.

CREATE FIVE DISTINCT SPATIAL THESES

Candidate A — Porcelain / Ruled
Typography, rules, and alignment create authority. White-dominant and editorial.

Candidate B — Atmospheric Island
A pale cobalt field creates context; an opaque white functional island carries commerce.

Candidate C — Instrument Panel
The metric system and product chamber feel calibrated, dense, and exact without becoming an evidence dashboard.

Candidate D — Product Object
The studio render establishes scale and presence; whitespace and containment create confidence without lifestyle imagery.

Candidate E — Wildcard
Invent a fifth architecture that obeys every law but is not a cosmetic variation of A–D.

MATERIAL DIFFERENCE IS REQUIRED

The five candidates must differ in:
- boundary architecture;
- media-to-content proportion;
- metric-rail direction and cell geometry;
- identity anchoring;
- price/action relationship;
- density and negative-space strategy.

Changing only color, spacing, radius, or type size is failure.

VISUAL LAWS

- Light mode only
- Zero drop shadow
- Inter only
- Page #F7F8FA
- Surface #FFFFFF
- Soft #F4F7FC
- Atmosphere #EEF4FF
- Text #101114
- Secondary #667085
- Border #D9DEE8
- Accent #0057FF
- Saturated cobalt for the primary action and at most one other semantically meaningful moment
- No border-everything treatment
- No floating metric chips
- No tiny bottle icon
- No full-bleed lifestyle image
- No repeated oversized pill CTA by default
- Any cobalt/red selection or annotation outline that appears while copying the attachment is authoring chrome only; do not transfer any full-container outline or red treatment into candidates

RETURN

1. One comparison board.
2. Card A through Card E at equal scale.
3. The same content and image in every card.
4. One sentence below each card describing its spatial thesis.
5. Neutral candidate labels only.

STOP.

Do not rank, score, shortlist, recommend, merge, or call any candidate a winner.
Do not generate Featured, QuickAdd, tablet, mobile, states, sections, pages, routes, code, or next steps.
```

## Acceptance criteria

Reject the run if:

- fewer than five candidates are returned;
- candidates are cosmetic variations of one shell;
- any candidate changes product truth;
- any candidate omits or duplicates a locked field;
- any field appears in the wrong semantic module;
- any Grid card shows purity as a MetricRail cell;
- servings becomes capsule count;
- the governed bottle render is redrawn, recolored, distorted, or replaced;
- product media remains a tiny icon;
- metrics are floating chips or tags;
- price becomes the dominant element;
- saturated cobalt is used as decoration;
- a drop shadow appears;
- text clips, collides, or becomes illegible;
- cards are not shown at one common 1:1 comparison scale and Grid envelope;
- Make ranks or expands candidates;
- any route, page, responsive specimen, or code is generated.

## Human gate

After the run:

1. Record the Make file/output node IDs.
2. Complete `receipts/SESSION_01A_MAKE_RESULT_TEMPLATE.md`.
3. Review all five against Phase 0.
4. Human may reject all or shortlist up to two.
5. Only shortlisted candidates proceed to Session 01B for Featured, QuickAdd, 1024, 390, and state stress.
