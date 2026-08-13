/**
 * Creative-frontier content for the Sites reference build.
 * Runtime adapters replace these records later without changing section anatomy.
 */
export type ProductFamily = "Research Chemicals" | "Metabolics" | "Peptides" | "Naturals";
export type FrontierProductRecord = Readonly<{
  slug: string; sku: string; series: string; name: string; alias: string; strength: string;
  servings: string; purity: string; price: string; family: ProductFamily; goal: string[];
  summary: string; researchProfile: string; guidance: string; considerations: string;
  related: string[]; stack: string[];
}>;

const record = (value: FrontierProductRecord) => value;

export const frontierProducts = [
  record({slug:"mk-2866",sku:"80529-01",series:"SARM SERIES",name:"MK-2866",alias:"Ostarine",strength:"15 MG",servings:"90 SERVINGS",purity:">99%",price:"£43",family:"Research Chemicals",goal:["Cutting","Recomp"],summary:"A measured capsule-format research product positioned for clear product comparison and a compact, information-led purchase decision.",researchProfile:"MK-2866 sits at the centre of the Olympus research-chemical range. Its product page pairs product facts with an OpenLab pathway, related research routes and a clear return to the wider collection.",guidance:"Explore the product facts, OpenLab pathway and related research catalogue before making a product decision.",considerations:"Read the complete product information and applicable customer guidance before purchase.",related:["gw-501516","s-4","lgd-4033"],stack:["gw-501516","s-4"]}),
  record({slug:"rad-140",sku:"RAD140-08",series:"SARM SERIES",name:"RAD-140",alias:"Testolone",strength:"8 MG",servings:"60 SERVINGS",purity:">99%",price:"£46",family:"Research Chemicals",goal:["Bulking","Recomp"],summary:"An 8 MG capsule-format research product with a direct route into product facts, comparison and related collection paths.",researchProfile:"RAD-140 is presented at 8 MG consistently across product, comparison, stack and discovery surfaces.",guidance:"Use the comparison view to position RAD-140 alongside adjacent research products.",considerations:"Review product information and consider the wider research catalogue before choosing a route.",related:["lgd-4033","mk-677","ment"],stack:["lgd-4033","mk-677"]}),
  record({slug:"lgd-4033",sku:"LGD4033-10",series:"SARM SERIES",name:"LGD-4033",alias:"Ligandrol",strength:"10 MG",servings:"60 SERVINGS",purity:">99%",price:"£49",family:"Research Chemicals",goal:["Bulking"],summary:"A capsule-format research product for the mass-oriented branch of the catalogue.",researchProfile:"LGD-4033 anchors the bulk-oriented comparison and stack narratives.",guidance:"Compare related catalogue products before selecting a research route.",considerations:"Read the full product detail before purchase.",related:["mk-677","rad-140"],stack:["mk-677","rad-140"]}),
  record({slug:"mk-677",sku:"MK677-25",series:"SECRETAGOGUE SERIES",name:"MK-677",alias:"Ibutamoren",strength:"25 MG",servings:"60 SERVINGS",purity:">99%",price:"£45",family:"Metabolics",goal:["Bulking","Recovery"],summary:"A metabolic-range product used as a central companion in the catalogue’s stack storytelling.",researchProfile:"MK-677 connects mass-oriented and recovery-oriented collection narratives.",guidance:"Explore the related-product rail and product comparison for contextual options.",considerations:"Read the product page and all guidance before purchase.",related:["lgd-4033","rad-140","bpc-157"],stack:["lgd-4033","rad-140"]}),
  record({slug:"gw-501516",sku:"GW501516-10",series:"METABOLIC SERIES",name:"GW-501516",alias:"Cardarine",strength:"10 MG",servings:"60 SERVINGS",purity:">99%",price:"£42",family:"Metabolics",goal:["Cutting","Recomp"],summary:"A metabolic-range product used throughout the cutting and recomp catalogue paths.",researchProfile:"GW-501516 is the comparison partner for Ostarine-led discovery routes.",guidance:"Use the stack explorer to compare related research paths.",considerations:"Review product detail and customer guidance before purchase.",related:["mk-2866","s-4","epistane"],stack:["mk-2866","s-4"]}),
  record({slug:"s-4",sku:"S4-25",series:"SARM SERIES",name:"S-4",alias:"Andarine",strength:"25 MG",servings:"60 SERVINGS",purity:">99%",price:"£40",family:"Research Chemicals",goal:["Cutting"],summary:"A research-chemical catalogue option used as an add-on comparison in cutting-oriented discovery.",researchProfile:"S-4 appears beside Ostarine and Cardarine in the cutting collection path.",guidance:"Compare product facts and related catalogue routes.",considerations:"Read the product information before purchase.",related:["mk-2866","gw-501516"],stack:["mk-2866","gw-501516"]}),
  record({slug:"yk-11",sku:"YK11-10",series:"SARM SERIES",name:"YK-11",alias:"YK-11",strength:"10 MG",servings:"60 SERVINGS",purity:">99%",price:"£47",family:"Research Chemicals",goal:["Bulking"],summary:"A research-chemical option for the catalogue’s higher-intensity comparison branch.",researchProfile:"YK-11 is kept distinct in the product grid and comparison view.",guidance:"Compare facts with adjacent catalogue products.",considerations:"Review the complete product page before purchase.",related:["lgd-4033","rad-140"],stack:["lgd-4033"]}),
  record({slug:"s-23",sku:"S23-10",series:"SARM SERIES",name:"S-23",alias:"S-23",strength:"10 MG",servings:"60 SERVINGS",purity:">99%",price:"£47",family:"Research Chemicals",goal:["Recomp"],summary:"A research-chemical option for focused comparison and collection browsing.",researchProfile:"S-23 adds a distinct option to the recomp-oriented product grid.",guidance:"Review comparison cards and product facts.",considerations:"Read product information before purchase.",related:["mk-2866","gw-501516"],stack:["mk-2866"]}),
  record({slug:"epistane",sku:"EPI-20",series:"PROHORMONE SERIES",name:"Epistane",alias:"Epistane",strength:"20 MG",servings:"60 SERVINGS",purity:">99%",price:"£44",family:"Metabolics",goal:["Recomp"],summary:"A metabolic catalogue product used as an optional recomp-finisher presentation.",researchProfile:"Epistane is a distinct optional branch in the recomp collection path.",guidance:"Use the comparison route to see related product facts.",considerations:"Review product guidance before purchase.",related:["mk-2866","gw-501516"],stack:["mk-2866","gw-501516"]}),
  record({slug:"ment",sku:"MENT-10",series:"METABOLIC SERIES",name:"MENT",alias:"MENT",strength:"10 MG",servings:"60 SERVINGS",purity:">99%",price:"£52",family:"Metabolics",goal:["Bulking"],summary:"A metabolic-range product with its own product facts and related collection path.",researchProfile:"MENT is maintained as a separate product route within the growth catalogue.",guidance:"Compare specifications and browse related category routes.",considerations:"Read complete product information before purchase.",related:["rad-140","lgd-4033"],stack:["rad-140"]}),
  record({slug:"m-sten",sku:"MSTEN-10",series:"PROHORMONE SERIES",name:"M-STEN",alias:"Methylstenbolone",strength:"10 MG",servings:"60 SERVINGS",purity:">99%",price:"£48",family:"Metabolics",goal:["Bulking"],summary:"A catalogue product for the metabolic collection and product comparison system.",researchProfile:"M-STEN extends the product grid with a distinct metabolic option.",guidance:"Review the product facts and comparison cards.",considerations:"Read customer guidance before purchase.",related:["lgd-4033","ment"],stack:["lgd-4033"]}),
  record({slug:"trenavar",sku:"TREN-30",series:"PROHORMONE SERIES",name:"Trenavar",alias:"Trenavar",strength:"30 MG",servings:"60 SERVINGS",purity:">99%",price:"£48",family:"Metabolics",goal:["Bulking"],summary:"A separate metabolic collection route with product information and comparison presentation.",researchProfile:"Trenavar contributes to the wider comparison catalogue.",guidance:"Review the full product information before purchase.",considerations:"Read all customer guidance before purchase.",related:["m-sten","ment"],stack:["m-sten"]}),
  record({slug:"bpc-157",sku:"BPC157-500",series:"PEPTIDE SERIES",name:"BPC-157",alias:"BPC-157",strength:"500 MCG",servings:"60 SERVINGS",purity:">99%",price:"£54",family:"Peptides",goal:["Recovery"],summary:"A peptide-range product with a dedicated route, details and related collection links.",researchProfile:"BPC-157 opens the peptide collection path and recovery-oriented discovery.",guidance:"Explore the peptide category and related products.",considerations:"Read complete product information before purchase.",related:["tb-500","mk-677"],stack:["tb-500"]}),
  record({slug:"tb-500",sku:"TB500-2",series:"PEPTIDE SERIES",name:"TB-500",alias:"TB-500",strength:"2 MG",servings:"30 SERVINGS",purity:">99%",price:"£58",family:"Peptides",goal:["Recovery"],summary:"A peptide catalogue product designed for clear category and related-product discovery.",researchProfile:"TB-500 pairs visually with BPC-157 in the peptide collection.",guidance:"Compare peptide product facts and collection routes.",considerations:"Read product detail before purchase.",related:["bpc-157","mk-677"],stack:["bpc-157"]}),
  record({slug:"cjc-1295",sku:"CJC1295-2",series:"PEPTIDE SERIES",name:"CJC-1295",alias:"CJC-1295",strength:"2 MG",servings:"30 SERVINGS",purity:">99%",price:"£59",family:"Peptides",goal:["Recovery"],summary:"A peptide product for the catalogue’s research and comparison presentation.",researchProfile:"CJC-1295 broadens peptide route coverage without changing the shared PDP anatomy.",guidance:"Browse the peptide collection and related products.",considerations:"Review product information before purchase.",related:["bpc-157","tb-500"],stack:["bpc-157"]}),
  record({slug:"l-carnitine",sku:"LCARN-500",series:"NATURALS SERIES",name:"L-Carnitine",alias:"L-Carnitine",strength:"500 MG",servings:"60 SERVINGS",purity:">99%",price:"£29",family:"Naturals",goal:["Cutting","Wellness"],summary:"A natural-range option that gives the catalogue a clear fourth category and search path.",researchProfile:"L-Carnitine is the natural collection’s accessible anchor product.",guidance:"Explore natural-range products and comparison cards.",considerations:"Read product detail before purchase.",related:["gw-501516","mk-2866"],stack:["gw-501516"]}),
] as const;

