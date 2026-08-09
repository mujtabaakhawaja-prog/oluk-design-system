# MF Completion Consolidation — Full Status View

## Date: 2026-08-09
## File: `BEPMuUt1HroEw8xjz8CVyN`

---

## MF RUN HISTORY

| Run | Focus | Status | Key Outcome | Repo Location |
|---|---|---|---|---|
| MF-01A | ProductCommerceCard Material Relationship | ✅ COMPLETE | 5 card densities componentized (Vertical, Featured, Horizontal, Compact, PurchasePanel) | `session-01-product-card/` |
| MF-01B | Cross-Context Surface Relationship | ✅ COMPLETE | Dir C planar language selected, cherry-pick consolidated | `session-01b-relationship-transfer/` |
| MF-02A Run 1 | Grid Surface (PNG-based) | ✅ COMPLETE | Hero PNG failure identified → native frames needed | `session-02-grid-surface/` |
| MF-02A Run 2 | Grid Surface (native, hero variants) | ✅ COMPLETE | Section differentiation failure → contract added | `session-02-grid-surface/` |
| MF-02A Run 3 | Grid Surface (locked hero, differentiation) | ✅ COMPLETE | Champion composite locked, 6 sections cherry-picked | `session-02-grid-surface/` |
| MF-03 Codex Sites v2 | Experience Lab build | 🔧 IN PROGRESS | Data truth correct, structural design gaps identified | `session-03-codex-sites/` |
| MF-03 Make | Header + Footer + OpenLab Portal | 📋 PLANNED | PROMPT.md written, 13 inputs mapped, 3+1+2 directions | `session-03-openlab-header/` |

---

## WHAT'S LOCKED (never rebuild)

### Components (Figma native)
| Component | Node ID | Type | Status |
|---|---|---|---|
| ProductCommerceCard / Vertical | `486:4634` | COMPONENT | ✅ Locked |
| ProductCommerceCard / Featured | `486:4635` | COMPONENT | ✅ Locked |
| ProductCommerceCard / Horizontal | `486:4636` | COMPONENT | ✅ Locked |
| ProductCommerceCard / Compact (5 variants) | `486:4642` | COMPONENT_SET | ✅ Locked |
| EvidenceStatus | `518:13092` | COMPONENT | ✅ Locked |
| TrustEvidenceSpine | `475:9098` | COMPONENT | ✅ Locked |
| TrustEvidenceSpine / AssuranceRail (4 variants) | `556:34122` | COMPONENT_SET | ✅ Locked |
| PurchasePanel | `478:10367` | COMPONENT | ✅ Locked |

### Compositions (MF-02A champion)
| Section | Champion Source | Node ID | Status |
|---|---|---|---|
| Hero (2-fold card) | Locked template | `470:6393` | ✅ Structure locked, cobalt applied |
| Grid (3× Vertical) | Dir A | `551:25299` | ⚠️ Needs card type upgrade |
| PDP S1 (60/40) | Dir A | — | ✅ Passes |
| Dossier (A+B hybrid) | Mixed | `551:27148` | ⚠️ Needs restructure |
| Evidence (dashboard) | Dir B | `551:26498` | ✅ Passes |
| Rail (adaptive) | Dir A | `551:26896` | ⚠️ Needs full-width |

### Surface Contract (permanent tokens)
| Token | Value | Status |
|---|---|---|
| Canvas | `#f7f8fc` | ✅ Locked |
| Card border | `rgba(206,220,241,0.92)` | ✅ Locked |
| Near-black | `rgb(20,24,39)` | ✅ Locked |
| Cobalt core | `#0057FF` | ✅ Locked |
| Cobalt interactive | `#256DFF` | ✅ Locked |
| Media chamber | `rgb(240,244,251)` | ✅ Locked |
| Typography | Plus Jakarta Sans ExtraBold + Inter | ✅ Locked |
| Softform Arc radii | r=20/24/28/34 per density | ✅ Locked |

---

## WHAT'S IN PROGRESS

### Codex Sites Corrections (6 tasks)
Source: `session-03-codex-sites/CODEX-CORRECTION-PASS.md`

| # | Correction | Status |
|---|---|---|
| 1 | Hero → 2-fold continuous card | 📋 Queued |
| 2 | Category → compound families, all white | 📋 Queued |
| 3 | Product cards → structured card makeup | 📋 Queued |
| 4 | Strip meta-commentary headlines | 📋 Queued |
| 5 | Remove backend vocabulary | 📋 Queued |
| 6 | Apply surface contract CSS | 📋 Queued |

### Figma-Side Champion Corrections (from BRIDGE-PACKET)
| # | Correction | Node | Status |
|---|---|---|---|
| 1 | Hero cobalt colors | `551:25220` | ✅ Done (Figma) |
| 2 | Hero IN STOCK + EvidenceStatus | `551:25220` | 📋 Codex task |
| 3 | Grid card type upgrade | `551:25299` | 📋 Codex task |
| 4 | Dossier hybrid restructure | `551:27148` | 📋 Figma edit or Codex |
| 5 | Rail adaptive width | `545:24677` | 📋 Codex task |
| 6 | PDP Dir C assembly | — | 📋 Codex task |

---

## WHAT'S PLANNED (not started)

