"use client";
import IconWrapper from "@/components/ClientIcon/IconWrapper";
import CheckboxStyle from "@/components/CheckBoxStyle";
import type { MemberOrder } from "@/types/api/member/orders";
import ImageSkeleton from "@/components/ImageSkeleton";
import { useDeleteMemberOrders } from "@/swr/member/orders/useMemberOrders";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export type Order = MemberOrder;

type CartItemProps = {
  order: Order;
  isSelected: boolean;
  onToggleSelect: (order: Order) => void;
};

export default function CartItem({
  order,
  isSelected,
  onToggleSelect,
}: CartItemProps) {
  // SWR 刪除會員訂單API
  const { trigger } = useDeleteMemberOrders();
  const router = useRouter();

  function handleOnClickOrderEventInfo(order: Order) {
    console.log("點選的訂單", order);
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
    try {
      await trigger({ id: orderId });
      toast.success("刪除購物車選項成功");
      router.refresh();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        console.log("api有誤", message);
        toast.error(message);
      }
    }
  }
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
              text-neutral-800 underline"
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
        <div className="flex space-x-2 text-gray-400 text-xl">
          <IconWrapper icon="material-symbols-light:favorite-outline" />
          <div
            className="delete_order_icon cursor-pointer"
            onClick={() => handleOnClickDeleteIcon(order.id)}
          >
            <IconWrapper icon="material-symbols:delete-outline-rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
