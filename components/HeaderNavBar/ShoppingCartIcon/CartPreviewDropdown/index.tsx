"use client";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { useRouter } from "next/navigation";


interface Props {
  className?: string;
}

export default function CartPreviewDropdown ({ className = "" }:Props) {
  const router = useRouter();
  const plans = useShoppingCartStore((state) => state.plans);
  console.log('目前plan暫存資料',plans)

  return (
    <div className={`absolute top-[130%] right-0 w-[380px] max-h-[500px] bg-white border rounded shadow-lg z-50 ${className}`}>
      <div className="max-h-[400px] overflow-y-auto divide-y">
        {plans.map((plan) => (
          <div key={plan.id} className="p-4 flex gap-3">
            <img
              src={plan.image || "/default.jpg"}
              className="w-20 h-20 object-cover rounded"
              alt={plan.title}
            />
            <div className="flex-1">
              <div className="font-semibold">{plan.title}</div>
              <div className="font-semibold">{plan.title}</div>
              <div className="text-sm text-neutral-500">
                {plan.date}｜{plan.type}
              </div>
              <div className="text-sm text-neutral-500">x {plan.quantity}</div>
              <div className="text-primary-500 mt-1">NT${plan.price}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 flex justify-between items-center border-t">
        <span className="text-sm text-neutral-600">共 {plans.length} 件商品</span>
        <button
          className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
          onClick={() => router.push("/cart")}
        >
          查看購物車
        </button>
      </div>
    </div>
  );
};