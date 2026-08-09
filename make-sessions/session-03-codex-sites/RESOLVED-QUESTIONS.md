# Resolved Open Questions — MF-03 Codex + Make

## Date: 2026-08-09

### Question 1: Trust Rail
**Q:** Trust rail — fixture text ("FREE UK DELIVERY") or dev disclaimer banner?
**A:** Fixture text. Use the real trust rail content:
- Free UK Delivery Over £50
- Free Int'l Delivery £300+
- Third-Party Lab Verified
- JANOSHIK Validated
- Encrypted Checkout

The "EXPERIENCE LAB · STATIC DESIGN FIXTURES" dev disclaimer can remain as a SEPARATE bar above the trust rail if needed for development context, but it must NOT replace the trust rail itself.

### Question 2: OpenLab 6-Cell Grid
**Q:** OpenLab 6-cell grid — replace with evidence components or correct the labels?
**A:** Correct the labels to match the universal 6-point assurance items from the AssuranceRail component.

The 6 items are (from `556:34627` assurance-rail-full-a):
1. **Identity Tested** — "Compound identity confirmed using advanced analytical methods."
2. **Purity Measured** — "Purity measured to ensure batch meets strict quality standards."
3. **Concentration Confirmed** — "Concentration verified to match labeled strength with high precision."
4. **Janoshik Verified** — "Results validated through Janoshik, a trusted third-party verification platform."
5. **Tamper-Proof Sealed** — "Sealed before dispatch to protect integrity until it reaches you."
6. **Batch Tracked** — "Every batch is tracked and connected to its complete evidence record."

Replace the current backend labels (PRODUCT / BATCH / LAB / REPORT / PUBLIC LEDGER / CONTEXT) with these 6 customer-facing assurance items.

Reference components:
- `556:34122` — TrustEvidenceSpine / AssuranceRail (COMPONENT_SET, 1290×642)
- `556:34627` — assurance-rail-full-a (1290×254) — 2×3 grid with icons and descriptions
- `556:34649` — assurance-rail-compact-a (350×164) — compact variant
- `556:34664` — assurance-rail-full-b (1290×254) — full variant B
- `556:34686` — assurance-rail-compact-b (350×164) — compact variant B
- `551:31587` — Container (1248×310) — PDP assurance instance

### Question 3: Reviews
**Q:** Reviews — corrected fixture cards or hidden until real data?
**A:** Corrected fixture cards. Keep the 3-card review layout but:
- Remove "SAMPLE REVIEW A/B/C" → use realistic review titles
- Remove "Sample reviewer" → use plausible reviewer names
- Remove "Date slot" → use plausible dates
- Remove "Purchase status slot" → use "Verified purchase"
- Remove "RENDERED DESIGN FIXTURE · NOT CUSTOMER DATA" banner
- Keep "Example rating: 5/5" → change to just "★★★★★" or similar star display
- Keep EMPTY/LOADING/UNAVAILABLE state cards as development reference ONLY — they should be hidden from the main view or shown in a separate dev section
