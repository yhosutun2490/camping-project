"use client";
import Image from "next/image";
import MenuList from "@/components/MenuList";
import useClickOutSide from "@/hook/useClickOutSide";
import { useState , useRef} from "react";

type OpenState = true | false;
export default function MemberMenu() {
  const [isOpenMenu, setIsOpenMenu] = useState<OpenState>(false);
  const menuRef = useRef<HTMLDivElement>(null)
  useClickOutSide(menuRef,()=>{
    if (isOpenMenu) setIsOpenMenu(false)
  })
  const list = [
    {
      id: "1",
      title: "會員管理",
      link: "member",
    },
    {
      id: "2",
      title: "票卷管理",
      link: "member",
    },
  ];
  return (
    <>
      <div  ref={menuRef} className="avatar relative flex space-x-5 items-center">
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
            <MenuList className="absolute top-[50px] left-0 w-[100%]" list={list}>
              <p>登出</p>
            </MenuList>
          )}
        <p className="text-xl text-gray-300">Hi User</p>
      </div>
    </>
  );
}
