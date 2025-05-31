import CartItem from "@/components/Cart/CartItem";

export default function CartItemList() {
  const cartItems = [
    {
      title: '韓國釜山通行證 VISIT BUSAN PASS',
      date: '2025/05/31',
      type: '卡片版',
      option: '選項: 48 小時',
      quantity: 2,
      price: 3678,
      imageUrl: '/images/busan-pass.png',
    },
     {
      title: '韓國釜山通行證 VISIT BUSAN PASS',
      date: '2025/07/31',
      type: '卡片版',
      option: '選項: 48 小時',
      quantity: 4,
      price: 4000,
      imageUrl: '/images/busan-pass.png',
    },
     {
      title: '韓國釜山通行證 VISIT BUSAN PASS',
      date: '2025/06/31',
      type: '卡片版',
      option: '選項: 24 小時',
      quantity: 1,
      price: 3678,
      imageUrl: '/images/busan-pass.png',
    },
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white rounded-md p-6 shadow">
      <h2 className="text-xl font-bold mb-4">購物車</h2>

      {cartItems.map((item, i) => (
        <CartItem key={i} {...item} />
      ))}

      {/* 底部操作列 */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <label>
            <input type="checkbox" checked readOnly className="accent-primary mr-1" />
            全選 ({cartItems.length})
          </label>
          <button className="text-gray-400 hover:text-red-500">刪除已選項目</button>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">
            1 件商品合計 <span className="text-lg font-bold text-black ml-2">NT${totalPrice.toLocaleString()}</span>
          </p>
          <p className="text-sm text-yellow-500 mt-1">KKday Points 🪙 123</p>
        </div>

        <button className="ml-4 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded">
          前往結帳
        </button>
      </div>
    </div>
  );
}