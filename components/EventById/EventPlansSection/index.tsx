"use client";
import EventPlanSelector from "@/components/EventById/EventPlanSelector";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { EventPlan } from "@/schema/EventPlanForm";
import { eventPlanSchema } from "@/schema/EventPlanForm";
// UI props type
import { PlanData } from "@/components/EventById/EventPlanSelector/EventPlanCard";
import { z } from "zod";

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
  // 表單資料主體連接 預設選擇第一項方案
  const form = useForm<FormType>({
    resolver: zodResolver(eventPlanSchema),
    defaultValues: {
      plan: {
        event_plan_id: data?.[0]?.id,
        quantity: 1,
        event_plan_price: data?.[0]?.discounted_price,
      },
      plan_addons: [], 
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
      addonBox: item?.eventPlanAddonBox
    };
  });
  

  const onSubmit = (data: FormType) => {
    console.log("送出資料", data); // 看使用者勾了哪些加購項目
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          id="plan"
          className="event_plan_section space-y-10"
        >
          <p className="heading-2">選擇方案</p>
          <EventPlanSelector name="plan" plans={planData} />
        </div>
      </form>
    </FormProvider>
  );
}
