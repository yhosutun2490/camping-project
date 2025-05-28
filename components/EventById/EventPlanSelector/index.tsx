"use client";

import { useFormContext, Controller } from "react-hook-form";
import EventPlanCard from "@/components/EventById/EventPlanSelector/EventPlanCard";
import type {PlanData} from "@/components/EventById/EventPlanSelector/EventPlanCard"

type Props = {
  name: string;
  plans: PlanData[];
};


export default function EventPlanSelector({ name, plans }: Props) {
     const { control } = useFormContext();
     // 使用form hook 包裝封裝好的元件 讓元件解耦
     return (
     <Controller 
        name={name}
        control={control}
        render={({field})=>(
        <div className="space-y-4">
          {plans.map((plan) => (
            <EventPlanCard
              key={plan.id}
              data={plan}
              isSelected={field.value === plan.id}
              onSelect={() => field.onChange(plan.id)}
            />
          ))}
        </div>
      )}
    />)

}