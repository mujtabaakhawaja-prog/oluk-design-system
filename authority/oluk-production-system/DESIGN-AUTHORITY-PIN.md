# OLUK production design authority pin

Status: `WAVE_0_REFERENCE_PINNED`

## Authority

The production OLUK runtime-derived light system is the authority for customer-facing behavior. Design consumes the provider-neutral runtime contract; it does not restate, translate, infer, or own commerce, shipping, lifecycle, order, media, or OPENLAB data.

The only runtime contract referenced by this Wave 0 Design lane is:

- contract ID: `OLUK_RUNTIME_CONSUMPTION_REGISTRY_V1`
- contract version: `1.3.0`
- field references: opaque provider-neutral IDs recorded in `DESIGN-REQUIREMENTS-LEDGER.json`

`DESIGN-REQUIREMENTS-LEDGER.json` defines presentation obligations only. `schemas/design-requirements-ledger.schema.json` validates the shape of those obligations. Neither artifact is an executable projection, a wire schema, a value registry, or runtime authority.

## Source pins

| Source | Exact pin | Role |
| --- | --- | --- |
| Programme amendment | `b6f8e9e6bbddede159b0d8ee4d999ac5d7fce1bfff5ad4cc18774748c9addb46` | Governs the provider-neutral direct-tools authority correction. |
| Production runtime contract | `4a68247beb9ea34ed8a138fea99149365d90d54324848f09ffaa21122fb9d507` | C2 registry `1.3.0`; owns field meaning, values, allowed states, mutation, and lifecycle behavior. |
| Legacy disposition registry | `d11a68512b2ef9797f7312e2050680cd48356d0358c7db3e0da4495dfc5605b2` | Classifies historical and compatibility material without granting it authority. |
| Continuation queue | `8e3e3277d9ecc860735723f295907604e0c5883ef841d1ed9f27f610db51b1c6` | Pins the integration champion's owner/repository queue without transferring runtime authority to Design. |
| Canonical route registry | `23dea181163af0e5f81db7580b9b59fc2762f4ea0fae1b18d144095644f33576` | References the 74-route Next contract for applicability only; Design does not copy or own the route registry. |

These SHA-256 pins are immutable content digests. Design remains a reference consumer of the runtime field contract and cannot promote itself into runtime or commerce authority.

## Consumption laws

1. A Design requirement may reference only the contract ID, contract version, and provider-neutral field IDs. It must not copy a runtime field type, enum, constraint, example, default, source value, or transformation rule.
2. Missing-field behavior is fail-closed presentation behavior. Design must not synthesize a replacement value, derive one from another field, or substitute historical fixture truth.
3. `componentOwner` owns component composition, states, reflow, and accessibility. It does not own runtime data or mutation.
4. Commerce and checkout mutation remain outside Design. A presentation requirement cannot authorize cart, shipping, order, payment, or provider calls.
5. OPENLAB remains source-owned. Design may render only the referenced projection fields and must not infer evidence, report identity, analytes, results, units, or document relationships.
6. Provider identity is intentionally absent. Design must not branch, label, style, or expose behavior by payment or service provider.

## Current evidence posture

Codex Sites and historical Figma material are evidence/reference only. Figma is not a current construction surface, runtime source, approval gate, or promotion gate for this programme. No Figma, Sites, styling, or runtime implementation is authorized by this pin.

## Validation

This Design successor preserves the locked Option B Premium identity. It does not reopen identity selection or create a Figma construction or acceptance gate.

This Design lane is structurally ready when:

- the ledger validates against its JSON Schema;
- every field reference names `OLUK_RUNTIME_CONSUMPTION_REGISTRY_V1` version `1.3.0` through its enclosing requirement;
- every field reference declares `required` or `optional` and a fail-closed missing behavior;
- every seeded requirement records variants, presentation states, responsive obligations, accessibility obligations, forbidden behavior, and a component owner;
- all five source pins match their owner-repository files exactly.
