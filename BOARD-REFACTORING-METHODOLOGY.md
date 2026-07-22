# OLUK R6 — Board Refactoring & Redesign Methodology

> **Date**: 2026-07-22
> **Status**: METHODOLOGY — NOT YET EXECUTED
> **Constraint**: Additive mutation policy — historical boards are never deleted, only annotated

---

## 1. Problem Statement

The Figma file (nMdvVtpTC3r2JQrhyjQ7yW) has 67 pages built across multiple design phases (R6 Frontier V02, Closeout V02, Champion, Supplemental). Many pages predate the established G1 design system and contain:

- **Inline colors** instead of G1 variable bindings
- **Inline typography** instead of OLUK text styles
- **Ad-hoc layouts** instead of governed auto-layout with layout tokens
- **Scattered frames** with inconsistent spacing, naming, and hierarchy
- **Mixed authority levels** — canonical specimens next to exploration sketches
- **Stale content** — outdated counts, old component versions, pre-audit data

The goal is to systematically bring every page into alignment with the G1 design system while preserving historical context and never breaking the additive mutation policy.

---

## 2. Page Classification Taxonomy

Before touching anything, every page must be classified. Classification determines the refactoring approach.

### Tier 1: CHAMPION (6 pages) — Canonical implementation authority
```
[CHAMPION] TrustEvidenceSpine — Production V01          [644:812]
[CHAMPION] V02 / Homepage / R6-HOMEPAGE-V1-TRIPTYCH-V02 [753:812]
[CHAMPION] V02 / OpenLab / R6-OPENLAB-PORTAL-V2-V02     [766:815]
[CHAMPION] V02 / PDP / R6-PDP-CORRECTED-V02             [777:812]
[CHAMPION] PDP / Purchase Panel System Components        [1167:180]
[CHAMPION] BRIDGE                                        [1195:7097]
```
**Refactoring priority**: HIGH — these are the source of truth
**Approach**: Full G1 binding, governed layout, corrected content, production naming
**Additional champion pages**:
```
[CHAMPION] R6 V02- Header Stack                         [1169:4859]
[CHAMPION] R6 V02- ProductCommerceCard System            [1185:4857]
[CHAMPION] SYSTEM / ProductCommerce Primitives           [849:2]
[CHAMPION] R6 V02- Brand Logo                            [1185:4734]
```

### Tier 2: R6 SYSTEM (21 pages) — Design system documentation boards
```
R6 — System Index                    [0:1]
R6 System Boards                     [1230:10515]
LAYERS 1-3, 6 — [G1 BOUND]          [1238:*]
R6 00 — Brand Identity               [1:2]
R6 01 — Foundations                   [1:3]
R6 02 — Design Tokens                [1:4]
R6 03 — Primitive Components         [1:5]
R6 04 — Commerce Components          [1:6]
R6 05 — Evidence Components          [1:7]
R6 06 — Navigation and Shell         [1:8]
R6 07 — Homepage Sections            [1:9]
R6 08 — Catalogue System             [1:10]
R6 09 — Product Detail System        [1:11]
R6 10 — OpenLab System               [1:12]
R6 11 — Bag and Checkout             [1:13]
R6 12 — Responsive States            [1:14]
R6 13 — Runtime Contracts            [1:15]
R6 14 — Governance and Promotion     [1:16]
R6 15 — Archive and Source Evidence  [1:17]
R6 — Promotion Register              [1:18]
```
**Refactoring priority**: MEDIUM — documentation, not production authority
**Approach**: Rebind colors to G1 variables, apply OLUK text styles where sensible, but accept inline for documentation-specific formatting. Update stale content (counts, component references).

