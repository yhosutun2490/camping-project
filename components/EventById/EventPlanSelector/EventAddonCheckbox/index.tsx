"use client";
import { useFormContext, Controller } from "react-hook-form";
import CheckboxStyle from "@/components/CheckBoxStyle";
import clsx from "clsx";

// 加購選項資料
export type AddonItem = {
  id: string;
  event_plan_id: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
};

type Props = {
  name: string;
  options: AddonItem[]; 
  className? :string
};

export default function EventAddonCheckbox({ name, options, className }: Props) {
  const { control } = useFormContext(); // React Hook Form 的控制器
  return (
    <div className={clsx("form-control space-y-4",className)}>
      <label className="label">
        <span className="label-text heading-5">加購選項</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selected: AddonItem[] = field.value || [];

          const checkItemSelected = (
            selected: AddonItem[],
            option: AddonItem
          ): boolean => {
            return selected.some((item) => item.id === option.id);
          };

          // 處理選中或取消選中的事件
          const handleSelectCheckbox = (option: AddonItem) => {
            const alreadyHasAddon = checkItemSelected(selected, option);
            if (alreadyHasAddon) {
              // 如果已選中，則取消選中（移除）
              field.onChange(
                selected.filter((value) => value.id !== option.id)
              );
            } else {
              // 如果未選中，則加入
              field.onChange([...selected, option]);
            }
          };
          return (
            <div className="flex flex-wrap gap-6 select-none">
              {options.map((option) => {
                return (
                  <div className="addon_option" key={option.id}>
                    <label className="flex items-center text-lg cursor-pointer">
                      <CheckboxStyle
                        checked={checkItemSelected(selected, option)}
                        onChange={() => handleSelectCheckbox(option)}
                        value={option.id}
                      />
                      <span className="heading-6 space-x-2">
                        <span>{option.name} </span>
                        <span className="text-primary-500">NT$ {option.price}元</span>
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
