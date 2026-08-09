# Olympus Labs UK Experience Lab

Private Codex Sites review build for the MF-03 commerce and OpenLab convergence lane.

## Authority boundary

This project is a design/review candidate. It does not own or connect live inventory, reviews, evidence, basket, checkout, payment, WooCommerce, Shopper SSR, Initiator, or C2 state. The persistent in-product notice and local `DEMO STATE`, `DESIGN FIXTURE`, and `SOURCE-BOUND` labels are part of the acceptance contract.

Current governed product truth is limited to:

- SARM SERIES
- MK-2866 / Ostarine
- SKU 80529-01
- 15 MG
- 90 SERVINGS
- >99%
- £43

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
