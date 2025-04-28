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
    <div className="flex space-x-4">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="label cursor-pointer flex items-center"
        >
          <input
            type="radio"
            value={opt.value}
            {...register(name)}
            className="radio"
          />
          <span className="label-text ml-2">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

export default React.memo(FormRadioGroup);
