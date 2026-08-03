## PDP MK-2866 Page Architecture

### Current State — NR-02C Native V4 (node 126:4)
- 1440×5204px, vertical layout
- Page canvas: #F7F8FC (blue-shifted near-white)
- Canvas is the divider — gaps between sections show canvas surface

### Live PDP Section Order
1. **Utility Bar** (126:5) — HIDDEN
2. **Header Navigation** (126:13) — 1440×78
3. **Utility Sub-Header** (126:21) — 1440×46
4. **Section 1: Full-Field Hero Rail** (126:37) — 1440×879, continuous fullfield atmospheric rail (MediaStage gradient). Contains Product Media Chamber + raised PurchaseRail. **EXCEPTION: NO cobalt top edge, NO card language, NO Blue-Eyebrow.** Only PDP section that breaks canvas architecture
5. **Hero Tab Bar** (126:47) — 1440×72, left-aligned with 48px gutter
6. **Dossier / Native Interactive** (182:92) — INSTANCE of 206:1899, 1440×1253, three Product/Facts/Composition states with 8 hover reactions
7. **Section 3: Lab Verification Embedded** (188:450) — 1440×784, six-point proof + HPLC trace + batch records
8. **Section 3b: Lab V Canvas-Split** (188:926) — 1440×784, same content in canvas-split layout
9. **Section 4: Content Rail (Archive)** (126:226) — 1440×380, editorial intro + 4 compound family cells with continuous cobalt top edge
10. **Section 5: Content Rail (Records)** (126:264) — 1440×694, LabReports instance (Canvas Split), editorial left + data table right, cobalt chip stats (15 REPORTS / 99.55% AVG PURITY / 0 FAILURES)
11. **Global Footer Rail** (126:350) — 1440×90, white (no inverse slab)

### VNext Component Governance (198:923)
Upstream COMPONENT_SET masters with variants → live PDP consumes as INSTANCE. Changes propagate.

| Capability | Master Node | Type |
|---|---|---|
| Dossier | 206:1899 | COMPONENT_SET (3 variants + 8 interactions) |
| Lab Verification | 213:1809 | COMPONENT_SET (Embedded + Canvas Split) |
| LabReports | 211:1759 | COMPONENT_SET (Canvas Split + Embedded) |
| PurchaseRail | 202:1235 | COMPONENT (cobalt metric chips, no per-serving price) |
| Sidebar - Purchase options | 260:4228 | COMPONENT (preferred purchase panel — cobalt chips, performance attrs, icons) |
| Product Media Chamber | 202:1165 | COMPONENT |
| Blue-Eyebrow | 252:5783 | COMPONENT (replaces strokeTopWeight eyebrow) |
| ProductMetricRail | 248:4105 | COMPONENT (cobalt chips: 15 MG / 90 SERVINGS / >99%) |
| ProductSpecificationRail | 259:3914 | COMPONENT (cobalt spec cells: SARM / CAPSULES / LAB FORMULATED / 3RD-PARTY) |
| Transparent-Chips | 252:5801 | COMPONENT (base + cobalt variant 259:3863) |
| TrustEvidenceSpine | 202:1646 | INSTANCE (NarrativeBlock on white elevated card) |
| PDP-render-effect-light | 135:16 | COMPONENT (approved master candidate) |

### Product Commerce Card Contract
Standard card structure for all product panels:
1. **Blue-Eyebrow (252:5783)** at top edge — cobalt accent, replaces legacy strokeTopWeight
2. **ProductMetricRail (248:4105)** — product truth chips (15 MG / 90 SERVINGS / >99%)
3. **ProductSpecificationRail (259:3914)** — category chips (SARM / CAPSULES / LAB FORMULATED / 3RD-PARTY)
All panels displaying product truth MUST use this contract. Chip contract: cobalt #0057FF 1.5px stroke, white fill, 8px radius.

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
- Make convergence lane now eligible (bounded by Make Constitution and handoff contract)
- Foundation rebase (NR-05) blocked until native reconstruction (04B) completes
- MENT dark-object asset remains a later System Gate blocker

### Two Chip Contracts (frozen at NR-04)
- **Cobalt metric chip:** #0057FF 1.5px stroke, 8px radius, white 2% fill — for ProductMetricRail quantified truth
- **Colorless qualitative chip:** #D9DEE8 1px stroke, 8px radius, white fill — for SidebarPurchaseOptions attributes

### SidebarPurchaseOptions (286:4015)
- COMPONENT_SET with Viewport=Sidebar (564×758) and Viewport=Compact (390×889)
- Both variants synchronized to four qualitative attributes in 2×2 grid layout
- Shield/check icon from TrustEvidenceSpine AssuranceIcon (Concentration Confirmed)

**Figma file:** `BEPMuUt1HroEw8xjz8CVyN` (Final-Design), Page `3:4`
