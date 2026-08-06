# MF-01A Champion Unification Plan — Softform Arc v4 Correction Pass

**Date:** 2026-08-06  
**Source:** Merged from Figma-agent v3 audit + Codex independent correction plan  
**Frame lineage:** `397:7187` (v1) → `423:10460` (v2) → `431:11167` (v3) → this correction pass (v4)  
**File:** `BEPMuUt1HroEw8xjz8CVyN`  
**Page:** `369:5500`

---

## Reconciliation Summary

This plan resolves seven disagreements between the Figma-agent (visual audit) and Codex (governed architecture) perspectives:

| # | Issue | Figma-Agent Position | Codex Position | Resolution |
|---|-------|---------------------|----------------|------------|
| 1 | Chip token values | Locked: r=8-10, 1px #D4E0F2, DROP_SHADOW b=4 y=2 a=0.06 | Do not lock tokens — these are open creative questions | **Codex wins.** Specify the *treatment intent* (bordered, radiused, subtle elevation, consistent across all chip types). Let Make choose exact values. The intent is the law; the token is Make's creative decision. |
| 2 | Horizontal card content fill | Add MetricRail + keep 4 attribute chips (fill the space) | Do not fill the void with a generic four-chip grid. Use 3 intentional zones. | **Codex wins with amendment.** Adopt the 3-zone model (identity/relationship → quantified truth + one signal → quantity/price/actions). MetricRail is mandatory as part of zone 2 — it carries the quantified truth that distinguishes RAD-140 from MK-2866. But don't just dump a 4-chip grid to fill white space. |
| 3 | Relationship language | Keep "STACKS WELL WITH" | Offer alternatives (Pairs with, Part of your stack, Related product). Ban "Continue protocol." | **Merged.** "STACKS WELL WITH" is the current proven pattern and stays as default. "Continue protocol" is banned. Make may explore the other phrasings as alternatives within the same kicker slot — the pattern (verb + context product name) is the law, not the exact wording. |
| 4 | Interactive states | Add Focus + Added-to-bag (5 states total) | Not mentioned | **Figma-agent wins.** These complete the interactive contract. Codex's silence is omission, not objection. |
| 5 | Relationship-selection export view | Export all 5 densities + 5 states | Detailed spec: labeled crops A–H + "Do not carry forward" strip | **Codex wins.** The labeled-crop export view is the correct MF-01A output artifact. |
| 6 | MF-01B prompt | Said it couldn't be written yet | Provides the full MF-01B prompt | **Codex wins.** MF-01B prompt is included below, gated on MF-01A selection output. |
| 7 | Presentation shadow | Add DirectionShowcase shadow (b=60 y=24 a=0.10) to all card densities | Not mentioned | **Figma-agent wins.** User explicitly requested this. |

---

## RAD-140 Dose Correction

**The correct dose for RAD-140 (Testolone) is 8 MG, not 10 MG.**

All prior prompts, audits, and Make outputs that reference "10 MG" or "10mg" for RAD-140 are incorrect. The v4 correction pass must use:

```
RAD-140 (Testolone) — SARM Series
Strength: 8 MG | Servings: 60 | Purity: >99%
```

This affects:
- The horizontal relationship card's MetricRail (zone 2)
- The horizontal card's identity block
- Any MetricRail or specification slot that references RAD-140
- The correct render must be uploaded to replace the current 10mg render in the frontier

---

## MF-01A Correction Pass — Softform Arc v4

This is a bounded correction pass, not a new frontier. Do not re-explore from scratch. Modify the existing Softform Arc direction only.

### Preserved Laws (Do Not Change)

- Softform Arc plinth media chamber composition (pedestal + ground plate + reflection shelf)
- Card radius system (r=34 primary, r=20 compact) — these are proven relationships, not tokens to re-explore
- Shadow graduation across densities — only add the presentation wrapper shadow as an additional layer
- Typography families (Plus Jakarta Sans ExtraBold display, Inter support)
- Cobalt #0057FF authority color
- Canvas color and page-level layout structure
- Content hierarchy: media chamber → product identity → quantified metrics → quantity/inventory + price → actions

