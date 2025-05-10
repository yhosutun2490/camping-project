"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

const HostSidebar = () => {
  // 取得當前路徑以標記活動項目
  const pathname = usePathname();

  // 側邊欄項目
  const sidebarItems = [
    {
      name: "主頁",
      icon: "material-symbols:home",
      link: "/host",
    },
    {
      name: "活動列表",
      icon: "material-symbols:event",
      link: "/host/activities",
    },
    {
      name: "查詢已發起活動",
      icon: "material-symbols:search",
      link: "/host/search",
    },
    {
      name: "審核待上架活動",
      icon: "material-symbols:fact-check",
      link: "/host/review",
    },
    {
      name: "線上客服",
      icon: "material-symbols:support-agent",
      link: "/host/support",
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-neutral-100 shadow-sm">
      {/* Logo 區域 */}
      <div className="p-4 border-b border-neutral-100">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/header/logo_icon.svg"
              alt="森森不息 主辦中心"
              width={40}
              height={40}
            />
            <div className="ml-2 text-primary-700 font-bold">
              <div className="text-sm">森森不息</div>
              <div className="text-xs">主辦中心</div>
            </div>
          </div>
        </Link>
      </div>

      {/* 側邊欄選項列表 */}
      <nav className="mt-8">
        <ul>
          {sidebarItems.map((item, index) => {
            // 檢查當前路徑是否匹配此項目的連結
            const isActive = 
              pathname === item.link || 
              (pathname === '/host' && item.link === '/host');
            
            return (
              <li key={index}>
                <Link
                  href={item.link}
                  className={`flex items-center px-6 py-4 transition-colors
                    ${isActive ? 
                      'bg-primary-50 text-primary-700 font-medium' : 
                      'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'}`}
                >
                  <Icon icon={item.icon} width={24} height={24} className="mr-4" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default HostSidebar;
