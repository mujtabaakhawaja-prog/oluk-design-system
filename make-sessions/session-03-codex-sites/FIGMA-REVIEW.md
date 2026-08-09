# FIGMA_AGENT_RESPONSE — MF-03 Codex Sites Experience Lab Review

## Metadata

- **File:** `BEPMuUt1HroEw8xjz8CVyN`
- **Captures section:** `573:64880` (Codex Sites Captures, 4816×3226)
- **8 screenshots:** `573:64872` through `573:64879`
- **Codex build:** `oluk-experience-lab.sigmamindset.chatgpt.site` (owner-only, v2)
- **Date:** 2026-08-09
- **Authority references used:** MF-02A champion (`551:28924`), ProductCommerceCard/Vertical (`486:4634`), CategoryFamilyRail (`561:41860`), Hero 2-fold template (`470:6393`), Product Dossier (`563:42499`)

---

## VERDICT SUMMARY

The v2 build gets the **data truth** right (MK-2866 values, source-bound states, honest fixture labels) but **re-interprets the MF design language as backend system documentation projected onto a frontend surface.** The result reads like an API spec with a stylesheet, not a storefront designed by the Figma MF work.

The core problem: Codex treated the MF carryover audit as a **technical specification to narrate** rather than a **visual design system to implement.** Every section headline describes what the section IS in system terms rather than what it SAYS to customers.

---

## SECTION-BY-SECTION VIOLATIONS

### 1. Hero (Captures 1–2)

**Figma authority:** `470:6393` — ONE continuous 2-fold vertical card (440×685) with embedded cobalt divider separating hero copy from featured product. Product toggle chips BELOW the card. Media chamber on the right.

**Codex build:** Simple two-column layout. Headline "Explore the Olympus Labs UK range" on the left, product image on the right. DecisionSurface (MK-2866 info) sits BELOW the hero as a separate section, not embedded inside a continuous card.

| Violation | Figma Authority | Codex Build |
|---|---|---|
| Card continuity | Single card surface with embedded divider | Headline and product info are separate sections |
| Cobalt divider | `#0057FF` 2px horizontal divider between hero copy zone and purchase zone | No embedded divider |
| Hero headline | "Formulated to a higher standard." — product-authority copy | "Explore the Olympus Labs UK range." — generic catalogue copy |
| Purchase zone position | Inside the hero card, below the divider | Below the hero, separate section |
| Product toggle chips | Below the card: MK-2866, MENT, ENDURASHRED, RAD-140, MK-677 | Not visible |
| Media chamber | Right side of the continuous card, same card surface | Separate column, disconnected from card |

**Severity: HIGH** — The hero is the most visible MF-02A achievement and its structure is completely missed.

### 2. Category Navigation (Capture 3)

**Figma authority:** `561:41860` — CategoryFamilyRail (1171×544). Four compound family cards: SARMs, Prohormones, Research Chemicals, Stacks. Each with description text and "Explore →" link. White cards with blue-shifted border, equal density.

**Codex build:** Four cards titled SARM SERIES, PRODUCT DETAILS, LAB RECORDS, METHODOLOGY. First card is **solid cobalt blue fill** with white text. Others are white.

| Violation | Figma Authority | Codex Build |
|---|---|---|
| Card content | Compound families (SARMs, Prohormones, Research Chemicals, Stacks) | Mixed navigation categories — 3 of 4 aren't compound families at all |
| Card surface | ALL white with `rgba(206,220,241,0.92)` border | First card solid cobalt `#0057FF` fill — **surface contract violation** |
| Equal density | All 4 cards identical weight | First card visually dominates |
| Copy | Product-relevant descriptions ("Selective compounds with receptor specificity") | System descriptions ("Browse the governed product family", "Review governed product truth and purchase details") |
| Section headline | "The full range" — customer-facing | "Choose a clear starting point" — meta-navigation |

**Severity: HIGH** — Solid blue card fill is a banned surface. Category content is wrong.

### 3. Product Catalogue Grid (Capture 4)

**Figma authority:** `486:4634` — ProductCommerceCard/Vertical (481×916). Bounded media chamber, purchase plane, MetricRail, QualitativeChips, IN STOCK, EvidenceStatus, Add to Bag CTA, View Lab Record CTA. Full card at r=24.

**Codex build:** One governed MK-2866 card + two placeholder "Product slot" cards with blue circle icons. Cards show flat layout, no Softform Arc shadow, no bounded media chamber shape.

