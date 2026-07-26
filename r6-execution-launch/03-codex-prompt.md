# Lane A — Codex ReviewOS Integrity Correction and Duplicate-Lane Reconciliation

PR #1007 is the sole submitted ReviewOS forward-integration candidate.

Verified:

```text
Base:
dacfb0f2472b7888dd64f9d642867ad91b1a4b77

Branch:
codex/r6-reviewos-forward-integration

Submitted head:
0c35d6f46068daf5a12e1134d7f5244f7de22b0d

Draft PR:
https://github.com/mujtabaakhawaja-prog/olympus-plugin-initiator/pull/1007

Runtime used for submitted proof:
http://127.0.0.1:4475/__design-system/review

Current disposition:
REVISE_REQUIRED
```

Do not reconstruct the integration. Do not open a second PR. Do not add ReviewOS
features.

## Proven acceptance gap in the submitted head

At `0c35d6f46068daf5a12e1134d7f5244f7de22b0d`:

- the browser stages `approval.decision`, `approval.decidedAt`, and
  `approval.reviewer`;
- `POST /__reviewos/api/session` persists the entire client-composed session;
- `POST /__reviewos/api/evidence` persists client-supplied images and path metadata
  without returning/storing server-issued SHA-256 hashes, byte lengths, and capture
  metadata.

The existing string-based verifier does not prove server authority. Human acceptance
must wait for the bounded correction below.

## Send to the still-running overlapping Codex session

```text
FREEZE FEATURE WORK AND HAND OFF TO PR #1007.

PR #1007 is the sole ReviewOS forward-integration candidate:
codex/r6-reviewos-forward-integration
0c35d6f46068daf5a12e1134d7f5244f7de22b0d

Do not open another PR. Do not merge or deploy. Do not include unpromoted Featured
Controller work. Do not add ReviewOS features.

Return immediately:
- worktree;
- branch;
- base SHA;
- head SHA;
- git status;
- commits created;
- changed files;
- tests run;
- runtime processes/ports to preserve;
- a focused diff or commit list for any server-authoritative decision/evidence work.

If your current work already closes the following two gaps, finish only to a clean,
committed, tested handoff boundary:
1. The server must create/overwrite the authoritative decision receipt, including
   decision, decidedAt, reviewer, and a stable receipt ID. A client-posted approval
   object must never become authority unchanged.
2. The server must hash persisted evidence and record SHA-256, byte length, capture
   time, media type, and verified artifact path in the stored session/receipt.

Add negative tests proving a forged client approval and forged evidence metadata are
ignored, overwritten, or rejected. Preserve local-only mode, same-origin framing,
HTTP 423, public-runtime exclusion, the 36-surface inventory, and all newer
systemization.

Then stop. Do not mutate PR #1007 yourself unless its owner explicitly adopts your
bounded commit/diff.
```

## Sole correction path for PR #1007

After the overlapping session returns:

1. Compare its bounded diff with the submitted PR head.
2. Adopt only the server-authority correction into
   `codex/r6-reviewos-forward-integration`.
3. Do not adopt visual changes, new capabilities, unrelated refactors, or runtime
   process changes.
4. Add/extend deterministic verification for:
   - client-forged approval is not authoritative;
   - server-stamped decision receipt readback;
   - evidence SHA-256/byte-length/capture metadata readback;
   - evidence file hash matches the stored receipt;
   - archive/restore cannot rewrite the decision receipt;
   - existing local-only, public-boundary, same-origin, HTTP 423, runtime inventory,
     and build checks remain green.
5. Push the corrected PR #1007 head and restart the isolated candidate from that
   exact head.
6. Create the acceptance session defined in `04-reviewos-protocol.md`.

Decision:

- `ACCEPT` — leave PR held until explicit merge approval.
- `REVISE` — return exact findings to the PR #1007 branch only.
- `REJECT` — close the PR without deleting either source branch.

## After human acceptance

Freeze ReviewOS. Codex enters champion-only implementation mode and requires:

```text
MAKE_RESULT
+ FIGMA_AGENT_CHAMPION_RECEIPT
+ HUMAN_PROMOTION_RECEIPT
```

No merge, deployment, or production promotion is authorized by this file.