### Banned Actions

- Do not lock token names, spacing tokens, radius tokens or shadow tokens into the correction prompt. Specify treatment intent and let Make choose values.
- Do not fill compositional voids with generic content grids. Every element must earn its space.
- Do not use "Continue protocol" as relationship language.
- Do not explore new directions — this is Direction A (Softform Arc) only.
- Do not add dark mode, responsive variants, or native component reconciliation.
- Do not add runtime behavior, cart logic, payment flow, or API integration.
- Do not run Porcelain, Atmospheric, or Frost as Make themes.
- Do not explore new typography or spacing systems.

### Product Data

**MK-2866 (Ostarine) — SARM Series** (primary product across all densities except horizontal)

```
Strength: 15 MG | Servings: 90 | Purity: >99%
Class: SARM | Form: Capsules | Quality: Lab Formulated | Tested: Third Party
Price: £43 | SKU: 80529-01 | Status: In stock
Evidence: OPENLAB VERIFIED
Bottle render: use assets/product/mk-2866/render-alpha/mk-2866-front-alpha-1x.png
```

**RAD-140 (Testolone) — SARM Series** (horizontal relationship card only)

```
Strength: 8 MG | Servings: 60 | Purity: >99%
Class: SARM | Form: Capsules | Quality: Lab Formulated | Tested: Third Party
Price: £46 | Status: In stock
Evidence: OPENLAB VERIFIED
Relationship context: "STACKS WELL WITH MK-2866"
```

The customer is viewing MK-2866. RAD-140 is the suggestion. The kicker tells the customer why this other product is relevant.

---

### 10 Corrections

#### 1. Add PurchasePanel as 5th card density

Create the PurchasePanel — the elevated purchase card for PDP Section 1 context. It sits on top of a full-width media chamber (the media is behind it, not inside it).

Characteristics:
- Tall and narrow, single-product focus with a complete vertical purchase flow
- Content hierarchy: product identity (SARM SERIES / product name / subtitle) → OPENLAB VERIFIED badge → MetricRail (3 metric chips) → QualitativeChips (4 attribute chips) → size or variant selector → quantity stepper + price → Add to bag (primary cobalt) + View Lab Record (secondary outline)
- Same Softform Arc material: white fill, r=34, stroke consistent with card family
- Highest elevation in the system — it must visually lift above the full-width media chamber it sits on
- Place it as a new section in the DirectionShowcase, labeled "PurchasePanel / PDP Context"

#### 2. Presentation wrapper shadow on all card densities

Each card density section (Vertical, Featured, Compact, Horizontal, PurchasePanel) should sit inside its own presentation wrapper container with a deep soft shadow and subtle stroke — matching the DirectionShowcase treatment already established. This is presentation chrome that frames each card as a material specimen. It is separate from each card's own commerce-context shadow.

#### 3. Standardize all chip containers — consistent bordered treatment

Currently the MetricRail has a border but the QualitativeChips on vertical and featured cards are flat (no radius, no stroke, no container). This is inconsistent.

**Treatment intent:** All chips (MetricRail cells, QualitativeChip cells, horizontal Attribute cells) must use the same bordered container treatment — radiused corners, a subtle blue-grey border, and enough material presence to read as contained elements without competing with the card's own elevation. The MetricRail container keeps its own perimeter; the individual cells inside gain the same chip treatment as horizontal Attributes.

Do not lock specific token values — the intent (bordered, radiused, subtle, consistent) is the constraint. Make chooses the exact radius, stroke weight, stroke color, and optional fill/shadow.

#### 4. All chip and attribute icons → cobalt authority

