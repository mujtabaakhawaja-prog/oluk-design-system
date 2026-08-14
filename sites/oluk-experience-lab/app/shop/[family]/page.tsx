import { FrontierShell, ProductCollection } from "../../design-system/frontier-sections";
import { frontierProducts, productFamilies } from "../../design-system/frontier-content";
import { CustomerSiteChrome } from "../../experience-lab";
export function generateStaticParams(){return productFamilies.map(({name})=>({family:name.toLowerCase().replaceAll(" ","-")}));}
export default function CollectionPage({params}:{params:{family:string}}){const family=productFamilies.find((item)=>item.name.toLowerCase().replaceAll(" ","-")===params.family);const products=frontierProducts.filter((product)=>product.family===family?.name);return <CustomerSiteChrome route="shop"><FrontierShell eyebrow="COLLECTION" title={family?.name??"Collection"}><ProductCollection products={products}/></FrontierShell></CustomerSiteChrome>}
