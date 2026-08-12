# MF-03 — Codex Sites V3 Visual-QA Brief

> **Superseded active status — 2026-08-11:** This file is preserved as MF-03 revision-3 history. Current control is [`FC-01 Candidate Foundation Convergence`](../fc-01-candidate-foundation-convergence/guidelines.md). MF-03 v3 is `TECHNICALLY_HEALTHY / DESIGN_CONVERGENCE_FAILED / HUMAN_REVIEW_PENDING`; `614:75994` supersedes `614:75950` for the opening. MF-03 v2 remains `REJECTED_VISUAL_TRANSLATION`.

**Mode:** How-to guide
**Status:** `PRIVATE_V3_DEPLOYED / HUMAN_REVIEW_PENDING`
**Target:** `sites/oluk-experience-lab`
**Output:** Validated local candidate, then a separately authorized private review preview

## Objective

Finish visual QA for the 15-route V3 experience lab. Preserve the current customer-facing composition, correct discrepancies against the registered Figma structures and stop before deployment or runtime translation.

V2 is `REJECTED_VISUAL_TRANSLATION`. V3 supersedes its visual treatment but does not become Shopper SSR, evidence, review-system, payment, C2 or release authority.

## Required shell

- Primary navigation: `Shop / Open Lab / About`.
- Keep `Lab Records` as the prominent OpenLab action.
- Exclude Wholesale, Sign In, currency and Appearance controls.
- Use the approved trust-rail fixture copy: `Free UK Delivery Over £50`, `Free Int'l Delivery £300+`, `Third-Party Lab Verified`, `JANOSHIK Validated`, `Encrypted Checkout`.
- Do not show a development disclaimer or backend vocabulary on customer routes.
- Use the exact on-light logo asset.
- Use a dark footer as the sole inverse surface.

Trust-rail copy is a visual fixture. It does not prove fulfilment, checkout or evidence integration.

## Homepage `/`

Use Final Design node `614:75950`, especially `614:75995`, as the current hero-structure source:

1. OpenLab Portal and OpenLab Archive containers in the left stack;
2. a central Featured ProductCommerceCard;
3. four compound-family cards at right;
4. a lower BatchTicker spanning the composition.

Keep the corrected family taxonomy: SARMs, Prohormones, Research Chemicals and Stacks. Preserve the ProductCommerceCard chamber, bordered MetricRail, status, price and action hierarchy. Use exact MK-2866 truth with `90 SERVINGS`; reject `90 CAPS`.

The remaining homepage order is assurance, compound families, featured products, OpenLab/archive entry, realistic reviews, related product and the sole-inverse footer.

## Reviews

- Render realistic review titles, names, dates, star ratings and `Verified purchase` on the homepage and `/reviews`.
- Keep loading, empty and unavailable states out of the main customer presentation.
- Do not expose `DESIGN FIXTURE`, `DEMO STATE`, `NOT CUSTOMER DATA`, `Sample reviewer` or similar implementation labels.
- Treat rendered reviews as visual fixtures in documentation until a later review-system owner binds real records.

## PDP `/product/mk-2866`

Use this order and retain the stable anchors:

1. `#purchase` — full-field media plus raised purchase plane;
2. media/context controls;
3. assurance rail;
4. `#dossier` — responsive Facts/Media/Composition dossier;
5. `#lab-records` — evidence header, record presentation and OpenLab handoff;
6. reviews;
7. related product.

Use `SARM SERIES · MK-2866 · Ostarine · SKU 80529-01 · 15 MG · 90 SERVINGS · >99% · £43` exactly.

## OpenLab routes

Validate archive and individual record first, then portal, dossier, lookup, methodology, source chain, compare and EvidenceOS. Treat node `614:75950` and its OpenLab sections as structural sources. Values, dates, charts, reports, PASS/verified states and aggregates derived from design material remain visual fixtures, not runtime evidence.

Customer copy must never expose `GOVERNED`, `SOURCE-BOUND`, `DESIGN FIXTURE`, `DEMO STATE`, `NOT CONNECTED`, `CATALOGUE SOURCE PENDING` or similar backend vocabulary. The stable route `/open-lab/records/source-bound-record` remains unchanged even though that phrase is not rendered as customer copy.

## Private `/review` route

Maintain all review links and anchors registered in `MANIFEST.md`. The review index is the V3 inspection surface for:

- hero;
- assurance;
- compound families;
- featured products;
- reviews;
- related product;
- PDP purchase, dossier and Lab Records;
- OpenLab portal, archive and individual record;
- footer.

## Responsive gate

Review every route at `1440`, `1024`, `768` and `390` px. Pass only when:

- there is zero horizontal page overflow;
- the hero grid genuinely recomposes;
- cards and dossier panels do not clip;
- archive rows transform before columns become unreadable;
- body and metadata type floors remain readable;
- `/review` links land on stable targets;
- the dark footer remains the only inverse surface.

## Reject

- visible `90 CAPS`;
- visible backend/governance/fixture vocabulary;
- a customer-facing development disclaimer;
- a second inverse surface or dark page;
- cream, blanket grey or generic Tailwind-grey surfaces;
- right-side decorative cobalt hero edge;
- clipped cards, rails, tables, dossier content or footer;
- deployment before the local visual-QA receipt is updated;
- any Shopper SSR, Woo, Initiator/payment, C2 or Figma mutation.

## Completion

Rerun build, lint, type, rendered-route and stable-anchor checks against the final local source. Record the exact results in `CURRENT-STATE-RECEIPT.md`. V3 remains local until visual QA is complete and a separate private-preview action is authorized.