### Tier 3: SUPPLEMENTAL (10 pages) — Review, exploration, and QA
```
[SUPPLEMENTAL] R6 V02 - Studio Renders                  [1186:4490]
[SUPPLEMENTAL] R6 Product Cards                          [702:15786]
[SUPPLEMENTAL] OPENLAB P2 — 00-03                        [808:812-815]
[SUPPLEMENTAL] R6 V02 / OPENLAB PORTAL / FINAL HUB      [881:812]
[SUPPLEMENTAL] R6 V02 / LAB RECORDS / FINAL REGISTRY     [881:27862]
[SUPPLEMENTAL] R6 V02 / FOUNDATIONS / FILL + TYPOGRAPHY  [881:29377]
[SUPPLEMENTAL] R6 V02 / OPENLAB DESTINATIONS             [901:1383]
[SUPPLEMENTAL] R6 V02 / OPENLAB / RESPONSIVE + DARK      [920:812]
[SUPPLEMENTAL] R6 V03 / OPENLAB / CUSTOMER FRONTEND      [940:812]
```
**Refactoring priority**: LOW — these are historical review records
**Approach**: Add `[PRE-G1]` annotation if not already G1-bound. Do NOT rebind — these are frozen review snapshots. Only correct actively misleading content.

### Tier 4: FRONTIER (11 pages) — Pre-G1 design exploration
```
R6 FRONTIER V02 — 00 through 11      [276:76 through 397:814]
```
**Refactoring priority**: SKIP — these are historical exploration
**Approach**: Add `[ANCESTOR · PRE-G1]` prefix if not already annotated. Never rebind or redesign. These exist as historical record per additive mutation policy.

### Tier 5: CLOSEOUT (4 pages) — Transition-era boards
```
R6 CLOSEOUT V02 — 00 through 10      [518:812 through 518:815]
```
**Refactoring priority**: SKIP — transition-era, superseded by Champion pages
**Approach**: Same as Frontier — annotate, don't touch.

### Tier 6: STANDALONE (5 pages) — Mixed-era functional pages
```
R6 Homepage Hero                      [702:15540]
R6 Checkout                           [702:21327]
R6 Lab Reports                        [702:21328]
R6 TRUST AND CURRENCY                 [712:1311]
R6 — Human Review Gallery             [33:2]
R6 — Human Feedback Register          [33:3]
```
**Refactoring priority**: MEDIUM-HIGH — these contain functional designs that may still be referenced
**Approach**: Case-by-case triage. Some may be promoted to Champion; others annotated as superseded.

### Tier 7: ANCESTOR (3 pages) — Legacy, never delete
```
[ANCESTOR] R6 - Trust Assurance Production               [88:2]
[ANCESTOR] R6 Trust Assurance More                       [470:4257]
[ANCESTOR] R6 Trust Assurance Components                 [478:812]
```
**Refactoring priority**: NEVER — protected by additive mutation policy
**Approach**: Keep as-is. Already annotated.

---

## 3. Per-Board Refactoring Playbook

For every board that qualifies for refactoring (Tiers 1-2 and selected Tier 6), execute these steps in order.

### Phase 0: Audit (Read-Only)

```
0.1  Count top-level frames — record names, IDs, positions, sizes
0.2  Identify frame purpose — specimen, component set, documentation, exploration, or orphan
0.3  Check variable binding coverage — what % of fills use G1 variables vs inline hex?
0.4  Check text style coverage — what % of text nodes use OLUK styles vs inline?
0.5  Check naming convention — does it follow [TYPE] Name / Variant pattern?
0.6  Check layout structure — auto-layout with tokens, or manual positioning?
0.7  Record stale content — wrong counts, old component references, outdated status
0.8  Classify each frame: KEEP (refactor in place), ARCHIVE (annotate as pre-G1), REMOVE (orphan/duplicate)
```

Output: An audit manifest per page listing every top-level frame with its classification and required actions.

### Phase 1: Structural Cleanup

```
1.1  Group related frames into Sections (Figma sections, not frames)
      - Use naming: "SECTION / [Purpose]" e.g. "SECTION / Component Specimens"
1.2  Establish consistent grid:
      - Documentation boards: 80px between sections, 40px between frames within sections
      - Component boards: 120px between component sets, 40px between variants
1.3  Remove orphan frames (empty frames, stray rectangles, unnamed groups)
      - Before removing, check if any frame is referenced by instances elsewhere
1.4  Flatten unnecessary nesting (groups inside groups inside groups)
1.5  Establish reading order: left-to-right, top-to-bottom
      - Title/registrar frame at top-left
      - Components flow left-to-right
      - Documentation flows top-to-bottom
```

