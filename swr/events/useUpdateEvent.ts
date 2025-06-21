import useSWRMutation from "swr/mutation";
import axios from "axios";
import { UpdateEventRequest, UpdateEventResponse } from "@/types/api/events";
import toast from "react-hot-toast";

/**
 * 更新活動的自定義 Hook
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useUpdateEvent() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/events/update",
    async (_key: string, { arg }: { arg: { eventId: string; payload: UpdateEventRequest } }) => {
      try {
        const response = await axios.patch<UpdateEventResponse>(
          `/api/events/update?eventId=${arg.eventId}`, 
          arg.payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("活動更新成功");
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "活動更新失敗";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        throw new Error("活動更新發生錯誤");
      }
    }
  );

  return {
    updateEvent: trigger,
    isUpdating: isMutating,
    error,
    data,
  };
}
