import React from "react";
import HostActivities from "../components/HostActivities";

export const metadata = {
  title: "活動列表 | 森森不息",
  description: "查看您主辦的所有活動，管理活動資訊和參與者",
};

export default function ActivitiesPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full">
      <h1 className="text-black text-xl md:text-2xl lg:text-3xl font-semibold font-['Noto Sans TC'] leading-tight w-full">
        活動列表
      </h1>
      
      <div className="mb-8">
        <HostActivities />
      </div>
    </div>
  );
}
