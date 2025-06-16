'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import { useGetHostProfile } from '@/swr/host/useHostProfile';

const HostSidebar = () => {
  // 取得當前路徑以標記活動項目
  const pathname = usePathname();
  const { hostProfile, isLoading } = useGetHostProfile();

  // 側邊欄項目
  const sidebarItems = [
    {
      name: '活動列表',
      icon: 'material-symbols:splitscreen',
      link: '/host/activities',
    },
    {
      name: '查詢已發起活動',
      icon: 'material-symbols:search',
      link: '/host/search',
    },
    {
      name: '審核待上架活動',
      icon: 'material-symbols:visibility',
      link: '/host/review',
    },
    {
      name: '線上客服',
      icon: 'material-symbols:headset-mic',
      link: '/host/support',
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen gap-6">
      {/* 用戶資訊卡片 */}
      <div className="bg-[#E3E9E2] border border-[#A1B4A2] rounded-2xl px-0 py-6 flex flex-col items-center gap-4 w-full">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <span className="loading loading-spinner"></span>
              </div>
            ) : (
              <Image
                src={hostProfile?.photo_url || ''}
                alt="露營探險家"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <span className="text-black text-base font-semibold">露營探險家</span>
        </div>
        <Link
          href="/host"
          className="text-sm border-2 border-[#354738] rounded-2xl px-4 py-2 hover:bg-[#354738] hover:text-white transition-colors cursor-pointer"
        >
          管理主辦方資料
        </Link>
      </div>

      {/* 選單項目 */}
      <div className="flex flex-col w-full gap-2">
        {sidebarItems.map((item, index) => {
          // 檢查當前路徑是否匹配此項目的連結
          const isActive = pathname === item.link;

          return (
            <Link
              key={index}
              href={item.link}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-colors w-full
                ${
                  isActive
                    ? 'bg-[#E3E9E2] text-[#354738]'
                    : 'text-[#6D6D6D] hover:bg-gray-100'
                }`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Icon icon={item.icon} width={20} height={20} />
              </div>
              <span className="text-sm font-normal">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HostSidebar;
