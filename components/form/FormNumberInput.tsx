'use client';
import React from 'react';
import { useFormContext, FieldPath } from 'react-hook-form';
import { FormData } from '../../app/create-activity/schema/formDataSchema';

interface FormNumberInputProps {
  /** 欄位 id */
  name: FieldPath<FormData>;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步進值 */
  step?: number;
}

function FormNumberInput({ name, min, max, step }: FormNumberInputProps) {
  const { register } = useFormContext<FormData>();
  return (
    <input
      id={name}
      type="number"
      className="input input-bordered"
      {...register(name, { valueAsNumber: true })}
      min={min}
      max={max}
      step={step}
    />
  );
}

export default React.memo(FormNumberInput);
