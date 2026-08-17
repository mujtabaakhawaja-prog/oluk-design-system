/**
 * Creative-frontier content for the Sites reference build.
 * Runtime adapters replace these records later without changing section anatomy.
 */
export type ProductFamily = "Research Chemicals" | "Metabolics" | "Peptides" | "Naturals";
export type CustomerProposition = Readonly<{
  eyebrow: string;
  headline: string;
  promise: string;
  benefits: ReadonlyArray<string>;
  differentiator: string;
  primaryAction: string;
  secondaryAction?: string;
  mobileSummary: string;
}>;
export type FrontierProductRecord = Readonly<{
  slug: string; sku: string; series: string; name: string; alias: string; strength: string;
  servings: string; purity: string; price: string; family: ProductFamily; goal: string[];
  summary: string; researchProfile: string; guidance: string; considerations: string;
  related: string[]; stack: string[]; proposition: CustomerProposition;
}>;

type FrontierProductInput = Omit<FrontierProductRecord, "proposition"> & Readonly<{ proposition?: Partial<CustomerProposition> }>;

const outcomeLanguage: Readonly<Record<string, Readonly<{headline:string;promise:string;benefits:ReadonlyArray<string>}>>> = {
  Bulking: { headline: "Build a harder, heavier training phase.", promise: "Put strength, size and training intensity at the centre of the next product decision.", benefits: ["Strength-led formats", "Mass-focused stack options", "Clear step-up comparisons"] },
  Cutting: { headline: "Keep strength in the plan while the goal gets leaner.", promise: "Compare products built around training output, body-composition focus and a stronger finish.", benefits: ["Lean-phase positioning", "Endurance-led pairings", "Clear add-on choices"] },
  Recomp: { headline: "Push strength and a leaner look together.", promise: "Build a balanced product direction around performance, body composition and recovery.", benefits: ["Strength and recomp focus", "Flexible stack pairings", "Outcome-led additions"] },
  Recovery: { headline: "Build more recovery into hard training weeks.", promise: "Bring sleep, appetite and between-session recovery support into the wider plan.", benefits: ["Daily support formats", "Recovery-led pairings", "Longer-serving options"] },
  Wellness: { headline: "Keep everyday support simple.", promise: "Choose a straightforward format that fits cleanly into a wider performance routine.", benefits: ["Simple daily format", "Clear product facts", "Easy collection comparison"] },
};

const record = (value: FrontierProductInput): FrontierProductRecord => {
  const primaryGoal = value.goal[0] ?? "Recomp";
  const outcome = outcomeLanguage[primaryGoal] ?? outcomeLanguage.Recomp;
  return {
    ...value,
    proposition: {
      eyebrow: value.series,
      headline: outcome.headline,
      promise: outcome.promise,
      benefits: outcome.benefits,
      differentiator: `${value.strength} · ${value.servings} · ${value.purity}`,
      primaryAction: "View product",
      secondaryAction: "Build my stack",
      mobileSummary: `${value.name}: ${outcome.headline}`,
      ...value.proposition,
    },
  };
};

