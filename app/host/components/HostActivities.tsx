'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useHostEvents } from '@/swr/host/useHostEvents';
import { useEventTags } from '@/swr/meta/useEventTags';
import { useSubmitEvent } from '@/swr/events/useSubmitEvent';
import { useHostEventDetail } from '@/swr/events/useHostEventDetail';
import type { EventStatus } from '@/types/api/host/events';

// 狀態映射對照表 - 將英文狀態轉換為中文顯示
const statusMapping: Record<string, string> = {
  // 英文狀態
  'draft': '草稿',
  'pending': '審核中', 
  'published': '已發佈',
  'archived': '已下架',
  // 中文狀態（直接對應）
  '草稿': '草稿',
  '審核中': '審核中',
  '已發佈': '已發佈', 
  '已下架': '已下架',
};

// 狀態轉換函式
const getDisplayStatus = (status: EventStatus): string => {
  return statusMapping[status] || status;
};

// 不同狀態對應的樣式 - 全新設計
const statusStyles: Record<string, string> = {
  '草稿': 'bg-[#F6F6F6] text-[#6D6D6D] border border-[#E7E7E7]',
  '審核中': 'bg-[#FFF7E6] text-[#D4A056] border border-[#F0D999]',
  '已發佈': 'bg-[#E3E9E2] text-[#5C795F] border border-[#A1B4A2]',
  '已下架': 'bg-[#FFEBEE] text-[#AB5F5F] border border-[#D4A5A5]'
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
  const router = useRouter();
  const [activeTag, setActiveTag] = useState<string>('');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null);

  // 使用 API hook 取得主辦方活動資料和活動標籤
  const { events, error, isLoading } = useHostEvents(activeTag);
  const {
    data: tagsData,
    error: tagsError,
    isLoading: tagsLoading,
  } = useEventTags();
  const { submitEvent } = useSubmitEvent();
  const { getEventDetail } = useHostEventDetail();

  // 處理編輯活動
  const handleEditEvent = async (eventId: string) => {
    try {
      setLoadingEventId(eventId);
      // 先取得活動詳情
      const response = await getEventDetail({ eventId });
      
      if (response?.data) {
        // 如果成功取得活動資料，導向編輯頁面
        router.push(`/edit-activity/${eventId}`);
      } else {
        toast.error('無法取得活動資料');
      }
    } catch (error) {
      console.error('取得活動詳情失敗:', error);
      toast.error('取得活動資料失敗，請稍後再試');
    } finally {
      setLoadingEventId(null);
    }
  };

  // 處理提交活動審核
  const handleSubmitEvent = async (eventId: string) => {
    try {
      await submitEvent(eventId);
      // 提交成功，顯示成功訊息
      toast.success('活動已提交審核，請等待審核結果');
    } catch (error: unknown) {
      // 處理錯誤，使用後端實際回應的錯誤訊息
      console.error('提交活動失敗:', error);
      
      let errorMessage = '提交活動失敗，請稍後再試';
      
      // 嘗試從錯誤物件中獲取具體的錯誤訊息
      if (error && typeof error === 'object') {
        const err = error as { response?: { data?: { message?: string } }; message?: string };
        errorMessage = err.response?.data?.message || err.message || errorMessage;
      }
      
      toast.error(errorMessage);
    }
  };

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
          onClick={() => setActiveTag('')}
          className={`flex items-center gap-1 px-2 py-1 rounded-2xl border text-sm font-normal transition-colors ${
            activeTag === ''
              ? 'bg-[#F3F6F3] border-[#5C795F] text-[#5C795F]'
              : 'bg-white border-transparent text-[#6D6D6D]'
          }`}
        >
          <span>全部</span>
        </button>

        {/* API 標籤選項 */}
        {eventTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setActiveTag(tag.name)}
            className={`flex items-center gap-1 px-2 py-1 rounded-2xl border text-sm font-normal transition-colors ${
              activeTag === tag.name
                ? 'bg-[#F3F6F3] border-[#5C795F] text-[#5C795F]'
                : 'bg-white border-transparent text-[#6D6D6D]'
            }`}
          >
            <span>{tag.name}</span>
          </button>
        ))}
      </div>

      {/* 活動列表 - 手機版卡片式佈局 */}
      <div className="block md:hidden space-y-0">
        {events.map((activity) => (
          <div
            key={activity.event_id}
            className="border-b border-[#A1B4A2] last:border-b-0"
          >
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
                    <Icon
                      icon="solar:image-outline"
                      width={24}
                      height={24}
                      className="text-gray-400"
                    />
                  </div>
                )}

                {/* 標題和狀態 */}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-normal text-[#121212] leading-[1.5]">
                      {activity.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusStyles[getDisplayStatus(activity.active)]
                        }`}
                      >
                        {getDisplayStatus(activity.active)}
                      </span>
                      <button
                        onClick={() =>
                          setExpandedCard(
                            expandedCard === activity.event_id
                              ? null
                              : activity.event_id
                          )
                        }
                        className="p-1"
                      >
                        <Icon
                          icon={
                            expandedCard === activity.event_id
                              ? 'solar:alt-arrow-up-outline'
                              : 'solar:alt-arrow-down-outline'
                          }
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
                    <span className="text-xs text-[#6D6D6D]">
                      已付款/已報名
                    </span>
                    <span className="text-xs text-[#121212]">
                      {activity.paid_count} / {activity.signup_total}
                    </span>
                  </div>

                  {/* 人數上限 */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#6D6D6D]">人數上限</span>
                    <span className="text-xs text-[#121212]">
                      {activity.max_participants}
                    </span>
                  </div>

                  {/* 報名期間 */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#6D6D6D]">報名期間</span>
                    <div className="flex items-center gap-1 text-xs text-[#121212]">
                      <span>{formatDate(activity.registration_open_time)}</span>
                      <span>~</span>
                      <span>
                        {formatDate(activity.registration_close_time)}
                      </span>
                    </div>
                  </div>

                  {/* 標籤 */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#6D6D6D]">標籤</span>
                    <div className="flex flex-wrap gap-1">
                      {activity.tags.map((tag, i) => (
                        <span key={i} className="text-xs text-[#121212]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 編輯按鈕 */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditEvent(activity.event_id)}
                    className={`flex-1 py-2 px-4 rounded-2xl text-sm font-semibold transition-colors ${
                      getDisplayStatus(activity.active) !== '草稿'
                        ? 'bg-[#E7E7E7] text-[#B0B0B0] cursor-not-allowed'
                        : 'bg-white text-[#121212] hover:bg-gray-50 border border-gray-200'
                    }`}
                    disabled={getDisplayStatus(activity.active) !== '草稿'}
                  >
                    {loadingEventId === activity.event_id ? '載入中...' : '編輯'}
                  </button>

                  {/* 上架按鈕 - 只有草稿狀態才顯示 */}
                  {getDisplayStatus(activity.active) === '草稿' && (
                    <button
                      onClick={() => handleSubmitEvent(activity.event_id)}
                      className="flex-1 py-2 px-4 rounded-2xl text-sm font-semibold transition-colors bg-[#5C795F] text-white hover:bg-[#4A6B4D]"
                    >
                      上架
                    </button>
                  )}
                </div>
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
          <div className="text-xs text-[#6D6D6D] text-center">
            已付款/已報名
          </div>
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
                    <Icon
                      icon="solar:image-outline"
                      width={24}
                      height={24}
                      className="text-gray-400"
                    />
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
                {activity.paid_count} / {activity.signup_total}
              </div>

              {/* 人數上限 */}
              <div className="text-sm text-[#121212] text-center">
                {activity.max_participants}
              </div>

              {/* 狀態 */}
              <div className="flex justify-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusStyles[getDisplayStatus(activity.active)]
                  }`}
                >
                  {getDisplayStatus(activity.active)}
                </span>
              </div>

              {/* 報名期間 */}
              <div className="flex flex-col items-center text-sm text-[#121212]">
                <span>{formatDate(activity.registration_open_time)}</span>
                <span className="text-center">~</span>
                <span>{formatDate(activity.registration_close_time)}</span>
              </div>

              {/* 標籤 */}
              <div className="flex justify-center">
                {activity.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-transparent rounded-2xl"
                  >
                    <span className="text-sm text-[#121212]">{tag}</span>
                  </div>
                ))}
              </div>

              {/* 編輯按鈕 */}
              <div className="flex flex-col justify-end gap-2">
                {/* 上架按鈕 - 只有草稿狀態才顯示 */}
                {getDisplayStatus(activity.active) === '草稿' && (
                  <button
                    onClick={() => handleSubmitEvent(activity.event_id)}
                    className="px-4 py-2 rounded-2xl text-sm font-semibold transition-colors bg-[#5C795F] text-white hover:bg-[#4A6B4D]"
                  >
                    上架
                  </button>
                )}
                <button
                  onClick={() => handleEditEvent(activity.event_id)}
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-colors ${
                    getDisplayStatus(activity.active) !== '草稿'
                      ? 'bg-[#E7E7E7] text-[#B0B0B0] cursor-not-allowed'
                      : 'bg-white text-[#121212] hover:bg-gray-50'
                  }`}
                  disabled={getDisplayStatus(activity.active) !== '草稿'}
                >
                  {loadingEventId === activity.event_id ? '載入中...' : '編輯'}
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
