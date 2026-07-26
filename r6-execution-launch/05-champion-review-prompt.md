# Figma Design Agent — Champion Review Prompt

Paste after each bounded Make run returns.

```text
PRODUCT SURFACE LABORATORY — CANDIDATE REVIEW

Review the completed bounded run against:
- R6_MAKE_ALLOWLIST_V1;
- R6 Design System Connector;
- Olympus Design Workspace;
- governed fixture files;
- parent template;
- runtime composition tree;
- MAKE_RESULT.

Evaluate:
1. published authority compliance;
2. product/evidence hierarchy;
3. Light/Dark parity;
4. responsive projection;
5. state completeness;
6. fixture truth and null handling;
7. accessibility and 44px targets;
8. insertion-zone compliance;
9. absence of A01/Majestic/deprecated language;
10. implementation feasibility without redesign.

Return exactly one:
- RECOMMEND_CHAMPION
- RECOMMEND_REVISION
- NO_ACCEPTABLE_CANDIDATE

For RECOMMEND_CHAMPION return:
{
  "context": "",
  "championNodeId": "",
  "runnerUpNodeId": "",
  "rejectedNodeIds": [],
  "publishedComponents": [],
  "semanticVariables": [],
  "fixtureIds": [],
  "runtimeParent": "",
  "insertionZone": "",
  "preserve": [],
  "implementationNotes": [],
  "knownRisks": [],
  "requiredReviewCells": [],
  "status": "recommended-for-human-promotion"
}

Do not edit candidates during review.
Do not implement code.
Do not promote without human confirmation.
```

