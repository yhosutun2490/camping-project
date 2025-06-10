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
  // 使用空字符串作為預設值，避免條件式呼叫 Hook
  const hookParams = eventId || '';
  const { trigger: uploadImages, isMutating: isUploading } = useUploadEventImages(
    hookParams, 
    'cover' as EventImageType
  );

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
      const result = await uploadImages({ 
        files: coverFiles 
      });
      
      if (result && result.data) {
        // 顯示成功訊息
        toast.success('封面圖片上傳成功！');
        
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
    <div className="flex flex-col gap-8 self-stretch">
      <h1 className="text-3xl font-semibold">上傳活動封面</h1>

      <div className="space-y-8">
        <FormField
          label="封面圖片"
          name="coverImages"
          required
          error={errors.coverImages?.message as string}
        >
          <div className="space-y-4">
            {/* 上傳區域（僅在少於3張圖片時顯示） */}
            {coverFiles.length < 3 && (
              <div className="mb-6">
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
            <div className="text-sm text-base-content/70 mb-6">
              <p>
                最多新增3張活動封面，至少需要上傳1張
                {coverFiles.length > 0 && ` (目前已選擇 ${coverFiles.length} 張，還可選擇 ${3 - coverFiles.length} 張)`}
              </p>
              <p>建議尺寸：1080 x 540 pixel，格式：JPEG、PNG、WebP</p>
              <p className="text-primary mt-1">💡 支援一次選擇多張圖片，點擊「下一步」時上傳</p>
            </div>

            {/* 已選擇圖片預覽 */}
            {coverFiles.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3">已選擇的封面圖片</h3>
                <div className="flex flex-wrap gap-4">
                  {coverFiles.map((file, index) => (
                    <ImagePreview
                      key={index}
                      src={file}
                      alt={`活動封面 ${index + 1}`}
                      width={240}
                      height={120}
                      onDelete={() => handleDeleteImage(index)}
                    />
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
