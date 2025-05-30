"use client";
import { useState } from "react";
import clsx from "clsx";

type TabList = {
  id: string;
  label: string;
  href: string;
};
type ActiveTab = "總覽" | "選擇方案" | "評價" | "活動介紹" | "主辦方簡介";

interface Props {
  offset?: number;
}

export default function TabListAnchor({ offset }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("總覽");
  const tabList: TabList[] = [
    {
      id: "1",
      label: "總覽",
      href: "#total",
    },
    {
      id: "2",
      label: "選擇方案",
      href: "#plan",
    },
    {
      id: "3",
      label: "最新評論",
      href: "#event_comment",
    },
    {
      id: "4",
      label: "活動介紹",
      href: "#event-intro",
    },
    {
      id: "5",
      label: "行前提醒",
      href: "#host-intro",
    },
  ];

  function handleClickTab(label: ActiveTab, offset?: number) {
    setActiveTab(label);
    const targetTab = tabList.find((tab) => tab.label === label);
    if (targetTab) {
      const isMobile = window.innerWidth < 1024;
      const dynamicOffset = offset ?? (isMobile ? 52 : 90);

      scrollIntoElement({
        targetId: targetTab.href.slice(1),
        containerId: "main-scroll-container",
        offset: dynamicOffset,
      });
    }
  }
  function scrollIntoElement({
    targetId,
    containerId,
    offset,
  }: {
    targetId: string;
    containerId: string;
    offset: number;
  }) {
    const el = document.getElementById(targetId);
    const container = document.getElementById(containerId);
    if (el && container) {
      const y = el.offsetTop - offset + 40;
      container.scrollTo({ top: y, behavior: "smooth" });
    }
  }
  return (
    <div className="w-full h-full relative px-[5%] md:px-[8%] 2xl:px-[15%] flex justify-between lg:justify-start items-center space-x-2 lg:space-x-10 bg-primary-50">
      {tabList.map((tab) => (
        <div
          key={tab.id}
          className={clsx(
            "h-full cursor-pointer flex items-center sm:heading-5 hover:text-primary-700 transition-colors",
            activeTab === tab.label
              ? `text-primary-500 font-semibold relative
              after:content-[''] after:rotate-[180deg] after:absolute 
              after:-bottom-[2px]
              after:left-1/2 after:-translate-x-1/2
              after:w-[20px]
              after:h-[10px] 
              lg:after:w-[30px] 
              lg:after:h-[15px] 
              after:rounded-b-full 
              after:bg-primary-50 
              after:border-2
              after:border-primary-500
              after:border-t-primary-50
              after:z-10`
              : "text-neutral-500 hover:text-primary-700"
          )}
          onClick={() => handleClickTab(tab.label as ActiveTab, offset)}
        >
  
          {tab.label}
        </div>
      ))}
    </div>
  );
}
