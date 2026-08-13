# Waves 0–6 · Governed Site Reference Receipt

Status: `IMPLEMENTED_VERIFIED_HUMAN_REVIEW_REQUIRED_UNPUBLISHED`

Date: 2026-08-13

This receipt closes the governed reference milestone through Wave 6. It does not close the terminal 73-route maturity program, publish Figma material, authorize Shopper SSR adoption, connect Tools, deploy a runtime, or authorize Woo/payment mutation.

## Authority and contract

- Base lineage contains merge `9880f4c` and the CONV-004 corrective merge `12e39c6`.
- Work is isolated on `codex/oluk-full-site-reference`.
- `SITE-ROUTE-LEDGER.json` retains 73 unique canonical dispositions and `/open-lab` as the only canonical OpenLab namespace.
- `FIGMA-INTENT-REGISTRY.json` records exact intent nodes from Commerce + Growth, PDP, Commerce + Checkout, and OpenLab.
- Baseline copy that asserts unsupported OpenLab facts is `source-required` or `prohibited-as-fact`.
- The generated design contract remains the single Sites projection; runtime authority is `NONE`.

## Implemented milestone

- OpenLab field-level authority includes value, source, state and supersession.
- Report cardinality is report-level; threshold purity is excluded from exact arithmetic.
- Missing source, report, method, analyte and instrument fields fail closed.
- PDP mounts the shared growth rail after primary decision content.
- Bag and confirmation mount the same governed recommendation/restock components with disabled presentation actions.
- Checkout preserves the approved payment-trust lifecycle language and GBP/USD equality contract.
- All checkout reference stages remain static: no forms submit, no service calls, no provider SDK, no callbacks and no local mutation authority.

## Executable proof

- Build, typecheck and lint: PASS.
- Node tests: 63/63 PASS.
- Four-width route proof: 160/160 PASS at 1440, 1024, 768 and 390.
  - `/var/folders/hk/2_hychjx1kg3lsk1m0r332440000gn/T/oluk-mf09-proof-V0HxcZ/mf09-four-width-receipt.json`
- Accessibility smoke: 80/80 PASS.
  - `/var/folders/hk/2_hychjx1kg3lsk1m0r332440000gn/T/oluk-a11y-smoke-Mh9otF/mf09-accessibility-smoke.json`
- Contrast, 200% text reflow and long-copy: 38/38 PASS; zero axe contrast violations; 38 manual-review incompletes retained.
  - `/var/folders/hk/2_hychjx1kg3lsk1m0r332440000gn/T/oluk-contrast-zoom-QrTVIS/cx38-contrast-zoom-long-copy.json`
- Interaction and transaction boundary: 35/35 PASS, including 8/8 static transaction routes with zero callbacks.
  - `/var/folders/hk/2_hychjx1kg3lsk1m0r332440000gn/T/oluk-interaction-proof-uNfA1i/cx37-interaction-state-proof.json`

## Remaining gates

- Wave 7: complete or authority-defer all remaining rows in the 73-route ledger.
- Wave 8: champion visual review and Figma backfill from rendered Sites captures.
- Wave 9: Shopper SSR adoption from the generated contract.
- Waves 10–11: Tools alignment, runtime integration and promotion through their separate owner gates.
- Figma library publication, hosting, runtime deployment, Woo mutation and payment integration remain unauthorized.
