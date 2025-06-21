'use client';

import React, { useImperativeHandle, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormHandle } from '@/components/CreateHostModal';
import {
  hostProfileSchema,
  HostProfileFormType,
} from '@/schema/HostProfileForm';
import { useCreateHostProfile } from '@/swr/host/useHostProfile';
import { useRouter } from 'next/navigation';
import {
  useHostAvatarUpload,
  useHostCoverUpload,
} from '@/swr/host/useHostProfileImage';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import FormField from '@/components/form/FormField';
import toast from 'react-hot-toast';

// 不使用預設圖片，改用佔位符

// 檔案上傳事件處理器型別
type FileUploadEvent = React.ChangeEvent<HTMLInputElement>;

interface CreateHostFormProps {
  ref: React.Ref<FormHandle>;
  close: () => void;
  onSuccess: () => void;
}

export default React.forwardRef<FormHandle, Omit<CreateHostFormProps, 'ref'>>(
  function CreateHostForm({ close, onSuccess }, ref) {
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
    const router = useRouter();

    const {
      register,
      handleSubmit,
      reset,
      clearErrors,
      setValue,
      formState: { errors },
    } = useForm<HostProfileFormType>({
      resolver: zodResolver(hostProfileSchema),
      mode: 'onSubmit',
    });

    const { trigger: createHost, isMutating: isLoading } =
      useCreateHostProfile();

    // 圖片上傳 hooks
    const avatarUpload = useHostAvatarUpload();
    const coverUpload = useHostCoverUpload();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 暴露表單重設函式給父元件
    useImperativeHandle(
      ref,
      () => ({
        resetForm: () => {
          reset({
            name: '',
            description: '',
            email: '',
            phone: '',
            photo: null,
            photo_background: null,
          });
          clearErrors();
          setAvatarPreview(null);
          setBackgroundPreview(null);
          setAvatarFile(null);
          setBackgroundFile(null);
        },
      }),
      [reset, clearErrors]
    );

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
    };

    // 表單提交處理
    const onSubmit = async (data: HostProfileFormType) => {
      try {
        setIsSubmitting(true);

        // 建立基本資料物件
        const createData = {
          name: data.name,
          description: data.description,
          email: data.email,
          phone: data.phone,
          photo_url:
            'https://storage.googleapis.com/your-bucket/default/host-avatar.png',
          photo_background_url:
            'https://storage.googleapis.com/your-bucket/default/host-background.png',
        };

        // 先建立主辦方基本資料
        await createHost(createData);

        // 處理頭像上傳
        if (avatarFile) {
          try {
            await avatarUpload.trigger(avatarFile);
          } catch (err) {
            console.error('頭像上傳錯誤:', err);
          }
        }

        // 處理背景圖片上傳
        if (backgroundFile) {
          try {
            await coverUpload.trigger(backgroundFile);
          } catch (err) {
            console.error('背景圖片上傳錯誤:', err);
          }
        }

        // 完成後關閉表單並重新整理
        router.refresh();
        onSuccess();
      } catch (error) {
        console.error('建立主辦方資料錯誤:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="rounded-2xl overflow-hidden">
        {/* 背景圖片區域 */}
        <div className="relative h-[200px] w-full">
          {backgroundPreview ? (
            <Image
              src={backgroundPreview}
              alt="背景圖片"
              fill
              className="object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gray-100 flex items-center justify-center ${
              errors.photo_background ? 'bg-red-50' : ''
            }`}>
              <div className="text-center">
                <Icon
                  icon="material-symbols:image-outline"
                  className={errors.photo_background ? 'text-[#AB5F5F]' : 'text-gray-400'}
                  width={48}
                  height={48}
                />
              </div>
            </div>
          )}

          {/* 隱藏的檔案上傳輸入框 */}
          <input
            type="file"
            ref={backgroundInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleBackgroundUpload}
          />

          {/* 背景圖片點擊上傳遮罩 */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              backgroundPreview ? 'bg-black/30' : 'bg-transparent'
            }`}
          >
            {backgroundPreview && (
              <Icon
                icon="material-symbols:image-outline"
                className={errors.photo_background ? 'text-[#AB5F5F]' : 'text-white'}
                width={48}
                height={48}
              />
            )}
            <div
              className="absolute inset-0 bg-transparent cursor-pointer"
              onClick={() => backgroundInputRef.current?.click()}
            />
          </div>

          {/* 頭像 - 放在背景圖片區域的底部 */}
          <div className="absolute left-4 md:left-10 bottom-0 transform translate-y-1/2 z-10">
            <div className="relative">
              {/* 頭像容器 */}
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-2 overflow-hidden relative bg-white ${
                errors.photo ? 'border-[#AB5F5F]' : 'border-white'
              }`}>
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="主辦方頭像"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className={`w-full h-full bg-gray-100 flex items-center justify-center ${
                    errors.photo ? 'bg-red-50' : ''
                  }`}>
                    <Icon
                      icon="material-symbols:person"
                      className={errors.photo ? 'text-[#AB5F5F]' : 'text-gray-400'}
                      width={32}
                      height={32}
                    />
                  </div>
                )}

                {/* 頭像點擊上傳遮罩 */}
                <div
                  className={`absolute inset-0 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    avatarPreview
                      ? 'bg-black/40 hover:bg-black/60'
                      : 'bg-transparent hover:bg-gray-200'
                  }`}
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <Icon
                    icon="material-symbols:person"
                    className={avatarPreview ? 'text-white' : (errors.photo ? 'text-[#AB5F5F]' : 'text-gray-400')}
                    width={32}
                    height={32}
                  />
                </div>
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

        {/* 內容區域 */}
        <div className="pt-8 md:pt-12 px-4 md:px-10 pb-6 md:pb-10">
          <form
            onSubmit={handleSubmit(
              (data) => {
                onSubmit(data);
              },
              (errors) => {
                console.log('表單驗證錯誤:', errors);
                
                // 檢查是否有圖片相關的錯誤
                const hasPhotoError = errors.photo || errors.photo_background;
                const hasFieldError = errors.name || errors.description || errors.email || errors.phone;
                
                if (hasPhotoError && hasFieldError) {
                  toast.error('請填寫所有必填欄位並上傳頭像和背景圖片');
                } else if (hasPhotoError) {
                  toast.error('請上傳頭像和背景圖片');
                } else if (hasFieldError) {
                  toast.error('表單有錯誤，請檢查填寫的資料');
                } else {
                  toast.error('表單有錯誤，請檢查填寫的資料');
                }
              }
            )}
            noValidate
          >
            <div className="flex flex-col gap-6 mt-6">
              {/* 頭像和名稱區域 */}
              <div className="flex items-center gap-4">
                {/* 名稱輸入框 */}
                <div className="w-full max-w-[300px]">
                  <FormField
                    required
                    label="名稱"
                    name="name"
                    error={errors.name?.message}
                  >
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="露營探險家"
                      className={`events-form-input input input-bordered w-full ${
                        errors.name ? 'input-error' : ''
                      }`}
                    />
                  </FormField>
                </div>
              </div>

              {/* 背景簡介 */}
              <div className="w-full max-w-[624px]">
                <div className="flex flex-col gap-1">
                  <label className="text-[#4F4F4F] text-sm font-normal font-['Noto_Sans_TC'] leading-[1.5em]">
                    <span className="text-[#AB5F5F]">*</span>
                    背景簡介
                  </label>
                  <div
                    className={`bg-white border rounded-2xl px-4 py-3 h-[120px] md:h-[132px] ${
                      errors.description
                        ? 'border-[#AB5F5F]'
                        : 'border-[#B0B0B0]'
                    }`}
                  >
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
                    required
                    label="電話號碼"
                    name="phone"
                    error={errors.phone?.message}
                  >
                    {/* 電話號碼輸入 */}
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="09XXXXXXXX"
                      className={`events-form-input input input-bordered w-full ${
                        errors.phone ? 'input-error' : ''
                      }`}
                    />
                  </FormField>
                </div>
              </div>

              {/* 電子信箱 */}
              <div className="w-full max-w-[300px]">
                <FormField
                  required
                  label="電子信箱"
                  name="email"
                  error={errors.email?.message}
                >
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="abc0329@gmail.com"
                    className={`events-form-input input input-bordered w-full ${
                      errors.email ? 'input-error' : ''
                    }`}
                  />
                </FormField>
              </div>

              {/* 按鈕區域 */}
              <div className="flex flex-col sm:flex-row justify-start gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="bg-white text-[#4F4F4F] border border-[#B0B0B0] px-4 md:px-6 py-3 md:py-4 rounded-2xl text-sm md:text-base font-semibold font-['Noto_Sans_TC'] leading-tight w-full sm:w-auto"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="bg-[#5C795F] text-white px-4 md:px-6 py-3 md:py-4 rounded-2xl text-sm md:text-base font-semibold font-['Noto_Sans_TC'] leading-tight flex items-center justify-center gap-1 w-full sm:w-auto"
                >
                  {isLoading || isSubmitting ? (
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                  ) : null}
                  建立
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
);
