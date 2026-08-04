# Operator Run Order

This is the only sequence the human operator needs.

## 1. Freeze the overlapping Codex lane now

Send the freeze/handoff block in `03-codex-prompt.md` to session
`019f9c8f-c368-7c51-9275-f8ecda9dd2bf`.

## 2. Review PR #1007

Open:

```text
http://127.0.0.1:4475/__design-system/review
```

Run the integration session in `04-reviewos-protocol.md`.
Do not merge yet.

## 3. Start Figma Agent now

Paste `01-figma-agent-prompt.md`.

Expected terminal receipt:

```text
READY_FOR_MAKE
R6_MAKE_ALLOWLIST_V1
PRODUCT_SURFACE_LAB_RUN_01A_BRIEF
```

## 4. Start Figma Make Run 01A

After `READY_FOR_MAKE`, create:

```text
Olympus R6 Product Surface Laboratory — Run 01
```

Paste the common contract and Run 01A from `02-figma-make-prompt.md`.

## 5. Review and promote

Paste `05-champion-review-prompt.md` to the Figma Design Agent.

If it returns `RECOMMEND_CHAMPION`, complete the human receipt in
`04-reviewos-protocol.md`.

## 6. Implement one context

Send Codex:

```text
Implement only the promoted context represented by the attached MAKE_RESULT,
FIGMA_AGENT_CHAMPION_RECEIPT, and HUMAN_PROMOTION_RECEIPT.

Branch:
codex/{context-kebab-case}

Return:
PLAN
DIFF SUMMARY
TESTS
TELEMETRY
DOCS
RISK/ROLLBACK
NEXT COMMANDS

Do not merge or deploy.
```

## 7. Review in Runtime Studio

Use the promoted-component protocol in `04-reviewos-protocol.md`.

## 8. Continue the Product Surface Lab

Only after the prior bounded run has an Agent disposition:

```text
01B QuickAdd
01C Featured Controller
01D PDP PurchasePanel
01E LabReportPanel
01F Fold-Out Dossier
01G Related Products
```

Codex may implement approved contexts independently, but never without the three
promotion receipts.

## 9. Begin Sprint 2

Start Semantic Surface Laboratory only after at least one Product Surface component
has completed:

```text
Make → Agent → Human → Codex → Runtime Studio → ReviewOS Accept
```
