# OLYMPUS R6 CREATIVE FRONTIER — M0 LIGHT/DARK MATERIAL DIRECTION

## Make Project

**Name:** Olympus R6 Creative Frontier — M0 Light/Dark Material Direction

**Attached native frames/components:**

| Node ID | Name | Purpose |
|---------|------|---------|
| 1420:843 | Light hero (Range Horizon) | Current light surface reference |
| 1420:813 | Dark hero (Range Horizon) | Current dark surface reference |
| 780:812 | R6-PDP Light / Master | Full PDP light mode — surface audit target |
| 780:950 | R6-PDP Dark / Master | Full PDP dark mode — atmosphere reference |
| 1580:77642 | Featured Controller candidates | Component reference |
| 1193:4504 | ProductCommerceCard | Card component reference |
| 682:3187 | TrustEvidenceSpine | Evidence surface reference |
| 1169:4859 | Header Stack source | Navigation reference |
| 881:29377 | Foundations review | Fill + typography review |

**Also attach:**

- Runtime candidate screenshot at `550c31d8c...`
- ReviewOS session `review-b2f19b7d-ab61-4748-b703-105387b533f9`
- MK-2866 fixture (primary)
- RAD-140 stress fixture

---

## Packet M-COMMON (paste first)

```
OLYMPUS R6 CREATIVE FRONTIER — COMMON CONTRACT V2

MODE
Visual exploration only.

AUTHORITIES
- attached native Olympus R6 frames and component instances
- currently published Olympus R6 library
- semantic Light/Dark variables
- frozen layout scale: 2·4·8·12·16·24·32·48·64·80·120
- published typography and effect styles
- supplied governed fixtures
- exact Runtime Studio screenshot and SHA as implementation context only
- supplied ReviewOS findings as the problems to solve

DO NOT
- generate production code
- edit Runtime Studio, ReviewOS, GitHub, or production
- invent new product names, SKUs, or pricing
- change Olympus blue #256DFF action color
- alter the frozen spacing scale
- use placeholder copy — use MK-2866 Ostarine £48 primary fixture
  and RAD-140 stress fixture throughout
- hallucinate component names or token paths

FIXTURE CONTRACT
Primary: MK-2866 · Ostarine · £48 · 15mg · 90 caps · Capsules £3
Stress:  RAD-140 · Testolone · £— · 20mg · 30 caps

RESULT FORMAT
For each candidate, return:
- labelled frame with direction name
- annotated surface hierarchy showing token path
- side-by-side dark mode (unchanged) for cohesion check
```

---

## Packet M0 — Light/Dark Material Direction (paste after M-COMMON)

