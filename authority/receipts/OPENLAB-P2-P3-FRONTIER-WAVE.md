# OpenLab P2/P3 Frontier Wave

Status: `IMPLEMENTED_VERIFIED_HUMAN_REVIEW_REQUIRED_UNPUBLISHED`

This wave replaces the generic OpenLab tool placeholder with eleven distinct, customer-facing compositions built from the governed light-mode system.

## Implemented routes

- `/open-lab/evidence`
- `/open-lab/compound-guide`
- `/open-lab/stack-builder`
- `/open-lab/dosing-calculator`
- `/open-lab/cycle-planner`
- `/open-lab/interaction-checker`
- `/open-lab/coa/r28868`
- `/open-lab/research-papers`
- `/open-lab/case-studies`
- `/open-lab/glossary`
- `/open-lab/lab-partner`

## Composition decisions

- Evidence uses a dashboard, record trend, coverage signals and product rows.
- Compound Guide uses a navigable family/card system with visible compound and alias relationships.
- Stack Builder uses a three-step goal and product composition with a compact order summary.
- Dose Calculator, Cycle Planner, Case Studies and Glossary share the authored 260px workspace rail on desktop and a compact horizontal tool switcher on mobile.
- Interaction Checker uses a two-product selection and three-part comparison result.
- CoA Viewer uses a report rail plus a tall document surface with report identity, result metrics and an analytical table.
- Research Papers uses a filter/search header and reading-collection cards.
- Lab Partner uses a cobalt partnership hero, process rail, feature grid and closing CTA.

Mobile is explicitly compacted through summary grids, reordered modules, disclosure-friendly workspaces and intentional horizontal timelines/tool navigation. It is not a desktop composition merely stacked vertically.

## Locked product corrections

- MK-2866: `15 MG`, `90 SERVINGS`, `>99%`, `£43`, SKU `80529-01`.
- RAD-140: `8 MG`.

## Verification

- Production build: PASS.
- TypeScript: PASS.
- ESLint: PASS.
- Unit/contract suite: `82/82` PASS.
- Governed tokens: `112/112` PASS; `128` CSS custom properties.
- Active CSS colors: `0` ungoverned and `0` rejected literals.
- Canonical provenance: `71/71` PASS.
- Figma/code bridge: `290/290` PASS.
- Executable route registry: `52` entries; browser matrix: `51` routes / `204` width cases.
- OpenLab frontier four-width proof: `44/44` PASS (`11` routes × `1440/1024/768/390`).
- OpenLab frontier accessibility smoke: `22/22` PASS (`11` routes × `1440/390`).
- Visual receipt: `/tmp/oluk-openlab-frontier-mf09-final2/mf09-four-width-receipt.json`.
- Accessibility receipt: `/tmp/oluk-openlab-frontier-a11y/mf09-accessibility-smoke.json`.

No Figma publication, hosting, Shopper deployment, Tools mutation, Woo mutation or payment integration was performed.
