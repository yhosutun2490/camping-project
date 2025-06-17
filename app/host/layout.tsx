'use client';

import React from 'react';
import HostSidebar from './components/HostSidebar';
import Footer from '@/components/Footer';

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-center bg-neutral-50 pt-16 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full max-w-[1312px] px-4 lg:px-0">
          {/* 側邊欄 */}
          <div className="w-full lg:w-[304px]">
            <HostSidebar />
          </div>

          {/* 主要內容區域 - 動態渲染子路由 */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
      <section
        id="footer"
        className="w-full min-h-[34dvh] scroll-mt-24 bg-white 
            px-[1rem] py-[1.5rem] lg:px-[15%] lg:py-[40px]"
      >
        <Footer />
      </section>
    </>
  );
}
