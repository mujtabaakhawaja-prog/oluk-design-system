# Wave 2 family content-template contracts

Status: `IMPLEMENTED_VERIFIED_HUMAN_REVIEW_REQUIRED_UNPUBLISHED`

Date: 2026-08-17

Branch: `codex/wave2-content-contracts`

Deployment: `NONE`

Runtime authority: `NONE`

## Outcome

Added reusable, family-level content and provenance slot contracts for Family 1
Discovery and Family 2 Product. The contracts reference the canonical product
registry, provenance ledger, and reusable slot catalogue; they are not a route
map, product catalogue, commerce projection, or C2 consumer change.

## Family law

- Discovery permits identity, confirmed transparent final render, approved
  compact narrative, and explicit evidence availability/unavailability only.
- Product permits the same presentation baseline plus approved long copy,
  labelled facts/composition, source-reported dossier content, and approved
  FAQs.
- `SOURCE_BOUND` and `EDITORIAL_CHOICE` remain non-customer states; pending
  evidence is omitted or explicitly unavailable.
- Price, inventory, purchasability, cart, recommendation, outcome, dosage,
  provider-file and studio/generic-render defaults are prohibited.

## Sources and generated output

- `authority/FAMILY-CONTENT-TEMPLATE-CONTRACTS.json`
- `authority/PRODUCT-CONTENT-REGISTRY.json`
- `authority/COPY-SOURCE-PROVENANCE-LEDGER.json`
- `authority/PRODUCT-CONTENT-SLOT-CATALOGUE.json`
- generated `sites/oluk-experience-lab/app/design-system/family-content-template-contracts.generated.json`

Generated output is deterministic compiler evidence and remains local candidate
material. No Shopper transport/DTO, C2 projection, Woo, Figma, runtime or
deployment source changed.

## Validation

- `npm run product:check` PASS, including the family-template projection hash.
- `node --test tests/product-content-contract.test.mjs` PASS, 4/4.
- `npm run typecheck` PASS.
- `npm run lint` PASS.
- `git diff --check` PASS.

## Remaining gates

Long copy, customer thesis, FAQs, evidence and render slots outside their
content-ready/product-bound records remain explicitly pending, source-bound or
editorial-choice. Human review and separate consumer attachment remain required.
