# OLUK R6 — Variable Registry

> **Updated**: 2026-07-22 (post-Codex reconciliation)
> **Status**: FIGMA COMPLETE — PENDING RUNTIME CONFIRMATION

---

## G1 Semantic Aliases V02

**Collection ID:** VariableCollectionId:738:2248
**Modes:** Light (738:2), Dark (738:3)
**Total Variables:** 52

### Variable Classification

| Classification | Count | Description |
|---|---|---|
| Direct runtime token | 42 | Must be emitted as CSS custom properties |
| Status intent (indirect) | 5 families (15 vars) | Consumed via StatusChip component bindings |
| Operative brand token | 1 | color/brand/blue — adoption token |
| Documentation-only | 4 | brand-source comparison swatches |

### Dark Mode Source Law

| Category | Count | Behavior |
|---|---|---|
| Alias-backed core values | 20 | Dark mode resolves through variable alias chain |
| Independently authored raw values | 32 | Danger, stock, semantic, brand, status intents have per-mode hex |

The old constraint "all Dark values must be aliases" is **explicitly superseded**. The 32 raw values are intentional final authority — they represent semantic endpoints with no lower-level primitive to alias to. Runtime must emit both categories; it must not guess or derive the raw values.

### Core Surface & Canvas (4) — Direct Runtime
| Variable | ID | Role |
|---|---|---|
| color/canvas | VariableID:738:2249 | Page background |
| color/surface/primary | VariableID:738:2250 | Card/panel surface |
| color/surface/media | VariableID:738:2251 | Media container bg |
| color/surface/evidence-tint | VariableID:738:2252 | Evidence section tint |

### Text Hierarchy (3) — Direct Runtime
| Variable | ID | Role |
|---|---|---|
| color/text/primary | VariableID:738:2253 | Primary body text |
| color/text/secondary | VariableID:738:2254 | Secondary/muted text |
| color/text/technical | VariableID:738:2255 | Technical labels |

### Accent & Action (5) — Direct Runtime
| Variable | ID | Role |
|---|---|---|
| color/accent/primary | VariableID:738:2256 | Brand accent |
| color/action/cta | VariableID:738:2257 | CTA button fill |
| color/action/on-cta | VariableID:738:2258 | Text on CTA |
| color/action/hover | VariableID:738:2259 | CTA hover state |
| color/action/pressed | VariableID:738:2260 | CTA pressed state |

### Danger Actions (4) — Direct Runtime, Raw L/D Values
| Variable | ID | Light | Dark |
|---|---|---|---|
| color/action/danger | VariableID:1208:71859 | #dc2626 | #ef4444 |
| color/action/danger-hover | VariableID:1208:71860 | #b91c1c | #dc2626 |
| color/action/danger-pressed | VariableID:1208:71861 | #991717 | #b91c1c |
| color/action/on-danger | VariableID:1208:71862 | #ffffff | #ffffff |

### Border & Rail (5) — Direct Runtime
| Variable | ID | Role |
|---|---|---|
| color/border/accent | VariableID:738:2261 | Accent-colored borders |
| color/border/neutral | VariableID:738:2262 | Neutral divider borders |
| color/rail/divider | VariableID:738:2263 | Rail section dividers |
| color/rail/title | VariableID:738:2264 | Rail heading text |
| color/rail/definition | VariableID:738:2265 | Rail definition text |

### Evidence & Proof (3) — Direct Runtime
| Variable | ID | Role |
|---|---|---|
| color/proof/marker | VariableID:738:2266 | Proof/verification markers |
| color/silver | VariableID:738:2267 | Silver metallic accents |
| color/focus/ring | VariableID:738:2268 | Focus ring for a11y |

### Stock State (3) — Direct Runtime, Raw L/D Values
| Variable | ID | Light | Dark |
|---|---|---|---|
| state/low-stock | VariableID:1208:71863 | #f59e0b | #fbb93a |
| state/out-of-stock | VariableID:1208:71864 | #dc2626 | #ef4444 |
| state/pending | VariableID:1208:71865 | #9ca3af | #757d8a |

### Semantic State (5) — Direct Runtime, Raw L/D Values
| Variable | ID | Light | Dark |
|---|---|---|---|
| state/success | — | #10b981 | #34d399 |
| state/warning | — | #f59e0b | #fbb93a |
| state/error | — | #dc2626 | #ef4444 |
| state/info | — | #0057ff | #4d7fff |
| state/neutral | — | #9ca3af | #757d8a |

### Brand Source (5) — 4 Documentation-Only + 1 Operative
| Variable | Classification | Light | Dark |
|---|---|---|---|
| color/brand-source/current | Documentation-only | #3366ff | #3366ff |
| color/brand-source/express | Documentation-only | #256dff | #256dff |
| color/brand-source/olympus | Documentation-only | #002db5 | #002db5 |
| color/brand-source/brand-blue | Documentation-only | #0057ff | #0057ff |
| color/brand/blue | **Operative** | #0057ff | #4d7fff |

### Status Intent Triples (15) — Indirect Semantic, Raw L/D Values
5 intents × 3 channels (surface/text/marker) = 15 variables
Consumed through StatusChip component bindings, not standalone CSS.

### state/stock Location
`state/stock` (VariableID:519:898) lives in **Closeout G1** (VariableCollectionId:518:817). Legacy token, replaced by `state/success`.

---

## OLUK Layout Tokens (25)

**Collection ID:** VariableCollectionId:1234:72750

11 spacing + 6 radius + 8 padding = 25

(See previous version for full individual token listing — unchanged)

---

## Total Governed Variables: 77 (52 color + 25 layout)
