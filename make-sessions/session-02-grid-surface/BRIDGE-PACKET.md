# FIGMA_TO_CODEX_PACKET — MF-02A Champion Corrections + PDP Cherry-Pick

## Metadata

- **File:** `BEPMuUt1HroEw8xjz8CVyN`
- **Page:** `512:4651` (Make output page)
- **Selected frame:** `551:28924` (App, 1440×5724) — [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-28924)
- **Date:** 2026-08-09

---

## Goal

Apply champion corrections from MF-02A Run 3 cherry-pick consolidation across BOTH the homepage composition and PDP page composition. Prepare for MF-02B integration by fixing color contracts, upgrading card types, restructuring the Dossier, and cherry-picking the best PDP sections.

---

## SECTION 1: Homepage Hero — DecisionSurface Corrections

### Node: `551:25220` (DecisionSurface, 541×284)
[Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-25220)

**Status: PARTIALLY DONE (Figma-side)**

✅ **COMPLETED in Figma:**
- "FEATURED PRODUCT" eyebrow → cobalt `#0057FF`
- "MK-2866" product name → cobalt `#0057FF`
- "PRICE" label → cobalt `#0057FF`
- "£43" price → cobalt `#0057FF`

**Still needed (Codex):**
1. **Add "IN STOCK" indicator** — green dot + "IN STOCK" text, positioned top-right of the purchase zone (same pattern as the ProductGrid cards in `551:25299` which already show it)
2. **Add EvidenceStatus badge** — `OPENLAB VERIFIED` with atom icon. Reference component: `518:13092` — [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=518-13092). Position near the product name, same placement as in the GridD cards.
3. **Cobalt accent line** — verify in code: there should NOT be a cobalt blue vertical accent on the RIGHT edge of the hero card. The only cobalt line should be the horizontal embedded divider (`551:25218`, 581×2, `#0057FF`) between the hero copy zone and the purchase zone. If a right-side cobalt accent exists in the CSS, remove it or relocate it to the embedded divider.

### Hero Structure (reference)
```
551:25194  LockedHero (1512×782)
  └─ 551:25195  Container (card, 1416×742, white fill, 1px rgba(206,220,241,0.92) stroke)
      └─ 551:25196  Container (inner, 1414×740)
          ├─ 551:25197  Container (left panel, 581×740)
          │   ├─ 551:25198  Container (hero copy zone, 581×360)
          │   ├─ 551:25218  Container (COBALT DIVIDER, 581×2, #0057FF) ← KEEP
          │   └─ 551:25219  Container (purchase zone, 581×324)
          │       └─ 551:25220  DecisionSurface (541×284) ← COLORS FIXED
          └─ 551:25292  MediaChamber (833×740, fill rgb(240,244,251))
```

---

## SECTION 2: Product Grid — Card Type Upgrade

### Node: `551:25299` (GridD, 1512×1102)
[Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-25299)

**Required Codex action:**
1. **Upgrade card type** — currently showing compact/quickrail-sized cards. Replace with **3× ProductGrid Vertical cards** at 481px wide each. Source component: `486:4634` — [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634). These are the full-height cards with bounded media chamber + purchase plane + MetricRail + QualitativeChips.
2. **Fix EvidenceStatus icon** — the OPENLAB VERIFIED badge in the catalogue cards needs to match the correct component (`518:13092`). Currently may be using a placeholder or incorrect atom icon.
3. **Grid width** — 3 cards × 481px = 1443px at 1440px desktop. Tight fit with minimal inter-card spacing (~8-12px gaps).

---

## SECTION 3: PDP Section 1 — Passes As-Is

Dir A full-field 60/40 split wins. No corrections needed.

---

## SECTION 4: Product Dossier — Hybrid A+B Restructure

### Node: `551:27148` (DossierD:margin, 1512×1252)
[Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-27148)

**Required Codex action (NOT implemented in Make — needs code-level restructure):**

1. **Header treatment** — use Direction B's compact header. "Product facts, label truth and batch evidence" headline must be tighter and more connected to the dossier content below. Reduce vertical gap between headline and dossier cards.

2. **Central media chamber** — MORE COMPACT:
   - Delete the logo (Olympus Labs mark) from the media chamber
   - Delete the SKU number from the media chamber
   - Move the product render (bottle) HIGHER in the chamber
   - Reduce overall media chamber height

3. **Horizontal content alignment** — Product Facts and Product Composition cards should sit INSIDE the card surface, horizontally aligned WITH the media chamber, not in separate flanking columns. Think: one wide card containing [Facts | Media | Composition] side-by-side.

