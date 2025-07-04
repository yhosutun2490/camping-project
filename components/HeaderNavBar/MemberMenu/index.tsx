"use client";
import Image from "next/image";
import MenuList from "@/components/MenuList";
import useClickOutSide from "@/hook/useClickOutSide";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useUserLogout } from "@/swr/auth/useAuth";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore"; // 登出需清空購物車store
import { useMemberLogin } from "@/stores/useMemberLogin"; // 判斷使用者role
import { useGetMemberOrders } from "@/swr/member/orders/useMemberOrders";

type OpenState = true | false;
type PropsType = {
  user?: string;
};
export default function MemberMenu({ user }: PropsType) {
  const [isOpenMenu, setIsOpenMenu] = useState<OpenState>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutSide(menuRef, () => {
    if (isOpenMenu) setIsOpenMenu(false);
  });
  const router = useRouter();
  const { trigger } = useUserLogout();
  const { clearOrdersCache } = useGetMemberOrders() // 登出時更新購物狀態歸零
  const resetShoppingCartStore = useShoppingCartStore((state) => state.reset);
  const memberRole = useMemberLogin((state) => state.member.role);

  async function handleLogOut() {
    try {
      await trigger(null);
      toast.success("登出成功");
      resetShoppingCartStore();
      clearOrdersCache(); // false = 不重新 fetch
      router.push("/");
      // 重新整理所有 app-router 的 data fetching
      router.refresh();
    } catch (err) {
      console.warn("登出err", err);
      toast.error("登出失敗");
    }
  }

  const list = [
    {
      id: "1",
      title: "會員管理",
      link: "/member",
    },
    {
      id: "2",
      title: "票卷管理",
      link: "/member/tickets",
    },
    {
      id: "3",
      title: "主辦方管理",
      link: "/host",
    },
    {
      id: "4",
      title: "審核活動",
      link: "/admin/activity",
    },
  ];

  // 依角色過濾清單
  const filteredList = list.filter(({ link }) => {
    // 1) /host* → host、admin 都能看
    if (link.startsWith("/host")) {
      return memberRole === "host";
    }

    // 2) /admin* → 只有 admin 能看
    if (link.startsWith("/admin")) {
      return memberRole === "admin";
    }

    // 3) 其他 → 全部角色都能看
    return true;
  });
  return (
    <>
      <div
        ref={menuRef}
        className="avatar relative flex gap-2 items-center
        bg-white/10 backdrop-blur-lg
        hover:cursor-pointer
        hover:bg-primary-100 rounded-full p-[0.5rem]"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <div className="rounded-full">
          <Image
            src="/header/user_image.jpg"
            width={32}
            height={32}
            alt="Picture of the author"
            className="cursor-pointer"
          />
        </div>
        {isOpenMenu && (
          <MenuList
            className="absolute top-[50px] text-sm w-[200px] left-[-140px] md:left-0 md:w-[120%]"
            list={filteredList}
            closeMenu={() => setIsOpenMenu(false)}
          >
            <p onClick={handleLogOut}>登出</p>
          </MenuList>
        )}
        <p className="hidden md:block text-xl text-primary-500 ml-[0.5rem]">
          <span className="inline-block max-w-[50px] truncate align-bottom">
            {user}
          </span>
          您好
        </p>
        <Icon
          icon="carbon:triangle-down-solid"
          className="text-primary-500"
          width={12}
          height={12}
        />
      </div>
    </>
  );
}
