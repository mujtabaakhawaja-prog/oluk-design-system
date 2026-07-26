# OpenLab Parent Template

## Locked Layout
```
Header
  └── OpenLab navigation
↓
Evidence
  └── Lab report summary
↓
Dossier
  └── Fold-out dossier (detailed analysis)
↓
Archive
  └── Report archive list
↓
Compare
  └── Side-by-side report comparison
↓
Footer
```

## Insertion Zones
| Module   | Zone Type   |
|----------|-------------|
| Header   | LOCKED      |
| Evidence | EDITABLE    |
| Dossier  | REPLACEABLE |
| Archive  | EDITABLE    |
| Compare  | REPLACEABLE |
| Footer   | LOCKED      |

Make may evolve one module at a time. Focus on storytelling and presentation quality.

## Runtime File
`apps/olympus-shopper-ui/src/pages/openlab/OpenLabReportArchivePage.tsx`

## Route
`/openlab` (OpenLab portal)
