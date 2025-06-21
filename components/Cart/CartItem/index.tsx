"use client";
import IconWrapper from "@/components/ClientIcon/IconWrapper";
import CheckboxStyle from "@/components/CheckBoxStyle";
import DeleteCartItemModal from "../DeleteCartItemModal";
import type { MemberOrder } from "@/types/api/member/orders";
import ImageSkeleton from "@/components/ImageSkeleton";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export type Order = MemberOrder;

type CartItemProps = {
  order: Order;
  isSelected: boolean;
  onToggleSelect: (order: Order) => void;
  setSelectedOrders?: React.Dispatch<React.SetStateAction<Order[]>>
};

export default function CartItem({
  order,
  isSelected,
  onToggleSelect,
  setSelectedOrders
}: CartItemProps) {

  const deleteModalRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function handleOnClickOrderEventInfo(order: Order) {
    const eventId = order.event_info.id;
    const orderId = order.id;
    const planId = order.event_plan.id;
    const addonIds = order.event_addons.map((item) => item.id);

    const query = new URLSearchParams({
      orderId,
      planId,
      addonIds: addonIds.join(","),
    }).toString();
    router.push(`/event/${eventId}?${query}`);
  }

  async function handleOnClickDeleteIcon(orderId: string) {
    if (!orderId) return;
    deleteModalRef.current?.click()
  }
  return (
    <div className="relative w-full flex flex-col gap-4 md:flex-row justify-between border-b py-4">
      <div className="order_event_info flex">
        {/* Checkbox */}
        <div className="self-start lg:self-center flex-shrink-0 mr-4 mt-1">
          <CheckboxStyle
            value={order.id}
            checked={isSelected}
            onChange={() => onToggleSelect(order)}
          />
        </div>
        {/* 活動圖片 */}
        <div className="w-[25dvw] max-w-[120px] max-h-[72px] aspect-[5/3] mr-4 rounded-md">
          <ImageSkeleton
            src={order.event_info.image || "/event_id/event_intro_test.png"}
            alt="訂單活動照片"
            fill
            className="object-cover w-full rounded-xl"
            fallbackSrc="/main/main_bg_top_3.jpg"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p
                className="font-bold text-base 
              text-neutral-800 underline cursor-pointer hover:text-blue-500"
                onClick={() => handleOnClickOrderEventInfo(order)}
              >
                {order.event_info.name}
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
        <div className="flex space-x-2 text-gray-400 text-xl ml-auto">
          <IconWrapper icon="material-symbols-light:favorite-outline" />
          <div
            className="delete_order_icon cursor-pointer"
            onClick={() => handleOnClickDeleteIcon(order.id)}
          >
            <IconWrapper icon="material-symbols:delete-outline-rounded" />
          </div>
        </div>
        <DeleteCartItemModal
          modalId={order.id}
          modalRef={deleteModalRef}
          itemCounts={1}
          orderIds={[order.id]}
          setSelectedOrders={setSelectedOrders}
        />
      </div>
    </div>
  );
}
