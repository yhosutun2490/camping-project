"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

type ActivityStatus = "開放報名" | "尚未開放報名" | "活動結束";

// 模擬活動資料
const mockActivities = [
  {
    id: "1",
    startDate: "114.03.21",
    endDate: "114.03.23",
    image: "/main/bg_event_intro.png",
    title: "鹿角溪露營",
    description: "從戶外電影到營火晚會花蓮，從親子共學到體驗活動，活動一整天不間斷...",
    paid: 20,
    registered: 30,
    maxAttendees: 200,
    status: "開放報名" as ActivityStatus,
    startRegDate: "113.12.01",
    endRegDate: "114.03.15",
    tags: ["團家同樂"],
  },
  {
    id: "2",
    startDate: "114.04.21",
    endDate: "114.04.23",
    image: "/main/bg_event_intro.png",
    title: "霧峰露營",
    description: "新的年起一同帶你體驗最棒的露營氣氛！在高海拔見證清澈的銀河中，帶你找回最大的初心，創造，玩樂，享受屬於自己的野營體驗。",
    paid: 10,
    registered: 20,
    maxAttendees: 50,
    status: "尚未開放報名" as ActivityStatus,
    startRegDate: "114.01.01",
    endRegDate: "114.04.15",
    tags: ["寵物友善"],
  },
  {
    id: "3",
    startDate: "114.01.01",
    endDate: "114.01.03",
    image: "/main/bg_event_intro.png",
    title: "南庄露營",
    description: "夢露一下，在最天下造物的小水，享用在地風味餐點，宛如成為永恆共處的感受...",
    paid: 100,
    registered: 100,
    maxAttendees: 100,
    status: "活動結束" as ActivityStatus,
    startRegDate: "113.10.01",
    endRegDate: "113.12.31",
    tags: ["豪華露營"],
  },
];

// 不同狀態對應的樣式，TODO 之後用 flag 取代 
const statusStyles = {
  "開放報名": "bg-primary-50 text-primary-700",
  "尚未開放報名": "bg-primary-100 text-primary-700",
  "活動結束": "bg-neutral-100 text-neutral-700"
};

function HostActivities() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-neutral-900">活動摘要</h3>
        <Link href="/host/activities" className="text-primary-500 hover:text-primary-700 flex items-center">
          <span>更多</span>
          <Icon icon="material-symbols:chevron-right" />
        </Link>
      </div>

      {/* 活動列表表格 */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* 表頭 */}
          <thead>
            <tr className="text-neutral-700 border-b border-neutral-100">
              <th className="text-center">活動日期</th>
              <th className="w-20"></th>
              <th>名稱</th>
              <th className="text-center">已付款/已報名</th>
              <th className="text-center">人數上限</th>
              <th className="text-center">狀態</th>
              <th className="text-center">報名期間</th>
              <th className="text-center">標籤</th>
              <th className="text-end"></th>
            </tr>
          </thead>
          
          {/* 表格內容 */}
          <tbody>
            {mockActivities.map((activity, index) => (
              <tr key={activity.id} className={index % 2 === 1 ? "bg-neutral-50" : ""}>
                {/* 活動日期 */}
                <td className="text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-medium text-xs text-neutral-700">{activity.startDate}</span>
                    <span className="text-xs text-neutral-600">至</span>
                    <span className="font-medium text-xs text-neutral-700">{activity.endDate}</span>
                  </div>
                </td>
                
                {/* 活動圖片 */}
                <td>
                  <div className="relative w-20 h-12 overflow-hidden rounded">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                
                {/* 名稱與描述 */}
                <td>
                  <div className="flex flex-col">
                    <span className="font-medium text-neutral-800">{activity.title}</span>
                    <p className="text-xs text-neutral-600 line-clamp-2">{activity.description}</p>
                  </div>
                </td>
                
                {/* 已付款/已報名 */}
                <td className="text-center">
                  <span className="text-neutral-700">{activity.paid}/{activity.registered}</span>
                </td>
                
                {/* 人數上限 */}
                <td className="text-center">
                  <span className="text-neutral-700">{activity.maxAttendees}</span>
                </td>
                
                {/* 狀態 */}
                <td className="text-center">
                  <div className="flex justify-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[activity.status]}`}>
                      {activity.status}
                    </span>
                  </div>
                </td>
                
                {/* 報名期間 */}
                <td className="text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-neutral-700">{activity.startRegDate}</span>
                    <span className="text-xs text-neutral-600">至</span>
                    <span className="text-xs text-neutral-700">{activity.endRegDate}</span>
                  </div>
                </td>
                
                {/* 標籤 */}
                <td className="text-center">
                  <div className="flex justify-center gap-1">
                    {activity.tags.map((tag, i) => (
                      <span key={i} className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                
                {/* 編輯按鈕 */}
                <td className="text-end">
                  <button className="btn btn-sm btn-ghost text-primary-500 hover:bg-primary-50">
                    <Icon icon="material-symbols:edit-outline-rounded" width={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HostActivities;
