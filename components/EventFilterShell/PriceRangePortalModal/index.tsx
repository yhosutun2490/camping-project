"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import PriceRangerFilter from "@/components/PriceRangeFilter/index";
import { useFilterStore } from "@/stores/useFilterStore";

export default function PriceRangePortalModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const storeMinPrice = useFilterStore((s) => s.minPrice);
  const storeMaxPrice = useFilterStore((s) => s.maxPrice);

  return (
    <>
      <button
        className="btn-primary flex justify-between items-center grow h-[40px]"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span>價格篩選</span>
        <div className="flex items-center space-x-2">
           {(storeMinPrice && storeMaxPrice) && (
            <div className="w-5 h-5 p-1 flex justify-center items-center rounded-full bg-primary-300 text-white">
              <p className="text-sm leading-[0.5]">$</p>
            </div>
          )}
          <Icon
            icon="mdi:triangle-down"
            className="text-white ml-auto"
            width={12}
            height={12}
          />
        </div>
      </button>
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/40 z-50 flex items-end select-none"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="w-full bg-white overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <PriceRangerFilter setIsOpen={setIsOpen} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
