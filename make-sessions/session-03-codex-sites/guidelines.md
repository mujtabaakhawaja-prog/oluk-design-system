# MF-03 — Codex Sites V3 Convergence Guidelines

**Mode:** Reference
**Status:** `PRIVATE_V3_DEPLOYED / HUMAN_REVIEW_PENDING`
**Date:** 2026-08-10
**Worktree:** `/Users/mujtabakhawaja/Worktrees/oluk-mf-codex-sites-v3-corrections`
**Branch:** `codex/mf-codex-sites-v3-corrections`
**Implementation root:** `sites/oluk-experience-lab`
**Authority class:** Owner-only design/review candidate; not runtime or release authority

## Mission

Converge the accepted MF-01A, MF-01B and MF-02A relationships into the 15-route Olympus Labs UK experience lab. V3 passed local four-width QA and is live for owner-only human review. V2 is preserved as `REJECTED_VISUAL_TRANSLATION` evidence.

The V3 design supersedes the older Shopper visual treatment. It does not supersede product, inventory, evidence, review-system, checkout, payment, C2, deployment or release ownership. Use [`AUTHORITY-MATRIX.md`](AUTHORITY-MATRIX.md) whenever a value or state could be mistaken for runtime truth.

## Authority order

1. current human decisions in [`DECISIONS.md`](DECISIONS.md);
2. the visual/runtime boundaries in [`AUTHORITY-MATRIX.md`](AUTHORITY-MATRIX.md);
3. the active route, input and review inventory in [`MANIFEST.md`](MANIFEST.md);
4. repository identity, surface and PDP authority under `authority/`;
5. completed MF-01A, MF-01B and MF-02A records as historical design inputs;
6. current Figma nodes and Evidence-OS Make flow as inspected visual evidence;
7. older Shopper/runtime work as a functional cross-check only.

Repeated legacy patterns, generated Make code and labels such as “champion” do not outrank the current human-directed lane.

## V3 visual contract

- Use the cool luminous light system on all customer surfaces except the footer.
- The dark footer is the sole inverse surface. Do not introduce a second dark band, dark route or broad inverse pacing section.
- Keep exposed canvas legible around independent raised planes.
- Use bounded media chambers outside the established PDP first-fold exception.
- Use `#0057FF` for identity and quantified authority and `#256DFF` for interaction.
- Preserve `quantified metric > specification > qualitative attribute > structural edge`.
- Use Plus Jakarta Sans for display/editorial hierarchy and Inter for interface/support copy.
- Customer body copy is at least 15–16 px; metadata and eyebrows are at least 12 px.
- Do not introduce cream, beige, blanket achromatic grey, Tailwind-grey leakage, cobalt card perimeters, generic dashboard chrome or passive spacing corridors.
- ProductCommerceCard retains its chamber, identity, bordered MetricRail, status, price and action hierarchy.

## Current hero structure

Final Design node `614:75950` is the current structural source for the corrected homepage opening. Translate its relationships, not its prototype code or implied data ownership:

1. left stack with OpenLab Portal and OpenLab Archive containers;
2. central Featured ProductCommerceCard;
3. right stack of four compound-family cards;
4. lower BatchTicker spanning the composition.

The Sites implementation corrects the family taxonomy and responsive layout while retaining that four-zone grid. The hero has no decorative right-side cobalt edge. Cobalt remains inside meaningful dividers, metrics, actions and states.

## Global shell and trust rail

The primary navigation is `Shop / Open Lab / About`, with `Lab Records` as the prominent OpenLab action. Wholesale, Sign In, currency and Appearance controls remain deferred.

The following trust-rail copy is approved for V3 visual-fixture presentation:

- `Free UK Delivery Over £50`
- `Free Int'l Delivery £300+`
- `Third-Party Lab Verified`
- `JANOSHIK Validated`
- `Encrypted Checkout`

