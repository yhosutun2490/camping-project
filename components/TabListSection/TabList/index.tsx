"use client";
import { useState, ReactNode } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";

type Tab = {
  title: string;
  value: string;
  icon?: ReactNode;
};

export default function TabList() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const iconColor = 'text-primary-300'
  const iconMap = {
    default: 'arcticons:another-notes',
    all: 'material-symbols:border-all',
    beginner: 'fe:beginner',
    family: 'material-symbols:family-restroom-rounded',
    advance:'carbon:skill-level-advanced',
    secret: 'la:user-secret',
    luxury: 'token:flux',
  }
  const eventTabLists:Tab[] = [
    {
      title: "全部",
      value: "all",
      icon: (
        <Icon
          icon={iconMap['all']}
          className= {iconColor}
          width={20}
          height={20}
        />
      ),
    },
    {
      title: "新手友善",
      value: "beginner",
      icon: (
        <Icon
          icon={iconMap['beginner']}
          className= {iconColor}
          width={20}
          height={20}
        />
      ),
    },
    {
      title: "闔家同樂",
      value: "family",
      icon: (
        <Icon
          icon={iconMap['family']}
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
          icon={iconMap['advance']}
          className= {iconColor}
          width={20}
          height={20}
        />
      ),
    },
    {
      title: "秘境探索",
      value: "secret",
      icon: (
        <Icon
          icon={iconMap['secret']}
          className= {iconColor}
          width={20}
          height={20}
        />
      ),
    },
     {
      title: "豪奢露營",
      value: "luxury",
      icon: (
        <Icon
          icon={iconMap['luxury']}
          className= {iconColor}
          width={20}
          height={20}
        />
      ),
    },
  ];

  function handleClickTab(value: string) {
    setActiveTab(value);
  }

  return (
    <div className="flex flex-wrap gap-5 px-[10%] py-4 md:p-0">
      {eventTabLists?.map((item) => (
        <div  className={clsx(`p-4 badge badge-outline flex items-center gap-2 cursor-pointer 
          text-xl text-neutral-950 hover:scale-110`,
          activeTab === item.value?"text-white bg-primary-500":"bg-transparent"
        )}
        key={item.value}
        onClick={() => handleClickTab(item?.value)}
        >
          {item?.icon}
          {item?.title}   
        </div>
      ))}
    </div>
  );
}
