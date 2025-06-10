'use client';
import React from 'react';
import { useFormContext, FieldPath } from 'react-hook-form';
import { FormData } from '../../app/create-activity/schema/formDataSchema';

interface FormRadioGroupProps {
  /** 欄位 id */
  name: FieldPath<FormData>;
  /** 選項清單 */
  options: { value: string; label: string }[];
}

function FormRadioGroup({ name, options }: FormRadioGroupProps) {
  const { register } = useFormContext<FormData>();
  
  return (
    <div className="flex flex-wrap items-center gap-6">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="radio"
            value={opt.value}
            {...register(name)}
            className="events-form-radio"
          />
          <span className="events-form-radio-label">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

export default React.memo(FormRadioGroup);
