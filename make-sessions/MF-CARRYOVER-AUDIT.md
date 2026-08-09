# FIGMA_TO_CODEX_PACKET — MF Carryover Audit & Completion Roadmap

## Metadata

- **File:** `BEPMuUt1HroEw8xjz8CVyN` — [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design)
- **External Make file:** `N40v2cUxw3oxfcpSZoluCh` — [Evidence-OS Authority System](https://www.figma.com/make/N40v2cUxw3oxfcpSZoluCh/Evidence-OS-Authority-System)
- **Date:** 2026-08-09
- **Scope:** What carries from MF-01 → MF-01A → MF-02 → MF-03+, what native Figma work hasn't been completed in Make/Codex, and a full inventory of remaining design surfaces.

---

## PART 1: MF CARRYOVER MANIFEST

### The Core Problem

Design quality from MF-01/MF-01A card family isn't flowing into subsequent Make runs. The card "makeup" — MetricRail, QualitativeChips, IN STOCK, EvidenceStatus, cobalt accents, Softform Arc shadows — gets lost when Make rebuilds from scratch. Each new MF run starts cold and must be re-taught the card contract.

### What Carries Forward (Permanent Design System Assets)

These are the **locked, componentized, never-rebuild-from-scratch** assets. Every future MF run and Codex task must reference these directly.

#### A. ProductCommerceCard Family (MF-01A → permanent)

| Density | Node ID | Dimensions | Radius | Page | Figma Link |
|---|---|---|---|---|---|
| Vertical | `486:4634` | 481×916 | r=24 | MF-01 and MF-02 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634) |
| Featured | `486:4635` | 481×896 | r=24 | MF-01 and MF-02 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4635) |
| Horizontal | `486:4636` | 1060×542 | r=34 | MF-01 and MF-02 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4636) |
| Compact | `486:4642` | COMPONENT_SET (5 variants) | r=20 | MF-01 and MF-02 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4642) |
| PurchasePanel | `478:10367` | 420×687 | r=28 | 03 Identity Authority | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=478-10367) |

**Card Makeup Contract (must be re-utilized in every surface that shows a product):**
- Bounded media chamber (product render on `rgb(240,244,251)` fill)
- Purchase plane with price, strength, quantity, format
- MetricRail: cobalt quantified metrics (15 MG, 90 capsules, >99%)
- QualitativeChips: category tags (SARMS, CAPSULES, ANABOLIC)
- IN STOCK indicator: green dot + text, top-right of purchase zone
- EvidenceStatus badge: `OPENLAB VERIFIED` with atom icon (`518:13092`)
- Cobalt authority coloring on product name + price
- Softform Arc shadow system graduated by decision weight
- Card border: `rgba(206,220,241,0.92)` 1px stroke

**KEY CARRYOVER ACTION:** The homepage hero DecisionSurface (`551:25220`) must inherit this exact card makeup. Currently it uses bare black text with manually-applied cobalt. It should match the Vertical card commerce zone: cobalt product name, cobalt price, IN STOCK badge, EvidenceStatus, MetricRail row, QualitativeChips. The Vertical card (`486:4634`) is the direct reference for what the hero purchase zone should look like.

#### B. Evidence & Trust Components (MF-01 → permanent)

| Component | Node ID | Dimensions | Page | Figma Link |
|---|---|---|---|---|
| EvidenceStatus | `518:13092` | 134×13 | MF-01 and MF-02 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=518-13092) |
| TrustEvidenceSpine | `475:9098` | 1440×851 | 03 Identity Authority | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=475-9098) |
| CanvasSplit:margin | `470:9078` | 1075×470 | MF-01 and MF-02 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-9078) |
| LabReports / Canvas Split | `222:1332` | 1344×630 | 03 Identity Authority | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=222-1332) |

#### C. Hero Template (MF-02A → permanent)

| Component | Node ID | Dimensions | Page | Figma Link |
|---|---|---|---|---|
| Hero 2-fold card | `470:6393` | 440×685 | MF-01 and MF-02 | [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=470-6393) |

Structure: ONE continuous card surface with embedded cobalt divider (`#0057FF`, 2px) separating hero copy from featured product. Product toggle chips sit BELOW the card. Media chamber on the right.

