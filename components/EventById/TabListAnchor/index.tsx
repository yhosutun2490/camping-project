"use client";
import { useState } from "react";
import clsx from "clsx";
type TabList = {
  id: string;
  label: string;
  href: string;
};
type ActiveTab = "活動總覽" | "選擇方案" | "評價" | "活動介紹" | "主辦方簡介";

export default function TabListAnchor() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("活動總覽");
  const tabList: TabList[] = [
    {
      id: "1",
      label: "活動總覽",
      href: "#total",
    },
    {
      id: "2",
      label: "選擇方案",
      href: "#plan",
    },
    {
      id: "3",
      label: "評價",
      href: "#comment",
    },
    {
      id: "4",
      label: "活動介紹",
      href: "#event-intro",
    },
    {
      id: "5",
      label: "主辦方簡介",
      href: "#host-intro",
    },
  ];

  function handleClickTab(label: ActiveTab) {
    setActiveTab(label);
    const targetTab = tabList.find((tab) => tab.label === label);
    if (targetTab) {
      scrollIntoElement({ targetId: targetTab.href.slice(1) });
    }
  }
  function scrollIntoElement({
    targetId,
  }: {
    targetId: string;
  }) {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }
  }
  return (
    <div className="w-full h-full flex flex-wrap justify-between items-center space-x-2 lg:space-x-10 justify-center bg-white">
      {tabList.map((tab) => (
        <div
          key={tab.id}
          className={clsx(
            "h-full cursor-pointer flex items-center text-primary-500 hover:text-primary-700 transition-colors",
            activeTab === tab.label
              ? "border-b-2 border-primary-500 font-semibold"
              : "border-b-2 border-transparent"
          )}
          onClick={() => handleClickTab(tab.label as ActiveTab)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
