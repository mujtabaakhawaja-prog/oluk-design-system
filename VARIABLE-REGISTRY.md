# OLUK R6 — Variable Registry

---

## G1 Semantic Aliases V02

**Collection ID:** VariableCollectionId:738:2248  
**Modes:** Light (738:2), Dark (738:3)  
**Total Variables:** 42

### Core Surface & Canvas
| Variable | ID | Light Value | Role |
|---|---|---|---|
| color/canvas | VariableID:738:2249 | ~F5F8FC | Page background |
| color/surface/primary | VariableID:738:2250 | ~FFFFFF | Card/panel surface |
| color/surface/media | VariableID:738:2251 | — | Media container bg |
| color/surface/evidence-tint | VariableID:738:2252 | ~E0EAF8 | Evidence section tint |

### Text
| Variable | ID | Role |
|---|---|---|
| color/text/primary | VariableID:738:2253 | Primary body text |
| color/text/secondary | VariableID:738:2254 | Secondary/muted text |
| color/text/technical | VariableID:738:2255 | Technical/label text |

### Accent & Action
| Variable | ID | Role |
|---|---|---|
| color/accent/primary | VariableID:738:2256 | Brand accent |
| color/action/cta | VariableID:738:2257 | CTA button fill |
| color/action/on-cta | VariableID:738:2258 | Text on CTA |
| color/action/hover | VariableID:738:2259 | CTA hover state |
| color/action/pressed | VariableID:738:2260 | CTA pressed state |
| color/action/danger | VariableID:1208:71859 | Danger button fill |
| color/action/danger-hover | VariableID:1208:71860 | Danger hover |
| color/action/danger-pressed | VariableID:1208:71861 | Danger pressed |
| color/action/on-danger | VariableID:1208:71862 | Text on danger |

### Border
| Variable | ID | Role |
|---|---|---|
| color/border/accent | VariableID:738:2261 | Accent border |
| color/border/neutral | VariableID:738:2262 | Neutral/subtle border |

### Rail System
| Variable | ID | Role |
|---|---|---|
| color/rail/divider | VariableID:738:2263 | Rail divider line |
| color/rail/title | VariableID:738:2264 | Rail section title |
| color/rail/definition | VariableID:738:2265 | Rail definition text |

### Evidence & Proof
| Variable | ID | Role |
|---|---|---|
| color/proof/marker | VariableID:738:2266 | Proof marker accent |
| color/silver | VariableID:738:2267 | Silver/metallic accent |
| color/focus/ring | VariableID:738:2268 | Focus ring outline |

### State
| Variable | ID | Role |
|---|---|---|
| state/stock | VariableID:519:898 | In-stock indicator |
| state/low-stock | VariableID:1208:71863 | Low stock warning |
| state/out-of-stock | VariableID:1208:71864 | Out of stock |
| state/pending | VariableID:1208:71865 | Pending state |

### Semantic Status Intents (15 variables)
| Variable Pattern | Surface | Text | Marker |
|---|---|---|---|
| status/success/* | VariableID for surface | VariableID for text | VariableID for marker |
| status/warning/* | VariableID for surface | VariableID for text | VariableID for marker |
| status/error/* | VariableID for surface | VariableID for text | VariableID for marker |
| status/info/* | VariableID for surface | VariableID for text | VariableID for marker |
| status/neutral/* | VariableID for surface | VariableID for text | VariableID for marker |

---

## OLUK Layout Tokens

**Collection ID:** VariableCollectionId:1234:72750  
**Total Variables:** 25

### Spacing
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

### Radius
| Token | Value | Use |
|---|---|---|
| radius/none | 0 | Square corners |
| radius/sm | 4px | Subtle rounding |
| radius/md | 8px | Cards, inputs |
| radius/lg | 12px | Panels |
| radius/xl | 16px | Modals |
| radius/pill | 999px | Pills, badges |

### Padding
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
