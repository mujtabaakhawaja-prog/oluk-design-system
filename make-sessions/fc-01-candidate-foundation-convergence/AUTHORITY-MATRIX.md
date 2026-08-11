# FC-01 — Candidate Authority Matrix

**Status:** `ADAPTIVE_CARD_FAMILY_TECHNICAL_EVIDENCE_READY / DOSSIER_CORRECTION_REQUIRED / HUMAN_SELECTION_REQUIRED`
**Candidate:** `CANDIDATE_CONVERGENCE_v0` — unpublished and unpromoted
**Date:** 2026-08-11

Every design input has four independent authorities. A node can control geometry without controlling copy, fixture values or runtime ownership.

Legend: `LOCK` = preserve; `ADAPT` = preserve relationship, replace raw implementation; `FIXTURE` = private rendered state; `REJECT` = do not carry forward; `NONE` = no authority.

| Node / contract | Visual geometry authority | Customer-copy authority | Private fixture authority | Eventual runtime authority |
|---|---|---|---|---|
| `614:75994` | `LOCK` three-column relationship; `ADAPT` widths | Children control | Children only | `NONE` |
| `614:75995` | `LOCK` order/gap; `REJECT` fixed track math | None | None | `NONE` |
| `615:9963` | `LOCK` unified Portal + Archive outer card | Portal/archive headings, body, search and actions | Counts/aggregates only | `NONE` |
| `624:240` / `624:241` / `624:242` | `LOCK` upper zone / 2px divider / lower zone | Customer-facing framing | Archive values only | `NONE` |
| `615:9775` | `LOCK` featured anatomy; `ADAPT` raw style | Exact MK-2866 truth | Stock and EvidenceStatus | `NONE` |
| `614:76183` / `614:76220` | `LOCK` category-plus-ticker stack; `REJECT` ticker crop | Commerce taxonomy supersedes raw labels | Static rows | `NONE` |
| `626:11760` | `LOCK` material/anatomy/state reservoir; `ADAPT` raw values | Exact product truth only | Local state specimens | `NONE` |
| `626:11820` / `626:11979` | `LOCK` vertical / featured anatomy | Exact product truth | Rendered state | `NONE` |
| `626:12144`–`626:12428` | `LOCK` compact default/hover/focus/selected/added relationships | Exact product truth | State specimens | `NONE` |
| `626:12504` / `626:12664` | `LOCK` horizontal / PurchasePanel relationships | Exact product truth and approved relationship framing | Purchase state | `NONE` |
| `486:4634` | `LOCK` ProductCommerceCard anatomy; `ADAPT` border/radius/shadow | Exact product truth and approved chip vocabulary | Stock/EvidenceStatus | `NONE` |
| `518:13092` | `LOCK` atom EvidenceStatus icon relationship | `OPENLAB VERIFIED` | Rendered status | `NONE` |
| `556:34627` | `LOCK` six-cell order/icons/full rail; `ADAPT` material | Six approved assurance titles/descriptions | Rendered assurance | `NONE` |
| `561:41860` | `LOCK` narrative + four-family rail | `SARMs / Prohormones / Research Chemicals / Stacks` | None | `NONE` |
| `626:7989` | `ADAPT` route sequence reservoir | Cherry-pick only | Legacy claims mostly rejected | `NONE` |
| `626:10899` | `LOCK` archive canvas-split; `ADAPT` all styling | Archive framing/search | Stats and rows | `NONE` |
| `626:11754` / `626:11285` | wrapper only / `LOCK` evidence relationship; `ADAPT` styling | Six-point concept only | Chart/lab/date/rows | `NONE` |
| `457:4661` | raster composition reference only | `REJECT` placeholder copy | `REJECT` placeholder values | `NONE` |
| `551:27148` / `563:42499` | `LOCK` dossier intent; current clipping `REJECT`; index is non-interactive | Dossier heading/index labels as approved; no tab semantics | Batch/assay fields only | `NONE` |
| `551:31570` / `551:31665` / `551:31706` | `ADAPT` lab-section sequence and chart/table relationship | Heading structure | Analytical values | `NONE` |
| `551:31587` | `LOCK` AssuranceRail placement and relation | Approved six-point customer language | Rendered state | `NONE` |
| `551:28672` / `551:28685` | `LOCK` related-section relationship | Customer relationship framing | Related-product specimen | `NONE` |
| `CANDIDATE_CONVERGENCE_v0` | `CANDIDATE` color/border/radius/shadow/type roles pending MF-02B | N/A | N/A | `NONE` |
| `637:3` | `CANDIDATE` bound foundation specimen | Review labels only | None | `NONE` |
| `641:17` | `CANDIDATE` InventoryStatus states | Approved state labels | Static states | `NONE` |
| `646:10801` / `646:10802` | `CANDIDATE` Vertical / Featured adaptive relationships | Exact MK-2866 truth | Static card states | `NONE` |
| `639:13888` | `CANDIDATE` eight Compact local states | Exact product truth | Default/hover/focus/selected/added/unavailable/out-of-stock/disabled | `NONE` |
| `643:8616` | `CANDIDATE` Relation adaptive component only; full rail remains open | Approved relationship framing | Static related product | `NONE` |
| `639:13889` | `CANDIDATE` PurchasePanel six local states | Exact MK-2866 truth | Default/quantity-changed/added/unavailable/out-of-stock/disabled | `NONE` |
| `644:3` / `644:568` / `644:1093` / `644:1625` | `CANDIDATE` four-width review evidence | Review labels only | Static review frames | `NONE` |
| MF-03 v3 Sites | `ADAPT` route shell and useful responsive infrastructure | Current customer copy only where not superseded | Existing specimens | `NONE` |

## Candidate convergence values

These values are exercised in hidden candidate Figma variables/styles/components and the route-isolated local Sites `/review` wrapper. They are not published variables, customer-route tokens or promoted foundation authority.

| Role | Exact value |
|---|---|
| Canvas | `#f7f8fc` |
| Card | `#ffffff` |
| Family surface | `#fafcff` |
| Media chamber | `#f0f4fb` |
| Cobalt soft | `#eef4ff` |
| Card border | `rgba(206,220,241,0.92)` |
| Strong border | `#afc8ff` |
| Family border | `#d2e4ff` |
| Primary text / inverse | `#141827` |
| Secondary / muted text | `#53617d` / `#64718a` |
| Cobalt / interactive cobalt | `#0057ff` / `#256dff` |
| Inventory green / soft | `#15803d` / `#ecfdf3` |
| Radius control/chip/metric | `8px / 10px / 12px` |
| Radius compact/vertical/purchase/horizontal | `20px / 24px / 28px / 34px` |
| Softform Arc | `0 1px 3px rgba(20,24,39,.04), 0 4px 12px rgba(20,24,39,.06)` |
| Display type | `Plus Jakarta Sans ExtraBold` |
| UI/body type | `Inter` |
| Body / eyebrow floor | `15px / 12px` |
| Content max / grid gap | `1344px / 20px` |
| Desktop/tablet/mobile gutter | `48px / 32px / 16px` |

## Runtime boundary

All Figma nodes and Sites fixtures above have `NONE` runtime authority. Shopper SSR, Woo, inventory, evidence publication, reviews, checkout, payment and C2 retain their later owners.

## Technical evidence limit

Local QA passes at 1440/1024/768/390 with no page overflow or semantic child-boundary violations, a 12px computed type floor, loaded images, wrapped AssuranceRail copy, zero console errors and a 2px cobalt focus outline. This proves bounded implementation health only. Human selection, dossier correction, full related-rail closure, customer-route convergence and foundation promotion remain open.
