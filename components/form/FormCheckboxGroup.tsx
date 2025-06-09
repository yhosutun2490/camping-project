'use client';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FormData } from '../../app/create-activity/schema/formDataSchema';

interface FormCheckboxGroupProps {
  /** 欄位 id */
  name: keyof FormData['eventInfo'];
  /** 選項清單 */
  options: { value: string; label: string }[];
}

function FormCheckboxGroup({ name, options }: FormCheckboxGroupProps) {
  const { control } = useFormContext<FormData>();
  
  return (
    <Controller
      name={`eventInfo.${name}` as `eventInfo.${keyof FormData['eventInfo']}`}
      control={control}
      render={({ field: { value, onChange } }) => {
        const selectedValues = Array.isArray(value) ? value : [];
        
        const handleCheckboxChange = (optionValue: string, checked: boolean) => {
          if (checked) {
            // 新增值
            onChange([...selectedValues, optionValue]);
          } else {
            // 移除值
            onChange(selectedValues.filter((v: string) => v !== optionValue));
          }
        };
        
        return (
          <div className="flex flex-wrap items-center gap-6">
            {options.map((opt) => {
              const isChecked = selectedValues.includes(opt.value);
              
              return (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    value={opt.value}
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(opt.value, e.target.checked)}
                    className="events-form-checkbox"
                  />
                  <span className={`figma-checkbox-label ${isChecked ? 'checked' : ''}`}>
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        );
      }}
    />
  );
}

export default React.memo(FormCheckboxGroup);
