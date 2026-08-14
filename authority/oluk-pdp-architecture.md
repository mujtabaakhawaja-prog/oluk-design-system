## PDP MK-2866 Page Architecture

> **2026-08-14 OptionB correction:** `1176:28930` supersedes flat header predecessor `754:18224`. The current Sites candidate implements the three-band OptionB Premium structure and retains `754:18226` as the sole-inverse footer source. This native V4 architecture remains evidence; all candidate artifacts remain unpublished and require artifact-specific human review.


### Current State — NR-02C Native V4 (node 126:4)
- 1440×5204px, vertical layout
- Page canvas: #F7F8FC (blue-shifted near-white)
- Canvas is the default margin and scroll-rhythm surface. It separates independent jobs selectively; joined jobs use embedded dividers or authored seams.

### Live PDP Section Order
1. **Utility Bar** (126:5) — HIDDEN
2. **Header Navigation** (126:13) — 1440×78
3. **Utility Sub-Header** (126:21) — 1440×46
4. **Section 1: Full-Field Hero Rail** (126:37) — 1440×879, continuous flat atmospheric field with an integrated product render composition and independently raised PurchaseRail. It does not consume the bounded/elevated ProductMediaChamber master. **EXCEPTION: NO cobalt top edge, NO card language, NO Blue-Eyebrow.** Only PDP section that breaks bounded-chamber architecture
5. **Hero Tab Bar** (126:47) — 1440×72, left-aligned with 48px gutter
6. **Dossier** — use canonical candidate `750:182`; historical interactive nodes remain source evidence. Do not infer interaction semantics from labels without a later explicit decision.
7. **Section 3: Lab Verification Embedded** (188:450) — 1440×784, six-point proof + HPLC trace + batch records
8. **Section 3b: Lab V Canvas-Split** (188:926) — 1440×784, comparative/provisional only. Its white outer wrapper prevents the child gap from being true exposed canvas; do not use this exact wrapper as surface authority.
9. **Section 4: Content Rail (Archive)** (126:226) — 1440×380, editorial intro + 4 compound family cells. Its macro rail relationship is useful; repeated local hairlines and cobalt perimeter strokes are defects. Where justified, retain only one continuous top relationship accent.
10. **Section 5: Content Rail (Records)** (126:264; clean split evidence at 222:1332) — 1440×694, LabReports editorial intro + data ledger. This is the cleaner current canvas-split reference.
11. **Global Footer Rail** (126:350) — 1440×90, white (no inverse slab)

### VNext Component Governance (198:923)
Upstream COMPONENT_SET masters with variants → live PDP consumes as INSTANCE. Changes propagate.

| Capability | Master Node | Type |
|---|---|---|
| Dossier | 206:1899 | COMPONENT_SET (3 variants + 8 interactions) |
| Lab Verification | 213:1809 | COMPONENT_SET (Embedded + Canvas Split) |
| LabReports | 211:1759 | COMPONENT_SET (Canvas Split + Embedded) |
| PurchaseRail | 202:1235 | COMPONENT (cobalt metric chips, no per-serving price) |
| SidebarPurchaseOptions | 286:4015 | COMPONENT_SET (universal purchase surface; Sidebar 260:4228 + Compact 285:4006 variants) |
| Product Media Chamber | 202:1165 | COMPONENT |
| Blue-Eyebrow | 252:5783 | COMPONENT (replaces strokeTopWeight eyebrow) |
| ProductMetricRail | 248:4105 | COMPONENT (cobalt chips: 15 MG / 90 SERVINGS / >99%) |
| ProductSpecificationRail | 259:3914 | COMPONENT (cobalt spec cells: SARM / CAPSULES / LAB FORMULATED / 3RD-PARTY) |
| Transparent-Chips | 252:5801 | COMPONENT (base + cobalt variant 259:3863) |
| TrustEvidenceSpine | 202:1646 | INSTANCE (NarrativeBlock on white elevated card) |
| PDP-render-effect-light | 135:16 | COMPONENT (approved master candidate) |

### Product Commerce Card Contract
Standard card structure for all product panels:
1. **ProductMetricRail (248:4105)** — quantified product truth (15 MG / 90 SERVINGS / >99%)
2. **ProductSpecificationRail (259:3914)** — classified product information (SARM / CAPSULES / LAB FORMULATED / 3RD-PARTY) when the context requires it
3. **Context-specific chamber/content connection** — embedded divider for vertical cards, authored seam for horizontal cards, and a raised white purchase panel in compact cards

**Blue-Eyebrow normalization:** Blue-Eyebrow `252:5783` remains valid for authorized non-hero sections and continuous multi-cell rails. It is superseded as a ProductCommerceCard requirement and is prohibited as card-level decoration by the newer MF-01A Constitution. It is also prohibited on PDP Section 1.

Panels displaying product truth preserve the ProductMetricRail's quantified-truth job and keep specifications and qualitative attributes semantically distinct. The current NR-04 file demonstrates tighter metric cells and slightly looser specification/qualitative rails; exact radii and strokes remain observed candidates rather than promoted tokens. See `surface-contract.md`.

### Visual Authority Boards (236:1568)
- VA-00: Native Visual Authority Index (236:1569)
- VA-01: Material + Separation (236:1605)
- VA-02: Shape + Rail Grammar (236:1990)
- VA-03: Type + Product Truth (236:2509)
- VA-04: Retained Capability Proof (236:2607)
- VA-05: Native Route Proofs (237:3216)

### Responsive Proofs
- Desktop: 237:3220 (1440px)
- Tablet: 238:4089 (768px)
- Mobile: 239:4097 (390px)

### Product Truth (canonical values)
- MK-2866 / Ostarine / SARM Series
- SKU 80529-01
- 15 MG / 90 SERVINGS / >99%
- £43 (no decimals, no crossed-out price, no per-serving)
- "Add to bag" + "View Lab Record"

### Gate Status
- NR-03 passed — human selection complete
- NR-04 Source Lock complete — purchase masters synchronized, icon corrected, inputs frozen
- MF-01A material/anatomy remains persistent relationship authority; CONV-001 applies later deltas through the canonical candidate graph
- MF-03A/B and MF-04 candidates remain human-review required; MF-09 and MF-10 gate promotion
- Foundation rebase/promotion remains blocked until MF-10 and a separate system decision
- MENT dark-object asset remains a later System Gate blocker

### Semantic chip distinctions
- **Cobalt metric chip:** current NR-04 expression uses #0057FF 1.5px stroke and approximately 8px radius for ProductMetricRail quantified truth
- **Colorless qualitative chip:** current NR-04 expression uses #D9DEE8 1px stroke and approximately 10px radius for qualitative attributes
- **Specification rail:** current NR-04 expression uses #0057FF 1px stroke and approximately 10px radius for joined classified information

The semantic distinction is accepted at NR-04; the exact geometry is not. MF-01A may explore adaptive chip and rail shape within the hierarchy `metric > specification > qualitative > structural`. Exact values remain foundation candidates and MF-01B tests whether the distinction transfers beyond cards.

### SidebarPurchaseOptions (286:4015)
- COMPONENT_SET with Viewport=Sidebar (564×758) and Viewport=Compact (390×889)
- Both variants synchronized to four qualitative attributes in 2×2 grid layout
- Shield/check icon from TrustEvidenceSpine AssuranceIcon (Concentration Confirmed)

**Figma file:** `BEPMuUt1HroEw8xjz8CVyN` (Final-Design), Page `3:4`
