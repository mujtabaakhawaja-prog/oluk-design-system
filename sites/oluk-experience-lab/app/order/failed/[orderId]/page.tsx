import { OrderStatusPage } from "../../order-status-page";

export default function FailedOrderPage({ params }: { params: { orderId: string } }) {
  return <OrderStatusPage orderId={params.orderId} status="failed" />;
}
