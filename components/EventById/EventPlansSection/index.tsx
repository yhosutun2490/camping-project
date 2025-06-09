"use client";
import EventPlanSelector from "@/components/EventById/EventPlanSelector";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { EventPlan } from "@/schema/EventPlanForm";
import { eventPlanSchema } from "@/schema/EventPlanForm";
// UI props type
import { PlanData } from "@/components/EventById/EventPlanSelector/EventPlanCard";
import { z } from "zod";
import { useParams, useSearchParams } from "next/navigation";

type FormType = z.infer<typeof eventPlanSchema>;

interface Props {
  data?: EventPlan[];
  close_Time?: string; // 報名截止時間
}
// 集中方案表單資料 1.方案選項 2.加購選項
export default function EventPlansSection({
  data,
  close_Time = "2025-07-30",
}: Props) {
  // 預設有order編輯訂單資料

  const params = useParams();
  const searchParams = useSearchParams();

  const eventId = params?.id;
  const orderId = searchParams.get("orderId");
  const planId = searchParams.get("planId");
  const addonIds = searchParams.get("addonIds")?.split(",") || [];

  // 找出對應的主方案
  const selectedPlan = data?.find((plan) => plan.id === planId);

  // 找出對應的加購項目

  const defaultAddons = data
    ?.flatMap((plan) => plan.eventPlanAddonBox) // 合併所有方案的加購項
    .filter((addon) => addonIds.includes(addon.id)); // 根據 addonIds 篩選出要的

  console.log("活動預設訂單資料", {
    eventId,
    orderId,
    planId,
    defaultAddons,
  });

  // 表單資料主體連接 預設為編輯表單資料
  const form = useForm<FormType>({
    resolver: zodResolver(eventPlanSchema),
    defaultValues: {
      plan: {
        event_plan_id: selectedPlan?.id || data?.[0]?.id,
        quantity: 1,
        event_plan_price: selectedPlan?.discounted_price ?? data?.[0]?.discounted_price,
      },
      plan_addons: defaultAddons,
    },
  });

  // 將方案資料傳入元件
  const planData: PlanData[] = (data ?? []).map((item) => {
    return {
      id: item.id,
      title: item.title,
      event_info_id: item.event_info_id,
      deadline: close_Time,
      features: item.eventPlanContentBox,
      price: item.discounted_price,
      originalPrice: item.price,
      addonBox: item?.eventPlanAddonBox,
    };
  });


  return (
    <FormProvider {...form}>
      <form>
        <div id="plan" className="event_plan_section space-y-10">
          <p className="heading-2">選擇方案</p>
          <EventPlanSelector name="plan" plans={planData} />
        </div>
      </form>
    </FormProvider>
  );
}
