"use client";
import ReviewActivityRow from "@/components/Admin/ReviewActivityColum";
import ReviewActivityInfoMobile from "@/components/Admin/ReviwActivityInfoMobile";
import { useState } from "react";
import type { EventSummary } from "@/types/api/admin";
import clsx from "clsx";

interface Props {
  pendingEvents: EventSummary[];
  rejectEvents: EventSummary[];
  unpublishPending: EventSummary[];
  archivedEvents:EventSummary[];
}
export default function AdminEventList({ pendingEvents, rejectEvents, unpublishPending,archivedEvents }: Props) {
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
  type TabList = "待審核上架" | "已退回" | "已下架" | "待審核下架";
  const [activeTab, setActiveTab] = useState<TabList>("待審核上架");
  const selectMap: Record<TabList, EventSummary[]> = {
    "待審核上架": pendingEvents,
    "已退回": rejectEvents,
    "已下架": archivedEvents, // 如果有已下架資料請替換此行
    "待審核下架": unpublishPending
  };
  const selectList = selectMap[activeTab];

  return (
    <>
      {/* 篩選器（選填） */}
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {["待審核上架","待審核下架","已下架"].map((label) => (
          <button
            key={label}
            className={clsx(
              "cursor-pointer shrink-0 rounded-full border px-4 py-1 text-sm text-neutral-600 hover:bg-primary-300",
              activeTab === label && "bg-primary-300 text-white border-none"
            )}
            onClick={() => setActiveTab(label as TabList)}
          >
            {label}
          </button>
        ))}
      </div>
      {/* 桌機審核清單列表 */}
      <div className="pending_event_list hidden lg:block">
        {selectList.length? (
          <div className="grid grid-cols-[70px_2fr_50px_70px_80px_100px] items-center gap-4 border-b py-2 text-sm font-semibold text-neutral-500">
            {titleList.map((item) => (
              <span key={item.id}>{item.value}</span>
            ))}
          </div> 
        ): ""}

        {/* 列表 */}

        {selectList.length ? (
          selectList.map((act) => (
            <ReviewActivityRow key={act.id} event={act} />
          ))
        ) : (
          <p className="heading-4 text-primary-500">尚無目前符合條件的活動</p>
        )}
      </div>
      {/* 手機審核清單列表 */}
      <div className="pending_event_list_mobile space-y-4 lg:hidden">
        {selectList.length ? (
          selectList.map((act) => (
            <ReviewActivityInfoMobile key={act.id} event={act} />
          ))
        ) : (
          <p className="heading-4 text-primary-500">尚無目前符合條件的活動</p>
        )}
      </div>
    </>
  );
}