The horizontal card's 4 attribute icons (Lean Mass Support, Performance Enhancement, Fat Loss Support, Third Party Tested) currently use near-black strokes. Change all icon strokes to cobalt #0057FF to match the system's icon authority (bag icon, lab record icon, stock dot, checkmark glyphs). This applies to:

- Horizontal card attribute icons
- Qualitative chip icons on vertical and featured cards
- Any new icons on the PurchasePanel
- The OPENLAB VERIFIED icon glyph

Cobalt authority scale: metric > specification > qualitative > structural.

#### 5. Compact OPENLAB VERIFIED — reduce congestion

The compact card's content area is vertically tight. Move the OPENLAB VERIFIED badge to sit on the same line as the IN STOCK pill, not as a separate row. One horizontal row: stock status on the left, OPENLAB status on the right. This saves vertical space and reduces congestion. Keep the badge in cobalt #0057FF at a size that doesn't compete with the MetricRail.

#### 6. Qualitative chip label/value visual hierarchy

On the vertical and featured cards, qualitative chips show label + value pairs (e.g. "Class" / "SARM"). Currently the weight difference between label and value is too subtle to scan quickly.

**Treatment intent:** Labels should read as secondary (lighter weight, muted color). Values should read as primary (heavier weight, dark navy). The customer reads the value first. Make chooses the exact weight pairing and colors.

#### 7. Horizontal card — 3 intentional zones (not a content dump)

The horizontal card currently has qualitative attribute chips but is missing the MetricRail. However, the fix is NOT to dump a MetricRail + 4-chip grid into the space. Instead, organize the horizontal card's content area as three intentional zones:

1. **Identity / Relationship zone** — Product identity (RAD-140, Testolone, SARM Series) + relationship kicker ("STACKS WELL WITH MK-2866") + OPENLAB VERIFIED badge
2. **Quantified truth zone** — MetricRail (8 MG STRENGTH | 60 SERVINGS | >99% PURITY) + one intentional qualitative signal (the single most relevant attribute, not all four)
3. **Commerce zone** — Quantity stepper + price (£46) + Add to bag + View Lab Record

The MetricRail is mandatory in zone 2 — it carries the quantified truth that distinguishes RAD-140 from MK-2866. But the surrounding content should be curated, not a copy of the vertical card's full attribute grid.

#### 8. Price-to-action gap — tighten

On the vertical card, the gap between the price (£43) and the "Add to bag" button currently feels loose compared to the rest of the card's rhythm. Tighten proportionally. Apply the same tightening to featured and horizontal cards. The commerce zone should feel decisive, not drifting.

#### 9. Interactive states — complete the contract

The compact card section already shows Default, Hover, and Selected states. Add two more:

- **Focus** — For keyboard/accessibility navigation. Visual: cobalt outline with visible offset from the card edge (gap between card stroke and focus ring). Shadow stays at default level (no lift). Label: "Focus"
- **Added-to-bag** — Transient confirmation state after the customer clicks Add to bag. Visual: button inverts from filled to outlined with a checkmark icon. Card stroke stays at default. Label: "Added"

Arrange all 5 states in a row: Default → Hover → Focus → Selected → Added

#### 10. Relationship kicker — confirmed pattern

The current pattern is correct and must be preserved:

- Render slot shows the suggested product (RAD-140 bottle)
- Relationship kicker reads "STACKS WELL WITH [context product]" — the product the customer is currently viewing (MK-2866)
- Card identity, metrics, and price are all for the suggested product (RAD-140 at 8 MG)
- Do not duplicate the context product's identity inside the card
- "Continue protocol" is banned. Alternative phrasings ("Pairs with", "Part of your stack") may be explored as variants of the same kicker slot

---

### Content Hierarchy — All 5 Densities

```
media chamber
→ product identity (series kicker + product name + subtitle)
→ evidence badge (OPENLAB VERIFIED)
→ quantified metrics (MetricRail: strength / servings / purity)
→ qualitative attributes (class / form / quality / tested)
→ quantity or inventory + price
→ actions (Add to bag + View Lab Record)
```

