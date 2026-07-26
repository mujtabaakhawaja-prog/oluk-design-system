# R6 Prohibited Patterns

## Visual Language
- No A01/Majestic visual identity in new work
- No gradients except media chamber overlays
- No drop shadows except elevation system
- No custom border radius — use layout token radius only

## Data Integrity
- All product data must come from governed fixtures
- No hardcoded prices, percentages, or metric values
- No invented SKUs or product names
- Purity values must trace to lab fixture data

## Governed Product Data
| Compound | Alias | Status |
|----------|-------|--------|
| MK-2866 | Ostarine | Primary fixture |
| RAD-140 | Testolone | Stress fixture |
| MK-677 | Ibutamoren | Secondary |
| MENT | Trestolone | Secondary |

## System Boundaries
- Make experiments are design-only — no runtime code generation
- Do not invent token names outside the published variable collections
- Do not create new component variants — use published variants only
- Do not reconcile the machine token graph inside Make

## Canonical Terminology
| Use | Never |
|-----|-------|
| Compound | Drug / Chemical |
| Purity | Quality / Grade |
| Lab report | Certificate / COA |
| Evidence | Proof / Verification |
| Media chamber | Image container / Card image |
| Surface | Background / Card background |
| Trust rail | Trust bar / Badge row |

## Evidence Registry Truth Sources
| Truth | Owner |
|-------|-------|
| Product Truth | Governed fixtures |
| Asset Truth | Media chamber pipeline |
| Fixture Truth | r6-make-kit/fixtures/ |
| Lab Truth | TrustEvidenceSpine data |
| Runtime Truth | Runtime Studio surfaces |
| Review Truth | ReviewOS annotations |
