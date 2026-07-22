# OLUK R6 — Variable Registry

> **Updated**: 2026-07-22
> **Status**: FIGMA COMPLETE — PENDING RUNTIME CONFIRMATION

---

## G1 Semantic Aliases V02

**Collection ID:** VariableCollectionId:738:2248
**Modes:** Light (738:2), Dark (738:3)
**Total Variables:** 52

### Core Surface & Canvas (4)
| Variable | ID | Light | Dark | Role |
|---|---|---|---|---|
| color/canvas | VariableID:738:2249 | alias→surface/page | alias→surface/page | Page background |
| color/surface/primary | VariableID:738:2250 | alias→surface/panel | alias→surface/panel | Card/panel surface |
| color/surface/media | VariableID:738:2251 | alias→surface/media | alias→surface/media | Media container bg |
| color/surface/evidence-tint | VariableID:738:2252 | alias→surface/substrate | alias→surface/substrate | Evidence section tint |

### Text Hierarchy (3)
| Variable | ID | Light | Dark | Role |
|---|---|---|---|---|
| color/text/primary | VariableID:738:2253 | alias→text/primary | alias→text/primary | Primary body text |
| color/text/secondary | VariableID:738:2254 | alias→text/secondary | alias→text/secondary | Secondary/muted text |
| color/text/technical | VariableID:738:2255 | alias→text/tertiary | alias→text/tertiary | Technical labels |

### Accent & Action (8)
| Variable | ID | Light | Dark | Role |
|---|---|---|---|---|
| color/accent/primary | VariableID:738:2256 | alias→accent/brand | alias→accent/brand | Brand accent |
| color/action/cta | VariableID:738:2257 | alias→action/default | alias→action/default | CTA button fill |
| color/action/on-cta | VariableID:738:2258 | alias→text/on-action | alias→text/on-action | Text on CTA |
| color/action/hover | VariableID:738:2259 | alias→action/hover | alias→action/hover | CTA hover state |
| color/action/pressed | VariableID:738:2260 | alias→action/pressed | alias→action/pressed | CTA pressed state |

### Danger Actions (4)
| Variable | ID | Light | Dark | Role |
|---|---|---|---|---|
| color/action/danger | VariableID:1208:71859 | #dc2626 | #ef4444 | Destructive action fill |
| color/action/danger-hover | VariableID:1208:71860 | #b91c1c | #dc2626 | Danger hover |
| color/action/danger-pressed | VariableID:1208:71861 | #991717 | #b91c1c | Danger pressed |
| color/action/on-danger | VariableID:1208:71862 | #ffffff | #ffffff | Text on danger |

### Border & Rail (5)
| Variable | ID | Role |
|---|---|---|
| color/border/accent | VariableID:738:2261 | Accent-colored borders |
| color/border/neutral | VariableID:738:2262 | Neutral divider borders |
| color/rail/divider | VariableID:738:2263 | Rail section dividers |
| color/rail/title | VariableID:738:2264 | Rail heading text |
| color/rail/definition | VariableID:738:2265 | Rail definition text |

### Evidence & Proof (3)
| Variable | ID | Role |
|---|---|---|
| color/proof/marker | VariableID:738:2266 | Proof/verification markers |
| color/silver | VariableID:738:2267 | Silver metallic accents |
| color/focus/ring | VariableID:738:2268 | Focus ring for a11y |

### Stock State (3)
| Variable | ID | Light | Dark | Role |
|---|---|---|---|---|
| state/low-stock | VariableID:1208:71863 | #f59e0b | #fbb93a | Low stock warning |
| state/out-of-stock | VariableID:1208:71864 | #dc2626 | #ef4444 | Out of stock |
| state/pending | VariableID:1208:71865 | #9ca3af | #757d8a | Pending state |

### Semantic State (5)
| Variable | ID | Light | Dark | Role |
|---|---|---|---|---|
| state/success | — | #10b981 | #34d399 | Success indicator |
| state/warning | — | #f59e0b | #fbb93a | Warning indicator |
| state/error | — | #dc2626 | #ef4444 | Error indicator |
| state/info | — | #0057ff | #4d7fff | Info indicator |
| state/neutral | — | #9ca3af | #757d8a | Neutral indicator |

### Brand Source Comparison (5)
| Variable | ID | Light | Dark | Role |
|---|---|---|---|---|
| color/brand-source/current | — | #3366ff | #3366ff | Current brand swatch |
| color/brand-source/express | — | #256dff | #256dff | Express brand swatch |
| color/brand-source/olympus | — | #002db5 | #002db5 | Olympus brand swatch |
| color/brand-source/brand-blue | — | #0057ff | #0057ff | Brand blue swatch |
| color/brand/blue | — | #0057ff | #4d7fff | Semantic brand blue |

### Status Intent Triples (15)
| Intent | Surface | Text | Marker |
|---|---|---|---|
| status/success/* | independently authored L/D | independently authored L/D | independently authored L/D |
| status/warning/* | independently authored L/D | independently authored L/D | independently authored L/D |
| status/error/* | independently authored L/D | independently authored L/D | independently authored L/D |
| status/info/* | independently authored L/D | independently authored L/D | independently authored L/D |
| status/neutral/* | independently authored L/D | independently authored L/D | independently authored L/D |

### IMPORTANT: state/stock Location

`state/stock` (VariableID:519:898) lives in **OLUK / Semantic / Closeout G1** (VariableCollectionId:518:817), NOT in the G1 Semantic Aliases V02 collection. It is a legacy token, functionally replaced by `state/success` in G1. Runtime should use the semantic `state/success` token for in-stock indicators.

---

## OLUK Layout Tokens

**Collection ID:** VariableCollectionId:1234:72750
**Total Variables:** 25

### Spacing (11)
| Token | Value | Use |
|---|---|---|
| spacing/2xs | 2px | Micro gaps |
| spacing/xs | 4px | Icon-to-label |
| spacing/sm | 8px | Intra-component |
| spacing/md | 12px | Default gap |
| spacing/lg | 16px | Section internal |
| spacing/xl | 24px | Component separation |
| spacing/2xl | 32px | Card gaps |
| spacing/3xl | 48px | Section gaps |
| spacing/4xl | 64px | Major section |
| spacing/section | 80px | Section divider |
| spacing/page | 120px | Page-level |

### Radius (6)
| Token | Value | Use |
|---|---|---|
| radius/none | 0 | Square corners |
| radius/sm | 4px | Subtle rounding |
| radius/md | 8px | Cards, inputs |
| radius/lg | 12px | Panels |
| radius/xl | 16px | Modals |
| radius/pill | 999px | Pills, badges |

### Padding (8)
| Token | Value | Use |
|---|---|---|
| padding/button-sm | 8px | Small button |
| padding/button-md | 10px | Medium button |
| padding/button-lg | 14px | Large button |
| padding/card | 20px | Card internal |
| padding/panel | 24px | Panel internal |
| padding/section | 32px | Section internal |
| padding/page-x | 24px | Page horizontal |
| padding/page-y | 48px | Page vertical |

---

## Total Governed Variables: 77

| Collection | Count |
|---|---|
| G1 Semantic Aliases V02 | 52 color variables |
| OLUK Layout Tokens | 25 spacing/radius/padding |
| **Total** | **77** |

Note: `state/stock` (VariableID:519:898) in Closeout G1 is legacy — not counted in the 77 governed total.