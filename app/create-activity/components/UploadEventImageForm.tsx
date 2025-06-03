'use client';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import FileUploader from '../../../components/form/FileUploader';
import ImagePreview from '../../../components/form/ImagePreview';
import FormField from '../../../components/form/FormField';
import { useUploadEventImages } from '@/swr/events/useUploadEventImages';
import { EventImageType } from '@/types/api/events';
import toast from 'react-hot-toast';

// 活動圖片類型定義
interface EventImage {
  /** 圖片檔案 */
  file: File;
  /** 圖片描述 */
  description: string;
}

interface UploadEventImageFormProps {
  /** 下一步 */
  onNextStep: () => void;
  /** 返回上一步 */
  onPrevStep: () => void;
  /** 活動 ID */
  eventId: string | null;
}

function UploadEventImageForm({
  onNextStep,
  onPrevStep,
  eventId,
}: UploadEventImageFormProps) {
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
    'detail' as EventImageType
  );

  // 本地狀態管理上傳的檔案
  const [eventImages, setEventImages] = useState<EventImage[]>(() => {
    // 從表單中獲取已有圖片資料
    const existingFiles = getValues('eventImages') || [];

    // 檢查是否有現有的檔案資料
    if (existingFiles.length > 0) {
      console.log('取得現有的活動圖片檔案：', existingFiles);
      return existingFiles.map((item) => ({
        file: item.file as File,
        description: item.description || '',
      }));
    }

    // 若沒有現有檔案則返回空陣列
    return [];
  });

  // 格式化檔案大小顯示
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // 檢查檔案是否過大
  const isFileTooBig = (file: File): boolean => {
    return file.size > 4 * 1024 * 1024; // 4MB
  };

  // 處理檔案選擇
  const handleFileSelect = (file: File) => {
    const newImage: EventImage = {
      file,
      description: '',
    };
    const updatedImages = [...eventImages, newImage];
    setEventImages(updatedImages);
    setValue('eventImages', updatedImages, { shouldValidate: true });
  };

  // 處理刪除圖片
  const handleDeleteImage = (index: number) => {
    const updatedImages = eventImages.filter((_, i) => i !== index);
    setEventImages(updatedImages);
    setValue('eventImages', updatedImages, { shouldValidate: true });
  };

  // 處理圖片描述更新
  const handleDescriptionChange = (index: number, value: string) => {
    const updatedImages = [...eventImages];
    updatedImages[index].description = value;
    setEventImages(updatedImages);
    setValue('eventImages', updatedImages, { shouldValidate: true });
  };

  /**
   * 準備上傳資料，將 EventImage 陣列轉換為 API 所需的格式
   * @returns {{ files: File[], descriptions: string[] }} 格式化後的上傳資料
   */
  const prepareUploadData = () => {
    // 分離檔案與描述為兩個獨立陣列
    const files = eventImages.map(image => image.file);
    const descriptions = eventImages.map(image => image.description || '');
    
    return { files, descriptions };
  };
  
  /**
   * 驗證上傳前的檔案格式與大小
   * @returns {boolean} 是否通過驗證
   */
  const validateFiles = () => {
    if (eventImages.length === 0) {
      toast.error('請至少上傳一張活動圖片');
      return false;
    }
    
    // 檢查檔案格式與大小
    for (const image of eventImages) {
      const file = image.file;
      
      // 檢查檔案大小限制 (4MB)
      if (isFileTooBig(file)) {
        toast.error(`圖片 "${file.name}" (${formatFileSize(file.size)}) 大小超過 4MB，請重新選擇`);
        return false;
      }
      
      // 檢查檔案格式
      const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!acceptedTypes.includes(file.type)) {
        toast.error(`圖片 "${file.name}" 格式不支援，僅接受 JPEG、PNG、WebP 格式`);
        return false;
      }
    }
    
    return true;
  };

  // 處理下一步按鈕點擊
  const handleNextStep = async () => {
    // 先執行 React Hook Form 驗證
    const isValid = await trigger('eventImages');
    
    if (isValid) {
      // 自定義檔案驗證
      if (!validateFiles()) {
        return;
      }

      // 如果有活動ID且有檔案要上傳，則執行上傳
      if (eventId) {
        try {
          // 準備上傳資料
          const { files, descriptions } = prepareUploadData();
          
          // 顯示上傳中提示
          const uploadToastId = toast.loading('正在上傳活動圖片...');
          
          // 呼叫上傳API
          await uploadImages({
            files,
            descriptions
          });
          
          // 處理上傳結果 - 如果沒有拋出錯誤，表示上傳成功
          toast.success('圖片上傳成功', { id: uploadToastId });
          // 上傳成功後前往下一步
          onNextStep();
        } catch (error) {
          console.error('上傳活動圖片時發生錯誤:', error);
          toast.error('上傳過程中發生錯誤，請稍後再試');
        }
      } else {
        // 如果沒有活動ID，則只是儲存表單資料到狀態，然後前往下一步
        console.warn('沒有提供活動ID，略過圖片上傳');
        onNextStep();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">上傳活動圖片</h2>

      <div className="space-y-8">
        <FormField
          label="活動圖片"
          name="eventImages"
          error={errors.eventImages?.message as string}
        >
          <div className="space-y-4">
            {/* 上傳區域 */}
            <div className="mb-6">
              <FileUploader
                accept="image/jpeg, image/png, image/webp"
                maxSize={4 * 1024 * 1024} // 4MB
                onFileSelect={handleFileSelect}
                error={errors.eventImages?.message as string}
                disabled={isUploading || eventImages.length >= 3}
              />
              {eventImages.length >= 3 && (
                <p className="text-sm text-warning mt-2">
                  已達到最多 3 張圖片的上傳限制
                </p>
              )}
              {isUploading && (
                <div className="mt-3 bg-base-200 p-3 rounded-md">
                  <div className="flex items-center">
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    <p className="text-sm">正在上傳活動圖片，請稍候...</p>
                  </div>
                </div>
              )}
            </div>

            {/* 上傳提示 */}
            <div className="text-sm text-base-content/70 mb-6">
              <div className="flex justify-between items-center mb-1">
                <p>上傳活動相關圖片，展示活動場地或過往活動照片</p>
                <span className={`badge ${eventImages.length >= 3 ? 'badge-warning' : 'badge-primary'}`}>
                  {eventImages.length}/3 張圖片
                </span>
              </div>
              <p>建議尺寸：1080 x 540 pixel，格式：JPEG、PNG、WebP</p>
            </div>

            {/* 已上傳圖片預覽 */}
            {eventImages.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3">
                  已上傳的活動圖片 ({eventImages.length} 張)
                </h3>
                <div className="flex flex-col gap-6">
                  {eventImages.map((image, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-60 shrink-0">
                          <ImagePreview
                            src={image.file}
                            alt={`活動圖片 ${index + 1}`}
                            width={240}
                            height={120}
                            onDelete={() => handleDeleteImage(index)}
                          />
                          <div className="mt-2 text-xs text-base-content/70 flex justify-between items-center">
                            <span className="truncate max-w-[70%]" title={image.file.name}>
                              {image.file.name}
                            </span>
                            <span className={isFileTooBig(image.file) ? 'text-error' : 'text-success'}>
                              {formatFileSize(image.file.size)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="form-control w-full">
                            <label className="label">
                              <span className="label-text">
                                圖片描述 (選填，最多100字)
                              </span>
                              <span className="label-text-alt">
                                {image.description.length}/100
                              </span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered w-full"
                              placeholder="請輸入圖片描述..."
                              maxLength={100}
                              value={image.description}
                              onChange={(e) =>
                                handleDescriptionChange(index, e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </FormField>

        {/* 按鈕區 */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onPrevStep}
            disabled={isUploading}
          >
            返回
          </button>
          <button
            type="button"
            className="btn btn-primary px-8"
            onClick={handleNextStep}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span>
                上傳中...
              </>
            ) : (
              '繼續填寫，下一步'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UploadEventImageForm);
