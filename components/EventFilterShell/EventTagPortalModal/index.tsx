"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import TabList from "@/components/TabListSection/TabList";
import type { GetApiV1MetaEventTags200Data} from "@/types/services/EventTags";

interface Props {
  initialTagsList: GetApiV1MetaEventTags200Data ;
}
export default function EventTagPortalModal({initialTagsList}:Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button className="btn-primary flex grow h-[40px]"
      onClick={()=>{setIsOpen(true)}}>
        更多標籤
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
          <div className="bg-white max-h-[200px] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <TabList initialTagsList={initialTagsList}/>
          </div> 
          </div>,
          document.body
        )}
    </>
  );
}
