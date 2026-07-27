# R6 Five-File Lifecycle Split — Migration Mapping

Source file: `nMdvVtpTC3r2JQrhyjQ7yW` (OLUK R6 master)

Cross-file node duplication is not available between these files. Migration is manual: open source page → Select All (Cmd+A) → Copy (Cmd+C) → switch to destination file + page → Paste (Cmd+V).

---

## 1. Archive — `HkUKcAFCy5Op9b2lq3F5Cf`

**Purpose:** Superseded explorations, legacy layers, ancestor files. Never referenced as authority.

| # | Destination Page ID | Destination Page Name | Source Page ID | Source Page Name | Child Count |
|---|---|---|---|---|---|
| 1 | 0:1 | LAYERS 1 — Majestic/PASS80 Legacy | 1238:4490 | [5-ARCHIVE] LAYERS 1 | ~167 |
| 2 | 2:2 | LAYERS 2 — Majestic/PASS80 Legacy | 1238:28562 | [5-ARCHIVE] LAYERS 2 | 39 |
| 3 | 2:3 | LAYERS 3 — Majestic/PASS80 Legacy | 1238:29765 | [5-ARCHIVE] LAYERS 3 | 11 |
| 4 | 2:4 | LAYERS 6 — Majestic/PASS80 Legacy | 1238:48435 | [5-ARCHIVE] LAYERS 6 | 9 |
| 5 | 2:5 | FRONTIER V02 — 00 CONTROL + CUSTODY | 276:76 | [5-ARCHIVE] FRONTIER 00 | 3 |
| 6 | 2:6 | FRONTIER V02 — 01 COLOR + MATERIAL | 276:77 | [5-ARCHIVE] FRONTIER 01 | 3 |
| 7 | 2:7 | FRONTIER V02 — 02 PDP DARK V1 | 276:78 | [5-ARCHIVE] FRONTIER 02 | 3 |
| 8 | 2:8 | FRONTIER V02 — 06 HUMAN DECISIONS | 320:454 | [5-ARCHIVE] FRONTIER 06 | 3 |
| 9 | 2:9 | FRONTIER V02 — 07 LIGHT PARITY | 373:812 | [5-ARCHIVE] FRONTIER 07 | 3 |
| 10 | 2:10 | FRONTIER V02 — 08 METRIC COLOR R02 | 390:812 | [5-ARCHIVE] FRONTIER 08 | 3 |
| 11 | 2:11 | FRONTIER V02 — 09 LIGHT VARIANT LAB | 397:812 | [5-ARCHIVE] FRONTIER 09 | 9 |
| 12 | 2:12 | FRONTIER V02 — 10 DARK ENHANCEMENT | 397:813 | [5-ARCHIVE] FRONTIER 10 | 3 |
| 13 | 2:13 | FRONTIER V02 — 11 VARIANT HUMAN REVIEW | 397:814 | [5-ARCHIVE] FRONTIER 11 | 4 |
| 14 | 2:14 | CLOSEOUT V02 — 00 CONTROL + CUSTODY | 518:812 | [5-ARCHIVE] CLOSEOUT 00 | 2 |
| 15 | 2:15 | CLOSEOUT V02 — 01 IDENTITY + TOKENS | 518:813 | [5-ARCHIVE] CLOSEOUT 01 | 6 |
| 16 | 2:16 | CLOSEOUT V02 — 02 COMPONENTS + STATES | 518:814 | [5-ARCHIVE] CLOSEOUT 02 | 12 |
| 17 | 2:17 | CLOSEOUT V02 — 10 HUMAN DECISIONS | 518:815 | [5-ARCHIVE] CLOSEOUT 10 | 3 |
| 18 | 2:18 | DRAFT / ProductCommerce Primitives | 849:2 | [5-ARCHIVE] DRAFT | 11 |
| 19 | 2:19 | PDP / Purchase Panel — Pre-G1 Draft | 1167:180 | [5-ARCHIVE] PDP Pre-G1 | 10 |
| 20 | 2:20 | BRIDGE — Legacy OL/Commerce | 1195:7097 | [5-ARCHIVE] BRIDGE | ~158 |
| 21 | 2:21 | ANCESTOR — Trust Assurance Production | 88:2 | [5-ARCHIVE] ANCESTOR Prod | 19 |
| 22 | 2:22 | ANCESTOR — Trust Assurance More | 470:4257 | [5-ARCHIVE] ANCESTOR More | 14 |
| 23 | 2:23 | ANCESTOR — Trust Assurance Components | 478:812 | [5-ARCHIVE] ANCESTOR Comp | 42 |

