"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useHostEvents } from "@/swr/host/useHostEvents";
import { useEventTags } from "@/swr/meta/useEventTags";
import type { EventStatus } from "@/types/api/host/events";

// 不同狀態對應的樣式
const statusStyles: Record<EventStatus, string> = {
  "草稿": "bg-[#E7E7E7] text-[#6D6D6D]",
  "已發布": "bg-[#E3E9E2] text-[#5C795F]",
  "已取消": "bg-[#FFDBDB] text-[#AB5F5F]",
  "已結束": "bg-[#FFDBDB] text-[#AB5F5F]"
};

// 日期格式化函式
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear() - 1911; // 民國年
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

function HostActivities() {
  const [activeTag, setActiveTag] = useState<string>("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  // 使用 API hook 取得主辦方活動資料和活動標籤
  const { events, error, isLoading } = useHostEvents();
  const { data: tagsData, error: tagsError, isLoading: tagsLoading } = useEventTags();

  // 載入中狀態
  if (isLoading || tagsLoading) {
    return (
      <div className="rounded-lg">
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-[#6D6D6D]">載入中...</div>
        </div>
      </div>
    );
  }

  // 錯誤狀態
  if (error || tagsError) {
    return (
      <div className="rounded-lg">
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-red-500">載入資料失敗</div>
        </div>
      </div>
    );
  }

  // 沒有活動資料
  if (!events || events.length === 0) {
    return (
      <div className="rounded-lg">
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-[#6D6D6D]">目前沒有活動資料</div>
        </div>
      </div>
    );
  }

  // 取得標籤列表
  const eventTags = tagsData?.data?.eventTags || [];

  return (
    <div>
      {/* 標籤篩選 */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* 全部選項 */}
        <button
          onClick={() => setActiveTag("")}
          className={`flex items-center gap-1 px-2 py-1 rounded-2xl border text-sm font-normal transition-colors ${
            activeTag === ""
              ? "bg-[#F3F6F3] border-[#5C795F] text-[#5C795F]"
              : "bg-white border-transparent text-[#6D6D6D]"
          }`}
        >
          <span>全部</span>
        </button>
        
        {/* API 標籤選項 */}
        {eventTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setActiveTag(tag.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded-2xl border text-sm font-normal transition-colors ${
              activeTag === tag.id
                ? "bg-[#F3F6F3] border-[#5C795F] text-[#5C795F]"
                : "bg-white border-transparent text-[#6D6D6D]"
            }`}
          >
            <span>{tag.name}</span>
          </button>
        ))}
      </div>

      {/* 活動列表 - 手機版卡片式佈局 */}
      <div className="block md:hidden space-y-0">
        {events.map((activity) => (
          <div key={activity.event_id} className="border-b border-[#A1B4A2] last:border-b-0">
            {/* 卡片主要內容 */}
            <div className="py-5 space-y-3">
              {/* 圖片和基本資訊 */}
              <div className="flex items-center gap-3">
                {/* 活動圖片 */}
                {activity.photos && activity.photos.length > 0 ? (
                  <div className="relative w-[68px] h-[68px] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={activity.photos[0].url}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[68px] h-[68px] rounded-lg bg-gray-200 flex-shrink-0 flex items-center justify-center">
                    <Icon icon="solar:image-outline" width={24} height={24} className="text-gray-400" />
                  </div>
                )}
                
                {/* 標題和狀態 */}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-normal text-[#121212] leading-[1.5]">
                      {activity.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-normal ${statusStyles[activity.active]}`}>
                        {activity.active}
                      </span>
                      <button
                        onClick={() => setExpandedCard(expandedCard === activity.event_id ? null : activity.event_id)}
                        className="p-1"
                      >
                        <Icon 
                          icon={expandedCard === activity.event_id ? "solar:alt-arrow-up-outline" : "solar:alt-arrow-down-outline"} 
                          width={24} 
                          height={24} 
                          className="text-[#4F4F4F]" 
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 描述 */}
              <p className="text-xs text-[#4F4F4F] leading-[1.5] line-clamp-2">
                {activity.description}
              </p>
            </div>

            {/* 展開的詳細資訊 */}
            {expandedCard === activity.event_id && (
              <div className="pb-5">
                <div className="bg-[#F6F6F6] border border-[#E7E7E7] rounded-lg p-3 space-y-3 mb-3">
                  {/* 活動日期 */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#6D6D6D]">活動日期</span>
                    <div className="flex items-center gap-1 text-xs text-[#121212]">
                      <span>{formatDate(activity.start_time)}</span>
                      <span>~</span>
                      <span>{formatDate(activity.end_time)}</span>
                    </div>
                  </div>
                  
                  {/* 已付款/已報名 */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#6D6D6D]">已付款/已報名</span>
                    <span className="text-xs text-[#121212]">- / -</span>
                  </div>
                  
                  {/* 人數上限 */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#6D6D6D]">人數上限</span>
                    <span className="text-xs text-[#121212]">{activity.max_participants}</span>
                  </div>
                  
                  {/* 報名期間 */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#6D6D6D]">報名期間</span>
                    <div className="flex items-center gap-1 text-xs text-[#121212]">
                      <span>-</span>
                      <span>~</span>
                      <span>-</span>
                    </div>
                  </div>
                  
                  {/* 標籤 */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#6D6D6D]">標籤</span>
                    <div className="flex flex-wrap gap-1">
                      {activity.tags.map((tag, i) => (
                        <span key={i} className="text-xs text-[#121212]">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* 編輯按鈕 */}
                <button 
                  className={`w-full py-2 px-4 rounded-2xl text-sm font-semibold transition-colors ${
                    activity.active === "已結束"
                      ? "bg-[#E7E7E7] text-[#B0B0B0] cursor-not-allowed"
                      : "bg-white text-[#121212] hover:bg-gray-50 border border-gray-200"
                  }`}
                  disabled={activity.active === "已結束"}
                >
                  編輯
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 桌面版表格佈局 */}
      <div className="hidden md:block overflow-x-auto">
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
          {events.map((activity) => (
            <div
              key={activity.event_id}
              className="grid grid-cols-[66px_284px_80px_80px_80px_66px_84px_auto] gap-6 py-5 items-center"
            >
              {/* 活動日期 */}
              <div className="flex flex-col items-center text-sm text-[#121212]">
                <span>{formatDate(activity.start_time)}</span>
                <span className="text-center">~</span>
                <span>{formatDate(activity.end_time)}</span>
              </div>

              {/* 活動名稱與圖片 */}
              <div className="flex items-center gap-4">
                {activity.photos && activity.photos.length > 0 ? (
                  <div className="relative w-[68px] h-[68px] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={activity.photos[0].url}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[68px] h-[68px] rounded-lg bg-gray-200 flex-shrink-0 flex items-center justify-center">
                    <Icon icon="solar:image-outline" width={24} height={24} className="text-gray-400" />
                  </div>
                )}
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
                - / -
              </div>

              {/* 人數上限 */}
              <div className="text-sm text-[#121212] text-center">
                {activity.max_participants}
              </div>

              {/* 狀態 */}
              <div className="flex justify-center">
                <span className={`px-3 py-1 rounded-full text-sm font-normal ${statusStyles[activity.active]}`}>
                  {activity.active}
                </span>
              </div>

              {/* 報名期間 */}
              <div className="flex flex-col items-center text-sm text-[#121212]">
                <span>-</span>
                <span className="text-center">~</span>
                <span>-</span>
              </div>

              {/* 標籤 */}
              <div className="flex justify-center">
                {activity.tags.map((tag, i) => (
                  <div key={i} className="flex items-center gap-2 bg-transparent rounded-2xl">
                    <span className="text-sm text-[#121212]">{tag}</span>
                  </div>
                ))}
              </div>

              {/* 編輯按鈕 */}
              <div className="flex justify-end">
                <button 
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-colors ${
                    activity.active === "已結束"
                      ? "bg-[#E7E7E7] text-[#B0B0B0] cursor-not-allowed"
                      : "bg-white text-[#121212] hover:bg-gray-50"
                  }`}
                  disabled={activity.active === "已結束"}
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
