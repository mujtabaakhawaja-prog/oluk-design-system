# FC-01 — Review Map

**Status:** `ADAPTIVE_CARD_FAMILY_TECHNICAL_EVIDENCE_READY / DOSSIER_CORRECTION_REQUIRED / HUMAN_SELECTION_REQUIRED`
**Current Sites classification:** `TECHNICALLY_HEALTHY / DESIGN_CONVERGENCE_FAILED / HUMAN_REVIEW_PENDING`
**Verified access:** access-policy revision 7 `custom`, one allowed current owner, zero groups, zero external visitors, anonymous `/` and `/review` HTTP `401`; corrected from public revision 6 on 2026-08-11

Sites version 5 serves the candidate `/review` for exact source `2fb152ed689b94f709d4fb78d26d25ea0a88329f`; the other 14 routes remain the preserved rejected-v3 comparison baseline. Neither availability nor route coverage is an accepted design milestone.

## Owner-only candidate review anchors — Sites version 5

| Review item | Owner-only route anchor | Direct Figma evidence | State |
|---|---|---|---|
| Foundation | `/review#foundation` | [Foundation `637:3`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=637-3) | `TECHNICAL_EVIDENCE_READY / UNPUBLISHED` |
| Provenance | `/review#mf02b-provenance` | [Adaptive candidate page `639:2`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-2) | `HUMAN_SELECTION_REQUIRED` |
| Status atoms | `/review#mf02b-atoms` | [InventoryStatus `641:17`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=641-17), [EvidenceStatus `518:13092`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=518-13092) | `TECHNICAL_EVIDENCE_READY` |
| Vertical / Featured | `/review#mf02b-card-family` | [Vertical `646:10801`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=646-10801), [Featured `646:10802`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=646-10802) | `TECHNICAL_EVIDENCE_READY / HUMAN_SELECTION_REQUIRED` |
| Compact states | `/review#mf02b-compact-states` | [Compact set `639:13888`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13888) | `8_STATES_READY` |
| Horizontal Relation | `/review#mf02b-horizontal` | [Relation set `643:8616`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=643-8616) | `COMPONENT_READY / FULL_RAIL_OPEN` |
| Full related rail | `/review#mf02b-related-rail` | [Rail `551:26896`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-26896) | `SECTION_LEVEL_CONVERGENCE_OPEN` |
| PurchasePanel | `/review#mf02b-purchase-panel` | [PurchasePanel set `639:13889`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-13889) | `6_STATES_READY` |
| AssuranceRail | `/review#mf02b-assurance` | [AssuranceRail `556:34627`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=556-34627) | `6_EXACT_ICONS_READY` |
| Responsive ledger | `/review#mf02b-responsive-ledger` | [1440 `644:3`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-3), [1024 `644:568`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-568), [768 `644:1093`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-1093), [390 `644:1625`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=644-1625) | `FOUR_WIDTH_TECHNICAL_PASS` |
| Dossier | `/review#mf02b-dossier` | [Dossier `551:27148`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-27148) | `DOSSIER_CORRECTION_REQUIRED` |
| Rejected baseline routes | `/review#baseline-routes` | [V3 capture board `573:64880`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=573-64880) | `COMPARISON_ONLY` |
| Human receipt | `/review#mf02b-selection-receipt` | [Adaptive candidate page `639:2`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=639-2) | `PENDING` |

Local QA at 1440/1024/768/390 records equal scroll/client widths, zero semantic child-boundary violations, 12px minimum computed type, loaded images, six wrapped AssuranceRail descriptions, zero console errors and a 2px cobalt focus outline. The build-backed test suite passes `6/6`. These results do not fill the human receipt.

## All 15 private route surfaces

