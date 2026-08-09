# MF-03 — OpenLab Portal Page

**File:** `BEPMuUt1HroEw8xjz8CVyN`
**Output page:** `512:4651` (MF-02)
**Width:** 1440px

## What to produce

ONE finished OpenLab portal page prototype at 1440px wide. Not boards. Not directions. Not labeled explorations. A single continuous scrolling page that a customer would see.

The organizing principle: every section marries **EVIDENCE with COMMERCE** and **TECHNICAL with PRODUCT**. No section is purely informational. No section is purely commercial. Each one presents evidence AND sells.

## Section order (top to bottom)

### 1. Header
Use `564:42811` as content reference. Two-tier: trust rail (28-32px) + main nav bar. Total ≤80px.
- Trust rail: Free UK Delivery Over £50 · Free Int'l Delivery £300+ · Third-Party Lab Verified · JANOSHIK Validated · Encrypted Checkout
- Nav: Olympus Labs UK logo mark · Shop · Open Lab · Lab Records · About · Search · Cart · Sign In
- White `#ffffff` background, `rgba(206,220,241,0.92)` 1px bottom border
- Excluded: Wholesale, currency toggle, appearance toggle

### 2. Hero
Re-design the hero from `588:66008` in the LIGHT surface contract. Preserve the grid structure: LEFT editorial copy + CENTER FlagshipCard + BOTTOM BatchTicker + RIGHT category card stack. But render it on `#f7f8fc` canvas with white cards, blue-shifted borders, Softform Arc shadow — not the dark treatment.
- Left: "Proof built into every batch." headline (Plus Jakarta Sans ExtraBold) + subhead + "Explore OpenLab" CTA (cobalt `#0057FF` filled button)
- Center: FlagshipCard showing MK-2866 product with metrics (15 MG · 90 SERVINGS · >99% PURITY) — use `486:4634` Vertical card makeup: bounded media chamber `rgb(240,244,251)`, MetricRail, r=24, Softform Arc
- Bottom: BatchTicker strip with live batch verification feed (MK-677 98.9% · BPC-157 99.2% · CJC-1295 99.0%)
- Right: 4 category cards (SARMs, Peptides, Longevity, Nootropics) as small white elevated cards

### 3. TrustEvidenceSpine Banner
Use `556:33850` / `588:67272` as direct layout reference. Three-panel composition:
- Left: "Proof built into every batch." narrative block with EXPLORE OPENLAB button
- Center: Product bottle render with Product Facts and Product Composition panels flanking
- Bottom: Evidence Ledger 2×3 grid — 01 Identity Tested · 02 Purity Measured · 03 Concentration Confirmed · 04 Janoshik Verified · 05 Tamper-Proof Sealed · 06 Batch Tracked

This section is the EVIDENCE + TECHNICAL anchor. Each ledger cell has numbered glyph + title + description.

### 4. Category Cards
Use `561:41860` CategoryFamilyRail pattern. Four equal white cards:
- SARMs · Prohormones · Research Chemicals · Stacks
- Each card: white fill, `rgba(206,220,241,0.92)` border, Softform Arc shadow, r=24
- Brief description + compound count + "Browse →" link
- NO solid cobalt fill backgrounds

### 5. Product Grid (Vertical Cards)
Use `588:67449` for layout, `486:4634` for card makeup. 3-4 ProductCommerceCards:
- Each card: bounded media chamber `rgb(240,244,251)`, MetricRail (3 bordered chips: STRENGTH · SERVINGS · PURITY), QualitativeChips, EvidenceStatus badge, price, "Add to bag" cobalt button
- MK-2866 (£43), RAD-140 (£46), MK-677 (£44), LGD-4033 (£38)
- Section headline: "Finished products. Verified evidence." — NOT meta-commentary
- This is COMMERCE + EVIDENCE: products with their proof attached

### 6. Evidence Archive (Canvas Split)
Use `588:67788` for layout, `222:1332` for canvas-split pattern.
- Left: "Every batch. Every report. Public." + description + search field + metrics (15 Reports · 99.55% Avg Purity · 0 Failures) + "View testing methodology →"
- Right: Batch Records table — columns: BATCH · COMPOUND · PURITY · DATE · LAB · RECORD — rows for OL2201/MK-2866, OL2202/RAD-140, BPC-157, MK-677, LGD-4033, CJC-1295 — all >99% PURITY, all PASS
- This is TECHNICAL + EVIDENCE: the operating system, not marketing

