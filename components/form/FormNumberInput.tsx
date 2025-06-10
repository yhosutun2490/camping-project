'use client';
import React from 'react';
import { useFormContext, FieldPath, RegisterOptions } from 'react-hook-form';
import { FormData } from '../../app/create-activity/schema/formDataSchema';

interface FormNumberInputProps {
  /** 欄位 id */
  name: FieldPath<FormData>;
  /** placeholder */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步進值 */
  step?: number;
  /** 驗證規則 */
  validation?: Omit<
    RegisterOptions<FormData, FieldPath<FormData>>,
    'valueAsNumber' | 'valueAsDate' | 'pattern'
  >;
  /** 自定義 onChange 回調 */
  onChangeCallback?: () => void;
  /** 自定義 onBlur 回調 */
  onBlurCallback?: () => void;
}

function FormNumberInput({ 
  name, 
  placeholder,
  disabled = false,
  min, 
  max, 
  step,
  validation,
  onChangeCallback,
  onBlurCallback,
}: FormNumberInputProps) {
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
      id={name}
      type="number"
      placeholder={placeholder}
      disabled={disabled}
      className={getInputClasses()}
      {...register(name, {
        valueAsNumber: true,
        ...validation,
        onChange: onChangeCallback,
        onBlur: onBlurCallback,
      })}
      min={min}
      max={max}
      step={step}
    />
  );
}

export default React.memo(FormNumberInput);
