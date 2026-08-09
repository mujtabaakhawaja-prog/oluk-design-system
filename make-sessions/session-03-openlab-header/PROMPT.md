# MF-03 — Header + Footer + OpenLab Portal

**Session:** `session-03-openlab-header`
**File:** `BEPMuUt1HroEw8xjz8CVyN`
**Output page:** `512:4651` (MF-02)
**Predecessor:** MF-02A Run 3 champion `551:28924`

## Objective

Design three surfaces that don't exist yet: **site header**, **site footer**, and the **OpenLab portal landing page**. The OpenLab portal is the priority — it's the public evidence hub and the largest design surface in this run.

Do NOT redesign homepage body sections (hero, grid, dossier, evidence, rail) — those are locked from MF-02A.

## Outputs

| # | Output | Width |
|---|--------|-------|
| 1 | Header (single champion) | 1440px |
| 2 | Footer (dark) | 1440px |
| 3 | OpenLab Portal Dir A (editorial vertical) | 1440px |
| 4 | OpenLab Portal Dir B (dashboard grid) | 1440px |

---

## SECTION 1: HEADER (single champion)

Two-tier minimal. Trust rail as a slim 28–32px strip above the main nav bar. Total height ≤80px. The header should feel invisible so the hero commands attention.

### Content (fixed)

**Trust rail:** Free UK Delivery Over £50 · Free Int'l Delivery £300+ · Third-Party Lab Verified · JANOSHIK Validated · Encrypted Checkout

**Nav bar:** Logo (Olympus Labs UK mountain mark from `564:42811`) · Shop · Open Lab · Lab Records · About · Search icon · Cart/Bag icon · Sign In icon

**Excluded:** Wholesale, currency toggle, appearance toggle, dark mode switch.

### Surface

- Background: `#ffffff` (header sits ON the canvas, not in it)
- Bottom border: `rgba(206,220,241,0.92)` 1px
- Nav text: Inter 14px, near-black `rgb(20,24,39)`
- Trust rail text: Inter 11px, blue-shifted neutral `rgb(107,119,140)`
- Active/emphasis: cobalt `#0057FF` for Lab Records and active states
- Logo: mountain mark from `564:42811` — do not invent a new logo

### Inputs

| Node | What it provides |
|------|------------------|
| `564:42811` Header/OptionB | Content structure, logo mark, nav items |
| `551:28924` MF-02A champion | Surface contract context — header must sit above this seamlessly |

---

## SECTION 2: FOOTER (single direction)

The ONE allowed inverse/dark surface in the entire system.

### Content

```
Olympus Labs UK

SHOP                OPENLAB              ABOUT
Catalogue           Portal               Olympus Labs UK
SARMs               Lab Records          EvidenceOS
Prohormones         Batch Lookup         Contact
Research Chemicals  Methodology          Privacy
Stacks              Source Chain

© 2026 Olympus Labs UK. All rights reserved.
```

### Surface

- Background: `rgb(20,24,39)`
- Headings: white `#ffffff`
- Links: `rgba(255,255,255,0.6)`
- Hover: cobalt `#0057FF`
- Logo: white mountain mark
- Padding: 80px top/bottom, 48px column gaps

---

## SECTION 3: OPENLAB PORTAL (2 directions)

The public evidence hub. "Every batch is tested. Every report is public."

Make must use the MF-02 reference nodes for **layout orientation** but apply the full OLUK light-mode surface contract — card shapes, elevation, fills, borders, typography. The references show section structure and content; Make re-clothes them in the identity system.

### Section order (top to bottom)

