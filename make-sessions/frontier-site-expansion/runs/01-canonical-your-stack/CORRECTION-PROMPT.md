# Paste into the existing Make session to correct pass 01

Correct the existing Your Stack pass at Final-Design `1200:34256`. Keep the overall cool luminous material direction and the three supplied product renders, but rebuild the surface as a production customer upsell module rather than an MF review or internal programme page.

## Remove all internal/editor UI

Remove the entire top bar containing `MF-01A`, `Card frontier`, `Icon library`, `Decision surfaces`, `Your stack`, and `OLYMPUS LABS UK`. None of those labels belongs in the customer experience. Do not replace it with another review, route, component, or programme header.

Do not display any of these phrases anywhere:

- `research route`
- `testing language`
- `direct route to product detail`
- `Keep the product decision clear`
- `Ready to continue?`
- `In stock`
- `Verified Evidence`
- `Source Reported`
- `Source Only`

Availability and evidence remain valid elsewhere in the system, but they are not the persuasive content job of this stack module.

## Use this exact production copy

Current-product strip:

- Eyebrow: `YOUR STARTING PRODUCT`
- Product: `MK-2866`
- Three raised qualitative chips:
  - `PRODUCT` / `Ostarine`
  - `STRENGTH` / `15 MG`
  - `FORMAT` / `90 SERVINGS`
- Counter label: `ADDED TO STACK`

Module introduction:

- Eyebrow: `COMPLETE YOUR STACK`
- Heading: `Choose what complements MK-2866.`
- Body: `Compare three distinct additions by series, strength and serving count. Select the product that best matches the stack you want to build, or open the full product page before adding it.`

RAD-140:

- Context chip 1: `STACK ROLE` / `Strength-led`
- Context chip 2: `BEST FOR` / `SARM pairing`
- Body: `Add a higher-strength SARM option to build a more performance-led stack around MK-2866.`
- Secondary action: `View RAD-140`
- Primary action: `Add RAD-140`

MENT:

- Context chip 1: `STACK ROLE` / `High intensity`
- Context chip 2: `BEST FOR` / `Prohormone pairing`
- Body: `Choose a concentrated prohormone addition when you want a shorter, higher-intensity stack format.`
- Secondary action: `View MENT`
- Primary action: `Add MENT`

MK-677:

- Context chip 1: `STACK ROLE` / `Longer format`
- Context chip 2: `BEST FOR` / `Research pairing`
- Body: `Add a 90-serving research-series option for a longer-format stack alongside MK-2866.`
- Secondary action: `View MK-677`
- Primary action: `Add MK-677`

Continuation surface at zero products:

- Eyebrow: `YOUR STACK`
- Heading: `Start with one complementary product.`
- Body: `Add a product above to build your stack around MK-2866.`
- Disabled action: `Review stack · 0`

After one or more additions:

- Heading: `Review your selected products.`
- Body: `Check your selection before continuing, or add another product above.`
- Enabled action: `Review stack · {count}`

Added actions must change to `Added ✓`.

## Component corrections

1. Rebuild `Ostarine · 15 MG · 90 SERVINGS` in `1200:34285` as three separate instances of the two-level QualitativeChip relationship from `733:17342`. Use the raised card-context treatment: white plane, `border/chip`, 10px radius, semantic cobalt mark, muted uppercase label, navy value, and restrained cool shadow. Do not leave it as inline text with separator dots.
2. Replace each availability/evidence pill row with the two stack-context QualitativeChips specified above. These chips explain why the recommendation belongs in this module.
3. ProductMetricRail must follow canonical `733:95`: value and label are separate fields. Display `8 MG / STRENGTH`, `60 / SERVINGS`, `>99% / PURITY`; never render `60 SERVINGS` as the value above a second `SERVINGS` label. Apply the same rule to `30` and `90`.
4. Give every metric cell `min-width: 0` and a responsive text-fit class based on value length. Short values stay at the canonical 19px. Medium/long values step down only enough to remain inside the cell; labels remain 12px. Never solve fitting by shrinking the entire rail or allowing adjacent values to overlap.
5. Preserve the canonical Vertical card anatomy, ProductMediaChamber, complete MetricRail, selected state, price and actions. Do not recreate local card shells.

## Mobile correction

At 390, remove all internal navigation, preserve the three current-product chips, and show one recommendation at a time through the Compact card relationship. Keep the relevant stack chips, metrics, price and primary action visible. Do not vertically stack all three desktop cards.

Return corrected 1440 and 390 customer frames plus a short note identifying the exact component instances used. Do not publish or promote components.
