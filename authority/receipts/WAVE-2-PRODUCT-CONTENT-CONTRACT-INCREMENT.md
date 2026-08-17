# Wave 2 product-content contract · source-binding increment

**Status:** `IMPLEMENTED_VERIFIED_HUMAN_REVIEW_REQUIRED_UNPUBLISHED`
**Date:** 2026-08-17
**Branch:** `codex/wave2-content-contracts`
**Implementation commits:** `7c6a1aad2b0120d879a680549a4731734d952e72`, `432ae30`, `7d9dacc`
**Deployment:** `NONE`
**Runtime authority:** `NONE`

## Outcome

This is the first source-binding increment for the OLUK product-content system, not full ecosystem completion. It adds the canonical product-content schema and 16-product registry, copy-source provenance ledger, 21-row route/module consumption matrix, 20-slot reusable component catalogue, deterministic compiler, fail-closed customer projections, route adapters and a credential-free route/provenance selector handoff.

The normalized selector handoff contains 21 route selectors, 16 product indexes and 36 unique field policies per product at content hash `0b7bfb5bafa1f7045dd9ae732527d960b922b7772a0c324e16a0b09a0fc64fc5`. It exposes field paths, readiness, source layers, provenance binding IDs, omission/unavailable behavior and resolver metadata only. Its design-repository state is deliberately `PREPARED_NOT_ATTACHED`; downstream local attachment after the bounded C2/Shopper v1 proof is separate evidence and does not grant live runtime authority.

## Authority boundaries

- Labels and approved final transparent renders own customer presentation facts and product appearance.
- OpenLab/Janoshik owns analytical wording for the exact bound record. The compiler is derivative/provenance machinery, not a new analytical source.
- Woo/C2 owns current price, inventory and purchasability. Registry values remain `null`; selectors carry resolver identity and fallback only.
- Figma/Sites remains visual-composition authority. This increment made no Figma mutation and published no component, variable or Code Connect mapping.
- No Sites deployment, Woo mutation, Shopper production mutation, C2 credential change, checkout/payment change, runtime promotion or publication occurred.
- Customer output must not infer medical claims, dosage, purity, provider-file state, price, inventory, purchasability or evidence from a neighbouring product.

## Sources used and provenance failures retained

The compiler consumes the five canonical authority artifacts and their field bindings. Source layers include the confirmed label/final-render records, `OPENLAB-PUBLIC-PROJECTION-V2-MK2866.json`, `SHOP-TAXONOMY-CONTRACT.json`, the current-state and identity receipts, the registered product fixtures, and bounded Make product data only where the ledger permits that use.

The ledger contains 33 usable bindings and three retained provenance failures. The supplied Yoast CSV contains only four non-product rows, so claimed per-product metadata locators do not exist; no product SEO field is backed by those locators. Upstream compiled descriptions without field-level citations are not promoted merely because they exist. Historical static price, stock, generic evidence and relationship fixtures are quarantined rather than treated as product truth.

## Coverage and fail-closed adoption

- Registry: 16 products — `1 CONTENT_READY`, `6 SOURCE_BOUND`, `9 EDITORIAL_CHOICE`.
- MK-2866 is the only complete customer projection. It carries source-backed identity, long description, three FAQs, label facts, the named OL2201 / Janoshik 28868 record, customer-safe SEO, route variants and the approved render.
- Source-bound or unresolved products retain their facts and bindings in authority, but customer projections omit them until the content state permits rendering. Explicit OpenLab unavailable boundaries remain available where the evidence contract supports that state.
- Homepage, commercial cards, PDP hero/dossier/evidence, OpenLab, record/report/document, collections, comparison, bundle/stack, education/support and transaction-silence families are named in the matrix. Route counts are reconciled rather than added: 31 historical four-width candidates, 52 exact customer registry routes, 68 physical Next page patterns, 73 canonical ledger dispositions and 19 standalone candidates outside the ledger.
- Static price, in-stock, Offer/InStock JSON-LD, generic verification, cross-product evidence borrowing and studio/render substitution are absent from the customer projection.
- Pending relationship fixtures are suppressed in bag, confirmation and account continuation. They do not reappear as generic recommendations while bundle/stack reasons remain editorial choices.

