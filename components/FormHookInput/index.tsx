"use client";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

type InputFieldProps = {
  label: string;
  type: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  disabled?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
};

export default function FormHookInput({
  label,
  type,
  placeholder,
  register,
  error,
  className,
  disabled = false,
  onFocus  
}: InputFieldProps) {
  // 只有 password 欄位才需要這個 state
  const [show, setShow] = useState<boolean>(false);
  // 根據 state 切換 input type
  const inputType = type === "password" ? (show ? "text" : "password") : type;

  return (
    <div className={clsx("relative flex flex-col mb-3", className)}>
      <label className="label text-black mb-1">{label}</label>
      <div className="input_wrap relative">
        <input
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={`input text-black bg-orange-50 input-bordered w-full 
          disabled:bg-orange-100
          disabled:text-zinc-500
          disabled:cursor-not-allowed
          disabled:border-none
          disabled:opacity-80
          ${error ? "input-error border-red-500" : ""}`}
          {...register}
          onFocus={onFocus}   // ← 這裡綁定
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute cursor-pointer top-[50%] translate-y-[-50%] right-2 flex items-center p-1"
          >
            <Icon
              icon={show ? "mdi:eye" : "mdi:eye-off"}
              className="text-xl text-zinc-500"
            />
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