4. **Surface contract for data cards** — use the **in-family surface contract** (white card, blue-shifted border `rgba(206,220,241,0.92)`, Softform Arc shadow) for the Product Facts and Product Composition sections. NOT the current technical/tabular look. These should feel like they belong to the same card family as the ProductCommerceCards.

5. **Copy readability** — minimum 15-16px body text per typography contract. Current specification text is too small/dense.

6. **Tabs** — Product/Facts/Composition tabs are REFERENCE ONLY. Show Product tab as active. Do not implement switching.

- Source component: `198:1292` — [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=198-1292)

---

## SECTION 5: Evidence / TrustEvidenceSpine — Dir B Wins

### Node: `551:26498` (Container, 1512×851) ✅ GOOD
[Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-26498)

No corrections needed. Homepage TrustEvidence banner passes.

---

## SECTION 6: Related/Upsell Rail — Adaptive Full-Width

### Node: `551:26896` (RailD, 1512×798) ✅ GOOD (structure)
[Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-26896)

### Node: `545:24677` (Container, 1512×622) — horizontal card
[Open in Figma](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=545-24677)

**Required Codex action:**
- The combo media chamber + horizontal purchase panel must stretch **FULL-WIDTH ADAPTIVELY**
- Both the media chamber and the purchase plane should expand to fill the 1440px content width
- One horizontal card only (RAD-140). No second product.
- Source component: `486:4636` — [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4636)

---

## SECTION 7: PDP Page — Cherry-Pick Specification

### Direction C PDP is the champion with the following section ordering:

| Order | Section | Node ID | Figma Link | Notes |
|---|---|---|---|---|
| 1 | PDP Media + PurchasePanel | (Dir A S1) | Full-field 60/40 split | Dir A winner |
| 2 | Product Media Controls | `126:47` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=126-47) | Hero Tab Bar (Product/Facts/Composition) |
| 3 | Assurance Rail | `551:31587` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-31587) | Six-point evidence ledger (310px tall) |
| 4 | Product Dossier | (restructured) | See Section 4 above | Hybrid A+B with corrections |
| 5a | Lab Records header | `551:31570` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-31570) | Evidence header (204px) |
| 5b | Lab Records evidence | `551:31665` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-31665) | Evidence detail (450px) |
| 5c | Lab Records data | `551:31706` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-31706) | Batch records table (244px) |
| 6a | Related rail header | `551:28672` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-28672) | RailHeader (176px) |
| 6b | Related rail card | `551:28685` | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-28685) | Adaptive horizontal card (622px) |

### Also reference from Dir B:
- `551:29819` (Container, 1248×237) — [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-29819) — 4-grid layout
- `551:30054` (Container:margin, 1248×553) — [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-30054) — Evidence section from Dir B

---

## SECTION 8: MF Completion Roadmap — What's Left

### Completed MF Runs
| Run | Focus | Status | Key Outcome |
|---|---|---|---|
| MF-01A | Card densities (Softform Arc) | ✅ COMPLETE | 5 card densities: Compact, Vertical, Featured, Horizontal, PurchasePanel |
| MF-01B | Relationship transfer test | ✅ COMPLETE | Dir C planar language, cherry-pick consolidated |
| MF-02A Run 1 | Grid surface first attempt | ✅ COMPLETE | Hero PNG failure, Dir C planes selected |
| MF-02A Run 2 | Hero variants + differentiation | ✅ COMPLETE | Section differentiation failure identified |
| MF-02A Run 3 | Locked hero + section differentiation | ✅ COMPLETE | Champion composite locked |

### What's Been Designed (Figma native components)
- ✅ ProductCommerceCard family (5 densities, componentized)
- ✅ PurchasePanel (standalone)
- ✅ ProductMetricRail
- ✅ ProductSpecificationRail (Transparent-Chips)
- ✅ TrustEvidenceSpine (Six-point ledger)
- ✅ LabReports / Canvas Split
- ✅ EvidenceStatus badge
- ✅ Dossier / Native Light VNext (3 variants)
- ✅ Homepage Hero 2-fold vertical card
- ✅ PDP Section 1 Control Test
- ✅ Surface contract (canvas, dividers, shadows, typography)
- ✅ Cobalt authority order

### What's Still Missing — Pivotal Design Surfaces

#### 1. OpenLab Surfaces (HIGH PRIORITY)
- **OpenLab Archive page** — the public-facing lab records browser. Search + filter + batch records table + individual report view. Pattern exists in `222:1332` (LabReports canvas-split) but needs a full page composition.
- **Individual Lab Record page** — single batch report detail: HPLC Purity Trace chart, six-point verification status, Certificate of Analysis link, compound/batch metadata.
- **OpenLab trust indicator integration** — how the OPENLAB VERIFIED badge connects to the archive (clickthrough pattern).

