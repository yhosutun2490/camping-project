'use client';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../schema/formDataSchema';
import FileUploader from '../../../components/form/FileUploader';
import ImagePreview from '../../../components/form/ImagePreview';
import FormField from '../../../components/form/FormField';

interface UploadCoverFormProps {
  /** 下一步 */
  onNextStep: () => void;
  /** 返回上一步 */
  onPrevStep: () => void;
}

function UploadCoverForm({ onNextStep, onPrevStep }: UploadCoverFormProps) {
  const {
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<FormData>();

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

  // 處理檔案選擇
  const handleFileSelect = (file: File) => {
    if (coverFiles.length >= 3) {
      return; // 已達到最大上限
    }

    const newFiles = [...coverFiles, file];
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
  const handleNextStep = async () => {
    // 先觸發驗證
    const isValid = await trigger('coverImages');
    if (isValid) {
      onNextStep();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">上傳活動封面</h2>

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
                  onFileSelect={handleFileSelect}
                  error={errors.coverImages?.message as string}
                />
              </div>
            )}

            {/* 上傳提示 */}
            <div className="text-sm text-base-content/70 mb-6">
              <p>最多新增3張活動封面，至少需要上傳1張</p>
              <p>建議尺寸：1080 x 540 pixel，格式：JPEG、PNG、WebP</p>
            </div>

            {/* 已上傳圖片預覽 */}
            {coverFiles.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3">已上傳的封面圖片</h3>
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

export default React.memo(UploadCoverForm);
