# CONV-003 repository-owned Figma code bridge

**Date:** 2026-08-12  
**Status:** `CANDIDATE_REPOSITORY_MAPPING_VERIFIED · HUMAN_REVIEW_REQUIRED · UNPUBLISHED`  
**Figma registry authority:** `BEPMuUt1HroEw8xjz8CVyN · 911:2629`  
**Official Code Connect:** `NOT_INVOKED`
**Repository implementation:** `67a43c93da22b5125a379d541a6444aecfa83ebf`

## Outcome

`authority/FIGMA-CODE-BRIDGE.json` is the deterministic mapping authority for the private candidate. It resolves the live CC-BRIDGE board against the actual repository rather than trusting the board's pseudo paths or historical route spellings.

The registry connects 15 exact Figma component nodes to:

- an existing React module and named export;
- the exported props type and complete prop-key inventory;
- fixed prop/variant values where one React family implements several Figma sets;
- known customer candidate routes;
- the governed CSS token dependencies; and
- exact variant-node or downstream-instance provenance where applicable.

The typed projection in `sites/oluk-experience-lab/app/design-system/figma-code-bridge.ts` makes `tsc` fail when a mapped prop contract changes without updating the bridge. The executable proof additionally checks files, named exports, props types, variant metadata, routes, tokens, assets, uppercase chip-label rendering and public-resource determinism.

The Figma registry copy was corrected in place and eight unpublished, artifact-specific visual review boards were added on Page 23. Those bounded documentation writes are recorded by the bridge; they are not Code Connect mappings, publication, promotion or runtime mutation.

## Board corrections resolved by execution

- `components/ProductCommerceCard.tsx` resolves to `sites/oluk-experience-lab/app/design-system/product-commerce-card.tsx`.
- `components/QualitativeChip.tsx` resolves to `sites/oluk-experience-lab/app/design-system/qualitative-chip.tsx`.
- `components/QualitativeIcon.tsx` resolves to the new exact export at `sites/oluk-experience-lab/app/design-system/qualitative-icon.tsx`.
- `/products/:slug` resolves to `/product/mk-2866`.
- `/openlab` resolves to `/open-lab`.
- `/products/:slug/dossier` resolves to `/open-lab/dossier/mk-2866`.
- `/compare` resolves to `/open-lab/compare`.
- `/discover` resolves to the existing `/shop?goal=:goal` facet contract; no route was invented.
- `/products/:slug/record` resolves to `/open-lab/records/source-bound-record`.
- Figma Featured desktop variant `743:282` and actual Shop instance `765:98` are both explicit in the executable mapping.

## Artifact-specific review surfaces

- Homepage parity: `921:2675`
- Shop parity: `921:2682`
- PDP parity: `921:2689`
- OpenLab parity: `921:2696`
- Evidence lifecycle: `921:2703`
- Static transactions: `921:2710`
- Supporting routes: `921:2717`
- Native canonical states: `921:2724`

`881:2675` and `888:304` remain execution/control receipts. They are not substituted for the visual review surfaces above.

## Read-only ingestion

Consumers can read either identical JSON resource:

1. Repository authority: `authority/FIGMA-CODE-BRIDGE.json`.
2. Candidate static resource: `/.well-known/oluk-figma-code-bridge.json`, sourced from `sites/oluk-experience-lab/public/.well-known/oluk-figma-code-bridge.json`.

The static resource is suitable as input to Codex, an MCP resource handler, an SSR component-inventory loader or a later FastAPI adapter. This pass does not host such an adapter and adds no client or server network callback.

Regenerate and verify locally:

```sh
npm run inventory:generate
npm run proof:code-bridge
```

Validation at the implementation commit: `201/201` bridge checks, `41/41` integrated tests, typecheck, lint, 31-route build and the aggregate contract proof all pass.

## Deliberately unresolved components

`ProductTabs`, `SiteHeader`, `TrustRail` and `SiteFooter` remain listed as unmapped candidates because the current repository has no exact standalone exported React component for those Figma nodes. The bridge does not invent a false mapping. A later componentization delta can add them and must update both the registry and executable proof.

## Gate

This bridge does not call `add_code_connect_map`, create `.figma.tsx` files, publish a Figma library, deploy a service, mutate runtime ownership or activate Code Connect. The only Figma writes in this pass corrected registry copy and created unpublished visual-review boards. It is repository-governed context only. Official mapping, hosting and runtime use remain blocked behind MF-10 champion approval and separately authorized MF++ work.
