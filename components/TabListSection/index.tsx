"use client"
import TabList from "./TabList";
import { Icon } from "@iconify/react";
import { useSearchParams } from 'next/navigation'
export default function TabListSection() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const person = searchParams.get("person");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const isAllEmpty = !location && !person && !from && !to;

  const eventTabLists = [
    {
      title: "全部",
      value: "all",
      icon: (
        <Icon
          icon="material-symbols:border-all"
          className="text-inherit"
          width={20}
          height={20}
        />
      ),
    },
    {
      title: "新手友好",
      value: "beginner",
      icon: (
        <Icon
          icon="fe:beginner"
          className="text-inherit"
          width={20}
          height={20}
        />
      ),
    },
    {
      title: "家庭親子",
      value: "family",
      icon: (
        <Icon
          icon="material-symbols:family-restroom-rounded"
          className="text-inherit"
          width={20}
          height={20}
        />
      ),
    },
    {
      title: "進階挑戰",
      value: "advance",
      icon: (
        <Icon
          icon="carbon:skill-level-advanced"
          className="text-inherit"
          width={20}
          height={20}
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-2 bg-inherit pt-4 px-8">
      <div className="event_search_bar w-[80%] mx-auto">
        {/* <SearchBarForm isBgBlur={false} bgColor="bg-primary-300"/> */}
      </div>
      <TabList lists={eventTabLists} />
    </div>
  );
}
