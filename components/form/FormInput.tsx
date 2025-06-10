'use client';
import React from 'react';
import { useFormContext, FieldPath, RegisterOptions } from 'react-hook-form';
import { FormData } from '../../app/create-activity/schema/formDataSchema';

interface FormInputProps {
  /** 欄位 id */
  name: FieldPath<FormData> | string;
  /** placeholder */
  placeholder?: string;
  /** 欄位類型 */
  type?: React.HTMLInputTypeAttribute;
  /** 是否禁用 */
  disabled?: boolean;
  /** 驗證規則 */
  validation?: Omit<
    RegisterOptions<FormData, FieldPath<FormData>>,
    'valueAsNumber' | 'valueAsDate'
  >;
  /** 自定義 onChange 回調 */
  onChangeCallback?: () => void;
  /** 自定義 onBlur 回調 */
  onBlurCallback?: () => void;
}

function FormInput({
  name,
  placeholder,
  type = 'text',
  disabled = false,
  validation,
  onChangeCallback,
  onBlurCallback,
}: FormInputProps) {
  const { 
    register, 
    formState: { errors }
  } = useFormContext<FormData>();
  
  // 使用 get 函式來安全取得巢狀錯誤
  const getNestedError = (name: string) => {
    const keys = name.split('.');
    let error: unknown = errors;
    for (const key of keys) {
      if (error && typeof error === 'object' && key in error) {
        error = (error as Record<string, unknown>)[key];
      } else {
        return undefined;
      }
    }
    return error;
  };
  
  const error = getNestedError(name as string);

  const getInputClasses = () => {
    const baseClasses = [
      'input',
      'input-bordered', 
      'events-form-input',
      'w-full'
    ];

    if (error) {
      baseClasses.push('input-error');
    }

    return baseClasses.join(' ');
  };

  return (
    <input
      id={name as string}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={getInputClasses()}
      {...register(name as FieldPath<FormData>, {
        ...validation,
        onChange: onChangeCallback,
        onBlur: onBlurCallback,
      })}
    />
  );
}

export default React.memo(FormInput);
