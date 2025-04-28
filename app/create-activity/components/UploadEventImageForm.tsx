'use client';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import FileUploader from '../../../components/form/FileUploader';
import ImagePreview from '../../../components/form/ImagePreview';
import FormField from '../../../components/form/FormField';

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
}

function UploadEventImageForm({
  onNextStep,
  onPrevStep,
}: UploadEventImageFormProps) {
  const {
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<FormData>();

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

  // 處理下一步按鈕點擊
  const handleNextStep = async () => {
    const isValid = await trigger('eventImages');
    if (isValid) {
      onNextStep();
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
              />
            </div>

            {/* 上傳提示 */}
            <div className="text-sm text-base-content/70 mb-6">
              <p>上傳活動相關圖片，展示活動場地或過往活動照片</p>
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
          >
            返回
          </button>
          <button
            type="button"
            className="btn btn-primary px-8"
            onClick={handleNextStep}
          >
            繼續填寫，下一步
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UploadEventImageForm);
