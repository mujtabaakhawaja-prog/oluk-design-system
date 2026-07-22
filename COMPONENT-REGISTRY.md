# OLUK R6 — Component Registry

> **Updated**: 2026-07-22 (post-Codex reconciliation)
> **Status**: FIGMA COMPLETE — PENDING RUNTIME CONFIRMATION
> **Verified**: Live `evaluate_script` audit, every count mechanically confirmed

---

## Corrected Totals

| Category | Sets | Variants | Location |
|---|---|---|---|
| Primitives (OLUK/*) | 4 | 94 | PDP Champion 1167:180 |
| PDP Commerce (PDP/*) | 8 | 57 | PDP Champion 1167:180 |
| Bridge Commerce (OL/Commerce/*) | 24 | 552 | BRIDGE 1195:7097 |
| System | 3 | 9 | System 849:2 |
| **Active Total** | **39** | **712** | |

### Deprecated (exists but excluded from active count)
| Component | Node ID | Variants | Reason |
|---|---|---|---|
| OLUK / StatusChip / Semantic V02 | 1213:1601 | 10 | Superseded by OLUK / StatusChip (1208:71858) |

---

## Primitive Components (4 active sets, 94 variants)

### OLUK / Button
**Node ID:** 1208:71821 | **Variants:** 60
**Axes:** `tone` (primary, secondary, danger, ghost) × `size` (sm, md, lg) × `state` (default, hover, pressed, disabled, loading)
**Note:** Icons are component properties (boolean + instance swap), NOT variant axes. 4×3×5=60.

### OLUK / StatusChip
**Node ID:** 1208:71858 | **Variants:** 12
**Axes:** `status` (success, warning, error, info, neutral, pending) × `density` (default, compact)
**Variables:** status/{intent}/{surface,text,marker}

### OLUK / Icon
**Node ID:** 1234:68771 | **Variants:** 12
**Axes:** `size` (sm, md, lg) × `tone` (primary, secondary, accent, onCta)

### OLUK / Input
**Node ID:** 1216:68329 | **Variants:** 10
**Note:** Nested inside documentation frame 1216:68281

---

## PDP Commerce Components (8 sets, 57 variants)

| Component | Node ID | Variants | Axes |
|---|---|---|---|
| PDP / SeriesLabel | 1208:71612 | 2 | format (pill, inline) |
| PDP / SKU Container | 1208:71625 | 2 | density (full, compact) |
| PDP / Price Container | 1208:71698 | 6 | state (default, offer, unavailable) × density (full, compact) |
| PDP / PerformanceIcon | 1192:285 | 6 | performance (01-06) |
| PDP / CommerceTrustIcon | 1192:304 | 3 | type (tested, dispatch, encrypted) |
| PDP / PerformanceCell | 1192:63270 | 24 | performance × density × state |
| PDP / PerformanceRail | 1192:63570 | 8 | density × claims |
| PDP / CommerceTrustCell | 1192:63626 | 6 | type × density |

---

## Bridge Commerce Components (24 sets, 552 variants)

### Product Cards (8 sets, 113 variants)
| Component | Node ID | Variants |
|---|---|---|
| OL/Commerce/ProductCard | 1199:15561 | 32 |
| OL/Commerce/QuickCommerceCard | 1199:15890 | 24 |
| OL/Commerce/ProductRow | 1199:16107 | 16 |
| OL/Commerce/StandaloneProductCard | 1199:16346 | 12 |
| OL/Commerce/ProductRailCard | 1199:16297 | 12 |
| OL/Commerce/MobileRailCard | 1199:16264 | 8 |
| OL/Commerce/SimilarProductCard | 1199:16689 | 6 |
| OL/Commerce/CategoryCard | 1199:16835 | 3 |

### Commerce Controls (6 sets, 210 variants)
| Component | Node ID | Variants |
|---|---|---|
| OL/Commerce/QuickAddButton | 1199:13771 | 126 |
| OL/Commerce/QuantityStepper | 1199:14424 | 36 |
| OL/Commerce/ViewBasketButton | 1199:14303 | 30 |
| OL/Commerce/SecondaryAction | 1199:16648 | 9 |
| OL/Commerce/LabReportLink | 1199:16676 | 6 |
| OL/Commerce/PriceBlock | 1199:16819 | 3 |

### Trust & Evidence (4 sets, 199 variants)
| Component | Node ID | Variants |
|---|---|---|
| OL/Commerce/ProofChip | 1199:14713 | 128 |
| OL/Commerce/TrustTile | 1199:16470 | 32 |
| OL/Commerce/MetricStrip | 1199:15202 | 27 |
| OL/Commerce/AssuranceRail | 1199:15338 | 12 |

### Layout & Utility (4 sets, 22 variants)
| Component | Node ID | Variants |
|---|---|---|
| OL/Commerce/CommerceSectionShell | 1199:16401 | 8 |
| OL/Commerce/LoyaltySlot | 1199:16729 | 6 |
| OL/Commerce/CompareDrawer | 1199:16714 | 4 |
| OL/Commerce/DispatchStatusRow | 1199:16742 | 4 |

### Shop & Navigation (2 sets, 8 variants)
| Component | Node ID | Variants |
|---|---|---|
| OL/Commerce/ShopUtilityBar | 1199:16771 | 4 |
| OL/Commerce/Breadcrumbs | 1199:16639 | 4 |

### Verification: 113 + 210 + 199 + 22 + 8 = 552 ✓

---

## System Components (3 sets, 9 variants)

| Component | Node ID | Variants |
|---|---|---|
| ProductMetric | 849:26151 | 3 |
| CommerceButton | 849:26158 | 3 |
| ProductCommerceCard | 849:26283 | 3 |

These are workshop-level components from the ProductCommerce card design process on the System page (849:2).

---

## Non-Component-Set Assemblies

These are governed runtime assemblies, NOT component sets:

| Assembly | Composed From | Note |
|---|---|---|
| CommerceTrustRail | CommerceTrustCell instances | Runtime composition, no own component set |
| SourceDrawer FE V02 | Inside 1216:1234 | Single component, not a set |
| DocumentationSection | Inside 1215:1158 | Documentation utility |
| TokenSwatch | Inside 1214:875 | Documentation utility |
