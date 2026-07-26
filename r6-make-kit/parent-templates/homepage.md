# Homepage Parent Template

## Locked Layout
```
Hero
  └── RangeHeroCTA (1420:899)
↓
Commerce / Featured Controller
  └── ProductCommerceCard variants
↓
Category
  └── Category cards
↓
Grid
  └── ProductGrid (ProductCommerceCard 1193:4504)
↓
Trust
  └── TrustEvidenceSpine (682:3187)
↓
OpenLab Evidence
  └── Evidence strip
↓
Footer
```

## Insertion Zones
| Module              | Zone Type   |
|---------------------|-------------|
| Hero                | LOCKED      |
| Featured Controller | REPLACEABLE |
| Category Discovery  | LOCKED      |
| Product Grid        | EDITABLE    |
| Trust               | LOCKED      |
| OpenLab Evidence    | EDITABLE    |
| Footer              | LOCKED      |

Make may evolve one module at a time. Adjacent modules remain locked.

## Runtime File
`apps/olympus-shopper-ui/src/components/home/VariantHeroEV4Homepage.tsx`

## Route
`/` (homepage)
