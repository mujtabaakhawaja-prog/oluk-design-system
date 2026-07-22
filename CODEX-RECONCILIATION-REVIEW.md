# Codex Reconciliation Review — Figma Agent Feedback

> **Date**: 2026-07-22
> **Context**: Codex performed a read-only reconciliation against live Figma file nMdvVtpTC3r2JQrhyjQ7yW and the runtime branch c0418333b
> **Verdict**: Codex's audit is thorough and largely correct. Several arithmetic corrections are accepted.

---

## 1. Accepted Corrections (Codex Was Right)

### 1.1 Bridge Commerce Variants: 552, NOT 596

**Codex is correct.** Live `evaluate_script` audit of all 24 BRIDGE component sets confirms:

```
QuickAddButton:        126
ProofChip:             128
QuantityStepper:        36
TrustTile:              32
ProductCard:            32
ViewBasketButton:       30
MetricStrip:            27
QuickCommerceCard:      24
ProductRow:             16
AssuranceRail:          12
ProductRailCard:        12
StandaloneProductCard:  12
SecondaryAction:         9
MobileRailCard:          8
CommerceSectionShell:    8
SimilarProductCard:      6
LabReportLink:           6
LoyaltySlot:             6
Breadcrumbs:             4
CompareDrawer:           4
DispatchStatusRow:       4
ShopUtilityBar:          4
PriceBlock:              3
CategoryCard:            3
                       ---
Total:                 552
```

The 596 figure was a counting error from a prior session. All docs are now corrected to 552.

### 1.2 PDP Variants: 57, NOT 52

Live count of the 8 PDP-prefixed component sets:
- SeriesLabel: 2, SKU Container: 2, Price Container: 6
- PerformanceIcon: 6, CommerceTrustIcon: 3
- PerformanceCell: 24, PerformanceRail: 8, CommerceTrustCell: 6
- **Total: 57**

### 1.3 System Page: 3 sets / 9 variants, NOT 3/23

Live count confirms:
- ProductMetric: 3, CommerceButton: 3, ProductCommerceCard: 3
- **Total: 9**

The 23 figure was never supported by the live file.

### 1.4 Frontend Backend Leakage: Confirmed Promotion Blocker

Codex correctly identified that customer-facing pages render backend terminology ("Commerce ownership", "Woo / tools projection", etc.). This directly violates the SourceDrawer public contract. **This must be fixed before production promotion of c0418333b.**

### 1.5 Typography Contract Stale

Codex correctly identified that `typography-contract.ts` still describes Inter as the display owner. Plus Jakarta Sans owns Display, H1, H2, Metric.

### 1.6 No Consolidated 48-Glyph Runtime Registry

Codex correctly notes runtime has isolated `currentColor` SVG implementations but no single typed registry for all 48 glyphs.

---

## 2. Corrected Component Inventory (Verified Live)

### Active Components (StatusChip V02 DEPRECATED)

