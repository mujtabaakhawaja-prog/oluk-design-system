import { SupportSurface } from "../design-system/support-surface";
import { CustomerSiteChrome } from "../experience-lab";

export default function SitemapPage() {
  return (
    <CustomerSiteChrome route="home">
      <SupportSurface kind="sitemap" />
    </CustomerSiteChrome>
  );
}
