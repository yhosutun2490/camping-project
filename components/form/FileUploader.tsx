'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface FileUploaderProps {
  /** 可接受檔案類型 */
  accept?: string;
  /** 最大檔案大小 */
  maxSize?: number;
  /** 檔案選擇回調函式 */
  onFileSelect?: (file: File) => void;
  /** 多檔案選擇回調函式 */
  onMultipleFileSelect?: (files: File[]) => void;
  /** 錯誤訊息 */
  error?: string;
  /** 是否禁用上傳功能 */
  disabled?: boolean;
  /** 是否支援多檔案選擇 */
  multiple?: boolean;
  /** 最大檔案數量（僅在 multiple 為 true 時有效） */
  maxFiles?: number;
}

function FileUploader({
  accept = 'image/jpeg, image/png, image/webp',
  maxSize = 4 * 1024 * 1024, // 4MB
  onFileSelect,
  onMultipleFileSelect,
  error,
  disabled = false,
  multiple = false,
  maxFiles = 3,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [internalError, setInternalError] = useState<string>('');

  // 觸發檔案選擇對話框
  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  // 處理檔案選擇
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      if (multiple) {
        validateAndProcessMultipleFiles(Array.from(files));
      } else {
        validateAndProcessFile(files[0]);
      }
    }
  };

  // 處理拖放
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!disabled) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    }
  };

  // 處理檔案拖放
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!disabled) {
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        if (multiple) {
          validateAndProcessMultipleFiles(Array.from(e.dataTransfer.files));
        } else {
          validateAndProcessFile(e.dataTransfer.files[0]);
        }
      }
    }
  };

  // 驗證和處理單一檔案
  const validateAndProcessFile = (file: File) => {
    setInternalError('');

    // 驗證檔案類型
    if (!file.type.match(/(image\/jpeg|image\/png|image\/webp)/)) {
      setInternalError('請上傳 JPEG、PNG 或 WebP 格式的圖片');
      return;
    }

    // 驗證檔案大小
    if (file.size > maxSize) {
      setInternalError(
        `檔案大小超過 ${maxSize / (1024 * 1024)}MB 限制，請重新選擇`
      );
      return;
    }

    // 通過驗證，呼叫回調函式
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  // 驗證和處理多個檔案
  const validateAndProcessMultipleFiles = (files: File[]) => {
    setInternalError('');

    // 檢查檔案數量
    if (files.length > maxFiles) {
      setInternalError(`最多只能選擇 ${maxFiles} 張圖片`);
      return;
    }

    const validFiles: File[] = [];
    
    for (const file of files) {
      // 驗證檔案類型
      if (!file.type.match(/(image\/jpeg|image\/png|image\/webp)/)) {
        setInternalError(`檔案 ${file.name} 不是支援的格式，請上傳 JPEG、PNG 或 WebP 格式的圖片`);
        return;
      }

      // 驗證檔案大小
      if (file.size > maxSize) {
        setInternalError(
          `檔案 ${file.name} 大小超過 ${maxSize / (1024 * 1024)}MB 限制`
        );
        return;
      }

      validFiles.push(file);
    }

    // 通過驗證，呼叫回調函式
    if (onMultipleFileSelect && validFiles.length > 0) {
      onMultipleFileSelect(validFiles);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-base-200 transition-colors ${
          dragActive ? 'border-primary bg-base-200' : 'border-base-300'
        } ${error || internalError ? 'border-error' : ''} ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2">
            <Image src="/file.svg" alt="上傳圖示" width={48} height={48} />
          </div>
          <p className="font-medium">
            {multiple ? '點擊或拖放圖片至此處上傳' : '點擊或拖放圖片至此處上傳'}
          </p>
          <p className="text-sm mt-1 text-base-content/70">
            {multiple 
              ? `選擇最多 ${maxFiles} 張活動封面上傳 (1080 x 540 pixel 且小於4MB)`
              : '選一張好看的活動封面上傳 (1080 x 540 pixel 且小於4MB)'
            }
          </p>
          <p className="text-xs mt-1 text-base-content/70">
            支援 JPEG、PNG、WebP 格式
          </p>
        </div>

        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          multiple={multiple}
        />
      </div>
      
      {/* 顯示錯誤訊息 */}
      {(error || internalError) && (
        <div className="mt-2 text-sm text-error">
          {error || internalError}
        </div>
      )}
    </div>
  );
}

export default React.memo(FileUploader);
