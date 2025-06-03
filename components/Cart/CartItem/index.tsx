"use client";
import Image from "next/image";
import IconWrapper from "@/components/ClientIcon/IconWrapper";
import CheckboxStyle from "@/components/CheckBoxStyle";

type EventAddon = {
  name: string;
  price: number;
};

export type Order = {
  id: string;
  member: string;
  event_plan_id: string;
  event_plan_price: number;
  event_name: string;
  quantity: number;
  event_addons: EventAddon[];
  total_price: number;
  book_at: string;
  created_at: string;
  photo_url?: string;
};

type CartItemProps = {
  order: Order;
  isSelected: boolean;
  onToggleSelect: (order:Order) => void;
};

export default function CartItem({
  order,
  isSelected,
  onToggleSelect,
}: CartItemProps) {
  return (
    <div className="relative w-full flex flex-col gap-4 md:flex-row justify-between border-b py-4">
      <div className="order_event_info flex">
        {/* Checkbox */}
        <div className="self-center flex-shrink-0 mr-4 mt-1">
          <CheckboxStyle
            value={order.id}
            checked={isSelected}
            onChange={() => onToggleSelect(order)}
          />
        </div>
        {/* 活動圖片 */}
        <div className="relative w-[25vw] max-w-[120px] aspect-[5/3] mr-4 rounded-md">
          <Image
            src={order.photo_url || "/event_id/event_intro_test.png"}
            alt="訂單活動照片"
            fill
            className="object-cover w-full rounded-xl"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-base text-neutral-800">
                {order.event_name}
              </p>
              {/* 加購項目 */}
              <div className="addon flex flex-wrap gap-1 mt-1">
                {order.event_addons.map((item, index) => (
                  <span key={index} className="text-sm text-gray-400 mr-2">
                    • {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price & Actions */}
      <div className="flex items-center md:justify-between ml-4 gap-4 h-full">
        <p className="text-sm text-neutral-500 whitespace-nowrap">
          數量 x {order.quantity}
        </p>
        <p className="font-bold text-black whitespace-nowrap">
          NT${order.total_price.toLocaleString()}
        </p>
        <div className="flex space-x-2 text-gray-400 text-xl">
          <IconWrapper icon="material-symbols-light:favorite-outline" />
          <IconWrapper icon="material-symbols:delete-outline-rounded" />
        </div>
      </div>
    </div>
  );
}
