import { OpenLabProductExperience } from "../../../design-system/openlab-product-experience";
import { getCustomerProductFixture } from "../../../design-system/product-content-adapter";
import { CustomerSiteChrome } from "../../../experience-lab";
import { notFound } from "next/navigation";

const reportBindings = {
  "registered-record": "mk-2866",
  "mk2866-registered": "mk-2866",
} as const;

export function generateStaticParams(){return Object.keys(reportBindings).map((batchId)=>({batchId}));}
export default function ReportPage({params}:{params:{batchId:string}}){const productSlug=reportBindings[params.batchId as keyof typeof reportBindings];if(!productSlug)return notFound();const product=getCustomerProductFixture(productSlug);if(!product)return notFound();const productReference={name:product.name,series:product.series,alias:product.alias,strength:product.strength,servings:product.servings};return <CustomerSiteChrome route="openlab"><main data-report={params.batchId}><h1 className="sr-only">Report {params.batchId}</h1><OpenLabProductExperience product={productReference} productSlug={productSlug}/></main></CustomerSiteChrome>}