export const frontierProducts = [
  record({slug:"mk-2866",sku:"80529-01",series:"SARM SERIES",name:"MK-2866",alias:"Ostarine",strength:"15 MG",servings:"90 SERVINGS",purity:">99%",price:"£43",family:"Research Chemicals",goal:["Cutting","Recomp"],summary:"A 15 MG, 90-serving Ostarine format built for a leaner, more deliberate training phase.",researchProfile:"MK-2866 is the clean starting point for a cutting or recomp-focused stack: clear 15 MG strength, a 90-serving format and a direct view of its available lab record.",guidance:"Start with the format and outcome you want, then build the next phase around strength, endurance or recovery.",considerations:"Read the full product details before choosing your stack.",related:["gw-501516","s-4","lgd-4033"],stack:["gw-501516","s-4"]}),
  record({slug:"rad-140",sku:"RAD140-08",series:"SARM SERIES",name:"RAD-140",alias:"Testolone",strength:"8 MG",servings:"60 SERVINGS",purity:">99%",price:"£55",family:"Research Chemicals",goal:["Bulking","Recomp"],summary:"An 8 MG, 60-serving Testolone format for strength-led phases that demand more intensity.",researchProfile:"RAD-140 is the 8 MG step-up for customers looking to put strength and lean mass at the centre of a harder training block.",guidance:"Use RAD-140 when strength and lean mass are the next priority, then compare it with the mass and recovery options in Your Stack.",considerations:"Read the full product details before choosing your stack.",related:["lgd-4033","mk-677","ment"],stack:["lgd-4033","mk-677"]}),
  record({slug:"lgd-4033",sku:"LGD4033-05",series:"SARM SERIES",name:"LGD-4033",alias:"Ligandrol",strength:"5 MG",servings:"",purity:">99%",price:"£44",family:"Research Chemicals",goal:["Bulking"],summary:"A 5 MG Ligandrol format for building a heavier, mass-focused phase.",researchProfile:"LGD-4033 gives a bulk-focused stack a clear lean-mass direction and a natural next step into MK-677 or RAD-140.",guidance:"Choose LGD-4033 when lean mass is the priority, then compare the recovery and intensity options that can take the stack further.",considerations:"Read the full product details before choosing your stack.",related:["mk-677","rad-140"],stack:["mk-677","rad-140"]}),
  record({slug:"mk-677",sku:"MK677-15",series:"RESEARCH SERIES",name:"MK-677",alias:"Ibutamoren",strength:"15 MG",servings:"90 SERVINGS",purity:">99%",price:"£45",family:"Metabolics",goal:["Bulking","Recovery"],summary:"A 15 MG, 90-serving Ibutamoren format for appetite, sleep and recovery support between hard sessions.",researchProfile:"MK-677 brings the recovery side of a stack into focus with a familiar 90-serving format built around appetite, deeper sleep and day-to-day recovery.",guidance:"Choose MK-677 when the next phase needs better recovery capacity alongside the products already in your stack.",considerations:"Read the full product details before choosing your stack.",related:["lgd-4033","rad-140","bpc-157"],stack:["lgd-4033","rad-140"]}),
  record({slug:"gw-501516",sku:"GW501516-10",series:"METABOLIC SERIES",name:"GW-50156",alias:"Cardarine",strength:"10 MG",servings:"60 SERVINGS",purity:">99%",price:"£42",family:"Metabolics",goal:["Cutting","Recomp"],summary:"A 10 MG Cardarine format for endurance and body-composition focused phases.",researchProfile:"GW-50156 is the endurance-led choice beside Ostarine when you want a cutting or recomp stack to feel more capable through demanding sessions.",guidance:"Build around Cardarine when training output and a stronger finish are the next priorities.",considerations:"Read the full product details before choosing your stack.",related:["mk-2866","s-4","epistane"],stack:["mk-2866","s-4"]}),
  record({slug:"s-4",sku:"S4-25",series:"SARM SERIES",name:"S-4",alias:"Andarine",strength:"25 MG",servings:"60 SERVINGS",purity:">99%",price:"£40",family:"Research Chemicals",goal:["Cutting"],summary:"A 25 MG Andarine format for a more defined cutting-focused finish.",researchProfile:"S-4 is the optional cutting add-on for customers who already have Ostarine and Cardarine at the centre of the plan.",guidance:"Add S-4 when a cutting stack calls for a more defined final phase.",considerations:"Read the full product details before choosing your stack.",related:["mk-2866","gw-501516"],stack:["mk-2866","gw-501516"]}),
  record({slug:"yk-11",sku:"YK11-10",series:"SARM SERIES",name:"YK-11",alias:"YK-11",strength:"10 MG",servings:"60 SERVINGS",purity:">99%",price:"£47",family:"Research Chemicals",goal:["Bulking"],summary:"A 10 MG YK-11 format for high-intensity size and strength goals.",researchProfile:"YK-11 is the higher-intensity option for customers who want to compare a bolder bulk-focused choice with LGD-4033 and RAD-140.",guidance:"Compare YK-11 with the other strength-led formats before choosing the next addition.",considerations:"Read the full product details before choosing your stack.",related:["lgd-4033","rad-140"],stack:["lgd-4033"]}),
  record({slug:"s-23",sku:"S23-10",series:"SARM SERIES",name:"S-23",alias:"S-23",strength:"10 MG",servings:"60 SERVINGS",purity:">99%",price:"£47",family:"Research Chemicals",goal:["Recomp"],summary:"A 10 MG S-23 format for focused recomp phases.",researchProfile:"S-23 offers a distinct strength-and-definition direction when a recomp stack needs a harder edge.",guidance:"Compare S-23 with Ostarine and Cardarine to find the balance that fits the next phase.",considerations:"Read the full product details before choosing your stack.",related:["mk-2866","gw-501516"],stack:["mk-2866"]}),
  record({slug:"epistane",sku:"EPI-20",series:"PROHORMONE SERIES",name:"Epistane",alias:"Epistane",strength:"20 MG",servings:"60 SERVINGS",purity:">99%",price:"£44",family:"Metabolics",goal:["Recomp"],summary:"A 20 MG Epistane format for the harder finishing phase of a recomp stack.",researchProfile:"Epistane is the optional finisher for customers who want to take an Ostarine and Cardarine base into a more demanding final phase.",guidance:"Choose Epistane when the goal is a stronger finish after the base of your stack is already clear.",considerations:"Read the full product details before choosing your stack.",related:["mk-2866","gw-501516"],stack:["mk-2866","gw-501516"]}),
  record({slug:"ment",sku:"MENT-20",series:"PROHORMONE SERIES",name:"MENT",alias:"Trestolone",strength:"20 MG",servings:"30 SERVINGS",purity:">99%",price:"£49",family:"Metabolics",goal:["Bulking"],summary:"A 20 MG, 30-serving Trestolone format for heavyweight size and power goals.",researchProfile:"MENT is the advanced builder in Your Stack: a high-intensity 20 MG option for customers moving beyond a SARM-only bulk phase.",guidance:"Choose MENT when maximum size and power are the next priorities in a more advanced stack.",considerations:"Read the full product details before choosing your stack.",related:["rad-140","lgd-4033"],stack:["rad-140"]}),
  record({slug:"m-sten",sku:"MSTEN-10",series:"PROHORMONE SERIES",name:"M-STEN",alias:"Methylstenbolone",strength:"10 MG",servings:"60 SERVINGS",purity:">99%",price:"£48",family:"Metabolics",goal:["Bulking"],summary:"A 10 MG Methylstenbolone format for a denser, bulk-focused training phase.",researchProfile:"M-STEN provides another high-intensity mass option for customers comparing the heavier end of the Olympus range.",guidance:"Compare M-STEN with MENT and LGD-4033 to choose the type of mass-focused phase you want to build.",considerations:"Read the full product details before choosing your stack.",related:["lgd-4033","ment"],stack:["lgd-4033"]}),
  record({slug:"trenavar",sku:"TREN-30",series:"PROHORMONE SERIES",name:"Trenavar",alias:"Trenavar",strength:"30 MG",servings:"60 SERVINGS",purity:">99%",price:"£48",family:"Metabolics",goal:["Bulking"],summary:"A 30 MG Trenavar format for customers building a more aggressive size-focused phase.",researchProfile:"Trenavar sits alongside M-STEN and MENT for customers comparing the strongest mass-focused directions in the range.",guidance:"Compare the bulk-focused formats side by side, then choose the intensity that suits the next phase.",considerations:"Read the full product details before choosing your stack.",related:["m-sten","ment"],stack:["m-sten"]}),
  record({slug:"bpc-157",sku:"BPC157-500",series:"PEPTIDE SERIES",name:"BPC-157",alias:"BPC-157",strength:"500 MCG",servings:"60 SERVINGS",purity:">99%",price:"£54",family:"Peptides",goal:["Recovery"],summary:"A 500 MCG peptide format for recovery-focused product planning.",researchProfile:"BPC-157 is a recovery-led choice for customers building a more complete plan around hard training weeks and repeat performance.",guidance:"Pair BPC-157 with the products that support the way you train, recover and return to the gym.",considerations:"Read the full product details before choosing your stack.",related:["tb-500","mk-677"],stack:["tb-500"]}),
  record({slug:"tb-500",sku:"TB500-2",series:"PEPTIDE SERIES",name:"TB-500",alias:"TB-500",strength:"2 MG",servings:"30 SERVINGS",purity:">99%",price:"£58",family:"Peptides",goal:["Recovery"],summary:"A 2 MG, 30-serving peptide format for recovery-led stacks.",researchProfile:"TB-500 is the companion peptide for customers who want to make recovery a clear part of their wider training plan.",guidance:"Compare TB-500 and BPC-157 when recovery is the product story you want to build around.",considerations:"Read the full product details before choosing your stack.",related:["bpc-157","mk-677"],stack:["bpc-157"]}),
  record({slug:"cjc-1295",sku:"CJC1295-2",series:"PEPTIDE SERIES",name:"CJC-1295",alias:"CJC-1295",strength:"2 MG",servings:"30 SERVINGS",purity:">99%",price:"£59",family:"Peptides",goal:["Recovery"],summary:"A 2 MG, 30-serving peptide format for customers prioritising recovery and consistency.",researchProfile:"CJC-1295 brings another recovery-focused direction into the peptide range for customers refining a longer-term plan.",guidance:"Browse the peptide range to compare recovery-focused formats and choose the right next addition.",considerations:"Read the full product details before choosing your stack.",related:["bpc-157","tb-500"],stack:["bpc-157"]}),
  record({slug:"l-carnitine",sku:"LCARN-500",series:"NATURALS SERIES",name:"L-Carnitine",alias:"L-Carnitine",strength:"500 MG",servings:"60 SERVINGS",purity:">99%",price:"£29",family:"Naturals",goal:["Cutting","Wellness"],summary:"A 500 MG L-Carnitine format for straightforward daily support in a cutting-focused plan.",researchProfile:"L-Carnitine is the accessible natural-range choice for customers who want a simple daily format alongside their training and body-composition goals.",guidance:"Choose L-Carnitine when you want to keep the next addition straightforward and easy to fit into the wider plan.",considerations:"Read the full product details before choosing your stack.",related:["gw-501516","mk-2866"],stack:["gw-501516"]}),
] as const;

