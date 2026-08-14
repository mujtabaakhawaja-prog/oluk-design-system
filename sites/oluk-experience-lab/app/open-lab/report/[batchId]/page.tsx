import { OpenLabProductExperience } from "../../../design-system/openlab-product-experience";
import { getFrontierProduct } from "../../../design-system/frontier-content";
import { CustomerSiteChrome } from "../../../experience-lab";
export function generateStaticParams(){return [{batchId:"mk2866-registered"},{batchId:"rad140-registered"}];}
export default function ReportPage({params}:{params:{batchId:string}}){const productSlug=params.batchId.includes("mk2866")?"mk-2866":"rad-140";const product=getFrontierProduct(productSlug);const productReference=product?{name:product.name,series:product.series,alias:product.alias,strength:product.strength,servings:product.servings}:undefined;return <CustomerSiteChrome route="openlab"><main data-report={params.batchId}><h1 className="sr-only">Report {params.batchId}</h1><OpenLabProductExperience product={productReference} productSlug={productSlug}/></main></CustomerSiteChrome>}
