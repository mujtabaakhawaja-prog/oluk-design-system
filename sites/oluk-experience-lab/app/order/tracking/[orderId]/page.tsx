import { OrderStatusPage } from "../../order-status-page";

export default function TrackingOrderPage({ params }: { params: { orderId: string } }) {
  return <OrderStatusPage orderId={params.orderId} status="tracking" />;
}
