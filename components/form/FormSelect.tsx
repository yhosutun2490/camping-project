'use client';
import React from 'react';
import { useFormContext, FieldPath } from 'react-hook-form';
import { FormData } from '../../app/create-activity/schema/formDataSchema';

interface Option {
  /** 值 */
  value: string;
  /** 顯示文字 */
  label: string;
}

interface FormSelectProps {
  /** 欄位 id */
  name: FieldPath<FormData>;
  /** 選項清單 */
  options: Option[];
  /** placeholder */
  placeholder?: string;
}

function FormSelect({ name, options, placeholder }: FormSelectProps) {
  const { register } = useFormContext<FormData>();
  return (
    <select id={name} className="select select-bordered" {...register(name)}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default React.memo(FormSelect);
