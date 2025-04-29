'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Resizer from 'react-image-file-resizer';

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
          className="w-full h-full flex items-center justify-center bg-base-200 rounded-lg"
          style={{ width, height }}
        >
          <div className="loading loading-spinner text-primary"></div>
        </div>
      )}

      {/* 圖片預覽 */}
      {!isLoading && preview && (
        <>
          <div
            className="relative overflow-hidden rounded-lg"
            style={{ width, height }}
          >
            <Image src={preview} alt={alt} fill className="object-cover" />
          </div>

          {/* 刪除按鈕 */}
          <button
            type="button"
            onClick={onDelete}
            className="absolute -top-2 -right-2 bg-error hover:bg-error-focus text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md opacity-80 hover:opacity-100 transition-opacity"
            aria-label="刪除圖片"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default React.memo(ImagePreview);
