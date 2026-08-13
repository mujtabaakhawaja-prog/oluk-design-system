export const VIEWPORTS = Object.freeze([
  Object.freeze({ name: "desktop", width: 1440, height: 1000 }),
  Object.freeze({ name: "tablet", width: 1024, height: 900 }),
  Object.freeze({ name: "compact", width: 768, height: 900 }),
  Object.freeze({ name: "mobile", width: 390, height: 844 }),
]);

export const ROUTES = Object.freeze([
  Object.freeze({ path: "/", heading: "Formulated to a higher standard.", customer: true }),
  Object.freeze({ path: "/about", heading: "Quality, made visible.", customer: true }),
  Object.freeze({ path: "/about/evidence-os", heading: "A clearer path from product to proof.", customer: true }),
  Object.freeze({ path: "/account", heading: "Orders and account access.", customer: true }),
  Object.freeze({ path: "/bag", heading: "Your bag.", customer: true }),
  Object.freeze({ path: "/checkout", heading: "Your details.", customer: true }),
  Object.freeze({ path: "/checkout/confirmation", heading: "Order received.", customer: true }),
  Object.freeze({ path: "/checkout/delivery", heading: "Choose delivery.", customer: true }),
  Object.freeze({ path: "/checkout/failure", heading: "Payment was not completed.", customer: true }),
  Object.freeze({ path: "/checkout/order-pay", heading: "Complete payment.", customer: true }),
  Object.freeze({ path: "/checkout/payment-handoff", heading: "Continue to secure payment.", customer: true }),
  Object.freeze({ path: "/checkout/retry", heading: "Try payment again.", customer: true }),
  Object.freeze({ path: "/contact", heading: "Start with the right team.", customer: true }),
  Object.freeze({ path: "/delivery", heading: "Delivery information, kept clear.", customer: true }),
  Object.freeze({ path: "/lab-reports", heading: "Every product. Its available record path.", customer: true }),
  Object.freeze({ path: "/open-lab", heading: "Independent evidence, connected to every product.", customer: true }),
  Object.freeze({ path: "/open-lab/batch-lookup", heading: "Find a batch record.", customer: true }),
  Object.freeze({ path: "/open-lab/compare", heading: "Compare finished-product evidence paths.", customer: true }),
  Object.freeze({ path: "/open-lab/dossier/mk-2866", heading: "MK-2866 product dossier.", customer: true }),
  Object.freeze({ path: "/open-lab/methodology", heading: "How finished-product records are read.", customer: true }),
  Object.freeze({ path: "/open-lab/records", heading: "Every product. Its available record path.", customer: true }),
  Object.freeze({ path: "/open-lab/records/source-bound-record", heading: "MK-2866 evidence record", customer: true }),
  Object.freeze({ path: "/open-lab/source-chain", heading: "From finished product to original report.", customer: true }),
  Object.freeze({ path: "/privacy", heading: "Privacy information.", customer: true }),
  Object.freeze({ path: "/product/mk-2866", heading: "MK-2866", customer: true }),
  Object.freeze({ path: "/review", heading: "Olympus Labs UK review surfaces.", customer: false }),
  Object.freeze({ path: "/reviews", heading: "Experiences shared by Olympus customers.", customer: true }),
  Object.freeze({ path: "/search", heading: "Find a product.", customer: true }),
  Object.freeze({ path: "/shop", heading: "The Olympus Labs UK range.", customer: true }),
  Object.freeze({ path: "/terms", heading: "Terms and conditions.", customer: true }),
  Object.freeze({ path: "/wholesale", heading: "Wholesale with product clarity built in.", customer: true }),
]);

export const GOVERNANCE_PATTERNS = Object.freeze([
  "HUMAN_REVIEW_REQUIRED",
  "CANDIDATE · HUMAN REVIEW REQUIRED",
  "CONV-001",
  "MF01A ANATOMY",
  "CATALOGUE SOURCE PENDING",
  "SOURCE-BOUND",
  "DESIGN FIXTURE",
  "DEMO STATE",
  "NOT CONNECTED",
  "RENDERED DESIGN FIXTURE",
  "UNPROVISIONED RENDER",
]);

export function routeSlug(pathname) {
  return pathname === "/" ? "home" : pathname.replace(/^\//, "").replaceAll("/", "--");
}

export function selectRoutes(routeFilter) {
  if (!routeFilter) return ROUTES;
  const requested = new Set(routeFilter.split(",").map((value) => value.trim()).filter(Boolean));
  const selected = ROUTES.filter(({ path }) => requested.has(path));
  const missing = [...requested].filter((path) => !ROUTES.some((route) => route.path === path));
  if (missing.length > 0) throw new Error(`Unknown route(s): ${missing.join(", ")}`);
  return selected;
}

export function selectViewports(widthFilter) {
  if (!widthFilter) return VIEWPORTS;
  const requested = new Set(widthFilter.split(",").map(Number));
  const selected = VIEWPORTS.filter(({ width }) => requested.has(width));
  const missing = [...requested].filter((width) => !VIEWPORTS.some((viewport) => viewport.width === width));
  if (missing.length > 0) throw new Error(`Unsupported proof width(s): ${missing.join(", ")}`);
  return selected;
}
