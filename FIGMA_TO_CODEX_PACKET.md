# FIGMA_TO_CODEX_PACKET

> **Generated**: 2026-07-21 | **Updated**: 2026-07-22
> **Source**: Figma AI Agent
> **Status**: FIGMA DESIGN SYSTEM COMPLETE — PENDING RUNTIME CONFIRMATION BY CODEX
>
> "Completed in Figma" means the design authority exists with correct variable bindings, variant matrices, and component architecture. It does NOT mean the runtime/production implementation is complete. Runtime status is tracked separately and requires Codex confirmation.

---

## Packet Header

```
FIGMA_TO_CODEX_PACKET
File: nMdvVtpTC3r2JQrhyjQ7yW
Page: ALL (67 pages)
Selection: Complete design system
Goal: Implement OLUK design system as CSS custom properties + React/SSR components
Observed design truth: 40 component sets, 52 G1 semantic color variables (light+dark), 25 layout tokens, 38 active text styles, 65,392 variable bindings
Open questions: NONE — all 28 Codex questions answered (see CODEX-28-ANSWERS.md)
Implementation constraints: SSR-first; components map 1:1 to React; checkout lifecycle multi-currency (GBP/USD/EUR)
Required Codex action: Execute CODEX-RUN-ORDER; confirm runtime parity per component
Acceptance checks: Listed per task in CODEX-RUN-ORDER.md
Risk notes: Dark mode aliases resolve to other variables (not raw RGBA) — CSS must use var() chains
Next action: Codex confirms runtime status per component against this Figma authority
```

---

## Corrected Design System Inventory

### G1 Semantic Color Variables: 52 total

Collection: `G1 Semantic Aliases V02` (VariableCollectionId:738:2248)
Modes: Light (738:2) | Dark (738:3)

| Category | Count | Variables |
|---|---|---|
| Core Surface & Canvas | 4 | canvas, surface/primary, surface/media, surface/evidence-tint |
| Text Hierarchy | 3 | text/primary, text/secondary, text/technical |
| Accent & Action | 5 | accent/primary, action/cta, action/on-cta, action/hover, action/pressed |
| Danger Actions | 4 | action/danger, danger-hover, danger-pressed, on-danger |
| Border & Rail | 5 | border/accent, border/neutral, rail/divider, rail/title, rail/definition |
| Evidence & Proof | 3 | proof/marker, silver, focus/ring |
| Stock State | 3 | low-stock, out-of-stock, pending |
| Semantic State | 5 | success, warning, error, info, neutral |
| Brand Source | 5 | current, express, olympus, brand-blue, brand/blue |
| Status Intents | 15 | 5 intents x 3 (surface/text/marker) |
| **Total** | **52** | |

**Note:** `state/stock` (VariableID:519:898) lives in Closeout G1 (VariableCollectionId:518:817) — legacy token, replaced by `state/success`.

### Layout Tokens: 25 total

Collection: `OLUK Layout Tokens` (VariableCollectionId:1234:72750)
11 spacing + 6 radius + 8 padding = 25

### Total Governed Variables: 77 (52 color + 25 layout)

### Component Sets: 40 total

See COMPONENT-REGISTRY.md for full details.

| Location | Sets | Variants |
|---|---|---|
| PDP Champion (1167:180) — Primitives | 5 | 94 |
| PDP Champion (1167:180) — PDP Commerce | 8 | 52 |
| BRIDGE (1195:7097) — OL/Commerce | 24 | 596 |
| System | 3 | 23 |
| **Total** | **40** | **765** |

### Text Styles: 38 active (53 deprecated)

See TYPOGRAPHY-SCALE.md for full details.

| Group | Count | Font |
|---|---|---|
| OLUK G1/Type (foundation) | 14 | Plus Jakarta Sans + Inter |
| OLUK/* Commerce | 24 | Inter |
| Inter Tight | 0 styles | Runtime discretion only |

---

## CODEX-RUN-ORDER — Deterministic Execution Sequence

> Execute in exact order. Each task depends on prior tasks completing.
> All CSS custom properties must use `var()` with fallback values.
> SSR-first: tokens render server-side, no FOUC.

### Phase 1: Token Layer (CSS Custom Properties)

**Task 1.1: G1 Color Tokens -> CSS Custom Properties**
```
Priority: P0 — BLOCKING
Action: Create CSS custom properties for all 52 G1 color variables
Format: --oluk-{token-path}: {light-value};
Dark mode: @media (prefers-color-scheme: dark) { :root { ... } }
Acceptance: All 52 variables mapped; dark mode toggle works; no hardcoded colors
```

**Task 1.2: Layout Tokens -> CSS Custom Properties**
```
Priority: P0 — BLOCKING
Action: Create CSS custom properties for all 25 layout tokens
Acceptance: All spacing, radius, padding tokens available as CSS vars
```

**Task 1.3: Typography Scale -> CSS + Utility Classes**
```
Priority: P0 — BLOCKING
Action: Create CSS for all 38 active text styles
Fonts: Plus Jakarta Sans Variable (display), Inter Variable (interface), Inter Tight Variable (condensed)
Acceptance: All 38 styles renderable; font-display: swap
```

### Phase 2: Component Library (React/SSR)

See CODEX-RUN-ORDER.md for full task breakdown.

### Phase 3-5: Page Compositions, Commerce Wiring, Production Readiness

See CODEX-RUN-ORDER.md for full task breakdown.

---

## Runtime Status Classification

See CODEX-RUNTIME-STATUS.md for the current GREEN/PENDING matrix as reported by Codex.

---

## Session Metrics (Corrected)

| Metric | Value |
|---|---|
| Total variable bindings | 65,392 |
| Pages in file | 67 |
| Component sets (all) | 40 |
| Commerce variants (BRIDGE) | 596 |
| G1 color variables | 52 |
| Layout tokens | 25 |
| Total governed variables | 77 |
| Active text styles | 38 |
| Deprecated text styles | 53 |
| Font families | 3 (PJS, Inter, Inter Tight) |
| Phases completed (Figma) | A-K + P0-P3 |