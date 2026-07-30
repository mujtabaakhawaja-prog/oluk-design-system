# Session 01 — Product Card Creative Frontier

## Setup

### Attach to Make
- One frame only: `414:69946` (ProductCardV2 — best eyebrow pattern) from file `yNAyIQhewnbofeZWMGkKVa`
- Add the `guidelines.md` from this folder as your Make project guidelines

### Do NOT attach
- Full source boards
- Multiple reference frames
- ZIP bundles or markdown documentation
- Previous Make run outputs

---

## Prompt (paste into Make)

```
You are a senior visual systems designer exploring the frontier of product card architecture for a pharmaceutical-grade supplement brand.

Do not build a page. Do not build a homepage. Do not build a layout system.

Build ONLY product cards.

---

THE PROBLEM

The current product card feels like a generic e-commerce tile. It needs to feel like a pharmaceutical specimen label — communicating scientific authority through precision, information density, and ruled hierarchy.

Specifically:
• The metric cells (Strength, Servings, Purity) currently float as loose chips. They should become a continuous RULED RAIL — fixed-width cells divided by hairlines, like a specimen label or pharmaceutical packaging.
• Price currently dominates. It should be UNDERSTATED — present but subordinate to the metrics. The metrics ARE the trust signal.
• The media chamber needs to prove actual product scale — not a tiny icon, not a full-bleed image. A governed studio render at proper proportion.
• The identity stack (product name, alias, series) needs eyebrow authority — it should anchor the top of every card like a specimen index.

---

DESIGN 5 MATERIALLY DIFFERENT PRODUCT CARD ARCHITECTURES

Each architecture must respect the slot order:
1. Identity (eyebrow)
2. Media chamber
3. Metric rail
4. Price
5. CTA

But each should feel radically different in:
• How the media chamber relates to the card boundary
• How the metric rail is structured (ruled cells, but what geometry?)
• How identity creates authority (weight, position, rule, index number)
• How the card communicates "this is pharmaceutical, not fashion"
• How density and whitespace are balanced
• How the cobalt accent functions (CTA only? Selection ring? Metric rule?)

---

CONTEXT VARIANTS

For your strongest 2 architectures, also show:
• GRID context (≈225w, compact, no specification rail)
• FEATURED context (≈412w, full metrics + specification rail, staged media)
• QUICKADD context (≈176w, condensed chamber, minimal)

---

CREATIVE EXPECTATIONS

Think of these as:
A — Swiss pharmaceutical packaging (Roche annual report meets specimen label)
B — Apple product page confidence (one product, total authority, breathing space)
C — Bloomberg terminal precision (data-first, ruled, monospace metrics, maximum density)
D — Aesop retail (restraint, typographic hierarchy, negative space as luxury)
E — Your wildcard — surprise me with something none of these reference

Each must feel authored by a different design intelligence.
If they all look like the same card with different spacing, consider it a failure.

---

CONSTRAINTS

• Light mode only
• Zero box-shadow
• Hairline borders only (1px, 8-12% opacity)
• Cobalt #0057FF only for CTA fill and one other controlled moment per card
• White canvas
• Real product data (MK-2866, 15 MG, 90 SERVINGS, >99%, £43.00)
• Do not invent claims or unsupported language
• Do not build anything other than cards

---

RETURN

Card-A through Card-E as 5 distinct specimen boards.
Then: 2 winners expanded into Grid / Featured / QuickAdd contexts.
Then: One-line description of each architecture's philosophy.

Stop. Do not build pages. Do not recommend next steps. Do not score yourself.
```

---

## Acceptance criteria

Reject the output if:
- All 5 cards look structurally similar (cosmetic variation only)
- Price is the dominant visual element on any card
- Metrics appear as floating chips/tags instead of ruled cells
- Any card uses box-shadow
- Cards feel like fashion/lifestyle rather than pharmaceutical
- Make starts building pages, routes, or full sections
- Dark mode appears anywhere
- Product data is invented or stale

## After this session

Once a card winner is selected:
- **Session 02:** PurchasePanel + AssuranceRail + DossierRail (same approach)
- **Session 03:** Hero composition + section rhythm (using resolved card)
- **Session 04:** Full page composition (with all resolved primitives)

Each session builds on resolved artifacts from the previous one.
