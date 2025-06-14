"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { AddonItem } from "@/components/EventById/EventPlanSelector/EventAddonCheckbox";
import EventAddonCheckbox from "@/components/EventById/EventPlanSelector/EventAddonCheckbox";
import DiscountRate from "./DiscountRate";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { useMemberLogin } from "@/stores/useMemberLogin";
import {
  usePostMemberOrders,
  usePatchMemberOrders,
} from "@/swr/member/orders/useMemberOrders"; // 創建/修改會員訂單SWR
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "next/navigation";
import { useRef } from "react";
import DialogModal from "@/components/DialogModal";

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
  event_info_id: string;
  deadline: string;
  features: PlanFeatureItem[];
  price: number;
  originalPrice?: number;
  addonBox: AddonItem[];
};
export type EventDetail = {
  event_info_id: string;
  event_photo_url: string;
  event_name: string;
};
export type EventPlanCardProps = {
  event: EventDetail;
  plan: PlanData;
  isSelected?: boolean; // 是否選中
  unit?: string; // 單位（如每人、每組等）
};



export default function EventPlanCard(props: EventPlanCardProps) {
  const {
    event,
    plan,
    unit = "NT$", // 預設單位為NT$
  } = props;
  const { id, title, deadline, features, price, originalPrice } = plan;
  const { watch } = useFormContext(); // 設定表單選取資料
  const modalRef = useRef<HTMLInputElement>(null);
  const modalId = `login-reminder-${plan.id}`; // modal id
  const memberData = useMemberLogin((state) => state.member);
  const isMemberLogin = !!memberData?.id; // 是否登入

  // 是否有訂單id
  const params = useParams();
  const searchParams = useSearchParams();
  const eventId = params?.id;
  const orderId = searchParams.get("orderId");
  const isEditing = Boolean(orderId && eventId);

  // 創建會員訂單API
  const { trigger, isMutating } = usePostMemberOrders();
  const { trigger: triggerPatch, isMutating: isMutatingPatch } =
    usePatchMemberOrders();

  // shopping cart store
  const addStorePlan = useShoppingCartStore((state) => state.addPlan);
  /**
   * 選擇的方案
   */
  const selectPlanId = watch("plan").event_plan_id;
  /**
   * 選取的加購選項
   */
  const addonBoxItems = watch("plan_addons");

  const currentPlanAddonItems = addonBoxItems.filter(
    (item: { event_plan_id: string }) => item.event_plan_id === id
  );

  const discountedRate = originalPrice
    ? ((price / originalPrice) * 100).toFixed(0)
    : "100"; // 計算折扣價格比例

  // 點擊購物車行為
  async function handleOnClickAddCart() {
    // 需登入才有member id 進行訂單創建
    if (isMemberLogin) {
      try {
        if (isEditing) {
          // 修改訂單
          await triggerPatch({
            id: orderId ?? "",
            body: {
              event_plan_id: plan.id,
              quantity: 1,
              event_addons: currentPlanAddonItems,
            },
          });
          toast.success("修改購物車品項成功");
        } else {
          // 新增訂單
          await trigger({
            event_plan_id: plan.id,
            quantity: 1,
            event_addons: currentPlanAddonItems,
          });
          toast.success("新增購物車品項成功");
        }

      } catch (err) {
        if (axios.isAxiosError(err)) {
          const message = err.response?.data?.message;
          console.log("api有誤", message);
          toast.error(message);
        }
      }
    } else {
      // modalRef.current?.click(); // ✅ 開啟 modal
      // 未登入 暫存於store
      addStorePlan({
         ...plan,
         addonBox: currentPlanAddonItems,
         ...event
      });
    }
  }

  // 直接報名
  function handleOnClickSignupEvent() {
    if (isMemberLogin) {
      console.log(
        "目前直接報名資料",
        plan,
        "addonBoxItems",
        currentPlanAddonItems
      );
    } else {
      modalRef.current?.click(); // ✅ 開啟 modal
    }
  }

  return (
    <div
      className={clsx(
        "event_plan_card p-4 md:p-6 rounded-2xl grid gap-4 grid-cols-1 bg-neutral-50",
        selectPlanId === plan.id && "border-2 border-primary-500 bg-zinc-100"
      )}
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
          {features?.map((item: PlanFeatureItem) => (
            <li key={item.id}>{item.content}</li>
          ))}
        </div>
      </div>
      {/*加購選擇區*/}
      <EventAddonCheckbox name="plan_addons" options={plan.addonBox} />

      {/*方案價格區*/}
      <div
        className="select_btn_wrap rounded-2xl bg-white py-6 px-4 
      flex flex-col md:flex-row flex-wrap gap-2 justify-between items-start"
      >
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
              handleOnClickSignupEvent();
            }}
          >
            直接報名
          </button>
          <button
            className="btn-primary text-white py-2 px-4 rounded-md min-w-[100px] h-[40px]"
            onClick={(e) => {
              e.preventDefault();
              handleOnClickAddCart();
            }}
          >
            {isMutating || isMutatingPatch ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "加入購物車"
            )}
          </button>
        </div>
      </div>

      <DialogModal
        id={modalId}
        modalRef={modalRef}
        modalWidth="max-w-md"
      >
        <h3 className="font-bold heading-3 text-primary-500">請先登入</h3>
        <p className="py-4 heading-5 text-black">登入後才能執行此操作</p>
        <div className="modal-action">
          <label htmlFor={modalId} className="btn-primary">
            關閉
          </label>
        </div>
      </DialogModal>
    </div>
  );
}
