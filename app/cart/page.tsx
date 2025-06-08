
import CartItemList from '@/components/Cart/CartItemList';
import { memberGetOrders } from '@/api/server-components/member/orders'

export default async function CartPage() {
  const orderData = await memberGetOrders();


  return (
    <div className="py-6 bg-primary-50">
      <CartItemList orders={orderData?.orders ?? []}/>
    </div>
  );
}