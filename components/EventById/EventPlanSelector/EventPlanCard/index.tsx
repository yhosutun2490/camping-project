"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { AddonItem } from "@/components/EventById/EventPlanSelector/EventAddonCheckbox";
import EventAddonCheckbox from "@/components/EventById/EventPlanSelector/EventAddonCheckbox";
import DiscountRate from "./DiscountRate";
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
  addonBox: AddonItem[];
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
    onSelect = () => {}, // 預設點選處理為空函數
  } = props;

  const { id, title, deadline, features, price, originalPrice } = data;

  const discountedRate = originalPrice
    ? ((price / originalPrice) * 100).toFixed(0)
    : "100"; // 計算折扣價格比例

  return (
    <div
      className={clsx(`event_plan_card
        p-6 rounded-2xl grid gap-4 grid-cols-1 bg-neutral-50`)}
    >
      {/*方案詳細資訊*/}
      <div className="plan_info space-y-2">
        <p className="title heading-3">{title}</p>
        <div className="register_end_date flex items-center gap-2 text-lg font-semibold">
          <Icon
            icon="teenyicons:tick-circle-solid"
            width={20}
            height={20}
            className="text-primary-500"
          />
          <p className="text-base">報名截止日期: {deadline}</p>
        </div>
        <div className="plan_feature pl-4">
          {features?.map((item) => (
            <li key={item.id}>{item.content}</li>
          ))}
        </div>
      </div>

      {/*方案價格區*/}
      <div className="select_btn_wrap rounded-xl bg-white py-6 px-4 flex gap-2 justify-between">
        <div className="discount_info flex items-center space-y-2 space-x-4">
          <DiscountRate rate={discountedRate}/>
          <div className="discount text-primary-500 heading-3">
            {unit} {price?.toLocaleString() || "0"}
          </div>
          <div className="original text-gray-500 text-base line-through">
            {unit} {originalPrice?.toLocaleString() || "0"}
          </div>
        </div>
      </div>
      {/*加購選擇區*/}
      <EventAddonCheckbox name="plan_addons" options={data.addonBox} />
      <div className="btn_wrap w-[50%] mx-auto flex justify-between">
         <button
          className="btn-primary text-white py-2 px-4 rounded-md min-w-[100px] h-[40px]"
          onClick={(e) => {
            e.preventDefault();
            onSelect(id);
          }}
        >
         直接報名
        </button>
        <button
          className="btn-primary text-white py-2 px-4 rounded-md min-w-[100px] h-[40px]"
          onClick={(e) => {
            e.preventDefault();
            onSelect(id);
          }}
        >
          加入購物車
        </button>
      </div>
    </div>
  );
}
