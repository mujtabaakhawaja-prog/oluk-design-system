# MF-03 — Codex Sites V3 Visual-QA Runbook

> **Superseded active status — 2026-08-11:** This file is preserved as MF-03 revision-3 history. Current control is [`FC-01 Candidate Foundation Convergence`](../fc-01-candidate-foundation-convergence/guidelines.md). MF-03 v3 is `TECHNICALLY_HEALTHY / DESIGN_CONVERGENCE_FAILED / HUMAN_REVIEW_PENDING`; `614:75994` supersedes `614:75950` for the opening. MF-03 v2 remains `REJECTED_VISUAL_TRANSLATION`.

**Mode:** How-to guide
**Status:** `PRIVATE_V3_DEPLOYED / HUMAN_REVIEW_PENDING`

## Expected result

A validated V3 candidate with 15 resolving routes, stable `/review` targets and genuine 1440/1024/768/390 recomposition. Local QA passed; owner-only publishing is the remaining action. Shopper SSR, Woo, payment, C2, Figma and public/production mutation are outside this run.

## 1. Preflight

1. Confirm the worktree is `/Users/mujtabakhawaja/Worktrees/oluk-mf-codex-sites-v3-corrections`.
2. Confirm the branch is `codex/mf-codex-sites-v3-corrections`.
3. Preserve unrelated and in-progress Sites changes.
4. Read `AGENTS.md`, the authority chain and every active file in this directory.
5. Confirm V2 is recorded as `REJECTED_VISUAL_TRANSLATION` and V3 as `PRIVATE_V3_DEPLOYED / HUMAN_REVIEW_PENDING`.
6. Treat Figma, Make, Shopper and Evidence-OS sources as read-only evidence.

## 2. Contract checks

- Final Design node `614:75950` controls the current four-zone hero structure.
- The trust rail uses its approved five-item visual-fixture copy, not a development disclaimer.
- Main review surfaces use realistic customer-facing cards.
- Customer routes contain no backend vocabulary.
- MK-2866 renders exact `90 SERVINGS`; `90 CAPS` is absent.
- The dark footer is the sole inverse surface.
- All 15 routes and stable anchors in `MANIFEST.md` remain present.

## 3. Visual-QA order

### Pass A — Global shell and homepage

Review:

1. trust rail and primary navigation;
2. `/#hero` against `614:75950` and `614:75995`;
3. `/#assurance`;
4. `/#compound-families`;
5. `/#featured-products`;
6. `/#reviews`;
7. `/#related-products`;
8. `/#footer` as the sole inverse.

### Pass B — PDP

Review:

1. `/product/mk-2866#purchase`;
2. media controls and assurance;
3. `/product/mk-2866#dossier`;
4. `/product/mk-2866#lab-records`;
5. reviews and related product.

### Pass C — OpenLab

Review in this order:

1. `/open-lab/records`;
2. `/open-lab/records/source-bound-record`;
3. `/open-lab`;
4. `/open-lab/dossier/mk-2866`;
5. `/open-lab/batch-lookup`;
6. `/open-lab/methodology`;
7. `/open-lab/source-chain`;
8. `/open-lab/compare`;
9. `/about/evidence-os`.

### Pass D — Remaining customer routes and review index

Review `/shop`, `/reviews`, `/about` and `/review`. Confirm every `/review` link reaches the registered route or anchor.

## 4. Acceptance matrix

Check every customer route at `1440`, `1024`, `768` and `390` px.

| Area | Pass condition |
|---|---|
| Route | Resolves without missing-page or client/server failure |
| Width | Zero horizontal page overflow and no clipped fixed-width composition |
| Shell | Primary navigation remains clear; Lab Records remains prominent |
| Trust rail | Approved customer copy is legible; no dev disclaimer replaces it |
| Hero | Four-zone relationship recomposes without a decorative right cobalt edge |
| Product truth | `90 SERVINGS` present; `90 CAPS`, decimal/crossed/per-serving pricing absent |
| Cards | Chamber, identity, bordered metrics, status, price and actions remain coherent |
| Dossier | Facts, media and composition preserve order without overlap or clipping |
| OpenLab | Evidence presentation is customer-facing and makes no runtime claim |
| Reviews | Realistic rendered cards appear on main surfaces; no fixture labels are visible |
| Footer | Dark and legible; the only inverse surface |
| Copy | No visible backend/governance/fixture vocabulary |
| Review index | Every stable link and anchor in `MANIFEST.md` resolves |

## 5. Local verification

From `sites/oluk-experience-lab`, rerun the repository-defined checks for:

- production build;
- lint;
- type checking;
- all 15 server-rendered routes;
- exact MK-2866 truth;
- forbidden customer vocabulary;
- responsive CSS contract;
- stable `/review` targets.

Record commands, results and current source identity in `CURRENT-STATE-RECEIPT.md`. A successful automated check does not substitute for browser visual QA.

## 6. Private-preview gate

1. Do not deploy unless the receipt records the completed four-width QA gate.
2. Complete the four-width visual pass.
3. Record remaining defects or human acceptance.
4. Use the Codex Sites hosting workflow only for the already approved owner-only preview; never alter access policy.
5. Record the exact V3 URL, version and source identity after a successful private deployment.
6. Never reuse the historical V2 URL as proof that V3 is deployed.
7. Do not publish publicly or connect a production domain.

## 7. Failure routing

| Failure | Route to |
|---|---|
| Visual hierarchy or responsive defect | MF-03 V3 Sites lane |
| Incorrect product truth | Repository authority and `DECISIONS.md` |
| Figma/value disagreement | `AUTHORITY-MATRIX.md`; visual structure does not confer runtime truth |
| Broken review anchor | Review index, target surface and manifest must change together |
| Build/test failure | Sites implementation owner |
| Basket, payment, Woo or C2 dependency | Stop; later explicitly authorized stage |
| Deployment request before QA | Stop; V3 is local only |

## 8. Rollback

Preserve the V2 rejection and V3 review evidence. Revert or supersede only bounded V3 Sites changes in the isolated worktree. Do not rewrite MF-01/MF-02 history and do not use Shopper SSR, payment or C2 changes as a rollback mechanism.
