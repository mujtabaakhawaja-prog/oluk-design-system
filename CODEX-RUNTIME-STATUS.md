# CODEX Runtime Status Report

> **Updated**: 2026-07-22
> **Branch**: codex/r6-site-shopper-completion-v02
> **HEAD**: c0418333b77ef996962279176df977ba51ab09ce
> **Important**: This document tracks RUNTIME implementation status as reported by Codex. Figma design authority is complete. Runtime confirmation is pending for items marked PENDING.

---

## Status Matrix

### GREEN (Implemented & Verified)

| Area | Status | Evidence |
|---|---|---|
| Runtime primitives | GREEN | build:ssr PASS, runtime-studio-v2 PASS, PRODUCT_COMMERCE03 49/49 PASS |
| PDP default assembly | GREEN | SSR markers confirmed: price-container, sku-container, series-label, pdp-performance-rail, pdp-commerce-trust-rail, openlab |
| PDP quantity ownership | GREEN | PriceContainer owns quantity |
| Light/dark SSR | GREEN | Both SSR routes return component markers |
| PerformanceIcon (6 variants) | GREEN | Implemented |
| CommerceTrustIcon (3 variants) | GREEN | Implemented |
| PerformanceCell | GREEN | Implemented |
| PerformanceRail | GREEN | Implemented and mounted in PDP |
| CommerceTrustCell | GREEN | Implemented |
| CommerceTrustRail | GREEN | Implemented and mounted in PDP |
| SeriesLabel | GREEN | Implemented and mounted in PDP |
| SKUContainer | GREEN | Implemented and mounted in PDP |
| PriceContainer | GREEN | Implemented and mounted in PDP |
| Price default state | GREEN | Implemented |
| Price unavailable state | GREEN | Implemented |
| StatusChip 6 styles | GREEN | success, warning, error, info, neutral, pending |
| SourceDrawer component | GREEN | Exists as component |
| Header (TrustRail, PremiumNavBar, UserRail) | GREEN | Implemented |

### PENDING (Not Yet Complete)

| Area | Status | What's Missing |
|---|---|---|
| Price offer state | API GREEN, fixture PENDING | No governed product fixture with compare-at price flowing through PDP |
| StatusChip stock mapping | Style GREEN, mapping PENDING | Availability mapping not centralized as governed runtime function |
| SourceDrawer integration | Component GREEN, SSR proof PENDING | Not integrated into PDP/OpenLab source surface with valid projection |
| Governed performance metadata | Functional, authority PENDING | Still temporary product-family mapping, needs governed product metadata |
| Responsive captures | PENDING | Not generated at 390, 768, 1024, 1440 in light+dark |
| Keyboard/focus evidence | Implementation present, evidence PENDING | Complete evidence not recorded |
| Axe audit | PENDING | Local Playwright browser unavailable |
| Full Figma visual readback | PENDING | Pixel/geometry comparison not completed |
| Production promotion | PENDING | c0418333b pushed to R6 branch but not promoted |

### EXCLUDED (By Design)

```
order_prepare_then_bridge
invoice_card_isolation
postpurchase_woo_read_model
```

These three checkout-lifecycle items remain intentionally excluded.

---

## Required Runtime Actions

### StatusChip Stock Mapping
Needs one runtime owner function:
```
in-stock     -> success / IN STOCK
low-stock    -> warning / LOW STOCK
out-of-stock -> error / OUT OF STOCK
preorder     -> info / PRE-ORDER
verified     -> success / VERIFIED
pending      -> pending / PENDING
```

### Governed Performance Metadata
Current temporary mapping:
```
MK-2866 / LGD-4033 -> 01, 05
GW-501516 / SR-9009 -> 03, 04
other products      -> 02
```
Needs to move into governed product metadata field: `performanceClaims: ["01", "05"]`

### Responsive Captures Needed
8 captures total: 4 viewports (390, 768, 1024, 1440) x 2 themes (light, dark)

---

## Figma Authority Reference

| Document | Location |
|---|---|
| Component Registry | COMPONENT-REGISTRY.md |
| Variable Registry | VARIABLE-REGISTRY.md |
| Typography Scale | TYPOGRAPHY-SCALE.md |
| Full Design Packet | FIGMA_TO_CODEX_PACKET.md |
| 28 Q&A Answers | CODEX-28-ANSWERS.md |
| PDP Contract Board | Figma node 1217:1566 |
| BRIDGE Page | Figma node 1195:7097 |
| PDP Champion | Figma node 1167:180 |