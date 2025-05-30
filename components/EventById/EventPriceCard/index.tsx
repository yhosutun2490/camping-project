"use client"
import DiscountRate from "../EventPlanSelector/EventPlanCard/DiscountRate";
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
 
  function onSelectPlan() {
    console.log("選擇方案被點擊");
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
             <DiscountRate rate={discount}/>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onSelectPlan}
        className="w-full btn-primary text-white py-2 rounded-md text-center font-semibold"
      >
        選擇方案
      </button>
    </div>
  );
}
