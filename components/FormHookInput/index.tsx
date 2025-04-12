"use client"
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

export default function FormHookInput({ label, type ,placeholder, register, error }: InputFieldProps) {
  return (
    <div className="flex flex-col mb-4">
      <label className="label text-black mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`input text-black bg-orange-50 input-bordered w-full ${error ? "input-error border-red-500" : ""}`}
        {...register}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
