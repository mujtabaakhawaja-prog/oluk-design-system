import { AccountHub } from "../../design-system/frontier-sections";
const surfaces=["dashboard","loyalty","referrals","subscriptions","research-profile","orders","wishlist","address-book","notifications","security","gdpr","affiliate"] as const;
export function generateStaticParams(){return surfaces.map((surface)=>({surface}));}
export default function AccountSurfacePage({params}:{params:{surface:string}}){return <AccountHub mode={params.surface}/>}
