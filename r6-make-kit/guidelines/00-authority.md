# R6 Make Authority Rules

## Imports
Use only `@olympus/r6-ui` exports. No raw HTML elements for anything the design system covers.

## Theme Parity
Every Make experiment must render Light AND Dark. If a component does not support both modes, flag it — do not fake a second theme.

## Token Binding Targets
- **Semantic colors:** OLUK / Semantic / Closeout G1 (VariableCollectionId:518:817) — Light (518:1) + Dark (518:2)
- **Layout tokens:** OLUK / Layout Tokens (VariableCollectionId:1234:72750)
- **Typography:** OLUK G1 / Type styles (14 styles) + OLUK commerce-specific (24 styles)
- **Elevation:** Closeout G1 Elevation styles

## Typography Rules
- **Display / H1 / H2 / Metric:** Plus Jakarta Sans
- **Everything else:** Inter
- Never mix. Never substitute.

## Frozen Spacing Scale
`2 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 120`

No intermediate values. No calc() interpolation.

## Surface Rhythm
Canvas → Surface → Raised → Evidence. Never skip a level. Media chambers are independent of the surface stack.

## Component Lifecycle
Every published component exposes: Candidate → Champion → Deprecated → Compatibility → Archived.

## Consumer Graph
Every component maps to its page consumers: Homepage, Collection, Search, Related Products, QuickAdd, Compare, Bundle, PDP recommendations.

## Return Path
Every Make experiment must return through Runtime Studio and ReviewOS before Codex implementation. ReviewOS → Make → ReviewOS → Codex.

## Code Connect
Optional — requires Organization/Enterprise seat. Not foundational. The workspace operates without it.
