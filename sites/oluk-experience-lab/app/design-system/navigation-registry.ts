export type NavigationItem = Readonly<{
  id: string;
  label: string;
  href: string;
  detail?: string;
}>;

export type NavigationColumn = Readonly<{
  heading: string;
  items: ReadonlyArray<NavigationItem>;
}>;

export type NavigationNode = Readonly<{
  id: "shop" | "open-lab" | "learn" | "wholesale" | "about";
  label: string;
  href: string;
  columns?: ReadonlyArray<NavigationColumn>;
  featured?: Readonly<{
    kind: "product" | "openlab";
    eyebrow: string;
    title: string;
    copy: string;
    href: string;
    action: string;
  }>;
}>;

export const NAVIGATION_TREE: ReadonlyArray<NavigationNode> = [
  {
    id: "shop",
    label: "Shop",
    href: "/shop",
    columns: [
      {
        heading: "By family",
        items: [
          { id: "sarms", label: "SARMs", href: "/shop?family=sarms" },
          { id: "research-chemicals", label: "Research chemicals", href: "/shop?family=research-chemicals", detail: "Compare the complete research range" },
          { id: "prohormones", label: "Prohormones", href: "/shop?family=prohormones" },
          { id: "metabolics", label: "Metabolics", href: "/shop?family=metabolics" },
          { id: "shop-all", label: "View all products", href: "/shop" },
        ],
      },
      {
        heading: "By goal",
        items: [
          { id: "build", label: "Build size", href: "/shop?goal=build", detail: "Mass and power focused" },
          { id: "strength", label: "Increase strength", href: "/shop?goal=strength", detail: "Higher-intensity product directions" },
          { id: "cut", label: "Cut leaner", href: "/shop?goal=cut", detail: "Strength and endurance through a cut" },
          { id: "recomp", label: "Recomp", href: "/shop?goal=recomp", detail: "Build strength and a leaner look" },
          { id: "recovery", label: "Support recovery", href: "/shop?goal=recovery", detail: "Sleep, appetite and between-session support" },
        ],
      },
      {
        heading: "Stacks & bundles",
        items: [
          { id: "stacks", label: "Ready-built stacks", href: "/shop?family=stacks", detail: "Shop by training goal" },
          { id: "bundle-builder", label: "Build my stack", href: "/bundle-builder", detail: "Choose the result and compare the build" },
          { id: "capsules", label: "Capsule formats", href: "/shop?form=capsules" },
          { id: "servings-90", label: "Longer formats", href: "/shop?servings=90" },
        ],
      },
    ],
    featured: {
      kind: "product",
      eyebrow: "Featured",
      title: "RAD-140 · 8 MG",
      copy: "Push strength and lean-mass focus with the strongest SARM in the Olympus range.",
      href: "/product/rad-140",
      action: "View RAD-140",
    },
  },
  {
    id: "open-lab",
    label: "OpenLab",
    href: "/open-lab",
    columns: [
      {
        heading: "Explore records",
        items: [
          { id: "records", label: "Browse lab records", href: "/open-lab/records", detail: "Open product and batch records" },
          { id: "batch-lookup", label: "Find my batch", href: "/open-lab/batch-lookup", detail: "Search the exact batch reference" },
          { id: "evidence", label: "See the evidence", href: "/open-lab/evidence", detail: "Read results and testing history" },
          { id: "source-chain", label: "Follow the source chain", href: "/open-lab/source-chain" },
        ],
      },
      {
        heading: "Build and compare",
        items: [
          { id: "stack-builder", label: "Build my stack", href: "/open-lab/stack-builder", detail: "Start with the result you want" },
          { id: "compare", label: "Compare compounds", href: "/open-lab/compare", detail: "See the differences side by side" },
          { id: "dose-calculator", label: "Dose calculator", href: "/open-lab/dosing-calculator" },
          { id: "cycle-planner", label: "Cycle planner", href: "/open-lab/cycle-planner" },
          { id: "interaction-checker", label: "Interaction checker", href: "/open-lab/interaction-checker" },
        ],
      },
      {
        heading: "Learn",
        items: [
          { id: "compound-guide", label: "Compound guide", href: "/open-lab/compound-guide" },
          { id: "methodology", label: "How testing works", href: "/open-lab/methodology" },
          { id: "research-papers", label: "Research papers", href: "/open-lab/research-papers" },
          { id: "case-studies", label: "Case studies", href: "/open-lab/case-studies" },
          { id: "glossary", label: "Glossary", href: "/open-lab/glossary" },
          { id: "lab-partner", label: "Become a lab partner", href: "/open-lab/lab-partner" },
        ],
      },
    ],
    featured: {
      kind: "openlab",
      eyebrow: "OpenLab portal",
      title: "Find the record behind the product.",
      copy: "Search a batch, compare compounds or open the report connected to the product in front of you.",
      href: "/open-lab",
      action: "Enter OpenLab",
    },
  },
  {
    id: "learn",
    label: "Learn",
    href: "/open-lab/compound-guide",
    columns: [
      {
        heading: "Learn",
        items: [
          { id: "learn-compounds", label: "Compound guide", href: "/open-lab/compound-guide" },
          { id: "learn-papers", label: "Research papers", href: "/open-lab/research-papers" },
          { id: "learn-cases", label: "Case studies", href: "/open-lab/case-studies" },
          { id: "learn-glossary", label: "Glossary", href: "/open-lab/glossary" },
          { id: "learn-faq", label: "FAQ and help centre", href: "/faq-help-centre" },
          { id: "learn-delivery", label: "Delivery information", href: "/delivery" },
          { id: "learn-contact", label: "Contact us", href: "/contact" },
        ],
      },
    ],
  },
  { id: "wholesale", label: "Wholesale", href: "/wholesale" },
  {
    id: "about",
    label: "About",
    href: "/about",
    columns: [
      {
        heading: "Olympus Labs UK",
        items: [
          { id: "our-story", label: "Our story", href: "/about" },
          { id: "testing-philosophy", label: "Testing philosophy", href: "/open-lab/methodology" },
          { id: "privacy", label: "Privacy policy", href: "/privacy" },
          { id: "terms", label: "Terms and conditions", href: "/terms" },
        ],
      },
    ],
  },
];

