"use client"

import { useState } from "react";
import CartItem from "@/components/Cart/CartItem";
import type { Order } from "@/components/Cart/CartItem";
import CheckboxStyle from "@/components/CheckBoxStyle";

const mockOrders: Order[] = [
  {
    id: "a1f9b888-1e44-4f45-88d2-9249f7f03e1c",
    member: "member001",
    event_plan_id: "plan-001",
    event_plan_price: 1800,
    quantity: 1,
    event_name: "森山烤肉露營去露營去",
    event_addons: [
      { name: "烤肉架租借", price: 300 },
      { name: "延後退房（+2小時）", price: 200 },
    ],
    total_price: 4300,
    book_at: "2025-04-12T09:00:00Z",
    created_at: "2025-04-12T09:01:00Z",
  },
  {
    id: "b271ae31-93a0-4dd6-b4e7-d6f96d688e13",
    member: "member002",
    event_plan_id: "plan-002",
    event_plan_price: 2200,
    event_name: "賞鳥露營去",
    quantity: 1,
    event_addons: [{ name: "望遠鏡租借（每晚）", price: 500 }],
    total_price: 2700,
    book_at: "2025-04-13T15:30:00Z",
    created_at: "2025-04-13T15:30:10Z",
  },
  {
    id: "cb35ffdd-0ba1-40bb-8a65-91a23032e7b9",
    member: "member003",
    event_name: "賞鳥露營去",
    event_plan_id: "plan-003",
    event_plan_price: 1500,
    quantity: 1,
    event_addons: [],
    total_price: 4500,
    book_at: "2025-04-14T18:45:00Z",
    created_at: "2025-04-14T18:46:00Z",
  },
  {
    id: "d9770e90-1d56-4d02-bb10-920e42a2d6f8",
    member: "member004",
    event_name: "賞鳥露營去",
    event_plan_id: "plan-004",
    event_plan_price: 2000,
    quantity: 1,
    event_addons: [
      { name: "延後退房（+2小時）", price: 200 },
      { name: "晚餐加購（豪華燒肉）", price: 600 },
    ],
    total_price: 2800,
    book_at: "2025-04-15T11:20:00Z",
    created_at: "2025-04-15T11:21:00Z",
  },
];

export default function CartItemList() {

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const totalPrice = mockOrders.reduce(
    (sum, item) => sum + item.total_price,
    0
  );

  return (
    <div className="bg-white rounded-md p-6 shadow">
      <h2 className="heading-5 text-primary-500">購物車</h2>

      {mockOrders.map((item) => (
        <CartItem
          key={item.id}
          order={item}
          isSelected={selectedOrders.includes(item.id)}
          onToggleSelect={(id) =>
            setSelectedOrders((prev) =>
              prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
            )
          }
        />
      ))}

      {/* 底部操作列 */}
      <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t">
        <div className="flex w-full md:w-fit items-center space-x-4 text-sm text-gray-600">
           {/* Checkbox */}
          <CheckboxStyle
            label="全選"
            value="select-all"
            checked={selectedOrders.length === mockOrders.length}
            onChange={() => {
              if (selectedOrders.length === mockOrders.length) {
                setSelectedOrders([]);
              } else {
                setSelectedOrders(mockOrders.map((item) => item.id));
              }
            }}
          />
          <button className="text-gray-400 hover:text-red-500">
            刪除已選項目
          </button>
        </div>

        <div className="text-right mr-4 md:ml-auto">
          <p className="text-sm text-gray-500">
            商品合計{" "}
            <span className="text-lg font-bold text-black ml-2">
              NT${totalPrice.toLocaleString()}
            </span>
          </p>
        </div>

        <button className="btn-primary">前往結帳</button>
      </div>
    </div>
  );
}
