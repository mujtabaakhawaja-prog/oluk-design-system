# Prompt Template 03 — Responsive Projection

## Input
Desktop module (1440px) — the champion from Sprint 1 or Sprint 2

## Output
Generate compact projections at:
- 1024px (tablet)
- 768px (small tablet)
- 390px (mobile)

Using published responsive variants from the R6 library.

## Constraints
- No hidden functionality — everything visible on desktop must be accessible on mobile
- No duplicated components — reuse published variants
- Each breakpoint is a purpose-built projection, not a scaled-down desktop
- Use published layout tokens for spacing (frozen scale: 2·4·8·12·16·24·32·48·64·80·120)
- Preserve product identity hierarchy: Compound → Alias → Metrics → Price → Classification → CTA

## Deliverables
- 3 breakpoint variants per module
- Documented layout decisions per breakpoint
- MAKE_RESULT receipt

## Return Path
Champion projections → Runtime Studio → ReviewOS → Codex