#### D. Surface Contract (MF-01 → permanent)

| Token | Value | Usage |
|---|---|---|
| Canvas | `#f7f8fc` | Page background |
| Card border | `rgba(206,220,241,0.92)` 1px | All card strokes |
| Embedded divider (structural) | `rgb(206,220,241)` 1px | Between card sections |
| Embedded divider (authority) | `#0057FF` 2px | Hero zone separator |
| Near-black | `rgb(20,24,39)` | Primary text |
| Cobalt core | `#0057FF` | Quantified metrics, badges |
| Cobalt interactive | `#256DFF` | Links, CTAs |
| Typography | Plus Jakarta Sans ExtraBold (display) + Inter (body) | No substitutions |

#### E. MF-02A Champion Composite (locked section ordering)

| Section | Champion Source | Node ID | Status |
|---|---|---|---|
| Hero | Locked from template | `470:6393` | ✅ Structure locked, cobalt colors applied |
| Grid | Dir A, 3× Vertical 481px | `551:25299` | ⚠️ Needs card type upgrade to ProductGrid |
| PDP S1 | Dir A, 60/40 full-field | — | ✅ Passes |
| Dossier | A+B hybrid | `551:27148` | ⚠️ Needs restructure (see BRIDGE-PACKET) |
| Evidence | Dir B dashboard | `551:26498` | ✅ Passes |
| Rail | Dir A, 1 adaptive horizontal | `551:26896` | ⚠️ Needs adaptive full-width |

---

## PART 2: NATIVE WORK INVENTORY — What Hasn't Been Completed

Every node below exists in the Figma file as native design work. Categorized by completion status.

### Category 1: Completed in Make/Codex (verified)

| Node ID | Name | Page | What It Is | MF Coverage |
|---|---|---|---|---|
| `486:4634` | ProductCommerceCard / Vertical | MF-01 and MF-02 | Full-height commerce card | MF-01A ✅ componentized |
| `486:4635` | ProductCommerceCard / Featured | MF-01 and MF-02 | Featured variant | MF-01A ✅ componentized |
| `486:4636` | ProductCommerceCard / Horizontal | MF-01 and MF-02 | Wide commerce card | MF-01A ✅ componentized |
| `486:4642` | ProductCommerceCard / Compact | MF-01 and MF-02 | 5-variant set | MF-01A ✅ componentized |
| `518:13092` | EvidenceStatus | MF-01 and MF-02 | OPENLAB VERIFIED badge | MF-01A ✅ componentized |
| `475:9098` | TrustEvidenceSpine | 03 Identity Authority | Six-point evidence ledger | MF-02A ✅ used in champion |
| `551:28924` | App (champion) | MF-02 | Full homepage composite | MF-02A Run 3 ✅ champion locked |

### Category 2: Partially Completed — Needs Corrections (Codex tasks)

| Node ID | Name | Page | What It Is | What's Missing |
|---|---|---|---|---|
| `551:25220` | DecisionSurface | MF-02 | Hero purchase zone | Cobalt applied ✅, still needs IN STOCK + EvidenceStatus + card makeup parity with Vertical card |
| `551:25299` | GridD | MF-02 | Product grid section | Needs upgrade from quickrail cards → 3× Vertical ProductGrid cards |
| `551:27148` | DossierD:margin | MF-02 | Product dossier | Needs hybrid A+B restructure (compact header, horizontal alignment, in-family surface) |
| `551:26896` | RailD | MF-02 | Related products rail | Structure good, horizontal card needs adaptive full-width |

### Category 3: Native Work — Ready to Implement (design exists, not in Make/Codex)

These frames are designed in native Figma and can go directly to Codex implementation.

