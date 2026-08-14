import { notFound } from "next/navigation";
import { PostPurchaseSurface, type PostPurchaseStatus } from "../../../design-system/post-purchase-surface";
import { CustomerSiteChrome } from "../../../experience-lab";

const statuses = ["success", "pending", "failed", "cancelled", "tracking"] as const;
export function generateStaticParams(){return statuses.map((status)=>({status}));}
export default function OrderStatusPage({params}:{params:{status:string;orderId?:string[]}}){if(!statuses.includes(params.status as PostPurchaseStatus))return notFound();return <CustomerSiteChrome route="checkout-confirmation"><PostPurchaseSurface orderId={params.orderId?.[0]} status={params.status as PostPurchaseStatus}/></CustomerSiteChrome>;}
