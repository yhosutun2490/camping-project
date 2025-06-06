"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { AddonItem } from "@/components/EventById/EventPlanSelector/EventAddonCheckbox";
import EventAddonCheckbox from "@/components/EventById/EventPlanSelector/EventAddonCheckbox";
import DiscountRate from "./DiscountRate";
import clsx from "clsx";
import { useFormContext} from "react-hook-form";
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
};

export default function EventPlanCard(props: EventPlanCardProps) {
  const {
    data,
    unit = "NT$", // 預設單位為NT$
  } = props;
  const { id, title, deadline, features, price, originalPrice } = data;
  const { watch } = useFormContext(); // 設定表單選取資料
  /**
   * 選取的加購選項
   */
  const addonBoxItems = watch("plan_addons");
  const currentPlanAddonItems = addonBoxItems.filter((item: { event_plan_id: string; })=>item.event_plan_id === id)


  const discountedRate = originalPrice
    ? ((price / originalPrice) * 100).toFixed(0)
    : "100"; // 計算折扣價格比例

  // 點擊購物車行為
  function handleOnClickAddCart () {
    console.log('目前加入購物車的方案',data,"addonBoxItems",currentPlanAddonItems)

  }

  // 直接報名
  function handleOnClickSignupEvent () {
     console.log('目前直接報名資料',data,"addonBoxItems",currentPlanAddonItems)
  }

  return (
    <div
      className={clsx(`event_plan_card
        p-4 md:p-6 rounded-2xl grid gap-4 grid-cols-1 bg-neutral-50`)}
    >
      {/*方案詳細資訊*/}
      <div className="plan_info space-y-6 pb-6 border-b-1 border-primary-300">
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
      {/*加購選擇區*/}
      <EventAddonCheckbox name="plan_addons" options={data.addonBox} />

      {/*方案價格區*/}
      <div className="select_btn_wrap rounded-2xl bg-white py-6 px-4 
      flex flex-col md:flex-row flex-wrap gap-2 justify-between items-start">
        <div className="discount_info flex items-center space-y-2 space-x-4">
          <DiscountRate rate={discountedRate} />
          <div className="event_price flex gap-2 items-start">
            <p className="discount text-primary-500 heading-4 md:heading-3">
              {unit} {price?.toLocaleString() || "0"}
            </p>
            <p className="original text-gray-500 text-base line-through">
              {unit} {originalPrice?.toLocaleString() || "0"}
              </p>
          </div>
        
        </div>

        <div className="btn_wrap md:ml-auto flex gap-4 justify-center lg:justify-between">
          <button
            className="cursor-pointer border-2 border-primary-700 bg-white 
            text-primary-700 py-2 px-4 rounded-md min-w-[100px] h-[40px]
            leading-[20px] hover:bg-primary-300"
            onClick={(e) => {
              e.preventDefault();
              handleOnClickSignupEvent()
            }}
          >
            直接報名
          </button>
          <button
            className="btn-primary text-white py-2 px-4 rounded-md min-w-[100px] h-[40px]"
            onClick={(e) => {
              e.preventDefault();
              handleOnClickAddCart()
            }}
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}
