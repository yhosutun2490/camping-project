'use client';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../../app/create-activity/schema/formDataSchema';

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
    register,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext<FormData>();
  const notifications = watch('eventInfo.notifications') || [];
  const [key, setKey] = useState(0); // 用於強制重新渲染

  // 新增通知項目
  const handleAddNotification = () => {
    setValue('eventInfo.notifications', [...notifications, '']);
    setKey((prev) => prev + 1);
  };

  // 刪除通知項目
  const handleRemoveNotification = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setValue('eventInfo.notifications', newNotifications);
    setKey((prev) => prev + 1);
  };

  // 在輸入後立即驗證
  const handleBlur = () => {
    trigger('eventInfo.notifications');
  };

  return (
    <div className="space-y-2" key={key}>
      {notifications.map((_, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            {...register(`eventInfo.notifications.${index}`, {
              onChange: () => handleBlur(), // 輸入變更時立即驗證
              onBlur: () => handleBlur(), // 失去焦點時立即驗證
            })}
            placeholder={placeholder}
            className={`input input-bordered flex-1 ${
              errors.eventInfo?.notifications?.[index] ? 'input-error' : ''
            }`}
          />
          <button
            type="button"
            onClick={() => handleRemoveNotification(index)}
            className="btn btn-error"
            aria-label="刪除項目"
          >
            刪除
          </button>
        </div>
      ))}
      {/* 顯示在欄位下方的錯誤訊息 */}
      {errors.eventInfo?.notifications && (
        <p className="text-error mt-1">
          {errors.eventInfo?.notifications.message || '每個通知至少需要5個字'}
        </p>
      )}
      <button
        type="button"
        onClick={handleAddNotification}
        className="btn btn-outline mt-2"
      >
        {addButtonLabel}
      </button>
    </div>
  );
}

export default React.memo(FormDynamicInputs);
