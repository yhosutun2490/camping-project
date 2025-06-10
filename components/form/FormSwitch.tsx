'use client';
import React from 'react';
import { useFormContext, FieldPath } from 'react-hook-form';
import { FormData } from '../../app/create-activity/schema/formDataSchema';

interface FormSwitchProps {
  /** 欄位 id */
  name: FieldPath<FormData>;
  /** 標籤文字 */
  label: string;
}

function FormSwitch({ name, label }: FormSwitchProps) {
  const { register } = useFormContext<FormData>();
  return (
    <label className="label cursor-pointer flex justify-start items-center gap-2">
      <input type="checkbox" className="toggle toggle-sm text-[#B0B0B0] bg-[##E7E7E7] checked:bg-[#5C795F] checked:text-[#FFFFFF]" {...register(name)} />
      <span className="label-text text-base text-[#121212]">{label}</span>
    </label>
  );
}

export default React.memo(FormSwitch);
