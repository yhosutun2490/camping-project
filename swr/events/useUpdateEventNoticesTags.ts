import useSWRMutation from "swr/mutation";
import axios from "axios";
import { UpdateEventNoticesTagsRequest, UpdateEventNoticesTagsResponse } from "@/types/api/events";
import toast from "react-hot-toast";

/**
 * 用於更新活動行前提醒與標籤的自定義 Hook
 * @param eventId 活動 ID
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useUpdateEventNoticesTags() {
  const { isMutating, trigger: originalTrigger, error, data } = useSWRMutation(
    // 使用簡化的 API 路由
    "/api/events/notices-tags",
    async (_key: string, { arg }: { arg: { payload: UpdateEventNoticesTagsRequest, dynamicEventId: string } }) => {
      
      try {
        // 檢查 eventId 是否存在
        if (!arg.dynamicEventId) {
          throw new Error("活動 ID 不存在，無法更新標籤與通知");
        }
        
        // 將 eventId 包含在請求體中
        const requestPayload = {
          ...arg.payload,
          eventId: arg.dynamicEventId
        };
        
        const response = await axios.patch<UpdateEventNoticesTagsResponse>(
          "/api/events/notices-tags",
          requestPayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        toast.success('活動建立完成，標籤與通知設定成功！');
        
        return response.data;
      } catch (error: unknown) {
        console.error("❌ API 請求失敗:", error);
        
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "行前提醒與標籤更新失敗";
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
        toast.error("行前提醒與標籤更新發生錯誤");
        throw new Error("行前提醒與標籤更新發生錯誤");
      }
    }
  );

  // 包裝原始 trigger 函數，提供更友好的介面
  const trigger = async (payload: UpdateEventNoticesTagsRequest, dynamicEventId: string) => {
    console.log("🎬 [useUpdateEventNoticesTags] trigger 函數被呼叫");
    console.log("📝 載荷:", JSON.stringify(payload, null, 2));
    console.log("🆔 活動 ID:", dynamicEventId);
    
    return originalTrigger({ payload, dynamicEventId });
  };

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}
