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

## Copy posture

This is a performance-oriented stack builder. Lead with the result the customer wants, then explain the distinct job each product performs in the stack. Do not use compatibility-only language such as `complements`, `makes sense`, `product path`, `direction`, or `continuation`. Do not soften the module into product comparison. It should create desire to build a stronger, more complete stack.

Use all caps only inside visibly bounded chips, pills, metric cells, or compact status atoms. Headlines, body copy, section labels and buttons use sentence case.

## Use this exact production copy

Current-product strip:

- Section label: `Your starting product`
- Product: `MK-2866`
- Three raised qualitative chips:
  - `PRODUCT` / `Ostarine`
  - `STRENGTH` / `15 MG`
  - `FORMAT` / `90 SERVINGS`
- Counter label: `Added to stack`

Module introduction:

- Section label: `Build your stack`
- Heading: `Build more from your MK-2866 stack.`
- Body: `Choose the result you want next: push strength and lean mass with RAD-140, add heavyweight size and power with MENT, or bring growth, appetite, sleep and recovery support into the plan with MK-677.`

RAD-140:

- Context chip 1: `STACK FOCUS` / `STRENGTH + LEAN MASS`
- Context chip 2: `WHY ADD IT` / `MAXIMUM INTENSITY`
- Body: `Add serious strength and lean-mass focus with the strongest SARM in the Olympus range—an 8 MG step up for a more aggressive training phase.`
- Secondary action: `View RAD-140`
- Primary action: `Add RAD-140`

MENT:

- Context chip 1: `STACK FOCUS` / `MASS + POWER`
- Context chip 2: `WHY ADD IT` / `ADVANCED BUILDER`
- Body: `Take the stack into a heavier mass-and-power phase with Trestolone—a high-intensity choice for experienced customers building beyond a SARM-only plan.`
- Secondary action: `View MENT`
- Primary action: `Add MENT`

MK-677:

- Context chip 1: `STACK FOCUS` / `GROWTH + RECOVERY`
- Context chip 2: `WHY ADD IT` / `DAILY SUPPORT`
- Body: `Build recovery capacity around the stack with a 90-serving Ibutamoren format supporting appetite, deeper sleep and recovery between hard sessions.`
- Secondary action: `View MK-677`
- Primary action: `Add MK-677`

Continuation surface at zero products:

- Section label: `Your stack`
- Heading: `Pick your next performance advantage.`
- Body: `Add strength and lean mass, size and power, or growth and recovery support.`
- Disabled action: `Review my stack · 0`

After one or more additions:

- Heading: `Your stronger stack is taking shape.`
- Body: `You have added {count} product(s). Review the full stack or keep building around your goal.`
- Enabled action: `Review my stack · {count}`

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
