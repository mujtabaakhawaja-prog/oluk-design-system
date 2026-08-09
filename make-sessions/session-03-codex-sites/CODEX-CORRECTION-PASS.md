# FIGMA_TO_CODEX_PACKET — Experience Lab v2 Structural Correction Pass

> **Historical correction input:** This packet responded to the `REJECTED_VISUAL_TRANSLATION` V2 build. It is superseded by the active V3 packet. Where it conflicts with current decisions—especially the `614:75950` hero structure, sole-inverse dark footer, realistic reviews, trust-rail fixture copy or local-only status—the active packet controls.

## Metadata

- **File:** `BEPMuUt1HroEw8xjz8CVyN`
- **Captures:** `573:64880` (Codex Sites Captures section)
- **Review source:** `make-sessions/session-03-codex-sites/FIGMA-REVIEW.md`
- **Date:** 2026-08-09

---

## Goal

Correct the 6 structural gaps identified in FIGMA-REVIEW.md. The v2 build got data truth right but projected backend system vocabulary onto the frontend surface. This pass converts the build from a narrated system specification into a designed storefront that matches the MF-01A through MF-02A Figma work.

---

## Observed Design Truth (from Figma inspection)

The following Figma components are the visual authority. Codex must match these structures, not describe them.

### Hero 2-Fold Card — `470:6393` (440×685)
[Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-6393)

Structure:
```
Container (white card, 1px rgba(206,220,241,0.92) border, r=24)
 ├─ Hero Copy Zone (top)
 │   └─ "FORMULATED. VERIFIED. BATCH TRACKED."
 │      Headline: "Formulated to a higher standard."
 │      Subhead: "Third-party tested. Strength, servings, and fulfilment confirmed before checkout."
 │      CTAs: [Shop the Range] [View Lab Records]
 ├─ COBALT DIVIDER (#0057FF, 2px horizontal, full card width)
 └─ Purchase Zone (bottom)
     ├─ "FEATURED PRODUCT" eyebrow (cobalt #0057FF)
     ├─ "MK-2866" product name (cobalt #0057FF)
     ├─ MetricRail: [15 MG | 90 SERVINGS | >99%]
     ├─ Price: "£43" (cobalt #0057FF)
     ├─ CTAs: [View Product] [Add to Bag]
     └─ Product toggle chips BELOW card: MK-2866, MENT, ENDURASHRED, RAD-140, MK-677
Media Chamber (right side, same card, rgb(240,244,251) fill)
```

This is ONE continuous card. The divider is INSIDE the card, not between sections.

### ProductCommerceCard / Vertical — `486:4634` (481×916)
[Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634)

Structure:
```
Card (white, 1px rgba(206,220,241,0.92) border, r=24, Softform Arc shadow)
 ├─ Bounded Media Chamber (rgb(240,244,251) fill, rounded top)
 │   └─ Product render centered
 ├─ Identity Zone
 │   ├─ "SARM SERIES" eyebrow (cobalt)
 │   ├─ "MK-2866" product name (near-black rgb(20,24,39), bold)
 │   ├─ "Ostarine" subtitle
 │   ├─ IN STOCK badge (green dot + text, top-right)
 │   └─ OPENLAB VERIFIED (atom icon, positioned near product name)
 ├─ MetricRail (bordered chip row)
 │   ├─ [15 MG / STRENGTH] bordered chip
 │   ├─ [90 / SERVINGS] bordered chip  
 │   └─ [>99% / PURITY] bordered chip
 ├─ QualitativeChips row
 │   ├─ [CLASS: SARM] chip with icon
 │   ├─ [FORM: CAPSULES] chip with icon
 │   ├─ [QUALITY: LAB FORMULATED] chip with icon
 │   └─ [TESTED: THIRD PARTY] chip with icon
 ├─ Price: "£43" (large, cobalt)
 ├─ Quantity stepper: [–] [1] [+]
 ├─ Primary CTA: "Add to Bag" (cobalt filled button)
 └─ Secondary CTA: "View Lab Record →" (cobalt outline button with atom icon)
```

