"use client";
import Image from "next/image";
import MenuList from "@/components/MenuList";
import useClickOutSide from "@/hook/useClickOutSide";
import { useRouter } from "next/navigation"
import { useState, useRef } from "react";
import { UserRole } from "@/types/page/main/user"
import { useUserLogout } from "@/swr/auth/useAuth"
import toast from 'react-hot-toast';

type OpenState = true | false;
type PropsType = {
  user?: UserRole | null
}
export default function MemberMenu({user}:PropsType) {
  const [isOpenMenu, setIsOpenMenu] = useState<OpenState>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutSide(menuRef, () => {
    if (isOpenMenu) setIsOpenMenu(false);
  });
  const router = useRouter()
  const {trigger} = useUserLogout()

  async function handleLogOut() {
    try {
      await trigger()
      toast.success('登出成功')
      router.refresh()
    } catch(err) {
      console.warn('登出err',err)
      toast.error('登出失敗')
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
  ];
  return (
    <>
      <div
        ref={menuRef}
        className="avatar relative flex space-x-5 items-center"
      >
        <div className="w-[35px] h-[35px] rounded-full">
          <Image
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            width={35}
            height={35}
            alt="Picture of the author"
            className="cursor-pointer"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          />
        </div>
        {isOpenMenu && (
          <MenuList className="absolute top-[50px] left-0 w-[120%]" list={list}>
            <p onClick={handleLogOut}>登出</p>
          </MenuList>
        )}
        <p className="text-xl text-gray-300">Hi {user?.username}</p>
      </div>
    </>
  );
}
