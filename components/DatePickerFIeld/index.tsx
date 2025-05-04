"use client";

import { useFormContext, Controller } from "react-hook-form";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function DatePickerField() {
  // 1. 從 Context 拿到 control
  const { control } = useFormContext<{
    dateRange: DateRange;
  }>();

  return (
    <Controller
      name="dateRange"
      control={control}
      render={({ field: { value, onChange } }) => {
        // value is { from?: Date; to?: Date }
        const handleSelect = (range: DateRange) => {
          onChange(range); // 同步更新 form state
        };

        return (
            <DayPicker
              required
              mode="range"
              selected={value}
              onSelect={handleSelect}
              numberOfMonths={2}
              pagedNavigation
              fixedWeeks
              className="p-4 bg-gray"
              classNames={{
                months: "flex space-x-4", // space-x-4 加一點左右間距
              }}
              modifiersClassNames={{
                selected: "bg-green-200 rounded-full text-green-900",
                range_start: "ring-2 ring-green-500",
                range_end: "ring-2 ring-green-500",
              }}
            />
        );
      }}
    />
  );
}
