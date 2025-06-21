'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useEventTags } from '@/swr/meta/useEventTags';

interface ActivityCreationSuccessProps {
  /** 活動 ID */
  eventId: string;
  /** 建立新活動的回調函式 */
  onCreateNewActivity?: () => void;
}

/**
 * 活動建立成功結果頁面
 * 顯示建立成功的活動摘要資訊和後續動作選項
 */
function ActivityCreationSuccess({ eventId, onCreateNewActivity }: ActivityCreationSuccessProps) {

  const router = useRouter();
  const { getValues } = useFormContext<FormData>();
  
  // 獲取活動標籤資料
  const { data: eventTagsData } = useEventTags();
  
  // 獲取表單資料以顯示活動摘要
  const formData = getValues();
  const { eventInfo, plans } = formData;

  /**
   * 建立新的活動
   */
  const handleCreateNewEvent = () => {
    if (onCreateNewActivity) {
      // 使用回調函式重置表單狀態並回到步驟一
      onCreateNewActivity();
    } else {
      // 備用方案：直接導航（保持原有行為）
      router.push('/create-activity');
    }
  };

  /**
   * 查看活動詳情
   */
  const handleViewEventDetail = () => {
    router.push(`/event/${eventId}`);
  };

  /**
   * 前往管理頁面
   */
  const handleManageEvents = () => {
    router.push('/host/activities');
  };

  /**
   * 格式化日期時間顯示
   */
  const formatDateTime = (date: string, time: string) => {
    return `${date} ${time}`;
  };

  /**
   * 格式化價格顯示
   */
  const formatPrice = (price: number) => {
    return `NT$ ${price.toLocaleString()}`;
  };

  /**
   * 根據標籤 ID 取得標籤名稱
   */
  const getTagName = (tagId: string) => {
    const tag = eventTagsData?.data?.eventTags?.find(tag => tag.id === tagId);
    return tag?.name || tagId;
  };

  return (
    <div className="min-h-screen bg-[#f9faf9] py-8">
      <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
        {/* 成功標題區域 */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#5C795F] rounded-full flex items-center justify-center shadow-lg">
              <Icon 
                icon="material-symbols:check" 
                className="w-8 h-8 text-white" 
              />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#121212] mb-3">
            活動建立成功！
          </h1>
          <p className="text-base text-[#4F4F4F] mb-4">
            恭喜您成功建立了一個全新的露營活動
          </p>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-[#e7e7e7]">
            <Icon icon="material-symbols:event-available" className="w-4 h-4 text-[#5C795F]" />
            <span className="text-sm font-medium text-[#4F4F4F]">活動 ID：</span>
            <span className="font-mono text-sm text-[#121212]">
              {eventId}
            </span>
          </div>
        </div>

        {/* 活動摘要資訊 */}
        <div className="bg-white rounded-lg shadow-sm border border-[#e7e7e7] p-6 mb-8">
          <h2 className="text-lg font-semibold text-[#121212] mb-4 flex items-center gap-2">
            <Icon icon="material-symbols:info" className="w-5 h-5 text-[#5C795F]" />
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
              <h4 className="font-medium text-[#354738] mb-2">活動標籤</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {eventInfo.tags.map((tagId, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-[#f3f6f3] text-[#354738] text-xs rounded-full border border-[#d1ddd1]"
                  >
                    {getTagName(tagId)}
                  </span>
                ))}
              </div>
              
              <h4 className="font-medium text-[#354738] mb-2">活動說明</h4>
              <p className="text-sm text-[#4F4F4F] leading-relaxed">
                {eventInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* 方案資訊 */}
        {plans && plans.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-[#e7e7e7] p-6 mb-8">
            <h2 className="text-lg font-semibold text-[#121212] mb-4 flex items-center gap-2">
              <Icon icon="material-symbols:receipt-long" className="w-5 h-5 text-[#5C795F]" />
              活動方案
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className="border border-[#e7e7e7] rounded-lg p-4 hover:border-[#5C795F] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-[#354738]">
                      方案 {index + 1}：{plan.title}
                    </h3>
                    <div className="text-right">
                      {plan.discountPrice ? (
                        <div className="flex items-center gap-1">
                          <div className="text-[#5C795F] font-semibold">
                            {formatPrice(plan.price - plan.discountPrice)}
                          </div>
                          <div className="text-xs text-[#888] line-through">
                            {formatPrice(plan.price)}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[#5C795F] font-semibold">
                          {formatPrice(plan.price)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-[#4F4F4F] mb-2">
                    {plan.content && plan.content.length > 0 && (
                      <ul className="list-disc list-inside space-y-1">
                        {plan.content.map((item, idx) => (
                          <li key={idx}>{item.value}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {plan.addOns && plan.addOns.length > 0 && (
                    <div className="text-xs text-[#4F4F4F]">
                      <div className="font-medium mb-1">加購項目：</div>
                      <ul className="list-disc list-inside space-y-1">
                        {plan.addOns.map((addon, idx) => (
                          <li key={idx}>{addon.name} (+{formatPrice(addon.price)})</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleViewEventDetail}
            className="flex items-center justify-center gap-2 bg-[#5C795F] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#354738] transition-colors shadow-sm"
          >
            <Icon icon="material-symbols:visibility" className="w-5 h-5" />
            查看活動詳情
          </button>
          
          <button
            onClick={handleManageEvents}
            className="flex items-center justify-center gap-2 bg-white text-[#354738] px-6 py-3 rounded-lg font-medium border border-[#354738] hover:bg-[#f3f6f3] transition-colors"
          >
            <Icon icon="material-symbols:settings" className="w-5 h-5" />
            管理我的活動
          </button>
          
          <button
            onClick={handleCreateNewEvent}
            className="flex items-center justify-center gap-2 bg-[#f3f6f3] text-[#354738] px-6 py-3 rounded-lg font-medium hover:bg-[#e7f0e7] transition-colors border border-[#d1ddd1]"
          >
            <Icon icon="material-symbols:add-circle" className="w-5 h-5" />
            建立新活動
          </button>
        </div>

        {/* 提示資訊 */}
        <div className="mt-8 bg-[#f8f9f8] border border-[#d1ddd1] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon icon="material-symbols:lightbulb" className="w-5 h-5 text-[#5C795F] mt-0.5" />
            <div>
              <h4 className="font-medium text-[#354738] mb-1">接下來您可以：</h4>
              <ul className="text-sm text-[#4F4F4F] space-y-1">
                <li>• 分享活動連結給朋友們</li>
                <li>• 在活動管理頁面查看報名狀況</li>
                <li>• 隨時編輯活動資訊</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityCreationSuccess;
