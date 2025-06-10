"use client";

import React from "react";
import HostSidebar from "./components/HostSidebar";

export default function HostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50 pt-16">
      <div className="flex flex-row gap-10 w-full" style={{ padding: '40px 304px' }}>
        {/* 側邊欄 */}
        <HostSidebar />
        
        {/* 主要內容區域 - 動態渲染子路由 */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