export const ACCOUNT_NAVIGATION = [
  { id: "dashboard", label: "Dashboard", href: "/account" },
  { id: "orders", label: "Orders & Tracking", href: "/checkout/tracking" },
  { id: "subscriptions", label: "Subscriptions", href: "/account/subscriptions" },
  { id: "research-profile", label: "Research Profile", href: "/account/research-profile" },
  { id: "loyalty", label: "Loyalty & Rewards", href: "/account/loyalty" },
] as const satisfies ReadonlyArray<NavigationItem>;

const SHOP_CONTEXT = [
  { label: "Shop all", href: "/shop" },
  { label: "SARMs", href: "/shop?family=sarms" },
  { label: "Research chemicals", href: "/shop?family=research-chemicals" },
  { label: "Prohormones", href: "/shop?family=prohormones" },
  { label: "Stacks", href: "/shop?family=stacks" },
  { label: "Capsules", href: "/shop?form=capsules" },
  { label: "90 servings", href: "/shop?servings=90" },
] as const;

const OPEN_LAB_CONTEXT = [
  { label: "Evidence", href: "/open-lab/evidence" },
  { label: "Compound guide", href: "/open-lab/compound-guide" },
  { label: "Stack builder", href: "/open-lab/stack-builder" },
  { label: "Dose calculator", href: "/open-lab/dosing-calculator" },
  { label: "Cycle planner", href: "/open-lab/cycle-planner" },
  { label: "Interaction checker", href: "/open-lab/interaction-checker" },
  { label: "Research", href: "/open-lab/research-papers" },
  { label: "Glossary", href: "/open-lab/glossary" },
] as const;

const PRODUCT_CONTEXT = [
  { label: "Overview", href: "#purchase" },
  { label: "Research profile", href: "#product-details" },
  { label: "Evidence", href: "#lab-records" },
  { label: "Stacking", href: "#product-continuation" },
  { label: "Reviews", href: "#reviews" },
] as const;

const ACCOUNT_CONTEXT = [
  { label: "Dashboard", href: "/account" },
  { label: "Orders", href: "/checkout/order-history" },
  { label: "Subscriptions", href: "/account/subscriptions" },
  { label: "Research", href: "/account/research-profile" },
  { label: "Loyalty", href: "/account/loyalty" },
] as const;

export function contextualNavigation(route: string): ReadonlyArray<{ label: string; href: string }> {
  if (route === "product" || route.startsWith("product-")) return PRODUCT_CONTEXT;
  if (route === "shop" || route === "search") return SHOP_CONTEXT;
  if (route === "account") return ACCOUNT_CONTEXT;
  if (route.includes("openlab") || ["records", "record", "dossier", "lookup", "methodology", "source-chain", "compare", "lab-reports", "compound", "report", "coa", "compound-guide", "stack-builder", "dosing-calculator", "cycle-planner", "interaction-checker", "research-papers", "case-studies", "glossary", "lab-partner"].includes(route)) return OPEN_LAB_CONTEXT;
  return [];
}
