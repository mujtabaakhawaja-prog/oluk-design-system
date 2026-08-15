# Account and Retention — owner composition decision

**Decision ID:** `DEC-ACCOUNT-RETENTION-001`
**Recorded:** 2026-08-14
**Status:** `CHAMPION · OWNER_REVIEWED_AND_SELECTED_FOR_FUTURE_ACCOUNT_WAVE`
**Scope:** `COMPOSITION_DIRECTIVE_ONLY`

## Source reviewed

- Sites candidate source: [PR #42](https://github.com/mujtabaakhaja-prog/oluk-design-system/pull/42), `codex/oluk-account-retention-candidates` at `e597d24b369b6b1c524efc95923b8fc537082301`.
- Reviewed at the complete 1440 and 390 Sites compositions.
- The candidate branch remains a draft, unmerged owner-review source. This decision does not rebase, merge, or otherwise alter it.

## Selected future composition

Use a **C-led Retention Lab hybrid** for the future Account and Retention family:

1. **Retention Lab leads.** The account is a product-continuation and return-to-product environment, rather than a generic dashboard.
2. **A’s decision spine is the first available action.** When a known order or product exists, it becomes the primary actionable surface.
3. **B’s activity/history is supporting context.** It appears only when genuine order records exist; it never outranks the product decision.
4. **Retention services stay truthful.** Saved stacks, Smart Restock, rewards, and subscriptions remain explicit secondary unavailable states until their accountable runtime projections exist. No balances, dates, eligibility, recommendation, or service state may be inferred.

## Boundaries retained

- The canonical 73-route ledger remains unchanged: no route is added, promoted, or reclassified by this decision.
- This is not Account runtime implementation. The current Commerce + Checkout runtime tranche remains unchanged.
- No Figma or Figma Make work, library publication, Review Studio payload refresh, service mutation, or runtime wiring is authorized by this record.
- A later Account runtime wave still requires separate scope, data-owner contracts, and release authorization.

## Implementation handoff

When the Account family is scheduled, implement the directive from the latest authorized Sites baseline and reconcile PR #42 as a candidate source rather than treating its draft snapshot as automatically current. Preserve the selected hierarchy at both 1440 and 390, and keep unavailable retention concepts secondary to the first actionable known-order/product decision.

## Rollback

The decision ledger is append-only. If the owner changes this direction, add a later decision event that names `DEC-ACCOUNT-RETENTION-001` in `supersedes`; do not rewrite this record or silently change the candidate hierarchy.
