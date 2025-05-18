"use client";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { useState } from "react";
import { createPortal } from "react-dom";

type LocalCounter = {
  adults: number;
  children: number;
  pets: number;
};

const counterOptions: Array<{
  key: keyof LocalCounter;
  label: string;
}> = [
  { key: "adults", label: "成人" },
  { key: "children", label: "小孩" },
  { key: "pets", label: "寵物" },
];

interface Props {
  textCenter?: boolean;
}
export default function PersonCounter({ textCenter }: Props) {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const { setValue, control } = useFormContext();
  const [localCount, setLocalCount] = useState<LocalCounter>({
    adults: 0,
    children: 0,
    pets: 0,
  });
  // 只訂閱 adults, children, pets 三個欄位
  const person = useWatch({ name: "person" }) as {
    adults: number;
    children: number;
    pets: number;
  };

  function handleClickOnBlur() {
    // 先更新值
    setValue("person", {
      ...localCount,
    });

    const active = document.activeElement;
    if (active instanceof HTMLElement) {
      active.blur();
    }
  }

  function updateCounter(key: keyof LocalCounter, delta: number) {
    setLocalCount((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  }
  return (
    <div className="dropdown dropdown-start w-full">
      {/* form hook 綁定 */}
      <Controller
        control={control}
        name="person"
        defaultValue={{ adults: 0, children: 0, pets: 0 }}
        render={() => <input type="hidden" />}
      />

      {/* 手機觸發按鈕 */}
      <div
        tabIndex={0}
        role="button"
        className={`block sm:hidden options w-full min-h-[30px] flex items-center ${
          textCenter ? "text-center leading-[2]" : ""
        }`}
        onClick={() => setMobileOpen(true)}
      >
        {person?.adults + person?.children + person?.pets} 人 {isMobileOpen}
      </div>
      <div
        tabIndex={0}
        role="button"
        className={`hidden sm:block options w-full min-h-[30px] flex items-center ${
          textCenter ? "text-center leading-[2]" : ""
        }`}
      >
        {person?.adults + person?.children + person?.pets} 人
      </div>
      {/**desktop tablet*/}
      <ul
        tabIndex={0}
        className={`
          dropdown-content menu mt-5 rounded-box p-4 w-full hidden sm:block
          min-w-[250px] max-w-xs 
          bg-white shadow-sm
          [--menu-active-bg:transparent] [--menu-active-fg:inherit]
        `}
      >
        {counterOptions.map(({ key, label }) => (
          <li key={key}>
            <div className="flex items-center justify-between text-neutral-950">
              <span>{label}</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full border-1 border-primary-500 text-primary-500 text-center leading-7"
                  onClick={() => updateCounter(key, -1)}
                >
                  –
                </div>
                <span className="w-6 text-center">{localCount[key]}</span>
                <div
                  className="w-8 h-8 rounded-full border-1 border-primary-500 text-primary-500 text-center leading-7"
                  onClick={() => updateCounter(key, +1)}
                >
                  +
                </div>
              </div>
            </div>
          </li>
        ))}
        <button
          type="button"
          className="w-full btn-primary mt-2 py-2 rounded-2xl"
          onClick={() => handleClickOnBlur()}
        >
          儲存
        </button>
      </ul>
      {/**mobile Portal 到 body 的手機底部彈窗*/}
      {isMobileOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/40 z-50 flex items-end select-none"
            onClick={() => setMobileOpen(false)}
          >
            <ul
              className="bg-white rounded-t-2xl p-4 w-full space-y-4 max-h-[60%] overflow-auto shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {counterOptions.map(({ key, label }) => (
                <li key={key} className="flex justify-between cursor-pointer">
                  <span className="text-lg text-neutral-950">{label}</span>
                  <div className="flex items-center gap-2">
                     <div
                  className="w-8 h-8 rounded-full border-1 border-primary-500 text-primary-500 text-center leading-7"
                  onClick={() => updateCounter(key, -1)}
                >
                  –
                </div>
                <span className="w-6 text-center text-neutral-950">{localCount[key]}</span>
                <div
                  className="w-8 h-8 rounded-full border-1 border-primary-500 text-primary-500 text-center leading-7"
                  onClick={() => updateCounter(key, +1)}
                >
                  +
                </div>
                  </div>
                </li>
              ))}
              <button
                className="btn-primary w-full mt-4"
                onClick={() => {
                  handleClickOnBlur();
                  setMobileOpen(false);
                }}
              >
                儲存
              </button>
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}
