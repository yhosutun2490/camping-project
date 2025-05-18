import useSWRMutation from "swr/mutation";
import axios from "axios";
import { EventImageType, UploadEventImagesResponse } from "@/types/api/events";
import toast from "react-hot-toast";

interface UploadEventImagesParams {
  files: File[];
  descriptions?: string[];
}

/**
 * 用於上傳活動圖片的自定義 Hook
 * @param eventId 活動 ID
 * @param type 圖片類型 (cover 或 detail)
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useUploadEventImages(eventId: string, type: EventImageType) {
  const { isMutating, trigger, error, data } = useSWRMutation(
    `/api/events/${eventId}/images?type=${type}`,
    async (_key: string, { arg: { files, descriptions } }: { arg: UploadEventImagesParams }) => {
      try {
        // 檢查檔案數量上限
        if (files.length > 3) {
          throw new Error("最多只能上傳 3 張圖片");
        }

        // 檢查檔案是否為 JPG
        for (const file of files) {
          if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
            throw new Error("僅支援 JPG 格式的圖片");
          }
        }

        // 建立 FormData 物件
        const formData = new FormData();
        
        // 添加所有圖片檔案
        files.forEach((file) => {
          formData.append("file", file);
        });
        
        // 如果是詳情圖且有提供描述，則添加描述
        if (type === "detail" && descriptions && descriptions.length > 0) {
          descriptions.forEach((description) => {
            formData.append("descriptions", description);
          });
        }

        // 發送請求
        const response = await axios.post<UploadEventImagesResponse>(
          `/api/events/${eventId}/images?type=${type}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // 顯示成功訊息
        const message = type === "cover" ? "封面圖上傳成功" : "詳情圖上傳成功";
        toast.success(message);
        
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "圖片上傳失敗";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        
        if (error instanceof Error) {
          toast.error(error.message);
          throw error;
        }
        
        toast.error("圖片上傳發生錯誤");
        throw new Error("圖片上傳發生錯誤");
      }
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}
