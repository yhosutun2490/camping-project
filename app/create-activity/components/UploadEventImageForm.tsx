'use client';
import React, { useState, forwardRef, useImperativeHandle, useCallback, useRef } from 'react';
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
  /** 活動 ID */
  eventId: string | null;
  /** 是否為編輯模式 */
  isEditMode?: boolean;
}

// 定義 ref 類型
export interface UploadEventImageFormRef {
  handleSubmit: () => Promise<boolean>;
}

const UploadEventImageForm = forwardRef<UploadEventImageFormRef, UploadEventImageFormProps>(({
  eventId,
  isEditMode = false,
}, ref) => {
  const {
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<FormData>();
  
  // 整合 useUploadEventImages hook
  // 新版本只需要圖片類型參數
  const { trigger: uploadImages, isMutating: isUploading } = useUploadEventImages('detail' as EventImageType);

  // ref 用於追蹤最新新增的圖片預覽區域
  const lastImageRef = useRef<HTMLDivElement>(null);

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

  // 自動捲動到最新新增的圖片並聚焦描述欄位
  const scrollToNewImage = () => {
    setTimeout(() => {
      if (lastImageRef.current) {
        // 先滾動到圖片位置
        lastImageRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        
        // 延遲聚焦，確保滾動完成
        setTimeout(() => {
          // 找到該容器內的 textarea 元素並聚焦
          const textareaElement = lastImageRef.current?.querySelector('textarea');
          if (textareaElement) {
            textareaElement.focus();
          }
        }, 300);
      }
    }, 100); // 等待DOM更新後再捲動
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
    scrollToNewImage(); // 新增圖片後自動捲動
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
  const prepareUploadData = useCallback(() => {
    // 分離檔案與描述為兩個獨立陣列
    const files = eventImages.map(image => image.file);
    const descriptions = eventImages.map(image => image.description || '');
    
    return { files, descriptions };
  }, [eventImages]);
  
  /**
   * 驗證上傳前的檔案格式與大小
   * @returns {boolean} 是否通過驗證
   */
  const validateFiles = useCallback(() => {
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
  }, [eventImages]);

  // 暴露給父元件的方法
  useImperativeHandle(ref, () => ({
    handleSubmit: async () => {
      // 先執行 React Hook Form 驗證
      const isValid = await trigger('eventImages');
      if (!isValid) {
        toast.error('請至少上傳一張活動圖片');
        return false; // 驗證失敗，不繼續執行
      }
      
      // 檢查 eventId 是否存在 (只有在有圖片需要上傳時才檢查)
      if (eventImages.length > 0 && !eventId) {
        toast.error('無法上傳圖片：活動 ID 未設定');
        return false;
      }
      
      // 如果沒有圖片且為編輯模式，直接返回成功
      if (eventImages.length === 0 && isEditMode) {
        return true;
      }
      
      // 自定義檔案驗證
      if (!validateFiles()) {
        return false;
      }

      // 如果有活動ID且有檔案要上傳，則執行上傳
      if (eventId && eventImages.length > 0) {
        try {
          // 準備上傳資料
          const { files, descriptions } = prepareUploadData();
          
          // 呼叫上傳API
          // 新版本的 trigger 需要三個參數：files, eventId, descriptions
          await uploadImages(
            files,        // files
            eventId,      // eventId
            descriptions  // descriptions
          );
          
          // 上傳成功後返回 true
          return true;
        } catch (error) {
          console.error('上傳活動圖片時發生錯誤:', error);
          return false;
        }
      } else {
        // 如果沒有活動ID，則只是儲存表單資料到狀態
        console.warn('沒有提供活動ID，略過圖片上傳');
        return true;
      }
    },
  }), [eventId, trigger, uploadImages, prepareUploadData, validateFiles, eventImages.length, isEditMode]);

  return (
    <div className="flex flex-col gap-6 self-stretch px-4 py-6 md:px-0 md:py-0">
      <h1 className="text-2xl font-semibold text-[#121212]">上傳活動圖片</h1>

      <div className="flex flex-col gap-6">
        <FormField
          label="活動圖片"
          name="eventImages"
          required={!isEditMode}
        >
          <div className="flex flex-col gap-4">
            {/* 上傳區域（僅在少於3張圖片時顯示） */}
            {eventImages.length < 3 && (
              <div>
                <FileUploader
                  accept="image/jpeg, image/png, image/webp"
                  maxSize={4 * 1024 * 1024} // 4MB
                  onFileSelect={handleFileSelect}
                  error={errors.eventImages?.message as string}
                  disabled={isUploading}
                />
              </div>
            )}

            {/* 上傳提示 */}
            <div className="flex flex-col gap-2 text-sm text-[#4F4F4F]">
              <p className="text-[#121212]">
                {isEditMode 
                  ? '上傳活動相關圖片，展示活動場地或過往活動照片（最多3張，可選擇更新）'
                  : '上傳活動相關圖片，展示活動場地或過往活動照片（最多3張）'
                }
                {eventImages.length > 0 && (
                  <span className="text-[#5C795F] font-medium">
                    {` (目前已選擇 ${eventImages.length} 張，還可選擇 ${3 - eventImages.length} 張)`}
                  </span>
                )}
              </p>
              <p>建議尺寸：1080 x 540 pixel，格式：JPEG、PNG、WebP</p>
              <div className="flex items-center gap-2 mt-2 p-3 bg-[#F5F7F5] rounded-xl">
                <span className="text-lg">💡</span>
                <p className="text-[#354738] font-medium">
                  {isEditMode 
                    ? '編輯模式：可選擇更新活動圖片，若不上傳則保持原有圖片。每張圖片可以添加描述，幫助參與者了解活動內容'
                    : '每張圖片可以添加描述，幫助參與者了解活動內容'
                  }
                </p>
              </div>
            </div>

            {/* 已選擇圖片預覽 */}
            {eventImages.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-base font-medium text-[#4F4F4F]">已選擇的活動圖片</h3>
                <div className="flex flex-col gap-4">
                  {eventImages.map((image, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col lg:flex-row gap-4 p-4 border border-[#E0E0E0] rounded-xl"
                      ref={index === eventImages.length - 1 ? lastImageRef : null} // 將ref指向最後一個圖片
                    >
                      <div className="w-full lg:w-60 shrink-0">
                        <ImagePreview
                          src={image.file}
                          alt={`活動圖片 ${index + 1}`}
                          width={240}
                          height={120}
                          onDelete={() => handleDeleteImage(index)}
                        />
                        <div className="mt-2 text-center">
                          <span className="inline-block bg-[#5C795F] text-white text-xs px-2 py-1 rounded-full">
                            圖片 {index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-[#4F4F4F]">
                              圖片描述 (選填，最多100字)
                            </label>
                            <span className="text-xs text-[#B0B0B0]">
                              {image.description.length}/100
                            </span>
                          </div>
                          <textarea
                            className="w-full p-3 border bg-white border-[#B0B0B0] rounded-xl resize-none text-sm focus:border-[#5C795F] focus:outline-none"
                            placeholder="請輸入圖片描述..."
                            maxLength={100}
                            rows={3}
                            value={image.description}
                            onChange={(e) =>
                              handleDescriptionChange(index, e.target.value)
                            }
                          />
                        </div>
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

UploadEventImageForm.displayName = 'UploadEventImageForm';

export default React.memo(UploadEventImageForm);
