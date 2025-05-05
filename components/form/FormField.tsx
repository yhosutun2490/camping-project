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
  /** 子元素 */
  children: React.ReactNode;
}

function FormField({ label, name, required, error, children }: FormFieldProps) {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text">
          {label}
          {required ? ' *' : ''}
        </span>
      </label>
      {children}
      {error && <p className="text-error mt-1">{error}</p>}
    </div>
  );
}

export default React.memo(FormField);