```
R6 LIGHT/DARK MATERIAL DIRECTION — SURFACE EXPLORATION

PROBLEM STATEMENT
The current dark mode is strong. The current light mode is weak.
This run explores three light-mode directions that restore depth,
atmosphere, and surface hierarchy without breaking the dark mode
visual language.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DARK MODE — "COBALT BLACKGLASS" (REFERENCE — DO NOT CHANGE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The dark mode is where the brand comes alive. The visual language
is an "LED through a diffuser" quality built from a specific stack:

SURFACE HIERARCHY (bottom to top):
- Deep void #050607 — true background, near-absolute black, cold,
  almost OLED-black. Not warm dark gray.
- Elevated slate #0B0D10 → #101318 — cards, sidebars, content
  panels step up in barely-perceptible cool-blue-gray increments.
  Sidebar purchase panel at #0B0D10 with heavy drop shadow
  (52px blur, 34% black) creating floating-glass separation.
- Border glow — 1px #343A43 stroke + white inner shadow at 12%
  opacity (0-radius, 1px y-offset). This is the signature effect:
  thin frost-edge highlight along the top of elevated surfaces,
  like light catching the edge of a glass panel.
- Radial blue bloom — GRADIENT_RADIAL with #256DFF at 5% white
  center fading to transparent, creating subtle blue atmospheric
  glow emanating from behind the product. Card figure containers
  use stronger version (22% blue radial) against #101318.

The product bottle itself is the light source. The cobalt blue
glass creates a natural reason for blue light to bleed into
surrounding surfaces. The radial gradients simulate ambient
light cast by the product — not decorative.

Layer blur (68px, 72% opacity) on hero overlay containers creates
the diffused-backlight quality. Combined with depth-ordered drop
shadows (front products: 56px/34%, back products: 40px/20% at
50% opacity), it produces genuine atmospheric depth.

DARK MODE TOKEN MAP:
  surface/page:      #050607
  surface/panel:     #0B0D10
  surface/raised:    #101318
  surface/substrate: #101318
  surface/media:     #101318
  border/panel:      #343A43
  action/fill:       #256DFF

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIGHT MODE — "CLINICAL FLAT" (CURRENT — THE PROBLEM)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Background: #F7F8FA — single flat cool-white. No gradient,
  no atmosphere, no depth variation.
- Elevated surfaces: #FFFFFF with 1px #D9DEE8 border. Sidebar
  gets white inner shadow at 54% — but on white against near-white,
  it is invisible.
- Card containers: #EEF4FF (barely-there blue tint) with radial
  blue at 12% — same concept as dark mode but the effect
  dissipates against light background. Reads as "slightly
  blue-gray" rather than "ambient glow."
- Hero section: Same radial gradient structure as dark but
  white-at-38% radial on top of #EEF4FF flattens everything.
  No atmosphere, no depth hierarchy.
- Product cards: #F2F5FA figure containers with 12% blue radial —
  functionally identical to background. Cards do not lift.

The dark mode has 4–5 discernible depth layers.
Light mode has maybe 1.5.

The entire frosted-glass / diffused-LED vocabulary that makes
dark mode striking is absent in light because the same techniques
do not survive on a bright canvas.

CURRENT LIGHT TOKEN MAP (the narrow band problem):
  surface/page:      #F7F8FA
  surface/panel:     #FFFFFF
  surface/raised:    #F4F7FC
  surface/substrate: #F8FAFC
  surface/media:     #F4F7FC

Total span: ~12 points. Perceptually flat.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIRECTION A — "FROSTED DAYLIGHT GLASS"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Keep clinical cleanliness, add glass-panel depth system.
Think Apple visionOS panels, frosted acrylic.

SURFACE SYSTEM:
- Background shifts to subtle cool gradient (white → #F0F3FA
  vertical drift) instead of flat.
- Cards become frosted glass panels — white at 85–90% opacity
  with BACKGROUND_BLUR (16–24px), hairline #D9DEE8 stroke,
  and soft drop shadow (16px, 6% black). They sit ON the
  gradient rather than IN it.
- PDP hero container gets light radial blue wash at product
  position — #256DFF at 4–6% — visible enough to create cool
  "spill" without competing with readability.
- Elevated surfaces (purchase sidebar) float with subtle lift:
  2px white inner highlight on top edge + 12px shadow at 5%.

PROPOSED LIGHT TOKEN MAP:
  surface/page:      #FFFFFF → #F0F3FA (gradient)
  surface/panel:     #FFFFFF at 88% opacity + blur
  surface/raised:    #EEF1F5
  surface/substrate: #F0F2F5
  surface/media:     #EEF4FF (blue-tinted media field)

CARD TREATMENT:
- 12px radius (frozen)
- White at 88% opacity
- Background blur 20px
- 1px #D9DEE8 stroke
- Drop shadow: 0 2px 16px rgba(30,41,59,0.06)
- Product figure: #EEF4FF with 6% blue radial bloom

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIRECTION B — "LIQUID CHROME"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lean into laboratory / precision-science identity.
Cool metallics and reflective surface cues.

SURFACE SYSTEM:
- Background: linear gradient from #F8FAFC top to #EDF1F7
  bottom — soft horizon effect.
- Cards get double-stroke treatment: outer 1px #D9DEE8 +
  inner 1px #FFFFFF (inner stroke at 80%). Polished-bezel,
  instrument-panel feeling.
- Product figure containers: top-to-bottom linear gradient
  from #FFFFFF to #EEF4FF — reflective surface beneath product.
- Section transitions: gradient dividers #F7F8FA → #FFFFFF →
  #F7F8FA so sections breathe rather than stack.
- Blue accent intensifies on hover/active surfaces:
  #EEF4FF → #E0EAFF — interactive feedback through surface.

PROPOSED LIGHT TOKEN MAP:
  surface/page:      #F8FAFC → #EDF1F7 (gradient)
  surface/panel:     #FFFFFF (double-stroke containment)
  surface/raised:    #F0F3FA
  surface/substrate: #EDF1F7
  surface/media:     #FFFFFF → #EEF4FF (gradient)

CARD TREATMENT:
- 12px radius (frozen)
- #FFFFFF fill
- Outer stroke: 1px #D9DEE8
- Inner stroke: 1px #FFFFFF at 80%
- Product figure: linear gradient #FFFFFF → #EEF4FF
- Subtle shadow: 0 1px 8px rgba(100,116,139,0.08)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIRECTION C — "DIFFUSED CATHODE"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Port the dark mode's actual atmospheric system into light space.
This is the LED-through-diffuser approach on a light canvas.
Closest to dark mode's DNA.

SURFACE SYSTEM:
- Background becomes layered radial canvas — base #F7F8FA +
  large radial gradient centered behind hero with #256DFF at
  3–4% fading over 60% of viewport. The PAGE ITSELF has atmosphere.
- Product cards sit in containers with blue-shifted ambient fill —
  #F0F4FF with stronger local radial bloom from product image
  position (#256DFF at 8–10%).
- Elevated surfaces use same inner-shadow highlight system as
  dark mode but inverted: 1px bottom-edge shadow in #D9DEE8
  at 30% + 1px top-edge highlight in #FFFFFF. Glass-edge catch.
- Layer blur (background blur) on card surfaces at 8–12px —
  requires semi-transparent card fills (#FFFFFF at 92%) so
  underlying page gradient shows through as soft atmospheric tint.
- Section backgrounds alternate between blue-washed radial and
  clean white, creating the diffused-panel rhythm that dark mode
  achieves with its #050607 → #101318 steps.

PROPOSED LIGHT TOKEN MAP:
  surface/page:      #F7F8FA + radial #256DFF at 3%
  surface/panel:     #FFFFFF at 92% + background blur 10px
  surface/raised:    #F0F4FF (blue-shifted)
  surface/substrate: #F7F8FA (clean alternation)
  surface/media:     #F0F4FF + radial #256DFF at 8%

CARD TREATMENT:
- 12px radius (frozen)
- #FFFFFF at 92% opacity
- Background blur 10px
- 1px bottom shadow: #D9DEE8 at 30%
- 1px top highlight: #FFFFFF
- Product figure: #F0F4FF with 8% blue radial bloom
- Drop shadow: 0 2px 12px rgba(37,109,255,0.04)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GENERATE FOR EACH DIRECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Full PDP page (MK-2866 primary fixture) — light mode only,
   showing all 9 sections with the direction's surface treatment:
   - 00 Shared Shell (header/nav)
   - 01 Product detail intro
   - 02 Full field media + purchase panel
   - 03 OpenLab snapshot
   - 04 Product context + assurance
   - 05 Related products (Treatment C cards)
   - 06 Reviews
   - 07 Sticky purchase state
   - 08 Footer

2. Product card grid (5 cards, homepage context) — light mode
   showing card elevation, shadow, border, and ambient fill.

3. Close-up ProductCommerceCard at 2x scale showing
   shadow/border/blur detail.

ALSO SHOW
For each direction, place the existing dark mode PDP alongside
(not modified) so the pair reads as a cohesive system.

DO NOT
- Alter dark mode values — dark mode is FROZEN
- Change action/CTA blue (#256DFF)
- Change spacing scale or typography
- Generate code
- Invent new product fixtures
- Use placeholder copy
```

---

## Execution Gate

This packet requires:

1. **M-COMMON** pasted first
2. **M0** pasted second
3. All authority frames attached to the Make project
4. MK-2866 and RAD-140 fixtures supplied

**Expected output:** 3 × (PDP light + card grid + card close-up + dark reference) = 12 frames

**Next step after Make generates:**
- Copy candidates to Make Laboratory (`scM4viMDHV6Jv6Fxccm71g`)
- Figma Agent uses Packet A-REVIEW
- Human issues `HUMAN_DIRECTION_RECEIPT`

This direction authorizes later Make exploration only. It does not authorize Codex implementation.
