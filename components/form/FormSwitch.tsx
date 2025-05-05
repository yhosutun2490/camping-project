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
      <input type="checkbox" className="toggle" {...register(name)} />
      <span className="label-text">{label}</span>
    </label>
  );
}

export default React.memo(FormSwitch);
