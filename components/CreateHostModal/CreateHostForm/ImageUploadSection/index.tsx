'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

type ImageUploadSectionProps = {
  /** 頭貼預覽圖片 */
  photoPreview: string | null;
  /** 背景圖預覽圖片 */
  backgroundPreview: string | null;
  /** 頭貼檔案變更事件 */
  onPhotoChange: (file: File | null) => void;
  /** 背景圖檔案變更事件 */
  onBackgroundChange: (file: File | null) => void;
  /** 頭貼錯誤訊息 */
  photoError?: string;
  /** 背景圖錯誤訊息 */
  backgroundError?: string;
};

export function ImageUploadSection({
  photoPreview,
  backgroundPreview,
  onPhotoChange,
  onBackgroundChange,
  photoError,
  backgroundError
}: ImageUploadSectionProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  // 處理點擊頭貼上傳區域
  const handlePhotoAreaClick = () => {
    photoInputRef.current?.click();
  };

  // 處理點擊背景圖上傳區域
  const handleBackgroundAreaClick = () => {
    backgroundInputRef.current?.click();
  };

  // 處理頭貼檔案選擇
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    // 驗證檔案
    if (file && file.size === 0) {
      onPhotoChange(null);  // 將空檔案當作無檔案處理
    } else if (file && !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      onPhotoChange(null);  // 將不支援的檔案類型當作無檔案處理
    } else {
      onPhotoChange(file);
    }
    
    // 重置 input 值，確保同一檔案可以再次選擇
    e.target.value = '';
  };

  // 處理背景圖檔案選擇
  const handleBackgroundFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    // 驗證檔案
    if (file && file.size === 0) {
      onBackgroundChange(null);  // 將空檔案當作無檔案處理
    } else if (file && !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      onBackgroundChange(null);  // 將不支援的檔案類型當作無檔案處理
    } else {
      onBackgroundChange(file);
    }
    
    // 重置 input 值，確保同一檔案可以再次選擇
    e.target.value = '';
  };

  return (
    <div className="form-control mt-6 w-full">
      <label className="label">
        <span className="label-text text-lg font-medium">主辦方圖片<span className="text-error">*</span></span>
      </label>
      <div className="max-w-4xl mx-auto relative">
        {/* 背景圖上傳區塊 */}
        <div 
          className={`relative h-[300px] w-full border-2 border-dashed ${backgroundError ? 'border-error' : 'border-base-300'} rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden`}
          onClick={handleBackgroundAreaClick}
        >
          {backgroundPreview ? (
            <>
              <Image 
                src={backgroundPreview}
                alt="主辦方背景圖片預覽" 
                fill
                sizes="100vw"
                className="object-cover animate-fadeIn"
                priority
              />                
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">點擊更換背景圖片</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="mt-4 text-base font-medium text-center">主辦方背景圖片<span className="text-error ml-1">*</span></p>
              <p className="text-sm text-center text-base-content/70 mt-1">點擊上傳（必填）</p>
            </div>
          )}
        </div>
        
        {/* 頭貼上傳區塊 */}
        <div 
          className="absolute top-5 left-5 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className={`relative w-[120px] h-[120px] rounded-full border-4 border-base-100 ${photoError ? 'ring-2 ring-error' : ''} overflow-hidden cursor-pointer shadow-md`}
            onClick={handlePhotoAreaClick}
          >
            {photoPreview ? (
              <>
                <Image 
                  src={photoPreview}
                  alt="主辦方頭貼預覽" 
                  fill
                  sizes="150px"
                  className="object-cover z-20"
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium">點擊更換頭貼</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-base-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-base-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm text-center mt-2">上傳頭貼<span className="text-error ml-1">*</span></p>
              </div>
            )}
          </div>
          
          <div className={`text-error text-xs mt-2 absolute -bottom-6 left-0 right-0 text-center p-1 ${photoError ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            {photoError || ' '}
          </div>
        </div>
        
        <div className={`text-error text-xs mt-1 p-1 ${backgroundError ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          {backgroundError || ' '}
        </div>
      </div>
      
      {/* 隱藏的檔案輸入元素 */}
      <input 
        type="file"
        ref={photoInputRef}
        className="hidden" 
        accept="image/jpeg,image/png,image/webp"
        onChange={handlePhotoFileChange}
      />
      <input 
        type="file"
        ref={backgroundInputRef}
        className="hidden" 
        accept="image/jpeg,image/png,image/webp"
        onChange={handleBackgroundFileChange}
      />
      
      <div className="text-xs mt-2 max-w-4xl mx-auto text-center text-base-content/70">
        支援格式: JPG, PNG, WebP (最大 2MB)
      </div>
    </div>
  );
}

export default ImageUploadSection;