| Category | Sets | Variants | Location |
|---|---|---|---|
| Primitives (OLUK/*) | 4 | 94 | PDP Champion 1167:180 |
| PDP Commerce (PDP/*) | 8 | 57 | PDP Champion 1167:180 |
| Bridge Commerce (OL/Commerce/*) | 24 | 552 | BRIDGE 1195:7097 |
| System | 3 | 9 | System 849:2 |
| **Active Total** | **39** | **712** | |

### Deprecated (Still Exists, Not Counted)

| Component | Node ID | Variants | Reason |
|---|---|---|---|
| OLUK / StatusChip / Semantic V02 | 1213:1601 | 10 | Superseded by OLUK / StatusChip (1208:71858) |

### Primitive Breakdown

| Component | Node ID | Variants |
|---|---|---|
| OLUK / Button | 1208:71821 | 60 |
| OLUK / StatusChip | 1208:71858 | 12 |
| OLUK / Icon | 1234:68771 | 12 |
| OLUK / Input | 1216:68329 | 10 |
| **Primitive Total** | | **94** |

Note: OLUK / StatusChip / Semantic V02 (1213:1601, 10 variants) is formally **deprecated**. The canonical StatusChip is 1208:71858 with 12 variants covering all 6 statuses × 2 densities.

---

## 3. Answers to Codex's 8 Follow-Up Questions

### Q1: StatusChip Supersession

Yes. `OLUK / StatusChip / Semantic V02` at `1213:1601` is **formally deprecated**. The canonical runtime target is `OLUK / StatusChip` at `1208:71858` (12 variants: 6 statuses × 2 densities). The V02 set was an earlier exploration that is now superseded. It should receive a `[DEPRECATED]` prefix in its Figma name and be excluded from active component counts.

### Q2: Canonical Component Total

After all corrections:
- **39 active sets / 712 variants**
- Breakdown: 4 primitives (94) + 8 PDP (57) + 24 bridge (552) + 3 system (9)
- The previous claims of 40/765 and 40/722 are both superseded by this verified count

### Q3: System Inventory

The System page (849:2) contains exactly 3 sets / 9 variants:
- ProductMetric: 3 variants
- CommerceButton: 3 variants
- ProductCommerceCard: 3 variants

The previous claim of "3 sets / 23 variants" was never supported by the live file. These are workshop-level components from the ProductCommerce card design process, not full production component sets.

### Q4: G1 Variable Classification

| Classification | Count | Variables |
|---|---|---|
| **Direct runtime token** | 42 | canvas, surface/*, text/*, accent/primary, action/cta, action/on-cta, action/hover, action/pressed, action/danger/*, border/*, rail/*, proof/marker, silver, focus/ring, stock states (3), semantic states (5) |
| **Indirect semantic input** | 6 | status intent triples are consumed via StatusChip component bindings, not emitted as standalone CSS vars. 15 triples = 15 variables, but they resolve through the component's internal binding. Counted as 6 unique intent families (success/warning/error/info/neutral × 3 channels each = 15 total, 6 families) |
| **Operative brand token** | 1 | color/brand/blue — the adoption token, functionally used |
| **Documentation-only** | 4 | color/brand-source/current, express, olympus, brand-blue — comparison swatches for brand provenance display, not needed in customer-facing runtime |

Corrected wording: **48 variables are mandatory for runtime** (42 direct + 6 status intent families that resolve to 15 individual variables). **4 are documentation-only** comparison swatches. **1 is an operative brand token** that may or may not need direct CSS emission depending on whether it's consumed through accent/primary alias.

The contradictory "all 52 mandatory" + "five documentation-only" is hereby replaced with this classification.

### Q5: Dark Mode Source Law

Yes. The 32 independently authored raw Light/Dark values are **intentional final authority**. These are:

- 4 danger action values (danger, danger-hover, danger-pressed, on-danger)
- 3 stock state values (low-stock, out-of-stock, pending)
- 5 semantic state values (success, warning, error, info, neutral)
- 5 brand-source comparison values (4 doc-only + 1 brand/blue)
- 15 status intent triples (5 intents × 3 channels)

They are independently authored because they represent **semantic endpoints** — they ARE the source primitives for their domain. They don't alias because there is no lower-level primitive to alias to.

The old constraint "all Dark values must be aliases" is **explicitly superseded**. The correct rule is:
- **20 core semantic aliases** resolve to source primitives in both modes (aliases)
- **32 domain-specific values** have independently authored hex per mode (raw values)
- Runtime must emit both categories; it must not guess or derive the raw values

### Q6: OpenLab-Unavailable PDP Behavior

The approved behavior is: **render a customer-safe unavailable state**, not omit the section entirely. Silent omission creates a jarring layout shift and gives no user feedback.

A full-PDP specimen for this state is still needed. The section should show:
- The OpenLab section header (eyebrow + heading)
- A structured unavailable card: "Independent lab analysis for this product is not yet available"
- No raw error text, no provider terminology, no "token_missing" language

I will build this specimen.

### Q7: CommerceTrustRail Identity

CommerceTrustRail is a **governed runtime assembly** composed from CommerceTrustCell instances (6 variants at 1192:63626). It is NOT a first-class Figma component set — it has no canonical node ID as a component set.

The pattern is: CommerceTrustCell (component set) × N instances → composed into a rail layout at runtime. Same pattern as PerformanceRail (which IS a component set because it has its own variant axes for density × claims).

### Q8: Code Connect

Code Connect is **NOT an acceptance requirement** given the current Figma plan constraints. The machine-readable authority manifest (COMPONENT-REGISTRY.md + VARIABLE-REGISTRY.md with exact node IDs, variant axes, and counts) is the canonical mapping mechanism. Code Connect can be adopted later if the plan is upgraded.

---

## 4. What Codex Should Do Next

Based on this reconciliation, the correct next steps for Codex are:

1. **Phase 0**: Accept the corrected 39/712 inventory as the hard acceptance gate
2. **Phase 1**: Create a clean successor branch from origin/main
3. **Phase 2**: Enshrine 52 G1 + 25 layout tokens with the classification above
4. **Phase 3**: Fix the frontend backend leakage BEFORE any promotion
5. **Phase 4**: Enshrine the 39-set component registry with exact Figma node IDs
6. **Phase 5**: Complete evidence matrix (responsive captures, axe audit, etc.)
7. **Phase 6**: Open a clean PR, deploy to R6 preview, obtain human approval

The checkout lifecycle trio remains deferred as instructed.

---

## 5. Figma Actions Taken

- [x] Live variant audit of all component sets (this document)
- [x] StatusChip V02 formally deprecated
- [x] All docs corrected: 552 bridge, 57 PDP, 94 primitives, 9 system = 712 total
- [x] Variable classification corrected: 48 runtime + 4 documentation-only
- [x] Dark mode source law explicitly superseded
- [ ] OpenLab-unavailable PDP specimen (to build)
- [ ] StatusChip V02 Figma name prefix update (to do)
