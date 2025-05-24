// DualRangeField.tsx
"use client";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { Range } from "react-range";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type FormValues = {
  priceRange: [number, number];
};

interface Props {
  setIsOpen?: (open:boolean)=> void
}

export default function PriceRangeFilter( {setIsOpen}:Props) {
  const methods = useForm<FormValues>({
    defaultValues: { priceRange: [0, 8000] },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onSubmit = (data: FormValues) => {
    console.log("送出的範圍：", data.priceRange);
    try {
      // 1. 複製現有的 query
      const params = new URLSearchParams(searchParams.toString());

      // 2. 更新／加入 priceRange
      const [minPrice, maxPrice] = data.priceRange;
      params.set("minPrice", String(minPrice));
      params.set("maxPrice", String(maxPrice));

      // 3. push 回去
      router.push(`${pathname}?${params.toString()}`);
      if (setIsOpen) setIsOpen(false)
    } catch (err) {
      console.warn("導向活動列表頁有誤", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full px-[10%] md:p-4 card bg-white shadow-sm space-y-6 p-4"
      >
        <p className="text-2xl text-neutral-950">價格範圍(每人)</p>
        <Controller
          name="priceRange"
          control={methods.control}
          rules={{
            validate: ([min, max]) => min < max || "最小值需小於最大值",
          }}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              {/* Slider */}
              <Range
                step={100}
                min={0}
                max={10000}
                values={field.value}
                onChange={(vals) => field.onChange(vals as [number, number])}
                onFinalChange={() => field.onBlur()}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-1 bg-gray-200 rounded"
                    style={{ width: "100%" }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => {
                  // 先把 key 拆出來
                  const { key, ...restProps } = props;

                  return (
                    // 把 key 當成 key，其他屬性再 spread
                    <div
                      key={key}
                      {...restProps}
                      className="h-4 w-4 rounded-full bg-primary-500"
                    />
                  );
                }}
              />

              {/* 數字輸入框 */}
              <div className="flex items-center space-x-2">
                <div className="text-primary-300">
                  NT$
                  <input
                    type="number"
                    className="w-24 border p-1"
                    value={field.value[0]}
                    min={0}
                    max={field.value[1] - 100}
                    onChange={(e) =>
                      field.onChange([
                        Math.min(Number(e.target.value), field.value[1] - 100),
                        field.value[1],
                      ])
                    }
                    onBlur={field.onBlur}
                  />
                </div>
                <span>─</span>
                <div className="text-primary-300">
                  NT$
                  <input
                    type="number"
                    className="w-24 border p-1"
                    value={field.value[1]}
                    min={field.value[0] + 100}
                    max={100000}
                    onChange={(e) =>
                      field.onChange([
                        field.value[0],
                        Math.max(Number(e.target.value), field.value[0] + 100),
                      ])
                    }
                    onBlur={field.onBlur}
                  />
                </div>
              </div>

              {/* 顯示驗證錯誤 */}
              {fieldState.error && (
                <p className="text-red-500">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <button type="submit" className="px-4 py-2 btn-primary rounded">
          提交
        </button>
      </form>
    </FormProvider>
  );
}
