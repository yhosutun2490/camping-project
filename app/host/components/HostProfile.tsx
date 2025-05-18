'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import {
  useGetHostProfile,
  useUpdateHostProfile,
} from '@/swr/host/useHostProfile';
import {
  useHostAvatarUpload,
  useHostCoverUpload,
} from '@/swr/host/useHostProfileImage';
import FormHookInput from '@/components/FormHookInput';
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

  // 取消編輯，重置所有狀態
  const cancelEditing = () => {
    // 如果有 hostProfile 資料，使用它來重置表單
    if (hostProfile) {
      reset({
        name: hostProfile.name,
        description: hostProfile.description,
        email: hostProfile.email,
        phone: hostProfile.phone,
        // 設置圖片欄位，如果已有現有圖片則使用虛擬檔案
        photo: hostProfile.photo_url
          ? new File([], 'existing-photo.jpg')
          : null,
        photo_background: hostProfile.photo_background_url
          ? new File([], 'existing-background.jpg')
          : null,
      });
    } else {
      // 否則只是重置表單
      reset();
    }

    // 清除預覽圖片
    setAvatarPreview(null);
    setBackgroundPreview(null);

    // 清除檔案
    setAvatarFile(null);
    setBackgroundFile(null);

    // 關閉編輯模式
    setIsEditing(false);
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
      <div className="bg-neutral-0 rounded-lg shadow-sm overflow-hidden p-6">
        <div className="flex justify-center items-center h-48">
          <div className="loading loading-spinner loading-lg text-primary-500"></div>
        </div>
      </div>
    );
  }

  // 處理錯誤或尚未建立主辦方資料的情況
  if (error || !hostProfile) {
    return (
      <div className="bg-neutral-0 rounded-lg shadow-sm overflow-hidden p-6">
        <div className="flex flex-col items-center justify-center h-48">
          <p className="text-lg font-medium text-neutral-700 mb-4">
            尚未建立主辦方資料
          </p>
          <button className="btn btn-primary">建立主辦方資料</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-0 rounded-lg shadow-sm overflow-hidden">
      {/* 背景圖片區域 */}
      <div className="relative h-48 w-full">
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

        {/* 編輯背景按鈕 - 僅在非編輯模式下顯示 */}
        {!isEditing && (
          <button
            className="absolute right-4 top-4 bg-neutral-0/80 p-2 rounded-full hover:bg-neutral-0 transition"
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
            <Icon
              icon="material-symbols:edit"
              className="text-neutral-700"
              width={20}
              height={20}
            />
          </button>
        )}

        {/* 背景圖片點擊上傳遮罩 - 僅在編輯模式下顯示 */}
        {isEditing && (
          <div
            className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer transition-all hover:bg-black/50"
            onClick={() => backgroundInputRef.current?.click()}
          >
            <div className="bg-white rounded-lg px-4 py-2 flex items-center shadow-lg">
              <Icon
                icon="material-symbols:upload"
                className="mr-2 text-gray-700"
                width={20}
                height={20}
              />
              <span className="text-sm font-medium text-gray-900">
                點擊上傳背景圖片
              </span>
            </div>
          </div>
        )}

        {/* 頭像 */}
        <div className="absolute left-10 top-6 z-10">
          <div className="avatar relative">
            <div className="w-24 h-24 mask mask-circle ring-4 ring-neutral-0 shadow-lg">
              <Image
                src={avatarPreview || hostProfile.photo_url || DEFAULT_AVATAR}
                alt="主辦方頭像"
                width={96}
                height={96}
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

      {/* 個人資訊區域 */}
      <div className="p-6">
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
            <div className="space-y-4">
              <div className="form-control">
                <FormHookInput
                  label="主辦方名稱"
                  type="text"
                  placeholder="請輸入主辦方名稱"
                  register={register('name')}
                  error={errors.name}
                />
              </div>

              <div className="form-control">
                <label className="label text-black mb-1">描述</label>
                <textarea
                  {...register('description')}
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="主辦方簡介"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="form-control">
                <FormHookInput
                  label="聯絡電話"
                  type="tel"
                  placeholder="請輸入手機號碼"
                  register={register('phone')}
                  error={errors.phone}
                />
              </div>

              <div className="form-control">
                <FormHookInput
                  label="電子郵件"
                  type="email"
                  placeholder="請輸入電子郵件"
                  register={register('email')}
                  error={errors.email}
                />
              </div>

              {/* 表單操作按鈕 */}
              <div className="pt-4 flex justify-end gap-2">
                <button
                  className="btn btn-sm btn-outline"
                  type="button"
                  onClick={cancelEditing}
                  disabled={isMutating}
                >
                  取消
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  type="submit"
                  onClick={(e) => {
                    console.log('儲存按鈕點擊', e);

                    // 在點擊時確保有現有圖片的情況下通過驗證
                    if (!avatarFile && hostProfile?.photo_url) {
                      setValue('photo', new File([], 'existing-photo.jpg'));
                    }

                    if (!backgroundFile && hostProfile?.photo_background_url) {
                      setValue(
                        'photo_background',
                        new File([], 'existing-background.jpg')
                      );
                    }

                    // 不需要呼叫 e.preventDefault()，讓表單自然提交
                  }}
                  disabled={isMutating}
                >
                  {isMutating ? (
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                  ) : null}
                  儲存變更
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* 檢視模式：顯示靜態資料 */
          <div>
            {/* 主辦方名稱和簡介 */}
            <div>
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-neutral-900">
                  {hostProfile.name}
                </h2>

                {/* 認證狀態 - 移至名稱右邊 */}
                <div className="flex items-center ml-3">
                  {hostProfile.verification_status === 'verified' ? (
                    <>
                      <Icon
                        icon="material-symbols:check-circle-rounded"
                        className="text-primary-500 mr-1"
                        width={18}
                        height={18}
                      />
                      <div className="bg-primary-50 text-primary-700 text-xs px-2.5 py-0.5 rounded-full">
                        已認證
                      </div>
                    </>
                  ) : hostProfile.verification_status === 'pending' ? (
                    <>
                      <Icon
                        icon="material-symbols:pending-rounded"
                        className="text-warning-500 mr-1"
                        width={18}
                        height={18}
                      />
                      <div className="bg-warning-50 text-warning-700 text-xs px-2.5 py-0.5 rounded-full">
                        審核中
                      </div>
                    </>
                  ) : (
                    <>
                      <Icon
                        icon="material-symbols:error-rounded"
                        className="text-error-500 mr-1"
                        width={18}
                        height={18}
                      />
                      <div className="bg-error-50 text-error-700 text-xs px-2.5 py-0.5 rounded-full">
                        未通過
                      </div>
                    </>
                  )}
                </div>
              </div>

              <p className="text-neutral-700 mt-3">{hostProfile.description}</p>
            </div>

            {/* 聯絡資訊 */}
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center text-neutral-700">
                <Icon
                  icon="material-symbols:phone"
                  className="mr-2 text-neutral-500"
                  width={20}
                  height={20}
                />
                <span>{hostProfile.phone}</span>
              </div>
              <div className="flex items-center text-neutral-700">
                <Icon
                  icon="material-symbols:email"
                  className="mr-2 text-neutral-500"
                  width={20}
                  height={20}
                />
                <span>{hostProfile.email}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
