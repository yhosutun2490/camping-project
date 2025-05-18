import useSWRMutation from "swr/mutation";
import axios from "axios";
import { UpdateEventNoticesTagsRequest, UpdateEventNoticesTagsResponse } from "@/types/api/events";
import toast from "react-hot-toast";

/**
 * 用於更新活動行前提醒與標籤的自定義 Hook
 * @param eventId 活動 ID
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useUpdateEventNoticesTags(eventId: string) {
  const { isMutating, trigger, error, data } = useSWRMutation(
    `/api/events/${eventId}/notices-tags`,
    async (_key: string, { arg: payload }: { arg: UpdateEventNoticesTagsRequest }) => {
      try {
        const response = await axios.patch<UpdateEventNoticesTagsResponse>(
          `/api/events/${eventId}/notices-tags`, 
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("行前提醒與標籤更新成功");
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

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}
