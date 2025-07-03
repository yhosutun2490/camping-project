'use client';
import React, { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../../app/create-activity/schema/formDataSchema';
import FormInput from './FormInput';

interface FormDynamicInputsProps {
  /** 新增按鈕顯示文字 */
  addButtonLabel: string;
  /** 輸入欄位提示文字 */
  placeholder?: string;
}

function FormDynamicInputs({
  addButtonLabel,
  placeholder,
}: FormDynamicInputsProps) {
  const {
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext<FormData>();
  const notifications = watch('eventInfo.event_notifications') || [];
  const [key, setKey] = useState(0); // 用於強制重新渲染
  const lastInputRef = useRef<HTMLDivElement>(null); // 用於追蹤最新新增的輸入欄位容器

  // 自動捲動到最新新增的欄位並聚焦
  const scrollToNewField = () => {
    setTimeout(() => {
      if (lastInputRef.current) {
        // 先滾動到欄位位置
        lastInputRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        
        // 延遲聚焦，確保滾動完成
        setTimeout(() => {
          // 找到該容器內的 input 元素並聚焦
          const inputElement = lastInputRef.current?.querySelector('input');
          if (inputElement) {
            inputElement.focus();
          }
        }, 300);
      }
    }, 100); // 等待DOM更新後再捲動
  };

  // 新增通知項目
  const handleAddNotification = () => {
    setValue('eventInfo.event_notifications', [...notifications, '']);
    setKey((prev) => prev + 1);
    scrollToNewField(); // 新增後自動捲動
  };

  // 刪除通知項目
  const handleRemoveNotification = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setValue('eventInfo.event_notifications', newNotifications);
    
    // 如果刪除後陣列為空，清除錯誤狀態
    if (newNotifications.length === 0) {
      setValue('eventInfo.event_notifications', undefined);
    }
    
    // 重新驗證以更新錯誤狀態
    setTimeout(() => {
      trigger('eventInfo.event_notifications');
    }, 0);
  };

  // 在輸入後立即驗證
  const handleBlur = () => {
    trigger('eventInfo.event_notifications');
  };

  return (
    <div className="flex flex-col self-stretch gap-8" key={key}>
      {/* 標題區域 */}
      <div className="flex flex-row justify-center items-center self-stretch gap-2 py-3 border-b border-[#A1B4A2]">
        <h3 className="flex-1 text-lg font-semibold text-[#354738] leading-[1.5em]">
          行前提醒
        </h3>
        <button
          type="button"
          onClick={handleAddNotification}
          className="flex justify-center items-center gap-1 px-4 py-2 rounded-2xl border-2 border-[#354738] text-[#354738] font-semibold text-sm leading-[1.5em] hover:bg-[#354738] hover:text-white transition-colors"
        >
          {addButtonLabel}
        </button>
      </div>
      
      {/* 動態輸入區域 */}
      <div className="flex flex-col self-stretch gap-6">
        {notifications.map((_, index) => (
          <div 
            key={index} 
            className="flex flex-row items-center self-stretch gap-3"
            ref={index === notifications.length - 1 ? lastInputRef : null} // 將ref指向最後一個元素
          >
            <div className="flex flex-col flex-1 gap-1">
              <FormInput
                name={`eventInfo.event_notifications.${index}`}
                placeholder={placeholder || "請輸入行前提醒"}
                onChangeCallback={handleBlur}
                onBlurCallback={handleBlur}
              />
            </div>
            <div className="flex items-center gap-2 p-2">
              <button
                type="button"
                onClick={() => handleRemoveNotification(index)}
                className="flex items-center justify-center w-6 h-6 hover:bg-gray-100 rounded transition-colors"
                aria-label="刪除項目"
              >
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 14 14" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#4F4F4F]"
                >
                  <path 
                    d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
        
        {/* 顯示在欄位下方的錯誤訊息 */}
        {!!errors.eventInfo?.event_notifications && notifications.length > 0 && (
          <p className="label-text-alt text-xs font-normal text-[#AB5F5F] leading-[1.5em] font-[Noto_Sans_TC]">
            {errors.eventInfo?.event_notifications.message || '每個通知至少需要5個字'}
          </p>
        )}
      </div>
    </div>
  );
}

export default React.memo(FormDynamicInputs);
