# OpenLab Module Wave

Status: `IMPLEMENTED_VERIFIED_HUMAN_REVIEW_REQUIRED_UNPUBLISHED`

## Plan

Convert the settled OpenLab Figma intent into reusable Sites sections before expanding the later P2/P3 route family. Preserve `/open-lab` as the only canonical namespace and keep `/open-lab/admin` owner-only and noindex without claiming authentication.

## Inherited

- Light-mode CONV-004 design contract.
- Approved Olympus/OpenLab content and trust language.
- Product truth and canonical commerce modules.
- Existing field-level OpenLab projection types and exact-only arithmetic.
- Fail-closed lookup and explicit unavailable states.

## Delta

Added ten registered OpenLab section modules:

1. `OpenLabPortalHero`
2. `OpenLabWayfinding`
3. `EvidenceRecordExplainer`
4. `OpenLabRegistryArchive`
5. `OpenLabRecordDetail`
6. `OpenLabDossierComposition`
7. `OpenLabMethodologyPipeline`
8. `OpenLabSourceChain`
9. `OpenLabComparison`
10. `OpenLabUnavailableBoundary`

The dynamic compound/report routes continue to use the canonical `ReportIdentityHeader`, `AnalyteTable`, `CustodyTimeline` and `UnavailableEvidencePanel` components. The Review Studio evidence gallery now renders the canonical OpenLab sections rather than review-only redraws.

The modular Figma packet is normalized from `/shop/:slug` to `/product/:slug` and records `/open-lab/admin` as an owner-only/noindex Sites specimen with identity deferred.

## Validation

- Production build: PASS, 41 physical routes.
- Node tests: PASS, 75/75.
- OpenLab four-width matrix: PASS, 44/44 across 11 representative routes at 1440/1024/768/390.
- OpenLab accessibility smoke: PASS, 22/22 at 1440/390.
- Mobile compaction: PASS, 15/15 family-route cases; one informational scroll-depth warning.
- Governed contract, tokens, CSS colour, provenance, bridge and visual-baseline metadata: PASS.
- Client CSS budget: PASS after obsolete route-local OpenLab CSS was removed.

Bounded browser evidence is stored outside the repository at `/tmp/oluk-openlab-wave.AYcU55`. These captures remain machine evidence and are not promoted to champion-approved baselines.

## Open

Later P2/P3 OpenLab routes remain explicitly deferred in `authority/OPENLAB-SECTION-MODULE-REGISTRY.json`. They are not represented as complete scaffolds by this wave.

## Runtime boundary

No Figma publication, authentication implementation, hosting, Shopper deployment, Tools mutation, Woo mutation, evidence mutation or payment integration occurred.
