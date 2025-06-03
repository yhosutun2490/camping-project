import useSWRMutation from "swr/mutation";
import axios from "axios";
import { CreateEventRequest, CreateEventResponse } from "@/types/api/events";
import toast from "react-hot-toast";

/**
 * 主辦方建立活動的自定義 Hook
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useCreateEvent() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/events",
    async (_key: string, { arg: payload }: { arg: CreateEventRequest }) => {
      try {
        const response = await axios.post<CreateEventResponse>("/api/events", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success("露營活動建立成功");
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "活動建立失敗";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        throw new Error("活動建立發生錯誤");
      }
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}
