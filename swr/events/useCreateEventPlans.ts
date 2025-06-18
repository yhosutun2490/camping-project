import useSWRMutation from "swr/mutation";
import axios from "axios";
import { CreateEventPlansRequest, CreateEventPlansResponse } from "@/types/api/events";
import toast from "react-hot-toast";

/**
 * 建立活動方案的自定義 Hook
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useCreateEventPlans() {
  const { isMutating, trigger: originalTrigger, error, data } = useSWRMutation(
    `/api/events/plans`,
    async (_key: string, { arg }: { arg: CreateEventPlansRequest & { eventId: string } }) => {
      console.log("🚀 [useCreateEventPlans] Hook 開始執行");
      console.log("📦 傳入參數:", JSON.stringify(arg, null, 2));
      
      try {
        // 檢查活動 ID 是否存在
        if (!arg.eventId) {
          console.error("❌ 活動 ID 不存在");
          throw new Error("活動 ID 不存在，無法建立方案");
        }
        
        console.log("🎯 目標活動 ID:", arg.eventId);
        console.log("📝 方案數量:", arg.plans?.length || 0);
        
        const { eventId, ...payload } = arg;
        
        console.log("📤 準備發送的請求載荷:", JSON.stringify({ eventId, ...payload }, null, 2));
        console.log("📡 API 端點:", "/api/events/plans");
        
        const response = await axios.post<CreateEventPlansResponse>(
          "/api/events/plans", 
          { eventId, ...payload }, 
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("✅ 活動方案建立成功");
        console.log("📊 回應狀態:", response.status);
        console.log("📄 回應資料:", JSON.stringify(response.data, null, 2));

        toast.success("活動方案建立成功");
        return response.data;
      } catch (error: unknown) {
        console.error("❌ 活動方案建立失敗:", error);
        
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "活動方案建立失敗";
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
        toast.error("活動方案建立發生錯誤");
        throw new Error("活動方案建立發生錯誤");
      }
    }
  );

  // 包裝原始 trigger 函數，提供更友好的介面
  const createEventPlans = async (payload: CreateEventPlansRequest, eventId: string) => {
    console.log("🎬 [useCreateEventPlans] createEventPlans 函數被呼叫");
    console.log("📝 載荷:", JSON.stringify(payload, null, 2));
    console.log("🆔 活動 ID:", eventId);
    
    return originalTrigger({ ...payload, eventId });
  };

  return {
    createEventPlans,
    isCreating: isMutating,
    error,
    data,
  };
}
