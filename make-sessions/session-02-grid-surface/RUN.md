# MF-02A — Run 2 Procedure

## Pre-Run Checklist

- [x] Phase 1 Foundation Corrections complete (all 5 card densities componentized, compact card 5-state variants wired, typography consistent)
- [x] Run 1 complete — Direction C champion baseline selected
- [x] Hero decision surface wrapper created (native frame `462:6144`)
- [x] TrustEvidenceSpine colors updated to surface contract (19 instances fixed)
- [x] 9 native frames verified in source Figma file (`BEPMuUt1HroEw8xjz8CVyN`)
- [ ] surface-contract.md reviewed (repo: `authority/surface-contract.md`)
- [ ] Run 1 RESULTS reviewed and corrections integrated

## Input Preparation

### Native Frame Copy (9 frames — ALL native, zero PNGs)

Copy each native frame from the source Figma file and paste into the Make project. Native frames carry full layer structure, typography, spacing, fills, strokes, shadows, and component relationships — providing Make with higher-fidelity structural authority than rasterized PNGs.

| # | Source Component | Node ID | Page | Dimensions |
|---|---|---|---|---|
| 1 | ProductCommerceCard / Vertical | `486:4634` | MF-01 and MF-02 | 481×916 |
| 2 | ProductCommerceCard / Featured | `486:4635` | MF-01 and MF-02 | 481×896 |
| 3 | ProductCommerceCard / Horizontal | `486:4636` | MF-01 and MF-02 | 1060×542 |
| 4 | ProductCommerceCard / Compact (full set) | `486:4642` | MF-01 and MF-02 | 302×382 per variant |
| 5 | PurchasePanel | `478:10367` | 03 Identity Authority | 420×687 |
| 6 | PDP Section 1 — PurchasePanel Control Test | `480:4503` | MF-01 and MF-02 | 1440×879 |
| 7 | LIVE / TrustEvidenceSpine | `475:9098` | 03 Identity Authority | 1440×851 |
| 8 | Dossier / Native Light VNext (Focus=Product) | `198:1292` | 03 Identity Authority | (see component) |
| 9 | Homepage Hero Container | `462:6144` | HOMEPAGE HERO | 1384×780 |

**Copy procedure:** Select the component in the source file → Cmd/Ctrl+C → Switch to the Make project → Cmd/Ctrl+V. Each frame arrives with its full layer tree intact.

**Important:** The Homepage Hero Container (`462:6144`) is the native two-fold structure with Left Container (decision surface) and Right Container (media chamber). Make must decompose this structure — it is NOT a flat image.

## Make Session Setup

### Step 1: Plan Mode

1. Open the existing Make project or create new: `OLUK — MF-02A Grid Surface & Card Elevation Frontier (Run 2)`
2. Paste the 9 native frames into the Make canvas
3. Set Make to **Plan mode** (not Build)
4. Paste the entire contents of `PROMPT.md` verbatim
5. Submit and review the plan Make proposes
6. Verify the plan covers all 6 compositions: Hero, Grid, PDP Section 1, Dossier, Evidence, Related/Upsell Rail
7. Verify the plan respects the surface and spacing laws
8. Verify the plan references the native frames as structural authority
9. Verify the plan includes BOTH hero variants (Variant A sectioned surface + Variant B 2-fold vertical card)
10. Verify the plan uses Direction C's planar language as the baseline philosophy
11. Verify the plan doesn't introduce rejected elements
12. If the plan is acceptable, approve it

### Step 2: Build Mode

1. Switch to **Build mode**
2. Let Make generate the three directions
3. Do NOT request mid-run corrections or additional directions
4. Wait for all three to complete

### Step 3: Review

1. Reject any direction that violates the prompt's reject list
2. Score each direction per composition:
   - Hero entry: Does the two-fold structure work? Is Variant B (2-fold card) present? Do embedded dividers read correctly?
   - Grid: Is spacing tight? Does elevation graduation read? No right-side deadspace?
   - PDP Section 1: Is the left container filled? Does PurchasePanel elevate cleanly?
   - Dossier: Is deadspacing eliminated? Does it connect to Section 1? No right-side deadspace?
   - Evidence: Does cobalt authority survive inside the evidence context?
   - Related/Upsell: Does canvas split work? Is rhythm purposeful?
3. Record per-composition verdicts in this format:

```
Composition | Dir A | Dir B | Dir C | Notes
Hero        | ...   | ...   | ...   | Which variant? A/B? Divider color?
Grid        | ...   | ...   | ...   | ...
PDP S1      | ...   | ...   | ...   | ...
Dossier     | ...   | ...   | ...   | ...
Evidence    | ...   | ...   | ...   | ...
Rail        | ...   | ...   | ...   | ...
```

4. Compare Variant A vs Variant B hero execution
5. Cherry-pick the best composition approaches (may mix directions)
6. Note what breaks — these become constraints for MF-02B
7. Export all three directions as PNGs for archival
8. Stop. Do not request synthesis or native integration.

## Run 2 Specific Corrections (From Run 1 Review)

| Issue | Run 1 Failure | Run 2 Fix |
|---|---|---|
| Hero structure | All 3 dirs treated hero as background-image overlay | Native hero frame provided — Make must read two-fold split |
| Hero left panel | Not decomposed (was PNG) | Test Variant A (sectioned) AND Variant B (2-fold card with dividers) |
| Right-side deadspace | Dir C grid + Dossier had unused right space | Explicitly rejected — grid/dossier must fill available width |
| Section spacing | Still too much gap between compositions | Tightened further — adjacent sections must feel connected |
| Surface colors | TrustEvidence carried pre-contract colors | Fixed at source — all dividers now rgb(206,220,241) |
| Planar direction | 3 competing philosophies | Dir C planar locked as baseline — explore within |

## Post-Run

- Push MF-02A Run 2 RESULTS.md to `make-sessions/session-02-grid-surface/RESULTS-RUN2.md`
- Compare Run 2 hero variants (A vs B) — select champion approach
- Codex reviews results and prepares MF-02B INTAKE if transfer verdicts are sufficient
- Human selects grid patterns, surface transitions, and spacing rhythm for champion
