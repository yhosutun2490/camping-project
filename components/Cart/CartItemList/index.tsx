"use client";

import { useState } from "react";
import CartItem from "@/components/Cart/CartItem";
import type { Order } from "@/components/Cart/CartItem";
import CheckboxStyle from "@/components/CheckBoxStyle";
import EmptyCart from "@/components/Cart/EmptyCart";


interface Props {
  orders: Order[] | [];
}
export default function CartItemList({ orders }: Props) {
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
  const totalPrice = selectedOrders?.reduce((sum, item) => sum + item.total_price, 0);
  const hasOrderList = orders?.length > 0
 
  function handleOnToggleSelect(order:Order):void {
    // 如果訂單已經存在需從清單移除，否則加入清單中
    const hasOrderInSelected = selectedOrders.find(item=>item.id === order.id)
    if (hasOrderInSelected) {
      setSelectedOrders(prev=> prev.filter(order=>order.id !== hasOrderInSelected.id ))
    } else {
      setSelectedOrders([...selectedOrders,order])
    }
  }
 

  return (
    <div className="bg-white rounded-md p-6 shadow">
      <h2 className="heading-5 text-primary-500">購物車</h2>

      {/*商品購物車有訂單資料*/}
      {hasOrderList && <div className="member_order_list">
        {orders.map((item) => (
          <CartItem
            key={item.id}
            order={item}
            isSelected={selectedOrders.some(selected => selected.id === item.id)}
            onToggleSelect={(order) => handleOnToggleSelect(order)}
          />
        ))}

        {/* 底部操作列 */}
        <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t">
          <div className="flex w-full md:w-fit items-center space-x-4 text-sm text-gray-600">
            {/* Checkbox */}
            <CheckboxStyle
              label="全選"
              value="select-all"
              checked={selectedOrders.length === orders.length}
              onChange={() => {
                if (selectedOrders.length === orders.length) {
                  setSelectedOrders([]);
                } else {
                  setSelectedOrders(orders);
                }
              }}
            />
            <button className="text-gray-400 hover:text-red-500">
              刪除已選項目
            </button>
          </div>

          <div className="text-right mr-4 md:ml-auto">
            <p className="text-sm text-gray-500">
              {selectedOrders.length?? "0"} 件商品合計
              <span className="heading-3 ml-2">
                NT${totalPrice.toLocaleString()}
              </span>
            </p>
          </div>

          <button className="btn-primary">前往結帳</button>
        </div>
      </div>}

      {/* 空購物車 */}
      {!hasOrderList && <EmptyCart/>}
    </div>
  );
}
