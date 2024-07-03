import { OrderStatusSelector } from '../components/OrderStatusSelector';

export function PlaygroundPage() {
  return <OrderStatusSelector onChange={console.log} />;
}
