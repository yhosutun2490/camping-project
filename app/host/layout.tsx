"use client";

import React from "react";
import HostSidebar from "./components/HostSidebar";

export default function HostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50 pt-16">
      {/* 側邊欄 */}
      <HostSidebar />
      
      {/* 主要內容區域 - 動態渲染子路由 */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}
