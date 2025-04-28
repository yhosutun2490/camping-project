'use client';
import React from 'react';
import { useFormContext, FieldPath, RegisterOptions } from 'react-hook-form';
import { FormData } from '../../app/create-activity/schema/formDataSchema';

interface FormInputProps {
  /** 欄位 id */
  name: FieldPath<FormData>;
  /** placeholder */
  placeholder?: string;
  /** 欄位類型 */
  type?: React.HTMLInputTypeAttribute;
  /** 驗證規則 */
  validation?: Omit<
    RegisterOptions<FormData, FieldPath<FormData>>,
    'valueAsNumber' | 'valueAsDate'
  >;
}

function FormInput({
  name,
  placeholder,
  type = 'text',
  validation,
}: FormInputProps) {
  const { register } = useFormContext<FormData>();
  return (
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      className="input input-bordered"
      {...register(name, validation)}
    />
  );
}

export default React.memo(FormInput);
