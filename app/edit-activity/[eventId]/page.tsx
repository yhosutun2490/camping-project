'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EditActivityForm from '@/app/edit-activity/components/EditActivityForm';
import { FormDataEdit } from '@/app/create-activity/schema/formDataSchema';
import { useHostEventDetail } from '@/swr/events/useHostEventDetail';
import toast from 'react-hot-toast';
import { GetHostEventDetailResponse } from '@/types/api/host/eventDetail';

/**
 * 將 API 回應的活動資料轉換為表單格式
 * @param apiData API 回應的活動詳情資料
 * @returns 表單使用的 FormData 格式
 */
function apiToFormData(apiData: GetHostEventDetailResponse['data']): FormDataEdit {
  // 日期時間轉換函式（避免 UTC 時區問題）
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    
    const dateStr = `${yyyy}-${mm}-${dd}`; // YYYY-MM-DD
    const timeStr = `${hh}:${min}`; // HH:mm
    return { date: dateStr, time: timeStr };
  };

  // 轉換開始時間
  const startDateTime = formatDateTime(apiData.start_time);
  const endDateTime = formatDateTime(apiData.end_time);
  const registrationOpenDateTime = formatDateTime(apiData.registration_open_time);
  const registrationCloseDateTime = formatDateTime(apiData.registration_close_time);

  // 轉換方案資料
  const plans = apiData.plans?.map(plan => ({
    id: plan.id,
    title: plan.title,
    price: plan.price,
    discountPrice: plan.discounted_price ?? 0,
    content: plan.eventPlanContentBox?.map(content => ({
      value: content.content
    })) || [],
    addOns: plan.eventPlanAddonBox?.map(addon => ({
      name: addon.name,
      price: addon.price
    })) || []
  })) || [];

  console.log('轉換後的方案資料:', plans);

  // 轉換通知資料
  const eventNotifications = apiData.notices
    ?.filter(notice => notice.type === 'event')
    .map(notice => notice.content) || [];

  // 轉換標籤資料
  const tags = apiData.tags?.map(tag => tag.id) || [];

  const formData: FormDataEdit = {
    eventInfo: {
      title: apiData.title,
      organizer: apiData.host.name,
      address: apiData.address,
      startDate: startDateTime.date,
      startTime: startDateTime.time,
      endDate: endDateTime.date,
      endTime: endDateTime.time,
      registration_startDate: registrationOpenDateTime.date,
      registration_startTime: registrationOpenDateTime.time,
      registration_endDate: registrationCloseDateTime.date,
      registration_endTime: registrationCloseDateTime.time,
      max_participants: apiData.max_participants,
      price: 0, // API 中沒有這個欄位，使用預設值
      description: apiData.description,
      tags: tags,
      cancel_policy: apiData.cancel_policy === '15 天前可免費取消',
      event_notifications: eventNotifications
    },
    // 編輯模式下的圖片資料需要特殊處理，暫時設為空陣列
    coverImages: [],
    eventImages: [],
    plans: plans
  };

  return formData;
}

export default function EditActivityPage() {
  const { eventId } = useParams();
  const { getEventDetail, isLoading, eventDetail, error } = useHostEventDetail();
  const [formData, setFormData] = useState<FormDataEdit | null>(null);

  // 載入活動資料
  useEffect(() => {
    if (eventId) {
      getEventDetail({ eventId: eventId as string }).catch((error) => {
        console.error('取得活動詳情失敗:', error);
        toast.error('載入活動資料失敗，請稍後再試');
      });
    }
  }, [eventId, getEventDetail]);

  useEffect(() => {
    if (eventDetail) {
      try {
        const convertedData = apiToFormData(eventDetail);
        setFormData(convertedData);
      } catch (conversionError) {
        console.error('資料轉換失敗:', conversionError);
        toast.error('資料載入失敗，請稍後再試');
      }
    }
  }, [eventDetail]);

  // 載入中狀態
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#5C795F] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-normal text-[#6D6D6D]">載入活動資料中...</p>
        </div>
      </div>
    );
  }

  // 錯誤狀態
  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#FFDBDB] flex items-center justify-center">
            <svg className="w-8 h-8 text-[#AB5F5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#121212] mb-3">無法載入活動資料</h2>
          <p className="text-base font-normal text-[#6D6D6D] mb-6">
            請檢查網路連線或稍後再試
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#5C795F] text-white rounded-2xl font-semibold hover:bg-[#4a6651] transition-colors"
          >
            重新載入
          </button>
        </div>
      </div>
    );
  }

  // 資料尚未轉換完成
  if (!formData) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#5C795F] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-normal text-[#6D6D6D]">準備編輯頁面中...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EditActivityForm 
        initialData={formData} 
        eventId={eventId as string} 
      />
    </div>
  );
}