### 7. Embedded Evidence (Six-Point Record)
Use `588:67652` for layout.
- Left: Six-point record list — Compound Identity · Purity · Concentration · Microbiology · Heavy Metals · Certificate — each with status indicator
- Right: HPLC Purity Trace chart (use `545:22790` pattern) + Batch Records summary table (use `545:22831` pattern)
- This is TECHNICAL + PRODUCT: showing exactly how a single record works

### 8. OpenLab Product Banner
Use `551:25195` as direct reference.
- "Formulated to a higher standard." headline
- Featured MK-2866 card with metrics (15 MG · 90 SERVINGS · >99% PURITY · £43)
- "Shop the Range" CTA + "View Lab Records" secondary
- Compound selector chips: MK-2866 · MENT · Endurobished · RAD-140 · MK-677
- This is COMMERCE + EVIDENCE: the product with its proof, driving purchase

### 9. Compound Families Navigation
Repeat of section 4 pattern at page bottom, serving as exit navigation.
- SARMs · Prohormones · Research Chemicals · Stacks
- "Browse evidence by compound family."

### 10. Footer
Dark `rgb(20,24,39)` — the ONE allowed inverse surface.
- SHOP (Catalogue, SARMs, Prohormones, Research Chemicals, Stacks)
- OPENLAB (Portal, Lab Records, Batch Lookup, Methodology, Source Chain)
- ABOUT (Olympus Labs UK, EvidenceOS, Contact, Privacy)
- © 2026 Olympus Labs UK. White mountain logo mark.

## Surface contract (MANDATORY — every pixel)

| Token | Value | NEVER |
|-------|-------|-------|
| Canvas | `#f7f8fc` | `#ffffff` for canvas |
| Card fill | `#ffffff` | Any grey |
| Card border | `rgba(206,220,241,0.92)` 1px | No border |
| Shadow | `0 1px 3px rgba(20,24,39,0.04), 0 4px 12px rgba(20,24,39,0.06)` | Generic shadow |
| Near-black | `rgb(20,24,39)` | `#000000` |
| Cobalt core | `#0057FF` | Other blues |
| Cobalt interactive | `#256DFF` | |
| Media chamber | `rgb(240,244,251)` | Grey chamber |
| Display | Plus Jakarta Sans ExtraBold | Any other display font |
| Body | Inter | Any other body font |
| Body min | 15px | Smaller |
| Card radius | r=24 (vertical), r=34 (horizontal), r=20 (compact) | |

**Zero grey rule:** No achromatic Tailwind grey anywhere. All neutrals blue-shifted.
**Cobalt authority:** quantified metric > specification > qualitative > structural edge.

## Typography lock

ONLY two font families exist:
- **Plus Jakarta Sans ExtraBold** — headlines, display text
- **Inter** — everything else (nav, body, labels, captions, chips)

No JetBrains Mono. No Poppins. No Manrope. No system fonts. No serif fonts.

## Reject rules

1. Direction labels ("Direction A", "Baseline version B", any exploration markup)
2. Meta-commentary headlines ("A clear evidence hierarchy", "Designed for trust")
3. Backend vocabulary (GOVERNED, SOURCE-BOUND, DESIGN FIXTURE, DEMO STATE)
4. Solid cobalt card fill backgrounds
5. Canvas `#ffffff` instead of `#f7f8fc`
6. Any font besides Inter and Plus Jakarta Sans ExtraBold
7. `90 CAPS` — must read `90 SERVINGS`
8. Width other than 1440px
9. Grey that isn't blue-shifted
10. Boards/explorations instead of a single finished page

## Reference nodes for Make

| Node | Use as |
|------|--------|
| `564:42811` | Header content + logo |
| `551:28924` | MF-02A champion — surface contract source of truth |
| `588:66008` | Hero grid structure (translate to light) |
| `556:33850` | TrustEvidenceSpine banner (direct reference) |
| `588:67272` | Portal hero composition |
| `561:41860` | CategoryFamilyRail |
| `486:4634` | ProductCommerceCard/Vertical — card makeup |
| `518:13092` | EvidenceStatus badge |
| `588:67449` | Product grid layout |
| `588:67788` | Canvas-split archive layout |
| `588:67652` | Embedded evidence layout |
| `545:22790` | HPLC Purity Trace chart |
| `545:22831` | Batch Records table |
| `551:25195` | OpenLab product banner |
| `222:1332` | LabReports canvas-split template |
| `470:6393` | Hero 2-fold template |
| `475:9098` | TrustEvidenceSpine narrative |