| Violation | Figma Authority | Codex Build |
|---|---|---|
| Card count | 3× full Vertical cards (all populated) | 1 real + 2 placeholders |
| Card structure | Bounded media chamber → purchase plane → MetricRail → QualitativeChips → price → CTAs | Flat image + text list |
| Media chamber | Rounded container with `rgb(240,244,251)` fill, product render inside | Image sits directly on card surface |
| MetricRail | Bordered chips: 15 MG / 90 / >99% in structured row | Inline text "15 MG · 90 SERVINGS · >99%" |
| QualitativeChips | Category tags (SARMS, CAPSULES, ANABOLIC) as chip components | CLASS/FORM as key-value pairs |
| Shadow | Softform Arc graduated shadow (r=24) | No visible shadow |
| Placeholder treatment | N/A — all cards populated with product data | Blue circle icon + "CATALOGUE SOURCE PENDING" + "Product slot" — **backend vocabulary** |
| Section headline | "Featured and quick-add" or similar | "A clear product-card hierarchy" — **meta-description of the design system** |

**Severity: CRITICAL** — The ProductCommerceCard is the central MF-01A achievement. Rendering it as a flat text list discards 80% of the card's design identity.

### 4. OpenLab Section (Capture 5)

**Figma authority:** `561:41625` (openlab-realtime, 693×660) — HPLC Purity Trace chart + Batch Records table. `475:9098` (TrustEvidenceSpine, 1440×851) — six-point evidence ledger with narrative block.

**Codex build:** 6-cell numbered grid: PRODUCT / BATCH / LAB / REPORT / PUBLIC LEDGER / CONTEXT. "ENTER OPENLAB" CTA.

| Violation | Figma Authority | Codex Build |
|---|---|---|
| Content | Real evidence components (HPLC trace, batch records, six-point verification) | Abstract category labels |
| Visual | Dashboard widget with chart + data table | Numbered text grid |
| Copy | Customer-facing: "Finished products. Verified evidence." | Backend taxonomy: "Source-bound batch context", "No reconstructed analytical values" |
| Information density | Rich data visualization | Flat text cells |

**Severity: MEDIUM** — The source-bound approach is honest (correct to not fabricate HPLC data), but the visual treatment should show the SHAPE of evidence components with fixture data, not a category taxonomy.

### 5. Reviews (Capture 6)

**Codex build shows:** "A complete review surface — without invented customers" + SAMPLE REVIEW A/B/C + EMPTY/LOADING/UNAVAILABLE states.

| Violation | What's Wrong |
|---|---|
| Headline | Meta-commentary: "A complete review surface — without invented customers" — describes what the section IS, not what it SAYS |
| Card identity | Generic flat cards, no Softform Arc shape, no surface contract border |
| State labels | EMPTY/LOADING/UNAVAILABLE shown as design surface states — useful for development but NOT for a design review build |

**Severity: LOW** — Reviews didn't have a Figma authority reference, so placeholder approach is understandable. The fixture/state treatment is honest. But the meta-commentary headline is still wrong.

### 6. Related Product Rail (Captures 7–8)

**Figma authority:** `486:4636` — ProductCommerceCard/Horizontal (1060×542, r=34). Bounded media chamber + purchase plane, full-width adaptive.

**Codex build:** RAD-140 horizontal card, adaptive width. Ice media chamber on left, purchase info on right. MetricRail (8 MG, 60 SERVINGS, >99%), £46.

| Assessment | Status |
|---|---|
| Adaptive full-width | ✅ CORRECT |
| Ice media chamber | ✅ CORRECT — `rgb(240,244,251)` tone visible |
| Product truth | ✅ CORRECT — RAD-140, Testolone, 8 MG, 60, >99%, £46 |
| MetricRail | ⚠️ PARTIAL — values present but displayed as inline text, not bordered chips |
| Card radius | ⚠️ UNCLEAR — should be r=34 (largest in Softform Arc system) |
| Shadow | ❌ No Softform Arc shadow visible |
| Section headline | ❌ "A full-width horizontal commerce relationship" — meta-description |

**Severity: LOW** — This is the closest section to correct. Structure works, just missing material finish.

### 7. Header (Capture 1, top)

**Codex build:** Three-tier: trust bar (EXPERIENCE LAB · STATIC DESIGN FIXTURES banner) → main nav (Shop, Open Lab, About) with LAB RECORDS button + BAG → series bar (BROWSE, FEATURED, CATALOGUE, MK-2866, REVIEWS, OPENLAB PORTAL, RECORDS).

