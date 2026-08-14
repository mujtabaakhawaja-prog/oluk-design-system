import { OrderStatusPage } from "../../order-status-page";

export default function PendingOrderPage({ params }: { params: { orderId: string } }) {
  return <OrderStatusPage orderId={params.orderId} status="pending" />;
}
