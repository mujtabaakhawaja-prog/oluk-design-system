import { OpenLabRecordDetail } from "../../../design-system/openlab-sections";
import { CustomerSiteChrome } from "../../../experience-lab";
export function generateStaticParams(){return [{batchId:"mk2866-registered"},{batchId:"rad140-registered"}];}
export default function ReportPage({params}:{params:{batchId:string}}){return <CustomerSiteChrome route="openlab"><main data-report={params.batchId}><h1 className="sr-only">Report {params.batchId}</h1><OpenLabRecordDetail/></main></CustomerSiteChrome>}