Not every density carries every slot:

| Slot | Vertical | Featured | Compact | Horizontal | PurchasePanel |
|------|----------|----------|---------|------------|---------------|
| Media chamber | ✓ | ✓ | ✓ | ✓ | ✗ (PDP media is behind) |
| Product identity | ✓ full | ✓ full + SKU | ✓ compact | ✓ full + relationship kicker | ✓ full + SKU |
| OPENLAB VERIFIED | ✓ | ✓ | ✓ inline with stock | ✓ | ✓ |
| MetricRail (3 chips) | ✓ | ✓ | ✓ | ✓ (zone 2) | ✓ |
| QualitativeChips | ✓ (4) | ✓ (4) | ✗ | ✓ (1 signal, not all 4) | ✓ (4) |
| Price + quantity | ✓ | ✓ + stepper | ✗ price only | ✓ + stepper | ✓ + stepper + variant |
| Add to bag | ✓ primary | ✓ primary | ✓ primary | ✓ primary | ✓ primary |
| View Lab Record | ✓ secondary | ✓ secondary | ✗ | ✓ secondary | ✓ secondary |

---

### After This Correction Pass

Do not request an in-run synthesis or a new frontier exploration.

Produce the **MF-01A / Selected Relationships / Export** view (see RESULTS.md template below).

---

## MF-01A / Selected Relationships / Export View Specification

After the v4 correction pass, the human selects relationships to carry forward. The export view must contain:

### Top strip — "MF-01A — Selected Relationships"

Labeled crops of the champion relationships, each tagged with a capital letter:

| Label | Crop | What it proves |
|-------|------|----------------|
| A | Softform Arc plinth composition (pedestal + ground plate + reflection) | Chamber character |
| B | Card-to-card elevation graduation (compact → vertical → featured side by side) | Shadow system |
| C | MetricRail 3-cell geometry at primary scale | Metric container shape |
| D | QualitativeChip bordered treatment (one chip, tight crop) | Chip container law |
| E | Compact card at default state (full card) | Density floor |
| F | Featured card at full height (full card) | Density ceiling |
| G | Horizontal card 3-zone layout | Relationship + curated content |
| H | PurchasePanel at full height | PDP purchase elevation |

### Bottom strip — "Do Not Carry Forward"

Labeled crops of relationships that were explored but rejected, with brief reason annotations.

### Export format

Flatten the entire export view to `mf01a-selected-relationships.png` — this becomes the primary input for MF-01B.

---

## MF-01B Prompt — Cross-Context Surface & Shape Frontier

**Blocked until:** MF-01A selected-relationships export exists and has been human-reviewed.

MF-01B was renamed from "Passive Relationship Transfer" to "Cross-Context Surface & Shape Frontier" because it actively creates and tests macro shapes, not just passively checks whether card relationships survive.

### MF-01B Inputs (when unblocked)

1. `mf01a-selected-relationships.png` — the labeled export from MF-01A
2. `g0-canonical-canvas-rhythm.png` — G0 node `354:5499`
3. `homepage-hero-banner.png` — Runtime Proofs `12:66`
4. `pdp-section-1-fullfield.png` — Final-Design `126:37`
5. `lab-verification-embedded.png` — Final-Design `188:450`
6. `labreports-canvas-split.png` — Final-Design `222:1332`

### MF-01B Tests

1. **Homepage entry silhouette** — Does the card family's elevation, radius, and material language compose with a hero banner without colliding?
2. **PDP flat atmosphere + raised purchase plane** — Can the PurchasePanel sit on top of a full-field atmospheric media zone and still read as elevated?
3. **Connected embedded-divider evidence object** — Do the chip treatments and cobalt authority scale survive inside a joined evidence composition (like Lab Verification)?
4. **True canvas-separated editorial/rail composition** — Do the cards compose in a rail below a canvas-separated editorial section (like LabReports)?

