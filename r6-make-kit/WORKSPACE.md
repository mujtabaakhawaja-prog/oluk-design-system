# Olympus R6 Design Workspace

Executable workspace for Figma Agent and Figma Make.
Not documents. Not packets. An executable context that powers design exploration.

## Structure

```
r6-make-kit/
├── WORKSPACE.md              ← you are here
├── guidelines/
│   ├── 00-authority.md       Token binding, typography, spacing, surfaces
│   ├── 01-product-contexts.md Slot contracts, cobalt rules, deprecated patterns
│   └── 02-prohibited.md     Visual language, data integrity, system boundaries
├── fixtures/
│   └── mk-2866.json          Primary governed product fixture
├── prompts/
│   ├── 01-component-evolution.md    Evolve one component
│   ├── 02-section-evolution.md      Evolve one insertion zone
│   ├── 03-responsive-projection.md  Desktop → Tablet → Mobile
│   └── 04-theme-validation.md       Light/Dark parity check
└── parent-templates/
    ├── homepage.md            Locked layout with insertion zones
    ├── pdp.md                 PDP module map
    ├── openlab.md             OpenLab storytelling layout
    └── checkout.md            Checkout (security constraints)
```

## 6 Sources of Context for Make

1. **Published R6 Library** — variables, styles, components, assets (visual authority)
2. **Runtime Parent Templates** — locked layouts with LOCKED/EDITABLE/REPLACEABLE zones
3. **Runtime Studio Snapshots** — current implementation reference (read-only)
4. **ReviewOS Findings** — approved problems to solve
5. **Governed Fixtures** — MK-2866 (primary), RAD-140 (stress), MK-677, MENT
6. **Prompt Library** — official templates only, no ad hoc prompts

## Lane Separation

- **Figma Agent** = design reviewer and systems architect (art director)
- **Figma Make** = visual exploration and generation (visual designer)
- **ReviewOS** = review and approval authority
- **Codex** = implementation authority
- **Runtime Studio** = rendering and verification authority

## Pipeline

```
Figma Agent → Design Brief → Figma Make → Candidates → Champion
→ Runtime Studio → ReviewOS → Codex → Runtime Studio
```

## Sprint Plan

1. Product Surface Laboratory (highest ROI)
2. Semantic Surface Laboratory
3. Mobile Projection Laboratory
4. OpenLab Storytelling
5. Checkout Polish

## Code Connect

Optional — requires Organization/Enterprise seat.
The workspace operates without it. Runtime mappings in parent templates serve the same purpose.

## Figma File

Key: `nMdvVtpTC3r2JQrhyjQ7yW`
Page: [SUPPLEMENTAL] R6 V02 / HOMEPAGE HERO / RANGE HORIZON V01
