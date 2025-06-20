'use client';
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import FileUploader from '../../../components/form/FileUploader';
import ImagePreview from '../../../components/form/ImagePreview';
import FormField from '../../../components/form/FormField';
import { useUploadEventImages } from '@/swr/events/useUploadEventImages';
import toast from 'react-hot-toast';
import { EventImageType } from '@/types/api/events';

interface UploadCoverFormProps {
  /** 下一步 */
  onNextStep: () => void;
  /** 活動 ID */
  eventId: string | null;
}

export interface UploadCoverFormRef {
  handleSubmit: () => Promise<boolean>;
  getLoadingState: () => { isLoading: boolean; loadingText: string };
}

const UploadCoverForm = forwardRef<UploadCoverFormRef, UploadCoverFormProps>(({ onNextStep, eventId }, ref) => {
  const {
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<FormData>();

  // 整合 useUploadEventImages hook
  // 新版本只需要圖片類型參數
  const { trigger: uploadImages, isMutating: isUploading } = useUploadEventImages('cover' as EventImageType);

  // 使用 useImperativeHandle 暴露方法給父元件
  useImperativeHandle(ref, () => ({
    handleSubmit: handleNextStep,
    getLoadingState: () => ({
      isLoading: isUploading,
      loadingText: isUploading ? '上傳封面圖片中...' : '',
    }),
  }));

  // 本地狀態管理上傳的檔案
  const [coverFiles, setCoverFiles] = useState<File[]>(() => {
    // 從表單中獲取已有圖片資料
    const existingFiles = getValues('coverImages') || [];

    // 檢查是否有現有的檔案資料
    if (existingFiles.length > 0) {
      console.log('取得現有的圖片檔案：', existingFiles);
      return existingFiles as File[];
    }

    // 若沒有現有檔案則返回空陣列
    return [];
  });

  // 處理多檔案選擇（暫存到本地狀態）
  const handleMultipleFileSelect = (files: File[]) => {
    // 檢查總數是否會超過限制
    const totalFiles = coverFiles.length + files.length;
    if (totalFiles > 3) {
      toast.error(`最多只能上傳 3 張封面圖片，目前已有 ${coverFiles.length} 張，只能再新增 ${3 - coverFiles.length} 張`);
      return;
    }

    // 暫存到本地狀態，等待下一步時才上傳
    const newFiles = [...coverFiles, ...files];
    setCoverFiles(newFiles);
    setValue('coverImages', newFiles);
    trigger('coverImages'); // 觸發驗證
  };

  // 處理刪除圖片
  const handleDeleteImage = (index: number) => {
    const newFiles = [...coverFiles];
    newFiles.splice(index, 1);
    setCoverFiles(newFiles);
    setValue('coverImages', newFiles);
    trigger('coverImages'); // 觸發驗證
  };

  // 處理下一步按鈕點擊
  const handleNextStep = async (): Promise<boolean> => {
    // 先觸發驗證
    const isValid = await trigger('coverImages');
    if (!isValid) {
      return false; // 驗證失敗，不繼續執行
    }
    
    // 檢查是否有圖片
    if (coverFiles.length === 0) {
      toast.error('請至少上傳一張封面圖片');
      return false;
    }
    
    // 檢查 eventId 是否存在
    if (!eventId) {
      toast.error('無法上傳圖片：活動 ID 未設定');
      return false;
    }
    
    try {
      // 上傳圖片到伺服器
      // 新版本的 trigger 需要三個參數：files, eventId, descriptions
      const result = await uploadImages(
        coverFiles,    // files
        eventId,       // eventId  
        undefined      // descriptions (封面圖不需要描述)
      );
      
      if (result && result.data) {
        // 上傳成功後進入下一步
        onNextStep();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('圖片上傳失敗:', error);
      toast.error('圖片上傳失敗，請重試');
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-6 self-stretch px-4 py-6 md:px-0 md:py-0">
      <h1 className="text-2xl font-semibold text-[#121212]">上傳活動封面</h1>

      <div className="flex flex-col gap-6">
        <FormField
          label="封面圖片"
          name="coverImages"
          required
          error={errors.coverImages?.message as string}
        >
          <div className="flex flex-col gap-4">
            {/* 上傳區域（僅在少於3張圖片時顯示） */}
            {coverFiles.length < 3 && (
              <div>
                <FileUploader
                  accept="image/jpeg, image/png, image/webp"
                  maxSize={4 * 1024 * 1024} // 4MB
                  onMultipleFileSelect={handleMultipleFileSelect}
                  error={errors.coverImages?.message as string}
                  disabled={isUploading} // 上傳中時禁用
                  multiple={true}
                  maxFiles={Math.max(1, 3 - coverFiles.length)} // 確保至少為 1，避免 0 或負數
                />
              </div>
            )}

            {/* 上傳提示 */}
            <div className="flex flex-col gap-2 text-sm text-[#4F4F4F]">
              <p className="text-[#121212]">
                最多新增3張活動封面，至少需要上傳1張
                {coverFiles.length > 0 && (
                  <span className="text-[#5C795F] font-medium">
                    {` (目前已選擇 ${coverFiles.length} 張，還可選擇 ${3 - coverFiles.length} 張)`}
                  </span>
                )}
              </p>
              <p>建議尺寸：1080 x 540 pixel，格式：JPEG、PNG、WebP</p>
              <div className="flex items-center gap-2 mt-2 p-3 bg-[#F5F7F5] rounded-xl">
                <span className="text-lg">💡</span>
                <p className="text-[#354738] font-medium">支援一次選擇多張圖片，點擊「下一步」時上傳</p>
              </div>
            </div>

            {/* 已選擇圖片預覽 */}
            {coverFiles.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-base font-medium text-[#4F4F4F]">已選擇的封面圖片</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {coverFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <ImagePreview
                        src={file}
                        alt={`活動封面 ${index + 1}`}
                        width={240}
                        height={120}
                        onDelete={() => handleDeleteImage(index)}
                      />
                      <div className="absolute top-2 left-2 bg-[#5C795F] text-white text-xs px-2 py-1 rounded-full z-10">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </FormField>
      </div>
    </div>
  );
});

UploadCoverForm.displayName = 'UploadCoverForm';

export default React.memo(UploadCoverForm);
