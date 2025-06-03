"use client";
import DiscountRate from "../EventPlanSelector/EventPlanCard/DiscountRate";
import { scrollIntoElement } from "@/utils/scrollToView";

type EventPriceCardProps = {
  price: number;
  unit?: string;
  discounts?: string[];
  onSelectPlan?: () => void;
};

export default function EventPriceCard({
  price,
  unit = "每人",
  discounts = [],
}: EventPriceCardProps) {
 
  function handleClickPlan() {
    const isMobile = window.innerWidth < 1024;
    const dynamicOffset = isMobile ? 52 : 90;

    scrollIntoElement({
      targetId: "plan",
      containerId: "main-scroll-container",
      offset: dynamicOffset,
    });
  }
  return (
    <div className="border rounded-md p-4 w-full bg-white">
      <div className="text-xl font-bold mb-2">
        NT${price}({unit}) 最低
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {discounts.map((discount) => (
            <div
              key={discount}
              className="px-2 py-1 text-sm font-medium text-gray-700"
            >
              <DiscountRate rate={discount} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleClickPlan}
        className="w-full btn-primary text-white py-2 rounded-md text-center font-semibold"
      >
        選擇方案
      </button>
    </div>
  );
}
