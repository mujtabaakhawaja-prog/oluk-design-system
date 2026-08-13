import { CheckoutLifecycle } from "../../design-system/frontier-sections";
const stages=["information","delivery","review","payment","payment-details","processing","confirmation","tracking","order-history","order-details","receipt","return","refund"] as const;
export function generateStaticParams(){return stages.map((stage)=>({stage}));}
export default function CheckoutLifecyclePage({params}:{params:{stage:string}}){return <CheckoutLifecycle stage={params.stage}/>}