### Phase 2: Variable Binding

```
2.1  Identify all solid color fills that are not G1-bound
2.2  Map each inline color to its G1 equivalent:
      - White backgrounds → color/canvas or color/surface/primary
      - Dark backgrounds → same variables in Dark mode
      - Text colors → color/text/primary, secondary, or technical
      - Brand blues → color/accent/primary or color/action/cta
      - Borders → color/border/neutral or color/border/accent
      - Status colors → state/success, warning, error, info, neutral
2.3  Apply bindings using evaluate_script batch operations
2.4  Verify: export the page and check for any remaining inline colors
2.5  Document binding coverage in a registrar frame on the page
```

### Phase 3: Typography Binding

```
3.1  Identify all text nodes using inline font properties
3.2  For CHAMPION and production-authority frames:
      - Map each inline text to the nearest OLUK text style
      - Apply using evaluate_script (set textStyleId)
3.3  For DOCUMENTATION frames:
      - Only bind headings and labels to OLUK styles
      - Accept inline for body text in documentation blocks (these use custom sizes/spacing)
3.4  For ANNOTATION text (frame labels, section headers, audit notes):
      - Use a consistent annotation style: Inter SemiBold 12px, color/text/secondary
3.5  Verify font loading before any text changes
```

### Phase 4: Layout Token Application

```
4.1  Convert manual-positioned frames to auto-layout where appropriate
4.2  Apply OLUK Layout Tokens:
      - Frame padding → padding/card (20px) or padding/panel (24px)
      - Item spacing → spacing/lg (16px) or spacing/xl (24px)
      - Section gaps → spacing/3xl (48px) or spacing/section (80px)
      - Corner radius → radius/md (8px) for cards, radius/lg (12px) for panels
4.3  DO NOT force auto-layout on:
      - Freeform exploration boards
      - Frames with absolute-positioned overlapping elements
      - Image-heavy compositions where manual placement is intentional
```

### Phase 5: Content Correction

```
5.1  Update all stale counts:
      - Variables: 42 → 52 (G1), total 77 with layout
      - Commerce variants: 553 → 596
      - Text styles: 24 → 38 active
      - Button variants: 180 → 60
      - StatusChip variants: 10 → 12
      - Pages: 63 → 67
5.2  Update status language:
      - Remove "ALL COMPLETE" claims
      - Add "FIGMA COMPLETE — PENDING RUNTIME CONFIRMATION" where applicable
5.3  Update component references to point to current node IDs
5.4  Verify no stale "state/stock" references (should reference state/success)
```

### Phase 6: Registrar Frame

```
6.1  Every refactored page gets a REGISTRAR frame at the top:
      - Page title and purpose
      - Classification tag: [CHAMPION], [SYSTEM], [SUPPLEMENTAL]
      - Last updated date
      - Binding status: "G1 BOUND" or "PARTIAL — [reason]"
      - Content inventory: number of frames, component sets, specimens
6.2  Registrar frame structure:
      - 2600px wide, auto-layout vertical
      - Background: color/surface/primary
      - Title: H2 style (Plus Jakarta Sans Bold 36px)
      - Metadata: Body Small style (Inter Regular 14px)
      - Status pills: same pattern as BRIDGE registry
```

---

## 4. Execution Priority Order

Execute in this exact order. Each phase completes fully before moving to the next.

### Wave 1: Champion Pages (highest ROI, establishes patterns)
```
Priority  Page                                           ID           Why First
1.1       [CHAMPION] PDP / Purchase Panel System         1167:180     Already partially done, most components
1.2       [CHAMPION] BRIDGE                              1195:7097    24 commerce sets, highest variant count
1.3       [CHAMPION] V02 / PDP / R6-PDP-CORRECTED-V02   777:812      Production PDP specimens
1.4       [CHAMPION] V02 / Homepage / R6-HOMEPAGE-V1     753:812      Production homepage
1.5       [CHAMPION] V02 / OpenLab / R6-OPENLAB-V2       766:815      Production OpenLab
1.6       [CHAMPION] TrustEvidenceSpine — Production V01 644:812      Foundation trust system
1.7       [CHAMPION] R6 V02- Header Stack                1169:4859    Shared navigation
1.8       [CHAMPION] R6 V02- ProductCommerceCard System  1185:4857    Card system workshop
1.9       [CHAMPION] SYSTEM / ProductCommerce Primitives  849:2       Commerce primitives
1.10      [CHAMPION] R6 V02- Brand Logo                  1185:4734    Brand identity
```

