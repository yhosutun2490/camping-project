'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '@/app/create-activity/schema/formDataSchema';
import { Icon } from '@iconify/react';
import { useEventTags } from '@/swr/meta/useEventTags';

interface EditSuccessPageProps {
  /** 活動 ID */
  eventId: string;
  /** 返回活動列表的回調函式 */
  onBackToActivities: () => void;
  /** 查看活動詳情的回調函式 */
  onViewActivity: () => void;
}

/**
 * 活動編輯成功結果頁面
 * 顯示編輯成功的活動摘要資訊和後續動作選項
 */
function EditSuccessPage({ 
  onBackToActivities, 
  onViewActivity 
}: EditSuccessPageProps) {
  const { getValues } = useFormContext<FormData>();
  
  // 獲取活動標籤資料
  const { data: eventTagsData } = useEventTags();
  
  // 獲取表單資料以顯示活動摘要
  const formData = getValues();
  const { eventInfo, plans } = formData;

  /**
   * 格式化日期時間顯示
   */
  const formatDateTime = (date: string, time: string) => {
    return `${date} ${time}`;
  };

  /**
   * 根據標籤 ID 取得標籤名稱
   */
  const getTagName = (tagId: string) => {
    const tag = eventTagsData?.data?.eventTags?.find(t => t.id === tagId);
    return tag?.name || tagId;
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] py-8">
      <div className="max-w-3xl mx-auto px-6">
        {/* 成功標題區域 */}
        <div className="text-center mb-8">
          {/* 成功圖示 */}
          <div className="w-20 h-20 bg-[#E3E9E2] rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon 
              icon="material-symbols:check-circle" 
              className="w-12 h-12 text-[#5C795F]" 
            />
          </div>
          
          <h1 className="text-3xl font-semibold text-[#121212] mb-3">
            活動編輯完成！
          </h1>
          <p className="text-lg text-[#6D6D6D]">
            您的活動資訊已成功更新
          </p>
        </div>

        {/* 活動摘要卡片 */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E7E7E7] p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#354738] mb-6 flex items-center gap-2">
            <Icon icon="material-symbols:event-note" className="w-6 h-6" />
            活動摘要
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 基本資訊 */}
            <div>
              <h3 className="font-semibold text-[#354738] text-lg mb-3">
                {eventInfo.title}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols:location-on" className="w-4 h-4 text-[#4F4F4F]" />
                  <span className="text-[#4F4F4F]">{eventInfo.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols:event" className="w-4 h-4 text-[#4F4F4F]" />
                  <span className="text-[#4F4F4F]">
                   活動日期：{formatDateTime(eventInfo.startDate, eventInfo.startTime)} - {formatDateTime(eventInfo.endDate, eventInfo.endTime)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols:how-to-reg" className="w-4 h-4 text-[#4F4F4F]" />
                  <span className="text-[#4F4F4F]">
                    報名時間：{formatDateTime(eventInfo.registration_startDate, eventInfo.registration_startTime)} ~ {formatDateTime(eventInfo.registration_endDate, eventInfo.registration_endTime)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols:group" className="w-4 h-4 text-[#4F4F4F]" />
                  <span className="text-[#4F4F4F]">
                    名額：{eventInfo.max_participants} 人
                  </span>
                </div>
              </div>
            </div>

            {/* 標籤和說明 */}
            <div>
              {/* 活動標籤 */}
              {eventInfo.tags && eventInfo.tags.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-[#354738] mb-2">活動標籤</h4>
                  <div className="flex flex-wrap gap-2">
                    {eventInfo.tags.map((tagId, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#F3F6F3] text-[#5C795F] rounded-full text-sm"
                      >
                        {getTagName(tagId)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 取消政策 */}
              <div className="mb-4">
                <h4 className="font-medium text-[#354738] mb-2">取消政策</h4>
                <p className="text-sm text-[#4F4F4F]">
                  {eventInfo.cancel_policy ? '15 天前可免費取消' : '不可取消'}
                </p>
              </div>
            </div>
          </div>

          {/* 活動描述 */}
          <div className="mt-6 pt-6 border-t border-[#E7E7E7]">
            <h4 className="font-medium text-[#354738] mb-2">活動描述</h4>
            <p className="text-sm text-[#4F4F4F] leading-relaxed">
              {eventInfo.description}
            </p>
          </div>
        </div>

        {/* 方案資訊 */}
        {plans && plans.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E7E7E7] p-8 mb-8">
            <h2 className="text-xl font-semibold text-[#354738] mb-6 flex items-center gap-2">
              <Icon icon="material-symbols:inventory" className="w-6 h-6" />
              方案資訊
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plans.map((plan, index) => (
                <div key={index} className="border border-[#E7E7E7] rounded-lg p-4">
                  <h3 className="font-medium text-[#354738] mb-2">{plan.title}</h3>
                  <div className="text-sm text-[#4F4F4F] space-y-1">
                    <div className="flex justify-between">
                      <span>價格：</span>
                      <span className="font-medium">${plan.price}</span>
                    </div>
                    {plan.discountPrice && (
                      <div className="flex justify-between">
                        <span>優惠價：</span>
                        <span className="font-medium text-[#5C795F]">${plan.discountPrice}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={onViewActivity}
            className="flex items-center justify-center gap-2 bg-[#5C795F] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#354738] transition-colors shadow-sm"
          >
            <Icon icon="material-symbols:visibility" className="w-5 h-5" />
            查看活動詳情
          </button>
          
          <button
            onClick={onBackToActivities}
            className="flex items-center justify-center gap-2 bg-white text-[#354738] px-6 py-3 rounded-2xl font-semibold border border-[#354738] hover:bg-[#F3F6F3] transition-colors"
          >
            <Icon icon="material-symbols:arrow-back" className="w-5 h-5" />
            返回活動列表
          </button>
        </div>

        {/* 提示資訊 */}
        <div className="mt-8 bg-[#F8F9F8] border border-[#D1DDD1] rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Icon icon="material-symbols:info" className="w-5 h-5 text-[#5C795F] mt-0.5" />
            <div>
              <h4 className="font-medium text-[#354738] mb-1">溫馨提醒</h4>
              <p className="text-sm text-[#6D6D6D]">
                您的活動資訊已更新完成。如需要修改活動狀態或進行其他管理操作，請前往活動列表頁面。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSuccessPage;
