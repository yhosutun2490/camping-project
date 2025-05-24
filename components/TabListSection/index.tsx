"use client"
import TabList from "./TabList";
import { Icon } from "@iconify/react";

export default function TabListSection() {
  const iconColor = 'text-primary-300'
  const eventTabLists = [
    {
      title: "全部",
      value: "all",
      icon: (
        <Icon
          icon="material-symbols:border-all"
          className= {iconColor}
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
          className= {iconColor}
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
          className= {iconColor}
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
          className= {iconColor}
          width={20}
          height={20}
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-2 bg-inherit p-4 px-8">
      <TabList lists={eventTabLists} />
    </div>
  );
}
