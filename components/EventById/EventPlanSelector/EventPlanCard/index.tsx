"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
export type PlanFeatureItem = {
  id: string;
  event_plan_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};
export type PlanData = {
  id: string;
  title: string;
  deadline: string;
  features: PlanFeatureItem[];
  price: number;
  originalPrice?: number;
};

export type EventPlanCardProps = {
  data: PlanData;
  isSelected?: boolean; // 是否選中
  unit?: string; // 單位（如每人、每組等）
  onSelect?: (id: string) => void; // 點選處理
};

export default function EventPlanCard(props: EventPlanCardProps) {
  const {
    data,
    unit = "NT$", // 預設單位為NT$
    isSelected,
    onSelect = () => {}, // 預設點選處理為空函數
  } = props;

  const { id, title, deadline, features, price, originalPrice } = data;

  const discountedRate = originalPrice
    ? Math.ceil((1 - price / originalPrice) * 100)
    : 100; // 計算折扣價格比例

  return (
    <div
      className={clsx(`event_plan_card border-1 border-primary-300 
        p-6 rounded-2xl grid gap-4 grid-cols-1 md:grid-cols-[3fr_1fr]`,
        isSelected && 'bg-zinc-300'
      )}
    >
      {/*方案詳細資訊*/}
      <div className="plan_info space-y-2">
        <p className="title heading-4">{title}</p>
        <div className="register_end_date flex items-center gap-2 text-lg font-semibold">
          <Icon icon="teenyicons:tick-circle-solid" width={20} height={20} />
          <p>報名截止日期: {deadline}</p>
        </div>
        <div className="plan_feature pl-4">
          {features?.map((item) => (
            <li key={item.id}>{item.content}</li>
          ))}
        </div>
      </div>

      {/*方案價格區*/}
      <div className="select_btn_wrap flex gap-2 justify-between">
        <div className="discount_info space-y-2">
          <div className="percent text-center border-1 border-red-300 text-red-300 rounded-xl ">
            {discountedRate} % off
          </div>
          <div className="original text-gray-500 line-through">
            {unit} {originalPrice?.toLocaleString() || "0"}
          </div>
          <div className="discount heading-4">
            {unit} {price?.toLocaleString() || "0"}
          </div>
        </div>
        <button
          className="btn-primary text-white py-2 px-4 rounded-md min-w-[100px] h-[40px]"
          onClick={(e) => {
            e.preventDefault();
            onSelect(id)
          }}
        >
          選擇方案
        </button>
      </div>
    </div>
  );
}
