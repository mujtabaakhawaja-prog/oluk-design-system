import { AccountHub } from "../../design-system/frontier-sections";
import { CustomerSiteChrome } from "../../experience-lab";
const surfaces=["dashboard","loyalty","referrals","subscriptions","research-profile","orders","wishlist","address-book","notifications","security","gdpr","affiliate"] as const;
export function generateStaticParams(){return surfaces.map((surface)=>({surface}));}
export default function AccountSurfacePage({params}:{params:{surface:string}}){return <CustomerSiteChrome route="account"><main><AccountHub mode={params.surface} state="unauthenticated"/></main></CustomerSiteChrome>}
