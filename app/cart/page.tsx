
import CartItemCombineWrapper from '@/components/Cart/CartItemCombineWrapper';
import { memberGetOrders } from '@/api/server-components/member/orders'

export default async function CartPage() {
  const orderData = await memberGetOrders('Unpaid');


  return (
    <div className="py-6 bg-primary-50">
      <CartItemCombineWrapper serverOrders={orderData?.orders ?? []}/>
    </div>
  );
}