**Total: 23 pages, ~540 nodes**

---

## 2. Production Components + Tokens — `DKOde9DRfyVCHThSNkUIX4`

**Purpose:** Published components, tokens, styles. Single source of design-system truth.

| # | Destination Page ID | Destination Page Name | Source Page ID | Source Page Name |
|---|---|---|---|---|
| 1 | 0:1 | R6 00 — Brand Identity | 1:2 | [1-PROD] R6 00 |
| 2 | 2:2 | R6 01 — Foundations | 1:3 | [1-PROD] R6 01 |
| 3 | 2:3 | R6 02 — Design Tokens | 1:4 | [1-PROD] R6 02 |
| 4 | 2:4 | R6 03 — Primitive Components | 1:5 | [1-PROD] R6 03 |
| 5 | 2:5 | R6 04 — Commerce Components | 1:6 | [1-PROD] R6 04 |
| 6 | 2:6 | R6 05 — Evidence Components | 1:7 | [1-PROD] R6 05 |
| 7 | 2:7 | R6 06 — Navigation and Shell | 1:8 | [1-PROD] R6 06 |
| 8 | 2:8 | R6 14 — Governance and Promotion | 1:16 | [1-PROD] R6 14 |
| 9 | 2:9 | TrustEvidenceSpine — Production V01 | 644:812 | [1-PROD] CHAMPION TES |
| 10 | 2:10 | Header Stack | 1169:4859 | [1-PROD] CHAMPION Header |
| 11 | 2:11 | ProductCommerceCard System | 1185:4857 | [1-PROD] CHAMPION PCC |
| 12 | 2:12 | Brand Logo | 1185:4734 | [1-PROD] CHAMPION Logo |
| 13 | 2:13 | Promotion Register | 1:18 | [1-PROD] Promotion Reg |

**Total: 13 pages**

---

## 3. Pages + Routes — `eqraGRq4VoEdAIi0llMaN7`

**Purpose:** Route-level compositions (homepage, PDP, catalogue, checkout, account, etc.)

| # | Destination Page ID | Destination Page Name | Source Page ID | Source Page Name |
|---|---|---|---|---|
| 1 | 0:1 | R6 07 — Homepage Sections | 1:9 | [2-ROUTES] R6 07 |
| 2 | 2:2 | R6 08 — Catalogue System | 1:10 | [2-ROUTES] R6 08 |
| 3 | 2:3 | R6 09 — Product Detail System | 1:11 | [2-ROUTES] R6 09 |
| 4 | 2:4 | R6 10 — OpenLab System | 1:12 | [2-ROUTES] R6 10 |
| 5 | 2:5 | R6 11 — Bag and Checkout | 1:13 | [2-ROUTES] R6 11 |
| 6 | 2:6 | R6 12 — Responsive States | 1:14 | [2-ROUTES] R6 12 |
| 7 | 2:7 | R6 13 — Runtime Contracts | 1:15 | [2-ROUTES] R6 13 |
| 8 | 2:8 | R6 15 — Archive and Source Evidence | 1:17 | [2-ROUTES] R6 15 |
| 9 | 2:9 | CHAMPION / Homepage / Triptych V02 | 753:812 | [2-ROUTES] CHAMPION Home |
| 10 | 2:10 | CHAMPION / OpenLab / Portal V2 | 766:815 | [2-ROUTES] CHAMPION OL |
| 11 | 2:11 | CHAMPION / PDP / Corrected V02 | 777:812 | [2-ROUTES] CHAMPION PDP |
| 12 | 2:12 | Homepage Hero | 753:812 | [2-ROUTES] Homepage Hero |
| 13 | 2:13 | R6 Checkout | 702:15540 | [2-ROUTES] Checkout |
| 14 | 2:14 | R6 Lab Reports | 702:21327 | [2-ROUTES] Lab Reports |
| 15 | 2:15 | R6 TRUST AND CURRENCY | 702:21328 | [2-ROUTES] Trust+Currency |
| 16 | 2:16 | Human Review Gallery | 712:1311 | [2-ROUTES] Review Gallery |
| 17 | 2:17 | Human Feedback Register | 33:2 | [2-ROUTES] Feedback Reg |

