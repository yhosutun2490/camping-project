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
}

/**
 * 活動編輯成功結果頁面
 * 顯示編輯成功的活動摘要資訊和後續動作選項
 */
function EditSuccessPage({ 
  onBackToActivities, 
  eventId
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
            活動編輯完成！
          </h1>
          <p className="text-base text-[#4F4F4F] mb-4">
            您的活動資訊已成功更新
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
                   活動日期：{formatDateTime(eventInfo.startDate, eventInfo.startTime)} ~ {formatDateTime(eventInfo.endDate, eventInfo.endTime)}
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
                {eventInfo.tags && eventInfo.tags.map((tagId, index) => (
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
                  <div className="flex items-center gap-1 mb-2">
                    <Icon icon="material-symbols:person-add" className="w-4 h-4 text-[#5C795F]" />
                    <div className="flex items-center gap-1 font-medium text-xs text-[#4F4F4F]">
                      方案人數：<span className="font-medium text-[#5C795F]">{plan.people_capacity}</span> 人
                    </div>
                  </div>
                  <div className="text-sm text-[#4F4F4F] mb-2">
                    {plan.content && plan.content.length > 0 && (
                      <div className="text-xs text-[#4F4F4F]">
                        <div className="flex items-center gap-1 font-medium mb-2">
                          <Icon icon="material-symbols:checklist" className="w-4 h-4 text-[#5C795F]" />
                          方案內容：
                        </div>
                        <ul className="space-y-1 ml-5">
                          {plan.content.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Icon icon="material-symbols:check-circle" className="w-3 h-3 text-[#5C795F] mt-0.5 flex-shrink-0" />
                              <span>{item.value}</span>
                            </li>
                          ))}
                        </ul>
                        </div>
                    )}
                  </div>
                  {plan.addOns && plan.addOns.length > 0 && (
                    <div className="text-xs text-[#4F4F4F]">
                      <div className="flex items-center gap-1 font-medium mb-2">
                        <Icon icon="material-symbols:add-shopping-cart" className="w-4 h-4 text-[#5C795F]" />
                        加購項目：
                      </div>
                      <ul className="space-y-1 ml-5">
                        {plan.addOns.map((addon, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Icon icon="material-symbols:add-circle" className="w-3 h-3 text-[#5C795F] mt-0.5 flex-shrink-0" />
                            <span>{addon.name} (+{formatPrice(addon.price)})</span>
                          </li>
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
        <div className="flex justify-center">
          <button
            onClick={onBackToActivities}
            className="flex items-center justify-center gap-2 bg-white text-[#354738] px-6 py-3 rounded-lg font-medium border border-[#354738] hover:bg-[#f3f6f3] transition-colors"
          >
            <Icon icon="material-symbols:arrow-back" className="w-5 h-5" />
            返回活動列表
          </button>
        </div>

        {/* 提示資訊 */}
        <div className="mt-8 bg-[#f8f9f8] border border-[#d1ddd1] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon icon="material-symbols:lightbulb" className="w-5 h-5 text-[#5C795F] mt-0.5" />
            <div>
              <h4 className="font-medium text-[#354738] mb-1">溫馨提醒</h4>
              <p className="text-sm text-[#4F4F4F]">
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