The MetricRail is NOT inline text. Each metric sits inside a bordered chip container with VALUE on top and LABEL below.

### CategoryFamilyRail — `561:41860` (1171×544)
[Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=561-41860)

Structure:
```
Section
 ├─ Left column: "COMPOUND FAMILIES" eyebrow + "The full range" headline + description + "View all families →"
 └─ 4-column card grid (all white, all same weight):
     ├─ 01: SARMs — "Selective compounds with receptor specificity." → Explore →
     ├─ 02: Prohormones — "Specialist formulations, product-specific specifications." → Explore →
     ├─ 03: Research Chemicals — "Clearly labelled with technical facts and Lab Record access." → Explore →
     └─ 04: Stacks — "Curated multi-product selections, individually traceable." → Explore →
```

All 4 cards are WHITE with `rgba(206,220,241,0.92)` border. NO solid cobalt fill on any card.

### Champion Section Headlines (from MF-02A `551:28924`)
[Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-28924)

| Section | Figma Headline | NOT This |
|---|---|---|
| Hero | "Formulated to a higher standard." | "Explore the Olympus Labs UK range" |
| Grid | "Featured and quick-add." | "A clear product-card hierarchy" |
| Category | "The full range." or "Compound Families" | "Choose a clear starting point" |
| Dossier | "Product facts, label truth and batch evidence." | (not in captures) |
| Evidence | "Finished products. Verified evidence." | "Product records and source context" |
| Reviews | "Customer reviews" or equivalent | "A complete review surface — without invented customers" |
| Related | "Frequently paired together." | "A full-width horizontal commerce relationship" |

---

## Required Codex Action — 6 Corrections

### CORRECTION 1: Hero → Rebuild as 2-Fold Continuous Card

**Current:** Two-column layout with separate headline section and separate DecisionSurface below.

**Required:** ONE card container spanning the hero. Inside the card:
- Top zone: hero copy (headline, subhead, CTAs)
- Cobalt divider: `#0057FF`, 2px, full card width
- Bottom zone: DecisionSurface (FEATURED PRODUCT, MK-2866, MetricRail, price, CTAs)
- Right side: media chamber (`rgb(240,244,251)` fill) with product render
- Below the card: product toggle chips (MK-2866, MENT, ENDURASHRED, RAD-140, MK-677)

CSS structure:
```css
.hero-card {
  background: white;
  border: 1px solid rgba(206, 220, 241, 0.92);
  border-radius: 24px;
  display: grid;
  grid-template-columns: minmax(400px, 1fr) minmax(500px, 1.4fr);
  overflow: hidden;
}
.hero-left {
  display: flex;
  flex-direction: column;
}
.hero-copy-zone { /* top of left column */ }
.cobalt-divider {
  height: 2px;
  background: #0057FF;
  width: 100%;
}
.purchase-zone { /* bottom of left column */ }
.media-chamber {
  background: rgb(240, 244, 251);
  /* product render centered */
}
```

Headline: "Formulated to a higher standard." — not "Explore the Olympus Labs UK range."

### CORRECTION 2: Category Cards → Compound Families, All White

**Current:** 4 cards (SARM SERIES with solid blue fill, PRODUCT DETAILS, LAB RECORDS, METHODOLOGY).

**Required:**
- Section headline: "The full range" with "COMPOUND FAMILIES" eyebrow
- Left column: headline + description + "View all families →"
- 4 equal-weight cards, ALL white with `rgba(206,220,241,0.92)` border:
  1. **SARMs** — "Selective compounds with receptor specificity." + "Explore →"
  2. **Prohormones** — "Specialist formulations, product-specific specifications." + "Explore →"
  3. **Research Chemicals** — "Clearly labelled with technical facts and Lab Record access." + "Explore →"
  4. **Stacks** — "Curated multi-product selections, individually traceable." + "Explore →"

