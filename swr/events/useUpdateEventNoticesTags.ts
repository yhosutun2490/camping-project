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
    // 使用一個通用的 key，我們會在實際請求中動態構建 URL
    "/api/events/notices-tags",
    async (_key: string, { arg }: { arg: { payload: UpdateEventNoticesTagsRequest, dynamicEventId?: string } }) => {
      try {
        // 使用傳入的 dynamicEventId 或預設的 eventId
        const targetEventId = arg.dynamicEventId;
        
        // 檢查 eventId 是否存在
        if (!targetEventId) {
          throw new Error("活動 ID 不存在，無法更新標籤與通知");
        }
        
        // 根據 eventId 動態構建 API URL
        const apiUrl = `/api/events/${targetEventId}/notices-tags`;
        
        const response = await axios.patch<UpdateEventNoticesTagsResponse>(
          apiUrl,
          arg.payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "行前提醒與標籤更新失敗";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        throw new Error("行前提醒與標籤更新發生錯誤");
      }
    }
  );

  // 包裝原始 trigger 函數，提供更友好的介面
  const trigger = async (payload: UpdateEventNoticesTagsRequest, dynamicEventId?: string) => {
    return originalTrigger({ payload, dynamicEventId });
  };

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}