| Route | Owner-only Sites link | Direct Figma comparison source |
|---|---|---|
| `/` | [Homepage](https://oluk-experience-lab.sigmamindset.chatgpt.site/) | [Current opening `614:75994`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=614-75994) |
| `/shop` | [Shop](https://oluk-experience-lab.sigmamindset.chatgpt.site/shop) | [Product grid `626:8099`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-8099) |
| `/product/mk-2866` | [MK-2866 PDP](https://oluk-experience-lab.sigmamindset.chatgpt.site/product/mk-2866) | [PDP Section 1 `626:8664`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-8664) |
| `/reviews` | [Reviews](https://oluk-experience-lab.sigmamindset.chatgpt.site/reviews) | [MF-03 composition reservoir `614:75950`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=614-75950) |
| `/about` | [About](https://oluk-experience-lab.sigmamindset.chatgpt.site/about) | [Selected shell `614:75952`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=614-75952) |
| `/about/evidence-os` | [EvidenceOS overview](https://oluk-experience-lab.sigmamindset.chatgpt.site/about/evidence-os) | [Embedded evidence `626:11285`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-11285) |
| `/open-lab` | [OpenLab portal](https://oluk-experience-lab.sigmamindset.chatgpt.site/open-lab) | [Embedded evidence layout `626:11754`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-11754) |
| `/open-lab/records` | [Lab Records](https://oluk-experience-lab.sigmamindset.chatgpt.site/open-lab/records) | [Archive canvas split `626:10899`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-10899) |
| `/open-lab/records/source-bound-record` | [Individual record](https://oluk-experience-lab.sigmamindset.chatgpt.site/open-lab/records/source-bound-record) | [Individual evidence relationship `626:11285`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-11285) |
| `/open-lab/dossier/mk-2866` | [MK-2866 dossier](https://oluk-experience-lab.sigmamindset.chatgpt.site/open-lab/dossier/mk-2866) | [Corrected dossier `551:27148`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-27148) |
| `/open-lab/batch-lookup` | [Batch lookup](https://oluk-experience-lab.sigmamindset.chatgpt.site/open-lab/batch-lookup) | [Archive/search split `626:10899`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-10899) |
| `/open-lab/methodology` | [Methodology](https://oluk-experience-lab.sigmamindset.chatgpt.site/open-lab/methodology) | [Six-point evidence composition `457:4661`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=457-4661) |
| `/open-lab/source-chain` | [Source chain](https://oluk-experience-lab.sigmamindset.chatgpt.site/open-lab/source-chain) | [Embedded evidence `626:11285`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-11285) |
| `/open-lab/compare` | [Compare](https://oluk-experience-lab.sigmamindset.chatgpt.site/open-lab/compare) | [OpenLab inventory `564:64871`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=564-64871) |
| `/review` | [Private review index](https://oluk-experience-lab.sigmamindset.chatgpt.site/review) | [Codex Sites capture board `573:64880`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=573-64880) |

## Preserved customer-route comparison items

| Review item | Direct Sites target | Direct Figma authority | Current state |
|---|---|---|---|
| Identity shell | [Current baseline shell](https://oluk-experience-lab.sigmamindset.chatgpt.site/) | [Shell `614:75952`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=614-75952), [header history `564:42946`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=564-42946), [footer `614:77043`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=614-77043) | `BASELINE_CORRECTION_REQUIRED` |
| Homepage opening | [Homepage hero](https://oluk-experience-lab.sigmamindset.chatgpt.site/#hero) | [Hero `614:75994`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=614-75994), [unified left `615:9963`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=615-9963), [Featured `615:9775`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=615-9775), [BatchTicker `614:76220`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=614-76220) | `DESIGN_CONVERGENCE_FAILED` |
| Assurance | [Homepage assurance](https://oluk-experience-lab.sigmamindset.chatgpt.site/#assurance) | [AssuranceRail `556:34627`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=556-34627), [PDP rail `551:31587`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-31587) | `BASELINE_CORRECTION_REQUIRED` |
| Compound families | [Compound families](https://oluk-experience-lab.sigmamindset.chatgpt.site/#compound-families) | [CategoryFamilyRail `561:41860`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=561-41860) | `TAXONOMY_LOCKED / VISUAL_PENDING` |
| Featured products | [Featured products](https://oluk-experience-lab.sigmamindset.chatgpt.site/#featured-products) | [Product grid `626:8099`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-8099), [card anatomy `486:4634`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=486-4634) | `BASELINE_CORRECTION_REQUIRED` |
| Homepage OpenLab records | [OpenLab records](https://oluk-experience-lab.sigmamindset.chatgpt.site/#openlab-records) | [Archive split `626:10899`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-10899) | `BASELINE_CORRECTION_REQUIRED` |
| Reviews | [Customer reviews](https://oluk-experience-lab.sigmamindset.chatgpt.site/#reviews) | [MF-03 composition reservoir `614:75950`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=614-75950) | `FIXTURE_DIRECTION_LOCKED / VISUAL_PENDING` |
| Related product | [Related product](https://oluk-experience-lab.sigmamindset.chatgpt.site/#related-products) | [Horizontal card `626:12504`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-12504), [related rail `626:9696`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-9696) | `COMPONENT_EVIDENCE_READY / FULL_RAIL_OPEN` |
| PDP purchase | [PDP purchase](https://oluk-experience-lab.sigmamindset.chatgpt.site/product/mk-2866#purchase) | [PDP first fold `626:8664`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-8664), [PurchasePanel `626:12664`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-12664), [media controls `126:47`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=126-47) | `BASELINE_CORRECTION_REQUIRED` |
| Dossier | [PDP dossier](https://oluk-experience-lab.sigmamindset.chatgpt.site/product/mk-2866#dossier) | [Corrected node `551:27148`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-27148), [best example `563:42499`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=563-42499) | `DOSSIER_CORRECTION_REQUIRED / INDEX_NOT_TABS` |
| PDP lab records | [PDP lab records](https://oluk-experience-lab.sigmamindset.chatgpt.site/product/mk-2866#lab-records) | [record section `551:31570`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-31570), [HPLC `551:31665`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-31665), [record detail `551:31706`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=551-31706) | `BASELINE_CORRECTION_REQUIRED` |
| OpenLab embedded evidence | [Embedded evidence](https://oluk-experience-lab.sigmamindset.chatgpt.site/open-lab#embedded-evidence) | [layout `626:11754`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-11754), [inner frame `626:11285`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=626-11285), [six-point reference `457:4661`](https://www.figma.com/design/BEPMuUt1HroEw8xjz8CVyN/Final-Design?node-id=457-4661) | `BASELINE_CORRECTION_REQUIRED` |

## Evidence required after human selection

1. current Sites capture and exact revision;
2. direct target Figma node;
3. 1440/1024/768/390 result;
4. computed token/radius/elevation/type result;
5. clipping and child-boundary measurement;
6. keyboard/focus result where interactive;
7. `PASS`, `CORRECTION_REQUIRED` or `BLOCKED` with bounded owner.
