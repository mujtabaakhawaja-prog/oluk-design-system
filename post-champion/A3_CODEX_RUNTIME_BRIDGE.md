# A3 — Codex Runtime Bridge

## Load gate

Do not load or execute this file until:

1. Light Identity Authority V1 is human-locked.
2. Native Figma adoption is complete enough to expose stable components,
   variables and responsive behavior.
3. The localhost QA packet has a disposition for every target route.

## Principle

Make output and localhost screenshots are staging evidence. Promote the visual
decisions selectively into the real frontend architecture. Do not copy
generated Make code blindly.

## Runtime discovery before implementation

Inspect the target repository and record:

- framework and rendering mode;
- route and layout boundaries;
- TypeScript configuration;
- styling/token pipeline;
- existing component library and conventions;
- data fixtures, schemas and commerce boundaries;
- image/render asset pipeline;
- SSR/hydration requirements;
- analytics, telemetry and consent boundaries;
- tests and visual-regression tooling;
- checkout authority and third-party integrations.

Resolve fixture conflicts before rendering customer-facing facts, especially:

- servings versus capsules;
- product form and strength;
- alias and SKU;
- purity and laboratory status;
- source/method availability;
- price, inventory and dispatch claims.

## Implementation sequence

1. Map accepted Figma variables to runtime semantic variables.
2. Map shared Figma families to existing code boundaries.
3. Implement global shell, responsive container and surface roles.
4. Implement media chamber and product identity primitives.
5. Implement commerce cards, rails and PDP modules.
6. Implement evidence ledger, report and source surfaces.
7. Compose Homepage, Collection, PDP, OpenLab, Report, Bag, Checkout, Success
   and Tracking routes.
8. Implement real interaction/state behavior.
9. Validate SSR, hydration, keyboard behavior and reduced motion.
10. Add visual regression, integration tests, telemetry and rollback flags.

## Production behaviors

The code lane—not Figma Make—owns:

- true URL routing and route loading;
- persisted header/shell behavior;
- keyboard-accessible mega-menu and mobile drawer;
- PDP gallery state and asset loading;
- scrollspy;
- cart state and cart drawer;
- filtering, sorting, comparison and URL state;
- source drawer data and evidence validation;
- checkout state machine, validation, payments and success/tracking;
- responsive breakpoints;
- focus management and reduced motion;
- SSR and hydration;
- analytics and telemetry.

## Implementation guardrails

- Reuse the existing stack and component conventions unless a measured defect
  justifies change.
- Keep product and evidence data governed; placeholders never silently become
  claims.
- Keep media assets product-owned rather than theme-owned.
- Separate visual state from business/data state.
- Use feature flags or route-level rollback for material page migrations.
- Record visual diffs against the golden capture packet.
- Dark mode is a separate scope after light production parity.

## Definition of done

- Target routes match the accepted native Figma authority within documented
  tolerances.
- Desktop, tablet and mobile captures pass visual review.
- Loading, empty, error, warning, disabled and success states are implemented.
- Keyboard and reduced-motion behavior pass.
- SSR/hydration tests pass where applicable.
- Product truth and evidence guardrails are verified.
- Telemetry and rollback are documented.

