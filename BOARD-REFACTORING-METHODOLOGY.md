# OLUK R6 — Board Refactoring & Redesign Methodology V2

> **Date**: 2026-07-22 (revised after Codex reconciliation)
> **Status**: METHODOLOGY — NOT YET EXECUTED
> **Constraint**: Additive mutation policy — historical boards are never deleted, only annotated
> **Corrected Baseline**: 39 active sets / 712 variants / 52 G1 vars / 25 layout tokens / 38 text styles / 48 glyphs / 67 pages

---

## 0. What Changed in V2 (Post-Codex Reconciliation)

Codex performed a read-only reconciliation and identified several arithmetic errors in V1. All are accepted and corrected:

| Metric | V1 (Wrong) | V2 (Corrected) | Source |
|---|---|---|---|
| Bridge variants | 596 | **552** | Live evaluate_script count |
| PDP variants | 52 | **57** | Live count |
| System variants | 23 | **9** | Live count |
| Primitive sets | 5 | **4** | StatusChip V02 deprecated |
| Primitive variants | 94 or 104 | **94** | V02 excluded |
| Active component sets | 40 | **39** | V02 excluded |
| Active variants total | 765 | **712** | Sum verified |

Additionally:
- Variable classification now distinguishes direct runtime (42), indirect semantic (15), operative brand (1), and documentation-only (4)
- Dark mode source law clarified: 20 aliases + 32 raw values, both intentional
- Frontend backend leakage identified as hard promotion blocker
- CommerceTrustRail is a runtime assembly, not a component set
- Code Connect is not an acceptance requirement

---

## 1. Problem Statement

(Same as V1 — 67 pages, many predate G1, contain inline colors/typography/layouts, mixed authority levels, stale content)

---

## 2. Page Classification Taxonomy

(Same as V1 — 7 tiers from CHAMPION through ANCESTOR)

---

## 3. Per-Board Refactoring Playbook

### Phase 0: Audit (Read-Only) — UPDATED

Now includes:
```
0.8  Verify component variant counts mechanically (children.length)
      — NEVER trust handwritten totals
      — NEVER carry forward a count from a prior session without re-verification
0.9  Check for deprecated component sets (e.g. StatusChip V02)
      — Mark with [DEPRECATED] prefix
      — Exclude from active counts
0.10 Classify variables: direct runtime / indirect semantic / documentation-only
```

### Phase 1-6: (Same structure as V1)

### Phase 5: Content Correction — UPDATED

```
5.1  CORRECTED stale counts (use these, not V1):
      - G1 color variables: 52 (48 runtime + 4 doc-only)
      - Layout tokens: 25
      - Total governed: 77
      - Active component sets: 39
      - Active variants: 712
      - Bridge variants: 552
      - PDP variants: 57
      - Primitive variants: 94 (StatusChip V02 deprecated)
      - System variants: 9
      - Button: 60 (icon slots are properties)
      - StatusChip: 12 (V02 deprecated)
      - Text styles: 38 active, 53 deprecated
      - Semantic glyphs: 48
      - Pages: 67
5.2  Status language: "FIGMA COMPLETE — PENDING RUNTIME CONFIRMATION"
5.3  Add [DEPRECATED] prefix to StatusChip V02 (1213:1601)
5.4  Fix any "all Dark values must be aliases" language
      — Correct: 20 aliases + 32 raw values, both intentional
5.5  Fix any "all 52 mandatory" language
      — Correct: 48 runtime + 4 documentation-only
```

---

## 4. Execution Priority Order

(Same 4 waves as V1, with corrected counts in quality gates)

---

## 5. Integration with Codex Implementation Plan

The board refactoring methodology now aligns with Codex's 8-phase implementation plan:

| Codex Phase | Figma Refactoring Dependency |
|---|---|
| Phase 0: Authority manifest | Board refactoring provides the verified source data |
| Phase 1: Clean successor branch | No Figma dependency |
| Phase 2: Tokens + typography + icons | Variable Registry + Typography Scale must be corrected first |
| Phase 3: Component registry | Component Registry must reflect 39/712 |
| Phase 4: Frontend boundary sanitization | No direct Figma dependency (runtime-only) |
| Phase 5: Governed data wiring | PDP specimens (including new OpenLab-unavailable) must exist |
| Phase 6: Evidence generation | Refactored boards provide clean capture surfaces |
| Phase 7: Review + promotion | Registrar frames on Champion pages document approval status |

### Figma Actions Required Before Codex Can Proceed

1. ~~Build OpenLab-unavailable PDP specimen~~ (to build)
2. ~~Rename StatusChip V02 with [DEPRECATED] prefix~~ (to do)
3. Ensure all Champion pages have correct registrar frames with 39/712 counts
4. Update BRIDGE page registry to show 552 (currently shows 596)

---

## 6. Arithmetic Verification Law

Added in V2 based on Codex feedback:

> **No handwritten master total may appear in any document without a mechanically verifiable breakdown that sums to that total.**

Every document that claims a total must include:
1. The individual rows that sum to it
2. A verification line: `Verification: X + Y + Z = Total ✓`
3. The method used to obtain each row count (e.g., `children.length` via `evaluate_script`)

Previous totals that failed this law:
- 596 (rows summed to 552)
- 765 (rows summed to 712 or 722 depending on V02 status)
- 23 system variants (rows summed to 9)
- 52 PDP variants (rows summed to 57)

---

## 7. Quality Gates — UPDATED

After each page refactoring, verify:

- [ ] No inline colors that have a G1 equivalent
- [ ] All production-authority text nodes use OLUK text styles
- [ ] Consistent naming: `[TYPE] Name / Variant` pattern
- [ ] Registrar frame present with **mechanically verified** counts
- [ ] No stale counts — use 39/712 baseline
- [ ] No contradictory variable classification language
- [ ] No "all Dark values must be aliases" language
- [ ] Deprecated components marked with [DEPRECATED] prefix
- [ ] StatusChip V02 excluded from all active counts
- [ ] Frames grouped into sections with consistent spacing
- [ ] Page name reflects classification
- [ ] Screenshot captured for before/after comparison

---

## 8. Estimated Effort (Same as V1)

| Wave | Pages | Est. Effort |
|---|---|---|
| Wave 1: Champions | 10 | 3-4 hours |
| Wave 2: Standalone | 4 | 1-2 hours |
| Wave 3: System Boards | 21 | 2-3 hours |
| Wave 4: Annotation | 28 | 30 min |
| **Total** | **63** | **7-10 hours** |
