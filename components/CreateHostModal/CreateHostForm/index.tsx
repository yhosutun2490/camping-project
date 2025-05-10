"use client";

import React, { useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormHandle } from "@/components/CreateHostModal";
import { hostProfileSchema, HostProfileFormType } from "@/schema/HostProfileForm";
import { useCreateHostProfile } from "@/swr/host/useHostProfile";
import { useRouter } from "next/navigation";
import { useHostAvatarUpload, useHostCoverUpload } from "@/swr/host/useHostProfileImage";
import FormHookInput from "@/components/FormHookInput";
import ImageUploadSection from "./ImageUploadSection";

interface CreateHostFormProps {
  ref: React.Ref<FormHandle>;
  close: () => void;
  onSuccess: () => void;
}

export default React.forwardRef<FormHandle, Omit<CreateHostFormProps, "ref">>(
  function CreateHostForm({ close, onSuccess }, ref) {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
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
      shouldUnregister: true,
    });

    const { createHost, isLoading } = useCreateHostProfile();

    // 暴露表單重設函式給父元件
    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset();
        clearErrors();
        setPhotoPreview(null);
        setBackgroundPreview(null);
      },
    }), [reset, clearErrors]);

    // 處理照片選擇
    const handlePhotoChange = (file: File | null) => {
      setValue('photo', file);
      
      // 建立預覽
      if (file) {
        // 清除錯誤訊息
        clearErrors('photo');
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotoPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPhotoPreview(null);
      }
    };

    // 處理背景照片選擇
    const handleBackgroundChange = (file: File | null) => {
      setValue('photo_background', file);
      
      // 建立預覽
      if (file) {
        // 清除錯誤訊息
        clearErrors('photo_background');
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setBackgroundPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setBackgroundPreview(null);
      }
    };

    // 圖片上傳功能的 hook
    const { uploadAvatar } = useHostAvatarUpload();
    const { uploadCover } = useHostCoverUpload();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // 表單提交處理
    const onSubmit = async (data: HostProfileFormType) => {
      try {
        setIsSubmitting(true);
        
        // 驗證是否有上傳圖片並確保檔案有效
        let hasError = false;
        
        // 檢查主辦方頭像
        if (!data.photo) {
          setValue('photo', null, { shouldValidate: true });
          hasError = true;
        } else if (!(data.photo instanceof File) || data.photo.size === 0) {
          toast.error('頭像檔案無效或為空');
          setValue('photo', null, { shouldValidate: true });
          hasError = true;
        }
        
        // 檢查背景圖片
        if (!data.photo_background) {
          setValue('photo_background', null, { shouldValidate: true });
          hasError = true;
        } else if (!(data.photo_background instanceof File) || data.photo_background.size === 0) {
          toast.error('背景圖片檔案無效或為空');
          setValue('photo_background', null, { shouldValidate: true });
          hasError = true;
        }
        
        if (hasError) {
          setIsSubmitting(false);
          return;
        }
        
        // 先提交主辦方基本資料 (使用預設圖片)
        const defaultPhotoUrl = "https://storage.googleapis.com/your-bucket/default/host-avatar.png"; 
        const defaultBackgroundUrl = "https://storage.googleapis.com/your-bucket/default/host-background.png";
        
        await createHost({
          name: data.name,
          description: data.description,
          email: data.email,
          phone: data.phone,
          photo_url: defaultPhotoUrl,
          photo_background_url: defaultBackgroundUrl
        });
        
        toast.success('主辦方資料建立成功');
        
        // 成功建立主辦方後，再上傳圖片
        try {
          // 上傳主辦方頭像並取得 URL
          if (data.photo instanceof File && data.photo.size > 0) {
            
            toast.loading('上傳主辦方頭像中...', { id: 'avatar-upload' });
            await uploadAvatar(data.photo);
            toast.success('主辦方頭像上傳成功', { id: 'avatar-upload' });
          }
          
          // 上傳背景圖片並取得 URL
          if (data.photo_background instanceof File && data.photo_background.size > 0) {
            // 顯示檔案資訊以便偵錯
            toast.loading('上傳背景圖片中...', { id: 'cover-upload' });
            await uploadCover(data.photo_background);
            toast.success('背景圖片上傳成功', { id: 'cover-upload' });
          }
          
          // 圖片已上傳到主辦方帳戶，不需要額外更新主辦方資料
          
          // 完成後關閉表單並重新整理
          router.refresh();
          onSuccess();
        } catch (error) {
          console.error("圖片上傳失敗:", error);
          
          // 提供更具體的錯誤訊息
          let errorMessage = '主辦方建立成功，但圖片上傳失敗';
          if (error instanceof Error) {
            errorMessage = `主辦方建立成功，但圖片上傳失敗: ${error.message}`;
            
            // 如果是 "請上傳圖片" 錯誤，提供更明確的指引
            if (error.message.includes('請上傳圖片')) {
              errorMessage += '。請確認圖片格式正確且未損壞。';
            }
          }
          
          toast.error(errorMessage);
          
          // 儘管圖片上傳失敗，仍然關閉表單並重新整理頁面
          router.refresh();
          onSuccess();
        }
      } catch (error) {
        // 處理錯誤並顯示給用戶
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "建立主辦方資料失敗";
        toast.error(`錯誤：${errorMessage}`);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ImageUploadSection
          photoPreview={photoPreview}
          backgroundPreview={backgroundPreview}
          onPhotoChange={handlePhotoChange}
          onBackgroundChange={handleBackgroundChange}
          photoError={errors.photo?.message as string | undefined}
          backgroundError={errors.photo_background?.message as string | undefined}
        />
        
        <FormHookInput
          label="主辦單位名稱"
          type="text"
          placeholder="請填入主辦單位名稱"
          register={register("name")}
          error={errors.name}
        />

        <div className="form-control">
          <label className="label">
            <span className="label-text">主辦單位描述<span className="text-error">*</span></span>
          </label>
          <textarea
            {...register("description")}
            placeholder="請描述主辦單位特色與活動方向"
            className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
          />
          {errors.description && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.description.message}</span>
            </label>
          )}
        </div>

        <FormHookInput
          label="聯絡信箱"
          type="email"
          placeholder="請填入聯絡信箱"
          register={register("email")}
          error={errors.email}
        />

        <FormHookInput
          label="聯絡電話"
          type="tel"
          placeholder="請填入聯絡電話 (格式: 0912345678)"
          register={register("phone")}
          error={errors.phone}
        />

        <div className="mt-6 flex space-x-4">
          <button 
            type="button" 
            className="btn btn-outline flex-1"
            onClick={close}
            disabled={isLoading || isSubmitting}
          >
            取消
          </button>
          <button 
            type="submit" 
            className="btn-primary flex-1"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? <span className="loading loading-spinner"></span> : '提交'}
          </button>
        </div>
      </form>
    );
  }
);
