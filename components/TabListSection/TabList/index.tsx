"use client";
import { useState, ReactNode } from "react";
type Tab = {
  title: string;
  value: string;
  icon?: ReactNode;
};
interface Props {
  lists?: Tab[];
}
export default function TabList({ lists }: Props) {
  const [activeTab, setActiveTab] = useState<string>("all");

  function handleClickTab(value: string) {
    setActiveTab(value);
  }

  return (
    <div className="flex gap-5 text-neutral-950 text-xl">
      {lists?.map((item) => (
        <div  className="badge badge-outline bg-primary-500 flex items-center gap-2 cursor-pointer hover:text-primary-300" key={item.value}>
          {item?.icon}
          <div
            className={`${
              activeTab === item.value ? "text-blue-500 border-b-2 border-zinc-500" : ""
            }`}
            onClick={() => handleClickTab(item?.value)}
          >
            {item?.title}
          </div>
        </div>
      ))}
    </div>
  );
}
