# MF-02B — Adaptive Champion Review Map

**Mode:** Reference
**Status:** `ADAPTIVE_CHAMPION_PENDING / HUMAN_SELECTION_REQUIRED`
**Owner-only review base after authorized publish:** `https://oluk-experience-lab.sigmamindset.chatgpt.site/review`

The anchors below are implemented in the current worktree as an isolated `/review` route and pass local route/anchor tests. Sites version 5 currently serves exact source `2fb152ed689b94f709d4fb78d26d25ea0a88329f` behind custom owner-only access-policy revision 5.

## Stable review targets

| Order | Review item | Required private anchor | Primary Figma source | Supporting source |
|---:|---|---|---|---|
| 1 | Provenance closure | `/review#mf02b-provenance` | [MF-01B A `470:6306`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-6306), [B `470:7133`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-7133), [C `470:8127`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-8127) | MF-01A [`CORRECTION-PASS.md`](../session-01-product-card/CORRECTION-PASS.md) |
| 2 | Candidate foundation | `/review#foundation` | [`637:3`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=637-3) | FC-01 [`AUTHORITY-MATRIX.md`](../fc-01-candidate-foundation-convergence/AUTHORITY-MATRIX.md) |
| 3 | Status atoms | `/review#mf02b-atoms` | [InventoryStatus set `641:17`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=641-17), [EvidenceStatus `518:13092`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=518-13092) | `/review#mf02b-inventory-status`, `/review#mf02b-evidence-status` |
| 4 | Vertical | `/review#mf02b-vertical` | [Candidate set `646:10801`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=646-10801) | Legacy anatomy [`486:4634`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634) |
| 5 | Featured | `/review#mf02b-featured` | [Candidate set `646:10802`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=646-10802) | Legacy source [`486:4635`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4635) |
| 6 | Compact · Default | `/review#mf02b-compact-default` | [`639:356`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-356) | Candidate set [`639:13888`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13888) |
| 7 | Compact · Hover | `/review#mf02b-compact-hover` | [`639:402`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-402) | Candidate set [`639:13888`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13888) |
| 8 | Compact · Focus | `/review#mf02b-compact-focus` | [`639:448`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-448) | Candidate set [`639:13888`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13888) |
| 9 | Compact · Selected | `/review#mf02b-compact-selected` | [`639:494`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-494) | Candidate set [`639:13888`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13888) |
| 10 | Compact · Added | `/review#mf02b-compact-added` | [`639:544`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-544) | Candidate set [`639:13888`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13888) |
| 11 | Compact · Unavailable | `/review#mf02b-compact-unavailable` | [`639:593`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-593) | Candidate set [`639:13888`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13888) |
| 12 | Compact · Out of stock | `/review#mf02b-compact-out-of-stock` | [`639:639`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-639) | Candidate set [`639:13888`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13888) |
| 13 | Compact · Disabled | `/review#mf02b-compact-disabled` | [`639:685`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-685) | Candidate set [`639:13888`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13888) |
| 14 | Horizontal relation | `/review#mf02b-horizontal` | [Candidate set `643:8616`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=643-8616) | Desktop `639:239`, tablet `643:144`, mobile `649:50` |
| 15 | PurchasePanel · six Sites states | `/review#mf02b-purchase-panel` | [12-variant Figma set `639:13889`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13889) | Desktop/Mobile × Default, Quantity changed, Added, Unavailable, Out of stock, Disabled |
| 16 | Dossier · correction required | `/review#mf02b-dossier` | [`551:27148`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-27148) | [`563:42499`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=563-42499) |
| 17 | Adaptive related rail · open | `/review#mf02b-related-rail` | [`551:26896`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-26896) | [`545:24677`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-24677), [`486:4636`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4636) |
| 18 | Six distinct assurance icons | `/review#mf02b-six-icons` | [`556:34627`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=556-34627) | Exact SVG geometry normalized to candidate cobalt in Sites |
| 19 | Responsive ledger | `/review#mf02b-responsive-ledger` | [`1440 · 644:3`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-3), [`1024 · 644:568`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-568), [`768 · 644:1093`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-1093), [`390 · 644:1625`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-1625) | Worktree browser measurements |
| 20 | Human selection receipt | `/review#mf02b-selection-receipt` | Accepted nodes from rows 1–19 | [`CURRENT-STATE-RECEIPT.md`](CURRENT-STATE-RECEIPT.md) |

