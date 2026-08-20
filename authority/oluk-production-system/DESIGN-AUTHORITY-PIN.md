# OLUK production design authority pin

Status: `WAVE_0_REFERENCE_PINNED`

## Authority

The production OLUK runtime-derived light system is the authority for customer-facing behavior. Design consumes the provider-neutral runtime contract; it does not restate, translate, infer, or own commerce, shipping, lifecycle, order, media, or OPENLAB data.

The only runtime contract referenced by this Wave 0 Design lane is:

- contract ID: `OLUK_RUNTIME_CONSUMPTION_REGISTRY_V1`
- contract version: `1.0.0`
- field references: opaque provider-neutral IDs recorded in `DESIGN-REQUIREMENTS-LEDGER.json`

`DESIGN-REQUIREMENTS-LEDGER.json` defines presentation obligations only. `schemas/design-requirements-ledger.schema.json` validates the shape of those obligations. Neither artifact is an executable projection, a wire schema, a value registry, or runtime authority.

## Source pins

| Source | Exact pin | Role |
| --- | --- | --- |
| Programme amendment | `f33b2713377160b46b84151dd52f71415393d341ebcf452b6e7c316a5e192ca0` | Governs the provider-neutral Wave 0 authority correction. |
| Production runtime contract | `7aa1f4cfc02d441d672626067ab65979c3c7184f73dfe545322e43e14899154c` | Owns field meaning, values, allowed states, mutation, and lifecycle behavior. |
| Legacy disposition registry | `ece13e6003a615caed395186f9ce547a7d06bf17bc607eead48f40d760c29458` | Classifies historical and compatibility material without granting it authority. |

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

Wave 0 Design is structurally ready when:

- the ledger validates against its JSON Schema;
- every field reference names `OLUK_RUNTIME_CONSUMPTION_REGISTRY_V1` version `1.0.0` through its enclosing requirement;
- every field reference declares `required` or `optional` and a fail-closed missing behavior;
- every seeded requirement records variants, presentation states, responsive obligations, accessibility obligations, forbidden behavior, and a component owner;
- all three source pins match their owner-repository files exactly.
