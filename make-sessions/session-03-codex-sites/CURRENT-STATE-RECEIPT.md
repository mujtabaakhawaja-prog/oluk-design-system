# MF-03 — V3 Current State Receipt

**Mode:** Reference
**Receipt date:** 2026-08-10
**Status:** `PRIVATE_V3_DEPLOYED / HUMAN_REVIEW_PENDING`
**Deployment:** Sites version `3` succeeded at the owner-only review URL
**Authority:** Private design/review candidate only

## PLAN

Validate the 15-route V3 experience lab against the latest human decisions, current Figma structure and four-width acceptance gate, then publish only to the existing owner-only Sites project. Preserve V2 rejection provenance and keep runtime, evidence, review-system, payment, C2 and release authority separate.

## DIFF SUMMARY

### Isolated workspace

- Worktree: `/Users/mujtabakhawaja/Worktrees/oluk-mf-codex-sites-v3-corrections`
- Branch: `codex/mf-codex-sites-v3-corrections`
- Base reference: `origin/main` at `27c399fbc3b3123a82293a2f4ade9e5fbd78c6fd`
- Deployed source commit: `91537b2d95b68ce5a553bc4186c404d1724e4c4d`
- GitHub branch: pushed to `origin/codex/mf-codex-sites-v3-corrections`
- Site root: `sites/oluk-experience-lab`
- The deployed archive and Sites source repository both resolve to the source commit above.

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
- V3 has passed local QA and is live for owner-only human review. It has not been promoted to public access or runtime authority.

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
| V3 private preview | `PASS` | Sites version 3 deployed successfully to the existing owner-only project |
| Public/production deployment | `NOT AUTHORIZED` | Separate release authority required |

## TELEMETRY

No runtime telemetry, inventory source, review source, evidence source, payment provider or C2 service is connected by this lane. Visual completeness must not be interpreted as a live integration claim.

## PRIVATE SITES RECEIPT

- Project: `appgprj_6a784499e0a481919243ddab0dcaadff`
- Version: `3`
- Version ID: `appgprj_6a784499e0a481919243ddab0dcaadff~appgver_4900734896d48191a24801504eac37a4`
- Source commit: `91537b2d95b68ce5a553bc4186c404d1724e4c4d`
- Archive content hash: `sha256:1c4444fc4b6c89d0532082bff2c1fc2a3e962effb77bafd088aa6d5d8f295832`
- Archive: `218` files, `8,990,720` bytes
- Deployment: `appgdep_6a78e24175a88191af9ef29cb3b686f3`
- Deployment status: `succeeded`
- Provider deployment: `site---6a784499e0a481919243ddab0dcaadff`
- Review URL: `https://oluk-experience-lab.sigmamindset.chatgpt.site`
- Access: `custom`; current user `owner`; access revision `1`; one owner; zero groups; zero external visitors
- Access mutation: none

## LIVE READBACK

- The authenticated owner session resolved the live homepage with the corrected MF-03 hero and zero horizontal overflow.
- `/review` resolved with `13` review items, `26` current/Figma links and zero horizontal overflow.
- `/product/mk-2866#dossier`, `/open-lab`, `/open-lab/records`, `/open-lab/records/source-bound-record` and `/reviews` resolved with their expected headings, zero broken images and zero horizontal overflow.

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

1. Review the live surfaces from `/review` and record pass/correction per item.
2. Keep V2 preserved as the rejected comparison baseline.
3. Apply any human-requested visual corrections within this Sites lane and repeat the four-width gate.
4. Begin Shopper SSR translation only after explicit human acceptance, using the separate runtime workflow.
