// components/SidebarToggle.tsx
"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import AvatarCard from "@/components/Member/AvatarCard";
import SideBarMenu from "@/components/Member/SideBarMenu";
import clsx from "clsx";

interface SidebarToggleProps {
  memberInfo: {
    photo_url: string;
    username: string;
  };
  menuLists: {
    id: string;
    link: string;
    title: string;
    icon: string;
  }[];
}

export default function SidebarToggle({
  memberInfo,
  menuLists,
}: SidebarToggleProps) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* 選單選單按鈕 */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className={`cursor-pointer bg-primary-300 md:hidden absolute top-[60%] -translate-y-[50%] z-50 rounded-full shadow p-2
        ${showSidebar ? "left-[90%]" : "-left-[20px] flex"}`}
        aria-label={"Toggle Sidebar"}
      >
        <Icon
          icon={showSidebar ? "fe:arrow-left" : "fe:arrow-right"}
          className={clsx("w-6 h-6 relative", { "left-2": !showSidebar })}
        />
      </button>

      {/* 側邊欄區塊 */}
      <div
        className={`
            aside_scroll_container
            z-40 transition-transform duration-300 ease-in-out
            fixed inset-0 top-[120px]  bg-white p-6
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            md:relative md:translate-x-0 md:bg-transparent md:p-0 md:block md:top-0
        `}
      >
        <aside className="sticky top-[40px] self-start space-y-6">
          <AvatarCard userInfo={memberInfo} />
          <SideBarMenu lists={menuLists} setShowSidebar={setShowSidebar} />
        </aside>
      </div>
    </>
  );
}
