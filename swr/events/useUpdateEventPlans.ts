import useSWRMutation from "swr/mutation";
import axios from "axios";
import { UpdateEventPlansRequest, UpdateEventPlansResponse } from "@/types/api/events";
import toast from "react-hot-toast";

/**
 * 更新活動方案的自定義 Hook
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useUpdateEventPlans() {
  const { isMutating, trigger: originalTrigger, error, data } = useSWRMutation(
    `/api/events/plans`,
    async (_key: string, { arg }: { arg: UpdateEventPlansRequest & { eventId: string } }) => {
      
      try {
        // 檢查活動 ID 是否存在
        if (!arg.eventId) {
          throw new Error("活動 ID 不存在，無法更新方案");
        }
        
        const { eventId, ...payload } = arg;
        
        const response = await axios.patch<UpdateEventPlansResponse>(
          "/api/events/plans", 
          { eventId, ...payload }, 
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        toast.success("活動方案更新成功");
        return response.data;
      } catch (error: unknown) {
        console.error("❌ 活動方案更新失敗:", error);
        
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "活動方案更新失敗";
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
        toast.error("活動方案更新發生錯誤");
        throw new Error("活動方案更新發生錯誤");
      }
    }
  );

  // 包裝原始 trigger 函數，提供更友好的介面
  const updateEventPlans = async (payload: UpdateEventPlansRequest, eventId: string) => {
    console.log("🎬 [useUpdateEventPlans] updateEventPlans 函數被呼叫");
    console.log("📝 載荷:", JSON.stringify(payload, null, 2));
    console.log("🆔 活動 ID:", eventId);
    
    return originalTrigger({ ...payload, eventId });
  };

  return {
    updateEventPlans,
    isUpdating: isMutating,
    error,
    data,
  };
}
