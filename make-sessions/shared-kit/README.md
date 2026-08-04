# Shared Figma Make Kit

**Status:** Curated reference library
**Imported:** 2026-08-04
**Source:** Owner-supplied PNG exports from `MF/v3`
**Asset count:** 52 PNGs

This directory is the neutral shared workspace for visual exports that may support later Figma Make runs. It is organized by customer-facing job rather than by historical execution round.

## Directory map

| Directory | Contents | Count |
| --- | --- | ---: |
| `brand/logos/` | Brand row and horizontal logo treatments at 1x and 2x | 8 |
| `homepage/hero/` | Current and light homepage hero compositions at 1x and 2x | 4 |
| `homepage/narrative/` | Two narrative directions across full, desktop, tablet and mobile at 1x and 2x | 16 |
| `evidence/assurance-rails/` | Compact and full assurance rails, A/B and 1x/2x | 8 |
| `evidence/trust-compositions/` | Triptych and folded-label trust directions across master, desktop, tablet and mobile at 1x and 2x | 16 |

## Usage rules

- These files are review references and Make inputs, not runtime assets or production authority.
- They do not alter the sealed MF-01 rule: attach exactly the three files listed in `../session-01-product-card/MANIFEST.md` and nothing from this shared kit.
- Select only the smallest relevant subset for a later run. Do not attach an entire responsive family or both 1x and 2x versions unless the run explicitly requires them.
- Prefer `@2x` exports for detailed review and the 1x export for lightweight orientation.
- A/B files are preserved as supplied even where pixels are identical or nearly identical; filenames record the owner-provided design lineage.
- Exact product and evidence claims visible inside flattened imagery remain reference content. They are not promoted into data authority by being stored here.
- Active workspace language uses `MF-*` run IDs and semantic folder names. Legacy round labels are not used for new material.

## Suggested later-run routing

- `MF-03 Homepage composition`: `homepage/hero/`, then one selected family from `homepage/narrative/`.
- `MF-05 Dossier and evidence transition`: selected `evidence/assurance-rails/` references.
- `MF-06 OpenLab and LabReports`: one selected responsive family from `evidence/trust-compositions/`.
- Brand refinement after a direction is selected: `brand/logos/`, subject to master-lockup registration.

## Integrity check

The import was verified as 52 readable PNG files, and every repository copy was byte-compared with its source export. Git history provides versioned recovery for this curated set.
