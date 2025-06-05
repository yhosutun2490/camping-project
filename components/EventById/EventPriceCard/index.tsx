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
    <div className="border border-2 border-primary-300 rounded-2xl p-4 w-full bg-white">
      <div className="price mb-2">
        <span className="heading-3 text-primary-500">NT${price} </span>
        <span className="text-base text-neutral-700">/ ({unit}) 最低</span>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex space-x-3">
          {discounts.map((discount) => (
            <div
              key={discount}
            >
              <DiscountRate rate={discount} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleClickPlan}
        className="w-full btn-primary"
      >
        選擇方案
      </button>
    </div>
  );
}