### MF-01B Does NOT

- Build complete routes or pages
- Use native Figma nodes (those enter in MF-02)
- Synthesize a champion (that's MF-02)
- Test responsive reflow (that's MF-09)
- Make runtime claims

---

## Corrected Run Order

| Run | Purpose | Gate |
|-----|---------|------|
| **MF-01A** | ProductCommerceCard Material Relationship Frontier | Select relationships; do not synthesize |
| **MF-01A.v4** ← YOU ARE HERE | Correction pass (this document) | Human review of corrected cards |
| **MF-01B** | Cross-Context Surface & Shape Frontier | Human transfer decision |
| **MF-02** | Adaptive ProductCommerceCard champion; native nodes enter | Human card-family approval |
| **MF-03** | Homepage composition | Homepage opening approval |
| **MF-04** | PDP composition | PDP relationship approval |
| **MF-05** | Dossier and evidence transition | Evidence-transition approval |
| **MF-05A** | Decision Surfaces (comparison, bundle, stack builder, goal-led discovery) | Decision surface approval |
| **MF-06** | OpenLab and LabReports | OpenLab approval |
| **MF-07** | Image-light transaction | Transaction approval |
| **MF-08** | Selective native reconciliation | Deviation audit |
| **MF-09** | Responsive and local visual behavior | Responsive/state approval |
| **MF-10** | Cross-route convergence and Make Design Gate | Make Design Gate |

**Decision Surfaces** are deferred to MF-05A (after MF-05, before MF-06). They require the card family grammar AND the evidence/dossier transition to be proven before meaningful comparison, bundle, stack builder, and goal-led discovery compositions can be tested. They are not part of MF-01A or MF-01B.

---

## Repo Artifacts to Produce

After the v4 correction pass and human review:

| Artifact | Path | Content |
|----------|------|---------|
| This plan | `make-sessions/session-01-product-card/CORRECTION-PASS.md` | ✅ This document |
| Results | `make-sessions/session-01-product-card/RESULTS.md` | Human-selected relationships, rejected relationships, transfer rules |
| Export PNG | `make-sessions/session-01-product-card/assets/mf01a-selected-relationships.png` | Flattened export view with labeled crops A–H |
| Corrected render | `make-sessions/session-01-product-card/assets/product/rad-140/render-alpha/` | RAD-140 at 8mg (replacing any 10mg render) |

---

## RESULTS.md Template (to be populated after human review)

```markdown
# MF-01A Results — Selected Relationships

**Date:** [after v4 review]
**Reviewer:** [human]

## Selected Relationships (Carry Forward to MF-01B)

### A — Chamber character
[Description of the selected plinth composition relationship]

### B — Elevation graduation
[Description of the selected shadow system]

### C — Metric geometry
[Description of the selected MetricRail container shape]

### D — Chip container law
[Description of the selected bordered chip treatment]

### E — Density floor (Compact)
[Description of the compact card relationship]

### F — Density ceiling (Featured)
[Description of the featured card relationship]

### G — Horizontal 3-zone layout
[Description of the curated horizontal content model]

### H — PurchasePanel elevation
[Description of the PDP purchase plane relationship]

## Rejected Relationships (Do Not Carry Forward)

[List with brief reason for each rejection]

## Transfer Rules

- Chamber character: [rule]
- Seam/divider behavior: [rule]
- Elevation progression: [graduated shadow table]
- Card silhouettes: [radius system]
- Metric geometry: [MetricRail shape and treatment]
- Chip container law: [bordered treatment intent]
- Density and action hierarchy: [dual action → single action → relationship kicker]
- Relationship language: [confirmed pattern]
- Cobalt authority scale: metric > specification > qualitative > structural
- Interactive state contract: Default → Hover → Focus → Selected → Added
```
