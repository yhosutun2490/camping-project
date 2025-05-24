"use client";
import { useState } from "react";
import clsx from "clsx";
import type { GetApiV1MetaEventTags200Data, GetApiV1MetaEventTags200DataEventTagsItem } from "@/types/services/EventTags";

interface Props {
  initialTagsList: GetApiV1MetaEventTags200Data ;
}
const defaultTabs: GetApiV1MetaEventTags200DataEventTagsItem[] = [
  { id: "1", name: "全部",      level: "easy",   description: "", created_at: "" },
  { id: "2", name: "新手友善",  level: "easy",   description: "", created_at: "" },
  { id: "3", name: "闔家同樂",  level: "easy",   description: "", created_at: "" },
  { id: "4", name: "進階挑戰",  level: "advance",description: "", created_at: "" },
  { id: "5", name: "秘境探索",  level: "medium", description: "", created_at: "" },
  { id: "6", name: "奢華露營",  level: "easy",   description: "", created_at: "" },
];
export default function TabList({ initialTagsList }: Props) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const eventTabLists = 
    Array.isArray(initialTagsList) && initialTagsList.length > 0
      ? initialTagsList
      : defaultTabs;


  function handleClickTab(value: string) {
    setActiveTab(value);
  }

  return (
    <div className="flex flex-wrap gap-5 px-[10%] py-4 md:p-0">
      { eventTabLists?.map((item) => (
          <div
            className={clsx(
              `p-4 badge badge-outline flex items-center gap-2 cursor-pointer 
          text-xl text-neutral-950 hover:scale-110`,
              activeTab === item.name
                ? "text-white bg-primary-500"
                : "bg-transparent"
            )}
            key={item.name}
            onClick={() => handleClickTab(item.name as string)}
          >
            {item?.name}
          </div>
        ))}
    </div>
  );
}
