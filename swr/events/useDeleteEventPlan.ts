import useSWRMutation from "swr/mutation";
import axios from "axios";
import { DeleteEventPlanResponse } from "@/types/api/events";
import toast from "react-hot-toast";

/**
 * 刪除活動方案的自定義 Hook
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useDeleteEventPlan() {
  const { isMutating, trigger: originalTrigger, error, data } = useSWRMutation(
    `/api/events/plans/delete`,
    async (_key: string, { arg }: { arg: { eventId: string; planId: string } }) => {
      
      try {
        // 檢查活動 ID 和方案 ID 是否存在
        if (!arg.eventId || !arg.planId) {
          throw new Error("活動 ID 或方案 ID 不存在，無法刪除方案");
        }
        
        const response = await axios.delete<DeleteEventPlanResponse>(
          `/api/events/plans`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              eventId: arg.eventId,
              planId: arg.planId
            }
          }
        );

        // 檢查回應狀態
        if (response.data.status !== "success") {
          throw new Error(response.data.message || "刪除活動方案失敗");
        }

        // 顯示成功訊息
        toast.success(response.data.message || "成功刪除活動方案");

        return response.data;
        
      } catch (error: unknown) {
        console.error("❌ 活動方案刪除失敗:", error);
        
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "刪除活動方案失敗";
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
        const errorMessage = error instanceof Error ? error.message : "刪除活動方案時發生未知錯誤";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    }
  );

  // 包裝觸發函式
  const trigger = async (eventId: string, planId: string) => {
    return await originalTrigger({ eventId, planId });
  };

  return {
    trigger,
    isMutating,
    error,
    data,
  };
}
