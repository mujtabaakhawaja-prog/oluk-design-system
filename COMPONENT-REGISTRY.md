# OLUK R6 — Component Registry

> **Updated**: 2026-07-22
> **Status**: FIGMA COMPLETE — PENDING RUNTIME CONFIRMATION
> All component sets listed below exist in the Figma file with G1 variable bindings. Runtime implementation status is tracked separately in CODEX-RUNTIME-STATUS.md.

---

## Primitive Components (PDP Champion Page 1167:180)

### OLUK / Button
**Node ID:** 1208:71821
**Variants:** 60
**Axes:** `tone` (primary, secondary, danger, ghost) x `size` (sm, md, lg) x `state` (default, hover, pressed, disabled, loading)
**G1 Status:** Fully bound
**Note:** Leading/trailing icons are component properties (boolean + instance swap), NOT variant axes. 4x3x5=60 variants.

### OLUK / StatusChip
**Node ID:** 1208:71858
**Variants:** 12
**Axes:** `status` (success, warning, error, info, neutral, pending) x `density` (default, compact)
**G1 Status:** Fully bound
**Variables:** status/{intent}/{surface,text,marker}

### OLUK / StatusChip / Semantic V02
**Node ID:** 1213:1601
**Variants:** 10
**Axes:** `semantic` x `density`
**G1 Status:** Fully bound

### OLUK / Icon
**Node ID:** 1234:68771
**Variants:** 12
**Axes:** `size` (sm, md, lg) x `tone` (primary, secondary, accent, onCta)
**G1 Status:** Fully bound

### OLUK / Input
**Node ID:** Inside 1216:68281
**Variants:** 10
**G1 Status:** Fully bound

---

## PDP Commerce Components (PDP Champion Page 1167:180)

### PDP / SeriesLabel
**Node ID:** 1208:71612
**Variants:** 2
**Axes:** `format` (pill, inline)
**G1 Status:** Fully bound

### PDP / SKU Container
**Node ID:** 1208:71625
**Variants:** 2
**Axes:** `density` (full, compact)
**G1 Status:** Fully bound

### PDP / Price Container
**Node ID:** 1208:71698
**Variants:** 6
**Axes:** `state` (default, offer, unavailable) x `density` (full, compact)
**G1 Status:** Fully bound

### PDP / PerformanceIcon
**Node ID:** 1192:285
**Variants:** 6
**Axes:** `performance` (01-06)
**G1 Status:** Fully bound

### PDP / CommerceTrustIcon
**Node ID:** 1192:304
**Variants:** 3
**Axes:** `type` (tested, dispatch, encrypted)
**G1 Status:** Fully bound

### PDP / PerformanceCell
**Node ID:** 1192:63270
**Variants:** 24
**Axes:** `performance` x `density` x `state`
**G1 Status:** Fully bound

### PDP / PerformanceRail
**Node ID:** 1192:63570
**Variants:** 8
**Axes:** `density` x `claims`
**G1 Status:** Fully bound

### PDP / CommerceTrustCell
**Node ID:** 1192:63626
**Variants:** 6
**Axes:** `type` x `density`
**G1 Status:** Fully bound

---

## Bridge Commerce Components (BRIDGE Page 1195:7097)

**Total:** 24 component sets, **596 variants**, G1-bound

### Product Cards (8 sets)
| Component | Node ID | Variants | Axes |
|---|---|---|---|
| OL/Commerce/ProductCard | 1199:15561 | 32 | layout x state x proof |
| OL/Commerce/QuickCommerceCard | 1199:15890 | 24 | viewport x density x state x proof |
| OL/Commerce/StandaloneProductCard | 1199:16346 | 12 | mode x state x proof |
| OL/Commerce/ProductRow | 1199:16107 | 16 | density x state x proof |
| OL/Commerce/MobileRailCard | 1199:16264 | 8 | state x proof |
| OL/Commerce/ProductRailCard | 1199:16297 | 12 | density x state x proof |
| OL/Commerce/SimilarProductCard | 1199:16689 | 6 | density x state |
| OL/Commerce/CategoryCard | 1199:16835 | 3 | State |

### Commerce Controls (6 sets)
| Component | Node ID | Variants | Axes |
|---|---|---|---|
| OL/Commerce/QuickAddButton | 1199:13771 | 126 | size x state x tone x icon |
| OL/Commerce/ViewBasketButton | 1199:14303 | 30 | state x density x icon |
| OL/Commerce/QuantityStepper | 1199:14424 | 36 | size x state x value |
| OL/Commerce/PriceBlock | 1199:16819 | 3 | State |
| OL/Commerce/SecondaryAction | 1199:16648 | 9 | action x state |
| OL/Commerce/LabReportLink | 1199:16676 | 6 | density x state |

### Trust & Evidence (4 sets)
| Component | Node ID | Variants | Axes |
|---|---|---|---|
| OL/Commerce/ProofChip | 1199:14713 | 128 | proofType x state x density x icon |
| OL/Commerce/MetricStrip | 1199:15202 | 27 | density x count x surface |
| OL/Commerce/AssuranceRail | 1199:15338 | 12 | layout x density x count |
| OL/Commerce/TrustTile | 1199:16470 | 32 | tile x density x state |

### Layout & Utility (4 sets)
| Component | Node ID | Variants | Axes |
|---|---|---|---|
| OL/Commerce/CommerceSectionShell | 1199:16401 | 8 | viewport x slotCount x proof |
| OL/Commerce/CompareDrawer | 1199:16714 | 4 | viewport x state |
| OL/Commerce/LoyaltySlot | 1199:16729 | 6 | state x density |
| OL/Commerce/DispatchStatusRow | 1199:16742 | 4 | viewport x claimSet |

### Shop & Navigation (2 sets)
| Component | Node ID | Variants | Axes |
|---|---|---|---|
| OL/Commerce/ShopUtilityBar | 1199:16771 | 4 | viewport x state |
| OL/Commerce/Breadcrumbs | 1199:16639 | 4 | viewport x depth |

---

## System Components

### OLUK / SourceDrawer FE V02
**Node ID:** Inside 1216:1158
**Variants:** 4
**G1 Status:** Fully bound

### OLUK / DocumentationSection
**Node ID:** Inside 1215:1158
**Variants:** 15
**G1 Status:** Fully bound

### OLUK / TokenSwatch
**Node ID:** Inside 1214:875
**Variants:** 4
**G1 Status:** Fully bound

---

## Summary

| Category | Sets | Variants |
|---|---|---|
| Primitive (OLUK/*) | 5 | 94 |
| PDP Commerce | 8 | 52 |
| Bridge Commerce (OL/Commerce/*) | 24 | 596 |
| System | 3 | 23 |
| **Total** | **40** | **765** |

**Implementation authority:** BRIDGE page (1195:7097) for OL/Commerce sets; PDP Champion page (1167:180) for PDP/* and OLUK/* sets.
**ProductCommerceCard System page** is a design workshop — NOT implementation authority.