| Assessment | Status |
|---|---|
| Three-tier structure | ✅ CORRECT |
| Trust rail content | ⚠️ The top bar says "STATIC DESIGN FIXTURES · NO LIVE INVENTORY, REVIEWS, EVIDENCE, CART OR CHECKOUT IS CONNECTED" — this is a development disclaimer, not a trust rail |
| Nav items | ✅ Shop / Open Lab / About matches approved structure |
| LAB RECORDS prominence | ✅ CORRECT — prominent button treatment |
| Series bar | ⚠️ Shows page navigation (BROWSE, FEATURED, CATALOGUE...) — not sure this matches any Figma authority |

**Severity: MEDIUM** — Structure is right but the trust rail is replaced with a development disclaimer.

### 8. Footer (Capture 8, bottom)

**Codex build:** Three-column: SHOP (Catalogue, MK-2866, Review states) / OPENLAB (Portal, Lab Records, Methodology, Source chain) / ABOUT (Olympus Labs UK, EvidenceOS, Contact, Privacy).

| Assessment | Status |
|---|---|
| Column structure | ✅ Reasonable |
| Route coverage | ✅ Maps the 14 routes |
| Trust credentials | ❌ Missing — no batch count, no JANOSHIK reference, no OPENLAB VERIFIED badge |
| Copy | ⚠️ "Review states" as a nav link — backend language |

**Severity: LOW** — No Figma authority exists for footer. Structure is a starting point.

---

## CROSS-CUTTING VIOLATIONS

### 1. Meta-Commentary Headlines (CRITICAL)

Every section headline describes what the section IS in system terms instead of speaking to customers:

| Section | Codex Headline | What It Should Say (per Figma authority) |
|---|---|---|
| Hero | "Explore the Olympus Labs UK range" | "Formulated to a higher standard" (from `470:6393`) |
| Category | "Choose a clear starting point" | "The full range" or "Compound Families" (from `561:41860`) |
| Catalogue | "A clear product-card hierarchy" | "Featured and quick-add" or product-specific |
| OpenLab | "Product records and source context" | "Finished products. Verified evidence." (from `475:9098`) |
| Reviews | "A complete review surface — without invented customers" | "Customer reviews" or similar |
| Related | "A full-width horizontal commerce relationship" | "Frequently paired together" (from champion `551:28924`) |

This is the single most visible indicator that the build was authored as a **system specification** rather than a **design implementation.**

### 2. Backend Vocabulary on Frontend Surface (HIGH)

Terms that should never appear on a customer-facing surface:
- "GOVERNED PRODUCT" / "CATALOGUE SOURCE PENDING" / "SOURCE-BOUND"
- "DEMO STATE" / "DESIGN FIXTURE" / "RENDERED DESIGN FIXTURE"
- "NOT CONNECTED" / "No reconstructed analytical values"
- "Sample reviewer" / "Date slot" / "Purchase status slot"

These are appropriate as code comments or Storybook annotations, NOT as visible UI text. The Figma MF work uses customer-facing language throughout — "IN STOCK", "OPENLAB VERIFIED", "Add to Bag", "View Lab Record".

### 3. Surface Contract Violations (HIGH)

| Token | Required | Observed in Codex |
|---|---|---|
| Canvas background | `#f7f8fc` | Appears pure white `#ffffff` in several sections |
| Card surface | White fill + `rgba(206,220,241,0.92)` 1px border | Some cards have border, category card 1 has solid cobalt fill |
| Card shadow | Softform Arc graduated shadow | No shadows visible on any card |
| Card radius | r=20 (Compact), r=24 (Vertical/Featured), r=28 (PurchasePanel), r=34 (Horizontal) | Generic uniform radius, doesn't match density-specific values |

### 4. Missing Card Makeup (CRITICAL)

The ProductCommerceCard makeup — the central MF-01A achievement — is reduced to flat text lists:

| Card Element | Figma Authority | Codex Build |
|---|---|---|
| Bounded media chamber | Rounded container, `rgb(240,244,251)` fill, product render centered | Image on card or separate section |
| MetricRail | 3 bordered chips: VALUE / LABEL per metric | Inline cobalt text |
| QualitativeChips | Tag pills: SARMS, CAPSULES, ANABOLIC | Key-value pairs: CLASS/SARM, FORM/CAPSULES |
| IN STOCK badge | Green dot + text, positioned top-right | ✅ Present (correct) |
| EvidenceStatus | Atom icon + "OPENLAB VERIFIED" | ✅ Present (correct) |
| Purchase CTA | Cobalt "Add to Bag" button + stepper | "ADD TO BAG · DEMO STATE" — correct intent, wrong label |
| View Lab Record | Blue outline button with atom icon | "EXPLORE OPENLAB" — wrong CTA |

