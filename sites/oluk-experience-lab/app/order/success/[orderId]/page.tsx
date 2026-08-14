import { OrderStatusPage } from "../../order-status-page";

export default function SuccessOrderPage({ params }: { params: { orderId: string } }) {
  return <OrderStatusPage orderId={params.orderId} status="success" />;
}
