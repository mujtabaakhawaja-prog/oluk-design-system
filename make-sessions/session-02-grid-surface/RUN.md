# MF-02A — Run 3 Procedure

## Pre-Run Checklist

- [x] Phase 1 Foundation Corrections complete
- [x] Run 1 complete — Direction C champion baseline selected
- [x] Run 2 complete — Hero variants tested, section differentiation failure identified
- [x] Hero decision surface wrapper created (native frame `462:6144`)
- [x] Hero 2-fold vertical card template verified (`470:6393`)
- [x] TrustEvidenceSpine colors updated to surface contract (19 instances fixed)
- [x] LabReports canvas-split pattern identified as evidence template (`222:1332`)
- [x] 13 native frames verified in source Figma file (`BEPMuUt1HroEw8xjz8CVyN`)
- [ ] surface-contract.md reviewed (repo: `authority/surface-contract.md`)
- [ ] Run 2 results reviewed and corrections integrated

## Input Preparation

### Native Frame Copy (13 frames — ALL native, zero PNGs)

Copy each native frame from the source Figma file and paste into the Make project.

#### Structural Authority Inputs (9)

| # | Source Component | Node ID | Figma Link | Page | Dimensions |
|---|---|---|---|---|---|
| 1 | ProductCommerceCard / Vertical | `486:4634` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634) | MF-01 and MF-02 | 481×916 |
| 2 | ProductCommerceCard / Featured | `486:4635` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4635) | MF-01 and MF-02 | 481×896 |
| 3 | ProductCommerceCard / Horizontal | `486:4636` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4636) | MF-01 and MF-02 | 1060×542 |
| 4 | ProductCommerceCard / Compact (full set) | `486:4642` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4642) | MF-01 and MF-02 | 302×382 per variant |
| 5 | PurchasePanel | `478:10367` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=478-10367) | 03 Identity Authority | 420×687 |
| 6 | PDP Section 1 — Control Test | `480:4503` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=480-4503) | MF-01 and MF-02 | 1440×879 |
| 7 | LIVE / TrustEvidenceSpine | `475:9098` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=475-9098) | 03 Identity Authority | 1440×851 |
| 8 | Dossier / Native Light VNext (Focus=Product) | `198:1292` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=198-1292) | 03 Identity Authority | (see component) |
| 9 | Homepage Hero Container | `462:6144` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=462-6144) | HOMEPAGE HERO | 1384×780 |

#### Reference Pattern Inputs (4)

| # | Source Component | Node ID | Figma Link | Page | Dimensions |
|---|---|---|---|---|---|
| 10 | Hero 2-Fold Card Template | `470:6393` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-6393) | 03 Identity Authority | 440×685 |
| 11 | Product Selector Container | `58:486` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=58-486) | 03 Identity Authority | 336×460 |
| 12 | LabReports / Canvas Split | `222:1332` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=222-1332) | 03 Identity Authority | 1344×630 |
| 13 | CanvasSplit:margin | `470:9078` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-9078) | 03 Identity Authority | 1075×470 |

**Copy procedure:** Select the component in the source file → Cmd/Ctrl+C → Switch to the Make project → Cmd/Ctrl+V. Each frame arrives with its full layer tree intact.

## Make Session Setup

### Step 1: Plan Mode

1. Open the existing Make project or create new: `OLUK — MF-02A Grid Surface & Card Elevation Frontier (Run 3)`
2. Paste the 13 native frames into the Make canvas
3. Set Make to **Plan mode** (not Build)
4. Paste the entire contents of `PROMPT.md` verbatim
5. Submit and review the plan Make proposes
6. Verify the plan covers all 6 compositions: Hero, Grid, PDP Section 1, Dossier, Evidence, Related/Upsell Rail
7. **Verify the plan LOCKS the hero** using the `470:6393` template — no hero experimentation
8. **Verify SECTION-LEVEL DIFFERENTIATION** — the plan must show different approaches for Grid, Dossier, Evidence, and Rail across all three directions (per the Differentiation Contract table)
9. **Verify the Evidence section** decomposes TrustEvidenceSpine into Six-point record + HPLC chart + Batch Records — NOT generic badges
10. **Verify the horizontal card** is adaptive full-width, not truncated
11. Verify the plan uses Direction C's planar language as the baseline philosophy for ALL compositions
12. Verify the plan doesn't introduce rejected elements
13. If the plan is acceptable, approve it

### Step 2: Build Mode

1. Switch to **Build mode**
2. Let Make generate the three directions
3. Do NOT request mid-run corrections or additional directions
4. Wait for all three to complete

### Step 3: Review

1. Reject any direction that violates the prompt's reject list
2. **First check: Section differentiation** — if any composition looks the same across two or more directions, flag as FAIL
3. Score each direction per composition:
   - Hero: Does the 2-fold vertical card match `470:6393`? Cobalt divider present? Product toggles below card? Media chamber balanced?
   - Grid: Which approach? Equal/Mixed/Alternative? Elevation graduation readable? No right-side deadspace?
   - PDP S1: What panel ratio? Left container filled? PurchasePanel elevation clean?
   - Dossier: Which layout? Three-column/Two-panel/Full-width? Deadspacing eliminated?
   - Evidence: Six-point record present? HPLC chart present? Batch Records table present? Which layout pattern?
   - Rail: Horizontal card full-width? How many cards? Canvas split purposeful?
4. Record per-composition verdicts:

```
Composition | Dir A          | Dir B          | Dir C          | Same? | Notes
Hero        | Locked         | Locked         | Locked         | OK    |
Grid        | Equal-density? | Mixed-density? | Alt geometry?  |       |
PDP S1      | 60/40?         | 55/45?         | 50/50?         |       |
Dossier     | Three-col?     | Two-panel?     | Full-width?    |       |
Evidence    | Canvas-split?  | Dashboard?     | Stacked?       |       |
Rail        | Single wide?   | Two stacked?   | Mixed rail?    |       |
```

5. Cherry-pick the best composition approaches (may mix directions)
6. Note what breaks — these become constraints for MF-02B
7. Export all three directions as PNGs for archival
8. Stop. Do not request synthesis or native integration.

## Run 3 Specific Corrections (From Run 2 Review)

| Issue | Run 2 Failure | Run 3 Fix |
|---|---|---|
| Hero structure | No direction achieved the 2-fold vertical card | Hero LOCKED from `470:6393` — no more experimentation |
| Section differentiation | Grid/Dossier/Evidence/Rail identical across all 3 | Differentiation Contract table + explicit reject rule |
| TrustEvidenceSpine | Flattened into generic badge row | Must show Six-point record + HPLC chart + Batch Records |
| Horizontal card | Truncated with empty right side | Must be adaptive full-width |
| Dossier deadspacing | Gap between headline and content | Maximum spacing enforced, tight connection required |
| Planar philosophy | Only visible in hero, not below | Dir C planes required in ALL compositions |
| Evidence layout | No HPLC chart, no Batch Records table | LabReports canvas-split (`222:1332`) as structural template |

## Post-Run

- Push MF-02A Run 3 RESULTS.md to `make-sessions/session-02-grid-surface/RESULTS-RUN3.md`
- If section differentiation passes: cherry-pick best per-composition approaches for MF-02B
- If hero passes: lock hero for MF-02B
- Codex reviews results and prepares MF-02B INTAKE if transfer verdicts are sufficient
- Human selects grid patterns, surface transitions, and spacing rhythm for champion
