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
 * @param type 圖片類型 (cover 或 detail)
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useUploadEventImages(type: EventImageType) {
  const { isMutating, trigger: originalTrigger, error, data } = useSWRMutation(
    `/api/events/images?type=${type}`,
    async (_key: string, { arg }: { arg: UploadEventImagesParams & { eventId: string } }) => {
      console.log("🚀 [useUploadEventImages] Hook 開始執行");
      console.log("📦 傳入參數:", { eventId: arg.eventId, filesCount: arg.files.length, type });
      
      try {
        // 檢查活動 ID 是否存在
        if (!arg.eventId) {
          console.error("❌ 活動 ID 不存在");
          throw new Error("活動 ID 不存在，無法上傳圖片");
        }
        
        console.log("🎯 目標活動 ID:", arg.eventId);
        
        // 檢查檔案數量上限
        if (arg.files.length > 3) {
          console.log("❌ 檔案數量超過限制:", arg.files.length);
          throw new Error("最多只能上傳 3 張圖片");
        }

        // 檢查檔案格式 (支援 JPEG、PNG、WebP)
        console.log("🔍 檢查檔案格式...");
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        for (const file of arg.files) {
          console.log("📁 檢查檔案:", file.name, file.type);
          if (!allowedTypes.includes(file.type)) {
            console.log("❌ 不支援的檔案格式:", file.type);
            throw new Error("僅支援 JPEG、PNG、WebP 格式的圖片");
          }
        }

        // 建立 FormData 物件
        console.log("📋 建立 FormData...");
        const formData = new FormData();
        
        // 添加活動 ID
        formData.append("eventId", arg.eventId);
        
        // 添加所有圖片檔案
        arg.files.forEach((file, index) => {
          console.log(`📁 添加檔案 ${index + 1}:`, file.name);
          formData.append("file", file);
        });
        
        // 如果是詳情圖且有提供描述，則添加描述
        if (type === "detail" && arg.descriptions && arg.descriptions.length > 0) {
          console.log("📝 添加圖片描述...");
          arg.descriptions.forEach((description, index) => {
            console.log(`📝 描述 ${index + 1}:`, description);
            formData.append("descriptions", description);
          });
        }

        console.log("📡 API 端點:", `/api/events/images?type=${type}`);

        // 發送請求
        console.log("📡 發送上傳請求...");
        const response = await axios.post<UploadEventImagesResponse>(
          `/api/events/images?type=${type}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("✅ 圖片上傳成功");
        console.log("📊 回應狀態:", response.status);
        console.log("📄 回應資料:", JSON.stringify(response.data, null, 2));

        // 顯示成功訊息
        const message = type === "cover" ? "封面圖上傳成功" : "詳情圖上傳成功";
        toast.success(message);
        
        return response.data;
      } catch (error: unknown) {
        console.error("❌ 圖片上傳失敗:", error);
        
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "圖片上傳失敗";
          console.error("🚨 Axios 錯誤詳情:", {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
            message: errorMessage
          });
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        
        if (error instanceof Error) {
          console.error("🚨 一般錯誤:", error.message);
          toast.error(error.message);
          throw error;
        }
        
        console.error("🚨 未知錯誤:", error);
        toast.error("圖片上傳發生錯誤");
        throw new Error("圖片上傳發生錯誤");
      }
    }
  );

  // 包裝原始 trigger 函數，提供更友好的介面
  const trigger = async (files: File[], eventId: string, descriptions?: string[]) => {
    console.log("🎬 [useUploadEventImages] trigger 函數被呼叫");
    console.log("📝 參數:", { filesCount: files.length, eventId, descriptionsCount: descriptions?.length || 0 });
    
    return originalTrigger({ files, eventId, descriptions });
  };

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}