**DELETE:** The solid cobalt `#0057FF` card fill. This is a banned surface.

### CORRECTION 3: Product Catalogue Cards → Structured Card Makeup

**Current:** Flat text layout with inline metrics.

**Required per card:**
```html
<div class="product-card" style="border-radius: 24px; border: 1px solid rgba(206,220,241,0.92); box-shadow: ...">
  <div class="media-chamber" style="background: rgb(240,244,251); border-radius: 24px 24px 0 0;">
    <img src="product-render.png" />
  </div>
  <div class="identity-zone">
    <span class="eyebrow cobalt">SARM SERIES</span>
    <span class="in-stock">● IN STOCK</span>
    <h3>MK-2866</h3>
    <p class="subtitle">Ostarine</p>
    <span class="evidence-status">⚛ OPENLAB VERIFIED</span>
  </div>
  <div class="metric-rail">
    <div class="metric-chip"><span class="value">15 MG</span><span class="label">STRENGTH</span></div>
    <div class="metric-chip"><span class="value">90</span><span class="label">SERVINGS</span></div>
    <div class="metric-chip"><span class="value">>99%</span><span class="label">PURITY</span></div>
  </div>
  <div class="qualitative-chips">
    <span class="chip">SARM</span>
    <span class="chip">CAPSULES</span>
    <span class="chip">LAB FORMULATED</span>
  </div>
  <div class="purchase-zone">
    <span class="price cobalt">£43</span>
    <div class="stepper">[–] 1 [+]</div>
    <button class="cta-primary">Add to Bag</button>
    <button class="cta-secondary">View Lab Record →</button>
  </div>
</div>
```

The `.metric-chip` elements have a visible border (`rgba(206,220,241,0.92)` 1px), padding, and VALUE stacked over LABEL. NOT inline text.

Show 3 cards. For products 2 and 3, use governed product slots with the same card structure but "Coming soon" or real secondary products if available. Do NOT show "CATALOGUE SOURCE PENDING" or blue circle placeholder icons.

### CORRECTION 4: Strip All Meta-Commentary Headlines

Find and replace:

| Current (meta-commentary) | Replace with (customer-facing) |
|---|---|
| "Explore the Olympus Labs UK range" | "Formulated to a higher standard." |
| "Choose a clear starting point" | "The full range" |
| "A clear product-card hierarchy" | "Featured and quick-add." |
| "Product records and source context" | "Finished products. Verified evidence." |
| "A complete review surface — without invented customers" | "Customer reviews" |
| "A full-width horizontal commerce relationship" | "Frequently paired together." |

### CORRECTION 5: Remove Backend Vocabulary from Frontend

Find and remove or replace ALL instances of:

| Backend term | Replace with |
|---|---|
| "GOVERNED PRODUCT" | Remove entirely |
| "CATALOGUE SOURCE PENDING" | Remove — use card structure with "Coming soon" if product unavailable |
| "SOURCE-BOUND" | Remove |
| "DESIGN FIXTURE" | Remove |
| "DEMO STATE" | Remove from visible UI (keep as code comment if needed) |
| "NOT CONNECTED" | Remove |
| "Sample reviewer" / "Date slot" / "Purchase status slot" | Use realistic placeholder text: reviewer name, date, "Verified purchase" |
| "RENDERED DESIGN FIXTURE · NOT CUSTOMER DATA" | Remove banner |
| "UNPROVISIONED RENDER · DESIGN FIXTURE" | Remove label from media chambers |
| "No reconstructed analytical values" | Remove |
| "ADD TO BAG · DEMO STATE" | "Add to Bag" |
| "DEMO‑STATE" tags on IN STOCK | Remove — just show "IN STOCK" |

The top banner "EXPERIENCE LAB · STATIC DESIGN FIXTURES · NO LIVE INVENTORY..." can remain as a development disclaimer if clearly styled as a dev-only bar, but it must NOT replace the trust rail.

### CORRECTION 6: Apply Surface Contract

