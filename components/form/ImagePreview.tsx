'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Resizer from 'react-image-file-resizer';
import { Icon } from '@iconify/react';

interface ImagePreviewProps {
  /** 圖片來源 */
  src: File | string;
  /** 圖片 alt 屬性 */
  alt: string;
  /** 圖片寬度 */
  width?: number;
  /** 圖片高度 */
  height?: number;
  /** 刪除圖片的回調函式 */
  onDelete: () => void;
}

function ImagePreview({
  src,
  alt,
  width = 240,
  height = 120,
  onDelete,
}: ImagePreviewProps) {
  const [preview, setPreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 處理圖片預覽
    if (!src) return;

    setIsLoading(true);

    // 若 src 是檔案，處理成 base64 字串
    if (src instanceof File) {
      try {
        Resizer.imageFileResizer(
          src,
          width * 2, // 加大解析度以獲取更清晰的預覽
          height * 2,
          'JPEG',
          90,
          0,
          (uri) => {
            setPreview(uri as string);
            setIsLoading(false);
          },
          'base64'
        );
      } catch (error) {
        console.error('圖片處理失敗:', error);
        setIsLoading(false);
      }
    } else {
      // 若 src 是字串，直接使用
      setPreview(src);
      setIsLoading(false);
    }
  }, [src, width, height]);

  return (
    <div className="relative group">
      {/* 圖片載入中顯示 */}
      {isLoading && (
        <div
          className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl border border-[#B0B0B0]"
          style={{ width, height }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#5C795F] border-t-transparent"></div>
            <span className="text-xs text-[#4F4F4F]">載入中...</span>
          </div>
        </div>
      )}

      {/* 圖片預覽 */}
      {!isLoading && preview && (
        <>
          <div
            className="relative overflow-hidden rounded-2xl border border-[#B0B0B0] bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            style={{ width, height }}
          >
            <Image 
              src={preview} 
              alt={alt} 
              fill 
              className="object-cover" 
              sizes={`${width}px`}
            />
            
            {/* 圖片遮罩效果 */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200"></div> */}
            
            {/* 刪除按鈕 - 位於圖片右上角內部 */}
            <button
              type="button"
              onClick={onDelete}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-200 opacity-90 hover:opacity-100"
              aria-label="刪除圖片"
            >
              <Icon
                icon="material-symbols:close"
                className="text-white"
                width={16}
                height={16}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(ImagePreview);
