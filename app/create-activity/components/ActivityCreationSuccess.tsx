'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import { useRouter } from 'next/navigation';

interface ActivityCreationSuccessProps {
  /** 活動 ID */
  eventId: string;
  /** 返回上一步 */
  onPrevStep: () => void;
}

/**
 * 活動建立成功結果頁面
 * 顯示建立成功的活動摘要資訊和後續動作選項
 */
function ActivityCreationSuccess({ eventId, onPrevStep }: ActivityCreationSuccessProps) {
  const router = useRouter();
  const { getValues } = useFormContext<FormData>();
  
  // 獲取表單資料以顯示活動摘要
  const formData = getValues();
  const { eventInfo, plans } = formData;

  /**
   * 建立新的活動
   */
  const handleCreateNewEvent = () => {
    router.push('/create-activity');
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

  return (
    <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-sm">
      {/* 成功標題區域 */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-success mb-2">活動建立成功！</h2>
        <p className="text-base-content/70">
          您的活動已成功建立，活動 ID：<span className="font-mono text-sm">{eventId}</span>
        </p>
      </div>

      {/* 活動摘要卡片 */}
      <div className="bg-base-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">活動摘要</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 基本資訊 */}
          <div className="space-y-3">
            <div>
              <span className="font-medium text-base-content/70">活動名稱：</span>
              <span className="font-semibold">{eventInfo.title}</span>
            </div>
            <div>
              <span className="font-medium text-base-content/70">主辦方：</span>
              <span>{eventInfo.organizer}</span>
            </div>
            <div>
              <span className="font-medium text-base-content/70">活動地點：</span>
              <span>{eventInfo.address}</span>
            </div>
            <div>
              <span className="font-medium text-base-content/70">參與人數上限：</span>
              <span>{eventInfo.max_participants} 人</span>
            </div>
          </div>

          {/* 時間資訊 */}
          <div className="space-y-3">
            <div>
              <span className="font-medium text-base-content/70">活動開始：</span>
              <span>{formatDateTime(eventInfo.startDate, eventInfo.startTime)}</span>
            </div>
            <div>
              <span className="font-medium text-base-content/70">活動結束：</span>
              <span>{formatDateTime(eventInfo.endDate, eventInfo.endTime)}</span>
            </div>
            <div>
              <span className="font-medium text-base-content/70">基本價格：</span>
              <span className="font-semibold text-primary">{formatPrice(eventInfo.price)}</span>
            </div>
            <div>
              <span className="font-medium text-base-content/70">活動標籤：</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {eventInfo.tags.map((tag, index) => (
                  <span key={index} className="badge badge-outline badge-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 方案資訊 */}
        <div className="mt-6">
          <h4 className="font-medium text-base-content/70 mb-2">
            建立的方案 ({plans.length} 個)：
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {plans.map((plan, index) => (
              <div key={index} className="bg-base-100 rounded-lg p-3 border">
                <div className="font-medium">{plan.title}</div>
                <div className="text-sm text-base-content/70 mt-1">
                  {formatPrice(plan.price)}
                  {plan.discountPrice && (
                    <span className="ml-2 text-success">
                      優惠價 {formatPrice(plan.discountPrice)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 動作按鈕區 */}
      <div className="space-y-4">
        {/* 主要動作 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="btn btn-primary flex-1"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            查看活動詳情
          </button>
          <button
            type="button"
            className="btn btn-outline btn-primary flex-1"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            管理我的活動
          </button>
        </div>

        {/* 次要動作 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="btn btn-outline flex-1"
            onClick={handleCreateNewEvent}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            建立新活動
          </button>
          <button
            type="button"
            className="btn btn-ghost flex-1"
            onClick={onPrevStep}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回上一步
          </button>
        </div>
      </div>

      {/* 提示資訊 */}
      <div className="mt-8 p-4 bg-info/10 rounded-lg border border-info/20">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-info mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-info mb-1">接下來您可以：</h4>
            <ul className="text-sm text-base-content/70 space-y-1">
              <li>• 在活動管理頁面查看和編輯活動詳情</li>
              <li>• 追蹤報名狀況和參與者資訊</li>
              <li>• 與參與者溝通活動相關事宜</li>
              <li>• 分享活動連結給潛在參與者</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ActivityCreationSuccess);
