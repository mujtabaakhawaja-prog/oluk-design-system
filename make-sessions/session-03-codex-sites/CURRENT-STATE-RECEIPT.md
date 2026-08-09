# MF-03 — V3 Current State Receipt

**Mode:** Reference
**Receipt date:** 2026-08-10
**Status:** `LOCAL_QA_PASSED / READY_FOR_PRIVATE_REVIEW`
**Deployment:** `NOT DEPLOYED`
**Authority:** Local design/review candidate only

## PLAN

Validate the 15-route V3 experience lab against the latest human decisions, current Figma structure and four-width acceptance gate, then publish only to the existing owner-only Sites project. Preserve V2 rejection provenance and keep runtime, evidence, review-system, payment, C2 and release authority separate.

## DIFF SUMMARY

### Isolated workspace

- Worktree: `/Users/mujtabakhawaja/Worktrees/oluk-mf-codex-sites-v3-corrections`
- Branch: `codex/mf-codex-sites-v3-corrections`
- Base reference: `origin/main` at `27c399fbc3b3123a82293a2f4ade9e5fbd78c6fd`
- Current committed branch head at receipt preparation: `37cd62c01e751f0d0033a9bbe23be580235c1a3e`
- Site root: `sites/oluk-experience-lab`
- Local V3 implementation changes are present in the worktree and do not yet have a deployed source identity.

### Historical V2 disposition

- Review captures: `573:64880`, with screenshots `573:64872` through `573:64879`.
- Historical owner-only URL: `https://oluk-experience-lab.sigmamindset.chatgpt.site`.
- Historical deployed source: `7a382206fc4fc573425a7c8b0bd5d4b810b4a2b5`.
- Formal verdict: `REJECTED_VISUAL_TRANSLATION`.
- V2 remains useful for review provenance and source/data-honesty lessons. Its URL and deployment metadata are not V3 proof.

### V3 implementation state

- Fifteen routes are implemented locally, including the private `/review` index.
- Final Design node `614:75950` is the current structural source for the corrected hero grid.
- The hero uses two left containers, a central Featured ProductCommerceCard, right-side compound-family cards and a lower BatchTicker.
- Exact MK-2866 truth uses `90 SERVINGS`; `90 CAPS` is rejected.
- Approved trust-rail fixture copy is rendered in the customer register.
- Realistic rendered reviews are present on the main customer surfaces.
- Backend/governance/fixture vocabulary is excluded from visible customer copy.
- The dark footer is the sole inverse surface.
- Shopper SSR, WooCommerce, Initiator/payment, C2 and Figma remain untouched by this lane.
- V3 has passed local QA and is ready for its already approved owner-only publish; it has not yet been hosted or promoted.

## ROUTES AND REVIEW CONTROL

- Route count: `15`.
- Acceptance widths: `1440 / 1024 / 768 / 390`.
- Overflow requirement: zero horizontal page overflow.
- Private review route: `/review`.
- Stable targets: `#hero`, `#assurance`, `#compound-families`, `#featured-products`, `#reviews`, `#related-products`, `#purchase`, `#dossier`, `#lab-records` and `#footer`, plus the registered OpenLab routes.
- Full route and anchor inventory: `MANIFEST.md`.

## TESTS

| Check | Current result | Evidence or next proof |
|---|---|---|
| Dedicated worktree and branch | `PASS` | Paths and revisions above |
| V2 status formalized | `PASS` | `FIGMA-REVIEW.md` and this receipt |
| V3 15-route implementation | `PASS` | Rendered-route test enumerated and rendered all 15 routes |
| Exact `90 SERVINGS` contract | `PASS` | Customer-truth assertion passed; prohibited variants absent |
| Backend vocabulary removed from customer UI | `PASS` | Visible-text assertion passed across all 14 customer routes |
| Stable `/review` anchors | `PASS` | Link and target assertion passed |
| Production build | `PASS` | Vinext production build completed |
| Lint | `PASS` | ESLint completed without findings |
| Type check | `PASS` | `tsc --noEmit` completed without findings |
| Production dependency audit | `PASS` | Zero vulnerabilities |
| 1440/1024/768/390 browser QA | `PASS` | 60 route/viewport combinations; headings present; no broken images or forbidden visible terms |
| Zero horizontal overflow | `PASS` | No page overflow in the 60-combination sweep |
| V3 private preview | `AUTHORIZED / PENDING` | Publish to the existing owner-only Sites project without access changes |
| Public/production deployment | `NOT AUTHORIZED` | Separate release authority required |

## TELEMETRY

No runtime telemetry, inventory source, review source, evidence source, payment provider or C2 service is connected by this lane. Visual completeness must not be interpreted as a live integration claim.

## DOCS

- `guidelines.md` — active design, copy and QA laws
- `MANIFEST.md` — inputs, 15 routes, stable anchors and exclusions
- `AUTHORITY-MATRIX.md` — visual/runtime/evidence/payment/C2 authority boundaries
- `PROMPT.md` — V3 visual-QA brief
- `RUN.md` — local validation and later private-preview gate
- `DECISIONS.md` — latest human decisions and deferrals
- `FIGMA-REVIEW.md` — rejected V2 review provenance

## RISK/ROLLBACK

- Realistic reviews and trust copy may look live; `AUTHORITY-MATRIX.md` records that they are visual fixtures only.
- Figma-derived OpenLab values may look evidential; they are not publication or runtime proof.
- The dark footer is an explicit V3 exception and must not expand into dark pages or a second inverse section.
- The worktree contains in-progress Sites changes owned by the implementation lane. Documentation work must not overwrite or stage them accidentally.
- Rollback is limited to the V3 worktree. Do not change Shopper SSR, Woo, payment or C2 as a rollback mechanism.

## NEXT COMMANDS

1. Commit and push the exact QA-passed source state.
2. Package that committed state with the Sites helper.
3. Save and deploy a new private version to the existing owner-only project.
4. Verify the live review index and representative customer routes in the authenticated owner session.
5. Update this receipt with the exact hosted version and deployment identity.
