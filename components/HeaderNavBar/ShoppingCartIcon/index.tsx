"use client";
import IconWrapper from "@/components/ClientIcon/IconWrapper";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore"; // 匯入 zustand store
import { useMemberLogin } from "@/stores/useMemberLogin";
import CartPreviewDropdown from "@/components/HeaderNavBar/ShoppingCartIcon/CartPreviewDropdown";

import useClickOutside from "@/hook/useClickOutSide";
// import clsx from "clsx";
// swr 取得會員db訂單實際資料
import { useGetMemberOrders } from "@/swr/member/orders/useMemberOrders";


export default function ShoppingCartIcon() {
  const router = useRouter();
  const pathname = usePathname();
  const isCartPage = pathname === '/cart';
  const plans = useShoppingCartStore((state) => state.plans); // 未登入暫存購物車資料
  const { data: memberOrders } = useGetMemberOrders(); // 資料庫中會員購物車資料
  // const [isClicked, setISClicked] = useState<boolean>(false);

  const memberData = useMemberLogin((state) => state.member);
  const isMemberLogin = !!memberData?.id; // 是否登入

  const hasItems = useMemo(() => {
    return plans.length > 0 || (memberOrders?.length ?? 0) > 0;
  }, [plans, memberOrders]);



  useEffect(() => {
    /** 觸發 persist middleware 從 localStorage 讀資料 */
    useShoppingCartStore.persist.rehydrate();
  }, []);


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
      {hasItems ? (
        <div 
          className="relative inline-flex items-center justify-center"
        >
          {/* 擴散邊框動畫 */}
          {/* <span className={clsx(
            "absolute h-[26px] w-[26px] rounded-full",
            (!isCartPage)  &&  "border-primary-300 border-1 animate-ping opacity-75"
          )}>
          </span>
        */}
          {/* 實際 icon */}
          <IconWrapper
            icon="streamline-kameleon-color:cart-duo"
            className="hover:text-primary-300"
            width={30}
            height={30}
          />
          { (!isCartPage) &&　<span className="absolute -top-1 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>}
        </div>
      ) : (
        <IconWrapper
          icon={"mdi:shopping-cart-outline"}
          className="hover:text-primary-300"
          width={24}
          height={24}
        />
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
