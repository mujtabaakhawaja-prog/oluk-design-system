# MF-01B — Cross-Context Surface & Shape Transfer Test Results

## Status: COMPLETE

**File:** `BEPMuUt1HroEw8xjz8CVyN`
**Page:** `369:5500` (MF-01 and MF-02)
**Date:** 2026-08-08

## Transfer Scorecard

| Transfer Test | Direction Picked | Verdict | Carry Forward? | Notes |
|---|---|---|---|---|
| Hero entry | A (card-inside-hero) | **PASS** | Yes | Card-inside-hero composes with atmospheric bottles. Faithful to homepageherocurrent input. |
| PDP flat atmosphere | Independent test (`480:4503`) | **PASS** | Yes | PurchasePanel elevation creates clean separation from full-field media. No canvas bleed. |
| Grid/Rail | A baseline + borrow B/C | **PARTIAL** | Yes | A's equal peers cleanest. B's mixed density interesting but spacing issues. C's 5-wide rail too wide. |
| Embedded Evidence | C (with A elements) | **PASS** | Yes | Six-point vertical checklist + HPLC chart + table. Cobalt authority dots survive inside evidence context. |
| Canvas Split | All | **PASS** | Yes | "Every batch. Every report. Public." + lab records table. Canvas gap works across all 3. |

## Direction-by-Direction Analysis

### Direction A (`470:6306`, 1171×3410) — Best Baseline

- **Hero:** Full split layout — featured product card embedded in atmospheric bottles. Most faithful to homepage-hero-banner.png input. Card-inside-hero works.
- **Grid:** 3 compact cards, equal-density peers (MK-2866, RAD-140, MK-677). Clean rhythm.
- **Evidence:** Six-point record with vertical checklist + data table. Cobalt dots for status. Hypothesis tabs.
- **Canvas Split:** Editorial left + lab records table right. Clean.
- **PDP:** Full-field media chamber with purchase panel, BUT left container lets canvas background leak through.
- **Verdict:** Best overall coherence. Hero and grid strongest. PDP container needs B's approach.

### Direction B (`470:7133`, 1171×3954) — Technical

- **Hero:** Minimal — large image placeholder only. Pure atmosphere. No product card overlay.
- **Grid:** Mixed density — 1 large featured + 2 compact + 4 compact row. Tests density graduation but Featured overwhelms compacts. Spacing issues throughout.
- **Evidence:** Horizontal 6-point chip spread + table below. Different IA, less scannable.
- **Canvas Split:** Similar to A.
- **PDP:** Strongest of the three — left container fully filled, no page canvas leaking.
- **Verdict:** Spacing issues throughout. Too dense vertically, too wide horizontally. But PDP container approach is the best.

### Direction C (`470:8127`, 1171×3204) — Relaxed/Staggered

- **Hero:** Weakest. Compact split with inline metrics, no full card container.
- **Grid:** 5 compact cards in horizontal rail. Wide. "IN STOCK" badges on every card are noisy.
- **Evidence:** Vertical checklist + HPLC chart prominently displayed + data table. Most dynamic.
- **Canvas Split:** "Staggered planes" philosophy — 50px vertical offset between independent jobs. Unique card shape.
- **PDP:** Dual-panel approach with staggered elevation. Interesting but incomplete.
- **Verdict:** Hero is weakest. Evidence section is most dynamic. Staggered planes add depth.

## Cherry-Pick Consolidation (Human-Approved)

| Composition | Pick From | Reason |
|---|---|---|
| Hero Entry | **A** | Most faithful to homepage-hero-banner, card-inside-hero works, C's hero is weakest |
| PDP Container | **B's approach + C's dual-panel idea** | B keeps canvas bg from leaking. C's staggered panels add elevation interest. |
| Grid/Rail | **A or B** | A's equal peers cleanest. B's mixed density interesting but overwhelming. |
| Evidence | **C** | Vertical checklist + prominent HPLC chart + data table. Most dynamic. |
| Canvas Split | **C** | Staggered planes philosophy, transparent outer wrapper, canvas gap between planes |

## Flagged Defects (Constraints for MF-02)

1. **Section spacing** — All 3 directions had excessive inter-section gaps. Canvas rhythm must come from composition variety, not dead air.
2. **No complete PDP** — None produced full-field media chamber + render slot + PurchasePanel matching MF-01A Softform Arc quality.
3. **MF-01A polish diluted** — MetricRail geometry, bordered chips, Softform Arc elevation present but muted across all 3.
4. **PDP canvas leak** — A and C let page canvas background leak into the left media container.

## Independent PDP Transfer Test

Created `480:4503` (PDP Section 1 — PurchasePanel Control Test, 1440×879) using:
- Section 1: Full-Field Hero Rail (`475:9096`) as the base composition
- PurchasePanel (`478:10367`) swapped in for PurchaseRail
- Resized to PurchasePanel dimensions (420×687)

**Result:** PASS. PurchasePanel's elevation (white fill, r=28, blue-shifted shadow r=50/y=20) creates clean separation from flat atmospheric media zone. Purchase plane reads as independently raised. No canvas bleed.

## Artifacts

- MF-01B Direction A: `470:6306`
- MF-01B Direction B: `470:7133`
- MF-01B Direction C: `470:8127`
- PDP Control Test: `480:4503`
- All on page `369:5500` in file `BEPMuUt1HroEw8xjz8CVyN`

## Next Step

MF-02A Grid Surface & Card Elevation Frontier — uses the cherry-pick consolidation + Phase 1 componentized cards as input. See `make-sessions/session-02-grid-surface/PROMPT.md`.
