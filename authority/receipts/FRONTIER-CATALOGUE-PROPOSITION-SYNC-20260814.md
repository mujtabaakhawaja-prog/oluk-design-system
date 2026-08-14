# Frontier catalogue proposition sync — 2026-08-14

## Purpose

Bring the Sites catalogue's customer-facing product proposition layer into line with the approved Your Stack standard, then apply the same currently approved stack-price overrides to the editable native PDP mirrors in Final-Design.

## Sites changes

- Rewrote all 16 product records in `frontier-content.ts` around a customer outcome, product role and format-specific reason to choose it.
- Kept MK-2866 fixed at `15 MG · 90 SERVINGS · >99% · £43 · SKU 80529-01`.
- Aligned the three Your Stack product records with the approved implementation: RAD-140 `8 MG · 60 SERVINGS · £55`; MENT `20 MG · 30 SERVINGS · £49`; MK-677 `15 MG · 90 SERVINGS · £45`.
- Removed implementation vocabulary from the rendered PDP proposition test and rendered every catalogue PDP to prove its own identity, strength, servings and price remain visible.

## Native Figma sync

Final-Design file: `BEPMuUt1HroEw8xjz8CVyN`

| Reference | Current native node | Synced overrides |
| --- | --- | --- |
| PDP desktop | `1262:24455` | `Your stack · paired with MK-2866`; RAD-140 £55; MENT £49; MK-677 £49; featured RAD-140 £55 |
| PDP mobile | `1262:25038` | RAD-140 £55; MENT £49; MK-677 £49; featured RAD-140 £55 |

The Figma work updated existing native component-instance overrides only. It did not introduce a local card redraw, a new token, a library publication, or a new design authority.

## Validation

- `npm run typecheck`: pass.
- `npm test`: 96/96 pass.
- `npm run proof:cx45 -- --output=/tmp/oluk-customer-copy-20260814.json`: 70/70 customer-route cases pass; zero customer-copy failures.
- Full current-branch regression rerun after the copy changes:
  - MF-09 QA geometry: 292/292 route-width cases pass at 1440, 1024, 768 and 390; QA mode retained machine evidence without generating a manual-review set.
  - Accessibility: 146/146 pass.
  - Contrast, 200% reflow and long-copy: 70/70 pass; zero automated failures.
  - Interaction and static transaction boundary: 35/35 pass, including 8/8 zero-callback cases.
  - Current local receipts: `/tmp/oluk-mf09-catalogue-sync-20260814.json/mf09-four-width-receipt.json`, `/tmp/oluk-a11y-catalogue-sync-20260814/mf09-accessibility-smoke.json`, `/tmp/oluk-contrast-catalogue-sync-20260814.json/cx38-contrast-zoom-long-copy.json`, and `/tmp/oluk-interactions-catalogue-sync-20260814/cx37-interaction-state-proof.json`.

## Scope limit

This is a content and native-reference alignment. The QA results are current machine evidence; representative Sites-to-Figma visual comparison and human champion decisions remain separate. This receipt does not promote a Figma or Sites artifact to `sync-verified` or `champion-approved`.
