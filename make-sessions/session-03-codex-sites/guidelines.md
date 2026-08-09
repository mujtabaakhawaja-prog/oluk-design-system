# MF-03 — Codex Sites Convergence Guidelines

**Mode:** Reference
**Status:** Active design-convergence lane
**Date:** 2026-08-09
**Implementation root:** `sites/oluk-experience-lab`
**Authority class:** Private design and review candidate; not runtime or release authority

## Mission

Converge the accepted MF-01A, MF-01B and MF-02A relationships into a responsive light-mode customer experience in Codex Sites. The lane covers the global shell, homepage, shop, MK-2866 PDP, reviews anatomy and the complete OpenLab route family.

MF-01A, MF-01B and MF-02A are completed historical inputs. Their accepted relationships carry forward; their Figma Make code does not. The current design work supersedes the older Shopper visual treatment, but it does not supersede runtime ownership, product truth, evidence provenance, payment authority or release gates.

## Authority order

Use these authorities in order:

1. current human decisions in [`DECISIONS.md`](DECISIONS.md);
2. the active input and route inventory in [`MANIFEST.md`](MANIFEST.md);
3. repository identity, surface and PDP authority under `authority/`;
4. completed MF-01A, MF-01B and MF-02A records as historical design inputs;
5. current Figma nodes and Evidence-OS Make flow as inspected design evidence;
6. older Shopper/runtime work as a functional cross-check only.

Repeated legacy patterns, labels such as “champion,” generated Make code and runtime screenshots do not outrank the current human-directed design lane.

## Visual contract

- Light mode only. MENT, black-label work and broad inverse sections remain deferred.
- Keep the cool luminous canvas visible around independent modules.
- Use optically white raised commerce and information planes with restrained blue-shifted elevation.
- Keep media atmosphere inside bounded chambers, except for the established PDP first-fold atmospheric exception.
- Use `#0057FF` for core identity and quantified authority; use `#256DFF` for interactive cobalt.
- Preserve the authority order `quantified metric > specification > qualitative attribute > structural edge`.
- Use Plus Jakarta Sans for display/editorial hierarchy and Inter for interface/support copy.
- Customer body copy is at least 15–16 px; metadata and eyebrows are at least 12 px.
- Do not introduce cream, beige, blanket achromatic grey, Tailwind-grey leakage, cobalt card perimeters, generic dashboard chrome or passive spacing corridors.
- ProductCommerceCard keeps a joined chamber-to-commerce relationship. Exposed page canvas does not split one card into unrelated objects.

## Global shell contract

The site shell uses three purposeful levels:

1. a source-safe OpenLab action rail;
2. a primary navigation plane with the integrated Olympus Labs UK mark, `Shop`, `Open Lab`, `About`, a prominent `Lab Records` action and a bag action with no invented count;
3. a route-aware context rail.

Do not include Wholesale, Sign In, currency controls, Appearance controls or trust claims whose business/runtime source has not been verified. The legacy header node `564:42811` is content-structure evidence only; it is not visual authority.

## Product and fixture truth

### Governed product truth

The only unqualified primary product truth in this lane is:

`SARM SERIES · MK-2866 · Ostarine · SKU 80529-01 · 15 MG · 90 SERVINGS · >99% · £43`

Do not use `90 CAPS`, decimal pricing, crossed pricing or per-serving pricing.

### Presentation states

Every route carries the persistent label:

> `EXPERIENCE LAB · STATIC DESIGN FIXTURES`

Use three content classes:

| Class | Rendering rule |
|---|---|
| `authority` | May render without a fixture qualifier when it matches governed product/identity truth. |
| `design_fixture` | Must be visibly labelled as a rendered design fixture. It must not resemble live customer, inventory or assay data. |
| `source_bound` | Render as `Source-bound`, `Not connected` or `Not supplied`; never fill the gap with invented data. |

`IN STOCK` and `OPENLAB VERIFIED` are demonstration states until a governed runtime source binds them. RAD-140/Testolone and its render are design fixtures only: `SARM SERIES · RAD-140 · Testolone · 8 MG · 60 SERVINGS · >99% · £46`.

## Reviews policy

Build the complete section anatomy and show four honest states:

- rendered fixture;
- loading;
- empty;
- unavailable/not connected.

The populated state must say `RENDERED DESIGN FIXTURE · NOT CUSTOMER DATA`. Use neutral labels such as `Sample Review A`, `Sample Review B`, `Sample Review C` and `Example rating`; do not invent customer identities, dates, purchase records, aggregate counts or claims.

## OpenLab evidence boundary

- OpenLab is public editorial evidence architecture, not a technical dashboard.
- Keep report, source and product relationships legible without fabricating certificate, batch, laboratory, chromatogram or purity values.
- Use source/viewer slots where a report or chart would require a governed source.
- Allowed public states include `Report ready`, `Source linked`, `Context required`, `Public linked`, `Combo authority` and `QA locked` only when presented as state-system examples, not as proof of a real batch.
- The individual-record route is keyed by record identity, not by an invented batch identifier.
- Commercial labels remain separate from assay evidence and source-chain facts.

## Responsive acceptance

Each route must recompose at `1440`, `1024`, `768` and `390` px.

- Zero horizontal page overflow at every acceptance width.
- Reflow relationships; do not scale desktop artwork down.
- Header tiers may condense, wrap or disclose, but primary navigation and the Lab Records action remain understandable.
- Product grids change column count without clipping cards or shrinking readable copy.
- Archive tables transform into readable record cards before the columns become unusable.
- Dossier and evidence layouts preserve reading order when columns stack.
- Controls retain visible focus, adequate touch targets and honest disabled/unavailable states.

## Mutation and release boundary

Current writes are limited to this repository’s Sites experience and its additive design-lane documentation. This lane must not mutate:

- the Olympus Shopper SSR runtime;
- WooCommerce catalogue or orders;
- Initiator payment behavior;
- C2 services, checkout orchestration or tools;
- Figma design nodes;
- public or production deployments.

The `champion-olympus-commerce-runtime` workflow, Olympus Initiator and project-scoped C2 tools are reserved for later authorized runtime/payment stages. Their future role does not make this Sites candidate runtime authority.

## Exit criteria

MF-03 is review-ready only when:

1. every route in `MANIFEST.md` resolves;
2. the global fixture notice and source-bound states are visible;
3. the shell, commerce and OpenLab families are coherent at all four acceptance widths;
4. the production build passes;
5. a private Codex Sites review URL is created;
6. no public/production release, runtime mutation, payment mutation or C2 write occurred;
7. human review records the next bounded corrections or accepts the lane for later runtime translation.
