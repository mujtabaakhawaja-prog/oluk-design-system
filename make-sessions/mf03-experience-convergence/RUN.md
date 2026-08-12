# MF-03+ — Execution and change-tracking runbook

## Start

1. Read the required manifest order.
2. Resolve the target run and confirm its entry gate.
3. Copy the three required prompt blocks from `PROMPT.md`.
4. Record the inherited decision IDs and artifact IDs before changing anything.
5. Create a run-local receipt with `PLAN`, `INHERITED`, `DELTA`, `DO_NOT_INHERIT`, `CHANGES`, `VALIDATION`, `OPEN`, `ROLLBACK`.

## Change protocol

Every material change is one of:

- `INHERITED_NO_CHANGE` — champion state carried forward;
- `RUN_DELTA` — expected work for this run;
- `CORRECTION` — source defect fixed without changing the champion relationship;
- `PROPOSAL` — new choice awaiting human decision;
- `SUPERSESSION` — a new champion decision that names the earlier decision ID;
- `REJECTED_SOURCE_VALUE` — raw board value deliberately excluded.

Never silently overwrite a decision. Add a new event to `authority/DECISION-LEDGER.json` only when the champion user has actually decided. Agent suggestions remain `PROPOSED_NON_CONTROLLING` in the run receipt.

## Three-system synchronization

Use the repository as the control plane:

| System | Write | Required receipt |
|---|---|---|
| Figma | candidate variables/styles/components/pages and a visible review gate | exact file/page/node IDs, source derivation, publication state |
| Repository | append-only decisions, current snapshot, artifact registry, run docs | commit SHA and changed paths |
| Codex Sites | private candidate routes/components only when the run authorizes them | exact source commit, route list, validation and access state |

Order of operations:

1. update or confirm the decision ledger;
2. build or reconcile Figma sources;
3. update the artifact registry with exact node IDs;
4. implement the bounded Sites delta;
5. validate;
6. update `CURRENT-STATE.json` and the run receipt;
7. present the candidate for human approval;
8. only after approval, append a promotion/supersession event and advance the queue.

## Validation

- Product string scan: `90 SERVINGS` present; `90 CAPS` appears only in rejection/provenance documentation.
- Component provenance: page candidates are instances of registered canonical sources unless a documented exception exists.
- Variable provenance: new nodes bind only to active convergence collections.
- Visual: no clipping/overlap at 1440/1024/768/390; no hidden overflow used as proof.
- Surface: footer is the only inverse customer surface.
- Shadow: each commerce component matches its approved single-shadow class.
- Content: no fabricated evidence or exposed governance labels.
- State: produced artifacts visibly say `CANDIDATE · HUMAN_REVIEW_REQUIRED` in review context and remain unpublished.
- Runtime: no implicit API, inventory, payment, C2 or release claim.

## Failure routing

| Failure | Action |
|---|---|
| later board contradicts MF-01A law | reject the board-local value and record `REJECTED_SOURCE_VALUE` |
| product/data conflict | exact product truth and latest champion decision control |
| missing canonical source | stop that composition; register a bounded component correction instead of redrawing locally |
| a new aesthetic choice is needed | mark `PROPOSED_NON_CONTROLLING`; request human review |
| Figma publication/Code Connect/runtime dependency | stop; route to MF++ after MF-10 and explicit authority |

## Rollback

Rollback is additive and scoped: revert the run's candidate nodes/files/routes or commit. Never delete historical Figma nodes, archived variables, ledger events, Make records or prior receipts.
