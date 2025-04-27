"use client"
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import clsx from 'clsx';

type InputFieldProps = {
  label: string;
  type: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  disabled?: boolean
};

export default function FormHookInput({ label, type ,placeholder, register, error, className, disabled=false}: InputFieldProps) {
  return (
    <div className={clsx("flex flex-col mb-4", className)}>
      <label className="label text-black mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`input text-black bg-orange-50 input-bordered w-full 
          disabled:bg-orange-100
          disabled:text-zinc-500
          disabled:cursor-not-allowed
          disabled:border-none
          disabled:opacity-50
          ${error ? "input-error border-red-500" : ""}`}
        {...register}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
