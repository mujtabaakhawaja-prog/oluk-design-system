# Account / Post-Purchase Parent Template

## Locked Layout
```
Profile
  └── Account information
↓
Orders
  └── Order history list
↓
Settings
  └── Account settings
↓
Footer
```

## Insertion Zones
| Module   | Zone Type |
|----------|-----------|
| Profile  | EDITABLE  |
| Orders   | EDITABLE  |
| Settings | LOCKED    |
| Footer   | LOCKED    |

## Runtime Route
`/account`

## Security Constraints
- No PII exposure in design explorations
- No payment data in fixtures
