"use client";

import type { CartPlanItem } from "@/stores/useShoppingCartStore";
import ImageSkeleton from "@/components/ImageSkeleton";
import IconWrapper from "@/components/ClientIcon/IconWrapper";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore"; // 匯入 zustand store
import toast from "react-hot-toast";

interface Props {
  plans: CartPlanItem[];
  className?: string;
  setIsCartPreviewOpen: (isOpen: boolean) => void; // 可選，若需要控制開關
}

export default function CartPreviewDropdown({
  plans,
  className = "",
  setIsCartPreviewOpen,
}: Props) {
  const removeCartItem = useShoppingCartStore((state) => state.removePlan);

  function handleClickCartLogin() {
    setTimeout(() => {
      setIsCartPreviewOpen(false);
    }, 100);
  }
  function handleDeleteCartItem(planId: string) {
    removeCartItem(planId);
    toast.success("刪除購物車品項成功");
  }

  /** 計算單一方案（含加購品）的總價  */
  function planTotalPrice(plan: CartPlanItem) {
    const addonsTotal = plan.addonBox.reduce(
      (sum, addon) => sum + addon.price,
      0
    );
    return plan.price + addonsTotal;
  }

  return (
    <div
      className={`absolute top-[135%] -right-50 w-[400px] max-h-[500px] bg-white border rounded shadow-lg z-50 ${className}`}
    >
      <div className="max-h-[400px] overflow-y-auto divide-y">
        {plans.map((plan,index) => (
          <div key={plan.id + index} className="p-4 flex gap-3">
            <div className="flex-1">
              <div className="event_plan_info flex space-x-6">
                <div className="cart_item_img w-25 max-h-15 aspect-[5/3]">
                  <ImageSkeleton
                    src={plan.event.event_photo_url}
                    alt={plan.event.event_name}
                    width={64}
                    height={64}
                    sizes="100%"
                    fallbackSrc="/main/main_bg_top_3.jpg"
                    className="w-full object-cover rounded"
                  />
                </div>
                <div className="heading-6 text-primary-500 space-y-1">
                  <p>{plan.event.event_name}</p>
                  <p className="heading-7 text-neutral-950">{plan.title}</p>
                  {plan.addonBox.map((addon) => (
                    <div key={addon.id} className="heading-7 text-neutral-400">
                      {addon.name}
                    </div>
                  ))}
                </div>
                <div
                  className="delete_order_icon cursor-pointer"
                  onClick={() => handleDeleteCartItem(plan.id)}
                >
                  <IconWrapper
                    icon="material-symbols:delete-outline-rounded"
                    className="text-gray-500"
                  />
                </div>
              </div>

              <div className="cart_item_price">
                <div className="text-sm text-neutral-500">截止日:{plan.deadline}</div>
                <div className="text-sm text-neutral-500">數量 x 1</div>
                <div className="heading-5 text-primary-500 mt-1">
                  NT${planTotalPrice(plan)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 flex justify-between items-center border-t">
        <span className="text-sm text-neutral-600">
          共 {plans.length} 件暫存商品
        </span>
        <label
          htmlFor="login"
          className="btn-primary"
          onClick={handleClickCartLogin}
        >
          登入購物車和報名
        </label>
      </div>
    </div>
  );
}