## Route/provenance selector contract

Each route selector names route patterns, module/component slot, audience, field references, allowed source layers, missing-content behavior, forbidden content and the four content-state actions. Each product field policy then names its kind, states, emission, provenance binding IDs and source layers. Commerce entries are `RUNTIME_RESOLVER_ONLY`; the handoff contains no token, credential, tenant/provider context, browser authority call or resolved commerce value.

The typed selector returns customer values only for `CUSTOMER_VALUE` and `EXPLICIT_UNAVAILABLE`. `SOURCE_BOUND`, unresolved evidence and editorial choices remain omitted. This preserves a visible distinction between mapped/staged content, explicit unavailable state and pending mapping.

## Validation

- `5/5` canonical authority JSON files parse.
- `npm run product:check` passes the deterministic product, card and route-selector projections. The active registry has 16 products, 33 bindings, 21 route rows and 20 reusable slots, with no frozen commerce values or unsafe customer copy.
- `npm run typecheck` and `npm run lint` pass.
- Production build passes across 68 physical route patterns. The existing vinext `FILE_NAME_CONFLICT` warning for `surface-grid` CSS remains non-blocking and was not reclassified as resolved.
- Full Node suite passes `159/159`. Focused product-content and transaction tests pass `15/15`.
- The initial Wave 2 browser audit passes `56/56` cases across 14 relevant routes at `1440 / 1024 / 768 / 390`; the four deferred image-settle cases pass `4/4` after scroll/decode, with the exact 1365×2048 alpha render. The current root MF-09 rerun passes `4/4` at the same widths.
- Interaction proof passes `41/41`, including exact source-ready hero failure closure, keyboard/focus behavior and `8/8` inert transaction routes with zero product callbacks.
- Customer-surface grammar remains honestly `FOUNDATION_READY_ROUTE_REFACTOR_REQUIRED`: 44 audited routes, 431 loose copy groups and 22 source findings. This increment does not convert machine grammar coverage into visual approval.
- `git diff --check` passes. Browser captures and temporary proof output are machine evidence only; no new champion-reviewed baseline was published.

## Contradictions resolved in implementation

- The route-count conflict is resolved by classifying 31, 52, 68, 73 and 19 as different, non-additive inventories.
- Nonexistent Yoast product locators are recorded as failures, not silently used for SEO.
- MK-2866 source-reported evidence replaces generic `OPENLAB VERIFIED`; every other product fails closed without borrowing MK-2866.
- Static price/in-stock/default evidence and unapproved bag/post-purchase stack fixtures are removed from adopted customer paths.
- Customer-ready projection and source-bound authority are separate: retaining a verified label fact does not automatically authorize its publication on every route.

## Editorial choices and remaining gates

- Approve or reject non-ready long descriptions, FAQs, customer theses, use contexts and product-specific SEO.
- Supply typed, customer-safe bundle/stack relationship reasons before positioning, recommendation or continuation slots may render.
- Close unresolved label, final-render and OpenLab bindings, then explicitly promote individual atoms from `SOURCE_BOUND` or pending state; never infer promotion from file presence.
- Complete human review of long copy, mobile wrapping, unavailable states and the exact downstream consumer attachment.
- Branded R03/OpenLab PDFs remain `LOCAL_REVIEW_ONLY`; publication review is separate and does not block this source-bound local staging increment.

## Risk and rollback

The change is additive and repository-local. Roll back by reverting `7c6a1aad2b0120d879a680549a4731734d952e72`, `432ae30` and `7d9dacc` in reverse order. Do not delete provenance failures, promote pending fields, connect runtime owners, restore static commerce/evidence fixtures or provision transport credentials by inference.
