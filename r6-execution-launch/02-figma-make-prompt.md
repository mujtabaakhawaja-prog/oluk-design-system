# Lane C — Figma Make Prompt

Create one Make project:

```text
Olympus R6 Product Surface Laboratory — Run 01
```

Attach the published R6 libraries, Make Kit, validated parent templates,
R6_MAKE_ALLOWLIST_V1, MK-2866 fixture, RAD-140 fixture, and the bounded run brief
returned by the Figma Design Agent.

Paste the common contract once:

```text
OLYMPUS R6 PRODUCT SURFACE LABORATORY

MODE

Visual exploration only.

Do not:
- generate production code;
- edit Runtime Studio or ReviewOS;
- redesign architecture or parent pages;
- invent tokens, fonts, product values, evidence values, prices, reports, or assets;
- use A01/Majestic or generic vendor UI;
- promote your own output.

AUTHORITIES

Use only R6_MAKE_ALLOWLIST_V1.
Bind appearance to the published Olympus R6 semantic/layout variables and
published text/effect styles.
Do not use raw hex, raw spacing, or raw font properties.

RUNTIME CONTEXT

Runtime Studio screenshots and DOM snapshots are read-only implementation context.
The published R6 library is visual authority.
The parent template and insertion zone define the modification boundary.

FIXTURES

MK-2866 is the primary full-truth fixture.
RAD-140 is a missing-data stress fixture:
- RAD-140
- Testolone
- 8 MG
- 60 CAPS

Use no other RAD-140 value unless it exists in the supplied fixture. Null means
omit or use the approved missing state. Never infer a price, purity, report,
artwork claim, or asset path.

CONTEXT LAW

ProductGrid, QuickAdd, Featured, PDP PurchasePanel, LabReportPanel,
Fold-Out Dossier, and Related Treatment C are separate compositions.
Do not collapse them into a universal card.

WORKLOAD LAW — DO NOT CREATE A CARTESIAN MATRIX

Phase 1 — Exploration:
- Candidate A, B, C
- default state only
- 1440 Light and 1440 Dark
- 390 Light screening view

Phase 2 — Recommendation:
- select one RECOMMENDED_CANDIDATE;
- retain one runner-up;
- reject at least one candidate with a reason.

Phase 3 — Projection:
- project the recommended candidate and runner-up to 1024 Light/Dark and 390 Dark;
- complete the full six-cell default matrix for those two;
- preserve the rejected candidate as a default specimen with its rejection reason;
- apply the full run-specific state matrix to the recommended candidate only;
- show the state strip at 1440 Light and 390 Dark.

Minimum interactive target: 44 px.
Visible focus is required.
Motion must support prefers-reduced-motion.
Light and Dark keep identical content, hierarchy, controls, and geometry.

RETURN

Return MAKE_RESULT:
{
  "experimentId": "",
  "context": "",
  "candidateNodeId": "",
  "runnerUpNodeId": "",
  "rejectedNodeIds": [],
  "parentTemplate": "",
  "insertionZone": "",
  "fixtureIds": [],
  "publishedComponents": [],
  "semanticVariables": [],
  "statesCovered": [],
  "viewportsCovered": [],
  "themesCovered": [],
  "preserved": [],
  "changed": [],
  "missingLibraryCapabilities": [],
  "knownRisks": [],
  "recommendedDisposition": "candidate-for-agent-review"
}

Maximum status:
RECOMMENDED_CANDIDATE
```

Then send one bounded run at a time.

## Run 01A — ProductGrid

```text
RUN 01A / PRODUCTGRID

Replace only ProductGrid inside the validated parent insertion zone.

Preserve:
- CompoundIdentity;
- FIT MediaChamber;
- strength and quantity;
- restrained governed price when present;
- ProductCardAction;
- surrounding grid geometry.

Prohibit:
- SpecificationRail;
- ClassificationFooter;
- EyebrowBadge;
- invented price/evidence;
- PDP-level composition.

Generate A/B/C using the common contract.

Required states:
- default;
- hover;
- focus-visible;
- loading;
- added;
- disabled;
- out-of-stock.
```

## Run 01B — QuickAdd / Treatment C

```text
RUN 01B / QUICKADD

Replace only QuickAdd / Treatment C.
Preserve Treatment C authority, FIT media, identity, strength, quantity, governed
price when present, and the approved commerce action.
Do not expand into ProductGrid or PDP composition.
Generate A/B/C using the common contract.

Required states:
- default;
- hover;
- focus-visible;
- loading;
- added;
- disabled;
- out-of-stock.
```

## Run 01C — Featured Controller

```text
RUN 01C / FEATURED CONTROLLER

Start from existing candidates at 1580:77642.
Do not erase or repeat their initial exploration.
Compare and, only if required, refine:
- Inline Commerce Ledger;
- Restrained Frosted Slab;
- Open Commerce Stack.

Target: low-authority commerce beneath the hero narrative CTA group without
obstructing product atmosphere.

Preserve MK-2866 identity, alias, 15 MG, 90 CAPS, >99%, £43, selector relationship,
hero geometry, product stage, and approved actions.

Do not add SpecificationRail unless the Agent allowlist explicitly authorizes it.
Use the common projection/state contract on the recommended candidate only.

Required states:
- default;
- hover;
- focus-visible;
- loading;
- added;
- disabled;
- out-of-stock.
```

## Run 01D — PDP PurchasePanel

```text
RUN 01D / PDP PURCHASEPANEL

Replace only PurchasePanel.
Product identity remains owned by the PDP parent.
Own price, quantity/action, availability status, and immediate approved trust.
Do not reproduce ProductGrid or the full Evidence section.
Generate A/B/C using the common contract.

Required states:
- default;
- focus-visible;
- quantity-change;
- loading;
- added;
- disabled;
- out-of-stock.
```

## Run 01E — LabReportPanel

```text
RUN 01E / LABREPORTPANEL

Replace only LabReportPanel.
Use supplied analytical truth only.
Never fabricate a chromatogram, peak table, purity halo, report, or verification.
Use the approved honest fallback when analytical data is absent.
Generate A/B/C using the common contract.

Required states:
- available;
- loading;
- pending;
- missing-chart;
- unavailable;
- error;
- focus-visible.
```

## Run 01F — Fold-Out Dossier

```text
RUN 01F / FOLD-OUT DOSSIER

Replace only Fold-Out Dossier.
Preserve Product Facts, Product Identity, Product Composition, evidence links,
and mobile readability.
Do not turn it into a generic infrastructure drawer.
Generate A/B/C using the common contract.

Required states:
- collapsed;
- expanded;
- selected-panel;
- loading;
- missing-field;
- focus-visible.
```

## Run 01G — Related Products / Treatment C

```text
RUN 01G / RELATED PRODUCTS

Replace only the Related Products insertion zone.
Preserve Treatment C compact authority and the parent PDP hierarchy.
Do not create a second purchase panel.
Generate A/B/C using the common contract.

Required states:
- default;
- hover;
- focus-visible;
- loading;
- added;
- disabled;
- out-of-stock.
```
