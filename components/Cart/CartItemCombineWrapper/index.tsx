"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import CartItemList from "@/components/Cart/CartItemList";
import type { Order } from "@/components/Cart/CartItem";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { useMemberLogin } from "@/stores/useMemberLogin"; // 判斷登入狀態
import { usePostMemberOrders } from "@/swr/member/orders/useMemberOrders";

interface Props {
  serverOrders: Order[]; // Server Component 傳進來的
}

export default function CartItemCombineWrapper({ serverOrders }: Props) {
  const router = useRouter();
  const memberData = useMemberLogin((state) => state.member);
  const isMemberLogin = !!memberData?.id; // 是否登入

  /* ===== 取得暫存購物車 ===== */
  const plans = useShoppingCartStore((s) => s.plans);
  const resetCart = useShoppingCartStore((s) => s.reset);
  const planOrderList = useMemo(() => {
    return plans.map((plan) => ({
      event_plan_id: plan.id,
      quantity: 1,
      event_addons: plan.addonBox.map((addon) => ({
        id: addon.id,
        name: addon.name,
        price: addon.price,
      })),
    }));
  }, [plans]);

  // ===== 創建會員訂單 SWR ===== */
  const { trigger: triggerPostOrder } = usePostMemberOrders();

  /* ===== 登入後自動同步 Plans ===== */
  useEffect(() => {
    if (!isMemberLogin || planOrderList.length === 0) return;

    (async () => {
      try {
        // 逐筆送出
        for (const plan of planOrderList) {
          await triggerPostOrder(plan); 
        }
        // 成功後清本地 + 重新撈訂單
        resetCart();
        router.refresh(); // 或 mutate('/api/member/orders')
      } catch (err) {
        console.error("同步購物車失敗：", err);
      }
    })();
  }, [isMemberLogin, planOrderList, triggerPostOrder, resetCart, router]);

  /* ===== 交給原本 UI 清單 ===== */
  return <CartItemList orders={serverOrders} />;
}
