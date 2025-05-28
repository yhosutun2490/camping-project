"use client";
import { useFormContext, Controller } from "react-hook-form";

// 加購選項資料
export type AddonItem = {
  id: string;
  label: string;
  price: number;
  value: string;
};

type Props = {
  name: string;
  options: AddonItem[];
};

export default function EventAddonCheckbox({ name, options }: Props) {
  const { control } = useFormContext(); // React Hook Form 的控制器
  return (
    <div className="form-control space-y-4">
      <label className="label">
        <span className="label-text heading-5">加購選項</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          console.log('目前加購選項',field.value)
          const selected: string[] = field.value || []; // 選中的加購選項

          // 處理選中或取消選中的事件
          const handleSelectCheckbox = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            const value = e.target.value; // 取得 checkbox 的值
            // checkbox狀態
            if (e.target.checked) {
              // 如果選中，添加到選中列表
              field.onChange([...selected, value]);
            } else {
              // 如果取消選中，從選中列表中移除
              field.onChange(selected.filter((item) => item !== value));
            }
          };
          return (
            <div className="flex gap-2 select-none">
              {options.map((option) => {
                return (
                  <div className="addon_option" key={option.value}>
                    <label className="flex items-center gap-2 text-lg cursor-pointer">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={selected.includes(option.value)}
                        onChange={handleSelectCheckbox}
                        className="peer hidden"
                      />
                      <div
                        className="w-5 h-5 rounded-sm border border-gray-400 flex items-center justify-center text-sm
                        peer-checked:bg-primary-500 peer-checked:text-white"
                      >
                        {selected.includes(option.value) && "✓"}
                      </div>
                      <span>
                        {option.label} - {option.price}元
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
}