This copy demonstrates the intended trust hierarchy. It is not proof that a fulfilment, checkout or evidence source is connected. Do not replace it with a development disclaimer on customer routes.

## Product truth

The exact unqualified MK-2866 customer truth is:

`SARM SERIES · MK-2866 · Ostarine · SKU 80529-01 · 15 MG · 90 SERVINGS · >99% · £43`

`90 SERVINGS` is mandatory. Reject visible `90 CAPS`, decimal pricing, crossed pricing and per-serving pricing.

Other products, prices, inventory states, EvidenceStatus states, archive values and report specimens are visual fixtures unless a later runtime/evidence owner binds them. Their rendered completeness grants no runtime authority.

## Customer-copy rule

Customer routes must read as a finished storefront, not a system specification. Do not expose governance or implementation vocabulary including:

- `GOVERNED`
- `SOURCE-BOUND`
- `DESIGN FIXTURE`
- `DEMO STATE`
- `NOT CONNECTED`
- `CATALOGUE SOURCE PENDING`
- `RENDERED DESIGN FIXTURE`
- placeholder labels such as `Sample reviewer`, `Date slot` or `Purchase status slot`

The visual-fixture/runtime distinction belongs in this packet and the private review workflow, not in customer-facing copy.

## Reviews policy

- Render the three-card realistic review state on the homepage and `/reviews`.
- Use customer-facing titles, plausible names and dates, stars and `Verified purchase` treatment.
- Do not show fixture disclaimers or backend labels in the main presentation.
- Keep loading, empty and unavailable variants as implementation/reference states outside the main rendered composition.
- Treat every rendered review as a visual fixture until a governed review source, consent policy and aggregation contract are approved.

## OpenLab presentation boundary

- OpenLab is a customer-facing evidence destination, not backend documentation.
- Render the archive, record, dossier, lookup, methodology, source chain and comparison states with customer-facing language.
- Figma-derived records, dates, purity values, charts, PASS/verified states and aggregates are visual fixtures in V3. They are not runtime evidence or publication proof.
- Do not describe those states as live, connected, governed or production-ready.
- The canonical proof route remains `/open-lab/records/source-bound-record`; the phrase is a stable route identifier, not visible customer vocabulary.

## Stable review contract

The private `/review` route links to the anchors registered in `MANIFEST.md`. Do not rename or remove an anchor without updating the review index, route test and manifest together.

## Responsive acceptance

Every route must recompose at `1440`, `1024`, `768` and `390` px.

- Zero horizontal page overflow at every acceptance width.
- Reflow relationships; do not scale desktop artwork down.
- Header and trust content may condense, but primary navigation and Lab Records remain understandable.
- Product grids change column count without clipping cards or shrinking readable copy.
- Archive tables transform before their columns become unusable.
- Dossier and evidence layouts preserve semantic reading order when stacked.
- The dark footer remains coherent and legible at every width.

## Mutation and release boundary

This lane must not mutate:

- Olympus Shopper SSR;
- WooCommerce catalogue or orders;
- Initiator/payment behavior;
- C2 services, projections, checkout orchestration or tools;
- Figma nodes;
- public or production deployments.

The `champion-olympus-commerce-runtime` workflow, Olympus Initiator and project-scoped C2 tools are reserved for later explicitly authorized stages. No V3 deployment has occurred.

## V3 visual-QA exit criteria

1. all 15 routes resolve locally;
2. all `/review` links land on their stable route or anchor;
3. exact MK-2866 truth includes `90 SERVINGS` and excludes `90 CAPS`;
4. customer routes contain no backend vocabulary;
5. trust and realistic review fixtures render in the approved customer register;
6. the dark footer is the only inverse surface;
7. every route passes visual review at 1440/1024/768/390 with zero horizontal overflow;
8. build, lint, type and rendered-route checks are rerun against the final local source;
9. the receipt records the exact private Sites version, deployment and access posture;
10. no Shopper SSR, Woo, payment, C2, Figma or public/production mutation occurred.
