import { AccountHub } from "../../../design-system/frontier-sections";
import { CustomerSiteChrome } from "../../../experience-lab";

export default function AccountOrderPage({ params }: { params: { orderId: string } }) {
  return (
    <CustomerSiteChrome route="account">
      <main data-order-reference={params.orderId}>
        <AccountHub mode="orders" />
      </main>
    </CustomerSiteChrome>
  );
}