## Responsive evidence matrix

`PASS` below means technical candidate evidence only. It is not human acceptance. The Figma frame ID is shared by every isolated family specimen at that review width; Sites version 5 makes the route-isolated candidate available for owner review.

| Review item | 1440 | 1024 | 768 | 390 |
|---|---|---|---|---|
| Vertical | `PASS · 644:3` | `PASS · 644:568` | `PASS · 644:1093` | `PASS · 644:1625` |
| Featured | `PASS · 644:3` | `PASS · 644:568` | `PASS · 644:1093` | `PASS · 644:1625` |
| Compact · all eight states | `PASS · 644:3` | `PASS · 644:568` | `PASS · 644:1093` | `PASS · 644:1625` |
| Horizontal relation | `PASS · 644:3` | `PASS · 644:568` | `PASS · 644:1093` | `PASS · 644:1625` |
| PurchasePanel · six states | `PASS · 644:3` | `PASS · 644:568` | `PASS · 644:1093` | `PASS · 644:1625` |
| Dossier | `BLOCKED · CORRECTION_REQUIRED` | `BLOCKED · CORRECTION_REQUIRED` | `BLOCKED · CORRECTION_REQUIRED` | `BLOCKED · CORRECTION_REQUIRED` |
| Adaptive related rail | `OPEN · full rail pending` | `OPEN · full rail pending` | `OPEN · full rail pending` | `OPEN · full rail pending` |
| Six-icon AssuranceRail | `PASS · Sites worktree` | `PASS · Sites worktree` | `PASS · Sites worktree` | `PASS · Sites worktree` |

Across the passing Sites cells: `scrollWidth == clientWidth`; semantic child-boundary escapes `0`; minimum rendered text `12px`; images loaded; long AssuranceRail definitions wrap; console errors `0`; focus outline verified. `/review` exposes unexpected overflow instead of hiding it with `overflow-x: clip`.

## Evidence required at every anchor

1. Direct current specimen/capture link.
2. Direct target Figma node link.
3. Width and viewport height.
4. Outer specimen bounds.
5. Intended parent bounds and child-boundary result.
6. Exact token, radius, border, elevation and type result.
7. InventoryStatus and EvidenceStatus result where applicable.
8. Exact product-content check.
9. Icon uniqueness result where applicable.
10. Keyboard/focus result for state specimens.
11. Pass/fail and bounded correction owner.

## MF-01B and MF-02A ratification map

The human selection receipt must also address these direct historical nodes.

| Relationship | Historical recommendation | Nodes requiring explicit ratification |
|---|---|---|
| Homepage entry | Direction A | [`470:6306`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-6306) |
| PDP atmosphere | B container approach plus C dual-panel idea; independent test passed | [`470:7133`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-7133), [`470:8127`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-8127), [`480:4503`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=480-4503) |
| Grid/Rail | A baseline with limited B/C borrowing | [`470:6306`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-6306), [`470:7133`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-7133), [`470:8127`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-8127) |
| Embedded Evidence | C with A elements | [`470:8127`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-8127), [`470:6306`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-6306) |
| Canvas Split | C staggered-plane relationship | [`470:8127`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-8127) |
| MF-02A Grid | Direction A, corrected to three Vertical cards | [`545:23339`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-23339), [`486:4634`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634) |
| MF-02A PDP first fold | Direction A | [`545:23339`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-23339), [`480:4503`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=480-4503) |
| MF-02A Dossier | A+B hybrid, still correction-required | [`545:23339`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-23339), [`545:20048`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-20048), [`551:27148`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-27148) |
| MF-02A Evidence | Direction B | [`545:20048`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-20048) |
| MF-02A Rail | Direction A, adaptive correction required | [`545:23339`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-23339), [`545:24677`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-24677) |

## Review boundary

- The Sites hostname is the owner-only comparison surface for exact version-5 source `2fb152ed689b94f709d4fb78d26d25ea0a88329f`; anonymous requests return HTTP `401`.
- A populated matrix is technical review evidence, not human acceptance.
- Only the human receipt may remove `HUMAN_SELECTION_REQUIRED`.
- No anchor in this map authorizes a later deployment, runtime translation, payment or C2 work.
