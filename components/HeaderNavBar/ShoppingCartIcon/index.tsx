"use client";
import IconWrapper from "@/components/ClientIcon/IconWrapper";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore"; // 匯入 zustand store
import { useMemberLogin } from "@/stores/useMemberLogin";
import CartPreviewDropdown from "@/components/HeaderNavBar/ShoppingCartIcon/CartPreviewDropdown";
import { useEffect, useRef } from "react";
import useClickOutside from "@/hook/useClickOutSide";

export default function ShoppingCartIcon() {
  const router = useRouter();
  const plans = useShoppingCartStore((state) => state.plans); // ⬅購物車資料
  useEffect(() => {
    /** 觸發 persist middleware 從 localStorage 讀資料 */
    useShoppingCartStore.persist.rehydrate();
  }, []);
  const memberData = useMemberLogin((state) => state.member);
  const isMemberLogin = !!memberData?.id; // 是否登入
  const hasItems = plans.length > 0; // 購物車是否有物件

  const [IsCartPreviewOpen, setIsCartPreviewOpen] = useState(false); // 未登入購物車小彈窗
  const cartPreviewRef = useRef<HTMLDivElement>(null);
  useClickOutside(cartPreviewRef, () => setIsCartPreviewOpen(false)); // 點擊外部關閉購物車小彈窗

  function handleOnClickCartIcon(e: React.MouseEvent) {
    e.stopPropagation();
    if (isMemberLogin) router.push("/cart");
    else {
      setIsCartPreviewOpen(!IsCartPreviewOpen);
    }
  }

  return (
    <div
      className="relative shopping-cart flex items-center"
      onClick={handleOnClickCartIcon}
    >
      <IconWrapper
        icon={"mdi:shopping-cart-outline"}
        className="hover:text-primary-300"
      />
      {hasItems && (
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
      )}
      {IsCartPreviewOpen && (
        <div
          className="preview_cart"
          ref={cartPreviewRef}
          onClick={(e) => e.stopPropagation()}
        >
          <CartPreviewDropdown
            plans={plans}
            setIsCartPreviewOpen={setIsCartPreviewOpen}
          />
        </div>
      )}
    </div>
  );
}
