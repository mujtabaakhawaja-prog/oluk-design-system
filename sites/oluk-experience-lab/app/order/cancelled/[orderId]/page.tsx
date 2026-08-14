import { OrderStatusPage } from "../../order-status-page";

export default function CancelledOrderPage({ params }: { params: { orderId: string } }) {
  return <OrderStatusPage orderId={params.orderId} status="cancelled" />;
}