### Wave 2: Standalone Functional Pages (triage → refactor or annotate)
```
Priority  Page                    ID           Action
2.1       R6 Lab Reports          702:21328    Triage: contains OpenLab specimens mixed with exploration
2.2       R6 Homepage Hero        702:15540    Triage: may be superseded by Champion homepage
2.3       R6 Checkout             702:21327    Triage: checkout lifecycle excluded from scope
2.4       R6 TRUST AND CURRENCY   712:1311     Triage: may be superseded by TrustEvidenceSpine
```

### Wave 3: System Documentation Boards (R6 00-15)
```
Priority  Page                              ID      Action
3.1       R6 — System Index                 0:1     Update index with current page list and classifications
3.2       R6 System Boards                  1230:10515  Update system overview
3.3       R6 00-15 (14 system boards)       1:2-1:18    Rebind colors, update stale content
3.4       LAYERS 1-3, 6                     1238:*      Verify G1 binding (already tagged)
3.5       R6 — Human Review/Feedback        33:2-33:3   Review gallery cleanup
```

### Wave 4: Annotation Pass (Frontier + Closeout + Supplemental)
```
Priority  Page Set                          Count   Action
4.1       R6 FRONTIER V02 — 00 through 11   11      Add [ANCESTOR · PRE-G1] prefix
4.2       R6 CLOSEOUT V02 — 00 through 10   4       Add [ANCESTOR · PRE-G1] prefix
4.3       [SUPPLEMENTAL] pages              10      Add [PRE-G1] annotation where needed
4.4       [ANCESTOR] pages                  3       Already annotated — verify
```

---

## 5. Example: R6 Lab Reports Page (702:21328) — Current State Analysis

This page is a Tier 6 (Standalone) with 26 top-level frames. It demonstrates the typical mess:

### Problems Identified

1. **Mixed eras**: Contains both early proof-of-concept frames (`LabReports Proof Board / v1`) and later `MAJESTIC / Open Lab` authority screens
2. **Scattered positioning**: Frames span from x:-21386 to x:24850 — a 46,000px horizontal spread
3. **Inconsistent naming**: Mix of `r6-lab-reports` (kebab), `MAJESTIC / Open Lab / ...` (slash hierarchy), and `RUN B / ...` (run-tagged)
4. **No sections**: 26 frames floating freely with no grouping
5. **No registrar**: No page-level status or inventory frame
6. **Probable inline colors**: Pre-G1 era frames likely use hardcoded colors
7. **Mixed authority**: Some frames say "AUTHORITY" but the OpenLab Champion page (766:815) supersedes them

### Recommended Refactoring

```
Action 1: Classify each frame as AUTHORITY, EXPLORATION, or SUPERSEDED
Action 2: Annotate superseded frames (any that duplicate Champion page content)
Action 3: Group remaining into sections:
  - SECTION / OpenLab Portal Screens (authority specimens)
  - SECTION / OpenLab Dossier Templates (product-specific)
  - SECTION / Evidence OS Dashboard (if still relevant)
  - SECTION / Compare & Batch Lookup (RUN B screens)
  - SECTION / Mobile Specimens
  - ARCHIVE / Pre-G1 Exploration (proof board, early sketches)
Action 4: Rebind colors on non-archived frames
Action 5: Add registrar frame
Action 6: Rename page to reflect its actual role, or merge into Champion page
```

---

## 6. Tooling Strategy

### For each refactored page, use this tool sequence:

