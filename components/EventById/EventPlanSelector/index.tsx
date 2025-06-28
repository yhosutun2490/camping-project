"use client";

import { useFormContext, Controller } from "react-hook-form";
import EventPlanCard from "@/components/EventById/EventPlanSelector/EventPlanCard";
import type { PlanData } from "@/components/EventById/EventPlanSelector/EventPlanCard";
import type { EventDetail } from "@/components/EventById/EventPlanSelector/EventPlanCard"
import type {RegisterStatus} from "@/app/event/[id]/page"


type Props = {
  event: EventDetail
  name: string;
  plans: PlanData[];
  registerStatus?: RegisterStatus
};

export default function EventPlanSelector({ name, plans, event, registerStatus }: Props) {
  const { control} = useFormContext();
  // 使用form hook 包裝封裝好的元件 讓元件解耦
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-4">
          {plans.map((plan) => (
            <EventPlanCard
              key={plan.id}
              event={event}
              plan={plan}
              isSelected={field.value?.event_plan_id === plan.id}
              registerStatus={registerStatus}
            />
          ))}
        </div>
      )}
    />
  );
}
