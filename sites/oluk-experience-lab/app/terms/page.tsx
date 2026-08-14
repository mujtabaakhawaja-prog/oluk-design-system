import { PolicyBridge } from "../design-system/support-surface";
import { CustomerSiteChrome } from "../experience-lab";

export default function TermsPage() {
  return <CustomerSiteChrome route="terms"><PolicyBridge kind="terms" /></CustomerSiteChrome>;
}
