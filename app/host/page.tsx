import React from "react";
import { HostProfile } from "./components/HostProfile";

export const metadata = {
  title: "主辦方資料 | 森森不息",
  description: "查看和編輯您的主辦方資料，管理您的活動資訊",
};

export default function HostPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 w-full">
      {/* 主辦方資料標題 */}
      <h1 className="text-black text-xl md:text-2xl lg:text-3xl font-semibold font-['Noto Sans TC'] leading-tight w-full">
        主辦方資料
      </h1>
      
      {/* 主辦方個人資料卡片 */}
      <div className="w-full">
        <HostProfile />
      </div>
    </div>
  );
}