### MF-03 Make Run
Source: `session-03-openlab-header/PROMPT.md`

| Deliverable | Directions | Status |
|---|---|---|
| Header navigation | 3 (2-tier / 3-tier / single-tier) | 📋 PROMPT ready |
| Footer | 1 (dark inverse) | 📋 PROMPT ready |
| OpenLab Portal | 2 (editorial / dashboard) | 📋 PROMPT ready |

---

## WHAT'S LEFT TO DESIGN (full inventory)

### Priority 1: Blocking — No page ships without these
| Surface | Best Tool | Figma Authority | Status |
|---|---|---|---|
| Header nav + trust rail | MF-03 Make → native component | `564:42811` (current, needs redesign) | 📋 PROMPT.md written |
| Footer | MF-03 Make → native component | None (new design) | 📋 PROMPT.md written |
| Homepage full CSS grid | Codex Sites | Champion `551:28924` | 📋 After corrections |
| PDP full CSS grid | Codex Sites | Dir C cherry-pick ordering | 📋 After corrections |

### Priority 2: High — Core commerce experience
| Surface | Best Tool | Figma Authority | Status |
|---|---|---|---|
| Product catalogue / shop page | Codex Sites + Figma | Grid layout proven, page shell missing | 📋 Not started |
| Category cards (compound families) | Figma native | `561:41860` (1171×544) | ✅ Designed, needs integration |
| Product Dossier corrections | Figma edit_design | `551:27148` + `563:42499` (best example) | 📋 Corrections spec'd |
| Reviews section | Codex Sites | None (corrected fixture cards) | 📋 Open question resolved |

### Priority 3: OpenLab — New territory
| Surface | Best Tool | Figma Authority | Status |
|---|---|---|---|
| OpenLab Portal | MF-03 Make | 9 subsections in `564:64871` | 📋 PROMPT.md written |
| Lab Records Archive | MF-03 Make | `561:41625`, `422:10293` | 📋 Included in MF-03 |
| Individual Lab Record | MF-03 Make | `422:10293` (certificate of analysis) | 📋 Included in MF-03 |
| MK-2866 Dossier page | Figma Make or edit | `563:42499` (best dossier) | 📋 Template exists |
| Batch Lookup | Future | `564:49171` (rough layout) | 📋 After portal |
| Methodology | Future | `564:49828` (rough layout) | 📋 After portal |
| Source Chain | Future | `564:50627` (rough layout) | 📋 After portal |
| OpenLab Compare | Future | `564:56412` (rough layout) | 📋 After portal |
| EvidenceOS overview | Future | `564:57977` (rough layout) | 📋 After portal |

### Priority 4: PDP-Specific
| Surface | Best Tool | Figma Authority | Status |
|---|---|---|---|
| Product comparison | Figma edit | `563:42740` (needs taming) | 📋 Dark section — scope TBD |
| Shortlist builder | Figma edit | `563:42763` (needs taming) | 📋 Dark panel — scope TBD |
| Product info section | Figma edit | `563:42661` (needs taming) | 📋 Dark section — scope TBD |

### Deferred — Runtime B
| Surface | Status |
|---|---|
| Checkout | Follow AGENTS.md |
| Basket | Follow AGENTS.md |
| Payment | Follow AGENTS.md |
| Order confirmation | Follow AGENTS.md |

---

## PARALLEL WORKSTREAMS (Current)

```
┌─────────────────────────┐    ┌──────────────────────────┐
│  CODEX SITES            │    │  FIGMA MAKE              │
│                         │    │                          │
│  6 Correction tasks     │    │  MF-03 PROMPT.md         │
│  → Redeploy v3          │    │  → 3 Header directions   │
│  → Human visual review  │    │  → 1 Footer              │
│                         │    │  → 2 OpenLab directions   │
│  THEN:                  │    │  → Human cherry-pick      │
│  Homepage assembly      │    │                          │
│  PDP Dir C assembly     │    │  THEN:                   │
│  Catalogue page shell   │    │  Native componentization │
└─────────────────────────┘    └──────────────────────────┘
              │                            │
              └────────────┬───────────────┘
                           │
                    ┌──────┴──────┐
                    │   CONVERGE  │
                    │             │
                    │  Full-page  │
                    │  assembly   │
                    │  with header│
                    │  + footer   │
                    └─────────────┘
```

---

## PIVOTAL REMAINING DESIGN DECISIONS

1. **Dossier restructure** — execute the hybrid A+B corrections (compact media, horizontal alignment, in-family surface) either in Figma or Codex. Best dossier reference: `563:42499`.
2. **Header champion** — MF-03 Make will produce 3 directions. Must select one before any page can ship.
3. **OpenLab depth** — MF-03 covers portal + archive + individual record. The remaining 6 routes (Batch Lookup, Methodology, Source Chain, Compare, EvidenceOS) are future work.
4. **Dark sections scope** — product-comparison (`563:42740`), shortlist (`563:42763`), product-info (`563:42661`) all use dark backgrounds. Decide: convert to light surface contract, or designate as intentional inverse sections.
5. **Evidence-OS Make file integration** — `N40v2cUxw3oxfcpSZoluCh` provides portal + commerce flow architecture. Needs audit against current Figma frames for content alignment.
