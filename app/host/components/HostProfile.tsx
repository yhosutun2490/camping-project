'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import FormField from '@/components/form/FormField';
import {
  useGetHostProfile,
  useUpdateHostProfile,
} from '@/swr/host/useHostProfile';
import {
  useHostAvatarUpload,
  useHostCoverUpload,
} from '@/swr/host/useHostProfileImage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  hostProfileSchema,
  HostProfileFormType,
} from '@/schema/HostProfileForm';
import toast from 'react-hot-toast';
import { UpdateHostProfileRequest } from '@/types/api/host';

// 預設圖片
const DEFAULT_BACKGROUND = '/main/main_bg_top.jpg';
const DEFAULT_AVATAR = '/header/user_image.jpg';

// 檔案上傳事件處理器型別
type FileUploadEvent = React.ChangeEvent<HTMLInputElement>;

export function HostProfile() {
  const { hostProfile, isLoading, error, mutate } = useGetHostProfile();
  const { isMutating, trigger } = useUpdateHostProfile();

  // 編輯狀態管理
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // 預覽圖片
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(
    null
  );
  // 儲存要上傳的檔案
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  // 檔案參照
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  // 圖片上傳 hooks
  const avatarUpload = useHostAvatarUpload();
  const coverUpload = useHostCoverUpload();

  // React Hook Form 設定
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<HostProfileFormType>({
    resolver: zodResolver(hostProfileSchema),
    defaultValues: hostProfile
      ? {
          name: hostProfile.name,
          description: hostProfile.description,
          email: hostProfile.email,
          phone: hostProfile.phone,
          // 如果已經有圖片，初始化時使用一個虛擬檔案
          photo: hostProfile.photo_url
            ? new File([], 'existing-photo.jpg')
            : null,
          photo_background: hostProfile.photo_background_url
            ? new File([], 'existing-background.jpg')
            : null,
        }
      : undefined,
    mode: 'onSubmit', // 提交時才進行驗證
  });

  // 處理頭像上傳
  const handleAvatarUpload = (e: FileUploadEvent) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 驗證檔案大小 (不超過 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('頭像圖片大小不能超過 2MB');
      return;
    }

    // 驗證檔案類型
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('僅支援 JPG、PNG、WebP 格式的圖片');
      return;
    }

    // 設置預覽
    const imageUrl = URL.createObjectURL(file);
    setAvatarPreview(imageUrl);

    // 儲存檔案以便之後上傳
    setAvatarFile(file);

    // 設定表單值，解決驗證問題
    setValue('photo', file, { shouldValidate: true });
    console.log('設置頭像檔案到表單:', file);
  };

  // 處理背景圖片上傳
  const handleBackgroundUpload = (e: FileUploadEvent) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 驗證檔案大小 (不超過 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('背景圖片大小不能超過 2MB');
      return;
    }

    // 驗證檔案類型
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('僅支援 JPG、PNG、WebP 格式的圖片');
      return;
    }

    // 設置預覽
    const imageUrl = URL.createObjectURL(file);
    setBackgroundPreview(imageUrl);

    // 儲存檔案以便之後上傳
    setBackgroundFile(file);

    // 設定表單值，解決驗證問題
    setValue('photo_background', file, { shouldValidate: true });
    console.log('設置背景圖片檔案到表單:', file);
  };

  // 表單提交處理函式
  const saveChanges = async (data: HostProfileFormType) => {
    try {
      // 建立基本資料物件
      const updateData: UpdateHostProfileRequest = {
        name: data.name,
        description: data.description,
        email: data.email,
        phone: data.phone,
      };

      // 處理頭像上傳
      if (avatarFile) {
        try {
          const res = await avatarUpload.trigger(avatarFile);
          // 如果上傳成功，更新資料物件中的 URL
          if (res?.data?.photo_url) {
            updateData.photo_url = res.data.photo_url;
          }
        } catch (err) {
          console.error('頭像上傳錯誤:', err);
        }
      }

      // 處理背景圖片上傳
      if (backgroundFile) {
        try {
          const res = await coverUpload.trigger(backgroundFile);

          // 如果上傳成功，更新資料物件中的 URL
          if (res?.data?.photo_url) {
            updateData.photo_background_url = res.data.photo_url;
          }
        } catch (err) {
          console.error('背景圖片上傳錯誤:', err);
        }
      }

      // 更新主辦方資料

      try {
        // 嘗試使用明確的參數調用
        await trigger(updateData);

        // 重新獲取最新資料
        await mutate();

        // 關閉編輯模式
        setIsEditing(false);

        // 清除預覽和檔案
        setAvatarPreview(null);
        setBackgroundPreview(null);
        setAvatarFile(null);
        setBackgroundFile(null);
      } catch (updateErr) {
        console.error('更新主辦方資料出錯:', updateErr);
      }
    } catch (err) {
      console.error('更新主辦方資料錯誤:', err);
    }
  };

  // 處理載入中狀態
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden p-6">
        <div className="flex justify-center items-center h-48">
          <div className="loading loading-spinner loading-lg text-[#5C795F]"></div>
        </div>
      </div>
    );
  }

  // 處理錯誤或尚未建立主辦方資料的情況
  if (error || !hostProfile) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden p-6 -mt-12">
        <div className="flex flex-col items-center justify-center h-48">
          <p className="text-lg font-semibold text-[#121212] mb-4 font-['Noto_Sans_TC']">
            尚未建立主辦方資料
          </p>
          <button className="bg-[#5C795F] text-white px-6 py-4 rounded-2xl text-base font-semibold font-['Noto_Sans_TC']">
            建立主辦方資料
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* 背景圖片區域 */}
      <div className="relative h-[200px] w-full">
        <Image
          src={
            backgroundPreview ||
            hostProfile.photo_background_url ||
            DEFAULT_BACKGROUND
          }
          alt="背景圖片"
          fill
          className="object-cover"
        />

        {/* 隱藏的檔案上傳輸入框 */}
        <input
          type="file"
          ref={backgroundInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleBackgroundUpload}
        />

        {/* 背景圖片點擊上傳遮罩 - 僅在編輯模式下顯示 */}
        {isEditing && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <Icon
              icon="material-symbols:broken-image-outline"
              className="text-white"
              width={32}
              height={32}
            />
            <div
              className="absolute inset-0 bg-transparent cursor-pointer"
              onClick={() => backgroundInputRef.current?.click()}
            />
          </div>
        )}

        {/* 頭像 - 放在背景圖片區域的底部 */}
        <div className="absolute left-4 md:left-10 bottom-0 transform translate-y-1/2 z-10">
          <div className="relative">
            {/* 頭像容器 */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white overflow-hidden relative bg-white">
              <Image
                src={avatarPreview || hostProfile.photo_url || DEFAULT_AVATAR}
                alt="主辦方頭像"
                fill
                className="object-cover"
              />

              {/* 頭像點擊上傳遮罩 - 僅在編輯模式下顯示 */}
              {isEditing && (
                <div
                  className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-black/60"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <Icon
                    icon="material-symbols:add-a-photo"
                    className="text-white"
                    width={24}
                    height={24}
                  />
                </div>
              )}
            </div>

            {/* 驗證徽章 */}
            {hostProfile.verification_status === 'verified' && (
              <div className="absolute -bottom-0 -right-0 w-6 h-6 bg-[#5C795F] rounded-full flex items-center justify-center">
                <Icon
                  icon="material-symbols:check"
                  className="text-white"
                  width={16}
                  height={16}
                />
              </div>
            )}

            {/* 隱藏的頭像檔案上傳輸入框 */}
            <input
              type="file"
              ref={avatarInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </div>
        </div>
      </div>

      {/* 內容區域 */}
      <div className="pt-8 md:pt-12 px-4 md:px-10 pb-6 md:pb-10">
        {isEditing ? (
          /* 編輯模式：顯示表單 */
          <form
            onSubmit={handleSubmit(
              (data) => {
                // 確保有現有圖片時能夠通過驗證
                if (!avatarFile && hostProfile?.photo_url) {
                  setValue('photo', new File([], 'existing-photo.jpg'));
                }

                if (!backgroundFile && hostProfile?.photo_background_url) {
                  setValue(
                    'photo_background',
                    new File([], 'existing-background.jpg')
                  );
                }

                saveChanges(data);
              },
              (errors) => {
                console.log('表單驗證錯誤:', errors);
                toast.error('表單有錯誤，請檢查填寫的資料');
              }
            )}
            noValidate
          >
            <div className="flex flex-col gap-6 md:gap-8">
              {/* 頭像和名稱區域 */}
              <div className="flex items-center gap-4">
                {/* 名稱輸入框 */}
                <div className="w-full max-w-[300px]">
                  <FormField
                    label="名稱"
                    name="name"
                    error={errors.name?.message}
                  >
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="露營探險家"
                      className={`events-form-input input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                    />
                  </FormField>
                </div>
              </div>

              {/* 背景簡介 */}
              <div className="w-full max-w-[624px]">
                <div className="flex flex-col gap-1">
                  <label className="text-[#4F4F4F] text-sm font-normal font-['Noto_Sans_TC'] leading-[1.5em]">
                    背景簡介
                  </label>
                  <div className={`bg-white border rounded-2xl px-4 py-3 h-[120px] md:h-[132px] ${
                    errors.description ? 'border-[#AB5F5F]' : 'border-[#B0B0B0]'
                  }`}>
                    <textarea
                      {...register('description')}
                      placeholder="專業露營體驗策劃團隊，提供完善裝備與獨特自然環境，讓您遠離喧囂，擁抱大自然的美好時光。"
                      className="w-full h-full text-[#121212] text-sm md:text-base font-normal font-['Noto_Sans_TC'] leading-[1.5em] bg-transparent border-none outline-none resize-none"
                    />
                  </div>
                  {errors.description && (
                    <span className="label-text-alt text-xs font-normal text-[#AB5F5F] leading-[1.5em] font-[Noto_Sans_TC]">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>

              {/* 電話號碼區域 */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                {/* 電話號碼 */}
                <div className="w-full max-w-[300px]">
                  <FormField
                    label="電話號碼"
                    name="phone"
                    error={errors.phone?.message}
                  >
                    {/* 電話號碼輸入 */}
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="09XXXXXXXX"
                      className={
                        `events-form-input input input-bordered w-full ${
                          errors.phone ? 'input-error' : ''
                        }`
                      }
                    />
                  </FormField>
                </div>
              </div>

              {/* 電子信箱 */}
              <div className="w-full max-w-[300px]">
                <FormField
                  label="電子信箱"
                  name="email"
                  error={errors.email?.message}
                >
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="abc0329@gmail.com"
                    className={
                      `events-form-input input input-bordered w-full ${
                        errors.email ? 'input-error' : ''
                      }`
                    }
                  />
                </FormField>
              </div>

              {/* 按鈕區域 */}
              <div className="flex flex-col sm:flex-row justify-start gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-white text-[#4F4F4F] border border-[#B0B0B0] px-4 md:px-6 py-3 md:py-4 rounded-2xl text-sm md:text-base font-semibold font-['Noto_Sans_TC'] leading-tight w-full sm:w-auto"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={isMutating}
                  className="bg-[#5C795F] text-white px-4 md:px-6 py-3 md:py-4 rounded-2xl text-sm md:text-base font-semibold font-['Noto_Sans_TC'] leading-tight flex items-center justify-center gap-1 w-full sm:w-auto"
                >
                  {isMutating ? (
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                  ) : null}
                  儲存
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* 檢視模式：顯示靜態資料 */
          <div className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-6">
            {/* 主辦方名稱區域 - 頭像現在在背景圖片區域 */}
            <div className="flex flex-col gap-3 md:gap-4">
              {/* 名稱和 */}
              <h2 className="text-[#121212] text-base md:text-lg font-bold">
                {hostProfile.name}
              </h2>

              {/* 描述 */}
              <p className="text-[#4F4F4F] text-sm md:text-base font-normal font-['Noto_Sans_TC'] leading-relaxed">
                {hostProfile.description}
              </p>
            </div>

            {/* 聯絡資訊區域 */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-11">
              {/* 電話資訊 */}
              <div className="flex items-center gap-2">
                <Icon
                  icon="material-symbols:call-outline"
                  className="text-[#5C795F]"
                  width={20}
                  height={20}
                />
                <span className="text-[#4F4F4F] text-sm md:text-base font-normal font-['Noto_Sans_TC']">
                  +886
                </span>
                <span className="text-[#4F4F4F] text-sm md:text-base font-normal font-['Noto_Sans_TC']">
                  {hostProfile.phone}
                </span>
                <span className="text-[#4F4F4F] text-sm md:text-base font-normal font-['Noto_Sans_TC']">
                  #12
                </span>
              </div>

              {/* 電子郵件 */}
              <div className="flex items-center gap-2">
                <Icon
                  icon="material-symbols:mail-outline"
                  className="text-[#5C795F]"
                  width={20}
                  height={20}
                />
                <span className="text-[#4F4F4F] text-sm md:text-base font-normal font-['Noto_Sans_TC'] break-all">
                  {hostProfile.email}
                </span>
              </div>
            </div>

            {/* 編輯按鈕 */}
            <div className="flex justify-start">
              <button
                className="bg-[#5C795F] text-white px-4 md:px-6 py-3 md:py-4 rounded-2xl text-sm md:text-base font-semibold font-['Noto_Sans_TC'] leading-tight w-full sm:w-auto"
                onClick={() => {
                  // 初始化表單數據
                  reset({
                    name: hostProfile.name,
                    description: hostProfile.description,
                    email: hostProfile.email,
                    phone: hostProfile.phone,
                    // 設置初始圖片欄位，如果已有現有圖片則使用虛擬檔案
                    photo: hostProfile.photo_url
                      ? new File([], 'existing-photo.jpg')
                      : null,
                    photo_background: hostProfile.photo_background_url
                      ? new File([], 'existing-background.jpg')
                      : null,
                  });
                  setIsEditing(true);
                }}
              >
                編輯
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
