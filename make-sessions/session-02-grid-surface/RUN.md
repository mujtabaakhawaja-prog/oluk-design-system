# MF-02A — Run Procedure

## Pre-Run Checklist

- [ ] Phase 1 Foundation Corrections complete (all 5 card densities componentized, compact card 5-state variants wired, typography consistent)
- [ ] All 9 PNGs exported from Figma at 2x resolution
- [ ] PNGs renamed to match manifest names exactly
- [ ] surface-contract.md reviewed (repo: `authority/surface-contract.md`)
- [ ] MF-01B RESULTS.md reviewed (repo: `make-sessions/session-01b-relationship-transfer/RESULTS.md`)

## PNG Export Procedure

Export each component from Figma using File > Export or right-click > Export:

| # | Source Node | Export Name | Node ID |
|---|---|---|---|
| 1 | ProductCommerceCard / Vertical | `mf01a-vertical-card.png` | `486:4634` |
| 2 | ProductCommerceCard / Featured | `mf01a-featured-card.png` | `486:4635` |
| 3 | ProductCommerceCard / Horizontal | `mf01a-horizontal-card.png` | `486:4636` |
| 4 | ProductCommerceCard / Compact (full set) | `mf01a-compact-card-states.png` | `486:4642` |
| 5 | PurchasePanel | `mf01a-purchasepanel.png` | `478:10367` |
| 6 | PDP Section 1 — PurchasePanel Control Test | `pdp-section1-control-test.png` | `480:4503` |
| 7 | LIVE / TrustEvidenceSpine | `trust-evidence-spine.png` | `475:9098` |
| 8 | homepageherocurrent | `homepage-hero-current.png` | `462:6141` |
| 9 | Dossier / Native Light VNext (Focus=Product) | `dossier-product-variant.png` | `198:1292` |

Export at 2x scale, PNG format, no background.

## Make Session Setup

### Step 1: Plan Mode

1. Create a new Figma Make project named: `OLUK — MF-02A Grid Surface & Card Elevation Frontier`
2. Attach all 9 PNGs in the order listed above
3. Set Make to **Plan mode** (not Build)
4. Paste the entire contents of `PROMPT.md` verbatim
5. Submit and review the plan Make proposes
6. Verify the plan covers all 6 compositions: Hero, Grid, PDP Section 1, Dossier, Evidence, Related/Upsell Rail
7. Verify the plan respects the surface and spacing laws
8. Verify the plan doesn't introduce rejected elements
9. If the plan is acceptable, approve it

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
6. Export all three directions as PNGs
7. Stop. Do not request synthesis or native integration.

## Post-Run

- Push MF-02A RESULTS.md to `make-sessions/session-02-grid-surface/RESULTS.md`
- Codex reviews results and prepares MF-02B INTAKE if transfer verdicts are sufficient
- Human selects grid patterns, surface transitions, and spacing rhythm for champion
