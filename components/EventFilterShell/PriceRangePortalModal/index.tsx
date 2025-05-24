"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import PriceRangerFilter from "@/components/PriceRangeFilter/index"

export default function PriceRangePortalModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button className="btn-primary flex grow h-[40px]"
      onClick={()=>{setIsOpen(true)}}>
        價格篩選
        <Icon
          icon="mdi:triangle-down"
          className="text-white ml-auto"
          width={20}
          height={20}
        />
      </button>
     {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/40 z-50 flex items-end select-none"
            onClick={() => setIsOpen(false)}
          >
          <div className="w-full bg-white overflow-y-auto"  onClick={(e) => e.stopPropagation()}>
            <PriceRangerFilter setIsOpen={setIsOpen}/>
          </div> 
          </div>,
          document.body
        )}
    </>
  );
}
