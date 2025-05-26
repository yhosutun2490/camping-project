"use client";
import { Icon } from "@iconify/react";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  DayPicker,
  DateRange,
  MonthCaptionProps,
  CalendarMonth,
  useDayPicker,
} from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { formatDate } from "@/utils/formateDate";

function CustomFooter({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex justify-center gap-3 p-4 border-t">
      <button className="px-4 py-2 w-[200px] border-1 border-neutral-700 bg-white text-neutral-700 rounded-lg hover:bg-gray-100">
        彈性時間
      </button>
      <button
        onClick={onSave}
        className="px-6 py-2 w-[200px] btn-primary text-white rounded-lg hover:bg-gray-700"
      >
        儲存
      </button>
    </div>
  );
}


interface MyCaptionProps extends MonthCaptionProps {
  totalMonths: number;
}
function CustomCaption({ calendarMonth, displayIndex, totalMonths}: MyCaptionProps,) {
  // 1. 拿到真正的 JS Date
  const monthDate = (calendarMonth as CalendarMonth).date as Date;

  // 2. 用官方 hook 拿到 context 裡的 goToMonth / prev / next
  const { goToMonth, previousMonth, nextMonth } =
    useDayPicker();

  // 單月日曆或雙月日曆
  const isSingle = totalMonths === 1;

  const label = format(monthDate, "MMMM yyyy");
  return (
    <div className="flex w-full items-center justify-between px-4 mb-2">
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
      {displayIndex === 1 || isSingle ? (
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
interface Props {
  placeholder?: string;
  textCenter?: boolean;
}

export default function DatePickerField({
  placeholder = "請選擇日期",
  textCenter,
}: Props) {
  // mobile 彈窗狀態
  const [isMobileOpen, setMobileOpen] = useState(false);

  const today = new Date(); // “now” reference
  // 1. 從 Context 拿到 control
  const { setValue, control } = useFormContext();
  const [localRange, setLocalRange] = useState<{
    to?: string;
    from?: string;
  }>();
  const formDateRange = useWatch({ name: "dateRange" });
  const activeRange =
    // 有 local preview 時就優先用它
    localRange?.from && localRange?.to
      ? localRange
      : // 否則就 fallback 回 RHF 裡的值
        formDateRange;

  // 2. 再把 activeRange 轉回 DateRange
  const selectedRange: DateRange = {
    from: activeRange?.from ? new Date(activeRange.from) : undefined,
    to: activeRange?.to ? new Date(activeRange.to) : undefined,
  };

  function handleSelectDate(range?: DateRange) {
    if (!range) return;
    // 1. range.from/to 是 Date | undefined
    const fromStr = range.from ? format(range.from, "yyyy-MM-dd") : undefined;
    const toStr = range.to ? format(range.to, "yyyy-MM-dd") : undefined;
    setLocalRange({ from: fromStr, to: toStr });
  }
  function handleSave() {
    setValue("dateRange", localRange);
  }

  return (
    <div className="dropdown dropdown-left w-full">
      {/* form hook 綁定 */}
      <Controller
        control={control}
        name="dateRange"
        render={() => <input type="hidden" />}
      />
      {/* 手機板選單按鈕 */}
      <div
        tabIndex={0}
        role="button"
        className={`md:hidden options w-full min-h-[30px] flex items-center ${
          textCenter ? "justify-center" : ""
        }`}
        onClick={() => setMobileOpen(true)}
      >
        {formDateRange?.from && formDateRange?.to
          ? `${formatDate(formDateRange.from)} - ${formatDate(
              formDateRange.to
            )}`
          : placeholder}
      </div>
      <div
        tabIndex={0}
        role="button"
        className={`hidden md:flex options w-full min-h-[30px] flex items-center ${
          textCenter ? "justify-center" : ""
        }`}
      >
        {formDateRange?.from && formDateRange?.to
          ? `${formatDate(formDateRange.from)} - ${formatDate(
              formDateRange.to
            )}`
          : placeholder}
      </div>
      <div
        tabIndex={0}
        className="hidden md:block dropdown-content menu mt-11 rounded-2xl z-10 w-full relative 
         max-[900px]:left-[-350%] max-[1150px]:left-[-250%]  max-[1250px]:left-[-150%]  xl:left-[-50%]"
      >
        <DayPicker
          required
          mode="range"
          selected={selectedRange}
          onSelect={(date) => handleSelectDate(date)}
          numberOfMonths={2}
          footer
          fixedWeeks
          className="w-fit p-4 bg-white/100 rounded-2xl"
          disabled={{ before: today }}
          classNames={{
            months: "flex space-x-4", // space-x-4 加一點左右間距
            weekday: "text-neutral-300",
            selected: "border-none bg-primary-100 text-neutral-950", // 套给所有 selected
            day: "text-neutral-950",
            disabled: "opacity-30 pointer-events-none",
          }}
          components={{
            Nav: () => <></>,
            MonthCaption: (captionProps) => (
              <CustomCaption {...captionProps} totalMonths={2} />
            ),
            Footer: () => <CustomFooter onSave={handleSave} />,
          }}
          modifiers={{
            past: { before: today },
          }}
          modifiersClassNames={{
            range_start: "bg-primary-300 rounded-full",
            range_end: "bg-primary-300 rounded-full",
            past: "text-grey-500",
          }}
        />
      </div>
      {isMobileOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/40 z-50 flex items-end select-none"
            onClick={() => setMobileOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()} className="w-full">
              <DayPicker
                required
                mode="range"
                selected={selectedRange}
                onSelect={(date) => {
                  handleSelectDate(date);
                }}
                numberOfMonths={1}
                footer
                fixedWeeks
                className="w-full p-4 bg-white/100 rounded-2xl"
                disabled={{ before: today }}
                classNames={{
                  months: "w-[350px] mx-auto flex", // space-x-4 加一點左右間距
                  month: "flex-1",
                  month_grid:'w-full',
                  weekday: "flex-1 text-neutral-300",
                  selected: "mx-auto w-fit border-none bg-primary-100 text-neutral-950", // 套给所有 selected
                  day: "rounded text-neutral-950",
                  disabled: "opacity-30 pointer-events-none",
                }}
                components={{
                  Nav: () => <></>,
                  MonthCaption: (captionProps) => (
                    <CustomCaption {...captionProps} totalMonths={1} />
                  ),
                  Footer: () => (
                    <CustomFooter
                      onSave={() => {
                        handleSave();
                        setMobileOpen(false);
                      }}
                    />
                  ),
                }}
                modifiers={{
                  past: { before: today },
                }}
                modifiersClassNames={{
                  range_start: "bg-primary-300 rounded-full",
                  range_end: "bg-primary-300 rounded-full",
                  past: "text-grey-500",
                }}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