| Node ID | Name | Page | Dimensions | What It Is | Priority |
|---|---|---|---|---|---|
| `563:42499` | Section (Product Dossier) | Openlab spine | 1440×1372 | **BEST dossier example** — Product Facts + central media + Product Composition in three-panel layout with tab controls and footer strip. Use as PDP dossier template going forward. | HIGH |
| `561:41769` | Section (Product Assurance) | Openlab spine | 1440×434 | Six-point assurance rail: Identity Recorded, Purity Measured, Concentration Recorded, Third-Party Tested, Tracked Dispatch, Secure Checkout. With product focus chips (Lean mass support, Performance enhancement). | HIGH |
| `561:41625` | openlab-realtime | Openlab spine | 693×660 | HPLC Purity Trace chart + Batch Records table with PASS status indicators. Real-time trace state toggle (Real/Summary/Unavailable). Lab verification dashboard widget. | HIGH |
| `561:41860` | CategoryFamilyRail | Openlab spine | 1171×544 | Compound Families navigation: SARMs, Prohormones, Research Chemicals, Stacks. 4-column card grid with descriptions and "Explore →" links. | HIGH |
| `126:226` | Section 4: Content Rail (Archive) | 03 Identity Authority | 1440×380 | Earlier version of compound families rail — SARMs Series, Prohormones, Research Chems, Custom Stacks. Simpler layout, same 4-column pattern. | MEDIUM (superseded by `561:41860`) |
| `422:10293` | Container (Lab Verification) | 03 Identity Authority | 1171×500 | Independent Certificate of Analysis — Janoshik Analytical report with HPLC chromatogram, six-point proof checklist (Identity Confirmed, Purity Passed, Concentration Verified, Microbiological Clear, Heavy Metals Clear, Certificate Issued). View Full Lab Report CTA. | HIGH |
| `422:10210` | Container (Compound Dossier) | 03 Identity Authority | 1171×408 | Specification Matrix — compound data table: Application, Concentration, Total Active, Quantity, Purity, CAS, Molar Mass, Formula, Synonyms, Storage, Terms, Batch. Dense technical specification grid. | HIGH |
| `422:10139` | Container (small) | 03 Identity Authority | 1171×124 | Compact data strip — likely a header or summary bar for compound dossier sections. | LOW |
| `518:11384` | EmbeddedEvidence | MF-02 | 1075×523 | Evidence section with six-point proof + HPLC trace, designed for embedding in page compositions. | MEDIUM (variant of `422:10293`) |
| `518:12618` | EmbeddedEvidence | MF-02 | 1184×590 | Wider evidence variant with expanded trace chart area. | MEDIUM |
| `518:11645` | CanvasSplit | MF-02 | 1075×482 | Evidence canvas-split layout for side-by-side evidence presentation. | MEDIUM |

### Category 4: Native Work — Needs Design System Taming

These exist as rough native layouts. They need to be rebuilt under the OLUK design system rules (surface contract, cobalt authority, Softform Arc, zero grey) before they can go to Codex.

| Node ID | Name | Page | Dimensions | What It Is | Design Work Needed |
|---|---|---|---|---|---|
| `563:42661` | product-info | Openlab spine | 1440×1283 | PDP product information section — product description, specs grid (Strength, Quantity, Format, Total Active), product focus chips, + Compare/Guide/Shortlist action cards + dark "Compare the essentials" decision tool. **Needs:** surface contract colors (dark section violates zero-grey unless intentional inverse), card family shapes, cobalt authority on metrics. | HIGH |
| `563:42740` | product-comparison | Openlab spine | 1344×432 | Decision Tool compare panel — dark background with "Compare the essentials" headline, LGD-4033 product card with "View product" link. **Needs:** design system treatment — currently dark/inverse which is out of scope. Convert to light surface contract or flag as future dark-mode work. | MEDIUM |
| `563:42763` | shortlist | Openlab spine | 1440×569 | Product Shortlist builder — checkbox product list (ENDURASHRED £65, MK-677 £57) + dark "0 selected" panel with "Browse products" CTA. **Needs:** light surface treatment for the panel, surface contract borders, proper card shapes. | MEDIUM |
| `563:42258` | Vertical Copy / Cards × Vertical Container Panel | Openlab spine | 1171×897 | Evidence District with six-point proof + HPLC trace in a vertical panel layout. Well-structured but needs tightening to match surface contract. | MEDIUM |
| `563:42043` | Horizontal Copy / Cards × Vertical Container Panel | Openlab spine | 1171×876 | Horizontal variant of evidence panel. Same taming needed. | MEDIUM |
| `563:41952` | 4×1 Grid panel | Openlab spine | 1171×544 | CategoryFamilyRail variant — same 4-column compound families layout. Duplicate of `561:41860`, can be consolidated. | LOW |
| `561:41761` | product-tab-controls | Openlab spine | 691×56 | Product tab bar (Product / Facts / Composition). Small control strip. Already well-designed, just needs integration. | LOW |

