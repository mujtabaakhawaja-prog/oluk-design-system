import { HomeRoute } from "./customer-routes";
import { SiteFooter } from "./experience-lab";
import { SiteHeader } from "./design-system/site-header";
import { loadSitesDiscoveryProjection } from "./runtime-adapters/sites-discovery-server";

export default async function HomePage() {
  const discovery = await loadSitesDiscoveryProjection();
  return <div className="experience-lab"><SiteHeader route="home" /><main id="main-content"><HomeRoute models={discovery.models} /></main><SiteFooter /></div>;
}
