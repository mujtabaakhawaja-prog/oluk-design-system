# MF-02A — Run Procedure

## Pre-Run Checklist

- [ ] Phase 1 Foundation Corrections complete (all 5 card densities componentized, compact card 5-state variants wired, typography consistent)
- [ ] 8 native frames verified in source Figma file (`BEPMuUt1HroEw8xjz8CVyN`)
- [ ] 1 creative-direction PNG exported (homepage hero)
- [ ] surface-contract.md reviewed (repo: `authority/surface-contract.md`)
- [ ] MF-01B RESULTS.md reviewed (repo: `make-sessions/session-01b-relationship-transfer/RESULTS.md`)

## Input Preparation

### Native Frame Copy (8 frames)

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

**Copy procedure:** Select the component in the source file → Cmd/Ctrl+C → Switch to the Make project → Cmd/Ctrl+V. Each frame arrives with its full layer tree intact.

### Creative-Direction PNG Export (1 image)

| # | Source Component | Export Name | Node ID | Page |
|---|---|---|---|---|
| 9 | homepageherocurrent | `homepage-hero-current.png` | `462:6141` | HOMEPAGE HERO |

Export at 2x scale, PNG format, no background. This PNG serves as creative-direction evidence — Make should interpret the visual atmosphere and editorial intent, not decompose its layer structure.

## Make Session Setup

### Step 1: Plan Mode

1. Create a new Figma Make project named: `OLUK — MF-02A Grid Surface & Card Elevation Frontier`
2. Paste the 8 native frames into the Make canvas
3. Attach the 1 creative-direction PNG (homepage-hero-current.png)
4. Set Make to **Plan mode** (not Build)
5. Paste the entire contents of `PROMPT.md` verbatim
6. Submit and review the plan Make proposes
7. Verify the plan covers all 6 compositions: Hero, Grid, PDP Section 1, Dossier, Evidence, Related/Upsell Rail
8. Verify the plan respects the surface and spacing laws
9. Verify the plan references the native frames as structural authority (not just visual reference)
10. Verify the plan doesn't introduce rejected elements
11. If the plan is acceptable, approve it

### Step 2: Build Mode

1. Switch to **Build mode**
2. Let Make generate the three directions
3. Do NOT request mid-run corrections or additional directions
4. Wait for all three to complete

### Step 3: Review

1. Reject any direction that violates the prompt's reject list
2. Score each direction per composition:
   - Hero entry: Does the card-inside-hero transfer work?
   - Grid: Is spacing tight? Does elevation graduation read?
   - PDP Section 1: Is the left container filled? Does PurchasePanel elevate cleanly?
   - Dossier: Is deadspacing eliminated? Does it connect to Section 1?
   - Evidence: Does cobalt authority survive inside the evidence context?
   - Related/Upsell: Does canvas split work? Is rhythm purposeful?
3. Record per-composition verdicts in this format:

```
Composition | Dir A | Dir B | Dir C | Notes
Hero        | ...   | ...   | ...   | ...
Grid        | ...   | ...   | ...   | ...
PDP S1      | ...   | ...   | ...   | ...
Dossier     | ...   | ...   | ...   | ...
Evidence    | ...   | ...   | ...   | ...
Rail        | ...   | ...   | ...   | ...
```

4. Cherry-pick the best composition approaches (may mix directions)
5. Note what breaks — these become constraints for MF-02B
6. Export all three directions as PNGs for archival
7. Stop. Do not request synthesis or native integration.

## Post-Run

- Push MF-02A RESULTS.md to `make-sessions/session-02-grid-surface/RESULTS.md`
- Codex reviews results and prepares MF-02B INTAKE if transfer verdicts are sufficient
- Human selects grid patterns, surface transitions, and spacing rhythm for champion
