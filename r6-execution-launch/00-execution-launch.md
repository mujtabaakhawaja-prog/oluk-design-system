# R6 Execution Launch — Closure

**Date:** 2026-07-26  
**Status:** Architecture frozen; execution active.

This file is the operational index. It replaces no design authority and creates no
new governance layer.

## Verified source state

- Figma authority nodes are present:
  - Range Horizon: `1420:812`
  - Featured Controller candidates: `1580:77642`
  - R6 Execution Order: `1590:17`
  - Olympus Design Workspace: `1593:17`
- `oluk-design-system` launch base: `4e8212bb207883436d0bd09da2b1921ad6fcb2fc`
- Runtime systemization head: `dacfb0f2472b7888dd64f9d642867ad91b1a4b77`
- ReviewOS source head: `9c9564337af65fed3ee51dd24c58afeb2d4e2df2`
- ReviewOS source commits, in order:
  1. `09da3302a2d027ef18dc98167103235e60643d46`
  2. `e712691850e67a60f6d555a65ce9888bdc4cd30f`
  3. `d368ba1670a918aeab2f561e304ea3ba967eb598`
  4. `9c9564337af65fed3ee51dd24c58afeb2d4e2df2`
- Forward-integration branch: `codex/r6-reviewos-forward-integration`
- Forward-integration head: `0c35d6f46068daf5a12e1134d7f5244f7de22b0d`
- Draft PR: `#1007` — open, mergeable, held for human review

## Canonical loop

```text
Figma Agent prepares one bounded run
→ Figma Make generates or refines candidates
→ Figma Agent recommends
→ Human promotes
→ Codex implements the promoted candidate
→ Runtime Studio renders it
→ ReviewOS Accept / Revise / Reject
→ Codex closes the accepted correction
```

There is no pre-code ReviewOS runtime gate. ReviewOS reviews an implemented runtime
candidate. The pre-code gate is Figma Agent recommendation plus human promotion.

## Start now, in parallel

### Lane A — ReviewOS acceptance + Codex duplicate-lane closure

Use `03-codex-prompt.md`.

```text
Freeze the still-running competing integration session
→ obtain its exact branch/head/diff receipt
→ compare it with PR #1007
→ preserve no duplicate visual or ReviewOS mutation automatically
→ run human integration acceptance against 4475
→ Accept / Revise / Reject PR #1007
```

Do not include any unpromoted Featured Controller placement.

### Lane B — Figma Design Agent

Use `01-figma-agent-prompt.md`.

```text
Validate Make allowlist
→ validate parent templates and composition trees
→ validate MK-2866 and RAD-140 fixtures
→ issue Run 01A
→ return READY_FOR_MAKE
```

## Product Surface Laboratory run order

Run one insertion zone at a time in the same Make project:

### Wave 1 — Commerce

1. `01A` ProductGrid
2. `01B` QuickAdd / Treatment C
3. `01C` Featured Controller — preserve existing A/B/C history

### Wave 2 — PDP and evidence

4. `01D` PDP PurchasePanel
5. `01E` LabReportPanel
6. `01F` Fold-Out Dossier

### Wave 3 — Related + final matrices

7. `01G` Related Products / Treatment C
8. Cross-context state, responsive, theme-parity, and decision receipts

Do not generate the Cartesian product of every candidate × viewport × theme ×
state. Explore A/B/C at default, project the recommended candidate and runner-up,
then state-test only the recommended candidate using context-appropriate states.
The exact contract is in `02-figma-make-prompt.md`.

## Promotion gates

```text
MAKE_RESULT
+
FIGMA_AGENT_CHAMPION_RECEIPT
+
HUMAN_PROMOTION_RECEIPT
=
Codex implementation authority
```

Make may assign only `RECOMMENDED_CANDIDATE`. The Figma Agent recommends. The
human promotes. Production approval remains separate.

## Sprint order

```text
Product Surface Laboratory
→ first promoted component completes the full runtime loop
→ Semantic Surface Laboratory
→ Mobile Projection Laboratory
→ OpenLab Storytelling Laboratory
→ Checkout Polish
```

## Hard stops

- No second independent ReviewOS forward-integration lane or PR.
- No unpromoted Featured Controller implementation.
- No invented product, price, purity, evidence, report, or asset data.
- No Make-to-code path.
- No public ReviewOS exposure.
- No weakening of local-only persistence, same-origin framing, or HTTP `423`.
- No merge, deployment, infrastructure, schema, payment, or security change without
  explicit human approval.
