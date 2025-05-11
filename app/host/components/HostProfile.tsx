"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

// 模擬資料
const mockHostData = {
  name: "我愛露營",
  backgroundImage: "/main/main_bg_top.jpg",
  avatar: "/header/user_image.jpg",
  introduction: "我們是一個專業的露營活動策劃團隊，致力於提供高品質的露營體驗。",
  phone: "0912-345-678",
  email: "camping@example.com",
};

const HostProfile = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* 背景圖片區域 */}
      <div className="relative h-48 w-full">
        <Image
          src={mockHostData.backgroundImage}
          alt="背景圖片"
          fill
          className="object-cover"
        />
        {/* 編輯背景按鈕 */}
        <button className="absolute right-4 top-4 bg-white/80 p-2 rounded-full hover:bg-white transition">
          <Icon icon="material-symbols:edit" className="text-neutral-700" width={20} height={20} />
        </button>
        
        {/* 頭像 */}
        <div className="absolute left-10 top-6 z-10">
          <div className="avatar">
            <div className="w-24 h-24 mask mask-circle ring-4 ring-white shadow-lg">
              <Image
                src={mockHostData.avatar} 
                alt="主辦方頭像"
                width={96}
                height={96}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 個人資訊區域 */}
      <div className="p-6">
        <div>
          {/* 主辦方名稱和簡介 */}
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-neutral-900">{mockHostData.name}</h2>
              
              {/* 認證狀態 - 移至名稱右邊 */}
              <div className="flex items-center ml-3">
                <Icon icon="material-symbols:check-circle-rounded" className="text-primary-500 mr-1" width={18} height={18} />
                <div className="bg-primary-50 text-primary-700 text-xs px-2.5 py-0.5 rounded-full">
                  已認證
                </div>
              </div>
            </div>
            
            <p className="text-neutral-700 mt-3">{mockHostData.introduction}</p>
          </div>
        </div>

        {/* 聯絡資訊 */}
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center text-neutral-700">
            <Icon icon="material-symbols:phone" className="mr-2 text-neutral-500" width={20} height={20} />
            <span>{mockHostData.phone}</span>
          </div>
          <div className="flex items-center text-neutral-700">
            <Icon icon="material-symbols:email" className="mr-2 text-neutral-500" width={20} height={20} />
            <span>{mockHostData.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
