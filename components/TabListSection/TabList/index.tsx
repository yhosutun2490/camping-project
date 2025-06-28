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
    <div className="tag-list p-4 md:p-0 space-y-2">
      <div className="flex flex-wrap gap-5 px-[10%] py-4 md:p-0">
        {eventTabLists?.map((item) => (
          <div
            className={clsx(
              `p-4 badge badge-outline rounded-2xl flex items-center gap-2 cursor-pointer 
          text-sm text-neutral-500 hover:scale-110`,
              tags.includes(item.name ?? "")
                ? "text-primary-500 bg-primary-50 border-primary-500 border-2"
                : "bg-transparent border-transparent border-2 bg-white"
            )}
            key={item.name}
            onClick={() => handleClickTab(item.name as string)}
          >
            <span className="select-none">{item?.name}</span>
            {(tags.includes(item.name ?? "")) && (
              <Icon
                icon="maki:cross"
                className="text-primary-500"
                width={16}
                height={16}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