| Step | Tool | Why |
|---|---|---|
| Audit | `evaluate_script` | Count frames, check bindings, read text |
| Structural | `evaluate_script` | Rename, reposition, create sections |
| Variable binding | `evaluate_script` | Batch `setBoundVariable` calls |
| Typography | `evaluate_script` | Batch `textStyleId` assignments |
| Layout tokens | `evaluate_script` | Set auto-layout + padding/spacing |
| Content text | `evaluate_script` | Update stale text content |
| Complex redesign | `edit_design` | When a frame needs creative recomposition |
| New registrar | `create_design` | Create the standardized registrar frame |
| Verify | `evaluate_script` + screenshot | Visual confirmation |

### Batch Operation Pattern

For variable binding across an entire page, use this pattern:

```javascript
// 1. Collect all nodes with inline fills
const nodes = page.findAll(n => {
  if (!('fills' in n)) return false;
  return n.fills.some(f => f.type === 'SOLID' && !f.boundVariables?.color);
});

// 2. Map inline hex to G1 variable
const colorMap = {
  'FFFFFF': 'VariableID:738:2249', // color/canvas
  '0A0A0B': 'VariableID:738:2253', // color/text/primary
  '0057FF': 'VariableID:738:2257', // color/action/cta
  // ... full map from VARIABLE-REGISTRY.md
};

// 3. Bind
for (const node of nodes) {
  const fills = [...node.fills];
  for (let i = 0; i < fills.length; i++) {
    if (fills[i].type === 'SOLID') {
      const hex = rgbToHex(fills[i].color);
      if (colorMap[hex]) {
        const variable = await figma.variables.getVariableByIdAsync(colorMap[hex]);
        if (variable) node.setBoundVariable('fills', i, variable);
      }
    }
  }
}
```

---

## 7. Quality Gates

After each page refactoring, verify:

- [ ] No inline colors that have a G1 equivalent (allow inline only for documentation-specific colors)
- [ ] All production-authority text nodes use OLUK text styles
- [ ] Consistent naming: `[TYPE] Name / Variant` pattern
- [ ] Registrar frame present with correct metadata
- [ ] No stale counts or status language
- [ ] Frames grouped into sections with consistent spacing
- [ ] Page name reflects classification: `[CHAMPION]`, `[SYSTEM]`, `[SUPPLEMENTAL]`, `[ANCESTOR]`
- [ ] Screenshot of refactored page captured for before/after comparison

---

## 8. What NOT To Do

1. **Never delete historical pages** — annotate with `[ANCESTOR · PRE-G1]` instead
2. **Never force auto-layout on freeform exploration boards** — these are intentionally scattered
3. **Never rebind Supplemental/Review pages** — they're frozen review snapshots
4. **Never change component set variant axes** — only visual properties (fills, text styles)
5. **Never modify component internals on non-Champion pages** — the Champion page owns the source of truth
6. **Never bulk-apply text styles to documentation boards** — documentation uses custom formatting that text styles would break
7. **Never assume a frame is orphaned** — check for instances referencing it first
8. **Never rename a component** — component names are part of the runtime API contract

---

## 9. Estimated Effort

| Wave | Pages | Est. Effort | Approach |
|---|---|---|---|
| Wave 1: Champions | 10 | 3-4 hours | Full refactor, highest quality |
| Wave 2: Standalone | 4 | 1-2 hours | Triage + selective refactor |
| Wave 3: System Boards | 21 | 2-3 hours | Content update + selective rebind |
| Wave 4: Annotation | 28 | 30 min | Prefix rename only |
| **Total** | **63** | **7-10 hours** | |

4 pages (LAYERS already G1-bound) need no action.

---

## 10. Success Criteria

The refactoring is complete when:

1. Every page has a classification prefix in its name
2. Every Champion page is fully G1-bound with OLUK text styles
3. Every page has a registrar frame (except Ancestor/Frontier)
4. No stale counts or status language anywhere in the file
5. The System Index page (0:1) has a current inventory of all 67 pages with classifications
6. All documentation pushed to both GitHub repos
7. Codex can consume the file and find every component, variable, and style at the documented IDs
