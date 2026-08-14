import { CheckoutLifecycle } from "../../design-system/frontier-sections";
import { CustomerSiteChrome } from "../../experience-lab";
const stages=["information","delivery","review","payment","payment-details","processing","confirmation","tracking","order-history","order-details","receipt","return","refund"] as const;
export function generateStaticParams(){return stages.map((stage)=>({stage}));}
export default function CheckoutLifecyclePage({params}:{params:{stage:string}}){return <CustomerSiteChrome route="checkout"><main data-live-authority="false"><CheckoutLifecycle stage={params.stage}/></main></CustomerSiteChrome>}