**Total: 17 pages**

---

## 4. Make Laboratory — `scM4viMDHV6Jv6Fxccm71g`

**Purpose:** Active Make sprint candidates, explorations, storyboards, responsive QA.

| # | Destination Page ID | Destination Page Name | Source Page ID | Source Page Name |
|---|---|---|---|---|
| 1 | 0:1 | Product Cards | 702:15786 | [3-LAB] Product Cards |
| 2 | 2:2 | Studio Renders | 1186:4490 | [3-LAB] Studio Renders |
| 3 | 2:3 | Product Dossier / Bottle Motion Study | 1475:812 | [3-LAB] Bottle Motion |
| 4 | 2:4 | OpenLab Portal / Final Hub / Review V01 | 881:812 | [3-LAB] OL Portal |
| 5 | 2:5 | Lab Records / Final Registry / Review V01 | 881:27862 | [3-LAB] Lab Records |
| 6 | 2:6 | Foundations / Fill + Typography / Decision Review | 881:29377 | [3-LAB] Foundations |
| 7 | 2:7 | OpenLab Destinations / Final Family / Review V01 | 901:1383 | [3-LAB] OL Destinations |
| 8 | 2:8 | OpenLab / Responsive + Dark + Asset QA | 920:812 | [3-LAB] OL Responsive |
| 9 | 2:9 | OpenLab / Customer Frontend Direction | 940:812 | [3-LAB] OL Frontend |
| 10 | 2:10 | OPENLAB P2 — 00 Source Copies | 808:812 | [3-LAB] OL P2 00 |
| 11 | 2:11 | OPENLAB P2 — 01 Foundations + Components | 808:813 | [3-LAB] OL P2 01 |
| 12 | 2:12 | OPENLAB P2 — 02 Page Storyboards | 808:814 | [3-LAB] OL P2 02 |
| 13 | 2:13 | OPENLAB P2 — 03 Responsive + Review | 808:815 | [3-LAB] OL P2 03 |
| 14 | 2:14 | Homepage Hero / Range Horizon V01 | 1420:812 | [3-LAB] Range Horizon |

**Total: 14 pages**

---

## 5. Codex Runtime Proofs — `yNAyIQhewnbofeZWMGkKVa`

**Purpose:** Screenshot evidence from Codex runtime, used for ReviewOS comparison.

| # | Destination Page ID | Destination Page Name | Source Page ID | Source Page Name | Child Count |
|---|---|---|---|---|---|
| 1 | 0:1 | Codex Runtime Proofs | 1430:77411 | [4-PROOFS] Codex proofs | 134 |

**Total: 1 page, 134 proof screenshots**

---

## Migration Order (recommended)

1. **Archive** (23 pages) — biggest declutter, lowest risk
2. **Proofs** (1 page, 134 nodes) — single page, high value isolation
3. **Lab** (14 pages) — active work, benefits from clean file
4. **Production** (13 pages) — component authority, handle with care
5. **Routes** (17 pages) — route compositions, depends on Production components being published

## Manual Migration Steps

For each row in the tables above:

1. Open source file (`nMdvVtpTC3r2JQrhyjQ7yW`)
2. Navigate to the source page (use the page ID to find it)
3. Select All on that page (Cmd+A / Ctrl+A)
4. Copy (Cmd+C / Ctrl+C)
5. Open the destination file
6. Navigate to the matching destination page
7. Paste (Cmd+V / Ctrl+V)
8. Verify content transferred correctly

After all pages are migrated for a file, the source pages can be deleted from the master file.