export const productBySlug = Object.fromEntries(frontierProducts.map((product) => [product.slug, product])) as Record<string, FrontierProductRecord>;
export const getFrontierProduct = (slug: string) => productBySlug[slug];
/** The frontier reuses only repository-owned product renders; routes without a render keep the chamber unpopulated. */
export const actualProductMedia: Readonly<Record<string, Readonly<{ src: string; width: number; height: number }>>> = {
  "mk-2866": { src: "/assets/products/mk-2866/front.png", width: 1365, height: 2048 },
  "rad-140": { src: "/assets/products/rad-140/front.png", width: 1024, height: 1536 },
  "mk-677": { src: "/assets/products/hero/mk-677/front.webp", width: 1024, height: 1536 },
  "gw-501516": { src: "/assets/products/shop/gw-501516.jpeg", width: 300, height: 450 },
  "epistane": { src: "/assets/products/shop/epistane.webp", width: 300, height: 450 },
  "ment": { src: "/assets/products/hero/ment/front.webp", width: 1024, height: 1536 },
  "m-sten": { src: "/assets/products/shop/m-sten.webp", width: 300, height: 450 },
};
export const productFamilies: ReadonlyArray<{name: ProductFamily; summary: string}> = [
  {name:"Research Chemicals",summary:"Strength, cutting and recomp-focused formats for building the next training phase."},
  {name:"Metabolics",summary:"Endurance, recovery and body-composition options that give a stack more direction."},
  {name:"Peptides",summary:"Recovery-focused formats for customers who want the plan to work harder between sessions."},
  {name:"Naturals",summary:"Straightforward daily support for a cleaner, easier-to-build routine."},
];

