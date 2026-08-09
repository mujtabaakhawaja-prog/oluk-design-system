# MF-03 — Codex Sites Convergence Manifest

**Mode:** Reference
**Status:** Active
**Date:** 2026-08-09
**Branch:** `codex/mf-codex-sites-convergence`
**Site root:** `sites/oluk-experience-lab`

## Mutation allowlist

This lane may change:

- `sites/oluk-experience-lab/**`;
- `make-sessions/session-03-codex-sites/**`;
- minimal active-lane pointers in repository authority/index documents.

It may not change Shopper SSR, Initiator, C2, WooCommerce, payment, Figma nodes or any public/production deployment.

## Repository inputs

| Input | Role |
|---|---|
| `authority/ids-plan.md` | Current authority alias and gate position |
| `authority/identity-design-system-authoritative-plan-and-build-receipt.md` | Phase 00–12 pipeline, identity laws and promotion boundaries |
| `authority/surface-contract.md` | Canvas, chamber, raised-plane, edge and shape relationships |
| `authority/oluk-make-philosophy.md` | Design-first and prototype/runtime separation |
| `authority/oluk-pdp-architecture.md` | PDP section roles and canonical product truth |
| `make-sessions/session-01-product-card/**` | Completed MF-01A card-family exploration; historical input |
| `make-sessions/session-01b-relationship-transfer/**` | Completed MF-01B transfer results; historical input |
| `make-sessions/session-02-grid-surface/**` | Completed MF-02A run, corrections and cherry-pick packet; historical input |
| `make-sessions/MF-CARRYOVER-AUDIT.md` | Carryover inventory, unresolved surfaces and route map |
| Codex task `019f9c8f-c368-7c51-9275-f8ecda9dd2bf` | Older Shopper/C2 topology and work-state cross-check only; current MF visual decisions supersede its visual treatment |

## Figma and Make design inputs

All Figma access in this lane is read-only.

| Source | Role | Disposition |
|---|---|---|
| Final Design file `BEPMuUt1HroEw8xjz8CVyN` | Current Figma design corpus | Direction, content relationships and selected assets |
| `564:42946` | Logo Board — Option B | Exact integrated on-light lockup source |
| `564:42811` | Legacy desktop header stack | Content/order evidence only; redesign required |
| `564:42882` | Historical R6 Logo System | Minimum-size, clear-space and misuse reference only |
| `564:64871` | Full OpenLab route-family section | Route inventory and layout evidence; requires system taming |
| `564:43007` / `564:43008` | OpenLab Portal family / inspected light desktop frame | Portal composition source |
| `564:44122` / `564:44123` | Lab Records family / inspected light desktop frame | Archive composition source |
| `564:45673` | MK-2866 Dossier family | Product evidence relationship source |
| `564:46696` / `564:46697` | Branded Lab Record family / inspected light desktop frame | Individual-record relationship source |
| `564:49171` | Batch Lookup | Lookup relationship source |
| `564:49828` | Methodology | Editorial methodology source |
| `564:50627` | Source Chain | Chain-of-custody relationship source |
| `564:56412` | OpenLab Compare | Evidence-comparison source |
| `564:57977` | EvidenceOS | Evidence-system explanation source |
| `556:32216` | Build Olympus Core Blue Ledger | Section-flow evidence only; dark styling and unsupported claims are rejected |
| `486:4634`–`486:4642` | ProductCommerceCard family | Permanent accepted relationship source |
| `518:13092` | EvidenceStatus | Exact atom/label visual source; rendered status remains a fixture until bound |
| `551:25220`, `551:25299`, `551:27148`, `551:26896` | MF-02A champion correction targets | Correction brief for hero, grid, dossier and rail |
| Evidence-OS Make file `N40v2cUxw3oxfcpSZoluCh` | Portal-to-commerce flow evidence | Flow influence only; generated code and invented evidence are not authority |

## Registered local presentation assets

These copies are scoped to the private experience lab. Registration here does not promote a Figma candidate or fixture to runtime authority.

| Asset | Dimensions/type | SHA-256 | Use |
|---|---|---|---|
| `public/assets/brand/oluk-logo-on-light.png` | 1600×448 RGBA PNG | `09c9b144a5f42425e5362433373934399d226479462db0bdb0a357420469c751` | Integrated on-light logo lockup |
| `public/assets/evidence/openlab-atom.svg` | SVG | `cb91cdf3f1840b8a27019edb2f6240a7e611074ff15983b69e95d6ff3bb94423` | Exact EvidenceStatus atom artwork |
| `public/assets/products/mk-2866/front.png` | 1365×2048 RGBA PNG | `5d900b18e30de2cd31885d9c40fa7d9ef8d461ccb5d73e25ae4f354ab93ca6dd` | Governed MK-2866 presentation render |
| `public/assets/products/rad-140/front-design-fixture.png` | 1024×1536 RGBA PNG | `cfb90f79edab93fb2ccbac1804c7b521c1216fb43fc1aad8de9deeb6aa2d1188` | Explicitly labelled design fixture only |
| `public/assets/share/oluk-experience-lab-og.png` | 1731×909 RGB PNG | `307da160ba543867d3cf4dd51c1518e133ddc79ba10125e3882ffdf4c8350c58` | Private-review social/share presentation; no live claims |

## Route manifest

| Proof route | Canonical route shape | Job |
|---|---|---|
| `/` | `/` | Homepage composition |
| `/shop` | `/shop` | Product catalogue, filters and product-grid shell |
| `/product/mk-2866` | `/product/:productSlug` | MK-2866 PDP in approved section order |
| `/open-lab` | `/open-lab` | OpenLab portal |
| `/open-lab/records` | `/open-lab/records` | Lab Records archive |
| `/open-lab/records/source-bound-record` | `/open-lab/records/:recordId` | Honest individual-record presentation without an invented batch ID |
| `/open-lab/dossier/mk-2866` | `/open-lab/dossier/:productSlug` | Product evidence dossier |
| `/open-lab/batch-lookup` | `/open-lab/batch-lookup` | Batch lookup anatomy and source-bound states |
| `/open-lab/methodology` | `/open-lab/methodology` | Testing-methodology explanation |
| `/open-lab/source-chain` | `/open-lab/source-chain` | Source-chain and custody explanation |
| `/open-lab/compare` | `/open-lab/compare` | Evidence comparison anatomy |
| `/about/evidence-os` | `/about/evidence-os` | EvidenceOS explanation |
| `/about` | `/about` | Company/identity explanation without unsupported business claims |
| `/reviews` | `/reviews` | Review anatomy plus fixture, loading, empty and unavailable states |

## Explicit exclusions

No current route or artifact may claim implementation of:

- `/basket`, `/checkout`, `/order-received` or hosted payment;
- live cart quantity, customer identity, currency or account state;
- live inventory or dispatch state;
- live review records or aggregate ratings;
- live certificates, HPLC traces, laboratory values or batch IDs;
- production React/Shopper SSR parity;
- public deployment or release promotion.
