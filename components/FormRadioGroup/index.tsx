import React from "react";

interface Option {
  label: string;
  value: string;
}

interface FormRadioGroupProps {
  label: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  name: string;
}

export default function FormRadioGroup({
  label,
  options,
  value,
  onChange,
  name,
}: FormRadioGroupProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-neutral-700">{label}</label>
      <div className="radio_list flex flex-start h-10 space-x-6">
        {options.map((option) => (
          <label key={option.value} className="inline-flex gap-6 justify-start items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
                   className={`
            appearance-none
            w-4 h-4
            rounded-full
            border-2
            border-gray-300
            checked:bg-primary-500
            focus:outline-none
            focus:ring-2
            focus:ring-primary-500
            transition
            duration-200
          `}
            />
            <span className="text-neutral-950">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