### Category 5: Header / Nav / Brand — Needs Complete Redesign

These are the current header/nav elements that need to be redesigned under the new design system.

| Node ID | Name | Page | Dimensions | What It Is | Design Work Needed |
|---|---|---|---|---|---|
| `564:42811` | Olympus Labs UK / Header / Desktop / Light / OptionB-Premium-UtilityStack-V08 | Openlab spine | 1440×198 | Current header: trust rail (Free UK Delivery, Free Int'l Delivery £300+, Third-Party Lab Verified, JANOSHIK Validated, Encrypted Checkout) + main nav (Shop, Open Lab, Lab Records, Wholesale, About) + utility row (Sign In, Currency toggle, Appearance toggle, Cart). **Needs:** complete rebuild with MF design system — cobalt authority, surface contract, proper type hierarchy. Current design predates all MF work. | CRITICAL |
| `564:42946` | Logo Board — Option B | Openlab spine | 2800×2800 | Logo exploration board. Reference for brand mark decisions. | REFERENCE ONLY |
| `564:42882` | R6 Logo System | Openlab spine | 2800×2007 | Logo system exploration — R6 variant. Reference for brand mark decisions. | REFERENCE ONLY |

### Category 6: OpenLab Section — Full Page Architecture

The massive `564:64871` section (30600×19700) contains 9 subsections of OpenLab page designs that need design system taming and route mapping.

| Subsection ID | Name | What It Likely Contains |
|---|---|---|
| `564:43007` | OpenLab Portal | Main OpenLab landing/dashboard — the public evidence portal entry point |
| `564:44122` | Lab Records | Lab records archive/browser — searchable batch records list |
| `564:45673` | OpenLab — MK-2866 Dossier | Individual product dossier page — full evidence package for MK-2866 |
| `564:46696` | Branded Lab Record | Single lab report page — Janoshik certificate, HPLC chromatogram, batch metadata |
| `564:49171` | Batch Lookup | Batch search/lookup tool — enter batch code, retrieve linked report |
| `564:49828` | Methodology | Testing methodology explainer — how HPLC/HPLC-DAD works, what purity means |
| `564:50627` | Source Chain | Supply chain transparency page — raw material → formulation → testing → dispatch |
| `564:56412` | OpenLab Compare | Product comparison tool — side-by-side batch purity, lab results |
| `564:57977` | EvidenceOS | Evidence operating system overview — the meta-page explaining the trust architecture |

**All 9 subsections need:**
1. Design system taming (surface contract, cobalt authority, zero grey, Softform Arc)
2. CSS grid and section architecture
3. Route mapping to site navigation
4. Integration with the Evidence-OS Make file (`N40v2cUxw3oxfcpSZoluCh`)

---

## PART 3: MISSING DESIGN SURFACES

These don't exist anywhere in the file yet:

| Surface | Priority | Blocking? | Notes |
|---|---|---|---|
| **Reviews section** | HIGH | Yes — PDP page incomplete without it | Product reviews with ratings, verified purchase badges, evidence-linked review format |
| **Footer** | CRITICAL | Yes — no page can ship without it | Company info, legal links, contact, social, trust credentials, OpenLab link |
| **Homepage full CSS grid** | HIGH | Yes — champion sections exist but no assembled responsive page | Header → Hero → Grid → Dossier → Evidence → Rail → Footer at 1440px |
| **PDP full CSS grid** | HIGH | Yes — cherry-picked sections exist but no assembled page | S1 → Media Controls → Assurance → Dossier → Lab Records → Related Rail |
| **Product catalogue / shop page** | MEDIUM | Partial — grid layout proven, page shell missing | Header → filters/search → 3× Vertical card grid → pagination → footer |
| **Checkout / basket / payment** | DEFERRED | No — Runtime B scope | Follow AGENTS.md and controlling runtime packet |
| **Order confirmation** | DEFERRED | No — Runtime B scope | Follow AGENTS.md |

---

## PART 4: PORTAL + COMMERCE ROUTE MAP

### Source Materials

1. **MF-01 through MF-02A champion** — all card components, section compositions, surface contract
2. **Build Olympus Core Blue Ledger** (`556:32216`, 1171×5099) — dark-mode commerce flow showing: hero banner → category navigation → product grid → featured product → trust indicators → comparison tools. [Open](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=556-32216)
3. **Evidence-OS Authority System Make file** (`N40v2cUxw3oxfcpSZoluCh`) — [Open](https://www.figma.com/make/N40v2cUxw3oxfcpSZoluCh/Evidence-OS-Authority-System) — portal + commerce flow designed in Figma Make

### Recommended Route Architecture

```
/                          → Homepage (MF-02A champion composite)
/shop                      → Product Catalogue (3× Vertical card grid + filters)
/shop/:category            → Category filtered view (SARMs, Prohormones, etc.)
/product/:slug             → PDP (Dir C cherry-pick composition)
/product/:slug/compare     → Product Comparison (needs design taming from 563:42740)
/open-lab                  → OpenLab Portal (564:43007 — needs taming)
/open-lab/records           → Lab Records Archive (564:44122 — needs taming)
/open-lab/record/:batchId  → Individual Lab Record (564:46696 — needs taming)
/open-lab/dossier/:slug    → Product Evidence Dossier (564:45673 — needs taming)
/open-lab/batch-lookup     → Batch Lookup Tool (564:49171 — needs taming)
/open-lab/methodology      → Testing Methodology (564:49828 — needs taming)
/open-lab/source-chain     → Source Chain (564:50627 — needs taming)
/open-lab/compare          → Evidence Comparison (564:56412 — needs taming)
/about/evidence-os         → EvidenceOS Overview (564:57977 — needs taming)
/shortlist                 → Product Shortlist (563:42763 — needs taming)
/checkout                  → DEFERRED (Runtime B — follow AGENTS.md)
/basket                    → DEFERRED (Runtime B — follow AGENTS.md)
/order-received            → DEFERRED (Runtime B — follow AGENTS.md)
```

### How MF Work + Evidence-OS Make File Combine

The Evidence-OS Make file (`N40v2cUxw3oxfcpSZoluCh`) provides the **flow architecture** — how pages connect, what the user journey looks like from browse → research → trust → purchase. The MF work provides the **component library and visual language** — how each individual section and card looks, feels, and behaves.

**Combination strategy:**
- Use MF-01A card components for all product display surfaces
- Use MF-02A champion section compositions for homepage and PDP assembly
- Use Evidence-OS Make file for the OpenLab portal flow and page-to-page navigation architecture
- Use native Figma frames (Category 3 above) as section-level building blocks
- Apply surface contract + cobalt authority + zero grey uniformly across all routes

---

## PART 5: MF-03 PLANNING — What Gets the Next Make Run

### Recommended MF-03 Focus: OpenLab Portal + Header/Footer

**Why:** The OpenLab pages are the largest untamed design surface. 9 subsections of raw layout need design system treatment. Header and footer are blocking — no page ships without them.

### MF-03 Input Package

| Input | Node ID | What It Provides |
|---|---|---|
| OpenLab Portal (reference) | `564:43007` | Page architecture and content structure |
| Lab Records (reference) | `564:44122` | Archive/browser pattern |
| MK-2866 Dossier (reference) | `564:45673` | Individual product evidence page |
| Branded Lab Record (reference) | `564:46696` | Single report page |
| Product Dossier (locked) | `563:42499` | Best dossier composition — use as direct template |
| openlab-realtime widget (locked) | `561:41625` | HPLC trace + batch records component |
| Lab Verification (locked) | `422:10293` | Certificate of Analysis component |
| Compound Dossier (locked) | `422:10210` | Specification Matrix component |
| CategoryFamilyRail (locked) | `561:41860` | Compound families navigation |
| Header current (reference) | `564:42811` | Current header for content/nav structure only — redesign visual treatment |
| EvidenceStatus (locked) | `518:13092` | OPENLAB VERIFIED badge |
| TrustEvidenceSpine (locked) | `475:9098` | Six-point evidence ledger |
| Surface contract | — | Canvas, borders, shadows, cobalt, typography |

### MF-03 Deliverables

1. **Header navigation component** — redesigned under MF design system
2. **Footer component** — new design
3. **OpenLab Portal page** — landing/dashboard for public evidence
4. **Lab Records Archive page** — searchable batch records browser
5. **Individual Lab Record page** — single report detail

### MF-03 Constraints (carry forward)

- Do not run Porcelain, Atmospheric, or Frost as Make themes
- Do not explore new typography or spacing — compose accepted laws
- Make-generated code is disposable prototype machinery
- Dark mode and broad inverse sections remain out of scope
- Zero grey = no achromatic Tailwind grey leakage
- For checkout/basket/payment/order-received: follow AGENTS.md and controlling runtime packet

---

## PART 6: IMMEDIATE CODEX TASKS (Priority Order)

### Task 1: Hero DecisionSurface Card Makeup (HIGHEST)
**Goal:** Make the hero purchase zone look like the Vertical card commerce zone.
- **Source:** `486:4634` (ProductCommerceCard / Vertical)
- **Target:** `551:25220` (DecisionSurface)
- **Actions:** Add MetricRail row (15 MG | 90 capsules | >99%), add QualitativeChips (SARMS, CAPSULES, ANABOLIC), add IN STOCK badge, add EvidenceStatus badge, maintain cobalt authority on product name + price

### Task 2: Grid Card Upgrade
- **Target:** `551:25299` (GridD)
- **Action:** Replace quickrail cards with 3× ProductGrid Vertical cards (`486:4634`)

### Task 3: Dossier Hybrid Restructure
- **Target:** `551:27148` (DossierD)
- **Reference:** `563:42499` (best dossier example)
- **Action:** Compact header, remove logo/SKU from media, horizontal [Facts|Media|Composition] alignment, in-family surface contract on data cards

### Task 4: Adaptive Rail
- **Target:** `551:26896` (RailD) + `545:24677` (horizontal card)
- **Action:** Stretch horizontal card full-width adaptively

### Task 5: PDP Assembly
- **Action:** Assemble Dir C cherry-pick: S1 → Media Controls (`126:47`) → Assurance (`551:31587`) → Dossier → Lab Records (`551:31570` + `551:31665` + `551:31706`) → Related Rail (`551:28672` + `551:28685`)

### Task 6: Header Redesign (MF-03 or Figma native)
- **Current:** `564:42811` — predates all MF work
- **Action:** Redesign under surface contract + cobalt authority. Needs design exploration first (Figma Make or native).

### Task 7: Footer Design (MF-03 or Figma native)
- **Action:** New design. No existing reference. Needs design exploration.

---

## Acceptance Checks

1. Hero DecisionSurface matches Vertical card commerce zone makeup (MetricRail, chips, badges)
2. Grid shows 3× full Vertical ProductGrid cards, not quickrail cards
3. Dossier uses three-panel horizontal layout with in-family surface contract
4. Rail horizontal card stretches full 1440px width adaptively
5. PDP assembled in Dir C section order as one continuous scroll
6. All surfaces use surface contract colors, zero grey, cobalt authority order
7. OpenLab subsections catalogued and route-mapped for MF-03

## Risk Notes

- Header/footer are blocking surfaces — nothing ships to production without them
- OpenLab 9-subsection taming is the largest remaining design effort
- Dark sections in product-info (`563:42661`) and product-comparison (`563:42740`) violate zero-grey unless designated as intentional inverse — clarify scope before implementing
- Evidence-OS Make file flow hasn't been audited against the native Figma frames — may have divergent content or structure
- `14:9442` referenced by user but node no longer exists (deleted or moved)

## Next Action

1. **Codex:** Execute Tasks 1–5 (hero makeup, grid upgrade, dossier restructure, adaptive rail, PDP assembly)
2. **Figma (me):** Available to inspect corrections, provide component screenshots, verify color contracts
3. **Human:** Decide MF-03 scope — OpenLab portal + header/footer, or header/footer first as blocking dependency
4. **Codex:** After Task 5, begin OpenLab route mapping using the 9 subsections + Evidence-OS Make file flow
