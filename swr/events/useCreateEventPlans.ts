import useSWRMutation from "swr/mutation";
import axios from "axios";
import { CreateEventPlansRequest, CreateEventPlansResponse } from "@/types/api/events";
import toast from "react-hot-toast";

/**
 * 建立活動方案的自定義 Hook
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useCreateEventPlans(eventId: string) {
  const { isMutating, trigger, error, data } = useSWRMutation(
    `/api/events/${eventId}/plans`,
    async (_key: string, { arg: payload }: { arg: CreateEventPlansRequest }) => {
      try {
        const response = await axios.post<CreateEventPlansResponse>(
          `/api/events/${eventId}/plans`, 
          payload, 
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("活動方案建立成功");
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "活動方案建立失敗";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        throw new Error("活動方案建立發生錯誤");
      }
    }
  );

  return {
    createEventPlans: trigger,
    isCreating: isMutating,
    error,
    data,
  };
}
