# PDP Parent Template

## Locked Layout
```
Gallery / MediaStage
  └── Product media (featured context, stage mode)
↓
Identity
  └── CompoundIdentity (compound → alias → classification)
↓
Metrics
  └── MetricRail (dosage / capsules / purity)
↓
Evidence
  └── TrustEvidenceSpine (682:3187, full variant)
↓
Purchase
  └── PurchasePanel (price + selector + CTA)
↓
Related
  └── Related Products Treatment C (1193:5532)
↓
Footer
```

## Insertion Zones
| Module           | Zone Type   |
|------------------|-------------|
| Gallery          | LOCKED      |
| Identity         | LOCKED      |
| Metrics          | EDITABLE    |
| Evidence         | LOCKED      |
| Purchase Panel   | EDITABLE    |
| Related Products | REPLACEABLE |
| Footer           | LOCKED      |

Make may evolve one module at a time.

## Runtime File
`apps/olympus-shopper-ui/src/components/commerce/MajesticCommerce.tsx`

## Route
`/product/:slug` (PDP)
