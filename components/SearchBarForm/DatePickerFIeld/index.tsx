"use client";
import { Icon } from "@iconify/react";
import { useFormContext, useWatch } from "react-hook-form";
import { useState } from "react";
import {
  DayPicker,
  DateRange,
  MonthCaptionProps,
  CalendarMonth,
  useDayPicker,
} from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";



function CustomFooter({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex justify-center gap-3 p-4 border-t">
      <button className="px-4 py-2 w-[200px] border-1 border-neutral-700 bg-white text-neutral-700 rounded-lg hover:bg-gray-100">
        彈性時間
      </button>
      <button  
        onClick={onSave}
        className="px-6 py-2 w-[200px] bg-primary-500 text-white rounded-lg hover:bg-gray-700"
      >
        儲存
      </button>
    </div>
  );
}


function CustomCaption({ calendarMonth, displayIndex }: MonthCaptionProps) {
  // 1. 拿到真正的 JS Date
  const monthDate = (calendarMonth as CalendarMonth).date as Date;

  // 2. 用官方 hook 拿到 context 裡的 goToMonth / prev / next
  const { goToMonth, previousMonth, nextMonth } = useDayPicker();

  const label = format(monthDate, "MMMM yyyy");
  return (
    <div className="flex items-center justify-between px-4 mb-2">
      {/* 第一個月顯示上一頁，其他空一格 */}
      {displayIndex === 0 ? (
        <Icon
          icon="gridicons:arrow-left"
          width={40}
          height={40}
          onClick={() => goToMonth(previousMonth!)}
          className="p-2 rounded-full 
          text-primary-500 
          hover:bg-gray-200"
        ></Icon>
      ) : (
        <div className="w-10" />
      )}

      {/* 月份標題 */}
      <span className="text-lg font-semibold text-gray-700">{label}</span>

      {/* 最後一個月顯示下一頁，其他空一格 */}
      {displayIndex === 1 ? (
        <Icon
          icon="gridicons:arrow-right"
          width={40}
          height={40}
          onClick={() => goToMonth(nextMonth!)}
          className="p-2 rounded-full 
          text-primary-500
          hover:bg-gray-200"
        ></Icon>
      ) : (
        <div className="w-10" />
      )}
    </div>
  );
}

export default function DatePickerField() {
  const today = new Date(); // “now” reference
  // 1. 從 Context 拿到 control
  const { register, setValue } = useFormContext();
  const [localRange, setLocalRange] = useState<DateRange>();
  const formDateRange = useWatch({ name: "dateRange" });

  function handleSelectDate(range?: DateRange) {
    setLocalRange(range);
  }
  function handleSave() {
    setValue('dateRange', localRange);
  }


  return (
    <div className="dropdown dropdown-left w-full" {...register("dateRange")}>
      <div
        tabIndex={0}
        role="button"
        className="options w-full min-h-[30px] flex items-center"
      >
          {formDateRange?.from && formDateRange?.to
          ? `${formDateRange.from.toLocaleDateString()} - ${formDateRange.to.toLocaleDateString()}`
          : "選擇日期範圍"}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu mt-11 rounded-2xl z-10 w-full relative max-lg:left-[-180%]"
      >
        <DayPicker
          required
          mode="range"
          selected={localRange ?? formDateRange}
          onSelect={(date) => handleSelectDate(date)}
          numberOfMonths={2}
          footer
          fixedWeeks
          className="p-4 bg-white/100 rounded-2xl"
          disabled={{ before: today }}
          classNames={{
            months: "flex space-x-4", // space-x-4 加一點左右間距
            weekday:  "text-neutral-300",
            selected: "border-none bg-primary-100 text-neutral-950",  // 套给所有 selected
            day: "text-neutral-950",
            disabled: 'opacity-30 pointer-events-none',
          }}
          components={{
            Nav: () => <></>,
            MonthCaption: CustomCaption,
            Footer: ()=> <CustomFooter onSave={handleSave}/>
          }}
          modifiers={{
            past: { before: today },
          }}
          modifiersClassNames={{
            range_start: "bg-primary-300 rounded-full",
            range_end: "bg-primary-300 rounded-full",
            past: "text-grey-500"
          }}
        />
      </div>
    </div>
  );
}