---

## CONFIRMED (What Codex Got Right)

1. **MK-2866 data truth:** 15 MG, 90 SERVINGS, >99%, £43, Ostarine, SARM SERIES — all correct
2. **RAD-140 data truth:** 8 MG, 60 SERVINGS, >99%, £46, Testolone — correct
3. **Source-bound honesty:** Not fabricating HPLC data, batch IDs, or aggregates — correct approach
4. **9-route OpenLab family:** Recognized and implemented all 9 routes — correct architecture
5. **Three-tier header structure:** Correct layout approach
6. **Adaptive horizontal card:** RAD-140 stretches full width — correct
7. **IN STOCK + OPENLAB VERIFIED:** Both badges present on product displays
8. **Ice media chamber tone:** Visible on hero and related product — correct `rgb(240,244,251)`
9. **No checkout/payment/runtime claims:** Correctly deferred to Runtime B
10. **Private-only deployment:** Owner-only access, no public domain — correct gate

---

## CONTRADICTIONS (Figma Authority vs. Codex Implementation)

1. **Hero structure** — Codex decoupled the 2-fold card into separate sections; Figma locks them as one continuous surface
2. **Category content** — Codex shows navigation taxonomy; Figma shows compound families (SARMs, Prohormones, Research Chemicals, Stacks)
3. **Card makeup** — Codex renders flat text; Figma provides full structured components (bounded media, MetricRail chips, QualitativeChips, Softform Arc shadows)
4. **Copy register** — Codex narrates the system; Figma speaks to customers
5. **Surface contract** — Canvas color, card shadows, density-specific radii all missing or wrong
6. **Dossier** — Not visible in captures (may exist on subpage); Figma has `563:42499` as locked authority

---

## NEEDS CODEX (Correction Priority)

### Priority 1: Strip Meta-Commentary
Replace every system-narration headline with customer-facing copy from the Figma authority or equivalent register.

### Priority 2: Implement Card Makeup
The ProductCommerceCard is not a flat text list. It has:
- Bounded media chamber (container with `rgb(240,244,251)` fill + border radius)
- MetricRail as bordered chip row
- QualitativeChips as tag pills
- Softform Arc shadow
- Density-specific border radius

Reference: `486:4634` — screenshot the Figma component and translate its visual structure, not just its data.

### Priority 3: Rebuild Hero as 2-Fold Card
The hero is ONE card with an embedded cobalt divider. Not two sections. Reference: `470:6393`.

### Priority 4: Fix Category Cards
- Remove solid cobalt fill from card 1
- Replace navigation taxonomy with compound families: SARMs, Prohormones, Research Chemicals, Stacks
- All cards white with `rgba(206,220,241,0.92)` border
- Reference: `561:41860`

### Priority 5: Apply Surface Contract
- Canvas: `#f7f8fc` (not white)
- Card borders: `rgba(206,220,241,0.92)` 1px
- Shadows: Softform Arc graduated per density
- Radii: r=20/24/28/34 per card type

### Priority 6: Remove Backend Vocabulary
Every instance of "GOVERNED", "SOURCE-BOUND", "DESIGN FIXTURE", "DEMO STATE", "NOT CONNECTED", "CATALOGUE SOURCE PENDING" must be replaced with customer-facing equivalents or removed.

---

## SUGGESTED NEXT FIGMA ACTION

1. **Annotate the Codex captures** on canvas with red violation markers (optional — the violations are documented here)
2. **Prepare a visual diff** — screenshot the Figma authority components at the same viewport scale as the Codex captures to make the gap undeniable
3. **Write MF-03 PROMPT.md** — if the correction scope is large enough, run a focused Make session for the sections Codex can't get right from CSS alone (hero 2-fold card, dossier three-panel layout)
4. **Header native component** — the three-tier structure is correct; design the native Figma component so Codex has a pixel reference to match, not just a description

---

## RISK NOTES

- The gap between Codex's interpretation and the Figma design authority is fundamental — it's not a CSS polish issue, it's a structural misunderstanding of what the MF work produced
- Codex optimized for **runtime truthfulness** (no fake data) at the expense of **design fidelity** (no visual structure)
- The card makeup (bounded media chamber, MetricRail chips, Softform Arc shadow) cannot be described in text alone — Codex needs to reference the actual Figma component screenshots
- For Olympus checkout, basket, payment, order-received, or Runtime B work, remind Codex to follow repo AGENTS.md and the controlling runtime packet
