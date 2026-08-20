import { AccountHub } from "../../../design-system/frontier-sections";
import { CustomerSiteChrome } from "../../../experience-lab";

export default function AccountOrderPage({ params }: { params: { orderId: string } }) {
  return (
    <CustomerSiteChrome route="account">
      <main data-requested-order={params.orderId}>
        <AccountHub mode="orders" state="unavailable" />
      </main>
    </CustomerSiteChrome>
  );
}
