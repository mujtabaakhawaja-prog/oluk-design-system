# Prompt Template 01 — Component Evolution

## Context
- Current component (published R6 variant)
- Parent template (locked page layout with insertion zones)
- Runtime screenshot (current implementation from Runtime Studio)
- Published R6 library (variables, styles, components)
- Governed fixture (MK-2866 or RAD-140)

## Goal
Generate 3 materially different candidates for the target component.
Select one champion. Explain why.

## Constraints
- Do not modify parent geometry
- Do not invent tokens — use only published R6 variables
- Do not invent product data — use governed fixtures only
- Do not invent evidence values — use fixture lab data only
- Reference only published component variants
- Return only component-level changes

## Deliverables
- Champion candidate
- Runner-up candidate
- Rejected candidate(s) with documented reason
- List of published variables/components used
- MAKE_RESULT receipt (ReviewOS annotation format)

## Return Path
Champion → Runtime Studio → ReviewOS → Codex
