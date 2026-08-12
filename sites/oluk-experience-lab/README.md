# Olympus Labs UK Experience Lab

Private Codex Sites review build for the MF01–MF03 Olympus UK commerce and OpenLab convergence lane.

## Authority boundary

This project carries the approved `CONV-001` champion state into an implementable design/review candidate. It does not own or connect live inventory, reviews, evidence, basket, checkout, payment, WooCommerce, Shopper SSR, Initiator, or C2 state. Customer routes intentionally contain no governance labels; `HUMAN_REVIEW_REQUIRED` remains explicit in `/review`, contracts and project documentation while publication stays blocked.

The authority order is append-only:

1. `INHERITED_CHAMPION_STATE`: MF01A material relationships, anatomy, product-to-evidence logic and the converging component grammar.
2. `THIS_RUN_DELTA`: corrected product truth, canonical sources, four graduated single shadows and legacy-variable archival.
3. `DO_NOT_INHERIT`: raw later-board composition, the wrapped Hero component, `90 CAPS`, and the archived two-layer shadow recipe.

The 12px metadata / 15–16px body floor is implemented only as a review proposal and remains non-controlling.

Current governed product truth is limited to:

- SARM SERIES
- MK-2866 / Ostarine
- SKU 80529-01
- 15 MG
- 90 SERVINGS
- >99%
- IN STOCK
- OPENLAB VERIFIED
- £43

## MF01–MF03 review surfaces

- `/` — ProductDecisionHero with a purpose-built HeroDecisionSurface; layout follows the approved locked-hero composition without embedding the rejected wrapped Hero component.
- `/shop` — adaptive commerce-card family and product filters.
- `/product/mk-2866` — media chamber, PurchasePanel, AssuranceRail, corrected Dossier and RelatedRail.
- `/open-lab` — one light-mode Olympus/OpenLab portal spanning Technical, Product evidence and Commerce.

All four surfaces preserve the light Softform material grammar. Compact, Vertical/Featured, PurchasePanel and Relation use their approved single graduated shadows. The footer is the sole inverse surface.

## Routes

- `/`, `/shop`, `/product/mk-2866`, `/reviews`, `/about`
- `/open-lab`, `/open-lab/records`, `/open-lab/records/source-bound-record`
- `/open-lab/dossier/mk-2866`, `/open-lab/batch-lookup`, `/open-lab/methodology`
- `/open-lab/source-chain`, `/open-lab/compare`, `/about/evidence-os`

## Local validation

```bash
npm install
npm run lint
npm run typecheck
npm test
```

`npm test` builds the Vinext worker, renders every approved route, and checks the product, fixture, evidence, light-mode, and responsive CSS boundaries. A passing build does not replace human visual review at 1440, 1024, 768, and 390 px.

## Hosting

`.openai/hosting.json` binds this directory to its Codex Sites project. Deployment is owner-only/private review; do not add public access, a custom domain, or production-runtime integrations without a new explicit decision.
