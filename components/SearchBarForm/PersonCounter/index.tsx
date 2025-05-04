"use client"
import { useFormContext, useWatch } from "react-hook-form";
import { useState } from "react";
type LocalCounter = {
    adults: number,
    children: number,
    pets: number,
}


const counterOptions: Array<{
    key: keyof LocalCounter
    label: string
  }> = [
    { key: "adults",   label: "成人" },
    { key: "children", label: "小孩" },
    { key: "pets",     label: "寵物" },
  ]
  
export default function PersonCounter() {
  const { register,setValue } = useFormContext();
  const [localCount, setLocalCount] = useState<LocalCounter> ({
    adults: 0,
    children: 0,
    pets: 0,
  }) 
  // 只訂閱 adults, children, pets 三個欄位
  const person = useWatch({ name: "person" }) as {
    adults: number
    children: number
    pets: number
  }
  
  function handleClickOnBlur(
  ) {
    // 先更新值
    setValue('person', {
      ...localCount
    })

    const active = document.activeElement;
    if (active instanceof HTMLElement) {
      active.blur();
    }
  }

  function updateCounter(key: keyof LocalCounter, delta: number) {
    setLocalCount((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }))
  }
  return (
    <div className="dropdown dropdown-start w-full" {...register('person')}>
      <div
        tabIndex={0}
        role="button"
        className="options w-full min-h-[30px] flex items-center"
      >
        {person?.adults + person?.children + person?.pets} 人
      </div>
      <ul
        tabIndex={0}
        className={`
          dropdown-content menu mt-5 rounded-box p-4 w-full max-w-xs 
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
        <button className="btn border-none bg-primary-500 mt-2 py-2 rounded-2xl" onClick={handleClickOnBlur}>儲存</button>
  
      </ul>
    </div>
  );
}
