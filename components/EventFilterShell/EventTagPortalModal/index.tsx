"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import TabList from "@/components/TabListSection/TabList";
import { useFilterStore } from "@/stores/useFilterStore";
import type { GetApiV1MetaEventTags200DataEventTagsItem } from "@/types/services/EventTags";

interface Props {
  initialTagsList: GetApiV1MetaEventTags200DataEventTagsItem[];
}
export default function EventTagPortalModal({ initialTagsList }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const tags = useFilterStore((s) => s.tags);
  return (
    <>
      <button
        className="btn-primary flex items-center grow h-[40px]"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        更多標籤
        <div className="ml-auto flex items-center space-x-2">
          {tags.length > 0 && (
            <div className="w-5 h-5 p-1 flex justify-center items-center rounded-full bg-primary-300 text-white">
              <p className="text-sm leading-[0.5]">{tags.length}</p>
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
              className="bg-white max-h-[200px] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <TabList initialTagsList={initialTagsList} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
