# MF-03 — Codex Sites Convergence Runbook

**Mode:** How-to guide
**Status:** Active

## Expected result

A build-clean, responsive experience lab at `sites/oluk-experience-lab`, published only to a private Codex Sites review URL. No runtime, payment, C2, Figma or production mutation is part of this run.

## 1. Preflight

1. Confirm the worktree is `/Users/mujtabakhawaja/Worktrees/oluk-mf-codex-sites-convergence` on `codex/mf-codex-sites-convergence` and is based on the recorded `origin/main` revision.
2. Read `AGENTS.md`, the repository authority chain and all files in this session directory.
3. Confirm `MANIFEST.md` contains the current route, asset and mutation allowlists.
4. Confirm the persistent design-fixture notice and data-class rules are represented in the implementation plan.
5. Treat Figma and Evidence-OS sources as read-only.

## 2. Build order

### Milestone 0 — Shared system and shell

- establish the cool canvas, typography, cobalt authority, plane/chamber/elevation rules and responsive containers;
- build the three-level header and quiet light footer;
- add global fixture labelling and reusable source-bound states;
- establish route-aware OpenLab secondary navigation.

### Milestone 1 — First OpenLab review

Build in this order:

1. Lab Records archive;
2. individual source-bound record.

Verify that the archive uses editorial plus ledger/card relationships, the record has a source/viewer slot, and neither route invents report content.

### Milestone 2 — OpenLab family

Build:

1. portal;
2. MK-2866 dossier;
3. batch lookup;
4. methodology;
5. source chain;
6. compare;
7. EvidenceOS overview.

Keep the flow influence from Evidence-OS while replacing dark technical shells, fixed-width mobile columns and synthetic proof data.

### Milestone 3 — Commerce family

Build:

1. homepage;
2. shop/catalogue;
3. MK-2866 PDP;
4. reviews route and embedded review states;
5. About route.

Apply the MF-02A champion corrections to the hero, grid, dossier and adaptive related rail. Keep the PDP order from `MANIFEST.md` and `PROMPT.md`.

## 3. Acceptance matrix

Review every route at `1440`, `1024`, `768` and `390` px against this matrix:

| Area | Pass condition |
|---|---|
| Route | Resolves without a missing-page or client/server error |
| Width | No horizontal page overflow or clipped fixed-width composition |
| Shell | Primary navigation remains understandable and Lab Records stays prominent |
| Type | Body and metadata floors remain readable |
| Commerce | Cards preserve chamber, identity, metrics, status, price and action hierarchy |
| Dossier | Facts, media and composition retain semantic order through reflow |
| Records | Tables become readable compact records before columns collapse |
| Evidence | Missing source truth is explicit; no invented report, chart or batch value |
| Reviews | Fixture state is unmistakable; empty/loading/unavailable states are present |
| Authority | Design/review candidate never claims runtime or production status |

## 4. Build verification

From `sites/oluk-experience-lab`:

```bash
npm run build
```

Treat a successful build as implementation evidence only. It does not prove responsive quality, source truth, runtime parity or deployment status.

Record the exact result and any remaining uncertainty in `CURRENT-STATE-RECEIPT.md`.

## 5. Private preview gate

1. Use the Codex Sites hosting workflow only after the build passes.
2. Select private review visibility.
3. Record the exact private review URL and hosting result in the receipt.
4. Do not publish publicly, connect a production domain or promote the result into Shopper SSR.
5. Stop for human review after each accepted milestone or after a cumulative review build when the implementation was completed as one bounded pass.

## 6. Failure routing

| Failure | Route to |
|---|---|
| Visual hierarchy or composition | MF-03 Sites design lane |
| Incorrect product truth | Repository authority and human decision record |
| Missing evidence or report source | Source-bound content owner; do not fabricate |
| Responsive overflow | Shared CSS/layout owner, then recheck all routes |
| Build failure | Sites implementation owner |
| Basket, payment, Woo or C2 dependency | Stop; later Champion/Initiator/C2 stage requires explicit authorization |
| Public deployment request | Stop; current gate authorizes private review only |

## 7. Rollback

The lane is isolated in its own worktree and branch. If the candidate is rejected, preserve the session documents and review evidence, then revert or supersede only the bounded Sites changes. Do not rewrite MF-01/MF-02 history or use runtime changes as a rollback mechanism.
