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
    eyebrow: string;
    title: string;
    copy: string;
    href: string;
  }>;
}>;

export const NAVIGATION_TREE: ReadonlyArray<NavigationNode> = [
  {
    id: "shop",
    label: "SHOP",
    href: "/shop",
    columns: [
      {
        heading: "By family",
        items: [
          { id: "sarms", label: "SARMs", href: "/shop?family=sarms" },
          { id: "research-chemicals", label: "Research Chemicals", href: "/shop?family=research-chemicals" },
          { id: "prohormones", label: "Prohormones", href: "/shop?family=prohormones" },
          { id: "metabolics", label: "Metabolics", href: "/shop?family=metabolics" },
          { id: "shop-all", label: "Shop All", href: "/shop" },
        ],
      },
      {
        heading: "By goal",
        items: [
          { id: "build", label: "Build", href: "/shop?goal=build" },
          { id: "cut", label: "Cut", href: "/shop?goal=cut" },
          { id: "recomp", label: "Recomp", href: "/shop?goal=recomp" },
          { id: "recovery", label: "Recovery", href: "/shop?goal=recovery" },
          { id: "strength", label: "Strength", href: "/shop?goal=strength" },
          { id: "body-composition", label: "Body Composition", href: "/shop?goal=body-composition" },
        ],
      },
      {
        heading: "Stacks & bundles",
        items: [
          { id: "stacks", label: "Pre-made Stacks", href: "/shop?family=stacks" },
          { id: "bundle-builder", label: "Bundle Builder", href: "/bundle-builder" },
          { id: "capsules", label: "Capsules", href: "/shop?form=capsules" },
          { id: "servings-90", label: "90 Servings", href: "/shop?servings=90" },
        ],
      },
    ],
    featured: {
      eyebrow: "Featured",
      title: "RAD-140 · 8 MG",
      copy: "Explore the product, its specifications and available OpenLab pathway.",
      href: "/shop?search=RAD-140",
    },
  },
  {
    id: "open-lab",
    label: "OPEN LAB",
    href: "/open-lab",
    columns: [
      {
        heading: "Evidence & testing",
        items: [
          { id: "evidence", label: "Evidence Charts", href: "/open-lab/evidence" },
          { id: "batch-lookup", label: "Batch Lookup", href: "/open-lab/batch-lookup" },
          { id: "records", label: "Lab Records Archive", href: "/open-lab/records" },
          { id: "methodology", label: "Methodology", href: "/open-lab/methodology" },
          { id: "source-chain", label: "Source Chain", href: "/open-lab/source-chain" },
        ],
      },
      {
        heading: "Research tools",
        items: [
          { id: "stack-builder", label: "Stack Builder", href: "/open-lab/stack-builder" },
          { id: "dose-calculator", label: "Dose Calculator", href: "/open-lab/dosing-calculator" },
          { id: "cycle-planner", label: "Cycle Planner", href: "/open-lab/cycle-planner" },
          { id: "interaction-checker", label: "Interaction Checker", href: "/open-lab/interaction-checker" },
          { id: "lab-partner", label: "Lab Partner", href: "/open-lab/lab-partner" },
        ],
      },
      {
        heading: "Explore",
        items: [
          { id: "compound-guide", label: "Compound Guide", href: "/open-lab/compound-guide" },
          { id: "compare", label: "Compound Compare", href: "/open-lab/compare" },
          { id: "research-papers", label: "Research Papers", href: "/open-lab/research-papers" },
          { id: "case-studies", label: "Case Studies", href: "/open-lab/case-studies" },
          { id: "glossary", label: "Glossary", href: "/open-lab/glossary" },
        ],
      },
    ],
    featured: {
      eyebrow: "OpenLab portal",
      title: "Shop the range and verify every batch.",
      copy: "Browse products, check batch records and access available lab reports in one place.",
      href: "/open-lab",
    },
  },
  {
    id: "learn",
    label: "LEARN",
    href: "/open-lab/compound-guide",
    columns: [
      {
        heading: "Learn",
        items: [
          { id: "learn-compounds", label: "Compound Guide", href: "/open-lab/compound-guide" },
          { id: "learn-papers", label: "Research Papers", href: "/open-lab/research-papers" },
          { id: "learn-cases", label: "Case Studies", href: "/open-lab/case-studies" },
          { id: "learn-glossary", label: "Glossary", href: "/open-lab/glossary" },
          { id: "learn-faq", label: "FAQ & Help Centre", href: "/faq-help-centre" },
          { id: "learn-delivery", label: "Delivery Information", href: "/delivery" },
          { id: "learn-contact", label: "Contact Us", href: "/contact" },
        ],
      },
    ],
  },
  { id: "wholesale", label: "WHOLESALE", href: "/wholesale" },
  {
    id: "about",
    label: "ABOUT",
    href: "/about",
    columns: [
      {
        heading: "Olympus Labs UK",
        items: [
          { id: "our-story", label: "Our Story", href: "/about" },
          { id: "testing-philosophy", label: "Testing Philosophy", href: "/open-lab/methodology" },
          { id: "privacy", label: "Privacy Policy", href: "/privacy" },
          { id: "terms", label: "Terms & Conditions", href: "/terms" },
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
