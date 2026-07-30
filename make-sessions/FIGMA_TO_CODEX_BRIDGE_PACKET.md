# FIGMA_TO_CODEX_PACKET — OLUK R6 Design System Identity Handoff

## CONTEXT
- Active repo: `mujtabaakhawaja-prog/oluk-design-system`
- Lane: Design system specification → Make session execution → Runtime implementation
- Runtime boundary: Design tokens + visual spec only. No runtime code changes in this packet.
- Figma file: `yNAyIQhewnbofeZWMGkKVa`
- Source page: `461:89008`

---

## CONFIRMED
- CategoryFamilyRail (`461:89294`) is production-ready — resolves the category-card defect completely
- ProductCommerceCardFeatured (`461:93046`) proves correct slot contract with all 6 slots
- Cobalt hairline border language is the universal card grammar (1px, 8% opacity default → full #0057FF featured)
- Media chambers use white-to-ice-blue radial gradient, bottle carries brand color
- Zero box-shadow throughout — elevation is hairline border only
- Surface hierarchy: L0 Canvas → L1 Cobalt Field → L2 Ruled → L3 Overlap Island → L4 Evidence
- Asymmetric split (4fr/8fr) is the principal section grammar
- Option C instrumental clarity confirmed: media, evidence, transaction, and decision surfaces keep distinct jobs
- Price is subordinate (18/22 max) — metrics carry authority
- SERVINGS ≠ CAPSULES — distinct semantics, never interchangeable

---

## AUTHORITY NODES

| Component | Node ID | Purpose |
|-----------|---------|----------|
| CategoryFamilyRail | `461:89294` | Border language + NarrativeRail grammar. CHAMPION. |
| ProductCommerceCardFeatured | `461:93046` | Full Featured context card with 6 slots |
| OverlapIsland | `461:95165` | Minimal card proving contract at Grid/QuickAdd scale |
| EvidenceDistrict | `461:89009` | Asymmetric split with chart + evidence table |
| EvidenceDistrictV2 | `461:89724` | Six-point proof with batch records matrix |
| Lab Records Section | `461:89547` | Best NarrativeRail + OperationalPanel execution |
| Body (PDP Hero) | `461:91364` | 7/5 asymmetric commerce split — best PDP reference |
| MetallicChamber | `461:91315` | Studio render quality target for MediaChamber fills |
| G0 Universal Glue | `461:91925` | Full light surface directions — instrumental clarity proof |
| LIGHT-L1-PORCELAIN-PRECISION-R01 | `461:92731` | Design language spec (reference only, not source) |

---

## DESIGN SYSTEM TOKENS (implementation-ready)

### Colors
```
brand/cobalt:          #0057FF
surface/canvas:        #FFFFFF
surface/panel:         #FFFFFF
surface/atmospheric:   #EEF4FF
surface/media:         radial-gradient(#FFF 0%, #F3F8FF 46%, #DDEEFF 100%)
border/subtle:         rgba(0,87,255,0.08)
border/default:        #D9DEE8
border/active:         #0057FF
text/primary:          #111827
text/secondary:        #667085
text/cobalt:           #0057FF
status/pass:           #10B981
```

### Typography Scale
```
display:      Inter 48-56/56-64 Semibold
section:      Inter 28-32/36 Semibold
card-title:   Inter 18/22 Semibold
metric-value: Inter 15-16/18 Semibold
metric-label: Inter 10-11/14 Medium uppercase tracking
body:         Inter 14/20 Regular
eyebrow:      Inter 11/14 Semibold uppercase cobalt
price:        Inter 18/22 Semibold (SUBORDINATE)
```

### Spacing
```
content-max:    1171px
section-gap:    80-96px
card-gap:       24px
rail-split:     4fr / 8fr
inner-padding:  24px (card) / 32px (section)
```

### Effects
```
elevation/card:   NONE (border only)
elevation/island: 1px border + optional 6-12% cobalt blur at 8px/32px
bloom/media:      radial gradient ellipse, 28-32px layer blur
```

---

## REQUIRED CODEX ACTIONS

### PRIORITY 1 — Execute Make Session 01
Files:
- `make-sessions/session-01-product-card/guidelines.md` (attach to Make project)
- `make-sessions/session-01-product-card/PROMPT.md` (paste prompt section)

Changes:
- Attach 3 frames: `461:93046`, `461:89294`, `461:95165` from page `461:89008`
- Run the prompt in Make
- Evaluate 5 card outputs against acceptance criteria
- Select 2 winners for context expansion
- Record decision in `SESSION_ROADMAP.md` decision record

### PRIORITY 2 — Post-Session 01: Token Implementation
Files:
- `make-sessions/session-01-product-card/DESIGN_SYSTEM_IDENTITY.md` (token authority)

Changes:
- Extract winning card's exact measurements into component spec
- Validate token values against winning card
- Update any token that the winner proves differently
- Do NOT implement in code until Session 05 completes

### PRIORITY 3 — Session 02 Prep (after S01 winner selected)
Files:
- `make-sessions/session-02-purchase-rails/` (to be created)

Changes:
- Draft PurchasePanel + AssuranceRail + DossierRail guidelines
- Use winning card as attachment
- Same methodology: 5 variants, creative-director archetypes

---

## ACCEPTANCE CHECKS
- [ ] Make session produces 5 materially different card architectures
- [ ] No card uses box-shadow
- [ ] All cards use ruled metric rail (not chips/tags)
- [ ] Price subordinate on all cards (18/22 or smaller)
- [ ] Media chambers use white-to-ice-blue gradient, not dark studio
- [ ] Border language inherits cobalt-family hairline from CategoryFamilyRail
- [ ] 2 winners expanded into Grid/Featured/QuickAdd contexts
- [ ] No pages, routes, or full sections built
- [ ] Decision recorded in SESSION_ROADMAP.md
- [ ] No product data invented

---

## RISK NOTES
- Make may still average the 3 attached frames instead of being inspired by them — if output is generic, reduce to 1 frame (ProductCommerceCardFeatured only)
- Over-specification risk mitigated by keeping prompt at ~creative-director level, not pixel-spec
- If Make builds pages despite instruction, session is invalid — reject and re-run with stronger constraints
- CategoryFamilyRail border language must be inherited, not reinvented — if cards don't show hairline borders, the system has diverged

---

## RELAY
- GitHub repo: `mujtabaakhawaja-prog/oluk-design-system`
- Branch: `main`
- Session kit: `make-sessions/session-01-product-card/`
- Decision record: `make-sessions/SESSION_ROADMAP.md`
- Source board: Page `429:171` ([MAKE SOURCE] OLUK R6 LIGHT V2-FINAL)
- Build-from direction: Run 1 A02 Cobalt Atmospheric (`439:81059`)

---

## OPEN ITEMS
- Make session not yet executed — pending user action
- Token values are derived from visual evidence, not measured programmatically — verify against winning card post-session
- Dark mode tokens not specified (light mode only for all Make sessions)
- Responsive behavior deferred to Session 05
- No runtime code implementation until full primitive set is resolved