export const productBySlug = Object.fromEntries(frontierProducts.map((product) => [product.slug, product])) as Record<string, FrontierProductRecord>;
export const getFrontierProduct = (slug: string) => productBySlug[slug];
/** The frontier reuses only repository-owned product renders; routes without a render keep the chamber unpopulated. */
export const actualProductMedia: Readonly<Record<string, string>> = {
  "mk-2866": "/assets/products/mk-2866/front.png",
  "rad-140": "/assets/products/rad-140/front-design-fixture.png",
};
export const productFamilies: ReadonlyArray<{name: ProductFamily; summary: string}> = [
  {name:"Research Chemicals",summary:"A focused collection for product-led discovery, comparisons and related research paths."},
  {name:"Metabolics",summary:"A product family organised around clear category context and complementary collection routes."},
  {name:"Peptides",summary:"A dedicated collection with product facts, related-product rails and concise guidance."},
  {name:"Naturals",summary:"A compact natural-range collection designed for easy discovery and comparison."},
];

export const stackPresentations = [
  {goal:"Bulking",hero:"LGD-4033 + MK-677",alternates:["RAD-140 · 8 MG","MK-677"],tiers:["Good · LGD-4033","Better · LGD-4033 + MK-677","Best · RAD-140 · 8 MG + MK-677"]},
  {goal:"Cutting",hero:"MK-2866 + Cardarine",alternates:["S-4 Andarine"],tiers:["Good · MK-2866","Better · MK-2866 + Cardarine","Best · MK-2866 + Cardarine + S-4"]},
  {goal:"Recomp",hero:"MK-2866 + Cardarine",alternates:["Epistane"],tiers:["Good · MK-2866","Better · MK-2866 + Cardarine","Best · MK-2866 + Cardarine + Epistane"]},
  {goal:"PCT",hero:"Research profile",alternates:["Explore the catalogue"],tiers:["Good · Product guide","Better · Comparison view","Best · Research profile"]},
] as const;

export const frontierFaq = [
  ["How do I browse the range?","Start in Shop, filter by family or goal, then use each product’s comparison and OpenLab pathways."],
  ["Where can I find delivery information?","Delivery options, order-value guidance and tracking presentation are available throughout the checkout lifecycle."],
  ["What is OpenLab?","OpenLab is the visual pathway connecting product records, source-chain storytelling and report presentation."],
  ["Can I compare products?","Yes. The comparison route uses the same concise product facts shown across category and PDP surfaces."],
] as const;

/** Dynamic compositions intentionally sampled by route-family review rather than the core 40-route regression matrix. */
export const FRONTIER_ROUTE_PATTERNS = [
  "/product/[slug]", "/shop/[family]", "/bundle-builder", "/faq-help-centre",
  "/account/[surface]", "/checkout/[stage]", "/open-lab/[tool]", "/open-lab/coa/[id]",
] as const;

export function productJsonLd(product: FrontierProductRecord) {
  return {"@context":"https://schema.org","@type":"Product",name:product.name,sku:product.sku,description:product.summary,brand:{"@type":"Brand",name:"Olympus Labs UK"},offers:{"@type":"Offer",price:product.price.replace("£", ""),priceCurrency:"GBP",availability:"https://schema.org/InStock"}};
}
