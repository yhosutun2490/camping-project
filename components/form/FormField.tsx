'use client';
import React from 'react';

interface FormFieldProps {
  /** 標題 */
  label: string;
  /** 欄位名稱 */
  name: string;
  /** 是否為必填 */
  required?: boolean;
  /** 錯誤訊息 */
  error?: string;
  /** 說明文字 */
  description?: string;
  /** 子元素 */
  children: React.ReactNode;
}

function FormField({ 
  label, 
  name, 
  required, 
  error, 
  description, 
  children 
}: FormFieldProps) {
  return (
    <div className="form-control w-full">
      {/* 標題 - 根據 Figma 設計 14px Noto Sans TC */}
      <label htmlFor={name} className="label pb-1">
        <span className="label-text text-sm font-normal text-[#4F4F4F] leading-[1.5em] font-[Noto_Sans_TC]">
          {required && <span className="text-[#AB5F5F]">*</span>}
          {label}
        </span>
      </label>
      
      {/* 輸入元件 */}
      {children}
      {/* 說明文字 - 根據 Figma 設計 12px */}
      <div className="label pt-1">
        {error ? (
          <span className="label-text-alt text-xs font-normal text-[#AB5F5F] leading-[1.5em] font-[Noto_Sans_TC]">
            {error}
          </span>
        ) : description ? (
          <span className="label-text-alt text-xs font-normal text-[#6D6D6D] leading-[1.5em] font-[Noto_Sans_TC]">
            {description}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default React.memo(FormField);
