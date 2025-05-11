"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useGetHostProfile } from "@/swr/host/useHostProfile";

// 預設圖片
const DEFAULT_BACKGROUND = "/main/main_bg_top.jpg";
const DEFAULT_AVATAR = "/header/user_image.jpg";

const HostProfile = () => {
  const { hostProfile, isLoading, error } = useGetHostProfile();

  // 處理載入中狀態
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
        <div className="flex justify-center items-center h-48">
          <div className="loading loading-spinner loading-lg text-primary-500"></div>
        </div>
      </div>
    );
  }

  // 處理錯誤或尚未建立主辦方資料的情況
  if (error || !hostProfile) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
        <div className="flex flex-col items-center justify-center h-48">
          <p className="text-lg font-medium text-neutral-700 mb-4">尚未建立主辦方資料</p>
          <button className="btn btn-primary">建立主辦方資料</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* 背景圖片區域 */}
      <div className="relative h-48 w-full">
        <Image
          src={hostProfile.photo_background_url || DEFAULT_BACKGROUND}
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
                src={hostProfile.photo_url || DEFAULT_AVATAR} 
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
              <h2 className="text-xl font-bold text-neutral-900">{hostProfile.name}</h2>
              
              {/* 認證狀態 - 移至名稱右邊 */}
              <div className="flex items-center ml-3">
                {hostProfile.verification_status === 'verified' ? (
                  <>
                    <Icon icon="material-symbols:check-circle-rounded" className="text-primary-500 mr-1" width={18} height={18} />
                    <div className="bg-primary-50 text-primary-700 text-xs px-2.5 py-0.5 rounded-full">
                      已認證
                    </div>
                  </>
                ) : hostProfile.verification_status === 'pending' ? (
                  <>
                    <Icon icon="material-symbols:pending-rounded" className="text-warning-500 mr-1" width={18} height={18} />
                    <div className="bg-warning-50 text-warning-700 text-xs px-2.5 py-0.5 rounded-full">
                      審核中
                    </div>
                  </>
                ) : (
                  <>
                    <Icon icon="material-symbols:error-rounded" className="text-error-500 mr-1" width={18} height={18} />
                    <div className="bg-error-50 text-error-700 text-xs px-2.5 py-0.5 rounded-full">
                      未通過
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <p className="text-neutral-700 mt-3">{hostProfile.description}</p>
          </div>
        </div>

        {/* 聯絡資訊 */}
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center text-neutral-700">
            <Icon icon="material-symbols:phone" className="mr-2 text-neutral-500" width={20} height={20} />
            <span>{hostProfile.phone}</span>
          </div>
          <div className="flex items-center text-neutral-700">
            <Icon icon="material-symbols:email" className="mr-2 text-neutral-500" width={20} height={20} />
            <span>{hostProfile.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
