"use client";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  options: {
    id: string;
    label: string;
    value: string;
  }[];
  fieldName: string;
  textCenter?: boolean;
  placeholder?: string;
};

export default function Dropdown({
  options,
  fieldName,
  textCenter,
  placeholder,
}: Props) {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const { register, setValue, control } = useFormContext();
  const locationValue = useWatch({ name: fieldName });

  function handleClickOnBlur(value: string) {
    // 先更新值
    setValue(fieldName, value);
    const active = document.activeElement;
    if (active instanceof HTMLElement) {
      active.blur();
    }
  }
  return (
    <div className="dropdown dropdown-start w-full" {...register(fieldName)}>
      {/* form hook 綁定 */}
      <Controller
        control={control}
        name={fieldName}
        render={() => <input type="hidden" />}
      />
      {/* 手機觸發按鈕 */}
      <div
        tabIndex={0}
        role="button"
        className={`md:hidden options w-full min-h-[30px] flex items-center ${
          textCenter ? "text-center justify-center leading-[2]" : ""
        }`}
        onClick={() => setMobileOpen(true)}
      >
        {options.find((item) => item.value === locationValue)?.label ||
          placeholder}
      </div>
      <div
        tabIndex={0}
        role="button"
        className={`hidden md:block options w-full min-h-[30px] flex items-center ${
          textCenter ? "text-center justify-center leading-[2]" : ""
        }`}
      >
        {options.find((item) => item.value === locationValue)?.label ||
          placeholder}
      </div>
      {/**desktop tablet 選單 */}
      <ul
        tabIndex={0}
        className="hidden md:block dropdown-content min-w-[200px] max-h-[150px] overflow-y-auto menu mt-5 rounded-box z-10 w-full max-w-xs bg-white shadow-sm"
      >
        {options.map((opt) => (
          <li
            key={opt.id}
            className="text-neutral-950 hover:bg-primary-50 hover:rounded-sm active:rounded-sm"
          >
            <a
              onClick={() => {
                handleClickOnBlur(opt.value);
              }}
            >
              {opt.label}
            </a>
          </li>
        ))}
      </ul>
      {/**mobile 選單 */}
      {isMobileOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/40 z-50 flex items-end select-none"
            onClick={() => setMobileOpen(false)}
          >
            <ul
              tabIndex={0}
              className="max-h-[200px] overflow-y-auto dropdown-content p-4 w-full space-y-4 mt-5 rounded-box z-10 w-full bg-white shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {options.map((opt) => (
                <li
                  key={opt.id}
                  className="text-neutral-950 p-2 hover:bg-primary-50 hover:rounded-sm active:rounded-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen(false);
                    handleClickOnBlur(opt.value);
                  }}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          </div>,

          document.body
        )}
    </div>
  );
}
