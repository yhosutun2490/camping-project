import useSWRMutation from "swr/mutation";
import axios from "axios";
import { RequestUnpublishEventRequest, RequestUnpublishEventResponse } from "@/types/api/host/request-unpublish";
import toast from "react-hot-toast";
import { mutate } from "swr";

/**
 * 用於申請下架活動的自定義 Hook
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useRequestUnpublishEvent() {
  const { isMutating, trigger: originalTrigger, error, data } = useSWRMutation(
    // 使用簡化的 API 路由
    "/api/events/request-unpublish",
    async (_key: string, { arg }: { arg: RequestUnpublishEventRequest & { eventId: string } }) => {
      
      try {
        // 檢查 eventId 是否存在
        if (!arg.eventId) {
          throw new Error("活動 ID 不存在，無法申請下架");
        }
        
        // 檢查原因是否存在
        if (!arg.reason || arg.reason.trim() === "") {
          throw new Error("請提供下架原因");
        }
        
        // 準備請求載荷，將 eventId 和 reason 都放在請求體中
        const requestPayload = {
          eventId: arg.eventId,
          reason: arg.reason
        };
        
        const response = await axios.patch<RequestUnpublishEventResponse>(
          "/api/host/events/request-unpublish",
          requestPayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        // 申請成功後，重新驗證相關的 SWR 快取
        mutate(
          (key) => {
            // 如果 key 是字串且以 '/api/host/events' 或 '/api/events' 開頭，則重新驗證
            return typeof key === 'string' && (
              key.startsWith('/api/host/events') || 
              key.startsWith('/api/events')
            );
          }
        );
        
        // 顯示成功訊息
        if (response.data.message) {
          toast.success(response.data.message);
        }
        
        return response.data;
      } catch (error: unknown) {
        console.error("❌ API 請求失敗:", error);
        
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "申請下架活動失敗";
          console.error("🚨 Axios 錯誤詳情:", {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
            message: errorMessage
          });
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        
        console.error("🚨 非 Axios 錯誤:", error);
        const errorMessage = error instanceof Error ? error.message : "申請下架活動發生錯誤";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    }
  );

  // 包裝原始 trigger 函數，提供更友好的介面
  const requestUnpublish = async (eventId: string, reason: string) => {
    console.log("🎬 [useRequestUnpublishEvent] requestUnpublish 函式被呼叫");
    console.log("🆔 活動 ID:", eventId);
    console.log("📝 下架原因:", reason);
    
    return originalTrigger({ eventId, reason });
  };

  return {
    isMutating,
    requestUnpublish,
    data,
    error,
  };
}
