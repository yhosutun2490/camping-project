"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { AddonItem } from "@/components/EventById/EventPlanSelector/EventAddonCheckbox";
import EventAddonCheckbox from "@/components/EventById/EventPlanSelector/EventAddonCheckbox";
import type { RegisterStatus } from "@/app/event/[id]/page";
import DiscountRate from "./DiscountRate";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { useMemberLogin } from "@/stores/useMemberLogin";
import {
  usePostMemberOrders,
  usePatchMemberOrders,
} from "@/swr/member/orders/useMemberOrders"; // 創建/修改會員訂單SWR
import { usePostMemberOrdersPayment } from "@/swr/member/orders/payment/useMemberPayment"; // 會員付款SWR
import { useGetMemberOrders } from "@/swr/member/orders/useMemberOrders"; // swr 取得會員db訂單實際資料(需要重新觸發更新狀態)
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "next/navigation";
import { useRef, useState, useMemo } from "react";
import DialogModal from "@/components/DialogModal";
import { injectAndSubmitECPayForm } from "@/utils/ecPayForm";

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
  registerStatus?: RegisterStatus; // 報名狀態
};

export default function EventPlanCard(props: EventPlanCardProps) {
  const {
    event,
    plan,
    unit = "NT$", // 預設單位為NT$
    registerStatus,
  } = props;
  const { id, title, deadline, features, price, originalPrice } = plan;
  const { watch } = useFormContext(); // 設定表單選取資料
  const modalRef = useRef<HTMLInputElement>(null);
  const modalId = `login-reminder-${plan.id}`; // modal id
  const memberData = useMemberLogin((state) => state.member);
  const isMemberLogin = !!memberData?.id; // 是否登入
  const isOnRegistering = registerStatus === "registering"; // 開放報名狀態

  // 是否有訂單id
  const params = useParams();
  const searchParams = useSearchParams();
  const eventId = params?.id;
  const orderId = searchParams.get("orderId");
  const isEditing = Boolean(orderId && eventId);

  // 區分直接報名流程
  const [isBookingDirect, setIsBookingDirect] = useState<boolean>(false);

  // 創建會員訂單API
  const { trigger: postOrder, isMutating } = usePostMemberOrders();

  // 修改會員訂單API
  const { trigger: patchOrder, isMutating: isMutatingPatch } =
    usePatchMemberOrders();

  // 會員付款API
  const { trigger: postPayment } = usePostMemberOrdersPayment();

  // 資料庫中對應的訂單資料更新
  const { mutate: mutateUpdateMemberOrderStatus } = useGetMemberOrders();

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

  // 計算點選總價
  const selectTotalPrice = useMemo(() => {
    const addonPrice = (currentPlanAddonItems as AddonItem[]).reduce(
      (acc: number, current: AddonItem) => acc + current.price,
      0
    );
    return plan.price + addonPrice;
  }, [currentPlanAddonItems, plan.price]);

  // 點擊購物車行為
  async function handleOnClickAddCart() {
    // 需登入才有member id 進行訂單創建
    if (isMemberLogin) {
      try {
        if (isEditing && orderId) {
          // 修改訂單
          await patchOrder({
            orderId: orderId,
            event_plan_id: plan.id,
            quantity: 1,
            event_addons: currentPlanAddonItems,
          });
          toast.success("修改購物車品項成功");
          mutateUpdateMemberOrderStatus();
        } else if (isEditing && !orderId) {
          toast.error("無效的訂單 ID，無法修改購物車品項");
        } else {
          // 新增訂單
          await postOrder({
            event_plan_id: plan.id,
            quantity: 1,
            event_addons: currentPlanAddonItems,
          });
          toast.success("新增購物車品項成功");
          mutateUpdateMemberOrderStatus();
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const message = err.response?.data?.message;
          console.log("api有誤", message);
          toast.error(message);
        }
      }
    } else {
      // modalRef.current?.click();
      // 未登入 暫存於store
      addStorePlan({
        ...plan,
        addonBox: currentPlanAddonItems,
        event: event,
      });
      toast.success("新增購物車品項成功");
    }
  }

  // 直接報名
  async function handleOnClickSignupEvent() {
    if (isMemberLogin) {
      setIsBookingDirect(true);
      try {
        /*1. 建立訂單（狀態：Unpaid） */
        const orderRes = await postOrder({
          event_plan_id: plan.id,
          quantity: 1,
          event_addons: currentPlanAddonItems,
        });
        // 可能需要解開 data
        // 防呆 + 正確取值
        const orderId = orderRes?.orderid;

        if (!orderId) {
          throw new Error("order_info 不存在");
          return;
        }

        const newOrderId = [orderId];
        console.log("報名取得新建id", newOrderId);

        /* 2. 取得付款 HTML 表單 */
        const { data: paymentRes } = await postPayment({
          orderIds: newOrderId,
        });

        if (!paymentRes?.html) {
          throw new Error("未取得付款表單");
        }
        /* 3. 動態插入 & 自動 submit*/
        injectAndSubmitECPayForm(paymentRes.html);
      } catch (err) {
        console.error(err);
        toast.error(`報名失敗，請稍後再試，${err}`);
      } finally {
        setIsBookingDirect(false);
      }
    } else {
      modalRef.current?.click(); // 未登入提醒modal
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
      <EventAddonCheckbox
        name="plan_addons"
        options={plan.addonBox}
        className={
          isOnRegistering ? undefined : "pointer-events-none opacity-60"
        }
      />

      {/*方案價格區*/}
      <div
        className="select_btn_wrap rounded-2xl bg-white py-6 px-4 
      flex flex-col md:flex-row flex-wrap gap-2 justify-between items-start"
      >
        <div className="discount_info flex items-center space-y-2 space-x-4">
          <DiscountRate rate={discountedRate} />
          <div className="event_price flex gap-2 items-start">
            <div className="discount relative text-primary-500 heading-4 md:heading-3">
              {currentPlanAddonItems.length > 0 && (
                <div className="absolute -top-5 left-0 w-fit text-primary-500 heading-7 rounded-2xl">含加購總價</div>
              )}
              {unit} {(price + selectTotalPrice).toLocaleString() || "0"}
            </div>
            <div className="original text-gray-500 text-base line-through">
              {unit} {originalPrice?.toLocaleString() || "0"}
            </div>
          </div>
        </div>

        <div className="btn_wrap md:ml-auto flex gap-4 justify-center lg:justify-between">
          {isOnRegistering ? (
            <>
              <button
                className="cursor-pointer border-2 border-primary-700 bg-white 
            text-primary-700 py-2 px-4 rounded-md min-w-[100px] h-[40px]
            leading-[20px] hover:bg-primary-300"
                onClick={(e) => {
                  e.preventDefault();
                  handleOnClickSignupEvent();
                }}
              >
                {isBookingDirect ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "直接報名"
                )}
              </button>
              <button
                className="btn-primary text-white py-2 px-4 rounded-md min-w-[100px] h-[40px]"
                onClick={(e) => {
                  e.preventDefault();
                  handleOnClickAddCart();
                }}
              >
                {(isMutating && !isBookingDirect) || isMutatingPatch ? (
                  <span className="loading loading-spinner"></span>
                ) : isEditing ? (
                  "修改購物車"
                ) : (
                  "加入購物車"
                )}
              </button>
            </>
          ) : (
            <button className="bg-grey-100 text-primary-300 py-2 px-4 rounded-md min-w-[100px] h-[40px]">
              {registerStatus === "incoming" ? "尚未開放報名" : "截止報名"}
            </button>
          )}
        </div>
      </div>

      <DialogModal id={modalId} modalRef={modalRef} modalWidth="max-w-md">
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
