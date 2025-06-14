"use client";

import { useRouter } from "next/navigation";
import type { PlanData } from '@/components/EventById/EventPlanSelector/EventPlanCard'


interface Props {
  plans: PlanData[]
  className?: string;
}

export default function CartPreviewDropdown({ plans, className = "" }: Props) {
  const router = useRouter();
  
  return (
    <div className={`absolute top-[130%] right-0 w-[380px] max-h-[500px] bg-white border rounded shadow-lg z-50 ${className}`}>
      <div className="max-h-[400px] overflow-y-auto divide-y">
        {plans.map((plan) => (
          <div key={plan.id} className="p-4 flex gap-3">
            <div className="flex-1">
              <div className="heading-6 text-primary-500">{plan.title}</div>
             {plan.addonBox.map((addon) => (
               <div key={addon.id} className="text-sm text-neutral-400">{addon.name}</div>
             ))}
              <div className="text-sm text-neutral-500">
                {plan.deadline}
              </div>
              <div className="text-sm text-neutral-500">x 1</div>
              <div className="text-primary-500 mt-1">NT${plan.price}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 flex justify-between items-center border-t">
        <span className="text-sm text-neutral-600">共 {plans.length} 件商品</span>
        <button
          className="btn-primary"
          onClick={() => router.push("/cart")}
        >
          登入查看購物車
        </button>
      </div>
    </div>
  );
};