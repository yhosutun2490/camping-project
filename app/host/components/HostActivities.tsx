"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

type ActivityStatus = "開放報名" | "尚未開放" | "活動結束";

// 模擬活動資料
const mockActivities = [
  {
    id: "1",
    startDate: "114.03.21",
    endDate: "114.03.23",
    image: "/main/bg_event_intro.png",
    title: "鹿角溪露營",
    description: "從戶外電影到營火烤棉花糖，從親子水池到趣味遊戲區，活動一整天不間斷.....",
    paid: 20,
    registered: 30,
    maxAttendees: 200,
    status: "開放報名" as ActivityStatus,
    startRegDate: "113.12.01",
    endRegDate: "114.03.15",
    tags: ["闔家同樂"],
  },
  {
    id: "2",
    startDate: "114.04.21",
    endDate: "114.04.23",
    image: "/main/bg_event_intro.png",
    title: "霧峰露營",
    description: "歡迎毛孩一同參加的夢幻露營活動來囉！在寬廣草地與溪流環繞的營地中，您可以與愛犬愛貓一起搭帳、散步、玩樂，享受無壓又安全的自然假期。",
    paid: 10,
    registered: 20,
    maxAttendees: 50,
    status: "尚未開放" as ActivityStatus,
    startRegDate: "113.12.01",
    endRegDate: "114.03.15",
    tags: ["寵物友善"],
  },
  {
    id: "3",
    startDate: "114.01.01",
    endDate: "114.01.03",
    image: "/main/bg_event_intro.png",
    title: "南庄露營",
    description: "想像一下，在星空下泡著熱水池，享用主廚現煮料理，夜晚睡在柔軟床鋪與香氛帳篷...",
    paid: 100,
    registered: 100,
    maxAttendees: 100,
    status: "活動結束" as ActivityStatus,
    startRegDate: "113.10.01",
    endRegDate: "113.12.31",
    tags: ["豪奢露營"],
  },
];

// 標籤篩選選項
const tagOptions = [
  { id: "pets", label: "寵物友善", icon: "solar:paw-outline", active: true },
  { id: "family", label: "闔家同樂", icon: "solar:users-group-two-rounded-outline", active: false },
  { id: "challenge", label: "進階挑戰", icon: "solar:flag-2-outline", active: false },
  { id: "beginner", label: "新手友善", icon: "solar:heart-outline", active: false },
  { id: "secret", label: "秘境探索", icon: "solar:compass-outline", active: false },
  { id: "luxury", label: "豪奢露營", icon: "solar:diamond-outline", active: false },
];

// 不同狀態對應的樣式
const statusStyles = {
  "開放報名": "bg-[#E3E9E2] text-[#5C795F]",
  "尚未開放": "bg-[#E7E7E7] text-[#6D6D6D]",
  "活動結束": "bg-[#FFDBDB] text-[#AB5F5F]"
};

function HostActivities() {
  const [activeTag, setActiveTag] = useState("pets");

  return (
    <div className="rounded-lg">
      {/* 標籤篩選 */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tagOptions.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setActiveTag(tag.id)}
            className={`flex items-center gap-1 px-3 py-2 rounded-2xl border text-sm font-normal transition-colors ${
              activeTag === tag.id
                ? "bg-[#F3F6F3] border-[#5C795F] text-[#5C795F]"
                : "bg-white border-transparent text-[#6D6D6D]"
            }`}
          >
            <Icon icon={tag.icon} width={24} height={24} />
            <span>{tag.label}</span>
          </button>
        ))}
      </div>

      {/* 表格容器 */}
      <div className="overflow-x-auto">
        {/* 表頭 */}
        <div className="grid grid-cols-[66px_284px_80px_80px_80px_66px_84px_auto] gap-6 pb-4 border-b border-[#A1B4A2] items-center">
          <div className="text-xs text-[#6D6D6D]">活動日期</div>
          <div className="text-xs text-[#6D6D6D]">活動名稱</div>
          <div className="text-xs text-[#6D6D6D] text-center">已付款/已報名</div>
          <div className="text-xs text-[#6D6D6D] text-center">人數上限</div>
          <div className="text-xs text-[#6D6D6D] text-center">狀態</div>
          <div className="text-xs text-[#6D6D6D]">報名期間</div>
          <div className="text-xs text-[#6D6D6D]">標籤</div>
          <div></div>
        </div>

        {/* 活動列表 */}
        <div className="divide-y divide-[#A1B4A2]">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className="grid grid-cols-[66px_284px_80px_80px_80px_66px_84px_auto] gap-6 py-5 items-center"
            >
              {/* 活動日期 */}
              <div className="flex flex-col items-center text-sm text-[#121212]">
                <span>{activity.startDate}</span>
                <span className="text-center">~</span>
                <span>{activity.endDate}</span>
              </div>

              {/* 活動名稱與圖片 */}
              <div className="flex items-center gap-4">
                <div className="relative w-[68px] h-[68px] rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-normal text-[#121212] leading-[1.5]">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-[#4F4F4F] leading-[1.5] line-clamp-2 h-9">
                    {activity.description}
                  </p>
                </div>
              </div>

              {/* 已付款/已報名 */}
              <div className="text-sm text-[#121212] text-center">
                {activity.paid} / {activity.registered}
              </div>

              {/* 人數上限 */}
              <div className="text-sm text-[#121212] text-center">
                {activity.maxAttendees}
              </div>

              {/* 狀態 */}
              <div className="flex justify-center">
                <span className={`px-3 py-1 rounded-full text-sm font-normal ${statusStyles[activity.status]}`}>
                  {activity.status}
                </span>
              </div>

              {/* 報名期間 */}
              <div className="flex flex-col items-center text-sm text-[#121212]">
                <span>{activity.startRegDate}</span>
                <span className="text-center">~</span>
                <span>{activity.endRegDate}</span>
              </div>

              {/* 標籤 */}
              <div className="flex justify-center">
                {activity.tags.map((tag, i) => {
                  const tagInfo = tagOptions.find(opt => opt.label === tag);
                  return (
                    <div key={i} className="flex items-center gap-2 bg-transparent rounded-2xl">
                      {tagInfo && (
                        <Icon icon={tagInfo.icon} width={20} height={20} className="text-[#121212]" />
                      )}
                      <span className="text-sm text-[#121212]">{tag}</span>
                    </div>
                  );
                })}
              </div>

              {/* 編輯按鈕 */}
              <div className="flex justify-end">
                <button 
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-colors ${
                    activity.status === "活動結束"
                      ? "bg-[#E7E7E7] text-[#B0B0B0] cursor-not-allowed"
                      : "bg-white text-[#121212] hover:bg-gray-50"
                  }`}
                  disabled={activity.status === "活動結束"}
                >
                  編輯
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HostActivities;