#### 2. Connective Tissue Elements (HIGH PRIORITY)
- **Header navigation** — site-wide nav bar with logo, primary nav links (Products, Lab Records, About), user account icon, trust rail (OPENLAB VERIFIED count or badge), cart/bag icon. Not designed yet.
- **Footer** — site-wide footer: company info, legal links, contact, social, trust credentials. Not designed yet.
- **Category cards** — product category navigation (SARM Series, etc.). Cards that group products by category for the main catalogue page. Different from ProductCommerceCards — these are navigation/wayfinding.
- **Trust rail** — horizontal trust indicators strip (possibly below header or in footer area): "Third-party tested", "JANOSHIK Verified", batch count, etc.

#### 3. CSS Grids for Main Surface Pages (MEDIUM PRIORITY)
- **Homepage full composition** — hero + grid + TrustEvidence + rail assembled at 1440px with correct section spacing. MF-02A produced this in Make but needs native Figma integration or Codex Sites implementation.
- **Product catalogue / shop page** — 3-across Vertical card grid with category filtering, search, and sort controls. The grid layout is proven but the page shell (header, filters, pagination) doesn't exist yet.
- **PDP full composition** — Section 1 + Media Controls + Assurance Rail + Dossier + Lab Records + Related Rail as one continuous scroll. Cherry-picked from Dir C but needs assembly.

#### 4. Product-Specific Pages (LOWER PRIORITY)
- **Product comparison** — side-by-side product specs for cross-shopping
- **Bundle/stack builder** — "Stacks well with" relationship into a build-your-stack flow
- **Order confirmation / receipt** — post-purchase (Runtime B scope, follow AGENTS.md)

### Recommended Next Actions

| Priority | Surface | Best Tool | Why |
|---|---|---|---|
| 1 | Header nav + trust rail | Figma (native component) | Structural element, needs componentization for reuse |
| 2 | Footer | Figma (native component) | Same reason |
| 3 | Category cards | Figma (native component) | New card type, needs design exploration |
| 4 | Homepage full assembly | Codex Sites | Proven sections, needs code assembly with real responsive behavior |
| 5 | PDP full assembly | Codex Sites | Cherry-picked sections, needs code assembly |
| 6 | Product catalogue page | Codex Sites + Figma | Grid layout + page shell (filters, search, pagination) |
| 7 | OpenLab Archive page | Figma Make → Codex | New surface, needs design exploration first |
| 8 | Individual Lab Record page | Figma Make → Codex | Same |

---

## Implementation Constraints

- Surface contract colors: Canvas `#f7f8fc`, dividers `rgb(206,220,241)`, near-black `rgb(20,24,39)`, card borders `rgba(206,220,241,0.92)`
- Typography: Plus Jakarta Sans ExtraBold (display) + Inter (body). No substitutions.
- Cobalt: `#0057FF` (core), `#256DFF` (interactive). Authority order: metric > spec > qualitative > structural edge.
- Zero grey: no achromatic/Tailwind grey. Blue-shifted neutrals only.
- Shadow system: graduated by decision weight (see RESULTS-RUN3.md elevation table)
- Make-generated code is disposable machinery — not a runtime handoff
- Dossier tabs are reference-only — no switching implementation
- Dark mode, MENT, black-label: OUT OF SCOPE

## Acceptance Checks

1. Hero DecisionSurface: cobalt product name + price, IN STOCK badge, EvidenceStatus, no right-side cobalt accent
2. Grid: 3× Vertical cards (481px), correct EvidenceStatus icon, equal-density
3. Dossier: compact header, compact media (no logo/SKU), horizontal content alignment, in-family surface contract on data cards, readable copy (≥15px)
4. Rail: adaptive full-width horizontal card, single RAD-140 product
5. PDP: Dir C section ordering (S1 → Media Controls → Assurance → Dossier → Lab Records → Related Rail)

## Risk Notes

- Dossier restructure is the most complex correction — it requires layout changes that may not be achievable through CSS tweaks alone; may need component-level rebuild
- PDP section ordering from Dir C hasn't been tested as a continuous scroll — verify visual rhythm
- Header/footer design doesn't exist yet — these are blocking surfaces for any shipped page
- OpenLab pages are new design territory — no Make runs exist for these; consider MF-03 for OpenLab exploration

## Next Action

1. **Codex:** Implement the 5 corrections listed in Acceptance Checks above on the current Make codebase
2. **Figma (me):** Available to inspect any corrected nodes, verify colors, provide additional component screenshots
3. **Human:** Decide whether to start header/footer/category card design in Figma native or Figma Make
4. **Codex:** After corrections, assemble the full PDP page using Dir C section ordering
