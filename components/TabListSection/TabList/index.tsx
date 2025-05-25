"use client";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import type {
  GetApiV1MetaEventTags200DataEventTagsItem,
} from "@/types/services/EventTags";
import { useFilterStore } from "@/stores/useFilterStore";

interface Props {
  initialTagsList: GetApiV1MetaEventTags200DataEventTagsItem[];
}
const defaultTabs: GetApiV1MetaEventTags200DataEventTagsItem[] = [
  { id: "2", name: "新手友善", level: "easy", description: "", created_at: "" },
  { id: "3", name: "闔家同樂", level: "easy", description: "", created_at: "" },
  {
    id: "4",
    name: "進階挑戰",
    level: "advance",
    description: "",
    created_at: "",
  },
  {
    id: "5",
    name: "秘境探索",
    level: "medium",
    description: "",
    created_at: "",
  },
  { id: "6", name: "奢華露營", level: "easy", description: "", created_at: "" },
];
export default function TabList({ initialTagsList }: Props) {
  const tags = useFilterStore((s) => s.tags);
  const setTags = useFilterStore((s) => s.setTags);
  const eventTabLists =
    Array.isArray(initialTagsList) && initialTagsList?.length > 0
      ? initialTagsList
      : defaultTabs;

  function handleClickTab(value: string) {
    const nextTags = tags.includes(value)
    // 如果已經包含，就移除它
    ? tags.filter((t) => t !== value)
    // 否則就加進去
    : [...tags, value]

    setTags(nextTags)
  }

  return (
    <div className="tag-list space-y-2">
      {tags.length > 0 && (
        <p className="text-primary-300"> 已選擇 {tags.length} 項標籤 </p>
      )}
      <div className="flex flex-wrap gap-5 px-[10%] py-4 md:p-0">
        {eventTabLists?.map((item) => (
          <div
            className={clsx(
              `p-4 badge badge-outline flex items-center gap-2 cursor-pointer 
          text-sm text-neutral-950 hover:scale-110`,
              tags.includes(item.name ?? "")
                ? "text-white bg-primary-500"
                : "bg-transparent border-primary-300"
            )}
            key={item.name}
            onClick={() => handleClickTab(item.name as string)}
          >
            {item?.name}
            {(tags.includes(item.name ?? "")) && (
              <Icon
                icon="maki:cross"
                className="text-neutral-950"
                width={20}
                height={20}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
