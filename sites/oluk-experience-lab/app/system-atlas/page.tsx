import { CustomerSiteChrome } from "../experience-lab";
import { SitesSystemAtlas } from "../design-system/sites-system-atlas";

/** Owner-only Sites staging surface. It carries no customer-runtime or deployment authority. */
export default function SystemAtlasPage() {
  return <CustomerSiteChrome route="system-atlas"><SitesSystemAtlas /></CustomerSiteChrome>;
}
