# Olympus Labs UK Design-System Agent Contract

## Current authority

Read in this order before changing design, Make or Sites material:

1. `authority/ids-plan.md`
2. `authority/identity-design-system-authoritative-plan-and-build-receipt.md`
3. `authority/surface-contract.md`
4. `authority/oluk-make-philosophy.md`
5. `authority/oluk-pdp-architecture.md`
6. `make-sessions/session-01-product-card/CONSTITUTION.md`
7. `make-sessions/SESSION_ROADMAP.md`
8. the active run's `guidelines.md`, `MANIFEST.md`, `PROMPT.md`, `RUN.md`, `CURRENT-STATE-RECEIPT.md`, and `DECISIONS.md`

The active lane is [`MF-03 Codex Sites Convergence`](make-sessions/session-03-codex-sites/guidelines.md). `MF-01A`, `MF-01B` and `MF-02A` are completed historical design inputs. Their accepted card, surface and composition relationships carry forward; their Make-generated code does not. Sites v2 is formally `REJECTED_VISUAL_TRANSLATION`. Sites v3 is `LOCAL_QA_PASSED / READY_FOR_PRIVATE_REVIEW`; it has not yet been deployed. The current Sites candidate supersedes the older Shopper visual treatment but does not become runtime, evidence, payment, C2, deployment or release authority.

## MF-03 Codex Sites boundary

- Work in `/Users/mujtabakhawaja/Worktrees/oluk-mf-codex-sites-v3-corrections` on `codex/mf-codex-sites-v3-corrections`; the implementation root is `sites/oluk-experience-lab`.
- Treat Figma and Evidence-OS sources as read-only design evidence.
- Treat Final Design node `614:75950` as the current structural source for the corrected homepage hero grid: two left editorial/archive containers, a featured ProductCommerceCard, right-side family cards and the lower report ticker. Its visible values do not become runtime or evidence authority.
- Maintain all 15 routes, including the private `/review` index and its stable review anchors, at 1440/1024/768/390 with zero horizontal overflow.
- Use the approved trust-rail fixture copy and realistic rendered reviews on the customer surfaces. Keep the fixture-versus-runtime distinction in documentation and review control; do not expose backend vocabulary such as `GOVERNED`, `SOURCE-BOUND`, `DESIGN FIXTURE`, `DEMO STATE` or `NOT CONNECTED` in customer UI.
- Preserve the exact customer metric `90 SERVINGS`; `90 CAPS` is rejected.
- The dark footer is the sole inverse surface in this lane. Every other customer surface remains in the light system.
- Publish only to the existing owner-only Codex Sites project after visual QA. The user has approved this private-review action; public/production access is prohibited.
- Do not mutate Shopper SSR, WooCommerce, Initiator/payment behavior or C2. Those require later explicit authority and the appropriate runtime workflow.

## Historical MF-01A hard boundary

Attach exactly these three files and nothing else:

- `make-sessions/session-01-product-card/assets/productcommercecard-productgrid.png`
- `make-sessions/session-01-product-card/assets/horizontal-product-card.png`
- `make-sessions/session-01-product-card/assets/MF01-C-compact-raised-white-purchase-panel-v2.png`

The transparent render and logo libraries are repository authority for later refinement. Their presence in `assets/` does not authorize attaching them to MF-01A.

## Product truth

- Series: `SARM SERIES`
- Product: `MK-2866`
- Alias: `Ostarine`
- SKU: `80529-01`
- Strength: `15 MG`
- Servings: `90 SERVINGS`
- Purity: `>99%`
- Price: `£43`

Never use `90 CAPS` as the metric, decimal pricing, crossed pricing, per-serving pricing, invented evidence, or unapproved performance claims.

## Design laws

- Light mode only for the active lane, with one explicit exception: the dark footer is the sole inverse surface. MENT, dark pages and any second broad inverse surface are deferred.
- Cool luminous canvas; never cream, beige, blanket grey, broad inverse, or Tailwind-grey leakage.
- Media chambers are bounded authored product environments outside PDP Section 1. They do not become section backgrounds.
- Raised white content/purchase planes may use restrained cool elevation.
- Canvas separates independent objects; a transparent embedded divider connects chamber and purchase content inside one card.
- ProductMetricRail is quantified truth. Do not restyle it as generic pills.
- ProductCommerceCard has no cobalt outer outline or decorative top-edge eyebrow.
- Cobalt belongs primarily to the product, metrics, actions, selected states, icons, and meaningful relational marks.
- Plus Jakarta Sans leads editorial/display work. Inter is the only supporting/UI typeface. Barlow Condensed, Archivo, Cousine, and Inter Variable are rejected.
- Minimum customer body copy is 15–16 px; metadata/eyebrows are at least 12 px.

## Make versus runtime

Make designs static customer-facing compositions first. Local visual interaction may follow after human selection. Do not introduce production callbacks, APIs, inventory ownership, cart/payment plumbing, routing architecture, telemetry, loading/error infrastructure, React, or Code Connect in MF-01A or MF-01B.

Make-generated code is disposable prototype machinery. It never becomes runtime authority.

## Change discipline

- Preserve historical files unless a task explicitly authorizes deletion. Mark them historical rather than silently reactivating them.
- Do not publish Figma variables or promote a foundation mode before the Make Design Gate and System Gate.
- Do not treat filenames, “champion” labels, or repeated legacy patterns as authority.
- Keep secrets and PII out of the repository.
- Preserve the business invariant that no runtime discount may exceed 25%; the MF-01A/MF-01B lanes do not design discounting.

## Git and review

- Branches: `codex/{feature}`.
- Commits: `feat|fix|chore(scope): message`.
- Every PR includes Status, Notes, Risks, Checklist, validation performed, and rollback.
- Stage only task files. Never delete or overwrite unrelated user work.

## Historical MF-01A definition of done

- Three materially distinct design directions.
- Each direction is a coherent family, not a palette swap.
- Each direction proves vertical ProductGrid, compact rail/QuickAdd, horizontal related/upsell, and a derived Featured context.
- Exact product truth is preserved.
- No comparison-board aesthetic, runtime language, native-node tracing, or system-documentation UI.
- Human records selected relationships for MF-01B. No native nodes enter before the transfer test passes and MF-02 begins.

## Historical MF-01B transfer boundary

- MF-01B starts only after the MF-01A relationship selection is recorded.
- It tests transfer into four bounded customer-facing fragments: homepage entry, PDP Section 1, embedded evidence, and true canvas-split evidence/rail.
- G0 and selected route/evidence relationships may enter MF-01B only as explicitly curated flattened PNGs.
- Native Figma nodes first enter in MF-02.
- MF-01B does not build full routes, publish tokens, formalize a design-system library, or introduce runtime behavior.
