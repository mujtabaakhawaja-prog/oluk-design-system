# OLUK R6 — Component Registry

> All published component sets with node IDs, variant axes, and G1 binding status.

---

## Primitive Components

### OLUK / Button
**Node ID:** 1208:71821  
**Variants:** 60  
**Axes:** `tone` (primary, danger) × `size` (sm, md, lg) × `state` (default, hover, pressed, disabled, loading)  
**G1 Status:** ✅ Fully bound  
**Styles Used:** Label/Button text style  

### OLUK / StatusChip
**Node ID:** 1208:71858  
**Variants:** 12  
**Axes:** `status` (success, warning, error, info, neutral, stock) × `density` (default, compact)  
**G1 Status:** ✅ Fully bound  
**Variables:** status/{intent}/{surface,text,marker}  

### OLUK / Icon
**Node ID:** 1234:68771  
**Variants:** 12  
**Axes:** `size` (sm, md, lg) × `tone` (primary, secondary, accent, on-cta)  
**G1 Status:** ✅ Fully bound  

### OLUK / Input
**Node ID:** Inside 1216:68281  
**Variants:** 10  
**G1 Status:** ✅ Fully bound  

---

## Commerce Components

### PDP / SeriesLabel
**Node ID:** 1208:71612  
**Variants:** 2  
**Axes:** `format` (pill, inline)  
**G1 Status:** ✅ Fully bound  

### PDP / SKU Container
**Node ID:** 1208:71625  
**Variants:** 2  
**Axes:** `density` (full, compact)  
**G1 Status:** ✅ Fully bound  

### PDP / Price Container
**Node ID:** 1208:71698  
**Variants:** 6  
**Axes:** `state` (default, sale, out-of-stock) × `density` (full, compact)  
**G1 Status:** ✅ Fully bound  

---

## Evidence Components

### PDP / PerformanceIcon
**Node ID:** 1192:285  
**Variants:** 6  
**G1 Status:** ✅ Fully bound  

### PDP / CommerceTrustIcon
**Node ID:** 1192:304  
**Variants:** 3  
**G1 Status:** ✅ Fully bound  

### PDP / PerformanceCell
**Node ID:** 1192:63270  
**Variants:** 24  
**G1 Status:** ✅ Fully bound  

### PDP / PerformanceRail
**Node ID:** 1192:63570  
**Variants:** 8  
**G1 Status:** ✅ Fully bound  

### PDP / CommerceTrustCell
**Node ID:** 1192:63626  
**Variants:** 6  
**G1 Status:** ✅ Fully bound  

---

## System Components

### OLUK / SourceDrawer FE V02
**Node ID:** Inside 1216:1158  
**Variants:** 4  
**G1 Status:** ✅ Fully bound  

### OLUK / DocumentationSection
**Node ID:** Inside 1215:1158  
**Variants:** 15  
**G1 Status:** ✅ Fully bound  

### OLUK / TokenSwatch
**Node ID:** Inside 1214:875  
**Variants:** 4  
**G1 Status:** ✅ Fully bound  

---

## Bridge Components (OL/Commerce)

**Page:** BRIDGE (1195:7097) — 76 top-level nodes  
**Total Bindings:** 4,756 G1 variable bindings  
**Remaining Hardcoded:** ~70 (decorative/gradient — documented exceptions)  

24 component sets including:
- OL/Commerce navigation components
- OL/Commerce card variants
- OL/Commerce form elements
- OL/Commerce data display components