| # | Section | Content source | Layout reference |
|---|---------|---------------|------------------|
| 1 | **Portal Hero** | "Proof built into every batch." + Product Facts / Media / Composition three-panel + Evidence Ledger 6-point grid | `588:67272` (replaces `588:66190` TrustGrid). Preserve the grid structure of `588:66008` Hero but translate to light surface. |
| 2 | **Product Grid** | MF card-family commerce cards with MetricRail, EvidenceStatus, QualitativeChips | `588:67449` (replaces `588:66460` BestSellers) |
| 3 | **Evidence Archive** | "Every batch. Every report. Public." + batch records table + search + methodology link | `588:67788` (replaces `588:66717` LabReports) |
| 4 | **Embedded Evidence** | Six-point record: Compound Identity, Purity, Concentration, Microbiology, Heavy Metals, Certificate + HPLC trace + batch table | `588:67652` + `545:22790` (HPLC chart) + `545:22831` (batch records table) |
| 5 | **OpenLab Product Banner** | Featured product with evidence posture — "Formulated to a higher standard" + MK-2866 card with metrics | `551:25195` |
| 6 | **Compound Families** | SARMs · Prohormones · Research Chemicals · Stacks — "Browse evidence by compound family" | `561:41860` CategoryFamilyRail |

### Additional structural inputs

| Node | What it provides |
|------|------------------|
| `563:42499` Product Dossier | Three-panel [Facts \| Media \| Composition] reference for portal hero layout |
| `475:9098` TrustEvidenceSpine | Six-point evidence ledger narrative pattern |
| `561:41769` Product Assurance | AssuranceRail 6-point strip |
| `486:4634` Vertical card | Card makeup reference: bounded media chamber, MetricRail, Softform Arc, r=24 |
| `422:10293` Lab Verification | Certificate of Analysis / HPLC chromatogram |
| `222:1332` LabReports/CanvasSplit | Canvas-split layout template |

### Direction A — Editorial Vertical

Full-width sections, generous vertical rhythm. Hero is a statement section with large type. HPLC trace is a hero-scale element, not a widget. Featured Record uses canvas-split layout (narrative left, data right per `222:1332`). Each section breathes.

### Direction B — Dashboard Grid

Denser layout. Evidence Summary as metric cards. Six-Point Proof as 2×3 card grid. Featured Record as embedded card. More information density. The page feels like a transparency dashboard, not an editorial magazine.

### Differentiation gate

Every section MUST differ structurally between A and B. If any section is visually identical, the run fails.

---

## SURFACE CONTRACT (all outputs)

| Token | Value |
|-------|-------|
| Canvas | `#f7f8fc` |
| Card fill | `#ffffff` |
| Card border | `rgba(206,220,241,0.92)` 1px |
| Structural divider | `rgb(206,220,241)` 1px |
| Authority divider | `#0057FF` 2px |
| Near-black | `rgb(20,24,39)` |
| Cobalt core | `#0057FF` |
| Cobalt interactive | `#256DFF` |
| Media chamber fill | `rgb(240,244,251)` |
| Display font | Plus Jakarta Sans ExtraBold |
| Body font | Inter |
| Body minimum | 15px |
| Softform Arc shadow | `0 1px 3px rgba(20,24,39,0.04), 0 4px 12px rgba(20,24,39,0.06)` |

**Zero grey rule:** No achromatic Tailwind grey. All neutrals blue-shifted.
**Cobalt authority order:** quantified metric > specification > qualitative attribute > structural edge.
**Dark mode:** OUT OF SCOPE. Footer is the only inverse surface.

---

## REJECT RULES

1. Meta-commentary headlines ("A clear evidence hierarchy", "Designed for trust")
2. Backend vocabulary in UI (GOVERNED, SOURCE-BOUND, DESIGN FIXTURE, DEMO STATE, NOT CONNECTED)
3. Wrong compound families (must be: SARMs, Prohormones, Research Chemicals, Stacks)
4. Solid cobalt `#0057FF` card fill background
5. Canvas `#ffffff` instead of `#f7f8fc`
6. Header includes Wholesale, currency toggle, appearance toggle
7. OpenLab directions visually identical per section
8. Footer uses light background
9. Non-blue-shifted grey
10. `90 CAPS` anywhere — controlling value is `90 SERVINGS`

---

## OPERATING CONSTRAINTS

- Do NOT redesign homepage body sections — MF-02A locked
- Do NOT run Porcelain, Atmospheric, or Frost themes
- Do NOT explore new typography or spacing systems
- Make-generated code is disposable prototype machinery
- CommerceTrustStrip is separate from ProductMetricRail
- Dark mode and broad inverse sections remain out of scope
- For checkout/basket/payment: follow AGENTS.md and controlling runtime packet
