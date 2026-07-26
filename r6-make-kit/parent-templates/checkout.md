# Checkout Parent Template

## Locked Layout
```
Summary
  └── Order summary with product cards
↓
Payment
  └── CheckoutActionPanel
↓
Confirmation
  └── Order confirmation
↓
Footer
```

## Insertion Zones
| Module       | Zone Type |
|--------------|-----------|
| Summary      | EDITABLE  |
| Payment      | LOCKED    |
| Confirmation | EDITABLE  |
| Footer       | LOCKED    |

Make may evolve only visual presentation. No payment flow mutation.

## Runtime File
`apps/olympus-shopper-ui/src/components/commerce/CheckoutActionPanel.tsx`

## Route
`/checkout` (checkout flow)

## Security Constraints
- No payment/Woo/BiasPay/egress mutation
- Maximum 25% discount cap
- No secrets or PII
- Sprint 5 priority — last, not first
