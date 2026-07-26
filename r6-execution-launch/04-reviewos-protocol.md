# ReviewOS Runtime Acceptance Protocol

ReviewOS is a post-implementation human gate. Before implementation, the gate is:

```text
MAKE_RESULT
+ FIGMA_AGENT_CHAMPION_RECEIPT
+ HUMAN_PROMOTION_RECEIPT
```

## Round 1 — ReviewOS forward-integration acceptance

```text
Title:
ReviewOS Forward Integration Acceptance

Base:
dacfb0f2472b7888dd64f9d642867ad91b1a4b77

Candidate:
codex/r6-reviewos-forward-integration
0c35d6f46068daf5a12e1134d7f5244f7de22b0d

Coverage:
Homepage
MK-2866 PDP
RAD-140 PDP
OpenLab Portal
Checkout Review
Confirmation

Themes:
Light / Dark

Viewports:
1440 / 1024 / 390
```

### Accept

- ReviewOS works against distinct base and candidate runtimes.
- The server owns human decisions and evidence receipts.
- Newer systemization remains intact.
- ReviewOS is local-only and absent from public runtime.
- Commerce mutations remain HTTP `423`.
- The 36-surface inventory and 60 representative browser cells remain intact.

### Revise

- ReviewOS works, but one or more current surfaces or systemization contracts regress.

### Reject

- An older visual baseline replaces newer runtime authority.
- Unpromoted visual work enters the integration.
- ReviewOS becomes publicly reachable.
- Browser state can fabricate approval or evidence.
- Same-origin, loopback-only, local-write, Tools, or HTTP `423` boundaries weaken.

Screen-capture permission may require the human reviewer to choose the browser tab.
Do not treat the browser permission chooser as an endpoint failure and do not bypass it.

## Round 2+ — Promoted component acceptance

For each promoted component, create a separate session containing:

- exact Figma node;
- Make receipt;
- Agent recommendation;
- human promotion receipt;
- runtime branch and SHA;
- parent template and insertion zone;
- required theme/viewport/state cells;
- before/after evidence;
- Accept / Revise / Reject.

An accepted ReviewOS session authorizes closure of the candidate branch. It does
not authorize production deployment.

## Human promotion receipt

```text
HUMAN_PROMOTION_RECEIPT

Context:
Figma champion node:
Parent template:
Insertion zone:

Decision:
[ ] PROMOTE TO RUNTIME CANDIDATE
[ ] RETURN TO MAKE
[ ] REJECT

Preserve:
-

Required change:
-

Runtime coverage:
- 1440 Light/Dark
- 1024 Light/Dark
- 390 Light/Dark
- required states

Implementation authority:
Codex may implement this candidate only.

Production approval:
NOT GRANTED
```
