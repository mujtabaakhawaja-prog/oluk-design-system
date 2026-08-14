import { SupportSurface } from "../design-system/support-surface";
import { CustomerSiteChrome } from "../experience-lab";

export default function CookiesPage() {
  return (
    <CustomerSiteChrome route="privacy">
      <SupportSurface kind="cookies" />
    </CustomerSiteChrome>
  );
}
