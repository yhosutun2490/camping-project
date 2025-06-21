import useSWRMutation from "swr/mutation";
import axios from "axios";
import { SubmitEventRequest, SubmitEventResponse } from "@/types/api/events/submit";
import toast from "react-hot-toast";
import { mutate } from "swr";

/**
 * 用於提交活動審核的自定義 Hook
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useSubmitEvent() {
  const { isMutating, trigger: originalTrigger, error, data } = useSWRMutation(
    // 使用簡化的 API 路由
    "/api/events/submit",
    async (_key: string, { arg }: { arg: { eventId: string } }) => {
      
      try {
        // 檢查 eventId 是否存在
        if (!arg.eventId) {
          throw new Error("活動 ID 不存在，無法提交審核");
        }
        
        // 準備請求載荷
        const requestPayload: SubmitEventRequest = {
          eventId: arg.eventId
        };
        
        const response = await axios.patch<SubmitEventResponse>(
          "/api/events/submit",
          requestPayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        // 提交成功後，重新驗證相關的 SWR 快取
        mutate('/api/host/events'); // 主辦方活動列表
        
        return response.data;
      } catch (error: unknown) {
        console.error("❌ API 請求失敗:", error);
        
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "活動提交審核失敗";
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
        toast.error("活動提交審核發生錯誤");
        throw new Error("活動提交審核發生錯誤");
      }
    }
  );

  // 包裝原始 trigger 函數，提供更友好的介面
  const submitEvent = async (eventId: string) => {
    console.log("🎬 [useSubmitEvent] submitEvent 函式被呼叫");
    console.log("🆔 活動 ID:", eventId);
    
    return originalTrigger({ eventId });
  };

  return {
    isMutating,
    submitEvent,
    data,
    error,
  };
}