```css
:root {
  --canvas: #f7f8fc;          /* NOT white */
  --card-border: rgba(206, 220, 241, 0.92);
  --card-bg: #ffffff;
  --media-chamber: rgb(240, 244, 251);
  --near-black: rgb(20, 24, 39);
  --cobalt-core: #0057FF;
  --cobalt-interactive: #256DFF;
  --divider-structural: rgb(206, 220, 241);
  --divider-authority: #0057FF;
}

body { background: var(--canvas); }

.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  /* Softform Arc shadow: */
  box-shadow: 0 1px 3px rgba(20, 24, 39, 0.04),
              0 4px 12px rgba(20, 24, 39, 0.06);
}

/* Density-specific radii: */
.card-compact  { border-radius: 20px; }
.card-vertical { border-radius: 24px; }
.card-featured { border-radius: 24px; }
.card-purchase { border-radius: 28px; }
.card-horizontal { border-radius: 34px; }
```

No achromatic Tailwind grey. All neutral tones must be blue-shifted.

---

## Open Questions

1. **Trust rail:** The top bar currently shows the development disclaimer. Should the trust rail show "FREE UK DELIVERY OVER £50" / "THIRD-PARTY LAB VERIFIED" / etc. as fixture text, or remain as a dev disclaimer until real data is connected?
2. **OpenLab sections:** Should the 6-cell grid (PRODUCT/BATCH/LAB/REPORT/PUBLIC LEDGER/CONTEXT) be replaced with the Figma evidence components (HPLC trace widget, six-point proof), or is the grid acceptable with corrected customer-facing labels?
3. **Reviews:** Are the SAMPLE REVIEW A/B/C cards acceptable with corrected copy (remove "Sample reviewer" etc.), or should reviews be hidden entirely until real data exists?

---

## Implementation Constraints

- Surface contract colors as specified above — no substitutions
- Typography: Plus Jakarta Sans ExtraBold (display) + Inter (body)
- Cobalt authority order: quantified metric > specification > qualitative attribute > structural edge
- Zero grey: no achromatic/Tailwind grey leakage
- Make-generated code is disposable prototype machinery
- Dark mode and broad inverse sections remain OUT OF SCOPE
- For checkout, basket, payment, order-received: follow AGENTS.md and controlling runtime packet

---

## Acceptance Checks

1. Hero is ONE continuous card with embedded cobalt divider between copy zone and purchase zone
2. All category cards are white with blue-shifted border — zero solid cobalt card fills
3. Category content shows compound families (SARMs, Prohormones, Research Chemicals, Stacks)
4. Product cards show bounded media chamber + bordered MetricRail chips + QualitativeChips + Softform Arc shadow
5. Every section headline is customer-facing copy (no system descriptions)
6. Zero instances of GOVERNED, SOURCE-BOUND, DESIGN FIXTURE, DEMO STATE, NOT CONNECTED in visible UI
7. Canvas background is `#f7f8fc`, not white
8. Card border radii match density-specific Softform Arc values

---

## Risk Notes

- The hero 2-fold card is the most structurally complex change — it requires the card to span the full hero height with the media chamber as an integral part, not a separate column
- Removing all backend vocabulary may surface empty states that need replacement text — use customer-facing equivalents, not system language
- The MetricRail bordered chip structure adds CSS complexity but is the core MF-01A visual identity
- For Olympus checkout, basket, payment, order-received, or Runtime B work, remind Codex to follow repo AGENTS.md and the controlling runtime packet

---

## Next Action

1. **Codex:** Implement all 6 corrections on the experience-lab build. Corrections 4+5+6 are quick find-and-replace. Corrections 1+2+3 are structural HTML/CSS changes.
2. **Codex:** After corrections, redeploy private-only build for human visual review.
3. **Human:** Visual approval at 1440/1024/768/390 after corrections land.
4. **Figma:** MF-03 Make run proceeding in parallel for header/footer/OpenLab design frontier (separate from these corrections).
