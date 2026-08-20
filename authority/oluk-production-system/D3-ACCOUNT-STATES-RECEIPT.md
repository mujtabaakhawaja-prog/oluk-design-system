# D3 account and order-state receipt

Status: `SOURCE_VALIDATED_UNINTEGRATED`

- Design base: `b5a32dc6f6006819d72c791abd2f16c6b4668e1a`
- Missing-state source: `feea650c8623230d6b6558c28d3db3c64e9815b1`
  as `ADAPT_MISSING_STATE_LAW_ONLY`
- Runtime registry: `OLUK_RUNTIME_CONSUMPTION_REGISTRY_V1@1.3.0`

Account surfaces now default to an unauthenticated state and order-detail
surfaces render unavailable until owner-backed state exists. The old MK-2866
order, loyalty points, restock, tracking, and reorder defaults were removed
from `AccountHub`. Customer copy contains no projection, source, provenance,
fixture, or authority language.

Post-purchase aliases no longer invent `OL-10428`. The canonical transaction
surface preserves a supplied public order reference but requires opaque
owner-composed content for every order-bound stage. Without both inputs it
renders the shared unavailable state and exposes no product, total, tracking,
loyalty, payment, or delivery claim. Design does not copy an order wire schema.

The feea650c competing post-purchase layout and its hunk that discarded order
IDs were rejected. Support content, payment behavior, live orders, and runtime
mutation remain untouched. Next account/session and public-order adapters plus
C2 order/payment projections are downstream dependencies.
