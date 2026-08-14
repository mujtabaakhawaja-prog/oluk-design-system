import { PolicyBridge } from "../design-system/support-surface";
import { CustomerSiteChrome } from "../experience-lab";

export default function PrivacyPage() {
  return <CustomerSiteChrome route="privacy"><PolicyBridge kind="privacy" /></CustomerSiteChrome>;
}
