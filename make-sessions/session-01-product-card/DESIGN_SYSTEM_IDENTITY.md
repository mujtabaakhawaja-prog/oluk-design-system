# OLUK R6 — Design System Identity Specification

Derived from visual evidence on page `461:89008` of file `yNAyIQhewnbofeZWMGkKVa`.
This is the system's visual DNA — the non-negotiable tokens, surfaces, and effects.

---

## Colors

| Token | Value | Role |
|-------|-------|------|
| `brand/cobalt` | `#0057FF` | Single accent. CTAs, active states, featured borders, chart traces |
| `surface/canvas` | `#FFFFFF` | Page background — pure white always |
| `surface/panel` | `#FFFFFF` | Card/island surfaces |
| `surface/atmospheric` | `#EEF4FF` (~6% cobalt) | L1 cobalt field bands — full-width section backgrounds |
| `surface/media` | radial `#FFF → #F3F8FF → #DDEEFF` | MediaChamber fill for product renders |
| `border/subtle` | `rgba(0,87,255, 0.08)` | Default card hairlines (cobalt at 8%) |
| `border/default` | `#D9DEE8` | Section rules, dividers, evidence table borders |
| `border/active` | `#0057FF` | Selected/featured/hover card perimeter |
| `text/primary` | `#111827` | Headings, prices, product names |
| `text/secondary` | `#667085` | Labels, descriptions, metadata |
| `text/cobalt` | `#0057FF` | Eyebrows, links, active nav |
| `status/pass` | `#10B981` | Evidence pass indicators |

---

## Effects

| Token | Value | Role |
|-------|-------|------|
| `elevation/card` | None (hairline border only) | Cards never use box-shadow |
| `elevation/island` | 1px border + optional 6-12% cobalt blur | OverlapIsland on L1 fields only |
| `bloom/media` | Radial gradient ellipse, 28-32px layer blur | Product render glow inside MediaChamber |

---

## Spacing

| Token | Value |
|-------|-------|
| `content-max` | 1171px |
| `section-gap` | 80-96px |
| `card-gap` | 24px |
| `rail-split` | 4fr / 8fr (NarrativeRail / OperationalPanel) |
| `inner-padding` | 24px (card), 32px (section) |

---

## Typography

| Role | Spec |
|------|------|
| Display/Hero | Inter 48-56/56-64, Semibold |
| Section heading | Inter 28-32/36, Semibold |
| Card title | Inter 18/22, Semibold |
| Metric value | Inter 15-16/18, Semibold |
| Metric label | Inter 10-11/14, Medium, uppercase, tracking |
| Body | Inter 14/20, Regular |
| Eyebrow | Inter 11/14, Semibold, uppercase, cobalt |
| Price | Inter 18/22, Semibold (subordinate to metrics) |

---

## Surface Hierarchy

```
L0  Canvas (#FFFFFF)
    └─ Page background. Pure white. No off-white, no grey.

L1  Cobalt Field (#EEF4FF, full-width bands)
    └─ Atmospheric section backgrounds. Alternates with L0.

L2  White Ruled Surface (1px border-top #D9DEE8)
    └─ Section transitions. Hairline rules mark divisions.

L3  Overlap Island (white panel + 1px cobalt-family border)
    └─ Floats above L1. Product cards, evidence panels.

L4  Evidence Field (dense structured data)
    └─ Tables, matrices, proof records, lab data.

Media  Product-Owned
    └─ Gradient chamber + bloom + studio render.
    └─ Bottle IS the color. Chamber stays neutral.
```

---

## Card Border Language

- **Default (Grid):** 1px `rgba(0,87,255, 0.08)` — barely visible cobalt hairline
- **Hover:** 1px `rgba(0,87,255, 0.20)` — intensified but not solid
- **Featured/Selected:** 1px solid `#0057FF` — full cobalt perimeter
- **NEVER:** Drop shadow, glow, thick borders, grey borders on cards

This language is proven by CategoryFamilyRail `461:89294` and inherited by all product surfaces.

---

## Authority Nodes (proven evidence)

| Component | Node ID | Proves |
|-----------|---------|--------|
| CategoryFamilyRail | `461:89294` | Border language + NarrativeRail grammar |
| ProductCommerceCardFeatured | `461:93046` | Full slot contract in Featured context |
| OverlapIsland | `461:95165` | Minimal card at Grid/QuickAdd scale |
| EvidenceDistrict | `461:89009` | NarrativeRail + OperationalPanel asymmetric split |
| Lab Records Section | `461:89547` | Best evidence table presentation |
| Body (PDP Hero) | `461:91364` | 7/5 asymmetric commerce split |
| MetallicChamber | `461:91315` | Studio render quality target |
| G0 Universal Glue | `461:91925` | Option C instrumental clarity — media/evidence/transaction distinct jobs |
