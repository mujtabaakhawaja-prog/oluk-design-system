import { WholesaleExperience } from "../design-system/support-surface";
import { CustomerSiteChrome } from "../experience-lab";

export default function WholesalePage() {
  return (
    <CustomerSiteChrome route="wholesale">
      <WholesaleExperience />
    </CustomerSiteChrome>
  );
}
