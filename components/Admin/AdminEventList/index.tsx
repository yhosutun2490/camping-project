"use client";
import ReviewActivityRow from "@/components/Admin/ReviewActivityColum";
import ReviewActivityInfoMobile from "@/components/Admin/ReviwActivityInfoMobile";
import { useState } from "react";
import type { EventSummary } from "@/types/api/admin";
import clsx from "clsx";

interface Props {
  pendingEvents: EventSummary[],
  rejectEvents: EventSummary[]
}
export default function AdminEventList({pendingEvents,rejectEvents}:Props) {
  const titleList = [
    {
      id: "1",
      value: "活動日期",
      isTextCenter: false,
    },
    {
      id: "2",
      value: "活動內容",
      isTextCenter: false,
    },
    {
      id: "3",
      value: "名額",
      isTextCenter: true,
    },
    {
      id: "4",
      value: "單價(最高)",
      isTextCenter: true,
    },
    {
      id: "5",
      value: "狀態",
      isTextCenter: true,
    },
    {
      id: "6",
      value: "操作",
      isTextCenter: true,
    },
  ];
  type TabList = "待審核" | "已退回"
  const [activeTab,setActiveTab] = useState<TabList>('待審核') 
  const selectList =  activeTab === '待審核' ? pendingEvents : rejectEvents

  return (
    <>
      {/* 篩選器（選填） */}
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {["待審核", "已退回"].map((label) => (
          <button
            key={label}
            className={
                clsx("cursor-pointer shrink-0 rounded-full border px-4 py-1 text-sm text-neutral-600 hover:bg-primary-300",
                    activeTab === label && 'bg-primary-300 text-white border-none'
                )}
            onClick={()=>setActiveTab(label as TabList)}
          >
            {label}
          </button>
        ))}
      </div>
      {/* 桌機審核清單列表 */}
      <div className="pending_event_list hidden lg:block">
        <div className="grid grid-cols-[70px_2fr_50px_70px_80px_100px] items-center gap-4 border-b py-2 text-sm font-semibold text-neutral-500">
          {titleList.map((item) => (
            <span key={item.id}>{item.value}</span>
          ))}
        </div>

        {/* 列表 */}
        {selectList.map((act) => (
          <ReviewActivityRow key={act.id} event={act} />
        ))}
      </div>
      {/* 手機審核清單列表 */}
      <div className="pending_event_list_mobile lg:hidden">
        {selectList.map((act) => (
          <ReviewActivityInfoMobile key={act.id} event={act} />
        ))}
      </div>
    </>
  );
}
