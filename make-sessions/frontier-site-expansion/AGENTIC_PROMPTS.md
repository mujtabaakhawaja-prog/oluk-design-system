# Agentic Production-Facing Build Prompts

These prompts direct an implementation agent after a Make exploration is selected. They are intentionally module-first and must use the existing Sites SSOT rather than reintroducing styling primitives.

## Content and PDP agent

Implement the next PDP/content slice in `sites/oluk-experience-lab`. Read `authority/ids-plan.md`, `authority/surface-contract.md`, `authority/SITE-ROUTE-LEDGER.json`, `authority/FRONTIER-SECTION-MOUNT-REGISTRY.json`, `app/design-system/frontier-content.ts`, `app/design-system/product-fixtures.ts`, and the actual product assets under `public/assets/products/`. Extend `FrontierProductRecord` or its sibling registry; do not hand-write content in individual pages. Preserve exact MK-2866 truth and RAD-140 8 MG. Build canonical sections, typed route compositions, metadata, JSON-LD, breadcrumbs, comparison/related links, stacking guidance, product detail, considerations, evidence pathway and mobile strategy. Use only governed tokens and canonical product media; a product without a local render must retain a deliberate unpopulated chamber rather than a fabricated bottle. Test source content, product truth, no stale RAD-140 10 MG, section mounts, metadata, keyboard semantics, 390px compaction and the core suite.

## OpenLab feature agent

Implement the next OpenLab route/module slice in `sites/oluk-experience-lab` using `app/design-system/openlab-sections.tsx`, `authority/OPENLAB-SECTION-MODULE-REGISTRY.json`, `authority/FRONTIER-SECTION-MOUNT-REGISTRY.json`, and the existing four-state chip. Build actual page compositions for archive, record, dossier, report, lookup, methodology, source chain, compare, evidence workspace and owner dashboard. Reuse canonical sections; do not locally redraw cards, status chips, source actions, tables or product bridges. Make compact mobile states intentional: summary/disclosure for dense data and labelled horizontal scroll for comparisons. Customer-facing copy must be polished, but values and source-document content must be rendered as available/unavailable presentation records rather than fabricated. Add composition, source-link, no-result, mobile and keyboard tests.

## Checkout and growth agent

Implement Bag, checkout states, confirmation, tracking, return/refund, account continuation and growth modules as reusable presentation components. Use `payment-trust.tsx`, `transaction-presentation.tsx`, `program-components.tsx`, `frontier-sections.tsx`, and the checkout entries in `FRONTIER-SECTION-MOUNT-REGISTRY.json`. Preserve the exact GBP/USD lifecycle wording in `PROMPTS.md`; it is an inherited intentional UX system. Build static visual states only—no network calls, payment SDKs, storage, SDK embeds, form submission or mutations. Reuse RecommendationCard, RestockCard, UpsellContextRail and CheckoutStepIndicator. Validate static transaction zero-callback, currency copy, state matrix, route composition, a11y and 390px compaction.