export const stackPresentations = [
  {goal:"Bulking",baseline:"mk-2866",headline:"Build for more size and strength.",promise:"Add a lean-mass contribution with LGD-4033, step up with RAD-140 at 8 MG, or bring recovery support through MK-677.",additions:["lgd-4033","rad-140","mk-677","ment"]},
  {goal:"Cutting",baseline:"mk-2866",headline:"Hold the line on strength while you cut.",promise:"Add Cardarine for endurance-led work and compare S-4 when the finish needs more definition.",additions:["gw-501516","s-4"]},
  {goal:"Recomp",baseline:"mk-2866",headline:"Push leaner gains from both sides.",promise:"Add Cardarine for training output and compare Epistane as the harder finishing presentation.",additions:["gw-501516","epistane"]},
  {goal:"PCT",baseline:"mk-2866",headline:"Plan the next phase with clarity.",promise:"Bring recovery emphasis, saved research and the next product decision into one clear continuation.",additions:["mk-677"]},
] as const;

export const frontierFaq = [
  ["How do I find the right product?","Start with your goal, filter by family, then compare strength, servings and the products that work well together."],
  ["Where can I find delivery information?","Choose delivery at checkout, see the order value clearly, and follow every order from dispatch to delivery."],
  ["What is OpenLab?","OpenLab brings batch records, available reports and the story behind each product together in one place."],
  ["Can I compare products?","Yes. Put the key facts side by side, then choose the format and product role that fit the result you want."],
] as const;

/** Dynamic compositions intentionally sampled by route-family review rather than the core 40-route regression matrix. */
export const FRONTIER_ROUTE_PATTERNS = [
  "/product/[slug]", "/collections/[slug]", "/compare", "/bundle-builder", "/faq-help-centre",
  "/shipping-returns", "/faq", "/international", "/gift-cards", "/cookies", "/refunds", "/sitemap", "/legal/[doc]",
  "/order/success/[orderId]",
  "/order/pending/[orderId]",
  "/order/failed/[orderId]",
  "/order/cancelled/[orderId]",
  "/order/tracking/[orderId]",
  "/account/[surface]", "/account/orders/[orderId]", "/checkout/[stage]", "/open-lab/[tool]", "/open-lab/coa/[id]",
] as const;

export function productJsonLd(product: FrontierProductRecord) {
  return {"@context":"https://schema.org","@type":"Product",name:product.name,sku:product.sku,description:product.summary,brand:{"@type":"Brand",name:"Olympus Labs UK"},offers:{"@type":"Offer",price:product.price.replace("£", ""),priceCurrency:"GBP",availability:"https://schema.org/InStock"}};
}
