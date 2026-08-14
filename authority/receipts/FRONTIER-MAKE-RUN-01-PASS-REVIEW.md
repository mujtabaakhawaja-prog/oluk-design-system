# Frontier Make Run 01 — First Pass Review

- Date: 2026-08-14
- Branch: `codex/oluk-full-site-reference`
- Figma surface: `1200:34256`
- Current-product strip: `1200:34285`
- Decision: `CORRECTION_REQUIRED · DO_NOT_PROMOTE`

## What worked

- The supplied RAD-140, MENT and MK-677 renders are used without substitution.
- The cool luminous material family, bounded media chambers and three-card desktop rhythm are directionally useful.
- RAD-140 remains 8 MG.
- Selected state, local Add interaction, price and direct product actions are visible.

## Why the pass is not acceptable

The page behaves like an internal design-programme demo rather than a customer upsell surface. It exposes `MF-01A`, `Card frontier`, `Icon library`, `Decision surfaces` and other review navigation. The proposition uses internal language—`research route`, `testing language`, `direct route to product detail` and `Keep the product decision clear`—instead of explaining what each recommendation adds to the stack.

The recommendation context is also misallocated. `In stock` plus evidence-state chips answer product availability/provenance questions but do not explain relevance to MK-2866. This module needs pairing role, format and stack-direction language.

## Component defects confirmed from Figma readback

1. `1200:34285` renders `Ostarine · 15 MG · 90 SERVINGS` as plain inline text. The correction uses three raised, two-level QualitativeChip relationships derived from `733:17342`.
2. Make duplicated MetricRail semantics by rendering values such as `60 SERVINGS` above a second `SERVINGS` label. Canonical MetricRail `733:95` renders `60` as the value and `SERVINGS` as the label.
3. The generated rail fixes three columns around 101px and forces 18px no-wrap values, making overlap inevitable. The corrected contract adds `min-width:0` and deterministic short/medium/long value fitting without shrinking labels or the entire rail.

## Corrective execution

- Existing Make session correction: `make-sessions/frontier-site-expansion/runs/01-canonical-your-stack/CORRECTION-PROMPT.md`.
- New-run source: updated `PROMPT.md`, `product-data.json` and `app.tsx` in the same run folder.
- Updated reference proofs:
  - desktop: `fab3e347e8d6e8530e7a8656e78be0ec505ea47151484b9da799de200e695b27`
  - mobile: `43fd9838b183852c7ac6ba988f76c9aaab566cc5d7a660ba006f507b21b8ce88`

## Promotion gate

Do not promote `1200:34256` or derive a Page 09 component from it. Re-run the correction in the existing Make session, then review the corrected 1440 and 390 customer frames. The next review checks production copy, canonical chip instances, MetricRail separation/fitting, one-decision-at-a-time mobile composition and removal of every internal programme label.
