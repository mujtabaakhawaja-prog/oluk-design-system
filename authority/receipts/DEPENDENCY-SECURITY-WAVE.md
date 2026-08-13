# Dependency security wave

Status: `BLOCKED_UPSTREAM_2_HIGH`
Runtime/deployment authority: `NONE`

The bounded non-breaking upgrade reduced the package audit from 17 findings
(2 low, 15 high) to 2 high findings while preserving the 40-route production
build and 56/56 tests.

Updated direct dependencies:

- React and React DOM `19.2.8`
- React Server DOM Webpack `19.2.8`
- Vite `8.2.1`
- Cloudflare Vite plugin `1.52.0`
- Wrangler `4.122.0`
- Vinext `1.0.0-beta.5`

The two remaining findings are both the unpatched `image-size <=2.0.2`
advisories inherited by Vinext. The current latest Vinext beta depends on
`image-size 2.0.2`; npm currently proposes downgrading Vinext to `0.0.45`.
That downgrade was tested and rejected because it removes the Next/Vinext
type surface and causes the application typecheck to fail. This lane must not
claim an audit pass until Vinext publishes a patched dependency or the site is
migrated to a separately validated renderer.

Validation:

- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm test` — PASS, 56/56
- `npm audit` — BLOCKED, 2 high / 0 critical
- Hosting/runtime promotion — BLOCKED
